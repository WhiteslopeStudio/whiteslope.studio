'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { FAQ_DATA } from '@/lib/data';

// ==========================================
// ❓ SEKCJA FAQ
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
    <section id="faq" className="py-20 bg-black"
    style={{
        background: `
          radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
          linear-gradient(
            to bottom,
            black 0px,
            black 10px,
            #3b3b3bff 10px,
            #3b3b3bff 11px,
            #0b0b0bff 11px,
            #0b0b0bff calc(100% - 11px),
            #3b3b3bff calc(100% - 11px),
            #3b3b3bff calc(100% - 10px),
            black calc(100% - 10px),
            black 100%
          )
        `
      }}    
    >
      <div className="container mx-auto px-6">
        {/* Nagłówek */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            FAQ
          </h2>
        </div>

        {/* Lista FAQ */}
        <div className="max-w-4xl mx-auto space-y-0">
          {FAQ_DATA.map((item) => {
            const isOpen = openItems.has(item.id);
            
            return (
              <div key={item.id} className="border-b border-gray-600">
                {/* Przycisk pytania */}
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-6 flex items-center justify-between text-left cursor-pointer transition-colors duration-200"
                >
                  <h3 className="text-lg font-medium text-white pr-8">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <Plus className={`w-6 h-6 text-white transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </div>
                </button>

                {/* Odpowiedź */}
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 pr-14">
                        <p className="text-gray-300 leading-relaxed">
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

        {/* Dolne CTA z modalem */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6 text-lg">
            Nie znalazłeś odpowiedzi na swoje pytanie?
          </p>
          <a
            className="bg-white text-black px-8 py-3 rounded-full font-medium cursor-pointer transition-colors duration-300"
            href="/contact"
          >
            Zadaj pytanie
          </a>
        </div>
      </div>
    </section>
  );
};