'use client';

import {
  Mail,
  Phone,
  Star,
  Instagram,
  Facebook,
  Youtube,
  Plus,
  MapPin
} from "lucide-react";
import { APP_CONFIG } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function FooterMobile() {
  const currentYear = new Date().getFullYear();

  // Tablica miast
  const cities = [
    "Białystok", "Suwałki", "Łomża", "Augustów", "Bielsk Podlaski", "Grajewo", "Zambrów", "Hajnówka",
    "Sokółka", "Łapy", "Siemiatycze", "Wasilków", "Kolno", "Mońki", "Wysokie Mazowieckie"
  ];

  // Numery telefonu rozbite po przecinku
  const numeryTelefonow = APP_CONFIG.phone.split(',').map((numer) => numer.trim());

  const uslugiWebDev = [
    { name: 'Strony internetowe', href: '/pricing/website' },
    { name: 'Aplikacje SaaS', href: '/pricing/website' },
    { name: 'Poprawki istniejących stron', href: '/pricing/website' },
    { name: 'Systemy do zarządzania firmą ERP', href: '/pricing/website' },
    { name: 'Pozycjonowanie SEO', href: '/pricing/website' }
  ];

  const uslugiAI = [
    { name: 'Chatbot AI - pomoc techniczna 24/7', href: '/pricing/ai-integration/chatbot' },
    { name: 'Chatbot AI - doradca e-commerce', href: '/pricing/ai-integration/chatbot' },
    { name: 'Chatbot AI - asystent ds. rezerwacji spotkań', href: '/pricing/ai-integration/chatbot' },
    { name: 'Obieg dokumentów i danych', href: '/pricing/ai-integration/chatbot' },
    { name: 'Zarządzanie leadami', href: '/pricing/ai-integration/chatbot' },
    { name: 'Integracje Systemów (API)', href: '/pricing/ai-integration/chatbot' }
  ];

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
    <footer className="bg-[#050505] border-t border-white/5 flex flex-col pt-16 md:hidden overflow-hidden relative">

      {/* 1. Logo i ocena */}
      <div className="flex flex-col items-center justify-center mb-10 pt-4">
        
        <Image
          src="/_resources/logoWhiteSlope.webp"
          alt="Whiteslope"
          width={180}
          height={60}
          // Zwiększyłem wysokość do 36px, żeby logo było wyraźniejsze bez tła
          className="w-auto h-[36px] object-contain mb-4 opacity-100 mix-blend-plus-lighter"
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        
        {/* Kontener trzymający gwiazdki i ocenę razem */}
        <div className="flex flex-col items-center gap-1">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
          </div>
          <span className="text-white font-bold text-[18px] tracking-tight mt-1">5.0</span>
        </div>

      </div>

      <div className="px-6 flex flex-col items-center w-full mb-8">
        
        {/* Dane Kontaktowe (Mail + Telefony) */}
        <div className="flex flex-col w-full bg-white/5 rounded-[20px] p-5 gap-4 mb-6">
          <a href={`mailto:${APP_CONFIG.email}`} className="flex items-center gap-4 text-[15px] font-medium text-white active:opacity-70 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
               <Mail className="w-5 h-5 text-[#1a75ff]" />
            </div>
            <span className="break-all">{APP_CONFIG.email}</span>
          </a>
          
          <div className="w-full h-px bg-white/5" />
          
          <div className="flex items-start gap-4 text-[15px] font-medium text-white">
             <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#1a75ff]" />
             </div>
             <div className="flex flex-col gap-2 justify-center py-1">
                {numeryTelefonow.map((numer) => (
                    <a
                      key={numer}
                      href={`tel:${numer.replace(/\s+/g, '')}`}
                      className="hover:text-[#1a75ff] active:opacity-70 transition-opacity"
                    >
                      {numer}
                    </a>
                  ))}
             </div>
          </div>
        </div>
        
        {/* Mapa i Adres */}
         <div className="w-full flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[14px] font-medium text-zinc-400 px-2">
                <MapPin className="w-4 h-4 text-zinc-500" /> Białystok, Działamy zdalnie
            </div>
            
            <div className="w-full rounded-[16px] overflow-hidden border border-white/10 h-[120px]">
              <iframe
                src="https://www.google.com/maps?q=Bia%C5%82ystok,Polska&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(0.9)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Whiteslope Studio - lokalizacja Białystok"
              />
            </div>
         </div>
      </div>

      {/* 2. AKORDEONY */}
      <div className="px-6 py-2 border-y border-white/10">
        
        <details className="group border-b border-white/5 last:border-0">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[16px] font-bold text-white [&::-webkit-details-marker]:hidden">
            Menu
            <Plus className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-open:rotate-45 group-open:text-white" />
          </summary>
          <ul className="pb-5 space-y-4 pl-3 border-l border-white/10 ml-1">
            {linkiMenu.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-[15px] text-zinc-400">{item.name}</Link>
              </li>
            ))}
          </ul>
        </details>

        <details className="group border-b border-white/5 last:border-0">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[16px] font-bold text-white [&::-webkit-details-marker]:hidden">
             <Image 
                src="/_resources/logos/whiteslopeStudioLogoNiebieski_dzialWEBDEV.webp"
                alt="Web Development"
                width={120}
                height={24}
                className="h-[20px] w-auto opacity-90"
             />
            <Plus className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-open:rotate-45 group-open:text-[#1a75ff]" />
          </summary>
          <ul className="pb-5 space-y-4 pl-3 border-l border-blue-500/30 ml-1">
            {uslugiWebDev.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-[15px] text-zinc-400 leading-snug block">{item.name}</Link>
              </li>
            ))}
          </ul>
        </details>

        <details className="group border-b border-white/5 last:border-0">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[16px] font-bold text-white [&::-webkit-details-marker]:hidden">
             <Image 
                src="/_resources/logos/whiteslopeStudioLogoFioletowy_dzialAUTOMATION_AI.webp"
                alt="Automation AI"
                width={120}
                height={24}
                className="h-[20px] w-auto opacity-90"
             />
            <Plus className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-open:rotate-45 group-open:text-purple-400" />
          </summary>
          <ul className="pb-5 space-y-4 pl-3 border-l border-purple-500/30 ml-1">
            {uslugiAI.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-[15px] text-zinc-400 leading-snug block">{item.name}</Link>
              </li>
            ))}
          </ul>
        </details>

         <details className="group border-b border-white/5 last:border-0">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[16px] font-bold text-white [&::-webkit-details-marker]:hidden">
             <Image 
                src="/_resources/logos/whiteslopeStudioLogoZolty_dzialAMARKETING.webp"
                alt="Marketing"
                width={120}
                height={24}
                className="h-[20px] w-auto opacity-90"
             />
            <Plus className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-open:rotate-45 group-open:text-[#D4FF00]" />
          </summary>
          <ul className="pb-5 space-y-4 pl-3 border-l border-[#D4FF00]/30 ml-1">
            {uslugiMarketing.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-[15px] text-zinc-400 leading-snug block">{item.name}</Link>
              </li>
            ))}
          </ul>
        </details>
        
        <details className="group border-b border-white/5 last:border-0">
          <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[16px] font-bold text-zinc-400 [&::-webkit-details-marker]:hidden">
             Obsługiwane miasta (Lokalnie)
            <Plus className="h-4 w-4 text-zinc-500 transition-transform duration-300 group-open:rotate-45 group-open:text-white" />
          </summary>
          <div className="pb-5 flex flex-wrap gap-2 pt-2">
            {cities.map((city) => (
              <span key={city} className="text-[12px] text-zinc-500 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full">
                {city}
              </span>
            ))}
          </div>
        </details>

      </div>

      {/* 3. DÓŁ (Socials, Links & Copy) */}
      <div className="pt-10 flex flex-col items-center gap-6 px-6 relative z-20 pb-4">
        <div className="flex items-center gap-4">
           {socialLinks.map(({ name, href, Icon, bg }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] active:scale-95 transition-all"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
        </div>
        
        <div className="text-[13px] text-zinc-500 text-center flex flex-col gap-3">
           <Link href="/privacy&cookies/privacyPolicy" className="underline underline-offset-4 active:text-white transition-colors">Polityka prywatności</Link>
          <span>© {currentYear} {APP_CONFIG.name}.<br/> Wszystkie prawa zastrzeżone.</span>
        </div>
      </div>

      {/* --- GIGANTYCZNY NAPIS NA DOLE --- */}
      <div className="w-full flex justify-center overflow-hidden pointer-events-none select-none mt-2 leading-[0.70]">
        {/* Jasność tekstu zmieniona na text-white/5, żeby nie dominował na mobile tak bardzo */}
        <h1 className="text-[25vw] font-black text-white/5 tracking-tighter text-center whitespace-nowrap transform translate-y-[10%]">
          WHITESLOPE
        </h1>
      </div>

    </footer>
  );
}