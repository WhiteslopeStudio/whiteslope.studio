'use client';

import { Download } from 'lucide-react';

export default function Process() {
  return (
    <section className="relative w-full bg-white py-[80px] lg:py-[120px] overflow-hidden flex flex-col">
      
      
      {/* --- KONTENER GŁÓWNY --- */}
      <div className="w-full max-w-[1640px] mx-auto px-5 md:px-[24px] relative z-10 flex flex-col">
        
        {/* NAGŁÓWEK */}
        <h2 className="text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-zinc-950 mb-12 lg:mb-16">
          <span className="font-[900] text-black">Proces wdrożenia:</span>
        </h2>

        {/* --- KARTY PROCESU (Poziomy Grid na Desktopie) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          
          {/* Subtelna pozioma linia łącząca kroki (w tle, widoczna tylko na desktopie) */}
          {/* top-[52px] idealnie trafia w środek kółka (padding 32px + połowa wysokości kółka 20px) */}
          <div className="hidden lg:block absolute top-[52px] left-[16%] right-[16%] h-[2px] bg-zinc-200 z-0" />

          {/* KROK 1 */}
          <div className="relative z-10 w-full bg-zinc-100 border border-zinc-200 rounded-[32px] p-8 flex flex-col items-start gap-6 shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-300 group">
            <div className="w-[40px] h-[40px] rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 shadow-sm relative z-10">
              <span className="font-[900] text-[16px] text-violet-600">1</span>
            </div>
            <div className="flex flex-col items-start w-full h-full">
              <p className="text-[18px] lg:text-[22px] font-medium text-zinc-700 leading-snug mb-8">
                Pobierasz i uzupełniasz nasz <span className="font-[900] text-zinc-950">krótki dokument tekstowy</span>.
              </p>
              
              {/* Oczojebny Limonkowy Przycisk CTA */}
              <button className="mt-auto group/btn inline-flex items-center justify-center gap-2 bg-[#D4FF00] rounded-full px-6 py-3 shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 w-full sm:w-auto border border-black/5 hover:cursor-pointer">
                <span className="font-[900] text-[14px] lg:text-[15px] text-zinc-950 tracking-wide">Pobierz szablon</span>
                <Download size={16} strokeWidth={3} className="text-zinc-950 group-hover/btn:translate-y-[2px] transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* KROK 2 */}
          <div className="relative z-10 w-full bg-zinc-100 border border-zinc-200 rounded-[32px] p-8 flex flex-col items-start gap-6 shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-300 group">
            <div className="w-[40px] h-[40px] rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 shadow-sm relative z-10">
              <span className="font-[900] text-[16px] text-violet-600">2</span>
            </div>
            <div className="flex flex-col items-start w-full h-full">
              <p className="text-[18px] lg:text-[22px] font-medium text-zinc-700 leading-snug">
                Na podstawie Twoich wytycznych i wypełnionego dokumentu <span className="font-[900] text-zinc-950">pokażemy Ci Twoje demo chatbota</span>.
              </p>
            </div>
          </div>

          {/* KROK 3 */}
          <div className="relative z-10 w-full bg-zinc-100 border border-zinc-200 rounded-[32px] p-8 flex flex-col items-start gap-6 shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-300 group">
            <div className="w-[40px] h-[40px] rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center shrink-0 shadow-sm relative z-10">
              <span className="font-[900] text-[16px] text-violet-600">3</span>
            </div>
            <div className="flex flex-col items-start w-full h-full">
              <p className="text-[18px] lg:text-[22px] font-medium text-zinc-700 leading-snug">
                <span className="font-[900] text-zinc-950">Uruchamiamy Agenta AI</span> na Twojej stronie.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}