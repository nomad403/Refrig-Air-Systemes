"use client"

import React, { useMemo, useRef } from "react"
import { motion, useInView } from "framer-motion"
import ShaderBackground from "./shader-background"
import ScrollSlideTitle from "./scroll-slide-title"
import { useLanguage } from "@/contexts/language-context"

// Composant pour l'animation des compteurs avec effet de comptage
function AnimatedCounter({ value, suffix = "", duration = 2, delay = 0 }: { value: number; suffix?: string; duration?: number; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      
      const elapsed = currentTime - startTime
      const progress = Math.min((elapsed - delay * 1000) / (duration * 1000), 1)
      
      if (progress < 0) {
        // Pas encore le moment de démarrer l'animation
        animationFrame = requestAnimationFrame(animate)
        return
      }
      
      // Fonction d'easing pour un effet plus naturel
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = Math.floor(easeOutQuart * value)
      
      setDisplayValue(currentValue)
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isInView, value, duration, delay])

  return (
    <motion.span
      ref={ref}
      className="text-4xl md:text-5xl font-light text-[#E9F8F9] will-change-auto"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        key={displayValue} // Force la re-render pour l'animation
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={suffix === "%" ? "text-[#537FE7]" : ""} // Mettre en évidence les pourcentages
      >
        {displayValue}
      </motion.span>
      <span className={suffix === "%" ? "text-[#537FE7]" : ""}>{suffix}</span>
    </motion.span>
  )
}

export default function QualitesSections() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px", amount: 0.3 })
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)

  const certifications = useMemo(() => ([
    {
      title: t("C2E — Certificats d'Économies d'Énergie", "C2E — Energy Savings Certificates"),
      description: t(
        "Reconnaissance officielle d'actions d'efficacité énergétique pour installations frigorifiques et climatisation de précision",
        "Official recognition of energy-efficiency actions for refrigeration plants and precision HVAC"
      ),
      category: t("Technique", "Technical")
    },
    {
      title: t("Certification RGE", "RGE Certification"),
      description: t(
        "Reconnu Garant de l'Environnement - Qualification officielle pour travaux de rénovation énergétique et efficacité des installations frigorifiques industrielles",
        "Recognised Environmental Guarantor – official qualification for energy retrofits and efficient industrial refrigeration installations"
      ),
      category: t("Environnemental", "Environmental")
    },
    {
      title: t("Attestation Capacité Fluides Frigorigènes", "Refrigerant Handling Capacity Certificate"),
      description: t(
        "Habilitation légale pour manipulation des fluides HFC, R-410A, R-32 et fluides naturels (CO2, NH3) pour installations critiques haute performance",
        "Legal licence to handle HFCs, R-410A, R-32 and natural refrigerants (CO2, NH3) for high-performance critical installations"
      ),
      category: t("Réglementaire", "Regulatory")
    },
    {
      title: t("Certification Qualifelec", "Qualifelec Certification"),
      description: t(
        "Compétence certifiée en génie électrique et énergétique pour systèmes de climatisation de précision et supervision des installations tertiaires",
        "Certified expertise in electrical and energy engineering for precision HVAC systems and tertiary site supervision"
      ),
      category: t("Électrique", "Electrical")
    },
    {
      title: t("Partenariat Carrier Agréé", "Authorised Carrier Partner"),
      description: t(
        "Formation technique spécialisée sur équipements Carrier pour data centers, salles blanches et applications critiques haute disponibilité",
        "Specialised technical training on Carrier equipment for data centres, cleanrooms and high-availability critical applications"
      ),
      category: t("Fabricant", "Manufacturer")
    },
    {
      title: t("Membre SNEFCCA", "SNEFCCA Member"),
      description: t(
        "Syndicat National des Entreprises du Froid - Engagement professionnel et veille réglementaire pour installations agroalimentaires et pharmaceutiques",
        "National Syndicate of Refrigeration Companies – professional commitment and regulatory watch for agri-food and pharmaceutical installations"
      ),
      category: t("Professionnel", "Professional")
    }
  ]), [isFrench])

  const engagements = useMemo(() => ([
    {
      title: t("Années d'Expérience", "Years of Experience"),
      value: 30,
      suffix: "",
      description: t("Expertise reconnue en climatisation et froid industriel", "Recognised expertise in HVAC and industrial refrigeration")
    },
    {
      title: t("Installations Critiques", "Critical Installations"),
      value: 43,
      suffix: "",
      description: t("Projets réalisés pour data centers, laboratoires et industries sensibles", "Projects delivered for data centres, laboratories and sensitive industries")
    },
    {
      title: t("Installations très haute technicité", "High-Tech Installations"),
      value: 12,
      suffix: "",
      description: t("Installations très basse température réalisées avec succès", "Ultra-low temperature installations delivered successfully")
    },
    {
      title: t("Support Technique", "Technical Support"),
      value: 24,
      suffix: "/7",
      description: t("Astreinte dédiée pour vos installations critiques", "Dedicated on-call team for your critical systems")
    },
    {
      title: t("Solutions Écologiques", "Eco-Friendly Solutions"),
      value: 100,
      suffix: "%",
      description: t("Engagement total pour les fluides et technologies durables", "Full commitment to sustainable refrigerants and technologies")
    },
    {
      title: t("Taux de Satisfaction", "Customer Satisfaction"),
      value: 99,
      suffix: "%",
      description: t("Performance et qualité reconnues par nos clients", "Performance and quality recognised by our clients")
    }
  ]), [isFrench])

  const secteurs = useMemo(() => ([
    {
      title: t("Data Centers", "Data Centres"),
      description: t("Climatisation de précision pour infrastructures critiques", "Precision cooling for mission-critical infrastructure"),
      image: "/images/qualites/data-center.jpg"
    },
    {
      title: t("Laboratoires", "Laboratories"),
      description: t("Contrôle environnemental strict pour recherche et analyse", "Strict environmental control for research and analysis"),
      image: "/images/qualites/laboratoire.jpg"
    },
    {
      title: t("Industries Sensibles", "Sensitive Industries"),
      description: t("Solutions adaptées aux contraintes réglementaires", "Solutions adapted to stringent regulatory constraints"),
      image: "/images/qualites/industrie.jpg"
    },
    {
      title: t("Grandes Surfaces", "Large Retail Sites"),
      description: t("Systèmes performants pour espaces commerciaux", "High-performance systems for commercial spaces"),
      image: "/images/qualites/grande-surface.jpg"
    }
  ]), [isFrench])

  return (
    <div className="bg-[#181823]">
      {/* Introduction — disposition 2 colonnes (comme home/contact) */}
      <section className="py-20 sm:py-32 lg:py-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            {/* Titre à gauche */}
            <div className="flex-1">
              <ScrollSlideTitle
                direction="fromLeft"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#E9F8F9] orbit uppercase tracking-tight leading-tight max-w-[24ch] sm:max-w-[26ch] lg:max-w-[28ch] text-balance"
              >
                {t("Excellence & Conformité", "Excellence & Compliance")}
              </ScrollSlideTitle>
            </div>

            {/* Description à droite */}
            <motion.div
              className="flex-1 mt-8 sm:mt-12 lg:mt-16 xl:mt-20 space-y-4 sm:space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#E9F8F9]/80 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: t(
                    "Refrig'Air Systèmes, <strong>expert en climatisation professionnelle certifiée</strong> et <strong>froid industriel haut de gamme</strong>, garantit la conformité réglementaire et l'excellence technique pour vos installations critiques : data centers, laboratoires, industries agroalimentaires et grandes surfaces.",
                    "Refrig'Air Systèmes, <strong>certified professional HVAC specialist</strong> and <strong>premium industrial refrigeration expert</strong>, ensures regulatory compliance and technical excellence for your mission-critical installations: data centres, laboratories, agri-food industries and large retail sites."
                  )
                }}
              />
              <div 
                className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-[#E9F8F9]/70"
              >
                {[t("Climatisation de précision", "Precision cooling"), t("Froid industriel", "Industrial refrigeration"), t("Maintenance préventive", "Preventive maintenance"), t("Efficacité énergétique", "Energy efficiency")].map((chip, index) => (
                  <span key={`qualite-chip-${index}`} className="bg-[#E9F8F9]/10 px-3 py-1 rounded satoshi">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications - Format épuré avec vidéo en fond */}
      <section ref={sectionRef} className="min-h-screen h-auto sm:h-screen bg-black relative overflow-hidden">
        {/* Vidéo en arrière-plan (fichiers locaux, optimisés pour mobile) - fullscreen qui s'étend */}
        <div className="absolute inset-0 w-full min-h-full">
          <ShaderBackground 
            videoUrl="/images/qualites/qualite.webm" 
            videoStyle={{ 
              objectFit: "cover",
              width: "100%",
              height: "100%",
              minHeight: "100%",
              position: "absolute",
              top: 0,
              left: 0
            }}
          />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 min-h-screen sm:h-full flex flex-col justify-center py-20 sm:py-20 lg:py-24">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-12 sm:mb-16 text-[#E9F8F9] orbit"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            {t("Certifications", "Certifications")}
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                className="border border-[#181823]/10 p-4 sm:p-6 hover:border-[#181823]/20 transition-colors duration-200 group transform-gpu backface-hidden bg-[#E9F8F9]/95 backdrop-blur-sm"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-light text-[#181823] satoshi">{cert.title}</h3>
                  <span className="text-xs text-[#181823]/50 bg-[#181823]/5 px-2 py-1 rounded satoshi">
                    {cert.category}
                  </span>
                </div>
                <p className="text-[#181823]/70 satoshi font-light leading-relaxed text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Engagements - Minimaliste */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#181823]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-12 sm:mb-16 text-[#E9F8F9] orbit"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("Nos Engagements", "Our Commitments")}
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {engagements.map((engagement, index) => (
              <motion.div
                key={engagement.title}
                className="text-center border-l border-[#E9F8F9]/20 pl-4 sm:pl-6 transform-gpu backface-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <AnimatedCounter 
                  value={engagement.value} 
                  suffix={engagement.suffix}
                  duration={2}
                  delay={index * 0.3}
                />
                <h3 className="text-sm font-light mt-2 text-[#E9F8F9]/70 satoshi">{engagement.title}</h3>
                <p className="text-xs text-[#E9F8F9]/50 mt-1 satoshi">{engagement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs d'Excellence Premium */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#E9F8F9]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-12 sm:mb-16 text-[#181823] orbit"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("Secteurs d'Excellence", "Sectors of Excellence")}
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {[
              {
                title: t("Data Centers", "Data Centres"),
                keywords: t(
                  "Climatisation de précision, refroidissement serveurs, haute disponibilité 99.9%, systèmes redondants",
                  "Precision cooling, server refrigeration, 99.9% uptime, redundant systems"
                ),
                applications: t(
                  "Salles serveurs, baies informatiques, centres de calcul",
                  "Server rooms, IT racks, compute centres"
                )
              },
              {
                title: t("Laboratoires & Recherche", "Laboratories & Research"),
                keywords: t(
                  "Contrôle hygrométrie, température stable ±0.5°C, salles blanches ISO 14644",
                  "Humidity control, ±0.5 °C temperature stability, ISO 14644 cleanrooms"
                ),
                applications: t(
                  "Laboratoires pharmaceutiques, recherche médicale, analyses",
                  "Pharmaceutical labs, medical research, analytical facilities"
                )
              },
              {
                title: t("Industrie Agroalimentaire", "Agri-Food Industry"), 
                keywords: t(
                  "Chaîne du froid HACCP, chambres froides, conservation produits frais",
                  "HACCP cold chain, cold rooms, fresh product preservation"
                ),
                applications: t(
                  "Entrepôts frigorifiques, production alimentaire, logistique",
                  "Refrigerated warehouses, food production, logistics"
                )
              },
              {
                title: t("Grandes Surfaces", "Large Retail Sites"),
                keywords: t(
                  "Froid commercial, meubles réfrigérés, efficacité énergétique, fluides écologiques",
                  "Commercial refrigeration, refrigerated fixtures, energy efficiency, eco-friendly refrigerants"
                ),
                applications: t(
                  "Supermarchés, hypermarchés, magasins spécialisés",
                  "Supermarkets, hypermarkets, specialist stores"
                )
              }
            ].map((secteur, index) => (
              <motion.div
                key={secteur.title}
                className="border border-[#181823]/10 p-4 sm:p-6 hover:border-[#181823]/20 transition-colors duration-200 transform-gpu backface-hidden"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-lg font-light mb-3 text-[#181823] satoshi">{secteur.title}</h3>
                <p className="text-[#181823]/70 text-sm mb-3 satoshi font-light">{secteur.keywords}</p>
                <p className="text-[#181823]/50 text-xs satoshi">{secteur.applications}</p>
              </motion.div>
            ))}
          </div>

          {/* Technologies & Normes */}
          <motion.div 
            className="text-center border-t border-[#181823]/10 pt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-light mb-6 text-[#181823] satoshi">
              {t("Technologies & Conformités", "Technologies & Compliance")}
            </h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-[#181823]/60 satoshi">
              {[
                t("Fluides R-410A, R-32, CO2", "Refrigerants R-410A, R-32, CO2"),
                t("Norme ISO 14644", "ISO 14644 standard"),
                t("Certification HACCP", "HACCP certification"),
                "Eurovent Certified",
                "F-Gas Regulation",
                "PED 2014/68/EU"
              ].map((item, idx) => (
                <span key={`tech-item-${idx}`} className="bg-[#181823]/5 px-3 py-1 rounded">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Final - Simple */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#181823]">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-12">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-light mb-6 sm:mb-8 text-[#E9F8F9] orbit"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("Excellence Technique", "Technical Excellence")}
          </motion.h2>
          <motion.p 
            className="text-lg text-[#E9F8F9]/70 mb-12 leading-relaxed satoshi font-light space-y-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">
              {t(
                "Partenaire de confiance pour vos installations critiques haute performance.",
                "Trusted partner for your high-performance critical installations."
              )}
            </span>
            <strong className="block">
              {t(
                "Contactez-nous pour un accompagnement expert de vos projets frigorifiques et climatiques.",
                "Contact us for expert guidance on your refrigeration and HVAC projects."
              )}
            </strong>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="/contact#formulaire" className="w-full sm:w-auto">
              <motion.button 
                className="rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap"
                whileHover={{ scale: 1.05, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t("Demander un Devis Certifié", "Request a Certified Quote")}
              </motion.button>
            </a>
            <a href="#certifications" className="w-full sm:w-auto">
              <motion.button 
                className="rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap"
                whileHover={{ scale: 1.05, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {t("Nos Références Premium", "Our Premium References")}
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

