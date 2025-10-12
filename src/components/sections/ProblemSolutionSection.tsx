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
  const [sectionVisible, setSectionVisible] = useState(false);
  const animationFrameRef = useRef<number | undefined>(undefined);

  const problems = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Nie masz czasu na stronę internetową?",
    description: "Prowadzisz biznes i nie masz kiedy zająć się stworzeniem czy aktualizacją strony.",
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Internet wydaje Ci się skomplikowany?",
    description: "Nie wiesz, jak stworzyć stronę i zacząć promować swoją firmę w sieci.",
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: "Twoja firma jest niewidoczna online?",
    description: "Klienci nie znajdują Twojej firmy w internecie, a Ty chcesz to zmienić.",
  },
  
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Nie wiesz, co działa na Twojej stronie?",
    description: "Nie masz pojęcia, ilu ludzi odwiedza Twoją stronę i co można poprawić.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Boisz się, że strona to za drogo?",
    description: "Myślisz, że stworzenie strony to duży wydatek, na który Cię nie stać.",
  },
];

const solutions = [
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    title: "Wspieramy Cię w oszczędności czasu",
    description: "Pomagamy stworzyć prostą stronę, abyś mógł skupić się na rozwoju swojego biznesu.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Razem uprościmy Twój start online",
    description: "Pokażemy Ci krok po kroku, jak łatwo uruchomić stronę, bez zbędnych komplikacji.",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: "Pomagamy zwiększyć widoczność firmy",
    description: "Stworzymy stronę, która ułatwi klientom znalezienie Twojej oferty w sieci.",
  },
  
  {
    icon: <LineChart className="w-6 h-6" />,
    title: "Pokazujemy proste wyniki",
    description: "Dostarczymy narzędzia, które pomogą Ci zrozumieć, jak strona wspiera Twój biznes.",
  },
  {
    icon: <ArrowRight className="w-6 h-6" />,
    title: "Dopasowujemy się do Twojego budżetu",
    description: "Oferujemy elastyczne rozwiązania, które szanują potrzeby i możliwości Twojej firmy.",
  },
];

  // Sprawdzanie czy sekcja jest widoczna - NOWE
  useEffect(() => {
    if (!cardsContainerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);
        // Jeśli sekcja nie jest widoczna, wyczyść aktywną kartę
        if (!entry.isIntersecting) {
          setActiveCardIndex(-1);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(cardsContainerRef.current);
    return () => observer.disconnect();
  }, []);

  // UPROSZCZONY tracking scroll - z throttlingiem
  useEffect(() => {
    if (isMobile || !cardsContainerRef.current || !sectionVisible) return;

    let lastTime = 0;
    const throttleTime = 100; // Aktualizuj co 100ms zamiast przy każdym scroll

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastTime < throttleTime) return;
      lastTime = now;

      const container = cardsContainerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionMiddle = viewportHeight * 0.4;

      const problemCards = container.querySelectorAll('[data-problem-card]');
      
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
    };

    const scrollHandler = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScroll(); // Początkowe wywołanie

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile, sectionVisible]);

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
            radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.07) 0%, transparent 50%)
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

        {/* STYLE - Z EFEKTEM GLOW */}
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
          
          
          
          @keyframes border-pulse-gradient {
            0%, 100% {
              border-color: rgba(135, 206, 250, 0.5);
            }
            50% {
              border-color: rgba(135, 206, 250, 0.8);
            }
          }
          
          .active-glow-card {
            animation: rotating-glow 3s ease-in-out infinite, border-pulse-gradient 2s ease-in-out infinite;
          }
        `}} />

        {/* KONTENER Z KARTAMI - BEZ DUSZKA */}
        <div ref={cardsContainerRef} className="max-w-7xl mx-auto mb-16 relative">
          
          {/* GRID Z RÓWNYMI WYSOKOŚCIAMI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16" style={{ gridAutoRows: '1fr' }}>
            
            {/* LEWA KOLUMNA - PROBLEMY */}
            <div className="grid grid-rows-[auto_1fr_1fr_1fr_1fr_1fr_1fr] gap-4">
              <h3 
                className="text-2xl font-bold text-red-300 mb-2 flex items-center gap-3"
                style={{
                  fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <AlertCircle className="w-5 h-5 text-white/70" />
                </div>
                Wyzwania, przed którymi stoisz
              </h3>
              
              {problems.map((problem, index) => (
                <div
                  key={index}
                  data-problem-card
                  className="group relative h-full"
                >
                  <div 
                    className={`p-5 rounded-xl transition-all duration-300 h-full flex items-start ${
                      activeCardIndex === index ? 'active-glow-card' : ''
                    }`}
                    style={{
                      background: 'rgba(15, 15, 15, 0.8)',
                      border: '2px solid',
                      borderColor: activeCardIndex === index 
                        ? 'rgba(135, 206, 250, 0.5)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      willChange: activeCardIndex === index ? 'border-color, box-shadow, filter' : 'auto'
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
                        <h4 className="text-white font-base text-xl mb-1.5"
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
            <div className="grid grid-rows-[auto_1fr_1fr_1fr_1fr_1fr_1fr] gap-4">
              <h3 className="text-2xl font-bold text-green-300 mb-2 flex items-center gap-3"
                style={{
                  fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'
                }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-white/70" />
                </div>
                Jak możemy Ci pomóc
              </h3>
              
              {solutions.map((solution, index) => (
                <div
                  key={index}
                  data-solution-card={index}
                  className="group relative h-full"
                >
                  <div 
                    className={`p-5 rounded-xl transition-all duration-300 h-full flex items-start ${
                      activeCardIndex === index ? 'active-glow-card' : ''
                    }`}
                    style={{
                      background: 'rgba(15, 15, 15, 0.8)',
                      border: '2px solid',
                      borderColor: activeCardIndex === index 
                        ? 'rgba(135, 206, 250, 0.5)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      willChange: activeCardIndex === index ? 'border-color, box-shadow, filter' : 'auto'
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
                        <h4 className="text-white font-base text-xl mb-1.5"
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
      </div>
    </section>
  );
}