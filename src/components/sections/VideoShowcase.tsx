'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from 'framer-motion';

// Nowa, rozszerzona lista usług
const SERVICES = [
  { id: 'email', title: 'Email marketing' },
  { id: 'video', title: 'Video Marketing + UGC' },
  { id: 'graphics', title: 'Grafika 2D i 3D' },
  { id: 'audio', title: 'Obróbka dźwięku' },
];

export default function VideoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax dla filmu
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const videoY = useTransform(scrollYProgress, [0, 0.5, 1], ["0px", "0px", "50px"]);

  return (
    <section className="relative w-full bg-white pb-[80px] overflow-hidden ">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">
        
        {/* --- GŁÓWNA KARTA BENTO (DARK MODE) --- */}
        {/* Tło ustawione na elegancki, ciemny szary HEX #161616 */}
        <div 
          ref={containerRef}
          className="relative group w-full bg-[#161616] rounded-[32px] border border-zinc-800 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:border-zinc-700 cursor-pointer flex flex-col lg:flex-row"
        >
          
          <Link href="/pricing/video-marketing" className="absolute inset-0 z-30" aria-label="Wyceń wideo marketing" />

          

          {/* --- LEWO: Treść --- */}
          <div className="w-full lg:w-[45%] flex flex-col items-start text-left p-[32px] lg:p-[64px] z-20 relative pointer-events-none">
            
            {/* LOGO: Wersja jasna (bez _czarny) */}
            <div className="w-full flex justify-start mb-[32px] lg:mb-[40px]">
               <img 
                src="/_resources/logos/whiteslopeStudioLogoZolty_dzialAMARKETING.webp"
                className="h-[30px] lg:h-[40px] object-contain pointer-events-none"
                alt="Whiteslope Studio Video Marketing"
              />
            </div>

            {/* BIAŁE NAPISY */}
            <h2 className="text-[36px] lg:text-[42px] font-bold text-white leading-[1.05] tracking-tight mb-[24px]">
              3. Marketing & Wideo
            </h2>

            {/* Szary, elegancki opis */}
            <p className="text-[16px] text-zinc-400 leading-relaxed font-normal mb-[40px] max-w-[480px]">
              Luksusowe filmy i autentyczny content UGC to najskuteczniejsze narzędzia do budowania autorytetu, zwiększania ruchu i zaufania:
            </p>

            <ul className="flex flex-col gap-[16px] mb-[48px] w-full">
              {SERVICES.map((service) => (
                <li key={service.id} className="flex items-center gap-[14px]">
                  {/* Ciemne checkboxy pasujące do reszty */}
                  <div className="w-[24px] h-[24px] rounded-full bg-[#222222] border border-[#333333] flex items-center justify-center flex-shrink-0 text-zinc-300 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[16px] font-semibold text-zinc-200 tracking-tight">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>

            <div className="group relative inline-flex overflow-hidden rounded-full p-[4px] transition-transform active:scale-95 cursor-pointer">
  
  {/* UNIKALNE STYLE DLA WERSJI ŻÓŁTEJ */}
  <style>{`
    @keyframes rotateYellowButton {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .spinner-element-yellow {
      position: absolute;
      width: 300%;
      height: 300%;
      top: -100%;
      left: -100%;
      background: conic-gradient(from 0deg, rgba(255, 208, 0, 0) 30%, #ffd000 100%);
      transform-origin: center;
    }

    .group:hover .spinner-element-yellow {
      animation: rotateYellowButton 1.2s linear infinite;
    }
  `}</style>

  {/* Tylko i wyłącznie żółta obwódka */}
  <span className="absolute spinner-element-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  
  <Link
    href="/video-marketing"
    className="relative z-10 inline-flex h-[44px] w-full sm:w-auto items-center justify-center rounded-full bg-black px-6 text-[14px] md:text-[15px] font-semibold text-white"
  >
    Wybieram
    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>

</div>

            
          </div>

          {/* --- PRAWO: Powiększony Film z efektem Parallax --- */}
          <div className="w-full lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[60%] h-[400px] lg:h-full z-10 overflow-hidden pointer-events-none bg-black">
            
            <motion.div 
              style={{ y: videoY }} 
              className="absolute inset-x-0 top-[-7.5%] h-[115%] w-full origin-bottom"
            >
              <video 
                src="/_resources/videoMarketing/WieslawskiStudioFilm.mp4" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.01]" 
                autoPlay 
                muted 
                loop 
                playsInline 
              />
            </motion.div>

            {/* 
              Długi, ultra-płynny gradient odcinający tekst od filmu. 
              Używa tego samego HEXA co tło (#161616), dzięki czemu film idealnie zanika w lewej krawędzi.
            */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-[#161616] via-[#161616]/70 to-transparent z-10" />
            
            {/* Wtopienie od góry na mobile */}
            <div className="block lg:hidden absolute inset-x-0 top-0 h-[100px] bg-gradient-to-b from-[#161616] to-transparent z-10" />

            {/* Dodatkowy cień od prawej budujący kinowy mrok */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/5 to-transparent z-10" />

          </div>

        </div>

      </div>
    </section>
  );
}