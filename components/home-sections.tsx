"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import ScrollSlideTitle from "./scroll-slide-title"
import ClientGallery from "./client-gallery"
import { useLanguage } from "@/contexts/language-context"

export default function HomeSections() {
  const { isFrench } = useLanguage()
  const t = (fr: string, en: string) => (isFrench ? fr : en)

  return (
    <div className="relative z-20 bg-[#181823]">
      {/* Bloc 1 — Présentation */}
      <motion.section 
        className="relative min-h-screen flex items-center bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-20 items-stretch px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative flex flex-col justify-center items-start h-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[800px] pt-16 sm:pt-0">
              <ScrollSlideTitle
                direction="fromLeft"
                className="text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#181823] leading-tight orbit uppercase tracking-tight mb-4 sm:mb-6 lg:mb-8"
              >
                {t(
                  "INGÉNIERIE DU FROID ET DE LA CLIMATISATION À PARIS",
                  "COLD ENGINEERING AND CLIMATE CONTROL IN PARIS"
                )}
              </ScrollSlideTitle>
              <motion.div 
                className="space-y-3 sm:space-y-4 text-left"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#181823]/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Refrig'Air Systèmes conçoit, installe et maintient des solutions de climatisation de précision, de froid industriel et de froid commercial pour data centers, laboratoires, sites industriels, l'agroalimentaire et le retail à Paris et en Île‑de‑France.",
                    "Refrig'Air Systèmes designs, installs and maintains precision air-conditioning, industrial refrigeration and commercial cooling systems for data centres, laboratories, industrial sites, the agri-food sector and retail throughout Paris and the Île-de-France region."
                  )}
                </motion.p>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-[#181823]/70 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Chambres froides, salles blanches, réseaux d'eau glacée, vitrines réfrigérées, meubles froids, armoires frigorifiques, systèmes VRV/VRF et CTA haut rendement : nous dimensionnons des installations sur mesure répondant aux exigences de disponibilité (N+1), confinement allées chaudes/froides, contrôle hygrométrique et efficacité énergétique (free‑cooling, récupération de chaleur).",
                    "Cold rooms, clean rooms, chilled-water networks, refrigerated display cases, chilled merchandisers, refrigeration cabinets, VRV/VRF systems and high-efficiency AHUs: we size bespoke installations that satisfy availability requirements (N+1), hot/cold aisle containment, humidity control and energy efficiency targets (free cooling, heat recovery)."
                  )}
                </motion.p>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-[#181823]/70 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {t(
                    "Conformité et traçabilité : HACCP, ISO 14644/22000, GxP. Supervision et télésurveillance 24/7, contrats de maintenance premium et interventions rapides ; Refrig'Air Systèmes réalise des opérations éligibles C2E et est certifié RGE pour des environnements critiques fiables et durables.",
                    "Compliance and traceability: HACCP, ISO 14644/22000, GxP. 24/7 supervision and remote monitoring, premium maintenance contracts and rapid response; Refrig'Air Systèmes delivers C2E-eligible projects and holds RGE certification to keep critical environments reliable and sustainable."
                  )}
                </motion.p>
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-[400px] sm:h-[600px] lg:h-[800px] xl:col-span-3 relative overflow-visible"
          >
            <div className="absolute inset-y-0 right-[5%] sm:right-[10%] w-[70%] sm:w-[65%]">
              <Image
                src="/images/home/hvac.png"
                alt={t(
                  "Installation de refroidissement industriel - Refrig'Air Systèmes",
                  "Industrial cooling installation – Refrig'Air Systèmes"
                )}
                fill
                className="object-contain object-right"
                priority
                sizes="(max-width: 640px) 70vw, (max-width: 1024px) 60vw, 40vw"
                fetchPriority="high"
                quality={90}
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Introduction Titre Principal */}
      <motion.section 
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#181823] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-[#E9F8F9] mb-6 sm:mb-8 leading-tight orbit"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t(
              "EXPERTISE FRIGORIFIQUE POUR L'INDUSTRIE",
              "REFRIGERATION EXPERTISE FOR INDUSTRY"
            )}
          </motion.h2>
          <motion.div
            className="text-lg sm:text-xl lg:text-2xl font-light text-[#537FE7] mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {t(
              "Solutions pour vos environnements",
              "Solutions tailored to your environments"
            )}
          </motion.div>
          <motion.p
            className="text-lg text-[#E9F8F9]/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {t(
              "Exploitant la puissance des technologies les plus avancées, nos solutions d'ingénierie frigorifique génèrent des performances optimales et durables. Accessibles partout, adaptées à tous vos besoins : climatisation professionnelle, maintenance préventive ou installations d'urgence, nous sommes en avance sur les défis pour que vous restiez performants.",
              "Leveraging the most advanced technologies, our refrigeration engineering solutions deliver lasting, optimal performance. Accessible everywhere and adapted to every requirement—professional HVAC, preventive maintenance or emergency installations—we stay ahead of challenges so you can stay ahead in performance."
            )}
          </motion.p>
        </div>
      </motion.section>

      {/* Section Solutions - Style GenCell */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#181823]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          {/* En-tête section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-[#E9F8F9] mb-6 orbit">
              {t("Nos Solutions", "Our Solutions")}
            </h2>
            <p className="text-[#537FE7] text-lg">{t("[notre offre est simple]", "[our offer is straightforward]")}</p>
            <p className="text-[#E9F8F9]/60 text-lg mt-2">{t("Le Froid — Molécule Essentielle", "Cooling — An Essential Molecule")}</p>
            <p className="text-[#537FE7] text-sm mt-4">{t("—Élevés par l'énergie, animés par l'innovation.", "—Powered by energy, driven by innovation.")}</p>
          </motion.div>

          {/* Solution 1 - Climatisation Professionnelle */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 01 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Climatisation Professionnelle", "Professional Air-Conditioning")}
                  </h3>
                  <p className="text-[#537FE7] text-lg mb-6">
                    {t(
                      "Solutions de confort thermique pour bureaux, commerces et établissements.",
                      "Thermal comfort solutions for offices, retail spaces and public venues."
                    )}
                  </p>
                  <div className="space-y-4">
                    <p className="text-[#E9F8F9]/80 leading-relaxed">
                      {t(
                        "Systèmes de climatisation haute performance pour environnements tertiaires et commerciaux. Nos équipes conçoivent et déploient des installations sur mesure, garantissant confort optimal et efficacité énergétique maximale.",
                        "High-performance HVAC systems for tertiary and commercial environments. Our teams design and deploy tailor-made installations that guarantee optimal comfort and maximum energy efficiency."
                      )}
                    </p>
                    <p className="text-[#E9F8F9]/80 leading-relaxed">
                      {t(
                        "De la conception à la mise en service, nous accompagnons vos projets de climatisation avec des solutions adaptées aux contraintes architecturales et réglementaires de chaque bâtiment.",
                        "From design through commissioning, we support your HVAC projects with solutions that comply with the architectural and regulatory constraints of each building."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution 2 - Froid Commercial */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 02 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Froid Commercial & Vitrines Réfrigérées", "Commercial Refrigeration & Display Cases")}
                  </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  {t(
                    "Solutions frigorifiques pour retail, restauration et distribution commerciale",
                    "Refrigeration solutions for retail, foodservice and commercial distribution"
                  )}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-[#E9F8F9] text-lg font-medium mb-3">
                      {t("Supermarchés & Hypermarchés", "Supermarkets & Hypermarkets")}
                    </h4>
                    <p className="text-[#E9F8F9]/70 leading-relaxed mb-4">
                      {t(
                        "Vitrines réfrigérées, meubles froids et armoires frigorifiques pour la grande distribution avec optimisation énergétique et conformité HACCP.",
                        "Refrigerated display cases, chilled merchandisers and refrigeration cabinets for large-scale retail with energy optimisation and HACCP compliance."
                      )}
                    </p>
                    <ul className="text-[#537FE7] text-sm space-y-1">
                      <li>{t("• Vitrines à porte coulissante", "• Sliding-door display cases")}</li>
                      <li>{t("• Meubles froids ouverts", "• Open refrigerated merchandisers")}</li>
                      <li>{t("• Armoires de conservation", "• Holding cabinets")}</li>
                      <li>{t("• Fluides frigorigènes écologiques", "• Low-GWP refrigerants")}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#E9F8F9] text-lg font-medium mb-3">
                      {t("Restaurants & Boutiques", "Restaurants & Boutiques")}
                    </h4>
                    <p className="text-[#E9F8F9]/70 leading-relaxed mb-4">
                      {t(
                        "Équipements frigorifiques compacts pour restauration rapide, boulangeries, boucheries et commerces de proximité.",
                        "Compact refrigeration equipment for quick-service restaurants, bakeries, butcher shops and convenience stores."
                      )}
                    </p>
                    <ul className="text-[#537FE7] text-sm space-y-1">
                      <li>{t("• Vitrines pâtissières", "• Pastry display cases")}</li>
                      <li>{t("• Armoires de stockage", "• Storage cabinets")}</li>
                      <li>{t("• Meubles de vente", "• Point-of-sale displays")}</li>
                      <li>{t("• Maintenance préventive", "• Preventive maintenance")}</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Installation et maintenance de vitrines réfrigérées, meubles froids, armoires frigorifiques pour supermarchés, boutiques et restaurants. Optimisation énergétique des équipements frigorifiques commerciaux avec fluides écologiques.",
                      "Installation and maintenance of refrigerated display cases, chilled merchandisers and refrigeration cabinets for supermarkets, boutiques and restaurants. Energy optimisation of commercial refrigeration equipment with eco-friendly refrigerants."
                    )}
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Contrats de maintenance spécialisés pour garantir la continuité commerciale et la conservation optimale des produits frais. Interventions 24h/24 et 7j/7 pour minimiser les pertes de marchandises.",
                      "Specialised maintenance contracts to guarantee business continuity and optimal preservation of fresh products. 24/7 call-out service to minimise product loss."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution 3 - Froid Industriel */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 03 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t(
                      "Froid Industriel & Installations Très Haute Technicité",
                      "Industrial Refrigeration & High-Tech Installations"
                    )}
                  </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  {t(
                    "Installations frigorifiques très haute technicité pour l'industrie pharmaceutique, agroalimentaire, salles blanches et très basse température.",
                    "High-tech refrigeration plants for pharmaceutical, agri-food, cleanroom and ultra-low temperature applications."
                  )}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-[#E9F8F9] text-lg font-medium mb-3">
                      {t("Très Basse Température", "Ultra-Low Temperature")}
                    </h4>
                    <p className="text-[#E9F8F9]/70 leading-relaxed mb-4">
                      {t(
                        "Installations cryogéniques jusqu'à -80°C pour conservation d'échantillons biologiques, vaccins et produits pharmaceutiques sensibles.",
                        "Cryogenic systems down to -80 °C for storing biological samples, vaccines and sensitive pharmaceutical products."
                      )}
                    </p>
                    <ul className="text-[#537FE7] text-sm space-y-1">
                      <li>{t("• Chambres froides -80°C", "• -80 °C cold rooms")}</li>
                      <li>{t("• Armoires cryogéniques", "• Cryogenic cabinets")}</li>
                      <li>{t("• Conservation vaccins", "• Vaccine storage")}</li>
                      <li>{t("• Échantillons biologiques", "• Biological samples")}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#E9F8F9] text-lg font-medium mb-3">
                      {t("Salles Blanches", "Clean Rooms")}
                    </h4>
                    <p className="text-[#E9F8F9]/70 leading-relaxed mb-4">
                      {t(
                        "Environnements contrôlés ISO 14644 pour industries pharmaceutiques, électroniques et biotechnologiques.",
                        "ISO 14644 controlled environments for pharmaceutical, electronics and biotech industries."
                      )}
                    </p>
                    <ul className="text-[#537FE7] text-sm space-y-1">
                      <li>{t("• Classe ISO 5 à 8", "• ISO Class 5 to 8")}</li>
                      <li>{t("• Contrôle particules", "• Particle control")}</li>
                      <li>{t("• Régulation T°C/RH", "• Temperature & RH regulation")}</li>
                      <li>{t("• Sursurveillance continue", "• Continuous monitoring")}</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Chambres froides médicales, conservatoires agroalimentaires, data centers : nos installations très haute technicité respectent les normes les plus strictes (HACCP, ISO) pour garantir la chaîne du froid et la conservation optimale de vos produits.",
                      "Medical cold rooms, agri-food storage facilities, data centres: our high-tech installations comply with the strictest standards (HACCP, ISO) to secure the cold chain and preserve your products."
                    )}
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    {t(
                      "Solutions modulaires et évolutives, conçues pour répondre aux exigences de traçabilité, de sécurité et de performance énergétique des environnements industriels les plus critiques. Expertise reconnue dans les installations très basse température et salles blanches.",
                      "Modular, scalable solutions designed to meet the traceability, safety and energy performance requirements of the most critical industrial environments. Recognised expertise in ultra-low temperature installations and clean rooms."
                    )}
                  </p>
                </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution 4 - Maintenance Préventive */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 04 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Maintenance Préventive & Supervision", "Preventive Maintenance & Supervision")}
                  </h3>
                  <p className="text-[#537FE7] text-lg mb-6">
                    {t(
                      "Contrats de maintenance premium avec supervision 24/7 pour assurer la continuité de vos installations.",
                      "Premium maintenance contracts with 24/7 supervision to guarantee continuity of your installations."
                    )}
                  </p>
                  <div className="space-y-4">
                    <p className="text-[#E9F8F9]/80 leading-relaxed">
                      {t(
                        "Programmes de maintenance préventive sur mesure, télésurveillance en temps réel et interventions programmées pour maximiser la durée de vie de vos équipements et prévenir les pannes critiques.",
                        "Tailor-made preventive maintenance programmes, real-time remote monitoring and scheduled interventions to maximise equipment lifetime and prevent critical failures."
                      )}
                    </p>
                    <p className="text-[#E9F8F9]/80 leading-relaxed">
                      {t(
                        "Nos contrats premium incluent diagnostics énergétiques, optimisation des performances et reporting détaillé pour réduire vos coûts d'exploitation tout en garantissant la fiabilité de vos installations.",
                        "Our premium contracts include energy diagnostics, performance optimisation and detailed reporting to cut operating costs while safeguarding system reliability."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution 5 - Dépannage d'Urgence */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row sm:items-start">
                <span className="text-[#537FE7] text-lg font-mono mb-2 sm:mb-0 sm:mr-4">[ 05 ]</span>
                <div className="flex-1">
                  <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                    {t("Dépannage d'Urgence & Interventions Rapides", "Emergency Repairs & Rapid Response")}
                  </h3>
                  <p className="text-[#537FE7] text-lg mb-6">
                    {t(
                      "Service d'intervention 24h/24, 7j/7 pour rétablir rapidement vos installations critiques.",
                      "24/7 emergency service to restore your critical installations at speed."
                    )}
                  </p>
                  <div className="space-y-4">
                    <p className="text-[#E9F8F9]/80 leading-relaxed">
                      {t(
                        "Face aux pannes critiques, nos équipes d'intervention d'urgence sont mobilisables à tout moment. Diagnostic rapide, réparations immédiates et solutions temporaires pour garantir la continuité de votre activité.",
                        "When critical failures occur, our emergency teams can be mobilised at any time. Fast diagnostics, immediate repairs and temporary solutions keep your operations running."
                      )}
                    </p>
                    <p className="text-[#E9F8F9]/80 leading-relaxed">
                      {t(
                        "Nos techniciens certifiés interviennent avec un stock de pièces détachées et d'équipements de secours pour assurer un dépannage efficace et durable, minimisant les temps d'arrêt de vos installations.",
                        "Our certified technicians arrive with spare parts and backup equipment to deliver lasting repairs, keeping downtime to a minimum."
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Clients - "Ils nous ont fait confiance" */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#537FE7]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-6 orbit">
              {t("Ils nous ont fait confiance", "They trust us")}
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              {t(
                "Des entreprises de renom nous font confiance pour leurs installations critiques. Laboratoires, industrie, retail, luxe : découvrez nos clients partenaires.",
                "Renowned organisations trust us with their mission-critical systems. Laboratories, industry, retail, luxury brands: meet our partner clients."
              )}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <ClientGallery />
          </motion.div>
        </div>
      </motion.section>

      {/* Bloc 5 — Contact avec image team en fond */}
      <motion.section 
        className="min-h-screen flex items-center px-6 lg:px-12 bg-[#E9F8F9] relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Image team en fond fullscreen */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="w-full h-full bg-cover bg-[position:40%_center] md:bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/images/home/photo presentation.webp')",
            }}
          />
          {/* Overlay pour contraste et lisibilité */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-light text-white mb-6 leading-tight orbit">
              {t("Votre projet, notre expertise", "Your project, our expertise")}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              {t(
                "Parlez-nous de vos besoins en climatisation et froid industriel. Nos ingénieurs vous accompagnent dans l'élaboration d'une solution sur mesure. Demandez dès maintenant une étude personnalisée et recevez un devis instantané.",
                "Tell us about your air-conditioning and industrial refrigeration needs. Our engineers co-design a bespoke solution with you. Request a tailored assessment now and receive a quote straight away."
              )}
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <a href="/contact">
                <motion.button 
                  className="rounded-sm transition-all duration-200 btn-effect-5 btn-standard whitespace-nowrap w-full"
                  whileHover={{ scale: 1.02, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  {t("Nous contacter", "Contact us")}
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
