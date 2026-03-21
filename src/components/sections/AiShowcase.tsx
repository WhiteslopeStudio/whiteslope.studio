'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, EnvelopeSimple, User, Cpu, Gear, ArrowRight, Brain } from "@phosphor-icons/react";
import dynamic from 'next/dynamic';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';

const AssistantDemo = dynamic(
  () => import('@/components/ai-integration/demos/assistant/AssistantDemo'),
  { ssr: false }
);

const PURPLE_LIGHT = '#a78bfa';
const GRAY_LIGHT = '#a1a1a1';
const GRAY_BORDER = '#262626';

const ITEMS = [
  {
    label: 'Chatboty E-commerce',
    desc: 'Automatyczny doradca w sklepie online, który zwiększa konwersję.',
  },
  {
    label: 'Chatboty rezerwacji',
    desc: 'Umawianie spotkań w kalendarzu',
  },
  {
    label: 'Pomoc techniczna 24/7',
    desc: 'Odpowiedzi na bazie dokumentacji firmy, bez angażowania zespołu.',
  },
];

export default function AiShowcase() {
  const [formData, setFormData] = useState({ name: '', email: '', consent: false });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setStatus('loading');
    
    // TUTAJ PODŁĄCZYMY n8n / RESEND / MAILCHIMP
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="relative w-full bg-black py-24 overflow-hidden border-b" style={{ borderColor: GRAY_BORDER }}>
      
      {/* TŁO */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${GRAY_LIGHT} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="flex flex-col lg:flex-row items-stretch w-full min-h-[850px]">
        
        {/* --- LEWO: DEMO ASYSTENTA (50%) --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4 md:p-12 lg:p-20 lg:border-r border-b lg:border-b-0" style={{ borderColor: GRAY_BORDER }}>
          
          <div className="w-full max-w-2xl relative">
            <div className="absolute -top-12 left-0 flex items-center gap-3 mb-4">
               <Gear size={16} weight="fill" className="text-[#a78bfa] animate-spin-slow" />
               <span className="text-[10px] font-mono uppercase text-white/40 tracking-[0.3em]">
                 Whiteslope Studio Interkatywny asystent AI - Demo
               </span>
            </div>

            <div className="relative border bg-[#050505] shadow-2xl" style={{ borderColor: GRAY_BORDER }}>
              <div className="flex items-center justify-between px-5 py-3 border-b bg-white/[0.02]" style={{ borderColor: GRAY_BORDER }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Podgląd chatbota</span>
                </div>
              </div>
              
              <div className="p-1 min-h-[500px] overflow-hidden">
                <AssistantDemo onClose={() => {}} onThemeChange={() => {}} />
              </div>
            </div>

            <div className="mt-8 flex items-start gap-4 p-4 border border-[#a78bfa]/10 bg-[#a78bfa]/5">
               <Cpu size={20} className="text-[#a78bfa] flex-shrink-0" />
               <p className="text-[11px] font-mono text-gray-400 uppercase tracking-tight leading-relaxed">
                 Powyższy moduł to uproszczona wersja naszego silnika. <br />
                 Pełna wersja wdraża bazę wiedzy Twojej firmy (PDF, URL, Notion).
               </p>
            </div>
          </div>
        </div>

        {/* --- PRAWO: TREŚĆ (50%) --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left px-6 md:px-12 lg:px-20 py-12">
          
          

          <h2 
            className="text-white font-bold leading-[0.95] mb-10 uppercase"
            style={{
              fontFamily: 'var(--font-unbounded), sans-serif',
              fontSize: 'clamp(2rem, 3.2vw, 4rem)',
              letterSpacing: '-0.02em',
            }}
          >
            Skonfiguruj własnego <br /> 
            <span style={{ color: PURPLE_LIGHT }}>Asystenta AI</span>
          </h2>

          <div className="space-y-6 mb-10">
            <p className="text-lg leading-relaxed" style={{ color: GRAY_LIGHT }}>
              Odbierz dostęp do naszego <span className="text-white font-bold italic">AI Chatbot Buildera</span>. 
              Samodzielnie ustaw styl odpowiedzi i przetestuj go przed wdrożeniem.
            </p>
          </div>

          {/* LISTA KORZYŚCI */}
          <div className="space-y-6 mb-10 w-full">
            {ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="mt-1 w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-none" 
                     style={{ borderColor: GRAY_BORDER, backgroundColor: 'rgba(167,139,250,0.05)' }}>
                  <Check size={12} weight="bold" style={{ color: PURPLE_LIGHT }} />
                </div>
                <div>
                  <p className="text-white font-bold text-base uppercase tracking-tight">{item.label}</p>
                  <p className="text-sm leading-relaxed mt-1" style={{ color: GRAY_LIGHT }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* NOWE MIEJSCE DLA CTA PRZYCISKU */}
          <div className="mb-16 w-full">
            <PrimaryButton 
              href="/pricing/ai-integration" 
              className="!bg-[#a78bfa] !text-black !border-[#a78bfa] hover:!bg-white hover:!text-black transition-none"
            >
              Zobacz pełną ofertę AI
            </PrimaryButton>
          </div>

          <div className="w-full mt-auto p-8 border bg-white" style={{ borderColor: GRAY_BORDER }}>
            <div className="flex items-center gap-3 mb-6">
              <Brain size={20} className="text-[#a78bfa]" />
              <p className="text-black font-black uppercase text-[11px] tracking-[0.2em]">
                Skonfiguruj chatbota AI w naszej aplikacji - Odbierz darmowy dostęp do AI Buildera
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input type="text" required placeholder="IMIĘ I NAZWISKO"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full h-14 bg-white border border-black px-5 text-black text-[11px] font-bold tracking-widest outline-none focus:border-[#a78bfa] placeholder:text-black/40" />

              <input type="email" required placeholder="ADRES E-MAIL"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-14 bg-white border border-black px-5 text-black text-[11px] font-bold tracking-widest outline-none focus:border-[#a78bfa] placeholder:text-black/40" />

              <label className="flex items-start gap-3 mt-2 cursor-pointer">
                <input type="checkbox" required checked={formData.consent} onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                  className="mt-1 appearance-none w-4 h-4 border border-black checked:bg-[#a78bfa] cursor-pointer" />
                <span className="text-[9px] text-black uppercase leading-relaxed tracking-tighter">
                  Wyrażam zgodę na przetwarzanie danych w celu wysłania dostępu do AI Builder zgodnie z <a href="/privacy" className="underline text-blue hover:underline">Polityką Prywatności</a>.
                </span>
              </label>

              <button type="submit" disabled={status !== 'idle' || !formData.consent}
                className="h-14 mt-4 bg-black text-white font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-[#a78bfa] hover:text-black transition-none disabled:bg-neutral-200 disabled:text-neutral-400 flex items-center justify-center gap-3">
                {status === 'idle' ? (<>Odbierz dostęp <ArrowRight size={16} weight="bold" /></>) : status === 'loading' ? ('Generowanie...') : ('Wysłano poprawnie')}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}