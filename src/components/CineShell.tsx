import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import "../styles/cinematic.css"

gsap.registerPlugin(ScrollTrigger)

/** Dark cinematic chrome (nav + grain + footer) and the shared GSAP/Lenis
 *  motion system for subpages. `deps` re-runs the reveal pass (e.g. on slug
 *  change). Home has its own richer variant with the loader. */
export function CineShell({
  children,
  deps = "",
}: {
  children: React.ReactNode
  deps?: string
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
    const root = rootRef.current
    if (!root) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo(0, 0)

    const lenis = !reduceMotion
      ? new Lenis({
          duration: 1.6,
          smoothWheel: true,
          wheelMultiplier: 0.85,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        })
      : null
    const tick = (time: number) => lenis?.raf(time * 1000)
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    const ctx = gsap.context(() => {
      if (reduceMotion) return
      root.querySelectorAll(".split").forEach((parent) => {
        parent.querySelectorAll(":scope > span").forEach((line) => {
          gsap.from(line, {
            yPercent: 112,
            opacity: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: parent, start: "top 85%", toggleActions: "play none none reverse" },
          })
        })
      })
      root.querySelectorAll("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 26,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" },
        })
      })
      root.querySelectorAll("[data-clip]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(10% 0 10% 0)", scale: 1.06 },
          {
            clipPath: "inset(0% 0 0% 0)",
            scale: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
          },
        )
      })
    }, root)

    ScrollTrigger.refresh()

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      if (lenis) {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps])

  return (
    <div className="cine" ref={rootRef}>
      <div className="grain" aria-hidden="true"></div>

      <header className="nav">
        <Link className="logo" to="/">NEUVISION</Link>
        <nav className="nav__links">
          <a href="/#work">Work</a>
          <a href="/#services">Services</a>
          <a href="/#process">Process</a>
          <Link to="/blog">Blog</Link>
        </nav>
        <a className="nav__cta" href="/#contact">Start a project ↗</a>
        <button
          type="button"
          className="nav__burger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <a href="/#work">Work</a>
          <a href="/#services">Services</a>
          <a href="/#process">Process</a>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <a href="/#contact">Start a project ↗</a>
        </div>
      )}

      {children}

      <footer className="cine-footer">
        <span>NEUVISION © 2026</span>
        <span>Kuala Lumpur · Available worldwide</span>
        <span>
          <Link to="/work">Work</Link> · <Link to="/blog">Blog</Link> ·{" "}
          <a href="mailto:build@neuvision.xyz">build@neuvision.xyz</a>
        </span>
      </footer>
    </div>
  )
}
