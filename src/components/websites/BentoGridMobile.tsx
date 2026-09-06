'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

type Usluga = {
  id: string;
  label: string;
  opis: string;
};

// Ten sam zestaw usług co w widgecie w Hero na stronie głównej
const USLUGI: Usluga[] = [
  { id: 'strony', label: 'Strony internetowe', opis: 'Wizytówki i strony firmowe' },
  { id: 'saas', label: 'Aplikacje SaaS', opis: 'Produkty, panele, systemy' },
  { id: 'poprawki', label: 'Poprawki stron', opis: 'Audyt i przyspieszanie' },
  { id: 'seo', label: 'SEO', opis: 'Widoczność w Google' },
  { id: 'systemy', label: 'Dedykowane systemy', opis: 'CRM, ERP, automatyzacje' },
];

// Białe wersje logotypów - te same pliki co w LogoTicker i w Hero na stronie głównej
const LOGOTYPY = [
  { name: 'Wiesławski Studio', url: '/_resources/grafika/wieslawski studio logo biale.webp', tweak: '' },
  { name: 'Easylesson', url: '/_resources/grafika/LogoEasyLessonWhite.webp', tweak: '' },
  { name: 'Duo Korki', url: '/_resources/logos/logo_duokorki_White.webp', tweak: 'scale-90 translate-x-2' },
  { name: 'Jawa Białystok', url: '/_resources/logos/jawa_bialystok.webp', tweak: '' },
  // Logo pionowe (700x1000) - przy tej samej wysokości boxa wygląda drobniej
  { name: 'Damian Bogdanowicz', url: '/_resources/logos/damianLogo.webp', tweak: 'scale-125' },
];

// Wizytówka Google Whiteslope Studio
const LINK_WIZYTOWKA_GOOGLE = 'https://maps.app.goo.gl/ijbMhGdJGPKJ2xMZA';

// Kolorowe logo Google jako czysty SVG (brak takiej ikony w lucide-react)
const IkonaGoogle = () => (
  <svg viewBox="0 0 48 48" className="w-4 h-4 shrink-0" aria-hidden>
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
);

export default function BentoGridMobile() {
  const [wybrane, setWybrane] = useState<string[]>([]);

  const przelacza_usluge = (id: string) => {
    setWybrane((poprzednie) =>
      poprzednie.includes(id) ? poprzednie.filter((item) => item !== id) : [...poprzednie, id]
    );
  };

  // Uwaga: /contact nie czyta jeszcze parametru "service" z URL (logika prefillu
  // jest tam zakomentowana), więc wybór na razie nie wypełnia formularza.
  const ctaHref = wybrane.length > 0 ? `/contact?service=${wybrane.join(',')}` : '/contact';

  return (
    <section className="relative w-full overflow-hidden bg-black py-14 px-6">
      <h2 className="hero-mobile-h1 mb-2 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight max-w-[380px] text-balance">
        W czym możemy Ci{' '}
        <span className="text-white underline decoration-[#0070ff] decoration-[2px] underline-offset-[3px] [text-decoration-skip-ink:none]">
          pomóc?
        </span>
      </h2>

      <p className="mb-7 text-[14px] leading-relaxed text-white/60 max-w-[380px] text-balance">
        Zaznacz, co Cię interesuje - resztę ustalimy przy wycenie.
      </p>

      {/* Siatka kafelków - mechanika ta sama co w widgecie w Hero: klikalne
          checkboxy, aktywny kafelek podświetla się na firmowy niebieski. */}
      <div className="grid grid-cols-2 gap-3 mb-7">
        {USLUGI.map((usluga) => {
          const isActive = wybrane.includes(usluga.id);

          return (
            <button
              key={usluga.id}
              type="button"
              onClick={() => przelacza_usluge(usluga.id)}
              aria-pressed={isActive}
              className={`flex flex-col items-start text-left px-3.5 py-4 rounded-2xl border transition-all duration-300 ${
                isActive
                  ? 'bg-[#0070ff]/15 border-[#0070ff] text-white'
                  : 'bg-white/[0.03] border-white/10 text-white/70'
              }`}
            >
              <span
                className={`flex items-center justify-center w-[18px] h-[18px] rounded-[5px] border transition-colors duration-300 mb-3 ${
                  isActive ? 'bg-[#0070ff] border-[#0070ff]' : 'bg-transparent border-white/25'
                }`}
              >
                {isActive && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
              </span>

              <span className="text-[13px] font-semibold leading-snug">{usluga.label}</span>
              <span className="text-[11px] text-white/45 leading-snug mt-1">{usluga.opis}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-start gap-3">
        <Link
          href={ctaHref}
          prefetch={false}
          className="px-5 py-2 bg-[#3561ff] text-white font-medium rounded-full inline-flex items-center justify-center gap-2 text-sm active:scale-95 whitespace-nowrap"
        >
          {wybrane.length > 0 ? `Wyceń projekt (${wybrane.length})` : 'Wyceń projekt'}
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="#brief"
          prefetch={false}
          className="px-5 py-2 border border-[#3561ff] text-[#3561ff] font-medium rounded-full inline-flex items-center justify-center text-sm active:scale-95 transition-transform whitespace-nowrap"
        >
          Wypełnij brief
        </Link>
      </div>

      {/* Marki, z którymi pracowaliśmy */}
      <p className="mt-12 mb-5 text-[12px] font-semibold uppercase tracking-wide text-white/40">
        Zaufali nam
      </p>

      <div className="grid grid-cols-2 gap-x-8 gap-y-10 items-center">
        {LOGOTYPY.map((logo) => (
          // Przy nieparzystej liczbie logotypów ostatnie zajmuje całą szerokość
          <div key={logo.name} className="relative w-full h-[46px] last:odd:col-span-2">
            <Image
              src={logo.url}
              alt={`Logo ${logo.name}`}
              fill
              sizes="170px"
              className={`object-contain grayscale ${logo.tweak}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
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
    </section>
  );
}
