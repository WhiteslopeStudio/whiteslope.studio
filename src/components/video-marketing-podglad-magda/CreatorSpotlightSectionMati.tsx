'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, ArrowRight, Volume2, VolumeX, Info, X, Play, Pause } from 'lucide-react';
import { colors, fonts } from './theme';
import { useJestWObszarze } from './useJestWObszarze';

// Paleta Matiego - w odróżnieniu od Magdy (dwuwarstwowe tło: wzór + "zalanie" sterowane scrollem),
// tutaj tło jest CELOWO tylko jednowarstwowe - jeden, solidny kolor/obrazek (bg.webp), bez drugiej
// warstwy wjeżdżającej na scrollu.
const paleta = {
  bg: '#DED1B4',
  akcent: '#1A1512',
  tekst: '#2B2118',
};

const FILMY_MATIEGO = [
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_XzoneRide.mp4', marka: 'X-Zone Ride' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_Pokazanie_Jawa_350CL.mp4', marka: 'Jawa 350' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_skladanie_jawy8_poprawka.mp4', marka: 'Montaż Jawy' },
];

// Sekcja Matiego - umieszczona zaraz POD sekcją Magdy, w tym samym duchu wizualnym (zdjęcie osoby +
// tekst + karuzela portfolio + tryb kinowy na pełnym ekranie po kliknięciu w filmik), ale bez pinowania
// scrolla i bez wielkiego animowanego napisu - jedna, prostsza wersja responsywna (mobile/desktop w
// jednym pliku, tak jak HeroSection), z jednowarstwowym, solidnym tłem.
export default function CreatorSpotlightSectionMati() {
  const [otwartyFilm, setOtwartyFilm] = useState<number | null>(null);
  const [pelnyWyciszony, setPelnyWyciszony] = useState(true);
  const [pelnyPauza, setPelnyPauza] = useState(false);
  const [zamontowano, setZamontowano] = useState(false);
  const pelnyVideoRef = useRef<HTMLVideoElement>(null);
  const sekcjaRef = useRef<HTMLElement>(null);

  // Filmiki montują się dopiero jak sekcja wejdzie w pole widzenia - żeby przeglądarka nie pobierała
  // ich od razu przy wejściu na stronę.
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
      setPelnyWyciszony(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [otwartyFilm]);

  // Proste pojawienie się treści na scrollu (fade + lekkie przesunięcie w górę) - bez drugiej warstwy
  // tła, w przeciwieństwie do sekcji Magdy.
  const { scrollYProgress } = useScroll({ target: sekcjaRef, offset: ['start end', 'start center'] });
  const trescOpacity = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);
  const trescY = useTransform(scrollYProgress, [0.15, 0.6], [30, 0]);

  return (
    <section
      ref={sekcjaRef}
      id="mati"
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: paleta.bg }}
    >
      <div className="relative z-10 max-w-[1640px] mx-auto px-5 md:px-12 py-16 md:py-24">
        {/* ── Mobile/tablet (poniżej lg) - karta zdjęcie+tekst na górze, karuzela filmików pod spodem,
            dokładnie ten sam wzór co w mobilnej wersji Magdy. ── */}
        <div className="flex lg:hidden flex-col items-center">
          <motion.div
            className="w-full flex items-stretch gap-3 mb-6 rounded-2xl border overflow-hidden"
            style={{ opacity: trescOpacity, y: trescY, borderColor: 'rgba(0,0,0,0.12)', backgroundColor: '#ffffff' }}
          >
            <div className="w-[46%] shrink-0" style={{ backgroundColor: paleta.bg }}>
              <img
                src="/_resources/videoMarketing/mati/mati.webp"
                alt="Mati"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 flex flex-col items-start justify-center gap-1 min-w-[130px] py-4 pr-4">
              <h3
                className="text-3xl font-black leading-none"
                style={{ fontFamily: fonts.heading, color: paleta.akcent }}
              >
                MATI
              </h3>
              <p className="text-sm leading-snug" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
                Twórca Video i Fotograf
              </p>
              <p
                className="text-xs leading-snug mt-1"
                style={{ fontFamily: fonts.body, color: `${paleta.tekst}cc` }}
              >
                Kręcę, montuję i fotografuję - od dynamicznych filmów motoryzacyjnych po content na social media.
              </p>

              <div className="flex items-center gap-x-3 gap-y-1 flex-wrap mt-2">
                <a
                  href="https://www.instagram.com/mateusz.malewski.10/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                  style={{ color: paleta.akcent }}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span className="text-[11px]" style={{ fontFamily: fonts.body }}>
                    @mateusz.malewski.10
                  </span>
                </a>
              </div>

              <a
                href="/contact?tab=question"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium mt-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 whitespace-nowrap select-none"
                style={{ backgroundColor: colors.black, color: colors.white, fontFamily: fonts.cta }}
              >
                Zapytaj o Matiego
                <ArrowRight size={11} />
              </a>
            </div>
          </motion.div>

          <motion.div className="w-full" style={{ opacity: trescOpacity, y: trescY }}>
            <p
              className="text-center text-sm font-bold uppercase tracking-[0.15em] mb-3"
              style={{ color: paleta.akcent, fontFamily: fonts.cta }}
            >
              Portfolio Matiego
            </p>

            <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FILMY_MATIEGO.map((film, indeks) => (
                <div
                  key={film.src}
                  role="button"
                  tabIndex={0}
                  onClick={() => setOtwartyFilm(indeks)}
                  onKeyDown={(e) => e.key === 'Enter' && setOtwartyFilm(indeks)}
                  className="relative shrink-0 w-[62%] aspect-[9/16] snap-center rounded-xl overflow-hidden bg-black cursor-pointer"
                >
                  {filmyZaladowane && (
                    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                      <source src={film.src} type="video/mp4" />
                    </video>
                  )}

                  <span
                    className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.1em]"
                    style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: fonts.cta }}
                  >
                    {film.marka}
                  </span>

                  <span
                    className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center pointer-events-none"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
                  >
                    <VolumeX className="w-4 h-4 text-white" />
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Desktop (lg+) - zdjęcie po lewej, tekst + 3 filmiki po prawej. ── */}
        <div className="hidden lg:flex items-center gap-16">
          <motion.img
            src="/_resources/videoMarketing/mati/mati.webp"
            alt="Mati"
            className="w-[34%] h-auto object-contain shrink-0"
            style={{ opacity: trescOpacity, y: trescY }}
          />

          <motion.div className="flex-1 flex flex-col items-start gap-4" style={{ opacity: trescOpacity, y: trescY }}>
            <h3
              className="text-5xl xl:text-6xl"
              style={{ fontFamily: fonts.heading, fontWeight: 900, color: paleta.akcent }}
            >
              MATI
            </h3>

            <p className="text-lg xl:text-xl leading-snug" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
              Twórca Video i Fotograf
            </p>

            <p
              className="text-sm xl:text-base leading-relaxed max-w-lg"
              style={{ fontFamily: fonts.body, color: `${paleta.tekst}cc` }}
            >
              Kręcę, montuję i fotografuję - od dynamicznych filmów motoryzacyjnych po content na social media.
              Zobaczcie sami →
            </p>

            <a
              href="https://www.instagram.com/mateusz.malewski.10/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ color: paleta.akcent }}
            >
              <Instagram className="w-6 h-6" />
              <span className="text-base" style={{ fontFamily: fonts.body }}>
                @mateusz.malewski.10
              </span>
            </a>

            <a
              href="/contact?tab=question"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-base cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap select-none mt-2"
              style={{ backgroundColor: colors.black, color: colors.white, border: `2px solid ${colors.black}`, fontFamily: fonts.cta }}
            >
              Zapytaj o Matiego
              <ArrowRight size={18} />
            </a>

            <p
              className="text-xs font-bold uppercase tracking-[0.2em] mt-6"
              style={{ color: paleta.akcent, fontFamily: fonts.cta }}
            >
              Portfolio Matiego
            </p>

            <div className="grid grid-cols-3 gap-4 w-full">
              {FILMY_MATIEGO.map((film, indeks) => (
                <div
                  key={film.src}
                  role="button"
                  tabIndex={0}
                  onClick={() => setOtwartyFilm(indeks)}
                  onKeyDown={(e) => e.key === 'Enter' && setOtwartyFilm(indeks)}
                  className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black cursor-pointer"
                >
                  {filmyZaladowane && (
                    <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
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
          </motion.div>
        </div>
      </div>

      {/* Pełnoekranowy podgląd filmiku - identyczny mechanizm co u Magdy (portal do document.body, bez
          natywnego "controls", własne play/pauza + mute, X w prawym górnym rogu). */}
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

      {/* Zastrzeżenie - spójne z resztą sekcji portfolio */}
      <div className="relative z-10 max-w-[1640px] mx-auto px-5 md:px-12 pb-10 flex items-start gap-1.5">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: paleta.tekst }} />
        <span className="text-[11px] leading-snug max-w-sm" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
          Prezentowane materiały wideo to realizacje własne Matiego z Whiteslope Studio.
        </span>
      </div>
    </section>
  );
}
