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
            Czy jesteś gotowy na jakościowe projekty w dobrej cenie?
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
                    className="inline-flex items-center justify-center px-[24px] py-[10px] rounded-full border border-black/10 bg-zinc-100 text-[14px] font-semibold text-black hover:border-zinc-300 hover:bg-zinc-200 hover:text-black transition-all duration-300 shadow-sm active:scale-95"
                  >
                    {category}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* PRAWA STRONA (Jaśniejsza z ujednoliconą paletą #2a3014) */}
        {/* ========================================= */}
        {/* ZMIANA: Jasne tło #f4facc */}
        <div className="max-w-2xl lg:w-1/2 bg-[#f4facc] rounded-[24px] p-[32px] md:p-[48px] flex flex-col gap-[32px] shadow-sm border border-[#e0eb9d]">
           
           <div className="flex flex-col gap-[20px]">
             
             {/* ZMIANA: Lupe przenieśliśmy do dolnej linii za pomocą flexowego spana */}
             <h3 className="text-[28px] md:text-[32px] font-bold text-[#2a3014] leading-[1.1] tracking-tight">
               Znajdź szybciej swoją usługę:
               
             </h3>
             
             {/* POLE WYSZUKIWANIA */}
             <div className="relative w-full z-50">
                <Search className="absolute left-[20px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-[#2a3014]/40" />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Wpisz wyszukiwaną usługę..."
                  // ZMIANA: Teksty dopasowane do oliwkowej palety
                  className="w-full h-[60px] bg-white/90 rounded-full pl-[52px] pr-[24px] text-[16px] font-medium text-[#2a3014] placeholder:text-[#2a3014]/40 border border-white/50 focus:border-[#c5db4e] focus:bg-white focus:ring-4 focus:ring-white/60 outline-none transition-all duration-300 shadow-sm"
                />

                {/* ROZWIJANA LISTA */}
                {searchTerm !== '' && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-white border border-[#e0eb9d] rounded-[16px] shadow-xl overflow-hidden flex flex-col py-[8px]">
                    {filteredServices.length > 0 ? (
                      filteredServices.map((service) => (
                        <Link 
                          key={service.id} 
                          href={`/pricing/${service.id}`}
                          className="flex items-center justify-between px-[20px] py-[12px] hover:bg-[#fbfdf0] transition-colors"
                        >
                          <span className="text-[15px] font-bold text-[#2a3014]">{service.title}</span>
                          <div className="flex items-center gap-[12px]">
                            <span className="text-[14px] text-[#2a3014]/60 font-medium">{service.price}</span>
                            <ArrowRight className="w-[16px] h-[16px] text-[#2a3014]/30" />
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-[20px] py-[16px] text-[14px] text-[#2a3014]/50 text-center">
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