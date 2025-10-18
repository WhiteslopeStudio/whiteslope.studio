// "use client";

// import { motion } from "framer-motion";
// import { Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useEffect, useRef } from "react";

// // Hook do sprawdzania czy element jest widoczny
// const useAdvancedInView = () => {
//   const [element, setElement] = useState<HTMLElement | null>(null);
//   const [inView, setInView] = useState(false);

//   const ref = (node: HTMLElement | null) => {
//     setElement(node);
//   };

//   useEffect(() => {
//     if (!element) return;
    
//     const observer = new IntersectionObserver(
//       ([entry]) => setInView(entry.isIntersecting),
//       { threshold: 0.1 }
//     );
    
//     observer.observe(element);
//     return () => observer.disconnect();
//   }, [element]);

//   return [ref, inView] as const;
// };

// // Komponent animowanej liczby
// const AnimatedNumber = ({ value, suffix = "", inView }: { value: number, suffix?: string, inView: boolean }) => {
//   const [count, setCount] = useState(0);
//   const [hasAnimated, setHasAnimated] = useState(false);

//   useEffect(() => {
//     if (!inView || hasAnimated) return;
    
//     let start = 0;
//     const end = value;
//     const duration = 3500;
//     const increment = end / (duration / 16);
    
//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= end) {
//         setCount(end);
//         setHasAnimated(true);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, 16);
    
//     return () => clearInterval(timer);
//   }, [value, inView, hasAnimated]);

//   return <>{count}{suffix}</>;
// };

// export const TestimonialsSection = () => {
//   const [ref, inView] = useAdvancedInView();
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isAnimating, setIsAnimating] = useState(false); // NOWE: stan animacji
//   const [animatingDirection, setAnimatingDirection] = useState<'left' | 'right' | null>(null); // NOWE: kierunek animacji
//   const scrollContainerRef = useRef<HTMLDivElement>(null);
//   const totalCards = 2;

//   const updateActiveIndex = () => {
//     if (!scrollContainerRef.current) return;
    
//     const container = scrollContainerRef.current;
//     const containerCenter = container.scrollLeft + container.clientWidth / 2;
//     const cards = container.querySelectorAll('.testimonial-card');
    
//     let closestIndex = 0;
//     let closestDistance = Infinity;
    
//     cards.forEach((card, index) => {
//       const cardElement = card as HTMLElement;
//       const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
//       const distance = Math.abs(cardCenter - containerCenter);
      
//       if (distance < closestDistance) {
//         closestDistance = distance;
//         closestIndex = index;
//       }
//     });
    
//     setActiveIndex(closestIndex);
//   };

//   useEffect(() => {
//     const container = scrollContainerRef.current;
//     if (!container) return;
    
//     const handleScroll = () => {
//       updateActiveIndex();
//     };
    
//     container.addEventListener('scroll', handleScroll);
//     return () => {
//       container.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const scrollToIndex = (index: number) => {
//     if (!scrollContainerRef.current || isAnimating) return;
    
//     // NOWE: Ustaw animację jak w portfolio
//     setIsAnimating(true);
//     setAnimatingDirection(index > activeIndex ? 'right' : 'left');
//     setActiveIndex(index);

//     const container = scrollContainerRef.current;
//     const targetCard = container.querySelector(`.testimonial-card:nth-child(${index + 1})`) as HTMLElement;
    
//     if (targetCard) {
//       const containerCenter = container.clientWidth / 2;
//       const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
//       const scrollLeft = cardCenter - containerCenter;
      
//       container.scrollTo({ 
//         left: Math.max(0, scrollLeft), 
//         behavior: 'smooth' 
//       });
//     }

//     // NOWE: Reset animacji po 200ms
//     setTimeout(() => {
//       setIsAnimating(false);
//       setAnimatingDirection(null);
//     }, 200);
//   };

//   const scrollLeft = () => {
//     if (activeIndex > 0) {
//       scrollToIndex(activeIndex - 1);
//     }
//   };

//   const scrollRight = () => {
//     if (activeIndex < totalCards - 1) {
//       scrollToIndex(activeIndex + 1);
//     }
//   };

//   return (
//     <section 
//       ref={ref} 
//       id="testimonials" 
//       className="py-5 relative overflow-hidden py-8"
//       style={{
//         background: `
//           radial-gradient(ellipse at center, transparent 0%, transparent 7%, black 100%),
//           linear-gradient(
//             to bottom,
//             black 0px,
//             black 10px,
//             #3b3b3bff 10px,
//             #3b3b3bff 11px,
//             #0b0b0bff 11px,
//             #0b0b0bff calc(100% - 11px),
//             #3b3b3bff calc(100% - 11px),
//             #3b3b3bff calc(100% - 10px),
//             black calc(100% - 10px),
//             black 100%
//           )
//         `
//       }}  
//     >
      

//       {/* Subtelny gradient overlay */}
//       <div 
//         className="absolute inset-0"
        
//       />

//       {/* Badge */}
//       <div className="flex justify-center my-4 relative z-10">
//         <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-white/60 backdrop-blur-sm border border-white/10">
//           <Sparkles className="w-4 h-4" style={{ 
//             stroke: 'url(#sparkles-gradient)',
//             fill: 'none'
//           }} />
//           <svg width="0" height="0" style={{ position: 'absolute' }}>
//             <defs>
//               <linearGradient id="sparkles-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                 <stop offset="0%" style={{ stopColor: '#fdba74' }} />
//                 <stop offset="100%" style={{ stopColor: '#f9a8d4' }} />
//               </linearGradient>
//             </defs>
//           </svg>
//           Sprawdzone rezultaty biznesowe
//         </span>
//       </div>

//       {/* NAGŁÓWEK */}
//       <div className="text-center mb-12 relative z-10 max-w-10xl mx-auto px-4">
//         <h2 className="text-4xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
//           Zobacz jak pomagamy{" "}
//           <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
//             rozwijać biznesy
//           </span>
//         </h2>
//         <p className="text-base lg:text-xl text-gray-400 max-w-3xl mx-auto">
//           Realne wyniki, mierzalne rezultaty i zadowolnie. Tak pracujemy z każdym klientem.
//         </p>
//       </div>

//       <style dangerouslySetInnerHTML={{__html: `
//         @keyframes platinum-shine {
//           0% {
//             background-position: -200% center;
//           }
//           100% {
//             background-position: 200% center;
//           }
//         }
        
//         .platinum-text {
//           background: linear-gradient(
//             90deg,
//             #94a3b8 0%,
//             #e2e8f0 25%,
//             #f8fafc 50%,
//             #e2e8f0 75%,
//             #94a3b8 100%
//           );
//           background-size: 200% auto;
//           background-clip: text;
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           animation: platinum-shine 6s linear infinite;
//         }
        
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
        
//         .scrollbar-hide {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}} />

//       <div className="flex flex-row lg:flex-row justify-center gap-4 lg:gap-0 mb-4 py-10 relative z-10 overflow-x-hidden max-w-5xl mx-auto">
//         <div className="text-center group/stat flex-shrink-0 lg:flex-1 min-w-[100px] lg:min-w-0">
//           <div className="text-3xl lg:text-5xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
//             <AnimatedNumber value={24} suffix="h" inView={inView} />
//           </div>
//           <div className="text-[10px] lg:text-sm text-gray-400 font-medium px-0">Pierwsze zapytania<br />po starcie strony</div>
//         </div>
//         <div className="text-center group/stat flex-shrink-0 lg:flex-1 min-w-[100px] lg:min-w-0">
//           <div className="text-3xl lg:text-5xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
//             <AnimatedNumber value={100} suffix="%" inView={inView} />
//           </div>
//           <div className="text-[10px] lg:text-sm text-gray-400 font-medium px-0">Zadowolonych klientów</div>
//         </div>
//         <div className="text-center group/stat flex-shrink-0 lg:flex-1 min-w-[100px] lg:min-w-0">
//           <div className="text-3xl lg:text-5xl font-bold platinum-text mb-2 transition-transform duration-300 group-hover/stat:scale-110">
//             <AnimatedNumber value={3} suffix=" dni" inView={inView} />
//           </div>
//           <div className="text-[10px] lg:text-sm text-gray-400 font-medium px-0">Do pierwszych ofert<br /> pracy</div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 lg:px-6 relative z-10">
//         {/* OPINIE - Desktop Grid */}
//         <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          
//           {/* Karta 1 - Sławek */}
//           <motion.div
//             className="rounded-2xl p-6 lg:p-8 w-full flex flex-col relative group/card transition-all duration-300"
//             style={{
//               background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.08) 0%, #0f0f0f 70%)',
//               border: '1px solid rgba(255, 255, 255, 0.1)',
//               backdropFilter: 'blur(10px)'
//             }}
//           >
//             {/* Subtelny border glow na hover */}
//             <div 
//               className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
//               style={{
//                 boxShadow: '0 0 20px rgba(255, 116, 95, 0.3)',
//                 border: '1px solid rgba(255, 116, 95, 0.3)'
//               }}
//             />

//             {/* Imię i gwiazdki */}
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <p className="font-bold text-lg text-white mb-1">
//                   Sławek Wiesławski
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   Wiesławski Studio
//                 </p>
//               </div>
              
//               <div className="flex gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#ffae00ff' }} />
//                 ))}
//               </div>
//             </div>
            
//             {/* Opinia */}
//             <blockquote className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
//               <span className="text-white font-semibold">Szybkość działania jest świetna.</span> Bardzo szybko otrzymywałem odpowiedzi na pytania. Pierwsze <span className="text-white font-semibold">zapytania od klientów</span> pojawiły się po <span className="text-white font-semibold">24h</span> od uruchomienia strony.
//             </blockquote>
            
//             {/* Logo */}
//             <div className="flex justify-start mt-4 pt-4 border-t border-white/5">
//               <a 
//                 href="https://wieslawski.studio" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="cursor-pointer group/logo"
//               >
//                 <img 
//                   src="_resources/wieslawski-studio-logo.webp" 
//                   alt="Wiesławski Studio"
//                   className="h-7 w-auto object-contain opacity-50 group-hover/logo:opacity-100 transition-opacity"
//                   style={{ filter: 'brightness(0) invert(1)' }}
//                 />
//               </a>
//             </div>
//           </motion.div>

//           {/* Karta 2 - Patryk */}
//           <motion.div
//             className="rounded-2xl p-6 lg:p-8 w-full flex flex-col relative group/card transition-all duration-300"
//             style={{
//               background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.08) 0%, #0f0f0f 70%)',
//               border: '1px solid rgba(255, 255, 255, 0.1)',
//               backdropFilter: 'blur(10px)'
//             }}
//           >
//             {/* Subtelny border glow na hover */}
//             <div 
//               className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
//               style={{
//                 boxShadow: '0 0 20px rgba(255, 116, 95, 0.3)',
//                 border: '1px solid rgba(255, 116, 95, 0.3)'
//               }}
//             />

//             {/* Imię i gwiazdki */}
//             <div className="flex justify-between items-start mb-6">
//               <div>
//                 <p className="font-bold text-lg text-white mb-1">
//                   Patryk Kulesza
//                 </p>
//                 <p className="text-sm text-gray-400">
//                   Korepetycje matematyka, informatyka, angielski
//                 </p>
//               </div>
              
//               <div className="flex gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#ffae00ff' }} />
//                 ))}
//               </div>
//             </div>
            
//             {/* Opinia */}
//             <blockquote className="text-gray-300 text-base leading-relaxed mb-6 flex-grow">
//               <span className="text-white font-semibold">Już po 3 dniach dostałem bardzo korzystną ofertę pracy.</span> Jestem bardzo zadowolony i strona w końcu sprawia, że <span className="text-white font-semibold">jestem widoczny dla wielu osób.</span>
//             </blockquote>
            
//             {/* Logo */}
//             <div className="flex justify-start mt-4 pt-4 border-t border-white/5">
//               <a 
//                 href="https://patrykkulesza.pl" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="cursor-pointer group/logo"
//               >
//                 <img 
//                   src="_resources/logo-PatrykKulesza.webp" 
//                   alt="Patryk Kulesza - Korepetacje"
//                   className="h-7 w-auto object-contain opacity-50 group-hover/logo:opacity-100 transition-opacity"
//                   style={{ filter: 'brightness(0) invert(1)' }}
//                 />
//               </a>
//             </div>
//           </motion.div>
//         </div>

//         {/* OPINIE - Mobile Scroll (tylko na mobile) */}
//         <div className="lg:hidden relative">
//           <div
//             ref={scrollContainerRef}
//             className="flex gap-4 overflow-x-auto py-6 px-4 snap-x snap-mandatory scrollbar-hide"
//             style={{
//               paddingLeft: 'calc(50% - 160px)',
//               paddingRight: 'calc(50% - 160px)',
//               scrollbarWidth: 'none',
//               msOverflowStyle: 'none',
//             }}
//           >
//             {/* Karta 1 - Sławek */}
//             <motion.div
//               className="testimonial-card rounded-2xl p-6 w-[320px] flex-shrink-0 flex flex-col relative group/card transition-all duration-300 snap-center"
//               style={{
//                 background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.08) 0%, #0f0f0f 70%)',
//                 border: '1px solid rgba(255, 255, 255, 0.1)',
//                 backdropFilter: 'blur(10px)'
//               }}
//             >
//               <div 
//                 className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
//                 style={{
//                   boxShadow: '0 0 20px rgba(255, 116, 95, 0.3)',
//                   border: '1px solid rgba(255, 116, 95, 0.3)'
//                 }}
//               />

//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <p className="font-bold text-lg text-white mb-1">
//                     Sławek Wiesławski
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     Wiesławski Studio
//                   </p>
//                 </div>
                
//                 <div className="flex gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#ffae00ff' }} />
//                   ))}
//                 </div>
//               </div>
              
//               <blockquote className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
//                 <span className="text-white font-semibold">Szybkość działania jest świetna.</span> Bardzo szybko otrzymywałem odpowiedzi na pytania. Pierwsze <span className="text-white font-semibold">zapytania od klientów</span> pojawiły się po <span className="text-white font-semibold">24h</span> od uruchomienia strony.
//               </blockquote>
              
//               <div className="flex justify-start mt-4 pt-4 border-t border-white/5">
//                 <a 
//                   href="https://wieslawski.studio" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="cursor-pointer group/logo"
//                 >
//                   <img 
//                     src="_resources/wieslawski-studio-logo.webp" 
//                     alt="Wiesławski Studio"
//                     className="h-7 w-auto object-contain opacity-50 group-hover/logo:opacity-100 transition-opacity"
//                     style={{ filter: 'brightness(0) invert(1)' }}
//                   />
//                 </a>
//               </div>
//             </motion.div>

//             {/* Karta 2 - Patryk */}
//             <motion.div
//               className="testimonial-card rounded-2xl p-6 w-[320px] flex-shrink-0 flex flex-col relative group/card transition-all duration-300 snap-center"
//               style={{
//                 background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.08) 0%, #0f0f0f 70%)',
//                 border: '1px solid rgba(255, 255, 255, 0.1)',
//                 backdropFilter: 'blur(10px)'
//               }}
//             >
//               <div 
//                 className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
//                 style={{
//                   boxShadow: '0 0 20px rgba(255, 116, 95, 0.3)',
//                   border: '1px solid rgba(255, 116, 95, 0.3)'
//                 }}
//               />

//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <p className="font-bold text-lg text-white mb-1">
//                     Patryk Kulesza
//                   </p>
//                   <p className="text-sm text-gray-400">
//                     Korepetycje matematyka, informatyka, angielski
//                   </p>
//                 </div>
                
//                 <div className="flex gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#ffae00ff' }} />
//                   ))}
//                 </div>
//               </div>
              
//               <blockquote className="text-gray-300 text-sm leading-relaxed mb-6 flex-grow">
//                 <span className="text-white font-semibold">Już po 3 dniach dostałem bardzo korzystną ofertę pracy.</span> Jestem bardzo zadowolony i strona w końcu sprawia, że <span className="text-white font-semibold">jestem widoczny dla wielu osób.</span>
//               </blockquote>
              
//               <div className="flex justify-start mt-4 pt-4 border-t border-white/5">
//                 <a 
//                   href="https://patrykkulesza.pl" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                   className="cursor-pointer group/logo"
//                 >
//                   <img 
//                     src="_resources/logo-PatrykKulesza.webp" 
//                     alt="Patryk Kulesza - Korepetacje"
//                     className="h-7 w-auto object-contain opacity-50 group-hover/logo:opacity-100 transition-opacity"
//                     style={{ filter: 'brightness(0) invert(1)' }}
//                   />
//                 </a>
//               </div>
//             </motion.div>
//           </div>

//           {/* Nawigacja - Strzałki i Dots */}
//           <div className="flex justify-center items-center gap-3 pb-4 mt-4">
//             <button
//               onClick={scrollLeft}
//               disabled={activeIndex === 0}
//               className={`w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 ${
//                 activeIndex === 0 
//                   ? 'text-white/30 cursor-not-allowed' 
//                   : 'text-white/60 hover:text-white cursor-pointer'
//               }`}
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>

//             {/* NOWA: Animowane kropki w stylu macOS */}
//             <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 relative overflow-hidden">
//               {[...Array(totalCards)].map((_, index) => (
//                 <button
//                   key={`dot-${index}`}
//                   onClick={() => scrollToIndex(index)}
//                   className="w-2 h-2 rounded-full bg-white/30 transition-all duration-200 hover:bg-white/50 cursor-pointer" // ZMIANA: Stała szerokość, zawsze /30
//                   aria-label={`Przejdź do opinii ${index + 1}`}
//                 />
//               ))}
              
//               {/* NOWY: Animowany wskaźnik overlay */}
//               <div
//                 className={`absolute w-2 h-2 bg-white pointer-events-none transition-all ease-out ${
//                   isAnimating ? 'duration-150 rounded-lg' : 'duration-200 rounded-full'
//                 }`}
//                 style={{
//                   left: `${16 + (activeIndex * 16)}px`, // Dostosuj 16px jeśli gap między kropkami jest inny (tu gap-2 = 8px, ale dla animacji 16px jak w portfolio)
//                   transform: isAnimating
//                     ? `translateX(${animatingDirection === 'right' ? '4px' : '-4px'}) scaleX(1.6)`
//                     : 'translateX(0) scaleX(1)',
//                   transformOrigin: 'center',
//                 }}
//               />
//             </div>

//             <button
//               onClick={scrollRight}
//               disabled={activeIndex === totalCards - 1}
//               className={`w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 ${
//                 activeIndex === totalCards - 1
//                   ? 'text-white/30 cursor-not-allowed'
//                   : 'text-white/60 hover:text-white cursor-pointer'
//               }`}
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Loga - PRZENIESIONE POD KARTY */}
//       <div className="text-center mt-4 pb-4 relative z-10 lg:block py-10">
//         <p className="text-xs text-gray-500 mb-4 uppercase tracking-wider">Zaufali nam</p>
//         <div className="flex gap-8 justify-center flex-wrap">
//           <a 
//             href="https://patrykkulesza.pl" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex items-center justify-center cursor-pointer group"
//           >
//             <img 
//               src="_resources/logo-PatrykKulesza.webp" 
//               alt="Patryk Kulesza - Korepetacje"
//               className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
//               style={{ filter: 'brightness(0) invert(1)' }}
//             />
//           </a>
//           <a 
//             href="https://wieslawski.studio" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex items-center justify-center cursor-pointer group"
//           >
//             <img 
//               src="_resources/wieslawski-studio-logo.webp" 
//               alt="Wiesławski Studio"
//               className="h-8 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
//               style={{ filter: 'brightness(0) invert(1)' }}
//             />
//           </a>
//           <a 
//             href="https://www.youtube.com/@_Mati__" 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="flex items-center justify-center cursor-pointer group"
//           >
//             <img 
//               src="_resources/mati_logo.webp.webp" 
//               alt="Mati Logo"
//               className="h-10 w-auto object-contain opacity-60 group-hover:opacity-100 transition-opacity"
//               style={{ filter: 'brightness(0) invert(1)' }}
//             />
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';

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
    company: 'Osoba prywatna',
    companyUrl: 'https://www.youtube.com/@_Mati__',
    logo: '_resources/mati_logo.webp.webp',
    rating: 5,
    text: 'Z usług grafik 2D, 3D i filmów korzytam już od bardzo dawna. Moja marka osobista w internecie przez to mogła się bardzo rozwinąć. Polecam każdemu!',
    highlight: ['Profesjonalna obsługa', 'szybka realizacja', 'najwyższym poziomie'],
  },
];

const stats = [
  { value: '24h', label: 'Pierwsze zapytania po starcie strony' },
  { value: '100%', label: 'Zadowolonych klientów' },
  { value: '3 dni', label: 'Do pierwszych ofert pracy' },
];

export const TestimonialsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      className="pt-10 bg-black relative overflow-hidden pb-10"
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
        {/* NAGŁÓWEK */}
        <div className="text-center mb-8 relative z-10 max-w-10xl mx-auto px-4">
          <div className="text-left max-w-7xl mx-auto">
            <h2 className="text-2xl lg:text-4xl text-white mb-4 tracking-tight"
            style={{ fontWeight: 575 }}>
              
              <span className=" bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent"
              style={{ fontWeight: 575 }}> 
                Zobacz jak pomagamy rozwijać biznesy
              </span>

            </h2>
            <p className="text-base lg:text-lg" style={{ color: '#9ca3af' }}>
              Realne wyniki, mierzalne rezultaty i zadowolenie
            </p>
          </div>
        </div>

        {/* STATYSTYKI - 3 KOLUMNY */}
        <div className="relative max-w-7xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer transition-all duration-500"
                >
                  <div className="flex flex-col gap-2">
                    <div 
                      className="text-4xl md:text-5xl font-bold transition-colors duration-500"
                      style={{
                        color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.9)',
                      }}
                    >
                      {stat.value}
                    </div>
                    <p 
                      className="text-sm leading-relaxed transition-colors duration-500"
                      style={{
                        color: isHovered ? '#d1d5db' : 'rgba(255, 255, 255, 0.4)',
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OPINIE - 3 KOLUMNY */}
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => {
              const isHovered = hoveredIndex === (index + 3); // +3 żeby nie kolidowało ze statystykami
              return (
                <div
                  key={testimonial.id}
                  onMouseEnter={() => setHoveredIndex(index + 3)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer transition-all duration-500"
                >
                  <div 
                    className="flex flex-col gap-4 p-6 rounded-2xl transition-all duration-500"
                    style={{
                      background: isHovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                      border: isHovered 
                        ? '1px solid rgba(255, 255, 255, 0.15)' 
                        : '1px solid rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {/* IMiĘ + GWIAZDKI */}
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 
                          className="text-lg font-bold transition-colors duration-500"
                          style={{
                            color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
                          }}
                        >
                          {testimonial.name}
                        </h3>
                        <p 
                          className="text-sm transition-colors duration-500"
                          style={{
                            color: isHovered ? '#9ca3af' : 'rgba(255, 255, 255, 0.6)',
                          }}
                        >
                          {testimonial.company}
                        </p>
                      </div>
                      
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 fill-current transition-colors duration-500" 
                            style={{ 
                              color: isHovered ? '#ffae00' : 'rgba(255, 174, 0, 0.6)',
                            }} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* OPINIA */}
                    <p 
                      className="text-sm leading-relaxed transition-colors duration-500"
                      style={{
                        color: isHovered ? '#d1d5db' : 'rgba(255, 255, 255, 0.6)',
                      }}
                    >
                      {testimonial.text}
                    </p>

                    {/* LOGO */}
                    <div className="pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <a 
                        href={testimonial.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block"
                      >
                        <img 
                          src={testimonial.logo}
                          alt={testimonial.company}
                          className="h-6 w-auto object-contain transition-opacity duration-500"
                          style={{ 
                            filter: 'brightness(0) invert(1)',
                            opacity: isHovered ? 1 : 0.6,
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        
      </div>
    </section>
  );
};