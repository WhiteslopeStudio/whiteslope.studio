'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { ProjectExample } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECT_EXAMPLES } from '@/lib/data';
import ProjectModal from './ProjectModal';

interface ProjectsHeroProps {
  activeProject?: ProjectExample & { year?: string }; 
}

export default function ProjectsHero({ activeProject }: ProjectsHeroProps) {
  const [currentProject, setCurrentProject] = useState<ProjectExample & { year?: string } | null>(null);

    // 1. Stan otwarcia modala
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Szukamy, na którym projekcie z całej tablicy aktualnie stoi Hero
  // (zakładam, że Twój aktualny stan projektu nazywa się 'currentProject')
  const currentProjectIndex = PROJECT_EXAMPLES.findIndex(p => p.id === currentProject?.id);
  const initialModalIndex = currentProjectIndex !== -1 ? currentProjectIndex : 0;


  useEffect(() => {
    if (activeProject) {
      setCurrentProject(activeProject);
    }
  }, [activeProject]);

  if (!currentProject) return null;

  // Przekształcenie usług
  const servicesArray = currentProject.servicesListed 
    ? currentProject.servicesListed.split(',').map(s => s.trim()) 
    : ['Tworzenie stron WWW', 'Projektowanie UX/UI'];

  // Rok wykonania
  const projectYear = currentProject.year || '2026';

  return (
    // Zmiana na w-full, żeby rozciągnąć sekcję na cały ekran
    <section className="relative mx-auto mb-10 md:mb-16 bg-[#0a0a0a] rounded-b-xl md:rounded-b-[32px] h-[75vh] min-h-[550px] max-h-[800px] w-full overflow-hidden group/hero shadow-2xl transition-all duration-500">
      
      {/* --- KINOWE TŁO --- */}
      <div className="absolute inset-0 z-0 bg-zinc-950 max-w-[1700px] mx-auto overflow-hidden rounded-b-xl md:rounded-b-[32px] rounded-t-xl md:rounded-t-[32px]">
        
        <AnimatePresence mode="wait">
          <motion.img
            key={currentProject.id}
            src={currentProject.image}
            alt={currentProject.title}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            // 1. Usunięte object-[...%], wraca zwykłe object-right
            // 2. h-[110%] i -top-[20px] dają zapas na górze
            // 3. translate-y-[20px] pcha cały obrazek w dół (zmieniaj tę wartość, żeby dopasować idealnie)
            className="absolute right-0 -top-[20px] w-[100%] md:w-[60%] h-[110%] object-cover object-center translate-y-[20px] pointer-events-none hover:scale-102 transition-transform duration-700"
          />
        </AnimatePresence>

        {/* 
          SKRÓCONY GRADIENT: 
          0-39% -> Pełna czerń (ukrywa brak zdjęcia)
          41% -> Szybkie rozmycie ostrej krawędzi obrazka
          55% -> Całkowita przezroczystość
        */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, #09090b 0%, #09090b 39%, rgba(9,9,11,0.9) 41%, rgba(9,9,11,0) 55%)'
          }}
        />

      </div>

      {/* --- GRADIENTY (Cienie dla tekstu) --- */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, rgba(10,10,10,1) 0%, rgba(10,10,10,0.9) 25%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0) 100%)',
        }}
      />
      

      {/* --- INTERFEJS I ZAWARTOŚĆ --- */}
<div className="relative z-20 h-full max-w-[1640px] mx-auto flex flex-col justify-center items-start px-8 min-w-0">        
        

        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col text-left relative z-20"
          >
            {/* Typ projektu na górze */}
            {/* <div className="text-[16px] font-semibold text-blue-400 mb-2">
              {currentProject.category}
            </div> */}

            {/* LOGO PROJEKTU (Netflix Title Treatment) lub Tytuł Awaryjny */}
            <div className="mb-6 min-h-[50px] flex items-start justify-start">
              {currentProject.logoUrl ? (
                <img 
                  src={currentProject.logoUrl} 
                  alt={`Logo ${currentProject.title}`}
                  // Ustawiamy sztywną wysokość, żeby logo się nie rozjechało na cały ekran
                  className="h-[50px] md:h-[70px] w-auto object-contain object-left drop-shadow-xl"
                  draggable={false}
                />
              ) : (
                <h1 className="text-[38px] md:text-[45px] font-bold leading-[1.1] text-white tracking-tight max-w-[750px]">
                  {currentProject.title}
                </h1>
              )}
            </div>

            {/* Rok produkcji i Klient pod tytułem po lewej stronie */}
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-zinc-800/80 backdrop-blur-md px-3 py-1 rounded-full text-zinc-300 text-[14px] border border-zinc-700/50">
                {projectYear}
              </span>
              {currentProject.clientName && (
                <span className="text-zinc-400 text-[14px] font-medium">
                  {currentProject.clientName}
                </span>
              )}
            </div>

            {/* Opis */}
            <p className="text-[24px] md:text-[38px] text-zinc-100 max-w-[800px] leading-relaxed mb-8 font-semibold tracking-tight leading-tight break-words">
              {currentProject.marketingDescription || currentProject.description}
            </p>

            {/* Usługi (Miękkie, zaokrąglone tagi, brak uppercase) */}
            <div className="mb-10">
              <span className="text-[14px] font-semibold text-zinc-400 block mb-3">
                Zrealizowane usługi:
              </span>
              <div className="flex flex-wrap gap-2 max-w-[800px]">
                {servicesArray.map((service, idx) => (
                  <span 
                    key={idx}
                    className="text-[16px] md:text-[14px] font-medium text-zinc-200 bg-zinc-900/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/10"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* PRZYCISKI AKCJI (Firmowe kolory, mocne zaokrąglenia i Glassmorphism) */}
            <div className="flex flex-wrap gap-4 items-center w-full">
              
              {/* Przycisk 1: Podgląd Projektu (Główny, Niebieski) */}
              {currentProject.href && (
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer inline-flex items-center justify-center bg-blue-600/80 backdrop-blur-md border border-blue-400/30 hover:bg-blue-600/90 hover:border-blue-400/50 text-blue-100 px-8 h-[48px] rounded-full text-[15px] font-semibold transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(37,99,235,0.3)] gap-2 group hover:scale-105 transition-transform duration-300"
                >
                  Podgląd projektu
                  <ExternalLink className="w-4 h-4 text-blue-200 transition-colors group-hover:text-white" />
                </a>
              )}

              {/* Przycisk 2: Zobacz Case Study (Przewija do karuzeli, Ciemny/Szkło) */}
              <button
                onClick={() => setIsModalOpen(true)} // <-- To otwiera modal
                className="cursor-pointer inline-flex items-center justify-center bg-zinc-200 backdrop-blur-md hover:bg-zinc-300 border border-white/10 hover:border-white/20 text-zinc-900 px-7 h-[48px] rounded-full text-[15px] font-semibold transition-all duration-300 active:scale-95 shadow-lg scale-100 hover:scale-105 transition-transform duration-300 gap-2"
              >
                Zobacz Case Study
              </button>
              
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* --- INFORMACJA O SCROLLOWANIU NA DOLE --- */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white opacity-100 pointer-events-none z-20">
        <span className="text-[12px] font-medium text-zinc-100">Więcej projektów poniżej</span>
        <ArrowDown className="w-4 h-4" />
      </div>

      {/* MODAL PODPIĘTY POD HERO (Wklej na samym dole przed </section>) */}
      <ProjectModal 
        projects={PROJECT_EXAMPLES}
        initialIndex={initialModalIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </section>
  );
}