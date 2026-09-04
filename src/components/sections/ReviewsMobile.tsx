'use client';

import { useEffect, useRef, useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

type Review = {
  id: number;
  name: string;
  company: string;
  text: string;
  link: string;
  avatarUrl: string;
  projectImage: string;
};

const REVIEWS: Review[] = [
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
    text: 'Zupełnie inna jakość. Strona jest bardzo estetyczna. Jestem pod wrażeniem!',
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
    <section className="relative w-full overflow-hidden bg-[#0070ff] pt-14 pb-14 px-6">
      <h2 className="hero-mobile-h1 mb-3 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight max-w-[380px] text-balance">
        Zobacz, komu ostatnio poprawiliśmy dzień
      </h2>

      <div className="flex items-center gap-1 mb-8">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-[16px] h-[16px] text-yellow-400 fill-yellow-400" />
        ))}
        <span className="ml-1.5 text-[15px] font-semibold text-white">5.0</span>
        <span className="ml-1.5 text-[13px] text-white/70">średnia ocen</span>
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
            {/* Zdjęcie realizacji - wizualny dowód, zajmuje górę karty */}
            <div className="relative w-full aspect-[4/3] bg-zinc-100">
              <Image
                src={review.projectImage}
                alt={`Realizacja: ${review.company}`}
                fill
                sizes="280px"
                className="object-cover"
              />
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
                <Image
                  src={review.avatarUrl}
                  alt={review.name}
                  width={36}
                  height={36}
                  className="w-[36px] h-[36px] rounded-full object-cover shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[13px] font-semibold text-zinc-950 leading-tight truncate">
                    {review.name}
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
                Zobacz realizację
                <ArrowRight className="w-[15px] h-[15px] ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Kropki nawigacyjne - podciągnięte ujemnym marginesem, bo kontener karuzeli
          ma duży pb-12 zarezerwowany na cień kart */}
      <div className="flex items-center justify-center gap-2 -mt-5">
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
