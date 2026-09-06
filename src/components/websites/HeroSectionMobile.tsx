'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

// Zrzuty realizacji rotujące w tle Hero
const REALIZACJE = [
  { src: '/_resources/stronyInternetowe/WieslawskiStudio.webp', alt: 'Realizacja: Wiesławski Studio' },
  { src: '/_resources/stronyInternetowe/Easylesson.webp', alt: 'Realizacja: Easylesson.app' },
  { src: '/_resources/stronyInternetowe/DamianBogdanowicz.webp', alt: 'Realizacja: Damian Bogdanowicz' },
];

const CZAS_ZMIANY_MS = 3000;

export default function HeroSectionMobile() {
  const [aktywne, setAktywne] = useState(0);

  useEffect(() => {
    const licznik = setInterval(() => {
      setAktywne((poprzednie) => (poprzednie + 1) % REALIZACJE.length);
    }, CZAS_ZMIANY_MS);

    return () => clearInterval(licznik);
  }, []);

  return (
    // Ten sam schemat co Hero na stronie głównej: sztywna wysokość, grafika w tle
    // przycięta od góry, gradient ciemniejący ku dołowi i blok tekstowy na dole.
    <section className="relative w-full h-[667px] overflow-hidden bg-black">
      {REALIZACJE.map((realizacja, index) => (
        <Image
          key={realizacja.src}
          src={realizacja.src}
          alt={realizacja.alt}
          fill
          sizes="100vw"
          priority={index === 0}
          // object-cover object-top: zrzut wypełnia całą wysokość sekcji od góry do dołu
          className={`object-cover object-top z-0 transition-opacity duration-700 ease-out ${
            index === aktywne ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.75) 66%, rgba(0,0,0,0.96) 100%)',
        }}
      />

      <div className="absolute inset-0 z-10 w-full max-w-[500px] mx-auto px-6 pt-[110px] pb-10 flex flex-col h-full">
        <div className="mt-auto flex flex-col items-start text-left max-w-[420px]">
          <div className="mb-4 inline-flex items-center gap-[6px] px-3 py-1 rounded-full border border-white/25 text-[12px] text-white/80 font-medium">
            <CheckCircle2 className="w-[13px] h-[13px] shrink-0 text-green-400" />
            Wycena w 24 h
          </div>

          <h1 className="hero-mobile-h1 mb-4 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight">
            Strony internetowe,<br />
            systemy B2B i SaaS.
          </h1>

          <p className="mb-7 text-[14px] leading-relaxed text-gray-300 font-semibold text-balance">
            Od wizytówek, które dowożą zapytania, po platformy i narzędzia do zarządzania firmą.
          </p>

          <div className="w-full flex flex-wrap items-center justify-start gap-3">
            <Link
              href="#brief"
              prefetch={false}
              className="px-5 py-2 bg-[#3561ff] text-white font-medium rounded-full flex items-center justify-center text-sm active:scale-95 whitespace-nowrap"
            >
              Wyceń projekt
            </Link>

            <Link
              href="/projects"
              prefetch={false}
              className="px-5 py-2 border border-white/50 text-white font-medium rounded-full flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform whitespace-nowrap"
            >
              Zobacz realizacje
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Kropki pokazujące, która realizacja jest w tle */}
          <div className="mt-6 flex items-center gap-2">
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
      </div>
    </section>
  );
}
