"use client"

import { useState, useEffect } from "react"

export function useScrollDirection(threshold = 8) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")

  useEffect(() => {
    let lastScrollY = window.scrollY

    const onScroll = () => {
      const currentScrollY = window.scrollY
      const difference = currentScrollY - lastScrollY

      if (Math.abs(difference) > threshold) {
        setScrollDirection(difference > 0 ? "down" : "up")
        setScrollY(currentScrollY)
        lastScrollY = currentScrollY
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [threshold])

  return { scrollDirection, scrollY }
}
