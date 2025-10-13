"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const clientLogos = [
  { 
    name: "Cerbaillance", 
    logoPath: "/images/home/clients/cerbailliance.png",
    website: "https://www.cerbaillance.com/",
    invert: true,
    scale: 1.5
  },
  { 
    name: "Elior", 
    logoPath: "/images/home/clients/elior.png",
    website: "https://www.elior.com/",
    invert: true,
    scale: 1.2
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
    invert: true,
    scale: 2.2
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
    invert: true,
    scale: 1.8
  },
  { 
    name: "EFS", 
    logoPath: "/images/home/clients/Logo_EFS.svg.png",
    website: "https://www.efs.sante.fr/",
    invert: true,
    scale: 1.7
  },
  { 
    name: "ANFA", 
    logoPath: "/images/home/clients/logo-vectoriel-anfa.jpg.png",
    website: "https://www.anfa-auto.fr/",
    invert: true,
    scale: 1.5
  },
  { 
    name: "Nina Ricci", 
    logoPath: "/images/home/clients/nina ricci.png",
    website: "https://www.ninaricci.com/",
    invert: true,
    scale: 1.5
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
  const [isUserScrolling, setIsUserScrolling] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const positionRef = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Animation CSS native pour scroll continu avec recyclage parfait
  useEffect(() => {
    const element = scrollRef.current
    if (!element) return

    const fixedItemWidth = 300
    const singleSetWidth = fixedItemWidth * clientLogos.length
    const animationDuration = (singleSetWidth / 0.6) * 16 // Convertir pixels/frame en ms

    // Créer l'animation CSS keyframes dynamiquement
    const keyframes = `
      @keyframes clientScroll {
        0% { transform: translate3d(0, 0, 0); }
        100% { transform: translate3d(-${singleSetWidth}px, 0, 0); }
      }
    `

    // Injecter les keyframes dans le document
    let styleElement = document.getElementById('client-gallery-animation')
    if (!styleElement) {
      styleElement = document.createElement('style')
      styleElement.id = 'client-gallery-animation'
      document.head.appendChild(styleElement)
    }
    styleElement.textContent = keyframes

    // Appliquer l'animation
    element.style.animation = `clientScroll ${animationDuration}ms linear infinite`
    element.style.animationPlayState = isHovered || isUserScrolling ? 'paused' : 'running'

    return () => {
      // Nettoyer l'animation
      element.style.animation = ''
    }
  }, [isHovered, isUserScrolling, clientLogos.length])

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

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      setIsUserScrolling(true)
      startX = e.clientX
      
      element.style.cursor = 'grabbing'
      element.style.animationPlayState = 'paused'
      e.preventDefault()
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
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
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  position: 'relative'
                }}
              >
                <Image
                  src={client.logoPath}
                  alt={`Logo ${client.name} - Client Refrig'Air Systèmes`}
                  width={400}
                  height={200}
                  className={`max-w-full max-h-full object-contain ${
                    client.invert ? 'filter brightness-0 invert' : ''
                  }`}
                  style={{ 
                    objectFit: 'contain',
                    objectPosition: 'center',
                    aspectRatio: 'auto',
                    display: 'block',
                    margin: '0 auto',
                    transform: client.scale ? `scale(${client.scale})` : 'scale(1)'
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
