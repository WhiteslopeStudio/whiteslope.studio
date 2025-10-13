'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { PROJECT_EXAMPLES } from '@/lib/data';
import { useAdvancedInView } from '@/utils/hooks';
import Image from 'next/image';
import Link from 'next/link';

export const PortfolioSectionDesktop = () => {
  const [ref, inView] = useAdvancedInView();
  const [activeIndex, setActiveIndex] = useState(0);

  // Nieskończona karuzela
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROJECT_EXAMPLES.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + PROJECT_EXAMPLES.length) % PROJECT_EXAMPLES.length);
  };

  const currentProject = PROJECT_EXAMPLES[activeIndex];

  // Funkcja do obliczania pozycji każdej karty w stosie
  const getCardStyle = (index: number) => {
    const position = index - activeIndex;
    
    if (position < 0) {
      // Karty które już przeszły - ukryte
      return {
        opacity: 0,
        scale: 0.8,
        y: -60,
        zIndex: 0,
      };
    } else if (position === 0) {
      // Aktywna karta - na przodzie
      return {
        opacity: 1,
        scale: 1,
        y: 0,
        zIndex: PROJECT_EXAMPLES.length,
      };
    } else if (position === 1) {
      // Druga karta - za pierwszą
      return {
        opacity: 0.7,
        scale: 0.95,
        y: -15,
        zIndex: PROJECT_EXAMPLES.length - 1,
      };
    } else if (position === 2) {
      // Trzecia karta - jeszcze dalej
      return {
        opacity: 0.5,
        scale: 0.9,
        y: -30,
        zIndex: PROJECT_EXAMPLES.length - 2,
      };
    } else {
      // Pozostałe karty - najbardziej z tyłu
      return {
        opacity: 0.3,
        scale: 0.85,
        y: -40,
        zIndex: PROJECT_EXAMPLES.length - 3,
      };
    }
  };

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-8 bg-black relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
          linear-gradient(
            to bottom,
            black 0px,
            black 10px,
            #3b3b3bff 10px,
            #3b3b3bff 11px,
            #0b0b0bff 11px,
            #0b0b0bff calc(100% - 11px),
            #3b3b3bff calc(100% - 11px),
            #3b3b3bff calc(100% - 10px),
            black calc(100% - 10px),
            black 100%
          )
        `,
      }}
    >
      <div className="relative z-10">
        {/* NAGŁÓWEK - tak jak w Process */}
        <div className="text-center mb-12 relative z-10 max-w-10xl mx-auto px-4">
          <div className="text-left max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-semibold text-white mb-4 tracking-tight">
              Nasze realizacje
            </h2>
          </div>
        </div>

        {/* CONTENT - Grid 2/3 i 1/3 */}
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 items-start">
            
            {/* LEWA KOLUMNA (2/3) - Miniaturki + strzałki */}
            <div className="space-y-6">
              
              {/* Stos miniaturek */}
              <div className="relative w-full aspect-video">
                {PROJECT_EXAMPLES.map((project, index) => {
                  const style = getCardStyle(index);
                  
                  return (
                    <motion.div
                      key={project.id}
                      className="absolute inset-0"
                      animate={{
                        opacity: style.opacity,
                        scale: style.scale,
                        y: style.y,
                        zIndex: style.zIndex,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={project.href || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* Overlay z hover effect */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                          
                          {/* Kategoria badge */}
                          {index === activeIndex && (
                            <div className="absolute top-4 left-4 z-10">
                              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                                {project.category}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Strzałki pod miniaturkami */}
              <div className="flex items-center justify-left gap-3">
                <button
                  onClick={goToPrev}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white cursor-pointer"
                  aria-label="Poprzedni projekt"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={goToNext}
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white cursor-pointer"
                  aria-label="Następny projekt"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

            </div>

            {/* PRAWA KOLUMNA (1/3) - Content CZYSTY z hover effectem */}
            <motion.div
              key={`content-${activeIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <div className="space-y-6">
                {/* Tytuł */}
                <h3 className="text-2xl font-bold text-white/80 group-hover:text-white leading-tight transition-colors duration-300">
                  {currentProject.title}
                </h3>
                
                {/* Description */}
                <p className="text-base text-gray-400 group-hover:text-gray-200 leading-relaxed transition-colors duration-300">
                  {currentProject.description}
                </p>

                {/* Link "Zobacz stronę" */}
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/60 group-hover:text-white transition-colors duration-300"
                >
                  <span className="text-sm font-medium">Zobacz stronę</span>
                  <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};