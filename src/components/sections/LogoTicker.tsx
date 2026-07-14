'use client';

import React from 'react';
import Image from 'next/image';

// Dodana flaga invertColor: true dla Patryka
const PARTNER_LOGOS = [
  { name: 'Wiesławski Studio', url: '/_resources/grafika/wieslawski studio logo biale.webp', invertColor: false, w: 1280, h: 213 },
  { name: 'Easylesson', url: '/_resources/grafika/LogoEasyLessonWhite.webp', invertColor: false, w: 256, h: 58 },
  { name: 'Damian Bogdanowicz', url: '/_resources/logos/damianLogo.webp', invertColor: false, w: 700, h: 1000 },
  { name: 'Patryk Kulesza', url: '/_resources/logo-PatrykKulesza.webp', invertColor: true, w: 1442, h: 494 },
  { name: 'Matiava', url: '/_resources/grafika/matiava.webp', invertColor: false, w: 3000, h: 3000 },
];

export default function LogoTicker() {
  // Duplikujemy tablicę kilka razy, żeby animacja przesuwania była idealnie płynna w nieskończoność
  const logos = [...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    // Zewnętrzna sekcja zapewnia tło na pełną szerokość i linię oddzielającą na dole
    <section className="relative w-full py-6 md:py-8 bg-[#050505]  flex justify-center">
      
      {/* Wstrzyknięty styl dla płynnej animacji przesuwania (marquee) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          /* Zmień 30s na mniejszą wartość, jeśli chcesz żeby loga leciały szybciej */
          animation: marquee 30s linear infinite;
        }
      `}} />

      {/* WEWNĘTRZNY KONTENER - max 1640px. Gradienty i ucinanie (overflow-hidden) dzieją się tutaj */}
      <div className="relative w-full max-w-[1640px] overflow-hidden flex items-center">
        
        {/* Lewy gradient - teraz startuje na krawędzi 1640px */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-56 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        
        {/* Prawy gradient - teraz startuje na krawędzi 1640px */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-56 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Kontener z animacją */}
        <div className="flex animate-marquee items-center w-max">
          {logos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 px-8 md:px-16 flex items-center justify-center">
              <Image
                src={logo.url}
                alt={`Logo ${logo.name}`}
                width={logo.w}
                height={logo.h}
                sizes={`${Math.ceil((logo.w / logo.h) * 45)}px`}
                // Jeśli logo.invertColor jest true, dodajemy klasę 'invert', która robi z czarnego biały
                className={`max-h-[35px] md:max-h-[45px] w-auto opacity-80 hover:opacity-100 transition-opacity duration-300 ${
                  logo.invertColor ? 'invert' : ''
                }`}
              />
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}