export const metadata = {
  title: "Maintenance HVAC & Services 24/7 | Paris - SLA ≤ 4h",
  description: "Contrats de maintenance HVAC: préventive, corrective, prédictive. Interventions 24/7, SLA ≤ 4h, optimisation énergétique et traçabilité pour installations critiques. Maintenance climatisation Paris, froid industriel, data centers, laboratoires. Conformité HACCP, traçabilité complète.",
  keywords: [
    'maintenance climatisation Paris', 'maintenance froid industriel', 'maintenance HVAC 24/7',
    'SLA 4h', 'maintenance préventive', 'maintenance corrective', 'maintenance prédictive',
    'optimisation énergétique', 'maintenance data center', 'maintenance laboratoire',
    'contrat maintenance climatisation', 'intervention urgence climatisation', 'réparation climatisation Paris'
  ],
  alternates: { canonical: "/maintenances-services" },
  openGraph: {
    title: "Maintenance HVAC & Services 24/7 | Paris - SLA ≤ 4h",
    description: "Interventions 24/7, SLA ≤ 4h, optimisation énergétique, traçabilité. Maintenance préventive, corrective, prédictive pour installations critiques.",
    url: "https://ras-energies.com/maintenances-services",
    siteName: "Refrig'Air Systèmes",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maintenance & Services 24/7",
    description: "SLA ≤ 4h, 24/7, optimisation énergétique, traçabilité complète.",
  }
}
import ShaderBackground from "../../components/shader-background"
import MaintenanceSections from "../../components/maintenance-sections"
import MaintenanceHeroContent from "../../components/maintenance-hero-content"

export default function MaintenanceServicesPage() {
  // Structured Data pour Services de Maintenance
  const maintenanceServiceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Maintenance HVAC 24/7",
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
      }
    },
    "areaServed": {
      "@type": "City",
      "name": "Paris"
    },
    "description": "Contrats de maintenance HVAC: préventive, corrective, prédictive. Interventions 24/7, SLA ≤ 4h, optimisation énergétique et traçabilité pour installations critiques.",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services de Maintenance HVAC",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Maintenance préventive",
            "description": "Maintenance préventive avec planning personnalisé et traçabilité complète"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Maintenance corrective 24/7",
            "description": "Interventions d'urgence 24/7 avec SLA ≤ 4h"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Maintenance prédictive",
            "description": "Supervision et maintenance prédictive avec optimisation énergétique"
          }
        }
      ]
    }
  }

  return (
    <>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(maintenanceServiceStructuredData) }}
      />
      
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground videoUrl="/images/maintenances_services/maintenance.webm" />
        </div>

        {/* Contenu par-dessus */}
        <MaintenanceHeroContent />
      </div>

      <MaintenanceSections />
    </>
  )
}
