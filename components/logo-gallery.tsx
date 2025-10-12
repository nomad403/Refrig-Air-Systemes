"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const partnerLogos = [
  { 
    name: "Daikin", 
    logoPath: "/images/home/gallery/daikin.png",
    website: "https://www.daikin.fr/"
  },
  { 
    name: "Mitsubishi Electric", 
    logoPath: "/images/home/gallery/mitsubishi-electric-cooling-heating-logo-i17iwys3nweuzmyg-2.png",
    website: "https://www.mitsubishielectric.fr/"
  },
  { 
    name: "Carrier", 
    logoPath: "/images/home/gallery/carrier.png",
    website: "https://www.carrier.fr/"
  },
  { 
    name: "Trane", 
    logoPath: "/images/home/gallery/trane.png",
    website: "https://www.trane.com/fr-fr/"
  },
  { 
    name: "Johnson Controls", 
    logoPath: "/images/home/gallery/johnson-controls-2.png",
    website: "https://www.johnsoncontrols.com/fr-fr"
  },
  { 
    name: "Danfoss", 
    logoPath: "/images/home/gallery/danfoss-3.png",
    website: "https://www.danfoss.com/fr-fr/"
  },
  { 
    name: "Panasonic", 
    logoPath: "/images/home/gallery/panasonic.png",
    website: "https://www.panasonic.fr/"
  },
  { 
    name: "Liebherr", 
    logoPath: "/images/home/gallery/liebherr.png",
    website: "https://www.liebherr.com/fr/fra/"
  },
  { 
    name: "STULZ", 
    logoPath: "/images/home/gallery/stulz.png",
    website: "https://www.stulz.fr/"
  },
  { 
    name: "Emerson", 
    logoPath: "/images/home/gallery/emerson-electric.png",
    website: "https://www.emerson.com/fr-fr"
  },
  { 
    name: "General Electric", 
    logoPath: "/images/home/gallery/general-electric.png",
    website: "https://www.ge.com/"
  },
]

export default function LogoGallery() {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedLogo, setSelectedLogo] = useState<number | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const positionRef = useRef(0)

  // Animation avec requestAnimationFrame pour scroll continu sans sursaut
  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const speed = 0.5 // pixels par frame (ajustable)
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
          const totalWidth = itemWidth * partnerLogos.length

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

  // Tripler les logos pour assurer qu'il y a toujours assez d'éléments visibles
  const tripleLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos]

  return (
    <div className="relative w-screen overflow-hidden -ml-[50vw] left-1/2">
      <div 
        ref={scrollRef}
        className="flex items-center py-4 sm:py-6 lg:py-8 space-x-12 sm:space-x-16 lg:space-x-20"
        style={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          willChange: 'transform'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setSelectedLogo(null)
        }}
      >
        {tripleLogos.map((partner, index) => (
          <div
            key={`${partner.name}-${index}`}
            className="flex-shrink-0 flex items-center justify-center group cursor-pointer w-[8rem] h-[4rem] sm:w-[10rem] sm:h-[5rem] lg:w-[12rem] lg:h-[6rem] px-8"
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
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full h-full"
              aria-label={`Visiter le site officiel de ${partner.name}`}
            >
              <div 
                className={`transition-all duration-300 flex items-center justify-center w-full h-full ${
                  selectedLogo === index 
                    ? 'scale-110 brightness-125 drop-shadow-lg' 
                    : 'scale-100 brightness-75 hover:scale-105 hover:brightness-90'
                }`}
              >
                <Image
                  src={partner.logoPath}
                  alt={`Logo ${partner.name} - Constructeur de systèmes de climatisation et réfrigération`}
                  width={400}
                  height={200}
                  className="max-w-[90%] max-h-[90%] object-contain"
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center'
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
