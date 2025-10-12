export const metadata = {
  title: "Climatisation & Froid industriel à Paris | Refrig'Air Systèmes",
  description: "Climatisation de précision et froid industriel à Paris/IDF pour data centers, laboratoires, industrie, retail et froid commercial. Installations très haute technicité, très basse température, salles blanches, vitrines réfrigérées, maintenance 24/7, SLA ≤ 4h, conformité HACCP.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Climatisation & Froid industriel à Paris | Refrig'Air Systèmes",
    description: "Solutions HVAC premium: climatisation de précision, froid industriel, installations très haute technicité, très basse température, salles blanches, froid commercial, vitrines réfrigérées, maintenance 24/7, conformité HACCP.",
    url: "/",
  },
  twitter: {
    title: "Climatisation & Froid industriel",
    description: "HVAC premium, installations très haute technicité, très basse température, salles blanches, froid commercial, vitrines réfrigérées, maintenance 24/7, conformité HACCP.",
  },
}
import HeroContent from "@/components/hero-content"
import HomeSections from "@/components/home-sections"
import ShaderBackground from "@/components/shader-background"

export default function ShaderShowcase() {
  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground />
        </div>

        {/* Contenu par-dessus */}
        <HeroContent />
      </div>

      <HomeSections />
    </>
  )
}