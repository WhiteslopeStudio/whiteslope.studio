'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, Code, FileText, LayoutGrid, Linkedin, Palette, Search, Smartphone } from 'lucide-react';
import { linkedinProfiles } from './HeroSection';
import { MainService } from '@/lib/types';
import { MAIN_SERVICES } from '@/lib/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LinkedInProfile {
  name: string;
  link: string;
  image: string;
}

const HeroSectionMobile = () => {
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);
  const [activeProofIndex, setActiveProofIndex] = useState(0);
  const router = useRouter();
  
  const proofItems = [
    'Bezpłatna konsultacja',
    'Płatność dopiero po akceptacji projektu',
    'Gwarancja satysfakcji',
  ];

  // Funkcja dla pozycji avatarów
  const getAvatarPosition = (index: number, total: number) => {
    if (hoveredAvatar === null) {
      return {
        x: (index - (total - 1) / 2) * 30,
        scale: 1,
        zIndex: total - index,
      };
    }
    
    if (hoveredAvatar === index) {
      return {
        x: 0,
        scale: 1.2,
        zIndex: total,
      };
    }
    
    if (index < hoveredAvatar) {
      return {
        x: -60 * (hoveredAvatar - index),
        scale: 0.9,
        zIndex: total - index,
      };
    } else {
      return {
        x: 60 * (index - hoveredAvatar),
        scale: 0.9,
        zIndex: total - index,
      };
    }
  };

  // Karuzela proofów
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProofIndex((prev) => (prev + 1) % proofItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Funkcja do obsługi kliknięcia w usługę
  const handleServiceClick = (serviceId: string) => {
    router.push(`/pricing/${serviceId}`);
  };

  return (
    <section className="w-full relative overflow-hidden bg-black pt-16">
      {/* Avatary LinkedIn na górze z dużym paddingiem */}
      <div className="flex justify-center items-center relative mb-6 pt-10" style={{ width: '240px', height: '80px', margin: '0 auto' }}>
        {linkedinProfiles.map((person: LinkedInProfile, index: number) => {
          const position = getAvatarPosition(index, linkedinProfiles.length);
          return (
            <div
              key={index}
              className="absolute transition-all duration-500 ease-out"
              style={{
                transform: `translateX(${position.x}px) scale(${position.scale})`,
                zIndex: position.zIndex,
              }}
              onMouseEnter={() => setHoveredAvatar(index)}
              onMouseLeave={() => setHoveredAvatar(null)}
            >
              <a
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover transition-all duration-300 border-2 border-gray-600 group-hover:border-[#fd9f91] group-hover:shadow-lg"
                />
              </a>
            </div>
          );
        })}
      </div>

      {/* Główny nagłówek - większy na mobile */}
      <div className="text-center mb-6 px-4 mt-4">
        <h1
          className="text-3xl sm:text-3xl md:text-3xl font-semibold text-white leading-tight"
          style={{ letterSpacing: '-0.02em', textShadow: '0 0 20px rgba(255,255,255,0.1)' }}
        >
          Zyskaj więcej klientów dzięki profesjonalnej {"- "}
          <span className="font-semibold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
              stronie internetowej!
          </span>
        </h1>
      </div>

      {/* Tekst pod nagłówkiem */}
      <div className="text-center max-w-2xl mx-auto text-gray-300 text-base leading-relaxed mb-6 px-4">
        Twoja strona to więcej niż wizytówka - to narzędzie sprzedaży działające bez przerwy. Sprawdź, jak możemy uczynić ją Twoim najlepszym sprzedawcą.
      </div>

      {/* Ulepszony przycisk CTA z gradientem */}
      <div className="mb-6 px-4">
        <Link href="/contact" className="block w-27/32 mx-auto">
          <button className="w-full h-16 rounded-full bg-gradient-to-r from-[#fd9f91] via-[#ff6b6b] to-[#fd9f91] text-black font-medium text-lg transition-all duration-300 hover:shadow-2xl active:scale-95 relative p-0.5 group">
            <div className="relative bg-black rounded-full h-full w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#fd9f91] to-[#ff6b6b] rounded-full transform transition-transform duration-700 group-hover:scale-110"></div>
                <span className="relative z-10  text-black rounded-full h-full w-full flex items-center justify-center gap-2 transition-all duration-300 group-hover:bg-transparent group-hover:text-black">
                Bezpłatna konsultacja
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
            </div>
            </button>
        </Link>
      </div>

      {/* Karuzela proofów - spójna animacja: nowy wchodzi z prawej, stary wychodzi w lewo */}
      <div className="flex items-center justify-center relative h-10 mb-6">
        {proofItems.map((text, index) => {
          const isActive = activeProofIndex === index;
          const isPrevious = index === (activeProofIndex - 1 + proofItems.length) % proofItems.length;
          return (
            <div
              key={index}
              className={`flex items-center gap-2 absolute transition-all duration-500 ease-in-out ${
                isActive
                  ? 'opacity-100 translate-x-0'
                  : isPrevious
                  ? 'opacity-0 -translate-x-full' // Stary wychodzi w lewo
                  : 'opacity-0 translate-x-full' // Nowy wchodzi z prawej
              }`}
            >
              <div className="relative">
                <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                  <Check className="w-2 h-2 text-white" strokeWidth={4} />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-300">{text}</span>
            </div>
          );
        })}
      </div>

      {/* Sekcja usług na dole - BEZ czarnego odstępu na końcu */}
      <div
        className="w-full py-4 bg-[#0C0C0C] border-t border-gray-800/50 backdrop-blur-sm"
        
      >
        <div className="container mx-auto px-1">
          {/* MOBILE - karuzela usług */}
          <div 
            className="flex gap-3 overflow-x-auto pb-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {MAIN_SERVICES.map((service: MainService) => {
              const IconComponent = {
                'website': LayoutGrid,
                'optimization': Search,
                'ai-integration': Code,
                'graphics': Palette,
                'individual': FileText,
                'email-marketing': Smartphone,
              }[service.id] || LayoutGrid;
              return (
                <button
                  key={service.id}
                  onClick={() => handleServiceClick(service.id)}
                  className="flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-gray-500 active:scale-95"
                  style={{
                    width: '90px',
                    height: '100px',
                    background: '#141414',
                    border: '1px solid #262626',
                    borderRadius: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <div 
                    style={{
                      width: '32px',
                      height: '32px',
                      background: '#1a1a1a',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#e0e0e0ff',
                    }}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span 
                    className="text-center leading-tight text-[12px]"
                    style={{ 
                      fontFamily: 'inherit',
                      color: '#e0e0e0ff',
                      padding: '0 4px',
                    }}
                  >
                    {service.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Kreska i link - TERAZ SEKCJA KOŃCZY SIĘ RAZEM Z NAPISEM "WSZYSTKIE USŁUGI" */}
          <div className="mt-2">
            <div className="w-full h-px bg-white/20 mb-2" />
            <div className="flex justify-center">
              <Link 
                href="/pricing"
                className="group flex items-center gap-2 hover:text-[#fd9f91] transition-colors duration-300 text-sm font-medium text-gray-500"
              >
                <span>Wszystkie usługi</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionMobile;