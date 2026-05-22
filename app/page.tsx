import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CerebroSection } from "@/components/cerebro-section"
import { ImpactoSection } from "@/components/impacto-section"
import { PsicologiaSection } from "@/components/psicologia-section"
import { OportunidadSection } from "@/components/oportunidad-section"
import { MetacognicionSection } from "@/components/metacognicion-section"
import { BrechaSection } from "@/components/brecha-section"
import { ConsecuenciasSection } from "@/components/consecuencias-section"
import { EducacionSection } from "@/components/educacion-section"
import { QuienesSomosSection } from "@/components/quienes-somos-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Navigation />
      <HeroSection />
      <CerebroSection />
      <ImpactoSection />
      <PsicologiaSection />
      <OportunidadSection />
      <MetacognicionSection />
      <BrechaSection />
      <ConsecuenciasSection />
      <EducacionSection />
      <QuienesSomosSection />
      <Footer />
    </main>
  )
}
