import { Nav } from "../components/Nav"
import { RevealHero } from "../sections/RevealHero"
import { Hero } from "../sections/Hero"
import { Marquee } from "../sections/Marquee"
import { VariantShowcase } from "../sections/VariantShowcase"
import { Services } from "../sections/Services"
import { Process } from "../sections/Process"
import { Stats } from "../sections/Stats"
import { WorkGallery } from "../sections/WorkGallery"
import { About } from "../sections/About"
import { CtaSection } from "../sections/CtaSection"
import { Footer } from "../sections/Footer"

export function Home() {
  return (
    <div className="min-h-dvh bg-bone">
      <Nav />
      <main>
        <RevealHero />
        <Hero />
        <Marquee />
        <VariantShowcase />
        <Services />
        <Process />
        <Stats />
        <WorkGallery preview />
        <About />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}
