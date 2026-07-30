import { useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check } from "@phosphor-icons/react"

const FORMATS = [
  {
    id: "tvc",
    label: "AI TVC",
    thumbs: ["/media/poster-car.jpg", "/media/variant-1.jpg"],
  },
  {
    id: "film",
    label: "AI Film",
    thumbs: ["/media/variant-2.jpg", "/media/variant-5.jpg"],
  },
  {
    id: "ugc",
    label: "AI UGC",
    thumbs: ["/media/poster-ugc.jpg", "/media/funnel-1.jpg"],
  },
]

export function CtaSection() {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState<string[]>(["tvc"])
  const [product, setProduct] = useState("")
  const [email, setEmail] = useState("")

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  const batch = selected.length * 8
  const thumbs = FORMATS.filter((f) => selected.includes(f.id)).flatMap(
    (f) => f.thumbs,
  )

  const mailto = useMemo(() => {
    const formats = FORMATS.filter((f) => selected.includes(f.id))
      .map((f) => f.label)
      .join(", ")
    const subject = `Project brief — ${product.trim() || "new project"}`
    const body = [
      `What we're shipping: ${product.trim() || "-"}`,
      `Formats: ${formats || "-"}`,
      `First batch to scope: ${batch || 8} variants`,
      `Reply to: ${email.trim() || "-"}`,
    ].join("\n")
    return `mailto:build@neuvision.xyz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }, [selected, product, email, batch])

  return (
    <section id="cta" className="relative overflow-hidden bg-ink px-6 py-24 text-bone md:px-10 md:py-32">
      {/* Footage backdrop */}
      <video
        src="/media/variant-3.mp4"
        poster="/media/variant-3.jpg"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40"
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        {/* Pitch */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber">
            Start a project
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight md:text-6xl">
            Ready to find
            <br />
            <span className="text-amber">what wins?</span>
          </h2>
          <p className="mt-6 max-w-md font-body text-base leading-relaxed text-bone/60 md:text-lg">
            Build your brief on the right — we scope the first batch of
            variants within the week.
          </p>
          <div className="mt-10 hidden gap-8 font-mono text-[11px] uppercase tracking-widest text-bone/40 md:flex">
            <span>01 — Pick formats</span>
            <span>02 — Tell us the product</span>
            <span>03 — Get your scope</span>
          </div>
        </motion.div>

        {/* Brief builder */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32, rotateX: 6 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-bone p-6 text-ink shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] md:p-8"
          style={{ perspective: 800 }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            01 — What do you need?
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {FORMATS.map((f) => {
              const active = selected.includes(f.id)
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => toggle(f.id)}
                  aria-pressed={active}
                  className={`flex items-center gap-1.5 rounded-full px-5 py-2.5 font-body text-sm font-medium transition-all duration-200 active:scale-95 ${
                    active
                      ? "bg-amber text-bone shadow-[0_8px_20px_-8px_rgba(217,123,46,0.8)]"
                      : "border border-ink/20 text-ink hover:border-amber/60 hover:text-amber"
                  }`}
                >
                  {active && <Check size={13} weight="bold" />}
                  {f.label}
                </button>
              )
            })}
          </div>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            02 — What are you shipping?
          </p>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. a sparkling drink launching in the US"
            className="mt-3 w-full rounded-lg border border-line bg-white px-4 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink-faint/70 focus:border-amber"
          />

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            03 — Where do we send the scope?
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@brand.com"
            className="mt-3 w-full rounded-lg border border-line bg-white px-4 py-3 font-body text-sm text-ink outline-none transition-colors placeholder:text-ink-faint/70 focus:border-amber"
          />

          {/* Live batch preview */}
          <div className="mt-7 flex items-center justify-between rounded-xl border border-line bg-bone-dim/60 px-4 py-3">
            <div className="flex items-center">
              <AnimatePresence mode="popLayout">
                {thumbs.slice(0, 6).map((src, i) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt=""
                    initial={reduce ? false : { opacity: 0, scale: 0.4, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.4 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="h-9 w-14 rounded object-cover ring-2 ring-bone"
                    style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i }}
                  />
                ))}
              </AnimatePresence>
              {thumbs.length === 0 && (
                <span className="font-body text-xs text-ink-faint">
                  Pick at least one format
                </span>
              )}
            </div>
            <div className="text-right">
              <AnimatePresence mode="popLayout">
                <motion.p
                  key={batch}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="font-display text-xl font-bold text-ink"
                >
                  {batch || "—"}
                </motion.p>
              </AnimatePresence>
              <p className="font-mono text-[10px] uppercase tracking-widest text-ink-faint">
                variants · first batch
              </p>
            </div>
          </div>

          <a
            href={mailto}
            className={`btn-glow mt-6 flex w-full items-center justify-center gap-2 rounded-full py-4 font-body text-sm font-semibold transition-all ${
              selected.length > 0
                ? "bg-ink text-bone hover:bg-amber"
                : "pointer-events-none bg-ink/30 text-bone/60"
            }`}
          >
            Scope my first batch
            <ArrowRight size={16} weight="bold" />
          </a>
          <p className="mt-3 text-center font-body text-[11px] text-ink-faint">
            Opens your email with the brief pre-filled — nothing gets lost in a
            form.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
