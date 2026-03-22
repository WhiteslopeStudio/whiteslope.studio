'use client';

import { useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react'; 
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { VideoPlayer } from '@/components/ui/video-player';

const BLUE = '#0088ff';
const GRAY_LIGHT = '#a1a1a1';
const GRAY_BORDER = '#262626';

interface HeroSectionProps {
  cityOverride?: string;
}

export default function HeroSection({ cityOverride }: HeroSectionProps = {}) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const serviceCards = [
    { title: 'WEB DEVELOPMENT', tags: ['NEXTJS', 'SAAS'], href: '/pricing/website' },
    { title: 'AUTOMATYZACJA', tags: ['WORKFLOW', 'API'], href: '/pricing/ai-integration' },
    { title: 'INTEGRACJA AI', tags: ['LLM', 'CHATBOTS'], href: '/pricing/ai-integration' },
    { title: 'MARKETING', tags: ['ADS', 'VIDEO', 'GRAFIKA'], href: '/pricing/video-marketing' },
  ];

  return (
    <section className="relative w-full bg-black pt-24 overflow-hidden">
      
      {/* TŁO: Subtelna siatka */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${GRAY_LIGHT} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* --- GÓRA: Tekst i Video (Breakpoint 1550px) --- */}
      <div className="flex flex-col min-[1550px]:flex-row w-full items-center mb-20">
        
        {/* LEWA STRONA: Tekst */}
        <div className="w-full min-[1550px]:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col justify-center">
          <div className="inline-flex items-center gap-3 mb-10">
            <div className="w-1.5 h-1.5" style={{ backgroundColor: BLUE }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: GRAY_LIGHT }}>
              Whiteslope Studio // 2026
            </span>
          </div>

          <h1 
            className="text-white font-bold uppercase mb-12"
            style={{
              fontFamily: 'var(--font-unbounded), sans-serif',
              // clamp(minimalny_rozmiar, płynny_rozmiar_vw, maksymalny_rozmiar)
              fontSize: 'clamp(2.5rem, 7.5vw, 5rem)', 
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
            }}
          >
            {cityOverride ? (
              <>
                Strony internetowe {cityOverride} <br />
                od 1500 zł
              </>
            ) : (
              <>
                Pokaż się
                 Online<br/>
                z dobrej strony
              </>
            )}
          </h1>

          <div className="space-y-12">
            <p className="text-xl md:text-2xl max-w-xl font-medium leading-tight" style={{ color: GRAY_LIGHT }}>
              Tworzymy rozwiązania dla firm, które chcą dominować. 
              <span className="text-white font-bold italic"> Precyzyjny kod, bezkompromisowy design.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full pt-4">
              <PrimaryButton 
                href="/pricing/website"
                className="!bg-white !text-black !border-white hover:!bg-white/90 hover:!text-black"
              >
                Skonsultuj projekt
              </PrimaryButton>
              <SecondaryButton href="/projects">Zobacz Projekty</SecondaryButton>
            </div>
          </div>
        </div>

        {/* PRAWA STRONA: Video (16:9) - pod spodem poniżej 1550px */}
        <div className="w-full min-[1550px]:w-1/2 flex items-center justify-center  md:p-12 lg:p-20">
           <div className="w-full  min-[1550px]:max-w-none relative aspect-video">
             
             <VideoPlayer 
                src="https://pub-c2d7458e97204bc98fe71a8e5e6d184c.r2.dev/Wersja4.CompressedWEBM.webm"
                accentColor={BLUE}
                className="w-full h-full object-cover border border-white/5" 
              />
           </div>
        </div>
      </div>

      {/* --- SEKCJA: W czym możemy Ci pomóc --- */}
      <div className="w-full px-6 md:px-12 lg:px-20 py-16 border-b" style={{ borderColor: GRAY_BORDER }}>
        <h3 
          className="text-white text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-unbounded), sans-serif' }}
        >
          W czym możemy <br />
          Ci pomóc?
        </h3>
      </div>

      {/* --- DÓŁ: Service Grid z kreskami od spodu --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {serviceCards.map((card, index) => (
          <a
            key={index}
            href={card.href}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            className="group p-10 cursor-pointer relative overflow-hidden h-72 flex flex-col justify-between border-b lg:border-r lg:last:border-r-0"
            style={{ 
              borderColor: GRAY_BORDER, 
              backgroundColor: hoveredCard === index ? '#ffffff' : 'transparent',
              transition: 'none' 
            }}
          >
            <div className="flex justify-between items-start">
              <span className="text-[12px] font-mono font-bold" style={{ color: hoveredCard === index ? '#000000' : GRAY_LIGHT }}>
                0{index + 1}
              </span>
            </div>

            <div>
              <h4 
                className="text-2xl font-bold uppercase mb-2"
                style={{ color: hoveredCard === index ? '#000000' : '#ffffff' }}
              >
                {card.title}
              </h4>
              <div className="flex gap-2">
                {card.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-black opacity-30 tracking-widest" 
                        style={{ color: hoveredCard === index ? '#000000' : '#ffffff' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`absolute bottom-10 right-10 transition-none ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}>
               <ArrowRight size={32} weight="bold" color="#000000" />
            </div>
          </a>
        ))}
      </div>

      
    </section>
  );
}