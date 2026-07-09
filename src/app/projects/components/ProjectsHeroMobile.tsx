'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, ExternalLink } from 'lucide-react';
import { ProjectExample } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECT_EXAMPLES } from '@/lib/data';
import ProjectModal from './ProjectModal';

interface ProjectsHeroMobileProps {
  activeProject?: ProjectExample & { year?: string }; 
}

export default function ProjectsHeroMobile({ activeProject }: ProjectsHeroMobileProps) {
  const [currentProject, setCurrentProject] = useState<ProjectExample & { year?: string } | null>(null);

  // Stan otwarcia modala
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section className="relative mx-auto mb-6 bg-[#0a0a0a] rounded-b-xl w-full min-h-[90vh] flex flex-col justify-end overflow-hidden group shadow-md transition-all duration-500 pb-12 pt-28">
      
      {/* --- TŁO ZDJĘCIA (MOBILE) --- */}
      <div className="absolute inset-0 z-0 bg-zinc-950 overflow-hidden">
        
        <AnimatePresence mode="wait">
          <motion.img
            key={currentProject.id}
            src={currentProject.image}
            alt={currentProject.title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            // object-top gwarantuje, że górna/najważniejsza część screenu projektu jest zawsze widoczna
            className="absolute top-0 w-full h-[65%] object-cover object-top pointer-events-none opacity-80"
          />
        </AnimatePresence>

        {/* MOCNY PIONOWY GRADIENT (Zaciemnia dół pod tekst na mobile) */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,1) 40%, rgba(10,10,10,0.8) 55%, rgba(10,10,10,0) 100%)'
          }}
        />
      </div>

      {/* --- ZAWARTOŚĆ --- */}
      <div className="relative z-20 w-full px-6 flex flex-col items-start justify-end flex-1 min-w-0">        
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col text-left relative z-20 w-full"
          >
            {/* LOGO LUB TYTUŁ (Zmniejszone pod mobile) */}
            <div className="mb-4 min-h-[40px] flex items-start justify-start">
              {currentProject.logoUrl ? (
                <img 
                  src={currentProject.logoUrl} 
                  alt={`Logo ${currentProject.title}`}
                  className="h-[40px] w-auto object-contain object-left drop-shadow-lg"
                  draggable={false}
                />
              ) : (
                <h1 className="text-[28px] font-bold leading-[1.1] text-white tracking-tight">
                  {currentProject.title}
                </h1>
              )}
            </div>

            {/* Rok i Klient */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-zinc-800/80 px-3 py-1 rounded-full text-zinc-300 text-[13px] border border-zinc-700/50 font-medium">
                {projectYear}
              </span>
              {currentProject.clientName && (
                <span className="text-zinc-400 text-[13px] font-medium">
                  {currentProject.clientName}
                </span>
              )}
            </div>

            {/* Opis projektu (Zmniejszony font, żeby nie przytłoczyć) */}
            <p className="text-[18px] text-zinc-100 leading-snug mb-6 font-semibold tracking-tight break-words">
              {currentProject.marketingDescription || currentProject.description}
            </p>

            {/* Tagi usług (Skompresowane marginesy i gapy) */}
            <div className="mb-8 w-full">
              <span className="text-[13px] font-semibold text-zinc-500 block mb-2">
                Zrealizowane usługi:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {servicesArray.map((service, idx) => (
                  <span 
                    key={idx}
                    className="text-[13px] font-medium text-zinc-300 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-white/5"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* PRZYCISKI (100% szerokości, ułożone w kolumnie) */}
            <div className="flex flex-col gap-3 w-full">
              
              {/* Podgląd */}
              {currentProject.href && (
                <a
                  href={currentProject.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer flex w-full items-center justify-center bg-blue-600/90 border border-blue-400/30 text-blue-50 px-6 h-[48px] rounded-full text-[15px] font-semibold active:scale-95 transition-transform gap-2"
                >
                  Podgląd projektu
                  <ExternalLink className="w-4 h-4 text-blue-200" />
                </a>
              )}

              {/* Case Study */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer flex w-full items-center justify-center bg-zinc-200 text-zinc-900 px-6 h-[48px] rounded-full text-[15px] font-semibold active:scale-95 transition-transform gap-2"
              >
                Zobacz Case Study
              </button>
              
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* --- STRZAŁKA NA DOLE --- */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 pointer-events-none z-20">
        <ArrowDown className="w-4 h-4 text-zinc-400" />
      </div>

      {/* MODAL */}
      <ProjectModal 
        projects={PROJECT_EXAMPLES}
        initialIndex={initialModalIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

    </section>
  );
}