// 'use client';

// import { useState } from 'react';
// import { ArrowRight, Linkedin, ChevronUp, ChevronDown } from 'lucide-react';
// import { PROJECT_EXAMPLES } from '@/lib/data';

// // Dane LinkedIn
// const linkedinProfiles = [
//   {
//     name: 'Patryk Kulesza',
//     link: 'https://www.linkedin.com/in/patryk-kulesza-788397354/',
//     image: 'https://media.licdn.com/dms/image/v2/D5603AQFGj_BwEwt8Gw/profile-displayphoto-shrink_400_400/B56ZVb.DxCHsAo-/0/1741004750177?e=1761782400&v=beta&t=HBTukk_-CDxT7X4cFkkaUn3lu8It22_elnKbJbQg-6M',
//   },
//   {
//     name: 'Mateusz Malewski',
//     link: 'https://www.linkedin.com/in/mateusz-malewski-b0834927b/',
//     image: 'https://media.licdn.com/dms/image/v2/D4D03AQECr9J2GyByRQ/profile-displayphoto-crop_800_800/B4DZjGWKgfGgAI-/0/1755674357328?e=1761782400&v=beta&t=8zyyZ0vK3nbiL9QUX6w_8oxtplHzUmnyeNzDU9hPp6c',
//   },
//   {
//     name: 'Bartłomiej Koźluk',
//     link: 'https://www.linkedin.com/in/bart%C5%82omiej-ko%C5%BAluk-5a5391266/',
//     image: 'https://static.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry',
//   },
//   {
//     name: 'Daniel Wawrzos',
//     link: 'https://www.linkedin.com/in/daniel-wawrzos-34b973338/',
//     image: 'https://media.licdn.com/dms/image/v2/D4E03AQEA-6CMKztljw/profile-displayphoto-crop_800_800/B4EZh7R6dxHEAI-/0/1754414951840?e=1761782400&v=beta&t=8yIJOnaUx-kgX91m7ToW8HrTI9VFCTxDEKBMdui-hH0',
//   },
// ];

// export default function HeroPortfolioSection() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);

//   const currentProject = PROJECT_EXAMPLES[activeIndex];

//   const handleNext = () => {
//     setActiveIndex((prev) => (prev + 1) % PROJECT_EXAMPLES.length);
//   };

//   const handlePrev = () => {
//     setActiveIndex((prev) => (prev - 1 + PROJECT_EXAMPLES.length) % PROJECT_EXAMPLES.length);
//   };

//   // Funkcja obliczająca pozycję karty w stosie
//   const getCardStyle = (projectIndex: number) => {
//     // Oblicz relatywną pozycję (0 = przód, 1 = drugie miejsce, itd.)
//     const relativePosition = (projectIndex - activeIndex + PROJECT_EXAMPLES.length) % PROJECT_EXAMPLES.length;
    
//     // Karta z przodu (relativePosition = 0)
//     if (relativePosition === 0) {
//       return {
//         transform: 'translateY(0) scale(1)',
//         zIndex: 100,
//         opacity: 1,
//       };
//     }
    
//     // Pozostałe karty - zmniejszone, wyżej, z mniejszym z-index
//     const scale = 1 - (relativePosition * 0.08); // Każda kolejna karta jest o 8% mniejsza
//     const yOffset = -relativePosition * 40; // Każda kolejna karta jest 40px wyżej
//     const zIndex = 100 - relativePosition;
//     const opacity = Math.max(0.3, 1 - (relativePosition * 0.2)); // Zanikanie
    
//     return {
//       transform: `translateY(${yOffset}px) scale(${scale})`,
//       zIndex,
//       opacity,
//     };
//   };

//   const getAvatarPosition = (index: number, total: number) => {
//     if (hoveredAvatar === null) {
//       return {
//         x: (index - (total - 1) / 2) * 20,
//         scale: 1,
//         zIndex: total - index,
//       };
//     }
//     if (hoveredAvatar === index) {
//       return {
//         x: 0,
//         scale: 1.2,
//         zIndex: total,
//       };
//     }
//     if (index < hoveredAvatar) {
//       return {
//         x: -40 * (hoveredAvatar - index),
//         scale: 0.9,
//         zIndex: total - index,
//       };
//     } else {
//       return {
//         x: 40 * (index - hoveredAvatar),
//         scale: 0.9,
//         zIndex: total - index,
//       };
//     }
//   };

//   return (
//     <section className="w-full min-h-screen relative overflow-hidden bg-black">
//       {/* TŁO - Rozjaśnione (brightness 0.35 zamiast 0.2) */}
//       <div
//         className="absolute inset-0 transition-all duration-500 ease-out"
//         style={{
//           backgroundImage: `url(${currentProject.image})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           filter: 'blur(40px) brightness(0.35)',
//         }}
//       />
      
//       {/* Lżejsza warstwa przyciemnienia */}
//       <div className="absolute inset-0 bg-black/60" />

//       {/* GŁÓWNA TREŚĆ */}
//       <div className="relative z-10 flex flex-col items-center px-4 pt-20">
        
//         {/* 1. DIV NA GÓRZE - Ikonki LinkedIn */}
//         <div className="mb-8">
//           <h3 className="text-sm text-gray-300 mb-4 text-center">
//             Poznaj nas lepiej na LinkedIn
//           </h3>
//           <div className="flex justify-center items-center relative" style={{ width: '200px', height: '80px' }}>
//             {linkedinProfiles.map((person, index) => {
//               const position = getAvatarPosition(index, linkedinProfiles.length);
//               return (
//                 <div
//                   key={index}
//                   className="absolute transition-all duration-500 ease-out"
//                   style={{
//                     transform: `translateX(${position.x}px) scale(${position.scale})`,
//                     zIndex: position.zIndex,
//                   }}
//                   onMouseEnter={() => setHoveredAvatar(index)}
//                   onMouseLeave={() => setHoveredAvatar(null)}
//                 >
//                   <a
//                     href={person.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="block relative group"
//                   >
//                     <img
//                       src={person.image}
//                       alt={person.name}
//                       className="w-14 h-14 rounded-full object-cover transition-all duration-300 border-2 border-gray-600 group-hover:border-[#fd9f91] group-hover:shadow-lg"
//                     />
//                     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap flex items-center gap-2">
//                       <Linkedin className="w-3 h-3 text-[#0077b5]" />
//                       <span>{person.name}</span>
//                     </div>
//                   </a>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* 2. H1 - Główny nagłówek */}
//         <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white text-center mb-6 max-w-4xl">
//           Dobra strona to pierwszy krok do sukcesu twojej firmy!
//         </h1>

//         {/* 3. AKAPIT - Opis */}
//         <p className="text-gray-300 text-base md:text-lg text-center max-w-2xl mb-8">
//           Twoja strona to więcej niż wizytówka - to narzędzie sprzedaży działające bez przerwy. 
//           Sprawdź, jak możemy uczynić ją Twoim najlepszym sprzedawcą.
//         </p>

//         {/* 4. CTA - Przycisk */}
//         <div className="mb-16">
//           <a href="/contact" className="group inline-block">
//             <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#fd9f91] text-black font-medium text-lg transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg hover:scale-105 active:scale-95">
//               <span>Bezpłatna konsultacja</span>
//               <ArrowRight className="w-5 h-5 transition-transform duration-150 group-hover:translate-x-2" />
//             </button>
//           </a>
//         </div>

//         {/* 5. SEKCJA Z KARTAMI - Stos kart z animacją */}
//         <div className="w-full max-w-6xl mx-auto mb-12">
          
//           {/* Kontener na stos kart */}
//           <div className="relative w-full" style={{ height: '55vh', minHeight: '400px' }}>
//             {PROJECT_EXAMPLES.map((project, index) => {
//               const cardStyle = getCardStyle(index);
              
//               return (
//                 <div
//                   key={project.id}
//                   className="absolute inset-0 transition-all duration-500 ease-out"
//                   style={{
//                     ...cardStyle,
//                     transformOrigin: 'center top',
//                   }}
//                 >
//                   {/* KARTA - miniaturka zmniejszona lekko (55vh zamiast 66vh) */}
//                   <div 
//                     className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
//                   >
//                     <img
//                       src={project.image}
//                       alt={project.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* POD KARTAMI: Nazwa po lewej, Strzałki po prawej */}
//           <div className="flex items-center justify-between gap-8 mt-8">
            
//             {/* LEWA STRONA - Nazwa i przycisk */}
//             <div className="flex flex-col gap-4 flex-1">
//               <h3 className="text-white text-2xl md:text-3xl font-semibold">
//                 {currentProject.title}
//               </h3>
              
//               <a
//                 href={currentProject.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group inline-flex items-center gap-2 self-start"
//               >
//                 <button className="flex items-center gap-2 bg-[#fd9f91] px-6 py-3 rounded-lg text-black font-medium hover:bg-[#fc8a7a] transition-all">
//                   <span>Zobacz stronę</span>
//                   <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                 </button>
//               </a>
//             </div>

//             {/* PRAWA STRONA - Strzałki */}
//             <div className="flex flex-col gap-4">
//               <button
//                 onClick={handlePrev}
//                 className="bg-white/10 hover:bg-[#fd9f91] rounded-full p-4 text-white transition-all hover:scale-110 active:scale-95"
//               >
//                 <ChevronUp className="w-6 h-6" />
//               </button>
              
//               <button
//                 onClick={handleNext}
//                 className="bg-white/10 hover:bg-[#fd9f91] rounded-full p-4 text-white transition-all hover:scale-110 active:scale-95"
//               >
//                 <ChevronDown className="w-6 h-6" />
//               </button>
//             </div>

//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

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
        className="absolute inset-0"
        style={{
          // background: `
          //   radial-gradient(ellipse at bottom,rgb(58, 69, 87) 0%, #1f2937 50%, #111827 100%),
          //   linear-gradient(135deg,rgb(79, 86, 97) 0%,#1f2937 50%, #111827 100%)
          // `,
        }}
      />

      {/* Subtelny noise texture overlay dla premium look */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Mocny gradient overlay z góry - bardzo ciemny */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.61) 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.65) 70%)',
        }}
      />

      {/* Subtelne świecące koła w tle - dla głębi */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, #fd9f91 0%, transparent 70%)',
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
                  
                }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 animate-pulse" />
                <span className="text-white-300 text-sm font-medium">
                  Tworzymy strony w nowoczesnym standardzie - Whiteslope Studio - Białystok
                </span>
              </div>

              {/* Nagłówek - OGROMNY z gradientem */}
              <h1 
                className=" relative min-w-9xl"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 6rem)',
                  lineHeight: '0.95',
                  letterSpacing: '-0.03em',
                  marginTop: '1rem',
                  fontWeight: 575,
                }}
              >
                <span 
                  className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 80px rgba(253, 159, 145, 0.3)',
                  }}
                >
                  Pokaż się online<br/> z dobrej strony!

                  {/* Pokaz się z dobrej strony */}
                </span>
                
                <span 
                  className="bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent relative inline-block"
                  font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparen
                  style={{
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                  }}
                >
                   {""}
                </span>
              </h1>

              {/* Opis */}
              <p 
                className="text-gray-400 text-2xl md:text-2xl leading-relaxed max-w-3xl mx-auto font-semibold"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                Twoja strona to więcej niż wizytówka - to narzędzie<br/> sprzedaży działające bez przerwy. 
                Sprawdź ofertę!
              </p>

              {/* Buttony - dopracowane z efektem hover "poszarzenia" */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
                {/* Button 1 - Bezpłatna konsultacja (biały) */}
                <button className="w-full sm:w-auto h-12 rounded-full bg-white text-black font-semibold text-base transition-all duration-300 hover:brightness-75 active:scale-95 px-7 cursor-pointer hover:shadow-lg">
                  Bezpłatna konsultacja
                </button>

                <button className="w-full sm:w-auto h-12 rounded-full bg-[#2f2f2f] text-white font-semibold text-base transition-all duration-300 hover:brightness-75 active:scale-95 px-7 cursor-pointer hover:shadow-lg">
                  Stwórzmy stronę
                </button>
              </div>

              





              
            </div>

            {/* 1. DIV NA GÓRZE - Ikonki LinkedIn */}
         <div className="mt-8">
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

      {/* Animacje CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
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