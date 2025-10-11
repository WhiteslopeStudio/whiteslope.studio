"use client";

import { 
  AlertCircle, CheckCircle2, TrendingUp, Zap, Search, Clock, 
  ArrowRight, Target, BarChart3, Rocket, MousePointer, LineChart
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
    if (!inView || hasAnimated) return;
    
    let start = 0;
    const end = value;
    const duration = 3500;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        setHasAnimated(true);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, inView, hasAnimated]);

  return <>{count}{suffix}</>;
};

// Hook do wykrywania mobile
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const ProblemSolutionSection = () => {
  const [ref, inView] = useAdvancedInView();
  const isMobile = useMobileDetection();
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(-1);
  const [ghostPosition, setGhostPosition] = useState({ x: 0, y: 0, opacity: 0 });
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

 const problems = [
  {
    icon: <Search className="w-6 h-6" />,
    title: "Nie wiesz, jak być widocznym w Google?",
    description: "Twoja strona ginie w tłumie, a konkurencja jest wysoko w wynikach wyszukiwania. Nie masz pojęcia, jak to zmienić."
  },
  {
    icon: <MousePointer className="w-6 h-6" />,
    title: "Klienci nie zostają na Twojej stronie?",
    description: "Ludzie wchodzą, ale szybko uciekają. Nie wiesz, jak ich zatrzymać i przekonać do działania."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Twoja strona działa jak z poprzedniej epoki?",
    description: "Strona wolno się ładuje, źle wygląda na telefonach albo w ogóle nie działa tak, jak powinna."
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Nie rozumiesz, co dzieje się na stronie?",
    description: "Nie wiesz, ilu ludzi odwiedza Twoją stronę, co robią i dlaczego nie kupują."
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Nie masz pojęcia, od czego zacząć?",
    description: "Internet, strony, marketing – to wszystko brzmi jak czarna magia. Nie wiesz, za co się zabrać najpierw."
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Boisz się, że to za trudne i za drogie?",
    description: "Myślisz, że zrobienie dobrej strony i promocja w internecie to skomplikowane i wymaga ogromnego budżetu."
  }
];

const solutions = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Pokażemy Cię w Google",
    description: "Pomożemy Twojej stronie pojawiać się wyżej w wynikach wyszukiwania – tak jak zrobiliśmy to dla frazy 'Hertz Studio' (TOP3!)."
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Zrobimy stronę, która przyciąga",
    description: "Stworzymy prostą, ale skuteczną stronę, która zachęci klientów do zostania i kontaktu z Tobą."
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Szybka i nowoczesna strona",
    description: "Zaprojektujemy stronę, która działa płynnie na każdym urządzeniu i szybko się ładuje."
  },
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Prosta analityka dla Ciebie",
    description: "Pokażemy Ci, jak sprawdzać, co działa na Twojej stronie, bez skomplikowanych narzędzi."
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Poprowadzimy Cię krok po kroku",
    description: "Nie musisz znać się na internecie – wyjaśnimy wszystko w prosty sposób i pomożemy zacząć."
  },
  {
    icon: <ArrowRight className="w-6 h-6" />,
    title: "Rozwiązania na Twoją kieszeń",
    description: "Jako studenci oferujemy przystępne ceny i rozwiązania dopasowane do małych budżetów."
  }
];
  // Tracking scroll velocity i pozycja duszka
  useEffect(() => {
  if (isMobile || !cardsContainerRef.current) return;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    scrollVelocity.current = currentScrollY - lastScrollY.current;
    lastScrollY.current = currentScrollY;

    const container = cardsContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    
    // Sprawdź czy kontener jest widoczny
    if (containerRect.top > window.innerHeight || containerRect.bottom < 0) {
      setActiveCardIndex(-1);
      setGhostPosition({ x: 0, y: 0, opacity: 0 });
      return;
    }

    const viewportHeight = window.innerHeight;
    const sectionMiddle = viewportHeight * 0.4; // Zmiana z 1/2 na 1/3 wysokości ekranu

    // Pobierz wszystkie karty problemów
    const problemCards = container.querySelectorAll('[data-problem-card]');
    
    // Znajdź najbliższą kartę do 1/3 ekranu
    let closestIndex = -1;
    let closestDistance = Infinity;

    problemCards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardMiddle = cardRect.top + cardRect.height / 2;
      const distance = Math.abs(cardMiddle - sectionMiddle);

      if (distance < closestDistance && cardRect.top < viewportHeight && cardRect.bottom > 0) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveCardIndex(closestIndex);

    // Oblicz pozycję duszka
    if (closestIndex >= 0 && problemCards[closestIndex]) {
      const problemCard = problemCards[closestIndex];
      const problemRect = problemCard.getBoundingClientRect();
      const solutionCard = container.querySelector(`[data-solution-card="${closestIndex}"]`);
      
      if (solutionCard) {
        const solutionRect = solutionCard.getBoundingClientRect();
        
        const containerX = containerRect.left;
        const containerY = containerRect.top;
        
        const ghostX = problemRect.right - containerX + (solutionRect.left - problemRect.right) / 2;
        const ghostY = problemRect.top - containerY + problemRect.height / 2;
        
        const acceleration = Math.abs(scrollVelocity.current) * 0.3;

        setGhostPosition({
          x: ghostX,
          y: ghostY + acceleration * Math.sign(scrollVelocity.current),
          opacity: 1
        });
      }
    }
  };

  const scrollHandler = () => {
    requestAnimationFrame(handleScroll);
  };

  window.addEventListener('scroll', scrollHandler);
  handleScroll();

  return () => window.removeEventListener('scroll', scrollHandler);
}, [isMobile]);

  return (
    <section 
      id="problem-solution" 
      className="py-12 md:py-20 bg-black relative overflow-hidden"
    >
      {/* Subtelny gradient w tle */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.07) 0%, transparent 50%),
            
            
          `
        }}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10" ref={ref}>
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-white/60 backdrop-blur-sm border border-white/10">
            <AlertCircle className="w-4 h-4 text-white/60" />
            Problem → Rozwiązanie
          </span>
        </div>

        {/* NAGŁÓWEK */}
        <div 
          className="text-center mb-12 md:mb-16"
          style={{
            fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'
          }}
        >
          <h2 className="text-3xl lg:text-6xl md:font-thin text-white mb-6 tracking-tight">
            Tu zaczyna się transformacja{" "}
            <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
              Twojej marki
            </span>
          </h2>
          <p 
            className={`leading-relaxed text-gray-300 mx-auto ${
              isMobile ? "text-base px-4" : "text-lg md:text-xl max-w-3xl"
            }`}
            style={{
              fontWeight: 400,
              lineHeight: 1.6,
              fontFamily: 'inherit'
            }}
          >
            Każdy problem ma swoje rozwiązanie. <span className="font-bold">Oto jak transformujemy Twój biznes.</span>
          </p>
        </div>

        {/* METRYKI */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes platinum-shine {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          
          .platinum-text {
            background: linear-gradient(90deg, #0a1423ff 0%, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%, #94a3b8 100%);
            background-size: 200% auto;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: platinum-shine 6s linear infinite;
          }
          
          @keyframes ghost-pulse {
            0%, 100% { opacity: 0.5; transform: scale(0.5); }
            50% { opacity: 0.8; transform: scale(0.6); }
          }
          
          @keyframes border-pulse {
            0%, 100% { 
              border-color: rgba(135, 206, 250, 0.25);
              box-shadow: 0 0 15px rgba(135, 206, 250, 0.15);
            }
            50% { 
              border-color: rgba(135, 206, 250, 0.2);
              box-shadow: 0 0 25px rgba(135, 206, 250, 0.3);
            }
          }
          
          @keyframes header-pulse-red {
            0%, 100% { 
              text-shadow: 0 0 5px rgba(239, 68, 68, 0.1);
            }
            50% { 
              text-shadow: 0 0 8px rgba(239, 68, 68, 0.2);
            }
          }
          
          @keyframes header-pulse-green {
            0%, 100% { 
              text-shadow: 0 0 5px rgba(34, 197, 94, 0.1);
            }
            50% { 
              text-shadow: 0 0 8px rgba(34, 197, 94, 0.2);
            }
          }
        `}} />

        

        {/* KONTENER Z KARTAMI I DUSZKIEM */}
        <div ref={cardsContainerRef} className="max-w-7xl mx-auto mb-16 relative">
          
          {/* DUSZEK - mniejszy i bardziej transparentny */}
          {!isMobile && ghostPosition.opacity > 0 && (
            <div
              className="absolute z-50 pointer-events-none transition-all duration-300 ease-out"
              style={{
                left: `${ghostPosition.x}px`,
                top: `${ghostPosition.y}px`,
                transform: 'translate(-50%, -50%)',
                opacity: ghostPosition.opacity
              }}
            >
              {/* Pulsująca poświata */}
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'radial-gradient(circle, rgba(135, 206, 250, 0.4) 0%, transparent 70%)',
                  filter: 'blur(18px)',
                  transform: 'translate(-50%, -50%)',
                  left: '50%',
                  top: '50%',
                  animation: 'ghost-pulse 2.5s ease-in-out infinite'
                }}
              />
              
              {/* Duszek - mniejszy */}
              <div 
                className="relative rounded-full"
                style={{
                  width: '8px',
                  height: '8px',
                  background: 'radial-gradient(circle, rgba(135, 206, 250, 0.9) 0%, rgba(100, 149, 237, 0.6) 100%)',
                  boxShadow: '0 0 12px rgba(135, 206, 250, 0.8), 0 0 24px rgba(135, 206, 250, 0.4)',
                  filter: 'blur(0.5px)',
                  animation: 'ghost-pulse 2.5s ease-in-out infinite'
                }}
              />
            </div>
          )}

          {/* GRID Z RÓWNYMI WYSOKOŚCIAMI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" style={{ gridAutoRows: '1fr' }}>
            
            {/* LEWA KOLUMNA - PROBLEMY */}
            <div className="grid grid-rows-[auto_1fr_1fr_1fr_1fr] gap-4">
              <h3 
                className="text-2xl font-bold text-red-300 mb-2 flex items-center gap-3"
                style={{
                    fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
                    textShadow: '0 0 15px rgba(239, 68, 68, 0.29), 0 0 30px rgba(239, 68, 68, 0.3)'
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <AlertCircle className="w-5 h-5 text-white/70" />
                </div>
                Twoje problemy
              </h3>
              
              {problems.map((problem, index) => (
                <div
                  key={index}
                  data-problem-card
                  className="group relative h-full"
                >
                  <div 
                    className="p-5 rounded-xl transition-all duration-300 h-full flex items-start"
                    style={{
                      background: 'rgba(15, 15, 15, 0.8)',
                      border: activeCardIndex === index 
                        ? '1px solid rgba(135, 206, 250, 0.4)' 
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      animation: activeCardIndex === index 
                        ? 'border-pulse 2.5s ease-in-out infinite' 
                        : 'none'
                    }}
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div 
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div className="text-white/70">
                          {problem.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <h4 className="text-white font-semibold text-lg mb-1.5"
                          style={{
                            fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'
                          }}
                        >
                          {problem.title}
                        </h4>
                        <p 
                          className="text-gray-400 text-sm leading-relaxed"
                          style={{
                            fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'
                          }}
                        >
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* PRAWA KOLUMNA - ROZWIĄZANIA */}
            <div className="grid grid-rows-[auto_1fr_1fr_1fr_1fr] gap-4">
              <h3 className="text-2xl font-bold text-green-300 mb-2 flex items-center gap-3"
                style={{
                    fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
                    textShadow: '0 0 15px rgba(34, 197, 94, 0.29), 0 0 30px rgba(34, 197, 94, 0.3)'
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-white/70" />
                </div>
                Nasze rozwiązania
              </h3>
              
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  data-solution-card={index}
                  className="group relative h-full"
                >
                  <div 
                    className="p-5 rounded-xl transition-all duration-300 h-full flex items-start"
                    style={{
                      background: 'rgba(15, 15, 15, 0.8)',
                      border: activeCardIndex === index 
                        ? '1px solid rgba(135, 206, 250, 0.4)' 
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      animation: activeCardIndex === index 
                        ? 'border-pulse 2.5s ease-in-out infinite' 
                        : 'none'
                    }}
                  >
                    <div className="flex items-start gap-4 w-full">
                      <div 
                        className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <div className="text-white/70">
                          {solution.icon}
                        </div>
                      </div>
                      
                      <div className="flex-1 pt-1">
                        <h4 className="text-white font-semibold text-lg mb-1.5"
                          style={{
                            fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'
                          }}
                        >
                          {solution.title}
                        </h4>
                        <p 
                          className="text-gray-400 text-sm leading-relaxed"
                          style={{
                            fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'
                          }}
                        >
                          {solution.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

{/* <div className="flex flex-row lg:flex-row justify-center gap-4 lg:gap-0 mb-16 px-0 relative z-10 overflow-x-hidden max-w-5xl mx-auto">
          <div className="text-center group/stat flex-shrink-0 lg:flex-1 min-w-[100px] lg:min-w-0">
            <div className="text-4xl lg:text-5xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
              <AnimatedNumber value={24} suffix="h" inView={inView} />
            </div>
            <div className="text-[10px] lg:text-sm text-gray-400 font-medium px-0">Pierwsze zapytania</div>
          </div>
          <div className="text-center group/stat flex-shrink-0 lg:flex-1 min-w-[100px] lg:min-w-0">
            <div className="text-4xl lg:text-5xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
              <AnimatedNumber value={100} suffix="%" inView={inView} />
            </div>
            <div className="text-[10px] lg:text-sm text-gray-400 font-medium px-0">Zadowolonych klientów</div>
          </div>
          <div className="text-center group/stat flex-shrink-0 lg:flex-1 min-w-[100px] lg:min-w-0">
            <div className="text-4xl lg:text-5xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
              <AnimatedNumber value={3} suffix=" dni" inView={inView} />
            </div>
            <div className="text-[10px] lg:text-sm text-gray-400 font-medium px-0">Do pierwszych efektów</div>
          </div>
        </div> */}


        {/* CTA */}
        {/* <div className="flex flex-col items-center justify-center relative z-20">
          <div
            className="transition-all duration-500 ease-out"
            style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)' }}
          >
            <a
              href="#pricing"
              className="group relative cursor-pointer transition-all duration-150 inline-block hover:scale-105 z-30"
              style={{ pointerEvents: "auto" }}
            >
              <button className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full bg-[#fd9f91] text-black font-medium text-base transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#fd9f91]/30">
                <span className="select-none">Zacznij transformację</span>
                <ArrowRight className="w-4 h-4 transition-all duration-150 group-hover:translate-x-1" />
              </button>
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Bezpłatna konsultacja • Gwarancja satysfakcji
          </p>
        </div> */}
      </div>
    </section>
  );
};