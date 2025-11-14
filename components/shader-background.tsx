"use client"

import type React from "react"

import { useCallback, useEffect, useRef, useState } from "react"
import { usePerformance } from "@/contexts/performance-context"

// Cache global simplifié : stocke seulement l'état de chargement, pas les références d'éléments
const videoReadyStateCache = new Map<string, { readyState: number, lastUsed: number }>()
const MAX_CACHE_AGE = 5 * 60 * 1000 // 5 minutes
const MAX_CACHE_SIZE = 5 // Maximum 5 vidéos en cache

// Nettoyer le cache périodiquement
const cleanupCache = () => {
  const now = Date.now()
  const entries = Array.from(videoReadyStateCache.entries())
  
  // Supprimer les entrées trop anciennes
  entries.forEach(([url, data]) => {
    if (now - data.lastUsed > MAX_CACHE_AGE) {
      videoReadyStateCache.delete(url)
    }
  })
  
  // Si le cache est trop grand, supprimer les plus anciennes
  if (videoReadyStateCache.size > MAX_CACHE_SIZE) {
    const sorted = entries.sort((a, b) => a[1].lastUsed - b[1].lastUsed)
    sorted.slice(0, videoReadyStateCache.size - MAX_CACHE_SIZE).forEach(([url]) => {
      videoReadyStateCache.delete(url)
    })
  }
}

// Nettoyer le cache toutes les minutes
if (typeof window !== "undefined") {
  setInterval(cleanupCache, 60 * 1000)
}

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
  const [showPoster, setShowPoster] = useState(true)
  const [videoCanPlay, setVideoCanPlay] = useState(false)
  
  // Utiliser une image seulement si explicitement demandé ou si erreur vidéo
  const shouldUseImage = forceImageFallback || videoError
  const loopTimerRef = useRef<any>(null)
  const localVideoRef = useRef<HTMLVideoElement | null>(null)
  const [resolvedVideoUrl, setResolvedVideoUrl] = useState<string | null>(videoUrl ?? null)
  const [videoAspectRatio, setVideoAspectRatio] = useState(16 / 9)
  
  // Références pour éviter les conflits de chargement
  const loadingRef = useRef<boolean>(false)
  const currentVideoUrlRef = useRef<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  
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

  // Nettoyer la vidéo précédente quand les props changent
  useEffect(() => {
    const videoEl = localVideoRef.current
    if (videoEl) {
      // Annuler toute opération en cours
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
      
      loadingRef.current = false
      videoEl.pause()
      
      // Ne pas vider la source immédiatement pour garder le cache HTTP
      // On la videra seulement si nécessaire
    }
    
    setIsBackgroundReady(false)
    setVideoError(false)
    setShowPoster(true)
    setVideoCanPlay(false)
    setResolvedVideoUrl(videoUrl ?? null)
    currentVideoUrlRef.current = videoUrl ?? null
  }, [backgroundType, videoId, videoUrl, shouldUseImage])

  // Observer d'apparition pour différer le chargement
  // Utiliser un threshold bas pour être tolérant au scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof window === "undefined" || !window.IntersectionObserver) {
      setIsInView(true)
      return
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsInView(entry.isIntersecting))
    }, { 
      threshold: 0.1 // Plus tolérant : déclenche même si seulement 10% visible
      // Pas de rootMargin négatif pour éviter d'empêcher la détection initiale
    })
    io.observe(container)
    return () => io.disconnect()
  }, [])

  // YouTube API (inchangé)
  useEffect(() => {
    if (backgroundType === "video" && !videoUrl && isInView && typeof document !== "undefined") {
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
  }, [backgroundType, videoId, videoUrl, isInView, computeMediaStyle, videoAspectRatio])

  // Résoudre l'URL vidéo (iOS préfère MP4)
  useEffect(() => {
    if (shouldUseImage || !videoUrl) return
    
    if (!isInView) {
      return
    }
    
    // iOS préfère MP4 pour le décodage matériel
    if (isIOS && videoUrl.endsWith('.webm')) {
      const mp4Url = videoUrl.replace('.webm', '.mp4')
      setResolvedVideoUrl(mp4Url)
      currentVideoUrlRef.current = mp4Url
    } else {
      setResolvedVideoUrl(videoUrl)
      currentVideoUrlRef.current = videoUrl
    }
  }, [videoUrl, isIOS, shouldUseImage, isInView])

  // Gestion vidéo locale - système refactorisé pour éviter AbortError et fuites mémoire
  useEffect(() => {
    if (shouldUseImage || !videoUrl || typeof document === "undefined") return
    
    const videoEl = localVideoRef.current
    if (!videoEl) return
    
    // Si la vidéo n'est pas en vue mais qu'elle joue déjà, la laisser continuer
    // Cela améliore l'UX en évitant les écrans noirs lors du scroll
    if (!isInView) {
      // Si la vidéo joue déjà, ne pas la pauser (l'IntersectionObserver avec rootMargin gère déjà ça)
      if (videoCanPlay && !videoEl.paused && videoEl.readyState >= 2) {
        // La vidéo joue déjà, la laisser continuer
        return
      }
      // Si la vidéo n'a pas encore commencé, ne pas charger (lazy loading strict)
      // Mais si elle est déjà chargée et prête, on peut la laisser en pause sans problème
      return
    }

    const targetSrc = resolvedVideoUrl ?? videoUrl
    
    // Vérifier si on est déjà en train de charger cette vidéo
    if (loadingRef.current && currentVideoUrlRef.current === targetSrc) {
      return
    }

    // Annuler toute opération précédente
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()
    const signal = abortControllerRef.current.signal

    // Vérifier le cache
    const cachedState = targetSrc ? videoReadyStateCache.get(targetSrc) : null
    const isCached = cachedState && cachedState.readyState >= 2

    // Si la vidéo est déjà chargée et prête, démarrer immédiatement
    if (isCached && videoEl.src === targetSrc && videoEl.readyState >= 2) {
      setVideoCanPlay(true)
      setIsBackgroundReady(true)
      setShowPoster(false)
      
      // Mettre à jour le cache
      if (targetSrc) {
        videoReadyStateCache.set(targetSrc, { readyState: videoEl.readyState, lastUsed: Date.now() })
      }
      
      const playPromise = videoEl.play()
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {
          // Autoplay échoué, ne pas forcer
        })
      }
      return
    }

    // Si la source est différente ou la vidéo n'est pas prête, charger
    if (videoEl.src !== targetSrc || videoEl.readyState < 2) {
      loadingRef.current = true
      currentVideoUrlRef.current = targetSrc
      
      setIsBackgroundReady(false)
      setShowPoster(true)
      setVideoCanPlay(false)

      // Nettoyer les anciens event listeners
      const cleanupListeners = () => {
        videoEl.removeEventListener("canplay", handleCanPlay)
        videoEl.removeEventListener("canplaythrough", handleCanPlayThrough)
        videoEl.removeEventListener("error", handleError)
        videoEl.removeEventListener("loadeddata", handleLoadedData)
      }

      const handleCanPlay = () => {
        if (signal.aborted) return
        cleanupListeners()
        
        setVideoCanPlay(true)
        setIsBackgroundReady(true)
        
        // Mettre en cache
        if (targetSrc) {
          videoReadyStateCache.set(targetSrc, { readyState: videoEl.readyState, lastUsed: Date.now() })
        }
        
        // Sur mobile, démarrer dès canplay (streaming progressif)
        if (isMobile || isIOS) {
          setShowPoster(false)
          const playPromise = videoEl.play()
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.then(() => {
              loadingRef.current = false
            }).catch(() => {
              loadingRef.current = false
            })
          } else {
            loadingRef.current = false
          }
        }
      }

      const handleCanPlayThrough = () => {
        if (signal.aborted) return
        
        // Sur desktop, attendre canplaythrough pour une meilleure qualité
        if (!isMobile && !isIOS) {
          cleanupListeners()
          setVideoCanPlay(true)
          setIsBackgroundReady(true)
          setShowPoster(false)
          
          if (targetSrc) {
            videoReadyStateCache.set(targetSrc, { readyState: videoEl.readyState, lastUsed: Date.now() })
          }
          
          const playPromise = videoEl.play()
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.then(() => {
              loadingRef.current = false
            }).catch(() => {
              loadingRef.current = false
            })
          } else {
            loadingRef.current = false
          }
        }
      }

      const handleLoadedData = () => {
        if (signal.aborted) return
        setIsBackgroundReady(true)
      }

      const handleError = (e: Event) => {
        if (signal.aborted) return
        cleanupListeners()
        loadingRef.current = false
        setVideoError(true)
        setIsBackgroundReady(false)
        setShowPoster(true)
      }

      // Ajouter les listeners
      videoEl.addEventListener("canplay", handleCanPlay, { once: true })
      if (!isMobile && !isIOS) {
        videoEl.addEventListener("canplaythrough", handleCanPlayThrough, { once: true })
      }
      videoEl.addEventListener("loadeddata", handleLoadedData, { once: true })
      videoEl.addEventListener("error", handleError, { once: true })

      // Configurer le preload selon le cache
      if (isCached) {
        videoEl.preload = "auto"
      } else {
        videoEl.preload = isMobile || isIOS ? "metadata" : "auto"
      }

      // Changer la source seulement si nécessaire
      if (videoEl.src !== targetSrc) {
        // Éviter AbortError : attendre que toute opération en cours soit terminée
        if (videoEl.readyState > 0) {
          videoEl.pause()
        }
        
        videoEl.src = targetSrc
        videoEl.dataset.loadedSrc = targetSrc
        
        // Utiliser load() seulement si nécessaire et de manière sécurisée
        try {
          videoEl.load()
        } catch (err) {
          // Ignorer les erreurs de load() si elles se produisent
          console.warn("Video load() error (ignored):", err)
        }
      } else if (videoEl.readyState === 0) {
        // Source déjà définie mais pas chargée
        try {
          videoEl.load()
        } catch (err) {
          console.warn("Video load() error (ignored):", err)
        }
      }
    } else {
      // Vidéo déjà chargée mais pas en cache, la mettre en cache et démarrer
      if (targetSrc) {
        videoReadyStateCache.set(targetSrc, { readyState: videoEl.readyState, lastUsed: Date.now() })
      }
      setVideoCanPlay(true)
      setIsBackgroundReady(true)
      setShowPoster(false)
      
      const playPromise = videoEl.play()
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => {})
      }
    }

    // Gestion de la visibilité
    const onVisibilityChange = () => {
      if (signal.aborted) return
      if (!document.hidden && isInView) {
        if (videoEl.readyState >= 2) {
          const playPromise = videoEl.play()
          if (playPromise && typeof playPromise.then === "function") {
            playPromise.catch(() => {})
          }
        }
      } else {
        videoEl.pause()
      }
    }

    document.addEventListener("visibilitychange", onVisibilityChange)

    // Cleanup
    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      
      // Annuler toute opération en cours
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
        abortControllerRef.current = null
      }
      
      loadingRef.current = false
      videoEl.pause()
      
      // Ne pas vider la source pour garder le cache HTTP
      // Le navigateur gère le cache HTTP automatiquement
    }
  }, [videoUrl, resolvedVideoUrl, isInView, isIOS, isMobile, shouldUseImage])

  // Ne pas générer automatiquement d'URL d'image de fallback
  // Le navigateur utilisera automatiquement la première frame de la vidéo comme poster
  // Si une imageUrl est explicitement fournie, on l'utilise
  const fallbackImageUrl = imageUrl || null
  const posterImageUrl = imageUrl || null // Ne pas utiliser de poster automatique si l'image n'existe pas

  return (
    <div ref={containerRef} className={`w-full h-full bg-black relative overflow-hidden ${isMobile ? 'shader-background-mobile' : ''}`}>
      {backgroundType === "video" && !shouldUseImage ? (
        videoUrl ? (
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Image poster - seulement si explicitement fournie */}
            {showPoster && !videoCanPlay && posterImageUrl && (
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-500"
                style={{
                  ...mediaStyle,
                  backgroundImage: `url(${posterImageUrl})`,
                  opacity: videoCanPlay ? 0 : 1,
                  zIndex: videoCanPlay ? 0 : 2,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                onError={(e) => {
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
                poster={posterImageUrl || undefined} // Le navigateur utilisera la première frame si poster n'est pas défini
                preload={isMobile || isIOS ? (isInView ? "metadata" : "none") : (isInView ? "auto" : "metadata")}
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
                  setShowPoster(true)
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
                {/* Support MP4 pour iOS */}
                {isIOS && videoUrl?.endsWith('.webm') ? (
                  <source src={videoUrl.replace('.webm', '.mp4')} type="video/mp4" />
                ) : (
                  <>
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
            {!isBackgroundReady && (
              <div className="absolute inset-0 bg-black" />
            )}
            
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
          </div>
        )
      ) : (
        // Image Background
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
          
          <div className="pointer-events-none absolute inset-0 bg-black/30" />
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
        </div>
      )}

      {children}
    </div>
  )
}
