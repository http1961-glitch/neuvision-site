import { useEffect } from "react"
import { Nav } from "../components/Nav"
import { WorkGallery } from "../sections/WorkGallery"
import { Footer } from "../sections/Footer"
import { usePageMeta } from "../hooks/usePageMeta"

export function WorkPage() {
  usePageMeta({
    title: "Work — AI TVC, film and UGC | Neuvision",
    description:
      "Selected AI TVC, animation and product work from Neuvision. Every piece came out of a batch that was tested before anything scaled.",
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-dvh bg-bone">
      <Nav />
      <main>
        <WorkGallery />
      </main>
      <Footer />
    </div>
  )
}
