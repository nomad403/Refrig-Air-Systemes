"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const partnerLogos = [
  { 
    name: "Daikin", 
    logoPath: "/images/home/gallery/daikin.png",
    website: "https://www.daikin.fr/",
    scale: 1.3
  },
  { 
    name: "Mitsubishi Electric", 
    logoPath: "/images/home/gallery/mitsubishi-electric-cooling-heating-logo-i17iwys3nweuzmyg-2.png",
    website: "https://fr.mitsubishielectric.com/fr/",
    scale: 1.4
  },
  { 
    name: "Carrier", 
    logoPath: "/images/home/gallery/carrier.png",
    website: "https://www.carrier.fr/",
    scale: 1.2
  },
  { 
    name: "Trane", 
    logoPath: "/images/home/gallery/trane.png",
    website: "https://trane.eu/fr/",
    scale: 1.3
  },
  { 
    name: "Johnson Controls", 
    logoPath: "/images/home/gallery/johnson-controls-2.png",
    website: "https://www.johnsoncontrols.fr/",
    scale: 1.3
  },
  { 
    name: "Danfoss", 
    logoPath: "/images/home/gallery/danfoss-3.png",
    website: "https://www.danfoss.com/fr-fr/",
    scale: 1.2
  },
  { 
    name: "Panasonic", 
    logoPath: "/images/home/gallery/panasonic.png",
    website: "https://www.panasonic.fr/",
    scale: 1.5
  },
  { 
    name: "Liebherr", 
    logoPath: "/images/home/gallery/liebherr.png",
    website: "https://www.liebherr.com/fr/fra/",
    scale: 1.4
  },
  { 
    name: "STULZ", 
    logoPath: "/images/home/gallery/stulz.png",
    website: "https://www.stulz.fr/"
  },
  { 
    name: "Emerson", 
    logoPath: "/images/home/gallery/emerson-electric.png",
    website: "https://www.emerson.com/fr-fr",
    scale: 1.2
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
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const positionRef = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Animation CSS native pour scroll continu avec recyclage parfait
  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const fixedItemWidth = 200
    const singleSetWidth = fixedItemWidth * partnerLogos.length
    const animationDuration = (singleSetWidth / 0.5) * 16 // Convertir pixels/frame en ms

    // Créer l'animation CSS keyframes dynamiquement
    const keyframes = `
      @keyframes logoScroll {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-${singleSetWidth}px, 0, 0); }
      }
    `

    // Injecter les keyframes dans le document
    let styleElement = document.getElementById('logo-gallery-animation')
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'logo-gallery-animation'
      document.head.appendChild(styleElement)
    }
    styleElement.textContent = keyframes

    // Appliquer l'animation
    element.style.animation = `logoScroll ${animationDuration}ms linear infinite`
    element.style.animationPlayState = isHovered || isUserScrolling ? 'paused' : 'running'

    return () => {
      // Nettoyer l'animation
      element.style.animation = ''
    }
  }, [isHovered, isUserScrolling, partnerLogos.length])

  // Redémarrer l'animation lors du redimensionnement pour éviter les sursauts
  useEffect(() => {
    const handleResize = () => {
      // L'animation CSS se recalcule automatiquement, pas besoin de reset manuel
      const element = scrollRef.current
      if (element) {
        // Forcer le recalcul de l'animation
        element.style.animation = 'none'
        element.offsetHeight // Trigger reflow
        element.style.animation = ''
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Gestion du scroll manuel avec clic maintenu (pause/resume de l'animation CSS)
  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    let isDragging = false
    let startX = 0
    let animationPaused = false

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      setIsUserScrolling(true)
      startX = e.clientX
      
      // Sauvegarder l'état de l'animation
      const computedStyle = getComputedStyle(element)
      animationPaused = computedStyle.animationPlayState === 'paused'
      
      element.style.cursor = 'grabbing'
      element.style.animationPlayState = 'paused'
      e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      // Pour le scroll manuel, on peut utiliser une approche hybride
      // ou simplement permettre le drag sans casser l'animation CSS
      const deltaX = startX - e.clientX
      const currentTransform = element.style.transform || 'translate3d(0, 0, 0)'
      
      // Extraire la valeur X actuelle et appliquer le delta
      const match = currentTransform.match(/translate3d\((-?\d+(?:\.\d+)?)px/)
      const currentX = match ? parseFloat(match[1]) : 0
      const newX = currentX + deltaX
      
      element.style.transform = `translate3d(${newX}px, 0, 0)`
      startX = e.clientX // Mettre à jour pour le prochain mouvement
    }

    const handleMouseUp = () => {
      if (isDragging) {
        isDragging = false
        element.style.cursor = 'grab'
        
        // Réactiver l'animation automatique après 2 secondes
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false)
        }, 2000)
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      isDragging = true
      setIsUserScrolling(true)
      startX = e.touches[0].clientX
      element.style.animationPlayState = 'paused'
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      
      const deltaX = startX - e.touches[0].clientX
      const currentTransform = element.style.transform || 'translate3d(0, 0, 0)'
      
      const match = currentTransform.match(/translate3d\((-?\d+(?:\.\d+)?)px/)
      const currentX = match ? parseFloat(match[1]) : 0
      const newX = currentX + deltaX
      
      element.style.transform = `translate3d(${newX}px, 0, 0)`
      startX = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
      if (isDragging) {
        isDragging = false
        
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsUserScrolling(false)
        }, 2000)
      }
    }

    element.style.cursor = 'grab'
    element.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    element.addEventListener('touchstart', handleTouchStart, { passive: true })
    element.addEventListener('touchmove', handleTouchMove, { passive: true })
    element.addEventListener('touchend', handleTouchEnd, { passive: true })

    return () => {
      element.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      element.removeEventListener('touchstart', handleTouchStart)
      element.removeEventListener('touchmove', handleTouchMove)
      element.removeEventListener('touchend', handleTouchEnd)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Tripler les logos pour assurer qu'il y a toujours assez d'éléments visibles
  const tripleLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos]

  return (
    <div className="relative w-screen overflow-hidden -ml-[50vw] left-1/2 mix-blend-difference">
      <div 
        ref={scrollRef}
        className="flex items-center py-4 sm:py-6 lg:py-8 space-x-12 sm:space-x-16 lg:space-x-20 mix-blend-difference"
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
                className={`transition-all duration-300 flex items-center justify-center w-full h-full mix-blend-difference ${
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
                  className="max-w-[90%] max-h-[90%] object-contain mix-blend-difference"
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center',
                    transform: partner.scale ? `scale(${partner.scale})` : 'scale(1)'
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
