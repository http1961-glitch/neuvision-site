import { motion, useReducedMotion } from "motion/react"
import { X, Check } from "@phosphor-icons/react"

const PAIRS = [
  {
    old: "One concept, one bet",
    neu: "Dozens of variants, one confirmed winner",
  },
  {
    old: "Weeks of production before you see anything",
    neu: "Days from brief to live tests",
  },
  {
    old: "Success judged by opinion in a room",
    neu: "Success judged by real audience data",
  },
]

export function About() {
  const reduce = useReducedMotion()

  return (
    <section id="about" className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl"
      >
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-ink md:text-4xl">
          Built different from a traditional agency.
        </h2>
        <p className="mt-5 font-body text-base leading-relaxed text-ink-soft">
          Most agencies pitch one concept, produce it, and hope. We generate
          many, test them against real audiences, and only put budget behind
          what the data proves works.
        </p>
      </motion.div>

      <div className="relative mt-14 grid gap-8 md:grid-cols-2 md:gap-14">
        {/* VS badge on the divider */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center md:flex">
          <motion.span
            initial={reduce ? false : { scale: 0, rotate: -120 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.4 }}
            className="rounded-full border border-line bg-bone px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-ink-faint shadow-sm"
          >
            vs
          </motion.span>
        </div>

        {/* The old way: struck out one by one */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: {},
            visible: { transition: {} },
          }}
          className="relative rounded-2xl border border-dashed border-line bg-bone-dim/40 p-7 md:p-9"
        >
          {/* Stamped once every line is struck */}
          {!reduce && (
            <motion.span
              aria-hidden
              variants={{
                hidden: { opacity: 0, scale: 2.2, rotate: -14 },
                visible: {
                  opacity: 0.85,
                  scale: 1,
                  rotate: -10,
                  transition: { delay: 1.35, duration: 0.22, ease: "easeIn" },
                },
              }}
              className="absolute right-6 top-6 rounded border-2 border-ink-faint/60 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint/80"
            >
              Rejected
            </motion.span>
          )}
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            The old way
          </p>
          <ul className="mt-6 space-y-6">
            {PAIRS.map((pair, i) => (
              <li key={pair.old} className="flex min-h-[52px] items-center gap-3">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, scale: 0.5 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.15 + i * 0.25, duration: 0.3 },
                    },
                  }}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink-faint/40 text-ink-faint"
                >
                  <X size={12} weight="bold" />
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.1 + i * 0.25, duration: 0.4 },
                    },
                  }}
                  className={`relative font-body text-base text-ink-soft/80 ${
                    reduce ? "line-through decoration-ink-faint/50" : ""
                  }`}
                >
                  {pair.old}
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      variants={{
                        hidden: { scaleX: 0 },
                        visible: {
                          scaleX: 1,
                          transition: {
                            delay: 0.5 + i * 0.25,
                            duration: 0.45,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                      className="absolute left-0 top-1/2 h-px w-full origin-left bg-ink-faint/70"
                    />
                  )}
                </motion.span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* The Neuvision way: the winner card */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={{
            hidden: { opacity: 0, y: 24, scale: 0.98 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          whileHover={reduce ? undefined : { y: -6 }}
          className="rounded-2xl bg-ink p-7 ring-1 ring-amber/50 shadow-[0_30px_70px_-30px_rgba(217,123,46,0.5)] transition-shadow duration-300 hover:shadow-[0_35px_80px_-30px_rgba(217,123,46,0.7)] md:p-9"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
              The Neuvision way
            </p>
            <span className="flex items-center gap-1.5 rounded-full bg-amber px-3 py-1 font-body text-xs font-semibold text-bone">
              <span className="h-1.5 w-1.5 rounded-full bg-bone" />
              Winner
            </span>
          </div>
          <ul className="mt-6 space-y-6">
            {PAIRS.map((pair, i) => (
              <li key={pair.neu} className="flex min-h-[52px] items-center gap-3">
                <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      variants={{
                        hidden: { opacity: 0, scale: 1 },
                        visible: {
                          opacity: [0, 0.7, 0],
                          scale: [1, 2.1],
                          transition: { delay: 0.75 + i * 0.25, duration: 0.7 },
                        },
                      }}
                      className="absolute inset-0 rounded-full bg-amber"
                    />
                  )}
                  <motion.span
                    variants={{
                      hidden: { opacity: 0, scale: 0.4 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                          delay: 0.65 + i * 0.25,
                          type: "spring",
                          stiffness: 320,
                          damping: 15,
                        },
                      },
                    }}
                    className="relative flex h-6 w-6 items-center justify-center rounded-full bg-amber text-bone"
                  >
                    <Check size={12} weight="bold" />
                  </motion.span>
                </span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: { delay: 0.7 + i * 0.25, duration: 0.4 },
                    },
                  }}
                  className="font-body text-base font-medium text-bone"
                >
                  {pair.neu}
                </motion.span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
