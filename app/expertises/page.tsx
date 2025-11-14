export const metadata = {
  title: "Expertises HVAC - Climatisation & Froid industriel | Paris",
  description: "Expertises HVAC: climatisation de précision, froid industriel, installations très haute technicité, très basse température, salles blanches, froid commercial, vitrines réfrigérées. Solutions pour data centers, laboratoires, agroalimentaire et tertiaire. Partenaire certifié des leaders mondiaux : Daikin, Carrier, Trane, Johnson Controls, Mitsubishi Electric.",
  keywords: [
    'expertise HVAC', 'climatisation de précision', 'froid industriel', 'installations très haute technicité', 
    'très basse température', 'salles blanches', 'froid commercial', 'vitrines réfrigérées', 'data center', 
    'laboratoire', 'agroalimentaire', 'maintenance HVAC', 'Paris', 'Île-de-France',
    'climatisation data center Paris', 'climatisation laboratoire', 'froid industriel agroalimentaire',
    'installation VRV', 'groupe eau glacée', 'CTA', 'ventilation industrielle', 'salle blanche climatisation'
  ],
  alternates: { canonical: "/expertises" },
  openGraph: {
    title: "Expertises HVAC - Climatisation & Froid industriel | Paris",
    description: "Domaines: data centers, laboratoires, agroalimentaire, tertiaire. Installations très haute technicité, très basse température, salles blanches. Partenaire certifié des leaders mondiaux.",
    url: "https://ras-energies.com/expertises",
    siteName: "Refrig'Air Systèmes",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expertises HVAC - Climatisation & Froid industriel",
    description: "Climatisation de précision, froid industriel, installations très haute technicité, maintenance prédictive.",
  }
}
import ShaderBackground from "../../components/shader-background"
import ExpertiseSections from "../../components/expertise-sections"
import ExpertiseHeroContent from "../../components/expertise-hero-content"

export default function ExpertisesPage() {
  return (
    <>
      {/* JSON-LD Services pour les offres principales */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Climatisation & Froid industriel",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Refrig'Air Systèmes",
            "url": "https://ras-energies.com/",
            "telephone": "+33667809074",
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
            }
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Expertises",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Climatisation de précision" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Froid industriel & chambres froides" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Maintenance préventive & supervision" } },
              { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Dépannage d'urgence 24/7" } }
            ]
          }
        }) }}
      />
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground videoUrl="/images/expertises/expertise.webm" />
        </div>

        {/* Contenu par-dessus */}
        <ExpertiseHeroContent />
      </div>

      <ExpertiseSections />
    </>
  )
}
