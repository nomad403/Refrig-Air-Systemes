"use client"

import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)

  return (
    <footer className="bg-[#181823] text-[#E9F8F9] border-t border-[#E9F8F9]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-8">
          {/* Informations de l'entreprise */}
          <div>
            <h3 className="text-lg font-semibold mb-4 satoshi">
              {t("Refrig'Air Systèmes", "Refrig'Air Systèmes")}
            </h3>
            <div className="space-y-2 text-sm text-[#E9F8F9]/80 satoshi">
              <p>149 Avenue du Maine</p>
              <p>75014 Paris, France</p>
              <p className="mt-4">
                <a 
                  href="tel:+33667809074" 
                  className="hover:text-[#E9F8F9] transition-colors"
                >
                  +33 6 67 80 90 74
                </a>
              </p>
              <p>
                <a 
                  href="mailto:contact@refrigairsystemes.com" 
                  className="hover:text-[#E9F8F9] transition-colors"
                >
                  contact@refrigairsystemes.com
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 satoshi">
              {t("Services", "Services")}
            </h3>
            <ul className="space-y-2 text-sm text-[#E9F8F9]/80 satoshi">
              <li>
                <a href="/expertises" className="hover:text-[#E9F8F9] transition-colors">
                  {t("Climatisation de précision", "Precision cooling")}
                </a>
              </li>
              <li>
                <a href="/expertises" className="hover:text-[#E9F8F9] transition-colors">
                  {t("Froid industriel", "Industrial refrigeration")}
                </a>
              </li>
              <li>
                <a href="/maintenances-services" className="hover:text-[#E9F8F9] transition-colors">
                  {t("Maintenance 24/7", "24/7 Maintenance")}
                </a>
              </li>
              <li>
                <a href="/qualites-certification" className="hover:text-[#E9F8F9] transition-colors">
                  {t("Certifications", "Certifications")}
                </a>
              </li>
            </ul>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 satoshi">
              {t("Liens rapides", "Quick Links")}
            </h3>
            <ul className="space-y-2 text-sm text-[#E9F8F9]/80 satoshi">
              <li>
                <a href="/" className="hover:text-[#E9F8F9] transition-colors">
                  {t("Accueil", "Home")}
                </a>
              </li>
              <li>
                <a href="/expertises" className="hover:text-[#E9F8F9] transition-colors">
                  {t("Expertises", "Expertise")}
                </a>
              </li>
              <li>
                <a href="/maintenances-services" className="hover:text-[#E9F8F9] transition-colors">
                  {t("Maintenance", "Maintenance")}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#E9F8F9] transition-colors">
                  {t("Contact", "Contact")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-[#E9F8F9]/10 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#E9F8F9]/60 satoshi">
            <p>
              © {new Date().getFullYear()} Refrig'Air Systèmes. {t("Tous droits réservés.", "All rights reserved.")}
            </p>
            <p className="text-xs text-[#E9F8F9]/50">
              {t("Développement web", "Web development")}{" "}
              <a 
                href="https://www.nomad403.com/" 
                target="_blank" 
                rel="noopener noreferrer author"
                className="hover:text-[#E9F8F9]/70 transition-colors underline decoration-[#E9F8F9]/20 hover:decoration-[#E9F8F9]/40"
                title="Nomad403 - Développeur Web Mobile IA Freelance Paris - React Next.js Kotlin Swift"
                aria-label="Site du développeur web mobile freelance Nomad403 - Expert React Next.js TypeScript Kotlin Swift iOS Android"
              >
                nomad403
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

