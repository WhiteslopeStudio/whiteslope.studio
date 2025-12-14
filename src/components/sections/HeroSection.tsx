'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Linkedin } from 'lucide-react';

const LightRays = ({ className }: any) => {
  return (
    <div 
      className={className} 
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(229, 228, 226, 0.1) 0%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} 
    />
  );
};

// Komponent do animacji pojedynczego elementu
const AnimatedElement = ({ 
  children, 
  delay = 0,
  className = ''
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
        
      }}
    >
      {children}
    </div>
  );
};

// Komponent do animacji tekstu słowo po słowie
const AnimatedText = ({ 
  text, 
  startDelay = 0,
  wordDelay = 0,
  className = '',
  as: Component = 'span'
}: { 
  text: string; 
  startDelay?: number;
  wordDelay?: number;
  className?: string;
  as?: any;
}) => {
  const words = text.split(' ');

  return (
    <Component className={className}>
      {words.map((word, index) => (
        <AnimatedElement 
          key={index} 
          delay={startDelay + (index * wordDelay)}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </AnimatedElement>
      ))}
    </Component>
  );
};

export const linkedinProfiles = [
  {
    name: 'Patryk Kulesza',
    link: 'https://www.linkedin.com/in/patryk-kulesza-788397354/',
    image: '/_resources/patryk.webp',
  },
  {
    name: 'Mateusz Malewski',
    link: 'https://www.linkedin.com/in/mateusz-malewski-b0834927b/',
    image: '/_resources/mati.webp',
  },
  {
    name: 'Bartłomiej Koźluk',
    link: 'https://www.linkedin.com/in/bart%C5%82omiej-ko%C5%BAluk-5a5391266/',
    image: 'https://static.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry',
  },
  {
    name: 'Daniel Wawrzos',
    link: 'https://www.linkedin.com/in/daniel-wawrzos-34b973338/',
    image: '/_resources/daniel.webp',
  },
];

export default function HeroSection({ cityOverride }: { cityOverride?: string } = {}) {
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);
  const [mousePos1, setMousePos1] = useState({ x: 50, y: 50 });
  const [mousePos2, setMousePos2] = useState({ x: 50, y: 50 });
  const [isButton1Hovered, setIsButton1Hovered] = useState(false);
  const [isButton2Hovered, setIsButton2Hovered] = useState(false);

  const handleMouseMove1 = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isButton1Hovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos1({ x, y });
  };

  const handleMouseMove2 = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isButton2Hovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos2({ x, y });
  };

  const getAvatarPosition = (index: number, total: number) => {
    if (hoveredAvatar === null) {
      return {
        x: (index - (total - 1) / 2) * 30,
        scale: 1,
        zIndex: total - index,
      };
    }
    if (hoveredAvatar === index) {
      return {
        x: 0,
        scale: 1.2,
        zIndex: total,
      };
    }
    if (index < hoveredAvatar) {
      return {
        x: -60 * (hoveredAvatar - index),
        scale: 0.9,
        zIndex: total - index,
      };
    } else {
      return {
        x: 60 * (index - hoveredAvatar),
        scale: 0.9,
        zIndex: total - index,
      };
    }
  };

  return (
    <section 
      className="relative bg-black overflow-hidden py-40 md:pt-67"
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* TŁO - wszystkie gradienty i efekty */}
        <div className="absolute inset-0">
          <LightRays className="absolute inset-0" />
          
          {/* Lewy gradient */}
          <div
            className="absolute bottom-0 left-1/2"
            style={{
              width: '150px',
              height: '120%',
              background: 'linear-gradient(180deg, rgba(229, 228, 226, 0.05) 0%, transparent 100%)',
              transform: 'translateX(-50%) translateX(-200px) rotate(-30deg)',
              filter: 'blur(40px)',
              mixBlendMode: 'screen',
            }}
          />
          
          {/* Środkowy gradient */}
          <div
            className="absolute bottom-0 left-1/2"
            style={{
              width: '180px',
              height: '120%',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
              transform: 'translateX(-50%)',
              filter: 'blur(50px)',
              mixBlendMode: 'screen',
            }}
          />
          
          {/* Prawy gradient */}
          <div
            className="absolute bottom-0 left-1/2"
            style={{
              width: '150px',
              height: '120%',
              background: 'linear-gradient(180deg, rgba(229, 228, 226, 0.05) 0%, transparent 100%)',
              transform: 'translateX(-50%) translateX(200px) rotate(30deg)',
              filter: 'blur(40px)',
              mixBlendMode: 'screen',
            }}
          />
        </div>

        {/* Noise */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Ciemne overlay */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 10%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.65) 70%)',
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center flex flex-col justify-center items-center">
            <div className="space-y-5 max-w-full">
              
              {/* H1 - KRÓTSZE I SKUPIONE - digitalizacja firm */}
              <AnimatedElement delay={0}>
                <h1 className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 animate-pulse" />
                  <span className="text-sm font-medium text-gray-300">
                    Tworzymy strony internetowe i upraszczamy codzienne funkcjonowanie firm z Podlasia.
                  </span>
                </h1>
              </AnimatedElement>

              {/* NAGŁÓWEK GŁÓWNY - H2 - każde słowo osobno */}
              <h2 
                className="relative"
                style={{
                  fontSize: 'clamp(3rem, 8vw, 5rem)',
                  lineHeight: '0.95',
                  letterSpacing: '-0.03em',
                  marginTop: '1rem',
                  fontWeight: 575,
                }}
              >
                <span 
                  className="text-white"
                  style={{
                    textShadow: '0 0 80px rgba(253, 159, 145, 0.3)',
                  }}
                >
                  <AnimatedText 
                    text="Pokaż się online" 
                    startDelay={200}
                    wordDelay={120}
                  />
                  <br/>
                  <AnimatedText 
                    text="z dobrej strony!" 
                    startDelay={560}
                    wordDelay={120}
                  />
                </span>
              </h2>

              {/* PODTYTUŁ - animowany jako całość z większym opóźnieniem */}
              <AnimatedElement delay={920}>
                <p 
                  className="text-gray-400 text-xl md:text-xl leading-relaxed max-w-2xl mx-auto font-semibold"
                  style={{
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  }}
                >
                  Tworzymy Strony Internetowe dla biznesów i osób prywatnych. Pozwól sobie pozwalać na więcej wraz ze stroną!
                </p>
              </AnimatedElement>

              {/* PRZYCISKI - każdy osobno */}
              <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">
                <AnimatedElement delay={1100}>
                  <a
                    href="/pricing/website"
                    onMouseMove={handleMouseMove2}
                    onMouseEnter={() => setIsButton2Hovered(true)}
                    onMouseLeave={() => {
                      setIsButton2Hovered(false);
                      setMousePos2({ x: 50, y: 50 });
                    }}
                    className="w-full sm:w-auto h-12 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] inline-flex"
                    style={{
                      background: `radial-gradient(circle at ${mousePos2.x}% ${mousePos2.y}%, #248affff, #248affff 30%, #1c86ffff 60%, #1985ff`,
                    }}
                  >
                    <span className="relative z-10 text-white h-full w-full flex items-center justify-center gap-2 px-8 font-semibold">
                      Stwórzmy stronę
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </AnimatedElement>

                <AnimatedElement delay={1250}>
                  <a
                    href="/contact#contact-form"
                    onMouseMove={handleMouseMove1}
                    onMouseEnter={() => setIsButton1Hovered(true)}
                    onMouseLeave={() => {
                      setIsButton1Hovered(false);
                      setMousePos1({ x: 50, y: 50 });
                    }}
                    className="w-full sm:w-auto h-12 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] inline-flex"
                    style={{
                      background: `radial-gradient(circle at ${mousePos1.x}% ${mousePos1.y}%, #fffffff5 0%, #ffffffec 30%, #ffffffe3 60%, #ffffffda 100%)`,
                    }}
                  >
                    <span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">
                      Bezpłatna konsultacja
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </a>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Named export for dynamic city pages
export { HeroSection };