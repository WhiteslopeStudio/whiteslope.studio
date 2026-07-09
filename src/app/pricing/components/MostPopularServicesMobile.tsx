'use client';

import React from 'react';
import Link from 'next/link';

export default function MostPopularServicesMobile() {
  return (
    <section className="pb-16 px-6 bg-white overflow-hidden">
      <div className="w-full mx-auto">
        
        {/* Tytuł Sekcji */}
        <h2 className="font-bold mb-10 text-center text-[32px] tracking-tight text-zinc-950">
          Najpopularniejsze usługi
        </h2>
        
        {/* Kontener na karty */}
        <div className="flex flex-col gap-10">
          
          {/* ======================================= */}
          {/* KARTA 1: SaaS & ERP */}
          {/* ======================================= */}
          <div className="p-6 border border-zinc-200 rounded-[28px] flex flex-col items-start text-left bg-white shadow-sm">
            
            {/* Badge */}
            <div className="border border-black text-black px-4 py-1.5 rounded-full text-[12px] font-semibold mb-5 bg-lime-100/50">
              Mądra aktywacja firmy
            </div>

            {/* Tytuł */}
            <h3 className="text-[24px] font-bold text-zinc-950 mb-3 leading-tight">
              Systemy ERP i produkty SaaS
            </h3>

            {/* Krótki opis */}
            <p className="text-[15px] text-zinc-600 mb-8 leading-relaxed max-w-[280px]">
              <b>Uzyskaj spokój</b> w zarządzaniu Twoją firmą albo stwórz swój własny produkt z subskrypcją.
            </p>

            {/* Cena */}
            <div className="flex items-start justify-start text-blue-500 mb-4">
              <span className="text-[14px] font-bold mt-1 mr-1">od</span>
              <span className="text-[34px] font-bold leading-none tracking-tight">10 000</span>
              <span className="text-[14px] text-zinc-400 font-semibold self-end ml-1.5 mb-0.5">PLN</span>
            </div>

            {/* Przycisk CTA (Full width dla mobile) */}
            <div className="relative w-full mt-6 overflow-hidden rounded-full p-[2px] group bg-white shadow-sm">
              <span className="absolute inset-[-1000%] opacity-100 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#79b806_50%,transparent_100%)] transition-opacity duration-300" />
              <Link
                href="/pricing/website"
                className="relative z-10 flex h-[50px] w-full items-center justify-center rounded-full text-[15px] font-semibold text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-md active:scale-95 transition-all duration-300"
              >
                Zobacz więcej
              </Link>
            </div>

            {/* Subtelny link do kontaktu */}
            <div className="w-full flex justify-center mt-[18px] mb-8">
              <Link
                href="/contact"
                className="text-[14px] font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors duration-300"
              >
                Napisz do nas
              </Link>
            </div>

            {/* Główna korzyść z ikonką */}
            <div className="flex items-start gap-3 mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" viewBox="0 0 344.963 344.963" fill="currentColor">
                <path d="M321.847,86.242l-40.026-23.11l-23.104-40.02h-46.213l-40.026-23.11l-40.026,23.11H86.239 l-23.11,40.026L23.11,86.242v46.213L0,172.481l23.11,40.026v46.213l40.026,23.11l23.11,40.026h46.213l40.02,23.104l40.026-23.11 h46.213l23.11-40.026l40.026-23.11v-46.213l23.11-40.026l-23.11-40.026V86.242H321.847z M156.911,243.075 c-3.216,3.216-7.453,4.779-11.671,4.72c-4.219,0.06-8.455-1.504-11.671-4.72l-50.444-50.444c-6.319-6.319-6.319-16.57,0-22.889 l13.354-13.354c6.319-6.319,16.57-6.319,22.889,0l25.872,25.872l80.344-80.35c6.319-6.319,16.57-6.319,22.889,0l13.354,13.354 c6.319,6.319,6.319,16.57,0,22.889L156.911,243.075z" />
              </svg>
              <span className="text-[14px] font-medium text-zinc-950 leading-snug">
                Gwarancja skalowalnej architektury i pełnego bezpieczeństwa danych.
              </span>
            </div>

            <hr className="w-full border-t border-zinc-200 mb-6" />

            {/* LISTA CECH (Mobile) */}
            <div className="flex flex-col gap-6 w-full">
              
              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 10V7a4 4 0 0 1 8 0v3"/><rect width="16" height="10" x="4" y="10" rx="2" ry="2"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Bezpieczeństwo i logowania</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">Wdrażamy <b>szyfrowane połączenia</b> i solidne systemy autoryzacji chroniące przed atakami.</p>
                </div>
              </div>

              <hr className="w-full border-t border-zinc-100" />

              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Integracje subskrypcji</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">Podłączamy bramkę płatniczą Stripe, pozwalając na <b>automatyczne pobieranie opłat</b>.</p>
                </div>
              </div>

              <hr className="w-full border-t border-zinc-100" />

              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Architektura bazy danych</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">Projektujemy system zapewniający <b>płynne działanie</b> przy rosnącej liczbie użytkowników.</p>
                </div>
              </div>

            </div>
          </div>

          {/* ======================================= */}
          {/* KARTA 2: Strony Internetowe */}
          {/* ======================================= */}
          <div className="relative p-6 pt-10 border border-zinc-200 rounded-[28px] flex flex-col items-start text-left bg-white shadow-sm mt-4">            
            
            {/* Limonkowy Badge na mobile */}
            <div className="absolute -top-[16px] right-4 h-[32px] bg-[#ccff00] text-black px-4 flex items-center justify-center rounded-[8px] font-bold text-[12px] uppercase tracking-wide border border-zinc-200 shadow-sm z-10">
              Gotowa nawet w&nbsp;<b>7 dni</b>
            </div>

            {/* Badge */}
            <div className="border border-black text-black px-4 py-1.5 rounded-full text-[12px] font-semibold mb-5 bg-blue-100/50">
              Pokaż się w internecie!
            </div>

            {/* Tytuł */}
            <h3 className="text-[24px] font-bold text-zinc-950 mb-3 leading-tight">
              Strony internetowe i landing page
            </h3>

            {/* Krótki opis */}
            <p className="text-[15px] text-zinc-600 mb-8 leading-relaxed max-w-[280px]">
              <b>Buduj markę online!</b> Upraszczaj kontakt z klientem i zyskaj nowoczesną wizytówkę swojej firmy w sieci.
            </p>

            {/* Cena */}
            <div className="flex items-start justify-start text-blue-500 mb-4">
              <span className="text-[14px] font-bold mt-1 mr-1">od</span>
              <span className="text-[34px] font-bold leading-none tracking-tight">1 500</span>
              <span className="text-[14px] text-zinc-400 font-semibold self-end ml-1.5 mb-0.5">PLN</span>
            </div>

            {/* Przycisk CTA */}
            <div className="relative w-full mt-6 overflow-hidden rounded-full p-[2px] group bg-white shadow-sm">
              <span className="absolute inset-[-1000%] opacity-100 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#0683b8_50%,transparent_100%)] transition-opacity duration-300" />
              <Link
                href="/pricing/website"
                className="relative z-10 flex h-[50px] w-full items-center justify-center rounded-full text-[15px] font-semibold text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-md active:scale-95 transition-all duration-300"
              >
                Zobacz więcej
              </Link>
            </div>

            <div className="w-full flex justify-center mt-[18px] mb-8">
              <Link
                href="/contact"
                className="text-[14px] font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors duration-300"
              >
                Napisz do nas
              </Link>
            </div>

            {/* Główna korzyść */}
            <div className="flex items-start gap-3 mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>
              </svg>
              <span className="text-[14px] font-medium text-zinc-950 leading-snug">
                Gwarancja optymalizacji SEO, RWD i spójnego wyglądu.
              </span>
            </div>

            <hr className="w-full border-t border-zinc-200 mb-6" />

            {/* LISTA CECH */}
            <div className="flex flex-col gap-6 w-full">
              
              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Tanie utrzymanie</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">Autorski kod to darmowy serwer. <b>Płacisz tylko za domenę (~150 zł rocznie)</b>.</p>
                </div>
              </div>

              <hr className="w-full border-t border-zinc-100" />

              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Podstawy SEO lokalnego</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">Od pierwszego dnia strona <b>pracuje na widoczność w Google</b> dla Twojego miasta.</p>
                </div>
              </div>

              <hr className="w-full border-t border-zinc-100" />

              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Bezpośredni kontakt</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">Każdy detal ustalasz z zespołem, co <b>gwarantuje pełną transparentność</b> prac.</p>
                </div>
              </div>

            </div>
          </div>

          {/* ======================================= */}
          {/* KARTA 3: AI Asystent */}
          {/* ======================================= */}
          <div className="relative p-6 pt-10 border border-zinc-200 rounded-[28px] flex flex-col items-start text-left bg-white shadow-sm mt-4">            

            {/* Limonkowy Badge na mobile */}
            <div className="absolute -top-[16px] right-4 h-[32px] bg-[#ccff00] text-black px-4 flex items-center justify-center rounded-[8px] font-bold text-[12px] uppercase tracking-wide border border-zinc-200 shadow-sm z-10">
              Implementacja w&nbsp;<b>kilka godzin</b>
            </div>

            {/* Badge */}
            <div className="border border-black text-black px-4 py-1.5 rounded-full text-[12px] font-semibold mb-5 bg-purple-100/50">
              Redukuj koszty obsługi
            </div>

            {/* Tytuł */}
            <h3 className="text-[24px] font-bold text-zinc-950 mb-3 leading-tight">
              Asystent AI (Chatbot)
            </h3>

            {/* Krótki opis */}
            <p className="text-[15px] text-zinc-600 mb-8 leading-relaxed max-w-[280px]">
              <b>Odpowiadaj klientom 24/7!</b> Zastosuj AI, aby obniżyć koszty i zautomatyzować powtarzalne pytania na stronie.
            </p>

            {/* Cena */}
            <div className="flex items-start justify-start text-blue-500 mb-4">
              <span className="text-[14px] font-bold mt-1 mr-1">od</span>
              <span className="text-[34px] font-bold leading-none tracking-tight">1 000</span>
              <span className="text-[14px] text-zinc-400 font-semibold self-end ml-1.5 mb-0.5">PLN</span>
            </div>

            {/* Przycisk CTA */}
            <div className="relative w-full mt-6 overflow-hidden rounded-full p-[2px] group bg-white shadow-sm">
              <span className="absolute inset-[-1000%] opacity-100 animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#7d06b8_50%,transparent_100%)] transition-opacity duration-300" />
              <Link
                href="/pricing/ai-integration"
                className="relative z-10 flex h-[50px] w-full items-center justify-center rounded-full text-[15px] font-semibold text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-md active:scale-95 transition-all duration-300"
              >
                Zobacz więcej
              </Link>
            </div>

            <div className="w-full flex justify-center mt-[18px] mb-8">
              <Link
                href="/contact"
                className="text-[14px] font-medium text-black underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-900 transition-colors duration-300"
              >
                Napisz do nas
              </Link>
            </div>

            {/* Główna korzyść */}
            <div className="flex items-start gap-3 mb-6 bg-zinc-50 p-4 rounded-xl border border-zinc-100">
              <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="m9 11 2 2 4-4"/>
              </svg>
              <span className="text-[14px] font-medium text-zinc-950 leading-snug">
                Odpowiedzi bazują wyłącznie na Twoich bezpiecznych materiałach.
              </span>
            </div>

            <hr className="w-full border-t border-zinc-200 mb-6" />

            {/* LISTA CECH */}
            <div className="flex flex-col gap-6 w-full">
              
              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Własna baza wiedzy</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">AI jest szkolone na Twoich materiałach, dzięki czemu <b>nigdy nie zmyśla informacji</b>.</p>
                </div>
              </div>

              <hr className="w-full border-t border-zinc-100" />

              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Generowanie Leadów</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">Asystent potrafi <b>aktywnie pozyskiwać kontakty</b> i przesyłać je do Ciebie mailem.</p>
                </div>
              </div>

              <hr className="w-full border-t border-zinc-100" />

              <div className="flex items-start gap-4">
                <svg className="w-5 h-5 shrink-0 text-zinc-700 mt-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>
                </svg>
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-zinc-800 mb-1.5">Obsługa zagraniczna</h4>
                  <p className="text-[14px] text-zinc-600 leading-relaxed">Bot <b>automatycznie dopasowuje język</b> do użytkownika, znosząc barierę komunikacyjną.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}