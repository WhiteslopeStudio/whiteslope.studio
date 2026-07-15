'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ArrowRight } from "lucide-react";

const SERVICES = [
  { id: 'email', title: 'Email marketing' },
  { id: 'video', title: 'Video Marketing + UGC' },
  { id: 'graphics', title: 'Grafika 2D i 3D' },
  { id: 'audio', title: 'Obróbka dźwięku' },
];

export default function VideoShowcaseMobile() {
  return (
    <section className="relative w-full bg-white py-8 px-6 overflow-hidden">
      <div className="w-full mx-auto">
        
        {/* Główna karta ujednolicona do jasnego motywu (bg-zinc-50) */}
        <div className="relative group w-full bg-zinc-50 rounded-[28px] border border-zinc-200 overflow-hidden flex flex-col shadow-sm">
          
          {/* Niewidoczny link pokrywający całą kartę (Z-index 30) */}
          <Link href="/pricing/video-marketing" prefetch={false} className="absolute inset-0 z-30 rounded-[28px]" aria-label="Wyceń wideo marketing" />
          
          {/* --- TŁO KARTY (JASNE) --- */}
          {/* Delikatny, jasnożółty gradient na górze karty */}
          <div className="absolute top-0 left-0 right-0 h-[300px] z-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #fff5cc 0%, #f4f4f5 100%)' }} />
          <div className="absolute top-[-5%] right-[-10%] w-[80%] h-[200px] rounded-full bg-yellow-400/15 blur-[60px] pointer-events-none z-0" />

          {/* --- LOGO --- */}
          {/* Zmienione na czarną wersję dopasowaną do jasnego tła */}
          <Image 
            src="/_resources/logos/whiteslopeStudioLogoZolty_dzialAMARKETING_czarny.webp"
            width={916}
            height={215}
            sizes="90px"
            className="absolute top-5 right-5 h-[20px] w-auto object-contain z-20 pointer-events-none"
            alt="Whiteslope Studio Video Marketing"
          />

          {/* --- GÓRA: ZDJĘCIE --- */}
          <div className="relative w-full h-[240px] z-10 pointer-events-none">
            <Image 
              src="/_resources/videoMarketing/VideoMarketingPicture.webp"
              alt="Marketing i Wideo Whiteslope"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Płynny gradient od dołu, który wtapia zdjęcie w jasne tło karty */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-l from-white/30 via-transparent to-transparent z-10" />
          </div>

          {/* --- DÓŁ: TREŚĆ --- */}
          <div className="w-full flex flex-col items-start text-left p-6 z-20 relative pointer-events-none bg-zinc-50">
            
            {/* Ciemny nagłówek (text-zinc-950) */}
            <h2 className="text-[28px] font-bold text-zinc-950 leading-[1.1] tracking-tight mb-3">
              3. Marketing & Wideo
            </h2>

            {/* Zwykły, czytelny opis (text-zinc-600) */}
            <p className="text-[15px] text-zinc-600 leading-relaxed font-normal mb-6">
              Luksusowe filmy i autentyczny content UGC to najskuteczniejsze narzędzia do budowania autorytetu, zwiększania ruchu i zaufania:
            </p>

            {/* Jasne akcenty listy usług z żółtym wyróżnieniem */}
            <ul className="flex flex-col gap-3 mb-8 w-full">
              {SERVICES.map((service) => (
                <li key={service.id} className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-full bg-[#ffd000] border border-yellow-300 flex items-center justify-center flex-shrink-0 text-yellow-950 shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-semibold text-zinc-900 tracking-tight">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>

            <div className="group relative inline-flex overflow-hidden rounded-full p-[3px] w-full pointer-events-auto transition-transform active:scale-95">
              
              {/* Animacja kręcącej się żółtej obwódki (pozostaje bez zmian, bo świetnie pasuje do motywu) */}
              <style>{`
                @keyframes rotateYellowButton {
                  0% { transform: translate(-50%, -50%) rotate(0deg); }
                  100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                .spinner-element-yellow {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 250%;
                  aspect-ratio: 1;
                  background: conic-gradient(from 0deg, rgba(255, 208, 0, 0) 30%, #ffd000 100%);
                  transform: translate(-50%, -50%);
                }

                .group:hover .spinner-element-yellow {
                  animation: rotateYellowButton 1.2s linear infinite;
                }
              `}</style>

              <span className="absolute spinner-element-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <Link
                href="/video-marketing"
                prefetch={false}
                className="relative z-10 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-black px-6 text-[15px] font-semibold text-white"
              >
                Zobacz więcej
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}