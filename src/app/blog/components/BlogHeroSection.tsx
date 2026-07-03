'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight, ArrowDown, Play, BookOpen } from 'lucide-react';
import { useInteractiveButton } from '@/utils/hooks';

// Przykładowe wyróżnione wpisy do karuzeli w tle (podmień na swoje dane z '@/lib/data' jeśli potrzebujesz)
const FEATURED_POSTS = [
  {
    id: 'post-1',
    title: 'Sekrety Stron Biznesowych – Pozyskuj klientów w 2 minuty!',
    image: '/_resources/stronyInternetowe/DamianBogdanowicz.webp', // Zmień na ścieżkę do okładki wpisu
    href: '#artykuly',
  },
];

const SLIDE_INTERVAL_MS = 5500;

function AnimatedBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

export default function BlogHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainButton = useInteractiveButton();
  const [isMainHovered, setIsMainHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_POSTS.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + FEATURED_POSTS.length) % FEATURED_POSTS.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % FEATURED_POSTS.length);
  };

  const currentPost = FEATURED_POSTS[activeIndex];

  return (
    <section className="relative mx-auto mb-4 md:mb-6 bg-[#141414] rounded-xl md:rounded-[16px] h-[85svh] max-h-[800px] md:h-[65svh] md:max-h-[500px] overflow-hidden overflow-x-hidden">
      
      {/* Tło dla Mobile */}
      <div
        className="absolute inset-0 md:hidden bg-center bg-cover"
        style={{
          backgroundImage: `url(/_resources/stronyInternetowe/DamianBogdanowicz.webp)`,
          filter: 'brightness(0.42) saturate(0.92)',
        }}
      />
      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* Karuzela w tle dla Desktopu */}
      <div className="absolute inset-0 hidden md:block">
        {FEATURED_POSTS.map((post, index) => (
          <div
            
            className="absolute inset-0 bg-center bg-cover "
            style={{
              backgroundImage: `/_resources/stronyInternetowe/DamianBogdanowicz.webp`,
              
            }}
          />
        ))}
      </div>

      {/* Gradienty nakładane na wideo/zdjęcia */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(370deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.2) 48%, rgba(0,0,0,0.14) 66%, rgba(0,0,0,0.02) 84%)',
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.24) 55%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* Główny kontent tekstowy */}
      <div className="relative z-10 h-full w-full max-w-[1640px] mx-auto px-6 md:px-12 pb-12 md:pb-24 flex flex-col justify-end items-start text-left">
        <div className="flex flex-col gap-4 md:gap-6 w-full max-w-[800px]">

        

          {/* Nagłówek H1 */}
          <AnimatedBlock delay={120}>
            <h1 className="text-[34px] sm:text-[40px] md:text-[48px] font-bold leading-[0.95] text-left">
              <span className="md:hidden">
                <span className="text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 via-gray-100 to-white">
                  Aktualności, technologia
                  <br />
                  i biznes cyfrowy
                </span>
              </span>
              <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-tr from-white to-white">
                Aktualności, technologia
              </span>
              <br className="hidden md:block" />
              <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
                i biznes cyfrowy
              </span>
            </h1>
          </AnimatedBlock>

          {/* Paragraf */}
          <AnimatedBlock delay={240}>
            <p className="text-[16px] text-blue-50/90 max-w-[570px] -my-1 leading-[1.3]">
              Praktyczne porady z zakresu tworzenia stron, automatyzacji procesów AI oraz e-marketingu. Wybierz format, w którym wolisz przyswajać wiedzę.
            </p>
          </AnimatedBlock>

          {/* Przyciski CTA */}
          <AnimatedBlock delay={520}>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-start items-center w-full">
              
              {/* Główny przycisk (Czytaj artykuły) */}
              <Link
                href="#artykuly"
                onMouseMove={mainButton.handleMouseMove}
                onMouseEnter={() => {
                  setIsMainHovered(true);
                  if (mainButton.handleMouseEnter) mainButton.handleMouseEnter();
                }}  
                onMouseLeave={() => {
                  setIsMainHovered(false);
                  if (mainButton.handleMouseLeave) mainButton.handleMouseLeave();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-[46px] px-6 text-[14px] md:text-[15px] font-semibold text-black relative overflow-hidden transition-all duration-300 active:scale-95 ]"
                style={{
                  background: `radial-gradient(circle at ${isMainHovered ? mainButton.mousePosition.x : 50}% ${isMainHovered ? mainButton.mousePosition.y : 100}%,  #ffffff, #f1f5ff 40%, #f1f5ff 80%, #e8efff)`,
                }}
              >
                Czytaj artykuły
                <ArrowDown className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-y-1" />
              </Link>

              {/* Główny przycisk (Czytaj artykuły) */}
              <Link
                href="#filmy"
                onMouseMove={mainButton.handleMouseMove}
                onMouseEnter={() => {
                  setIsMainHovered(true);
                  if (mainButton.handleMouseEnter) mainButton.handleMouseEnter();
                }}  
                onMouseLeave={() => {
                  setIsMainHovered(false);
                  if (mainButton.handleMouseLeave) mainButton.handleMouseLeave();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-[46px] px-6 text-[14px] md:text-[15px] font-semibold text-black relative overflow-hidden transition-all duration-300 active:scale-95 ]"
                style={{
                  background: `radial-gradient(circle at ${isMainHovered ? mainButton.mousePosition.x : 50}% ${isMainHovered ? mainButton.mousePosition.y : 100}%, #ffffff, #f1f5ff 40%, #f1f5ff 80%, #e8efff)`,
                }}
              >
                Oglądaj filmy
                
                <Play className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-y-1" />
              </Link>

            </div>
          </AnimatedBlock>
        </div>
      </div>

      
    </section>
  );
}