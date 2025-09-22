import ShaderBackground from "../../components/shader-background"
import Header from "../../components/header"
import ExpertiseSections from "../../components/expertise-sections"
import ExpertiseHeroContent from "../../components/expertise-hero-content"

export default function ExpertisesPage() {
  return (
    <div className="min-h-screen">
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground videoId="T2wx-YBRLL4" />
        </div>

        {/* Header qui blend avec ce fond */}
        <Header />

        {/* Contenu par-dessus */}
        <ExpertiseHeroContent />
      </div>

      <ExpertiseSections />
    </div>
  )
}
