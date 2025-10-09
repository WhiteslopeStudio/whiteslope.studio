"use client";

import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

// Hook do sprawdzania czy element jest widoczny
const useAdvancedInView = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const ref = (node: HTMLElement | null) => {
    setElement(node);
  };

  useEffect(() => {
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return [ref, inView] as const;
};

// Komponent animowanej liczby
const AnimatedNumber = ({ value, suffix = "", inView }: { value: number, suffix?: string, inView: boolean }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!inView || hasAnimated) return; // Jeśli już było, nie animuj ponownie!
    
    let start = 0;
    const end = value;
    const duration = 3500; // 3.5 sekundy - wolniej!
    const increment = end / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        setHasAnimated(true); // Oznacz że animacja się wykonała
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, inView, hasAnimated]);

  return <>{count}{suffix}</>;
};

export const TestimonialsSection = () => {
  const [ref, inView] = useAdvancedInView();

  return (
    <section 
      ref={ref} 
      id="testimonials" 
      className="py-16 relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(255, 116, 95, 0.06) 0%, #080808 50%)'
      }}
    >
      {/* Siatka EKG w tle - subtelna */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="testimonials-grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 10 50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
            <path d="M 20 0 L 20 50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
            <path d="M 30 0 L 30 50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
            <path d="M 40 0 L 40 50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
            
            <path d="M 0 10 L 50 10" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
            <path d="M 0 20 L 50 20" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
            <path d="M 0 30 L 50 30" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
            <path d="M 0 40 L 50 40" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="0.5" />
            
            <path d="M 0 0 L 0 50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
            <path d="M 50 0 L 50 50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
            <path d="M 0 0 L 50 0" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
            <path d="M 0 50 L 50 50" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#testimonials-grid)" />
      </svg>

      {/* Subtelny gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at bottom left, rgba(255, 116, 95, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(255, 116, 95, 0.02) 0%, transparent 50%)
          `
        }}
      />

      {/* Badge */}
      <div className="flex justify-center mb-8 relative z-10">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-white/60 backdrop-blur-sm border border-white/10">
          <Sparkles className="w-4 h-4" style={{ 
            stroke: 'url(#sparkles-gradient)',
            fill: 'none'
          }} />
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <linearGradient id="sparkles-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#fdba74' }} />
                <stop offset="100%" style={{ stopColor: '#f9a8d4' }} />
              </linearGradient>
            </defs>
          </svg>
          Sprawdzone rezultaty biznesowe
        </span>
      </div>

      {/* NOWY NAGŁÓWEK - bardziej biznesowy */}
      <div className="text-center mb-12 relative z-10 max-w-10xl mx-auto px-4">
        <h2 className="text-4xl lg:text-6xl font-thin text-white tracking-tight mb-4">
          Zobacz jak pomagamy{" "}
          <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
            rozwijać biznesy
          </span>
        </h2>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
          Realne wyniki, mierzalne rezultaty i zadowolnie. Tak pracujemy z każdym klientem.
        </p>
      </div>

      {/* Statystyki - ANIMOWANE z platynowym kolorem! */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes platinum-shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        
        .platinum-text {
          background: linear-gradient(
            90deg,
            #94a3b8 0%,
            #e2e8f0 25%,
            #f8fafc 50%,
            #e2e8f0 75%,
            #94a3b8 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: platinum-shine 6s linear infinite;
        }
      `}} />

      <div className="flex justify-center gap-12 mb-12 flex-wrap px-4 relative z-10">
        <div className="text-center group/stat">
          <div className="text-4xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
            <AnimatedNumber value={24} suffix="h" inView={inView} />
          </div>
          <div className="text-sm text-gray-400 font-medium">Pierwsze zapytania</div>
        </div>
        <div className="text-center group/stat">
          <div className="text-4xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
            <AnimatedNumber value={100} suffix="%" inView={inView} />
          </div>
          <div className="text-sm text-gray-400 font-medium">Zadowolonych klientów</div>
        </div>
        <div className="text-center group/stat">
          <div className="text-4xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
            <AnimatedNumber value={3} suffix=" dni" inView={inView} />
          </div>
          <div className="text-sm text-gray-400 font-medium">Do pierwszych efektów</div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* OPINIE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Karta 1 - Sławek - NOWY STYL HOVER */}
          <motion.div
            className="rounded-2xl p-6 lg:p-8 w-full flex flex-col relative group/card transition-all duration-300"
            style={{
              background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.08) 0%, #0f0f0f 70%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            

            {/* Subtelny border glow na hover */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: '0 0 20px rgba(255, 116, 95, 0.3)',
                border: '1px solid rgba(255, 116, 95, 0.3)'
              }}
            />

            {/* Imię i gwiazdki */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-bold text-lg text-white mb-1">
                  Sławek Wiesławski
                </p>
                <p className="text-sm text-gray-400">
                  Wiesławski Studio
                </p>
              </div>
              
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#ffae00ff' }} />
                ))}
              </div>
            </div>
            
            {/* Opinia */}
            <blockquote className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
              <span className="text-white font-semibold">Szybkość działania jest świetna.</span> Bardzo szybko otrzymywałem odpowiedzi na pytania. Pierwsze <span className="text-white font-semibold">zapytania od klientów</span> pojawiły się po <span className="text-white font-semibold">24h</span> od uruchomienia strony.
            </blockquote>
            
            {/* Logo */}
            <div className="flex justify-start mt-4 pt-4 border-t border-white/5">
              <a 
                href="https://wieslawski.studio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cursor-pointer group/logo"
              >
                <img 
                  src="_resources/wieslawski-studio-logo.webp" 
                  alt="Wiesławski Studio"
                  className="h-7 w-auto object-contain opacity-50 group-hover/logo:opacity-100 transition-opacity"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </a>
            </div>
          </motion.div>

          {/* Karta 2 - Patryk - NOWY STYL HOVER */}
          <motion.div
            className="rounded-2xl p-6 lg:p-8 w-full flex flex-col relative group/card transition-all duration-300"
            style={{
              background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.08) 0%, #0f0f0f 70%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
          >
            

            {/* Subtelny border glow na hover */}
            <div 
              className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                boxShadow: '0 0 20px rgba(255, 116, 95, 0.3)',
                border: '1px solid rgba(255, 116, 95, 0.3)'
              }}
            />

            {/* Imię i gwiazdki */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="font-bold text-lg text-white mb-1">
                  Patryk Kulesza
                </p>
                <p className="text-sm text-gray-400">
                  Korepetycje matematyka, informatyka, angielski
                </p>
              </div>
              
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#ffae00ff' }} />
                ))}
              </div>
            </div>
            
            {/* Opinia */}
            <blockquote className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
              <span className="text-white font-semibold">Już po 3 dniach dostałem bardzo korzystną ofertę pracy.</span> Jestem bardzo zadowolony i strona w końcu sprawia, że <span className="text-white font-semibold">jestem widoczny dla wielu osób.</span>
            </blockquote>
            
            {/* Logo */}
            <div className="flex justify-start mt-4 pt-4 border-t border-white/5">
              <a 
                href="https://patrykkulesza.pl" 
                target="_blank" 
                rel="noopener noreferrer"
                className="cursor-pointer group/logo"
              >
                <img 
                  src="_resources/logo-PatrykKulesza.webp" 
                  alt="Patryk Kulesza - Korepetacje"
                  className="h-7 w-auto object-contain opacity-50 group-hover/logo:opacity-100 transition-opacity"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loga - PRZENIESIONE POD KARTY */}
      <div className="text-center mt-16 p-4 relative z-10">
        <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">Zaufali nam</p>
        <div className="flex gap-8 justify-center flex-wrap">
          <a 
            href="https://patrykkulesza.pl" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center cursor-pointer group"
          >
            <img 
              src="_resources/logo-PatrykKulesza.webp" 
              alt="Patryk Kulesza - Korepetacje"
              className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>
          <a 
            href="https://wieslawski.studio" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center cursor-pointer group"
          >
            <img 
              src="_resources/wieslawski-studio-logo.webp" 
              alt="Wiesławski Studio"
              className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </a>
        </div>
      </div>
    </section>
  );
};