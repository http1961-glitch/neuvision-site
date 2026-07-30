import { Link, Navigate, useParams } from "react-router-dom"
import { CineShell } from "../components/CineShell"
import { usePageMeta } from "../hooks/usePageMeta"
import { getPost, POSTS } from "../data/posts"

const SITE_URL = "https://neuvision.xyz"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function BlogPostPage() {
  const { slug } = useParams()
  const post = getPost(slug ?? "")

  usePageMeta({
    title: post ? `${post.title} | Neuvision Blog` : "Neuvision Blog",
    description: post?.excerpt ?? "",
    jsonLd: post
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: `${SITE_URL}${post.cover}`,
            datePublished: post.date,
            author: { "@type": "Organization", name: "Neuvision" },
            publisher: { "@type": "Organization", name: "Neuvision" },
            mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : undefined,
  })

  if (!post) return <Navigate to="/blog" replace />

  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <CineShell deps={post.slug}>
      <main className="page">
        <div className="post">
          <Link to="/blog" className="back-link">← Blog</Link>

          <div className="meta-row" style={{ marginTop: 26 }}>
            <span className="accent">{post.category}</span>
            <span>·</span>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readTime} read</span>
          </div>
          <h1 data-reveal>{post.title}</h1>

          <div className="post-take" data-reveal>
            <span className="micro">The short answer</span>
            <p>{post.keyTakeaway}</p>
          </div>

          <div className="post-cover" data-clip>
            <img src={post.cover} alt="" />
          </div>

          <article>
            {post.intro.map((para, i) => (
              <p key={i} data-reveal>{para}</p>
            ))}

            <blockquote data-reveal>{post.pullQuote}</blockquote>

            {post.sections.map((section) => (
              <div key={section.heading}>
                <h2 data-reveal>{section.heading}</h2>
                {section.paragraphs.map((para, pi) => (
                  <p key={pi} data-reveal>{para}</p>
                ))}
              </div>
            ))}
          </article>

          {post.faq.length > 0 && (
            <div className="post-faq" data-reveal>
              <span className="micro accent">Frequently asked</span>
              {post.faq.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <i>+</i>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          )}

          <div className="post-cta" data-reveal>
            <div>
              <h3>Ready to find what wins?</h3>
              <p>Tell us what you're shipping — we'll scope the first batch.</p>
            </div>
            <a href="/#contact">Start a project ↗</a>
          </div>

          {more.length > 0 && (
            <div className="post-more">
              <span className="micro accent">More from the blog</span>
              <div className="blog-grid" style={{ marginTop: 10 }}>
                {more.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="blog-card" data-reveal>
                    <div className="bc-media">
                      <img src={p.cover} alt="" loading="lazy" />
                    </div>
                    <h3>{p.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </CineShell>
  )
}
