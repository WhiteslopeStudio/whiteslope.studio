'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import { PROJECT_EXAMPLES } from '@/lib/data';
import { useApprovalCarousel, useInteractiveButton } from '@/utils/hooks';

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

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainButton = useInteractiveButton();
  const secondaryButton = useInteractiveButton();
  const [isMainHovered, setIsMainHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROJECT_EXAMPLES.length);
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECT_EXAMPLES.length) % PROJECT_EXAMPLES.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECT_EXAMPLES.length);
  };

  const currentProject = PROJECT_EXAMPLES[activeIndex];
  const highlights = [
    {
      id: '01',
      text: 'Wsparcie techniczne po wdrożeniu',
    },
    {
      id: '02',
      text: 'Strona nastawiona na realną konwersję',
    },
    {
      id: '03',
      text: 'Szybkość i SEO od pierwszego dnia',
    },
    {
      id: '04',
      text: 'Projekt dopasowany do celów biznesowych',
    },
  ];
  const activeMobileProofIndex = useApprovalCarousel(highlights.length, 3000);

  return (
    <section className="relative mx-auto mb-4 md:mb-6 bg-[#141414] rounded-xl md:rounded-[16px] h-[85svh] min-h-[550px] md:h-[65svh] md:min-h-[400px] overflow-hidden overflow-x-hidden">      <div
        className="absolute inset-0 md:hidden bg-center bg-cover"
        style={{
          backgroundImage: 'url(/_resources/stronyInternetowe/DamianBogdanowicz.webp)',
          filter: 'brightness(0.42) saturate(0.92)',
        }}
      />

      {/* LOGO W PRAWYM GÓRNYM ROGU (Trzymające się kontenera 1640px) */}
      <div className="absolute top-0 left-0 right-0 w-full z-20 pointer-events-none">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12 pt-6 md:pt-10 flex justify-end ">
          <AnimatedBlock delay={100}>
            <img 
              src="/_resources/logos/whiteslopeStudioLogoNiebieski_dzialWEBDEV.webp" 
              alt="Whiteslope Studio Web Development" 
              className="h-[32px] md:h-[39px] w-auto opacity-90 "
            />
          </AnimatedBlock>
        </div>
      </div>

      <div
        className="absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      <div className="absolute inset-0 hidden md:block">
        {PROJECT_EXAMPLES.map((project, index) => (
          <div
            key={project.id}
            className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${project.image})`,
              opacity: index === activeIndex ? 1 : 0,
              filter: 'brightness(0.9) saturate(0.92)',
            }}
          />
        ))}
      </div>

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

      {/* <div className="absolute top-[16%] left-[24%] -translate-x-1/2 w-[62rem] h-[34rem] rounded-full bg-blue-500/9 blur-[175px] pointer-events-none hidden md:block" />
      <div className="absolute top-[31%] right-[-8%] w-[30rem] h-[30rem] rounded-full bg-yellow-300/10 blur-[170px] pointer-events-none hidden md:block" /> */}

      <div className="relative z-10 h-full w-full max-w-[1640px] mx-auto px-6 md:px-12 pb-12 md:pb-24 flex flex-col justify-end items-start text-left">
  
      <div className="flex flex-col gap-4 md:gap-6 w-full max-w-[800px]">

        {/* Nagłówek H1 */}
        <AnimatedBlock delay={120}>
          <h1 className="text-[34px] sm:text-[40px] md:text-[48px] font-bold leading-[0.95] text-left">
            <span className="md:hidden">
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 via-gray-100 to-white">
                Projektujemy strony internetowe,
              
                systemy B2B i produkty SaaS
              
              </span>
              
            </span>
            <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-tr from-white to-white">
              Projektujemy strony internetowe,
            </span>
            <br className="hidden md:block" />
            <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-r from-white to-white">
              systemy B2B i produkty SaaS
            </span>
          </h1>
        </AnimatedBlock>

        {/* Paragraf */}
        <AnimatedBlock delay={240}>
          <p className="text-[16px] text-blue-50/90 max-w-[570px] -my-1 leading-[1.2]">
            <span className="md:hidden">
Od konwertujących wizytówek po rozbudowane platformy edukacyjne i narzędzia do zarządzania zespołem. Dostarczamy intuicyjne aplikacje, które realnie rozwijają Twoją firmę.            </span>
            <span className="hidden md:inline">
Od konwertujących wizytówek po rozbudowane platformy edukacyjne i narzędzia do zarządzania zespołem. Dostarczamy intuicyjne aplikacje, które realnie rozwijają Twoją firmę.            </span>
          </p>
        </AnimatedBlock>

        {/* Przyciski CTA */}
        <AnimatedBlock delay={520}>
          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-start items-center w-full">
            
            {/* Główny przycisk (z jasną kropką na dole w stanie spoczynku) */}
            <Link
              href="#brief"
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
                // Tutaj dzieje się magia: jeśli nie ma hovera, ustawia X: 50%, Y: 100% (czyli bottom center)
                background: `radial-gradient(circle at ${isMainHovered ? mainButton.mousePosition.x : 50}% ${isMainHovered ? mainButton.mousePosition.y : 100}%, #1a75ff, #0057ff 40%, #004ae6 80%, #003bba)`,
              }}
            >
              Wyceń projekt
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Drugi przycisk (Minimalistyczny tekst bez tła) */}
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center h-[46px] px-4 text-[14px] md:text-[15px] font-medium text-white/70 hover:text-white transition-colors duration-300 group"
            >
              <span className="relative pb-0.5">
                Zobacz realizacje
                {/* Subtelne podkreślenie reagujące na hover */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 transition-all duration-300 group-hover:bg-white"></span>
              </span>
              <ArrowRight className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
            </Link>

          </div>
        </AnimatedBlock>

      </div>

    </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:flex justify-center mt-10">
  
        {/* Cienki, ciemnoszary pasek na pełną szerokość z lekkimi zaokrągleniami */}
        <div className="w-full max-w-[1560px] flex items-center justify-between bg-[#050505] rounded-lg px-6 py-3">
          
          {/* LEWA STRONA: Meta (bez animacji) */}
          <div className="flex flex-col justify-center">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/50">
              Projekt w tle
            </p>
            {/* Użyłem mt-0.5 aby pasek był ciaśniejszy i text-sm żeby zachować proporcje */}
            <p className="mt-0.5 text-[12px] md:text-sm text-white/70 font-medium max-w-[44rem] truncate">
              {currentProject.title}
            </p>
          </div>

          {/* PRAWA STRONA: Kontrolki (bez animacji) */}
          <div className="flex items-center gap-3">
            <a
              href={currentProject.href}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-md bg-black/30 hover:bg-black/50 text-white/80 text-sm transition-colors"
            >
              Zobacz projekt
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Zgrupowane strzałki */}
            <div className="flex items-center gap-1.5 ml-2">
              <button
                type="button"
                onClick={prevSlide}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-black/30 hover:bg-black/50 text-white transition-colors cursor-pointer"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>`
    </section>
  );
}
