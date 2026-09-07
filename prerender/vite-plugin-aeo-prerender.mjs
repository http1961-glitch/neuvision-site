// Universal prerender for a Vite SPA.
//
// After the normal build, each route is rendered in a real browser and its
// markup is written into that route's index.html, along with per-route title,
// meta description and JSON-LD. Humans and crawlers then receive byte-identical
// HTML: the crawler stops at that HTML, the browser hydrates over it.
//
// This is deliberately not user-agent detection. Serving bots a different
// document than humans is cloaking; serving everyone the finished document is
// just server-side rendering done late.
//
// Usage in vite.config.ts:
//
//   import { aeoPrerender } from './prerender/vite-plugin-aeo-prerender.mjs';
//
//   export default defineConfig({
//     plugins: [
//       react(),
//       aeoPrerender({
//         routes: ['/', '/work', '/blog', '/blog/the-variant-funnel'],
//         origin: 'https://neuvision.xyz',
//         jsonLdDir: 'aeo/jsonld',   // optional, output of `aeo generate`
//       }),
//     ],
//   });

import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join, extname, resolve } from 'node:path';

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.mp4': 'video/mp4', '.woff2': 'font/woff2', '.ico': 'image/x-icon',
};

/** Serve the built dist directory, falling back to index.html for SPA routes. */
function serveDist(distDir) {
  return new Promise((resolvePort) => {
    const server = createServer(async (req, res) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0]);
      const filePath = join(distDir, urlPath);
      try {
        const data = await readFile(filePath);
        res.writeHead(200, { 'content-type': MIME[extname(filePath)] || 'application/octet-stream' });
        res.end(data);
      } catch {
        const fallback = await readFile(join(distDir, 'index.html'));
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(fallback);
      }
    });
    server.listen(0, '127.0.0.1', () => resolvePort({ server, port: server.address().port }));
  });
}

function injectHead(html, { title, description, jsonLd, canonical }) {
  let out = html;
  if (title) {
    out = /<title>[\s\S]*?<\/title>/i.test(out)
      ? out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`)
      : out.replace(/<\/head>/i, `  <title>${escapeHtml(title)}</title>\n</head>`);
  }
  if (description) {
    const tag = `<meta name="description" content="${escapeHtml(description)}" />`;
    out = /<meta[^>]+name=["']description["'][^>]*>/i.test(out)
      ? out.replace(/<meta[^>]+name=["']description["'][^>]*>/i, tag)
      : out.replace(/<\/head>/i, `  ${tag}\n</head>`);
  }
  if (canonical && !/rel=["']canonical["']/i.test(out)) {
    out = out.replace(/<\/head>/i, `  <link rel="canonical" href="${escapeHtml(canonical)}" />\n</head>`);
  }
  if (jsonLd?.length) {
    // data-aeo-prerender lets the app strip these on mount, so a page that
    // renders its own JSON-LD ends up with exactly one copy rather than two.
    const tags = jsonLd
      .map((block) => `  <script type="application/ld+json" data-aeo-prerender>${JSON.stringify(block)}</script>`)
      .join('\n');
    out = out.replace(/<\/head>/i, `${tags}\n</head>`);
  }
  return out;
}

const escapeHtml = (s) => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Browser launch options. Locally, Playwright's own Chromium is used. On
 * Vercel (Amazon Linux build image, no Chromium system libraries) we fall
 * back to @sparticuz/chromium, a self-contained Lambda-compatible build.
 */
async function launchOptions(ctx) {
  const onVercel = !!process.env.VERCEL || !!process.env.AEO_USE_SPARTICUZ;
  if (!onVercel) return {};
  try {
    const mod = await import('@sparticuz/chromium');
    const sparticuz = mod.default ?? mod;
    return {
      executablePath: await sparticuz.executablePath(),
      args: sparticuz.args,
      headless: true,
    };
  } catch (err) {
    ctx.warn(`aeo-prerender: @sparticuz/chromium unavailable (${err.message}), using default Chromium`);
    return {};
  }
}

export function aeoPrerender(options = {}) {
  const {
    routes = ['/'],
    origin = '',
    rootSelector = '#root',
    settleMs = 1200,
    jsonLdDir = null,
  } = options;

  let distDir;

  return {
    name: 'aeo-prerender',
    apply: 'build',
    enforce: 'post',

    configResolved(config) {
      distDir = resolve(config.root, config.build.outDir);
    },

    async closeBundle() {
      let chromium;
      try {
        ({ chromium } = await import('playwright'));
      } catch {
        this.warn('aeo-prerender: playwright not installed, skipping prerender');
        return;
      }

      // Load any JSON-LD produced by `aeo generate`.
      const jsonLdBySlug = {};
      if (jsonLdDir) {
        try {
          for (const file of await readdir(jsonLdDir)) {
            if (file.endsWith('.json')) {
              jsonLdBySlug[file.replace(/\.json$/, '')] =
                JSON.parse(await readFile(join(jsonLdDir, file), 'utf8'));
            }
          }
        } catch (err) {
          this.warn(`aeo-prerender: could not read jsonLdDir (${err.message})`);
        }
      }

      const { server, port } = await serveDist(distDir);
      let browser;
      try {
        browser = await chromium.launch(await launchOptions(this));
      } catch (err) {
        // A missing/broken browser must not block shipping the site: the SPA
        // shell still works, it just loses the prerendered HTML until fixed.
        server.close();
        this.warn(`aeo-prerender: could not launch Chromium, skipping prerender — ${err.message.split('\n')[0]}`);
        return;
      }
      const page = await browser.newPage();
      const shell = await readFile(join(distDir, 'index.html'), 'utf8');
      let done = 0;

      for (const route of routes) {
        try {
          // Wait for the document itself, then give the network a bounded
          // chance to go quiet. Video tiles can keep streaming, so a page that
          // never reaches "networkidle" must still be rendered, not skipped.
          await page.goto(`http://127.0.0.1:${port}${route}`, { waitUntil: 'load', timeout: 60000 });
          await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
          await page.waitForTimeout(settleMs);

          const data = await page.evaluate((sel) => ({
            markup: document.querySelector(sel)?.innerHTML || '',
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content || null,
            jsonLd: [...document.head.querySelectorAll('script[type="application/ld+json"]')]
              .map((s) => s.textContent),
          }), rootSelector);

          if (!data.markup) {
            this.warn(`aeo-prerender: ${route} rendered empty, leaving shell`);
            continue;
          }

          const slug = route === '/' ? 'index' : route.replace(/^\/+|\/+$/g, '').replace(/\//g, '__');

          // A page that renders its own JSON-LD is the source of truth: it has
          // the real post data. The generated file only fills the gap on routes
          // that emit nothing.
          const rendered = (data.jsonLd || [])
            .map((text) => { try { return JSON.parse(text); } catch { return null; } })
            .filter(Boolean);
          const fromFile = jsonLdBySlug[slug];
          const jsonLd = rendered.length ? rendered : fromFile ? [fromFile] : [];

          let html = injectHead(shell, {
            title: data.title,
            description: data.description,
            jsonLd,
            canonical: origin ? new URL(route, origin).href : null,
          });

          // Put the rendered markup inside the mount node.
          html = html.replace(
            new RegExp(`(<div id="${rootSelector.replace('#', '')}"[^>]*>)([\\s\\S]*?)(</div>)`),
            (_m, open, _inner, close) => `${open}${data.markup}${close}`
          );

          const outPath = route === '/'
            ? join(distDir, 'index.html')
            : join(distDir, route.replace(/^\/+/, ''), 'index.html');
          await mkdir(join(outPath, '..'), { recursive: true });
          await writeFile(outPath, html, 'utf8');
          done++;
        } catch (err) {
          this.warn(`aeo-prerender: ${route} failed — ${err.message}`);
        }
      }

      await browser.close();
      server.close();
      console.log(`\naeo-prerender: prerendered ${done}/${routes.length} routes`);
    },
  };
}

export default aeoPrerender;
