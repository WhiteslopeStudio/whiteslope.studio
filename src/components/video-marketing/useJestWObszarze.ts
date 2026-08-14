'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Zwraca true dopiero gdy podany element (przekazany przez ref) wejdzie w pole widzenia - np. gdy
 * użytkownik doscrolluje do niego. Raz ustawione na true zostaje takie już na zawsze (nie chowa się
 * z powrotem), żeby raz uruchomiony filmik się nie zatrzymywał.
 *
 * Używane do leniwego montowania filmików (<video><source .../></video>) - dzięki temu przeglądarka
 * NIE pobiera wszystkich filmów na stronie od razu przy wejściu na nią, tylko dopiero wtedy, gdy dana
 * sekcja faktycznie zbliża się do widoku.
 */
export function useJestWObszarze(ref: RefObject<HTMLElement | null>, margines: string = '600px'): boolean {
  const [widoczny, setWidoczny] = useState(false);

  useEffect(() => {
    if (widoczny) return;
    const element = ref.current;
    if (!element) return;

    const obserwator = new IntersectionObserver(
      (wpisy) => {
        if (wpisy[0]?.isIntersecting) {
          setWidoczny(true);
          obserwator.disconnect();
        }
      },
      { rootMargin: margines }
    );

    obserwator.observe(element);
    return () => obserwator.disconnect();
  }, [ref, margines, widoczny]);

  return widoczny;
}
