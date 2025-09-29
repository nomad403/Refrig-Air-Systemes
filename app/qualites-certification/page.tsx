import Header from "@/components/header"
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

        {/* Header qui blend avec ce fond */}
        <Header />

        {/* Contenu hero par-dessus */}
        <QualitesHeroContent />
      </div>

      {/* Sections de contenu */}
      <QualitesSections />
    </>
  )
}

