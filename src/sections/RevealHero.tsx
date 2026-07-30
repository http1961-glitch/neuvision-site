import { useEffect, useRef } from "react"
import { ArrowRight } from "@phosphor-icons/react"

const SPOTLIGHT_R = 260
// One source image; the two layers apply CSS filters so the spotlight both
// illuminates AND restores natural colour (Neuvision-signal style).
const HERO_IMG = "/media/hero-signal.jpg"
const BASE_FILTER = "grayscale(1) brightness(0.34) contrast(1.05)"
const REVEAL_FILTER = "saturate(1.12) contrast(1.05) brightness(1.08)"

// Soft spotlight mask (matches the reference's radial-gradient stops), driven as
// a CSS mask so it stays GPU-cheap instead of re-encoding a canvas every frame.
function maskAt(x: number, y: number) {
  return (
    `radial-gradient(circle ${SPOTLIGHT_R}px at ${x}px ${y}px,` +
    "rgba(0,0,0,1) 0%," +
    "rgba(0,0,0,1) 40%," +
    "rgba(0,0,0,0.75) 60%," +
    "rgba(0,0,0,0.4) 75%," +
    "rgba(0,0,0,0.12) 88%," +
    "rgba(0,0,0,0) 100%)"
  )
}

export function RevealHero() {
  const revealRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const raf = useRef<number>(0)

  useEffect(() => {
    const hover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches

    const el = revealRef.current
    if (!hover || !el) {
      // No hover (touch): show the graded reveal image in full.
      if (el) {
        el.style.maskImage = "none"
        el.style.webkitMaskImage = "none"
      }
      return
    }

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", onMove)

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      const m = maskAt(smooth.current.x, smooth.current.y)
      el.style.maskImage = m
      el.style.webkitMaskImage = m
      el.style.maskSize = "100% 100%"
      el.style.webkitMaskSize = "100% 100%"
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <section
      id="top"
      className="relative h-screen w-full overflow-hidden bg-[#0b0a09]"
      style={{ height: "100dvh" }}
    >
      {/* Base layer: dark grayscale (unlit) */}
      <div
        className="hero-zoom absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMG})`, filter: BASE_FILTER }}
      />

      {/* Reveal layer: bright natural colour, shown through the cursor spotlight
          so the light both illuminates and restores colour */}
      <div
        ref={revealRef}
        className="absolute inset-0 z-30 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMG})`, filter: REVEAL_FILTER }}
      />

      {/* Legibility scrims */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-56 bg-gradient-to-b from-black/55 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-72 bg-gradient-to-t from-black/65 to-transparent" />

      {/* Heading */}
      <div className="pointer-events-none absolute left-0 right-0 top-[15%] z-50 flex flex-col items-center px-5 text-center">
        <h1 className="leading-[0.95] text-bone">
          <span
            className="hero-anim hero-reveal block font-playfair text-5xl font-normal italic sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.03em", animationDelay: "0.25s" }}
          >
            AI Production
          </span>
          <span
            className="hero-anim hero-reveal -mt-1 block font-display text-5xl font-bold uppercase sm:text-7xl md:text-8xl"
            style={{ letterSpacing: "-0.04em", animationDelay: "0.42s" }}
          >
            Creative Studios
          </span>
        </h1>
      </div>

      {/* Bottom-left paragraph */}
      <div
        className="hero-anim hero-fade absolute bottom-14 left-6 z-50 hidden max-w-[280px] sm:block md:left-14"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="font-body text-sm leading-relaxed text-bone/80">
          Move your cursor. We shine a spotlight that turns flat footage into
          show-stopping cuts.
        </p>
      </div>

      {/* Bottom-right block */}
      <div
        className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-5 sm:bottom-20 sm:left-auto sm:right-10 sm:max-w-[280px] md:right-14"
        style={{ animationDelay: "0.85s" }}
      >
        <p className="font-body text-xs leading-relaxed text-bone/80 sm:text-sm">
          An AI-native production studio. Cinematic TVC, film, and UGC for brands
          that refuse to look artificial.
        </p>
        <a
          href="#cta"
          className="inline-flex items-center gap-2 rounded-full bg-amber px-7 py-3 font-body text-sm font-medium text-bone transition-all hover:scale-[1.03] hover:bg-[#c26a26] hover:shadow-lg hover:shadow-amber/30 active:scale-95"
        >
          Start a Project
          <ArrowRight size={16} weight="bold" />
        </a>
      </div>
    </section>
  )
}
