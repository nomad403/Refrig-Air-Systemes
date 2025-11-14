"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  useEffect(() => {
    // Générer le BreadcrumbList dynamiquement selon la page
    const breadcrumbItems = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://www.ras-energies.com/"
      }
    ]

    if (pathname === "/expertises") {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Expertises",
        "item": "https://www.ras-energies.com/expertises"
      })
    } else if (pathname === "/maintenances-services") {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Maintenances & Services",
        "item": "https://www.ras-energies.com/maintenances-services"
      })
    } else if (pathname === "/qualites-certification") {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Qualités & Certifications",
        "item": "https://www.ras-energies.com/qualites-certification"
      })
    } else if (pathname === "/contact") {
      breadcrumbItems.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": "https://www.ras-energies.com/contact"
      })
    }

    if (breadcrumbItems.length > 1) {
      const breadcrumbStructuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems
      }

      // Créer ou mettre à jour le script breadcrumb
      let script = document.getElementById("breadcrumb-structured-data")
      if (!script) {
        script = document.createElement("script")
        script.id = "breadcrumb-structured-data"
        script.type = "application/ld+json"
        document.head.appendChild(script)
      }
      script.textContent = JSON.stringify(breadcrumbStructuredData)
    }
  }, [pathname])

  return null // Composant invisible, seulement pour injecter le structured data
}

