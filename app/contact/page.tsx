export const metadata = {
  title: "Contact",
  description: "Contact Refrig'Air Systèmes: devis, audit, accompagnement technique pour climatisation de précision et froid industriel à Paris et en Île‑de‑France.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact",
    description: "Climatisation de précision et froid industriel (Paris/IDF).",
    url: "/contact",
  },
  twitter: {
    title: "Contact",
    description: "Devis et audit HVAC (Paris/IDF).",
  }
}
import ShaderBackground from "../../components/shader-background"
import ContactSections from "../../components/contact-sections"
import ContactHeroContent from "../../components/contact-hero-content"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground videoUrl="/images/contact/contact.webm" />
        </div>

        {/* Contenu par-dessus */}
        <ContactHeroContent />
      </div>

      <ContactSections />
    </div>
  )
}
