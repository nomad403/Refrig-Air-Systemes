"use client"

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Simulation d'objets 3D avec CSS */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-32 h-32 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-[#537FE7]/20 to-[#537FE7]/5 rounded-lg transform rotate-12 animate-pulse">
          <div className="w-full h-full bg-gradient-to-tl from-[#537FE7]/30 to-transparent rounded-lg"></div>
        </div>
      </div>
      
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-32 h-32 opacity-30">
        <div className="w-full h-full bg-gradient-to-br from-[#537FE7]/20 to-[#537FE7]/5 rounded-lg transform -rotate-12 animate-pulse" style={{ animationDelay: '1s' }}>
          <div className="w-full h-full bg-gradient-to-tl from-[#537FE7]/30 to-transparent rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}