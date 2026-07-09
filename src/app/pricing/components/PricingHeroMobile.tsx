'use client';

import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';

const CATEGORIES = [
  "Web Development",
  "Automatyzacja & AI",
  "Marketing & Wideo"
];

export default function PricingHeroMobile() {
  return (
    <section className="relative pt-[120px] pb-[40px] px-6 bg-white overflow-hidden flex flex-col">
      
      {/* --- TŁO: PIONOWE PASY --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-60 overflow-hidden">
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 100%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 80%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 60%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 40%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #ffffff 20%)' }} />
      </div>

      <div className="relative z-20 flex flex-col items-start w-full">
        
        {/* --- BEZPOŚREDNI NAGŁÓWEK (Bez kropki) --- */}
        <h1 className="text-[52px] font-black text-zinc-950 tracking-tighter leading-none mb-8 mt-10">
          Cennik
        </h1>
        
        {/* --- AWATAR Z DYMKIEM (Odwócony - Awatar po prawej) --- */}
        <div className="flex items-end justify-end gap-4 mb-10 w-full z-20">
          
          {/* Dymek z tekstem (ogon po prawej stronie na dole: rounded-br-none) */}
          <div className="bg-white rounded-[20px] rounded-br-none px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.1)] border border-zinc-100 max-w-[260px]">
             <p className="text-[14px] text-zinc-800 font-medium leading-snug">
               „Ponieważ każdy powinien pozwolić sobie na profesjonalne rozwiązania!”
             </p>
          </div>

          {/* Awatar w kółku (po prawej) */}
          <div className="w-[64px] h-[64px] rounded-full overflow-hidden bg-[#e6f3a8] shrink-0 border-2 border-white shadow-[0_8px_24px_rgba(0,0,0,0.15)] relative">
            <img
              src="/_resources/pricingSite/Mati.webp"
              alt="Mateusz Malewski"
              className="w-[150%] max-w-none h-auto object-cover absolute bottom-0 left-1/2 -translate-x-1/2"
            />
          </div>

        </div>

        {/* --- ZAKŁADKI KATEGORII (App-style z rounded-full) --- */}
        <div className="flex flex-col w-full gap-3 relative z-20 mt-2 mb-10">
          <span className="text-[24px] font-bold text-zinc-900 mb-1 ml-1">
            Wybierz cennik dla:
          </span>
          
          <div className="flex flex-col gap-3 w-full">
            {CATEGORIES.map((category) => {
              const targetId = `category-${category.replace(/\s+/g, '-').toLowerCase()}`;
              return (
                <Link
                  key={category}
                  href={`#${targetId}`}
                  // Zastosowano rounded-full, bg-zinc-100 i hover/active:bg-zinc-300
                  className="w-full flex items-center justify-between px-6 h-[56px] rounded-full bg-zinc-100 text-[16px] font-semibold text-zinc-900 hover:bg-zinc-300 active:bg-zinc-300 transition-colors duration-200 shadow-[0_4px_10px_rgba(0,0,0,0.1)]"
                >
                  {category}
                  <ChevronRight className="w-5 h-5 text-zinc-500" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-zinc-300 w-full my-4"></div>

      </div>
    </section>
  );
}