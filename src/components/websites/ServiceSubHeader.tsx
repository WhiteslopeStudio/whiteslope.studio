'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Props = {
  tytul: string;
  cena: string;
  ctaLabel: string;
  ctaHref: string;
  /** Po ilu pikselach scrolla pasek ma się pojawić (domyślnie wysokość Hero). */
  prog?: number;
};

/**
 * Pasek produktowy w stylu Apple - pojawia się dopiero po przewinięciu sekcji Hero.
 * Gdy jest widoczny, główny header i pasek promocyjny chowają się (przez atrybut
 * na <body>, obsługiwany w globals.css), żeby nie było dwóch belek naraz.
 */
export default function ServiceSubHeader({ tytul, cena, ctaLabel, ctaHref, prog = 600 }: Props) {
  const [widoczny, setWidoczny] = useState(false);

  useEffect(() => {
    const obsluguje_scroll = () => {
      setWidoczny(window.scrollY > prog);
    };

    obsluguje_scroll();
    window.addEventListener('scroll', obsluguje_scroll, { passive: true });
    return () => window.removeEventListener('scroll', obsluguje_scroll);
  }, [prog]);

  useEffect(() => {
    // Atrybut na <body> chowa główny header i topbar (reguła w globals.css)
    document.body.dataset.ukryjHeader = widoczny ? 'true' : 'false';

    return () => {
      delete document.body.dataset.ukryjHeader;
    };
  }, [widoczny]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[60] border-b border-white/10 bg-black/90 backdrop-blur-xl will-change-transform transition-[opacity,transform] duration-300 ease-out ${
        widoczny ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}
    >
      <div className="w-full max-w-[1640px] mx-auto px-6 md:px-12 py-3 flex items-center justify-between gap-4">
        <span className="text-[15px] md:text-[17px] font-semibold text-white tracking-tight truncate">
          {tytul}
        </span>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[12px] md:text-[14px] text-white/60 whitespace-nowrap">{cena}</span>

          <Link
            href={ctaHref}
            prefetch={false}
            className="px-4 py-1.5 bg-[#3561ff] text-white font-medium rounded-full text-[13px] md:text-sm active:scale-95 transition-transform whitespace-nowrap"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
