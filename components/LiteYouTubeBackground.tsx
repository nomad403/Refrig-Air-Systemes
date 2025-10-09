"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function LiteYouTubeBackground({
  id,
  title = "YouTube background",
  autoPlayOnView = true,
  className = "",
}: {
  id: string
  title?: string
  autoPlayOnView?: boolean
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (!autoPlayOnView) return setShouldLoad(true)
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            io.disconnect()
          }
        })
      },
      { root: null, rootMargin: "0px", threshold: 0.2 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [autoPlayOnView])

  const thumb = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  const src = `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&fs=0&cc_load_policy=0&disablekb=1`

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
      {!shouldLoad ? (
        <div className="absolute top-1/2 left-1/2" style={{ width: "100vw", height: "56.25vw", minWidth: "177.78vh", minHeight: "100vh", transform: "translate(-50%, -50%)" }}>
          <Image
            src={thumb}
            alt={title}
            fill
            sizes="100vw"
            priority={false}
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <iframe
          src={src}
          className="absolute top-1/2 left-1/2"
          style={{
            width: "100vw",
            height: "56.25vw",
            minWidth: "177.78vh",
            minHeight: "100vh",
            transform: "translate(-50%, -50%)",
            border: "none",
            pointerEvents: "none",
          }}
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          title={title}
        />
      )}
    </div>
  )
}


