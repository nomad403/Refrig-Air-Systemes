"use client"

export default function Header() {
  return (
    <header className="relative z-30 flex items-center justify-between p-6">
      {/* Logo */}
      <div className="flex items-center">
      <a
          href="#"
          className="text-[#E9F8F9]/80 hover:text-[#E9F8F9] text-lg font-light px-4 py-2 transition-colors duration-200 orbit"
        >
          refrig'air systemes
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-2">
        <a
          href="#"
          className="text-[#E9F8F9]/80 hover:text-[#E9F8F9] text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Expertises</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-[#E9F8F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
        <a
          href="#"
          className="text-[#E9F8F9]/80 hover:text-[#E9F8F9] text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Réalisations</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-[#E9F8F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
        <a
          href="#"
          className="text-[#E9F8F9]/80 hover:text-[#E9F8F9] text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Maintenances et Services</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-[#E9F8F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
        <a
          href="#"
          className="text-[#E9F8F9]/80 hover:text-[#E9F8F9] text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Qualités et Certification</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-[#E9F8F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
        <a
          href="#"
          className="text-[#E9F8F9]/80 hover:text-[#E9F8F9] text-sm font-bold px-4 py-2 relative group transition-colors duration-200 satoshi"
        >
          <span className="relative z-10">Contact</span>
          <div className="absolute bottom-1 left-4 right-4 h-px bg-[#E9F8F9] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></div>
        </a>
      </nav>

      {/* Bouton Devis gooey avec fond blanc parfait */}
      <div id="gooey-btn" className="relative flex items-center group" style={{ filter: "url(#gooey-filter)" }}>
        <button className="absolute right-0 px-2.5 py-2 rounded-full bg-white text-black font-medium text-xs transition-all duration-300 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-19 z-0">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </button>
        <button className="px-6 py-3 rounded-full bg-white text-black font-medium text-sm transition-all duration-300 cursor-pointer h-8 flex items-center z-10">
          Devis
        </button>
      </div>
    </header>
  )
}
