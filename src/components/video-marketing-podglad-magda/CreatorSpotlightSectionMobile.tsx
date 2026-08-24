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

// Ta sama paleta co w wersji desktopowej
const paleta = {
  roz: '#ECC6CB',
  napis: '#EEC8CD',
  bordo: '#B8535F',
  tekst: '#3A1F24',
};

const FILMY_MAGDY = [
  { src: '/_resources/videoMarketing/magda/NEW_Magda_Wideo_wizytowka.mp4', marka: 'Portfolio' },
  { src: '/_resources/videoMarketing/magda/NEW_Magda_MobilFox.mp4', marka: 'MobilFox' },
  { src: '/_resources/videoMarketing/magda/MAGDA_hoppa.mp4', marka: 'Hoppa' },
  { src: '/_resources/videoMarketing/magda/MAGDA_Chillberry1.mp4', marka: 'Chillberry' },
  { src: '/_resources/videoMarketing/magda/MAGDA_Chillberry2.mp4', marka: 'Chillberry' },
];

// Wersja mobilna sekcji Magdy - dużo prostsza niż desktop: bez pinowania scrolla, bez wjeżdżającego
// wielkiego napisu "Magda". Tło (SOLID_BG) wjeżdża od dołu do góry sterowane scrollem (jak na tablecie),
// a Magda + tekst + filmiki pojawiają się DOPIERO PO tym, jak tło skończy wjeżdżać. Układ nagłówka:
// zdjęcie Magdy po LEWEJ (większe niż wcześniej), imię + podtytuł po PRAWEJ - jak card z przykładu, tylko
// lustrzanie (tam foto było z prawej). Pod spodem: opis, social media, CTA, a na końcu pozioma karuzela.
export default function CreatorSpotlightSectionMobile() {
  const [otwartyFilm, setOtwartyFilm] = useState<number | null>(null);
  const [pelnyWyciszony, setPelnyWyciszony] = useState(true);
  const [pelnyPauza, setPelnyPauza] = useState(false);
  const [zamontowano, setZamontowano] = useState(false);
  const pelnyVideoRef = useRef<HTMLVideoElement>(null);
  const sekcjaRef = useRef<HTMLElement>(null);

  // Filmiki w karuzeli montują się dopiero jak sekcja wejdzie w pole widzenia (patrz useJestWObszarze) -
  // żeby przeglądarka nie pobierała ich od razu przy wejściu na stronę.
  const filmyZaladowane = useJestWObszarze(sekcjaRef);

  // Miniaturki w karuzeli są ZAWSZE wyciszone (bez własnego przycisku mute) - jedyne źródło dźwięku to
  // pełnoekranowy podgląd. To eliminowało błąd, w którym po zamknięciu pełnego ekranu dalej leciało audio
  // z odmutowanej wcześniej miniaturki w tle.
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
  // przy każdym nowym otwarciu, żeby kolejny filmik zawsze startował od nowa (odtwarzany, z dźwiękiem).
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

  // Scroll-driven (bez pinowania), ten sam mechanizm co w wersji tablet: 0 -> 0.55 tło wjeżdża od dołu,
  // 0.55 -> 0.9 dopiero wtedy pojawia się reszta (Magda, tekst, filmiki).
  const { scrollYProgress } = useScroll({ target: sekcjaRef, offset: ['start end', 'start start'] });
  const zalanieY = useTransform(scrollYProgress, [0, 0.55], ['100%', '0%']);
  const trescOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);
  const trescY = useTransform(scrollYProgress, [0.55, 0.9], [20, 0]);

  return (
    <section
      ref={sekcjaRef}
      className="lg:hidden relative w-full overflow-hidden"
      style={{
        backgroundColor: paleta.roz,
        backgroundImage: "url('/_resources/videoMarketing/magda/MagdaBG.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Zalanie różowym tłem - wjeżdża od dołu do góry w takt scrolla */}
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

      <div className="relative z-10 px-5 pt-14 pb-10 flex flex-col items-center">
        {/* Sygnet w lewym górnym rogu - przekolorowany na czarno */}
        <img
          src="/_resources/logos/sygnetBlue.webp"
          alt="Whiteslope Studio"
          className="absolute top-0 left-0 h-10 w-auto pointer-events-none"
          style={{ filter: 'brightness(0)' }}
        />

        {/* Nagłówek - zdjęcie Magdy po LEWEJ, bez paddingu/marginesu, więc styka się bezpośrednio z ramką
            karty (dzięki temu jest większe niż gdyby miało odstęp) - samo overflow-hidden na karcie je
            przycina do zaokrąglonych rogów. Tekst po PRAWEJ ma swój własny padding. */}
        <motion.div
          className="w-full flex items-stretch gap-3 mb-6 rounded-2xl border overflow-hidden"
          style={{ opacity: trescOpacity, y: trescY, borderColor: 'rgba(0,0,0,0.12)' }}
        >
          {/* Zdjęcie Magdy - bez pasków, powiększone (46% zamiast 42%) */}
          <div className="w-[46%] shrink-0">
            <img
              src="/_resources/videoMarketing/magda/MAGDA_PERSON.webp"
              alt="Magda"
              className="w-full h-full object-cover"
            />
          </div>

          {/* min-w, żeby tekst nie zawijał się zbyt często na wąskich telefonach */}
          <div className="flex-1 flex flex-col items-start justify-center gap-1 min-w-[130px] py-4 pr-4">
            <h3
              className="text-3xl font-black leading-none"
              style={{ fontFamily: fonts.heading, color: paleta.bordo }}
            >
              MAGDA
            </h3>
            <p className="text-sm leading-snug" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
              Twórczyni UGC i Content Creatorka
            </p>
            <p
              className="text-xs leading-snug mt-1"
              style={{ fontFamily: fonts.body, color: `${paleta.tekst}cc` }}
            >
              Magda to doskonała i komunikatywna osoba, która starannie podchodzi do każdego projektu.
            </p>

            <div className="flex items-center gap-x-3 gap-y-1 flex-wrap mt-2">
              <a
                href="https://www.instagram.com/magdajzkv/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
                style={{ color: paleta.bordo }}
              >
                <Instagram className="w-3.5 h-3.5" />
                <span className="text-[11px]" style={{ fontFamily: fonts.body }}>
                  @magdajzkv · 3203
                </span>
              </a>
              <a
                href="https://www.tiktok.com/@magdajzkv"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
                style={{ color: paleta.bordo }}
              >
                <IkonaTikTok className="w-3.5 h-3.5" />
                <span className="text-[11px]" style={{ fontFamily: fonts.body }}>
                  @magdajzkv · 3281
                </span>
              </a>
              <div className="flex items-center gap-1" style={{ color: paleta.bordo }}>
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px]" style={{ fontFamily: fonts.body }}>
                  Legnica
                </span>
              </div>
            </div>

            {/* Miniaturowe CTA pod social media - mniejsza wersja tego z dołu sekcji */}
            <a
              href="/contact?tab=question"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium mt-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 whitespace-nowrap select-none"
              style={{ backgroundColor: colors.black, color: colors.white, fontFamily: fonts.cta }}
            >
              Zapytaj o Magdę
              <ArrowRight size={11} />
            </a>
          </div>
        </motion.div>

        {/* Karuzela pozioma z 3 filmikami - nagłówek "Portfolio Magdy" (bez duplikowania "zobaczcie sami") */}
        <motion.div className="w-full" style={{ opacity: trescOpacity, y: trescY }}>
          <p
            className="text-center text-sm font-bold uppercase tracking-[0.15em] mb-3"
            style={{ color: paleta.bordo, fontFamily: fonts.cta }}
          >
            Portfolio Magdy
          </p>

          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILMY_MAGDY.map((film, indeks) => (
              <div
                key={film.src}
                role="button"
                tabIndex={0}
                onClick={() => setOtwartyFilm(indeks)}
                onKeyDown={(e) => e.key === 'Enter' && setOtwartyFilm(indeks)}
                className="relative shrink-0 w-[62%] aspect-[9/16] snap-center rounded-xl overflow-hidden bg-black cursor-pointer"
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
                  className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.1em]"
                  style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: fonts.cta }}
                >
                  {film.marka}
                </span>

                {/* Sama ikonka (bez funkcji przełączania) - podpowiedź, że dźwięk jest tylko w pełnym ekranie */}
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

        {/* Pełnoekranowy podgląd filmiku - przykrywa CAŁĄ stronę (header, FastContact, chatbota). Tło ciemne
            i NIEklikalne (kliknięcie w tło nic nie robi - zamyka tylko X). Bez natywnego "controls" - to ono
            na telefonach potrafiło przekazać sterowanie do systemowego odtwarzacza pełnoekranowego, przez co
            nie dało się wrócić do naszego X. Zamiast tego własne przyciski: play/pauza i mute. */}
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

            {/* X - zamknięcie, prawy górny róg */}
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

            {/* Play/pauza i mute - na dole, obok siebie */}
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

        {/* Zastrzeżenie prawne - bez CTA na końcu, bo jest już mały CTA w karcie z Magdą wyżej */}
        <div className="flex items-start gap-1.5 mt-5 max-w-sm">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: paleta.tekst }} />
          <span className="text-[11px] leading-snug" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
            Prezentowane materiały wideo powstały we współpracy z Magdą przed jej dołączeniem do zespołu Whiteslope
            Studio i są publikowane za jej zgodą.
          </span>
        </div>
      </div>
    </section>
  );
}
