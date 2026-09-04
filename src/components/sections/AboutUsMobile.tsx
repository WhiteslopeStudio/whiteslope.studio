'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Instagram } from 'lucide-react';
import StoriesFeedMobile from './StoriesFeedMobile';

type TeamProfile = {
  name: string;
  link?: string;
  image: string;
  backgroundImage?: string;
  description: string;
};

const teamProfiles: TeamProfile[] = [
  {
    name: 'Patryk Kulesza',
    link: 'https://www.linkedin.com/in/patryk-kulesza-788397354/',
    image: '/_resources/team/Patryk_new.jpg',
    description: 'Full Stack Developer z zamiłowaniem do rozwiązań AI. Ma głowę do wszystkiego i świetnie łączy technologię z podejściem produktowym.',
  },
  {
    name: 'Mateusz Malewski',
    link: 'https://www.linkedin.com/in/mateusz-malewski-b0834927b/',
    image: '/_resources/team/Mati_new.jpg',
    description: 'Frontend, kontakt z klientem oraz obszar kreatywny: grafika i video. Łączy komunikację z realizacją i dba o końcowy efekt wizualny.',
  },
  {
    name: 'Bartłomiej Koźluk',
    link: 'https://www.linkedin.com/in/bart%C5%82omiej-ko%C5%BAluk-5a5391266/',
    image: '/_resources/team/Bartek_new.jpg',
    description: 'Dba o jakość i standardy kodu. Pilnuje czytelnej architektury, spójności rozwiązań i profesjonalnego porządku w projekcie.',
  },
  {
    name: 'Daniel Wawrzos',
    link: 'https://www.linkedin.com/in/daniel-wawrzos-34b973338/',
    image: '/_resources/daniel.webp',
    description: 'Web Developer wspierający zespół technicznie i organizacyjnie. Pomaga domykać zadania oraz dba o płynny przebieg pracy nad projektem.',
  },
];

// Twórcy UGC wspolpracujacy przy projektach wideo - nie sa czescia zespolu
// (nie sa u nas zatrudnieni), stad osobna, lzejsza sekcja z samymi avatarami.
type Creator = {
  name: string;
  handle: string;
  image: string;
  instagram: string;
  tiktok?: string;
};

const CREATORS: Creator[] = [
  {
    name: 'Magda',
    handle: '@magdajzkv',
    image: '/_resources/videoMarketing/magda/MAGDA_PERSON.webp',
    instagram: 'https://www.instagram.com/magdajzkv/',
    tiktok: 'https://www.tiktok.com/@magdajzkv',
  },
  {
    name: 'Mateusz',
    handle: '@mateusz.malewski.10',
    image: '/_resources/videoMarketing/Mati.webp',
    instagram: 'https://www.instagram.com/mateusz.malewski.10/',
  },
  {
    name: 'Damian',
    handle: '@damian_bogdanowicz',
    image: '/_resources/videoMarketing/Damian.webp',
    instagram: 'https://www.instagram.com/damian_bogdanowicz/',
  },
];

export default function AboutUsMobile() {
  return (
    <>
    {/* Na mobile nagłówek "Zróbmy razem coś świetnego", blok wideo i "Tworzymy lokalnie"
        zostały zastąpione feedem Whiteslope Stories (materiały z Instagrama). */}
    <StoriesFeedMobile />

    {/* --- ZESPÓŁ: pełnoekranowe kadry 670px, zdjęcie osoby jako tło ---
         Ten sam schemat co Hero: gradient u góry pod nagłówek, gradient u dołu
         pod podpis, treść zepchnięta na dół przez mt-auto. */}
    <section className="relative w-full bg-black">
      {teamProfiles.map((profile, index) => (
        <div key={profile.name} className="relative w-full h-[670px] overflow-hidden bg-zinc-900">
          {/* Osoby z wycinką bez tła dostają najpierw własne tło pod spód */}
          {profile.backgroundImage && (
            <Image
              src={profile.backgroundImage}
              alt=""
              fill
              sizes="100vw"
              aria-hidden
              className="object-cover"
            />
          )}

          <Image
            src={profile.image}
            alt={profile.name}
            fill
            sizes="100vw"
            className={profile.backgroundImage ? 'object-contain object-bottom' : 'object-cover object-top'}
          />

          {/* Przyciemnienie od góry - pod nagłówek sekcji */}
          <div
            className="absolute inset-x-0 top-0 h-[220px] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
            }}
          />

          {/* Przyciemnienie od dołu - pod podpis i opis */}
          <div
            className="absolute inset-x-0 bottom-0 h-[340px] pointer-events-none"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 70%, rgba(0,0,0,0.96) 100%)',
            }}
          />

          <div className="absolute inset-0 z-10 flex flex-col px-6 pt-10 pb-10">
            {/* Nagłówek tylko nad pierwszym kadrem */}
            {index === 0 && (
              <h2 className="hero-mobile-h1 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight">
                Poznaj nasz zespół
              </h2>
            )}

            <div className="mt-auto">
              <h3 className="text-white text-[20px] font-bold tracking-tight mb-2">
                {profile.name}
              </h3>
              <p className="text-[14px] text-white/70 leading-relaxed max-w-[380px]">
                {profile.description}
              </p>

              {profile.link && (
                <a
                  href={profile.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[13px] font-medium text-white mt-4 group"
                >
                  Profil LinkedIn
                  <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </a>
              )}

            </div>
          </div>
        </div>
      ))}
    </section>

    {/* --- BAZA TWÓRCÓW: osoby współpracujące przy projektach wideo/UGC,
         świadomie oddzielone od sekcji zespołu (nie są u nas zatrudnione) --- */}
    <section className="relative w-full bg-black px-6 pt-12 pb-14">
      <h2 className="hero-mobile-h1 mb-2 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight">
        Baza twórców
      </h2>
      <p className="text-[14px] leading-relaxed text-white/60 mb-7 max-w-[380px] text-balance">
        Twórcy, z którymi realizujemy materiały wideo i UGC dla klientów.
      </p>

      <div className="flex flex-col gap-3">
        {CREATORS.map((creator) => (
          <div
            key={creator.name}
            className="flex items-center gap-3 rounded-2xl border border-white/10 p-3"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-zinc-800 shrink-0">
              <Image
                src={creator.image}
                alt={creator.name}
                fill
                sizes="48px"
                className="object-cover object-top"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-[14px] font-semibold text-white leading-tight">
                {creator.name}
              </span>
              <span className="text-[12px] text-white/50 truncate">{creator.handle}</span>
            </div>

            <div className="flex items-center gap-2 ml-auto shrink-0">
              <a
                href={creator.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${creator.handle}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white active:scale-95 transition-transform"
              >
                <Instagram className="w-[16px] h-[16px]" />
              </a>

              {creator.tiktok && (
                <a
                  href={creator.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`TikTok ${creator.handle}`}
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/20 text-white active:scale-95 transition-transform"
                >
                  {/* lucide-react nie ma ikony TikToka - prosty, jednokolorowy glif */}
                  <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="currentColor" aria-hidden>
                    <path d="M16.5 3c.3 2.2 1.6 3.6 3.8 3.8v2.5c-1.3.1-2.5-.2-3.7-.9v5.9c0 4.2-3.6 6.9-7.3 5.5-2.3-.9-3.7-3.2-3.5-5.6.2-2.5 2.2-4.5 4.7-4.8.4 0 .8-.1 1.2 0v2.6c-.3 0-.6.1-.9.1-1.3.2-2.3 1.4-2.1 2.7.1 1.3 1.3 2.3 2.6 2.2 1.3-.1 2.3-1.1 2.3-2.4V3h2.9z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}