'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Gift } from 'lucide-react';

// Strona, na którą prowadzi pasek - tam samego paska już nie pokazujemy
const DOCELOWA_PODSTRONA = '/darmowy-projekt';

export default function PromoBar() {
  const pathname = usePathname();

  if (pathname === DOCELOWA_PODSTRONA) return null;

  return (
    // W normalnym flow strony (nie w fixed headerze) - zajmuje własne miejsce na samej
    // górze i wyjeżdża wraz ze scrollem, więc nic nie zasłania.
    <div id="promo-bar" className="relative z-[60] w-full bg-[#0070ff]">
      <Link href={DOCELOWA_PODSTRONA} className="block px-10 sm:px-16 py-2.5 text-center group">
        {/* Twardy podział linii przed "przed" (tylko na mobile) + ciasny leading,
            żeby obie linie trzymały się blisko siebie. Strzałka w tym samym bloku
            tekstu, żeby szła tuż za wykrzyknikiem. */}
        <span className="block text-white font-semibold text-[12px] sm:text-[13px] leading-[1.25]">
          {/* Ikona prezentu z lucide (czysty SVG, nie emoji) */}
          <Gift className="inline-block align-[-2px] mr-1.5 w-[14px] h-[14px]" aria-hidden />
          Odbierz bezpłatną wizualizację strony
          <br className="sm:hidden" />{' '}
          przed decyzją o zakupie!
          <ArrowRight className="inline-block align-[-2px] ml-1.5 w-[14px] h-[14px] transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </Link>
    </div>
  );
}
