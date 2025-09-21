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
    <html lang="fr">
      <body>{children}</body>
    </html>
  )
}
