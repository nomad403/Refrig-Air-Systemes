"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef } from "react"

type Direction = "fromLeft" | "fromRight"

interface ScrollSlideTitleProps {
  children: string
  direction: Direction
  className?: string
}

export default function ScrollSlideTitle({ children, direction, className }: ScrollSlideTitleProps) {
  const ref = useRef<HTMLHeadingElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] })
  const xTarget = useTransform(scrollYProgress, [0, 1], [direction === "fromLeft" ? -80 : 80, 0])
  const x = useSpring(xTarget, { stiffness: 120, damping: 20, mass: 0.35 })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.h3 ref={ref} style={{ x, opacity }} className={className}>
      {children}
    </motion.h3>
  )
}


