'use client';

import { useState } from 'react';
import { X, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Premium Quick Contact Component
 * Ciemny przycisk z zaawansowanym hoverem (wlewanie) i kaskadowymi animacjami z blurem
 */
export default function QuickContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ========================================== */}
      {/* INVISIBLE BACKDROP (zamykanie po kliknięciu poza) */}
      {/* ========================================== */}
      {/* Tło jest teraz całkowicie przezroczyste, nie rozmywa i nie przyciemnia strony */}
      <div 
        className={`fixed inset-0 z-40 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* ========================================== */}
      {/* TRIGGER BUTTON (zamknięty widget) */}
      {/* ========================================== */}
<div className="fixed bottom-3 left-1/2 -translate-x-1/2 md:left-auto md:right-[100px] md:translate-x-0 md:bottom-8 z-40 flex items-end pointer-events-none">            <button
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer pointer-events-auto group relative overflow-hidden flex items-center gap-3 h-[48px] md:h-[52px] pl-1.5 pr-5 md:pr-6 bg-[#161616]  border-[#ccff00] group-hover:border-[#ccff00] rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(204,255,0,0.25)]"
          aria-label="Szybki kontakt Whiteslope"
        >
          {/* TŁO HOVER: wlewająca się animacja z zaokrągleniem (cubic-bezier) */}
          <div className="absolute top-0 left-0 w-[120%] h-full bg-[#ccff00] -translate-x-[105%] rounded-r-[100px] group-hover:translate-x-0 group-hover:rounded-r-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] z-0"></div>

          {/* ZAWARTOŚĆ PRZYCISKU (musi mieć z-10 żeby być nad tłem) */}
          <div className="relative z-10 flex items-center gap-3 w-full h-full">
            {/* Sekcja Avatarów w przycisku */}
            <div className="flex items-center relative h-9 w-[72px] md:h-10 md:w-[80px]">
              
              {/* Mateusz (na wierzchu - rozdzielony na wrapper i kropkę, żeby uniknąć ucinania) */}
              <div className="absolute left-0 w-9 h-9 md:w-10 md:h-10 z-30">
                {/* Właściwy Avatar z maską */}
                <div className="relative w-full h-full rounded-full border-2 border-[#161616] group-hover:border-[#ccff00] overflow-hidden bg-zinc-800 transition-colors duration-300 z-10">
                  <img 
                    src="/_resources/team/mateusz.webp" 
                    alt="Mateusz" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Mateusz&background=1a75ff&color=fff' }}
                  />
                </div>
                {/* Kropka statusu "Online" - CAŁKOWICIE POZA OVERFLOW */}
                <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-[#ccff00] border-2 border-[#161616] rounded-full z-20 group-hover:border-[#ccff00] group-hover:bg-black transition-colors duration-300"></div>
              </div>
              
              {/* Bartek */}
              <div className="absolute left-[20px] md:left-[22px] w-9 h-9 md:w-10 md:h-10 z-20">
                <div className="relative w-full h-full rounded-full border-2 border-[#161616] group-hover:border-[#ccff00] overflow-hidden bg-zinc-800 transition-colors duration-300">
                  <img 
                    src="/_resources/team/bartek.webp" 
                    alt="Bartek" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Bartek&background=666&color=fff' }}
                  />
                </div>
              </div>
              
              {/* Patryk */}
              <div className="absolute left-[40px] md:left-[44px] w-9 h-9 md:w-10 md:h-10 z-10">
                <div className="relative w-full h-full rounded-full border-2 border-[#161616] group-hover:border-[#ccff00] overflow-hidden bg-zinc-800 transition-colors duration-300">
                  <img 
                    src="/_resources/team/patryk.webp" 
                    alt="Patryk" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Patryk&background=333&color=fff' }}
                  />
                </div>
              </div>
            </div>

            {/* Tekst i strzałka */}
            <span className="text-[14px] md:text-[15px] font-medium text-white group-hover:text-black tracking-tight transition-colors duration-300 whitespace-nowrap">
  Szybki kontakt
</span>
          </div>
        </button>
      </div>

      {/* ========================================== */}
      {/* POPUP WINDOW (otwarty widget z logiką widoczności CSS) */}
      {/* ========================================== */}
      <div 
        className={`fixed bottom-[70px] right-2 md:bottom-[100px] md:right-[112px] z-40 origin-bottom-right transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen 
            ? 'opacity-100 translate-y-0 scale-100 blur-none pointer-events-auto' 
            : 'opacity-0 translate-y-8 scale-95 blur-md pointer-events-none'
        }`}
      >
        <div className="w-[calc(100vw-1rem)] md:w-[360px] bg-white rounded-[24px] shadow-[0_30px_90px_rgba(0,0,0,0.18)] border border-zinc-200 overflow-hidden flex flex-col">
          
          {/* HEADER Z AVATARAMI */}
          <div className="bg-zinc-50 border-b border-zinc-200 p-5 md:p-6 relative">
            <button 
              onClick={() => setIsOpen(false)}
              aria-label="Zamknij szybki kontakt"
              className="absolute top-4 right-4 p-2 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-full text-zinc-500 hover:text-zinc-900 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {/* Animowane avatary - kaskada */}
                <div className={`w-11 h-11 rounded-full border-[3px] border-zinc-50 z-30 relative overflow-hidden bg-zinc-200 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-x-0 blur-none delay-[100ms]' : 'opacity-0 -translate-x-4 blur-md delay-0'}`}>
                  <img src="/_resources/team/mateusz.webp" alt="Mateusz" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Mateusz&background=1a75ff&color=fff' }} />
                </div>
                <div className={`w-11 h-11 rounded-full border-[3px] border-zinc-50 z-20 -ml-4 relative overflow-hidden bg-zinc-200 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-x-0 blur-none delay-[200ms]' : 'opacity-0 -translate-x-4 blur-md delay-0'}`}>
                  <img src="/_resources/team/bartek.webp" alt="Bartek" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Bartek&background=666&color=fff' }} />
                </div>
                <div className={`w-11 h-11 rounded-full border-[3px] border-zinc-50 z-10 -ml-4 relative overflow-hidden bg-zinc-200 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-x-0 blur-none delay-[300ms]' : 'opacity-0 -translate-x-4 blur-md delay-0'}`}>
                  <img src="/_resources/team/patryk.webp" alt="Patryk" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Patryk&background=333&color=fff' }} />
                </div>
              </div>
              
              <div className={`-ml-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-x-0 blur-none delay-[300ms]' : 'opacity-0 translate-x-4 blur-md delay-0'}`}>
                <h3 className="text-lg font-bold text-zinc-950 leading-tight ">Skontaktuj się z nami!</h3>
                <p className="text-[10px] text-zinc-500 leading-snug">Umów się na  <Link href="/contact" className="text-blue-600 hover:text-blue-700"><u> darmową konsultację</u></Link></p>
              </div>

              
            </div>
          </div>

          {/* BODY Z DANYMI */}
          <div className="p-5 md:p-6 space-y-6">
            
            {/* Email */}
            <div 
              className={`flex items-start gap-4 group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 blur-none delay-[300ms]' : 'opacity-0 translate-y-4 blur-md delay-0'}`} 
              onClick={() => window.location.href = 'mailto:kontakt@whiteslope.studio'}
            >
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#ccff00]/40 group-hover:text-zinc-950 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 mb-1">EMAIL</p>
                <p className="text-[15px] font-medium text-zinc-950 group-hover:text-blue-600 transition-colors">
                  kontakt@whiteslope.studio
                </p>
              </div>
            </div>

            {/* Telefon */}
            <div className={`flex items-start gap-4 group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 blur-none delay-[400ms]' : 'opacity-0 translate-y-4 blur-md delay-0'}`}>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#ccff00]/40 group-hover:text-zinc-950 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 mb-1">TELEFON</p>
                <div className="flex flex-col space-y-1">
                  <a href="tel:+48662581368" className="text-[15px] font-medium text-zinc-950 hover:text-blue-600 transition-colors">+48 662 581 368 <span className="text-[10px]">- Patryk (Fullstack Dev.)</span> </a> 
                  <a href="tel:+48731721760" className="text-[15px] font-medium text-zinc-950 hover:text-blue-600 transition-colors">+48 731 721 760 <span className="text-[10px]">- Mateusz (Web Designer)</span> </a>
                </div>
              </div>
            </div>

            <div className={`h-px w-full bg-zinc-100 transition-all duration-700 delay-[450ms] ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>

            {/* Lokalizacja */}
            <div className={`flex items-start gap-4 group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 blur-none delay-[500ms]' : 'opacity-0 translate-y-4 blur-md delay-0'}`}>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#ccff00]/40 group-hover:text-zinc-950 transition-colors">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 mb-1">LOKALIZACJA</p>
                <p className="text-[15px] font-medium text-zinc-950">Białystok, Polska</p>
              </div>
            </div>

            {/* Godziny pracy */}
            <div className={`flex items-start gap-4 group transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 blur-none delay-[600ms]' : 'opacity-0 translate-y-4 blur-md delay-0'}`}>
              <div className="w-10 h-10 rounded-2xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-[#ccff00]/40 group-hover:text-zinc-950 transition-colors">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-zinc-400 mb-1">GODZINY PRACY</p>
                <p className="text-[15px] font-medium text-zinc-950">Pon – Pt: 9:00 – 17:00</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}