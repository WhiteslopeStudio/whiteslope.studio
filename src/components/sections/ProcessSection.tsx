'use client';

import { useAdvancedInView, useDragScroll, useScrollContainerStyles } from '@/utils/hooks';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/data';
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Play, Pause } from 'lucide-react';

export const ProcessSection = () => {
  const [ref, inView] = useAdvancedInView();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingDirection, setAnimatingDirection] = useState<'left' | 'right' | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);

  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
    handleItemClick,
  } = useDragScroll();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useScrollContainerStyles(isMobile);

  const updateActiveIndex = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const cards = container.querySelectorAll('.scroll-item');
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    setActiveIndex(closestIndex);
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      updateActiveIndex();
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [updateActiveIndex]);

  useEffect(() => {
    if (!autoPlayEnabled || !inView) return;
    
    const autoScrollInterval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const nextIndex = (activeIndex + 1) % PROCESS_STEPS.length;
      const targetCard = container.querySelector(`.scroll-item:nth-child(${nextIndex + 1})`) as HTMLElement;
      
      if (targetCard) {
        const containerCenter = container.clientWidth / 2;
        const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
        const scrollLeft = cardCenter - containerCenter;
        
        container.scrollTo({ 
          left: Math.max(0, scrollLeft), 
          behavior: 'smooth' 
        });
      }
    }, 6000);

    return () => clearInterval(autoScrollInterval);
  }, [activeIndex, autoPlayEnabled, Boolean(inView)]);

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const targetCard = container.querySelector(`.scroll-item:nth-child(${index + 1})`) as HTMLElement;
    
    if (targetCard) {
      setIsAnimating(true);
      setAnimatingDirection(index > activeIndex ? 'right' : 'left');
      
      const containerCenter = container.clientWidth / 2;
      const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
      const scrollLeft = cardCenter - containerCenter;
      
      container.scrollTo({ 
        left: Math.max(0, scrollLeft), 
        behavior: 'smooth' 
      });
      
      setTimeout(() => {
        setIsAnimating(false);
        setAnimatingDirection(null);
      }, 300);
    }
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const scrollRight = () => {
    if (activeIndex < PROCESS_STEPS.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const handleDotClick = (index: number) => {
    scrollToIndex(index);
  };

  const handleStepClick = (step: any) => {
    console.log("Process step clicked:", step);
  };

  const toggleAutoPlay = () => {
    setAutoPlayEnabled(!autoPlayEnabled);
  };

  return (
    <section id="process" ref={ref} className="py-20 bg-black relative overflow-hidden" style={{
        background: 'linear-gradient(0deg, #080808ff 0%, #080808ff 100%)'
      }}>
      
      {/* Gradienty po bokach */}
      <div className="hidden md:block absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-40 pointer-events-none" />
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-40 pointer-events-none" />
      
      <div className="relative z-10">
        {/* NOWY NAGŁÓWEK NA GÓRZE */}
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-4xl lg:text-6xl font-thin text-white mb-4 tracking-tight leading-tight">
              Odkryj proces{" "}
              <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                współpracy
              </span>
            </h2>
            
            
          </motion.div>
        </div>

        {/* OPIS NA DOLE */}
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="rounded-2xl p-8 ">
              
              {/* Opis */}
              <p className="text-white/70 text-base leading-relaxed">
                Naszym celem jest dostarczenie tobie najlepszej usługi, wsparcia i pomocy przy projekcie na każdym etapie jego produkowania.
              </p>
              
              {/* Podpis */}
              <div className="flex items-center justify-end gap-3">
                <div className="w-12 h-px bg-white/20"></div>
                <p className="text-white/50 text-sm italic">
                  Zespół <span className="font-medium">Whiteslope</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Karty procesów */}
        <div className={`relative ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} transition-all duration-700 ease-out mb-16`}>
          <div
            ref={scrollContainerRef}
            className={`scroll-container flex gap-6 md:gap-8 overflow-x-auto py-6 px-6 relative z-10 ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={{
              paddingLeft: 'calc(50% - (min(340px, 90vw) / 2))',
              paddingRight: 'calc(50% - (min(340px, 90vw) / 2))',
            }}
          >
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="scroll-item flex-shrink-0 group cursor-pointer"
                onClick={() => handleItemClick(step, handleStepClick)}
                style={{ scrollSnapAlign: 'center' }}
              >
                <div 
                  className={`relative min-w-[320px] w-[90vw] sm:w-[340px] h-[380px] overflow-hidden transform transition-all duration-300 ${
                    index === activeIndex 
                      ? 'scale-100 opacity-100' 
                      : 'scale-90 opacity-100'
                  }`}
                  style={{ 
                    borderRadius: "24px",
                    background: 'linear-gradient(145deg, #080808, #101010)',
                    border: index === activeIndex 
                      ? '1px solid rgba(184, 184, 184, 0.4)' 
                      : '1px solid rgba(71, 71, 71, 0.15)'
                  }}
                >
                  <div className="absolute top-8 left-8 z-20">
                    <div className="text-6xl font-bold text-white/90">
                      {step.id.toString().padStart(2, '0')}
                    </div>
                  </div>

                  <div className="relative h-full p-8 pt-28 flex flex-col">
                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl text-white font-bold leading-tight mb-3">
                        {step.title}
                      </h3>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-orange-300 to-pink-400"></div>
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {index === activeIndex && (
                    <div className="absolute inset-0 opacity-100 transition-all duration-500 pointer-events-none" style={{ borderRadius: "24px" }}>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-white/3 to-transparent" />
                      <div className="absolute inset-0 ring-1 ring-white/20 rounded-[24px]" />
                    </div>
                  )}

                  <div className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
                    index === activeIndex ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AutoPlay */}
          <div className="flex justify-center mb-4">
            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-white/60 hover:text-white cursor-pointer ${
                autoPlayEnabled 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {autoPlayEnabled ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span className="text-sm font-medium">Zatrzymaj</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-medium">Uruchom</span>
                </>
              )}
            </button>
          </div>

          {/* Nawigacja */}
          <div className="flex justify-center items-center gap-3 pb-4">
            <button
              onClick={scrollLeft}
              disabled={activeIndex === 0}
              className={`w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 ${
                activeIndex === 0 
                  ? 'text-white/30 cursor-not-allowed' 
                  : 'text-white/60 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 relative overflow-hidden">
              {PROCESS_STEPS.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => handleDotClick(index)}
                  className="w-2 h-2 rounded-full bg-white/30 transition-all duration-200 hover:bg-white/50 cursor-pointer"
                  aria-label={`Przejdź do etapu ${index + 1}`}
                />
              ))}
              
              <div
                className={`absolute w-2 h-2 bg-gradient-to-r from-white to-white pointer-events-none transition-all ease-out ${
                  isAnimating ? 'duration-150 rounded-lg' : 'duration-200 rounded-full'
                }`}
                style={{
                  left: `${16 + (activeIndex * 16)}px`,
                  transform: isAnimating
                    ? `translateX(${animatingDirection === 'right' ? '4px' : '-4px'}) scaleX(1.6)`
                    : 'translateX(0) scaleX(1)',
                  transformOrigin: 'center',
                }}
              />
            </div>

            <button
              onClick={scrollRight}
              disabled={activeIndex === PROCESS_STEPS.length - 1}
              className={`w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 ${
                activeIndex === PROCESS_STEPS.length - 1
                  ? 'text-white/30 cursor-not-allowed'
                  : 'text-white/60 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        
      </div>
    </section>
  );
};