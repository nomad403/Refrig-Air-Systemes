import ShaderBackground from "../../components/shader-background"
import Header from "../../components/header"
import ContactSections from "../../components/contact-sections"
import ContactHeroContent from "../../components/contact-hero-content"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground videoId="c_qmsj_hqJs" />
        </div>

        {/* Header qui blend avec ce fond */}
        <Header />

        {/* Contenu par-dessus */}
        <ContactHeroContent />
      </div>

      <ContactSections />
    </div>
  )
}
