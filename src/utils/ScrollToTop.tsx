'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Odpalamy to z minimalnym opóźnieniem, żeby Next.js zdążył przemielić stronę
    const handleScroll = () => {
      // Sprawdzamy, czy adres URL zawiera hash (np. #sekcja-kontakt)
      // Jeśli NIE zawiera hasha, przewijamy na samą górę
      if (!window.location.hash) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant', // Używamy 'instant', żeby uniknąć skakania ekranu ('smooth' dałoby powolny zjazd na górę)
        });
      }
    };

    // setTimeout rozwiązuje częsty problem z Next.js, gdzie DOM renderuje się ułamek sekundy po zmianie pathname
    const timeoutId = setTimeout(handleScroll, 10);
    
    return () => clearTimeout(timeoutId);
  }, [pathname]); // Nasłuchujemy zmiany 'pathname' (czyli przejścia na inną podstronę)

  return null;
}