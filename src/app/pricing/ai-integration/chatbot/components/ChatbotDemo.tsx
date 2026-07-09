'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Check, Calendar, ArrowRight } from 'lucide-react';

// Ładowanie asystenta bez SSR - DOKŁADNIE TAK JAK W REFERENCJI
const AssistantDemo = dynamic(
  () => import('@/components/ai-integration/demos/assistant/AssistantDemo'),
  { ssr: false }
);

export default function ChatbotDemo() {
  return (
    <section className="relative w-full bg-white py-[80px] lg:py-[120px] overflow-hidden flex flex-col">
      
      {/* --- TŁO: Delikatne Paski Gradientowe z Brand Booka --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-[0.4]">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 80%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 60%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 40%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 20%)' }} />
      </div>

      {/* --- POŚWIATA (Lawendowy Glow) --- */}
      <div className="absolute top-[20%] right-[10%] w-[50%] h-[60%] bg-purple-500/2 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* --- KONTENER GŁÓWNY (Desktop 2 kolumny) --- */}
      <div className="w-full max-w-[1640px] mx-auto px-5 md:px-[24px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* --- LEWA KOLUMNA: Tekst i korzyści --- */}
        <div className="w-full lg:w-[45%] flex flex-col items-start relative z-10">
          
          {/* NAGŁÓWEK */}
          <h2 className="text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-zinc-950 mb-8">
            <span className="font-[900] text-black">Przetestuj swojego nowego asystenta online</span><br />
            
          </h2>
          
          {/* LISTA KORZYŚCI Z DEDYKOWANYM DESIGNEM */}
          <ul className="flex flex-col gap-5 w-full mb-10">
            
            <li className="flex items-start gap-4">
              <div className="w-[26px] h-[26px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center text-white shadow-sm shrink-0 mt-1">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="text-[16px] lg:text-[18px] font-semibold text-zinc-800 leading-snug">
                <span className="font-[900] text-zinc-950">Naturalna rozmowa</span> i budowa zaufania.
              </span>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="w-[26px] h-[26px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center text-white shadow-sm shrink-0 mt-1">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="text-[16px] lg:text-[18px] font-semibold text-zinc-800 leading-snug">
                Klient szybko dowiaduje się o Twojej ofercie <u className="decoration-2 underline-offset-2 decoration-purple-400/60 font-[900] text-zinc-950">w kilka sekund</u>.
              </span>
            </li>
            
            <li className="flex items-start gap-4">
              <div className="w-[26px] h-[26px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center text-white shadow-sm shrink-0 mt-1">
                <Check size={16} strokeWidth={3} />
              </div>
              <span className="text-[16px] lg:text-[18px] font-semibold text-zinc-800 leading-snug inline-block">
                Agent AI sam{' '}
                <span className="inline-flex items-center gap-2 bg-purple-100 border border-purple-200 rounded-full px-3 py-0.5 mx-1 shadow-sm whitespace-nowrap">
                  <span className="font-[900] text-violet-700">rezerwuje&nbsp;termin</span>
                  <Calendar className="w-4 h-4 text-violet-700" strokeWidth={2.5} />
                </span>
                {' '}w kalendarzu - Ty dostajesz powiadomienie email, a Twój klient <span className="font-[900] text-zinc-950">natychmiastowe potwierdzenie</span> e-mail.
              </span>
            </li>

          </ul>

          {/* Animowana strzałka wskazująca na demo obok */}
          <div className="hidden lg:flex items-center gap-4 text-zinc-900 mt-4 ">
            <span className="text-[14px] font-bold tracking-[0.2em]">Sprawdź działanie</span>
            <ArrowRight size={28} strokeWidth={2} className="text-black" />
          </div>

        </div>

        {/* --- PRAWA KOLUMNA: KONTENER CHATBOTA --- */}
        <div className="w-full lg:w-[55%] flex justify-end relative z-10">
          <div className="w-full max-w-[700px] h-[600px] lg:h-[700px] bg-zinc-100 rounded-[32px] lg:rounded-[40px] border border-zinc-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden relative flex flex-col group hover:border-zinc-300 transition-all duration-500">
            
            {/* Belka informacyjna nad Chatbotem */}
            <div className="bg-zinc-50 border-b border-zinc-200 p-[16px] flex items-center justify-center shrink-0">
              <span className="text-[18px] font-bold text-zinc-900 uppercase tracking-[0.2em]">
                <span className="font-[900] text-black">Interaktywne Demo</span>
              </span>
            </div>
            
            {/* Komponent Chatbota */}
            <div className="flex-1 overflow-hidden relative">
              <AssistantDemo onClose={() => {}} onThemeChange={() => {}} />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}