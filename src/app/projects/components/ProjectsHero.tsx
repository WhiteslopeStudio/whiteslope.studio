'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useInteractiveButton } from '@/utils/hooks';

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

export default function ProjectsHero() {
  const mainButton = useInteractiveButton();
  const [isMainHovered, setIsMainHovered] = useState(false);

  return (
    // Lekko zmniejszone minimalne wysokości, aby karuzele projektów szybciej pojawiły się w zasięgu wzroku
    <section className="relative mx-auto mb-4 md:mb-6 bg-[#141414] rounded-xl md:rounded-[16px] h-[25svh] min-h-[500px]  md:min-h-[600px] overflow-hidden overflow-x-hidden">
      
      {/* --- WIDEO W TLE --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 min-w-[1640px] object-cover scale-[2.4] m-auto opacity-30"
          src="/animationHero/HeroShowReel.mp4"

        />
      </div>

      {/* --- GRADIENTY CIENIUJĄCE --- */}
      <div
        className="absolute inset-0 md:hidden z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.9) 100%)',
        }}
      />
      
      <div
        className="absolute inset-0 hidden md:block z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(370deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.2) 48%, rgba(0,0,0,0.14) 66%, rgba(0,0,0,0.02) 84%)',
        }}
      />
      <div
        className="absolute inset-0 hidden md:block z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.24) 55%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* --- ZAWARTOŚĆ --- */}
      <div className="relative z-10 h-full w-full max-w-[1640px] mx-auto px-6 md:px-12 pb-6 md:pb-12 flex flex-col justify-end items-start text-left">

        <div className="flex flex-col gap-4 md:gap-6 w-full max-w-[800px]">

          {/* Nagłówek H1 */}
          <AnimatedBlock delay={120}>
            <h1 className="text-[45px] font-[700] leading-[0.85] text-left text-white tracking-tight md:text-[60px]">
              Nasze realizacje
            </h1>
          </AnimatedBlock>

          {/* Paragraf */}
          <AnimatedBlock delay={240}>
            <p className="text-[16px] text-blue-50/90 max-w-[570px] -my-1 leading-relaxed">
              Odkryj wybrane projekty, nad którymi pracowaliśmy. Tworzymy strony nastawione na konwersję, wdrażamy automatyzacje oszczędzające czas i prowadzimy skuteczny e-marketing.
            </p>
          </AnimatedBlock>

          {/* Przyciski CTA */}
          <AnimatedBlock delay={520}>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-center w-full">
              
              {/* Główny przycisk: Scrolluje do projektów */}
              <Link
                href="/contact" // Możemy dodać ID #projekty nad karuzelami w page.tsx
                onMouseMove={mainButton.handleMouseMove}
                onMouseEnter={() => {
                  setIsMainHovered(true);
                  if (mainButton.handleMouseEnter) mainButton.handleMouseEnter();
                }}  
                onMouseLeave={() => {
                  setIsMainHovered(false);
                  if (mainButton.handleMouseLeave) mainButton.handleMouseLeave();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-[46px] px-6 text-[14px] md:text-[15px] font-semibold text-white relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(0,87,255,0.25)] hover:shadow-[0_8px_30px_rgba(0,87,255,0.4)]"
                style={{
                  background: `radial-gradient(circle at ${isMainHovered ? mainButton.mousePosition.x : 50}% ${isMainHovered ? mainButton.mousePosition.y : 100}%, #1a75ff, #0057ff 40%, #004ae6 80%, #003bba)`,
                }}
              >
                Zacznij współracę 
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-  1" />
              </Link>

              

            </div>
          </AnimatedBlock>

        </div>
      </div>
    </section>
  );
}