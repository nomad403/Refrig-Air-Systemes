export const metadata = {
  title: "Climatisation & Froid industriel à Paris | Refrig'Air Systèmes",
  description: "Climatisation de précision et froid industriel à Paris/IDF pour data centers, laboratoires, industrie, retail et froid commercial. Installations très haute technicité, très basse température, salles blanches, vitrines réfrigérées, maintenance 24/7, SLA ≤ 4h, conformité HACCP. Partenaire certifié Daikin, Carrier, Trane, Johnson Controls, Mitsubishi Electric.",
  keywords: [
    'climatisation Paris', 'froid industriel Paris', 'climatisation de précision', 'froid commercial Paris',
    'installation climatisation Île-de-France', 'maintenance climatisation 24/7', 'data center climatisation',
    'climatisation laboratoire', 'salle blanche climatisation', 'vitrine réfrigérée', 'meuble froid',
    'très basse température', 'installation très haute technicité', 'SLA 4h', 'conformité HACCP',
    'Daikin Paris', 'Carrier Paris', 'Trane Paris', 'Johnson Controls', 'Mitsubishi Electric',
    'VRV Paris', 'groupe eau glacée', 'CTA', 'ventilation industrielle', 'réparation climatisation'
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Climatisation & Froid industriel à Paris | Refrig'Air Systèmes",
    description: "Solutions HVAC premium: climatisation de précision, froid industriel, installations très haute technicité, très basse température, salles blanches, froid commercial, vitrines réfrigérées, maintenance 24/7, conformité HACCP. Partenaire certifié des leaders mondiaux.",
    url: "https://www.ras-energies.com/",
    siteName: "Refrig'Air Systèmes",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "https://www.ras-energies.com/images/home/hvac.png",
        width: 1200,
        height: 630,
        alt: "Refrig'Air Systèmes — Climatisation & Froid industriel à Paris",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Climatisation & Froid industriel à Paris",
    description: "HVAC premium, installations très haute technicité, très basse température, salles blanches, froid commercial, vitrines réfrigérées, maintenance 24/7, conformité HACCP.",
    images: ["https://www.ras-energies.com/images/home/hvac.png"],
  },
}
import HeroContent from "@/components/hero-content"
import HomeSections from "@/components/home-sections"
import ShaderBackground from "@/components/shader-background"

export default function ShaderShowcase() {
  // Structured Data pour la page d'accueil
  const homepageStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.ras-energies.com/#organization",
    "name": "Refrig'Air Systèmes",
    "image": "https://www.ras-energies.com/images/home/hvac.png",
    "url": "https://www.ras-energies.com/",
    "telephone": "+33667809074",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "149 Avenue du Maine",
      "addressLocality": "Paris",
      "postalCode": "75014",
      "addressRegion": "Île-de-France",
      "addressCountry": "FR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.8333",
      "longitude": "2.3167"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Paris"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Île-de-France"
      }
    ],
    "serviceType": [
      "Climatisation de précision",
      "Froid industriel",
      "Froid commercial",
      "Installations très haute technicité",
      "Maintenance HVAC",
      "Installation VRV",
      "Groupe eau glacée",
      "Salles blanches",
      "Vitrines réfrigérées"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services HVAC",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Climatisation de précision pour data centers",
            "description": "Installation et maintenance de systèmes de climatisation de précision pour data centers avec SLA ≤ 4h"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Froid industriel et commercial",
            "description": "Installation de systèmes de froid industriel et commercial, vitrines réfrigérées, meubles froids"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Maintenance préventive et corrective 24/7",
            "description": "Contrats de maintenance avec interventions 24/7, SLA ≤ 4h, optimisation énergétique"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  }

  return (
    <>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />
      
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground 
            videoUrl="/images/home/home.webm" 
            videoStyle={{ transform: "scale(1.12) translateY(-4%)", transformOrigin: "center center" }}
          />
        </div>

        {/* Contenu par-dessus */}
        <HeroContent />
      </div>

      <HomeSections />
    </>
  )
}