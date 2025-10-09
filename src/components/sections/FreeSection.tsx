// "use client";

// import {
//   useAdvancedInView,
//   useMobileDetection,
// } from "@/utils/hooks";
// import { FREE_SERVICES } from "@/lib/data";
// import {
//   Gift,
//   Search,
//   Palette,
//   FileText,
//   Clock,
//   CheckCircle,
//   ArrowRight,
//   Sparkles,
//   Target,
//   Award,
// } from "lucide-react";

// const iconMap = {
//   search: Search,
//   palette: Palette,
//   fileText: FileText,
// };

// export const FreeSection = () => {
//   const [ref, inView] = useAdvancedInView();
//   const isMobile = useMobileDetection();

//   // Handle different CTA actions
//   const getServiceHref = (serviceId: string) => {
//     switch (serviceId) {
//       case "audit":
//         return "/contact";
//       case "graphics":
//         return "#portfolio";
//       case "resources":
//         return "#";
//       default:
//         return "#";
//     }
//   };

//   // Handle file download
//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = "/_resources/whiteslope-website-checklist.pdf";
//     link.download = "WHITESLOPE-Website-Checklist.pdf";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <section
//       ref={ref}
//       id="free"
//       className="py-5 bg-black relative overflow-hidden"
//     >
//       {/* Background effects */}
//       <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#DD9C90]/10 rounded-full blur-3xl" />

//       <div className="container mx-auto px-6 relative z-10">
  
//         {/* Bottom CTA Section */}
//         <div
//           className={`text-center bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-8 md:p-12 border border-gray-700 
//             ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"} transition-all duration-700 ease-out`} >
//           <div className="flex items-center justify-center mb-6">
//             <Award className="w-8 h-8 text-[#DD9C90] mr-3" />
//             <Clock className="w-8 h-8 text-[#DD9C90]" />
//           </div>

//           <h3
//             className={`font-bold text-white mb-4 ${isMobile ? "text-xl" : "text-2xl md:text-3xl"
//               }`}
//           >
//             Gotowy na darmową analizę?
//           </h3>
//           <p
//             className={`text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed ${isMobile ? "text-sm" : "text-base"
//               }`}
//           >
//             Nie ryzykujesz nic. 30 minut twojego czasu w zamian za profesjonalną
//             analizę i konkretne rekomendacje jak ulepszyć twoją stronę.
//           </p>

//           <div
//             className={`flex ${isMobile ? "flex-col gap-4" : "flex-row gap-6"
//               } items-center justify-center`}
//           >
//             <a
//               href="/contact"
//               className={`bg-[#DD9C90] text-black font-bold rounded-xl hover:bg-[#DD9C90]/90 transition-all duration-300 shadow-lg hover:shadow-[#DD9C90]/25 flex items-center cursor-pointer ${isMobile
//                   ? "px-8 py-3 text-sm w-full justify-center"
//                   : "px-10 py-4"
//                 } hover:scale-105 active:scale-95`}
//             >
//               <Target className="w-5 h-5 mr-2" />
//               <span>Umów bezpłatną analizę</span>
//             </a>

//             <a
//               href="#testimonials"
//               className={`border-2 border-gray-600 text-white font-bold rounded-xl hover:bg-gray-600 transition-all duration-300 flex items-center cursor-pointer ${isMobile
//                   ? "px-8 py-3 text-sm w-full justify-center"
//                   : "px-10 py-4"
//                 } hover:scale-105 active:scale-95`}
//             >
//               <span>Zobacz opinie klientów</span>
//               <ArrowRight className="w-5 h-5 ml-2" />
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
"use client";

import {
  useAdvancedInView,
  useMobileDetection,
} from "@/utils/hooks";

import {
  ArrowRight,
  Phone,
  Sparkles,
  Clock,
  TrendingUp,
  Eye,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export const FreeSection = () => {
  const [ref, inView] = useAdvancedInView();
  const isMobile = useMobileDetection();
  
  // Refs dla animacji
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  // Stany animacji
  const [animations, setAnimations] = useState({
    heading: false,
    description: false,
    benefits: false,
    buttons: false,
    phone: false
  });

  // Intersection Observer z opóźnieniem dla telefonu
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const elementId = entry.target.getAttribute('data-animate');
          if (elementId === 'phone') {
            // Telefon z opóźnieniem 0.7s
            setTimeout(() => {
              setAnimations(prev => ({ ...prev, phone: true }));
            }, 700);
          } else if (elementId) {
            setAnimations(prev => ({ ...prev, [elementId]: true }));
          }
        }
      });
    }, observerOptions);

    // Obserwuj każdy element
    const elements = [headingRef, descriptionRef, benefitsRef, buttonsRef, phoneRef];
    const ids = ['heading', 'description', 'benefits', 'buttons', 'phone'];
    
    elements.forEach((ref, index) => {
      if (ref.current) {
        ref.current.setAttribute('data-animate', ids[index]);
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Korzyści wizyty
  const benefits = [
    {
      icon: TrendingUp,
      title: "Zwiększ konwersję",
      subtitle: "o 30-50%"
    },
    {
      icon: Clock,
      title: "Zaoszczędź czas",
      subtitle: "na testowaniu"
    },
    {
      icon: Eye,
      title: "Zobacz problemy",
      subtitle: "niewidoczne gołym okiem"
    },
    {
      icon: Zap,
      title: "Szybkie rezultaty",
      subtitle: "w 24-48h"
    }
  ];

  return (
    <section
      ref={ref}
      id="free"
      className="py-8 md:py-12 bg-black relative overflow-hidden"
    >
      {/* Apple-style floating elements */}
      <div className="absolute top-8 left-8 opacity-20">
        <div className="w-3 h-3 rounded-full animate-pulse bg-gray-600" />
      </div>
      <div className="absolute top-16 right-16 opacity-30">
        <Sparkles className="w-6 h-6 animate-pulse text-gray-600" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-12 left-12 opacity-25">
        <div className="w-2 h-2 rounded-full animate-pulse bg-gray-700" style={{ animationDelay: '2s' }} />
      </div>

      {/* Apple-style premium badge */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="px-4 py-2 rounded-full border backdrop-blur-sm"
              style={{ 
                background: 'linear-gradient(to right, #0b0b0bff, #0b0b0bff)',
                borderColor: 'rgba(74, 74, 74, 0.5)'
  }}>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">Bezpłatna analiza 30min</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-20 pt-12">
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-8' : 'grid-cols-3 gap-8 items-center'} max-w-7xl mx-auto`}>
          
          {/* Left Column - Content (2/3 width) */}
          <div className={`${isMobile ? 'text-center' : 'text-left col-span-2'}`}>
            
            {/* Heading - Filmowy Reveal - dłuższa animacja */}
            <div 
              ref={headingRef}
              className="mb-6 md:mb-8 overflow-hidden"
            >
              <h2 
                className={`font-bold leading-tight transition-all duration-1800 ease-out text-white ${
                  isMobile ? "text-3xl" : "text-4xl md:text-5xl lg:text-6xl"
                }`}
                style={{ 
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  transform: animations.heading ? 'translateY(0)' : 'translateY(100%)'
                }}
              >
                Gotowy na darmową<br />
                <span style={{ color: '#FA8072' }}>analizę</span>?
              </h2>
            </div>

            {/* Description - Filmowy Reveal - dłuższa animacja */}
            <div 
              ref={descriptionRef}
              className="mb-8 md:mb-12 overflow-hidden"
            >
              <p 
                className={`leading-relaxed transition-all duration-1600 ease-out text-gray-300 ${
                  isMobile ? "text-base" : "text-lg md:text-xl max-w-3xl"
                }`}
                style={{ 
                  fontWeight: 400,
                  lineHeight: 1.6,
                  transform: animations.description ? 'translateY(0)' : 'translateY(100%)',
                  transitionDelay: '0.2s'
                }}
              >
                Nie ryzykujesz nic. 30 minut twojego czasu w zamian za profesjonalną 
                analizę i konkretne rekomendacje jak ulepszyć twoją stronę.
              </p>
            </div>

            {/* Apple-style Benefits Cards */}
            <div 
              ref={benefitsRef}
              className="mb-8 md:mb-12 overflow-hidden"
            >
              <div 
                className={`grid ${isMobile ? 'grid-cols-2 gap-3' : 'grid-cols-4 gap-4'} transition-transform duration-1500 ease-out`}
                style={{
                  transform: animations.benefits ? 'translateY(0)' : 'translateY(100%)',
                  transitionDelay: '0.3s'
                }}
              >
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="rounded-2xl p-4 border border-gray-600/50"
                    style={{ background: 'linear-gradient(to bottom right, #0b0b0bff, #0b0b0bff)' }}
                  >
                    {/* Content wyśrodkowane na mobile */}
                    <div className={`${isMobile ? 'text-center' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 bg-white ${
                        isMobile ? 'mx-auto' : ''
                      }`}>
                        <benefit.icon className="w-5 h-5 text-black" />
                      </div>
                      <h4 className="font-semibold text-sm mb-1 leading-tight text-white">
                        {benefit.title}
                      </h4>
                      <p className="text-xs font-medium text-gray-400">
                        {benefit.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons - Filmowy Reveal - dłuższa animacja */}
            <div 
              ref={buttonsRef}
              className="overflow-hidden"
            >
              <div 
                className={`flex ${
                  isMobile ? "flex-col gap-6 items-center" : "flex-col gap-8 items-start"
                } transition-transform duration-1400 ease-out`}
                style={{
                  transform: animations.buttons ? 'translateY(0)' : 'translateY(100%)',
                  transitionDelay: '0.4s'
                }}
              >
                {/* Primary CTA */}
                <a
                  href="/contact?tab=meeting"
                  className="group relative cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-3 pb-2">
                    <span 
                      className={`font-medium transition-colors duration-300 text-white group-hover:text-gray-300 ${
                        isMobile ? "text-lg" : "text-xl"
                      }`}
                    >
                      Umów bezpłatną analizę
                    </span>
                    <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 text-white group-hover:text-gray-300" />
                  </div>
                  <div className="h-px transition-colors duration-300 scale-x-100 group-hover:scale-x-110 transform origin-left bg-white group-hover:bg-gray-300" />
                </a>

                {/* Secondary CTA */}
                <a
                  href="#testimonials"
                  className="group relative cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center gap-3 pb-2">
                    <span 
                      className={`font-medium transition-colors duration-300 text-gray-400 group-hover:text-white ${
                        isMobile ? "text-lg" : "text-xl"
                      }`}
                    >
                      Zobacz opinie klientów
                    </span>
                    <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-1 text-gray-400 group-hover:text-white" />
                  </div>
                  <div className="h-px transition-colors duration-300 scale-x-100 group-hover:scale-x-110 transform origin-left bg-gray-600 group-hover:bg-white" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column - iPhone spadający z góry (1/3 width) */}
          <div 
            ref={phoneRef}
            className={`relative ${isMobile ? 'mt-8' : 'col-span-1'} flex ${isMobile ? 'justify-center' : 'justify-center'}`}
          >
            <div
              className="relative transition-all duration-300"
              style={{
                transform: animations.phone ? 'translateY(0)' : 'translateY(100vh)',
                opacity: animations.phone ? 1 : 0,
                transition: 'all 3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <Image
                src="/_resources/free-section-iphone.webp"
                alt="iPhone z przykładem bezpłatnej analizy strony - WS Studio"
                width={isMobile ? 280 : 350}
                height={isMobile ? 560 : 700}
                className="drop-shadow-2xl"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};