'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Instagram, MapPin, ArrowRight, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { colors, fonts, ctaSecondaryBaseClass } from './theme';
import { useJestWObszarze } from './useJestWObszarze';

// lucide-react nie ma oficjalnej ikony TikTok, więc wstawiamy własne SVG z tym samym API co ikony lucide
function IkonaTikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

// Statyczny układ (bez animacji scrollowania, bez pinowania GSAP) - 1:1 na wzór sekcji Matiego: zdjęcie
// przyklejone do lewej-dołu, treść wyśrodkowana w pionie w lewej części, jeden filmik na pełną wysokość
// po prawej (9:16), bez drugiej warstwy tła. Kolor tła wzięty z bg.webp dostarczonego przez Patrycję,
// akcent blisko czerni - sekcje dookoła są ciemne.
const paleta = {
  bg: '#C7DDF0',
  bordo: '#16345C',
  tekst: '#1E2733',
};

const FILMY_PATRYCJI = [
  { src: '/_resources/videoMarketing/patrycja/PORTFOLIO_Patrycja_1.mp4', marka: 'Travel Content' },
  { src: '/_resources/videoMarketing/patrycja/PORTFOLIO_Patrycja_2.mp4', marka: 'Travel Content' },
  { src: '/_resources/videoMarketing/patrycja/PORTFOLIO_Patrycja_3.mp4', marka: 'Travel Content' },
];

export default function CreatorSpotlightSectionPatrycja() {
  const [aktywnyFilm, setAktywnyFilm] = useState(0);
  const [wyciszony, setWyciszony] = useState(true);
  const sekcjaRef = useRef<HTMLElement>(null);

  // Filmik montuje się dopiero jak sekcja wejdzie w pole widzenia - żeby przeglądarka nie pobierała
  // go od razu przy wejściu na stronę, tylko dopiero jak użytkownik faktycznie do niej doscrolluje.
  const filmyZaladowane = useJestWObszarze(sekcjaRef);

  const nastepnyFilm = () => setAktywnyFilm((poprzedni) => (poprzedni + 1) % FILMY_PATRYCJI.length);
  const wczesniejszyFilm = () =>
    setAktywnyFilm((poprzedni) => (poprzedni - 1 + FILMY_PATRYCJI.length) % FILMY_PATRYCJI.length);

  return (
    <section
      ref={sekcjaRef}
      id="patrycja"
      className="hidden min-[1550px]:flex relative w-full h-[100svh] overflow-hidden items-center justify-center"
      style={{ backgroundColor: paleta.bg }}
    >
      {/* Sygnet w lewym górnym rogu - ta sama pozycja co u Magdy/Matiego */}
      <img
        src="/_resources/logos/sygnetBlue.webp"
        alt="Whiteslope Studio"
        className="absolute top-20 left-6 md:top-24 md:left-8 h-15 md:h-24 w-auto pointer-events-none z-20"
        style={{ filter: 'brightness(0)' }}
      />

      {/* Zdjęcie Patrycji - lewa strona, od dołu sekcji prawie do samej góry */}
      <img
        src="/_resources/videoMarketing/patrycja/patrycja.webp"
        alt="Patrycja"
        className="absolute left-0 bottom-0 h-[92%] w-auto object-contain pointer-events-none z-20"
      />

      {/* Treść - dokładnie ta sama pozycja co u Magdy/Matiego (wyśrodkowana w pionie) */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[min(88%,460px)] xl:w-[560px] 2xl:w-[640px] flex flex-col items-start gap-3 xl:gap-4 z-20"
        style={{ left: 'calc(34% + max(0px, min(100vw - 1550px, 1900px - 100vw)) * 0.3)' }}
      >
        <h3
          className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl"
          style={{ fontFamily: fonts.heading, fontWeight: 900, color: paleta.bordo }}
        >
          PATRYCJA
        </h3>

        <p
          className="text-base md:text-lg xl:text-xl 2xl:text-2xl leading-snug"
          style={{ fontFamily: fonts.body, color: paleta.tekst }}
        >
          UGC Creator <span style={{ color: paleta.bordo, fontWeight: 700 }}>| Warszawa · 21 lat</span>
        </p>

        <p
          className="text-sm md:text-base xl:text-lg leading-relaxed max-w-sm xl:max-w-md"
          style={{ fontFamily: fonts.body, color: `${paleta.tekst}cc` }}
        >
          Patrycja to UGC Creator z Warszawy - kreatywna dusza z pozytywną energią. Tworzy content w
          kategoriach content creator, eventy, food, usługi, travel i beauty, stawiając na storytelling,
          mocne hooki i materiały dopasowane do aktualnych trendów.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/_pgrzywa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: paleta.bordo }}
          >
            <Instagram className="w-6 h-6" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm xl:text-base" style={{ fontFamily: fonts.body }}>
                @_pgrzywa
              </span>
              <span className="text-xs opacity-70" style={{ fontFamily: fonts.body }}>
                1713 obserwujących
              </span>
            </span>
          </a>
          <a
            href="https://www.tiktok.com/@patrycja_grzywa"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: paleta.bordo }}
          >
            <IkonaTikTok className="w-6 h-6" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm xl:text-base" style={{ fontFamily: fonts.body }}>
                @patrycja_grzywa
              </span>
              <span className="text-xs opacity-70" style={{ fontFamily: fonts.body }}>
                2086 obserwujących
              </span>
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" style={{ color: paleta.bordo }} />
          <span className="text-sm xl:text-base" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
            Warszawa
          </span>
        </div>

        <a
          href="/contact?tab=question"
          className={`${ctaSecondaryBaseClass} mt-2`}
          style={{
            backgroundColor: colors.black,
            color: colors.white,
            border: `2px solid ${colors.black}`,
            fontFamily: fonts.cta,
          }}
        >
          Zapytaj o Patrycję
          <ArrowRight size={18} />
        </a>

        {/* Zachęta z krzywą strzałką wskazująca na filmiki po prawej - skopiowana od Magdy/Matiego */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-lg md:text-xl font-bold" style={{ fontFamily: fonts.body, color: paleta.bordo }}>
            Sprawdź, co stworzyła Patrycja
          </span>
          <svg width="130" height="54" viewBox="0 0 130 54" style={{ color: paleta.bordo }}>
            <path
              d="M4 12C 35 50, 85 50, 118 16"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M102 6l18 9-9 18"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Filmik po prawej - pełna wysokość sekcji, ta sama pozycja co u Magdy/Matiego, bez animacji
          scrollowania - widoczny od razu. Przełączanie: kliknięcie w filmik, strzałki albo kropki. */}
      <div className="absolute right-0 min-[768px]:right-[1%] min-[1280px]:right-[8%] min-[1550px]:right-0 min-[1900px]:right-[5%] min-[2034px]:right-[11%] top-0 h-full aspect-[9/16] z-10 overflow-hidden bg-black">
        <div
          className="absolute top-0 inset-x-0 h-36 md:h-40 z-30 pointer-events-none flex items-start justify-center pt-20 md:pt-24"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)' }}
        >
          <span className="text-white text-sm md:text-base font-bold uppercase tracking-[0.2em]" style={{ fontFamily: fonts.cta }}>
            Portfolio Patrycji
          </span>
        </div>

        <div className="absolute inset-0 cursor-pointer" onClick={nastepnyFilm}>
          <AnimatePresence mode="wait">
            <motion.div
              key={aktywnyFilm}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {filmyZaladowane && (
                <video autoPlay muted={wyciszony} loop playsInline className="absolute inset-0 w-full h-full object-cover">
                  <source src={FILMY_PATRYCJI[aktywnyFilm].src} type="video/mp4" />
                </video>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Duży, rzucający się w oczy przycisk na środku - zachęca do odmutowania, znika po kliknięciu */}
        {wyciszony && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setWyciszony(false);
            }}
            aria-label="Włącz dźwięk"
            className="absolute inset-0 z-25 flex items-center justify-center cursor-pointer group"
          >
            <span className="flex flex-col items-center gap-2 animate-pulse group-hover:scale-110 transition-transform">
              <span
                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', border: '2px solid rgba(255,255,255,0.85)' }}
              >
                <VolumeX className="w-7 h-7 md:w-8 md:h-8 text-white" />
              </span>
              <span
                className="text-white text-xs uppercase tracking-[0.1em] px-3 py-1 rounded-full"
                style={{ backgroundColor: 'rgba(0,0,0,0.6)', fontFamily: fonts.cta }}
              >
                Włącz dźwięk
              </span>
            </span>
          </button>
        )}

        {/* Kropki pokazujące, który filmik jest aktywny - na środku dolnego paska, klikalne */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-2">
          {FILMY_PATRYCJI.map((film, indeks) => (
            <button
              key={film.src}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setAktywnyFilm(indeks);
              }}
              aria-label={`Filmik ${indeks + 1}`}
              className="w-2 h-2 rounded-full cursor-pointer transition-transform hover:scale-125"
              style={{ backgroundColor: indeks === aktywnyFilm ? '#fff' : 'rgba(255,255,255,0.4)' }}
            />
          ))}
        </div>

        {/* Strzałki do ręcznego przewijania filmików - obok siebie, w wolnym prawym dolnym rogu */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              wczesniejszyFilm();
            }}
            aria-label="Poprzedni filmik"
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nastepnyFilm();
            }}
            aria-label="Następny filmik"
            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Dolny pasek lewy - przycisk mute i nazwa marki, tak jak u Magdy/Matiego */}
        <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setWyciszony((poprzednio) => !poprzednio);
            }}
            aria-label={wyciszony ? 'Włącz dźwięk' : 'Wycisz'}
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 shrink-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          >
            {wyciszony ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </button>

          <span
            className="h-12 px-4 rounded-full text-xs uppercase tracking-[0.1em] pointer-events-none flex items-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: fonts.cta }}
          >
            {FILMY_PATRYCJI[aktywnyFilm].marka}
          </span>
        </div>
      </div>
    </section>
  );
}
