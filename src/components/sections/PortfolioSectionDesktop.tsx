'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Maximize } from 'lucide-react';

// Interface dla portfolio item
interface PortfolioItem {
  id: number;
  video: string;
  title: string;
  description: string;
  logo?: string;
  href: string;
}

const portfolioData: PortfolioItem[] = [
  {
    id: 1,
    video: '/_resources/portfolio1.mp4',
    title: 'Strony internetowe już od 1500 zł',
    description: 'Otrzymaj profesjonalną stronę wizytówkę dla swojej firmy w atrakcyjnej cenie.',
    logo: '',
    href: '/pricing/website',
  },
  {
    id: 2,
    video: '/_resources/portfolio7.mp4',
    title: 'Asystenci AI do obsługi twoich klientów',
    description: 'Oferujemy asystentów AI, którzy zwiększają efektywność komunikacji w Twojej firmie.',
    logo: '',
    href: '/pricing/ai-integration',
  },
  {
    id: 3,
    video: '/_resources/portfolio4.mp4',
    title: 'Integracja Email Marketingu z Twoją stroną',
    description: 'Oferujemy integrację email marketingu z Twoją stroną, aby zwiększyć zaangażowanie użytkowników.',
    logo: '',
    href: '/pricing/email-marketing',
  },
  {
    id: 4,
    video: '/_resources/portfolio3.mp4',
    title: 'Chatboty poprawiające user experience',
    description: 'Oferujemy chatboty, które poprawiają interakcję użytkowników z Twoją firmą.',
    logo: '',
    href: '/pricing/ai-integration',
  },
  {
    id: 5,
    video: '/_resources/portfolio6.mp4',
    title: 'Grafika 2D i 3D dla Twojej marki',
    description: 'Tworzymy unikalne grafiki 2D i 3D, które wyróżnią Twoją markę na rynku.',
    logo: '',
    href: '/pricing/graphics',
  },
  {
    id: 6,
    video: '/_resources/portfolio2.mp4',
    title: 'Aplikacje webowe dla firm',
    description: 'Oferujemy kompleksowe usługi tworzenia aplikacji webowych, które idealnie odpowiadają potrzebom Twojej firmy.',
    logo: '',
    href: '/pricing/individual',
  },
];

export default function PortfolioSectionDesktop() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const currentItem = portfolioData[currentIndex];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioData.length);
    setProgress(0);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioData.length) % portfolioData.length);
    setProgress(0);
  };

  // Funkcja fullscreen
  const toggleFullscreen = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!videoContainerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  // Nasłuchuj zmiany fullscreen (np. ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Odtwarzanie video
  useEffect(() => {
    const video = videoRef.current;
    const bgVideo = bgVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.play();

    if (bgVideo) {
      bgVideo.currentTime = 0;
      bgVideo.play();
    }

    const updateProgress = () => {
      const currentTime = video.currentTime;
      const duration = Math.min(video.duration, 6);

      if (currentTime >= 6) {
        goToNext();
        return;
      }

      const progressPercent = (currentTime / duration) * 100;
      setProgress(progressPercent);

      animationFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animationFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentIndex]);

  return (
    <section className="relative bg-black mt-0 pt-0 pb-10 overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 y-10">
        <video
          ref={bgVideoRef}
          src={currentItem.video}
          className="w-full h-full object-cover"
          style={{
            transform: 'scale(1.03)',
            willChange: 'transform',
            filter: 'brightness(1) saturate(110%)',
          }}
          muted
          playsInline
          loop={false}
        />
        
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: 'blur(36px) saturate(140%)',
            WebkitBackdropFilter: 'blur(36px) saturate(140%)',
            background: 'rgba(255,255,255,0.02)',
            willChange: 'backdrop-filter, opacity',
          }}
        />
        
        <div 
          className="absolute -top-20 left-0 right-0"
          style={{
            height: 'calc(100% + 20px)',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.99) 15%, rgba(0, 0, 0, 0) 100%)',
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.99) 90%)',
          }}
        />

        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25) 20%)',
          }}
        />
        
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25) 20%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-0 md:px-0">
        
        {/* NAGŁÓWEK + PRZYCISKI */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-3xl text-white/80 text-left">
            Nasze realizacje:
          </h2>

          <div className="flex items-center gap-3">
            <button
              onClick={goToPrev}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white/70 border border-white/20 flex items-center justify-center transition-all duration-300 active:scale-95 hover:cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </button>
            <button
              onClick={goToNext}
              className="w-8 h-8 rounded-full bg-white/80 hover:bg-white/70 border border-white/20 flex items-center justify-center transition-all duration-300 active:scale-95 hover:cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>
          </div>
        </div>

        {/* VIDEO PLAYER */}
        <div
          ref={videoContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="block relative w-full rounded-3xl overflow-hidden bg-black transition-transform duration-500 hover:scale-[1.02] cursor-pointer"
          style={{
            boxShadow: isHovered
              ? '0 30px 80px rgba(255,255,255,0.06), 0 0 120px rgba(255,255,255,0.04)'
              : undefined,
          }}
        >
          <video
            ref={videoRef}
            src={currentItem.video}
            className="w-full h-auto aspect-video object-cover"
            muted
            playsInline
          />

          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: isHovered
                ? 'radial-gradient(closest-side, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 30%, transparent 60%)'
                : 'transparent',
              opacity: isHovered ? 1 : 0,
              mixBlendMode: 'screen',
            }}
          />

          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.35) 20%, rgba(0, 0, 0, 1) 100%)',
            }}
          />

          {currentItem.logo && (
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
              <img
                src={currentItem.logo}
                alt="Logo"
                className="h-16 w-auto"
              />
            </div>
          )}

          {/* TYTUŁ I OPIS */}
          <a href={currentItem.href} className="absolute bottom-16 left-8 z-20 block">
            <h3 className="text-white text-4xl font-base mb-2 drop-shadow-lg max-w-4xl">
              {currentItem.title}
            </h3>
            <p className="text-gray-200 text-xl font-thin drop-shadow-lg max-w-2xl">
              {currentItem.description}
            </p>
          </a>

          {/* PRZYCISKI W PRAWYM DOLNYM ROGU */}
          <div className="absolute bottom-8 right-8 z-20 flex items-center gap-3">
            {/* PRZYCISK FULLSCREEN */}
            <button
              type="button"
              aria-label="Fullscreen"
              onClick={toggleFullscreen}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:cursor-pointer text-white bg-black transition-colors"
            >
              <Maximize className="w-5 h-5 text-white" />
            </button>

            {/* PRZYCISK ZOBACZ SZCZEGÓŁY */}
            <button
              type="button"
              aria-label="Zobacz szczegóły projektu"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof window !== 'undefined') {
                  window.location.href = currentItem.href;
                }
              }}
              className="group inline-flex items-center gap-3 rounded-full px-4 py-3 shadow-lg  hover:scale-105 transform transition duration-300 hover:shadow-2xl "
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:cursor-pointer text-white bg-black transition-colors">
                <ExternalLink className="w-5 h-5" />
              </span>
              <span className="text-white font-medium tracking-tight hover:cursor-pointer">Zobacz szczegóły</span>
            </button>
          </div>

          {/* PASEK POSTĘPU */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
            <div
              className="h-full bg-white/30"
              style={{ 
                width: `${progress}%`,
              }}
            />
          </div>
        </div>

        {/* KROPKI */}
        <div className="flex justify-center items-center gap-2 mt-6 relative h-2">
          {portfolioData.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setProgress(0);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}