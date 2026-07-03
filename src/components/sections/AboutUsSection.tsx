'use client';

import React, { useState } from 'react';
import { ArrowRight, Play, Instagram, Facebook, Youtube } from 'lucide-react';

import world from '@svg-maps/world'; 

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

export default function AboutUsSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className=" mx-auto relative w-full bg-white py-16 md:py-24 border-t border-zinc-100 overflow-hidden">
      
      {/* --- TŁO: 8 nieregularnych pasów (limonkowo-żółtych) na lewej połowie 1640px --- */}
<div className="absolute inset-0 z-0 w-full max-w-[1640px] mx-auto flex pointer-events-none ">
  
  {/* Właściwy kontener z pasami (zajmuje 50% wyśrodkowanej przestrzeni) */}
  <div className="w-95/100 flex opacity-70">

   <div 
      className="flex-1" 
      style={{ 
        background: `
          linear-gradient(to right, #ffffff 0%, transparent 100%), 
          linear-gradient(to bottom, #c5d6ff 0%, #ffffff 80%)
        ` 
      }} 
    />
    
    
    {/* Pas 2: Krótki */}
    <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #cadaff 0%, #ffffff 40%)' }} />
    
    {/* Pas 3: Średni */}
    <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #cbdafe 0%, #ffffff 75%)' }} />
    
    {/* Pas 4: Bardzo krótki */}
    <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #c5d6ff 0%, #ffffff 45%)' }} />
    
    {/* Pas 5: Bardzo długi */}
    <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #c0d3ff 0%, #ffffff 95%)' }} />
    
    {/* Pas 6: Średni */}
    <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #bfd2ff 0%, #ffffff 60%)' }} />
    
    {/* Pas 7: Krótki */}
    <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #b3caff 0%, #ffffff 35%)' }} />
    
    {/* Pas 8: Pionowy (żółty->biały) */}
    
    <div 
      className="flex-1" 
      style={{ 
        background: `
          linear-gradient(to left, #ffffff 0%, transparent 100%), 
          linear-gradient(to bottom, #c5d6ff 0%, #ffffff 80%)
        ` 
      }} 
    />
    
  </div>
</div>

      {/* --- GŁÓWNA ZAWARTOŚĆ SEKCJI (nałożona na z-10) --- */}
      <div className="relative z-10 w-full max-w-[1640px] mx-auto px-6 md:px-12">
        
        {/* --- NAGŁÓWEK SEKCJI --- */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-[40px] font-bold text-zinc-950 leading-[1.05] tracking-tight">
              O nas
            </h2>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-3">
            <span className="text-[13px] font-medium text-zinc-900 mr-2 hidden sm:block">
              Śledź nas:
            </span>
            
            <a 
              href="https://www.instagram.com/whiteslopestudio/" 
              target="_blank" 
              rel="noreferrer" 
              className="w-11 h-11 rounded-full bg-[#E1306C] border border-zinc-200 flex items-center justify-center text-white hover:text-zinc-900 hover:border-zinc-400 hover:shadow-sm transition-all duration-300 group"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            
            <a 
              href="https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL" 
              target="_blank" 
              rel="noreferrer" 
              className="w-11 h-11 rounded-full bg-[#3b5998] border border-zinc-200 flex items-center justify-center text-white hover:text-zinc-900 hover:border-zinc-400 hover:shadow-sm transition-all duration-300 group"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
            
            <a 
              href="https://www.youtube.com/@WhiteslopeStudio" 
              target="_blank" 
              rel="noreferrer" 
              className="w-11 h-11 rounded-full bg-[#FF0000] border border-zinc-200 flex items-center justify-center text-white hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all duration-300 group"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* --- MATRYCA: WIDEO (60%) + MAPA (40%) --- */}
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12 mb-10">
          
          {/* LEWA STRONA: Odtwarzacz YT */}
          <div className="w-full lg:w-[60%] flex flex-col ">
            <div className="relative w-full aspect-video rounded-[24px] overflow-hidden bg-zinc-950 border border-zinc-200 shadow-[0_30px_60px_rgba(0,0,0,0.06)] group">
              {!isVideoPlaying ? (
                <>
                  <img 
                    src="https://img.youtube.com/vi/_4TJyWuqkUk/maxresdefault.jpg" 
                    alt="Whiteslope Studio Video" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <button 
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-16 h-16 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform duration-300"
                    >
                      <Play className="w-5 h-5 text-blue-600 translate-x-0.5" fill="currentColor" />
                    </button>
                  </div>
                </>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/_4TJyWuqkUk?autoplay=1&rel=0"
                  title="Whiteslope Corporate Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            {/* Premium Meta Row */}
            <div className="mt-5 flex items-center justify-between border border-zinc-200 pb-5 bg-white/70 backdrop-blur-sm  p-3 rounded-[24px] shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-100 border border-zinc-200/80 flex-shrink-0">
                  <img 
                    src="/_resources/whiteslope studio literka sygnet.png" 
                    alt="Whiteslope Studio" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[15px] text-zinc-950 leading-none">Whiteslope Studio</span>
                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] text-blue-600 flex-shrink-0" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" stroke="currentColor" strokeWidth="1" />
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <p className="text-[12px] text-zinc-800 font-medium mt-1">Pokaż się online z dobrej storny!</p>
                </div>
              </div>
            </div>

          </div>

          {/* PRAWA STRONA: Mapa 3D */}
          <div className="w-full lg:w-[40%] flex flex-col justify-between bg-zinc-50 rounded-[24px] p-8 border border-zinc-200 relative overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)]">
            <div 
              className="w-full relative flex items-center justify-center h-full overflow-hidden pointer-events-none"
              style={{ perspective: '1200px' }}
            >
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-zinc-50 to-transparent z-10" />              
              <svg 
                viewBox={world.viewBox} 
                className="absolute w-[380%] md:w-[390%] max-w-none h-auto" 
                aria-label={world.label}
                shapeRendering="geometricPrecision"
                style={{
                  transform: 'rotateX(45deg) rotateZ(-4deg) translate(-3%, 5%)',
                  transformStyle: 'preserve-3d',
                }}
              >
                {world.locations.map((location: { id: string; path: string }) => (
                  <path
                    key={location.id}
                    d={location.path}
                    className={
                      location.id === 'pl' 
                        ? 'fill-blue-600 stroke-blue-400 stroke-[0.3] drop-shadow-[0_0_8px_rgba(37,99,235,0.6)] outline-none relative z-10' 
                        : 'fill-black/20 stroke-white stroke-[0.3] outline-none'
                    }
                  />
                ))}
                <g transform="translate(538, 287)">
                  <circle cx="0" cy="0" r="14" className="fill-red-500/30 animate-ping" />
                  <circle cx="0" cy="0" r="7" className="fill-red-500/40 animate-pulse" />
                  <circle cx="0" cy="0" r="3" className="fill-red-600 stroke-white stroke-[1]" />
                </g>
              </svg>
            </div>
            
            <div className="relative z-10 mt-4">
              <h3 className="text-[19px] font-bold text-zinc-950 tracking-tight mb-2">
                Tworzymy lokalnie. Wdrażamy globalnie.
              </h3>
              <p className="text-[14px] text-zinc-800 leading-relaxed font-normal">
                Fizycznie pracujemy z <strong className="font-bold text-zinc-950">Białegostoku</strong>, ale nasze rozwiązania nie znają granic. <strong className="font-bold text-zinc-950">Tworzymy strony, aplikacje i systemy dla firm z całej Polski i zagranicy,</strong> gwarantując ten sam najwyższy standard niezależnie od odległości.
              </p>
            </div>
          </div>
        </div>

        {/* --- DOLNA CZĘŚĆ: ARCHITEKTURA ZESPOŁU --- */}
        <div className="pt-12 bg-zinc-50 border border-zinc-200 relative overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] mt-12 rounded-[24px] border border-zinc-300 p-8 md:p-12">
          <div className="mb-10">
            <h3 className="text-[24px] font-bold text-zinc-950 tracking-tight mb-2">Nasz zespół</h3>
                <p className="text-[14px] text-zinc-800 max-w-[540px] leading-relaxed font-normal">
                  Kompaktowy zespół to szybsze decyzje i czystsza komunikacja. Poznaj ekspertów, z którymi będziesz współpracować bezpośrednio przy realizacji swojego systemu.
                </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 rounded-[20px] ">
            {teamProfiles.map((profile) => (
              <div key={profile.name} className="flex flex-col p-6 rounded-[20px] bg-white border border-zinc-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] border-zinc-200 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full overflow-hidden mb-4 border border-zinc-200 flex-shrink-0">
                  <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1">
                  <h4 className="text-[15px] font-bold text-zinc-950 tracking-tight mb-1">{profile.name}</h4>
                  <p className="text-[13px] text-zinc-900 leading-relaxed mb-5 font-normal">
                    {profile.description}
                  </p>
                </div>
                
                <a
                  href={profile.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors mt-auto w-max group/ln"
                >
                  Profil LinkedIn <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/ln:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}