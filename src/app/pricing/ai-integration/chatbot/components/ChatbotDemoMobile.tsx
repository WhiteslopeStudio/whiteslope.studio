'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Check, Calendar, ArrowDown } from 'lucide-react';

// Ładowanie asystenta bez SSR - DOKŁADNIE TAK JAK W REFERENCJI
const AssistantDemo = dynamic(
  () => import('@/components/ai-integration/demos/assistant/AssistantDemo'),
  { ssr: false }
);

export default function ChatbotDemoMobile() {
  return (
    <section className="relative w-full bg-white py-[60px] overflow-hidden flex flex-col">
      
      {/* --- TŁO: Delikatne Paski Gradientowe z Brand Booka --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-[0.4]">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 80%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 60%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 40%)' }} />
      </div>

      <div className="w-full max-w-[500px] mx-auto px-5 relative z-10 flex flex-col">
        
        {/* --- NAGŁÓWEK --- */}
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-[32px] font-bold leading-[1.05] tracking-tight text-zinc-950">
            Twój nowy koordynator online.<br />
            Przetestuj sam.
          </h2>
          
          {/* Animowana strzałka w dół (Akcent Fioletowy) */}
          <div className="mt-4 text-black ">
            <ArrowDown size={28} strokeWidth={2.5} />
          </div>
        </div>

        {/* --- KONTENER CHATBOTA --- */}
        <div className="w-full h-[500px] bg-zinc-100 rounded-[24px] border border-zinc-200 shadow-md overflow-hidden relative flex flex-col mb-10">
          
          {/* Belka informacyjna nad Chatbotem (Zostawiona jak w oryginale) */}
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

        {/* --- LISTA KORZYŚCI Z DEDYKOWANYM DESIGNEM --- */}
        <ul className="flex flex-col gap-2.5 w-full">
          
          <li className="flex items-start gap-3">
            <div className="w-[22px] h-[22px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center text-white shadow-sm shrink-0 mt-0.5">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-[14px] font-semibold text-zinc-800 leading-snug">
              <span className="font-[900] text-zinc-950">Naturalna rozmowa</span> i budowa zaufania.
            </span>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="w-[22px] h-[22px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center text-white shadow-sm shrink-0 mt-0.5">
              <Check size={14} strokeWidth={3} />
            </div>
            <span className="text-[14px] font-semibold text-zinc-800 leading-snug">
              Klient szybko dowiaduje się o Twojej ofercie <u className="decoration-2 underline-offset-2 decoration-purple-400/60 font-[900] text-zinc-950">w kilka sekund</u>.
            </span>
          </li>
          
          <li className="flex items-start gap-3">
            <div className="w-[22px] h-[22px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center text-white shadow-sm shrink-0 mt-0.5">
              <Check size={14} strokeWidth={3} />
            </div>
            {/* SPECJALNY DESIGN Z OPISEM */}
            <span className="text-[14px] font-semibold text-zinc-800 leading-snug inline-block">
              Agent AI sam{' '}
              <span className="inline-flex items-center gap-1.5 bg-purple-100 border border-purple-200 rounded-full px-2.5 py-0.5 mx-0.5 shadow-sm whitespace-nowrap">
                <span className="font-[900] text-violet-700">rezerwuje&nbsp;termin</span>
                <Calendar className="w-3.5 h-3.5 text-violet-700" strokeWidth={2.5} />
              </span>
              {' '}w kalendarzu i Ty dostajesz powiadomienie email, a Twój klient <span className="font-[900] text-zinc-950">natychmiastowe potwierdzenie</span> e-mail.
            </span>
          </li>

        </ul>

      </div>
    </section>
  );
}