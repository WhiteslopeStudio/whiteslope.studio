'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQ_DATA = [
  {
    question: 'Jak długo trwa realizacja strony internetowej lub aplikacji SaaS?',
    answer: 'Czas realizacji zależy od skomplikowania projektu. Standardowa strona typu landing page lub prosta wizytówka to zazwyczaj 2-4 tygodnie. Bardziej rozbudowane systemy B2B, aplikacje SaaS czy sklepy e-commerce mogą zająć od 1 do nawet 3 miesięcy. Zawsze ustalamy dokładny harmonogram przed podpisaniem umowy.',
  },
  {
    question: 'Jak wygląda proces wyceny projektu?',
    answer: 'Wycena jest całkowicie darmowa. Zaczynamy od krótkiej rozmowy (lub wymiany maili), aby zrozumieć Twoje cele biznesowe i wymagania techniczne. Na tej podstawie przygotowujemy szczegółową ofertę, w której rozbijamy projekt na etapy, pokazując transparentnie, za co dokładnie płacisz.',
  },
  {
    question: 'Czy po wdrożeniu projektu mogę liczyć na Wasze wsparcie techniczne?',
    answer: 'Oczywiście! Nie zostawiamy klientów samych po wdrożeniu. Oferujemy pakiety opieki technicznej, w ramach których dbamy o aktualizacje, bezpieczeństwo (np. certyfikaty SSL, kopie zapasowe) oraz wprowadzamy ewentualne poprawki, gdy Twój biznes rośnie i potrzebuje nowych funkcji.',
  },
  {
    question: 'W jakich technologiach tworzycie swoje projekty?',
    answer: 'Dobieramy technologię do potrzeb projektu, aby zapewnić najwyższą wydajność i elastyczność. Najczęściej wykorzystujemy nowoczesne stacki technologiczne takie jak Next.js, React, Tailwind CSS oraz systemy Headless CMS. W przypadku automatyzacji opieramy się na sprawdzonych rozwiązaniach AI i dedykowanych integracjach API.',
  },
  {
    question: 'Jak bardzo muszę być zaangażowany w proces tworzenia?',
    answer: 'Szanujemy Twój czas. Twoje zaangażowanie jest kluczowe głównie na początku (briefing, przekazanie materiałów bazowych i akceptacja makiety). Potem my przejmujemy stery. Otrzymujesz od nas regularne raporty z postępów i dostęp do środowiska testowego, gdzie możesz podejrzeć, jak rośnie Twój projekt.',
  },
];

export default function ProjectsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-[900px] mx-auto px-6">
      
      {/* Nagłówek FAQ */}
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight mb-4">
          Często zadawane pytania
        </h2>
        <p className="text-[16px] md:text-[18px] text-zinc-400">
          Masz wątpliwości? Przygotowaliśmy odpowiedzi na pytania, które najczęściej słyszymy od naszych klientów przed startem projektu.
        </p>
      </div>

      {/* Lista pytań */}
      <div className="flex flex-col gap-4">
        {FAQ_DATA.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div 
              key={index} 
              className="border border-zinc-800/60 bg-zinc-900/20 rounded-[16px] overflow-hidden transition-colors hover:border-zinc-700/80"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-[16px] md:text-[18px] font-semibold text-zinc-100 pr-8">
                  {item.question}
                </span>
                <div 
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen 
                      ? 'border-blue-500/30 bg-blue-500/10 text-blue-400 rotate-180' 
                      : 'border-zinc-700 bg-zinc-800/50 text-zinc-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 pt-2 text-[15px] md:text-[16px] leading-relaxed text-zinc-400 border-t border-zinc-800/50 mt-2">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

    </section>
  );
}