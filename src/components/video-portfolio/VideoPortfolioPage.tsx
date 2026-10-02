'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, X, Info } from 'lucide-react';

type Film = { src: string; marka: string };

// Dosłownie wszystkie filmiki, jakie są w folderze danego twórcy w public/_resources/videoMarketing.
const FILMY_MAGDY: Film[] = [
  { src: '/_resources/videoMarketing/magda/NEW_Magda_Wideo_wizytowka.mp4', marka: 'Portfolio' },
  { src: '/_resources/videoMarketing/magda/NEW_Magda_MobilFox.mp4', marka: 'Akcesoria' },
  { src: '/_resources/videoMarketing/magda/MAGDA_hoppa.mp4', marka: 'Beauty' },
  { src: '/_resources/videoMarketing/magda/MAGDA_Chillberry1.mp4', marka: 'Jedzenie' },
  { src: '/_resources/videoMarketing/magda/MAGDA_Chillberry2.mp4', marka: 'Jedzenie' },
];

const FILMY_PATRYCJI: Film[] = [
  { src: '/_resources/videoMarketing/patrycja/PORTFOLIO_Patrycja_1.mp4', marka: 'Travel Content' },
  { src: '/_resources/videoMarketing/patrycja/PORTFOLIO_Patrycja_2.mp4', marka: 'Travel Content' },
  { src: '/_resources/videoMarketing/patrycja/PORTFOLIO_Patrycja_3.mp4', marka: 'Travel Content' },
];

const FILMY_MATIEGO: Film[] = [
  { src: '/_resources/videoMarketing/mati/Whiteslope_MarekSuslik.mp4', marka: 'Marek Suslik' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_Pokazanie_Jawa_350CL.mp4', marka: 'Jawa 350' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_skladanie_jawy8_poprawka.mp4', marka: 'Montaż Jawy' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_XzoneRide.mp4', marka: 'X-Zone Ride' },
  { src: '/_resources/videoMarketing/mati/Whiteslope_2Jawa_reklama_czesci_4.mp4', marka: 'Jawa - Części' },
  { src: '/_resources/videoMarketing/mati/Whiteslope_Jawa_ubrania_5.mp4', marka: 'Jawa - Ubrania' },
];

// Pojedyncza karta wideo - odtwarza się automatycznie tylko gdy jest widoczna na ekranie
// (IntersectionObserver), kliknięcie otwiera pełny ekran z dźwiękiem i kontrolkami.
function KartaWideo({ film }: { film: Film }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [pelnyEkran, setPelnyEkran] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    const videoEl = videoRef.current;
    if (!el || !videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {
            // Autoplay bywa blokowane przez przeglądarkę - nie jest to błąd krytyczny.
          });
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        onClick={() => setPelnyEkran(true)}
        className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-zinc-100 cursor-pointer group"
      >
        <video
          ref={videoRef}
          src={film.src}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wide truncate">
            {film.marka}
          </span>
          <span className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/90 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
            <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-black fill-black" />
          </span>
        </div>
      </div>

      {pelnyEkran && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setPelnyEkran(false)}
        >
          <button
            type="button"
            onClick={() => setPelnyEkran(false)}
            aria-label="Zamknij"
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <video
            src={film.src}
            autoPlay
            loop
            controls
            playsInline
            className="max-h-[90vh] max-w-full aspect-[9/16] rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

function SekcjaTworcy({
  imie,
  rola,
  opis,
  zdjecie,
  filmy,
  uwaga,
}: {
  imie: string;
  rola: string;
  opis: string;
  zdjecie: string;
  filmy: Film[];
  uwaga?: string;
}) {
  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 md:px-10 py-14 md:py-20 border-b border-zinc-100 last:border-none">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
        <div className="flex items-center gap-5">
          <img
            src={zdjecie}
            alt={imie}
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-black/10 shrink-0"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-black leading-none">
              {imie}
            </h2>
            <p className="text-sm md:text-base font-semibold text-black/60 mt-1">{rola}</p>
          </div>
        </div>
        <p className="text-base md:text-lg text-black/70 max-w-md leading-relaxed">{opis}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
        {filmy.map((film) => (
          <KartaWideo key={film.src} film={film} />
        ))}
      </div>

      {uwaga && (
        <div className="flex items-start gap-1.5 mt-5 max-w-[500px]">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-black/50" />
          <span className="text-xs leading-snug text-black/50">{uwaga}</span>
        </div>
      )}
    </section>
  );
}

export default function VideoPortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-6 md:px-10 pt-20 md:pt-28 pb-10 md:pb-14 text-center">
        <img
          src="/_resources/logos/sygnetBlue.webp"
          alt="Whiteslope Studio"
          className="h-10 md:h-12 w-auto mx-auto mb-8"
          style={{ filter: 'brightness(0)' }}
        />
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-black leading-[0.95]">
          Nasi Twórcy
        </h1>
        <p className="text-base md:text-lg text-black/60 font-semibold mt-4 max-w-2xl mx-auto">
          Zespół video marketingu Whiteslope Studio - zobacz, co dla Ciebie przygotujemy.
        </p>
      </div>

      <SekcjaTworcy
        imie="Mati"
        rola="Twórca Video i Fotograf"
        opis="Białystok i okolice - treści reklamowe na social media."
        zdjecie="/_resources/videoMarketing/Mati.webp"
        filmy={FILMY_MATIEGO}
      />

      <SekcjaTworcy
        imie="Magda"
        rola="UGC Creator"
        opis="Beauty, jedzenie i akcesoria - naturalny content, który sprzedaje."
        zdjecie="/_resources/videoMarketing/magda/MAGDA_PERSON.webp"
        filmy={FILMY_MAGDY}
        uwaga="Prezentowane materiały wideo powstały we współpracy z Magdą przed jej dołączeniem do zespołu Whiteslope Studio i są publikowane za jej zgodą."
      />

      <SekcjaTworcy
        imie="Patrycja"
        rola="UGC Creator"
        opis="Travel, food, beauty, eventy i usługi - mocne hooki i storytelling."
        zdjecie="/_resources/videoMarketing/patrycja/patrycja.webp"
        filmy={FILMY_PATRYCJI}
      />

      <div className="w-full px-6 md:px-10 py-16 md:py-24 text-center border-t border-zinc-100">
        <h2 className="text-2xl md:text-3xl font-black text-black mb-6">Chcesz takiego contentu?</h2>
        <a
          href="/contact?tab=question"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold text-base uppercase tracking-wide hover:scale-105 active:scale-95 transition-transform"
        >
          Napisz do nas
        </a>
      </div>
    </div>
  );
}
