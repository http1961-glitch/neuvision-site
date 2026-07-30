import { useEffect } from "react"

type PageMeta = {
  title: string
  description: string
  jsonLd?: object[]
}

/** Sets document title + meta description + JSON-LD for the active page,
 *  restoring the previous values on unmount (SPA has no per-route SSR). */
export function usePageMeta({ title, description, jsonLd }: PageMeta) {
  const jsonLdKey = jsonLd ? JSON.stringify(jsonLd) : ""

  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    const prevDescription = meta?.getAttribute("content") ?? null
    if (!meta) {
      meta = document.createElement("meta")
      meta.setAttribute("name", "description")
      document.head.appendChild(meta)
    }
    meta.setAttribute("content", description)

    const scripts = (jsonLd ?? []).map((data) => {
      const script = document.createElement("script")
      script.type = "application/ld+json"
      script.textContent = JSON.stringify(data)
      document.head.appendChild(script)
      return script
    })

    return () => {
      document.title = prevTitle
      if (prevDescription !== null) meta?.setAttribute("content", prevDescription)
      scripts.forEach((s) => s.remove())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, jsonLdKey])
}
