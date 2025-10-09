'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { useAdvancedInView, useMobileDetection } from "@/utils/hooks";
import { ArrowRight, Check, Star, Linkedin, PersonStanding, Globe, MessageCircle, Settings } from "lucide-react";

export const HeroSection = () => {
  const [ref, inView] = useAdvancedInView();
  const isMobile = useMobileDetection();
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);
  
  // Animation state management
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  const [showFinalCheckMark, setShowFinalCheckMark] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [backgroundElements, setBackgroundElements] = useState<Array<{id: number, x: number, y: number, scale: number, opacity: number}>>([]);
  const [backgroundDimmed, setBackgroundDimmed] = useState(false);
  
  // Nowy system animacji tekstu
  const [animatedWords, setAnimatedWords] = useState<Array<{word: string, visible: boolean}>>([]);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [currentAnimationId, setCurrentAnimationId] = useState(0);
  
  // Refs for smooth animations
  const textRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    const animationData = localStorage.getItem('hero-animation-data');
    
    if (animationData) {
      const { seen, timestamp } = JSON.parse(animationData);
      const dayInMs = 1 * 5 * 60 * 1000; // 5 minutek aniamcja jest jak ktoś przebywa na stronie 5 minut
      
      if (Date.now() - timestamp > dayInMs) {
        // Minęło 24h - wyczyść flagę
        localStorage.removeItem('hero-animation-data');
      } else {
        // Jeszcze świeże - pomiń animację
        setAnimationCompleted(true);
        setIsTextVisible(false);
        // createBackgroundParticles(15, 'float');
      }
    }
  }, []);

  // 2. FUNKCJA POMIJANIA ANIMACJI (dodaj po innych funkcjach)
  const skipIntro = useCallback(() => {
    // Zatrzymaj wszystkie timery animacji
    setShowSkipButton(false);
    setAnimationCompleted(true);
    setIsAnimating(false);
    setIsTextVisible(false);
    setCurrentStep(0);
    
    // Wyczyść particles i efekty
    setBackgroundElements([]);
    setShowCheckMark(false);
    setShowPercentage(false);
    setShowFinalCheckMark(false);
  }, []);
  
  // UNIWERSALNA FUNKCJA ANIMACJI TIKTOK STYLE
  const animateWordsSequentially = useCallback((
    text: string,
    animationId: number,
    onComplete?: () => void
  ) => {
    const words = text.split(' ');
    const wordsWithState = words.map(word => ({ word, visible: false }));
    
    // Reset poprzedniej animacji
    setAnimatedWords([]);
    
    setTimeout(() => {
      // Sprawdź czy animacja jest nadal aktualna
      setCurrentAnimationId(currentId => {
        if (currentId === animationId) {
          setAnimatedWords(wordsWithState);
          
          // Animuj każde słowo z opóźnieniem
          words.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedWords((prev: Array<{word: string, visible: boolean}>) => {
                // Sprawdź czy to nadal aktualna animacja
                if (prev.length !== words.length) return prev;
                
                return prev.map((item, i) => 
                  i === index ? { ...item, visible: true } : item
                );
              });
              
              // Wywołaj onComplete po ostatnim słowie
              if (index === words.length - 1) {
                setTimeout(() => {
                  onComplete?.();
                }, 100);
              }
            }, index * 300);
          });
        }
        return currentId;
      });
    }, 50);
  }, []);

  // Advanced easing functions
  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  // Professional animation with motion blur
  const animateWithMotionBlur = useCallback((
    element: HTMLElement,
    property: string,
    fromValue: number,
    toValue: number,
    duration: number,
    easingFunction: (t: number) => number = easeInOutCubic,
    onComplete?: () => void
  ) => {
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easingFunction(progress);
      const currentValue = fromValue + (toValue - fromValue) * easedProgress;
      
      if (property === 'transform') {
        element.style.transform = `translateX(${currentValue}%)`;
      } else if (property === 'opacity') {
        element.style.opacity = currentValue.toString();
      }
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };
    
    requestAnimationFrame(animate);
  }, []);

  // Dynamic background particles
  const createBackgroundParticles = useCallback((count: number, animationType: 'float' | 'spiral' | 'wave') => {
    const particles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 0.5,
      opacity: 0.05 + Math.random() * 0.15,
    }));
    
    setBackgroundElements(particles);
    
    const animateParticles = () => {
      setBackgroundElements((prev: Array<{id: number, x: number, y: number, scale: number, opacity: number}>) => 
        prev.map(particle => {
          let newX = particle.x;
          let newY = particle.y;
          
          if (animationType === 'float') {
            newY = particle.y + Math.sin(Date.now() * 0.001 + particle.id) * 0.5;
            newX = particle.x + Math.cos(Date.now() * 0.0008 + particle.id) * 0.3;
          } else if (animationType === 'spiral') {
            const angle = Date.now() * 0.001 + particle.id;
            newX = 50 + Math.cos(angle) * (20 + particle.id * 2);
            newY = 50 + Math.sin(angle) * (20 + particle.id * 2);
          } else if (animationType === 'wave') {
            newX = particle.x + Math.sin(Date.now() * 0.002 + particle.id * 0.5) * 2;
            newY = 50 + Math.sin(Date.now() * 0.003 + particle.x * 0.1) * 10;
          }
          
          return {
            ...particle,
            x: newX > 100 ? 0 : newX < 0 ? 100 : newX,
            y: newY > 100 ? 0 : newY < 0 ? 100 : newY,
          };
        })
      );
    };
    
    const intervalId = setInterval(animateParticles, 50);
    setTimeout(() => clearInterval(intervalId), 8000);
  }, []);

  // NOWA FUNKCJA PRZEJŚCIA - DOKŁADNIE JAK CHCESZ
  const performMaskTransitionToNewText = useCallback((
    newText: string,
    showIcon: 'check' | 'percentage' | 'final-check' | null = null,
    delay: number = 0,
    backgroundEffect: 'particles' | 'waves' | 'spiral' | null = null
  ) => {
    setTimeout(() => {
      setIsAnimating(true);
      setBackgroundElements([]); // Wyczyść particles
      
      const maskElement = maskRef.current;
      
      if (maskElement) {
        // Faza 1: Maska wjeżdża i przykrywa tekst
        animateWithMotionBlur(
          maskElement,
          'transform',
          -100,
          0,
          150,
          easeOutQuart,
          () => {
            // Faza 2: Ukryj tekst
            setIsTextVisible(false);
            setAnimatedWords([]);
            
            setTimeout(() => {
              // Faza 3: Zmień krok
              setCurrentStep(prev => prev + 1);
              
              setTimeout(() => {
                // Faza 4: Maska znika (FADE OUT zamiast slide out)
                animateWithMotionBlur(
                  maskElement,
                  'opacity',
                  1,
                  0,
                  10,
                  easeOutQuart,
                  () => {
                    // Reset maski
                    maskElement.style.transform = 'translateX(-100%)';
                    maskElement.style.opacity = '1';
                    setIsAnimating(false);
                    
                    // Faza 5: Krótka pauza na czarnym ekranie
                    setTimeout(() => {
                      // Pokaż tekst i uruchom animację TikTok
                      setIsTextVisible(true);
                      
                      const newAnimationId = Date.now();
                      setCurrentAnimationId(newAnimationId);
                      
                      animateWordsSequentially(newText, newAnimationId, () => {
                        // Dodaj efekty tła po animacji tekstu
                        if (backgroundEffect === 'particles') {
                          createBackgroundParticles(15, 'float');
                        } else if (backgroundEffect === 'waves') {
                          createBackgroundParticles(8, 'wave');
                        } else if (backgroundEffect === 'spiral') {
                          createBackgroundParticles(12, 'spiral');
                        }
                        
                        // Pokaż ikony
                        if (showIcon === 'check') {
                          setTimeout(() => setShowCheckMark(true), 400);
                        } else if (showIcon === 'percentage') {
                          setTimeout(() => setShowPercentage(true), 400);
                        } else if (showIcon === 'final-check') {
                          setTimeout(() => setShowFinalCheckMark(true), 400);
                        }
                      });
                    }, 50); // Pauza na czarnym ekranie
                  }
                );
              }, 100);
            }, 100);
          }
        );
      }
    }, delay);
  }, [animateWithMotionBlur, createBackgroundParticles, animateWordsSequentially]);

//   useEffect(() => {
//     if (!animationCompleted) return;
    
//     const animateStaticParticles = () => {
//       setBackgroundElements((prev) => 
//         prev.map(particle => ({
//           ...particle,
//           x: particle.x + Math.sin(Date.now() * 0.001 + particle.id) * 0.3,
//           y: particle.y + Math.cos(Date.now() * 0.0008 + particle.id) * 0.5,
//         }))
//       );
//     };

//   const intervalId = setInterval(animateStaticParticles, 50);
//   return () => clearInterval(intervalId);
// }, [animationCompleted]);

  // Funkcja renderująca animowany tekst z spacjami i ikonami - POPRAWIONA
  const renderAnimatedText = useCallback(() => {
    if (animatedWords.length === 0) return null;
    
    return (
      <>
        {animatedWords.map((wordObj, index) => (
          <span key={`${currentAnimationId}-${index}`}>
            <span
              className={`inline-block transition-all duration-700 ${
                wordObj.visible 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 5}ms`,
                transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {wordObj.word}
            </span>
            
            {/* IKONY Z ANIMACJĄ TIKTOK STYLE WJEŻDŻAJĄCE OD DOŁU */}
            {currentStep === 0 && index === 1 && (
              <span
                className={`inline-block transition-all duration-700 ${
                  wordObj.visible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{
                  marginLeft: '15px',
                  transitionDelay: `${(index + 1) * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <PersonStanding className="inline w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-orange-400" />
              </span>
            )}
            {currentStep === 1 && index === 2 && (
              <span
                className={`inline-block transition-all duration-700 ${
                  wordObj.visible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{
                  marginLeft: '15px',
                  transitionDelay: `${(index + 1) * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <Globe className="inline w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-400" />
              </span>
            )}
            {currentStep === 2 && index === 4 && (
              <span
                className={`inline-block transition-all duration-700 ${
                  wordObj.visible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{
                  marginLeft: '20px',
                  transitionDelay: `${(index + 1) * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <MessageCircle className="inline w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-green-400" />
              </span>
            )}
            {currentStep === 3 && index === 0 && (
              <span
                className={`inline-block transition-all duration-700 ${
                  wordObj.visible 
                    ? 'opacity-100 transform translate-y-0' 
                    : 'opacity-0 transform translate-y-8'
                }`}
                style={{
                  marginLeft: '15px',
                  transitionDelay: `${(index + 1) * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <Settings className="inline w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-purple-400" />
              </span>
            )}
            
            {/* SPACJA PO KAŻDYM SŁOWIE */}
            {index < animatedWords.length - 1 && (
              <span className={`transition-opacity duration-700 ${
                wordObj.visible ? 'opacity-100' : 'opacity-0'
              }`}> </span>
            )}
          </span>
        ))}
      </>
    );
  }, [animatedWords, currentAnimationId, currentStep]);

  // GŁÓWNA TIMELINE ANIMACJI
  useEffect(() => {
    if (!inView) return;

    // DODAJ TEN WARUNEK TUTAJ:
    if (animationCompleted) return; // ← DODAJ TĘ LINIĘ

    // Pokaż przycisk po 2 sekundach
    const showButtonTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);

    // Ukryj przycisk po 30 sekundach
    const hideButtonTimer = setTimeout(() => {
      setShowSkipButton(false);
    }, 9000);

    // Reset wszystkich stanów
    setCurrentStep(0);
    setAnimationCompleted(false);
    setIsTextVisible(true);
    setCurrentAnimationId(1);
    setShowSkipButton(false); // Reset na początku
    
    const timelineEvents = [
      // Pierwsza animacja TikTok
      {
        delay: 0,
        action: () => {
          createBackgroundParticles(25, 'float');
          setTimeout(() => {
            animateWordsSequentially("Wszystkie drogi prowadzą do Whiteslope Studio!", 1);
          }, 800);
        }
      },
      
      // Przejście do drugiego tekstu z animacją TikTok
      {
        delay: 4500,
        action: () => {
          performMaskTransitionToNewText("Tworzymy tu strony internetowe dla firm i osób prywatnych!", null, 0, 'particles');
        }
      },
      
      // // Przejście do trzeciego tekstu z animacją TikTok
      // {
      //   delay: 9000,
      //   action: () => {
      //     performMaskTransitionToNewText("Początkowo umawiamy się na konsultację!", null, 0, 'waves');
      //   }
      // },
      
      // // Przejście do czwartego tekstu z animacją TikTok
      // {
      //   delay: 13000,
      //   action: () => {
      //     setShowCheckMark(false);
      //     performMaskTransitionToNewText("Następnie tworzymy stronę tak, aby sprostała Twoim potrzebom.", null, 500, 'spiral');
      //   }
      // },
      
      // // Przejście do piątego tekstu z animacją TikTok
      // {
      //   delay: 18000,
      //   action: () => {
      //     setShowPercentage(false);
      //     performMaskTransitionToNewText("A płatność następuję dopiero po akceptacji projektu!", null, 500, 'particles');
      //   }
      // },
      
      // Zakończenie animacji
      {
        delay: 9000,
        
        action: () => {
          setShowFinalCheckMark(false);
          setBackgroundElements([]);
          setTimeout(() => {
            setAnimationCompleted(true);
            // I w miejscu zapisu:
            localStorage.setItem('hero-animation-data', JSON.stringify({
              seen: true,
              timestamp: Date.now()
            }));
            
          }, 1000);
          
        }
      }
    ];

    const timeouts = timelineEvents.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(showButtonTimer);
      clearTimeout(hideButtonTimer);  
    };
  }, [inView, performMaskTransitionToNewText, animateWordsSequentially, createBackgroundParticles, animationCompleted]);

  useEffect(() => {
    if(isMobile) {
      setAnimationCompleted(true);
    }
  }), [isMobile];

  return (
    <section 
      ref={ref}
      className="min-h-screen w-full relative overflow-hidden bg-black"
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
      }}
    >
      {/* Jasne gradienty od dołu */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(to top, rgba(201, 107, 92, 0.47) 0%, rgba(244, 114, 181, 0.1) 50%, transparent 100%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: 'linear-gradient(to top, rgba(74, 0, 142, 0.2) 0%, rgba(59, 130, 246, 0.15) 30%, transparent 70%)',
          }}
        />
      </div>

      {/* Advanced Background Effects */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Dynamic Background Particles */}
        {backgroundElements.map(particle => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              transform: `scale(${particle.scale})`,
              opacity: particle.opacity,
              filter: 'blur(0.5px)',
              transition: 'all 0.5s ease-out',
            }}
          />
        ))}

        {/* Ambient Glow Effects */}
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #fd9f91 0%, transparent 0%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #f472b6 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite reverse',
          }}
        />

        {/* Geometric Background Patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-1/3 w-32 h-32 border border-white/20 rotate-45 animate-spin-slow" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-orange-300/20 rotate-12 animate-pulse" />
          <div className="absolute top-2/3 left-1/4 w-16 h-16 border border-pink-300/20 -rotate-12 animate-bounce-slow" />
        </div>
      </div>

      {/* Main Animation Container */}
      {!isMobile && !animationCompleted && (
        <div 
          ref={containerRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-full max-w-20xl mx-auto px-4 sm:px-8">
            <div 
              ref={textRef}
              className="relative flex items-center justify-center"
              style={{ minHeight: '350px' }}
            >
              {/* Main Animated Text */}
              {isTextVisible && (
                <h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-center leading-tight text-white px-8"
                  style={{
                    textShadow: '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(253, 159, 145, 0.2), 0 0 120px rgba(244, 114, 182, 0.1)',
                    letterSpacing: '-0.02em',
                    maxWidth: '90vw',
                    wordSpacing: '0.1em',
                    filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))',
                  }}
                >
                  {currentStep === 2 || currentStep === 3 ? (
                    renderAnimatedText()
                  ) : currentStep === 4 ? (
                    renderAnimatedText()
                  ) : (
                    renderAnimatedText()
                  )}
                </h1>
              )}

              {/* Sliding Mask - tylko przykrywa, nie wyjeżdża */}
              <div
                ref={maskRef}
                className="absolute inset-0 z-10 bg-black"
                style={{
                  transform: 'translateX(-100%)',
                  willChange: 'transform, opacity',
                }}
              />

              {/* Icon Animations - bez zmian */}
              {currentStep === 2 && (
                <div
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-20 transition-all duration-1200 ${
                    showCheckMark ? 'opacity-100 scale-100 translate-y-20' : 'opacity-0 scale-50 translate-y-24'
                  }`}
                  style={{
                    filter: showCheckMark ? 'blur(0px)' : 'blur(6px)',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div className="relative">
                    <div className="w-15 h-15 bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                      <Check className="w-13 h-13 text-white" strokeWidth={3} />
                    </div>
                    <div className="absolute inset-0 w-15 h-15 bg-emerald-400 rounded-full opacity-40 blur-xl animate-ping" />
                    <div className="absolute inset-0 w-15 h-15 bg-emerald-300 rounded-full opacity-20 blur-2xl animate-pulse" />
                    <div className="absolute inset-0 w-15 h-15 border-2 border-emerald-400 rounded-full animate-ping opacity-30" />
                    <div className="absolute inset-0 w-23 h-23 -m-4 border border-emerald-300 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-20 transition-all duration-1400 ${
                    showPercentage ? 'opacity-100 scale-100 translate-y-20' : 'opacity-0 scale-50 translate-y-24'
                  }`}
                  style={{
                    filter: showPercentage ? 'blur(0px)' : 'blur(6px)',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div className="relative">
                    <span 
                      className="text-5xl text-normal font-black text-emerald-400 block mt-20"
                      style={{
                        textShadow: '0 0 40px rgba(34, 197, 94, 0.6), 0 0 80px rgba(34, 197, 94, 0.3)',
                        animation: 'glow-pulse 2s ease-in-out infinite',
                      }}
                    >
                      100%
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 h-2 bg-emerald-400/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 rounded-full transform origin-left"
                        style={{ 
                          animation: showPercentage ? 'scale-x 1.5s ease-out' : 'none',
                          transform: showPercentage ? 'scaleX(1)' : 'scaleX(0)',
                        }}
                      />
                    </div>
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full animate-float"
                        style={{
                          left: `${25 + i * 20}%`,
                          top: `${-15 - i * 8}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: '3s',
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-20 transition-all duration-1200 ${
                    showFinalCheckMark ? 'opacity-100 scale-100 translate-y-20' : 'opacity-0 scale-50 translate-y-24'
                  }`}
                  style={{
                    filter: showFinalCheckMark ? 'blur(0px)' : 'blur(6px)',
                    transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                  }}
                >
                  <div className="relative">
                    <div className="w-15 h-15 bg-gradient-to-br from-emerald-400 via-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl mt-10">
                      <Check className="w-8 h-8 text-white" strokeWidth={4} />
                    </div>
                    <div className="absolute inset-0 w-18 h-18 -m-1.5 border-2 border-emerald-400 rounded-full animate-ping opacity-40" />
                    <div className="absolute inset-0 w-20 h-20 -m-2.5 border border-emerald-300 rounded-full animate-ping opacity-30" style={{ animationDelay: '0.3s' }} />
                    <div className="absolute inset-0 w-24 h-24 -m-4.5 border border-emerald-200 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.6s' }} />
                    <div className="absolute inset-0 w-15 h-15 bg-emerald-400 rounded-full opacity-30 blur-lg animate-pulse" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* // 4. PRZYCISK NETFLIX STYLE (dodaj przed zamknięciem głównej sekcji, ale po animacji) */}
      
      {/* Netflix-style Skip Intro Button - WIĘKSZY */}
      {showSkipButton && !animationCompleted && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in duration-500">
          <button
            onClick={skipIntro}
            className="group flex items-center gap-4 px-9 py-4 bg-black/80 hover:bg-black/90 text-white rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl cursor-pointer hover:cursor-pointer"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)',
            }}
          >
            {/* Ikona "forward" - WIĘKSZA */}
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                >
                  <path 
                    d="M8 5v14l11-7L8 5z" 
                    fill="currentColor"
                  />
                  <path 
                    d="M2 5v14l11-7L2 5z" 
                    fill="currentColor" 
                    opacity="0.6"
                  />
                </svg>
              </div>
            </div>
            
            {/* Tekst - WIĘKSZY */}
            <span className="font-medium text-base tracking-wide">
              Pomiń intro
            </span>
            
            {/* Subtelny gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </button>
        </div>
      )}

      {/* {HeroSection} */}
{animationCompleted && (
  <div className="min-h-screen flex flex-col relative">
    <div className="flex-1 flex items-center justify-center relative">
      <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 100%, rgba(246, 109, 59, 0.11) 0%, rgba(246, 199, 59, 0.1) 30%, transparent 70%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: 'radial-gradient(circle at 20% 80%, rgba(142, 31, 0, 0.19) 0%rgba(207, 117, 0, 0.07))) 30%, transparent 70%)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            background: 'radial-gradient(circle at 80% 80%, rgba(255, 100, 100, 0.12) 0%, rgba(238, 58, 97, 0.07) 30%, transparent 70%)',
          }}
        />
      </div>

      {backgroundElements.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: `scale(${particle.scale})`,
            opacity: particle.opacity,
            filter: 'blur(0.5px)',
            transition: 'all 0.5s ease-out',
          }}
        />
      ))}

      <div className={`w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center transition-all duration-2500 ease-out ${animationCompleted ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-12'}`}>
  <div className="space-y-4 sm:space-y-6">
    <div 
      className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-400 tracking-wider uppercase leading-relaxed font-medium mt-4 sm:mt-6 md:mt-8 mb-10"
      style={{ 
        animation: 'fadeInUp 1.2s ease-out 0.3s both',
        letterSpacing: '0.15em',
      }}
    >
      STUDIO WEB DEVELOPERSKIE W BIAŁYMSTOKU • TWORZYMY STRONY INTERNETOWE, APLIKACJE WEBOWE, SEO, CMS
    </div>

    <h1 
      className="text-xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl md:font-thin text-white leading-tight"
      style={{ 
        animation: 'fadeInUp 1.2s ease-out 0.6s both',
        letterSpacing: '-0.02em',
        textShadow: '0 0 30px rgba(255,255,255,0.1)',
      }}
    >
      Dobra strona to pierwszy krok do{' '}
      <span className="font-normal bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
        sukcesu twojej firmy!
      </span>
    </h1>

    <div 
      className="max-w-2xl mx-auto text-gray-300 text-sm sm:text-base md:text-[16px] lg:text-[17px] leading-relaxed md:font-thin"
      style={{ 
        animation: 'fadeInUp 1.2s ease-out 0.9s both',
      }}
    >
      Twoja strona to więcej niż wizytówka - to narzędzie sprzedaży działające bez przerwy. Sprawdź, jak możemy uczynić ją Twoim najlepszym sprzedawcą.
    </div>

    <div 
      className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center justify-center my-10 mb-12"
      style={{ animation: 'fadeInUp 1.2s ease-out 1.2s both' }}
    >
      <a href="#services" className="group relative cursor-pointer transition-all duration-150 inline-block hover:scale-105 z-30">
        <button className="cursor-pointer flex items-center gap-1 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#fd9f91] text-black font-medium text-xs sm:text-sm transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#fd9f91]/30">
          <span className="select-none">Wybierz usługę</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-150 group-hover:translate-x-2" />
        </button>
      </a>

      <a href="/contact" className="group relative cursor-pointer transition-all duration-150 inline-block hover:scale-105 z-30">
        <button className="cursor-pointer flex items-center gap-1 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white bg-transparent text-white font-medium text-xs sm:text-sm transition-all duration-150 hover:bg-white hover:text-black active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/30">
          <span className="select-none">Umów konsultację</span>
          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-all duration-150 group-hover:translate-x-2" />
        </button>
      </a>
    </div>

    <div 
      className="space-y-4 sm:space-y-6"
      style={{ animation: 'fadeInUp 1.2s ease-out 1.5s both' }}
    >
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center text-gray-300">
        {[
          "Bezpłatna konsultacja",
          "Płatność dopiero po akceptacji projektu", 
          "Gwarancja satysfakcji"
        ].map((text, index) => (
          <div key={index} className="flex items-center gap-2 sm:gap-3 group hover:text-white transition-colors duration-500">
            <div className="relative">
              <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                <Check className="w-1.25 h-1.25 sm:w-1.5 sm:h-1.5 text-white" strokeWidth={4} />
              </div>
              <div className="absolute inset-0 w-3 h-3 sm:w-3.5 sm:h-3.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-50 blur-sm animate-ping" />
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs font-medium">{text}</span>
          </div>
        ))}
      </div>

      <p 
        className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed "
        style={{ animation: 'fadeInUp 1.2s ease-out 1.8s both' }}
      >
        Oferujemy pełne wsparcie na każdym etapie realizacji - 
        od pomysłu po wdrożenie i dalszy rozwój Twojej strony. Witaj w Whiteslope Studio!
      </p>

      <div 
        className="space-y-2"
        style={{ animation: 'fadeInUp 1.2s ease-out 2.1s both' }}
      >
        <h3 className="text-sm sm:text-base md:text-lg font-medium text-gray-300">Poznaj nas lepiej na LinkedIn</h3>
        
        <div className="flex justify-center gap-3 sm:gap-4 mt-1 sm:mt-2">
          {[
            { 
              name: "Patryk Kulesza", 
              link: "https://www.linkedin.com/in/patryk-kulesza-788397354/", 
              image: "https://media.licdn.com/dms/image/v2/D5603AQFGj_BwEwt8Gw/profile-displayphoto-shrink_400_400/B56ZVb.DxCHsAo-/0/1741004750177?e=1761782400&v=beta&t=HBTukk_-CDxT7X4cFkkaUn3lu8It22_elnKbJbQg-6M"
            },
            { 
              name: "Mateusz Malewski", 
              link: "https://www.linkedin.com/in/mateusz-malewski-b0834927b/", 
              image: "https://media.licdn.com/dms/image/v2/D4D03AQECr9J2GyByRQ/profile-displayphoto-crop_800_800/B4DZjGWKgfGgAI-/0/1755674357328?e=1761782400&v=beta&t=8zyyZ0vK3nbiL9QUX6w_8oxtplHzUmnyeNzDU9hPp6c"
            },
            { 
              name: "Bartłomiej Koźluk", 
              link: "https://www.linkedin.com/in/bart%C5%82omiej-ko%C5%BAluk-5a5391266/", 
              image: "https://static.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry"
            },
            { 
              name: "Daniel Wawrzos", 
              link: "https://www.linkedin.com/in/daniel-wawrzos-34b973338/", 
              image: "https://media.licdn.com/dms/image/v2/D4E03AQEA-6CMKztljw/profile-displayphoto-crop_800_800/B4EZh7R6dxHEAI-/0/1754414951840?e=1761782400&v=beta&t=8yIJOnaUx-kgX91m7ToW8HrTI9VFCTxDEKBMdui-hH0"
            }
          ].map((person, index) => (
            <div key={index} className="group relative">
              <a
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-110 border-2 border-gray-600 group-hover:border-[#fd9f91]"
                />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs md:text-sm whitespace-nowrap flex items-center gap-1 sm:gap-2">
                  <Linkedin className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-[#0077b5]" />
                  <span>{person.name}</span>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
    </div>

    <div className={`w-full py-6 sm:py-4 md:py-6 z-20 relative transition-all duration-1000 ease-out delay-1000 bg-gradient-to-r from-[#111111] via-[#0a0a0a] to-[#111111] border-t border-gray-800/50 backdrop-blur-sm ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-10">
          <div className="flex items-center flex-shrink-0 order-1 md:order-none group">
            <div className="flex mr-4 md:mr-5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 lg:w-6 lg:h-6 text-[#fd9f91] fill-current transition-transform duration-300 hover:scale-110"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="text-white">
              <span className="font-bold text-base lg:text-lg" style={{fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'}}>5.0</span>
              <span className="text-sm lg:text-base ml-3 text-gray-300" style={{fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'}}>
                <span className="hidden md:inline lg:hidden">1 opinia</span>
                <span className="md:hidden lg:inline">na podstawie 1 opinii</span>
              </span>
            </div>
          </div>

          <div className="flex-1 text-center px-4 md:px-6 lg:px-8 max-w-3xl xl:max-w-4xl order-2 md:order-none">
            <p className="text-white italic leading-relaxed text-sm sm:text-base md:text-lg relative" style={{fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'}}>
              <span className="text-4xl text-gray-600 absolute -top-2 -left-4">"</span>
              Współpraca z chłopakami była naprawdę bardzo profesjonalna, a odpowiedź często dostawałem kilka minut po zadaniu pytania
              <span className="text-4xl text-gray-600 absolute -bottom-4 -right-4">"</span>
              <span className="block mt-2"> - <strong className="text-[#fd9f91]">Sławek</strong></span>
            </p>
          </div>

          <div className="flex-shrink-0 order-3 md:order-none">
            <a href="#testimonials" className="group flex items-center text-white hover:text-[#fd9f91] transition-colors duration-500 min-h-[48px] px-4 lg:px-6 py-3 touch-manipulation rounded-full hover:bg-gray-100/10 relative overflow-hidden">
              <span className="font-medium mr-3 whitespace-nowrap group-hover:mr-4 transition-all duration-500 text-sm md:text-base relative z-10" style={{fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)'}}>
                <span className="lg:hidden">Więcej opinii</span>
                <span className="hidden lg:inline">Więcej opinii - Google</span>
              </span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-500 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-pink-400/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-shift {
          0%, 100% { 
            background-position: 0% 50%; 
          }
          50% { 
            background-position: 100% 50%; 
          }
        }

        @keyframes scale-x {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            filter: drop-shadow(0 0 20px rgba(34, 197, 94, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 40px rgba(34, 197, 94, 0.9));
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes slow-spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-in {
          animation: animate-in 0.5s ease-out forwards;
        }

        .fade-in {
          animation-name: animate-in;
        }
      `}</style>
    </section>
  );
};