import { Link } from "react-router-dom"

const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Studio", href: "/#studio" },
  { label: "Blog", to: "/blog" },
]

export function Footer() {
  return (
    <footer className="px-6 py-12 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <a href="/" className="font-display text-lg font-bold text-ink">
          Neuvision
        </a>

        <nav className="flex flex-wrap gap-6">
          {LINKS.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className="font-body text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <a
          href="mailto:build@neuvision.xyz"
          className="font-body text-sm text-ink-soft transition-colors hover:text-ink"
        >
          build@neuvision.xyz
        </a>
      </div>

      <p className="mx-auto mt-10 max-w-7xl font-body text-xs text-ink-faint">
        Neuvision. AI-native TVC, film, and UGC production.
      </p>
    </footer>
  )
}
