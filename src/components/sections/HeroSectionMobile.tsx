'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, Play, X } from 'lucide-react';
import { useState } from 'react';
import { HeroServiceWidget } from './HeroServiceWidget';

export default function HeroSectionMobile() {
  // Modal z filmikiem YT, otwierany przyciskiem "Zobacz film" w hero
  const [czyFilmOtwarty, setCzyFilmOtwarty] = useState(false);

  return (
    <section className="relative w-full bg-white overflow-hidden flex flex-col items-center">

      {/* ========================================================= */}
      {/* EKRAN POWITALNY - styl Apple, sztywne 667px.                */}
      {/* Grafika tła (z sygnetem W) widoczna bez przyciemnienia      */}
      {/* u góry, blok tekstowy zepchnięty na dół, kicker nad H1.     */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full h-[667px] overflow-hidden bg-black">

        {/* --- GRAFIKA TŁA (zawiera już sygnet W) - przycięta od góry, żeby było widać
             sam sygnet, a nie środek/dół zdjęcia --- */}
        <img
          src="/_resources/hero/tlo2.jfif"
          alt="Whiteslope Studio"
          className="absolute inset-0 w-full h-full object-cover object-top z-0"
        />

        {/* --- PRZYCIEMNIENIE: przezroczyste u góry (żeby sygnet W świecił bez przyciemnienia),
             ciemnieje dopiero w dolnej części, gdzie leży tekst --- */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 42%, rgba(0,0,0,0.6) 68%, rgba(0,0,0,0.95) 100%)',
          }}
        />

        {/* --- TREŚĆ: sygnet W ma czystą przestrzeń u góry, blok tekstowy zepchnięty na dół (mt-auto) --- */}
        <div className="absolute inset-0 z-10 w-full max-w-[500px] mx-auto px-4 pt-[90px] pb-8 flex flex-col h-full">

          <div className="mt-auto flex flex-col items-start text-left max-w-[420px]">

            {/* --- KICKER: "Błyskawiczna wycena" przeniesiona nad H1 jako mała plakietka --- */}
            <div className="mb-4 inline-flex items-center gap-[6px] px-3 py-1 rounded-full border border-white/25 text-[12px] text-white/80 font-medium">
              <CheckCircle2 className="w-[13px] h-[13px] shrink-0 text-green-400" />
              Błyskawiczna wycena
            </div>

            <h1 className="hero-mobile-h1 mb-4 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight">
              Strony, produkty, marketing,<br />
              które dowożą.
            </h1>

            <p className="mb-7 text-[14px] leading-relaxed text-gray-300 font-semibold text-balance">
              Łączymy web development, marketing i automatyzację, by realnie przynosić zapytania.
            </p>

            <div className="w-full flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                prefetch={false}
                className="px-5 py-2 bg-white text-black font-normal rounded-full flex items-center justify-center gap-2 transition-transform text-sm active:scale-95 group whitespace-nowrap"
              >
                Wyceń projekt
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setCzyFilmOtwarty(true)}
                className="px-5 py-2 border border-white/50 text-white font-normal rounded-full flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform whitespace-nowrap"
              >
                <Play className="w-4 h-4" />
                Zobacz film
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- WIDGET WYBORU USŁUG + PASEK LOGOTYPÓW - wciąż w Hero, ale jako osobny
           blok POD sztywnymi 667px, żeby nie ściskać go w wąską, ustaloną wysokość --- */}
      <HeroServiceWidget />

      {/* --- MODAL Z FILMIKIEM YT --- */}
      {czyFilmOtwarty && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
          onClick={() => setCzyFilmOtwarty(false)}
        >
          <button
            type="button"
            onClick={() => setCzyFilmOtwarty(false)}
            aria-label="Zamknij film"
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
          <div
            className="w-full max-w-[500px] aspect-video rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_4TJyWuqkUk?autoplay=1"
              title="Whiteslope Studio - film"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}
