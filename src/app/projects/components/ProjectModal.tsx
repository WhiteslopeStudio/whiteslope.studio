'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { ProjectExample } from '@/lib/types';

interface ProjectModalProps {
  project: ProjectExample;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  
  // Blokowanie scrollowania strony
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Zamykanie przez Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Przekształcenie usług (string po przecinku) w tablicę
  const servicesArray = project.servicesListed 
    ? project.servicesListed.split(',').map(s => s.trim()) 
    : ['Tworzenie stron WWW', 'Projektowanie UX/UI', 'Optymalizacja'];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-[5vh]">
          
          {/* Ciemne Tło (Overlay) z rozmyciem */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />

          {/* Główne okno Modala - Wracamy do miękkich zaokrągleń */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-[90vw] max-w-full h-[90vh] bg-white flex flex-col lg:flex-row overflow-hidden z-10 shadow-2xl rounded-[24px]"
          >
            
            {/* LEWA STRONA - ZDJĘCIE (55%) */}
            <div className="hidden lg:block lg:w-[55%] h-full bg-[#e5e5e5] relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* PRAWA STRONA - TREŚĆ (45%) */}
            <div className="w-full lg:w-[45%] h-full flex flex-col relative bg-white overflow-hidden">
              
              {/* --- TŁO: Firmowe pasy gradientowe (Subtelne szkło w tle) --- */}
              <div className="absolute inset-0 z-0 w-full flex opacity-60 pointer-events-none">
                <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #c5d6ff 0%, #ffffff 80%)' }} />
                <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #c8dbff 0%, #ffffff 40%)' }} />
                <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #cce0ff 0%, #ffffff 75%)' }} />
                <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #cce6fa 0%, #ffffff 45%)' }} />
                <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #ceebf5 0%, #ffffff 95%)' }} />
                <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #d0eff0 0%, #ffffff 60%)' }} />
                <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #d0f2eb 0%, #ffffff 35%)' }} />
                <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #d0f4e6 0%, #ffffff 80%)' }} />
              </div>

              {/* Obszar przewijany (z-10 żeby był nad pasami) */}
              <div className="relative z-10 flex-1 overflow-y-auto px-[32px] py-[40px] md:px-[64px] md:py-[56px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                
                {/* --- HEADER --- */}
                <div className="flex items-center justify-between mb-[64px]">
                  <div className="flex items-center gap-2 text-[16px] md:text-[18px] font-[500] text-black">
                    {project.clientLogo ? (
                      <img 
                        src={project.clientLogo} 
                        alt={project.clientName || 'Logo klienta'} 
                        className="h-[64px] object-contain rounded-full" 
                      />
                    ) : (
                      project.clientName && (
                        <span>{project.clientName}</span>
                      )
                    )}
                    <span className="font-[600] text-zinc-900">
                      {project.clientName ? ' — ' : ''} {project.category}
                    </span>
                  </div>

                  {/* Zaokrąglony przycisk zamykania z animacją skali */}
                  <button
                    onClick={onClose}
                    className="hover:cursor-pointer flex items-center gap-2 bg-zinc-800 hover:bg-zinc-900 text-white px-[20px] py-[10px] rounded-full border border-zinc-200 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 group"
                    aria-label="Zamknij"
                  >
                    <span className="text-[14px] font-[600]">Zamknij</span>
                    <X className="w-[18px] h-[18px] text-white transition-transform duration-300 group-hover:rotate-90" strokeWidth={2} />
                  </button>
                </div>

                {/* --- NAGŁÓWEK GŁÓWNY --- */}
                <h2 className="text-[36px] md:text-[46px] text-black leading-[1.05] tracking-tight mb-[64px] max-w-[90%] font-[500]">
                  {project.title}
                </h2>

                {/* --- KOLUMNY: USŁUGI i OVERVIEW --- */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-[48px] lg:gap-[40px] mb-[64px]">
                  
                  {/* Lewa kolumna: Usługi */}
                  <div>
                    <h3 className="text-[18px] font-[600] text-black mb-[24px]">
                      Zrealizowane usługi —
                    </h3>
                    <ul className="flex flex-col gap-[16px]">
                      {servicesArray.map((service, index) => (
                        <li key={index} className="text-[17px] md:text-[18px] text-zinc-800 font-[400] flex items-start gap-3 leading-tight">
                          
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="20" height="20" viewBox="0 0 24 24"
                            className="text-[#50D100] shrink-0 mt-[3px]"
                          >
                            <path 
                              fill="currentColor" 
                              fillRule="evenodd" 
                              d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M9.97 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L12.44 12L9.97 9.53a.75.75 0 0 1 0-1.06" 
                              clipRule="evenodd"
                            />
                          </svg>
                          
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prawa kolumna: Overview */}
                  <div>
                    <h3 className="text-[18px] font-[600] text-black mb-[24px]">
                      Podsumowanie projektu —
                    </h3>
                    <div className="text-[17px] md:text-[18px] text-zinc-800 font-[400] leading-[1.6] space-y-[24px]">
                      <p>{project.description}</p>
                    </div>
                  </div>
                  
                </div>

                {/* --- SEKCJA CTA NA DOLE (Miękka, z animacjami) --- */}
                <div className="mt-[40px] bg-zinc-950 rounded-[20px] p-[32px] md:p-[48px] flex flex-col xl:flex-row xl:items-center justify-between gap-[32px] w-full relative overflow-hidden shadow-xl">
                  
                  {/* Subtelny glow gradientu z pasów w rogu CTA */}
                  <div className="absolute top-0 right-0 w-[50%] h-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle at 100% 0%, #c5d6ff, transparent 70%)' }} />

                  <h4 className="relative z-10 text-[20px] md:text-[24px] font-[500] text-white tracking-tight leading-[1.3] m-0 max-w-[350px]">
                    Chcesz uzyskać podobne rezultaty w swoim biznesie?
                  </h4>
                  
                  <a
                    href="#kontakt"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="relative z-10 shrink-0 inline-flex items-center justify-center bg-white text-black px-[32px] py-[16px] rounded-full text-[16px] font-[600] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95 group"
                  >
                    Porozmawiajmy
                    <ArrowUpRight className="w-[20px] h-[20px] ml-[8px] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>

              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}