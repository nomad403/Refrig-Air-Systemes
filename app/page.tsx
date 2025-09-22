"use client"

import Header from "@/components/header"
import HeroContent from "@/components/hero-content"
import Hero3DBackground from "@/components/hero-3d-background"
import HomeSections from "@/components/home-sections"
import ShaderBackground from "@/components/shader-background"

export default function ShaderShowcase() {
  return (
    <>
      <div className="relative isolate min-h-[100dvh]">
        {/* Fond en arrière-plan — même scope que le header */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground>
            <Hero3DBackground />
          </ShaderBackground>
        </div>

        {/* Header qui blend avec ce fond */}
        <Header />

        {/* Contenu par-dessus */}
        <HeroContent />
      </div>

      <HomeSections />
    </>
  )
}