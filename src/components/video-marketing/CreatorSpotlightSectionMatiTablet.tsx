'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Instagram, MapPin, ArrowRight, Volume2, VolumeX, X, Play, Pause } from 'lucide-react';
import { colors, fonts } from './theme';
import { useJestWObszarze } from './useJestWObszarze';

// DOKŁADNA kopia struktury CreatorSpotlightSectionTablet.tsx (Magda) - te same klasy i rozmiary.
// JEDYNA celowa różnica: brak drugiej warstwy tła ("zalanie" wjeżdżające na scrollu) - tło jest tylko
// jednowarstwowe, solidne, więc "zalanieY" tutaj steruje tylko widocznością (opacity), nie osobną warstwą.
// Tło w kolorze zgłoszonym przez Matiego (ciepły złoty). Akcent blisko czerni - sekcje dookoła są ciemne.
const paleta = {
  bg: '#F0CD8D',
  bordo: '#1A1512',
  tekst: '#241C12',
};

const FILMY_MATIEGO = [
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_Pokazanie_Jawa_350CL.mp4', marka: 'Jawa 350' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_skladanie_jawy8_poprawka.mp4', marka: 'Montaż Jawy' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_XzoneRide.mp4', marka: 'X-Zone Ride' },
];

export default function CreatorSpotlightSectionMatiTablet() {
  const [otwartyFilm, setOtwartyFilm] = useState<number | null>(null);
  const [pelnyWyciszony, setPelnyWyciszony] = useState(true);
  const [pelnyPauza, setPelnyPauza] = useState(false);
  const [zamontowano, setZamontowano] = useState(false);
  const pelnyVideoRef = useRef<HTMLVideoElement>(null);
  const sekcjaRef = useRef<HTMLElement>(null);

  // Filmiki w karuzeli montują się dopiero jak sekcja wejdzie w pole widzenia (patrz useJestWObszarze) -
  // żeby przeglądarka nie pobierała ich od razu przy wejściu na stronę.
  const filmyZaladowane = useJestWObszarze(sekcjaRef);

  useEffect(() => {
    setZamontowano(true);
  }, []);

  const przelaczPauzePelnegoEkranu = () => {
    const video = pelnyVideoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPelnyPauza(false);
    } else {
      video.pause();
      setPelnyPauza(true);
    }
  };

  // Blokada scrolla strony w tle, gdy filmik jest otwarty na pełnym ekranie. Reset stanu play/mute
  // przy każdym nowym otwarciu.
  useEffect(() => {
    document.body.style.overflow = otwartyFilm !== null ? 'hidden' : '';
    if (otwartyFilm !== null) {
      setPelnyPauza(false);
      setPelnyWyciszony(true);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [otwartyFilm]);

  return (
    <section
      ref={sekcjaRef}
      className="hidden min-[1024px]:flex min-[1550px]:hidden relative w-full h-[100svh] overflow-hidden items-stretch"
      style={{
        backgroundColor: paleta.bg,
      }}
    >
      {/* Sygnet w lewym górnym rogu */}
      <img
        src="/_resources/logos/sygnetBlue.webp"
        alt="Whiteslope Studio"
        className="absolute top-20 left-6 h-14 w-auto pointer-events-none z-20"
        style={{ filter: 'brightness(0)' }}
      />

      {/* Zdjęcie Matiego - lewa strona, przyklejona do dołu, jak na desktopie. */}
      <img
        src="/_resources/videoMarketing/mati/mati.webp"
        alt="Mati"
        className="relative z-20 h-full w-auto object-contain shrink-0"
      />

      {/* Prawa kolumna - justify-center + RÓWNY padding góra/dół (py-24) daje naprawdę symetryczne marginesy,
          identycznie jak u Magdy. */}
      <div className="relative z-20 flex-1 h-full flex flex-col justify-center gap-6 px-6 py-24 min-w-0">
        {/* Tekst - max połowa wysokości sekcji */}
        <div className="flex flex-col items-start gap-1.5 max-h-[48%] overflow-hidden">
          <h3
            className="text-3xl font-black leading-none"
            style={{ fontFamily: fonts.heading, color: paleta.bordo }}
          >
            MATI
          </h3>
          <p className="text-sm" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
            Twórca Video i Fotograf <span style={{ color: paleta.bordo, fontWeight: 700 }}>| Białystok</span>
          </p>
          <p
            className="text-xs leading-snug max-w-md"
            style={{ fontFamily: fonts.body, color: `${paleta.tekst}cc` }}
          >
            Mati to <span style={{ color: paleta.bordo, fontWeight: 700 }}>twórca wideo i fotograf</span> z{' '}
            <span style={{ color: paleta.bordo, fontWeight: 700 }}>Białegostoku</span>, tworzący treści na
            social media.
          </p>

          <div className="flex items-center gap-4 flex-wrap mt-1">
            <a
              href="https://www.instagram.com/mateusz.malewski.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
              style={{ color: paleta.bordo }}
            >
              <Instagram className="w-4 h-4" />
              <span className="flex flex-col leading-tight">
                <span className="text-xs" style={{ fontFamily: fonts.body }}>
                  @mateusz.malewski.10
                </span>
                <span className="text-[10px] opacity-70" style={{ fontFamily: fonts.body }}>
                  137 obserwujących
                </span>
              </span>
            </a>
            <div className="flex items-center gap-1" style={{ color: paleta.bordo }}>
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs" style={{ fontFamily: fonts.body }}>
                Białystok
              </span>
            </div>
          </div>

          <a
            href="/contact?tab=question"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mt-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 whitespace-nowrap select-none"
            style={{ backgroundColor: colors.black, color: colors.white, fontFamily: fonts.cta }}
          >
            Zapytaj o Matiego
            <ArrowRight size={14} />
          </a>
        </div>

        {/* Napis "Portfolio Matiego" + filmiki - naturalna wysokość (bez flex-1), więc napis jest tuż
            nad filmikami, a nie oddzielony pustym miejscem. */}
        <div className="flex flex-col gap-2 min-h-0">
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: paleta.bordo, fontFamily: fonts.cta }}
          >
            Portfolio Matiego
          </span>

          {/* flex-1 na kafelku (nie h-full na rzędzie!) - identycznie jak u Magdy. */}
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILMY_MATIEGO.map((film, indeks) => (
              <div
                key={film.src}
                role="button"
                tabIndex={0}
                onClick={() => setOtwartyFilm(indeks)}
                onKeyDown={(e) => e.key === 'Enter' && setOtwartyFilm(indeks)}
                className="relative flex-1 min-w-[231px] aspect-[9/16] rounded-xl overflow-hidden bg-black cursor-pointer snap-center"
              >
                {filmyZaladowane && (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    <source src={film.src} type="video/mp4" />
                  </video>
                )}

                <span
                  className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.1em]"
                  style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: fonts.cta }}
                >
                  {film.marka}
                </span>

                <span
                  className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center pointer-events-none"
                  style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                >
                  <VolumeX className="w-3.5 h-3.5 text-white" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pełnoekranowy podgląd filmiku - identyczny mechanizm co na mobile (portal do document.body,
          bez natywnego "controls", własne play/pauza + mute, X w prawym górnym rogu). */}
      {zamontowano && otwartyFilm !== null && createPortal(
        <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
          <video
            ref={pelnyVideoRef}
            key={FILMY_MATIEGO[otwartyFilm].src}
            autoPlay
            muted={pelnyWyciszony}
            loop
            playsInline
            className="w-full h-full object-contain"
          >
            <source src={FILMY_MATIEGO[otwartyFilm].src} type="video/mp4" />
          </video>

          <button
            type="button"
            onClick={() => setOtwartyFilm(null)}
            aria-label="Zamknij"
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <span
            className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs uppercase tracking-[0.1em]"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', fontFamily: fonts.cta }}
          >
            {FILMY_MATIEGO[otwartyFilm].marka}
          </span>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
            <button
              type="button"
              onClick={przelaczPauzePelnegoEkranu}
              aria-label={pelnyPauza ? 'Odtwórz' : 'Pauza'}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              {pelnyPauza ? (
                <Play className="w-5 h-5 text-white" fill="white" />
              ) : (
                <Pause className="w-5 h-5 text-white" fill="white" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setPelnyWyciszony((poprzednio) => !poprzednio)}
              aria-label={pelnyWyciszony ? 'Włącz dźwięk' : 'Wycisz'}
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              {pelnyWyciszony ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
