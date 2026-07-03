'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
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
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-[16px] py-[40px] md:py-[60px]">
          
          {/* Ciemne Tło (Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-[12px] cursor-pointer"
            onClick={onClose}
          />

          {/* Główne okno Modala */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[1000px] max-h-[85vh] bg-[#000000] rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 flex flex-col z-10 overflow-hidden"
          >
            
            {/* Przycisk zamykania */}
            <button
              onClick={onClose}
              className="absolute top-[20px] right-[20px] z-20 w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[#000000]/60 hover:bg-[#000000] border border-white/10 text-white/70 hover:text-white backdrop-blur-md transition-all duration-300"
              aria-label="Zamknij"
            >
              <X className="w-[20px] h-[20px]" strokeWidth={1.5} />
            </button>

            {/* Obszar przewijany */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
              
              {/* Czysty Obraz 16:9 - ZERO gradientów */}
              <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-[#050505]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Sekcja Tekstowa pod obrazkiem */}
              <div className="px-[32px] md:px-[64px] py-[48px] md:py-[64px]">
                
                {/* Tytuł z ciasnym trackingiem i leadingiem 0.9 */}
                <h2 className="text-[36px] font-[700] text-white leading-[0.9] tracking-tight max-w-[800px]">
                  {project.title}
                </h2>
                
                {/* Opis poniżej tytułu */}
                <p className="mt-[24px] text-[16px] md:text-[18px] text-white/60 font-[400] leading-[1.7] max-w-[680px]">
                  {project.description}
                </p>

                {/* Świecący animowany przycisk CTA z Twojego hooka */}
                {project.href && (
                  <div className="mt-[48px]">
                    <div className="group relative inline-flex overflow-hidden rounded-full p-[2px] transition-transform active:scale-95 cursor-pointer">
                      <style>{`
                        @keyframes rotateBlue {
                          0% { transform: rotate(0deg); }
                          100% { transform: rotate(360deg); }
                        }
                        .border-spinner-blue {
                          position: absolute;
                          width: 300%;
                          height: 300%;
                          top: -100%;
                          left: -100%;
                          background: conic-gradient(from 0deg, rgba(0, 34, 255, 0) 30%, #0057ff 100%);
                          transform-origin: center;
                        }
                        .group:hover .border-spinner-blue {
                          animation: rotateBlue 1.2s linear infinite;
                        }
                      `}</style>
                      
                      <span className="absolute border-spinner-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                        className="relative z-10 inline-flex h-[46px] items-center justify-center rounded-full bg-zinc-900 px-[32px] text-[14px] md:text-[15px] font-[600] text-white transition-colors group-hover:bg-zinc-950"
                      >
                        Odwiedź stronę
                        <ArrowRight className="w-[16px] h-[16px] ml-[12px] transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}