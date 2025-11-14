export const metadata = {
  title: "Contact & Devis Gratuit | Climatisation & Froid industriel Paris",
  description: "Contact Refrig'Air Systèmes: devis gratuit, audit technique, accompagnement pour climatisation de précision et froid industriel à Paris et en Île‑de‑France. Intervention rapide, expertise technique, solutions sur mesure pour data centers, laboratoires, industrie, retail.",
  keywords: [
    'devis climatisation Paris', 'devis froid industriel', 'audit technique climatisation',
    'contact installateur climatisation', 'devis gratuit HVAC', 'expertise climatisation Paris',
    'accompagnement technique', 'étude climatisation', 'conseil installation froid industriel'
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Devis Gratuit | Climatisation & Froid industriel Paris",
    description: "Devis gratuit, audit technique, accompagnement pour climatisation de précision et froid industriel à Paris et en Île‑de‑France.",
    url: "https://ras-energies.com/contact",
    siteName: "Refrig'Air Systèmes",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact & Devis Gratuit",
    description: "Devis gratuit, audit technique, accompagnement HVAC (Paris/IDF).",
  }
}
import ShaderBackground from "../../components/shader-background"
import ContactSections from "../../components/contact-sections"
import ContactHeroContent from "../../components/contact-hero-content"

export default function ContactPage() {
  // Structured Data pour ContactPage
  const contactPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Refrig'Air Systèmes",
      "url": "https://ras-energies.com/",
      "telephone": "+33667809074",
      "email": "contact@refrigairsystemes.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "149 Avenue du Maine",
        "addressLocality": "Paris",
        "postalCode": "75014",
        "addressRegion": "Île-de-France",
        "addressCountry": "FR"
      },
      "areaServed": {
        "@type": "City",
        "name": "Paris"
      },
      "priceRange": "$$$"
    }
  }

  return (
    <>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageStructuredData) }}
      />
      
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
    </>
  )
}
