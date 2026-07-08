'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowRight } from 'lucide-react';
import { MAIN_SERVICES } from '@/lib/data';

const CATEGORIES = [
  "Web Development",
  "Automatyzacja & AI",
  "Marketing & Wideo"
];

export function PricingHero() {
  const [searchTerm, setSearchTerm] = useState('');

  const topServices = MAIN_SERVICES.slice(0, 3);

  const filteredServices = MAIN_SERVICES.filter(service => 
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 4);

  return (
    <section className="relative pt-[160px] pb-[80px] px-[24px] bg-white overflow-hidden">
      
      {/* --- TŁO: PIONOWE PASY W STYLU #e6f3a8 --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-60 overflow-hidden">
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 100%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 85%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 70%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 55%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 40%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 25%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 10%)' }} />
      </div>

      {/* ZMIANA: max-w-[1400px], usunięcie gap na lg, żeby kontrolować nachodzenie */}
      <div className="container mx-auto max-w-[1600px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-[48px] lg:gap-0">
        
        {/* ========================================= */}
        {/* LEWA STRONA (z-20 żeby była NAD zdjęciem) */}
        {/* ========================================= */}
        <div className="w-full lg:w-[60%] flex flex-col items-start justify-center text-left py-8 lg:py-0 relative z-20">
          <p className="text-[18px] md:text-[24px] text-zinc-900 font-medium mb-[32px]">
            <u>Cennik usług</u>
          </p>


          <h1 className="text-[40px] md:text-[45px] font-bold text-zinc-950 leading-[1.05] tracking-tight mb-[24px] max-w-[800px]">
            Ponieważ każdy powinien pozwolić sobie na profesjonalne rozwiązania!
          </h1>
          
          <p className="text-[18px] md:text-[20px] text-zinc-600 max-w-[800px] leading-relaxed font-normal mb-[40px]">
            Projektujemy i wdrażamy dedykowane rozwiązania cyfrowe, które skalują biznes. Sprawdź nasze progi wejścia i wybierz usługę dla siebie.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-[16px] md:gap-[24px]">
            <span className="text-[28px] font-bold text-zinc-900 shrink-0">
              Wybierz cennik dla:
            </span>
            
            <div className="flex flex-wrap items-center gap-[12px]">
              {CATEGORIES.map((category) => {
                const targetId = `category-${category.replace(/\s+/g, '-').toLowerCase()}`;
                
                return (
                  <Link
                    key={category}
                    href={`#${targetId}`}
                    className="inline-flex items-center justify-center px-[24px] py-[10px] rounded-full border border-black/10 bg-blue-500 text-[14px] font-semibold text-white hover:border-zinc-300 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm active:scale-95"
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* PRAWA STRONA (Zdjęcie wciągnięte pod tekst) */}
        {/* ========================================= */}
        {/* ZMIANA: lg:w-[50%] oraz ujemny margines lg:-ml-[10%] żeby wciągnąć obrazek, z-10 */}
        <div className="w-full lg:w-[50%] flex justify-start lg:-ml-[10%] relative z-10 pointer-events-none">
           <div className="relative w-full max-w-[1000px] flex items-center justify-center pointer-events-auto -right-[100px]">
              <img 
                src="/_resources/pricingSite/Mati.webp" 
                alt="Mateusz Malewski" 
                className="w-full h-auto object-contain"
              />
           </div>
        </div>

      </div>
    </section>
  );
}