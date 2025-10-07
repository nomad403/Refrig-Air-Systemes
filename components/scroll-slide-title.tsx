"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"
import type { ReactNode } from "react"

type Direction = "fromLeft" | "fromRight"

interface ScrollSlideTitleProps {
  children: ReactNode
  direction: Direction
  className?: string
}

export default function ScrollSlideTitle({ children, direction, className }: ScrollSlideTitleProps) {
  const ref = useRef<HTMLHeadingElement | null>(null)
  
  // Utilisation du scroll global pour synchroniser tous les titres
  const { scrollYProgress } = useScroll({ 
    target: ref, 
    offset: ["start 90%", "end 10%"] 
  })
  
  // Animation horizontale pure selon la direction
  const xTarget = useTransform(scrollYProgress, [0, 0.3, 1], 
    direction === "fromRight" ? [500, 0, 0] : [-500, 0, 0]
  )
  const x = useSpring(xTarget, { stiffness: 80, damping: 20, mass: 0.5 })
  
  // Opacité avec une transition plus rapide
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1])

  return (
    <motion.h3 ref={ref} style={{ x, opacity }} className={className}>
      {children}
    </motion.h3>
  )
}


