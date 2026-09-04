'use client';

import { Mail, Phone, Instagram, Facebook, Youtube, MapPin } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';

// Miasta zostaja dla lokalnego SEO, ale jako jedna, dyskretna linia tekstu
// zamiast wczesniejszej chmury "pigulek".
const MIASTA = [
  'Białystok', 'Suwałki', 'Łomża', 'Augustów', 'Bielsk Podlaski', 'Grajewo', 'Zambrów',
  'Hajnówka', 'Sokółka', 'Łapy', 'Siemiatycze', 'Wasilków', 'Kolno', 'Mońki', 'Wysokie Mazowieckie',
];

const KOLUMNA_FIRMA = [
  { name: 'Strona główna', href: '/' },
  { name: 'Realizacje', href: '/projects' },
  { name: 'Cennik', href: '/pricing' },
  { name: 'Aktualności', href: '/blog' },
  { name: 'Kontakt', href: '/contact' },
];

const KOLUMNA_USLUGI = [
  { name: 'Strony internetowe', href: '/pricing/website' },
  { name: 'Aplikacje SaaS', href: '/pricing/website' },
  { name: 'Pozycjonowanie SEO', href: '/pricing/website' },
  { name: 'Automatyzacja AI', href: '/pricing/ai-integration/chatbot' },
  { name: 'Chatboty AI', href: '/pricing/ai-integration/chatbot' },
  { name: 'Video marketing i UGC', href: '/pricing/video-marketing' },
];

const SOCIALE = [
  { name: 'Instagram', href: 'https://www.instagram.com/whiteslopestudio/', Icon: Instagram },
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61583927894860', Icon: Facebook },
  { name: 'YouTube', href: 'https://www.youtube.com/@WhiteslopeStudio', Icon: Youtube },
];

export default function FooterMobile() {
  const currentYear = new Date().getFullYear();

  const numeryTelefonow = APP_CONFIG.phone.split(',').map((numer) => numer.trim());

  return (
    <footer className="md:hidden relative w-full bg-black border-t border-white/10 px-6 pt-14 pb-8">

      {/* --- MARKA: jedno logo i jedno zdanie opisu --- */}
      <Image
        src="/_resources/logoWhiteSlope.webp"
        alt={APP_CONFIG.name}
        width={180}
        height={60}
        className="w-auto h-[28px] object-contain object-left mb-4"
        style={{ filter: 'brightness(0) invert(1)' }}
      />

      <p className="text-[14px] leading-relaxed text-white/50 max-w-[340px] mb-8 text-balance">
        Strony, aplikacje i automatyzacje dla firm. Projektujemy, wdrażamy i utrzymujemy.
      </p>

      {/* --- KONTAKT: ciemny glassmorphism, rounded-[6px] --- */}
      <div className="w-full rounded-[6px] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 mb-4">
        <a
          href={`mailto:${APP_CONFIG.email}`}
          className="flex items-center gap-3 text-[15px] text-white active:opacity-70 transition-opacity"
        >
          <Mail className="w-[18px] h-[18px] shrink-0 text-[#0070ff]" aria-hidden />
          <span className="break-all">{APP_CONFIG.email}</span>
        </a>

        <div className="w-full h-px bg-white/10 my-4" />

        <div className="flex items-start gap-3 text-[15px] text-white">
          <Phone className="w-[18px] h-[18px] shrink-0 mt-0.5 text-[#0070ff]" aria-hidden />
          <div className="flex flex-col gap-1.5">
            {numeryTelefonow.map((numer) => (
              <a
                key={numer}
                href={`tel:${numer.replace(/\s+/g, '')}`}
                className="active:opacity-70 transition-opacity"
              >
                {numer}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* --- LOKALIZACJA + MAPA W CIEMNYM STYLU --- */}
      <div className="flex items-center gap-2 text-[13px] text-white/50 mb-3">
        <MapPin className="w-4 h-4 text-white/40" aria-hidden />
        Białystok &middot; działamy zdalnie
      </div>

      <div className="w-full h-[120px] rounded-[6px] overflow-hidden border border-white/10 bg-white/[0.03] mb-10">
        {/* Mapa ładuje się sama, ale leniwie (loading="lazy") - iframe startuje dopiero
            gdy stopka zbliża się do widoku, więc nie obciąża startu strony.
            Google nie daje ciemnego stylu w embedzie, stąd odwrócenie kolorów filtrem. */}
        <iframe
          src="https://www.google.com/maps?q=Bia%C5%82ystok,Polska&output=embed"
          width="100%"
          height="100%"
          loading="lazy"
          style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(0.88) brightness(0.85)' }}
          referrerPolicy="no-referrer-when-downgrade"
          title="Whiteslope Studio - lokalizacja Białystok"
        />
      </div>

      {/* --- KOLUMNY Z LINKAMI --- */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 mb-10">
        <nav aria-label="Firma">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-white/40 mb-4">
            Firma
          </h3>
          <ul className="space-y-3">
            {KOLUMNA_FIRMA.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-[14px] text-white/60 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Usługi">
          <h3 className="text-[12px] font-semibold uppercase tracking-wide text-white/40 mb-4">
            Usługi
          </h3>
          <ul className="space-y-3">
            {KOLUMNA_USLUGI.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-[14px] text-white/60 hover:text-white transition-colors leading-snug block"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* --- SOCIAL MEDIA: stonowane obrysy zamiast kolorowych kół --- */}
      <div className="flex items-center gap-3 mb-10">
        {SOCIALE.map(({ name, href, Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={name}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white transition-colors active:scale-95"
          >
            <Icon className="w-[17px] h-[17px]" aria-hidden />
          </a>
        ))}
      </div>

      {/* --- MIASTA: jedna dyskretna linia, zachowana pod lokalne SEO --- */}
      <p className="text-[11px] leading-relaxed text-white/25 mb-8">
        Obsługujemy: {MIASTA.join(' · ')}
      </p>

      {/* --- DÓŁ: cienka linia i copyright --- */}
      <div className="pt-6 border-t border-white/10 flex flex-col gap-2">
        <Link
          href="/privacy&cookies/privacyPolicy"
          className="text-[12px] text-white/40 hover:text-white transition-colors w-max"
        >
          Polityka prywatności
        </Link>
        <p className="text-[12px] text-white/40">
          &copy; {currentYear} {APP_CONFIG.name}. Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
