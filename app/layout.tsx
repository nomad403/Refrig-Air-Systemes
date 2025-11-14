import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { PerformanceWrapper } from "@/components/performance-wrapper"
import Breadcrumbs from "@/components/breadcrumbs"

export const metadata: Metadata = {
  metadataBase: new URL("https://ras-energies.com"),
  title: {
    default: "Refrig'Air Systèmes — Climatisation & Froid industriel à Paris",
    template: "%s | Refrig'Air Systèmes",
  },
  description: "Climatisation de précision et froid industriel pour data centers, laboratoires, industrie, retail et froid commercial en Île‑de‑France. Installations très haute technicité, très basse température, salles blanches, vitrines réfrigérées, meubles froids, maintenance 24/7. Partenaire certifié des leaders mondiaux : Daikin, Carrier, Trane, Johnson Controls, Mitsubishi Electric.",
  keywords: [
    'climatisation de précision', 'froid industriel', 'installations très haute technicité', 'très basse température', 'salles blanches',
    'froid commercial', 'vitrines réfrigérées', 'meubles froids', 'data center', 'laboratoire', 'agroalimentaire', 
    'maintenance HVAC', 'Paris', 'Île-de-France', 'VRV', 'CTA', 'eau glacée', 'Daikin', 'Carrier', 'Trane', 
    'Johnson Controls', 'Mitsubishi Electric', 'Danfoss', 'Panasonic', 'Liebherr', 'STULZ', 'Emerson', 'General Electric',
    'installateur climatisation Paris', 'maintenance climatisation', 'réparation climatisation', 'installation froid commercial',
    'système VRV', 'groupe eau glacée', 'ventilation', 'climatisation data center', 'climatisation laboratoire'
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/general/LOGO_FAV.svg",
    shortcut: "/images/general/LOGO_FAV.svg",
    apple: "/images/general/LOGO_FAV.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ras-energies.com/",
    siteName: "Refrig'Air Systèmes",
    title: "Climatisation & Froid industriel | Paris - Partenaire des leaders mondiaux",
    description: "Solutions premium pour environnements critiques: data centers, laboratoires, industrie, retail, installations très haute technicité, très basse température, salles blanches, froid commercial, vitrines réfrigérées. Partenaire certifié Daikin, Carrier, Trane, Johnson Controls, Mitsubishi Electric.",
    images: [
      {
        url: "https://ras-energies.com/images/home/hvac.png",
        width: 1200,
        height: 630,
        alt: "Refrig'Air Systèmes — Climatisation & Froid industriel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refrig'Air Systèmes — Climatisation & Froid industriel",
    description: "Solutions premium pour environnements critiques en Île‑de‑France.",
    images: ["https://ras-energies.com/images/home/hvac.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.nomad403.com" />
        <link rel="canonical" href="https://ras-energies.com/" />
        {/* SEO discret pour développeur web mobile freelance */}
        <link rel="author" href="https://www.nomad403.com" />
        <meta name="web_author" content="Nomad403 - Développeur Web Mobile IA Freelance Paris" />
        <meta name="developer" content="nomad403" />
        <link rel="icon" href="/images/general/LOGO_FAV.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/images/general/LOGO_FAV.svg" type="image/svg+xml" sizes="512x512" />
        <link rel="mask-icon" href="/images/general/LOGO_FAV.svg" color="#537FE7" />
        <link rel="apple-touch-icon" href="/images/general/LOGO_FAV.svg" sizes="512x512" />
        {/* Preloads vidéo retirés : chargement lazy uniquement quand visible pour économiser la bande passante mobile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Refrig'Air Systèmes",
            "url": "https://ras-energies.com/",
            "logo": "https://ras-energies.com/logo.png",
            "sameAs": [],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "149 Avenue du Maine",
              "addressLocality": "Paris",
              "postalCode": "75014",
              "addressRegion": "Île-de-France",
              "addressCountry": "FR"
            },
            "telephone": "+33667809074",
            "areaServed": "Île-de-France",
            "description": "Climatisation de précision et froid industriel pour data centers, laboratoires, industrie, retail et froid commercial. Installations très haute technicité, très basse température, salles blanches. Partenaire certifié des leaders mondiaux.",
            "serviceArea": [
              {
                "@type": "City",
                "name": "Paris"
              },
              {
                "@type": "AdministrativeArea", 
                "name": "Île-de-France"
              }
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Services de climatisation et froid industriel",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Climatisation de précision"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Froid industriel"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Installations très haute technicité"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Froid commercial et vitrines réfrigérées"
                  }
                }
              ]
            },
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://ras-energies.com/",
            "name": "Refrig'Air Systèmes",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://ras-energies.com/recherche?q={search_term_string}",
              "query-input": "required name=search_term_string"
            },
            "creator": {
              "@type": "Person",
              "@id": "https://www.nomad403.com",
              "name": "Nomad403",
              "url": "https://www.nomad403.com",
              "jobTitle": "Développeur Web Mobile IA Freelance",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Paris",
                "addressCountry": "FR"
              },
              "sameAs": [
                "https://www.nomad403.com"
              ]
            }
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": "https://www.nomad403.com",
            "name": "Nomad403",
            "url": "https://www.nomad403.com",
            "jobTitle": "Développeur Web Mobile IA Freelance",
            "description": "Développeur web mobile freelance basé à Paris. Spécialisé dans React Next.js, applications mobiles iOS Android Kotlin Swift, et intégration IA Azure OpenAI.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Paris",
              "addressCountry": "FR"
            },
            "knowsAbout": [
              "React",
              "Next.js",
              "TypeScript",
              "Kotlin",
              "Swift",
              "iOS",
              "Android",
              "Intelligence Artificielle",
              "Azure OpenAI"
            ],
            "sameAs": [
              "https://www.nomad403.com"
            ]
          }) }}
        />
        <style>{`
          html::-webkit-scrollbar { display: none !important; width: 0 !important; }
          body::-webkit-scrollbar { display: none !important; width: 0 !important; }
          *::-webkit-scrollbar { display: none !important; width: 0 !important; }
          html, body { 
            scrollbar-width: none !important; 
            -ms-overflow-style: none !important;
            overflow-x: hidden !important;
          }
        `}</style>
      </head>
      <body style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overflowX: 'hidden' }}>
        {/* Skip links pour accessibilité - invisibles mais accessibles au clavier et aux lecteurs d'écran */}
        <a 
          href="#main-content" 
          className="sr-only focus:static focus:w-auto focus:h-auto focus:p-4 focus:absolute focus:top-4 focus:left-4 focus:z-[999999] focus:bg-[#537FE7] focus:text-white focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Aller au contenu principal"
        >
          Aller au contenu principal
        </a>
        <a 
          href="#footer" 
          className="sr-only focus:static focus:w-auto focus:h-auto focus:p-4 focus:absolute focus:top-4 focus:left-4 focus:z-[999999] focus:bg-[#537FE7] focus:text-white focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Aller au pied de page"
        >
          Aller au pied de page
        </a>
        
        {/* Description SEO cachée pour enrichir le contexte */}
        <div className="sr-only" aria-hidden="false">
          <h1>Refrig'Air Systèmes — Expert en climatisation de précision et froid industriel à Paris et Île-de-France</h1>
          <p>
            Spécialiste des installations HVAC critiques pour data centers, laboratoires, industrie agroalimentaire et retail. 
            Services de climatisation de précision, froid industriel, installations très haute technicité, très basse température, 
            salles blanches, vitrines réfrigérées, meubles froids. Maintenance préventive et dépannage d'urgence 24/7 avec SLA d'intervention ≤ 4h. 
            Partenaire certifié des leaders mondiaux : Daikin, Carrier, Trane, Johnson Controls, Mitsubishi Electric, Danfoss, Panasonic, Liebherr, STULZ.
          </p>
          <p>
            Certifications : C2E, RGE, Qualifelec, Attestation Capacité Fluides Frigorigènes. 
            Zones d'intervention : Paris, Île-de-France, région parisienne.
          </p>
        </div>
        
               <PerformanceWrapper>
                 <LanguageProvider>
                   <Breadcrumbs />
                   <Suspense fallback={null}>
                     <Header />
                   </Suspense>
                   <main id="main-content" role="main" aria-label="Contenu principal">
                     {children}
                   </main>
                   <Footer />
                 </LanguageProvider>
               </PerformanceWrapper>
      </body>
    </html>
  )
}
