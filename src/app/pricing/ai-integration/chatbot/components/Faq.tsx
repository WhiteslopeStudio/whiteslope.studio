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
    answer: 'Niemal ze wszystkim, co posiada API. Najczęściej spinamy Agenta AI z Twoim e-mailem, kalendarzem do rezerwacji spotkań oraz systemem CRM.'
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-white py-[80px] lg:py-[120px] overflow-hidden flex flex-col">
      
      {/* --- TŁO: Limonkowe Paski Gradientowe (Od dołu do góry) --- */}
      <div className="absolute bottom-0 left-0 right-0 h-[70%] z-0 flex pointer-events-none opacity-[0.6]">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 85%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 70%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 55%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 40%)' }} />
      </div>

      {/* --- POŚWIATA (Lawendowy Glow) - Przeniesiona na prawo pod kartę CTA --- */}
      <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[50%] bg-purple-500/15 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* --- KONTENER GŁÓWNY --- */}
      <div className="w-full max-w-[1640px] mx-auto px-5 md:px-[24px] relative z-10 flex flex-col">
        
        {/* NAGŁÓWEK NA PEŁNĄ SZEROKOŚĆ */}
        <h2 className="text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-zinc-950 mb-10 lg:mb-12 w-full text-left">
          Częste pytania
        </h2>

        {/* --- PODZIAŁ NA 2 KOLUMNY --- */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          
          {/* --- LEWA KOLUMNA: AKORDEON FAQ --- */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4 relative z-10">
            {FAQ_DATA.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div 
                  key={index}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-[24px] lg:rounded-[32px] overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-center justify-between p-6 lg:p-8 text-left group"
                  >
                    <span className={`text-[16px] lg:text-[18px] font-bold pr-4 transition-colors ${isOpen ? 'text-violet-600' : 'text-zinc-950 group-hover:text-violet-500'}`}>
                      {faq.question}
                    </span>
                    <div className={`w-[32px] h-[32px] rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 bg-violet-100 text-violet-600' : 'bg-zinc-200 text-zinc-600 group-hover:bg-zinc-300'}`}>
                      <ChevronDown size={18} strokeWidth={2.5} />
                    </div>
                  </button>
                  
                  {/* Odpowiedź z płynnym otwieraniem */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6 lg:pb-8 px-6 lg:px-8' : 'grid-rows-[0fr] opacity-0 px-6 lg:px-8'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[15px] lg:text-[16px] font-medium text-zinc-600 leading-relaxed max-w-[800px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- PRAWA KOLUMNA: CTA (Gotowy na cyfryzację) --- */}
          <div className="w-full lg:w-[40%] flex flex-col relative z-10">
            <div className="w-full bg-zinc-100 border border-zinc-200 rounded-[32px] p-8 lg:p-10 flex flex-col relative shadow-xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300">
              
              <h3 className="text-[22px] lg:text-[28px] font-bold text-center text-zinc-950 mb-8 leading-[1.15]">
                Gotowy na <span className="font-[900] text-violet-500">cyfryzację</span>?
              </h3>
              
              {/* Główny przycisk CTA z lawendową obwódką */}
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
                
                <Link href="/contact" className="relative z-10 w-full h-[52px] rounded-full bg-black text-white font-semibold text-[15px] flex items-center justify-center">
                  Zarezerwuj wstępną integrację
                  <ArrowRight className="w-[18px] h-[18px] ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* Kontakt bezpośredni */}
              <div className="mt-8 flex flex-col gap-1.5 text-[14px] text-zinc-600 text-center">
                <span className="font-bold text-zinc-950 mb-2">Tradycyjny kontakt:</span>
                <a href="tel:+48662581368" className="hover:text-violet-500 transition-colors font-medium">
                  +48 662 581 368 - Patryk Kulesza (AI&nbsp;Specialist)
                </a>
                <a href="mailto:kontakt@whiteslope.studio" className="hover:text-violet-500 transition-colors font-medium">
                  kontakt@whiteslope.studio
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}