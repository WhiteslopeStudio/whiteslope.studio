'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight, ArrowRight, Check } from 'lucide-react';
import { PROJECT_EXAMPLES } from '@/lib/data';
import { useApprovalCarousel, useInteractiveButton } from '@/utils/hooks';

const SLIDE_INTERVAL_MS = 5500;
const EDGE_PADDING = 'clamp(28px, 7vw, 150px)';

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
    <section className="relative h-[60svh] md:h-[90svh] md:min-h-[760px] overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 hidden md:block">
        {PROJECT_EXAMPLES.map((project, index) => (
          <div
            key={project.id}
            className="absolute inset-0 bg-center bg-cover transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${project.image})`,
              opacity: index === activeIndex ? 1 : 0,
              filter: 'brightness(0.72) saturate(0.92)',
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.76) 30%, rgba(0,0,0,0.44) 48%, rgba(0,0,0,0.14) 66%, rgba(0,0,0,0.02) 84%)',
        }}
      />
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.24) 55%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      <div className="absolute top-[16%] left-[24%] -translate-x-1/2 w-[62rem] h-[34rem] rounded-full bg-blue-500/9 blur-[175px] pointer-events-none hidden md:block" />
      <div className="absolute top-[31%] right-[-8%] w-[30rem] h-[30rem] rounded-full bg-yellow-300/10 blur-[170px] pointer-events-none hidden md:block" />

      <div className="relative z-10 h-full flex flex-col justify-center" style={{ paddingLeft: EDGE_PADDING, paddingRight: EDGE_PADDING }}>
        <div className="relative max-w-[1120px] text-center md:text-left mx-auto md:mx-0 -mt-3 md:-mt-40">

          <div className="relative">
            <AnimatedBlock delay={0}>
              <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-black/35 backdrop-blur-sm text-[10px] md:text-sm font-medium text-gray-100/70 tracking-[0.18em] md:tracking-[0.22em]">
                <span className="w-2 h-2 rounded-full bg-gray-100/70 animate-pulse" />
                WEB DEVELOPMENT & DESIGN  
              </p>
            </AnimatedBlock>

            <AnimatedBlock delay={120}>
              <h1 className="mt-5 md:mt-6 text-3xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                <span className="md:hidden">
                  <span className="text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 via-gray-100 to-white">
                    Strony internetowe
                    <br />
                    tworzone z myślą
                    <br />
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                    o Twoim biznesie
                  </span>
                </span>
                <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 via-gray-100 to-white">Strony&nbsp;internetowe&nbsp;tworzone</span>
                <br className="hidden md:block" />
                <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">z myślą o Twoim biznesie</span>
              </h1>
            </AnimatedBlock>

            <AnimatedBlock delay={240}>
              <h2 className="mt-4 md:mt-5 text-base md:text-2xl text-blue-50/70 font-medium max-w-xl md:max-w-2xl mx-auto md:mx-0">
                <span className="md:hidden">
                  Pomagamy naszym klientom wyglądać profesjonalnie w sieci i budować
                  <br />
                  zaufanie klientów.
                </span>
                <span className="hidden md:inline">
                  Pomagamy naszym klientom wyglądać profesjonalnie w sieci i budować zaufanie klientów.
                </span>
              </h2>
            </AnimatedBlock>

            <AnimatedBlock delay={520}>
              <div className="mt-7 md:mt-8 flex flex-col md:flex-row gap-3 md:gap-4 justify-center md:justify-start items-stretch sm:items-center md:items-start">
                <Link
                  href="#brief"
                  onMouseMove={mainButton.handleMouseMove}
                  onMouseEnter={mainButton.handleMouseEnter}
                  onMouseLeave={mainButton.handleMouseLeave}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-12 px-8 text-sm md:text-base font-semibold text-white relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
                  style={{
                    background: `radial-gradient(circle at ${mainButton.mousePosition.x}% ${mainButton.mousePosition.y}%, #248affff, #248affff 30%, #1c86ffff 60%, #1985ff)`,
                  }}
                >
                  Wycena
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact?tab=meeting"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-12 px-8 text-sm md:text-base font-medium text-white border border-white/55 bg-transparent hover:bg-white/10 transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.08)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.16)]"
                >
                  Bezpłatna konsultacja
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedBlock>

            <AnimatedBlock delay={620}>
              <div className="md:hidden mt-4 flex items-center justify-center relative h-10 max-w-xl mx-auto">
                {highlights.map((item, index) => {
                  const isActive = activeMobileProofIndex === index;
                  const isPrevious = index === (activeMobileProofIndex - 1 + highlights.length) % highlights.length;

                  return (
                    <div
                      key={`mobile-${item.id}`}
                      className={`flex items-center gap-2 absolute transition-all duration-500 ease-in-out ${
                        isActive
                          ? 'opacity-100 translate-x-0'
                          : isPrevious
                          ? 'opacity-0 -translate-x-full'
                          : 'opacity-0 translate-x-full'
                      }`}
                    >
                      <div className="relative">
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" strokeWidth={4} />
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-300">{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </AnimatedBlock>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 hidden md:block" style={{ paddingLeft: EDGE_PADDING, paddingRight: EDGE_PADDING }}>
        <div className="flex items-end justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentProject.id}-meta`}
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="text-white/85 w-full max-w-[46rem]"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">Projekt w tle</p>
              <p className="mt-2 text-sm md:text-base text-blue-200/80">{currentProject.category}</p>
              <p className="mt-1 text-base md:text-lg text-white/80 font-medium max-w-[44rem]">{currentProject.title}</p>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentProject.id}-controls`}
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <a
                href={currentProject.href}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-7 py-2.5 rounded-full border border-white/25 bg-black/35 hover:bg-black/50 text-white transition-colors"
              >
                Zobacz projekt
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={prevSlide}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-black/35 hover:bg-black/55 text-white transition-colors cursor-pointer"
                aria-label="Poprzednie zdjęcie"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/30 bg-black/35 hover:bg-black/55 text-white transition-colors cursor-pointer"
                aria-label="Następne zdjęcie"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-6 border-t border-white/10 py-4">
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40rem] h-[10rem] rounded-full bg-blue-500/14 blur-[130px] pointer-events-none" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
            {highlights.map((item) => (
              <div key={item.id} className="min-h-[56px]">
                <p className="text-sm font-semibold tracking-[0.18em]">
                  <span className="text-blue-300">#</span>
                  <span className="text-white">{item.id}</span>
                </p>
                <p className="mt-2 text-sm md:text-base text-white/90 leading-snug">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
