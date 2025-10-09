"use client"

import { motion } from "framer-motion"
import LiteYouTubeBackground from "./LiteYouTubeBackground"
import { useInView } from "framer-motion"
import { useRef } from "react"
import ScrollSlideTitle from "./scroll-slide-title"

// Composant pour l'animation des compteurs
function AnimatedCounter({ value, suffix = "", duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      className="text-4xl md:text-5xl font-light text-[#E9F8F9] will-change-auto"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {isInView ? (
        <motion.span
          style={{ display: "inline-block" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {value}
        </motion.span>
      ) : (
        "0"
      )}
      {suffix}
    </motion.span>
  )
}

export default function QualitesSections() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px", amount: 0.3 })

  const certifications = [
    {
      title: "QualiClimaFroid & Qualifroid",
      description: "Certifications attestant des compétences techniques, humaines, juridiques et financières dans le conditionnement d'air, climatisation, pompes à chaleur et ventilation pour data centers et laboratoires",
      category: "Technique"
    },
    {
      title: "Certification RGE",
      description: "Reconnu Garant de l'Environnement - Qualification officielle pour travaux de rénovation énergétique et efficacité des installations frigorifiques industrielles",
      category: "Environnemental"
    },
    {
      title: "Attestation Capacité Fluides Frigorigènes",
      description: "Habilitation légale pour manipulation des fluides HFC, R-410A, R-32 et fluides naturels (CO2, NH3) pour installations critiques haute performance",
      category: "Réglementaire"
    },
    {
      title: "Certification Qualifelec",
      description: "Compétence certifiée en génie électrique et énergétique pour systèmes de climatisation de précision et supervision des installations tertiaires",
      category: "Électrique"
    },
    {
      title: "Partenariat Carrier Agréé",
      description: "Formation technique spécialisée sur équipements Carrier pour data centers, salles blanches et applications critiques haute disponibilité",
      category: "Fabricant"
    },
    {
      title: "Membre SNEFCCA",
      description: "Syndicat National des Entreprises du Froid - Engagement professionnel et veille réglementaire pour installations agroalimentaires et pharmaceutiques",
      category: "Professionnel"
    }
  ]

  const engagements = [
    {
      title: "Années d'Expérience",
      value: 30,
      suffix: "",
      description: "Expertise reconnue en climatisation et froid industriel"
    },
    {
      title: "Installations Critiques",
      value: 43,
      suffix: "",
      description: "Projets réalisés pour data centers, laboratoires et industries sensibles"
    },
    {
      title: "Techniciens Certifiés",
      value: 14,
      suffix: "",
      description: "Équipe qualifiée RGE, Qualifroid et formations constructeurs"
    },
    {
      title: "Support Technique",
      value: 24,
      suffix: "/7",
      description: "Astreinte dédiée pour vos installations critiques"
    },
    {
      title: "Solutions Écologiques",
      value: 100,
      suffix: "%",
      description: "Engagement total pour les fluides et technologies durables"
    },
    {
      title: "Taux de Satisfaction",
      value: 99,
      suffix: "%",
      description: "Performance et qualité reconnues par nos clients"
    }
  ]

  const secteurs = [
    {
      title: "Data Centers",
      description: "Climatisation de précision pour infrastructures critiques",
      image: "/images/qualites/data-center.jpg"
    },
    {
      title: "Laboratoires",
      description: "Contrôle environnemental strict pour recherche et analyse",
      image: "/images/qualites/laboratoire.jpg"
    },
    {
      title: "Industries Sensibles",
      description: "Solutions adaptées aux contraintes réglementaires",
      image: "/images/qualites/industrie.jpg"
    },
    {
      title: "Grandes Surfaces",
      description: "Systèmes performants pour espaces commerciaux",
      image: "/images/qualites/grande-surface.jpg"
    }
  ]

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
                Excellence & Conformité
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
              >
                Refrig'Air Systèmes, <strong>expert en climatisation professionnelle certifiée</strong> et 
                <strong> froid industriel haut de gamme</strong>, garantit la conformité réglementaire et 
                l'excellence technique pour vos installations critiques : data centers, laboratoires, 
                industries agroalimentaires et grandes surfaces.
              </p>
              <div 
                className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm text-[#E9F8F9]/70"
              >
                <span className="bg-[#E9F8F9]/10 px-3 py-1 rounded satoshi">Climatisation de précision</span>
                <span className="bg-[#E9F8F9]/10 px-3 py-1 rounded satoshi">Froid industriel</span>
                <span className="bg-[#E9F8F9]/10 px-3 py-1 rounded satoshi">Maintenance préventive</span>
                <span className="bg-[#E9F8F9]/10 px-3 py-1 rounded satoshi">Efficacité énergétique</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications - Format épuré avec vidéo en fond */}
      <section ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-[#E9F8F9] relative overflow-hidden">
        {/* Vidéo en arrière-plan (lite embed, chargée à l'apparition) */}
        <div className="absolute inset-0 w-full h-full">
          <LiteYouTubeBackground id="zMQxGxaE5xM" title="Certifications Background Video" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-12 sm:mb-16 text-[#E9F8F9] orbit"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            Certifications
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
            Nos Engagements
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
                  duration={2 + index * 0.2}
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
            Secteurs d'Excellence
          </motion.h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
            {[
              {
                title: "Data Centers",
                keywords: "Climatisation de précision, refroidissement serveurs, haute disponibilité 99.9%, systèmes redondants",
                applications: "Salles serveurs, baies informatiques, centres de calcul"
              },
              {
                title: "Laboratoires & Recherche",
                keywords: "Contrôle hygrométrie, température stable ±0.5°C, salles blanches ISO 14644",
                applications: "Laboratoires pharmaceutiques, recherche médicale, analyses"
              },
              {
                title: "Industrie Agroalimentaire", 
                keywords: "Chaîne du froid HACCP, chambres froides, conservation produits frais",
                applications: "Entrepôts frigorifiques, production alimentaire, logistique"
              },
              {
                title: "Grandes Surfaces",
                keywords: "Froid commercial, meubles réfrigérés, efficacité énergétique, fluides écologiques",
                applications: "Supermarchés, hypermarchés, magasins spécialisés"
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
              Technologies & Conformités
            </h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-[#181823]/60 satoshi">
              <span className="bg-[#181823]/5 px-3 py-1 rounded">Fluides R-410A, R-32, CO2</span>
              <span className="bg-[#181823]/5 px-3 py-1 rounded">Norme ISO 14644</span>
              <span className="bg-[#181823]/5 px-3 py-1 rounded">Certification HACCP</span>
              <span className="bg-[#181823]/5 px-3 py-1 rounded">Eurovent Certified</span>
              <span className="bg-[#181823]/5 px-3 py-1 rounded">F-Gas Regulation</span>
              <span className="bg-[#181823]/5 px-3 py-1 rounded">PED 2014/68/EU</span>
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
            Excellence Technique
          </motion.h2>
          <motion.p 
            className="text-lg text-[#E9F8F9]/70 mb-12 leading-relaxed satoshi font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Partenaire de confiance pour vos installations critiques haute performance.
            <br />
            <strong>Contactez-nous pour un accompagnement expert de vos projets frigorifiques et climatiques.</strong>
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
                Demander un Devis Certifié
              </motion.button>
            </a>
            <a href="#certifications" className="w-full sm:w-auto">
              <motion.button 
                className="rounded-sm btn-effect-5 btn-standard w-full whitespace-nowrap"
                whileHover={{ scale: 1.05, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Nos Références Premium
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

