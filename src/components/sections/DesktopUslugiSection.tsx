'use client';

import Link from 'next/link';
import { 
  LayoutGrid, 
  Search, 
  Code, 
  Palette, 
  FileText, 
  Smartphone,
} from 'lucide-react';
import { useState } from 'react';

// ✅ IMPORT DANYCH z data.tsx
import { MAIN_SERVICES } from '@/lib/data';

// ✅ IMPORT TYPU z types.ts
import type { MainService } from '@/lib/types';

// Typ dla kluczy ikon
type ServiceIconId = 'website' | 'optimization' | 'ai-integration' | 'graphics' | 'individual' | 'email-marketing';

export default function DesktopUslugiSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Kolory hover dla każdej usługi
  const colorMap: Record<ServiceIconId, string> = {
    'website': '#7dd3fc', // lekko niebieski (sky-300)
    'optimization': '#c4b5fd', // lekki fiolet (violet-300)
    'ai-integration': '#86efac', // zielony bardzo lekki (green-300)
    'graphics': '#fde047', // żółty lekki (yellow-300)
    'individual': '#6ee7b7', // inny zielony (emerald-300)
    'email-marketing': '#fca5a5', // lekki czerwony (red-300)
  };

  // Funkcja do skracania długich opisów
  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  return (
    <section 
      className="py-12 bg-black relative overflow-hidden pb-50"
      // style={{
      //   background: `
      //     radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
      //     linear-gradient(
      //       to bottom,
      //       black 0px,
      //       black 10px,
      //       #3b3b3bff 10px,
      //       #3b3b3bff 11px,
      //       #0b0b0bff 11px,
      //       #0b0b0bff calc(100% - 11px),
      //       #3b3b3bff calc(100% - 11px),
      //       #3b3b3bff calc(100% - 10px),
      //       black calc(100% - 10px),
      //       black 100%
      //     )
      //   `
      // }}
    >
      <div className="relative z-10">
        {/* GRID 3 KOLUMNY */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {MAIN_SERVICES.map((service: MainService, index: number) => {
              // Mapowanie ikon
              const iconMap: Record<ServiceIconId, any> = {
                'website': LayoutGrid,
                'optimization': Search,
                'ai-integration': Code,
                'graphics': Palette,
                'individual': FileText,
                'email-marketing': Smartphone,
              };
              
              const IconComponent = iconMap[service.id as ServiceIconId] || LayoutGrid;
              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={service.id}
                  href={`/pricing/${service.id}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group cursor-pointer transition-all duration-500 relative"
                >
                  {/* Czerwona kropka dla pierwszego */}
                  {index === 0 && (
                    <div
                      className="absolute -top-2 -left-2 w-2 h-2 bg-[#ff0000] rounded-full z-10"
                    />
                  )}

                  {/* KARTA - POZIOMY LAYOUT */}
                  <div className="flex flex-col gap-3">
                    {/* Numer + Tytuł + Ikona */}
                    <div className="flex items-center gap-3">
                      <span className={`text-xl font-bold transition-colors duration-500 ${
                        isHovered 
                          ? 'text-white' 
                          : 'text-white/65'
                      }`}>
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      
                      <h3 className={`text-lg md:text-xl font-bold transition-colors duration-500 flex-1 ${
                        isHovered 
                          ? 'text-white' 
                          : 'text-white/65'
                      }`}>
                        {service.title}
                      </h3>

                      <div className={`transition-colors duration-500 ${
                        isHovered 
                          ? 'text-white' 
                          : 'text-white/50'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Opis - skrócony jeśli za długi */}
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                      isHovered 
                        ? 'text-gray-300' 
                        : 'text-white/35'
                    }`}>
                      {truncateText(service.description || 'Profesjonalne rozwiązanie dostosowane do Twoich potrzeb.')}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}