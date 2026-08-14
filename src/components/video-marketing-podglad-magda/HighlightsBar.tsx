'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { colors } from './theme';

const highlights = [
  {
    id: '01',
    text: 'Filmy promocyjne na stronę internetową',
  },
  {
    id: '02',
    text: 'Content UGC Beauty itp.',
  },
  {
    id: '03',
    text: 'Montaż filmów i rolek w motion graphics',
  },
  {
    id: '04',
    text: 'Menadżer dedykowany do zarządzania twórcami',
  },
];

export default function HighlightsBar() {
  // Na mobile pokazuje się jeden punkt na raz i zmienia się co 1,5 sekundy w kółko.
  const [aktywnyIndeks, setAktywnyIndeks] = useState(0);

  useEffect(() => {
    const interwal = setInterval(() => {
      setAktywnyIndeks((poprzedni) => (poprzedni + 1) % highlights.length);
    }, 1500);
    return () => clearInterval(interwal);
  }, []);

  const aktywny = highlights[aktywnyIndeks];

  return (
    // Pełnej szerokości sekcja z WŁASNYM szarym tłem (a nie czarnym jak reszta strony), żeby nie zlewała
    // się wizualnie z sekcją pod spodem - bo tamta jest też czarna. Padding poziomy w środku, zamiast na
    // owijającym div w VideoMarketingServicePage, żeby tło mogło iść na pełną szerokość ekranu.
    <section className="relative w-full py-8 md:py-10 overflow-x-clip" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="relative px-8 md:px-12 lg:px-36">
        {/* Mobile - jeden punkt na raz, zmienia się automatycznie co 1,5s */}
        <div className="relative sm:hidden min-h-[56px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={aktywny.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm font-semibold tracking-[0.18em]">
                <span style={{ color: colors.neonPink }}>#</span>
                <span className="text-white">{aktywny.id}</span>
              </p>
              <p className="mt-2 text-sm text-white/90 leading-snug">{aktywny.text}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* sm i wyżej - wszystkie punkty naraz w siatce, bez zmian */}
        <div className="relative hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {highlights.map((item) => (
            <div key={item.id} className="min-h-[56px]">
              <p className="text-sm font-semibold tracking-[0.18em]">
                <span style={{ color: colors.neonPink }}>#</span>
                <span className="text-white">{item.id}</span>
              </p>
              <p className="mt-2 text-sm md:text-base text-white/90 leading-snug">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
