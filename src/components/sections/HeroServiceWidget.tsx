'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check } from 'lucide-react';

type ServiceOption = {
  id: string;
  label: string;
};

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: 'strony', label: 'Strony internetowe' },
  { id: 'saas', label: 'Aplikacje SaaS' },
  { id: 'poprawki', label: 'Poprawki stron' },
  { id: 'seo', label: 'SEO' },
  { id: 'automatyzacja', label: 'Automatyzacja AI' },
  { id: 'chatbot', label: 'Chatbot' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'ugc', label: 'UGC' },
];

// Te same pliki co w LogoTicker - to gotowe, białe wersje logotypów (bez filtrów
// typu invert, które wcześniej robiły z nich białe kwadraty). Tutaj tylko
// wyszarzone i półprzezroczyste, w siatce po 2 na wiersz.
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

const PARTNER_LOGOS = [
  { name: 'Wiesławski Studio', url: '/_resources/grafika/wieslawski studio logo biale.webp', w: 1280, h: 213, tweak: '' },
  { name: 'Easylesson', url: '/_resources/grafika/LogoEasyLessonWhite.webp', w: 256, h: 58, tweak: '' },
  // Duokorki ma sporo pustego marginesu po bokach - lekko zmniejszone i przesunięte w prawo
  { name: 'Duo Korki', url: '/_resources/logos/logo_duokorki_White.webp', w: 6000, h: 2000, tweak: 'scale-90 translate-x-2' },
  { name: 'Jawa Białystok', url: '/_resources/logos/jawa_bialystok.webp', w: 256, h: 58, tweak: '' },
  // Logo pionowe (700x1000) - przy tej samej wysokości boxa wygląda drobniej, stąd powiększenie
  { name: 'Damian Bogdanowicz', url: '/_resources/logos/damianLogo.webp', w: 700, h: 1000, tweak: 'scale-125' },
];

export const HeroServiceWidget = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Uwaga: /contact obecnie nie czyta parametru "service" z URL (logika prefillu
  // jest tam zakomentowana w kodzie) - link działa i prowadzi na kontakt, ale
  // wybór na razie nie wypełnia automatycznie formularza. Do dopięcia osobno.
  const ctaHref =
    selected.length > 0 ? `/contact?service=${selected.join(',')}` : '/contact';

  return (
    // Brak kontenera/karty - blok leży bezpośrednio na czarnym tle sekcji Hero
    <div className="relative z-10 w-full bg-black px-6 pt-16 pb-12">
      <div className="w-full max-w-[420px] mx-auto">
        {/* Nagłówek do lewej, ta sama rodzina stylu co H1/H2 na stronie.
            Podkreślenie pod słowem "pomóc" borderem w kolorze akcentu. */}
        <h2 className="hero-mobile-h1 mb-6 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight text-left">
          W czym możemy Ci{' '}
          {/* Samo słowo w kolorze akcentu + cienka linia tuż pod literami.
              skip-ink wyłączony, żeby linia nie urywała się na ogonku "p". */}
          <span className="text-white underline decoration-[#0070ff] decoration-[2px] underline-offset-[3px] [text-decoration-skip-ink:none]">
            pomóc?
          </span>
        </h2>

        {/* Siatka jak tabela danych: brak ramek wokół opcji, tylko cienkie linie
            podziału - pionowa na środku (border-r w lewej kolumnie) i poziome
            między wierszami (border-b). Zero zaokrągleń. */}
        <div className="grid grid-cols-2 border-t border-x border-white/10 mb-8">
          {SERVICE_OPTIONS.map((option, index) => {
            const isActive = selected.includes(option.id);
            const isLeftColumn = index % 2 === 0;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleService(option.id)}
                aria-pressed={isActive}
                className={`flex items-center gap-2.5 px-3 py-4 text-left border-b border-white/10 transition-colors duration-300 ${
                  isLeftColumn ? 'border-r border-white/10' : ''
                } ${isActive ? 'bg-[#0070ff]/10 text-white' : 'bg-transparent text-white/60'}`}
              >
                <span
                  className={`shrink-0 flex items-center justify-center w-[17px] h-[17px] rounded-[4px] border transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#0070ff] border-[#0070ff]'
                      : 'bg-transparent border-white/25'
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                </span>

                <span className="text-[13px] font-medium leading-snug">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA - wyśrodkowane, jasne, naturalny padding jak w przyciskach Hero */}
        <div className="flex justify-center">
          <Link
            href={ctaHref}
            prefetch={false}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-normal rounded-full text-sm active:scale-95 transition-transform whitespace-nowrap"
          >
            {selected.length > 0 ? `Zacznijmy (${selected.length})` : 'Zacznijmy'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pas logotypów - siatka 2 na wiersz. Każde logo dostaje własny box o stałej
            wysokości, a samo zdjęcie jest wpisywane w niego przez object-contain, więc
            oryginalne proporcje są zawsze zachowane (żadnego ściskania). */}
        <div className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 items-center">
          {PARTNER_LOGOS.map((logo) => (
            // Przy nieparzystej liczbie logotypów ostatnie zajmuje całą szerokość, żeby nie wisiało samo z lewej
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

        {/* Wizytówka Google - pod pasem logotypów */}
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
      </div>
    </div>
  );
};

export default HeroServiceWidget;
