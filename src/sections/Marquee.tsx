import { useReducedMotion } from "motion/react"

const ITEMS = [
  "AI TVC",
  "AI Film",
  "AI UGC",
  "Paid Social",
  "CTV",
  "TikTok",
  "YouTube",
  "Meta",
  "Broadcast",
]

export function Marquee() {
  const reduce = useReducedMotion()

  return (
    <section
      aria-label="Formats and platforms we ship to"
      className="overflow-hidden border-y border-line bg-ink py-5"
    >
      <div
        className={`flex w-max ${reduce ? "" : "animate-[marquee_28s_linear_infinite]"}`}
      >
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center gap-10 px-5"
            aria-hidden={dup === 1}
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-10 font-display text-lg font-medium uppercase tracking-tight text-bone/80"
              >
                {item}
                <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
