import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { VideoTile } from "../components/VideoTile"
import { useCountUp } from "../components/useCountUp"

// Six genres, one testing engine: films ×2, TVC ×1, brand commercials ×2, winner ×1
const VARIANTS = [
  { src: "/media/variant-1.mp4", poster: "/media/variant-1.jpg" },
  { src: "/media/variant-2.mp4", poster: "/media/variant-2.jpg" },
  { src: "/media/variant-3.mp4", poster: "/media/variant-3.jpg" },
  { src: "/media/variant-4.mp4", poster: "/media/variant-4.jpg" },
  { src: "/media/variant-5.mp4", poster: "/media/variant-5.jpg" },
  { src: "/media/variant-6.mp4", poster: "/media/variant-6.jpg" },
]
const WINNER = 5

export function VariantShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.35 })
  const reduce = useReducedMotion()
  const revealed = reduce ? true : inView
  const views = useCountUp(2_400_000)

  return (
    <section
      id="method"
      ref={sectionRef}
      className="border-y border-line bg-bone-dim/50 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="max-w-2xl font-display text-3xl font-bold uppercase tracking-tight text-ink md:text-5xl">
          Every brief. Dozens of cuts. One winner.
        </h2>
        <p className="mt-4 max-w-md font-body text-base text-ink-soft">
          We do not bet on a single cut. We ship a batch, let the data judge,
          and put the budget behind whatever pulls ahead.
        </p>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {VARIANTS.map((v, i) => {
            const isWinner = i === WINNER
            return (
              <motion.div
                key={v.src + i}
                className="relative"
                animate={
                  revealed
                    ? { scale: isWinner ? 1.04 : 0.97, opacity: isWinner ? 1 : 0.5 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <VideoTile
                  src={v.src}
                  poster={v.poster}
                  className={`aspect-video rounded-xl ring-1 transition-all duration-500 ${
                    isWinner
                      ? "ring-2 ring-amber shadow-[0_25px_60px_-25px_rgba(217,123,46,0.6)]"
                      : "ring-line grayscale"
                  } ${revealed && !isWinner ? "grayscale" : ""}`}
                />
                {isWinner && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={revealed ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="absolute -bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-body text-xs font-medium text-bone shadow-lg"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                    Winner
                    <span className="font-mono text-amber-soft">
                      <span ref={views.ref}>
                        {(views.value / 1_000_000).toFixed(1)}
                      </span>
                      M views
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
          Illustrative. Real campaign numbers replace these per engagement.
        </p>
      </div>
    </section>
  )
}
