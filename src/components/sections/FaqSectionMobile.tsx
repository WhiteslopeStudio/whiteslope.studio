'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { FAQ_DATA } from '@/lib/data';

export const FAQSectionMobile = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems(prevOpenItems => {
      const newOpenItems = new Set(prevOpenItems);
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        newOpenItems.add(id);
      }
      return newOpenItems;
    });
  };

  return (
    // Zmniejszone paddingi dla wersji mobilnej (py-12 zamiast py-[80px])
    <section id="faq" className="w-full bg-zinc-100 py-12 px-6 border-t border-zinc-200">
      <div className="w-full mx-auto flex flex-col">
        
        {/* Usunięty kafel z tłem, zostaje sama sekcja FAQ ułożona w 100% szerokości */}
        <div className="flex flex-col h-full">
          
          <div className="mb-8">
            {/* Ten sam styl nagłówka co pozostałe sekcje (klasa .hero-mobile-h1) */}
            <h2 className="hero-mobile-h1 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-zinc-950 tracking-tight max-w-[380px] text-balance">
              Najczęściej zadawane pytania
            </h2>
          </div>
          
          <div className="space-y-0">
            {FAQ_DATA.map((item) => {
              const isOpen = openItems.has(item.id);
              
              return (
                <div key={item.id} className="border-b border-zinc-200/80 last:border-b-0">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 flex items-center justify-between text-left cursor-pointer group transition-colors duration-300"
                  >
                    <h3 className="faq-question text-[15px] text-zinc-950 leading-[1.35] group-hover:text-blue-600 transition-colors pr-6">
                      {item.question}
                    </h3>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <Plus 
                        className={`w-[18px] h-[18px] text-zinc-400 group-hover:text-blue-600 transition-transform duration-500 ${isOpen ? 'rotate-45 text-blue-600' : ''}`} 
                        strokeWidth={2.5}
                      />
                    </div>
                  </button>

                  <AnimatePresence mode="wait">
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 pr-8">
                          <p className="text-[14px] text-zinc-600 leading-[1.6]">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Dolne CTA - Zmienione na mobilny układ w kolumnie i pełną szerokość przycisku */}
          <div className="mt-10 pt-8 border-t border-zinc-200/80 flex flex-col items-start w-full">
            <p className="text-[14px] text-zinc-600 mb-4 font-medium leading-[1.4]">
              Nie znalazłeś odpowiedzi na swoje pytanie?
            </p>
            <a
              href="#BriefHomePage"
              className="w-full inline-flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-8 py-[14px] text-[15px] font-semibold transition-all duration-300 active:scale-95 shadow-md group"
            >
              Porozmawiajmy <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

        </div>
          
      </div>
    </section>
  );
};