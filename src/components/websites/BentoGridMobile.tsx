'use client';

import Image from 'next/image';

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

/**
 * Pas marek, z którymi pracowaliśmy, plus przejście do wizytówki Google.
 * Sekcja z wyborem usług została stąd usunięta - ten sam widget jest już w Hero
 * na stronie głównej, a tutaj wystarczy dowód społeczny.
 */
export default function BentoGridMobile() {
  return (
    <section className="relative w-full overflow-hidden bg-black pt-4 pb-14 px-6">
      <p className="mb-6 text-[12px] font-semibold uppercase tracking-wide text-white/40">
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
