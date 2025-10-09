import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.refrigairsystemes.fr"),
  title: {
    default: "Refrig'Air Systèmes — Climatisation & Froid industriel à Paris",
    template: "%s | Refrig'Air Systèmes",
  },
  description: "Climatisation de précision et froid industriel pour data centers, laboratoires, industrie et retail en Île‑de‑France.",
  keywords: [
    'climatisation de précision', 'froid industriel', 'data center', 'laboratoire',
    'agroalimentaire', 'maintenance HVAC', 'Paris', 'Île-de-France', 'VRV', 'CTA', 'eau glacée'
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon-ras.svg",
    shortcut: "/favicon-ras.svg",
    apple: "/favicon-ras.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Refrig'Air Systèmes",
    title: "Climatisation & Froid industriel | Paris",
    description: "Solutions premium pour environnements critiques: data centers, laboratoires, industrie, retail.",
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
            "description": "Climatisation de précision et froid industriel pour data centers, laboratoires et industrie.",
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
        <Header />
        {children}
      </body>
    </html>
  )
}
