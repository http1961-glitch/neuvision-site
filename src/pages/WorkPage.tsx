import { useEffect } from "react"
import { Nav } from "../components/Nav"
import { WorkGallery } from "../sections/WorkGallery"
import { Footer } from "../sections/Footer"

export function WorkPage() {
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
