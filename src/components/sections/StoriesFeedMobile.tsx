'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Instagram } from 'lucide-react';

// Ten sam mechanizm co na podstronie /blog (InstagramFeedSection) - endpoint
// /api/instagram odpytuje Graph API i cache'uje odpowiedz po stronie serwera.
type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

const ETYKIETY_TYPOW: Record<InstagramMedia['media_type'], string> = {
  IMAGE: 'Post',
  VIDEO: 'Reel',
  CAROUSEL_ALBUM: 'Karuzela',
};

const LIMIT_ZNAKOW_TYTULU = 70;

// Pierwsza linia opisu jako tytul karty, przyciety na granicy slowa
const budujemy_tytul = (caption?: string) => {
  const pierwszaLinia = (caption ?? '').split('\n')[0].trim();
  if (!pierwszaLinia) return 'Najnowszy materiał Whiteslope Studio';
  if (pierwszaLinia.length <= LIMIT_ZNAKOW_TYTULU) return pierwszaLinia;
  const uciety = pierwszaLinia.slice(0, LIMIT_ZNAKOW_TYTULU);
  const ostatniaSpacja = uciety.lastIndexOf(' ');
  return `${uciety.slice(0, ostatniaSpacja > 0 ? ostatniaSpacja : LIMIT_ZNAKOW_TYTULU).trimEnd()}...`;
};

const formatujemy_date = (timestamp: string) =>
  new Date(timestamp).toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export default function StoriesFeedMobile() {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [ladowanie, setLadowanie] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Dokladnie ten sam mechanizm co na /blog: zapytanie do wlasnego endpointu
  // po stronie klienta, dane leca dynamicznie z serwera przy kazdym wejsciu.
  useEffect(() => {
    fetch('/api/instagram')
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (payload?.success) setMedia(payload.data);
      })
      .catch(() => undefined)
      .finally(() => setLadowanie(false));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const firstCard = el.firstElementChild as HTMLElement | null;
      const cardStep = firstCard ? firstCard.offsetWidth + 16 : 296; // 16px = gap-4
      const index = Math.round(el.scrollLeft / cardStep);
      setActive(Math.min(media.length - 1, Math.max(0, index)));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [media.length]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (el && card) {
      el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
    }
  };

  // Po zakonczonym zapytaniu nadal brak danych (np. wygasly token) - chowamy sekcje
  if (!ladowanie && media.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-white pt-14 pb-14 px-6">
      {/* Logo sekcji zamiast naglowka tekstowego */}
      <div className="relative w-full h-[42px] mb-3">
        <Image
          src="/_resources/logos/WhiteslopeStories.webp"
          alt="Whiteslope Stories"
          fill
          sizes="240px"
          className="object-contain"
          priority={false}
        />
      </div>

      <p className="text-[14px] leading-relaxed text-zinc-600 font-medium text-center max-w-[340px] mx-auto mb-8">
        Kulisy projektów, nowe realizacje i to, co dzieje się u nas na bieżąco.
      </p>

      {/* Karuzela - ten sam mechanizm co w sekcji wideo i opiniach */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {/* Szkielet na czas zapytania do API - zeby sekcja nie migala pustka */}
        {ladowanie &&
          [0, 1, 2].map((index) => (
            <div
              key={`szkielet-${index}`}
              className="shrink-0 w-[260px] aspect-[3/4] snap-center rounded-2xl bg-zinc-100 animate-pulse"
            />
          ))}

        {media.map((item) => (
          <a
            key={item.id}
            href={item.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="relative shrink-0 w-[260px] aspect-[3/4] snap-center overflow-hidden rounded-2xl bg-zinc-900"
          >
            {/* Zdjecie z Instagrama - zwykly <img>, tak samo jak na /blog, zeby nie
                dodawac domen CDN Instagrama do konfiguracji next/image */}
            <img
              src={item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url}
              alt={budujemy_tytul(item.caption)}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            <div className="absolute inset-x-4 bottom-4 flex flex-col items-start">
              {/* Etykieta - firmowy niebieski, uppercase, male paddingi gora/dol */}
              <span className="inline-block px-2 py-[3px] rounded-[4px] bg-[#0070ff] text-white text-[10px] font-semibold uppercase tracking-wide mb-2">
                {ETYKIETY_TYPOW[item.media_type]}
              </span>

              <h3 className="text-white text-[15px] font-bold leading-[1.25] mb-1.5">
                {budujemy_tytul(item.caption)}
              </h3>

              <div className="flex items-center gap-2 text-white/70 text-[11px]">
                <span>{formatujemy_date(item.timestamp)}</span>
                <span className="w-[3px] h-[3px] rounded-full bg-white/40" />
                <span className="inline-flex items-center gap-1">
                  <Instagram className="w-[12px] h-[12px]" />
                  Instagram
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Kropki nawigacyjne */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {media.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Przejdź do materiału ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === active ? 'w-6 bg-[#0070ff]' : 'w-1.5 bg-zinc-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
