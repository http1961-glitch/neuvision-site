import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight } from "@phosphor-icons/react"

const SERVICES = [
  {
    number: "01",
    title: "AI TVC",
    description: "Broadcast-ready commercials in days, not months.",
    cta: "See TVC work",
    src: "/media/clip-car.mp4",
    poster: "/media/poster-car.jpg",
  },
  {
    number: "02",
    title: "AI Film",
    description: "Built for real distribution, not demos.",
    cta: "See film work",
    src: "/media/variant-2.mp4",
    poster: "/media/variant-2.jpg",
  },
  {
    number: "03",
    title: "AI UGC",
    description: "Dozens of creator-style variants, ready to test.",
    cta: "See UGC work",
    src: "/media/clip-ugc.mp4",
    poster: "/media/poster-ugc.jpg",
  },
]

export function Services() {
  const reduce = useReducedMotion()
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-ink md:text-4xl">
          What We Build
        </h2>
        <p className="mt-3 max-w-md font-body text-base text-ink-soft">
          Three formats, one testing engine behind all of them.
        </p>
      </div>

      {/* Full-bleed video panels */}
      <div
        className="mt-12 flex flex-col md:h-[620px] md:flex-row"
        onMouseLeave={() => setHovered(null)}
      >
        {SERVICES.map((service, i) => {
          const isHovered = hovered === i
          const isDimmed = hovered !== null && !isHovered
          return (
            <motion.a
              key={service.title}
              href="#work"
              initial={reduce ? false : { opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHovered(i)}
              className="group relative flex min-h-[380px] flex-col justify-between overflow-hidden p-6 sm:min-h-[440px] sm:p-8 md:min-h-0 md:p-10 md:transition-[flex-grow] md:duration-700 md:ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ flexGrow: reduce ? 1 : isHovered ? 1.7 : 1, flexBasis: 0 }}
            >
              {/* Background video */}
              <video
                src={service.src}
                poster={service.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                  isHovered && !reduce ? "scale-105" : "scale-100"
                }`}
              />
              {/* Grade overlay: darkens siblings, clears on the active panel */}
              <div
                className={`absolute inset-0 transition-colors duration-500 ${
                  isDimmed ? "bg-ink/60" : isHovered ? "bg-ink/10" : "bg-ink/30"
                }`}
              />

              {/* Number */}
              <span className="relative z-10 self-end font-mono text-xs tracking-widest text-bone/70">
                {service.number}
              </span>

              {/* Vertical title, reads bottom-to-top */}
              <h3
                className="absolute left-6 top-6 z-10 font-display text-4xl font-bold uppercase leading-none tracking-tight text-bone transition-transform duration-500 group-hover:-translate-y-2 sm:left-8 sm:top-8 sm:text-5xl md:left-10 md:top-10 md:text-6xl lg:text-7xl"
                style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
              >
                {service.title}
              </h3>

              {/* Bottom block */}
              <div className="relative z-10 mt-auto flex flex-col items-start gap-4">
                <p
                  className={`max-w-[240px] font-body text-sm leading-relaxed text-bone/90 transition-all duration-500 md:max-w-[280px] ${
                    isHovered || reduce
                      ? "translate-y-0 opacity-100"
                      : "md:translate-y-2 md:opacity-0"
                  }`}
                >
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-2 rounded-full bg-bone px-6 py-2.5 font-body text-sm font-medium text-ink transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-amber group-hover:text-bone">
                  {service.cta}
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </div>
            </motion.a>
          )
        })}
      </div>
    </section>
  )
}
