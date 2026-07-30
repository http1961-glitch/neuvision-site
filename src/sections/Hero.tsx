import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { VideoTile } from "../components/VideoTile"

const LINES = ["Your creative team.", "None of the AI look."]

const lineContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const lineChild = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
}

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Scroll parallax for the video cluster
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -70])
  const ySecond = useTransform(scrollYProgress, [0, 1], [0, -30])
  const yUgc = useTransform(scrollYProgress, [0, 1], [0, -110])

  return (
    <section
      ref={sectionRef}
      id="reel"
      className="relative mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-12 px-6 pt-24 pb-16 md:grid-cols-[1.05fr_1fr] md:gap-8 md:px-10 md:pt-20"
    >
      {/* Text */}
      <div>
        <motion.h1
          variants={reduce ? undefined : lineContainer}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="font-display text-5xl font-bold uppercase leading-[1.0] tracking-tight text-ink md:text-7xl"
        >
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                variants={reduce ? undefined : lineChild}
                className={`block ${i === 0 ? "text-shine" : ""}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-md font-body text-base leading-relaxed text-ink-soft md:text-lg"
        >
          One AI-native studio for concept, TVC, film, and UGC — cinematic work
          with the polish of a real production house. Generated, not filmed, and
          ready in days.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#cta"
            className="btn-glow rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-bone"
          >
            Start a Project
          </a>
          <a
            href="#work"
            className="rounded-full border border-ink/25 px-7 py-3.5 font-body text-sm font-medium text-ink transition-colors hover:border-amber/60 hover:text-amber"
          >
            See Our Work
          </a>
        </motion.div>
      </div>

      {/* Video cluster */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="relative mx-auto h-[380px] w-full max-w-md md:h-[520px] md:max-w-none"
      >
        {/* Main film clip */}
        <motion.div
          style={{ y: reduce ? 0 : yMain }}
          className="absolute right-0 top-2 w-[78%] rotate-2"
        >
          <div className="float-slow">
            <VideoTile
              src="/media/clip-sneaker.mp4"
              poster="/media/poster-sneaker.jpg"
              className="kenburns aspect-video rounded-xl shadow-[0_30px_70px_-30px_rgba(20,18,15,0.5)] ring-1 ring-line"
            >
              <span className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 font-body text-xs font-semibold text-bone">
                <span className="h-1.5 w-1.5 rounded-full bg-bone" />
                Winner
              </span>
            </VideoTile>
          </div>
        </motion.div>

        {/* Second film clip filling the lower-right */}
        <motion.div
          style={{ y: reduce ? 0 : ySecond }}
          className="absolute bottom-0 right-0 w-[54%] -rotate-2"
        >
          <div className="float-slower">
            <VideoTile
              src="/media/clip-car.mp4"
              poster="/media/poster-car.jpg"
              className="kenburns aspect-video rounded-xl shadow-[0_30px_70px_-30px_rgba(20,18,15,0.5)] ring-1 ring-line"
            />
          </div>
        </motion.div>

        {/* UGC vertical clip overlapping in front */}
        <motion.div
          style={{ y: reduce ? 0 : yUgc }}
          className="absolute bottom-0 left-0 w-[40%] -rotate-3 md:left-2"
        >
          <div className="float-slow">
            <VideoTile
              src="/media/clip-ugc.mp4"
              poster="/media/poster-ugc.jpg"
              className="kenburns aspect-[9/16] rounded-xl shadow-[0_30px_70px_-30px_rgba(20,18,15,0.55)] ring-1 ring-line"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
