'use client'

import { useState, useEffect } from 'react';
import {
  ArrowRight,
  Smartphone,
  Shield,
  Zap,
  Monitor,
  Sparkles,
} from "lucide-react";
import { GiCutDiamond } from 'react-icons/gi';

// Typ dla statystyk
interface StatData {
  number: string;
  label: string;
  description: string;
}

// Hook do wykrywania mobile - wbudowany w komponent
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Komponent auto-karuzeli dla statystyk (TYLKO MOBILE)
function StatsCarousel({ stats }: { stats: StatData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="relative overflow-hidden rounded-2xl" style={{ 
      background: 'radial-gradient(circle at left bottom, rgba(112, 112, 112, 0.1) 0%,rgba(88, 88, 88, 0.1) 38%)',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      height: '120px'
    }}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="absolute inset-0 p-6 flex items-center gap-4 transition-all duration-500"
          style={{
            opacity: currentIndex === index ? 1 : 0,
            transform: currentIndex === index ? 'translateX(0)' : 'translateX(20px)',
          }}
        >
          <div
            className="font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)', fontSize: "2.5rem" }}
          >
            {stat.number}
          </div>
          <div className="text-white/50 font-bold text-xl">|</div>
          <div className="flex-1">
            <div
              className="text-gray-300 font-medium text-base"
              style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)' }}
            >
              {stat.label}
            </div>
            <div
              className="text-white/60 text-sm"
              style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)' }}
            >
              {stat.description}
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {stats.map((_, index) => (
          <div
            key={index}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: currentIndex === index ? 'rgba(253, 159, 145, 0.8)' : 'rgba(255, 255, 255, 0.2)'
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function ExperienceSection() {
  const isMobile = useMobileDetection();
  
  // ===== HOVER STATES - KLUCZOWE DLA NOWEGO STYLU =====
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [hoveredMainCard, setHoveredMainCard] = useState(false);
  const [hoveredSecurityCard, setHoveredSecurityCard] = useState(false);
  const [hoveredSpeedCard, setHoveredSpeedCard] = useState(false);
  const [hoveredAIStatement, setHoveredAIStatement] = useState(false);
  const [hoveredResponsive, setHoveredResponsive] = useState(false);
  const [hoveredConsultation, setHoveredConsultation] = useState(false);

  const projectStats: StatData = {
    number: "2",
    label: "Projekty",
    description: "Zrealizowane",
  };
  const responseStats: StatData = {
    number: "24h",
    label: "Czas odpowiedzi",
    description: "Maksymalny",
  };
  const experienceStats: StatData = {
    number: "5+",
    label: "Lat doświadczenia",
    description: "",
  };

  const statsData: StatData[] = [projectStats, responseStats, experienceStats];

  return (
    <section id="experience" className="pt-8 md:pt-8 pb-0 bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
            linear-gradient(
              to bottom,
              black 0px,
              black 10px,
              #3b3b3bff 10px,
              #3b3b3bff 11px,
              #0b0b0bff 11px,
              #0b0b0bff calc(100% - 11px),
              #3b3b3bff calc(100% - 11px),
              #3b3b3bff calc(100% - 10px),
              black calc(100% - 10px),
              black 100%
            )
          `
        }}  
      />
      
      <div className="container mx-auto px-6 pt-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-white/60 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-4 h-4" style={{ 
              stroke: 'url(#sparkles-gradient)',
              fill: 'none'
            }} />
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <linearGradient id="sparkles-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#fdba74' }} />
                  <stop offset="100%" style={{ stopColor: '#f9a8d4' }} />
                </linearGradient>
              </defs>
            </svg>
            Zobacz dlaczego warto nas wybrać
          </span>
        </div>

        {/* Header */}
        <div
          className="text-center my-12 mt-10 md:my-14 md:mt-10 overflow-hidden"
          style={{
            fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
          }}
        >
          <h2 className="text-3xl lg:text-5xl text-white mb-4 tracking-tight"
          style={{ fontWeight: 575 }}>
            <span className="font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
            style={{ fontWeight: 575 }}>Wyskaluj z nami swój biznes
            </span>

            
            <GiCutDiamond className="inline w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ml-2 text-blue-300"  />
            {" "}
            <span> </span>
            <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
              
            </span>
          </h2>
          <p className={`leading-relaxed text-gray-400 mx-auto ${isMobile ? "text-base px-4" : "text-lg md:text-xl max-w-2xl"}`}>
            <span className="font-normal">Twoja strona musi być widoczna w erze nowych wyszukiwarek.</span>
            {" "}W 2025 roku to najważniejsze, aby być widocznym w rankingach AI.
          </p>
         
        </div>

        {/* CTA Button */}
        <div className="flex justify-center items-center mb-20 md:mb-24 relative z-20">
          <div
            className="transition-all duration-500 ease-out"
            style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)' }}
          >
            <a
              href="#services"
              className="w-full sm:w-auto h-12 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] inline-flex"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, #ffffffdb 0%, #ffffffdb 30%, #ffffffdb 60%, #ffffffdb 100%)`,
                  }}
            >
                 
<span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">                    Wybierz usługi
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                
              
            </a>
            
          </div>
        </div>

        {/* Główny Grid Layout */}
        <div className="max-w-9xl mx-auto mb-6 md:mb-6">
          <div
            className="transition-all duration-750 ease-out"
            style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)' }}
          >
            {/* Mobile Layout */}
            {isMobile ? (
              <div className="grid grid-cols-1 gap-6">
                {/* Główny kafelek AI - bez zmian w treści, tylko style */}
                <div 
                  className="bg-white rounded-3xl p-6 text-center transition-all duration-500"
                  style={{boxShadow: '0 0 20px rgba(255, 255, 255, 0.58), 0 0 40px rgba(255, 255, 255, 0.07)'}}
                >
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-black mb-4 leading-tight tracking-tight px-2">
                      Strona widoczna dla
                      <br />
                      <span className="font-normal bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                        Chat GPT
                      </span>
                    </h3>

                    <p className="text-gray-700 text-base leading-relaxed mb-6 px-2">
                      Przygotowujemy Twoją stronę na przyszłość - gotowość na integrację z nadchodzącymi technologiami sztucznej inteligencji.
                    </p>

                    <a href="/contact" className="group relative cursor-pointer transition-all duration-150 inline-block min-w-[75%]">
                      <div className="bg-black text-white px-4 py-2 rounded-full inline-block mb-2">
                        <span className="text-xs font-medium tracking-wider">
                          UMÓW SIĘ NA SPOTKANIE
                        </span>
                      </div>
                    </a>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-600 text-sm mb-4 px-2">
                      Przyszłość jest już tutaj. Nie zostań w tyle.
                    </p>
                    <a href="/contact" className="group relative cursor-pointer transition-all duration-150 inline-block min-w-[75%]">
                      <div className="flex items-center gap-2 pb-1 justify-center">
                        <span className="font-medium text-blue-600 text-sm">
                          Potrzebuję widoczności AI
                        </span>
                        <ArrowRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-150" />
                      </div>
                      <div className="h-px bg-blue-600 w-3/4 mx-auto" />
                    </a>
                  </div>
                </div>

                {/* Statystyki - AUTO KARUZELA */}
                <StatsCarousel stats={statsData} />

                {/* Grid 2x2 - NOWY STYL Z HOVER */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Bezpieczeństwo - z hover efektem */}
                  <div
                    className="rounded-2xl p-4 text-center aspect-square flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 cursor-pointer"
                    style={{ 
                      background: 'radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.05) 0%, #0f0f0f 38%)',
                      border: '1px solid rgba(255, 255, 255, 0.17)'
                    }}
                    onMouseEnter={() => setHoveredSecurityCard(true)}
                    onMouseLeave={() => setHoveredSecurityCard(false)}
                  >
                    <Shield className={`absolute inset-0 w-full h-full scale-150 transition-all duration-500 ${
                      hoveredSecurityCard ? 'opacity-30 text-slate-600' : 'opacity-20 text-slate-700'
                    }`} />
                    <h4 className={`font-medium text-sm relative z-10 leading-tight px-2 transition-colors duration-500 ${
                      hoveredSecurityCard ? 'text-gray-200' : 'text-gray-400'
                    }`}>
                      Bezpieczeństwo i wsparcie
                    </h4>
                  </div>
                  
                  {/* Szybkość - z hover efektem */}
                  <div
                    className="rounded-2xl p-4 text-center aspect-square flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative overflow-hidden"
                    style={{
                      background: 'radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.07) 0%, #0f0f0f 38%)',
                      border: '1px solid rgba(255, 255, 255, 0.17)'
                    }}
                    onMouseEnter={() => setHoveredSpeedCard(true)}
                    onMouseLeave={() => setHoveredSpeedCard(false)}
                  >
                    <Zap className={`absolute inset-0 w-full h-full scale-150 transition-all duration-500 ${
                      hoveredSpeedCard ? 'opacity-30 text-slate-600' : 'opacity-20 text-slate-700'
                    }`} />
                    <h4 className={`font-medium text-sm leading-tight relative z-10 px-2 transition-colors duration-500 ${
                      hoveredSpeedCard ? 'text-gray-200' : 'text-gray-400'
                    }`}>
                      Szybkość ładowania strony
                    </h4>
                    <p className={`text-xs mt-1 relative z-10 transition-colors duration-500 ${
                      hoveredSpeedCard ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      Nie do doścignięcia
                    </p>
                  </div>
                </div>

                {/* RESPONSYWNOŚĆ MOBILE - z hover efektem
                <div
                  className="rounded-2xl p-6 transition-all duration-500 cursor-pointer"
                  style={{ 
                    background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.12) 0%, #0f0f0f 55%)',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}
                  onMouseEnter={() => setHoveredResponsive(true)}
                  onMouseLeave={() => setHoveredResponsive(false)}
                >
                  <div className="space-y-6">
                    <h4 className={`text-2xl my-6 tracking-tight text-center px-2 font-semibold transition-colors duration-500 ${
                      hoveredResponsive ? 'text-white' : 'text-white/70'
                    }`}>
                      
                      
                      
                      Responsywny design na każdym{" "}
                      <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">urządzeniu!</span>
                    </h4>
                    <p className={`text-base text-center px-2 transition-colors duration-500 ${
                      hoveredResponsive ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      Nie pozwolimy by strona była dla nich niewygodna w obsłudze.
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Monitor className={`w-6 h-6 transition-colors duration-500 ${
                          hoveredResponsive ? 'text-white' : 'text-white/60'
                        }`} />
                        <div>
                          <h5 className={`font-semibold text-base transition-colors duration-500 ${
                            hoveredResponsive ? 'text-white' : 'text-white/70'
                          }`}>
                            Duże ekrany
                          </h5>
                          <p className={`text-sm transition-colors duration-500 ${
                            hoveredResponsive ? 'text-gray-300' : 'text-gray-400'
                          }`}>
                            Elegancko i <span className="font-bold">profesjonalnie</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Smartphone className={`w-6 h-6 transition-colors duration-500 ${
                          hoveredResponsive ? 'text-white' : 'text-white/60'
                        }`} />
                        <div>
                          <h5 className={`font-semibold text-base transition-colors duration-500 ${
                            hoveredResponsive ? 'text-white' : 'text-white/70'
                          }`}>
                            Małe ekrany
                          </h5>
                          <p className={`text-sm transition-colors duration-500 ${
                            hoveredResponsive ? 'text-gray-300' : 'text-gray-400'
                          }`}>
                            Idealne <span className="font-bold">dopasowanie</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <img
                        src="_resources/Whiteslope_responsivity.webp"
                        alt="Responsywność"
                        className="w-full max-w-sm h-auto rounded-lg"
                      />
                    </div>

                    <div className="flex justify-center mt-6">
                      <a href="/contact" className="group relative cursor-pointer transition-all duration-300 inline-block min-w-[75%]" >
                        <button className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#fd9f91] text-black font-medium text-base transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg active:scale-95"style={{
                    background: `radial-gradient(circle at 50% 50%, #ffffffdb 0%, #ffffffdb 30%, #ffffffdb 60%, #ffffffdb 100%)`,
                  }}
            >
                 
<span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">   Kontakt</span>
                          <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
                        </button>
                      </a>
                    </div>
                  </div>
                </div> */}

                {/* KONSULTACJA MOBILE - z hover efektem i animacją EKG */}
                <div
                  className="rounded-2xl p-6 min-h-[300px] flex items-center relative overflow-hidden transition-all duration-500 cursor-pointer"
                  style={{ 
                    background: 'radial-gradient(circle at bottom, rgba(255, 116, 95, 0.12) 0%, #0f0f0f 60%)',
                    border: '1px solid rgba(255, 255, 255, 0.17)'
                  }}
                  onMouseEnter={() => setHoveredConsultation(true)}
                  onMouseLeave={() => setHoveredConsultation(false)}
                >
                  {/* Siatka EKG */}
                  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="ekg-grid-m" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 10 50 M 20 0 L 20 50 M 30 0 L 30 50 M 40 0 L 40 50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                        <path d="M 0 10 L 50 10 M 0 20 L 50 20 M 0 30 L 50 30 M 0 40 L 50 40" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                        <rect width="50" height="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#ekg-grid-m)" />
                  </svg>

                  {/* Linia EKG z animacją */}
                  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1400 200">
                    <path
                      d="M0,100 L100,100 L120,100 L130,60 L140,140 L150,100 L250,100 L270,100 L280,70 L290,130 L300,100 L450,100 L470,100 L480,50 L490,150 L500,100 L600,100 L620,100 L630,75 L640,125 L650,100 L800,100 L820,100 L830,65 L840,135 L850,100 L950,100 L970,100 L980,55 L990,145 L1000,100 L1150,100 L1170,100 L1180,80 L1190,120 L1200,100 L1400,100"
                      stroke="rgba(255, 116, 95, 0.8)"
                      strokeWidth="2"
                      fill="none"
                    >
                      <animate attributeName="stroke-dasharray" from="0,2000" to="2000,0" dur="8s" repeatCount="indefinite" />
                    </path>
                  </svg>

                  <div className="space-y-6 text-center relative z-10 px-2">
                    <h4 className={`text-2xl tracking-tight font-semibold transition-colors duration-500 ${
                      hoveredConsultation ? 'text-white' : 'text-white/70'
                    }`}>
                      Czas, aby Twoja strona zaczęła{" "}
                      <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                        żyć!
                      </span>
                    </h4>

                    <p className={`text-base transition-colors duration-500 ${
                      hoveredConsultation ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      Nie zmarnujemy Twojego czasu. Przed projektem strony umawiamy się na dogłębną analizę Twojej strony i badamy rynek w Twoim obszarze.
                    </p>

                    <div className="flex flex-col gap-3 items-center mt-6">
                      <a href="/contact" className="group relative cursor-pointer transition-all duration-300 inline-block min-w-[75%]">
                        <button className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#fd9f91] text-black font-semibold text-base transition-all duration-300 hover:bg-[#fc8a7a] hover:shadow-xl active:scale-95"style={{
                    background: `radial-gradient(circle at 50% 50%, #ffffffdb 0%, #ffffffdb 30%, #ffffffdb 60%, #ffffffdb 100%)`,
                  }}
            >
                 
<span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">   Umów konsultację</span>
                          <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
                        </button>
                      </a>

                      <a href="/pricing" className="group relative cursor-pointer transition-all duration-300 inline-block min-w-[75%]">
                        <button className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 rounded-full border-2 border-white bg-transparent text-white font-semibold text-base transition-all duration-300 hover:bg-white hover:text-black hover:shadow-xl active:scale-95">
                          <span>Wycena strony</span>
                          <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" />
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ========== DESKTOP LAYOUT ========== */
              <div className="space-y-6">
                <div className="grid grid-cols-7 grid-rows-3 gap-6" style={{ height: "auto" }}>
                  
                  {/* LEWA DOLNA - 3 STATYSTYKI Z HOVER */}
                  <div className="col-span-2 row-span-2 col-start-1 row-start-2 grid grid-rows-3 gap-3">
                    {/* Stat 1 - Projekty */}
                    <div
                      className="rounded-2xl p-4 flex items-center gap-4 transition-all duration-500 cursor-pointer"
                      style={{ 
                        background: 'radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.07) 0%, #0f0f0f 38%)',
                        border: '1px solid rgba(255, 255, 255, 0.07)'
                      }}
                      onMouseEnter={() => setHoveredStat(0)}
                      onMouseLeave={() => setHoveredStat(null)}
                    >
                      <div className="font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent" style={{ fontSize: "2.72rem" }}>
                        {projectStats.number}
                      </div>
                      <div className={`font-bold text-lg transition-colors duration-500 ${
                        hoveredStat === 0 ? 'text-white/70' : 'text-white/50'
                      }`}>|</div>
                      <div className="flex-1">
                        <div className={`font-bold text-base transition-colors duration-500 ${
                          hoveredStat === 0 ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {projectStats.label}
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          hoveredStat === 0 ? 'text-white/70' : 'text-white/60'
                        }`}>
                          {projectStats.description}
                        </div>
                      </div>
                    </div>

                    {/* Stat 2 - Czas odpowiedzi */}
                    <div
                      className="rounded-2xl p-4 flex items-center gap-4 transition-all duration-500 cursor-pointer"
                      style={{ 
                        background: 'radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.07) 0%, #0f0f0f 38%)',
                        border: '1px solid rgba(255, 255, 255, 0.07)'
                      }}
                      onMouseEnter={() => setHoveredStat(1)}
                      onMouseLeave={() => setHoveredStat(null)}
                    >
                      <div className="font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent" style={{ fontSize: "2.72rem" }}>
                        {responseStats.number}
                      </div>
                      <div className={`font-bold text-lg transition-colors duration-500 ${
                        hoveredStat === 1 ? 'text-white/70' : 'text-white/50'
                      }`}>|</div>
                      <div className="flex-1">
                        <div className={`font-bold text-base transition-colors duration-500 ${
                          hoveredStat === 1 ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {responseStats.label}
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          hoveredStat === 1 ? 'text-white/70' : 'text-white/60'
                        }`}>
                          {responseStats.description}
                        </div>
                      </div>
                    </div>

                    {/* Stat 3 - Doświadczenie */}
                    <div
                      className="rounded-2xl p-4 flex items-center gap-4 transition-all duration-500 cursor-pointer"
                      style={{ 
                        background: 'radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.07) 0%, #0f0f0f 38%)',
                        border: '1px solid rgba(255, 255, 255, 0.07)'
                      }}
                      onMouseEnter={() => setHoveredStat(2)}
                      onMouseLeave={() => setHoveredStat(null)}
                    >
                      <div className="font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent" style={{ fontSize: "2.72rem" }}>
                        {experienceStats.number}
                      </div>
                      <div className={`font-bold text-lg transition-colors duration-500 ${
                        hoveredStat === 2 ? 'text-white/70' : 'text-white/50'
                      }`}>|</div>
                      <div className="flex-1">
                        <div className={`font-bold text-base transition-colors duration-500 ${
                          hoveredStat === 2 ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {experienceStats.label}
                        </div>
                        <div className={`text-sm transition-colors duration-500 ${
                          hoveredStat === 2 ? 'text-white/70' : 'text-white/60'
                        }`}>
                          {experienceStats.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* LEWA GÓRNA - BEZPIECZEŃSTWO Z HOVER */}
                  <div
                    className="col-span-1 row-span-1 col-start-2 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 cursor-pointer"
                    style={{ 
                      background: 'radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.07) 0%, #0f0f0f 38%)',
                      border: '1px solid rgba(255, 255, 255, 0.17)'
                    }}
                    onMouseEnter={() => setHoveredSecurityCard(true)}
                    onMouseLeave={() => setHoveredSecurityCard(false)}
                  >
                    <Shield className={`absolute inset-0 w-full h-full scale-150 transition-all duration-500 ${
                      hoveredSecurityCard ? 'opacity-30 text-slate-600' : 'opacity-20 text-slate-700'
                    }`} />
                    <h4 className={`font-medium text-lg text-center relative z-10 transition-colors duration-500 ${
                      hoveredSecurityCard ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      Bezpieczeństwo i wsparcie
                    </h4>
                  </div>

                  {/* ŚRODEK - GŁÓWNY AI CARD (bez zmian - biały background) */}
                  <div className="col-span-3 row-span-3 col-start-3 relative">
                    <div
                      className="absolute inset-0 -z-10 rounded-full opacity-30"
                      style={{
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 197, 253, 0.2) 40%, transparent 70%)",
                        filter: "blur(60px)",
                        transform: "scale(1.5)",
                      }}
                    />

                    <div 
                      className="bg-white rounded-3xl p-12 flex flex-col justify-between shadow-xl h-full relative z-10 transition-transform duration-300 hover:scale-[1.02]"
                      style={{boxShadow: '0 0 20px rgba(255, 255, 255, 0.58), 0 0 40px rgba(255, 255, 255, 0.07)'}}
                    >
                      <div className="absolute -top-2 -right-2 z-20">
                        <div className="relative">
                          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg shadow-lg transform rotate-6">
                            <span className="text-xs font-bold uppercase tracking-wider">Nowość</span>
                          </div>
                          <div className="absolute -bottom-2 right-2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-blue-700"></div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-blue-700 text-sm font-medium tracking-wide">
                            ZABEZPIECZENIE TWOJEJ PRZYSZŁOŚCI
                          </span>
                        </div>

                        <h3 className="text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
                          Strona widoczna dla<br />
                          <span className="font-normal bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                            CHAT GPT
                          </span>
                        </h3>

                        <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-md mx-auto">
                          Przygotowujemy Twoją stronę na przyszłość - gotowość na integrację z nadchodzącymi technologiami sztucznej inteligencji.
                        </p>
                      </div>

                      <a href="/contact" className="group relative cursor-pointer transition-all duration-150 inline-block w-full text-center">
                        <div className="bg-black text-white px-8 py-4 rounded-full inline-block mb-8 transform hover:scale-105 transition-transform duration-150">
                          <span className="text-xl font-medium tracking-wider">
                            Potrzebuje być gotowym na AI
                          </span>
                        </div>
                      </a>

                      <div className="border-t border-gray-200 pt-8">
                        <div className="text-center mb-6">
                          <p className="text-gray-600 text-sm mb-2">
                            Przyszłość jest już tutaj. Nie zostań w tyle.
                          </p>
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                            <span>Skontaktuj się już dziś</span>
                          </div>
                        </div>

                        <a href="/contact" className="group relative cursor-pointer transition-all duration-150 inline-block w-full text-center">
                          <div className="flex items-center gap-3 pb-2 justify-center">
                            <span className="font-medium text-blue-600 text-base hover:text-blue-700 transition-colors duration-150">
                              Potrzebuję Nowoczesnej widoczności dla AI
                            </span>
                            <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 group-hover:text-blue-700 transition-all duration-150" />
                          </div>
                          <div className="h-px bg-blue-600 w-3/4 mx-auto" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* PRAWA GÓRNA - AI STATEMENT Z HOVER */}
                  <div
                    className="col-span-2 row-span-2 col-start-6 rounded-2xl p-8 flex flex-col justify-between -ml-3 transition-all duration-500 cursor-pointer"
                    style={{ 
                      background: 'radial-gradient(circle at left top, rgba(255, 255, 255, 0.07) 0%, #0f0f0f 38%)',
                      border: '1px solid rgba(255, 255, 255, 0.07)'
                    }}
                    onMouseEnter={() => setHoveredAIStatement(true)}
                    onMouseLeave={() => setHoveredAIStatement(false)}
                  >
                    <div>
                      <h4 className={`font-bold text-2xl mb-6 leading-tight transition-colors duration-500 ${
                        hoveredAIStatement ? 'text-gray-200' : 'text-gray-300'
                      }`}>
                        Ponad{" "}
                        <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                          60%
                        </span>{" "}
                        ruchu na stronach internetowych już teraz generują boty.
                      </h4>
                      <p className={`text-base leading-relaxed mb-4 transition-colors duration-500 ${
                        hoveredAIStatement ? 'text-gray-200' : 'text-gray-300'
                      }`}>
                        Podczas gdy Ty czytasz ten tekst, boty AI analizują miliony stron, decydując które biznesy będą widoczne. Twoja konkurencja już się przygotowuje.
                      </p>
                      <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                        hoveredAIStatement ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        Czy możesz pozwolić sobie zostać niewidzialnym dla systemów, które już dziś decydują o sukcesie?
                      </p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <ArrowRight className={`w-8 h-8 transition-colors duration-500 ${
                        hoveredAIStatement ? 'text-slate-600' : 'text-slate-700'
                      }`} />
                    </div>
                  </div>

                  {/* PRAWA DOLNA - SZYBKOŚĆ Z HOVER */}
                  <div
                    className="col-span-1 row-span-1 col-start-6 row-start-3 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 cursor-pointer"
                    style={{
                      aspectRatio: "1/1",
                      background: 'radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.07) 0%, #0f0f0f 38%)',
                      border: '1px solid rgba(255, 255, 255, 0.07)'
                    }}
                    onMouseEnter={() => setHoveredSpeedCard(true)}
                    onMouseLeave={() => setHoveredSpeedCard(false)}
                  >
                    <Zap className={`absolute inset-0 w-full h-full scale-150 transition-all duration-500 ${
                      hoveredSpeedCard ? 'opacity-30 text-slate-600' : 'opacity-20 text-slate-700'
                    }`} />
                    <div className="text-center relative z-10">
                      <h4 className={`font-bold text-base leading-tight transition-colors duration-500 ${
                        hoveredSpeedCard ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        Pokochaj lepszą szybkość ładowania strony
                      </h4>
                    </div>
                  </div>
                </div>

                {/* RESPONSYWNOŚĆ DESKTOP Z HOVER
                <div
                  className="rounded-2xl p-8 min-h-[400px] flex items-center relative overflow-hidden transition-all duration-500 cursor-pointer group"
                  style={{ 
                    background: 'radial-gradient(circle at left bottom, rgba(255, 255, 255, 0.07) 0%, #0f0f0f 38%)',
                    border: '1px solid rgba(255, 255, 255, 0.17)'
                  }}
                  onMouseEnter={() => setHoveredResponsive(true)}
                  onMouseLeave={() => setHoveredResponsive(false)}
                >
                  <div className="grid grid-cols-2 gap-8 h-full items-center w-full mx-5 relative z-10">
                    <div className="space-y-6">
                      <h4 className={`text-5xl lg:text-5xl font-thin my-8 tracking-tight transition-colors duration-500 ${
                        hoveredResponsive ? 'text-white' : 'text-white/70'
                      }`}>
                        Responsywny design na każdym{" "}
                        <span className="font-normal bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">urządzeniu!</span>
                      </h4>
                      <p className={`text-2xl transition-colors duration-500 ${
                        hoveredResponsive ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        Nie pozwolimy by strona była dla nich niewygodna w obsłudze.
                      </p>

                      <div className="grid grid-cols-2 gap-8 mt-8">
                        <div className="space-y-4 group/item">
                          <div className="flex items-center gap-4">
                            <Monitor className={`w-8 h-8 transition-all duration-300 group-hover/item:scale-110 ${
                              hoveredResponsive ? 'text-white group-hover/item:text-blue-400' : 'text-white/60'
                            }`} />
                            <h5 className={`font-semibold text-xl transition-colors duration-500 ${
                              hoveredResponsive ? 'text-white' : 'text-white/70'
                            }`}>
                              Duże ekrany
                            </h5>
                          </div>
                          <p className={`text-lg leading-relaxed transition-colors duration-500 ${
                            hoveredResponsive ? 'text-gray-300' : 'text-gray-400'
                          }`}>
                            Elegancko i <span className="font-bold">profesjonalnie</span>
                          </p>
                        </div>

                        <div className="space-y-4 group/item">
                          <div className="flex items-center gap-4">
                            <Smartphone className={`w-8 h-8 transition-all duration-300 group-hover/item:scale-110 ${
                              hoveredResponsive ? 'text-white group-hover/item:text-pink-400' : 'text-white/60'
                            }`} />
                            <h5 className={`font-semibold text-xl transition-colors duration-500 ${
                              hoveredResponsive ? 'text-white' : 'text-white/70'
                            }`}>
                              Małe ekrany
                            </h5>
                          </div>
                          <p className={`text-lg leading-relaxed transition-colors duration-500 ${
                            hoveredResponsive ? 'text-gray-300' : 'text-gray-400'
                          }`}>
                            Idealne <span className="font-bold">dopasowanie</span>
                          </p>
                        </div>

                        <div className="mt-1 flex justify-start">
                          <a href="/contact" className="group/btn relative cursor-pointer transition-all duration-300 inline-block">
                            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-[#fd9f91] text-black font-medium text-base transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg active:scale-95"style={{
                    background: `radial-gradient(circle at 50% 50%, #ffffffdb 0%, #ffffffdb 30%, #ffffffdb 60%, #ffffffdb 100%)`,
                  }}
            >
                 
<span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">   kontakt</span>
                              <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-1" />
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center items-center h-full group/image">
                      <img
                        src="_resources/Whiteslope_responsivity.webp"
                        alt="Responsywność"
                        className="w-full max-w-2xl h-auto rounded-lg shadow-2xl object-contain scale-110 transition-transform duration-500 group-hover/image:scale-[1.13]"
                      />
                    </div>
                  </div>
                </div> */}

                {/* KONSULTACJE DESKTOP Z HOVER I ANIMACJĄ EKG */}
                {/* <div
                  className="rounded-2xl p-8 min-h-[400px] flex items-center relative overflow-hidden group transition-all duration-500 cursor-pointer"
                  style={{ 
                    background: 'radial-gradient(circle at bottom, rgba(255, 255, 255, 0.03) 0%, #0f0f0f 60%)',
                    border: '1px solid rgba(255, 255, 255, 0.17)'
                  }}
                  onMouseEnter={() => setHoveredConsultation(true)}
                  onMouseLeave={() => setHoveredConsultation(false)}
                >
     
                  <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="ekg-grid-d" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 10 50 M 20 0 L 20 50 M 30 0 L 30 50 M 40 0 L 40 50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                        <path d="M 0 10 L 50 10 M 0 20 L 50 20 M 0 30 L 50 30 M 0 40 L 50 40" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                        <rect width="50" height="50" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#ekg-grid-d)" />
                  </svg>

          
                  <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1400 200">
                    <path
                      d="M0,100 L100,100 L120,100 L130,60 L140,140 L150,100 L250,100 L270,100 L280,70 L290,130 L300,100 L450,100 L470,100 L480,50 L490,150 L500,100 L600,100 L620,100 L630,75 L640,125 L650,100 L800,100 L820,100 L830,65 L840,135 L850,100 L950,100 L970,100 L980,55 L990,145 L1000,100 L1150,100 L1170,100 L1180,80 L1190,120 L1200,100 L1400,100"
                      stroke="rgba(255, 116, 95, 0.8)"
                      strokeWidth="2"
                      fill="none"
                    >
                      <animate attributeName="stroke-dasharray" from="0,2000" to="2000,0" dur="8s" repeatCount="indefinite" />
                    </path>
                  </svg>

                  <div className="w-full mx-5 flex flex-col items-center text-center relative z-10">
                    <div className="space-y-6 max-w-4xl">
                      <h4 className={`text-5xl lg:text-5xl font-thin tracking-tight transition-all duration-500 ${
                        hoveredConsultation ? 'text-white scale-[1.01]' : 'text-white/70'
                      }`}>
                        Czas, aby Twoja strona zaczęła{" "}
                        <span className="font-normal bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                          żyć!
                        </span>
                      </h4>

                      <p className={`text-2xl transition-all duration-500 ${
                        hoveredConsultation ? 'text-gray-200 scale-[1.01]' : 'text-gray-400'
                      }`}>
                        Nie zmarnujemy Twojego czasu. Przed projektem strony umawiamy się na dogłębną analizę Twojej strony i badamy rynek w Twoim obszarze. Dzięki temu tworzymy rozwiązania, które rzeczywiście działają i przynoszą rezultaty.
                      </p>

                      <div className={`flex gap-4 justify-center transition-all duration-500 ${
                        hoveredConsultation ? 'scale-[1.01]' : ''
                      }`}>
                        <a href="/contact" className="group/btn relative cursor-pointer transition-all duration-300 inline-block">
                          <button className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-[#fd9f91] text-black font-medium text-base transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg active:scale-95"style={{
                    background: `radial-gradient(circle at 50% 50%, #ffffffdb 0%, #ffffffdb 30%, #ffffffdb 60%, #ffffffdb 100%)`,
                  }}
            >
                 
<span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">   Umów konsultację</span>
                            <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-1" />
                          </button>
                        </a>

                        <a href="/pricing" className="group/btn relative cursor-pointer transition-all duration-300 inline-block">
                          <button className="cursor-pointer flex items-center gap-3 px-5 py-2 rounded-full border-1 border-white bg-transparent text-white font-semibold text-base transition-all duration-300 hover:bg-white hover:text-black hover:shadow-xl active:scale-95">
                            <span>Wycena strony</span>
                            <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover/btn:translate-x-1" />
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div> */}
                
              </div>
            )}
          </div>
        </div>

        {/* Przerywnik */}
        <div className="m-10 w-full h-px bg-gradient-to-r from-transparent md:mb-10"></div>
      </div>
    </section>
  );
}