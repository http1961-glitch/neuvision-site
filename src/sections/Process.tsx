import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"

const STEPS = [
  {
    numeral: "01",
    title: "Generate",
    tags: "hooks · edits · voices · pacing",
    description:
      "We produce dozens of AI variants off the same brief: different hooks, edits, voices, and pacing.",
  },
  {
    numeral: "02",
    title: "Test",
    tags: "real audiences · zero media waste",
    description:
      "Every variant runs against real audience data before a single dollar goes into media spend.",
  },
  {
    numeral: "03",
    title: "Scale",
    tags: "1 winner takes the budget",
    description:
      "Budget shifts entirely to whichever cut the data proves performs, then we push it further.",
  },
]

// 12 distinct frames from past generations; the winner sits bottom-right.
const TILES = [
  "funnel-1",
  "poster-apparel",
  "poster-sneaker",
  "poster-skincare",
  "variant-1",
  "variant-3",
  "poster-car",
  "variant-4",
  "poster-beverage",
  "variant-5",
  "funnel-11",
  "variant-6",
].map((name, i) => ({ id: i, src: `/media/${name}.jpg` }))
const WINNER = 11
const CAPTIONS = [
  "24 variants generated off one brief",
  "23 eliminated by audience data",
  "1 winner takes the media budget",
]

/** The variant funnel: a grid of cuts that gets culled by data until one scales. */
function FunnelViz({ stage, still = false }: { stage: number; still?: boolean }) {
  const [views, setViews] = useState(still ? 2.4 : 0)

  useEffect(() => {
    if (still) return
    if (stage !== 2) {
      setViews(0)
      return
    }
    let raf = 0
    const t0 = performance.now()
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1400, 1)
      setViews(Math.round(2.4 * (1 - Math.pow(1 - p, 3)) * 10) / 10)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [stage, still])

  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-[0_25px_60px_-40px_rgba(20,18,15,0.4)] md:p-5">
      <div className="relative">
        <div className="grid grid-cols-4 gap-1.5 md:gap-2">
          {TILES.map((tile, i) => {
            const isWinner = i === WINNER
            return (
              <motion.div
                key={tile.id}
                initial={still ? false : { opacity: 0, scale: 0.6 }}
                animate={
                  stage === 0
                    ? { opacity: 1, scale: 1, filter: "grayscale(0)" }
                    : stage === 1
                      ? isWinner
                        ? { opacity: 1, scale: 1.06, filter: "grayscale(0)" }
                        : { opacity: 0.22, scale: 0.94, filter: "grayscale(1)" }
                      : { opacity: 0, scale: 0.85, filter: "grayscale(1)" }
                }
                transition={{
                  duration: still ? 0 : 0.45,
                  delay: still ? 0 : (stage === 2 ? 0 : i * 0.05),
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`aspect-video overflow-hidden rounded-md ${
                  isWinner && stage === 1 ? "ring-2 ring-amber" : "ring-1 ring-line"
                }`}
              >
                <img
                  src={tile.src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            )
          })}
        </div>

        {/* Winner takes the panel */}
        <AnimatePresence>
          {stage === 2 && (
            <motion.div
              initial={
                still
                  ? false
                  : { opacity: 0, scale: 0.35, originX: 1, originY: 1 }
              }
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
              transition={{ duration: still ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 overflow-hidden rounded-lg ring-2 ring-amber"
            >
              <img
                src="/media/variant-6.jpg"
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-body text-xs font-medium text-bone shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                Winner
                <span className="font-mono text-amber-soft">
                  {views.toFixed(1)}M views
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 h-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={still ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[11px] uppercase tracking-widest text-ink-faint"
          >
            {CAPTIONS[stage]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Step({
  index,
  step,
  active,
  onActivate,
}: {
  index: number
  step: (typeof STEPS)[number]
  active: boolean
  onActivate: (i: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-42% 0px -42% 0px" })

  useEffect(() => {
    if (inView) onActivate(index)
  }, [inView, index, onActivate])

  return (
    <div
      ref={ref}
      className={`flex flex-col justify-center py-14 transition-opacity duration-500 md:min-h-[380px] md:py-0 ${
        active ? "opacity-100" : "md:opacity-30"
      }`}
    >
      <span
        className={`font-display text-6xl font-bold transition-colors duration-500 md:text-7xl ${
          active ? "text-amber" : "text-ink/10"
        }`}
      >
        {step.numeral}
      </span>
      <h3 className="mt-4 font-display text-2xl font-bold text-ink md:text-3xl">
        {step.title}
      </h3>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-ink-faint">
        {step.tags}
      </p>
      <p className="mt-3 max-w-md font-body text-base leading-relaxed text-ink-soft">
        {step.description}
      </p>

      {/* Mobile: each step carries its own frame of the funnel */}
      <div className="mt-8 md:hidden">
        <FunnelViz stage={index} still />
      </div>
    </div>
  )
}

export function Process() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)

  return (
    <section
      id="process"
      className="border-y border-line bg-bone-dim/60 px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
          How it works
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-ink md:text-4xl">
          Data decides what scales.
        </h2>

        <div className="mt-6 md:mt-10 md:grid md:grid-cols-[1fr_1.05fr] md:gap-16 lg:gap-24">
          {/* Steps */}
          <div className="divide-y divide-line md:divide-y-0">
            {STEPS.map((step, i) => (
              <Step
                key={step.numeral}
                index={i}
                step={step}
                active={reduce ? true : active === i}
                onActivate={setActive}
              />
            ))}
          </div>

          {/* Sticky funnel panel (desktop) */}
          <div className="hidden md:block">
            <div className="sticky top-28">
              <FunnelViz stage={active} still={!!reduce} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
