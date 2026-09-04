'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { X, Mail, Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useMobileDetection } from '@/utils/hooks';

/**
 * Premium Quick Contact Component
 * Ciemny przycisk z zaawansowanym hoverem (wlewanie) i kaskadowymi animacjami z blurem
 */
export default function QuickContact() {
  const [isOpen, setIsOpen] = useState(false);
  // Kropka powiadomienia na przycisku - kasowana trwale po pierwszym kliknięciu
  const [kropkaWidoczna, setKropkaWidoczna] = useState(true);
  const pathname = usePathname();
  const isMobile = useMobileDetection();
  const isHomepage = pathname === '/';

  // Na mobile, na stronie głównej, chowamy przycisk dopóki jesteśmy w hero
  // (pierwszy ekran) - hero jest zaprojektowane bez odstępu na przycisk na
  // dole, więc żeby się nie nakładały, przycisk pojawia się dopiero po
  // przewinięciu hero.
  const [ukryjWHero, setUkryjWHero] = useState(false);

  useEffect(() => {
    if (!(isMobile && isHomepage)) {
      setUkryjWHero(false);
      return;
    }

    const handleScroll = () => {
      setUkryjWHero(window.scrollY < window.innerHeight * 0.85);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile, isHomepage]);

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
<div className={`fixed bottom-3 left-1/2 -translate-x-1/2 md:left-auto md:right-[100px] md:translate-x-0 md:bottom-8 z-40 flex items-end pointer-events-none transition-opacity duration-300 ${ukryjWHero ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>            <button
          onClick={() => {
            setIsOpen(!isOpen);
            setKropkaWidoczna(false);
          }}
          disabled={ukryjWHero}
          tabIndex={ukryjWHero ? -1 : 0}
          className={`cursor-pointer group relative overflow-hidden flex items-center gap-3 h-[48px] md:h-[52px] pl-1.5 pr-5 md:pr-6 bg-[#161616]  border-[#ccff00] group-hover:border-[#ccff00] rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(204,255,0,0.25)] ${ukryjWHero ? 'pointer-events-none' : 'pointer-events-auto'}`}
          aria-label="Szybki kontakt Whiteslope"
          aria-hidden={ukryjWHero}
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
                {/* Czerwona kropka powiadomienia - znika na dobre po pierwszym kliknięciu */}
                {kropkaWidoczna && (
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 border-2 border-[#161616] rounded-full z-20 group-hover:border-[#ccff00] transition-colors duration-300" />
                )}
              </div>
              
              {/* Bartek */}
              <div className="absolute left-[20px] md:left-[22px] w-9 h-9 md:w-10 md:h-10 z-20">
                <div className="relative w-full h-full rounded-full border-2 border-[#161616] group-hover:border-[#ccff00] overflow-hidden bg-zinc-800 transition-colors duration-300">
                  <img 
                    src="/_resources/team/Bartek_new.jpg" 
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
                    src="/_resources/team/Patryk_new.jpg" 
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
      {/* Animacja tylko na opacity + transform (GPU). Zero filter/blur w przejściu -
          rozmycie jest najdroższą operacją na słabszych telefonach. */}
      <div
        className={`fixed bottom-[70px] right-2 md:bottom-[100px] md:right-[112px] z-40 origin-bottom-right will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="w-[calc(100vw-1rem)] md:w-[360px] bg-white rounded-[6px] shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-zinc-200 overflow-hidden flex flex-col">
          
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
                {/* Kaskada avatarów - wyłącznie opacity + translate */}
                <div className={`w-11 h-11 rounded-full border-[3px] border-zinc-50 z-30 relative overflow-hidden bg-zinc-200 will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-x-0 delay-[60ms]' : 'opacity-0 -translate-x-3 delay-0'}`}>
                  <img src="/_resources/team/mateusz.webp" alt="Mateusz" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Mateusz&background=1a75ff&color=fff' }} />
                </div>
                <div className={`w-11 h-11 rounded-full border-[3px] border-zinc-50 z-20 -ml-4 relative overflow-hidden bg-zinc-200 will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-x-0 delay-[110ms]' : 'opacity-0 -translate-x-3 delay-0'}`}>
                  <img src="/_resources/team/Bartek_new.jpg" alt="Bartek" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Bartek&background=666&color=fff' }} />
                </div>
                <div className={`w-11 h-11 rounded-full border-[3px] border-zinc-50 z-10 -ml-4 relative overflow-hidden bg-zinc-200 will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-x-0 delay-[160ms]' : 'opacity-0 -translate-x-3 delay-0'}`}>
                  <img src="/_resources/team/Patryk_new.jpg" alt="Patryk" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Patryk&background=333&color=fff' }} />
                </div>
              </div>

              <div className={`will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-x-0 delay-[160ms]' : 'opacity-0 translate-x-3 delay-0'}`}>
                <h3 className="text-[16px] font-bold text-zinc-950 leading-tight mb-1">Skontaktuj się z nami</h3>
                <p className="text-[12px] text-zinc-600 leading-snug">
                  Umów się na{' '}
                  <Link href="/contact" className="text-blue-600 underline underline-offset-2">
                    darmową konsultację
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* BODY Z DANYMI - jednolite odstępy, każda pozycja z etykietą nad wartością */}
          <div className="p-5 space-y-5">

            {/* Email */}
            <a
              href="mailto:kontakt@whiteslope.studio"
              className={`flex items-start gap-3 group will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 delay-[200ms]' : 'opacity-0 translate-y-3 delay-0'}`}
            >
              <span className="w-9 h-9 shrink-0 rounded-[6px] bg-zinc-100 flex items-center justify-center text-zinc-600">
                <Mail className="w-4 h-4" aria-hidden />
              </span>
              <span className="block">
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mb-1">Email</span>
                <span className="block text-[15px] font-medium text-zinc-950 break-all">
                  kontakt@whiteslope.studio
                </span>
              </span>
            </a>

            {/* Telefon */}
            <div className={`flex items-start gap-3 will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 delay-[240ms]' : 'opacity-0 translate-y-3 delay-0'}`}>
              <span className="w-9 h-9 shrink-0 rounded-[6px] bg-zinc-100 flex items-center justify-center text-zinc-600">
                <Phone className="w-4 h-4" aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mb-1">Telefon</p>
                <div className="flex flex-col gap-2">
                  <a href="tel:+48662581368" className="block leading-tight">
                    <span className="block text-[15px] font-medium text-zinc-950">+48 662 581 368</span>
                    <span className="block text-[11px] text-zinc-500 mt-0.5">Patryk &middot; Fullstack Developer</span>
                  </a>
                  <a href="tel:+48731721760" className="block leading-tight">
                    <span className="block text-[15px] font-medium text-zinc-950">+48 731 721 760</span>
                    <span className="block text-[11px] text-zinc-500 mt-0.5">Mateusz &middot; Web Designer</span>
                  </a>
                </div>
              </div>
            </div>

            <div className={`h-px w-full bg-zinc-100 transition-opacity duration-300 delay-[260ms] ${isOpen ? 'opacity-100' : 'opacity-0'}`} />

            {/* Lokalizacja */}
            <div className={`flex items-start gap-3 will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 delay-[280ms]' : 'opacity-0 translate-y-3 delay-0'}`}>
              <span className="w-9 h-9 shrink-0 rounded-[6px] bg-zinc-100 flex items-center justify-center text-zinc-600">
                <MapPin className="w-4 h-4" aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mb-1">Lokalizacja</p>
                <p className="text-[15px] font-medium text-zinc-950">Białystok, Polska</p>
              </div>
            </div>

            {/* Godziny pracy */}
            <div className={`flex items-start gap-3 will-change-transform transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'opacity-100 translate-y-0 delay-[320ms]' : 'opacity-0 translate-y-3 delay-0'}`}>
              <span className="w-9 h-9 shrink-0 rounded-[6px] bg-zinc-100 flex items-center justify-center text-zinc-600">
                <Clock className="w-4 h-4" aria-hidden />
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500 mb-1">Godziny pracy</p>
                <p className="text-[15px] font-medium text-zinc-950">Pon &ndash; Pt: 9:00 &ndash; 17:00</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}