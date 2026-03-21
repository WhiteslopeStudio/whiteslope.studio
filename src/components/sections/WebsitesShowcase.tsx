'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Upewnij się, że masz: npm install @phosphor-icons/react
import { Monitor, Lightning, PenNib, ChartLineUp, ArrowRight } from "@phosphor-icons/react";
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { ThreeDProjectWall } from '@/components/ui/3d-marquee';
import { PROJECT_EXAMPLES } from '@/lib/data';

const BLUE = '#0088ff';
const GRAY_LIGHT = '#a1a1a1';
const GRAY_BORDER = '#262626';

const SERVICES = [
  { 
    id: 'web', 
    title: 'Strony internetowe', 
    icon: Monitor, 
    description: 'Nowoczesne wizytówki i strony firmowe high-end.', 
    longDescription: 'Tworzymy strony, które nie tylko wyglądają obłędnie, ale przede wszystkim konwertują. Wykorzystujemy Next.js dla maksymalnej szybkości i unikalnego UX.' 
  },
  { 
    id: 'saas', 
    title: 'Systemy SaaS', 
    icon: Lightning, 
    description: 'Skalowalne platformy i aplikacje subskrypcyjne.', 
    longDescription: 'Budujemy fundamenty pod Twój cyfrowy biznes. Od architektury bazy danych po zaawansowane panele administracyjne gotowe na duży ruch.' 
  },
  { 
    id: 'fixes', 
    title: 'Poprawki stron', 
    icon: PenNib, 
    description: 'Optymalizacja i naprawa istniejących rozwiązań.', 
    longDescription: 'Twój obecny serwis działa wolno? Wykonujemy głęboki audyt techniczny i poprawiamy Core Web Vitals, przywracając mu pełną sprawność.' 
  },
  { 
    id: 'seo', 
    title: 'Pozycjonowanie SEO', 
    icon: ChartLineUp, 
    description: 'Widoczność, która przekłada się na realny zysk.', 
    longDescription: 'SEO to nie magia, to dane. Optymalizujemy strukturę i treści tak, aby algorytmy Google pokochały Twoją stronę i windowały ją w wynikach.' 
  },
];

export default function WebsitesShowcase() {
  // Ustawiamy domyślnie pierwszą usługę, żeby opis nigdy nie był pusty
  const [hoveredService, setHoveredService] = useState<typeof SERVICES[0]>(SERVICES[0]);

  return (
    <section className="relative w-full bg-black py-24 overflow-hidden border-t" style={{ borderColor: GRAY_BORDER }}>
      <div className="flex flex-col lg:flex-row items-stretch w-full">
        
        {/* --- LEWO: Scena Projektów (50%) --- */}
        <div className="w-full lg:w-1/2 relative h-[500px] lg:h-auto overflow-hidden">
          <div className="absolute inset-0 lg:-left-20">
            <ThreeDProjectWall projects={PROJECT_EXAMPLES} />
          </div>
        </div>

        {/* --- PRAWO: Treść (50%) --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left px-6 md:px-12 lg:px-16">
          
          {/* LOGO DO LEWEJ */}
          <div className="w-full flex justify-start mb-16">
             <img 
              src="/_resources/logos/whiteslopeStudioLogoNiebieski_dzialWEBDEV.webp"
              className="h-14 md:h-16 object-contain"
              alt="Logo WebDev"
            />
          </div>

          <h2 
            className="text-[#ffffff] text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-8 uppercase"
            style={{
              fontFamily: 'var(--font-unbounded), sans-serif',
       
            }}
          >
            Projektujemy strony biznesowe <br/> i produkty SaaS
          </h2>

          <h3 className="text-[#ffffff] text-lg md:text-xl font-bold leading-snug mb-10 max-w-xl" style={{ opacity: 0.9 }}>
            Zobacz czemu warto tworzyć strony z <span style={{ color: BLUE }}>Whiteslope Studio Professional Web Development Team</span>
          </h3>

          {/* USŁUGI - TAGI Z ANIMACJĄ IKONA -> STRZAŁKA */}
          <div className="flex flex-wrap gap-2 mb-10">
            {SERVICES.map((service) => {
              const isActive = hoveredService.id === service.id;
              const Icon = service.icon;
              
              return (
                <div
                  key={service.id}
                  onMouseEnter={() => setHoveredService(service)}
                  // Usunięto onMouseLeave, aby opis zostawał
                  className="group relative inline-flex items-center justify-center px-6 py-3 border cursor-pointer select-none overflow-hidden transition-none"
                  style={{ 
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#000000' : GRAY_LIGHT,
                    borderColor: isActive ? '#ffffff' : GRAY_BORDER,
                  }}
                >
                  <div className="relative flex items-center gap-2">
                    {/* Ikona: znika przy hoverze (skaluje się do 0) */}
                    <div className="transition-all duration-200 ease-in-out group-hover:scale-0 group-hover:opacity-0 group-hover:w-0">
                      <Icon size={18} weight="bold" />
                    </div>

                    <span className="text-sm font-bold uppercase tracking-tight">{service.title}</span>

                    {/* Strzałka: pojawia się przy hoverze (wjeżdża z prawej) */}
                    <div className="absolute -right-6 opacity-0 translate-x-4 transition-all duration-200 ease-in-out group-hover:relative group-hover:right-0 group-hover:opacity-100 group-hover:translate-x-0">
                      <ArrowRight size={18} weight="bold" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DYNAMICZNY OPIS - Zostaje ostatnio wybrany */}
          <div className="min-h-[140px] w-full mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12" style={{ backgroundColor: BLUE }} />
                <p className="text-base font-bold uppercase tracking-tighter" style={{ color: BLUE }}>
                  {hoveredService.description}
                </p>
              </div>
              <p className="text-base md:text-lg leading-relaxed max-w-md" style={{ color: GRAY_LIGHT }}>
                {hoveredService.longDescription}
              </p>
            </div>
          </div>

          {/* PRZYCISKI CTA */}
          <div className="flex flex-wrap gap-6 mt-auto w-full pt-8 border-t" style={{ borderColor: GRAY_BORDER }}>
            <PrimaryButton href="/pricing/website">
              Wybierz
            </PrimaryButton>
            
            <SecondaryButton href="/projects">
              Zobacz Projekty
            </SecondaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}