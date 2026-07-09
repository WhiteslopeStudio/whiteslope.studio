'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from "lucide-react";

const SERVICES = [
  { id: 'support_bot', title: 'Chat Pomoc Techniczna 24/7' },
  { id: 'booking_bot', title: 'Chatboty Rezerwacje' },
  { id: 'docs', title: 'Obieg Dokumentów' },
  { id: 'leads', title: 'Zarządzanie Leadami' },
  { id: 'api', title: 'Integracje Systemów (API)' }
];

export default function AutomationShowcaseMobile() {
  return (
    <section className="relative w-full bg-white py-8 px-6 overflow-hidden">
      <div className="w-full mx-auto">
        
        {/* Układ flex-col pozwalający na naturalne ułożenie miniatury na górze */}
        <div className="relative group w-full bg-zinc-50 rounded-[28px] border border-zinc-200 overflow-hidden flex flex-col shadow-sm">
          
          {/* Niewidoczny link pokrywający całą kartę (Z-index 30) */}
          <Link href="/pricing/ai-integration" className="absolute inset-0 z-30 rounded-[28px]" aria-label="Wyceń automatyzację" />

          {/* --- TŁO KARTY --- */}
          <div className="absolute top-0 left-0 right-0 h-[300px] z-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, #f4f4f5 100%)' }} />
          <div className="absolute top-[-5%] right-[-10%] w-[80%] h-[200px] rounded-full bg-purple-500/15 blur-[60px] pointer-events-none z-0" />
          
          {/* --- LOGO --- */}
          <img 
            src="/_resources/logos/whiteslopeStudioLogoFioletowy_dzialAUTOMATION_AI_czarny.webp"
            className="absolute top-5 right-5 h-[20px] object-contain z-20 pointer-events-none"
            alt="Whiteslope Studio Automation & AI"
          />

          {/* --- GÓRA: ZDJĘCIE CHATBOTA --- */}
          <div className="relative w-full h-[240px] pt-12 px-4 flex items-end justify-center z-10 pointer-events-none">
            <img 
              src="/_resources/Automations/chatbotPicture.png"
              alt="Interaktywne demo chatbota AI"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_12px_24px_rgba(147,51,234,0.08)]"
            />
          </div>

          {/* --- DÓŁ: TREŚĆ --- */}
          <div className="w-full flex flex-col items-start text-left p-6 z-20 relative pointer-events-none bg-zinc-50">
            
            <h2 className="text-[28px] font-bold text-zinc-950 leading-[1.1] tracking-tight mb-3">
              2. Automatyzacja procesów<br />i aktywacja AI
            </h2>

            <p className="text-[15px] text-zinc-600 leading-relaxed font-normal mb-6">
              Budujemy rozwiązania, które łączą kod z inteligencją AI, eliminując nudę i powtarzalne błędy z Twojej codzienności:
            </p>

            {/* Fioletowe akcenty listy usług */}
            <ul className="flex flex-col gap-3 mb-8 w-full">
              {SERVICES.map((service) => (
                <li key={service.id} className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center flex-shrink-0 text-purple-100 shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-semibold text-zinc-900 tracking-tight">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>

            <div className="group relative inline-flex overflow-hidden rounded-full p-[3px] w-full pointer-events-auto transition-transform active:scale-95">
              
              <style>{`
                @keyframes rotateLavenderButton {
                  0% { transform: translate(-50%, -50%) rotate(0deg); }
                  100% { transform: translate(-50%, -50%) rotate(360deg); }
                }
                
                .spinner-element-lavender {
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  width: 250%;
                  aspect-ratio: 1;
                  background: conic-gradient(from 0deg, rgba(183, 148, 244, 0) 30%, #a947ff 100%);
                  transform: translate(-50%, -50%);
                }

                .group:hover .spinner-element-lavender {
                  animation: rotateLavenderButton 1.2s linear infinite;
                }
              `}</style>

              <span className="absolute spinner-element-lavender opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <Link
                href="/pricing/ai-integration"
                className="relative z-10 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-black px-6 text-[15px] font-semibold text-white"
              >
                Zobacz więcej
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}