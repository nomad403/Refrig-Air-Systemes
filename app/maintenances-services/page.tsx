export const metadata = {
  title: "Maintenance HVAC & Services",
  description: "Contrats de maintenance HVAC: préventive, corrective, prédictive. Astreinte 24/7, SLA ≤ 4h, optimisation énergétique et traçabilité pour installations critiques.",
  alternates: { canonical: "/maintenances-services" },
  openGraph: {
    title: "Maintenance HVAC & Services",
    description: "Astreinte 24/7, SLA ≤ 4h, optimisation énergétique, traçabilité.",
    url: "/maintenances-services",
  },
  twitter: {
    title: "Maintenance & Services",
    description: "SLA ≤ 4h, 24/7, optimisation énergétique.",
  }
}
import ShaderBackground from "../../components/shader-background"
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

        {/* Contenu par-dessus */}
        <MaintenanceHeroContent />
      </div>

      <MaintenanceSections />
    </div>
  )
}
