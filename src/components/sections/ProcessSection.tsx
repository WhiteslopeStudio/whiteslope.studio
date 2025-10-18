import { useAdvancedInView, useDragScroll, useScrollContainerStyles } from '@/utils/hooks';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '@/lib/data';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { FaFilePdf, FaDownload } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  company: string;
  companyUrl: string;
  logo: string;
  rating: number;
  text: string;
  highlight: string[];
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sławek Wiesławski',
    company: 'Wiesławski Studio',
    companyUrl: 'https://wieslawski.studio',
    logo: '_resources/wieslawski-studio-logo.webp',
    rating: 5,
    text: 'Szybkość działania jest świetna. Bardzo szybko otrzymywałem odpowiedzi na pytania. Pierwsze zapytania od klientów pojawiły się po 24h od uruchomienia strony.',
    highlight: ['Szybkość działania', 'zapytania od klientów', '24h'],
  },
  {
    id: 2,
    name: 'Patryk Kulesza',
    company: 'Korepetycje',
    companyUrl: 'https://patrykkulesza.pl',
    logo: '_resources/logo-PatrykKulesza.webp',
    rating: 5,
    text: 'Już po 3 dniach dostałem bardzo korzystną ofertę pracy. Jestem bardzo zadowolony i strona w końcu sprawia, że jestem widoczny dla wielu osób.',
    highlight: ['3 dniach', 'ofertę pracy', 'jestem widoczny'],
  },
  {
    id: 3,
    name: 'Mati',
    company: 'YouTuber',
    companyUrl: 'https://www.youtube.com/@_Mati__',
    logo: '_resources/mati_logo.webp.webp',
    rating: 5,
    text: 'Profesjonalna obsługa i szybka realizacja. Strona dokładnie taka jak chciałem, a wsparcie techniczne na najwyższym poziomie.',
    highlight: ['Profesjonalna obsługa', 'szybka realizacja', 'najwyższym poziomie'],
  },
];

const stats = [
  { value: '24h', label: 'Pierwsze zapytania po starcie strony' },
  { value: '100%', label: 'Zadowolonych klientów' },
  { value: '3 dni', label: 'Do pierwszych ofert pracy' },
];

export const ProcessSection = () => {
  const [ref, inView] = useAdvancedInView();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const AUTO_PLAY_DURATION = 7000;
  

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (inView && !hasVisited) {
      setHasVisited(true);
      setActiveIndex(0);
      setProgress(0);
    }
  }, [inView, hasVisited]);

  useEffect(() => {
    if (!autoPlayEnabled || !inView || !hasVisited) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setProgress(0);
      }
      return;
    }

    const startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = (elapsed / AUTO_PLAY_DURATION) * 100;

      if (newProgress >= 100) {
        setProgress(0);
        setActiveIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
      } else {
        setProgress(newProgress);
      }
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [autoPlayEnabled, inView, hasVisited, activeIndex]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const scrollLeft = () => {
    if (activeIndex > 0) {
      goToSlide(activeIndex - 1);
    }
  };

  const scrollRight = () => {
    if (activeIndex < PROCESS_STEPS.length - 1) {
      goToSlide(activeIndex + 1);
    }
  };

  const toggleAutoPlay = () => {
    setAutoPlayEnabled(!autoPlayEnabled);
    if (!autoPlayEnabled) {
      setProgress(0);
    }
  };

  const startIndex = Math.max(0, Math.min(activeIndex - 1, PROCESS_STEPS.length - 3));

  

  return (
    <section id="process" ref={ref} className="py-13 bg-black relative overflow-hidden pb-50" 
        style={{
        background: `
          radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
          linear-gradient(
            to bottom,
            black 0px,
            black 10px,
            #3b3b3bff 10px,
            #3b3b3bff 11px,
            #0b0b0bff 11px,
            #0b0b0bff calc(100% - 11px),
            #3b3b3bff calc(100% - 11px),
            #3b3b3bff calc(100% - 10px),
            black calc(100% - 10px),
            black 100%
          )
        `
      }}  
      >
      
      <div className="relative z-10">
        <div className="text-center mb-12 relative z-10 max-w-10xl mx-auto px-4">
          <div className="text-left max-w-7xl mx-auto">
            <h2 className="text-2xl lg:text-4xl  text-white mb-4 tracking-tight"
            style={{ fontWeight: 575 }}>
              
              <span className="font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
              style={{ fontWeight: 575 }}>
                Proces współpracy
              </span>
            </h2>
          </div>
          
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <button
  onClick={scrollLeft}
  disabled={activeIndex === 0}
  className={`hidden md:flex absolute -left-16 top-1/4 -translate-y-1/4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center transition-all duration-200 ${
    activeIndex === 0 
      ? 'text-white/20 cursor-not-allowed' 
      : 'text-white/60 hover:text-white cursor-pointer'
  }`}
>
  <ChevronLeft className="w-6 h-6" />
</button>

<button
  onClick={scrollRight}
  disabled={activeIndex === PROCESS_STEPS.length - 1}
  className={`hidden md:flex absolute -right-16 top-1/4 -translate-y-1/4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center transition-all duration-200 ${
    activeIndex === PROCESS_STEPS.length - 1
      ? 'text-white/20 cursor-not-allowed'
      : 'text-white/60 hover:text-white cursor-pointer'
  }`}
>
  <ChevronRight className="w-6 h-6" />
</button>

          {/* Kontener ze wszystkimi kartami */}
          <div className="relative max-w-7xl mx-auto mb-4">
            <div className="overflow-hidden min-h-[200px]">
              <motion.div
                className="flex"
                style={{
                  gap: isMobile ? '32px' : '24px'
                }}
                animate={{
                  x: isMobile 
                    ? `calc(-${activeIndex * 100}vw - ${activeIndex * 32}px)`
                    : `calc(-${startIndex * 33.333}% - ${startIndex * 8}px)`
                }}
                transition={{
                  type: "tween",
                  duration: 0.6,
                  ease: "easeInOut"
                }}
              >
                {PROCESS_STEPS.map((step, index) => {
                  const isActive = index === activeIndex;
                  const isVisible = !isMobile && index >= startIndex && index <= startIndex + 2;
                  
                  return (
                    <div
                      key={step.id}
                      className="flex-shrink-0 transition-all duration-500 cursor-pointer group"
                      style={{
                        width: isMobile ? '100vw' : 'calc(33.333% - 16px)',
                        opacity: isMobile || isVisible ? 1 : 0,
                        pointerEvents: isMobile || isVisible ? 'auto' : 'none'
                      }}
                      onClick={() => !isActive && (isMobile || isVisible) && goToSlide(index)}
                    >
                    <div className="w-full my-4" style={{ minHeight: '2px' }}>
                      {isActive && autoPlayEnabled && (
                        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-white rounded-full"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.05, ease: "linear" }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <span className={`text-2xl font-bold transition-colors duration-500 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-white/30 group-hover:text-white/70'
                      }`}>
                        {step.id.toString().padStart(2, '0')}
                      </span>
                      <h3 className={`text-xl md:text-2xl font-bold transition-colors duration-500 ${
                        isActive 
                          ? 'text-white' 
                          : 'text-white/30 group-hover:text-white/70'
                      }`}>
                        {step.title}
                      </h3>
                    </div>

                    <p className={`text-sm md:text-base leading-relaxed transition-colors duration-500 ${
                      isActive 
                        ? 'text-gray-300' 
                        : 'text-white/20 group-hover:text-white/50'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>

          
          <div className="flex flex-verse justify-center gap-4 mt-4">
            <button
              onClick={toggleAutoPlay}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 hover:cursor-pointer ${
                autoPlayEnabled 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
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
            <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 w-fit ">
              {PROCESS_STEPS.map((_, index) => (
                <motion.button
                  key={`dot-${index}`}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full w-2 h-2 transition-all duration-300 hover:cursor-pointer ${
                    index === activeIndex 
                      ? 'bg-white' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  animate={{
                    x: 0
                  }}
                  transition={{
                    type: 'tween',
                    duration: 0.3,
                    ease: 'easeInOut'
                  }}
                  aria-label={`Przejdź do etapu ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* OPIS NA DOLE */}
          {/* <div className="container mx-auto pt-12">
            <div
              
              className="max-w-2xl mx-auto"
            >
              <div className="rounded-2xl  ">
                
               
                <p className="text-white/70 text-lg leading-relaxed">
                  Naszym celem jest dostarczenie tobie najlepszej usługi, wsparcia i pomocy przy projekcie na każdym etapie jego produkowania. 
                </p>
                
            
                <div className="flex items-center justify-end gap-3">
                  <div className="w-12 h-px bg-white/20"></div>
                  <p className="text-white/50 text-base italic">
                    Zespół <span className="font-medium">Whiteslope</span>
                  </p>
                </div>
              </div>
            </div>
          </div> */}

        
        </div>
            {/* LOGA KLIENTÓW */}
        <div className="text-center mt-12 relative z-10 max-w-7xl mx-auto px-4">
          <p className="text-xs uppercase tracking-wider mb-6" style={{ color: '#6b7280' }}>
            Zaufali nam
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            {testimonials.map((testimonial) => (
              <a 
                key={testimonial.id}
                href={testimonial.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <img 
                  src={testimonial.logo}
                  alt={testimonial.company}
                  className="h-8 w-auto object-contain transition-opacity duration-300"
                  style={{ 
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.4,
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
                />
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};