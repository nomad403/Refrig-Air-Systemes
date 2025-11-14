"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePerformance } from "@/contexts/performance-context"

const videoBlobCache = new Map<string, string>()
const videoFetchPromises = new Map<string, Promise<string>>()

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface ShaderBackgroundProps {
  children?: React.ReactNode
  videoId?: string // ID de la vidéo YouTube à afficher
  videoUrl?: string // URL d'une vidéo locale
  backgroundType?: "video" | "image" // Type de fond : vidéo ou image
  imageUrl?: string // URL de l'image de fond (si backgroundType = "image")
  videoStyle?: React.CSSProperties // Styles supplémentaires pour ajuster le cadrage de la vidéo
}

export default function ShaderBackground({ 
  children, 
  videoId = "voQricfn750", 
  videoUrl,
  backgroundType = "video",
  imageUrl,
  videoStyle
}: ShaderBackgroundProps) {
  const { forceImageFallback, isMobile: perfIsMobile } = usePerformance()
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isActive, setIsActive] = useState(false)
  const [isBackgroundReady, setIsBackgroundReady] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [showPoster, setShowPoster] = useState(true) // Afficher l'image poster immédiatement
  const [videoCanPlay, setVideoCanPlay] = useState(false) // Vidéo prête à jouer
  
  // Utiliser une image seulement si explicitement demandé ou si erreur vidéo
  const shouldUseImage = forceImageFallback || videoError
  const loopTimerRef = useRef<any>(null)
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState<string | null>(videoUrl ?? null)
  const [videoAspectRatio, setVideoAspectRatio] = useState(16 / 9)
  const defaultMediaStyle = useCallback((): React.CSSProperties => ({
    width: "100vw",
    height: "100vh",
    minWidth: "100vw",
    minHeight: "100vh",
    marginLeft: "0px",
    marginTop: "0px"
  }), [])

  const computeMediaStyle = useCallback((ratio: number): React.CSSProperties => {
    if (typeof window === "undefined") {
      return defaultMediaStyle()
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    const targetWidth = Math.max(vw, vh * ratio)
    const targetHeight = Math.max(vh, vw / ratio)
    const marginLeft = (vw - targetWidth) / 2
    const marginTop = (vh - targetHeight) / 2

    return {
      width: `${targetWidth}px`,
      height: `${targetHeight}px`,
      minWidth: `${targetWidth}px`,
      minHeight: `${targetHeight}px`,
      marginLeft: `${marginLeft}px`,
      marginTop: `${marginTop}px`
    }
  }, [defaultMediaStyle])

  const [mediaStyle, setMediaStyle] = useState<React.CSSProperties>(defaultMediaStyle)

  // Détecter si on est sur mobile, iOS et Android
  useEffect(() => {
    if (typeof window === "undefined") return
    
    // Détecter iOS (iPhone, iPad, iPod)
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    setIsIOS(isIOSDevice)

    const updateLayout = () => {
      if (typeof window === "undefined") return
      setIsMobile(window.innerWidth <= 768)
      setMediaStyle(computeMediaStyle(videoAspectRatio))
    }

    updateLayout()
    
    // Throttler le resize pour éviter trop d'événements sur mobile
    let resizeTimeout: NodeJS.Timeout | null = null
    const throttledResize = () => {
      if (resizeTimeout) return
      resizeTimeout = setTimeout(() => {
        updateLayout()
        resizeTimeout = null
      }, isMobile ? 300 : 100)
    }
    
    window.addEventListener("resize", throttledResize, { passive: true })

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", throttledResize)
      }
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
    }
  }, [computeMediaStyle, videoAspectRatio, isMobile])

  useEffect(() => {
    // Nettoyer la vidéo précédente avant de charger une nouvelle
    const videoEl = localVideoRef.current
    if (videoEl) {
      videoEl.pause()
      if (isMobile) {
        videoEl.src = ''
        videoEl.load()
      }
    }
    
    setIsBackgroundReady(false)
    setVideoError(false)
    setShowPoster(true) // Réafficher le poster pour la nouvelle vidéo
    setVideoCanPlay(false)
    setResolvedVideoUrl(videoUrl ?? null)
  }, [backgroundType, videoId, videoUrl, isMobile, shouldUseImage])

  useEffect(() => {
    // Observer d'apparition pour différer le chargement du player
    const container = containerRef.current
    if (!container || typeof window === "undefined" || !window.IntersectionObserver) {
      // Fallback si IntersectionObserver n'est pas disponible
      setIsInView(true)
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsInView(entry.isIntersecting))
    }, { threshold: 0.2 })
    io.observe(container)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    // Ne charger l'API YouTube que si la vidéo est visible
    if (backgroundType === "video" && !videoUrl && isInView && typeof document !== "undefined") {
      // Ne pas injecter plusieurs fois le script
      const existing = Array.from(document.getElementsByTagName('script')).some(s => s.src.includes('youtube.com/iframe_api'))
      if (!existing) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        tag.async = true
        const firstScriptTag = document.getElementsByTagName('script')[0]
        if (firstScriptTag?.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        }
      }

      // Fonction globale requise par YouTube API
      if (typeof window !== "undefined") {
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
                setIsBackgroundReady(true)
                setMediaStyle(computeMediaStyle(videoAspectRatio))
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
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy()
        } catch {}
        playerRef.current = null
      }
    }
  }, [backgroundType, videoId, videoUrl, isInView])

  useEffect(() => {
    // Si on doit utiliser une image, ne pas charger la vidéo du tout
    if (shouldUseImage || !videoUrl) return
    
    // LAZY LOADING STRICT : ne résoudre l'URL que si la vidéo est visible
    // Cela évite de charger quoi que ce soit si la vidéo n'est pas visible
    if (!isInView) {
      // Si pas visible, ne pas résoudre l'URL (économie de ressources)
      return
    }
    
    let isActive = true
    let currentBlobUrl: string | null = null

    // Sur mobile (iOS et Android), éviter le blob cache pour économiser la mémoire
    // Utiliser directement l'URL pour éviter les problèmes de mémoire
    // iOS préfère MP4 (H.264) pour le décodage matériel, WebM est décodé en software
    if (isMobile || isIOS) {
      if (isIOS && videoUrl.endsWith('.webm')) {
        const mp4Url = videoUrl.replace('.webm', '.mp4')
        setResolvedVideoUrl(mp4Url)
      } else {
        setResolvedVideoUrl(videoUrl)
      }
      return () => {
        isActive = false
      }
    }

    const getVideoBlobUrl = async () => {
      if (videoBlobCache.has(videoUrl)) {
        return videoBlobCache.get(videoUrl)!
      }
      let promise = videoFetchPromises.get(videoUrl)
      if (!promise) {
        promise = fetch(videoUrl, { cache: "force-cache" })
          .then((response) => {
            if (!response.ok) throw new Error(`Failed to preload video: ${response.status}`)
            return response.blob()
          })
          .then((blob) => {
            const objectUrl = URL.createObjectURL(blob)
            videoBlobCache.set(videoUrl, objectUrl)
            return objectUrl
          })
          .catch(() => {
            setVideoError(true)
            return videoUrl
          })
        videoFetchPromises.set(videoUrl, promise)
      }
      return promise
    }

    getVideoBlobUrl().then((url) => {
      if (isActive) {
        currentBlobUrl = url.startsWith('blob:') ? url : null
        setResolvedVideoUrl(url)
      }
    }).catch(() => {
      if (isActive) {
        setVideoError(true)
        setResolvedVideoUrl(videoUrl)
      }
    })

    return () => {
      isActive = false
      // Révoquer le blob URL pour libérer la mémoire
      if (currentBlobUrl && currentBlobUrl.startsWith('blob:')) {
        try {
          URL.revokeObjectURL(currentBlobUrl)
        } catch {}
      }
    }
  }, [videoUrl, isIOS, isMobile, shouldUseImage, isInView])

  useEffect(() => {
    // Si on doit utiliser une image, ne pas charger la vidéo du tout
    if (shouldUseImage || !videoUrl || typeof document === "undefined") return
    
    // LAZY LOADING STRICT : ne charger la vidéo QUE si elle est visible
    // C'est critique pour mobile pour économiser la bande passante et la mémoire
    if (!isInView) {
      // Si pas visible, ne rien charger du tout
      return
    }
    
    const videoEl = localVideoRef.current
    if (!videoEl) return

    const handleError = () => {
      setVideoError(true)
      setIsBackgroundReady(false)
    }

    videoEl.addEventListener("error", handleError)

    const ensurePlay = () => {
      // Sur mobile, pauser si la vidéo n'est plus visible
      if (isMobile && !isInView) {
        videoEl.pause()
        return
      }

      const startPlayback = () => {
        const attempt = videoEl.play()
        if (attempt && typeof attempt.then === "function") {
          attempt.then(() => {
            // Vidéo en cours de lecture, masquer le poster après un court délai pour transition fluide
            setTimeout(() => {
              setShowPoster(false)
              setVideoCanPlay(true)
            }, 300)
          }).catch((err) => {
            console.warn("Video playback failed:", err)
            setIsBackgroundReady(false)
            // Sur mobile, si autoplay échoue, on ne force pas
            if (isMobile || isIOS) {
              setVideoError(true)
            }
          })
        }
      }

      const targetSrc = resolvedVideoUrl ?? videoUrl
      const currentSrc = videoEl.dataset.loadedSrc

      if (targetSrc && currentSrc !== targetSrc) {
        setIsBackgroundReady(false)
        setShowPoster(true) // Réafficher le poster pendant le chargement
        setVideoCanPlay(false)
        
        // Gérer le chargement progressif
        const handleCanPlayThrough = () => {
          videoEl.removeEventListener("canplaythrough", handleCanPlayThrough)
          setIsBackgroundReady(true)
          setVideoCanPlay(true)
          startPlayback()
        }
        
        const handleCanPlay = () => {
          videoEl.removeEventListener("canplay", handleCanPlay)
          setIsBackgroundReady(true)
          // Sur mobile, utiliser canplay pour démarrer plus tôt (streaming progressif)
          // canplaythrough attend le téléchargement complet, ce qui est trop long
          if (isMobile || isIOS) {
            // Démarrer dès que possible avec canplay, mais surveiller canplaythrough en arrière-plan
            // pour une transition plus fluide si la connexion le permet
            setVideoCanPlay(true)
            startPlayback()
            
            // Optionnel : améliorer la fluidité si la connexion est bonne
            videoEl.addEventListener("canplaythrough", () => {
              // Vidéo entièrement chargée, lecture devrait être fluide
            }, { once: true })
          } else {
            setVideoCanPlay(true)
            startPlayback()
          }
        }
        
        videoEl.addEventListener("canplay", handleCanPlay, { once: true })
        videoEl.addEventListener("error", handleError, { once: true })
        videoEl.dataset.loadedSrc = targetSrc
        videoEl.src = targetSrc
        // Sur mobile, commencer avec preload="none" pour ne rien charger
        // Puis passer à "metadata" seulement quand visible (géré dans le useEffect suivant)
        videoEl.preload = isMobile || isIOS ? (isInView ? "metadata" : "none") : "auto"
        videoEl.load()
      } else {
        if (videoCanPlay) {
          startPlayback()
        }
      }
    }

    // Charger la vidéo seulement quand elle est visible (lazy loading strict)
    if (isInView) {
      // Mettre à jour le preload quand la vidéo devient visible
      // Sur mobile, passer de "none" à "metadata" pour charger seulement les métadonnées
      if (videoEl.preload === "none" && (isMobile || isIOS)) {
        videoEl.preload = "metadata"
        // Si la source est déjà définie, recharger avec le nouveau preload
        if (videoEl.dataset.loadedSrc) {
          videoEl.load()
        }
      }
      ensurePlay()
    } else {
      // Sur mobile, pauser immédiatement si pas visible et mettre preload à "none"
      // Cela libère la mémoire et arrête le téléchargement
      videoEl.pause()
      if (isMobile || isIOS) {
        videoEl.preload = "none"
        // Optionnel : vider la source pour libérer complètement la mémoire
        // Mais attention, cela nécessitera un rechargement complet
        // On garde juste preload="none" pour l'instant
      }
    }

    const onVisibilityChange = () => {
      if (!document.hidden && isInView) {
        ensurePlay()
      } else {
        videoEl.pause()
      }
    }

    // Sur mobile, aussi écouter les changements de page
    const onPageHide = () => {
      videoEl.pause()
      videoEl.src = ''
      videoEl.load()
    }

    document.addEventListener("visibilitychange", onVisibilityChange)
    if (isMobile) {
      window.addEventListener("pagehide", onPageHide)
    }

    return () => {
      videoEl.removeEventListener("error", handleError)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (isMobile) {
        window.removeEventListener("pagehide", onPageHide)
      }
      videoEl.pause()
      // Nettoyer la source vidéo pour libérer la mémoire
      if (isMobile) {
        videoEl.src = ''
        videoEl.load()
      }
    }
  }, [videoUrl, resolvedVideoUrl, isInView, isIOS, isMobile, shouldUseImage])

  // Générer l'URL de l'image de fallback/poster à partir de l'URL vidéo
  const getFallbackImageUrl = useCallback((videoUrl: string | undefined): string | null => {
    if (!videoUrl) return null
    // Remplacer .webm ou .mp4 par .jpg (on essaiera .jpg d'abord, puis gradient si ça échoue)
    const imageUrl = videoUrl.replace(/\.(webm|mp4)$/i, '.jpg')
    return imageUrl
  }, [])

  const fallbackImageUrl = videoUrl ? getFallbackImageUrl(videoUrl) : imageUrl
  const posterImageUrl = fallbackImageUrl || imageUrl

  return (
    <div ref={containerRef} className={`min-h-screen bg-black relative overflow-hidden ${isMobile ? 'shader-background-mobile' : ''}`}>
      {backgroundType === "video" && !shouldUseImage ? (
        videoUrl ? (
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Image poster qui s'affiche immédiatement pendant le chargement de la vidéo */}
            {showPoster && !videoCanPlay && (
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500"
                style={{
                  ...mediaStyle,
                  backgroundImage: posterImageUrl 
                    ? `url(${posterImageUrl})` 
                    : 'linear-gradient(135deg, #1e1e1e 0%, #000000 100%)',
                  opacity: videoCanPlay ? 0 : 1,
                  zIndex: videoCanPlay ? 0 : 2,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                onError={(e) => {
                  // Si l'image poster échoue, utiliser un gradient
                  const target = e.target as HTMLDivElement
                  if (target) {
                    target.style.backgroundImage = 'linear-gradient(135deg, #1e1e1e 0%, #000000 100%)'
                  }
                }}
              />
            )}
            
            {/* Fallback image si la vidéo échoue */}
            {videoError ? (
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  ...mediaStyle,
                  backgroundImage: fallbackImageUrl 
                    ? `url(${fallbackImageUrl})` 
                    : imageUrl 
                      ? `url(${imageUrl})` 
                      : 'linear-gradient(135deg, #1e1e1e 0%, #000000 100%)',
                }}
              />
            ) : (
              <video
                ref={localVideoRef}
                className="w-full h-full object-cover transition-opacity duration-500"
                autoPlay
                muted
                loop
                playsInline
                poster={posterImageUrl || undefined}
                preload={isMobile || isIOS ? (isInView ? "metadata" : "none") : (isInView ? "auto" : "metadata")}
                // Attributs HTML personnalisés pour compatibilité iPhone/Android
                {...(isIOS && { 'webkit-playsinline': 'true' })}
                {...(isMobile && { 'x5-playsinline': 'true' })}
                onLoadedData={() => {
                  setIsBackgroundReady(true)
                }}
                onCanPlay={() => {
                  setIsBackgroundReady(true)
                }}
                onCanPlayThrough={() => {
                  setVideoCanPlay(true)
                  setIsBackgroundReady(true)
                }}
                onError={() => {
                  setVideoError(true)
                  setIsBackgroundReady(false)
                  setShowPoster(true) // Réafficher le poster en cas d'erreur
                }}
                onLoadedMetadata={(event) => {
                  const el = event.currentTarget
                  if (el.videoWidth && el.videoHeight) {
                    const ratio = el.videoWidth / el.videoHeight
                    setVideoAspectRatio(ratio || 16 / 9)
                    setMediaStyle(computeMediaStyle(ratio || 16 / 9))
                  }
                }}
                disablePictureInPicture
                controls={false}
                style={{
                  ...mediaStyle,
                  ...(videoStyle ?? {}),
                  pointerEvents: "none",
                  opacity: videoCanPlay ? 1 : 0,
                  zIndex: videoCanPlay ? 1 : 0,
                }}
              >
                {/* Support MP4 pour iOS - priorité au MP4 si disponible */}
                {isIOS && videoUrl?.endsWith('.webm') ? (
                  <source src={videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
                ) : (
                  <>
                    {/* Sur les autres navigateurs, essayer MP4 puis WebM */}
                    {videoUrl?.endsWith('.webm') && (
                      <source src={videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
                    )}
                    <source src={resolvedVideoUrl ?? videoUrl} type={videoUrl?.endsWith('.mp4') ? "video/mp4" : "video/webm"} />
                  </>
                )}
              </video>
            )}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
          </div>
        ) : (
          // Video Background YouTube API
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <div 
              id="youtube-player"
              className="w-full h-full"
              style={{
                ...mediaStyle,
                ...(videoStyle ?? {}),
                pointerEvents: "none"
              }}
            />
            {/* Masque anti-loader le temps du ready */}
            {!isBackgroundReady && (
              <div className="absolute inset-0 bg-black" />
            )}
            
            {/* Overlay pour donner du contraste sous le header */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
          </div>
        )
      ) : (
        // Image Background (utilisé sur mobile ou si forceImageFallback)
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              ...mediaStyle,
              backgroundImage: fallbackImageUrl 
                ? `url(${fallbackImageUrl})` 
                : imageUrl 
                  ? `url(${imageUrl})` 
                  : 'linear-gradient(135deg, #1e1e1e 0%, #000000 100%)'
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
