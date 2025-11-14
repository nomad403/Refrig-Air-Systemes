import type React from "react"
import { Suspense } from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import { LanguageProvider } from "@/contexts/language-context"
import { PerformanceWrapper } from "@/components/performance-wrapper"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.refrigairsystemes.fr"),
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
    url: "/",
    siteName: "Refrig'Air Systèmes",
    title: "Climatisation & Froid industriel | Paris - Partenaire des leaders mondiaux",
    description: "Solutions premium pour environnements critiques: data centers, laboratoires, industrie, retail, installations très haute technicité, très basse température, salles blanches, froid commercial, vitrines réfrigérées. Partenaire certifié Daikin, Carrier, Trane, Johnson Controls, Mitsubishi Electric.",
    images: [
      {
        url: "/images/home/hvac.png",
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
    images: ["/images/home/hvac.png"],
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
        <link rel="canonical" href="https://www.refrigairsystemes.fr/" />
        <link rel="icon" href="/images/general/LOGO_FAV.svg" type="image/svg+xml" sizes="any" />
        <link rel="icon" href="/images/general/LOGO_FAV.svg" type="image/svg+xml" sizes="512x512" />
        <link rel="mask-icon" href="/images/general/LOGO_FAV.svg" color="#537FE7" />
        <link rel="apple-touch-icon" href="/images/general/LOGO_FAV.svg" sizes="512x512" />
        {/* Preload WebM pour navigateurs modernes */}
        <link rel="preload" as="video" href="/images/home/home.webm" type="video/webm" />
        <link rel="preload" as="video" href="/images/expertises/expertise.webm" type="video/webm" />
        <link rel="preload" as="video" href="/images/maintenances_services/maintenance.webm" type="video/webm" />
        <link rel="preload" as="video" href="/images/contact/contact.webm" type="video/webm" />
        <link rel="preload" as="video" href="/images/qualites/qualite.webm" type="video/webm" />
        {/* Preload MP4 pour iOS et navigateurs qui ne supportent pas WebM */}
        <link rel="preload" as="video" href="/images/home/home.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/images/expertises/expertise.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/images/maintenances_services/maintenance.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/images/contact/contact.mp4" type="video/mp4" />
        <link rel="preload" as="video" href="/images/qualites/qualite.mp4" type="video/mp4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Refrig'Air Systèmes",
            "url": "https://www.refrigairsystemes.fr/",
            "logo": "https://www.refrigairsystemes.fr/logo.png",
            "sameAs": [],
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
            },
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
            "url": "https://www.refrigairsystemes.fr/",
            "name": "Refrig'Air Systèmes",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.refrigairsystemes.fr/recherche?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
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
        <PerformanceWrapper>
          <LanguageProvider>
            <Suspense fallback={null}>
              <Header />
            </Suspense>
            {children}
          </LanguageProvider>
        </PerformanceWrapper>
      </body>
    </html>
  )
}
