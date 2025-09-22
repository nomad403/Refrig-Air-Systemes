import ShaderBackground from "../../components/shader-background"
import Header from "../../components/header"
import MaintenanceSections from "../../components/maintenance-sections"
import MaintenanceHeroContent from "../../components/maintenance-hero-content"

export default function MaintenanceServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground videoId="v3_jWMVVYhw" />
        </div>

        {/* Header qui blend avec ce fond */}
        <Header />

        {/* Contenu par-dessus */}
        <MaintenanceHeroContent />
      </div>

      <MaintenanceSections />
    </div>
  )
}
