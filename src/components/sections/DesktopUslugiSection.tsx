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
import { useSingleScrollAnimation, useScrollAnimation } from '@/utils/hooks';

// ✅ IMPORT DANYCH z data.tsx
import { MAIN_SERVICES } from '@/lib/data';

// ✅ IMPORT TYPU z types.ts
import type { MainService } from '@/lib/types';
import { BsSoundwave } from 'react-icons/bs';

// Typ dla kluczy ikon
type ServiceIconId = 'website' | 'optimization' | 'ai-integration' | 'graphics' | 'individual' | 'email-marketing' | 'video-marketing' | 'audio-editing';

export default function DesktopUslugiSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // ========== ANIMACJE Z SCROLL TRIGGEREM ==========
  const headingAnimation = useSingleScrollAnimation(0, {
    duration: 800,
    translateY: 30,
    blurAmount: 10,
    threshold: 0.1,
    rootMargin: '-50px',
  });

  const cardsAnimation = useScrollAnimation(MAIN_SERVICES.length, {
    initialDelay: 200,
    staggerDelay: 100,
    duration: 800,
    translateY: 30,
    blurAmount: 10,
    threshold: 0.1,
    rootMargin: '-50px',
  });

  // BADGE MESSAGES dla każdej usługi
  const badgeMessages: Record<ServiceIconId, string> = {
    'website': '-7% z kodem WHITESLOPE7',
    'optimization': 'Szybsza strona = więcej klientów',
    'ai-integration': 'Asystent AI pracuje 24/7 za Ciebie',
    'graphics': 'Grafika 2D, 3D & Video w jednym',
    'individual': 'Dopasowane do Twoich potrzeb',
    'email-marketing': 'Automatyzacja która sprzedaje',
    'video-marketing': 'Profesjonalny sprzęt filmowy 20k+ zł',
    'audio-editing': 'Czysty dźwięk bez szumów i zakłóceń',
  };

  // Funkcja do skracania długich opisów
  const truncateText = (text: string, maxLength: number = 80) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
  };

  // Mapowanie ikon
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
      ref={cardsAnimation.ref as React.RefObject<HTMLElement>}
      className="py-12 bg-[#050505] relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className="relative max-w-7xl mx-auto px-4">
          {/* Nagłówek */}
          <h2 
            ref={headingAnimation.ref as React.RefObject<HTMLHeadingElement>}
            className="text-2xl text-white text-center py-3 sm:py-5"
            style={headingAnimation.style}
          >
            Nasze usługi:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
            {MAIN_SERVICES.map((service: MainService, index: number) => {
              const IconComponent = iconMap[service.id as ServiceIconId] || LayoutGrid;
              const isHovered = hoveredIndex === index;
              const badgeMessage = badgeMessages[service.id as ServiceIconId];
              
              // FLAGOWANIE USŁUG - teraz tylko tekstowe, w jednym kolorze
              const isNew = service.id === 'video-marketing' || service.id === 'audio-editing';
              const isPopular = service.id === 'ai-integration' || service.id === 'optimization';
              const isTop = service.id === 'website';

              return (
                <Link
                  key={service.id}
                  href={`/pricing/${service.id}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group cursor-pointer transition-all duration-500 relative h-full flex overflow-hidden rounded-2xl"
                  style={cardsAnimation.getItemStyle(index)}
                >
                  {/* KARTA - teraz jaśniejsza i bardziej czytelna */}
                  <div 
                    className="flex flex-col gap-4 p-6 transition-all duration-500 overflow-hidden w-full h-full"
                    style={{
                      background: isHovered 
                        ? 'rgba(25, 133, 255, 0.08)' // Lekki niebieski przy hover
                        : 'rgba(255, 255, 255, 0.03)', // Bardzo subtelne tło
                      border: `1px solid ${isHovered ? 'rgba(25, 133, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '16px',
                    }}
                  >
                    {/* GÓRNA CZĘŚĆ - numer, tytuł, ikona, badge tekstowy */}
                    <div className="flex items-start gap-3">
                      {/* NUMER */}
                      <span 
                        className="text-xl font-bold flex-shrink-0 transition-colors duration-500"
                        style={{
                          color: isHovered ? '#1985FF' : 'rgba(255, 255, 255, 0.4)',
                        }}
                      >
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      
                      {/* TYTUŁ + BADGE TEKSTOWY */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <h3 
                            className="text-lg md:text-xl font-bold transition-colors duration-500"
                            style={{
                              color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
                            }}
                          >
                            {service.title}
                          </h3>
                          
                          {/* TEKSTOWY BADGE - minimalistyczny */}
                          {(isNew || isPopular || isTop) && (
                            <span 
                              className="text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all duration-500"
                              style={{
                                backgroundColor: isHovered 
                                  ? 'rgba(255, 25, 63, 0.91)' 
                                  : 'rgba(255, 0, 0, 0.83)',
                                color: isHovered ? '#fff1f1ff' : 'rgba(255, 225, 225, 0.88)',
                                border: `1px solid ${isHovered ? 'rgba(176, 127, 255, 0.3)' : 'rgba(215, 136, 255, 0.1)'}`,
                              }}
                            >
                              {isNew && 'NOWOŚĆ'}
                              {isPopular && 'POLECAMY'}
                              {isTop && 'POPULARNE'}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* IKONA/STRZAŁKA */}
                      <div className="relative w-5 h-5 flex-shrink-0 overflow-visible">
                        <div 
                          className={`absolute inset-0 transition-all duration-500 ease-out ${
                            isHovered 
                              ? 'opacity-0 translate-x-4' 
                              : 'opacity-100 translate-x-0'
                          }`}
                        >
                          <IconComponent 
                            className="w-5 h-5 transition-colors duration-500"
                            style={{
                              color: isHovered ? '#1985FF' : 'rgba(255, 255, 255, 0.5)',
                            }}
                          />
                        </div>
                        
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

                    {/* OPIS - większy kontrast */}
                    <div className="flex-grow">
                      <p 
                        className="text-sm leading-relaxed transition-colors duration-500"
                        style={{
                          color: isHovered 
                            ? 'rgba(255, 255, 255, 0.85)' 
                            : 'rgba(255, 255, 255, 0.6)',
                        }}
                      >
                        {truncateText(service.description || 'Profesjonalne rozwiązanie dostosowane do Twoich potrzeb.')}
                      </p>
                    </div>

                    {/* BADGE NA DOLE - teraz bardziej widoczny */}
                    {badgeMessage && (
                      <div className="mt-auto pt-3 border-t transition-colors duration-500" 
                        style={{
                          borderColor: isHovered 
                            ? 'rgba(25, 133, 255, 0.2)' 
                            : 'rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <div
                          className="w-full py-2.5 text-center text-xs font-semibold transition-all duration-500 rounded-lg"
                          style={{
                            backgroundColor: isHovered ? '#1985FF' : 'rgba(25, 133, 255, 0.15)',
                            color: isHovered ? '#ffffff' : '#1985FF',
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
    </section>
  );
}