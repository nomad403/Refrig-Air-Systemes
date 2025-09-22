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
}

export default function ShaderBackground({ children, videoId = "voQricfn750" }: ShaderBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)
  const [isActive, setIsActive] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)

  useEffect(() => {
    // Charger l'API YouTube
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

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
            },
            onStateChange: (event: any) => {
              // Relancer la vidéo si elle s'arrête
              if (event.data === window.YT.PlayerState.ENDED) {
                event.target.playVideo()
              }
            }
          }
        })
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
    }
  }, [])

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden">
      {/* Video Background YouTube API */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div 
          id="youtube-player"
          className="w-full h-full"
          style={{
            pointerEvents: "none",
            width: "120vw", // Élargir sans transform
            height: "120vh", // Élargir sans transform
            marginLeft: "-10vw", // Centrer
            marginTop: "-10vh", // Centrer
            minWidth: "120vw",
            minHeight: "120vh"
          }}
        />
        
        {/* Overlay pour donner du contraste sous le header */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[30vh] bg-gradient-to-b from-black/50 via-black/20 to-transparent" />
      </div>

      {children}
    </div>
  )
}
