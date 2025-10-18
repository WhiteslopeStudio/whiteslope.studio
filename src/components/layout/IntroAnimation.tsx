'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useAdvancedInView } from '@/utils/hooks';
import { Check, PersonStanding, Globe, MessageCircle, Settings } from 'lucide-react';
import { FaWalking } from 'react-icons/fa';

// Typy i dane
interface AnimatedWord {
  word: string;
  visible: boolean;
}

// Własny hook do szybkiego wykrywania mobilnego
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    // Sprawdź natychmiast
    checkMobile();
    
    // Dodaj listener dla resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [ref, inView] = useAdvancedInView() as [React.RefObject<HTMLDivElement>, boolean];
  const isMobile = useIsMobile();
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCheckMark, setShowCheckMark] = useState(false);
  const [showPercentage, setShowPercentage] = useState(false);
  const [showFinalCheckMark, setShowFinalCheckMark] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [backgroundElements, setBackgroundElements] = useState<
    Array<{ id: number; x: number; y: number; scale: number; opacity: number }>
  >([]);
  const [animatedWords, setAnimatedWords] = useState<AnimatedWord[]>([]);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [currentAnimationId, setCurrentAnimationId] = useState(0);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const [mobileChecked, setMobileChecked] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // NATYCHMIASTOWE WYŁĄCZENIE NA MOBILE
  useEffect(() => {
    if (isMobile && !mobileChecked) {
      console.log('Mobile detected - skipping cinematic animation');
      setAnimationCompleted(true);
      setIsTextVisible(false);
      setMobileChecked(true);
      onComplete();
    }
  }, [isMobile, mobileChecked, onComplete]);

  // Sprawdzenie, czy animacja była już widziana
  useEffect(() => {
    if (isMobile) return; // Nie sprawdzaj na mobile
    
    const animationData = localStorage.getItem('hero-animation-data');
    if (animationData) {
      const { seen, timestamp } = JSON.parse(animationData);
      const dayInMs = 24 * 60 * 60 * 1000; // co 24 godziny odpalany nowa filmik
      if (Date.now() - timestamp > dayInMs) {
        localStorage.removeItem('hero-animation-data');
      } else {
        setAnimationCompleted(true);
        setIsTextVisible(false);
        onComplete();
      }
    }
  }, [onComplete, isMobile]);

  // Funkcja pomijania animacji
  const skipIntro = useCallback(() => {
    setShowSkipButton(false);
    setAnimationCompleted(true);
    setIsAnimating(false);
    setIsTextVisible(false);
    setCurrentStep(0);
    setBackgroundElements([]);
    setShowCheckMark(false);
    setShowPercentage(false);
    setShowFinalCheckMark(false);
    localStorage.setItem(
      'hero-animation-data',
      JSON.stringify({
        seen: true,
        timestamp: Date.now(),
      })
    );
    onComplete();
  }, [onComplete]);

  // Funkcje animacji
  const animateWordsSequentially = useCallback(
    (text: string, animationId: number, onComplete?: () => void) => {
      const words = text.split(' ');
      const wordsWithState = words.map((word) => ({ word, visible: false }));

      setAnimatedWords([]);
      setTimeout(() => {
        setCurrentAnimationId((currentId) => {
          if (currentId === animationId) {
            setAnimatedWords(wordsWithState);
            words.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedWords((prev: AnimatedWord[]) => {
                  if (prev.length !== words.length) return prev;
                  return prev.map((item, i) =>
                    i === index ? { ...item, visible: true } : item
                  );
                });
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
    },
    []
  );

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const easeOutQuart = (t: number): number => {
    return 1 - Math.pow(1 - t, 4);
  };

  const animateWithMotionBlur = useCallback(
    (
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
    },
    []
  );

  const createBackgroundParticles = useCallback(
    (count: number, animationType: 'float' | 'spiral' | 'wave') => {
      const particles = Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.5 + Math.random() * 0.5,
        opacity: 0.05 + Math.random() * 0.15,
      }));

      setBackgroundElements(particles);

      const animateParticles = () => {
        setBackgroundElements((prev) =>
          prev.map((particle) => {
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
    },
    []
  );

  const performMaskTransitionToNewText = useCallback(
    (
      newText: string,
      showIcon: 'check' | 'percentage' | 'final-check' | null = null,
      delay: number = 0,
      backgroundEffect: 'particles' | 'waves' | 'spiral' | null = null
    ) => {
      setTimeout(() => {
        setIsAnimating(true);
        setBackgroundElements([]);

        const maskElement = maskRef.current;

        if (maskElement) {
          animateWithMotionBlur(
            maskElement,
            'transform',
            -100,
            0,
            150,
            easeOutQuart,
            () => {
              setIsTextVisible(false);
              setAnimatedWords([]);

              setTimeout(() => {
                setCurrentStep((prev) => prev + 1);

                setTimeout(() => {
                  animateWithMotionBlur(
                    maskElement,
                    'opacity',
                    1,
                    0,
                    10,
                    easeOutQuart,
                    () => {
                      maskElement.style.transform = 'translateX(-100%)';
                      maskElement.style.opacity = '1';
                      setIsAnimating(false);

                      setTimeout(() => {
                        setIsTextVisible(true);
                        const newAnimationId = Date.now();
                        setCurrentAnimationId(newAnimationId);

                        animateWordsSequentially(newText, newAnimationId, () => {
                          if (backgroundEffect === 'particles') {
                            createBackgroundParticles(15, 'float');
                          } else if (backgroundEffect === 'waves') {
                            createBackgroundParticles(8, 'wave');
                          } else if (backgroundEffect === 'spiral') {
                            createBackgroundParticles(12, 'spiral');
                          }

                          if (showIcon === 'check') {
                            setTimeout(() => setShowCheckMark(true), 400);
                          } else if (showIcon === 'percentage') {
                            setTimeout(() => setShowPercentage(true), 400);
                          } else if (showIcon === 'final-check') {
                            setTimeout(() => setShowFinalCheckMark(true), 400);
                          }
                        });
                      }, 50);
                    }
                  );
                }, 100);
              }, 100);
            }
          );
        }
      }, delay);
    },
    [animateWithMotionBlur, createBackgroundParticles, animateWordsSequentially]
  );

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
                <FaWalking className="inline w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-orange-400" />
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

            {index < animatedWords.length - 1 && (
              <span
                className={`transition-opacity duration-700 ${
                  wordObj.visible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {' '}
              </span>
            )}
          </span>
        ))}
      </>
    );
  }, [animatedWords, currentAnimationId, currentStep]);

  // Logika animacji TYLKO dla desktop
  useEffect(() => {
    if (isMobile || animationCompleted || !inView) {
      return;
    }

    const showButtonTimer = setTimeout(() => {
      setShowSkipButton(true);
    }, 2000);

    const hideButtonTimer = setTimeout(() => {
      setShowSkipButton(false);
    }, 9000);

    setCurrentStep(0);
    setIsTextVisible(true);
    setCurrentAnimationId(1);

    const timelineEvents = [
      {
        delay: 0,
        action: () => {
          createBackgroundParticles(25, 'float');
          setTimeout(() => {
            animateWordsSequentially(
              'Wszystkie drogi prowadzą do Whiteslope Studio!',
              1
            );
          }, 800);
        },
      },
      {
        delay: 4500,
        action: () => {
          performMaskTransitionToNewText(
            'Tworzymy tu strony internetowe dla firm i osób prywatnych!',
            null,
            0,
            'particles'
          );
        },
      },
      {
        delay: 9000,
        action: () => {
          setShowFinalCheckMark(false);
          setBackgroundElements([]);
          setTimeout(() => {
            setAnimationCompleted(true);
            localStorage.setItem(
              'hero-animation-data',
              JSON.stringify({
                seen: true,
                timestamp: Date.now(),
              })
            );
            onComplete();
          }, 1000);
        },
      },
    ];

    const timeouts = timelineEvents.map(({ delay, action }) =>
      setTimeout(action, delay)
    );

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(showButtonTimer);
      clearTimeout(hideButtonTimer);
    };
  }, [
    inView,
    animationCompleted,
    isMobile,
    performMaskTransitionToNewText,
    animateWordsSequentially,
    createBackgroundParticles,
    onComplete,
  ]);

  // NIE RENDERUJ NIC NA MOBILE
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={`fixed inset-0 z-50 bg-black transition-opacity duration-500 ${
        animationCompleted ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={containerRef} className="relative w-full max-w-20xl mx-auto px-4 sm:px-8">
          <div ref={textRef} className="relative flex items-center justify-center" style={{ minHeight: '350px' }}>
            {isTextVisible && (
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-center leading-tight text-white px-8"
                style={{
                  textShadow:
                    '0 0 40px rgba(255,255,255,0.3), 0 0 80px rgba(253, 159, 145, 0.2), 0 0 120px rgba(244, 114, 182, 0.1)',
                  letterSpacing: '-0.02em',
                  maxWidth: '90vw',
                  wordSpacing: '0.1em',
                  filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))',
                }}
              >
                {renderAnimatedText()}
              </h1>
            )}
            <div
              ref={maskRef}
              className="absolute inset-0 z-10 bg-black"
              style={{ transform: 'translateX(-100%)', willChange: 'transform, opacity' }}
            />

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

      {showSkipButton && !animationCompleted && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in duration-500">
          <button
            onClick={skipIntro}
            className="group flex items-center gap-4 px-9 py-4 bg-black/80 hover:bg-black/90 text-white rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
            style={{
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 4px 16px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                >
                  <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
                  <path d="M2 5v14l11-7L2 5z" fill="currentColor" opacity="0.6" />
                </svg>
              </div>
            </div>
            <span className="font-medium text-base tracking-wide">Pomiń intro</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
          </button>
        </div>
      )}

      {/* Gradienty tła */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'linear-gradient(to top, rgba(201, 107, 92, 0.47) 0%, rgba(244, 114, 181, 0.1) 50%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background:
              'linear-gradient(to top, rgba(74, 0, 142, 0.2) 0%, rgba(59, 130, 246, 0.15) 30%, transparent 70%)',
          }}
        />
      </div>

      {/* Advanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {backgroundElements.map((particle) => (
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

        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, #fd9f91 0%, transparent 70%)',
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

        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/3 left-1/3 w-32 h-32 border border-white/20 rotate-45 animate-spin-slow" />
          <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border border-orange-300/20 rotate-12 animate-pulse" />
          <div className="absolute top-2/3 left-1/4 w-16 h-16 border border-pink-300/20 -rotate-12 animate-bounce-slow" />
        </div>
      </div>

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

        /* Hide scrollbar */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default IntroAnimation;