'use client';

import { useId, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, X } from 'lucide-react';

export interface TrustReview {
  name: string;
  company: string;
  headline: string;
  text: string;
  rating: number;
  link?: string;
}

interface TrustOverlayProps {
  title?: string;
  score?: number;
  scoreLabel?: string;
  reviews?: TrustReview[];
  ctaHref?: string;
  ctaLabel?: string;
  accentLabel?: string;
}

const DEFAULT_REVIEWS: TrustReview[] = [
  {
    name: 'Sławek Wiesławski',
    company: 'Wiesławski Studio',
    headline: 'Szybkość działania jest świetna',
    text: 'Pierwsze zapytania od klientów pojawiły się bardzo szybko po starcie strony. Dobry i bezproblemowy kontakt.',
    rating: 5,
    link: 'https://wieslawski.studio',
  },
  {
    name: 'Damian Bogdanowicz',
    company: 'Filmy i fotografia',
    headline: 'Strona robi efekt WOW!',
    text: 'Zupełnie inna jakość. Strona jest estetyczna co przyciąga moich klientów. Jestem pod wrażeniem!',
    rating: 5,
    link: 'https://damian-bogdanowicz-site.vercel.app/',
  },
  {
    name: 'Easylesson.app',
    company: 'Produkt SaaS',
    headline: 'Nasz produkt SaaS dla korepetytorów działa świetnie!',
    text: 'Naszym celem było stworzenie produktu SaaS dla korepetytorów. Chłopaki z Whiteslope wykonali całą stronę, dashboard i tablice interaktywną na której uczniowie mogą rysować i pisać w czasie rzeczywistym. Wszystko działa świetnie! Na pewno będziemy wracać po więcej.',
    rating: 5,
    link: 'https://easylesson.app/',
  },
];

// Ta sama zielona ikonka gwiazdki, używana i na małej zakładce, i na górze dużego panelu.
// Kolor bierze się z "currentColor", więc ustawiamy go przez klasę text-*, np. text-green-500.
function TrustBadgeIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M10.917 6.575c-.155-.669-.287-1.235-.43-1.68l6.634 1.925c.044.013.158.063.315.476c.154.404.294.997.494 1.859l.12.516q.04.172.079.328l-6.012-1.666l-.304-.172c-.43-.245-.508-.302-.564-.38c-.062-.086-.099-.206-.22-.73zm3.425 3.412l5.008 1.387l.304.173c.706.403 1.183.676 1.493.924c.297.238.348.38.352.502c.005.127-.041.287-.327.573c-.294.295-.751.636-1.423 1.136l-.4.296c-.188.14-.359.266-.502.408l-6.805-1.974l.358-.266c.631-.469 1.15-.854 1.503-1.208c.367-.368.638-.783.618-1.316a1.4 1.4 0 0 0-.179-.635m-2.968 4.273l7.012 2.034q-.041.211-.077.457l-.081.527c-.077.5-.191.947-.312 1.325c-.213.665-.268.758-.428.85c-.068.04-.133.056-.269.041c-.166-.018-.379-.078-.742-.184l-5.794-1.68q.104-.222.171-.464c.145-.497.25-1.175.379-2.012l.075-.488c.027-.174.048-.305.066-.406"
        opacity=".5"
      />
      <path
        fill="currentColor"
        d="M7.406 6.073c.572-.639.964-1.074 1.28-1.338c.32-.266.425-.239.458-.23c.043.013.157.064.315.477c.154.404.293.997.494 1.858l.12.516c.093.403.17.738.364 1.008c.199.278.488.442.818.63l.064.035l.357.204c.707.403 1.183.676 1.493.924c.297.238.349.38.353.501c.005.128-.042.287-.327.574c-.294.295-.752.636-1.424 1.136l-.399.296c-.317.235-.584.433-.756.728c-.169.289-.22.627-.284 1.045l-.081.527c-.137.884-.232 1.496-.356 1.922c-.07.24-.137.373-.193.45c-.108-.04-.253-.1-.423-.181a6.5 6.5 0 0 1-1.517-1.022l-.312-.28l-.014-.013a7 7 0 0 0-.43-.37a1.4 1.4 0 0 0-.474-.25c-.324-.094-.659-.031-1.02.037l-.077.014l-.4.075c-.794.147-1.325.243-1.706.25c-.366.007-.443-.072-.484-.129c-.058-.08-.111-.236-.022-.674c.089-.436.289-1.017.58-1.857l.172-.497c.138-.4.25-.72.237-1.057c-.013-.34-.148-.646-.315-1.024l-.208-.47c-.35-.795-.591-1.343-.711-1.762c-.119-.415-.082-.583-.022-.685c.05-.085.139-.175.5-.22c.38-.047.915-.026 1.714.008l.404.017l.076.004c.367.016.703.03 1.015-.107c.303-.134.532-.39.795-.685l.055-.061z"
      />
    </svg>
  );
}

function Stars({ rating, className = '', size = 'h-4 w-4' }: { rating: number; className?: string; size?: string }) {
  const gradientBaseId = useId();

  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} z 5 gwiazdek`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          className={size} // <--- Tutaj wstawiamy zmienną size zamiast h-4 w-4
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${gradientBaseId}-${index}`} x1="14.5" x2="1.125" y1="14.332" y2="1.72" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff9500" />
              <stop offset="1" stopColor="#ffee05" />
            </linearGradient>
          </defs>
          <path
            d="M7.194 2.102a.9.9 0 0 1 1.614 0l1.521 3.082l3.401.494a.9.9 0 0 1 .5 1.535l-2.462 2.4l.581 3.387a.9.9 0 0 1-1.306.948L8.001 12.35l-3.042 1.6A.9.9 0 0 1 3.653 13l.58-3.387l-2.46-2.399a.9.9 0 0 1 .499-1.535l3.4-.494z"
            fill={index < rating ? `url(#${gradientBaseId}-${index})` : '#E5E7EB'}
          />
        </svg>
      ))}
    </div>
  );
}

export default function TrustOverlay({
  title = 'Opinie klientów',
  score = 5.0,
  scoreLabel = 'Trust score',
  reviews = DEFAULT_REVIEWS,
  ctaHref = '/contact',
  ctaLabel = 'Napisz do nas',
  accentLabel = 'SPRAWDŹ OPINIE',
}: TrustOverlayProps) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scoreText = useMemo(() => score.toFixed(1), [score]);

  // Funkcje obsługujące najechanie i zjechanie myszką
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150); // 150ms opóźnienia pozwala na płynne przesunięcie kursora z zakładki na panel
  };

  return (
    <>
      {/* ZAKŁADKA BOCZNA - Odświeżony wygląd w stylu TrustMate */}
      <button
        type="button"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setOpen(true)}
        className={`-ml-1 fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center gap-1 rounded-r-[7px] border border-l-0 border-gray-200 bg-white py-3 px-3 shadow-md transition-transform ${
            // Dodajemy klasy: hidden (domyślnie ukryty) oraz min-[1676px]:flex (pokazuje się dopiero od 1676px)
            open
            ? '-translate-x-full duration-300'
            : 'translate-x-0 duration-300 delay-150'
        } hidden min-[1676px]:flex`} // <--- TUTAJ DODAESZ TE DWIE KLASY
        aria-expanded={open}
      >
        {/* Obrócony napis 90 stopni (usunięto tracking-widest, dodano tracking-normal dla pewności) */}
        <div className="flex items-center text-[11px] font-bold text-gray-600 [writing-mode:vertical-lr] rotate-180 uppercase tracking-widest">
          {accentLabel}
        </div>

        <TrustBadgeIcon className="-mr-1 -mb-2 w-10 h-10 shrink-0 text-green-500" />

        {/* Ocena na grubo */}
        <div className="text-2xl font-bold text-gray-900 -mb-2">
          {scoreText}
        </div>
      </button>

      {/* Tło przyciemniające tylko dla mobile */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/5 transition-opacity md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* WŁAŚCIWY PANEL BOCZNY */}
      <aside
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed left-0 top-0 bottom-0 z-50 w-full max-w-[420px] border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Górna belka panelu */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-gray-50/50 p-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <TrustBadgeIcon className="w-12 h-12 shrink-0 text-green-500" />
              <span className="text-4xl font-bold text-gray-900">{scoreText}</span>
            </div>
            <div className="mt-2 text-yellow-400">
                <Stars rating={5} size="h-6 w-6" />
            </div>
            <div className="text-sm font-medium text-gray-500 mt-2">
              na podstawie {reviews.length} opinii
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors self-start"
            aria-label="Zamknij panel"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Lista opinii (scrollowana) */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-8">
            {reviews.map((review, index) => (
              <div
                key={`${review.name}-${index}`}
                className="border-b border-gray-100 pb-8 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="font-bold text-gray-900 text-lg">{review.name}</div>
                  <Stars rating={review.rating} />
                </div>

                <h4 className="mt-3 font-semibold text-gray-800">
                  {review.headline}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {review.text}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-gray-400 font-medium">{review.company}</span>
                  {review.link && (
                    <a
                      href={review.link}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-blue-600 hover:underline hover:text-blue-700"
                    >
                      Zobacz realizację
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}