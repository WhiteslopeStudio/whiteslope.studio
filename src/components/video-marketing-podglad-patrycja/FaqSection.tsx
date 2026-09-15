'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { fonts } from './theme';
import { VIDEO_MARKETING_FAQ } from '@/lib/seo/videoMarketingFaq';

export default function FaqSection() {
  const [otwartyIndeks, setOtwartyIndeks] = useState<number | null>(null);

  return (
    <section className="container mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <p
          className="text-xs uppercase tracking-[0.3em] mb-3"
          style={{ fontFamily: fonts.cta, color: 'rgba(255,255,255,0.4)' }}
        >
          FAQ
        </p>
        <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4">
          UGC i Video Marketing
        </h2>
        <p className="text-zinc-400 mb-12 max-w-2xl">
          Odpowiedzi na najczęstsze pytania twórców i firm o agencje UGC, zarobki, cennik, współpracę i skalowanie
          contentu.
        </p>

        <div className="flex flex-col">
          {VIDEO_MARKETING_FAQ.map((item, indeks) => {
            const czyOtwarty = otwartyIndeks === indeks;

            return (
              <div key={item.question} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOtwartyIndeks(czyOtwarty ? null : indeks)}
                  className="w-full flex items-center gap-5 py-6 text-left cursor-pointer group"
                >
                  <span
                    className="text-sm shrink-0 tabular-nums"
                    style={{ fontFamily: fonts.cta, color: czyOtwarty ? '#ffffff' : 'rgba(255,255,255,0.3)' }}
                  >
                    {String(indeks + 1).padStart(2, '0')}
                  </span>

                  <span
                    className="flex-1 text-base md:text-lg font-medium transition-colors duration-300"
                    style={{ color: czyOtwarty ? '#ffffff' : 'rgba(255,255,255,0.85)' }}
                  >
                    {item.question}
                  </span>

                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300"
                    style={{
                      borderColor: czyOtwarty ? '#ffffff' : 'rgba(255,255,255,0.15)',
                      backgroundColor: czyOtwarty ? '#ffffff' : 'transparent',
                      transform: czyOtwarty ? 'rotate(135deg)' : 'rotate(0deg)',
                    }}
                  >
                    <Plus className="w-4 h-4" style={{ color: czyOtwarty ? '#000000' : '#ffffff' }} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {czyOtwarty && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-[52px] pr-10 text-zinc-400 leading-relaxed max-w-2xl">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
