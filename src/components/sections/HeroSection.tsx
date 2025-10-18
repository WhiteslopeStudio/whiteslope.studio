'use client';

import { useState } from 'react';
import { ArrowRight, Linkedin } from 'lucide-react';

const LightRays = ({ className }: any) => {
  return (
    <div 
      className={className} 
      style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at top, rgba(229,228,226,0.06) 0%, transparent 70%)',
        filter: 'blur(24px)',
        pointerEvents: 'none',
      }} 
    />
  );
};

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

export default function HeroSection() {
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
      className="relative bg-black overflow-hidden py-20 md:pt-45"
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
              
              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full  backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 animate-pulse" />
                <span className="text-white-300 text-sm font-medium">
                  strony internetowe · integracja AI · email marketing · grafika 2D i 3D
                </span>
              </div>

              {/* H1 - NAGŁÓWEK */}
              <h1 
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
                  className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
                  style={{
                    textShadow: '0 0 80px rgba(253, 159, 145, 0.3)',
                  }}
                >
                  Pokaż się online<br/> z dobrej strony!
                </span>
              </h1>

              {/* PODTYTUŁ */}
              <p 
                className="text-gray-400 text-xl md:text-xl leading-relaxed max-w-2xl mx-auto font-semibold"
                style={{
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                Tworzymy Strony Internetowe dla biznesów i osób prywatnych. Pozwól sobie pozwalać na więcej wraz ze stroną!

                
              </p>

              {/* PRZYCISKI */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
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
                    background: `radial-gradient(circle at ${mousePos2.x}% ${mousePos2.y}%, #e1e1e12b 0%, #e1e1e122 30%, #e1e1e11c 60%, #e1e1e112 100%)`,
                  }}
                >
                  <span className="relative z-10 text-white/80 h-full w-full flex items-center justify-center gap-2 px-8 font-medium">
                    Stwórzmy stronę
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </a>
              </div>
            </div>

            {/* LINKEDIN AVATARY */}
            {/* <div className="my-8">
              <h2 className="text-gray-300 font-base">Poznaj nas na LinkedIn:</h2>
           
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
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb- opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/90 text-white px-3 py-2 rounded-lg text-xs whitespace-nowrap flex items-center gap-2 pointer-events-none">
                          <Linkedin className="w-3 h-3 text-[#0077b5]" />
                          <span>{person.name}</span>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}











// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { ArrowRight, Linkedin, ChevronLeft, ChevronRight, ExternalLink, Maximize } from 'lucide-react';

// // LightRays z dynamicznymi kolorami
// const LightRays = ({ className, colorIndex }: any) => {
//   // Kolory bazowane na aktualnym portfolio item
//   const colors = [
//     'rgba(173, 216, 230, 0.06)', // niebieski
//     'rgba(255, 182, 193, 0.06)', // różowawy
//     'rgba(144, 238, 144, 0.06)', // zielonkawy
//     'rgba(255, 228, 181, 0.06)', // pomarańczowy
//     'rgba(221, 160, 221, 0.06)', // fioletowy
//     'rgba(255, 250, 205, 0.06)', // żółtawy
//   ];
  
//   const color = colors[colorIndex % colors.length];
  
//   return (
//     <div 
//       className={className} 
//       style={{
//         position: 'absolute',
//         inset: 0,
//         background: `radial-gradient(ellipse at top, ${color} 0%, transparent 70%)`,
//         filter: 'blur(24px)',
//         pointerEvents: 'none',
//         transition: 'background 0.8s ease-in-out',
//       }} 
//     />
//   );
// };

// export const linkedinProfiles = [
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

// interface PortfolioItem {
//   id: number;
//   video: string;
//   title: string;
//   description: string;
//   logo?: string;
//   href: string;
// }

// const portfolioData: PortfolioItem[] = [
//   {
//     id: 1,
//     video: '/_resources/portfolio1.mp4',
//     title: 'Strony internetowe już od 1500 zł',
//     description: 'Otrzymaj profesjonalną stronę wizytówkę dla swojej firmy w atrakcyjnej cenie.',
//     logo: '',
//     href: '/pricing/website',
//   },
//   {
//     id: 2,
//     video: '/_resources/portfolio7.mp4',
//     title: 'Asystenci AI do obsługi twoich klientów',
//     description: 'Oferujemy asystentów AI, którzy zwiększają efektywność komunikacji w Twojej firmie.',
//     logo: '',
//     href: '/pricing/ai-integration',
//   },
//   {
//     id: 3,
//     video: '/_resources/portfolio4.mp4',
//     title: 'Integracja Email Marketingu z Twoją stroną',
//     description: 'Oferujemy integrację email marketingu z Twoją stroną, aby zwiększyć zaangażowanie użytkowników.',
//     logo: '',
//     href: '/pricing/email-marketing',
//   },
//   {
//     id: 4,
//     video: '/_resources/portfolio3.mp4',
//     title: 'Chatboty poprawiające user experience',
//     description: 'Oferujemy chatboty, które poprawiają interakcję użytkowników z Twoją firmą.',
//     logo: '',
//     href: '/pricing/ai-integration',
//   },
//   {
//     id: 5,
//     video: '/_resources/portfolio6.mp4',
//     title: 'Grafika 2D i 3D dla Twojej marki',
//     description: 'Tworzymy unikalne grafiki 2D i 3D, które wyróżnią Twoją markę na rynku.',
//     logo: '',
//     href: '/pricing/graphics',
//   },
//   {
//     id: 6,
//     video: '/_resources/portfolio2.mp4',
//     title: 'Aplikacje webowe dla firm',
//     description: 'Oferujemy kompleksowe usługi tworzenia aplikacji webowych, które idealnie odpowiadają potrzebom Twojej firmy.',
//     logo: '',
//     href: '/pricing/individual',
//   },
// ];

// export default function HeroSection() {
//   const [hoveredAvatar, setHoveredAvatar] = useState<number | null>(null);
//   const [mousePos1, setMousePos1] = useState({ x: 50, y: 50 });
//   const [mousePos2, setMousePos2] = useState({ x: 50, y: 50 });
//   const [isButton1Hovered, setIsButton1Hovered] = useState(false);
//   const [isButton2Hovered, setIsButton2Hovered] = useState(false);

//   // Portfolio state
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const videoContainerRef = useRef<HTMLDivElement>(null);
//   const animationFrameRef = useRef<number | null>(null);

//   const currentItem = portfolioData[currentIndex];

//   const handleMouseMove1 = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     if (!isButton1Hovered) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     setMousePos1({ x, y });
//   };

//   const handleMouseMove2 = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     if (!isButton2Hovered) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - rect.left) / rect.width) * 100;
//     const y = ((e.clientY - rect.top) / rect.height) * 100;
//     setMousePos2({ x, y });
//   };

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % portfolioData.length);
//     setProgress(0);
//   };

//   const goToPrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + portfolioData.length) % portfolioData.length);
//     setProgress(0);
//   };

//   const toggleFullscreen = async (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (!videoContainerRef.current) return;

//     try {
//       if (!document.fullscreenElement) {
//         await videoContainerRef.current.requestFullscreen();
//         setIsFullscreen(true);
//       } else {
//         await document.exitFullscreen();
//         setIsFullscreen(false);
//       }
//     } catch (err) {
//       console.error('Fullscreen error:', err);
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   // Odtwarzanie video
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     video.currentTime = 0;
//     video.play();

//     const updateProgress = () => {
//       const currentTime = video.currentTime;
//       const duration = Math.min(video.duration, 6);

//       if (currentTime >= 6) {
//         goToNext();
//         return;
//       }

//       const progressPercent = (currentTime / duration) * 100;
//       setProgress(progressPercent);

//       animationFrameRef.current = requestAnimationFrame(updateProgress);
//     };

//     animationFrameRef.current = requestAnimationFrame(updateProgress);

//     return () => {
//       if (animationFrameRef.current) {
//         cancelAnimationFrame(animationFrameRef.current);
//       }
//     };
//   }, [currentIndex]);

//   return (
//     <section 
//       className="relative bg-black overflow-hidden py-20 md:pt-32"
//       style={{
//         fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
//       }}
//     >
//       <div className="relative flex items-center justify-center">
//         {/* TŁO - z dynamicznymi kolorami */}
//         <div className="absolute inset-0">
//           <LightRays className="absolute inset-0" colorIndex={currentIndex} />
          
//           <div
//             className="absolute bottom-0 left-1/2"
//             style={{
//               width: '150px',
//               height: '120%',
//               background: 'linear-gradient(180deg, rgba(229, 228, 226, 0.05) 0%, transparent 100%)',
//               transform: 'translateX(-50%) translateX(-200px) rotate(-30deg)',
//               filter: 'blur(40px)',
//               mixBlendMode: 'screen',
//             }}
//           />
          
//           <div
//             className="absolute bottom-0 left-1/2"
//             style={{
//               width: '180px',
//               height: '120%',
//               background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
//               transform: 'translateX(-50%)',
//               filter: 'blur(50px)',
//               mixBlendMode: 'screen',
//             }}
//           />
          
//           <div
//             className="absolute bottom-0 left-1/2"
//             style={{
//               width: '150px',
//               height: '120%',
//               background: 'linear-gradient(180deg, rgba(229, 228, 226, 0.05) 0%, transparent 100%)',
//               transform: 'translateX(-50%) translateX(200px) rotate(30deg)',
//               filter: 'blur(40px)',
//               mixBlendMode: 'screen',
//             }}
//           />
//         </div>

//         <div 
//           className="absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
//           }}
//         />

//         <div 
//           className="absolute inset-0" 
//           style={{
//             background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 10%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.65) 70%)',
//           }}
//         />

//         {/* GRID LAYOUT - LEWY + PRAWY */}
//         <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
//             {/* LEWY GRID - HERO CONTENT */}
//             <div className="flex flex-col justify-center items-start text-left">
//               <div className="space-y-5 w-full">
                
//                 {/* BADGE */}
//                 {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 backdrop-blur-sm">
//                   <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-300 to-blue-400 animate-pulse" />
//                   <span className="text-white-300 text-sm font-medium">
//                     Tworzymy strony w nowoczesnym standardzie - Whiteslope Studio - Białystok
//                   </span>
//                 </div> */}

//                 {/* H1 - NAGŁÓWEK */}
//                 <h1 
//                   className="relative"
//                   style={{
//                     fontSize: 'clamp(2.5rem, 6vw, 4rem)',
//                     lineHeight: '0.95',
//                     letterSpacing: '-0.03em',
//                     marginTop: '1rem',
//                     fontWeight: 575,
//                   }}
//                 >
//                   <span 
//                     className="bg-gradient-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent"
//                     style={{
//                       textShadow: '0 0 80px rgba(253, 159, 145, 0.3)',
//                     }}
//                   >
//                     Pokaż się online<br/> z dobrej strony!
//                   </span>
//                 </h1>

//                 {/* PODTYTUŁ */}
//                 <p 
//                   className="text-gray-400 text-lg md:text-xl leading-relaxed font-semibold"
//                   style={{
//                     textShadow: '0 2px 10px rgba(0,0,0,0.5)',
//                   }}
//                 >
//                   Twoja strona to więcej niż wizytówka - to narzędzie sprzedaży działające bez przerwy. 
//                   Sprawdź ofertę!
//                 </p>

//                 {/* PRZYCISKI */}
//                 <div className="flex flex-col sm:flex-row gap-3 pt-4">
//                   <a
//                     href="/contact#contact-form"
//                     onMouseMove={handleMouseMove1}
//                     onMouseEnter={() => setIsButton1Hovered(true)}
//                     onMouseLeave={() => {
//                       setIsButton1Hovered(false);
//                       setMousePos1({ x: 50, y: 50 });
//                     }}
//                     className="w-full sm:w-auto h-12 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)] inline-flex"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePos1.x}% ${mousePos1.y}%, #fffffff5 0%, #ffffffec 30%, #ffffffe3 60%, #ffffffda 100%)`,
//                     }}
//                   >
//                     <span className="relative z-10 text-black h-full w-full flex items-center justify-center gap-2 px-8 font-medium">
//                       Bezpłatna konsultacja
//                       <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
//                     </span>
//                   </a>

//                   <a
//                     href="/pricing/website"
//                     onMouseMove={handleMouseMove2}
//                     onMouseEnter={() => setIsButton2Hovered(true)}
//                     onMouseLeave={() => {
//                       setIsButton2Hovered(false);
//                       setMousePos2({ x: 50, y: 50 });
//                     }}
//                     className="w-full sm:w-auto h-12 rounded-full relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(107,107,107,0.2)] inline-flex"
//                     style={{
//                       background: `radial-gradient(circle at ${mousePos2.x}% ${mousePos2.y}%, #e1e1e12b 0%, #e1e1e122 30%, #e1e1e11c 60%, #e1e1e112 100%)`,
//                     }}
//                   >
//                     <span className="relative z-10 text-white/80 h-full w-full flex items-center justify-center gap-2 px-8 font-medium">
//                       Stwórzmy stronę
//                       <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
//                     </span>
//                   </a>
//                 </div>
//               </div>
//             </div>

//             {/* PRAWY GRID - PORTFOLIO */}
//             <div className="w-full">
//               {/* NAGŁÓWEK + PRZYCISKI */}
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl text-white/80 text-left font-semibold">
//                   Nasze realizacje:
//                 </h2>

//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={goToPrev}
//                     className="w-8 h-8 rounded-full bg-white/80 hover:bg-white/70 border border-white/20 flex items-center justify-center transition-all duration-300 active:scale-95 hover:cursor-pointer"
//                   >
//                     <ChevronLeft className="w-5 h-5 text-black" />
//                   </button>
//                   <button
//                     onClick={goToNext}
//                     className="w-8 h-8 rounded-full bg-white/80 hover:bg-white/70 border border-white/20 flex items-center justify-center transition-all duration-300 active:scale-95 hover:cursor-pointer"
//                   >
//                     <ChevronRight className="w-5 h-5 text-black" />
//                   </button>
//                 </div>
//               </div>

//               {/* VIDEO PLAYER */}
//               <div
//                 ref={videoContainerRef}
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 className="block relative w-full rounded-2xl overflow-hidden bg-black transition-transform duration-500 hover:scale-105 cursor-pointer"
//                 style={{
//                   boxShadow: isHovered
//                     ? '0 30px 80px rgba(255,255,255,0.06), 0 0 120px rgba(255,255,255,0.04)'
//                     : undefined,
//                 }}
//               >
//                 <video
//                   ref={videoRef}
//                   src={currentItem.video}
//                   className="w-full h-auto aspect-video object-cover"
//                   muted
//                   playsInline
//                 />

//                 <div
//                   className="absolute inset-0 pointer-events-none transition-opacity duration-500"
//                   style={{
//                     background: isHovered
//                       ? 'radial-gradient(closest-side, rgba(255,255,255,0.12), rgba(255,255,255,0.04) 30%, transparent 60%)'
//                       : 'transparent',
//                     opacity: isHovered ? 1 : 0,
//                     mixBlendMode: 'screen',
//                   }}
//                 />

//                 <div 
//                   className="absolute inset-0 pointer-events-none"
//                   style={{
//                     background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.35) 20%, rgba(0, 0, 0, 1) 100%)',
//                   }}
//                 />

//                 {/* TYTUŁ I OPIS */}
//                 <a href={currentItem.href} className="absolute bottom-12 left-4 z-20 block">
//                   <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">
//                     {currentItem.title}
//                   </h3>
//                   <p className="text-gray-200 text-sm font-thin drop-shadow-lg">
//                     {currentItem.description}
//                   </p>
//                 </a>

//                 {/* PRZYCISKI */}
//                 <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
//                   <button
//                     type="button"
//                     aria-label="Fullscreen"
//                     onClick={toggleFullscreen}
//                     className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:cursor-pointer text-white transition-colors"
//                   >
//                     <Maximize className="w-4 h-4 text-white" />
//                   </button>

//                   <button
//                     type="button"
//                     aria-label="Zobacz szczegóły projektu"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (typeof window !== 'undefined') {
//                         window.location.href = currentItem.href;
//                       }
//                     }}
//                     className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:cursor-pointer text-white transition-colors"
//                   >
//                     <ExternalLink className="w-4 h-4" />
//                   </button>
//                 </div>

//                 {/* PASEK POSTĘPU */}
//                 <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-20">
//                   <div
//                     className="h-full bg-white/30"
//                     style={{ 
//                       width: `${progress}%`,
//                     }}
//                   />
//                 </div>
//               </div>

//               {/* KROPKI */}
//               <div className="flex justify-center items-center gap-2 mt-4 h-2">
//                 {portfolioData.map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => {
//                       setCurrentIndex(index);
//                       setProgress(0);
//                     }}
//                     className={`w-2 h-2 rounded-full transition-all duration-300 ${
//                       index === currentIndex
//                         ? 'bg-white'
//                         : 'bg-white/30 hover:bg-white/50'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }