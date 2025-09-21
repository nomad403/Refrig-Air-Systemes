"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import Hero3DBackground from "@/components/hero-3d-background"
import HomeSections from "@/components/home-sections"
import ShaderBackground from "@/components/shader-background"

export default function ShaderShowcase() {
  return (
    <>
      <ShaderBackground>
        <Header />
        <HeroContent />
        <Hero3DBackground />
      </ShaderBackground>
      <HomeSections />
    </>
  )
}