'use client';

import { Sparkle } from 'lucide-react';

export default function SafeAi() {
  return (
    <section className="relative w-full bg-white py-[80px] lg:py-[120px] overflow-hidden flex flex-col">
      
      {/* --- CZYSTE TŁO (BEZ PASÓW) --- */}
      {/* Zgodnie z prośbą, brak monotonnych gradientów, zostawiamy czystą biel, dodając tylko subtelny glow */}
      
      {/* --- POŚWIATA (Lawendowy Glow) --- */}
      <div className="absolute top-[20%] right-[10%] w-[40%] h-[60%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* --- KONTENER GŁÓWNY (Desktop 2 kolumny) --- */}
      <div className="w-full max-w-[1640px] mx-auto px-5 md:px-[24px] relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* --- LEWA KOLUMNA: Nagłówek i Particles --- */}
        <div className="w-full lg:w-[45%] flex flex-col relative z-10">
          
          {/* DEKORACYJNE PARTICLES (Plusiki i Iskierki - Rozrzucone szerzej na desktopie) */}
          <div className="relative w-full h-[60px] mb-4">
            <Sparkle className="absolute left-0 top-2 text-[#D4FF00] w-8 h-8 fill-[#D4FF00]" />
            <Sparkle className="absolute left-20 top-10 text-violet-400 w-5 h-5 fill-violet-400 opacity-70" />
            
            {/* Custom SVG Plus */}
            <svg className="absolute right-12 lg:right-24 top-0 text-violet-500 opacity-80" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <svg className="absolute right-0 lg:right-10 top-12 text-[#D4FF00] opacity-90" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>

          {/* NAGŁÓWEK */}
          <h2 className="text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-zinc-950">
            Chatbot AI <span className="font-[900] text-violet-500">nie psuje</span> wizerunku marki,<br />
            pod warunkiem że jest <span className="font-[900]">dobrze wykonany</span>.
          </h2>

        </div>

        {/* --- PRAWA KOLUMNA: Karta z tekstem --- */}
        <div className="w-full lg:w-[55%] flex justify-end relative z-10">
          <div className="w-full max-w-[700px] bg-zinc-50 border border-zinc-200 rounded-[32px] lg:rounded-[40px] p-8 lg:p-12 flex flex-col relative shadow-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300">
            
            <p className="text-[16px] lg:text-[18px] font-medium text-zinc-700 leading-relaxed mb-8">
              <span className="font-[900] text-zinc-950">Nasz zespół czuwa</span> nad całym procesem. Konfigurujemy <span className="font-[900] text-zinc-950">ścisłe bariery</span> dla bota, aby nie było szans, że odpowie coś <u className="decoration-2 underline-offset-2 decoration-purple-400/60 font-[900] text-zinc-950">niezgodnego z prawdą</u> na temat Twojej firmy.
            </p>

            <div className="h-[1px] w-full bg-zinc-200 mb-8" />

            <p className="text-[16px] lg:text-[18px] font-medium text-zinc-700 leading-relaxed">
              W razie <span className="font-[900] text-zinc-950">skomplikowanych pytań</span> rozmowa przekierowywana jest do obsługi klienta, aby człowiek mógł zająć się tematem i natychmiast przychodzi <span className="font-[900] text-zinc-950">powiadomienie na e-mail</span>.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}