'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazyMountProps {
  children: ReactNode;
  /**
   * Jak duzy "zapas" przed wejsciem w widok ma miec sekcja zanim zacznie sie
   * montowac. Duza wartosc (~800px) daje czas na zamontowanie i odpalenie
   * ciezkich efektow (gsap/locomotive-scroll/framer-motion) zanim uzytkownik
   * faktycznie tam doscrolluje - zero widocznego "pop-in", zero CLS.
   */
  rootMargin?: string;
}

// Montuje dziecko (i uruchamia caly jego JS - efekty, animacje) dopiero gdy
// zblizy sie do widoku, zamiast montowac wszystkie sekcje ponizej fold naraz
// zaraz po hydracji. Ten sam wzorzec (IntersectionObserver + disconnect po
// pierwszym trafieniu) juz sprawdzony w VideoShowcase.tsx dla lazy-load wideo.
//
// Powod: audyt Performance (16.07.2026) pokazal 4,6s czasu watku glownego na
// sam JS strony (Scripting: 5413ms vs Rendering 91ms, Painting 12ms) - caly
// ten koszt odpalal sie jedna salwa zaraz po starcie, blokujac malowanie LCP
// (zwyklego naglowka h1) mimo ze sam h1 nie potrzebuje zadnych zasobow.
export default function LazyMount({ children, rootMargin = '800px' }: LazyMountProps) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return <div ref={containerRef}>{inView ? children : null}</div>;
}
