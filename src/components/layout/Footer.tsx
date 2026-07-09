'use client';

import {
  Mail,
  Phone,
  MapPin,
  Star,
  Instagram,
  Facebook,
  Youtube
} from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

// Uwaga: zakładam, że APP_CONFIG.phone to string z dwoma numerami rozdzielonymi
// przecinkiem, np. "+48 662 581 368, +48 731 721 760".
// Jeżeli u Ciebie to już tablica stringów, ten split() jest zbędny - wystarczy
// zamienić linię z .split(',') na samo APP_CONFIG.phone.map(...).

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const cities = [
    "Białystok", "Suwałki", "Łomża", "Augustów", "Bielsk Podlaski", "Grajewo", "Zambrów", "Hajnówka",
    "Sokółka", "Łapy", "Siemiatycze", "Wasilków", "Kolno", "Mońki", "Wysokie Mazowieckie"
  ];

  // Numery telefonu - rozbite po przecinku, każdy w osobnej linii
  const numeryTelefonow = APP_CONFIG.phone.split(',').map((numer) => numer.trim());

  // Pełna lista usług Web Development
  const uslugiWebDev = [
    { name: 'Strony internetowe', href: '/pricing/website' },
    { name: 'Aplikacje SaaS', href: '/pricing/website' },
    { name: 'Poprawki istniejących stron', href: '/pricing/website' },
    { name: 'Systemy do zarządzania firmą ERP', href: '/pricing/website' },
    { name: 'Pozycjonowanie SEO', href: '/pricing/website' }
  ];

  // Pełna lista usług Automatyzacja & AI (zgodna z menu mobilnym - nic nie ucięte)
  const uslugiAI = [
    { name: 'Chatbot AI - pomoc techniczna 24/7', href: '/pricing/ai-integration/chatbot' },
    { name: 'Chatbot AI - doradca e-commerce', href: '/pricing/ai-integration/chatbot' },
    { name: 'Chatbot AI - asystent ds. rezerwacji spotkań', href: '/pricing/ai-integration/chatbot' },
    { name: 'Obieg dokumentów i danych', href: '/pricing/ai-integration/chatbot' },
    { name: 'Zarządzanie leadami', href: '/pricing/ai-integration/chatbot' },
    { name: 'Integracje Systemów (API)', href: '/pricing/ai-integration/chatbot' }
  ];

  // Pełna lista usług Marketing & Video (zgodna z menu mobilnym)
  const uslugiMarketing = [
    { name: 'Email marketing', href: '/pricing/video-marketing' },
    { name: 'Video Marketing', href: '/pricing/video-marketing' },
    { name: 'Grafika 2D i 3D', href: '/pricing/video-marketing' },
    { name: 'Produkcja treści UGC', href: '/pricing/video-marketing' },
    { name: 'Obróbka i postprodukcja dźwięku', href: '/pricing/video-marketing' }
  ];

  const linkiMenu = [
    { name: 'Strona główna', href: '/' },
    { name: 'Realizacje', href: '/projects' },
    { name: 'Cennik', href: '/pricing' },
    { name: 'Aktualności', href: '/blog' },
    { name: 'Kontakt', href: '/contact' }
  ];

  // Social media - kolorowe tła marek, żeby ikonki było widać na ciemnym tle
  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/whiteslopestudio/',
      Icon: Instagram,
      bg: '#E1306C'
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61583927894860',
      Icon: Facebook,
      bg: '#3b5998'
    },
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@WhiteslopeStudio',
      Icon: Youtube,
      bg: '#FF0000'
    }
  ];

  return (
    <footer className="bg-[#050505] border-t border-white/5 relative overflow-hidden hidden md:block pt-20">

      {/* Subtelny glow z lewej strony */}
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

      {/* Kontener treści - Max szerokość 1640px (zgodnie z resztą strony) */}
      <div className="max-w-[1640px] mx-auto px-6 md:px-12 relative z-10">

        {/* --- GŁÓWNY UKŁAD (Logo/ocena + Kolumny) --- */}
        <div className="flex flex-row justify-center gap-12 lg:gap-16 pb-16">

          {/* Kolumna 1: Logo + ocena Google */}
          <div className="flex flex-col items-center shrink-0 pt-4">
            
            <Image
              src="/_resources/logoWhiteSlope.webp"
              alt="Whiteslope"
              width={180}
              height={60}
              // Zwiększona wysokość do 36px, żeby zrównoważyć brak kółka
              className="w-auto h-[36px] object-contain mb-6 opacity-100 mix-blend-plus-lighter"
              style={{ filter: 'brightness(0) invert(1)' }}
            />

            {/* Grupa z gwiazdkami wyrównana do lewej */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-white font-bold text-[18px] tracking-tight mt-1 text-right">5.0</span>
            </div>
            
          </div>

          {/* Kolumna 2: Nawigacja */}
          <div className="pt-4 flex-1 max-w-[200px]">
            <h4 className="text-[16px] text-white font-bold tracking-tight mb-6">Menu</h4>
            <ul className="space-y-4">
              {linkiMenu.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[15px] text-zinc-400 hover:text-white transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 3: Web Development - pełna lista, nic nie ucięte */}
          <div className="pt-4 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/_resources/logos/whiteslopeStudioLogoNiebieski_dzialWEBDEV.webp"
                alt="Web Development"
                width={100}
                height={30}
                className="h-[22px] w-auto opacity-90"
              />
            </div>
            <ul className="space-y-4">
              {uslugiWebDev.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[15px] text-zinc-400 hover:text-[#1a75ff] transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 4: AI - pełna lista (6 usług, tak jak w menu mobilnym) */}
          <div className="pt-4 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/_resources/logos/whiteslopeStudioLogoFioletowy_dzialAUTOMATION_AI.webp"
                alt="Automation AI"
                width={100}
                height={30}
                className="h-[22px] w-auto opacity-90"
              />
            </div>
            <ul className="space-y-4">
              {uslugiAI.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[15px] text-zinc-400 hover:text-purple-400 transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 5: Marketing - pełna lista (5 usług, tak jak w menu mobilnym) */}
          <div className="pt-4 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/_resources/logos/whiteslopeStudioLogoZolty_dzialAMARKETING.webp"
                alt="Marketing"
                width={100}
                height={30}
                className="h-[22px] w-auto opacity-90"
              />
            </div>
            <ul className="space-y-4">
              {uslugiMarketing.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[15px] text-zinc-400 hover:text-[#D4FF00] transition-colors duration-300">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolumna 6: Kontakt, social media i mapa */}
          <div className="pt-4 shrink-0 w-[260px]">
            <h4 className="text-[16px] text-white font-bold tracking-tight mb-6">Kontakt</h4>

            <div className="space-y-4 mb-6">
              <a href={`mailto:${APP_CONFIG.email}`} className="flex items-center group">
                <Mail className="w-5 h-5 text-zinc-500 mr-3 shrink-0 group-hover:text-[#1a75ff] transition-colors" />
                <span className="text-[15px] text-zinc-300 group-hover:text-white transition-colors">{APP_CONFIG.email}</span>
              </a>

              {/* Telefony - każdy numer w osobnej linii, żeby się nie łamały w połowie */}
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-zinc-500 mr-3 mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  {numeryTelefonow.map((numer) => (
                    <a
                      key={numer}
                      href={`tel:${numer.replace(/\s+/g, '')}`}
                      className="text-[15px] text-zinc-300 hover:text-white transition-colors"
                    >
                      {numer}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="w-5 h-5 text-zinc-500 mr-3 shrink-0" />
                <span className="text-[15px] text-zinc-300">Białystok,<br /> Działamy zdalnie</span>
              </div>
            </div>

            {/* Social media - kolorowe tła marek, więc są dobrze widoczne na czarnym tle */}
            <div className="flex items-center gap-3 mb-6">
              {socialLinks.map(({ name, href, Icon, bg }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] hover:scale-110 hover:brightness-110 transition-all duration-300 active:scale-95"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Mapa Google z zaznaczonym Białymstokiem */}
            <div className="rounded-[16px] overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps?q=Bia%C5%82ystok,Polska&output=embed"
                width="100%"
                height="140"
                style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(0.9)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Whiteslope Studio - lokalizacja Białystok"
              />
            </div>
          </div>

        </div>

        {/* --- LOKALIZACJE --- */}
        <div className="flex flex-col border-t border-white/10 pt-8 pb-10">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 max-w-5xl mx-auto">
            <span className="text-[13px] text-zinc-500 w-full text-center mb-1">Obsługujemy miasta:</span>
            {cities.map((city) => (
              <span key={city} className="text-[13px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-default">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* --- GIGANTYCZNY NAPIS I COPYRIGHT (Pełna szerokość) --- */}
      <div className="w-full relative">
        <div className="absolute top-[-30px] left-0 w-full px-6 flex justify-between text-[13px] text-zinc-500 z-20">
          <span>© {currentYear} {APP_CONFIG.name}. Wszystkie prawa zastrzeżone.</span>
          <Link href="/privacy&cookies/privacyPolicy" className="hover:text-zinc-300 transition-colors">Polityka prywatności</Link>
        </div>

        <div className="w-full overflow-hidden pointer-events-none select-none flex justify-center">
          <h1 className="text-[19vw] font-black text-white/10 leading-[0.70] tracking-tighter text-center m-0 p-0 transform translate-y-[8%]">
            WHITESLOPE
          </h1>
        </div>
      </div>

    </footer>
  );
}