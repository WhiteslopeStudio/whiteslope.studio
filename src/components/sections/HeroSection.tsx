'use client';

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';

const LightRays = ({ className }: any) => {
  return (
    <div className={className} style={{
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(ellipse at top, rgba(229,228,226,0.06) 0%, transparent 70%)',
      filter: 'blur(24px)',
      pointerEvents: 'none',
    }} />
  );
};

const portfolioItems = [
  {
    id: '1',
    video: '/_resources/portfolio1.mp4',
    thumbnail: '/_resources/portfolio1.webp',
    title: 'Strony internetowe',
    subtitle: 'Nowoczesne strony już od 1500 zł',
  },
  {
    id: '2',
    video: '/_resources/portfolio2.mp4',
    thumbnail: '/_resources/portfolio2.webp',
    title: 'Aplikacje webowe',
    subtitle: 'Interaktywne serwisy',
  },
  {
    id: '3',
    video: '/_resources/portfolio7.mp4',
    thumbnail: '/_resources/portfolio6.webp',
    title: 'Asystenci AI',
    subtitle: 'Twój asystent już za 1000 zł',
  },
  {
    id: '4',
    video: '/_resources/portfolio3.mp4',
    thumbnail: '/_resources/portfolio3.webp',
    title: 'Pomocnicy AI',
    subtitle: 'Automatyzacja procesów',
  },
  {
    id: '5',
    video: '/_resources/portfolio4.mp4',
    thumbnail: '/_resources/portfolio4.webp',
    title: 'Email Marketing',
    subtitle: 'Zdobywaj klientów pocztą',
  },
  {
    id: '6',
    video: '/_resources/portfolio6.mp4',
    thumbnail: '/_resources/portfolio5.webp',
    title: 'Grafika 2D i 3D',
    subtitle: 'Wyższy poziom designu',
  },
];

const linkedinProfiles = [
  {
    name: 'Patryk Kulesza',
    link: 'https://www.linkedin.com/in/patryk-kulesza-788397354/',
    image: 'https://media.licdn.com/dms/image/v2/D5603AQFGj_BwEwt8Gw/profile-displayphoto-shrink_400_400/B56ZVb.DxCHsAo-/0/1741004750177?e=1761782400&v=beta&t=HBTukk_-CDxT7X4cFkkaUn3lu8It22_elnKbJbQg-6M',
  },
  {
    name: 'Mateusz Malewski',
    link: 'https://www.linkedin.com/in/mateusz-malewski-b0834927b/',
    image: 'https://media.licdn.com/dms/image/v2/D4D03AQECr9J2GyByRQ/profile-displayphoto-crop_800_800/B4DZjGWKgfGgAI-/0/1755674357328?e=1761782400&v=beta&t=8zyyZ0vK3nbiL9QUX6w_8oxtplHzUmnyeNzDU9hPp6c',
  },
  {
    name: 'Bartłomiej Koźluk',
    link: 'https://www.linkedin.com/in/bart%C5%82omiej-ko%C5%BAluk-5a5391266/',
    image: 'https://static.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry',
  },
  {
    name: 'Daniel Wawrzos',
    link: 'https://www.linkedin.com/in/daniel-wawrzos-34b973338/',
    image: 'https://media.licdn.com/dms/image/v2/D4E03AQEA-6CMKztljw/profile-displayphoto-crop_800_800/B4EZh7R6dxHEAI-/0/1754414951840?e=1761782400&v=beta&t=8yIJOnaUx-kgX91m7ToW8HrTI9VFCTxDEKBMdui-hH0',
  },
];

const companyLogos = [
  { name: 'Firma 1', logo: 'https://via.placeholder.com/200x80/ffffff/000000?text=Logo+1' },
  { name: 'Firma 2', logo: 'https://via.placeholder.com/200x80/ffffff/000000?text=Logo+2' },
  { name: 'Firma 3', logo: 'https://via.placeholder.com/200x80/ffffff/000000?text=Logo+3' },
  { name: 'Firma 4', logo: 'https://via.placeholder.com/200x80/ffffff/000000?text=Logo+4' },
];

export default function HeroPortfolioSection() {
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos1, setMousePos1] = useState({ x: 50, y: 50 });
  const [mousePos2, setMousePos2] = useState({ x: 50, y: 50 });
  const [isButton1Hovered, setIsButton1Hovered] = useState(false);
  const [isButton2Hovered, setIsButton2Hovered] = useState(false);
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  
  const heroSectionRef = useRef<HTMLElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const backgroundVideoContainerRef = useRef<HTMLDivElement>(null);
  const pinningAreaRef = useRef<HTMLDivElement>(null);
  const logosCarouselRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});
  const backgroundVideoRefs = useRef<{[key: string]: HTMLVideoElement | null}>({});

  // Auto-rotation co 5 sekund
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPortfolioIndex((prev) => (prev + 1) % portfolioItems.length);
      setVideoProgress(0);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animacja paska postępu
  useEffect(() => {
    setVideoProgress(0);
    const progressInterval = setInterval(() => {
      setVideoProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + (100 / 50);
      });
    }, 100);
    
    return () => clearInterval(progressInterval);
  }, [currentPortfolioIndex]);

  // Play video - MAX 5 SEKUND
  useEffect(() => {
    const currentItem = portfolioItems[currentPortfolioIndex];
    
    const video = videoRefs.current[currentItem.id];
    if (video) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
      setTimeout(() => {
        if (video) video.pause();
      }, 5000);
    }

    const bgVideo = backgroundVideoRefs.current[currentItem.id];
    if (bgVideo) {
      bgVideo.currentTime = 0;
      const playPromise = bgVideo.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    portfolioItems.forEach((item, idx) => {
      if (idx !== currentPortfolioIndex) {
        const otherVideo = videoRefs.current[item.id];
        if (otherVideo) otherVideo.pause();
        const otherBgVideo = backgroundVideoRefs.current[item.id];
        if (otherBgVideo) otherBgVideo.pause();
      }
    });
  }, [currentPortfolioIndex]);

  // ScrollTrigger
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    import('gsap').then((gsapModule) => {
      const gsap = gsapModule.default;
      import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
        const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        
        if (!heroSectionRef.current || !textContentRef.current || !backgroundVideoContainerRef.current || !pinningAreaRef.current) return;

        const section = heroSectionRef.current;

        gsap.to(textContentRef.current, {
          opacity: 0,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '30% top',
            scrub: 1,
          }
        });

        gsap.to(backgroundVideoContainerRef.current, {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: '25% top',
            end: '35% top',
            scrub: 1,
          }
        });

        ScrollTrigger.create({
          trigger: pinningAreaRef.current,
          start: 'top top',
          end: '+=2000',
          pin: true,
          pinSpacing: true,
        });

        if (logosCarouselRef.current) {
          gsap.to(logosCarouselRef.current, {
            x: '-50%',
            scrollTrigger: {
              trigger: logosCarouselRef.current,
              start: 'top 80%',
              end: 'bottom top',
              scrub: 1,
            }
          });
        }
      });
    });

    return () => {
      if (typeof window !== 'undefined') {
        import('gsap/ScrollTrigger').then((ScrollTriggerModule) => {
          ScrollTriggerModule.ScrollTrigger.getAll().forEach(st => st.kill());
        });
      }
    };
  }, []);

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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const goToPrevious = () => {
    setCurrentPortfolioIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length);
    setVideoProgress(0);
  };

  const goToNext = () => {
    setCurrentPortfolioIndex((prev) => (prev + 1) % portfolioItems.length);
    setVideoProgress(0);
  };

  return (
    <section
      ref={heroSectionRef}
      className="relative bg-black overflow-hidden"
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
      }}
    >
      <div
        ref={backgroundVideoContainerRef}
        className="fixed inset-0 opacity-0"
        style={{ zIndex: 0 }}
      >
        {portfolioItems.map((item, index) => (
          <div
            key={`bg-${item.id}`}
            className="absolute inset-0 transition-opacity duration-700"
            style={{
              opacity: index === currentPortfolioIndex ? 1 : 0,
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${item.thumbnail})`,
                filter: 'blur(50px) brightness(0.2)',
              }}
            />
            <video
              ref={(el) => {
                backgroundVideoRefs.current[item.id] = el;
              }}
              className="absolute inset-0 w-full h-full object-cover"
              src={item.video}
              muted
              loop
              playsInline
              webkit-playsinline="true"
              preload="auto"
              style={{
                filter: 'blur(50px) brightness(0.2)',
              }}
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
      </div>

      <div
        ref={textContentRef}
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <div className="absolute inset-0">
          <LightRays className="absolute inset-0" />
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

        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 10%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.65) 70%)',
          }}
        />

        <div 
          className="relative z-10 w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 pointer-events-auto"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s ease',
          }}
        >
          <div className="text-center flex flex-col justify-center items-center">
            <div className="space-y-5 max-w-full">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 backdrop-blur-sm"
                style={{
                  animation: 'fadeInUp 0.8s ease-out 0.2s both',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 animate-pulse" />
                <span className="text-white-300 text-sm font-medium">
                  Tworzymy strony w nowoczesnym standardzie - Whiteslope Studio - Białystok
                </span>
              </div>

              <h1 
                className="relative"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 6rem)',
                  lineHeight: '0.95',
                  letterSpacing: '-0.03em',
                  marginTop: '1rem',
                  fontWeight: 575,
                  animation: 'fadeInUp 0.8s ease-out 0.4s both',
                }}
              >
                <span 
                  className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 80px rgba(253, 159, 145, 0.3)',
                  }}
                >
                  Pokaż się online<br/> z dobrej strony!
                </span>
              </h1>

              <p 
                className="text-gray-400 text-2xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-semibold"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                  animation: 'fadeInUp 0.8s ease-out 0.6s both',
                }}
              >
                Twoja strona to więcej niż wizytówka - to narzędzie<br/> sprzedaży działające bez przerwy. 
                Sprawdź ofertę!
              </p>

              <div 
                className="flex flex-col sm:flex-row justify-center gap-3 pt-4"
                style={{
                  animation: 'fadeInUp 0.8s ease-out 0.8s both',
                }}
              >
                <a
                  href="/contact#contact-form"
                  onMouseMove={handleMouseMove1}
                  onMouseEnter={() => setIsButton1Hovered(true)}
                  onMouseLeave={() => {
                    setIsButton1Hovered(false);
                    setMousePos1({ x: 50, y: 50 });
                  }}
                  className="w-full sm:w-auto h-14 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] inline-flex"
                  style={{
                    background: `radial-gradient(circle at ${mousePos1.x}% ${mousePos1.y}%, #ffa39bff 0%, #ffa39bff 30%, #ff9c93ff 60%, #ff8277ff 100%)`,
                  }}
                >
                  <span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">
                    Bezpłatna konsultacja
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>

                <a
                  href="/pricing/website"
                  onMouseMove={handleMouseMove2}
                  onMouseEnter={() => setIsButton2Hovered(true)}
                  onMouseLeave={() => {
                    setIsButton2Hovered(false);
                    setMousePos2({ x: 50, y: 50 });
                  }}
                  className="w-full sm:w-auto h-14 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(107,107,107,0.2)] inline-flex"
                  style={{
                    background: `radial-gradient(circle at ${mousePos2.x}% ${mousePos2.y}%, #e1e1e1ff 0%, #e1e1e1ff 30%, #dadadaff 60%, #dadadaff 100%)`,
                  }}
                >
                  <span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">
                    Stwórzmy stronę
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>

            <div 
              className="my-8"
              style={{
                animation: 'fadeInUp 0.8s ease-out 1.0s both',
              }}
            >
              <h2 className='text-gray-300 font-base'>Poznaj nas na LinkedIn:</h2>
           
              <div className="flex justify-center items-center relative" style={{ width: '350px', height: '80px' }}>
                {linkedinProfiles.map((person, index) => {
                  const position = getAvatarPosition(index, linkedinProfiles.length);
                  return (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        transform: `translateX(${position.x}px) scale(${position.scale})`,
                        zIndex: position.zIndex,
                        transition: 'all 0.7s ease-out',
                      }}
                      onMouseEnter={() => setHoveredAvatar(index)}
                      onMouseLeave={() => setHoveredAvatar(null)}
                    >
                      <a
                        href={person.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative group"
                      >
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-14 h-14 rounded-full object-cover transition-all duration-300 border-2 border-gray-600 group-hover:border-[#fd9f91] group-hover:shadow-lg"
                        />
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap flex items-center gap-2 pointer-events-none">
                          <Linkedin className="w-3 h-3 text-[#0077b5]" />
                          <span>{person.name}</span>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: '100vh' }} />

      <div
        ref={pinningAreaRef}
        className="relative h-screen"
        style={{ zIndex: 10 }}
      >
        <div
          ref={videoPlayerRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-8"
        >
          <div className="w-full max-w-[1400px]">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-300 active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
                {portfolioItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      opacity: index === currentPortfolioIndex ? 1 : 0,
                      transform: index === currentPortfolioIndex ? 'scale(1)' : 'scale(0.95)',
                      zIndex: index === currentPortfolioIndex ? 10 : 0,
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${item.thumbnail})`,
                      }}
                    />

                    <video
                      ref={(el) => {
                        videoRefs.current[item.id] = el;
                      }}
                      className="absolute inset-0 w-full h-full object-cover"
                      src={item.video}
                      muted
                      playsInline
                      webkit-playsinline="true"
                      preload="auto"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute bottom-8 left-8 right-8">
                      <h3 className="text-5xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-2xl text-white/90 mb-4">{item.subtitle}</p>
                      
                      <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
                          style={{ 
                            width: `${index === currentPortfolioIndex ? videoProgress : 0}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-white text-center mb-6">
                Zaufali nam
              </h3>
              
              <div className="overflow-hidden">
                <div 
                  ref={logosCarouselRef}
                  className="flex gap-12 items-center justify-center"
                  style={{ width: '200%' }}
                >
                  {[...companyLogos, ...companyLogos].map((company, index) => (
                    <img
                      key={index}
                      src={company.logo}
                      alt={company.name}
                      className="h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                      style={{
                        filter: 'brightness(0) invert(1)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}