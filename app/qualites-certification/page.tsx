export const metadata = {
  title: "Qualités & Certifications",
  description: "Qualités & certifications: C2E, RGE, HACCP, Qualifelec. Garanties et conformité pour vos installations HVAC critiques (data centers, laboratoires, industrie).",
  alternates: { canonical: "/qualites-certification" },
  openGraph: {
    title: "Qualités & Certifications",
    description: "Excellence et conformité pour installations critiques.",
    url: "/qualites-certification",
  },
  twitter: {
    title: "Qualités & Certifications",
    description: "C2E, RGE, HACCP, Qualifelec.",
  }
}
import QualitesHeroContent from "@/components/qualites-hero-content"
import QualitesSections from "@/components/qualites-sections"
import ShaderBackground from "@/components/shader-background"

export default function QualitesCertificationPage() {
  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond avec image fullscreen */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground 
            backgroundType="image"
            imageUrl="/images/qualites/bg-image.jpeg"
          />
        </div>

        {/* Contenu hero par-dessus */}
        <QualitesHeroContent />
      </div>

      {/* Sections de contenu */}
      <QualitesSections />
    </>
  )
}

