'use client';

import { Check } from 'lucide-react';

export default function ClientHistory() {
  return (
    <section className="relative w-full bg-white overflow-hidden flex flex-col pb-20">

        {/* --- TŁO: Paski Gradientowe wychodzące z dołu (łączące się z sekcją poniżej) --- */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] z-0 flex pointer-events-none opacity-[0.4] -bottom-20">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 80%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 60%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 40%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #dfffd0 0%, transparent 20%)' }} />
      </div>

      <div className="w-full max-w-[1640px] mx-auto px-5 md:px-[24px] relative z-10 flex flex-col">

        <h2 className="text-[36px] lg:text-[48px] font-bold leading-[1.05] tracking-tight text-zinc-950 mb-12 lg:mb-16">
         <span className="font-[900] text-black">Historie wdrożeń</span> <br />naszych klientów
        </h2>

        <div className="w-full flex flex-row items-center">

          {/* LEWA STRONA - responsywne aspect ratio dopasowujące się do szerokości okna */}
          <div className="w-[40%] flex flex-col relative shrink-0">
            {/* 
              Domyślnie (mniejsze ekrany): wysokie zdjęcie (738/1200)
              Od breakpointu lg (1024px): średnie zdjęcie (738/1000)
              Od breakpointu xl (1280px): najkrótsze zdjęcie (738/800)
            */}
            <div className="w-full aspect-[738/1400] lg:aspect-[738/1200] xl:aspect-[738/800] bg-zinc-100 rounded-[32px] lg:rounded-[40px] shadow-xl overflow-hidden border border-zinc-200 relative z-10 transition-all duration-300">
                <img
                    src="/_resources/Automations/Chatbot/ChatbotEasylesson.webp"
                    alt="Easylesson Chatbot Wdrożenie"
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
            </div>
          </div>

          {/* PRAWA STRONA - bez zmian */}
          <div className="w-[55%] pl-4 pr-5 pt-8 pb-2 flex flex-col justify-start relative">


            <div className="w-full flex items-center mb-10 lg:mb-12">
              <div className="h-[4px] w-[60px] lg:w-[100px] bg-zinc-900 z-10 shrink-0  -mt-[0vh] lg:-mt-[0vh] -ml-4 z-1" />
              <div className="bg-zinc-900 rounded-full  py-4 shadow-md relative z-10 w-[calc(100%-400px)] flex justify-center lg:-mt-[0vh]">
                <img
                    src="/_resources/grafika/LogoEasyLessonWhite.webp"
                    alt="Logo Easylesson"
                    className="h-[60px] w-auto object-contain"
                />
                </div>
            </div>

            <div className="pl-[60px] lg:pl-[100px] ">
              <ul className="flex flex-col gap-6 w-full">
                <li className="flex items-start gap-4">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#D4FF00] flex items-center justify-center text-zinc-950 shadow-sm shrink-0 mt-0.5">
                    <Check size={16} strokeWidth={4} />
                  </div>
                  <span className="text-[16px] lg:text-[18px] font-semibold text-zinc-900 leading-snug">
                    Chat zintegrowany z aplikacja do nauczania.
                  </span>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-[28px] h-[28px] rounded-full bg-[#D4FF00] flex items-center justify-center text-zinc-950 shadow-sm shrink-0 mt-0.5">
                    <Check size={16} strokeWidth={4} />
                  </div>
                  <span className="text-[14px] md:text-[17px] lg:text-[18px] font-semibold text-zinc-900 leading-snug">
                    Pelnoprawny korepetytor AI, ingerujacy w obszar tablicy podczas nauki.
                  </span>
                </li>
              </ul>

                <div className="w-full flex flex-col gap-2 mt-8 lg:mt-10">
                <span className="text-[15px] md:text-[16px] lg:text-[18px] font-medium text-zinc-700 leading-relaxed mb-10">
                    Wspólnie z zespołem EasyLesson wprowadziliśmy do platformy chatbota AI pełniącego rolę osobistego korepetytora, dostępnego dla ucznia o każdej porze, kiedy utknie na zadaniu domowym.
                </span>

                <span className="text-[15px] md:text-[16px] lg:text-[18px] font-medium text-zinc-700 leading-relaxed mb-10">
                    Największa siła rozwiązania to bezpośrednia integracja z interaktywną tablicą: AI nie tylko tłumaczy krok po kroku, ale samodzielnie dodaje elementy na tablicy, rysując wykresy i równania przy przedmiotach ścisłych, takich jak matematyka.
                </span>
                
                <span className="text-[15px] md:text-[16px] lg:text-[18px] font-medium text-zinc-700 leading-relaxed">
                    Limity na planie Free działają jako naturalny magnes sprzedażowy: uczniowie, którzy raz przekonają się do pomocy AI Tutora, wracają po więcej i decydują się na wykupienie planu Premium bez ograniczeń.
                </span>
                </div>
                                
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}