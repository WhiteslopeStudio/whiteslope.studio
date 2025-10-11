'use client';

import { useState } from 'react';
import { ArrowRight, Check, Linkedin } from 'lucide-react';
import IntroAnimation from '@/components/layout/IntroAnimation';
import {
  LayoutGrid,
  Globe,
  FileText,
  Smartphone,
  Search,
  Palette,
  Code,
} from 'lucide-react';
import { MAIN_SERVICES } from '@/lib/data'; // Import danych z data.tsx

// Przykładowe dane LinkedIn (uzupełnij swoimi danymi)
const linkedinProfiles = [
  {
    name: 'Patryk Kulesza',
    link: 'https://www.linkedin.com/in/patryk-kulesza-788397354/',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQFGj_BwEwt8Gw/profile-displayphoto-shrink_400_400/B56ZVb.DxCHsAo-/0/1741004750177?e=1761782400&v=beta&t=HBTukk_-CDxT7X4cFkkaUn3lu8It22_elnKbJbQg-6M',
  },
  {
    name: 'Mateusz Malewski',
    link: 'https://www.linkedin.com/in/mateusz-malewski-b0834927b/',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQECr9J2GyByRQ/profile-displayphoto-crop_800_800/B4DZjGWKgfGgAI-/0/1755674357328?e=1761782400&v=beta&t=8zyyZ0vK3nbiL9QUX6w_8oxtplHzUmnyeNzDU9hPp6c',
  },
  {
    name: 'Bartłomiej Koźluk',
    link: 'https://www.linkedin.com/in/bart%C5%82omiej-ko%C5%BAluk-5a5391266/',
    image: 'https://static.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry',
  },
  {
    name: 'Daniel Wawrzos',
    link: 'https://www.linkedin.com/in/daniel-wawrzos-34b973338/',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQEA-6CMKztljw/profile-displayphoto-crop_800_800/B4EZh7R6dxHEAI-/0/1754414951840?e=1761782400&v=beta&t=8yIJOnaUx-kgX91m7ToW8HrTI9VFCTxDEKBMdui-hH0',
  },
];

export const HeroSection = () => {
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

  // Funkcja dla pozycji avatarów - NOWA LOGIKA
  const getAvatarPosition = (index: number, total: number) => {
    if (hoveredAvatar === null) {
      // W spoczynku - najeżdżają na siebie, wyśrodkowane
      return {
        x: (index - (total - 1) / 2) * 30, // mniejsze odstępy = najeżdżanie
        scale: 1,
        zIndex: index,
      };
    }
    
    if (hoveredAvatar === index) {
      // Hoverowany - na środku, powiększony
      return {
        x: 0,
        scale: 1.2,
        zIndex: 10,
      };
    }
    
    // Boczne - rozjeżdżają się
    if (index < hoveredAvatar) {
      return {
        x: -60 * (hoveredAvatar - index), // lewo
        scale: 0.9,
        zIndex: index,
      };
    } else {
      return {
        x: 60 * (index - hoveredAvatar), // prawo
        scale: 0.9,
        zIndex: index,
      };
    }
  };

  return (
    <>
      {/* Overlay z animacją */}
      <IntroAnimation onComplete={() => setAnimationCompleted(true)} />

      {/* Główna sekcja hero */}
      <section
        className="w-full relative overflow-hidden bg-black"
        style={{
          fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
        }}
      >
        {/* Gradienty tła */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'linear-gradient(to top, rgba(201, 107, 92, 0.47) 0%, rgba(244, 114, 181, 0.1) 50%, transparent 100%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-15"
            style={{
              background:
                'linear-gradient(to top, rgba(74, 0, 142, 0.2) 0%, rgba(59, 130, 246, 0.15) 30%, transparent 70%)',
            }}
          />
        </div>

        {/* Treść hero */}
        <div className="flex flex-col relative">
          <div className="flex-1 flex items-center justify-center relative pt-20 pb-12">
            <div
              className={`w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center transition-all duration-2500 ease-out ${
                animationCompleted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'
              }`}
            >
              <div className="space-y-4 sm:space-y-6">
                <div
                  className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-400 tracking-wider uppercase leading-relaxed font-medium mt-4 sm:mt-6 md:mt-8 mb-10"
                  style={{ animation: 'fadeInUp 1.2s ease-out 0.3s both', letterSpacing: '0.15em' }}
                >
                  STUDIO WEB DEVELOPERSKIE W BIAŁYMSTOKU • TWORZYMY STRONY INTERNETOWE, APLIKACJE WEBOWE, SEO, CMS
                </div>

                <h1
                  className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl md:font-thin text-white leading-tight"
                  style={{
                    animation: 'fadeInUp 1.2s ease-out 0.6s both',
                    letterSpacing: '-0.02em',
                    textShadow: '0 0 30px rgba(255,255,255,0.1)',
                  }}
                >
                  Dobra strona to pierwszy krok do{' '}
                  <span className="font-normal bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                    sukcesu twojej firmy!
                  </span>
                </h1>

                <div
                  className="max-w-2xl mx-auto text-gray-300 text-sm sm:text-base md:text-[16px] lg:text-[17px] leading-relaxed md:font-thin"
                  style={{ animation: 'fadeInUp 1.2s ease-out 0.9s both' }}
                >
                  Twoja strona to więcej niż wizytówka - to narzędzie sprzedaży działające bez przerwy. Sprawdź, jak możemy uczynić ją Twoim najlepszym sprzedawcą.
                </div>

                <div
                  className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center my-10 mb-12"
                  style={{ animation: 'fadeInUp 1.2s ease-out 1.2s both' }}
                >
                  <a href="#services" className="group relative cursor-pointer transition-all duration-150 inline-block hover:scale-105 z-30">
                    <button className="cursor-pointer flex items-center gap-1 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#fd9f91] text-black font-medium text-xs sm:text-sm transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#fd9f91]/30">
                      <span className="select-none">Wybierz usługę</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-150 group-hover:translate-x-2" />
                    </button>
                  </a>

                  <a href="/contact" className="group relative cursor-pointer transition-all duration-150 inline-block hover:scale-105 z-30">
                    <button className="cursor-pointer flex items-center gap-1 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white bg-transparent text-white font-medium text-xs sm:text-sm transition-all duration-150 hover:bg-white hover:text-black active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30">
                      <span className="select-none">Umów konsultację</span>
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-150 group-hover:translate-x-2" />
                    </button>
                  </a>
                </div>

                <div style={{ animation: 'fadeInUp 1.2s ease-out 1.5s both' }} className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center text-gray-300">
                    {[
                      'Bezpłatna konsultacja',
                      'Płatność dopiero po akceptacji projektu',
                      'Gwarancja satysfakcji',
                    ].map((text, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 sm:gap-3 group hover:text-white transition-colors duration-500"
                      >
                        <div className="relative">
                          <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                            <Check className="w-1.25 h-1.25 sm:w-1.5 sm:h-1.5 text-white" strokeWidth={4} />
                          </div>
                          <div className="absolute inset-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-50 blur-sm animate-ping" />
                        </div>
                        <span className="text-[9px] sm:text-[10px] md:text-xs font-medium">{text}</span>
                      </div>
                    ))}
                  </div>

                  <p
                    className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed"
                    style={{ animation: 'fadeInUp 1.2s ease-out 1.8s both' }}
                  >
                    Oferujemy pełne wsparcie na każdym etapie realizacji - od pomysłu po wdrożenie i dalszy rozwój Twojej strony. Witaj w Whiteslope Studio!
                  </p>

                  {/* LINKEDIN AVATARY - NOWA ANIMACJA */}
                  <div 
                    className="space-y-2"
                    style={{ animation: 'fadeInUp 1.2s ease-out 2.1s both' }}
                  >
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-300">Poznaj nas lepiej na LinkedIn</h3>
                    
                    <div className="flex justify-center items-center relative" style={{ height: '80px' }}>
                      {linkedinProfiles.map((person, index) => {
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
                                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover transition-all duration-300 border-2 border-gray-600 group-hover:border-[#fd9f91] group-hover:shadow-lg"
                              />
                              
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap flex items-center gap-2 pointer-events-none">
                                <Linkedin className="w-3 h-3 text-[#0077b5]" />
                                <span>{person.name}</span>
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                              </div>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* USŁUGI ZAMIAST TESTIMONIAL BAR */}
          <div
            className="w-full py-8 sm:py-10 md:py-12 z-20 relative transition-all duration-1000 ease-out delay-1000 bg-gradient-to-r from-[#111111] via-[#0a0a0a] to-[#111111] border-t border-gray-800/50 backdrop-blur-sm"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* DESKTOP - wszystkie widoczne */}
              <div className="hidden md:flex justify-center items-center gap-4">
                {MAIN_SERVICES.map((service) => {
                  const IconComponent = {
                    'website': LayoutGrid,
                    'webapp': Code,
                    'seo': Search,
                    'cms': FileText,
                    'mobileapp': Smartphone,
                    'uiux': Palette,
                  }[service.id] || LayoutGrid; // Domyślny ikon jeśli nie pasuje
                  return (
                    <div
                      key={service.id}
                      className="group cursor-pointer transition-all duration-300 hover:scale-110"
                      style={{
                        width: '120px',
                        height: '120px',
                        background: '#141414',
                        border: '1px solid #262626',
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '12px',
                      }}
                    >
                      <div 
                        style={{
                          width: '40px',
                          height: '40px',
                          background: '#1a1a1a',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#737373',
                        }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span 
                        className="text-center leading-tight text-xs"
                        style={{ 
                          fontFamily: 'inherit',
                          color: '#737373',
                        }}
                      >
                        {service.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* MOBILE - karuzela */}
              <div className="md:hidden">
                <div 
                  className="flex gap-3 overflow-x-auto pb-2"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  {MAIN_SERVICES.map((service) => {
                    const IconComponent = {
                      'website': LayoutGrid,
                      'webapp': Code,
                      'seo': Search,
                      'cms': FileText,
                      'mobileapp': Smartphone,
                      'uiux': Palette,
                    }[service.id] || LayoutGrid; // Domyślny ikon jeśli nie pasuje
                    return (
                      <div
                        key={service.id}
                        className="flex-shrink-0"
                        style={{
                          width: '100px',
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
                            color: '#737373',
                          }}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span 
                          className="text-center leading-tight text-[10px]"
                          style={{ 
                            fontFamily: 'inherit',
                            color: '#737373',
                            padding: '0 4px',
                          }}
                        >
                          {service.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kreska i link */}
              <div className="mt-8">
                <div className="w-full h-px bg-white/20 mb-4" />
                <div className="flex justify-center">
                  <a 
                    href="/cennik"
                    className="group flex items-center gap-2 text-white hover:text-[#fd9f91] transition-colors duration-300 text-sm font-medium"
                  >
                    <span>Wszystkie usługi</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animacje */}
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes gradient-shift {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          .animate-in {
            animation: animate-in 0.5s ease-out forwards;
          }
          .fade-in {
            animation-name: animate-in;
          }
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    </>
  );
};

export default HeroSection;