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
    <section className="relative pt-[160px] pb-[80px] px-[24px] bg-zinc-100 ">
      
      {/* --- TŁO: PIONOWE PASY W STYLU #e6f3a8 --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-60 overflow-hidden">
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #fafafa 100%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #fafafa 85%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #fafafa 70%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #fafafa 55%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #fafafa 40%)' }} />
        <div className="flex-1 border-r border-black/5" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #fafafa 25%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #e6f3a8 0%, #fafafa 10%)' }} />
      </div>

      {/* ZMIANA: items-stretch, żeby lewa kolumna mogła się wyśrodkować względem prawej */}
      <div className="container mx-auto max-w-[1640px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-[48px] lg:gap-[64px]">
        
        {/* ========================================= */}
        {/* LEWA STRONA (Wyśrodkowana w osi Y) */}
        {/* ========================================= */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-left py-8 lg:py-0">
          
          <h1 className="text-[40px] md:text-[45px] font-bold text-zinc-950 leading-[1.05] tracking-tight mb-[24px] max-w-[800px]">
            Ponieważ każdy powinien pozwolić sobie na profesjonalne rozwiązania!
          </h1>
          
          <p className="text-[18px] md:text-[20px] text-zinc-600 max-w-[800px] leading-relaxed font-normal mb-[40px]">
            Projektujemy i wdrażamy dedykowane rozwiązania cyfrowe, które skalują biznes. Sprawdź nasze progi wejścia i wybierz usługę dla siebie.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-[16px] md:gap-[24px]">
            <span className="text-[20px] font-bold text-zinc-500 shrink-0">
              Wybierz cennik dla:
            </span>
            
            <div className="flex flex-wrap items-center gap-[12px]">
              {CATEGORIES.map((category) => {
                const targetId = `category-${category.replace(/\s+/g, '-').toLowerCase()}`;
                
                return (
                  <Link
                    key={category}
                    href={`#${targetId}`}
                    className="inline-flex items-center justify-center px-[24px] py-[10px] rounded-full border border-black/10 bg-white text-[14px] font-semibold text-black hover:border-zinc-300 hover:bg-zinc-100 hover:text-black transition-all duration-300 shadow-sm active:scale-95"
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* PRAWA STRONA (Czysta, przezroczysta z cieniem pod wyszukiwarką) */}
        {/* ========================================= */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
           
           <div className="flex flex-col gap-[24px] max-w-2xl">
             
             {/* Nagłówek bez flexowego spana, bo lupe wyrzucamy/zostawiamy w inputie */}
             <h3 className="text-[28px] md:text-[34px] font-bold text-zinc-900 leading-[1.1] tracking-tight">
               Znajdź swoją usługę szybciej:
             </h3>
             
             {/* POLE WYSZUKIWANIA (Z mocniejszym akcentem) */}
             <div className="relative w-full z-50">
                <Search className="absolute left-[24px] top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-zinc-400" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Wpisz wyszukiwaną usługę..."
                  // ZMIANA: Usunięto oliwkowe akcenty. Dodano mocny cień i grubsze pole.
                  className="w-full h-[72px] bg-white rounded-full pl-[60px] pr-[24px] text-[18px] font-medium text-zinc-900 placeholder:text-zinc-400 border border-zinc-200 focus:border-zinc-400 focus:ring-4 focus:ring-zinc-100 outline-none transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                />

                {/* ROZWIJANA LISTA */}
                {searchTerm !== '' && (
                  <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-white border border-zinc-200 rounded-[20px] shadow-2xl overflow-hidden flex flex-col py-[8px]">
                    {filteredServices.length > 0 ? (
                      filteredServices.map((service) => (
                        <Link 
                          key={service.id} 
                          href={`/pricing/${service.id}`}
                          className="flex items-center justify-between px-[24px] py-[16px] hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-b-0"
                        >
                          <span className="text-[16px] font-bold text-zinc-900">{service.title}</span>
                          <div className="flex items-center gap-[16px]">
                            <span className="text-[15px] text-zinc-500 font-medium">{service.price}</span>
                            <ArrowRight className="w-[18px] h-[18px] text-zinc-300" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-[24px] py-[20px] text-[15px] text-zinc-500 text-center">
                        Brak wyników wyszukiwania.
                      </div>
                    )}
                  </div>
                )}
             </div>
           </div>

        </div>

      </div>
    </section>
  );
}