import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "@phosphor-icons/react"
import { VideoTile } from "../components/VideoTile"
import { WORKS, WORK_CATEGORIES, type Category } from "../data/works"

const PREVIEW_LIMIT = 6

export function WorkGallery({ preview = false }: { preview?: boolean }) {
  const [active, setActive] = useState<"All" | Category>("All")
  const reduce = useReducedMotion()

  const filtered =
    active === "All" ? WORKS : WORKS.filter((w) => w.category === active)
  const shown = preview ? filtered.slice(0, PREVIEW_LIMIT) : filtered

  return (
    <section
      id="work"
      className={
        preview
          ? "mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28"
          : "mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-10"
      }
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          {!preview && (
            <Link
              to="/"
              className="mb-4 inline-flex items-center gap-1.5 font-body text-sm text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowRight size={15} weight="bold" className="rotate-180" />
              Back home
            </Link>
          )}
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-ink md:text-5xl">
            {preview ? "Selected work" : "All work"}
          </h2>
          {!preview && (
            <div className="mt-5 max-w-2xl space-y-4">
              <p className="font-body text-base leading-relaxed text-ink-soft">
                Selected productions across AI TVC, film, and UGC. Every piece
                here came out of the same method: we generate a batch of cuts
                from a single brief, test them against real audiences, and scale
                only what the data backs — so nothing on this page is a single
                bet we hoped would land.
              </p>
              <p className="font-body text-base leading-relaxed text-ink-soft">
                The work spans formats on purpose — broadcast-style commercials
                where the brand is the hero, cinematic films where the product
                lives inside a mood, and creator-style UGC built to read as
                authentic in a feed. Concept pieces are labelled as such; we
                don't dress up demos as delivered campaigns.
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {WORK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 font-body text-sm font-medium transition-colors ${
                active === cat
                  ? "bg-ink text-bone"
                  : "border border-ink/20 text-ink-soft hover:border-ink/40 hover:text-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3">
        {shown.map((work, i) => (
          <motion.figure
            key={work.src}
            layout={!reduce}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 break-inside-avoid"
          >
            <VideoTile
              src={work.src}
              poster={work.poster}
              hoverToPlay
              className={`group ${work.portrait ? "aspect-[9/16]" : "aspect-video"} rounded-2xl ring-1 ring-line`}
            >
              <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 font-body text-[11px] font-medium text-bone backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
                Hover to play
              </span>
            </VideoTile>
            <figcaption className="mt-3 flex items-baseline justify-between gap-3">
              <span className="font-display text-base font-bold text-ink">
                {work.title}
              </span>
              <span className="shrink-0 font-body text-xs font-medium uppercase tracking-wide text-amber">
                {work.category}
              </span>
            </figcaption>
            <p className="mt-1 font-body text-sm text-ink-soft">{work.note}</p>
          </motion.figure>
        ))}
      </div>

      {preview && (
        <div className="mt-12 flex justify-center">
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/25 px-8 py-4 font-body text-sm font-medium text-ink transition-colors hover:border-amber/60 hover:text-amber"
          >
            More work
            <ArrowRight
              size={16}
              weight="bold"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      )}
    </section>
  )
}
