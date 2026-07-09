'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useInteractiveButton } from '@/utils/hooks';

export default function HeroSectionMobile() {
  const mainButton = useInteractiveButton();
  const [isMainHovered, setIsMainHovered] = useState(false);

  return (
    // Zmiana struktury na flex-col, co naturalnie układa elementy bez ryzyka nachodzenia
    <section className="relative mx-auto mb-4 bg-[#141414] rounded-xl overflow-hidden flex flex-col min-h-[85svh]">
      
      {/* --- TŁO STATYCZNE (Mobile) --- */}
      <div
        className="absolute inset-0 z-0 bg-center bg-cover"
        style={{
          backgroundImage: 'url(/_resources/stronyInternetowe/DamianBogdanowicz.webp)',
          filter: 'brightness(0.42) saturate(0.92)',
        }}
      />

      {/* --- PŁYNNY GRADIENT ZACIEMNIAJĄCY --- */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* --- GÓRA: LOGO --- */}
      {/* Ułożone naturalnie w gridzie, nie ma szans na nachodzenie z tekstem z dołu */}
      <div className="relative z-20 w-full px-6 pt-8 flex justify-start pointer-events-none top-15">
        <img 
          src="/_resources/logos/whiteslopeStudioLogoNiebieski_dzialWEBDEV.webp" 
          alt="Whiteslope Studio Web Development" 
          className="h-[30px] w-auto opacity-90 drop-shadow-md"
        />
      </div>

      {/* --- SPACER --- */}
      {/* Wypycha treść na sam dół ekranu, zachowując bezpieczny odstęp od logo */}
      <div className="flex-1 min-h-[40px]" />

      {/* --- DÓŁ: TREŚĆ I PRZYCISKI --- */}
      <div className="relative z-20 w-full px-6 pb-10 flex flex-col gap-5">
        
        {/* Zmniejszony i zoptymalizowany nagłówek */}
        <h1 className="text-[34px] font-bold leading-[1.05] text-left text-white tracking-tight">
          Projektujemy strony internetowe, systemy B2B i produkty SaaS
        </h1>

        <p className="text-[15px] text-blue-50/80 leading-relaxed">
          Od konwertujących wizytówek po rozbudowane platformy edukacyjne i narzędzia do zarządzania zespołem. Dostarczamy intuicyjne aplikacje, które realnie rozwijają Twoją firmę.
        </p>

        {/* Przyciski w kolumnie (w-full) dla łatwego klikania */}
        <div className="flex flex-col gap-3 mt-2 w-full">
          <Link
            href="#brief"
            onMouseMove={mainButton.handleMouseMove}
            onMouseEnter={() => {
              setIsMainHovered(true);
              if (mainButton.handleMouseEnter) mainButton.handleMouseEnter();
            }}  
            onMouseLeave={() => {
              setIsMainHovered(false);
              if (mainButton.handleMouseLeave) mainButton.handleMouseLeave();
            }}
            className="w-full inline-flex items-center justify-center rounded-full h-[48px] px-6 text-[15px] font-semibold text-white relative overflow-hidden transition-transform duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(0,87,255,0.25)]"
            style={{
              background: `radial-gradient(circle at ${isMainHovered ? mainButton.mousePosition.x : 50}% ${isMainHovered ? mainButton.mousePosition.y : 100}%, #1a75ff, #0057ff 40%, #004ae6 80%, #003bba)`,
            }}
          >
            Wyceń projekt
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/projects"
            className="w-full inline-flex items-center justify-center h-[48px] px-4 text-[15px] font-medium text-white/80 hover:text-white transition-colors duration-300 group"
          >
            <span className="relative pb-0.5 border-b border-white/30 group-hover:border-white transition-colors">
              Zobacz realizacje
            </span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
      
    </section>
  );
}