'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useInteractiveButton } from '@/utils/hooks';

function AnimatedBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}




export default function HeroSection() {
  const mainButton = useInteractiveButton();
  const [isMainHovered, setIsMainHovered] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    // Dodajemy listener (passive: true poprawia wydajność scrollowania)
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Sprzątamy po odmontowaniu komponentu
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Zostawiłem dokładnie Twoje klasy - zaokrąglona sekcja, która wygląda jak "zawieszona"
    <section className="relative mx-auto mb-4 md:mb-6 bg-[#141414] rounded-xl md:rounded-[16px] h-[70svh] min-h-[1000px] md:h-[70svh] md:min-h-[800px] overflow-hidden overflow-x-hidden">
      
      {/* --- WIDEO W TLE --- */}
      {/* 1. Pełna szerokość tła, flex ustawia zawartość na samym środku */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
        
        {/* 2. KONTENER WŁAŚCIWY: max 1640px. To on ma overflow-hidden, więc nic z niego nie wyleje się na boki! */}
        <div className="relative w-full h-full max-w-[1700px] overflow-hidden">
          
          {/* 3. PARALLAX WRAPPER */}
          <div 
            className="absolute inset-0 w-full h-full will-change-transform"
            style={{ transform: `translateY(${offsetY * -0.2}px)` }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              aria-hidden="true"
              poster="/animationHero/HeroShowReel-poster.jpg"
              /* Wideo wypełnia 1640px, a scale-[2.4] powiększa je, ukrywając znaki wodne. Reszta ucięta przez overflow-hidden rodzica */
              className="absolute inset-0 w-full h-full object-cover scale-[1.2]"
              src="/animationHero/HeroShowReel.mp4"
            />
          </div>

        </div>
      </div>

      {/* --- TWOJE ORYGINALNE GRADIENTY CIENIUJĄCE --- */}
      {/* Mobile gradient */}
      <div
        className="absolute inset-0 md:hidden z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 78%, rgba(0,0,0,0.9) 100%)',
        }}
      />
      
      {/* Desktop gradienty */}
      <div
        className="absolute inset-0 hidden md:block z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(370deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.2) 48%, rgba(0,0,0,0.14) 66%, rgba(0,0,0,0.02) 84%)',
        }}
      />
      <div
        className="absolute inset-0 hidden md:block z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.24) 55%, rgba(0,0,0,0.9) 100%)',
        }}
      />

      {/* --- ZAWARTOŚĆ --- */}
      <div className="relative z-10 h-full w-full max-w-[1640px] mx-auto px-6 md:px-12 pb-2 flex flex-col justify-end items-start text-left">

        {/* NOWOŚĆ: Kontener Flex dzielący treść na lewą (H1+Przyciski) i prawą (Lista z ikonami) stronę na desktopie.
            items-end wyrównuje obie kolumny równiutko do dołu. */}
        <div className="flex flex-col xl:flex-row justify-between items-end w-full gap-8 xl:gap-4">

          {/* --- LEWA KOLUMNA (H1, Przyciski, Zbijacze obiekcji) --- */}
          <div className="flex flex-col gap-4 md:gap-6 w-full max-w-[900px]">

            {/* Nagłówek H1 - KOMPLETNIE NIERUSZONY CSS */}
            <div>
              <h1 className="text-[50px] font-[700] leading-[0.85] text-left text-white tracking-tight md:text-[60px] ">
                Twój biznesowy pomysł.<br/> Nasz kod i wdrożenie.
              </h1>
            </div>

            {/* Przyciski CTA - KOMPLETNIE NIERUSZONY CSS */}
            <div>
              <div className="mt-4 mb-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-center w-full">
                
                {/* Główny przycisk */}
                <Link
                  href="/contact"
                  onMouseMove={mainButton.handleMouseMove}
                  onMouseEnter={() => {
                    setIsMainHovered(true);
                    if (mainButton.handleMouseEnter) mainButton.handleMouseEnter();
                  }}  
                  onMouseLeave={() => {
                    setIsMainHovered(false);
                    if (mainButton.handleMouseLeave) mainButton.handleMouseLeave();
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-[46px] px-10 text-[14px] md:text-[15px] font-[600] text-white relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(0,87,255,0.25)] hover:shadow-[0_8px_30px_rgba(0,87,255,0.4)]"
                  style={{
                    background: `radial-gradient(circle at ${isMainHovered ? mainButton.mousePosition.x : 50}% ${isMainHovered ? mainButton.mousePosition.y : 100}%, #0066ff, #0057ff 40%, #004df2 80%, #0047df)`,
                    scale: isMainHovered ? 1.05 : 1,
                  }}
                >
                  Zacznij współpracę
                  <ArrowRight className="w-[16px] h-[16px] ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                {/* Drugi przycisk */}
                <Link
                  href="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center h-[46px] px-4 text-[14px] md:text-[15px] font-[500] text-white/100 hover:text-white transition-colors duration-300 group"
                >
                  <span className="relative pb-0.5">
                    <u>Zobacz nasze realizacje</u>
                  </span>
                  <ArrowRight className="w-[16px] h-[16px] ml-2 opacity-100 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </Link>

              </div>

              {/* Zbijacze obiekcji (Friction Reducers) - KOMPLETNIE NIERUSZONY CSS */}
              <div className="flex items-center gap-[30px] mt-[20px] ml-[4px] text-[12px] md:text-[13px] text-white/95 font-[500]">
                 <span className="flex items-center gap-[6px]"><CheckCircle2 className="w-[14px] h-[14px]" /> Bez ukrytych kosztów</span>
                 <span className="flex items-center gap-[6px]"><CheckCircle2 className="w-[14px] h-[14px]" /> Błyskawiczna wycena</span>
                 <span className="flex items-center gap-[6px]"><CheckCircle2 className="w-[14px] h-[14px]" /> Szybki kontakt</span>
              </div>
            </div>
          </div>

          {/* --- PRAWA KOLUMNA (Lista z nowymi białymi SVG) --- */}
          <div className="w-full xl:max-w-[600px]">
            {/* Lista korzyści - z zachowaniem Twojego text-[16px] */}
            <div>
              <ul className="flex flex-col gap-[16px] text-white/90 mb-[26px]">
                
                <li className="flex items-start gap-[12px]">
                  {/* SVG: Strony WWW */}
                  <svg className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-blue-200 shrink-0 mt-[2px]" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M237,19H19c-8.2,0-14.9,6.7-14.9,14.9v188.3c0,8.2,6.7,14.9,14.9,14.9h218c8.2,0,14.9-6.7,14.9-14.9V33.9 C251.9,25.7,245.2,19,237,19z M199.8,28.9c5.4,0,9.9,4.5,9.9,9.9c0,5.5-4.5,9.9-9.9,9.9s-9.9-4.5-9.9-9.9S194.4,28.9,199.8,28.9z M172.6,28.9c5.4,0,9.9,4.5,9.9,9.9c0,5.5-4.5,9.9-9.9,9.9s-9.9-4.5-9.9-9.9S167.1,28.9,172.6,28.9z M237,223.9H19V58.6h218V223.9z M227.1,48.7c-5.4,0-9.9-4.5-9.9-9.9s4.5-9.9,9.9-9.9s9.9,4.5,9.9,9.9C237,44.3,232.5,48.7,227.1,48.7z M96,74h76.1v14.4H96V74z M126,106.9h96.3v14.3H126V106.9z M126,135.5h96.3v14.3H126V135.5z M126,164.5h96.3v14.3H126V164.5z M32.6,193.1h189.8v14.3H32.6 V193.1z M32.6,106.9h67.8v70.7H32.6V106.9z"></path>
                  </svg>
                  <span className="text-[16px] md:text-[20px] leading-relaxed">
                    <strong className="text-white font-[600]">Strony WWW i systemy webowe</strong>, które generują zlecenia.
                  </span>
                </li>

                <li className="flex items-start gap-[12px]">
                  {/* SVG: Automatyzacja */}
                  <svg className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] text-green-200 shrink-0 mt-[2px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 13.293V3h-8V1H8v2H3v4h1V4h4v2h5V4h7v9.293L17.707 11l-.707.707 3.5 3.5 3.5-3.5-.707-.707zM12 5H9V2h3zm8 15h-3v-2h-5v2H4v-9.293L6.293 13 7 12.293l-3.5-3.5-3.5 3.5.707.707L3 10.707V21h9v2h5v-2h4v-4h-1zm-4 2h-3v-3h3z"></path>
                  </svg>
                  <span className="text-[16px] md:text-[20px] leading-relaxed">
                    <strong className="text-white font-[600]">Automatyzacje i AI</strong>, które wyręczają Cię z powtarzalnej pracy.
                  </span>
                </li>

                <li className="flex items-start gap-[12px] mb-12">
                  {/* SVG: Ekspert */}
                  <svg className="text-yellow-200 w-[20px] h-[20px] md:w-[24px] md:h-[24px]  shrink-0 mt-[2px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2,19c0-3.9,3.1-7,7-7c2.5,0,4.8,1.3,6.1,3.5l1.7-1c-1-1.7-2.5-3-4.2-3.7C14.1,9.7,15,7.9,15,6c0-3.3-2.7-6-6-6S3,2.7,3,6 c0,1.9,0.9,3.7,2.4,4.8C2.2,12.2,0,15.3,0,19v5h12v-2H2V19z M5,6c0-2.2,1.8-4,4-4s4,1.8,4,4s-1.8,4-4,4S5,8.2,5,6z"></path>
                    <path d="M24.1,15.8l-7.6,7.6l-4.7-4.7l1.4-1.4l3.3,3.3l6.2-6.2L24.1,15.8z"></path>
                  </svg>
                  <span className="text-[16px] md:text-[20px] leading-relaxed">
                    <strong className="text-white font-[600]">Wizerunek eksperta</strong>, dzięki któremu możesz śmiało podnosić stawki.
                  </span>
                </li>

              </ul>
            </div>
          </div>

        </div>
      </div>

    

    </section>
  );
}