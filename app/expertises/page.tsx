export const metadata = {
  title: "Nos Expertises HVAC",
  description: "Expertises HVAC: climatisation de précision, froid industriel, chambres froides, supervision 24/7 et maintenance prédictive. Solutions pour data centers, laboratoires, agroalimentaire et tertiaire.",
  alternates: { canonical: "/expertises" },
  openGraph: {
    title: "Nos Expertises HVAC",
    description: "Domaines: data centers, laboratoires, agroalimentaire, tertiaire. Maintenance et supervision 24/7.",
    url: "/expertises",
  },
  twitter: {
    title: "Nos Expertises",
    description: "Climatisation de précision, froid industriel, maintenance prédictive.",
  }
}
import ShaderBackground from "../../components/shader-background"
import ExpertiseSections from "../../components/expertise-sections"
import ExpertiseHeroContent from "../../components/expertise-hero-content"

export default function ExpertisesPage() {
  return (
    <div className="min-h-screen">
      {/* JSON-LD Services pour les offres principales */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "Climatisation & Froid industriel",
          "provider": {
            "@type": "Organization",
            "name": "Refrig'Air Systèmes",
            "areaServed": "Île-de-France"
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
          <ShaderBackground videoId="4g9hlpGvdAw" />
        </div>

        {/* Contenu par-dessus */}
        <ExpertiseHeroContent />
      </div>

      <ExpertiseSections />
    </div>
  )
}
