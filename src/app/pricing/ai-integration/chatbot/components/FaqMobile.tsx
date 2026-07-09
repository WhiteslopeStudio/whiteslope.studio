'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';

const FAQ_DATA = [
  {
    question: 'Ile trwa wdrożenie?',
    answer: 'Standardowego chatbota uruchamiamy zazwyczaj w około 7 dni roboczych – od momentu wypełnienia briefu i dostarczenia nam dokumentacji, aż po działające demo na Twojej stronie.'
  },
  {
    question: 'Skąd Chatbot ma wiedzę?',
    answer: 'Uczymy go wyłącznie na podstawie dokumentów, cenników, linków i materiałów, które nam dostarczysz. Konfigurujemy ścisłe bariery, dzięki czemu bot nie zgaduje i nie wymyśla własnych faktów.'
  },
  {
    question: 'Z czym mogę to zintegrować?',
    answer: 'Niemal ze wszystkim, co posiada API. Najczęściej spinamy Agenta AI z Twoim e-mailem.'
  }
];

export default function FaqMobile() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      <div className="absolute bottom-[10%] right-[-20%] w-[80%] h-[40%] bg-purple-500/15 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* --- KONTENER GŁÓWNY --- */}
      <div className="w-full max-w-[500px] mx-auto px-5 relative z-10 flex flex-col">
        
        {/* NAGŁÓWEK */}
        <h2 className="text-[32px] font-bold leading-[1.05] tracking-tight text-zinc-950 mb-8">
          Częste pytania
        </h2>

        {/* --- AKORDEON FAQ --- */}
        <div className="flex flex-col gap-3 w-full mb-10">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={index}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-[24px] overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left active:bg-zinc-100 transition-colors"
                >
                  <span className={`text-[15px] font-bold pr-4 ${isOpen ? 'text-violet-600' : 'text-zinc-950'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-violet-100 text-violet-600' : 'bg-zinc-200 text-zinc-600'}`}>
                    <ChevronDown size={16} strokeWidth={2.5} />
                  </div>
                </button>
                
                {/* Odpowiedź z płynnym otwieraniem */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 px-5' : 'grid-rows-[0fr] opacity-0 px-5'}`}
                >
                  <div className="overflow-hidden">
                    <p className="text-[14px] font-medium text-zinc-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* --- SEKCJA CTA NA DOLE --- */}
        <div className="w-full bg-zinc-100 border border-zinc-200 rounded-[32px] p-6 flex flex-col relative shadow-md">
          
          <h3 className="text-[20px] font-bold text-center text-zinc-950 mb-6 leading-[1.15]">
            Gotowy na <span className="font-[900] text-violet-500">cyfryzację</span>?
          </h3>
          
          {/* Główny przycisk CTA z lawendową obwódką (używamy komponentu Link) */}
          <div className="group relative inline-flex overflow-hidden rounded-full p-[3px] w-full hover:scale-[1.02] active:scale-95 transition-transform duration-300 shadow-md">
            
            <style>{`
              @keyframes rotateLavenderButton {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
              }
              .spinner-element-lavender {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 250%;
                aspect-ratio: 1;
                background: conic-gradient(from 0deg, rgba(183, 148, 244, 0) 30%, #a947ff 100%);
                transform: translate(-50%, -50%);
              }
              .group:hover .spinner-element-lavender {
                animation: rotateLavenderButton 1.2s linear infinite;
              }
            `}</style>

            <span className="absolute spinner-element-lavender opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <Link href="/contact" className="relative z-10 w-full h-[48px] rounded-full bg-black text-white font-semibold text-[14px] flex items-center justify-center">
              Zarezerwuj wstępną integrację
              <ArrowRight className="w-[18px] h-[18px] ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Opcjonalny kontakt (Fallback) - Dodana twarda spacja &nbsp; */}
          <div className="mt-8 flex flex-col gap-1 text-[13px] text-zinc-600 text-center">
            <span className="font-bold text-zinc-950 mb-1">Potrzebujesz tradycyjnego kontaktu?</span>
            <a href="tel:+48662581368" className="hover:text-violet-500 transition-colors font-medium">
              +48 662 581 368 - Patryk Kulesza (AI&nbsp;Specialist)
            </a>
            <a href="mailto:kontakt@whiteslope.studio" className="hover:text-violet-500 transition-colors font-medium">
              kontakt@whiteslope.studio
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}