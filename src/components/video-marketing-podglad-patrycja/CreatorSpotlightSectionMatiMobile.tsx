'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Instagram, MapPin, ArrowRight, Volume2, VolumeX, X, Play, Pause } from 'lucide-react';
import { colors, fonts } from './theme';
import { useJestWObszarze } from './useJestWObszarze';

// DOKŁADNA kopia struktury CreatorSpotlightSectionMobile.tsx (Magda) - ten sam układ karty (zdjęcie
// po lewej, tekst po prawej) i ta sama karuzela filmików. JEDYNA celowa różnica: brak drugiej warstwy
// tła ("zalanie" wjeżdżające na scrollu) - tło jest tylko jednowarstwowe, solidne.
// Tło w kolorze zgłoszonym przez Matiego (ciepły złoty), a akcent (nagłówek "MATI", ikonki) to ciemniejszy,
// bardziej brązowo-bursztynowy odcień TEGO SAMEGO koloru - nie czysta czerń.
const paleta = {
  bg: '#F0CD8D',
  bordo: '#8A6A2F',
  tekst: '#3D2E18',
};

const FILMY_MATIEGO = [
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_Pokazanie_Jawa_350CL.mp4', marka: 'Jawa 350' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_skladanie_jawy8_poprawka.mp4', marka: 'Montaż Jawy' },
  { src: '/_resources/videoMarketing/mati/PORTFOLIO_XzoneRide.mp4', marka: 'X-Zone Ride' },
];

export default function CreatorSpotlightSectionMatiMobile() {
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

  return (
    <section
      ref={sekcjaRef}
      className="lg:hidden relative w-full overflow-hidden"
      style={{
        backgroundColor: paleta.bg,
      }}
    >
      <div className="relative z-10 px-5 pt-14 pb-10 flex flex-col items-center">
        {/* Sygnet w lewym górnym rogu - przekolorowany na czarno */}
        <img
          src="/_resources/logos/sygnetBlue.webp"
          alt="Whiteslope Studio"
          className="absolute top-0 left-0 h-10 w-auto pointer-events-none"
          style={{ filter: 'brightness(0)' }}
        />

        {/* Nagłówek - zdjęcie Matiego po LEWEJ, bez paddingu/marginesu, więc styka się bezpośrednio z ramką
            karty (dzięki temu jest większe niż gdyby miało odstęp) - samo overflow-hidden na karcie je
            przycina do zaokrąglonych rogów. Tekst po PRAWEJ ma swój własny padding. Identycznie jak u Magdy. */}
        <div
          className="w-full flex items-stretch gap-3 mb-6 rounded-2xl border overflow-hidden"
          style={{ borderColor: 'rgba(0,0,0,0.12)' }}
        >
          {/* Zdjęcie Matiego - bez pasków, 46% szerokości, tak jak u Magdy */}
          <div className="w-[46%] shrink-0">
            <img
              src="/_resources/videoMarketing/mati/mati.webp"
              alt="Mati"
              className="w-full h-full object-cover"
            />
          </div>

          {/* min-w, żeby tekst nie zawijał się zbyt często na wąskich telefonach */}
          <div className="flex-1 flex flex-col items-start justify-center gap-1 min-w-[130px] py-4 pr-4">
            <h3
              className="text-3xl font-black leading-none"
              style={{ fontFamily: fonts.heading, color: paleta.bordo }}
            >
              MATI
            </h3>
            <p className="text-sm leading-snug" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
              Twórca Video i Fotograf <span style={{ color: paleta.bordo, fontWeight: 700 }}>| Białystok</span>
            </p>
            <p
              className="text-xs leading-snug mt-1"
              style={{ fontFamily: fonts.body, color: `${paleta.tekst}cc` }}
            >
              Mati to <span style={{ color: paleta.bordo, fontWeight: 700 }}>twórca wideo i fotograf</span> z{' '}
              <span style={{ color: paleta.bordo, fontWeight: 700 }}>Białegostoku</span>, tworzący treści na
              social media.
            </p>

            <div className="flex items-center gap-x-3 gap-y-1 flex-wrap mt-2">
              <a
                href="https://www.instagram.com/mateusz.malewski.10/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1"
                style={{ color: paleta.bordo }}
              >
                <Instagram className="w-3.5 h-3.5" />
                <span className="flex flex-col leading-tight">
                  <span className="text-[11px]" style={{ fontFamily: fonts.body }}>
                    @mateusz.malewski.10
                  </span>
                  <span className="text-[9px] opacity-70" style={{ fontFamily: fonts.body }}>
                    137 obserwujących
                  </span>
                </span>
              </a>
              <div className="flex items-center gap-1" style={{ color: paleta.bordo }}>
                <MapPin className="w-3.5 h-3.5" />
                <span className="text-[11px]" style={{ fontFamily: fonts.body }}>
                  Białystok
                </span>
              </div>
            </div>

            {/* Miniaturowe CTA pod social media - mniejsza wersja tego z dołu sekcji */}
            <a
              href="/contact?tab=question"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium mt-2 cursor-pointer transition-transform hover:scale-105 active:scale-95 whitespace-nowrap select-none"
              style={{ backgroundColor: colors.black, color: colors.white, fontFamily: fonts.cta }}
            >
              Zapytaj o Matiego
              <ArrowRight size={11} />
            </a>
          </div>
        </div>

        {/* Karuzela pozioma z 3 filmikami - nagłówek "Portfolio Matiego" */}
        <div className="w-full">
          <p
            className="text-center text-sm font-bold uppercase tracking-[0.15em] mb-3"
            style={{ color: paleta.bordo, fontFamily: fonts.cta }}
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
        </div>

        {/* Pełnoekranowy podgląd filmiku - przykrywa CAŁĄ stronę (header, FastContact, chatbota). Tło ciemne
            i NIEklikalne (kliknięcie w tło nic nie robi - zamyka tylko X). Bez natywnego "controls". Własne
            przyciski: play/pauza i mute. Identycznie jak u Magdy. */}
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
              {FILMY_MATIEGO[otwartyFilm].marka}
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
      </div>
    </section>
  );
}
