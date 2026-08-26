'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Instagram, MapPin, ArrowRight, Volume2, VolumeX, Info, X, Play, Pause } from 'lucide-react';
import { colors, fonts } from './theme';
import { useJestWObszarze } from './useJestWObszarze';

// lucide-react nie ma oficjalnej ikony TikTok, więc wstawiamy własne SVG z tym samym API co ikony lucide
function IkonaTikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

const paleta = {
  roz: '#ECC6CB',
  napis: '#EEC8CD',
  bordo: '#B8535F',
  tekst: '#3A1F24',
};

const FILMY_MAGDY = [
  { src: '/_resources/videoMarketing/magda/NEW_Magda_Wideo_wizytowka.mp4', marka: 'Portfolio' },
  { src: '/_resources/videoMarketing/magda/NEW_Magda_MobilFox.mp4', marka: 'Akcesoria' },
  { src: '/_resources/videoMarketing/magda/MAGDA_hoppa.mp4', marka: 'Beauty' },
  { src: '/_resources/videoMarketing/magda/MAGDA_Chillberry1.mp4', marka: 'Jedzenie' },
  { src: '/_resources/videoMarketing/magda/MAGDA_Chillberry2.mp4', marka: 'Jedzenie' },
];

// Wersja "pośrednia" (tablet/mały laptop, ~1024-1549px szerokości) - w tym zakresie nie mieści się
// już pełny layout desktopowy (Magda + pełnowysokościowy filmik 9:16 obok tekstu). Zamiast tego:
// Magda przyklejona do lewej krawędzi (jak na desktopie), a po prawej góra = skompresowany tekst
// (max. połowa wysokości sekcji), dół = 3 filmiki obok siebie, mniejsze, jak na mobile - każdy
// klikalny, żeby włączyć/wyłączyć dźwięk. Bez pinowania scrolla - dużo prostsze niż desktop.
export default function CreatorSpotlightSectionTablet() {
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

  // Scroll-driven (bez pinowania) - postęp liczony od momentu, gdy góra sekcji wjeżdża od dołu ekranu,
  // do momentu, gdy góra sekcji dojedzie do góry ekranu. W tym oknie: najpierw (0 -> 0.55) różowe tło
  // wjeżdża od dołu, a DOPIERO PO TYM (0.55 -> 1) pojawiają się Magda, tekst i filmiki.
  const { scrollYProgress } = useScroll({ target: sekcjaRef, offset: ['start end', 'start start'] });
  const zalanieY = useTransform(scrollYProgress, [0, 0.55], ['100%', '0%']);
  const trescOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);
  const trescY = useTransform(scrollYProgress, [0.55, 0.9], [24, 0]);

  return (
    <section
      ref={sekcjaRef}
      className="hidden min-[1024px]:flex min-[1550px]:hidden relative w-full h-[100svh] overflow-hidden items-stretch"
      style={{
        backgroundColor: paleta.roz,
        backgroundImage: "url('/_resources/videoMarketing/magda/MagdaBG.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Zalanie różowym tłem - wjeżdża od dołu do góry w takt scrolla (0 -> 0.55 postępu sekcji) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: paleta.napis,
          backgroundImage: "url('/_resources/videoMarketing/magda/SOLID_BG.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: zalanieY,
        }}
      />

      {/* Sygnet w lewym górnym rogu */}
      <img
        src="/_resources/logos/sygnetBlue.webp"
        alt="Whiteslope Studio"
        className="absolute top-20 left-6 h-14 w-auto pointer-events-none z-20"
        style={{ filter: 'brightness(0)' }}
      />

      {/* Zdjęcie Magdy - lewa strona, przyklejona do dołu, jak na desktopie. Pojawia się DOPIERO PO tym,
          jak różowe tło skończy wjeżdżać (ten sam zakres postępu scrolla co reszta treści). */}
      <motion.img
        src="/_resources/videoMarketing/magda/MAGDA_PERSON.webp"
        alt="Magda"
        className="relative z-20 h-full w-auto object-contain shrink-0"
        style={{ opacity: trescOpacity, y: trescY }}
      />

      {/* Prawa kolumna - justify-center + RÓWNY padding góra/dół (py-24) daje naprawdę symetryczne marginesy
          (tyle samo px od MAGDY do góry, co od końca info do dołu) - bo teraz żaden blok w środku nie ma
          już flex-1 (to ono wcześniej psuło centrowanie, robiąc ogromne puste odstępy). py-24 samo w sobie
          też gwarantuje, że MAGDA nigdy nie wyląduje wyżej niż górna krawędź sygnetu (który jest na top-20). */}
      <div className="relative z-20 flex-1 h-full flex flex-col justify-center gap-6 px-6 py-24 min-w-0">
        {/* Tekst - max połowa wysokości sekcji */}
        <motion.div
          className="flex flex-col items-start gap-1.5 max-h-[48%] overflow-hidden"
          style={{ opacity: trescOpacity, y: trescY }}
        >
          <h3
            className="text-3xl font-black leading-none"
            style={{ fontFamily: fonts.heading, color: paleta.bordo }}
          >
            MAGDA
          </h3>
          <p className="text-sm" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
            Twórczyni UGC i Content Creatorka
          </p>
          <p
            className="text-xs leading-snug max-w-md"
            style={{ fontFamily: fonts.body, color: `${paleta.tekst}cc` }}
          >
            Magda to doskonała i komunikatywna osoba, która starannie podchodzi do każdego projektu.
          </p>

          <div className="flex items-center gap-4 flex-wrap mt-1">
            <a
              href="https://www.instagram.com/magdajzkv/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
              style={{ color: paleta.bordo }}
            >
              <Instagram className="w-4 h-4" />
              <span className="text-xs" style={{ fontFamily: fonts.body }}>
                @magdajzkv · 3203
              </span>
            </a>
            <a
              href="https://www.tiktok.com/@magdajzkv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5"
              style={{ color: paleta.bordo }}
            >
              <IkonaTikTok className="w-4 h-4" />
              <span className="text-xs" style={{ fontFamily: fonts.body }}>
                @magdajzkv · 3281
              </span>
            </a>
            <div className="flex items-center gap-1" style={{ color: paleta.bordo }}>
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs" style={{ fontFamily: fonts.body }}>
                Legnica
              </span>
            </div>
          </div>

          <a
            href="/contact?tab=question"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium mt-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 whitespace-nowrap select-none"
            style={{ backgroundColor: colors.black, color: colors.white, fontFamily: fonts.cta }}
          >
            Zapytaj o Magdę
            <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Napis "Portfolio Magdy" + filmiki + zastrzeżenie - naturalna wysokość (bez flex-1), więc
            napis jest tuż nad filmikami, a nie oddzielony pustym miejscem. */}
        <motion.div
          className="flex flex-col gap-2 min-h-0"
          style={{ opacity: trescOpacity, y: trescY }}
        >
          <span
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: paleta.bordo, fontFamily: fonts.cta }}
          >
            Portfolio Magdy
          </span>

          {/* flex-1 na kafelku (nie h-full na rzędzie!) - szerokość każdego kafelka liczy się z dostępnej
              szerokości rzędu, a wysokość dopiero z niej przez aspect-ratio. min-w-[231px] to podłoga -
              231px szerokości przy 9:16 daje ~410px wysokości, więc filmiki nigdy nie zrobią się mniejsze.
              Gdy nie mieszczą się już 3 obok siebie przy tej minimalnej szerokości, rząd zaczyna się
              scrollować w bok (overflow-x-auto + snap), tak jak na komórce. */}
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILMY_MAGDY.map((film, indeks) => (
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

          <div className="flex items-start gap-1.5 max-w-lg">
            <Info className="w-3 h-3 shrink-0 mt-0.5" style={{ color: paleta.tekst }} />
            <span className="text-[10px] leading-snug" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
              Prezentowane materiały wideo powstały we współpracy z Magdą przed jej dołączeniem do zespołu
              Whiteslope Studio i są publikowane za jej zgodą.
            </span>
          </div>
        </motion.div>
      </div>

      {/* Pełnoekranowy podgląd filmiku - identyczny mechanizm co na mobile (portal do document.body,
          bez natywnego "controls", własne play/pauza + mute, X w prawym górnym rogu). */}
      {zamontowano && otwartyFilm !== null && createPortal(
        <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
          <video
            ref={pelnyVideoRef}
            key={FILMY_MAGDY[otwartyFilm].src}
            autoPlay
            muted={pelnyWyciszony}
            loop
            playsInline
            className="w-full h-full object-contain"
          >
            <source src={FILMY_MAGDY[otwartyFilm].src} type="video/mp4" />
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
            {FILMY_MAGDY[otwartyFilm].marka}
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
