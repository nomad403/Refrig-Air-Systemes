"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface ShaderBackgroundProps {
  children?: React.ReactNode
  videoId?: string // ID de la vidéo YouTube à afficher
  backgroundType?: "video" | "image" // Type de fond : vidéo ou image
  imageUrl?: string // URL de l'image de fond (si backgroundType = "image")
}

export default function ShaderBackground({ 
  children, 
  videoId = "voQricfn750", 
  backgroundType = "video",
  imageUrl 
}: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isActive, setIsActive] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const loopTimerRef = useRef<any>(null)

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Observer d'apparition pour différer le chargement du player
    const container = containerRef.current
    if (!container) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsInView(entry.isIntersecting))
    }, { threshold: 0.2 })
    io.observe(container)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    // Ne charger l'API YouTube que si la vidéo est visible
    if (backgroundType === "video" && isInView) {
      // Ne pas injecter plusieurs fois le script
      const existing = Array.from(document.getElementsByTagName('script')).some(s => s.src.includes('youtube.com/iframe_api'))
      if (!existing) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
      }

      // Fonction globale requise par YouTube API
      window.onYouTubeIframeAPIReady = () => {
        if (window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player('youtube-player', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              mute: 1,
              loop: 1,
              playlist: videoId,
              controls: 0,
              showinfo: 0,
              rel: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              playsinline: 1,
              start: 0,
              fs: 0,
              cc_load_policy: 0,
              disablekb: 1,
              enablejsapi: 1
            },
            events: {
              onReady: (event: any) => {
                event.target.setPlaybackQuality('hd1080')
                event.target.mute()
                event.target.playVideo()
                setIsPlayerReady(true)
                // Boucle quasi-instantanée: surveiller la fin et "seek" juste avant END
                if (loopTimerRef.current) clearInterval(loopTimerRef.current)
                loopTimerRef.current = setInterval(() => {
                  try {
                    const t = event.target.getCurrentTime?.() ?? 0
                    const d = event.target.getDuration?.() ?? 0
                    if (d > 0 && d - t <= 0.15) {
                      event.target.seekTo(0, true)
                    }
                  } catch {}
                }, 100)
              },
              onStateChange: (event: any) => {
                // Relancer la vidéo si elle s'arrête
                if (event.data === window.YT.PlayerState.ENDED) {
                  event.target.seekTo(0, true)
                  event.target.playVideo()
                }
              }
            }
          })
        }
      }
    }

    const handleMouseEnter = () => setIsActive(true)
    const handleMouseLeave = () => setIsActive(false)

    const container = containerRef.current
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
      if (loopTimerRef.current) clearInterval(loopTimerRef.current)
    }
  }, [backgroundType, videoId, isInView])

  return (
    <div ref={containerRef} className={`min-h-screen bg-black relative overflow-hidden ${isMobile ? 'shader-background-mobile' : ''}`}>
      {backgroundType === "video" ? (
        // Video Background YouTube API
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            id="youtube-player"
            className="w-full h-full"
            style={{
              pointerEvents: "none",
              // Desktop: format paysage (16:9)
              width: isMobile ? "177.78vh" : "120vw", // 16/9 * 100vh pour couvrir toute la hauteur
              height: isMobile ? "100vh" : "120vh", 
              marginLeft: isMobile ? "calc((100vw - 177.78vh) / 2)" : "-10vw",
              marginTop: isMobile ? "0" : "-10vh",
              minWidth: isMobile ? "177.78vh" : "120vw",
              minHeight: isMobile ? "100vh" : "120vh"
            }}
          />
          {/* Masque anti-loader le temps du ready */}
          {!isPlayerReady && (
            <div className="absolute inset-0 bg-black" />
          )}
          
          {/* Overlay pour donner du contraste sous le header */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        </div>
      ) : (
        // Image Background
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
              width: isMobile ? "177.78vh" : "120vw",
              height: isMobile ? "100vh" : "120vh", 
              marginLeft: isMobile ? "calc((100vw - 177.78vh) / 2)" : "-10vw",
              marginTop: isMobile ? "0" : "-10vh",
              minWidth: isMobile ? "177.78vh" : "120vw",
              minHeight: isMobile ? "100vh" : "120vh"
            }}
          />
          
          {/* Overlay pour assombrir l'image et contraste sous le header */}
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        </div>
      )}

      {children}
    </div>
  )
}
