"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import ScrollSlideTitle from "./scroll-slide-title"
import ClientGallery from "./client-gallery"

export default function HomeSections() {
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
            <div className="relative flex flex-col justify-center items-start h-full min-h-[50vh] sm:min-h-[60vh] lg:min-h-[800px]">
              <ScrollSlideTitle
                direction="fromLeft"
                className="text-left text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#181823] leading-tight orbit uppercase tracking-tight mb-4 sm:mb-6 lg:mb-8"
              >
                INGÉNIERIE DU FROID ET DE LA CLIMATISATION À PARIS
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
                  Refrig'Air Systèmes conçoit, installe et maintient des solutions de climatisation de précision, de froid industriel et de froid commercial pour data centers, laboratoires, sites industriels, l'agroalimentaire et le retail à Paris et en Île‑de‑France.
                </motion.p>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-[#181823]/70 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                  viewport={{ once: true }}
                >
                  Chambres froides, salles blanches, réseaux d'eau glacée, vitrines réfrigérées, meubles froids, armoires frigorifiques, systèmes VRV/VRF et CTA haut rendement : nous dimensionnons des installations sur mesure répondant aux exigences de disponibilité (N+1), confinement allées chaudes/froides, contrôle hygrométrique et efficacité énergétique (free‑cooling, récupération de chaleur).
                </motion.p>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-[#181823]/70 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                  viewport={{ once: true }}
                  suppressHydrationWarning
                >
                  Conformité et traçabilité : HACCP, ISO 14644/22000, GxP. Supervision et télésurveillance 24/7, contrats de maintenance premium et interventions rapides ; Refrig'Air Systèmes réalise des opérations éligibles C2E et est certifié RGE pour des environnements critiques fiables et durables.
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
                alt="Installation de refroidissement industriel - Refrig'Air Systèmes"
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
            EXPERTISE FRIGORIFIQUE POUR L'INDUSTRIE
          </motion.h2>
          <motion.div
            className="text-lg sm:text-xl lg:text-2xl font-light text-[#537FE7] mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Solutions pour vos environnements
          </motion.div>
          <motion.p
            className="text-lg text-[#E9F8F9]/80 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Exploitant la puissance des technologies les plus avancées, nos solutions d'ingénierie frigorifique génèrent des performances optimales et durables. Accessibles partout, adaptées à tous vos besoins : climatisation professionnelle, maintenance préventive ou installations d'urgence, nous sommes en avance sur les défis pour que vous restiez performants.
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
              Nos Solutions
            </h2>
            <p className="text-[#537FE7] text-lg">[notre offre est simple]</p>
            <p className="text-[#E9F8F9]/60 text-lg mt-2">Le Froid — Molécule Essentielle</p>
            <p className="text-[#537FE7] text-sm mt-4">—Élevés par l'énergie, animés par l'innovation.</p>
          </motion.div>

          {/* Solution 1 - Climatisation Professionnelle */}
          <motion.div
            className="mb-16 border-b border-[#E9F8F9]/10 pb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 01 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Climatisation Professionnelle
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Solutions de confort thermique pour bureaux, commerces et établissements.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Systèmes de climatisation haute performance pour environnements tertiaires et commerciaux. Nos équipes conçoivent et déploient des installations sur mesure, garantissant confort optimal et efficacité énergétique maximale.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    De la conception à la mise en service, nous accompagnons vos projets de climatisation avec des solutions adaptées aux contraintes architecturales et réglementaires de chaque bâtiment.
                  </p>
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
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 02 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Froid Commercial & Vitrines Réfrigérées
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Solutions frigorifiques pour retail, restauration et distribution commerciale
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-[#E9F8F9] text-lg font-medium mb-3">Supermarchés & Hypermarchés</h4>
                    <p className="text-[#E9F8F9]/70 leading-relaxed mb-4">
                      Vitrines réfrigérées, meubles froids et armoires frigorifiques pour la grande distribution avec optimisation énergétique et conformité HACCP.
                    </p>
                    <ul className="text-[#537FE7] text-sm space-y-1">
                      <li>• Vitrines à porte coulissante</li>
                      <li>• Meubles froids ouverts</li>
                      <li>• Armoires de conservation</li>
                      <li>• Fluides frigorigènes écologiques</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#E9F8F9] text-lg font-medium mb-3">Restaurants & Boutiques</h4>
                    <p className="text-[#E9F8F9]/70 leading-relaxed mb-4">
                      Équipements frigorifiques compacts pour restauration rapide, boulangeries, boucheries et commerces de proximité.
                    </p>
                    <ul className="text-[#537FE7] text-sm space-y-1">
                      <li>• Vitrines pâtissières</li>
                      <li>• Armoires de stockage</li>
                      <li>• Meubles de vente</li>
                      <li>• Maintenance préventive</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Installation et maintenance de vitrines réfrigérées, meubles froids, armoires frigorifiques pour supermarchés, boutiques et restaurants. Optimisation énergétique des équipements frigorifiques commerciaux avec fluides écologiques.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Contrats de maintenance spécialisés pour garantir la continuité commerciale et la conservation optimale des produits frais. Interventions 24h/24 et 7j/7 pour minimiser les pertes de marchandises.
                  </p>
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
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 03 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Froid Industriel & Installations Très Haute Technicité
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Installations frigorifiques très haute technicité pour l'industrie pharmaceutique, agroalimentaire, salles blanches et très basse température.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div>
                    <h4 className="text-[#E9F8F9] text-lg font-medium mb-3">Très Basse Température</h4>
                    <p className="text-[#E9F8F9]/70 leading-relaxed mb-4">
                      Installations cryogéniques jusqu'à -80°C pour conservation d'échantillons biologiques, vaccins et produits pharmaceutiques sensibles.
                    </p>
                    <ul className="text-[#537FE7] text-sm space-y-1">
                      <li>• Chambres froides -80°C</li>
                      <li>• Armoires cryogéniques</li>
                      <li>• Conservation vaccins</li>
                      <li>• Échantillons biologiques</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[#E9F8F9] text-lg font-medium mb-3">Salles Blanches</h4>
                    <p className="text-[#E9F8F9]/70 leading-relaxed mb-4">
                      Environnements contrôlés ISO 14644 pour industries pharmaceutiques, électroniques et biotechnologiques.
                    </p>
                    <ul className="text-[#537FE7] text-sm space-y-1">
                      <li>• Classe ISO 5 à 8</li>
                      <li>• Contrôle particules</li>
                      <li>• Régulation T°C/RH</li>
                      <li>• Sursurveillance continue</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Chambres froides médicales, conservatoires agroalimentaires, data centers : nos installations très haute technicité respectent les normes les plus strictes (HACCP, ISO) pour garantir la chaîne du froid et la conservation optimale de vos produits.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Solutions modulaires et évolutives, conçues pour répondre aux exigences de traçabilité, de sécurité et de performance énergétique des environnements industriels les plus critiques. Expertise reconnue dans les installations très basse température et salles blanches.
                  </p>
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
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 04 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Maintenance Préventive & Supervision
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Contrats de maintenance premium avec supervision 24/7 pour assurer la continuité de vos installations.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Programmes de maintenance préventive sur mesure, télésurveillance en temps réel et interventions programmées pour maximiser la durée de vie de vos équipements et prévenir les pannes critiques.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Nos contrats premium incluent diagnostics énergétiques, optimisation des performances et reporting détaillé pour réduire vos coûts d'exploitation tout en garantissant la fiabilité de vos installations.
                  </p>
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
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 05 ]</span>
              <div className="flex-1">
                <h3 className="text-2xl lg:text-3xl font-light text-[#E9F8F9] mb-4 orbit">
                  Dépannage d'Urgence & Interventions Rapides
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Service d'intervention 24h/24, 7j/7 pour rétablir rapidement vos installations critiques.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Face aux pannes critiques, nos équipes d'intervention d'urgence sont mobilisables à tout moment. Diagnostic rapide, réparations immédiates et solutions temporaires pour garantir la continuité de votre activité.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Nos techniciens certifiés interviennent avec un stock de pièces détachées et d'équipements de secours pour assurer un dépannage efficace et durable, minimisant les temps d'arrêt de vos installations.
                  </p>
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
              Ils nous ont fait confiance
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Des entreprises de renom nous font confiance pour leurs installations critiques. 
              Laboratoires, industrie, retail, luxe : découvrez nos clients partenaires.
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
            className="w-full h-full bg-cover bg-no-repeat"
            style={{
              backgroundImage: "url('/images/home/team.jpeg')",
              backgroundPosition: "center -170%",
              width: "120%",
              height: "120%",
              marginLeft: "-10%",
              marginTop: "-10%",
              minWidth: "120%",
              minHeight: "120%"
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
              Votre projet, notre expertise
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              Parlez-nous de vos besoins en climatisation et froid industriel. Nos ingénieurs vous accompagnent dans l'élaboration d'une solution sur mesure. Demandez dès maintenant une étude personnalisée et recevez un devis instantané.
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
                  className="rounded-sm transition-all duration-200 btn-effect-5 btn-standard"
                  whileHover={{ scale: 1.05, y: 0 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Nous contacter
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
