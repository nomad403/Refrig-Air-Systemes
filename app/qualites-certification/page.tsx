export const metadata = {
  title: "Qualités & Certifications HVAC | C2E, RGE, HACCP, Qualifelec",
  description: "Qualités & certifications: C2E, RGE, HACCP, Qualifelec, Attestation Capacité Fluides Frigorigènes. Garanties et conformité pour vos installations HVAC critiques (data centers, laboratoires, industrie). Partenaire certifié des leaders mondiaux : Daikin, Carrier, Trane, Johnson Controls, Mitsubishi Electric.",
  keywords: [
    'certification RGE', 'certification C2E', 'conformité HACCP', 'Qualifelec',
    'attestation fluides frigorigènes', 'certification climatisation', 'certification froid industriel',
    'garantie installation HVAC', 'conformité data center', 'certification laboratoire',
    'partenaire certifié Daikin', 'partenaire certifié Carrier', 'partenaire certifié Trane'
  ],
  alternates: { canonical: "/qualites-certification" },
  openGraph: {
    title: "Qualités & Certifications HVAC | C2E, RGE, HACCP, Qualifelec",
    description: "Excellence et conformité pour installations critiques. Certifications C2E, RGE, HACCP, Qualifelec. Partenaire certifié des leaders mondiaux.",
    url: "https://ras-energies.com/qualites-certification",
    siteName: "Refrig'Air Systèmes",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://ras-energies.com/images/home/hvac.png",
        width: 1200,
        height: 630,
        alt: "Refrig'Air Systèmes — Qualités & Certifications",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qualités & Certifications",
    description: "C2E, RGE, HACCP, Qualifelec. Partenaire certifié des leaders mondiaux.",
    images: ["https://ras-energies.com/images/home/hvac.png"],
  }
}
import QualitesHeroContent from "@/components/qualites-hero-content"
import QualitesSections from "@/components/qualites-sections"
import ShaderBackground from "@/components/shader-background"

export default function QualitesCertificationPage() {
  // Structured Data pour Certifications
  const certificationsStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Refrig'Air Systèmes",
    "url": "https://ras-energies.com/",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "149 Avenue du Maine",
      "addressLocality": "Paris",
      "postalCode": "75014",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Certification",
        "name": "RGE (Reconnu Garant de l'Environnement)"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Certification",
        "name": "C2E (Certificat d'Économie d'Énergie)"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Certification",
        "name": "HACCP (Hazard Analysis Critical Control Points)"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Certification",
        "name": "Qualifelec"
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Certification",
        "name": "Attestation Capacité Fluides Frigorigènes"
      }
    ],
    "memberOf": [
      {
        "@type": "Organization",
        "name": "Partenaire certifié Daikin"
      },
      {
        "@type": "Organization",
        "name": "Partenaire certifié Carrier"
      },
      {
        "@type": "Organization",
        "name": "Partenaire certifié Trane"
      },
      {
        "@type": "Organization",
        "name": "Partenaire certifié Johnson Controls"
      },
      {
        "@type": "Organization",
        "name": "Partenaire certifié Mitsubishi Electric"
      }
    ]
  }

  return (
    <>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(certificationsStructuredData) }}
      />
      
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

