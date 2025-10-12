"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Globe, Wrench, Palette, Brain, User, Mail, Sparkles, ChevronDown, Check, Zap, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { MAIN_SERVICES } from "@/lib/data";
import { ServiceFeature } from "@/lib/types";
import { PiCheckCircleBold, PiCheckCircleDuotone, PiCheckCircleFill, PiCheckFill } from "react-icons/pi";
import { MdPlaylistAddCheckCircle } from "react-icons/md";
import { BsCheck2All, BsCheck2Circle } from "react-icons/bs";

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

// Bottom Sheet - SWIPE TO CLOSE
const BottomSheet = ({ isOpen, onClose, service, onServiceChange }: { 
  isOpen: boolean, 
  onClose: () => void, 
  service: any,
  onServiceChange: (newService: any) => void 
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const serviceIcons = [Globe, Wrench, Brain, Palette, User, Mail];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Touch handlers dla swipe down
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartY(touch.clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaY = touch.clientY - startY;
    
    // Tylko przeciąganie w dół
    if (deltaY > 0) {
      setCurrentY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (currentY > 100) {
      onClose();
    }
    setCurrentY(0);
    setIsDragging(false);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const otherServices = MAIN_SERVICES.filter(s => s.id !== service.id);

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
        onClick={onClose}
        style={{ animation: 'fadeIn 0.2s ease-out' }}
      />
      
      {/* Bottom Sheet */}
      <div 
        ref={sheetRef}
        className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl flex flex-col"
        style={{ 
          animation: 'slideUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          maxHeight: '85vh',
          transform: isDragging ? `translateY(${currentY}px)` : 'translateY(0)',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Handle bar - dla swipe */}
        <div 
          className="sticky top-0 bg-white pt-4 pb-3 flex justify-center z-20 rounded-t-3xl cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1 bg-black/20 rounded-full" />
        </div>

        {/* X Button - STICKY w prawym górnym rogu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 bg-white shadow-lg rounded-full flex items-center justify-center transition-colors hover:bg-black/5 border border-black/10"
          aria-label="Zamknij"
        >
          <X className="w-5 h-5 text-black" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-2 pb-6">
          {/* Header */}
          <div className="mb-4 pr-10">
            <h3 className="text-2xl font-bold text-black mb-1">
              {service.title}
            </h3>
            <p className="text-base text-[#fd9f91]">
              {service.subtitle}
            </p>
          </div>

          {/* Price - PLATYNOWY GRADIENT + CZARNY TŁO */}
          <div className="mb-4 inline-block bg-black px-4 py-2 rounded-xl">
            <div 
              className="text-3xl font-bold"
              style={{
                background: 'linear-gradient(90deg, #94a3b8 0%, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%, #94a3b8 100%)',
                backgroundSize: '200% auto',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {service.price}
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-4 flex items-center gap-2">
            <BsCheck2All className="w-4 h-4 text-[#2DE56B]" />
            <span className="text-xs text-black/70 font-medium">Wybrało już kilka osób w 2025</span>
          </div>

          {/* Description */}
          <div className="mb-5">
            <p className="text-black/70 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Features */}
          <div className="mb-5">
            <h4 className="text-base font-semibold text-black mb-3">Co otrzymujesz?</h4>
            <div className="space-y-2.5">
              {service.features.map((feature: ServiceFeature, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <PiCheckCircleFill className="w-5 h-5 text-[#2DE56B] flex-shrink-0 mt-0.5" />
                  <span className="text-black/80 text-sm leading-relaxed flex-1">{feature.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mb-5">
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-black font-semibold text-sm">Szybka realizacja</div>
                  <div className="text-black/60 text-xs">Terminowo i profesjonalnie</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#2DE56B] flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-black font-semibold text-sm">Gwarancja jakości</div>
                  <div className="text-black/60 text-xs">100% satysfakcji</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-pink-500 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-black font-semibold text-sm">Indywidualne podejście</div>
                  <div className="text-black/60 text-xs">Dostosowane do Twoich potrzeb</div>
                </div>
              </div>
            </div>
          </div>

          {/* Inne usługi - Horizontal Scroll z strzałkami */}
          {otherServices.length > 0 && (
            <div className="mb-5 pt-5 border-t border-black/10">
              <h4 className="text-base font-semibold text-black mb-3">Inne usługi</h4>
              
              <div className="relative">
                {/* Strzałka w lewo */}
                <button
                  onClick={scrollLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  aria-label="Przewiń w lewo"
                >
                  <ChevronLeft className="w-5 h-5 text-black" />
                </button>

                {/* Scrollable container */}
                <div
                  ref={scrollRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide px-10"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {otherServices.map((otherService) => {
                    const IconComponent = serviceIcons[MAIN_SERVICES.indexOf(otherService)];
                    return (
                      <button
                        key={otherService.id}
                        onClick={() => onServiceChange(otherService)}
                        className="flex-shrink-0 w-40 bg-black/5 hover:bg-black/10 rounded-xl p-3 transition-colors text-left"
                      >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-2">
                          <IconComponent className="w-4 h-4 text-black" />
                        </div>
                        <div className="text-xs font-bold text-black mb-1 line-clamp-2">
                          {otherService.title}
                        </div>
                        <div 
                          className="text-xs font-semibold"
                          style={{
                            background: 'linear-gradient(90deg, #94a3b8 0%, #e2e8f0 50%, #94a3b8 100%)',
                            backgroundSize: '200% auto',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {otherService.price}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Strzałka w prawo */}
                <button
                  onClick={scrollRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  aria-label="Przewiń w prawo"
                >
                  <ChevronRight className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          )}

          {/* Spacer dla sticky button */}
          <div className="h-20" />
        </div>

        {/* STICKY CTA */}
        <div className="sticky bottom-0 bg-white px-5 py-4 border-t border-black/5 z-20">
          <Link
            href={`/pricing/${service.id}`}
            className="block w-full"
            onClick={onClose}
          >
            <button className="w-full cursor-pointer flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#2DE56B] text-black font-semibold text-base transition-all duration-150 hover:bg-[#00F5B8] hover:scale-105 active:scale-95">
              {service.ctaText}
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </>
  );
};

export const PricingSection = () => {
  const [ref, inView] = useAdvancedInView();
  const [activeService, setActiveService] = useState<number>(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const changeActiveService = (newIndex: number) => {
    if (newIndex === activeService) return;
    setActiveService(newIndex);
  };

  const openBottomSheet = (service: any) => {
    setSelectedService(service);
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  const handleServiceChange = (newService: any) => {
    setSelectedService(newService);
  };

  const serviceIcons = [Globe, Wrench, Brain, Palette, User, Mail];
  const currentService = MAIN_SERVICES[activeService];

  return (
    <section ref={ref} id="services" className="py-16 relative overflow-hidden" 
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
      
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at bottom left, rgba(255, 116, 95, 0.03) 0%, transparent 50%),
            radial-gradient(ellipse at top right, rgba(255, 116, 95, 0.02) 0%, transparent 50%)
          `
        }}
      />

      {/* NAGŁÓWEK */}
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
            <h2 className="text-3xl lg:text-5xl font-semibold text-white my-4 tracking-tight">
              Wybierz plan.{" "}
              <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                Zacznijmy działać.
              </span>
            </h2>
          </div>
          
          <p className="text-base lg:text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
            Przejrzyste ceny. Jasne warunki. Realne rezultaty dla Twojego biznesu.
          </p>
        </div>
      </div>

      {/* Desktop - BEZ ZMIAN */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-6">
          <div 
            className="grid grid-cols-3 gap-6 mx-auto" 
            style={{ 
              gridTemplateRows: '2fr 1fr'
            }}
          >
            
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
                  <p className="text-sm text-black/60">Wybierz to, czego potrzebujesz</p>
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
                                ${isActive ? 'text-black' : 'text-black/70'}
                              `}>
                                {service.title}
                              </span>
                            </div>
                            {isActive && (
                              <ArrowRight className="w-4 h-4 text-black" />
                            )}
                          </div>
                          
                          <div className="ml-11">
                            <span className="text-sm text-black/60">
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

            <div className="col-span-2 row-span-1">
              <div 
                className="rounded-3xl p-8 shadow-xl h-full relative overflow-hidden"
                style={{
                  background: 'radial-gradient(circle at left bottom, rgba(255, 116, 95, 0.08) 0%, #0f0f0f 70%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="flex flex-col h-full">
                  
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
                      <div className="text-sm text-white/60">początek od</div>
                    </div>
                  </div>

                  <div className="h-px bg-white/10 mb-4" />

                  <p className="text-white text-lg leading-relaxed mb-6">
                    {currentService.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 flex-grow mb-6">
                    {currentService.features.map((feature, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-white text-base leading-relaxed">{feature.title}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <div className="flex gap-4 text-sm text-white/60">
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

            <div className="col-span-2 row-span-1">
              <div 
                className="rounded-3xl p-8 shadow-xl h-full relative overflow-hidden"
                style={{
                  background: '#0f0f0f',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: 'radial-gradient(circle at top left, rgba(255, 116, 95, 0.1) 0%, transparent 50%)'
                  }}
                />

                <div className="h-full flex flex-col justify-center relative z-10">
                  
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl text-white mb-3 font-bold">
                        Potrzebujesz czegoś innego?
                      </h3>
                      <p className="text-white/60 text-base leading-relaxed mb-6">
                        Każdy projekt jest unikalny. Porozmawiajmy o Twoich potrzebach i stwórzmy rozwiązanie szyte na miarę.
                      </p>
                      
                      <div className="space-y-3">
                        <Link
                          href="/contact?tab=project"
                          className="group flex items-center gap-2 text-white/70 text-base transition-all duration-300 hover:text-white"
                        >
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span className="font-medium">Porozmawiajmy o projekcie</span>
                        </Link>
                        <Link
                          href="/pricing" 
                          className="group flex items-center gap-2 text-white/70 text-base transition-all duration-300 hover:text-white"
                        >
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          <span className="font-medium">Zobacz wszystkie pakiety</span>
                        </Link>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Profesjonalnie</div>
                          <div className="text-white/60 text-sm">Dopracowane w każdym detalu</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Na czas</div>
                          <div className="text-white/60 text-sm">Dotrzymujemy terminów</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Indywidualnie</div>
                          <div className="text-white/60 text-sm">Dostosowane do Twoich potrzeb</div>
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
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3">
            {MAIN_SERVICES.map((service, index) => {
              const IconComponent = serviceIcons[index];
              return (
                <div
                  key={service.id}
                  className="bg-[#171717] border border-white/10 rounded-2xl p-3 backdrop-blur-sm relative transition-all duration-300 hover:shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="w-10 h-10 bg-black/5 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {service.title}
                    </h3>
                    
                    <div className="bg-black px-2 py-1 rounded-lg inline-block">
                      <div 
                        className="text-sm font-bold"
                        style={{
                          background: 'linear-gradient(90deg, #94a3b8 0%, #e2e8f0 25%, #f8fafc 50%, #e2e8f0 75%, #94a3b8 100%)',
                          backgroundSize: '200% auto',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {service.price}
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 pt-1">
                      <button
                        onClick={() => openBottomSheet(service)}
                        className="w-full flex items-center justify-center gap-1 bg-black/50 hover:bg-black/10 text-white text-xs font-medium py-2 px-2 rounded-full transition-colors"
                      >
                        <span>Szczegóły</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      
                      <Link
                        href={`/pricing/${service.id}`}
                        className="block w-full"
                      >
                        <button className="w-full flex items-center justify-center gap-1 bg-[#D6D6D6] hover:bg-[#A3A3A3] text-black text-xs font-semibold py-2 px-2 rounded-full transition-colors">
                          <span>Wybierz</span>
                          <Check className="w-3 h-3" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Potrzebujesz czegoś innego? */}
          <div className="mt-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
            <h3 className="text-lg text-white mb-2 font-bold">
              Potrzebujesz czegoś innego?
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Każdy projekt jest unikalny. Porozmawiajmy o Twoich potrzebach i stwórzmy rozwiązanie szyte na miarę.
            </p>
            
            <div className="space-y-2 mb-4">
              <Link
                href="/contact?tab=project"
                className="flex items-center gap-2 text-white/80 text-sm transition-all duration-300 hover:text-white"
              >
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">Porozmawiajmy o projekcie</span>
              </Link>
              <Link
                href="/pricing" 
                className="flex items-center gap-2 text-white/80 text-sm transition-all duration-300 hover:text-white"
              >
                <ArrowRight className="w-4 h-4" />
                <span className="font-medium">Zobacz wszystkie pakiety</span>
              </Link>
            </div>

            <div className="space-y-2.5 pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2DE56B] flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-xs">Profesjonalnie</div>
                  <div className="text-white/60 text-xs">Dopracowane w każdym detalu</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-xs">Na czas</div>
                  <div className="text-white/60 text-xs">Dotrzymujemy terminów</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <div>
                  <div className="text-white font-semibold text-xs">Indywidualnie</div>
                  <div className="text-white/60 text-xs">Dostosowane do Twoich potrzeb</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      {selectedService && (
        <BottomSheet 
          isOpen={isBottomSheetOpen} 
          onClose={closeBottomSheet} 
          service={selectedService}
          onServiceChange={handleServiceChange}
        />
      )}

      
    </section>
  );
};