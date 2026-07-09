'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export default function HeroSectionMobile() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Zapisujemy referencję do formularza ZANIM wejdziemy w kod asynchroniczny (await)
    const form = e.currentTarget;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    // Używamy zapisanej referencji
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    const payload = {
      formType: 'question',
      formData: {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        subject: 'Zapytanie z Landing Page - Chatbot AI',
        message: data.message,
        priority: 'high'
      }
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Resetujemy formularz z użyciem zapamiętanej zmiennej, która nie jest null
        form.reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.error || 'Wystąpił nieoczekiwany błąd.');
      }
    } catch (error) {
      console.error('Błąd wysyłania formularza:', error);
      setSubmitStatus('error');
      setErrorMessage('Nie udało się połączyć z serwerem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative w-full bg-white pt-[100px] pb-[60px] overflow-hidden flex flex-col min-h-[100svh]">
      
      {/* --- TŁO: Limonkowe Paski Gradientowe --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-[0.8]">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 80%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 60%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 40%)' }} />
      </div>

      {/* --- POŚWIATA (Lawendowy Glow) --- */}
      <div className="absolute top-[5%] right-[-20%] w-[80%] h-[40%] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* --- KONTENER GŁÓWNY --- */}
      <div className="w-full max-w-[500px] mx-auto px-5 relative z-10 flex flex-col">

        <h1 className="text-[44px] font-[200] leading-[0.85] tracking-tighter text-zinc-950 relative z-0">
          <span className="font-[900] text-violet-500">Chatbot AI</span><br />
          na stronę internetową
        </h1>

        <div className="inline-flex self-start items-center bg-[#D4FF00] text-zinc-950 font-bold text-[11px] tracking-[0.05em] px-3 py-1.5 rounded-lg -rotate-[3deg] shadow-md mt-1 mb-6 border border-black/5 relative z-10">
          Gotowy <u className="ml-1 decoration-2 underline-offset-2">nawet w kilka godzin</u>
        </div>

        <p className="text-[15px] text-zinc-600 leading-relaxed mb-5 font-medium">
          * Pełne wdrożenie po naszej stronie
        </p>

        <ul className="flex flex-col gap-2.5 w-full mb-10">
          {[
            'Szybkie wdrożenie', 
            'Efekty działania natychmiastowe', 
            '24/7 obsługa klienta'
          ].map((text, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="w-[22px] h-[22px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center text-white shadow-sm shrink-0">
                <Check size={14} strokeWidth={3} />
              </div>
              <span className="text-[14px] font-semibold text-zinc-900">{text}</span>
            </li>
          ))}
        </ul>

        {/* --- FORMULARZ KOMPAKTOWY --- */}
        <div className="w-full bg-zinc-100 border border-zinc-200 rounded-[32px] p-5 flex flex-col relative shadow-md">
          
          <h3 className="text-[18px] font-bold text-center text-zinc-950 mb-5 leading-[1.15]">
            Zostaw kontakt.<br/>Skontaktujemy się z Tobą.
          </h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input 
              type="text" 
              name="name"
              required
              placeholder="Imię" 
              className="w-full bg-white rounded-full px-4 py-2.5 text-[13px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm transition-all border border-zinc-200/50" 
            />
            <input 
              type="email" 
              name="email"
              required
              placeholder="E-mail" 
              className="w-full bg-white rounded-full px-4 py-2.5 text-[13px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm transition-all border border-zinc-200/50" 
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Telefon (opcjonalnie)" 
              className="w-full bg-white rounded-full px-4 py-2.5 text-[13px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm transition-all border border-zinc-200/50" 
            />
            
            <textarea 
              name="message"
              required
              placeholder="Treść" 
              rows={2} 
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              className="w-full bg-white rounded-[16px] px-4 py-2.5 text-[13px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm resize-none overflow-hidden transition-colors border border-zinc-200/50"
            ></textarea>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group w-full rounded-full bg-zinc-800 hover:bg-zinc-900 text-white font-semibold py-3 mt-1 active:scale-95 transition-all duration-300 text-[13px] flex items-center justify-center shadow-md disabled:opacity-70 disabled:scale-100"
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
            </button>

            {submitStatus === 'success' && (
              <p className="text-[12px] text-green-600 text-center font-medium mt-1">Wysłano pomyślnie!</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-[12px] text-red-500 text-center font-medium mt-1">{errorMessage}</p>
            )}
          </form>

          <div className="mt-6 flex flex-col gap-0.5 text-[12px] text-zinc-600 text-center">
            <span className="font-bold text-zinc-950 mb-1">Kontakt bezpośredni:</span>
            <a href="tel:+48662581368" className="hover:text-purple-500 transition-colors font-medium">
              +48 662 581 368 - Patryk Kulesza (AI Specialist)
            </a>
            <a href="mailto:kontakt@whiteslope.studio" className="hover:text-purple-500 transition-colors font-medium">
              kontakt@whiteslope.studio
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}