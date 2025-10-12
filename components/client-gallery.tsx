"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const clientLogos = [
  { 
    name: "Cerbaillance", 
    logoPath: "/images/home/clients/cerbailliance.png",
    website: "https://www.cerbaillance.com/",
    invert: true
  },
  { 
    name: "Elior", 
    logoPath: "/images/home/clients/elior.png",
    website: "https://www.elior.com/",
    invert: true
  },
  { 
    name: "Hapag-Lloyd", 
    logoPath: "/images/home/clients/hapag-lloyd.png",
    website: "https://www.hapag-lloyd.com/",
    invert: true
  },
  { 
    name: "Hutchinson", 
    logoPath: "/images/home/clients/Hutchinson.png",
    website: "https://www.hutchinson.com/",
    invert: true
  },
  { 
    name: "Idex", 
    logoPath: "/images/home/clients/idex.png",
    website: "https://www.idex.com/",
    invert: true
  },
  { 
    name: "Institut Curie", 
    logoPath: "/images/home/clients/institut_curie.png",
    website: "https://curie.fr/",
    invert: true
  },
  { 
    name: "EFS", 
    logoPath: "/images/home/clients/Logo_EFS.svg.png",
    website: "https://www.efs.sante.fr/",
    invert: true
  },
  { 
    name: "ANFA", 
    logoPath: "/images/home/clients/logo-vectoriel-anfa.jpg.png",
    website: "https://www.anfa-auto.fr/",
    invert: true
  },
  { 
    name: "Nina Ricci", 
    logoPath: "/images/home/clients/nina ricci.png",
    website: "https://www.ninaricci.com/",
    invert: true
  },
  { 
    name: "Rochas", 
    logoPath: "/images/home/clients/rochas.png",
    website: "https://www.rochas.com/",
    invert: true
  },
  { 
    name: "Viparis", 
    logoPath: "/images/home/clients/Viparis_blanc.png",
    website: "https://www.viparis.com/",
    invert: false
  },
]

export default function ClientGallery() {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const positionRef = useRef(0)

  // Animation avec requestAnimationFrame pour scroll continu sans sursaut
  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const speed = 0.3 // Vitesse plus lente pour les clients
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      if (!isHovered) {
        const deltaTime = currentTime - lastTime
        const distance = (speed * deltaTime) / 16 // Normaliser pour 60fps

        positionRef.current += distance

        // Récupérer la largeur d'un ensemble de logos
        const firstChild = element.firstElementChild as HTMLElement
        if (firstChild) {
          const itemWidth = firstChild.offsetWidth
          const totalWidth = itemWidth * clientLogos.length

          // Reset invisible quand on a scrollé une longueur complète
          if (positionRef.current >= totalWidth) {
            positionRef.current -= totalWidth
          }

          element.style.transform = `translateX(-${positionRef.current}px)`
        }
      }

      lastTime = currentTime
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovered])

  // Dupliquer les logos pour assurer qu'il y a toujours assez d'éléments visibles
  const tripleLogos = [...clientLogos, ...clientLogos, ...clientLogos]

  return (
    <div className="relative w-screen overflow-hidden -ml-[50vw] left-1/2">
      <div 
        ref={scrollRef}
        className="flex items-center py-8 sm:py-12 lg:py-16 space-x-16 sm:space-x-20 lg:space-x-24 min-h-[20rem] sm:min-h-[24rem] lg:min-h-[28rem]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setSelectedLogo(null)
        }}
        style={{ willChange: 'transform' }}
      >
        {tripleLogos.map((client, index) => (
          <div
            key={`${client.name}-${index}`}
            className={`flex-shrink-0 flex items-center justify-center group cursor-pointer w-[14rem] h-[7rem] sm:w-[16rem] sm:h-[8rem] lg:w-[18rem] lg:h-[9rem] px-8 ${
              index % 2 === 0 ? 'self-start' : 'self-end'
            }`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
            onMouseEnter={() => setSelectedLogo(index)}
            onMouseLeave={() => setSelectedLogo(null)}
          >
            <a 
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
              aria-label={`Voir le site de ${client.name}`}
            >
              <div 
                className={`transition-all duration-300 flex items-center justify-center ${
                  selectedLogo === index 
                    ? 'scale-105 brightness-110 drop-shadow-lg' 
                    : 'scale-100 brightness-90 hover:scale-102 hover:brightness-100'
                }`}
              >
                <Image
                  src={client.logoPath}
                  alt={`Logo ${client.name} - Client Refrig'Air Systèmes`}
                  width={400}
                  height={200}
                  className={`max-w-full max-h-full object-contain ${
                    client.invert ? 'filter brightness-0 invert' : 'filter brightness-0'
                  }`}
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center',
                    aspectRatio: 'auto'
                  }}
                  priority={false}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
