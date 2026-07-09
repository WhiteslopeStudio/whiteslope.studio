'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

export default function HeroSection() {
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
    <section className="relative w-full bg-white overflow-hidden flex items-center min-h-[80svh]">
      
      {/* --- TŁO: Limonkowe Paski Gradientowe --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-[0.8]">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 85%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 70%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 55%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 40%)' }} />
      </div>

      {/* --- POŚWIATA (Lawendowy Glow) --- */}
      <div className="absolute top-[10%] right-[5%] w-[40%] h-[60%] bg-purple-500/15 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* --- KONTENER GŁÓWNY (Desktop 2 kolumny) --- */}
      <div className="w-full max-w-[1640px] mx-auto px-5 md:px-[24px] relative z-10 flex flex-row items-center justify-between gap-12 lg:gap-20">

        {/* --- LEWA KOLUMNA: Tekst i korzyści --- */}
        <div className="w-full lg:w-[55%] flex flex-col items-start relative z-10">
          <h1 className="text-[64px] lg:text-[76px] font-[200] leading-[0.85] tracking-tighter text-zinc-950 relative z-0">
            <span className="font-[900] text-black">Chatbot AI</span><br />
            na stronę internetową
          </h1>

          <div className="inline-flex self-start items-center bg-[#D4FF00] text-zinc-950 font-bold text-[13px] tracking-[0.05em] px-4 py-2 rounded-lg -rotate-[3deg] shadow-md mt-2 mb-8 border border-black/5 relative z-10">
            Gotowy <u className="ml-1.5 decoration-2 underline-offset-2">nawet w kilka godzin</u>
          </div>

          <p className="text-[16px] text-zinc-600 leading-relaxed mb-8 font-medium">
            * Pełne wdrożenie po naszej stronie
          </p>

          <ul className="flex flex-col gap-4 w-full">
            {[
              'Szybkie wdrożenie', 
              'Efekty działania natychmiastowe', 
              '24/7 obsługa klienta'
            ].map((text, index) => (
              <li key={index} className="flex items-center gap-4">
                <div className="w-[26px] h-[26px] rounded-full bg-purple-400 border border-purple-100 flex items-center justify-center text-white shadow-sm shrink-0">
                  <Check size={16} strokeWidth={3} />
                </div>
                <span className="text-[16px] lg:text-[18px] font-semibold text-zinc-900">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* --- PRAWA KOLUMNA: Formularz kontaktowy --- */}
        <div className="w-full lg:w-[45%] max-w-[550px] bg-zinc-100 border border-zinc-200 rounded-[32px] p-8 lg:p-10 flex flex-col relative shadow-xl z-10">
          
          <h3 className="text-[22px] lg:text-[26px] font-bold text-center text-zinc-950 mb-8 leading-[1.15]">
            Zostaw kontakt.<br/>Skontaktujemy się z Tobą.
          </h3>
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input 
              type="text" 
              name="name"
              required
              placeholder="Imię" 
              className="w-full bg-white rounded-full px-5 py-3.5 text-[14px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm transition-all border border-zinc-200/50" 
            />
            <input 
              type="email" 
              name="email"
              required
              placeholder="E-mail" 
              className="w-full bg-white rounded-full px-5 py-3.5 text-[14px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm transition-all border border-zinc-200/50" 
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="Telefon (opcjonalnie)" 
              className="w-full bg-white rounded-full px-5 py-3.5 text-[14px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm transition-all border border-zinc-200/50" 
            />
            
            <textarea 
              name="message"
              required
              placeholder="Treść" 
              rows={3} 
              onInput={(e) => {
                e.currentTarget.style.height = 'auto';
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              className="w-full bg-white rounded-[16px] px-5 py-3.5 text-[14px] text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm resize-none overflow-hidden transition-colors border border-zinc-200/50"
            ></textarea>
            
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="group w-full rounded-full bg-zinc-800 hover:bg-zinc-900 hover:scale-[1.02] text-white font-semibold py-4 mt-2 active:scale-95 transition-all duration-300 text-[15px] flex items-center justify-center shadow-md disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
            </button>

            {submitStatus === 'success' && (
              <p className="text-[13px] text-green-600 text-center font-medium mt-2">Wiadomość została wysłana pomyślnie! Otrzymasz potwierdzenie wysłania wiadomości na e-mail.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-[13px] text-red-500 text-center font-medium mt-2">{errorMessage}</p>
            )}
          </form>

          <div className="mt-8 flex flex-col gap-1 text-[13px] text-zinc-600 text-center">
            <span className="font-bold text-zinc-950 mb-2">Kontakt bezpośredni:</span>
            <a href="tel:+48662581368" className="hover:text-purple-500 transition-colors font-medium">
              +48 662 581 368 - Patryk Kulesza (AI&nbsp;Specialist)
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