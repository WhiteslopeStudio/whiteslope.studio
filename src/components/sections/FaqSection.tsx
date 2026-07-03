'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';
import { FAQ_DATA } from '@/lib/data';

// ==========================================
// ❓ SEKCJA FAQ (Wersja Split 50/50 Premium)
// ==========================================
export const FAQSection = () => {
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
    <section id="faq" className="w-full bg-zinc-100 py-[80px] md:py-[120px] border-t border-zinc-100">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">
        
        {/* Grid 50/50 na desktopie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] lg:gap-[80px] items-start">
          
          

          {/* PRAWA STRONA: Lista FAQ */}
          <div className="flex flex-col h-full pt-[16px] lg:pt-[24px]">
            <div className="mb-[32px]">
              <h2 className="text-[32px] md:text-[40px] font-bold text-zinc-950 tracking-tight leading-[1.1] mb-[12px]">
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
                      className="w-full py-[24px] flex items-center justify-between text-left cursor-pointer group transition-colors duration-300"
                    >
                      <h3 className="text-[16px] md:text-[18px] font-bold text-zinc-950 leading-[1.3] group-hover:text-blue-600 transition-colors pr-[24px]">
                        {item.question}
                      </h3>
                      <div className="flex-shrink-0 w-[32px] h-[32px] rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
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
                          <div className="pb-[24px] pr-[40px]">
                            <p className="text-[14px] md:text-[15px] text-zinc-600 leading-[1.6]">
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

            {/* Dolne CTA */}
            <div className="mt-auto pt-[40px] flex flex-col items-start">
              <p className="text-[14px] md:text-[15px] text-zinc-500 mb-[16px] font-medium leading-[1.4]">
                Nie znalazłeś odpowiedzi na swoje pytanie?
              </p>
              <a
                href="#BriefHomePage"
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-[32px] py-[12px] text-[14px] font-semibold transition-all duration-300 active:scale-95 shadow-md group"
              >
                Porozmawiajmy <ArrowRight className="w-[16px] h-[16px] ml-[8px] transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </div>

          {/* LEWA STRONA: Brandowa karta z Twoją grafiką w tle */}
          <div 
            className="relative w-full aspect-square lg:aspect-[4/5] max-h-[700px] rounded-[24px] overflow-hidden flex flex-col justify-between p-[40px] md:p-[56px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
            style={{ 
              // POPRAWIONA ŚCIEŻKA: bez słowa "public"
              backgroundImage: "url('/_resources/faqBlock.webp')", 
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 1,
            }}
          >
            {/* Tekst nałożony na Twoją grafikę */}
            <div className="relative z-10">
    
              <p className="text-[18px] md:text-[24px] text-black/99 font-bold leading-relaxed max-w-[75%]">
                Sprawdź najczęstsze kwestie związane z procesem, współpracą i wdrożeniami.
              </p>
            </div>

            {/* Kontener dół pozostawiony pusty, bo sygnet masz już wgrany w pliku faqBlock.webp */}
            <div />
          </div>
          
        </div>
      </div>
    </section>
  );
};