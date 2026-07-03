'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import { PROJECT_EXAMPLES } from '@/lib/data';
import { ProjectExample } from '@/lib/types';
import { useDragScroll } from '@/utils/hooks';
import ProjectModal from './ProjectModal'; // Ten plik stworzymy za chwilę!

interface ProjectRowProps {
  title: string;
  subtitle: string;
  category: string;
}

export default function ProjectRow({ title, subtitle, category }: ProjectRowProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectExample | null>(null);

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

  // ZAMIAST UKRYWAĆ - WYŚWIETLAMY BŁĄD NA EKRANIE:
  if (rowProjects.length === 0) {
    return (
      <div className="text-white p-10 text-center border-2 border-red-500 m-10 rounded-xl">
        <h2>❌ Błąd filtru dla rzędu: {title}</h2>
        <p>Szukam projektów z rowType: "{category}"</p>
        <p>Znalazłem: 0</p>
      </div>
    );
  }

  // Jeśli brak projektów w danej kategorii, nie renderujemy pustego rzędu
  if (rowProjects.length === 0) return null;

  // Obsługa strzałek "Netflixowych"
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.7 : clientWidth * 0.7;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full max-w-[1640px] mx-auto px-6 relative group/row">
      
      {/* Nagłówek rzędu */}
      <div className="mb-4">
        <h2 className="text-[20px] md:text-[24px] font-bold text-zinc-50 tracking-tight">
          {title}
        </h2>
        <p className="text-[14px] text-zinc-400 mt-1">
          {subtitle}
        </p>
      </div>

      {/* Kontener z projektami i strzałkami */}
      <div className="relative">
        
        {/* Lewa Strzałka (Pojawia się na hover całego rzędu) */}
        <div className="absolute left-0 top-0 bottom-0 z-20 w-[40px] md:w-[60px]  from-zinc-950 via-zinc-950/80 to-transparent flex items-center justify-start opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={() => scroll('left')}
            className="w-[36px] h-[36px] rounded-full bg-zinc-900/80 border border-zinc-700/50 text-white flex items-center justify-center hover:bg-zinc-800 hover:scale-110 transition-all pointer-events-auto ml-2 backdrop-blur-sm"
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
          className={`flex gap-4 md:gap-6 overflow-x-auto py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory ${
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          }`}
        >
          {rowProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => !isDragging && setSelectedProject(project)}
              className="relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] aspect-video rounded-xl overflow-hidden bg-zinc-900 snap-center group/card transition-transform duration-300 hover:scale-[1.03] hover:z-10 shadow-lg hover:shadow-2xl"
            >
              {/* Zdjęcie projektu */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 opacity-80 group-hover/card:opacity-100"
                draggable={false}
              />
              
              {/* Gradient nakładki */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity duration-300" />

              {/* Teksty pokazujące się na hover */}
              <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-[18px] md:text-[22px] leading-tight mb-2 drop-shadow-md">
                    {project.title}
                  </h3>
                  
                  {/* Przycisk akcji wewnątrz karty */}
                  <div className="flex items-center gap-2 text-blue-400 font-medium text-[13px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-100">
                    <span>Zobacz Case Study</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Prawa Strzałka */}
        <div className="absolute right-0 top-0 bottom-0 z-20 w-[40px] md:w-[60px]  from-zinc-950 via-zinc-950/80 to-transparent flex items-center justify-end opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 pointer-events-none">
          <button
            onClick={() => scroll('right')}
            className="w-[36px] h-[36px] rounded-full bg-zinc-900/80 border border-zinc-700/50 text-white flex items-center justify-center hover:bg-zinc-800 hover:scale-110 transition-all pointer-events-auto mr-2 backdrop-blur-sm"
            aria-label="Przewiń w prawo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* --- MODAL (POP-UP) --- */}
      {/* Jeśli projekt jest kliknięty (wybrany), renderujemy Modal. */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

    </div>
  );
}