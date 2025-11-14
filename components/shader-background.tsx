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
    
    let isActive = true
    let currentBlobUrl: string | null = null

    // Sur mobile (iOS et Android), éviter le blob cache pour économiser la mémoire
    // Utiliser directement l'URL pour éviter les problèmes de mémoire
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
  }, [videoUrl, isIOS, isMobile, shouldUseImage])

  useEffect(() => {
    // Si on doit utiliser une image, ne pas charger la vidéo du tout
    if (shouldUseImage || !videoUrl || typeof document === "undefined") return
    
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
          attempt.catch((err) => {
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
        const handleCanPlay = () => {
          videoEl.removeEventListener("canplay", handleCanPlay)
          setIsBackgroundReady(true)
          startPlayback()
        }
        videoEl.addEventListener("canplay", handleCanPlay, { once: true })
        videoEl.addEventListener("error", handleError, { once: true })
        videoEl.dataset.loadedSrc = targetSrc
        videoEl.src = targetSrc
        videoEl.load()
      } else {
        startPlayback()
      }
    }

    if (isInView) {
      ensurePlay()
    } else if (isMobile) {
      // Sur mobile, pauser immédiatement si pas visible
      videoEl.pause()
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

  // Générer l'URL de l'image de fallback à partir de l'URL vidéo
  const getFallbackImageUrl = useCallback((videoUrl: string | undefined): string | null => {
    if (!videoUrl) return null
    // Remplacer .webm ou .mp4 par .jpg (on essaiera .jpg d'abord, puis gradient si ça échoue)
    const imageUrl = videoUrl.replace(/\.(webm|mp4)$/i, '.jpg')
    return imageUrl
  }, [])

  const fallbackImageUrl = videoUrl ? getFallbackImageUrl(videoUrl) : imageUrl

  return (
    <div ref={containerRef} className={`min-h-screen bg-black relative overflow-hidden ${isMobile ? 'shader-background-mobile' : ''}`}>
      {backgroundType === "video" && !shouldUseImage ? (
        videoUrl ? (
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {videoError ? (
              // Fallback image si la vidéo échoue
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
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload={isMobile || isIOS ? "metadata" : "auto"}
                // Attributs HTML personnalisés pour compatibilité iPhone/Android
                {...(isIOS && { 'webkit-playsinline': 'true' })}
                {...(isMobile && { 'x5-playsinline': 'true' })}
                onLoadedData={() => setIsBackgroundReady(true)}
                onCanPlay={() => setIsBackgroundReady(true)}
                onError={() => {
                  setVideoError(true)
                  setIsBackgroundReady(false)
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
                  pointerEvents: "none"
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
            {!isBackgroundReady && !videoError && (
              <div className="absolute inset-0 bg-black" />
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
