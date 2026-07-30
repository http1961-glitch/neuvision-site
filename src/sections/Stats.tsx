import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

/** Character-by-character reveal, motionsites-style. */
function Typewriter({
  text,
  delay = 0,
  className = "",
}: {
  text: string
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10px" })
  const reduce = useReducedMotion()

  if (reduce) return <span className={className}>{text}</span>

  return (
    <motion.span
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.014, delayChildren: delay },
        },
      }}
    >
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  )
}

const STATS = [
  { value: "40", suffix: "M+", label: "Views generated across tested cuts" },
  { value: "1,200", suffix: "+", label: "Variants generated and tested" },
  { value: "3.4", suffix: "×", label: "Median lift of winner over first cut" },
  { value: "7", suffix: "d", label: "Median brief to first batch" },
]

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

/** Odometer digit: rolls a full loop of 0-9 before settling on the target. */
function RollingDigit({
  digit,
  delay,
  spin,
}: {
  digit: number
  delay: number
  spin: boolean
}) {
  return (
    <span
      className="inline-block overflow-hidden align-baseline"
      style={{ height: "1em" }}
    >
      <span
        className="block"
        style={{
          transform: spin ? `translateY(-${digit + 10}em)` : "translateY(0)",
          transition: `transform 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        }}
      >
        {DIGITS.map((d, i) => (
          <span key={i} className="block" style={{ height: "1em", lineHeight: "1em" }}>
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

function StatItem({ stat }: { stat: (typeof STATS)[number] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      className="flex flex-col"
    >
      <p
        ref={ref}
        className="font-display text-4xl font-bold leading-none tracking-tight text-bone md:text-5xl lg:text-[54px]"
      >
        {reduce
          ? stat.value
          : stat.value.split("").map((ch, i) =>
              /\d/.test(ch) ? (
                <RollingDigit
                  key={i}
                  digit={Number(ch)}
                  delay={i * 0.08}
                  spin={inView}
                />
              ) : (
                <span key={i}>{ch}</span>
              ),
            )}
        <span className="text-amber">{stat.suffix}</span>
      </p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-bone/40 md:text-xs">
        {stat.label}
      </p>
    </motion.div>
  )
}

// The Neuvision "N", used as a video mask.
const N_MASK = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext x='50' y='84' font-family='Arial, Helvetica, sans-serif' font-weight='900' font-size='108' text-anchor='middle'%3EN%3C/text%3E%3C/svg%3E")`

export function Stats() {
  const reduce = useReducedMotion()

  return (
    <section className="w-full overflow-hidden border-t border-white/10 bg-ink px-6 py-16 text-bone md:px-12 md:py-24 lg:px-[100px]">
      <div className="mx-auto flex w-full max-w-[1380px] flex-col items-stretch gap-16 lg:flex-row lg:gap-[120px]">
        {/* Left: heading + stats */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
          }}
          className="flex flex-1 flex-col justify-center"
        >
          <h2 className="mb-6 max-w-full font-display text-[clamp(1.6rem,4vw,3.4rem)] font-bold uppercase leading-[1.08] tracking-tight">
            <Typewriter text="Built to find" />
            <br />
            <span className="font-playfair font-normal normal-case italic text-amber">
              <Typewriter text="the one that wins." delay={0.3} />
            </span>
          </h2>
          <p className="mb-14 max-w-lg font-body text-base font-light leading-relaxed text-bone/40 md:text-lg">
            <Typewriter
              text="Every engagement runs on the same testing engine. These are the targets we hold ourselves to."
              delay={0.15}
            />
          </p>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
            }}
            className="grid grid-cols-2 gap-8 md:gap-x-16 lg:gap-x-20"
          >
            {STATS.map((stat) => (
              <StatItem key={stat.label} stat={stat} />
            ))}
          </motion.div>

          <p className="mt-12 font-mono text-[10px] uppercase tracking-widest text-bone/25">
            Illustrative targets. Replaced with audited numbers per engagement.
          </p>
        </motion.div>

        {/* Right: footage playing inside the brand N */}
        <div className="flex shrink-0 items-center justify-center lg:w-[42%] lg:justify-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1.08 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="aspect-square w-full max-w-[440px] origin-center lg:max-w-[560px]"
            style={{
              WebkitMaskImage: N_MASK,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: N_MASK,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          >
            <video
              src="/media/variant-6.mp4"
              poster="/media/variant-6.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
