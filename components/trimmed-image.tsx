"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface TrimmedImageProps {
  src: string
  alt: string
  className?: string
  // Transmet toutes les props Framer Motion utiles (ex: whileHover)
  [key: string]: unknown
}

// Coupe automatiquement les marges transparentes d'un PNG pour aligner la partie visible
export default function TrimmedImage({ src, alt, className, ...motionProps }: TrimmedImageProps) {
  const [trimmedSrc, setTrimmedSrc] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const img = new Image()
    // Même origine (public/), pas besoin de crossOrigin mais on le garde safe
    img.crossOrigin = "anonymous"
    img.src = src
    img.onload = () => {
      if (!isMounted) return

      const width = img.naturalWidth
      const height = img.naturalHeight
      if (width === 0 || height === 0) {
        setTrimmedSrc(src)
        return
      }

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        setTrimmedSrc(src)
        return
      }

      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, width, height)
      const data = imageData.data

      let top = height
      let left = width
      let right = 0
      let bottom = 0

      // Détection du bounding box des pixels non transparents
      // On utilise un seuil d'alpha très élevé pour ignorer les franges quasi transparentes
      const alphaThreshold = 100 // 0..255, très agressif pour supprimer les marges transparentes
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4
          const alpha = data[idx + 3]
          if (alpha >= alphaThreshold) {
            if (x < left) left = x
            if (x > right) right = x
            if (y < top) top = y
            if (y > bottom) bottom = y
          }
        }
      }

      // Si l'image est entièrement transparente ou aucun pixel trouvé
      if (right <= left || bottom <= top) {
        setTrimmedSrc(src)
        return
      }

      const cropWidth = right - left + 1
      const cropHeight = bottom - top + 1

      const outCanvas = document.createElement("canvas")
      outCanvas.width = cropWidth
      outCanvas.height = cropHeight
      const outCtx = outCanvas.getContext("2d")
      if (!outCtx) {
        setTrimmedSrc(src)
        return
      }

      outCtx.drawImage(img, left, top, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight)
      try {
        const url = outCanvas.toDataURL("image/png")
        setTrimmedSrc(url)
      } catch {
        setTrimmedSrc(src)
      }
    }
    img.onerror = () => {
      if (!isMounted) return
      setTrimmedSrc(src)
    }

    return () => {
      isMounted = false
    }
  }, [src])

  return (
    <motion.img
      src={trimmedSrc ?? src}
      alt={alt}
      className={className}
      // Important pour la lisibilité et la stabilité visuelle
      style={{ objectFit: "contain" }}
      loading="lazy"
      decoding="async"
      sizes="(max-width: 1024px) 100vw, 50vw"
      {...motionProps}
    />
  )
}


