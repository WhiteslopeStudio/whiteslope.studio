'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MAIN_SERVICES } from '@/lib/data'; 

const CATEGORY_ORDER = [
  "Web Development",
  "Automatyzacja & AI",
  "Marketing & Wideo"
];

// Kolory przewodnie dla poszczególnych działów
const CATEGORY_THEMES: Record<string, { dot: string, check: string }> = {
  "Web Development": { dot: "bg-blue-600", check: "fill-blue-600" },
  "Automatyzacja & AI": { dot: "bg-purple-600", check: "fill-purple-600" },
  "Marketing & Wideo": { dot: "bg-black", check: "fill-black" } 
};

export function PricingTable() {
  return (
    // ZMIANA: Tło zmienione na delikatny cynk, żeby tabela wyglądała spójniej z górą
    <section className="py-[40px] lg:py-[80px] bg-zinc-50">
      <div className="w-full max-w-[1640px] mx-auto px-6 md:px-12">

        <div className="flex flex-col gap-[100px]">
          {CATEGORY_ORDER.map((categoryName) => {
            const categoryServices = MAIN_SERVICES.filter(s => s.category === categoryName);
            if (categoryServices.length === 0) return null;

            const theme = CATEGORY_THEMES[categoryName] || { dot: "bg-black", check: "fill-black" };

            return (
              <div 
                key={categoryName} 
                id={`category-${categoryName.replace(/\s+/g, '-').toLowerCase()}`}
                className="w-full flex flex-col scroll-mt-[200px]" 
              >
                
                {/* --- NAGŁÓWEK KATEGORII --- */}
                <div className="flex items-center gap-[16px] pb-[24px] border-b-[1px] border-zinc-300 mb-10">
                  <div className={`w-[12px] h-[12px] rounded-full ${theme.dot}`} />
                  <h2 className="text-[32px] md:text-[40px] font-bold text-black tracking-tight">
                    {categoryName}
                  </h2>
                </div>

                {/* --- STRUKTURA TABELI --- */}
                <div className="w-full flex flex-col">
                  
                  <div className="flex flex-col ">
                    {categoryServices.map((service) => (
                      <Link
                        key={service.id}
                        href={`/pricing/${service.id}`}
                        // Hover teraz zmienia na czystą biel (bo tło sekcji to zinc-50)
                        className="mb-10 group flex flex-col lg:flex-row lg:items-start py-[48px] border-b border-black/10 bg-white/80 hover:bg-white transition-colors duration-300 px-[16px] lg:px-[24px] -mx-[16px] lg:-mx-[24px] rounded-[16px]"
                      >
                        
                        {/* Kolumna 1: Nazwa i Opis */}
                        <div className="w-full lg:w-[35%] flex flex-col mb-[32px] lg:mb-0 pr-[40px]">
                          <span className="text-[28px] font-bold text-black leading-tight mb-[16px]">
                            {service.title}
                          </span>
                          <p className="text-[18px] text-black/70 font-normal leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {/* Kolumna 2: Lista Korzyści z Dynamicznym Nagłówkiem */}
                        <div className="w-full lg:w-[45%] mb-[32px] lg:mb-0 pr-[40px] flex flex-col">
                          {service.features && service.features.length > 0 && (
                            <div className="flex flex-col mt-[6px]">
                              {/* ZMIANA: Używamy dynamicznego featuresTitle, jeśli nie ma - dajemy domyślny lub ukrywamy */}
                              {service.featuresTitle && (
                                <span className="text-[12px] font-bold text-black/50 uppercase tracking-widest mb-[24px]">
                                  {service.featuresTitle}
                                </span>
                              )}
                              
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-[16px] gap-x-[24px]">
                                {service.features.map((feature, idx) => (
                                  <li key={idx} className="flex items-start gap-[12px]">
                                    <CheckCircle2 className={`w-[20px] h-[20px] text-white shrink-0 mt-[2px] ${theme.check}`} />
                                    <span className="text-[16px] font-medium text-black leading-snug">
                                      {feature.title}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Kolumna 3: Cena */}
                        <div className="w-full lg:w-[20%] flex items-start justify-between lg:justify-end gap-[24px] mt-[6px]">
                          <span className="text-[16px] font-bold text-black/40 lg:hidden">Cena startowa:</span>
                          
                          <div className="flex items-center gap-[24px]">
                            {/* ZMIANA: Znacznie powiększona cena, by dociążyć prawą stronę */}
                            <span className="text-[28px] font-bold text-black whitespace-nowrap">
                              {service.price}
                            </span>
                            <ArrowRight className="w-[28px] h-[28px] text-black transform transition-transform duration-300 group-hover:translate-x-3 shrink-0" strokeWidth={2} />
                          </div>
                        </div>

                      </Link>
                    ))}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}