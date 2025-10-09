export const metadata = {
  title: "Climatisation & Froid industriel à Paris | Refrig'Air Systèmes",
  description: "Climatisation de précision et froid industriel à Paris/IDF pour data centers, laboratoires, industrie et retail. Maintenance 24/7, SLA ≤ 4h, conformité HACCP/GDP.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Climatisation & Froid industriel à Paris | Refrig'Air Systèmes",
    description: "Solutions HVAC premium: climatisation de précision, froid industriel, maintenance 24/7, conformité HACCP/GDP.",
    url: "/",
  },
  twitter: {
    title: "Climatisation & Froid industriel",
    description: "HVAC premium, maintenance 24/7, conformité HACCP/GDP.",
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