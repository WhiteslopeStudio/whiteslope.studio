"use client";

import { motion } from "framer-motion";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useAdvancedInView, useDragScroll, useScrollContainerStyles, useMobileDetection } from "@/utils/hooks";
import { ProjectExample } from "@/lib/types";
import { PROJECT_EXAMPLES } from "@/lib/data";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export const PortfolioSection = () => {
  const [ref, inView] = useAdvancedInView();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingDirection, setAnimatingDirection] = useState<'left' | 'right' | null>(null);
  const isMobile = useMobileDetection();

  const {
    scrollContainerRef,
    isDragging,
    handleMouseDown,
    handleMouseUp,
    handleMouseLeave,
    handleMouseMove,
    handleItemClick,
  } = useDragScroll<ProjectExample>();

  useScrollContainerStyles(isMobile);

  const currentProject = PROJECT_EXAMPLES[activeIndex];
  const backgroundImage = currentProject?.image;

  const updateActiveIndex = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const cards = container.querySelectorAll('.scroll-item');
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardElement.offsetLeft + cardRect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== activeIndex && !isAnimating) {
      setActiveIndex(closestIndex);
    }
  }, [activeIndex, isAnimating]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(updateActiveIndex, 100);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [updateActiveIndex]);

  const handleProjectClick = (project: ProjectExample) => {
    if (project.href) {
      window.open(project.href, '_blank');
    }
  };

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current || isAnimating) return;
    
    setIsAnimating(true);
    setAnimatingDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);

    const container = scrollContainerRef.current;
    const targetCard = container.querySelector(`.scroll-item:nth-child(${index + 1})`) as HTMLElement;
    
    if (targetCard) {
      const containerCenter = container.clientWidth / 2;
      const cardCenter = targetCard.offsetLeft + targetCard.clientWidth / 2;
      const scrollLeft = cardCenter - containerCenter;
      
      container.scrollTo({ 
        left: Math.max(0, scrollLeft), 
        behavior: 'smooth' 
      });
    }

    setTimeout(() => {
      setIsAnimating(false);
      setAnimatingDirection(null);
    }, 200);
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      scrollToIndex(activeIndex - 1);
    }
  };

  const scrollRight = () => {
    if (activeIndex < PROJECT_EXAMPLES.length - 1) {
      scrollToIndex(activeIndex + 1);
    }
  };

  const handleDotClick = (index: number) => {
    scrollToIndex(index);
  };

  // Style dla maski fade na krawędziach (tylko na desktopie)
  const scrollContainerStyle: React.CSSProperties = {
    paddingLeft: isMobile ? '1rem' : 'calc(50% - (min(80vw, 45vw) / 2))',
    paddingRight: isMobile ? '1rem' : 'calc(50% - (min(80vw, 45vw) / 2))',
    scrollSnapType: isMobile ? 'x mandatory' : undefined,
  };

  if (!isMobile) {
    const fadeWidth = '8rem';
    const maskGradient = `linear-gradient(to right, transparent 0, black ${fadeWidth}, black calc(100% - ${fadeWidth}), transparent 100%)`;
    scrollContainerStyle.maskImage = maskGradient;
    scrollContainerStyle.WebkitMaskImage = maskGradient;
  }

  return (
    <section
      ref={ref}
      id="portfolio"
      className="pt-6 md:pt-20 relative overflow-hidden"
      style={{
        backgroundColor: '#000000',
      }}
    >
      {/* DYNAMICZNE TŁO */}
      <div
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(20px) brightness(0.3)',
          transform: 'scale(1.1)',
        }}
      />

      <div className="absolute inset-0 bg-black/60" />

      {/* Zawartość */}
      <div className="relative z-10 pb-6 md:pb-20">
        {/* Nagłówek */}
        <style jsx>{`
          .platinum-text {
            background: linear-gradient(
              90deg,
              #94a3b8 0%,
              #e2e8f0 25%,
              #f8fafc 50%,
              #e2e8f0 75%,
              #94a3b8 100%
            );
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
          }
        `}</style>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-6 md:mb-16">
            <h2 className="text-3xl lg:text-5xl font-semibold">
              <span className="platinum-text">
                Odkryj strony od <span className="font-semibold">Whiteslope Studio</span>
              </span>
            </h2>
          </div>
        </div>

        {/* Karty projektów */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className={`scroll-container flex gap-8 md:gap-8 lg:gap-12 overflow-x-auto py-4 md:py-6 ${
              isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
            } ${isMobile ? 'px-0' : 'px-4 md:px-6'}`}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            style={scrollContainerStyle}
          >
            {PROJECT_EXAMPLES.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="scroll-item flex-shrink-0 group cursor-pointer"
                onClick={() => handleItemClick(project, handleProjectClick)}
                style={{ scrollSnapAlign: 'center', width: isMobile ? '90vw' : undefined }}
              >
                {/* Project Card */}
                <div
                  className="relative w-[90vw] md:w-[80vw] sm:w-[70vw] lg:w-[60vw] xl:w-[vw] overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]"
                  style={{ 
                    borderRadius: isMobile ? "8px" : "20px",
                    width: isMobile ? '90vw' : undefined,
                  }}
                >
                  <div className="relative w-full aspect-[16/9] overflow-hidden group" style={{ borderRadius: isMobile ? "8px" : "20px" }}>
                    <Image
                      src={project.image}
                      alt={`Realizacja strony internetowej ${project.title} przez WHITESLOPE STUDIO`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 90vw, (max-width: 768px) 70vw, (max-width: 1024px) 65vw, (max-width: 1280px) 60vw, 55vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>

                  {/* Przycisk w prawym dolnym rogu */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <div className="w-10 h-10 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-sm transform hover:scale-110 active:scale-95 pointer-events-none">
                      <ExternalLink className="w-4 h-4 md:w-8 md:h-8" />
                    </div>
                  </div>

                  {/* Tekst i opis - różne dla mobile i desktop */}
                  {isMobile ? (
                    <div className="relative bg-black/80 p-4 rounded-b-8px">
                      <div className="text-white">
                        <div className="inline-block mb-2 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold text-white border border-white/20">
                          {project.category}
                        </div>
                        <h3 className="text-base font-bold mb-1">
                          {project.title}
                        </h3>
                        <p className="text-gray-300 text-xs leading-relaxed mb-2">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          <span>Projekt zakończony i działający</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Tekst w lewym dolnym rogu - UKRYWA SIĘ NA HOVER (DESKTOP) */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 md:p-8 z-20 pointer-events-none transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-4">
                        <div className="text-white">
                          <h3 className="text-xl md:text-4xl font-bold mb-2">
                            {project.title}
                          </h3>
                          <div className="text-gray-300 md:text-2xl font-medium">
                            Zobacz Podgląd
                          </div>
                        </div>
                      </div>

                      {/* OPIS WYJEŻDŻAJĄCY Z DOŁU NA HOVER (tylko desktop) */}
                      <div 
                        className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 pointer-events-none overflow-hidden"
                        style={{ borderRadius: "20px" }}
                      >
                        <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="inline-block mb-3 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-semibold text-white border border-white/20">
                            {project.category}
                          </div>
                          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span>Projekt zakończony i działający</span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* macOS-style Page Indicator */}
          <div className="flex justify-center items-center gap-3 mt-4 md:mt-8 pb-4">
            <button
              onClick={scrollLeft}
              disabled={activeIndex === 0}
              className={`w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 ${
                activeIndex === 0 
                  ? 'text-white/30' 
                  : 'text-white/60 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 relative overflow-hidden">
              {PROJECT_EXAMPLES.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  onClick={() => handleDotClick(index)}
                  className="w-2 h-2 rounded-full bg-white/30 transition-all duration-200 hover:bg-white/50 cursor-pointer"
                  aria-label={`Przejdź do slajdu ${index + 1}`}
                />
              ))}
              
              <div
                className={`absolute w-2 h-2 bg-white pointer-events-none transition-all ease-out ${
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
              disabled={activeIndex === PROJECT_EXAMPLES.length - 1}
              className={`w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 ${
                activeIndex === PROJECT_EXAMPLES.length - 1
                  ? 'text-white/30'
                  : 'text-white/60 hover:text-white cursor-pointer'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Gradient bar na dole */}
<div
  className="w-full py-4 relative z-30"
  style={{
    background: 'linear-gradient(to right, #000000eb, #000000eb)',
  }}
>
  <div className="container mx-auto px-4 md:px-6">
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
      <span className="text-white text-sm md:text-xl font-medium">
        Współpracowaliśmy z:
      </span>
      <div className="flex  flex-row md:flex-row items-center gap-2 md:gap-4 invert">
        <img
          src="_resources/wieslawski-studio-logo.webp"
          alt="Wiesławski Studio"
          className="h-6 md:h-10 w-auto object-contain"
        />
        <img
          src="_resources/logo-PatrykKulesza.webp"
          alt="Patryk Kulesza - Korepetacje"
          className="h-6 md:h-10 w-auto object-contain"
        />
      </div>
    </div>
  </div>
</div>
    </section>
  );
};