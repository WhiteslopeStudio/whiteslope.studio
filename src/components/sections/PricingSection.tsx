"use client";

import React, { useState } from "react";
import { ArrowRight, Globe, Wrench, Palette, Brain, User, Mail, Sparkles, ChevronDown, Check, Zap } from "lucide-react";
import Link from "next/link";
import { MAIN_SERVICES } from "@/lib/data";

// Hook do sprawdzania czy element jest widoczny
const useAdvancedInView = () => {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  const ref = (node: HTMLElement | null) => {
    setElement(node);
  };

  React.useEffect(() => {
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

export const PricingSection = () => {
  const [ref, inView] = useAdvancedInView();
  const [activeService, setActiveService] = useState<number>(0);

  const changeActiveService = (newIndex: number) => {
    if (newIndex === activeService) return;
    setActiveService(newIndex);
  };

  const serviceIcons = [Globe, Wrench, Brain, Palette, User, Mail];
  const currentService = MAIN_SERVICES[activeService];

  return (
    <section ref={ref} id="services" className="py-16 relative overflow-hidden" style={{
      background: 'radial-gradient(ellipse at top, rgba(255, 116, 95, 0.04) 0%, #000000 50%)'
    }}>
      
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at bottom left, rgba(255, 116, 95, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(255, 116, 95, 0.02) 0%, transparent 50%)
          `
        }}
      />

      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm text-white/60 backdrop-blur-sm border border-white/10">
              <Sparkles className="w-4 h-4" style={{ 
                stroke: 'url(#sparkles-gradient)',
                fill: 'none'
              }} />
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                  <linearGradient id="sparkles-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#fdba74' }} />
                    <stop offset="100%" style={{ stopColor: '#f9a8d4' }} />
                  </linearGradient>
                </defs>
              </svg>
              Rozwiązania dopasowane do Twoich celów
            </span>
          </div>
          
          <div className="overflow-hidden">
            <h2 className="text-4xl lg:text-6xl font-thin text-white mb-6 tracking-tight">
              Wybierz plan.{" "}
              <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                Zacznijmy działać.
              </span>
            </h2>
          </div>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Przejrzyste ceny. Jasne warunki. Realne rezultaty dla Twojego biznesu.
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-6">
          <div 
            className="grid grid-cols-3 gap-6 mx-auto" 
            style={{ 
              gridTemplateRows: '2fr 1fr'
            }}
          >
            
            {/* MENU - 1 kolumna (1/3 szerokości) */}
            <div className="row-span-2">
              <div 
                className="rounded-3xl p-6 shadow-xl h-full transition-all duration-300"
                style={{
                  background: '#ffffffeb',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="mb-6">
                  <h3 className="text-2xl text-black font-normal mb-2">Nasze usługi</h3>
                  <p className="text-sm text-gray-600">Wybierz to, czego potrzebujesz</p>
                </div>

                <div className="space-y-2">
                  {MAIN_SERVICES.map((service, index) => {
                    const IconComponent = serviceIcons[index];
                    const isActive = index === activeService;
                    
                    return (
                      <div key={service.id}>
                        <button
                          onClick={() => changeActiveService(index)}
                          className={`
                            w-full text-left transition-all duration-300 ease-out hover:scale-102 cursor-pointer
                            rounded-xl p-3 relative
                            ${isActive ? 'bg-black/5' : 'hover:bg-black/3'}
                          `}
                        >
                          

                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className={`
                                w-8 h-8 rounded-lg flex items-center justify-center
                                ${isActive ? 'bg-black text-white' : 'bg-black/10 text-black'}
                                transition-all duration-300
                              `}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <span className={`
                                text-base font-medium
                                ${isActive ? 'text-black' : 'text-gray-700'}
                              `}>
                                {service.title}
                              </span>
                            </div>
                            {isActive && (
                              <ArrowRight className="w-4 h-4 text-black" />
                            )}
                          </div>
                          
                          <div className="ml-11">
                            <span className="text-sm text-gray-600">
                              {service.price}
                            </span>
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* OPIS - 2 kolumny (2/3 szerokości) */}
            <div className="col-span-2 row-span-1">
              <div 
                className="rounded-3xl p-8 shadow-xl h-full relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.08) 0%, #0f0f0f 70%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex flex-col h-full">
                  
                  {/* Header z ceną */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-5xl text-white leading-tight mb-2">
                        {currentService.title}
                      </h3>
                      <p className="text-xl text-[#fd9f91]">
                        {currentService.subtitle}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                        {currentService.price.replace('od ', '')}
                      </div>
                      <div className="text-sm text-gray-400">początek od</div>
                    </div>
                  </div>

                  {/* Separator */}
                  <div className="h-px bg-white/10 mb-4" />

                  {/* Description */}
                  <p className="text-white text-lg leading-relaxed mb-6">
                    {currentService.description}
                  </p>

                  {/* Features - kompaktowe */}
                  <div className="grid grid-cols-2 gap-3 flex-grow mb-6">
                    {currentService.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-white text-base leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Footer */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <div className="flex gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-400" />
                        <span>Terminowo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span>Gwarancja</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/pricing/${currentService.id}`}
                      className="inline-block group"
                    >
                      <button className="cursor-pointer flex items-center gap-2 px-6 py-3 rounded-full bg-[#fd9f91] text-black font-medium text-base transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg hover:scale-105 active:scale-100 focus:outline-none focus:ring-4 focus:ring-[#fd9f91]/30">
                        {currentService.ctaText}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA - 2 kolumny (2/3 szerokości) */}
            <div className="col-span-2 row-span-1">
              <div 
                className="rounded-3xl p-8 shadow-xl h-full relative overflow-hidden"
                style={{
                  background: '#0f0f0f',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Subtelny gradient w tle */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(255, 116, 95, 0.1) 0%, transparent 50%)'
                  }}
                />

                <div className="h-full flex flex-col justify-center relative z-10">
                  
                  <div className="grid grid-cols-2 gap-8">
                    {/* Lewa kolumna */}
                    <div>
                      <h3 className="text-2xl text-white mb-3 font-bold">
                        Potrzebujesz czegoś innego?
                      </h3>
                      <p className="text-gray-400 text-base leading-relaxed mb-6">
                        Każdy projekt jest unikalny. Porozmawiajmy o Twoich potrzebach i stwórzmy rozwiązanie szyte na miarę.
                      </p>
                      
                      <div className="space-y-3">
                        <Link
                          href="/contact?tab=project"
                          className="group flex items-center gap-2 text-gray-300 text-base transition-all duration-300 hover:text-white"
                        >
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span className="font-medium">Porozmawiajmy o projekcie</span>
                        </Link>
                        <Link
                          href="/pricing" 
                          className="group flex items-center gap-2 text-gray-300 text-base transition-all duration-300 hover:text-white"
                        >
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span className="font-medium">Zobacz wszystkie pakiety</span>
                        </Link>
                      </div>
                    </div>

                    {/* Prawa kolumna - Trust indicators */}
                    <div className="flex flex-col justify-center space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Profesjonalnie</div>
                          <div className="text-gray-400 text-sm">Dopracowane w każdym detalu</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Na czas</div>
                          <div className="text-gray-400 text-sm">Dotrzymujemy terminów</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Indywidualnie</div>
                          <div className="text-gray-400 text-sm">Dostosowane do Twoich potrzeb</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MAIN_SERVICES.map((service, index) => (
              <div
                key={service.id}
                className="bg-black/50 border border-white/20 rounded-2xl p-6 backdrop-blur-md relative"
              >
                {service.highlighted && (
                  <div className="absolute -top-2 -right-2">
                    <div className="text-yellow-500 bg-black/50 backdrop-blur-sm rounded-full p-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="text-center space-y-4">
                  <div>
                    <span className="text-xl text-[#fd9f91] bg-black/80 px-3 py-1 rounded-full border border-[#fd9f91]/30">
                      {service.price}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#fd9f91]">
                      {service.subtitle}
                    </p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <Link
                    href={`/pricing/${service.id}`}
                    className="inline-block group"
                  >
                    <button className="inline-flex items-center bg-white gap-2 text-black font-medium px-6 py-3 rounded-full text-sm transition-all duration-300 hover:scale-105 cursor-pointer">
                      {service.ctaText}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ptaszek na dół do przewinięcia - PROSTY LINK */}
      <div className="flex justify-center mt-12 mb-2 relative z-50">
        <a
          href="#process"
          className="group p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 cursor-pointer inline-block"
          aria-label="Przewiń do następnej sekcji"
        >
          <ChevronDown className="w-6 h-6 text-white group-hover:translate-y-1 transition-transform" />
        </a>
      </div>
    </section>
  );
};