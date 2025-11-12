"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"

export type Language = "fr" | "en"

interface LanguageContextValue {
  language: Language
  isFrench: boolean
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  translateTitle: (titles: { fr: string; en: string }) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = "ras-language"

const defaultTitles: Record<string, { fr: string; en: string }> = {
  "/": {
    fr: "Refrig'Air Systèmes — Climatisation & Froid industriel à Paris",
    en: "Refrig'Air Systems — Precision Cooling & Industrial Refrigeration in Paris"
  },
  "/expertises": {
    fr: "Expertises HVAC - Climatisation & Froid industriel | Paris",
    en: "HVAC Expertise – Precision Cooling & Industrial Refrigeration | Paris"
  },
  "/maintenances-services": {
    fr: "Maintenances & Services HVAC - Refrig'Air Systèmes",
    en: "HVAC Maintenance & Services – Refrig'Air Systems"
  },
  "/qualites-certification": {
    fr: "Qualités & Certifications - Refrig'Air Systèmes",
    en: "Quality & Certifications – Refrig'Air Systems"
  },
  "/contact": {
    fr: "Contact - Refrig'Air Systèmes",
    en: "Contact – Refrig'Air Systems"
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [language, setLanguage] = useState<Language>("fr")
  const isFrench = language === "fr"

  const updateDocumentTitle = useCallback((currentPath: string, lang: Language) => {
    if (typeof document === "undefined") return
    const titles = defaultTitles[currentPath] ?? defaultTitles["/"]
    document.title = lang === "fr" ? titles.fr : titles.en
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null
    if (stored === "fr" || stored === "en") {
      setLanguage(stored)
      document.documentElement.lang = stored
      updateDocumentTitle(pathname, stored)
      return
    }

    const browserLang = window.navigator.language.toLowerCase()
    const inferred: Language = browserLang.startsWith("en") ? "en" : "fr"
    setLanguage(inferred)
    document.documentElement.lang = inferred
    window.localStorage.setItem(STORAGE_KEY, inferred)
    updateDocumentTitle(pathname, inferred)
  }, [pathname, updateDocumentTitle])

  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.lang = language
    updateDocumentTitle(pathname, language)
  }, [language, pathname, updateDocumentTitle])

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next: Language = prev === "fr" ? "en" : "fr"
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next)
      }
      return next
    })
  }, [])

  const translateTitle = useCallback(
    (titles: { fr: string; en: string }) => {
      if (typeof document === "undefined") return
      document.title = isFrench ? titles.fr : titles.en
    },
    [isFrench]
  )

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    isFrench,
    setLanguage: (lang: Language) => {
      setLanguage(lang)
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, lang)
      }
    },
    toggleLanguage,
    translateTitle
  }), [language, isFrench, toggleLanguage, translateTitle])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

