'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Wizytówka Google Whiteslope Studio
const LINK_WIZYTOWKA_GOOGLE = 'https://maps.app.goo.gl/ijbMhGdJGPKJ2xMZA';

// Kolorowe logo Google jako czysty SVG (brak takiej ikony w lucide-react)
const IkonaGoogle = ({ rozmiar = 'w-4 h-4' }: { rozmiar?: string }) => (
  <svg viewBox="0 0 48 48" className={`${rozmiar} shrink-0`} aria-hidden>
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

type Review = {
  id: number;
  name: string;
  company: string;
  text: string;
  link: string;
  avatarUrl?: string;
  projectImage?: string;
  // Logo zamiast zrzutu strony - wpisujemy je w kadr (object-contain na białym tle)
  obrazekToLogo?: boolean;
  zGoogle?: boolean;
};

const REVIEWS: Review[] = [
  {
    id: 0,
    name: 'Dariusz Kuciel',
    company: 'Lokalny przewodnik w Google',
    text: 'Dobre podejście do klienta. Szybko, sprawnie, elastycznie. Warto sprawdzić. Będę korzystał regularnie z usług.',
    link: LINK_WIZYTOWKA_GOOGLE,
    projectImage: '/_resources/logos/jawa_bialystok.webp',
    obrazekToLogo: true,
    zGoogle: true,
  },
  {
    id: 1,
    name: 'Sławek Wiesławski',
    company: 'Wiesławski Studio',
    text: 'Pierwsze zapytania od klientów pojawiły się bardzo szybko po starcie strony. Dobry i bezproblemowy kontakt.',
    link: 'https://www.wieslawski.studio',
    avatarUrl: '/_resources/reviews/slawekWieslawski.webp',
    projectImage: '/_resources/stronyInternetowe/WieslawskiStudio.webp',
  },
  {
    id: 2,
    name: 'Damian Bogdanowicz',
    company: 'Filmy i fotografia',
    text: 'Zupełnie inna jakość. Strona jest estetyczna. Jestem pod wrażeniem!',
    link: 'https://damian-bogdanowicz-site.vercel.app/',
    avatarUrl: '/_resources/reviews/damianBogdanowicz.webp',
    projectImage: '/_resources/stronyInternetowe/DamianBogdanowicz.webp',
  },
  {
    id: 3,
    name: 'Easylesson.app',
    company: 'Produkt SaaS',
    text: 'Stworzyliśmy produkt SaaS dla korepetytorów. Whiteslope wykonało stronę, dashboard i tablicę interaktywną. Wszystko działa świetnie! Na pewno wrócimy.',
    link: 'https://www.easylesson.app',
    avatarUrl: '/_resources/reviews/easylesson.webp',
    projectImage: '/_resources/stronyInternetowe/Easylesson.webp',
  },
];

// Twardy limit długości cytatu - dzięki temu karty mają zbliżoną wysokość
// niezależnie od tego, jak rozpisał się klient. Ucinamy na granicy słowa.
const LIMIT_ZNAKOW_OPINII = 110;

const skracamy_tekst = (tekst: string, limit: number) => {
  if (tekst.length <= limit) return tekst;
  const uciety = tekst.slice(0, limit);
  const ostatniaSpacja = uciety.lastIndexOf(' ');
  return `${uciety.slice(0, ostatniaSpacja > 0 ? ostatniaSpacja : limit).trimEnd()}...`;
};

// Warstwowy, miękki cień - kilka rozmytych warstw zamiast jednej czarnej plamy,
// żeby karta realnie "unosiła się" nad niebieskim tłem.
const CIEN_KARTY =
  '0 1px 2px rgba(10, 25, 70, 0.10), 0 4px 10px rgba(10, 25, 70, 0.10), 0 16px 32px rgba(10, 25, 70, 0.14)';

export default function ReviewsMobile() {
  // Ten sam mechanizm nawigacji co w karuzeli wideo: scroll-snap + kropki
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const firstCard = el.firstElementChild as HTMLElement | null;
      const cardStep = firstCard ? firstCard.offsetWidth + 16 : 296; // 16px = gap-4
      const index = Math.round(el.scrollLeft / cardStep);
      setActive(Math.min(REVIEWS.length - 1, Math.max(0, index)));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (el && card) {
      el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black pt-14 pb-14 px-6">
      <h2 className="hero-mobile-h1 mb-3 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight max-w-[380px] text-balance">
        Zobacz, komu ostatnio poprawiliśmy dzień
      </h2>

      <div className="flex items-center gap-1 mb-8">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-[16px] h-[16px] text-yellow-400 fill-yellow-400" />
        ))}
        <span className="ml-1.5 text-[15px] font-semibold text-white">5.0</span>
        <span className="ml-1.5 text-[13px] text-white/70">
          średnia ocen &middot; {REVIEWS.length} opinie
        </span>
      </div>

      {/* Karuzela - pasek przewijania ukryty przez arbitralne klasy Tailwind.
          Uwaga: overflow-x-auto wymusza przycinanie także w pionie, więc cień dołem
          był ucinany. Duży padding (pt-2 pb-12) daje mu miejsce wewnątrz kontenera. */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pt-2 pb-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="shrink-0 w-[280px] snap-center flex flex-col overflow-hidden rounded-[6px] bg-white"
            style={{ boxShadow: CIEN_KARTY }}
          >
            {/* Góra karty: zdjęcie realizacji, a dla opinii z Google - panel z logo */}
            <div
              className={`relative w-full aspect-[4/3] ${
                review.obrazekToLogo ? 'bg-white p-8' : 'bg-zinc-100'
              }`}
            >
              {review.projectImage ? (
                <Image
                  src={review.projectImage}
                  alt={`Realizacja: ${review.company}`}
                  fill
                  sizes="280px"
                  className={review.obrazekToLogo ? 'object-contain p-8' : 'object-cover'}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-50">
                  <IkonaGoogle rozmiar="w-9 h-9" />
                  <span className="text-[12px] font-semibold text-zinc-600">Opinia z Google</span>
                </div>
              )}
            </div>

            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-[12px] h-[12px] text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              <p className="text-[13px] text-zinc-700 leading-relaxed mb-3">
                &bdquo;{skracamy_tekst(review.text, LIMIT_ZNAKOW_OPINII)}&rdquo;
              </p>

              {/* Stopka karty - awatar, imię, firma i link do realizacji */}
              <div className="mt-auto pt-3 border-t border-zinc-100 flex items-center gap-3">
                {review.avatarUrl ? (
                  <Image
                    src={review.avatarUrl}
                    alt={review.name}
                    width={36}
                    height={36}
                    className="w-[36px] h-[36px] rounded-full object-cover shrink-0"
                  />
                ) : (
                  // Brak zdjęcia autora opinii z Google - inicjał zamiast pustego kółka
                  <span className="w-[36px] h-[36px] rounded-full bg-zinc-200 text-zinc-700 text-[14px] font-semibold flex items-center justify-center shrink-0">
                    {review.name.charAt(0)}
                  </span>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-semibold text-zinc-950 leading-tight truncate flex items-center gap-1.5">
                    {review.name}
                    {review.zGoogle && <IkonaGoogle rozmiar="w-3.5 h-3.5" />}
                  </span>
                  <span className="text-[11px] text-zinc-500 truncate">{review.company}</span>
                </div>
              </div>

              <Link
                href={review.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-[13px] font-medium text-[#0070ff] group"
              >
                {review.zGoogle ? 'Zobacz opinię w Google' : 'Zobacz realizację'}
                <ArrowRight className="w-[15px] h-[15px] ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Przycisk do wizytówki Google - wyśrodkowany, pod karuzelą opinii */}
      <div className="-mt-6 mb-6 flex justify-center">
        <a
          href={LINK_WIZYTOWKA_GOOGLE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-950 text-[13px] font-medium active:scale-95 transition-transform"
        >
          <IkonaGoogle />
          Zobacz opinie w Google
        </a>
      </div>

      {/* Kropki nawigacyjne */}
      <div className="flex items-center justify-center gap-2">
        {REVIEWS.map((review, index) => (
          <button
            key={review.id}
            type="button"
            aria-label={`Przejdź do opinii ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === active ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
