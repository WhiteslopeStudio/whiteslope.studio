'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function MostPopularServices() {
  return (
    <section className="pb-20 px-4 bg-white">
      <div className="container mx-auto max-w-[1200px]">
        <h2 className=" font-bold mb-18 text-center !text-[36px]">Najpopularniejsze usługi</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
            {/* ======================================= */}
          {/* KARTA 1: SaaS */}
          {/* ======================================= */}
          <div className="p-8 border border-zinc-200 rounded-[32px] flex flex-col items-start text-left bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
            
            {/* Badge */}
            <div className="border border-black text-black px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6 bg-lime-100/50">
              Mądra aktywacja firmy
            </div>

            {/* Tytuł */}
            <h3 className="text-[26px] font-[500] text-zinc-950 mb-10 leading-tight">
              Systemy ERP i produkty SaaS
            </h3>

            {/* Krótki opis */}
            <p className="text-[15px] text-zinc-600 mb-20 leading-relaxed max-w-[280px]">
              <b>Uzyskaj spokój</b> w zarządzaniu Twoją firmą albo stwórz swój własny produkt z subskrypcją.
            </p>

            {/* Cena */}
            <div className="flex items-start justify-start text-blue-500 mb-4">
              <span className="text-[16px] font-bold mt-0 mr-1.5">od</span>
              <span className="text-[38px] font-bold leading-none tracking-tight">10 000</span>
              <span className="text-[16px] text-zinc-400 font-semibold self-end  ml-2">PLN</span>
            </div>

            {/* 6. Przycisk CTA (Animowana blada obwódka tylko na hover) */}
            {/* ZMIANA: bg-white zamiast bg-blue-600, żeby obwódka zniknęła na białym tle karty */}
            <div className="relative w-full mt-10 overflow-hidden rounded-full p-[2px] group bg-white">
              
              {/* Kręcący się element - domyślnie niewidoczny (opacity-0), pojawia się na hover */}
              <span className="absolute inset-[-1000%] opacity-0 group-hover:opacity-100 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#79b806_50%,transparent_100%)] transition-opacity duration-300" />
              
              {/* Właściwy niebieski przycisk - na hover lekko ciemnieje */}
              <Link
                href="/pricing/website"
                className="relative z-10 flex h-[52px] w-full items-center justify-center rounded-full text-[15px] font-semibold text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15),0_4px_15px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_rgba(30,64,175,0.5)]"
              >
                Zobacz więcej
              </Link>
            </div>

            {/* Subtelny link do kontaktu (Secondary CTA) pod głównym przyciskiem */}
            <div className="w-full flex justify-center mt-[24px] mb-8">
              <Link
                href="/contact"
                className="text-[14px] font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors duration-300"
              >
                Napisz do nas
              </Link>
            </div>

            {/* Twoja główna korzyść z ikonką (zostawiona wg Twojego pomysłu) */}
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-blue-600 shrink-0" viewBox="0 0 344.963 344.963" fill="currentColor">
                <path d="M321.847,86.242l-40.026-23.11l-23.104-40.02h-46.213l-40.026-23.11l-40.026,23.11H86.239 l-23.11,40.026L23.11,86.242v46.213L0,172.481l23.11,40.026v46.213l40.026,23.11l23.11,40.026h46.213l40.02,23.104l40.026-23.11 h46.213l23.11-40.026l40.026-23.11v-46.213l23.11-40.026l-23.11-40.026V86.242H321.847z M156.911,243.075 c-3.216,3.216-7.453,4.779-11.671,4.72c-4.219,0.06-8.455-1.504-11.671-4.72l-50.444-50.444c-6.319-6.319-6.319-16.57,0-22.889 l13.354-13.354c6.319-6.319,16.57-6.319,22.889,0l25.872,25.872l80.344-80.35c6.319-6.319,16.57-6.319,22.889,0l13.354,13.354 c6.319,6.319,6.319,16.57,0,22.889L156.911,243.075z" />
              </svg>
              <span className="text-[15px] font-medium text-zinc-950 leading-snug">
                Gwarancja skalowalnej architektury i pełnego bezpieczeństwa danych
              </span>
            </div>

            {/* === SEPARATOR === */}
            <hr className="w-full border-t border-zinc-200 mb-6" />

            {/* === LISTA W STYLU GOOGLE === */}
            <div className="flex flex-col gap-5 w-full">
              
              {/* Cecha 1: Bezpieczeństwo */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 10V7a4 4 0 0 1 8 0v3"/><rect width="16" height="10" x="4" y="10" rx="2" ry="2"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Bezpieczeństwo i logowania</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Ochrona wrażliwych danych. Wdrażamy <b>szyfrowane połączenia</b> i solidne systemy autoryzacji, chroniąc przed nieautoryzowanym dostępem.</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 2: Płatności */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Integracje subskrypcji</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Bezproblemowa obsługa transakcji. Podłączamy bramkę płatniczą Stripe, pozwalając na <b>automatyczne pobieranie opłat</b> i zarządzanie abonamentami.</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 3: Baza Danych */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Przemyślana architektura bazy danych</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Fundament systemu. Projektujemy struktury danych, które zapewniają <b>płynne działanie i szybki czas reakcji</b> przy rosnącej liczbie użytkowników.</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 4: Panel */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Przejrzysty panel użytkownika</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Intuicyjny interfejs. Tworzymy dedykowane panele, dzięki którym <b>samodzielne zarządzanie procesami</b> i klientami jest wygodne i logiczne.</p>
                </div>
              </div>

            </div>

          </div>

            {/* ======================================= */}
          {/* KARTA 2: Strony interntwoe */}
          {/* ======================================= */}
<div className="relative mt-10 md:mt-0 p-8 border border-zinc-200 rounded-[32px] flex flex-col items-start text-left bg-white shadow-sm hover:shadow-md transition-shadow duration-300">            
            {/* === LIMONKOWA ZAKŁADKA NAD KARTĄ === */}
            <div className="absolute -top-[34px] right-5 h-[34px] bg-[#ccff00] text-black px-4 flex items-center justify-center rounded-t-[16px] font-bold text-[13px] uppercase tracking-wide border border-b-0 border-zinc-200">
              Gotowa nawet w&nbsp;<b>7 dni</b>
            </div>

            {/* Badge */}
            <div className="border border-black text-black px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6 bg-blue-100/50">
              Pokaż się w internecie!
            </div>

            {/* Tytuł */}
            <h3 className="text-[26px] font-[500] text-zinc-950 mb-9 leading-tight">
              Strony internetowe i landing page
            </h3>

            {/* Krótki opis */}
            <p className="text-[15px] text-zinc-600 mb-8 leading-relaxed max-w-[280px] mb-2">
              <b>Buduj markę online!</b> Jeśli prowadzisz biznes nawet najprostsza strona może zwiększyć zaufanie do Twojej marki. Dzięki stronie upraszasz dojścia do kontaktu i zwiększasz konwersję.
            </p>

            {/* Cena */}
            <div className="flex items-start justify-start text-blue-500 mb-5">
              <span className="text-[16px] font-bold mt-0 mr-1.5">od</span>
              <span className="text-[38px] font-bold leading-none tracking-tight">1 500</span>
              <span className="text-[16px] text-zinc-400 font-semibold self-end ml-2">PLN</span>
            </div>

            {/* 6. Przycisk CTA (Animowana blada obwódka tylko na hover) */}
            {/* ZMIANA: bg-white zamiast bg-blue-600, żeby obwódka zniknęła na białym tle karty */}
            <div className="relative w-full mt-10  overflow-hidden rounded-full p-[2px] group bg-white">
              
              {/* Kręcący się element - domyślnie niewidoczny (opacity-0), pojawia się na hover */}
              <span className="absolute inset-[-1000%] opacity-0 group-hover:opacity-100 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0683b8_50%,transparent_100%)] transition-opacity duration-300" />
              
              <Link
                href="/pricing/website"
                className="relative z-10 flex h-[52px] w-full items-center justify-center rounded-full text-[15px] font-semibold text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15),0_4px_15px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_rgba(30,64,175,0.5)]"
              >
                Zobacz więcej
              </Link>
            </div>

            {/* Subtelny link do kontaktu (Secondary CTA) pod głównym przyciskiem */}
            <div className="w-full flex justify-center mt-[24px] mb-8">
              <Link
                href="/contact"
                className="text-[14px] font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors duration-300"
              >
                Napisz do nas
              </Link>
            </div>

            {/* Twoja główna korzyść z ikonką */}
            <div className="flex items-center gap-3 mb-6">
              {/* Ikonka tarczy z ptaszkiem (symbol gwarancji) */}
              <svg className="w-6 h-6 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
              </svg>
              <span className="text-[15px] font-medium text-zinc-950 leading-snug">
                Gwarancja optymalizacji SEO, RWD i spójnego wyglądu z Twoją marką
              </span>
            </div>

            {/* === SEPARATOR === */}
            <hr className="w-full border-t border-zinc-200 mb-6" />

            {/* === LISTA W STYLU GOOGLE === */}
            <div className="flex flex-col gap-5 w-full">
              
              {/* Cecha 1: Koszty i Technologia */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Dedykowany kod i tanie utrzymanie</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Lekki, autorski kod pozwala nam korzystać z darmowych serwerów. Dzięki temu niwelujemy koszty stałe – <b>płacisz tylko za domenę (~150 zł rocznie)</b>.</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 2: Projekt i UX */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Unikalny design i struktura</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Budujemy od zera. Jasna struktura wspiera intuicyjne poruszanie się po stronie i <b>realnie pomaga w sprzedaży</b>.</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 3: SEO lokalne */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Optymalizacja i podstawy SEO</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Dbamy o szybkość, odpowiednie nagłówki i intencje użytkowników. Strona od pierwszego dnia <b>pracuje na widoczność w Google</b> (np. lokalnie w Białymstoku).</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 4: Komunikacja */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Bezpośredni kontakt</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Eliminujemy pośredników. Każdy detal ustalasz z zespołem technicznym, co <b>przyspiesza zmiany i gwarantuje pełną transparentność</b>.</p>
                </div>
              </div>

            </div>

          </div>

            {/* ======================================= */}
          {/* KARTA 3: Chat - automatyczna komunikacja z klientem */}
          {/* ======================================= */}
<div className="relative mt-10 md:mt-0 p-8 border border-zinc-200 rounded-[32px] flex flex-col items-start text-left bg-white shadow-sm hover:shadow-md transition-shadow duration-300">            

            {/* === LIMONKOWA ZAKŁADKA NAD KARTĄ === */}
            <div className="absolute -top-[34px] right-5 h-[34px] bg-[#ccff00] text-black px-4 flex items-center justify-center rounded-t-[16px] font-bold text-[13px] uppercase tracking-wide border border-b-0 border-zinc-200">
                Implementacja w&nbsp;<b>kilka godzin</b>
            </div>

            {/* Badge */}
            <div className="border border-black text-black px-4 py-1.5 rounded-full text-[13px] font-semibold mb-6 bg-purple-100/50">
              Redukuj koszty obsługi klienta
            </div>

            {/* Tytuł */}
            <h3 className="text-[26px] font-[500] text-zinc-950 mb-3 leading-tight mb-8">
              Asystent AI (chatbot na stronie)
            </h3>

            {/* Krótki opis */}
            <p className="text-[15px] text-zinc-600 mb-9 leading-relaxed max-w-[280px]">
              <b>Co gdyby Twoi klienci mogli otrzymywać odpowiedzi 24/7?</b> Jeśli wprowadzisz rozwiązanie oparte na AI, zapłacisz mnniej za obsługę klienta i zajmiesz się tym, co naprawdę ważne.
            </p>

            {/* Cena */}
            <div className="flex items-start justify-start text-blue-500 mb-5">
              <span className="text-[16px] font-bold mt-0 mr-1.5">od</span>
              <span className="text-[38px] font-bold leading-none tracking-tight">1 000</span>
              <span className="text-[16px] text-zinc-400 font-semibold self-end  ml-2">PLN</span>
            </div>

            {/* 6. Przycisk CTA (Animowana blada obwódka tylko na hover) */}
            {/* ZMIANA: bg-white zamiast bg-blue-600, żeby obwódka zniknęła na białym tle karty */}
            <div className="relative w-full mt-10 overflow-hidden rounded-full p-[2px] group bg-white">
              
              {/* Kręcący się element - domyślnie niewidoczny (opacity-0), pojawia się na hover */}
              <span className="absolute inset-[-1000%] opacity-0 group-hover:opacity-100 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#7d06b8_50%,transparent_100%)] transition-opacity duration-300" />
              
              {/* Właściwy niebieski przycisk - na hover lekko ciemnieje */}
              {/* Wypukły przycisk - na hover ciemnieje (deep blue) */}
              <Link
                href="/pricing/ai-integration/chatbot"
                className="relative z-10 flex h-[52px] w-full items-center justify-center rounded-full text-[15px] font-semibold text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.15),0_4px_15px_rgba(59,130,246,0.3)] transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.3),0_8px_20px_rgba(30,64,175,0.5)]"
              >
                Zobacz więcej
              </Link>
            </div>

            {/* Subtelny link do kontaktu (Secondary CTA) pod głównym przyciskiem */}
            <div className="w-full flex justify-center mt-[24px] mb-8">
              <Link
                href="/contact"
                className="text-[14px] font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors duration-300"
              >
                Napisz do nas
              </Link>
            </div>

            {/* Twoja główna korzyść z ikonką */}
            <div className="flex items-center gap-3 mb-6">
              {/* Ikonka chmurki / wiadomości z ptaszkiem */}
              <svg className="w-6 h-6 text-blue-600 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="m9 11 2 2 4-4"/>
              </svg>
              <span className="text-[15px] font-medium text-zinc-950 leading-snug">
                24/7 i odpowiedzi bazujące wyłącznie na Twoich materiałach
              </span>
            </div>

            {/* === SEPARATOR === */}
            <hr className="w-full border-t border-zinc-200 mb-6" />

            {/* === LISTA W STYLU GOOGLE === */}
            <div className="flex flex-col gap-5 w-full">
              
              {/* Cecha 1: Baza wiedzy */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Własna baza wiedzy</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Automatyczny asystent jest szkolony na Twoich materiałach tzn.<b> nie zmyśla informacji</b>, ale korzysta z Twojej wiedzy, którą posiadasz.</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 2: Leady */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Automatyczne zbieranie leadów</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Asystent nie tylko rozmawia, ale potrafi <b>aktywnie pozyskiwać kontakty</b> (np. maile, telefony) i od razu przesyłać je do Ciebie.</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 3: Integracja */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Szybka instalacja na stronie</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Bota wpinamy w Twoją aktualną stronę internetową. Całość jest <b>gotowa do działania nawet w kilka godzin</b> i nie spowalnia witryny.</p>
                </div>
              </div>

              {/* === SEPARATOR === */}
              <hr className="w-full border-t border-zinc-200" />

              {/* Cecha 4: Wielojęzyczność */}
              <div className="flex items-start gap-4">
                <svg className="w-[22px] h-[22px] shrink-0 text-zinc-700 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-700 mb-3">Wielojęzyczna obsługa</h4>
                  <p className="text-[14px] text-zinc-500 mt-0.5">Asystent potrafi automatycznie dopasować się do języka użytkownika. Dzięki temu <b>bez problemu obsłużysz klientów z zagranicy</b>, nie zatrudniając tłumaczy.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}