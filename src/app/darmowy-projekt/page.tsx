'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import QuickLeadForm from '@/components/ui/QuickLeadForm';

// Realizacje pokazywane w rotacji - te same mockupy co w sekcji opinii na stronie głównej
const REALIZACJE = [
  { src: '/_resources/stronyInternetowe/WieslawskiStudio.webp', alt: 'Realizacja: Wiesławski Studio' },
  { src: '/_resources/stronyInternetowe/Easylesson.webp', alt: 'Realizacja: Easylesson.app' },
  { src: '/_resources/stronyInternetowe/DamianBogdanowicz.webp', alt: 'Realizacja: Damian Bogdanowicz' },
  { src: '/_resources/stronyInternetowe/PatrykKulesza.webp', alt: 'Realizacja: Patryk Kulesza' },
];

const CZAS_ZMIANY_MS = 2000;

export default function DarmowyProjektPage() {
  const [aktywne, setAktywne] = useState(0);

  // Rotacja zdjęć co 2 sekundy
  useEffect(() => {
    const licznik = setInterval(() => {
      setAktywne((poprzednie) => (poprzednie + 1) % REALIZACJE.length);
    }, CZAS_ZMIANY_MS);

    return () => clearInterval(licznik);
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-black flex flex-col md:justify-center">

      {/* GÓRA: karta z formularzem. pt-24: startuje pod fixed headerem */}
      <div className="relative z-10 w-full px-4 pt-24 pb-8 md:pt-28 md:pb-16">
        <QuickLeadForm />
      </div>

      {/* DÓŁ - tylko mobile: rotujące realizacje pod formularzem */}
      <div className="md:hidden relative w-full flex-1 min-h-[46vh] overflow-hidden bg-zinc-900">
        {REALIZACJE.map((realizacja, index) => (
          <Image
            key={realizacja.src}
            src={realizacja.src}
            alt={realizacja.alt}
            fill
            sizes="100vw"
            priority={index === 0}
            className={`object-cover object-top transition-opacity duration-700 ease-out ${
              index === aktywne ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
          {REALIZACJE.map((realizacja, index) => (
            <span
              key={realizacja.src}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === aktywne ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
