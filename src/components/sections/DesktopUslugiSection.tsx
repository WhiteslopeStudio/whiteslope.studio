'use client';

import Link from 'next/link';
import { 
  LayoutGrid, 
  Search, 
  Code, 
  Palette, 
  FileText, 
  Smartphone,
  Video,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';

// ✅ IMPORT DANYCH z data.tsx
import { MAIN_SERVICES } from '@/lib/data';

// ✅ IMPORT TYPU z types.ts
import type { MainService } from '@/lib/types';
import { BsSoundwave } from 'react-icons/bs';

// Typ dla kluczy ikon
type ServiceIconId = 'website' | 'optimization' | 'ai-integration' | 'graphics' | 'individual' | 'email-marketing' | 'video-marketing' | 'audio-editing';

export default function DesktopUslugiSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // BADGE MESSAGES dla każdej usługi
  const badgeMessages: Record<ServiceIconId, string> = {
    'website': '-7% z kodem WHITESLOPE7',
    'optimization': 'Szybsza strona = więcej klientów',
    'ai-integration': 'Asystent AI pracuje 24/7 za Ciebie',
    'graphics': 'Grafika 2D, 3D & Video w jednym',
    'individual': 'Dopasowane do Twoich potrzeb',
    'email-marketing': 'Automatyzacja która sprzedaje',
    'video-marketing': 'Profesjonalny sprzęt filmowy 20k+ zł',
    'audio-editing': 'Czysty dźwięk bez szumów i zakłóceń do Twoich filmów',
  };

  // Funkcja do skracania długich opisów
  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  // Mapowanie ikon - wspólne dla wszystkich kafelek
  const iconMap: Record<ServiceIconId, any> = {
    'website': LayoutGrid,
    'optimization': Search,
    'ai-integration': Code,
    'graphics': Palette,
    'individual': FileText,
    'email-marketing': Smartphone,
    'video-marketing': Video,
    'audio-editing': BsSoundwave,
  };

  return (
    <section 
      className="py-12 bg-black relative overflow-hidden"
    >
      <div className="relative z-10">
        {/* GRID 3 KOLUMNY z równą wysokością */}
        <div className="relative max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-3xl text-white text-center py-3 sm:py-5">
            Nasze usługi:
          </h2>
          <div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr"
          >
            {MAIN_SERVICES.map((service: MainService, index: number) => {
              const IconComponent = iconMap[service.id as ServiceIconId] || LayoutGrid;
              const isHovered = hoveredIndex === index;
              const badgeMessage = badgeMessages[service.id as ServiceIconId];
              const isNew = service.id === 'video-marketing' || service.id === 'audio-editing'; // Badge dla video-marketing i audio-editing
              const polecamy = service.id === 'ai-integration' || service.id === 'optimization'; // Badge dla polecanych usług
              const top = service.id === 'website'; // Badge dla top usługi

              return (
                <Link
                  key={service.id}
                  href={`/pricing/${service.id}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group cursor-pointer transition-all duration-500 relative h-full flex overflow-hidden rounded-2xl"
                  style={{
                    animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* BADGE NOWE - prostokąt, 45 stopni w lewym górnym */}
                  {isNew && (
                    <div 
                      className="absolute top-5 -left-8 w-30 h-6 bg-red-500 flex items-center justify-center transform -rotate-45 z-20"
                      style={{
                        boxShadow: '0 2px 8px rgba(239, 68, 68, 0.5)',
                        
                      }}
                    >
                      <span className="text-white font-bold text-[10px] uppercase tracking-wider select-none">Nowe!</span>
                    </div>
                  )}

                  {/* BADGE POLECAMY - prostokąt, 45 stopni w lewym górnym */}
                  {polecamy && (
                    <div 
                      className="absolute top-5 -left-8 w-30 h-6 bg-gray-500 flex items-center justify-center transform -rotate-45 z-20"
                      style={{
                        boxShadow: '0 2px 8px rgba(189, 196, 255, 0.19)',
                        
                      }}
                    >
                      <span className="text-white font-bold text-[10px] uppercase tracking-wider select-none">Polecamy!</span>
                    </div>
                  )}

                  {/* BADGE TOP - prostokąt, 45 stopni w lewym górnym */}
                  {top && (
                    <div 
                      className="absolute top-5 -left-8 w-30 h-6 bg-yellow-500 flex items-center justify-center transform -rotate-45 z-20"
                      style={{
                        boxShadow: '0 2px 8px rgba(235, 148, 48, 0.5)',
                        
                      }}
                    >
                      <span className="text-white font-bold text-[10px] uppercase tracking-wider select-none">Top!</span>
                    </div>
                  )}

                  {/* KARTA - pełna wysokość */}
                  <div 
                    className="flex flex-col gap-3 p-6 transition-all duration-500 overflow-hidden w-full h-full"
                    style={{
                      background: isHovered ? '#1e1e20ff' : '#161618ff', // Ciemniejszy bg w stanie spoczynku
                      border: `1px solid ${isHovered ? '#53535bff' : '#1a1a1aff'}`,
                      borderRadius: '16px',
                    }}
                  >
                    {/* Nagłówek z numerem, tytułem i ikoną w jednej linii */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-xl font-bold transition-colors duration-500 flex-shrink-0 ${
                        isHovered 
                          ? 'text-white' 
                          : 'text-white/90'
                      }`}>
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      
                      <h3 className={`text-lg md:text-xl font-bold transition-colors duration-500 flex-1 line-clamp-2 ${
                        isHovered 
                          ? 'text-white' 
                          : 'text-white/90'
                      }`}>
                        {service.title}
                      </h3>

                      {/* Kontener dla ikony/strzałki z animacją przesuwania */}
                      <div className="relative w-5 h-5 flex-shrink-0 overflow-visible">
                        {/* Ikonka usługi - odjeżdża w prawo na hover */}
                        <div 
                          className={`absolute inset-0 transition-all duration-500 ease-out ${
                            isHovered 
                              ? 'opacity-0 translate-x-4' 
                              : 'opacity-100 translate-x-0'
                          }`}
                        >
                          <IconComponent 
                            className={`w-5 h-5 transition-colors duration-500 ${
                              isHovered 
                                ? 'text-white' 
                                : 'text-white/70'
                            }`} 
                          />
                        </div>
                        
                        {/* Strzałka - wjeżdża z lewej na hover */}
                        <div 
                          className={`absolute inset-0 transition-all duration-500 ease-out ${
                            isHovered 
                              ? 'opacity-100 translate-x-0' 
                              : 'opacity-0 -translate-x-4'
                          }`}
                        >
                          <ArrowRight className="w-5 h-5 text-[#1985FF]" />
                        </div>
                      </div>
                    </div>

                    {/* Opis - wypełnia przestrzeń */}
                    <div className="flex-grow mb-4">
                      <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                        isHovered 
                          ? 'text-gray-300' 
                          : 'text-white/70'
                      }`}>
                        {truncateText(service.description || 'Profesjonalne rozwiązanie dostosowane do Twoich potrzeb.')}
                      </p>
                    </div>

                    {/* BADGE - pasek na dole */}
                    {badgeMessage && (
                      <div className="mt-auto">
                        <div
                          className="w-full py-2.5 text-center text-xs font-semibold transition-all duration-500"
                          style={{
                            backgroundColor: '#1985FF',
                            color: '#ffffff',
                            borderRadius: '8px',
                            letterSpacing: '0.03em',
                          }}
                        >
                          {badgeMessage}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ANIMACJA SLIDE IN - CSS */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}