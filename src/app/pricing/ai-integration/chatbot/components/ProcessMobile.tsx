'use client';

import { Download } from 'lucide-react';

export default function ProcessMobile() {
  return (
    <section className="relative w-full bg-white py-[60px] overflow-hidden flex flex-col">
      
      {/* --- TŁO: Limonkowe Paski Gradientowe --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-[0.6]">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 80%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 60%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #dfffd0 0%, transparent 40%)' }} />
      </div>

      {/* --- POŚWIATA (Lawendowy Glow) --- */}
      <div className="absolute top-[20%] left-[-20%] w-[60%] h-[50%] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* --- KONTENER GŁÓWNY --- */}
      <div className="w-full max-w-[500px] mx-auto px-5 relative z-10 flex flex-col">
        
        {/* NAGŁÓWEK */}
        <h2 className="text-[32px] font-bold leading-[1.05] tracking-tight text-zinc-950 mb-8">
          Proces wdrożenia:
        </h2>

        {/* --- KARTY PROCESU (Pionowy Timeline) --- */}
        <div className="flex flex-col gap-4 relative">
          
          {/* Subtelna linia łącząca kroki (w tle) */}
          <div className="absolute left-[24px] top-[30px] bottom-[30px] w-[2px] bg-zinc-200 z-0" />

          {/* KROK 1 */}
          <div className="relative z-10 w-full bg-zinc-50 border border-zinc-200 rounded-[24px] p-5 flex items-start gap-4 shadow-sm">
            <div className="w-[32px] h-[32px] rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="font-[900] text-[14px] text-violet-600">1</span>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[14px] font-medium text-zinc-700 leading-snug mb-4">
                Pobierasz i uzupełniasz nasz <span className="font-[900] text-zinc-950">krótki dokument tekstowy</span>.
              </p>
              
              {/* Oczojebny Limonkowy Przycisk CTA */}
              <button className="group inline-flex items-center justify-center gap-2 bg-[#D4FF00] rounded-full px-5 py-2.5 shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 w-full sm:w-auto border border-black/5">
                <span className="font-[900] text-[13px] text-zinc-950 tracking-wide">Pobierz szablon</span>
                <Download size={14} strokeWidth={3} className="text-zinc-950 group-hover:translate-y-[2px] transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* KROK 2 */}
          <div className="relative z-10 w-full bg-zinc-50 border border-zinc-200 rounded-[24px] p-5 flex items-start gap-4 shadow-sm">
            <div className="w-[32px] h-[32px] rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="font-[900] text-[14px] text-violet-600">2</span>
            </div>
            <div className="flex flex-col items-start w-full pt-1">
              <p className="text-[14px] font-medium text-zinc-700 leading-snug">
                Na podstawie Twoich wytycznych i naszego dokumentu <span className="font-[900] text-zinc-950">pokażemy Ci Twoje demo chatbota</span>.
              </p>
            </div>
          </div>

          {/* KROK 3 */}
          <div className="relative z-10 w-full bg-zinc-50 border border-zinc-200 rounded-[24px] p-5 flex items-start gap-4 shadow-sm">
            <div className="w-[32px] h-[32px] rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <span className="font-[900] text-[14px] text-violet-600">3</span>
            </div>
            <div className="flex flex-col items-start w-full pt-1">
              <p className="text-[14px] font-medium text-zinc-700 leading-snug">
                <span className="font-[900] text-zinc-950">Uruchamiamy Agenta AI</span> na Twojej stronie.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}