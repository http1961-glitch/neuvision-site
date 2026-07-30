import { useEffect, useMemo, useRef, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Lenis from "lenis"
import "../styles/cinematic.css"

gsap.registerPlugin(ScrollTrigger)

const HERO_CLIPS = [
  { src: "/media/variant-1.mp4", poster: "/media/variant-1.jpg" },
  { src: "/media/variant-5.mp4", poster: "/media/variant-5.jpg" },
  { src: "/media/variant-2.mp4", poster: "/media/variant-2.jpg" },
]

const PROJECTS = [
  {
    src: "/media/clip-car.mp4",
    poster: "/media/poster-car.jpg",
    tag: "01 · Automotive",
    title: "COAST RUN",
    kind: "Commercial film · Concept",
  },
  {
    src: "/media/variant-3.mp4",
    poster: "/media/variant-3.jpg",
    tag: "02 · Fashion",
    title: "TAILWIND",
    kind: "Campaign film · Concept",
  },
  {
    src: "/media/product-watch.mp4",
    poster: "/media/product-watch.jpg",
    tag: "03 · Product",
    title: "MERIDIAN",
    kind: "Product film · Concept",
  },
  {
    src: "/media/variant-6.mp4",
    poster: "/media/variant-6.jpg",
    tag: "04 · Film",
    title: "NIGHT SHIFT",
    kind: "Brand film · Concept",
  },
]

const SERVICES = [
  { key: "tvc", label: "AI TVC", img: "/media/poster-car.jpg" },
  { key: "film", label: "AI Film", img: "/media/variant-2.jpg" },
  { key: "ugc", label: "AI UGC", img: "/media/poster-ugc.jpg" },
  { key: "product", label: "Product Launches", img: "/media/product-watch.jpg" },
  { key: "testing", label: "Variant Testing", img: "/media/cinematic-board.jpg" },
]

const PROCESS = [
  { n: "01", title: "Brief", copy: "One page: what you sell, who has to believe it, and what's non-negotiable." },
  { n: "02", title: "Generate", copy: "Dozens of cuts off the same brief — different hooks, pacing and formats." },
  { n: "03", title: "Test", copy: "Every variant meets a real audience before a dollar of media spend." },
  { n: "04", title: "Scale", copy: "Budget concentrates behind the cut the data proves, not the room's favourite." },
  { n: "05", title: "Deliver", copy: "4K masters and platform versions, graded to one look and ready to run." },
]

const BRIEF_FORMATS = ["AI TVC", "AI Film", "AI UGC"]

function BriefCard() {
  const [picked, setPicked] = useState<string[]>(["AI TVC"])
  const [product, setProduct] = useState("")
  const [email, setEmail] = useState("")

  const toggle = (f: string) =>
    setPicked((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]))

  const batch = picked.length * 8

  const mailto = useMemo(() => {
    const subject = `Project brief — ${product.trim() || "new project"}`
    const body = [
      `What we're shipping: ${product.trim() || "-"}`,
      `Formats: ${picked.join(", ") || "-"}`,
      `First batch to scope: ${batch || 8} variants`,
      `Reply to: ${email.trim() || "-"}`,
    ].join("\n")
    return `mailto:build@neuvision.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [picked, product, email, batch])

  return (
    <div className="brief-card">
      <p className="micro">01 — What do you need?</p>
      <div className="brief-chips">
        {BRIEF_FORMATS.map((f) => (
          <button
            key={f}
            type="button"
            className={picked.includes(f) ? "on" : ""}
            aria-pressed={picked.includes(f)}
            onClick={() => toggle(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="micro">02 — What are you shipping?</p>
      <input
        type="text"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        placeholder="e.g. a sparkling drink launching in the US"
      />

      <p className="micro">03 — Where do we send the scope?</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@brand.com"
      />

      <div className="brief-meta">
        <b>{picked.length ? batch : "—"}</b>
        <span>Variants · first batch · 7 days</span>
      </div>

      <a
        href={mailto}
        className="brief-submit"
        style={picked.length === 0 ? { opacity: 0.4, pointerEvents: "none" } : undefined}
      >
        Scope my first batch ↗
      </a>
      <p className="brief-hint">Opens your email with the brief pre-filled — nothing gets lost in a form.</p>
    </div>
  )
}

export function HomeCinematic() {
  const rootRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lenis = !reduceMotion
      ? new Lenis({
          duration: 2.1,
          smoothWheel: true,
          wheelMultiplier: 0.72,
          touchMultiplier: 1.1,
          easing: (t: number) => 1 - Math.pow(1 - t, 4),
        })
      : null

    const tick = (time: number) => lenis?.raf(time * 1000)
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
    }

    // Smooth-scroll in-page anchors through Lenis.
    const onAnchorClick = (e: Event) => {
      const link = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!link) return
      const target = document.querySelector(link.getAttribute("href") ?? "")
      if (!target) return
      e.preventDefault()
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: 0 })
      else (target as HTMLElement).scrollIntoView()
    }
    root.addEventListener("click", onAnchorClick)

    const extraCleanups: (() => void)[] = []

    const ctx = gsap.context(() => {
      const loader = root.querySelector(".loader") as HTMLElement
      document.body.style.overflow = "hidden"
      const tl = gsap.timeline({
        onComplete: () => {
          loader.style.display = "none"
          document.body.style.overflow = ""
        },
      })
      tl.to(".loader__line span", { width: "100%", duration: 1.25, ease: "power2.inOut" })
        .to(".loader__brand", { y: -10, opacity: 0, duration: 0.55 }, "+=.2")
        .to(loader, { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "-=.35")
        .from(".hero__title span", { yPercent: 115, duration: 1.25, stagger: 0.12, ease: "power4.out" }, "-=.45")
        .from(".hero__intro, .hero__bottom", { opacity: 0, y: 20, duration: 0.8, stagger: 0.12 }, "-=.75")

      if (reduceMotion) return

      gsap.to(".hero__image--one", {
        yPercent: 12, scale: 1.12, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.8 },
      })
      gsap.to(".hero__image--two", {
        yPercent: 18, scale: 1.1, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 2.2 },
      })
      gsap.to(".hero__image--three", {
        yPercent: 9, scale: 1.08, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.7 },
      })
      gsap.to(".hero__title", {
        yPercent: -35, opacity: 0.18, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.6 },
      })

      root.querySelectorAll(".manifesto__copy h2 span").forEach((line, i) => {
        gsap.from(line, {
          yPercent: 110, opacity: 0, duration: 1.2, ease: "power4.out",
          scrollTrigger: { trigger: ".manifesto", start: `top ${75 - i * 6}%`, toggleActions: "play none none reverse" },
        })
      })

      root.querySelectorAll(".project").forEach((project) => {
        const image = project.querySelector(".project__image")
        gsap.fromTo(
          image,
          { clipPath: "inset(12% 0 12% 0)", scale: 1.1 },
          {
            clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 1.8, ease: "power3.out",
            scrollTrigger: { trigger: project, start: "top 82%", toggleActions: "play none none reverse" },
          },
        )
        gsap.from(project.querySelector(".project__meta"), {
          opacity: 0, y: 24, duration: 0.9,
          scrollTrigger: { trigger: project, start: "top 72%", toggleActions: "play none none reverse" },
        })
      })

      // "Four worlds" copy travels down alongside the project stack. Width is
      // read inside the value fn (recomputed on refresh/resize) so the travel
      // is 0 in the stacked <=900px layout.
      {
        const section = root.querySelector(".work-intro") as HTMLElement | null
        const copy = root.querySelector(".sticky-copy") as HTMLElement | null
        if (section && copy) {
          gsap.to(copy, {
            y: () =>
              window.innerWidth > 900
                ? Math.max(0, section.offsetHeight - copy.offsetHeight - 300)
                : 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 25%",
              end: "bottom 95%",
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          })
        }
      }

      gsap.to(".process__progress", {
        width: "100%", ease: "none",
        scrollTrigger: { trigger: ".process__track", start: "top 72%", end: "bottom 45%", scrub: 1.6 },
      })
      gsap.from(".process__track article", {
        opacity: 0.18, y: 35, stagger: 0.12,
        scrollTrigger: { trigger: ".process__track", start: "top 75%", end: "bottom 55%", scrub: 1.4 },
      })

      gsap.to(".contact__visual", {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom bottom", scrub: 2 },
      })

      root.querySelectorAll(".split span").forEach((line) => {
        gsap.from(line, {
          yPercent: 110, opacity: 0, duration: 1.15, ease: "power4.out",
          scrollTrigger: { trigger: line.parentElement, start: "top 78%", toggleActions: "play none none reverse" },
        })
      })

      // Contextual cursor on projects
      const cursor = root.querySelector(".cursor")
      if (window.matchMedia("(pointer:fine)").matches && cursor) {
        const move = (e: PointerEvent) =>
          gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.22, ease: "power2.out" })
        window.addEventListener("pointermove", move)
        extraCleanups.push(() => window.removeEventListener("pointermove", move))
        root.querySelectorAll(".hover-view").forEach((el) => {
          el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 1, duration: 0.3 }))
          el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 0, duration: 0.25 }))
        })
      }

      // Magnetic buttons
      root.querySelectorAll(".magnetic").forEach((el) => {
        el.addEventListener("mousemove", (e) => {
          const ev = e as MouseEvent
          const r = (el as HTMLElement).getBoundingClientRect()
          gsap.to(el, { x: (ev.clientX - r.left - r.width / 2) * 0.18, y: (ev.clientY - r.top - r.height / 2) * 0.18, duration: 0.3 })
        })
        el.addEventListener("mouseleave", () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.35)" }))
      })
    }, root)

    return () => {
      extraCleanups.forEach((fn) => fn())
      ctx.revert()
      ScrollTrigger.getAll().forEach((st) => st.kill())
      if (lenis) {
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
      root.removeEventListener("click", onAnchorClick)
      document.body.style.overflow = ""
    }
  }, [])

  const onServiceEnter = (img: string) => {
    const el = previewRef.current
    if (!el) return
    el.style.backgroundImage = `url("${img}")`
    gsap.to(el, { opacity: 1, y: 0, rotation: -3, duration: 0.55, ease: "power3.out" })
  }
  const onServiceLeave = () => {
    const el = previewRef.current
    if (!el) return
    gsap.to(el, { opacity: 0, y: 18, duration: 0.35 })
  }

  return (
    <div className="cine" ref={rootRef}>
      <div className="loader" aria-hidden="true">
        <div className="loader__brand">NEUVISION</div>
        <div className="loader__line"><span></span></div>
      </div>

      <div className="cursor" aria-hidden="true"><span>VIEW</span></div>
      <div className="grain" aria-hidden="true"></div>

      <header className="nav">
        <a className="logo" href="#hero">NEUVISION</a>
        <nav className="nav__links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <Link to="/blog">Blog</Link>
        </nav>
        <a className="nav__cta magnetic" href="#contact">Start a project ↗</a>
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
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Start a project ↗</a>
        </div>
      )}

      <main>
        <section className="scene hero" id="hero">
          <div className="hero__media">
            {HERO_CLIPS.map((clip, i) => (
              <div key={clip.src} className={`hero__image hero__image--${["one", "two", "three"][i]}`}>
                <video src={clip.src} poster={clip.poster} autoPlay loop muted playsInline preload="metadata" />
              </div>
            ))}
          </div>
          <div className="hero__shade"></div>

          <div className="hero__intro">
            <span className="micro">AI-native production studio</span>
            <p>Cinematic TVC, film and UGC for brands that refuse to look artificial.</p>
          </div>

          <h1 className="hero__title split">
            <span>MANY VARIANTS.</span>
            <span>ONE THAT WINS.</span>
          </h1>

          <div className="hero__bottom">
            <a href="#work" className="round-link magnetic">See the work <b>↗</b></a>
            <div className="scroll-label"><i></i> Scroll to enter</div>
          </div>
        </section>

        <section className="scene manifesto" id="studio">
          <div className="manifesto__counter">01 / 06</div>
          <div className="manifesto__copy">
            <p className="serif">We don't make content to fill space.</p>
            <h2><span>WE CREATE THE</span><span>MOMENT PEOPLE</span><span>REMEMBER.</span></h2>
          </div>
          <div className="manifesto__aside">
            <p>Human-led creative direction, accelerated by AI production.</p>
            <p>From first brief to final frame.</p>
          </div>
        </section>

        <section className="work-intro" id="work">
          <div className="sticky-copy">
            <span className="micro">Selected productions</span>
            <h2>Four worlds.<br /><em>One engine.</em></h2>
            <p>
              Every production is developed as a complete visual world — generated
              in variants, tested on real audiences, and scaled when it wins.
            </p>
            <Link className="all-work" to="/work">All work ↗</Link>
          </div>

          <div className="work-stack">
            {PROJECTS.map((p) => (
              <article className="project hover-view" key={p.title}>
                <div className="project__image">
                  <video src={p.src} poster={p.poster} autoPlay loop muted playsInline preload="metadata" />
                </div>
                <div className="project__meta">
                  <span>{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.kind}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="scene services" id="services">
          <div className="services__header">
            <span className="micro">What we produce</span>
            <h2>BUILT FOR<br /><em>BIG MOMENTS.</em></h2>
          </div>
          <div className="service-list">
            {SERVICES.map((s, i) => (
              <a
                key={s.key}
                href="#contact"
                onMouseEnter={() => onServiceEnter(s.img)}
                onMouseLeave={onServiceLeave}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{s.label}</strong>
                <i>↗</i>
              </a>
            ))}
          </div>
          <div className="service-preview" ref={previewRef}></div>
        </section>

        <section className="process" id="process">
          <div className="process__heading">
            <span className="micro">How we work</span>
            <p className="serif">Technology creates possibility.</p>
            <h2>HUMAN TASTE<br />MAKES IT MATTER.</h2>
          </div>
          <div className="process__track">
            <div className="process__progress"></div>
            {PROCESS.map((step) => (
              <article key={step.n}>
                <span>{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="scene proof">
          <div className="proof__copy">
            <span className="micro">Designed to move</span>
            <h2>MORE IDEAS.<br />MORE VERSIONS.<br /><em>LESS FRICTION.</em></h2>
          </div>
          <div>
            <div className="proof__stats">
              <div><b>40M+</b><span>Views across tested cuts</span></div>
              <div><b>1,200+</b><span>Variants generated</span></div>
              <div><b>3.4×</b><span>Median winner lift</span></div>
              <div><b>7d</b><span>Brief to first batch</span></div>
            </div>
            <p className="proof__note">Illustrative targets — replaced with audited numbers per engagement.</p>
          </div>
        </section>

        <section className="scene contact" id="contact">
          <div className="contact__visual"></div>
          <div className="contact__shade"></div>
          <div className="contact__grid">
            <div className="contact__copy">
              <span className="micro">Your next production starts here</span>
              <h2 className="split"><span>LET'S BUILD</span><span>SOMETHING</span><span><em>UNFORGETTABLE.</em></span></h2>
              <a className="contact__mail" href="mailto:build@neuvision.xyz">build@neuvision.xyz</a>
            </div>
            <BriefCard />
          </div>
          <footer className="footer">
            <span>NEUVISION © 2026</span>
            <span>Kuala Lumpur · Available worldwide</span>
            <span><Link to="/work">Work</Link> · <Link to="/blog">Blog</Link> · <a href="mailto:build@neuvision.xyz">build@neuvision.xyz</a></span>
          </footer>
        </section>
      </main>
    </div>
  )
}
