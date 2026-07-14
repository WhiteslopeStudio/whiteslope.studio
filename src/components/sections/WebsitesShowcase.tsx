'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from 'framer-motion';

const SERVICES = [
  { id: 'web', title: 'Strony internetowe' },
  { id: 'seo', title: 'Pozycjonowanie (SEO)' },
  { id: 'saas', title: 'Aplikacje SaaS' },
  { id: 'systems', title: 'Dedykowane Systemy Webowe' },
  { id: 'fixes', title: 'Poprawki istniejących stron' }
];

export default function WebsitesShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 0.5, 1], ["0px", "0px", "50px"]);

  return (
    <section id="websites" className="relative w-full bg-white pb-[80px] pt-[70px] overflow-hidden ">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">
        
        <div 
          ref={containerRef}
className="relative group w-full bg-zinc-50 rounded-[32px] border border-zinc-200 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:border-zinc-300 cursor-pointer min-h-[550px] lg:min-h-[600px] flex items-center"        >
          
          <Link href="/pricing/website" className="absolute inset-0 z-30 rounded-[32px]" aria-label="Wyceń projekt" />

          {/* --- TŁO: 4 pionowe pasy (po 1/8 szerokości) w lewej połowie --- */}
          <div className="absolute inset-0 z-0 flex pointer-events-none w-1/2">
            
            {/* Pas 1: Gradient do zinc-50 */}
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #b8c3ff 0%, #f4f4f5 100%)' }} />
            
            {/* Pas 2: Gradient do zinc-50 */}
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #b8c3ff 0%, #f4f4f5 75%)' }} />
            
            {/* Pas 3: Gradient do zinc-50 */}
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #b8c3ff 0%, #f4f4f5 50%)' }} />
            
            {/* Pas 4: Pionowy (niebieski->zinc-50) + Poziomy (transparent->zinc-50 od prawej do lewej) */}
            <div 
              className="flex-1" 
              style={{ 
                background: `
                  linear-gradient(to left, #f4f4f5 0%, transparent 100%), 
                  linear-gradient(to bottom, #b8c3ff 0%, #f4f4f5 25%)
                ` 
              }} 
            />
          </div>

          {/* --- TŁO: Subtelny niebieski gradient (poświata) --- */}
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
          <div className="absolute bottom-[-10%] right-[15%] w-[40%] h-[40%] rounded-full bg-blue-400/15 blur-[80px] pointer-events-none z-0" />
          {/* --- LOGO: Idealnie wyrównane z pierwszą linią H2 --- */}
          <Image 
            src="/_resources/logos/whiteslopeStudioLogoNiebieski_dzialWEBDEV_czarny.webp"
            width={916}
            height={117}
            sizes="320px"
            className="absolute top-[40px] right-[32px] lg:top-[50px] lg:right-[64px] h-[30px] lg:h-[40px] w-auto object-contain z-20 pointer-events-none"
            alt="Whiteslope Studio Web Development"
          />

          {/* --- LEWO: Treść --- */}
          <div className="w-full lg:w-[50%] flex flex-col items-start text-left p-[32px] pb-[350px] lg:pb-[64px] lg:p-[64px] z-20 relative pointer-events-none">
            
            <h2 className="text-[36px] lg:text-[42px] font-bold text-zinc-950 leading-[1.05] tracking-tight mb-[24px] pr-[120px] lg:pr-0">
              1. Strony internetowe,<br />systemy B2B i produkty SaaS
            </h2>

            <p className="text-[16px] text-zinc-600 leading-relaxed font-normal mb-[40px] max-w-[480px]">
              Tworzymy dedykowane rozwiązania cyfrowe, które skalują biznes. Zobacz, w czym specjalizuje się nasz zespół inżynieryjny:
            </p>

            <ul className="flex flex-col gap-[16px] mb-[48px] w-full">
              {SERVICES.map((service) => (
                <li key={service.id} className="flex items-center gap-[14px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-blue-500 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-100 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[16px] font-semibold text-zinc-900 tracking-tight">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>

          <div className="group relative inline-flex overflow-hidden rounded-full p-[4px] transition-transform active:scale-95 cursor-pointer">
  
  {/* Unikalne style tylko dla wersji Niebieskiej (Blue) */}
  <style>{`
    @keyframes rotateBlue {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .border-spinner-blue {
      position: absolute;
      width: 300%;
      height: 300%;
      top: -100%;
      left: -100%;
      /* Przejście z przezroczystego niebieskiego do czystego niebieskiego #0022ff */
      background: conic-gradient(from 0deg, rgba(0, 34, 255, 0) 30%, #0022ff 100%);
      transform-origin: center;
    }

    .group:hover .border-spinner-blue {
      animation: rotateBlue 1.2s linear infinite;
    }
  `}</style>

  {/* Świecący niebieski border */}
  <span className="absolute border-spinner-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  
  {/* Środek przycisku */}
  <Link
    href="/website"
    className="relative z-10 inline-flex h-[44px] w-full sm:w-auto items-center justify-center rounded-full bg-black px-6 text-[14px] md:text-[15px] font-semibold text-white"
  >
    Zobacz więcej
    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>

</div>
            
          </div>

          {/* --- PRAWO: Zdjęcie --- */}
          <div className="absolute bottom-0 right-0 w-[95%] lg:w-[65%] h-[320px] lg:h-[85%] z-10 flex items-end justify-end px-[16px] lg:px-[40px] pointer-events-none">
            <motion.div style={{ y: imageY }} className="relative w-full h-full flex items-end justify-end origin-bottom">
              <Image 
                src="/_resources/stronyInternetowe/ShowWebsites.webp"
                alt="Przykłady stron internetowych Whiteslope"
                fill
                sizes="(max-width: 1024px) 95vw, 65vw"
                className="object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,87,255,0.08)] transition-transform duration-800 group-hover:scale-[1.01] origin-bottom"
              />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}