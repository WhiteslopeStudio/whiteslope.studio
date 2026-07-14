'use client';

import { useEffect } from 'react';

// Google Analytics / Google Ads - ladowane dopiero po pierwszej interakcji uzytkownika
// (scroll, ruch myszki, dotyk, klawiatura), a nie od razu przy starcie strony.
// To odciaza watek glowny w krytycznym oknie pomiaru TBT (Lighthouse). Ma fallback
// timeout, zeby uzytkownicy czytajacy strone bez ruchu nadal zostali policzeni.
const GA_ID = 'G-W9WSGHNN17';
const GTM_ID = 'GT-5TGZZ2D8';
const INTERACTION_EVENTS = ['scroll', 'mousemove', 'touchstart', 'keydown'] as const;
const FALLBACK_DELAY_MS = 8000;

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export default function GtagLoader() {
  useEffect(() => {
    let loaded = false;
    let fallbackTimer: ReturnType<typeof setTimeout>;

    const removeListeners = () => {
      INTERACTION_EVENTS.forEach((event) => window.removeEventListener(event, loadGtag));
      clearTimeout(fallbackTimer);
    };

    function loadGtag() {
      if (loaded) return;
      loaded = true;
      removeListeners();

      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      script.async = true;
      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: unknown[]) {
          window.dataLayer!.push(args);
        }
        gtag('js', new Date());
        gtag('config', GA_ID);
        gtag('config', GTM_ID);
      };
      document.head.appendChild(script);
    }

    INTERACTION_EVENTS.forEach((event) =>
      window.addEventListener(event, loadGtag, { once: true, passive: true })
    );
    fallbackTimer = setTimeout(loadGtag, FALLBACK_DELAY_MS);

    return removeListeners;
  }, []);

  return null;
}
