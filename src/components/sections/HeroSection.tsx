'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Linkedin } from 'lucide-react';

export const linkedinProfiles = [
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

export const HeroPortfolioSection = () => {
  const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos1, setMousePos1] = useState({ x: 50, y: 50 });
  const [mousePos2, setMousePos2] = useState({ x: 50, y: 50 });

  const handleMouseMove1 = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos1({ x, y });
  };

  const handleMouseMove2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos2({ x, y });
  };

  const getAvatarPosition = (index: number, total: number) => {
    if (hoveredAvatar === null) {
      return {
        x: (index - (total - 1) / 2) * 20,
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
        x: -40 * (hoveredAvatar - index),
        scale: 0.9,
        zIndex: total - index,
      };
    } else {
      return {
        x: 40 * (index - hoveredAvatar),
        scale: 0.9,
        zIndex: total - index,
      };
    }
  };

  // Tracking mouse position dla subtelnych efektów
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fade in animation przy załadowaniu
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      className="max-w-9xl relative overflow-hidden min-h-100vh pt-40 pb-4 "
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
        
        minHeight: '600px',
      }}
    >
      {/* Eleganckie platynowe tło - bardzo przyciemnione */}
      <div
  className="absolute inset-0 overflow-hidden"
  style={{
    background: `
      
     
    `,
  }}
>
  {/* Smuga 1 - 30° w lewo */}
  <div
    className="absolute bottom-0 left-1/2"
    style={{
      width: '150px',
      height: '120%',
      background: 'linear-gradient(180deg, rgba(229, 228, 226, 0.15) 0%, rgba(229, 228, 226, 0.05) 50%, transparent 100%)',
      transform: 'translateX(-50%) translateX(-200px) rotate(-30deg)',
      transformOrigin: 'bottom center',
      filter: 'blur(40px)',
      mixBlendMode: 'screen',
    }}
  />

  {/* Smuga 2 - Prosto do góry (środek) */}
  <div
    className="absolute bottom-0 left-1/2"
    style={{
      width: '180px',
      height: '120%',
      background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.17) 0%, rgba(229, 228, 226, 0.08) 50%, transparent 100%)',
      transform: 'translateX(-50%)',
      transformOrigin: 'bottom center',
      filter: 'blur(50px)',
      mixBlendMode: 'screen',
    }}
  />

  {/* Smuga 3 - 30° w prawo */}
  <div
    className="absolute bottom-0 left-1/2"
    style={{
      width: '150px',
      height: '120%',
      background: 'linear-gradient(180deg, rgba(229, 228, 226, 0.15) 0%, rgba(229, 228, 226, 0.05) 50%, transparent 100%)',
      transform: 'translateX(-50%) translateX(200px) rotate(30deg)',
      transformOrigin: 'bottom center',
      filter: 'blur(40px)',
      mixBlendMode: 'screen',
    }}
  />

  {/* Dodatkowe refleksy dla większego efektu WOW */}
  <div
    className="absolute bottom-0 left-1/2"
    style={{
      width: '300px',
      height: '40%',
      background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
      transform: 'translateX(-50%)',
      filter: 'blur(60px)',
      mixBlendMode: 'overlay',
    }}
  />
</div>

      {/* Subtelny noise texture overlay dla premium look */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Mocny gradient overlay z góry - bardzo ciemny  */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 10%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.65) 50%)',
        }}
      />


      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #fd9f91 0%, transparent 10%)',
          filter: 'blur(80px)',
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #ff6b6b 0%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      />

      


      

      {/* Główna treść */}
      <div 
        className="flex flex-col items-center justify-center relative h-full z-10"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div className="w-full max-w-9xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center flex flex-col justify-center items-center">
            <div className="space-y-5 max-w-9xl">
              {/* Badge nad głównym nagłówkiem */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 backdrop-blur-sm"
                style={{
                  animation: 'float 3s ease-in-out infinite, fadeInUp 0.8s ease-out 0.2s both',
                }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 animate-pulse" />
                <span className="text-white-300 text-sm font-medium">
                  Tworzymy strony w nowoczesnym standardzie - Whiteslope Studio - Białystok
                </span>
              </div>

              {/* Nagłówek - wjeżdża jako drugi */}
              <h1 
                className="relative min-w-9xl"
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

              {/* Opis - wjeżdża jako trzeci */}
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

              {/* Buttony - 3D style z wypełnionym kolorem */}
              <div 
                className="flex flex-col sm:flex-row justify-center gap-3 pt-4"
                style={{
                  animation: 'fadeInUp 0.8s ease-out 0.8s both',
                }}
              >
      
      {/* Button 1 - Biało-platynowy z mouse tracking */}
      <button
        onMouseMove={handleMouseMove1}
        className="w-full sm:w-auto h-14 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 hover:cursor-pointer group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
        style={{
          background: `
            radial-gradient(circle at ${mousePos1.x}% ${mousePos1.y}%, 
              #ffa39bff 0%, 
              #ffa39bff 30%, 
              #ff9c93ff 60%, 
              #ff8277ff 100%)
          `,
        }}
      >
        <span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">
          Bezpłatna konsultacja
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>

      {/* Button 2 - Szary z mouse tracking */}
      <button
        onMouseMove={handleMouseMove2}
        className="w-full sm:w-auto h-14 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 hover:cursor-pointer group shadow-[0_4px_20px_rgba(107,107,107,0.2)] hover:shadow-[0_8px_30px_rgba(107,107,107,0.1)]"
        style={{
          background: `
            radial-gradient(circle at ${mousePos2.x}% ${mousePos2.y}%, 
              #e1e1e1ff 0%, 
              #e1e1e1ff 30%, 
              #dadadaff 60%, 
              #dadadaff 100%)
          `,
        }}
      >
        <span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">
          Stwórzmy stronę
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
      
    </div>
                
              

              





              
            </div>

            

            {/* 1. DIV NA GÓRZE - Ikonki LinkedIn - wjeżdża jako ostatni */}
            <div 
              className="mt-8"
              style={{
                animation: 'fadeInUp 0.8s ease-out 1.0s both',
              }}
            >
          <h2 className='text-gray-300 font-base'>Poznaj nas na LinkedIn:</h2>
           
           <div className="flex justify-center items-center relative" style={{ width: '200px', height: '80px' }}>
             {linkedinProfiles.map((person, index) => {
              const position = getAvatarPosition(index, linkedinProfiles.length);
              return (
                <div
                  key={index}
                  className="absolute transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${position.x}px) scale(${position.scale})`,
                    zIndex: position.zIndex,
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
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap flex items-center gap-2">
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

      <style jsx>{`
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translateY(30px);
      filter: blur(10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0px);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
  }
`}</style>
    </section>
  );
};

export default HeroPortfolioSection;