'use client';

import React from 'react';
import Link from 'next/link';

// Tablica z usługami - tutaj będziesz łatwo dodawać kolejne pozycje
const WEB_DEV_SERVICES = [
  {
    id: 1,
    title: 'Strona internetowa',
    description: 'Strony proste wizytówkowe lub rozbudowane strony biznesowy z wieloma podstronami. ',
    price: '1 500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
      </svg>
    ),
  },
  
  {
    id: 2,
    title: 'Oprogramowanie do zarządzania firmą (ERP)',
    description: 'Dedykowane oprogramowanie do zarządzania firmą. Zarządzanie procesami, dokumentami, klientami i sprzedażą w jednym miejscu.',
    price: '10 000',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        {/* Zewnętrzna, horyzontalna ramka */}
        <rect x="2" y="5" width="20" height="14" rx="2" />
        
        {/* Literka E */}
        <path d="M8.5 9H6.5v6h2" />
        <path d="M6.5 12h1.5" />
        
        {/* Literka R */}
        <path d="M11.5 15v-6h1.5a1.5 1.5 0 0 1 0 3h-1.5" />
        <path d="M12 12l1.5 3" />
        
        {/* Literka P */}
        <path d="M15.5 15v-6h1.5a1.5 1.5 0 0 1 0 3h-1.5" />
      </svg>
    ),
  },
    {
    id: 3,
    title: 'Aplikacja SaaS (Software as a Service)',
    description: 'Aplikacja SaaS to oprogramowanie dostępne w chmurze, które umożliwia użytkownikom korzystanie z aplikacji przez internet bez konieczności instalacji. Idealne dla firm, które chcą oferować swoje usługi online i pobierać opłaty abonamentowe.',
    price: '10 000',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Poprawki i aktualizacje istniejącej strony',
    description: 'Aktualizacja treści, poprawki błędów, optymalizacja wydajności i bezpieczeństwa. Utrzymanie strony w aktualnym stanie.',
    price: '600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),

  },
  {
    id: 5,
    title: 'SEO i optymalizacja strony',
    description: 'Optymalizacja strony pod kątem wyszukiwarek internetowych, poprawa widoczności w wynikach wyszukiwania, analiza słów kluczowych i optymalizacja treści.',
    price: '600',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        {/* Ramka */}
        <rect x="2" y="6" width="20" height="12" rx="2" />
        
        {/* Literka S */}
        <path d="M7.5 10h-2a1 1 0 0 0 0 2h2a1 1 0 0 1 0 2h-2" />
        
        {/* Literka E */}
        <path d="M12.5 10h-2v4h2" />
        <path d="M10.5 12h1.5" />
        
        {/* Literka O */}
        <rect x="15.5" y="10" width="2.5" height="4" rx="1" />
      </svg>
    ),
  }
];

export function PricingWebDevelopment() {
  return (
    // Dodałem scroll-mt-[120px], żeby linki "Wybierz cennik dla" nie ucinały nagłówka
    <section id="category-web-development" className="py-20 px-4 bg-zinc-50/50 scroll-mt-[120px]">
      {/* Zwiększona szerokość z 1000px na 1200px */}
      <div className="container mx-auto max-w-[1200px]">
        
        <h2 className="text-3xl font-bold mb-12 text-center text-zinc-950">
          Cennik - Web Development
        </h2>

        <div className="flex flex-col gap-4">
          {WEB_DEV_SERVICES.map((service) => (
            // 1. Zmieniamy główny wrapper na <div> z position: relative
            <div 
              key={service.id} 
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border border-zinc-200 rounded-[32px] hover:shadow-md hover:border-zinc-300 transition-all duration-300 group"
            >
              
              {/* 2. Niewidzialny link na cały wiersz (kieruje do opisu usług webowych) */}
              <Link 
                href="/pricing/website" 
                className="absolute inset-0 z-0 rounded-[32px]" 
                aria-label={`Przejdź do ${service.title}`}
              />

              {/* LEWA STRONA: Ikonka + Tekst (dodajemy relative z-10 i pointer-events-none) */}
              <div className="relative z-10 flex items-start md:items-center gap-5 w-full md:w-2/3 pointer-events-none">
                
                {/* Ikonka statyczna */}
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  {service.icon}
                </div>

                {/* Teksty */}
                <div className="flex flex-col">
                  <h3 className="text-[20px] font-bold text-zinc-950 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-zinc-500 leading-relaxed pr-0 md:pr-6">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* PRAWA STRONA: Cena + CTA (dodajemy relative z-10) */}
              <div className="relative z-10 flex flex-row items-center justify-between w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t border-zinc-100 md:border-none gap-6 shrink-0">
                
                {/* Cena - Zmieniona na ciemne kolory (zinc) tak jak w AI */}
                <div className="flex items-start text-zinc-950 pointer-events-none">
                  <span className="text-[13px] font-semibold mt-0 mr-1.5 text-zinc-500">od</span>
                  <span className="text-[28px] font-bold leading-none tracking-tight">{service.price}</span>
                  <span className="text-[13px] text-zinc-400 font-semibold self-end mb-0 ml-1.5">PLN</span>
                </div>

                {/* 3. Prawdziwy, niezależny przycisk Kontakt (z-20), Niebieski */}
                <Link
                  href="/contact"
                  className="relative z-20 px-6 py-2.5 rounded-full bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors duration-300"
                >
                  Sprawdź
                </Link>

                {/* 3. Prawdziwy, niezależny przycisk Kontakt (z-20), Niebieski */}
                <Link
                  href="/contact"
                  className="relative z-20 px-6 py-2.5 rounded-full bg-black text-white text-[14px] font-medium hover:bg-black transition-colors duration-300"
                >
                  Kontakt
                </Link>
                
              </div>
            </div>
          ))}
        </div>

        {/* ======================================= */}
        {/* SEKCJA: Terminy realizacji */}
        {/* ======================================= */}
        <div className="mt-12 bg-[#e3f1ff] rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start border border-[#b8dcff] shadow-sm">
          
          {/* Lewa strona - Tytuł */}
          <div className="w-full md:w-1/3 shrink-0">
            <h3 className="text-[22px] font-bold text-blue-900 mb-3 flex items-center gap-3 leading-tight">
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Orientacyjny czas realizacji
            </h3>
            <p className="text-[14px] text-blue-900/90 font-medium leading-relaxed">
              Szanujemy Twój czas. Zobacz, jak długo średnio trwa wdrożenie poszczególnych rozwiązań.
            </p>

            <p className="text-[14px] text-blue-900/90 font-medium leading-relaxed mt-4">
                Opisując szczegółowo projekt w mailu lub formularzu kontaktowym, przyspieszasz proces wyceny i ustalenia harmonogramu prac.
            </p>
          </div>

          {/* Prawa strona - Lista */}
          <div className="w-full md:w-2/3">
            <ul className="flex flex-col gap-6">
              
              {/* Proste strony */}
              <li className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                <div>
                  <span className="font-bold text-blue-900 text-[16px]">Proste strony internetowe (ok. 7 dni)</span>
                  <p className="text-[14px] text-blue-900/90 mt-1 leading-relaxed">
                    Szybkie wdrożenie projektów typu One-Page (1-2 zakładki, do 5 sekcji na stronie + formularz kontaktowy).
                  </p>
                </div>
              </li>

              {/* Rozbudowane strony */}
              <li className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                <div>
                  <span className="font-bold text-blue-900 text-[16px]">Większe strony firmowe (2 do 3 tygodni lub ocena indywidualna)</span>
                  <p className="text-[14px] text-blue-900/90 mt-1 leading-relaxed">
                    Czas pracy zależy bezpośrednio od skali projektu, liczby podstron oraz stopnia zaawansowania architektury treści.
                  </p>
                </div>
              </li>

              {/* SaaS / Systemy */}
              <li className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                <div>
                  <span className="font-bold text-blue-900 text-[16px]">SaaS i systemy dedykowane (Ocena indywidualna)</span>
                  <p className="text-[14px] text-blue-900/90 mt-1 leading-relaxed">
                    Aplikacje webowe to złożone projekty, których budowa zajmuje zazwyczaj minimum kilka miesięcy. Harmonogram prac podajemy w ofercie po omówieniu Twoich potrzeb.
                  </p>
                </div>
              </li>

            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}