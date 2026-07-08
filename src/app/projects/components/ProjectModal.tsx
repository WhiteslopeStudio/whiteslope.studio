'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, ExternalLink } from 'lucide-react';
import { ProjectExample } from '@/lib/types';

interface ProjectModalProps {
  projects: ProjectExample[]; // Przyjmujemy całą listę projektów
  initialIndex: number;       // Indeks projektu, w który kliknął użytkownik
  isOpen: boolean;
  onClose: () => void;
}

// Konfiguracja wjazdów i wyjazdów na scrolla
const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "30%" : "-30%", // Jeśli scroll w dół, nowe wjeżdża z dołu
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-30%" : "30%", // Jeśli scroll w dół, stare odlatuje do góry
    opacity: 0,
  }),
};

export default function ProjectModal({ projects, initialIndex, isOpen, onClose }: ProjectModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(1); 
  
  // ZMIANA: Używamy useRef zamiast useState. 
  // Dzięki temu blokada działa NATYCHMIAST i nie gubi Twojego pierwszego scrolla.
  const isAnimatingRef = React.useRef(false);

  // Synchronizacja po otwarciu Modala
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);

  // Detekcja scrolla rolką myszy / touchpadem (Hyper-czuły tryb YT Shorts + Looping)
  useEffect(() => {
    if (!isOpen) return;

    const handleWheel = (e: WheelEvent) => {
      // Jeśli animacja trwa, natychmiast ubijamy każdy kolejny ruch kółkiem myszy
      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }
      
      if (!projects || projects.length === 0) return;

      // Inteligentne przewijanie: sprawdzamy, czy użytkownik czyta tekst na prawym panelu
      const target = e.target as HTMLElement;
      const scrollableDiv = target.closest('.text-scroll-container');
      
      if (scrollableDiv) {
        const isAtTop = scrollableDiv.scrollTop === 0;
        const isAtBottom = Math.abs(scrollableDiv.scrollHeight - scrollableDiv.clientHeight - scrollableDiv.scrollTop) <= 2;

        // Pozwalamy na natywny scroll, jeśli tekst ma jeszcze miejsce do przewinięcia
        if (e.deltaY < 0 && !isAtTop) return; 
        if (e.deltaY > 0 && !isAtBottom) return; 
      }

      // --- MEGA CZUŁY SCROLL ---
      // Reagujemy na JAKIKOLWIEK ruch rolką (deltaY > 0)
      if (Math.abs(e.deltaY) > 0) {
        e.preventDefault(); // Blokujemy natywny, "gumowy" scroll przeglądarki
        
        // ZAKŁADAMY BLOKADĘ NATYCHMIAST
        isAnimatingRef.current = true;

        if (e.deltaY > 0) {
          // Scroll w dół - następny (z zapętleniem na początek)
          setDirection(1);
          setCurrentIndex((prev) => (prev + 1) % projects.length);
        } else {
          // Scroll w górę - poprzedni (z zapętleniem na koniec)
          setDirection(-1);
          setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
        }

        // Ściągamy blokadę po dokładnie 600ms (czas trwania animacji)
        setTimeout(() => {
          isAnimatingRef.current = false;
        }, 600);
      }
    };

    // Podpinamy event z passive: false, żeby móc natychmiastowo blokować scroll
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen, projects?.length]); // Usunięto zbędne zależności, które resetowały event!

  // Blokowanie scrolla strony pod spodem
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

  // Esc do zamykania
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Bezpieczne pobranie aktualnego projektu
  const currentProject = projects?.[currentIndex] || projects?.[0];

  // Przekształcenie usług
  const servicesArray = currentProject?.servicesListed 
    ? currentProject.servicesListed.split(',').map(s => s.trim()) 
    : ['Tworzenie stron WWW', 'Projektowanie UX/UI', 'Optymalizacja'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-[2.5vh] bg-black/80 backdrop-blur-sm cursor-pointer"
          onClick={onClose}
        >
          {/* Główne okno Modala - Wjazd głównego pudła */}
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: "100vh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100vh" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Płynna krzywa wjazdu
            className="relative w-[95vw] max-w-full h-[95vh] bg-white flex flex-col lg:flex-row overflow-hidden shadow-2xl rounded-[16px] cursor-default"
          >
            
            {/* LEWA STRONA - ZDJĘCIA (70%) */}
            <div className="hidden lg:block lg:w-[70%] h-full bg-zinc-100 relative border-r border-zinc-200 overflow-hidden">
              <AnimatePresence custom={direction} initial={false}>
                <motion.img
                  key={`img-${currentProject.id}`}
                  src={currentProject.image}
                  alt={currentProject.title}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              </AnimatePresence>
            </div>

            {/* PRAWA STRONA - TREŚĆ (30%) */}
            <div className="w-full lg:w-[30%] h-full flex flex-col bg-white relative overflow-hidden">
              
              {/* TŁO: Firmowe pasy (Zawsze statyczne na spodzie) */}
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

              {/* STATYCZNY TOP BAR: Licznik + Zamknij (Nie animuje się przy scrollu) */}
              <div className="absolute top-[32px] left-[32px] right-[32px] z-50 flex items-center justify-between pointer-events-none">
                
                {/* Licznik projektów */}
                <div className="text-[12px] font-bold text-zinc-500 bg-white/70 backdrop-blur-md px-[12px] py-[6px] rounded-full border border-zinc-200/50 shadow-sm">
                  {currentIndex + 1} / {projects.length}
                </div>

                <button
                  onClick={onClose}
                  className="pointer-events-auto cursor-pointer flex items-center gap-2 bg-white/80 backdrop-blur-md hover:bg-zinc-200 text-zinc-900 px-[16px] py-[8px] rounded-full transition-colors duration-200 shadow-sm border border-zinc-200/50"
                  aria-label="Zamknij"
                >
                  <span className="text-[13px] font-[600]">Zamknij</span>
                  <X className="w-[16px] h-[16px]" strokeWidth={2.5} />
                </button>
              </div>

              {/* ZMIENIAJĄCA SIĘ TREŚĆ (Animowana) */}
              <AnimatePresence custom={direction} initial={false}>
                <motion.div
                  key={`content-${currentProject.id}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  // Absolute i scrollowanie, klasa text-scroll-container jest kluczowa do inteligentnego scrolla
                  className="absolute inset-0 z-10 text-scroll-container overflow-y-auto flex flex-col pt-[100px] px-[32px] pb-[40px] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-300 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-400"
                >
                  
                  {/* HEADER PROJEKTU */}
                  <div className="flex items-center gap-2 text-[14px] font-[500] text-zinc-600 mb-[40px]">
                    {currentProject.clientLogo ? (
                      <img 
                        src={currentProject.clientLogo} 
                        alt={currentProject.clientName || 'Logo klienta'} 
                        className="h-[32px] object-contain rounded-full bg-white/50 backdrop-blur-sm" 
                      />
                    ) : (
                      currentProject.clientName && (
                        <span>{currentProject.clientName}</span>
                      )
                    )}
                    <span className="font-[600] text-zinc-900">
                      {currentProject.clientName ? ' — ' : ''} {currentProject.category}
                    </span>
                  </div>

                  {/* TYTUŁ I PRZYCISK */}
                  <div className="mb-[48px]">
                    <h2 className="text-[32px] md:text-[38px] text-zinc-950 leading-[1.1] tracking-tight font-bold mb-[24px]">
                      {currentProject.title}
                    </h2>
                    
                    {currentProject.href && (
                      <a 
                        href={currentProject.href} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-[20px] py-[10px] bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-semibold rounded-full transition-colors shadow-md"
                      >
                        Zobacz podgląd
                        <ExternalLink className="w-[16px] h-[16px]" strokeWidth={2.5} />
                      </a>
                    )}
                  </div>

                  {/* ZREALIZOWANE USŁUGI */}
                  <div className="flex flex-col gap-[40px] mb-[48px]">
                    <div>
                      <h3 className="text-[16px] font-bold text-zinc-950 mb-[16px]">
                        Zrealizowane usługi
                      </h3>
                      <ul className="flex flex-col gap-[12px]">
                        {servicesArray.map((service, index) => (
                          <li key={index} className="text-[15px] text-zinc-800 font-medium flex items-start gap-3 leading-tight">
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="18" height="18" viewBox="0 0 24 24"
                              className="text-zinc-900 shrink-0 mt-[1px]"
                            >
                              <path fill="currentColor" fillRule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10M9.97 8.47a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06L12.44 12L9.97 9.53a.75.75 0 0 1 0-1.06" clipRule="evenodd"/>
                            </svg>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* PODSUMOWANIE */}
                    <div>
                      <h3 className="text-[16px] font-bold text-zinc-950 mb-[16px]">
                        Podsumowanie projektu
                      </h3>
                      <div className="text-[15px] text-zinc-700 font-normal leading-[1.6]">
                        <p>{currentProject.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto bg-zinc-950 rounded-[16px] p-[24px] flex flex-col gap-[20px] relative overflow-hidden">
                    <h4 className="relative z-10 text-[18px] font-semibold text-white tracking-tight leading-[1.3] m-0">
                      Chcesz uzyskać podobne rezultaty w swoim biznesie?
                    </h4>
                    <a
                      href="#kontakt"
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="relative z-10 w-fit inline-flex items-center justify-center bg-white text-black px-[24px] py-[12px] rounded-full text-[14px] font-bold transition-transform hover:scale-105 active:scale-95 group"
                    >
                      Porozmawiajmy
                      <ArrowUpRight className="w-[18px] h-[18px] ml-[6px] stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}