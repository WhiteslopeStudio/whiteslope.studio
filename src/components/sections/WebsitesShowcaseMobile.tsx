'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function WebsitesShowcaseMobile() {
  return (
    <section id="websites" className="relative w-full overflow-hidden">
      {/* Gradient na całej karcie: jasny niebieski u góry, biały na dole (styl Apple) */}
      <div
        className="relative w-full flex flex-col items-start text-left px-6 pt-12"
        style={{ background: 'linear-gradient(180deg, #b8c3ff 0%, #ffffff 100%)' }}
      >
        {/* Nagłówek - dokładnie ten sam styl/rozmiar co H1 w Hero (klasa .hero-mobile-h1) */}
        <h2 className="hero-mobile-h1 mb-2 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-zinc-950 tracking-tight max-w-[380px] text-balance">
          Strony internetowe, systemy B2B i SaaS
        </h2>

        <p className="mb-4 text-[14px] leading-relaxed text-zinc-700 font-semibold max-w-[380px] text-balance">
          Tworzymy dedykowane rozwiązania cyfrowe, które skalują biznes. Od stron po systemy SaaS.
        </p>

        {/* CTA - ten sam styl pigułek co w Hero, do lewej. Główny: "Dowiedz się więcej", drugi: "Wycena" */}
        <div className="flex flex-wrap items-center justify-start gap-3">
          <Link
            href="/pricing/website"
            prefetch={false}
            className="px-5 py-2 bg-[#3561ff] text-white font-medium rounded-full flex items-center justify-center text-sm active:scale-95 whitespace-nowrap"
          >
            Dowiedz się więcej
          </Link>

          <Link
            href="/contact"
            prefetch={false}
            className="px-5 py-2 border border-[#3561ff] text-[#3561ff] font-medium rounded-full flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform whitespace-nowrap"
          >
            Wycena
          </Link>
        </div>

        {/* Grafika - od razu pod CTA (bez sztywnej wysokości sekcji, która robiła
             za dużo pustej przestrzeni), proporcje 16:9, sekcja kończy się zaraz
             pod obrazkiem (brak paddingu pod spodem). */}
        <div className="relative w-full mt-10 mb-10 aspect-[16/9]">
          <Image
            src="/_resources/stronyInternetowe/ShowWebsites.webp"
            alt="Przykłady stron internetowych Whiteslope"
            fill
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
