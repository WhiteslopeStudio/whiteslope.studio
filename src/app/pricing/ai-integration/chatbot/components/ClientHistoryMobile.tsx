'use client';

import { Check } from 'lucide-react';

export default function ClientHistoryMobile() {
  return (
    <section className="relative w-full bg-white py-[60px] overflow-hidden flex flex-col">
      
      {/* --- KONTENER NAGŁÓWKA --- */}
      <div className="w-full max-w-[500px] mx-auto px-5 relative z-10 flex flex-col mb-8">
        <h2 className="text-[32px] font-bold leading-[1.05] tracking-tight text-zinc-950">
          Historie wdrożeń<br />u naszych klientów
        </h2>
      </div>

      {/* --- KARTA ZDJĘCIE (LEWO) + TEKST (PRAWO) --- */}
      <div className="relative w-full max-w-[500px] mx-auto flex flex-row items-stretch">
        
        {/* LEWA STRONA - Zdjęcie przylepione do krawędzi */}
        <div className="relative w-[45%] shrink-0 flex flex-col">
          <div className="w-full h-full min-h-[300px] bg-zinc-100 rounded-r-[24px] shadow-lg overflow-hidden border-t border-b border-r border-zinc-200 relative">
            <img 
              src="/_resources/Automations/Chatbot/ChatbotEasylesson.webp" 
              alt="Easylesson Chatbot Wdrożenie"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            
            {/* Półkole UI "wychodzące" z aplikacji na prawej krawędzi */}
            <div className="absolute top-1/11 -right-3  w-[14px] h-[28px] bg-zinc-900 rounded-l-none rounded-r-full z-20 shadow-[-2px_0_10px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        {/* PRAWA STRONA - Opis, Logo i Checkmarki */}
        <div className="w-[55%] pl-4 pr-5 py-2 flex flex-col justify-center relative">
          
          {/* Logo Easylesson z przesunieciem w prawo i grubsza linia */}
            <div className="relative flex items-center w-full mb-4 mt-[-12px] ml-3">
            {/* Ozdobna linia laczaca (grubsza i czarna, zeby pasowala do polkola) */}
            <div className="absolute left-[-28px] top-1/2 -translate-y-1/2 h-[4px] w-[28px] bg-zinc-900 z-0" />

            {/* Ciemny kontener na jasne logo - teraz naprawde siega do prawej krawedzi */}
            <div className="bg-zinc-900 rounded-[16px] max-h-[60px] px-4 py-3 shadow-md relative z-10 w-full flex justify-center items-center">
                <img
                src="/_resources/grafika/LogoEasyLessonWhite.webp"
                alt="Logo Easylesson"
                className="h-[100px] w-auto object-contain"
                />
            </div>
            </div>

          {/* Limonkowe Checkmarki ("Oczojebny Energetyk") */}
          <ul className="flex flex-col gap-4 w-full">
            <li className="flex items-start gap-3">
              <div className="w-[22px] h-[22px] rounded-full bg-[#D4FF00] flex items-center justify-center text-zinc-950 shadow-sm shrink-0 mt-0.5">
                <Check size={14} strokeWidth={4} />
              </div>
              <span className="text-[14px] font-semibold text-zinc-900 leading-snug">
                Chat zintegrowany z aplikacją do nauczania.
              </span>
            </li>
            
            <li className="flex items-start gap-3">
              <div className="w-[22px] h-[22px] rounded-full bg-[#D4FF00] flex items-center justify-center text-zinc-950 shadow-sm shrink-0 mt-0.5">
                <Check size={14} strokeWidth={4} />
              </div>
              <span className="text-[14px] font-semibold text-zinc-900 leading-snug">
                Pełnoprawny korepetytor AI, ingerujący w obszar tablicy podczas nauki.
              </span>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
}