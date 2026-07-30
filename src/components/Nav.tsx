import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react"
import { List, X } from "@phosphor-icons/react"

const LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", to: "/work" },
  { label: "Blog", to: "/blog" },
]

export function Nav() {
  const { pathname } = useLocation()
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40))

  // Close the mobile menu on route change so it never lingers after navigating.
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Also close it if the viewport grows into the desktop nav (e.g. rotating a
  // tablet), so `open` never leaks into the desktop overlay/solid check.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const onChange = () => {
      if (mq.matches) setOpen(false)
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // Transparent white nav only while sitting over the dark hero — and never
  // while the mobile menu is open, so its icon/panel stay legible.
  const overlay = pathname === "/" && !scrolled && !open

  const linkClass = overlay
    ? "text-white/80 hover:text-white"
    : "text-ink-soft hover:text-ink"

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition-colors duration-300 ${
        overlay
          ? "border-b border-transparent bg-transparent"
          : "border-b border-line/70 bg-bone/85 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10">
        <Link
          to="/"
          onClick={close}
          className={`font-display text-lg font-bold tracking-tight transition-colors ${
            overlay ? "text-white" : "text-ink"
          }`}
        >
          Neuvision
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                className={`font-body text-sm transition-colors ${linkClass}`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className={`font-body text-sm transition-colors ${linkClass}`}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            onClick={close}
            className={`hidden rounded-full px-5 py-2 font-body text-sm font-medium transition-colors md:inline-flex ${
              overlay
                ? "bg-white text-ink hover:bg-white/90"
                : "btn-glow bg-ink text-bone"
            }`}
          >
            Start a Project
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors md:hidden ${
              overlay ? "text-white" : "text-ink"
            }`}
          >
            {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line/70 bg-bone md:hidden"
          >
            <nav className="flex flex-col px-6 py-2">
              {LINKS.map((link) =>
                link.to ? (
                  <Link
                    key={link.label}
                    to={link.to}
                    onClick={close}
                    className="border-b border-line/60 py-4 font-body text-base text-ink-soft transition-colors last:border-0 hover:text-ink"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={close}
                    className="border-b border-line/60 py-4 font-body text-base text-ink-soft transition-colors last:border-0 hover:text-ink"
                  >
                    {link.label}
                  </a>
                ),
              )}
              <a
                href="/#contact"
                onClick={close}
                className="btn-glow my-4 rounded-full bg-ink px-5 py-3 text-center font-body text-sm font-medium text-bone"
              >
                Start a Project
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
