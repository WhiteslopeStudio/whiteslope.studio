'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  MonitorPlay, 
  VideoCamera, 
  Broadcast, 
} from "@phosphor-icons/react";
import { PrimaryButton } from '@/components/ui/Button';

const YELLOW = '#ffde52'; 
const GRAY_LIGHT = '#a1a1a1';
const GRAY_BORDER = '#262626';

const VIDEO_SERVICES = [
  { 
    id: 'film', 
    title: 'Video Marketing', 
    icon: VideoCamera, 
    description: 'Produkcje filmowe 4K Brand Story.',
    longDescription: 'Tworzymy luksusowe filmy dokumentalne i opowieści o markach, które budują autorytet i emocjonalną więź z Twoim klientem.',
    type: 'mp4',
    src: '/_resources/videoMarketing/WieslawskiStudioFilm.mp4' 
  },
  { 
    id: 'ugc', 
    title: 'UGC', 
    icon: Broadcast, 
    description: 'User Generated Content.',
    longDescription: 'Autentyczne treści od twórców, które nie wyglądają jak reklama. Idealne do budowania zaufania w kampaniach na TikTok i Reels.',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/nGAbHUE1eyI' 
  },
  { 
    id: 'ads', 
    title: 'Film marketingowy', 
    icon: MonitorPlay, 
    description: 'Reklamy pod konwersję (Ads).',
    longDescription: 'Dynamiczne kreacje wideo zoptymalizowane pod wysoki CTR. Skupiamy się na "scroll-stoppers", które natychmiast przyciągają uwagę.',
    type: 'mp4',
    src: '/_resources/videoMarketing/VoucheryNagranie.mp4' 
  },
];

export default function VideoShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = VIDEO_SERVICES[activeIdx];

  const next = () => setActiveIdx((i) => (i + 1) % VIDEO_SERVICES.length);
  const prev = () => setActiveIdx((i) => (i - 1 + VIDEO_SERVICES.length) % VIDEO_SERVICES.length);

  useEffect(() => {
    if (active.type === 'mp4' && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeIdx, active.type]);

  return (
    <section className="relative w-full bg-black py-24 overflow-hidden border-t" style={{ borderColor: GRAY_BORDER }}>
      
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${GRAY_LIGHT} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[850px]">
        
        {/* --- LEWO: Treść (50%) --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left px-6 md:px-12 lg:px-20 z-10 py-4">
          
          <div className="w-full flex justify-start mb-16">
             <img 
              src="/_resources/logos/whiteslopeStudioLogoZolty_dzialAMARKETING.webp"
              className="h-14 md:h-16 object-contain"
              alt="Logo Marketing"
            />
          </div>

          <h2 
            className="text-[#ffffff] text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.15] mb-8 uppercase"
            style={{
              fontFamily: 'var(--font-unbounded), sans-serif',
       
            }}
          >
            Produkcja contentu i  <br /> 
            wizerunek marki premium <span style={{ color: YELLOW }}></span>
          </h2>

          <h3 className="text-white text-lg md:text-xl font-bold leading-snug mb-12 max-w-xl opacity-90">
             Filmy i tworzenie contentu to potężne narzędzie do zwiększania ruchu i zaufania Twojej marki.
          </h3>

          <div className="flex flex-wrap gap-2 mb-10">
            {VIDEO_SERVICES.map((service, i) => {
              const isActive = activeIdx === i;
              const Icon = service.icon;
              
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveIdx(i)}
                  className="group relative inline-flex items-center justify-center px-6 py-3 border cursor-pointer select-none overflow-hidden transition-none"
                  style={{ 
                    backgroundColor: isActive ? '#ffffff' : 'transparent',
                    color: isActive ? '#000000' : GRAY_LIGHT,
                    borderColor: isActive ? '#ffffff' : GRAY_BORDER,
                  }}
                >
                  <div className="relative flex items-center gap-2">
                    <div className="transition-all duration-200 group-hover:scale-0 group-hover:opacity-0 group-hover:w-0">
                      <Icon size={18} weight="bold" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-tight">{service.title}</span>
                    <div className="absolute -right-6 opacity-0 translate-x-4 transition-all duration-200 group-hover:relative group-hover:right-0 group-hover:opacity-100 group-hover:translate-x-0">
                      <ArrowRight size={18} weight="bold" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="min-h-[160px] w-full mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12" style={{ backgroundColor: YELLOW }} />
                <p className="text-base font-bold uppercase tracking-tighter" style={{ color: YELLOW }}>
                  {active.description}
                </p>
              </div>
              <p className="text-lg md:text-xl leading-relaxed max-w-md" style={{ color: GRAY_LIGHT }}>
                {active.longDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 mt-auto w-full pt-8 border-t" style={{ borderColor: GRAY_BORDER }}>
            <PrimaryButton 
              href="/pricing/video-marketing"
              className="!bg-[#ffde52] !text-black !border-[#ffde52] hover:!bg-white hover:!text-black transition-none"
            >
              Wybierz
            </PrimaryButton>
          </div>
        </div>

        {/* --- PRAWO: VIDEO PLAYER (50%) --- */}
        {/* USUNIĘTO lg:border-l */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center p-6 md:p-12 lg:px-20" style={{ borderColor: GRAY_BORDER }}>
          
          <div className="relative w-full aspect-video bg-black overflow-hidden mb-8 border border-[#262626]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {active.type === 'youtube' ? (
                  <iframe 
                    src={`${active.src}?autoplay=1&mute=1&controls=0&loop=1&playlist=${active.src.split('/').pop()}`} 
                    className="w-full h-full" 
                    allow="autoplay; encrypted-media" 
                  />
                ) : (
                  <video 
                    ref={videoRef}
                    src={active.src} 
                    className="w-full h-full object-cover" 
                    muted loop playsInline autoPlay 
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative w-full group">
            <div className="flex items-center gap-4">
              {/* Lewa Strzałka - teraz zmienia film */}
              <button 
                onClick={prev}
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
              >
                <ArrowLeft size={22} weight="bold" />
              </button>

              <div 
                id="thumb-container"
                className="flex-1 flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-2"
              >
                {VIDEO_SERVICES.map((v, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setActiveIdx(i)}
                      className={`relative flex-shrink-0 w-32 md:w-40 aspect-video transition-opacity duration-200 cursor-pointer ${
                        isActive ? 'opacity-100 border-white' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="w-full h-full border border-[#262626] overflow-hidden">
                        {v.type === 'mp4' ? (
                          <video src={v.src} className="w-full h-full object-cover" muted />
                        ) : (
                          <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                            <MonitorPlay size={20} className="text-white/20" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Prawa Strzałka - teraz zmienia film */}
              <button 
                onClick={next}
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
              >
                <ArrowRight size={22} weight="bold" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}