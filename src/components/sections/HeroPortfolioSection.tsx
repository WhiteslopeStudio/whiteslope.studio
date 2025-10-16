'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface PortfolioItem {
  id: string;
  video: string;
  thumbnail: string;
  benefits: {
    percentage: string;
    description: string;
    company: string;
    logo?: string;
  };
}

export interface HeroPortfolioSectionProps {
  portfolioItems: PortfolioItem[];
}

export const HeroPortfolioSection = ({ portfolioItems }: HeroPortfolioSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState<string | null>(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});

  // GSAP ScrollTrigger - tylko w przeglądarce
  useEffect(() => {
    // Sprawdź czy jesteśmy w przeglądarce
    if (typeof window === 'undefined') return;
    
    // Zarejestruj plugin
    gsap.registerPlugin(ScrollTrigger);
    
    if (!sectionRef.current || !cardsContainerRef.current) return;

    const section = sectionRef.current;
    const cards = cardsContainerRef.current;

    // Animacja GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=100vh', // Animacja przez 100vh scrollowania
        // Reduced scrub to lower continuous layout/paint cost
        scrub: 0.6,
        pin: true,
        markers: false,
        onUpdate: (self) => {
          console.log('ScrollTrigger progress:', self.progress);
          if (self.progress > 0.9) {
            setAnimationComplete(true);
          } else {
            setAnimationComplete(false);
          }
        },
      },
    });

    tl.fromTo(
      cards,
      {
        y: '50vh', // Start - widać tylko czubki
        scale: 0.8,
      },
      {
        y: '0vh', // Koniec - pełne karty
        scale: 1,
        ease: 'power2.out',
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Auto-scroll kart PRZED animacją
  useEffect(() => {
    if (typeof window === 'undefined' || !cardsContainerRef.current) return;

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (animationComplete || prefersReduced) {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      return;
    }

    // Only run auto-scroll when the document is visible
    const tick = () => {
      if (!cardsContainerRef.current) return;
      if (document.hidden) return;

      cardsContainerRef.current.scrollLeft += 2;

      // Loop
      const maxScroll = cardsContainerRef.current.scrollWidth - cardsContainerRef.current.clientWidth;
      if (cardsContainerRef.current.scrollLeft >= maxScroll) {
        cardsContainerRef.current.scrollLeft = 0;
      }
    };

    autoScrollIntervalRef.current = setInterval(tick, 30);

    const handleVisibility = () => {
      if (document.hidden) {
        if (autoScrollIntervalRef.current) {
          clearInterval(autoScrollIntervalRef.current);
          autoScrollIntervalRef.current = null;
        }
      } else {
        if (!autoScrollIntervalRef.current) {
          autoScrollIntervalRef.current = setInterval(tick, 30);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
        autoScrollIntervalRef.current = null;
      }
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [animationComplete]);

  // Cleanup: pause any playing hover videos on unmount
  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach((v) => {
        try {
          if (v) {
            v.pause();
            v.currentTime = 0;
          }
        } catch (e) {
          // ignore
        }
      });
    };
  }, []);

  // Video handlers
  const handleVideoHover = (itemId: string) => {
    setIsPlayingVideo(itemId);
    const video = videoRefs.current[itemId];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleVideoLeave = (itemId: string) => {
    setIsPlayingVideo(null);
    const video = videoRefs.current[itemId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  // Strzałki
  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : portfolioItems.length - 1;
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < portfolioItems.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    scrollToCard(newIndex);
  };

  const scrollToCard = (index: number) => {
    if (!cardsContainerRef.current) return;
    const cardWidth = 650; // Szerokość karty + gap
    const scrollPosition = index * cardWidth - (window.innerWidth / 2) + (cardWidth / 2);
    cardsContainerRef.current.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  };

  if (!portfolioItems || portfolioItems.length === 0) {
    return null;
  }

  return (
    <div
      ref={sectionRef}
      className="relative h-[150vh]"
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
      }}
    >
      {/* Kontener kart - fixed na dole */}
      <div
        ref={cardsContainerRef}
        className="fixed bottom-0 left-0 right-0 h-[70vh] flex items-end overflow-x-auto scrollbar-hide gap-8 px-8 pb-12"
        style={{
          background: 'transparent',
        }}
      >
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 relative rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{
              width: '600px',
              height: '340px', // 16:9 aspect ratio
              background: `linear-gradient(to bottom, #1a1a1a 0%, #0a0a0a 100%)`,
            }}
            onMouseEnter={() => handleVideoHover(item.id)}
            onMouseLeave={() => handleVideoLeave(item.id)}
          >
            {/* Thumbnail jako tło */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.thumbnail})`,
              }}
            />

            {/* Video overlay */}
            <video
              ref={(el) => {
                videoRefs.current[item.id] = el;
              }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isPlayingVideo === item.id ? 'opacity-100' : 'opacity-0'
              }`}
              src={item.video}
              muted
              loop
              playsInline
            />

            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Hover play indicator */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isPlayingVideo === item.id ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="bg-black/50 backdrop-blur-md rounded-xl px-6 py-3">
                <div className="text-white text-sm font-medium flex items-center gap-2">
                  <span className="text-xl">▶️</span>
                  Najedź aby odtworzyć
                </div>
              </div>
            </div>

            {/* Benefits info - lewy dolny */}
            <div className="absolute bottom-6 left-6 z-10">
              <div className="text-5xl font-bold text-white mb-2 drop-shadow-2xl">
                {item.benefits.percentage}
              </div>
              <div className="text-lg text-white/95 mb-1 drop-shadow-xl font-medium">
                {item.benefits.description}
              </div>
              <div className="text-sm text-white/80 drop-shadow-xl">
                {item.benefits.company}
              </div>
            </div>

            {/* Logo */}
            {item.benefits.logo && (
              <div className="absolute top-6 right-6 z-10">
                <img
                  src={item.benefits.logo}
                  alt="Logo"
                  className="h-12 object-contain opacity-90 drop-shadow-xl"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Strzałki - pokazują się po animacji */}
      {animationComplete && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <button
            onClick={handlePrevious}
            className="pointer-events-auto absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full p-4 transition-all duration-300 border border-white/20 shadow-2xl"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={handleNext}
            className="pointer-events-auto absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full p-4 transition-all duration-300 border border-white/20 shadow-2xl"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HeroPortfolioSection;