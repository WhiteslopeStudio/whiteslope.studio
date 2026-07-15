'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function HeroSectionMobile() {
  // FAZA 2c: ten komponent i HeroSection (desktop) sa oba w DOM naraz (CSS
  // decyduje ktory jest widoczny), wiec nie mozemy dac <video src=...> na
  // sztywno - oba probowalyby ladowac to samo 1.3MB wideo rownolegle. src
  // wstawiamy dopiero gdy matchMedia potwierdzi ze TA wersja (mobile,
  // max-width 767px) jest faktycznie widoczna.
  const [videoSrc, setVideoSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setVideoSrc(mq.matches ? '/animationHero/HeroShowReel.mp4' : undefined);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <section className="relative w-full bg-white overflow-hidden flex flex-col items-center ">
      
      {/* Animacja przenikania logotypów */}
      <style>{`
        @keyframes fadeBlue {
          0%, 25% { opacity: 0.5; }
          33%, 91% { opacity: 0; }
          100% { opacity: 0.5; }
        }
        @keyframes fadePurple {
          0%, 25% { opacity: 0; }
          33%, 58% { opacity: 0.5; }
          66%, 100% { opacity: 0; }
        }
        @keyframes fadeYellow {
          0%, 58% { opacity: 0; }
          66%, 91% { opacity: 0.5; }
          100% { opacity: 0; }
        }
        
        .animate-logo-blue { animation: fadeBlue 9s ease-in-out infinite; }
        .animate-logo-purple { animation: fadePurple 9s ease-in-out infinite; }
        .animate-logo-yellow { animation: fadeYellow 9s ease-in-out infinite; }
      `}</style>

      {/* --- TŁO: Twoje charakterystyczne gradientowe paski --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-80 overflow-hidden">
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 85%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 70%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 55%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 40%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 25%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.6) 0%, transparent 10%)' }} />
      </div>

      {/* ========================================================= */}
      {/* CZEŚĆ 1: EKRAN POWITALNY (Równo 100% wysokości telefonu)   */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-[500px] min-h-[100svh] px-5 pt-[80px] pb-10 flex flex-col items-center justify-center text-center">
        
        {/* --- ROTUJĄCE LOGOTYPY --- */}
        <div className="absolute top-[20svh] left-1/2 -translate-x-1/2 h-9 sm:h-10 w-full max-w-[240px] flex items-center justify-center pointer-events-none">
          <Image 
            src="/_resources/logos/whiteslopeStudioLogoNiebieski_dzialWEBDEV_czarny.webp" 
            alt="Whiteslope Web Development" 
            fill
            sizes="280px"
            className="object-contain animate-logo-blue"
          />
          <Image 
            src="/_resources/logos/whiteslopeStudioLogoFioletowy_dzialAUTOMATION_AI_czarny.webp" 
            alt="Whiteslope Automation & AI" 
            fill
            sizes="280px"
            className="object-contain animate-logo-purple"
          />
          <Image 
            src="/_resources/logos/whiteslopeStudioLogoZolty_dzialAMARKETING_czarny.webp" 
            alt="Whiteslope Marketing" 
            fill
            sizes="280px"
            className="object-contain animate-logo-yellow"
          />
        </div>

        {/* --- NAGŁÓWEK --- */}
        <h1 className="mb-10 text-[29px] font-[200] leading-[1.1] text-zinc-900 tracking-tight">
          Twój biznesowy pomysł.<br />
          <span className="bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-text text-transparent font-[700]">
              Nasz kod i wdrożenie.
          </span>
        </h1>

        {/* --- PRZYCISKI --- */}
        <div className="flex flex-col items-center gap-3 w-full">
          <Link
            href="/contact"
            className="w-fit px-8 bg-gradient-to-tr from-blue-600 to-blue-400 hover:from-blue-600 hover:to-blue-400 text-white font-bold rounded-full h-[52px] flex items-center justify-center transition-all shadow-[0_8px_20px_rgba(59,144,255,0.25)] text-[15px] active:scale-95 group mb-2"
          >
            Rozpocznij współpracę
            <ArrowRight className="w-[18px] h-[18px] ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/projects"
            className="w-fit px-8 bg-gradient-to-tr from-zinc-200 to-blue-100 hover:from-blue-300 hover:to-blue-200 text-zinc-700 font-bold rounded-full h-[52px] flex items-center justify-center transition-colors shadow-sm text-[15px] active:scale-95 group shadow-[0_8px_20px_rgba(59,144,255,0.25)]"
          >
            <span className="relative group-hover:text-blue-500 transition-colors">
              Zobacz nasze realizacje
            </span>
            <ArrowRight className="w-[16px] h-[16px] ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-500" />
          </Link>
        </div>
      </div>


      {/* ========================================================= */}
      {/* CZEŚĆ 2: WIDEO I KORZYŚCI (Widoczne dopiero po scrollu)    */}
      {/* ========================================================= */}
      <div className="relative z-10 w-full max-w-[500px] px-5 pb-[70px] flex flex-col items-center">
        
        {/* --- WIDEO --- */}
        <div className="w-full aspect-[16/15] rounded-[24px] overflow-hidden shadow-xl relative mb-10 border border-zinc-100 bg-zinc-100 mt-4">
          <video
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
            poster="/animationHero/HeroShowReel-poster.jpg"
            preload="auto"
            fetchPriority="high"
            className="absolute inset-0 w-full h-full object-cover scale-[1.2] origin-center -translate-y-2 pointer-events-none"
            src={videoSrc}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_24px_rgba(0,0,0,0.1)] pointer-events-none rounded-[24px]" />
        </div>

        {/* --- LISTA KORZYŚCI --- */}
        <ul className="flex flex-col gap-6 w-full text-zinc-800 text-left px-3">
          <li className="flex items-start gap-4">
            <svg className="w-[32px] h-[32px] text-blue-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 256 256">
              <path d="M237,19H19c-8.2,0-14.9,6.7-14.9,14.9v188.3c0,8.2,6.7,14.9,14.9,14.9h218c8.2,0,14.9-6.7,14.9-14.9V33.9 C251.9,25.7,245.2,19,237,19z M199.8,28.9c5.4,0,9.9,4.5,9.9,9.9c0,5.5-4.5,9.9-9.9,9.9s-9.9-4.5-9.9-9.9S194.4,28.9,199.8,28.9z M172.6,28.9c5.4,0,9.9,4.5,9.9,9.9c0,5.5-4.5,9.9-9.9,9.9s-9.9-4.5-9.9-9.9S167.1,28.9,172.6,28.9z M237,223.9H19V58.6h218V223.9z M227.1,48.7c-5.4,0-9.9-4.5-9.9-9.9s4.5-9.9,9.9-9.9s9.9,4.5,9.9,9.9C237,44.3,232.5,48.7,227.1,48.7z M96,74h76.1v14.4H96V74z M126,106.9h96.3v14.3H126V106.9z M126,135.5h96.3v14.3H126V135.5z M126,164.5h96.3v14.3H126V164.5z M32.6,193.1h189.8v14.3H32.6 V193.1z M32.6,106.9h67.8v70.7H32.6V106.9z"></path>
            </svg>
            <span className="text-[18px] leading-relaxed">
              <strong className="text-zinc-950 font-bold">Strony WWW i systemy webowe</strong>, które generują zlecenia.
            </span>
          </li>

          <li className="flex items-start gap-4">
            <svg className="w-[32px] h-[32px] text-blue-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 13.293V3h-8V1H8v2H3v4h1V4h4v2h5V4h7v9.293L17.707 11l-.707.707 3.5 3.5 3.5-3.5-.707-.707zM12 5H9V2h3zm8 15h-3v-2h-5v2H4v-9.293L6.293 13 7 12.293l-3.5-3.5-3.5 3.5.707.707L3 10.707V21h9v2h5v-2h4v-4h-1zm-4 2h-3v-3h3z"></path>
            </svg>
            <span className="text-[18px] leading-relaxed">
              <strong className="text-zinc-950 font-bold">Automatyzacje i AI</strong>, które wyręczają Cię z powtarzalnej pracy.
            </span>
          </li>

          <li className="flex items-start gap-4">
            <svg className="text-blue-500 w-[32px] h-[32px] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2,19c0-3.9,3.1-7,7-7c2.5,0,4.8,1.3,6.1,3.5l1.7-1c-1-1.7-2.5-3-4.2-3.7C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6S3,2.7,3,6 c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h12v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"></path>
              <path d="M24.1,15.8l-7.6,7.6l-4.7-4.7l1.4-1.4l3.3,3.3l6.2-6.2L24.1,15.8z"></path>
            </svg>
            <span className="text-[18px] leading-relaxed">
              <strong className="text-zinc-950 font-bold">Wizerunek eksperta</strong>, dzięki któremu możesz śmiało podnosić stawki.
            </span>
          </li>
        </ul>

      </div>
    </section>
  );
}