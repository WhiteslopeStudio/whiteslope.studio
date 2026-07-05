'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Check, ArrowRight } from "lucide-react";

// Ładowanie asystenta bez SSR
const AssistantDemo = dynamic(
  () => import('@/components/ai-integration/demos/assistant/AssistantDemo'),
  { ssr: false }
);

// Oczyszczona lista usług (w stylu premium, bez pigułek)
const SERVICES = [
  { id: 'support_bot', title: 'Chat Pomoc Techniczna 24/7' },
  { id: 'booking_bot', title: 'Chatboty Rezerwacje' },
  { id: 'docs', title: 'Obieg Dokumentów' },
  { id: 'leads', title: 'Zarządzanie Leadami' },
  { id: 'api', title: 'Integracje Systemów (API)' }
];

export default function AutomationShowcase() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      <div className="w-full max-w-[1640px] mx-auto px-[24px] pb-[80px]">
        
        {/* --- GŁÓWNA KARTA BENTO --- */}
        <div className="relative group w-full bg-zinc-50 rounded-[32px] border border-zinc-200 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:border-zinc-300 cursor-pointer min-h-[650px] lg:min-h-[700px] flex items-center">
          
          {/* Niewidoczny link pokrywający całą kartę (Z-index 30) */}
          <Link href="/pricing/ai-integration" className="absolute inset-0 z-30 rounded-[32px]" aria-label="Wyceń automatyzację" />

          {/* --- TŁO: 4 pionowe pasy (po 1/8 szerokości) w lewej połowie --- */}
          <div className="absolute inset-0 z-0 flex pointer-events-none w-1/2">
            
            {/* Pas 1: Gradient do zinc-50 */}
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, #f4f4f5 100%)' }} />
            
            {/* Pas 2: Gradient do zinc-50 */}
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, #f4f4f5 75%)' }} />
            
            {/* Pas 3: Gradient do zinc-50 */}
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, #f4f4f5 50%)' }} />
            
            {/* Pas 4: Pionowy (niebieski->zinc-50) + Poziomy (transparent->zinc-50 od prawej do lewej) */}
            <div 
              className="flex-1" 
              style={{ 
                background: `
                  linear-gradient(to left, #f5f5f5 0%, transparent 100%), 
                  linear-gradient(to bottom, #dfffd0 0%, #f4f4f5 25%)
                ` 
              }} 
            />
          </div>

          {/* --- TŁO: Subtelny fioletowy gradient (Mac-style glow) --- */}
          <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none z-0 transition-opacity duration-500 group-hover:opacity-100 opacity-70" />
          <div className="absolute bottom-[-10%] right-[15%] w-[40%] h-[40%] rounded-full bg-purple-400/15 blur-[80px] pointer-events-none z-0" />

          {/* --- LEWO: Treść --- */}
          <div className="w-full lg:w-[50%] flex flex-col items-start text-left p-[32px] pb-[580px] lg:pb-[64px] lg:p-[64px] z-20 relative pointer-events-none">
            
            {/* LOGO: Umieszczone naturalnie nad H2 */}
            <div className="w-full flex justify-start mb-[32px] lg:mb-[40px]">
               <img 
                src="/_resources/logos/whiteslopeStudioLogoFioletowy_dzialAUTOMATION_AI_czarny.webp"
                className="h-[30px] lg:h-[40px] object-contain pointer-events-none"
                alt="Whiteslope Studio Automation & AI"
              />
            </div>

            <h2 className="text-[36px] lg:text-[42px] font-bold text-zinc-950 leading-[1.05] tracking-tight mb-[24px]">
              2. Automatyzacja procesów<br />i aktywacja AI w Twojej firmie
            </h2>

            <p className="text-[16px] text-zinc-600 leading-relaxed font-normal mb-[40px] max-w-[480px]">
              Budujemy rozwiązania, które łączą kod z inteligencją AI, eliminując nudę i powtarzalne błędy z Twojej codzienności:
            </p>

            {/* Czysta lista - wiodący FIOLETOWY kolor */}
            <ul className="flex flex-col gap-[16px] mb-[48px] w-full">
              {SERVICES.map((service) => (
                <li key={service.id} className="flex items-center gap-[14px]">
                  <div className="w-[24px] h-[24px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center flex-shrink-0 text-purple-100 shadow-sm">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[16px] font-semibold text-zinc-900 tracking-tight">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>

            <div className="group relative inline-flex overflow-hidden rounded-full p-[4px] transition-transform active:scale-95 cursor-pointer">
  
  {/* UNIKALNE STYLE DLA WERSJI LAWENDOWEJ */}
  <style>{`
    @keyframes rotateLavenderButton {
      0% { transform: translate(-50%, -50%) rotate(0deg); }
      100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
    
    .spinner-element-lavender {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 250%; /* Dopasuj, jeśli przycisk jest bardzo szeroki */
      aspect-ratio: 1; /* Wymusza kształt kwadratu, żeby gradient nie falował */
      /* Lawendowy przejrzysty przechodzi w pełny lawendowy fiolet (#b794f4) */
      background: conic-gradient(from 0deg, rgba(183, 148, 244, 0) 30%, #a947ff 100%);
      transform: translate(-50%, -50%); /* Centrowanie na start */
    }

    .group:hover .spinner-element-lavender {
      animation: rotateLavenderButton 1.2s linear infinite;
    }
  `}</style>

  

  {/* Tylko i wyłącznie lawendowa obwódka */}
  <span className="absolute spinner-element-lavender opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  
  {/* Środek przycisku */}
  <Link
    href="/pricing/ai-integration"
    className="relative z-10 inline-flex h-[44px] w-full sm:w-auto items-center justify-center rounded-full bg-black px-6 text-[14px] md:text-[15px] font-semibold text-white"
  >
    Zobacz więcej
    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
  </Link>

</div>
            
          </div>

          {/* --- PRAWO: Interaktywny Chatbot --- */}
          {/* ZMIANA: Zwiększona wysokość z lg:h-[75%] na lg:h-[90%] */}
          <div className="absolute bottom-0 right-0 w-[100%] lg:w-[50%] h-[550px] lg:h-[90%] z-40 flex items-end justify-center px-[16px] md:px-[32px] lg:px-[64px] pointer-events-none">
            
            {/* Wnętrze z Chatbotem - Reaguje na kliknięcia */}
            <div className="w-full h-full bg-zinc-100 rounded-t-[24px] lg:rounded-t-[32px] border-t border-l border-r border-zinc-200 shadow-[0_-10px_40px_rgba(147,51,234,0.08)] overflow-hidden relative pointer-events-auto transition-transform duration-1000 group-hover:scale-[1.01] origin-bottom flex flex-col">
              
              {/* Belka informacyjna nad Chatbotem */}
              <div className="bg-zinc-50 border-b border-zinc-200 p-[12px] flex items-center justify-center shrink-0">
                <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                  Interaktywne Demo
                </span>
              </div>
              
              {/* Komponent Chatbota */}
              <div className="flex-1 overflow-hidden relative">
                <AssistantDemo onClose={() => {}} onThemeChange={() => {}} />
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}