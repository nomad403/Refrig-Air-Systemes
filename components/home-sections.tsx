"use client"

import { motion } from "framer-motion"
import Section3D from "./section-3d"

export default function HomeSections() {
  return (
    <div className="relative z-20 bg-[#181823]">
      {/* Bloc 1 — Présentation */}
      <motion.section 
        className="min-h-screen flex items-center px-6 lg:px-12 bg-[#E9F8F9]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h1 className="text-xl lg:text-2xl font-light text-[#181823] mb-6 leading-tight orbit">
              Ingénierie du froid et de la climatisation à Paris
            </h1>
            <p className="text-lg text-[#181823]/80 leading-relaxed">
              Refrig'Air Systèmes accompagne entreprises et institutions dans la conception, l'installation et la maintenance de solutions frigorifiques et climatiques haut de gamme. Précision, fiabilité et efficacité énergétique sont au cœur de chaque projet.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="h-[800px] xl:col-span-3"
          >
            <Section3D 
              modelPath="/3d/hvac/AC04anim.glb"
              position="right"
              scale={0.7}
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Introduction Titre Principal */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#181823] text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl lg:text-6xl font-light text-[#E9F8F9] mb-8 leading-tight orbit"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            EXPERTISE FRIGORIFIQUE POUR L'INDUSTRIE
          </motion.h2>
          <motion.div
            className="text-xl lg:text-2xl font-light text-[#537FE7] mb-12"
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

          {/* Solution 2 - Froid Industriel */}
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
                  Froid Industriel & Chambres Froides
                </h3>
                <p className="text-[#537FE7] text-lg mb-6">
                  Installations frigorifiques pour l'industrie pharmaceutique, agroalimentaire et la grande distribution.
                </p>
                <div className="space-y-4">
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Chambres froides médicales, conservatoires agroalimentaires, data centers : nos installations respectent les normes les plus strictes (HACCP, GDP, ISO) pour garantir la chaîne du froid et la conservation optimale de vos produits.
                  </p>
                  <p className="text-[#E9F8F9]/80 leading-relaxed">
                    Solutions modulaires et évolutives, conçues pour répondre aux exigences de traçabilité, de sécurité et de performance énergétique des environnements industriels les plus critiques.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution 3 - Maintenance Préventive */}
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

          {/* Solution 4 - Dépannage d'Urgence */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-start mb-6">
              <span className="text-[#537FE7] text-lg font-mono mr-4">[ 04 ]</span>
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

      {/* Section Avantages - Style GenCell "we keep you powered" */}
      <motion.section 
        className="py-20 px-6 lg:px-12 bg-[#E9F8F9]"
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
            <h2 className="text-3xl lg:text-4xl font-light text-[#181823] mb-6 orbit">
              nous vous gardons opérationnels
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Sans interruptions - Chaîne */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                  <path d="M9 7H6C4.9 7 4 7.9 4 9V15C4 16.1 4.9 17 6 17H9C10.1 17 11 16.1 11 15V9C11 7.9 10.1 7 9 7Z" stroke="#537FE7" strokeWidth="2"/>
                  <path d="M15 7H18C19.1 7 20 7.9 20 9V15C20 16.1 19.1 17 18 17H15C13.9 17 13 16.1 13 15V9C13 7.9 13.9 7 15 7Z" stroke="#537FE7" strokeWidth="2"/>
                  <path d="M11 12H13" stroke="#537FE7" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">Sans interruptions</h3>
            </motion.div>

            {/* Énergie propre - Feuille */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C8 3 5 6 5 10C5 14 8 17 12 21C16 17 19 14 19 10C19 6 16 3 12 3Z" stroke="#537FE7" strokeWidth="2" fill="none"/>
                  <path d="M12 7V17" stroke="#537FE7" strokeWidth="1.5"/>
                  <path d="M9 10L12 13L15 10" stroke="#537FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">Énergie propre</h3>
            </motion.div>

            {/* Performance illimitée - Compteur/Gauge */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12C3 7.5 7.5 3 12 3S21 7.5 21 12C21 16.5 17.5 21 12 21" stroke="#537FE7" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 7V12L16 16" stroke="#537FE7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="1.5" fill="#537FE7"/>
                  <path d="M7 7L5 5" stroke="#537FE7" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M17 7L19 5" stroke="#537FE7" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">Performance illimitée</h3>
            </motion.div>

            {/* Innovation intelligente - Ampoule */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H15" stroke="#537FE7" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 18H14" stroke="#537FE7" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 2C8.5 2 6 4.5 6 8C6 10 7 11.5 8.5 12.5C9 13 9.5 13.5 9.5 14.5V16H14.5V14.5C14.5 13.5 15 13 15.5 12.5C17 11.5 18 10 18 8C18 4.5 15.5 2 12 2Z" stroke="#537FE7" strokeWidth="2"/>
                  <path d="M10 9L12 11L14 9" stroke="#537FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">Innovation intelligente</h3>
            </motion.div>

            {/* Expertise persistante - Engrenage */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#537FE7" strokeWidth="2"/>
                  <path d="M19.4 15C19.2669 15.3016 19.2669 15.6484 19.4 15.95L20.4 17.8C20.5 18 20.4 18.3 20.2 18.4L18.8 19.2C18.6 19.3 18.3 19.2 18.2 19L17.2 17.1C16.8 17.3 16.4 17.4 16 17.4H15C14.7 17.4 14.4 17.6 14.3 17.9L14 20C13.9 20.3 13.6 20.5 13.3 20.5H11.7C11.4 20.5 11.1 20.3 11 20L10.7 17.9C10.6 17.6 10.3 17.4 10 17.4H9C8.6 17.4 8.2 17.3 7.8 17.1L6.8 19C6.7 19.2 6.4 19.3 6.2 19.2L4.8 18.4C4.6 18.3 4.5 18 4.6 17.8L5.6 15.95C5.7331 15.6484 5.7331 15.3016 5.6 15L4.6 13.2C4.5 13 4.6 12.7 4.8 12.6L6.2 11.8C6.4 11.7 6.7 11.8 6.8 12L7.8 13.9C8.2 13.7 8.6 13.6 9 13.6H10C10.3 13.6 10.6 13.4 10.7 13.1L11 11C11.1 10.7 11.4 10.5 11.7 10.5H13.3C13.6 10.5 13.9 10.7 14 11L14.3 13.1C14.4 13.4 14.7 13.6 15 13.6H16C16.4 13.6 16.8 13.7 17.2 13.9L18.2 12C18.3 11.8 18.6 11.7 18.8 11.8L20.2 12.6C20.4 12.7 20.5 13 20.4 13.2L19.4 15Z" stroke="#537FE7" strokeWidth="1.5"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#181823] mb-2">Expertise persistante</h3>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Bloc 5 — Contact */}
      <motion.section 
        className="min-h-screen flex items-center px-6 lg:px-12 bg-[#E9F8F9] relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-light text-[#181823] mb-6 leading-tight orbit">
              Votre projet, notre expertise
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-[#181823]/80 leading-relaxed mb-8">
              Parlez-nous de vos besoins en climatisation et froid industriel. Nos ingénieurs vous accompagnent dans l'élaboration d'une solution sur mesure. Demandez dès maintenant une étude personnalisée et recevez un devis instantané.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className="px-8 py-4 bg-[#537FE7] text-[#E9F8F9] font-medium rounded-full hover:bg-[#537FE7]/90 transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Demander un devis
              </motion.button>
              <motion.button 
                className="px-8 py-4 border border-[#537FE7] text-[#537FE7] font-medium rounded-full hover:bg-[#537FE7] hover:text-[#E9F8F9] transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Nous contacter
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
