'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { PROJECT_EXAMPLES } from '@/lib/data';
import { ProjectExample } from '@/lib/types';
import { useDragScroll } from '@/utils/hooks';
import ProjectModal from './ProjectModal'; 

interface ProjectRowProps {
  title: string;
  subtitle: string;
  category: string;
}

export default function ProjectRow({ title, subtitle, category }: ProjectRowProps) {
  // ZMIANA 1: Trzymamy w stanie INDEKS klikniętego projektu (liczbę), a nie cały obiekt.
  // Jeśli jest null - modal jest zamknięty.
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Refy do śledzenia pozycji myszki, żeby odróżnić kliknięcie od przeciągania
  const clickStartX = useRef(0);
  const clickStartY = useRef(0);

  // Hook do przesuwania myszką (Drag to scroll)
  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
  } = useDragScroll<ProjectExample>();

  const rowProjects = PROJECT_EXAMPLES.filter(
    (p) => p.rowType === category
  );

  // Jeśli w danej kategorii nie ma żadnych projektów, całkowicie ukrywamy ten rząd
  if (rowProjects.length === 0) {
    return null;
  }

  // Obsługa strzałek - przewija o szerokość karty
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = window.innerWidth < 768 ? 340 : 474; 
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      
      scrollContainerRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <div className="w-full max-w-[1640px] mx-auto px-6 relative group/row">
      
      {/* Nagłówek rzędu */}
      <div className="mb-6">
        <h2 className="text-[20px] md:text-[24px] font-bold text-zinc-50 tracking-tight">
          {title}
        </h2>
        <p className="text-[14px] text-zinc-400 mt-1">
          {subtitle}
        </p>
      </div>

      {/* Kontener z projektami i strzałkami */}
      <div className="relative">
        
        {/* Lewa Strzałka */}
        <div className="absolute left-0 top-0 bottom-0 z-20 w-[40px] md:w-[60px] from-zinc-950 via-zinc-950/80 to-transparent flex items-center justify-start pointer-events-none pb-[80px]">
          <button
            onClick={() => scroll('left')}
            className="w-[36px] h-[36px] rounded-full bg-white border border-zinc-200 text-black flex items-center justify-center hover:bg-zinc-100 hover:scale-110 transition-all pointer-events-auto ml-2 shadow-xl"
            aria-label="Przewiń w lewo"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollowana Karuzela */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove}
          className={`gap-6 flex overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
        >
          {/* ZMIANA 2: Dodajemy `index` do metody map, żeby wiedzieć, w który element klikamy */}
          {rowProjects.map((project, index) => (
            <div
              key={project.id}
              onMouseDown={(e) => {
                clickStartX.current = e.clientX;
                clickStartY.current = e.clientY;
              }}
              onClick={(e) => {
                const deltaX = Math.abs(e.clientX - clickStartX.current);
                const deltaY = Math.abs(e.clientY - clickStartY.current);
                
                // Jeśli myszka przesunęła się o więcej niż 6 pikseli, to był "drag", a nie "klik" -> przerywamy
                if (deltaX > 6 || deltaY > 6) return;
                
                // ZMIANA 3: Ustawiamy numer klikniętego projektu
                setSelectedIndex(index);
              }}
              className=" relative flex-shrink-0 w-[320px] sm:w-[360px] md:w-[450px] flex flex-col group/card transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
            >
              
              {/* Sekcja Obrazka */}
              <div className="w-full aspect-video overflow-hidden bg-zinc-900 mb-4 shadow-lg group-hover/card:shadow-2xl transition-all duration-300 border border-white/5 rounded-[16px]">
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />
                ) : (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    draggable={false}
                  />
                )}
              </div>

              {/* Sekcja Tekstowa POD obrazkiem */}
              <div className="flex flex-col px-1">
                <h3 className="text-white font-bold text-[18px] md:text-[20px] leading-tight mb-2 transition-colors duration-300 group-hover/card:text-white">
                  {project.title}
                </h3>
                
                {/* Przycisk akcji pod tytułem */}
                <div className="flex items-center gap-1.5 text-[#B8DAFF] font-medium text-[14px] mt-1 opacity-80 group-hover/card:opacity-100 transition-opacity duration-300">
                  <span><u>Zobacz Case Study</u></span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/card:translate-x-1 group-hover/card:-translate-y-1" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Prawa Strzałka */}
        <div className="absolute right-0 top-0 bottom-0 z-20 w-[40px] md:w-[60px] from-zinc-950 via-zinc-950/80 to-transparent flex items-center justify-end pointer-events-none pb-[80px]">
          <button
            onClick={() => scroll('right')}
            className="w-[36px] h-[36px] rounded-full bg-white border border-zinc-200 text-black flex items-center justify-center hover:bg-zinc-100 hover:scale-110 transition-all pointer-events-auto mr-2 shadow-xl"
            aria-label="Przewiń w prawo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* ZMIANA 4: Zawsze renderujemy Modal i sterujemy nim za pomocą zmiennych. 
          Dzięki temu Framer Motion może płynnie animować zamykanie (exit). */}
      <ProjectModal 
        projects={rowProjects} 
        initialIndex={selectedIndex !== null ? selectedIndex : 0} 
        isOpen={selectedIndex !== null} 
        onClose={() => setSelectedIndex(null)} 
      />

    </div>
  );
}