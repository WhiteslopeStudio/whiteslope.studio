'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Check, Linkedin, ChevronUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useMobileDetection } from '@/utils/hooks';
import { ProjectExample } from '@/lib/types';
import { PROJECT_EXAMPLES } from '@/lib/data';

// Przykładowe dane LinkedIn
export const linkedinProfiles = [
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

export const HeroPortfolioSection = () => {
  const isMobile = useMobileDetection();
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getAvatarPosition = (index: number, total: number) => {
    if (hoveredAvatar === null) {
      return {
        x: (index - (total - 1) / 2) * 20,
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
        x: -40 * (hoveredAvatar - index),
        scale: 0.9,
        zIndex: total - index,
      };
    } else {
      return {
        x: 40 * (index - hoveredAvatar),
        scale: 0.9,
        zIndex: total - index,
      };
    }
  };

  const projects: ProjectExample[] = PROJECT_EXAMPLES;
  const currentProject = projects[activeIndex];
  const backgroundImage = currentProject?.image;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const getProjectStyle = (index: number) => {
    const relativeIndex = (index - activeIndex + projects.length) % projects.length;
    const scale = 0.8 - relativeIndex * 0.05; // Większa skala dla większych miniaturek
    const yOffset = relativeIndex * -30; // Nieco większe przesunięcie w Y
    const zIndex = projects.length - relativeIndex;
    const opacity = 1 - relativeIndex * 0.2;

    return {
      transform: `translateY(${yOffset}px) scale(${scale})`,
      zIndex,
      opacity: Math.max(opacity, 0),
      transition: 'all 0.5s ease-out',
      borderRadius: '8px',
    };
  };

  return (
    <section
      className="w-full relative overflow-hidden bg-black"
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
      }}
    >
      {/* Dynamiczne tło z blur i przyciemnieniem */}
      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(20px) brightness(0.3)',
        }}
      />
      {/* Czarna winieta */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />

      {/* Treść */}
      <div className="flex flex-col items-center justify-center relative pt-40 pb-12 z-10">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
          <div className="space-y-4 sm:space-y-6">
            {/* Avatary LinkedIn na górze */}
            <div className="space-y-2 mb-8">
              <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-300">Poznaj nas lepiej na LinkedIn</h3>
              <div className="flex justify-center items-center relative" style={{ width: '200px', height: '80px', margin: '0 auto' }}>
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
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover transition-all duration-300 border-2 border-gray-600 group-hover:border-[#fd9f91] group-hover:shadow-lg"
                        />
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

            {/* Nagłówek z mniejszym rozmiarem */}
            <h1 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-white leading-tight">
              Dobra strona to pierwszy krok do sukcesu twojej firmy!
            </h1>

            {/* Akapit */}
            <div className="max-w-2xl mx-auto text-gray-300 text-xs sm:text-sm md:text-base lg:text-[16px] leading-relaxed md:font-thin">
              Twoja strona to więcej niż wizytówka - to narzędzie sprzedaży działające bez przerwy. Sprawdź, jak możemy uczynić ją Twoim najlepszym sprzedawcą.
            </div>

            {/* Button konsultacji */}
            <div className="flex justify-center my-8 mb-10">
              <a href="/contact" className="group relative cursor-pointer transition-all duration-150 inline-block hover:scale-105 z-30">
                <button className="cursor-pointer flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-[#fd9f91] text-black font-medium text-base sm:text-lg transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#fd9f91]/30">
                  <span className="select-none">Bezpłatna konsultacja</span>
                  <ArrowRight className="w-5 h-5 transition-all duration-150 group-hover:translate-x-2" />
                </button>
              </a>
            </div>

            {/* 3 punkty pod CTA */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center text-gray-300 mb-12">
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

            {/* Karuzela 3D z projektami */}
            <div className="relative w-full max-w-4xl mx-auto h-[600px] perspective-1000">
              <div className="absolute inset-0 flex items-center justify-center">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="absolute w-[70%] md:w-[50%] aspect-[16/9] overflow-hidden cursor-pointer"
                    style={getProjectStyle(index)}
                    onClick={() => window.open(project.href, '_blank')}
                  >
                    <Image
                      src={project.image}
                      alt={`Realizacja strony internetowej ${project.title} przez WHITESLOPE STUDIO`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 85vw, (max-width: 768px) 60vw, (max-width: 1024px) 55vw, (max-width: 1280px) 50vw, 45vw"
                      loading="lazy"
                    />
                    {/* Div z napisami pod obrazkiem */}
                    <div className="flex w-full mt-2">
                      <div className="flex-1 flex flex-col gap-2 p-4 bg-black/70">
                        <h3 className="text-white font-semibold text-base">{project.title}</h3>
                        <p className="text-gray-200 text-sm">{project.category}</p>
                        <a
                          href={project.href}
                          className="text-white underline flex items-center gap-1 text-sm font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Zobacz stronę
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Strzałki na boku karuzeli */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4">
                <button
                  onClick={handlePrev}
                  className="bg-white/10 hover:bg-[#0077b5] rounded-full p-3 text-white transition-colors"
                >
                  <ChevronUp className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white/10 hover:bg-[#0077b5] rounded-full p-3 text-white transition-colors"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animacje */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default HeroPortfolioSection;