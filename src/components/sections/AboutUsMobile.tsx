'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Play, Instagram, Facebook, Youtube } from 'lucide-react';

const teamProfiles = [
  {
    name: 'Patryk Kulesza',
    link: 'https://www.linkedin.com/in/patryk-kulesza-788397354/',
    image: '/_resources/patryk.webp',
    description: 'Full Stack Developer z zamiłowaniem do rozwiązań AI. Ma głowę do wszystkiego i świetnie łączy technologię z podejściem produktowym.',
  },
  {
    name: 'Mateusz Malewski',
    link: 'https://www.linkedin.com/in/mateusz-malewski-b0834927b/',
    image: '/_resources/mati.webp',
    description: 'Frontend, kontakt z klientem oraz obszar kreatywny: grafika i video. Łączy komunikację z realizacją i dba o końcowy efekt wizualny.',
  },
  {
    name: 'Bartłomiej Koźluk',
    link: 'https://www.linkedin.com/in/bart%C5%82omiej-ko%C5%BAluk-5a5391266/',
    image: 'https://static.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry',
    description: 'Dba o jakość i standardy kodu. Pilnuje czytelnej architektury, spójności rozwiązań i profesjonalnego porządku w projekcie.',
  },
  {
    name: 'Daniel Wawrzos',
    link: 'https://www.linkedin.com/in/daniel-wawrzos-34b973338/',
    image: '/_resources/daniel.webp',
    description: 'Web Developer wspierający zespół technicznie i organizacyjnie. Pomaga domykać zadania oraz dba o płynny przebieg pracy nad projektem.',
  },
];

export default function AboutUsMobile() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="mx-auto relative w-full bg-white py-12 border-t border-zinc-100 overflow-hidden px-6">
      
      {/* --- UPROSZCZONE TŁO MOBILE --- */}
      <div 
        className="absolute top-0 left-0 right-0 h-[250px] z-0 pointer-events-none opacity-50"
        style={{
          background: 'linear-gradient(to bottom, #c5d6ff 0%, rgba(255,255,255,0) 100%)'
        }}
      />

      {/* --- GŁÓWNA ZAWARTOŚĆ SEKCJI --- */}
      <div className="relative z-10 w-full flex flex-col">
        
        {/* --- NAGŁÓWEK SEKCJI ORAZ SOCIAL MEDIA --- */}
        <div className="mb-10 flex flex-col gap-6">
          <h2 className="text-[32px] font-bold text-zinc-950 leading-[1.1] tracking-tight">
            Zróbmy razem coś świetnego!
          </h2>

          <div className="flex items-center gap-3">
            <a 
              href="https://www.instagram.com/whiteslopestudio/" 
              target="_blank" 
              rel="noreferrer" 
              className="w-[44px] h-[44px] rounded-full bg-[#E1306C] border border-zinc-200 flex items-center justify-center text-white active:scale-95 transition-transform"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            
            <a 
              href="https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL" 
              target="_blank" 
              rel="noreferrer" 
              className="w-[44px] h-[44px] rounded-full bg-[#3b5998] border border-zinc-200 flex items-center justify-center text-white active:scale-95 transition-transform"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            
            <a 
              href="https://www.youtube.com/@WhiteslopeStudio" 
              target="_blank" 
              rel="noreferrer" 
              className="w-[44px] h-[44px] rounded-full bg-[#FF0000] border border-zinc-200 flex items-center justify-center text-white active:scale-95 transition-transform"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* --- WIDEO ORAZ INFORMACJE --- */}
        <div className="flex flex-col gap-6 mb-12">
          
          {/* Odtwarzacz YT - zostaje interaktywny klik, by nie obciążać startu */}
          <div className="flex flex-col w-full">
            <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-zinc-950 border border-zinc-200 shadow-[0_30px_60px_rgba(0,0,0,0.06)]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/_4TJyWuqkUk?rel=0"
                title="Whiteslope Corporate Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Premium Meta Row - dopasowane marginesy */}
            <div className="mt-4 flex items-center justify-between border border-zinc-200 bg-zinc-50 p-3 rounded-[16px] shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-zinc-200 flex-shrink-0">
                  <Image 
                    src="/_resources/whiteslope studio literka sygnet.png" 
                    alt="Whiteslope Studio" 
                    fill
                    sizes="40px"
                    className="object-cover p-1"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[14px] text-zinc-950 leading-none">Whiteslope Studio</span>
                    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] text-blue-600 flex-shrink-0" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" stroke="currentColor" strokeWidth="1" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <p className="text-[12px] text-zinc-600 font-medium mt-1">Pokaż się online z dobrej strony!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Blok tekstowy zastępujący mapę 3D na mobile */}
          <div className="w-full flex flex-col bg-zinc-50 rounded-[20px] p-6 border border-zinc-200 shadow-sm">
            <h3 className="text-[20px] font-bold text-zinc-950 tracking-tight mb-2">
              Tworzymy lokalnie. Wdrażamy globalnie.
            </h3>
            <p className="text-[14px] text-zinc-600 leading-relaxed font-normal">
              Fizycznie pracujemy z <strong className="font-bold text-zinc-950">Białegostoku</strong>, ale nasze rozwiązania nie znają granic. <strong className="font-bold text-zinc-950">Tworzymy strony, aplikacje i systemy dla firm z całej Polski i zagranicy,</strong> gwarantując najwyższy standard niezależnie od odległości.
            </p>
          </div>
        </div>

        {/* --- ARCHITEKTURA ZESPOŁU --- */}
        <div className="w-full pt-10 pb-4">
          <div className="mb-8">
            <h3 className="text-[28px] font-bold text-zinc-950 tracking-tight mb-3">Nasz zespół</h3>
            <p className="text-[15px] text-zinc-600 leading-relaxed font-normal">
              Kompaktowy zespół to szybsze decyzje i czystsza komunikacja. Poznaj ekspertów, z którymi będziesz współpracować bezpośrednio przy realizacji swojego systemu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {teamProfiles.map((profile) => (
              <div key={profile.name} className="flex flex-col p-5 rounded-[20px] bg-white border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-200 flex-shrink-0">
                    <Image src={profile.image} alt={profile.name} fill sizes="48px" className="object-cover" />
                  </div>
                  <h4 className="text-[16px] font-bold text-zinc-950 tracking-tight">{profile.name}</h4>
                </div>
                
                <p className="text-[14px] text-zinc-600 leading-relaxed mb-4 font-normal">
                  {profile.description}
                </p>
                
                <a
                  href={profile.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[14px] font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-auto w-max group"
                >
                  Profil LinkedIn <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}