'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Instagram, MapPin, ArrowRight, Volume2, VolumeX, Info } from 'lucide-react';
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

// Paleta z jej marki osobistej - tło i napis to dwa bardzo bliskie odcienie różu (efekt tone-on-tone).
const paleta = {
  roz: '#ECC6CB',
  napis: '#EEC8CD',
  bordo: '#B8535F',
  tekst: '#3A1F24',
};

// Jej realizacje - prawdziwe pliki mp4, więc pełny rozmiar i bez overlayu TikToka
const FILMY_MAGDY = [
  { src: '/_resources/videoMarketing/magda/MAGDA_hoppa.mp4', marka: 'Hoppa' },
  { src: '/_resources/videoMarketing/magda/MAGDA_Chillberry1.mp4', marka: 'Chillberry' },
  { src: '/_resources/videoMarketing/magda/MAGDA_Chillberry2.mp4', marka: 'Chillberry' },
];

export default function CreatorSpotlightSection() {
  const sekcjaRef = useRef<HTMLDivElement>(null);
  const napisRef = useRef<HTMLDivElement>(null);
  const zalanieRef = useRef<HTMLDivElement>(null);
  const zdjecieRef = useRef<HTMLImageElement>(null);
  const tresciRef = useRef<HTMLDivElement>(null);
  const sygnetRef = useRef<HTMLImageElement>(null);
  const filmRef = useRef<HTMLDivElement>(null);
  const paskRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const strzalkaRef = useRef<HTMLDivElement>(null);
  const [aktywnyFilm, setAktywnyFilm] = useState(0);
  const [poprzedniFilm, setPoprzedniFilm] = useState<number | null>(null);
  const [kierunek, setKierunek] = useState<1 | -1>(1);
  const [wyciszony, setWyciszony] = useState(true);
  // Ref trzyma OSTATNI ZATWIERDZONY indeks - do porównań wewnątrz callbacku GSAP (nie może polegać na state z domknięcia)
  const indeksRef = useRef(0);

  // Filmiki (source) montują się dopiero jak sekcja wejdzie w pole widzenia - żeby przeglądarka nie
  // pobierała ich od razu przy wejściu na stronę, tylko dopiero jak użytkownik faktycznie do nich doscrolluje.
  const filmyZaladowane = useJestWObszarze(sekcjaRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (
      !sekcjaRef.current ||
      !napisRef.current ||
      !zalanieRef.current ||
      !zdjecieRef.current ||
      !tresciRef.current ||
      !sygnetRef.current ||
      !filmRef.current ||
      !paskRef.current ||
      !strzalkaRef.current ||
      !ctaRef.current
    ) {
      return;
    }

    const kontekst = gsap.context(() => {
      const vh = window.innerHeight;

      // Wszystkie momenty liczone w PIKSELACH scrolla od początku pinowania - łatwiej to poukładać po kolei
      const dlugoscAnimacji = vh * 1.2; // wjazd napisu + zoom + zalanie tła
      const pTrescStart = dlugoscAnimacji + vh * 0.15; // treść po prawej zaczyna wjeżdżać tuż po zalaniu
      const dlugoscTrescReveal = vh * 0.9; // ile scrolla zajmuje stagger głównych tekstów (MAGDA, opis, ikonki, lokalizacja, info)
      const dlugoscDelayStrzalki = vh * 0.2; // przerwa przed strzałką - skrócona, żeby "Sprawdź co stworzyła Magda" pojawiało się wcześniej
      const dlugoscStrzalki = vh * 0.35; // czas własnego pojawienia się strzałki
      const pFilmStart = pTrescStart + dlugoscTrescReveal + dlugoscDelayStrzalki + dlugoscStrzalki * 0.25; // filmik wjeżdża jeszcze wcześniej w trakcie pojawiania się strzałki
      const dlugoscFilmFadeIn = vh * 0.35;
      const pFilmWidoczny = pFilmStart + dlugoscFilmFadeIn; // od tego momentu liczymy, który filmik pokazać
      const dlugoscJednegoFilmu = vh * 0.65; // skrócone - mniej scrolla na każdy filmik, w tym na ostatni
      const pKoniecFilmow = pFilmWidoczny + dlugoscJednegoFilmu * FILMY_MAGDY.length;
      const bufor = vh * 0.25; // krótsza chwila spoczynku na ostatnim filmiku, zanim sekcja się odepnie

      const dlugoscCalkowita = pKoniecFilmow + bufor;
      const frakcjaAnimacji = dlugoscAnimacji / dlugoscCalkowita;
      const poz = (px: number) => px / dlugoscCalkowita; // pomocnicza konwersja piksele -> pozycja 0-1 na timeline

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sekcjaRef.current,
          start: 'top top',
          end: () => `+=${dlugoscCalkowita}`,
          scrub: 1,
          pin: true,
          // Jak sekcja znika z widoku (w dowolną stronę), filmik automatycznie się wycisza
          onLeave: () => setWyciszony(true),
          onLeaveBack: () => setWyciszony(true),
          onUpdate: (self) => {
            const scrolniete = self.progress * dlugoscCalkowita;
            const wFilmach = Math.max(0, scrolniete - pFilmWidoczny);
            const indeks = Math.min(FILMY_MAGDY.length - 1, Math.floor(wFilmach / dlugoscJednegoFilmu));
            if (indeks !== indeksRef.current) {
              setKierunek(indeks > indeksRef.current ? 1 : -1);
              setPoprzedniFilm(indeksRef.current);
              indeksRef.current = indeks;
              setAktywnyFilm(indeks);
            }

            // Czerwony pasek postępu na dole ekranu - jak na YouTube, pokazuje ile zostało do końca animacji
            if (paskRef.current) {
              paskRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Napis leci lekko w lewo i rośnie - cała ta faza mieści się w "dlugoscAnimacji"
      tl.fromTo(
        napisRef.current,
        { xPercent: 70, scale: 1 },
        { xPercent: -60, scale: 4.5, ease: 'none', duration: frakcjaAnimacji * 0.9 },
        0
      )
        // Zalanie wchodzi wcześniej niż poprzednio, żeby zdążyć zanim litery przestaną zasłaniać sekcję
        .to(
          zalanieRef.current,
          { opacity: 1, ease: 'none', duration: frakcjaAnimacji * 0.45 },
          frakcjaAnimacji * 0.45
        )
        // Sygnet w lewym górnym rogu pojawia się razem z różowym tłem
        .to(
          sygnetRef.current,
          { opacity: 1, ease: 'none', duration: frakcjaAnimacji * 0.45 },
          frakcjaAnimacji * 0.45
        )
        .to(napisRef.current, { opacity: 0, ease: 'none', duration: frakcjaAnimacji * 0.3 }, frakcjaAnimacji * 0.6)
        // Zdjęcie Magdy wjeżdża zaraz po tym jak tło jest już w pełni zalane
        .to(zdjecieRef.current, { opacity: 1, ease: 'none', duration: frakcjaAnimacji * 0.4 }, frakcjaAnimacji * 0.9)
        // Treść po prawej wjeżdża element po elemencie, z rozmyciem i lekkim odbiciem - "fancy".
        // CTA i strzałka wyłączone z tej grupy - mają własne, osobne animacje (patrz niżej).
        .fromTo(
          Array.from(tresciRef.current.children).filter(
            (el) => el !== ctaRef.current && el !== strzalkaRef.current
          ),
          { opacity: 0, y: 28, filter: 'blur(10px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'back.out(1.6)',
            duration: poz(dlugoscTrescReveal * 0.55),
            stagger: poz((dlugoscTrescReveal * 0.45) / 5),
          },
          poz(pTrescStart)
        )
        // CTA "Zapytaj o Magdę" - tylko fade, bez jazdy w górę, w tym samym miejscu w sekwencji co reszta
        .fromTo(
          ctaRef.current,
          { opacity: 0 },
          { opacity: 1, ease: 'power2.out', duration: poz(dlugoscTrescReveal * 0.3) },
          poz(pTrescStart) + poz((dlugoscTrescReveal * 0.45) / 5) * 3.5
        )
        // "Sprawdź co stworzyła Magda" - dopiero PO wyraźnej przerwie od końca reszty tekstów, nie liczy się do ich stagger
        .fromTo(
          strzalkaRef.current,
          { opacity: 0, y: 20, filter: 'blur(8px)' },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            ease: 'back.out(1.6)',
            duration: poz(dlugoscStrzalki),
          },
          poz(pTrescStart + dlugoscTrescReveal + dlugoscDelayStrzalki)
        )
        // Filmik wjeżdża dopiero PO tym jak wszystko - łącznie ze strzałką - skończyło się pokazywać
        .to(filmRef.current, { opacity: 1, ease: 'none', duration: poz(dlugoscFilmFadeIn) }, poz(pFilmStart))
        // Reszta scrolla (przełączanie filmików + bufor na końcu) - bez dodatkowej animacji tutaj, steruje nią onUpdate wyżej
        .to({}, { duration: 1 - poz(pFilmStart) }, poz(pFilmStart));
    }, sekcjaRef);

    return () => kontekst.revert();
  }, []);

  return (
    <section
      ref={sekcjaRef}
      id="magda"
      className="hidden min-[1550px]:flex relative w-full h-[100svh] overflow-hidden items-center justify-center"
      style={{
        backgroundColor: paleta.roz,
        backgroundImage: "url('/_resources/videoMarketing/magda/MagdaBG.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        ref={napisRef}
        className="absolute whitespace-nowrap select-none pointer-events-none"
        style={{
          fontFamily: '"Incised901", "Barlow Condensed", sans-serif',
          fontWeight: 900,
          color: paleta.napis,
          fontSize: 'clamp(333px, 60vw, 933px)',
          lineHeight: 1,
        }}
      >
        Magda
      </div>

      {/* Pełne zalanie sekcji - ten sam róż co napis, ale z teksturą papieru - nowe tło po dojechaniu animacji do końca */}
      <div
        ref={zalanieRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: paleta.napis,
          backgroundImage: "url('/_resources/videoMarketing/magda/SOLID_BG.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0,
        }}
      />

      {/* Sygnet w lewym górnym rogu - przekolorowany na czarno przez filter (obraz ma przezroczyste tło) */}
      <img
        ref={sygnetRef}
        src="/_resources/logos/sygnetBlue.webp"
        alt="Whiteslope Studio"
        className="absolute top-20 left-6 md:top-24 md:left-8 h-15 md:h-24 w-auto pointer-events-none z-20"
        style={{ opacity: 0, filter: 'brightness(0)' }}
      />

      {/* Zdjęcie Magdy - lewa strona, od dołu sekcji prawie do samej góry */}
      <img
        ref={zdjecieRef}
        src="/_resources/videoMarketing/magda/MAGDA_PERSON.webp"
        alt="Magda"
        className="absolute left-0 bottom-0 h-[92%] w-auto object-contain pointer-events-none z-20"
        style={{
          opacity: 0,
          // W wąskim oknie 1550-1679px Magda przesuwa się dodatkowo w lewo (częściowo poza kadr),
          // poza tym zakresem (mniej i więcej) zostaje na miejscu jak było - "puls" zrobiony przez
          // clamp+min, tak samo jak "górka" w pozycji tekstu wyżej.
          transform: 'translateX(calc(-1 * clamp(0px, min(100vw - 1550px, 1679px - 100vw) * 1000, 60px)))',
        }}
      />

      {/* Treść po prawej - zajmuje środkową część sekcji, prawa połowa zostaje wolna pod video */}
      <div
        ref={tresciRef}
        className="absolute top-1/2 -translate-y-1/2 w-[min(88%,460px)] xl:w-[560px] 2xl:w-[640px] flex flex-col items-start gap-3 xl:gap-4 z-20"
        style={{
          // "Górka" (trójkąt) zamiast rampy, która rosła w nieskończoność: poniżej 1550px i od 1900px
          // wzwyż - stałe 34% (dokładnie jak było wcześniej). Pomiędzy 1550 a 1900px - płynnie odsuwa się
          // w prawo (bo w tym zakresie filmik jest przyklejony do right-0, więc trzeba miejsca), a od 1900px
          // wraca do 34%, bo tam filmik znowu ma margines (right-[11%]) i tekst na starej pozycji już pasuje.
          left: 'calc(34% + max(0px, min(100vw - 1550px, 1900px - 100vw)) * 0.3)',
        }}
      >
        <h3
          className="text-3xl md:text-5xl xl:text-6xl 2xl:text-7xl"
          style={{ fontFamily: fonts.heading, fontWeight: 900, color: paleta.bordo }}
        >
          MAGDA
        </h3>

        <p
          className="text-base md:text-lg xl:text-xl 2xl:text-2xl leading-snug"
          style={{ fontFamily: fonts.body, color: paleta.tekst }}
        >
          Twórczyni UGC
          <br />i Content Creatorka
        </p>

        <p
          className="text-sm md:text-base xl:text-lg leading-relaxed max-w-sm xl:max-w-md"
          style={{ fontFamily: fonts.body, color: `${paleta.tekst}cc` }}
        >
          Magda to doskonała i komunikatywna osoba, która starannie podchodzi do każdego projektu. Zobaczcie sami →
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/magdajzkv/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: paleta.bordo }}
          >
            <Instagram className="w-6 h-6" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm xl:text-base" style={{ fontFamily: fonts.body }}>
                @magdajzkv
              </span>
              <span className="text-xs opacity-70" style={{ fontFamily: fonts.body }}>
                3203 obserwujących
              </span>
            </span>
          </a>
          <a
            href="https://www.tiktok.com/@magdajzkv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: paleta.bordo }}
          >
            <IkonaTikTok className="w-6 h-6" />
            <span className="flex flex-col leading-tight">
              <span className="text-sm xl:text-base" style={{ fontFamily: fonts.body }}>
                @magdajzkv
              </span>
              <span className="text-xs opacity-70" style={{ fontFamily: fonts.body }}>
                3281 obserwujących
              </span>
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" style={{ color: paleta.bordo }} />
          <span className="text-sm xl:text-base" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
            Legnica, Polska
          </span>
        </div>

        <a
          ref={ctaRef}
          href="/contact?tab=question"
          className={`${ctaSecondaryBaseClass} mt-2`}
          style={{ backgroundColor: colors.black, color: colors.white, border: `2px solid ${colors.black}`, fontFamily: fonts.cta }}
        >
          Zapytaj o Magdę
          <ArrowRight size={18} />
        </a>

        <div className="flex items-start gap-1.5 mt-4 max-w-[400px]">
          <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: paleta.tekst }} />
          <span className="text-xs leading-snug" style={{ fontFamily: fonts.body, color: paleta.tekst }}>
            Prezentowane materiały wideo powstały we współpracy z Magdą przed jej dołączeniem do zespołu Whiteslope
            Studio i są publikowane za jej zgodą.
          </span>
        </div>

        {/* Zachęta z krzywą strzałką wskazująca na filmiki po prawej - większa, animuje się jako ostatnia */}
        <div ref={strzalkaRef} className="flex items-center gap-3 mt-4">
          <span className="text-lg md:text-xl font-bold" style={{ fontFamily: fonts.body, color: paleta.bordo }}>
            Sprawdź, co stworzyła Magda
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

      {/* Filmik po prawej - pełna wysokość sekcji, wyśrodkowany między środkiem a prawą krawędzią, bez zaokrągleń i mockupów.
          Kolejny filmik wjeżdża od dołu i wypycha poprzedni do góry (jak w hero section wyżej). */}
      <div
        ref={filmRef}
        className="absolute right-0 min-[768px]:right-[1%] min-[1280px]:right-[8%] min-[1550px]:right-0 min-[1900px]:right-[5%] min-[2034px]:right-[11%] top-0 h-full aspect-[9/16] z-10 overflow-hidden bg-black"
        style={{ opacity: 0 }}
      >
        {/* Nagłówek "PORTFOLIO MAGDY" - gradient z ciemnego do przezroczystego. Odsunięty od góry, żeby nie chował się pod fixed headerem strony. */}
        <div
          className="absolute top-0 inset-x-0 h-36 md:h-40 z-30 pointer-events-none flex items-start justify-center pt-20 md:pt-24"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.55) 55%, transparent 100%)' }}
        >
          <span
            className="text-white text-sm md:text-base font-bold uppercase tracking-[0.2em]"
            style={{ fontFamily: fonts.cta }}
          >
            Portfolio Magdy
          </span>
        </div>

        {/* Ręcznie sterowane przejście (bez AnimatePresence) - stary i nowy filmik renderowane naraz w tym samym
            renderze, oba ze świeżo policzonym "kierunek" (1 = scroll w dół, -1 = scroll w górę), więc kierunek
            wjazdu/wyjazdu zawsze jest aktualny i zgodny z tym, w którą stronę użytkownik faktycznie scrolluje.
            Nowy wjeżdża w tym samym czasie co stary wyjeżdża - bez czarnej przerwy pomiędzy nimi. */}
        {poprzedniFilm !== null && (
          <motion.div
            key={`poprzedni-${poprzedniFilm}`}
            className="absolute inset-0"
            initial={{ y: 0 }}
            animate={{ y: kierunek === 1 ? '-100%' : '100%' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            onAnimationComplete={() => setPoprzedniFilm((biezacy) => (biezacy === poprzedniFilm ? null : biezacy))}
          >
            {filmyZaladowane && (
              <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
                <source src={FILMY_MAGDY[poprzedniFilm].src} type="video/mp4" />
              </video>
            )}
          </motion.div>
        )}

        <motion.div
          key={`aktualny-${aktywnyFilm}`}
          className="absolute inset-0"
          initial={{ y: kierunek === 1 ? '100%' : '-100%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
        >
          {filmyZaladowane && (
            <video
              autoPlay
              muted={wyciszony}
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={FILMY_MAGDY[aktywnyFilm].src} type="video/mp4" />
            </video>
          )}
        </motion.div>

        {/* Duży, rzucający się w oczy przycisk na środku - zachęca do odmutowania, znika po kliknięciu */}
        {wyciszony && (
          <button
            type="button"
            onClick={() => setWyciszony(false)}
            aria-label="Włącz dźwięk"
            className="absolute inset-0 z-25 flex items-center justify-center cursor-pointer group"
          >
            <span
              className="flex flex-col items-center gap-2 animate-pulse group-hover:scale-110 transition-transform"
            >
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

        {/* Dolny pasek - większy, bardziej zauważalny przycisk mute, a zaraz obok niego nazwa marki */}
        <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setWyciszony((poprzednio) => !poprzednio)}
            aria-label={wyciszony ? 'Włącz dźwięk' : 'Wycisz'}
            className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 active:scale-95 shrink-0"
            style={{ backgroundColor: 'rgba(0,0,0,0.65)' }}
          >
            {wyciszony ? (
              <VolumeX className="w-5 h-5 text-white" />
            ) : (
              <Volume2 className="w-5 h-5 text-white" />
            )}
          </button>

          <span
            className="h-12 px-4 rounded-full text-xs uppercase tracking-[0.1em] pointer-events-none flex items-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff', fontFamily: fonts.cta }}
          >
            {FILMY_MAGDY[aktywnyFilm].marka}
          </span>
        </div>
      </div>

      {/* Czerwony pasek postępu animacji, przyklejony do dołu ekranu - jak na YouTube */}
      <div className="absolute bottom-0 left-0 right-0 h-1 z-40 bg-white/20 pointer-events-none">
        <div ref={paskRef} className="h-full bg-red-600" style={{ width: '0%' }} />
      </div>
    </section>
  );
}
