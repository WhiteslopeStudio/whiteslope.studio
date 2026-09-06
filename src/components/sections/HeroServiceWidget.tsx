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
      </div>
    </div>
  );
};

export default HeroServiceWidget;
