import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Refrig'Air Systemes - Climatisation et froid industriel",
  description: "Des solutions sur mesure en climatisation et froid industriel, pensées pour durer.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <head>
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
        {children}
      </body>
    </html>
  )
}
