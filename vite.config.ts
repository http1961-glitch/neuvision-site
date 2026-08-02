import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { aeoPrerender } from './prerender/vite-plugin-aeo-prerender.mjs'
import { POSTS } from './src/data/posts.ts'

// Derived from the same data the router reads, so a new post gets prerendered
// without anyone remembering to update a second list.
const routes = ['/', '/work', '/blog', ...POSTS.map((p) => `/blog/${p.slug}`)]

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    aeoPrerender({
      routes,
      origin: 'https://neuvision.xyz',
      jsonLdDir: 'aeo/jsonld',
      rootSelector: '#root',
      settleMs: 1500,
    }),
  ],
})
