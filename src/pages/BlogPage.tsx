import { Link } from "react-router-dom"
import { CineShell } from "../components/CineShell"
import { usePageMeta } from "../hooks/usePageMeta"
import { POSTS } from "../data/posts"

const SITE_URL = "https://neuvision.xyz"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function BlogPage() {
  const [featured, ...rest] = POSTS

  usePageMeta({
    title: "Blog — AI video production notes | Neuvision",
    description:
      "How AI video generation actually works, what AI TVC, film, and UGC cost and take to produce, and how we test variants before spending media budget.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Blog",
        name: "Neuvision Blog",
        url: `${SITE_URL}/blog`,
        blogPost: POSTS.map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
        })),
      },
    ],
  })

  return (
    <CineShell>
      <main className="page">
        <header className="page-head">
          <span className="micro accent">Blog</span>
          <h1 className="split">
            <span>NOTES ON</span>
            <span>AI PRODUCTION.</span>
          </h1>
          <p data-reveal>
            How we brief, generate, test and scale — written down so you can
            steal it.
          </p>
        </header>

        <Link to={`/blog/${featured.slug}`} className="blog-featured" data-reveal>
          <div className="bf-media" data-clip>
            <img src={featured.cover} alt="" />
          </div>
          <div className="bf-copy">
            <div className="meta-row">
              <span className="accent">{featured.category}</span>
              <span>·</span>
              <span>{formatDate(featured.date)}</span>
              <span>·</span>
              <span>{featured.readTime} read</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <span className="read-link">Read the piece ↗</span>
          </div>
        </Link>

        <div className="blog-grid">
          {rest.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`} className="blog-card" data-reveal>
              <div className="bc-media">
                <img src={post.cover} alt="" loading="lazy" />
              </div>
              <div className="meta-row">
                <span className="accent">{post.category}</span>
                <span>·</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </main>
    </CineShell>
  )
}
