'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Check, Brain, ArrowRight, Cpu } from "lucide-react";

// Ładowanie asystenta bez SSR
const AssistantDemo = dynamic(
  () => import('@/components/ai-integration/demos/assistant/AssistantDemo'),
  { ssr: false }
);

export default function AiShowcaseExtension() {
  const [formData, setFormData] = useState({ name: '', email: '', consent: false });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) return;
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section className="relative w-full bg-white pb-[80px] pt-[20px] overflow-hidden">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[24px]">
          
          {/* BENTO 1: FORMULARZ (Lewa strona) - Identyczny styl tła co ściana 3D */}
          <div className="lg:col-span-5 w-full bg-zinc-50 rounded-[32px] border border-zinc-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] p-[32px] md:p-[48px] flex flex-col justify-between">
            
            <div className="mb-[40px]">
              <div className="flex items-center gap-[12px] mb-[20px]">
                <div className="w-[8px] h-[8px] rounded-full bg-purple-600" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                  Darmowy dostęp
                </span>
              </div>
              
              <h3 className="text-[28px] font-bold text-zinc-950 leading-[1.1] tracking-tight mb-[12px]">
                Przetestuj AI Buildera.
              </h3>
              <p className="text-[15px] text-zinc-600 leading-relaxed">
                Skonfiguruj własnego asystenta. Dopasuj styl odpowiedzi do swojej marki przed wdrożeniem go na stronę internetową.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[12px]">
              {/* Inputy bez twardych borderów, czysta biel + cień */}
              <input 
                type="text" 
                required 
                placeholder="Imię i nazwisko"
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full h-[52px] bg-white rounded-[16px] px-[20px] text-[15px] text-zinc-900 outline-none focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-zinc-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" 
              />

              <input 
                type="email" 
                required 
                placeholder="Adres e-mail"
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full h-[52px] bg-white rounded-[16px] px-[20px] text-[15px] text-zinc-900 outline-none focus:ring-4 focus:ring-purple-500/10 transition-all placeholder:text-zinc-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)]" 
              />

              <label className="flex items-start gap-[12px] mt-[8px] mb-[8px] cursor-pointer group">
                <div className="relative flex items-center justify-center mt-[2px]">
                  <input 
                    type="checkbox" 
                    required 
                    checked={formData.consent} 
                    onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                    className="peer appearance-none w-[18px] h-[18px] rounded-[6px] border border-zinc-300 checked:bg-purple-600 checked:border-purple-600 transition-all cursor-pointer bg-white shadow-sm" 
                  />
                  <Check className="absolute w-[12px] h-[12px] text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                </div>
                <span className="text-[12px] text-zinc-500 leading-relaxed">
                  Zgadzam się na przetwarzanie danych w celu wysłania dostępu zgodnie z <a href="/privacy" className="text-purple-600 font-medium hover:underline">Polityką Prywatności</a>.
                </span>
              </label>

              <button 
                type="submit" 
                disabled={status !== 'idle' || !formData.consent}
                className="w-full h-[52px] mt-[4px] rounded-[16px] bg-zinc-900 text-white font-semibold text-[15px] hover:bg-purple-600 transition-colors duration-300 disabled:bg-zinc-200 disabled:text-zinc-400 flex items-center justify-center gap-[8px]"
              >
                {status === 'idle' ? (
                  <>Odbierz dostęp <ArrowRight size={18} /></>
                ) : status === 'loading' ? (
                  'Przetwarzanie...'
                ) : (
                  'Wysłano poprawnie'
                )}
              </button>
            </form>
          </div>

          {/* BENTO 2: DEMO ASYSTENTA (Prawa strona) - Identyczny styl */}
          <div className="lg:col-span-7 w-full bg-zinc-50 rounded-[32px] border border-zinc-100 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] p-[16px] md:p-[24px] flex flex-col relative overflow-hidden">
            
            {/* Czysty nagłówek zamiast kropek macOS */}
            <div className="flex items-center gap-[10px] mb-[20px] px-[8px]">
              <div className="w-[8px] h-[8px] rounded-full bg-purple-600 animate-pulse" />
              <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
                Interaktywny podgląd chatbota
              </span>
            </div>

            {/* Miejsce na komponent czatu - wyczyszczone do samej bieli */}
            <div className="w-full flex-grow min-h-[400px] bg-white rounded-[20px] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
              <AssistantDemo onClose={() => {}} onThemeChange={() => {}} />
            </div>

            {/* Pasek informacyjny na dole - bez twardej ramki */}
            <div className="mt-[20px] flex items-center gap-[16px] p-[20px] bg-purple-50/80 rounded-[20px]">
              <Cpu className="w-[20px] h-[20px] text-purple-600 flex-shrink-0" />
              <p className="text-[13px] font-medium text-purple-900/80 leading-relaxed">
                Powyżej widzisz uproszczoną wersję. Pełny silnik analizuje pliki PDF, strukturę WWW oraz firmowe bazy Notion, by odpowiadać wyłącznie potwierdzonymi faktami z życia Twojej firmy.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}