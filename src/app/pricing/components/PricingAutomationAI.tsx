'use client';

import React from 'react';
import Link from 'next/link';

// Tablica z usługami AI & Automatyzacji
const AI_SERVICES = [
  {
    id: 1,
    title: 'Pomoc Techniczna 24/7 (Chatbot AI)',
    description: 'Wirtualny asystent oparty na bazie wiedzy Twojej firmy. Udziela precyzyjnych odpowiedzi, odciąża zespół i obsługuje klientów o każdej porze.',
    price: '1 000',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Automatyczny doradca E-commerce (Chatbot AI)',
    description: 'Inteligentny asystent dla sklepu internetowego. Pomaga klientom w wyborze produktów, udziela informacji o statusie zamówienia i realnie wspiera sprzedaż.',
    price: '5 000',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Asystent ds. Rezerwacji Spotkań (Chatbot AI)',
    description: 'Automatyzacja umawiania spotkań. Chatbot sam weryfikuje dostępność w Twoim kalendarzu i zapisuje klientów na wolne terminy bez udziału człowieka.',
    price: '1 500',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Obieg dokumentów i danych',
    description: 'Przetwarzanie faktur, formularzy i dokumentów. System automatycznie wyciąga potrzebne informacje i przesyła je do odpowiednich programów.',
    price: '5 000',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="M16 13H8" />
        <path d="M16 17H8" />
        <path d="M10 9H8" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Zarządzanie leadami',
    description: 'Automatyczne ścieżki sprzedażowe. System natychmiast wysyła powiadomienia o nowych zapytaniach, kategoryzuje leady i usprawnia kontakt z klientem.',
    price: '5 000',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="19" x2="19" y1="8" y2="14" />
        <line x1="22" x2="16" y1="11" y2="11" />
      </svg>
    ),
  },
  {
    id: 6,
    title: 'Integracje Systemów (API)',
    description: 'Spinamy używane w firmie narzędzia w jeden ekosystem. Gwarantujemy płynną i bezpieczną wymianę danych między CRM, systemami ERP czy księgowością.',
    price: '5 000',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
        <path d="M12 8v3" />
      </svg>
    ),
  }
];

export function PricingAutomationAI() {
  return (
    // Zgodnie z formatowaniem kategorii: Automatyzacja & AI -> category-automatyzacja-&-ai
    <section id="category-automatyzacja-&-ai" className="py-20 px-4 bg-zinc-50/50 scroll-mt-[120px]">
      <div className="container mx-auto max-w-[1200px]">
        
        <h2 className="text-3xl font-bold mb-12 text-center text-zinc-950">
          Cennik - Automatyzacja & AI
        </h2>

        <div className="flex flex-col gap-4">
          {AI_SERVICES.map((service) => (
            // 1. Zmieniamy główny wrapper na <div> z position: relative
            <div 
              key={service.id} 
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border border-zinc-200 rounded-[32px] hover:shadow-md hover:border-zinc-300 transition-all duration-300 group"
            >
              
              {/* 2. Niewidzialny link na cały wiersz (kieruje do opisu usługi) */}
              <Link 
                href="/pricing/ai-integration/chatbot" 
                className="absolute inset-0 z-0 rounded-[32px]" 
                aria-label={`Przejdź do ${service.title}`}
              />

              {/* LEWA STRONA: Ikonka + Tekst (dodajemy relative z-10) */}
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
                
                {/* Cena */}
                <div className="flex items-start text-zinc-950 pointer-events-none">
                  <span className="text-[13px] font-semibold mt-0 mr-1.5 text-zinc-500">od</span>
                  <span className="text-[28px] font-bold leading-none tracking-tight">{service.price}</span>
                  <span className="text-[13px] text-zinc-400 font-semibold self-end mb-0 ml-1.5">PLN</span>
                </div>

                {/* 3. Prawdziwy, niezależny przycisk Kontakt (dajemy z-20 żeby był wyżej niż ukryty link) */}
                <Link
                  href="/pricing/ai-integration/chatbot"
                  className="relative z-20 px-6 py-2.5 rounded-full bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors duration-300"
                >
                  Sprawdź 
                </Link>

                {/* 3. Prawdziwy, niezależny przycisk Kontakt (dajemy z-20 żeby był wyżej niż ukryty link) */}
                <Link
                  href="/contact"
                  className="relative z-20 px-6 py-2.5 rounded-full bg-zinc-800 text-white text-[14px] font-medium hover:bg-zinc-900 transition-colors duration-300"
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
              Orientacyjny czas wdrożenia
            </h3>
            <p className="text-[14px] text-blue-900/90 font-medium leading-relaxed">
              Szanujemy Twój czas. Zobacz, jak długo średnio trwa uruchomienie gotowych automatyzacji i chatbotów.
            </p>
            <p className="text-[14px] text-blue-900/90 font-medium leading-relaxed mt-4">
              Im dokładniej opiszesz swój proces w wiadomości do nas, tym szybciej przygotujemy wycenę i harmonogram działań.
            </p>
          </div>

          {/* Prawa strona - Lista */}
          <div className="w-full md:w-2/3">
            <ul className="flex flex-col gap-6">
              
              {/* Proste wdrożenia */}
              <li className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                <div>
                  <span className="font-bold text-blue-900 text-[16px]">Chatboty (nawet kilka godzin), proste procesy (ok. 7 dni)</span>
                  <p className="text-[14px] text-blue-900/90 mt-1 leading-relaxed">
                    Szybka konfiguracja wirtualnego asystenta na podstawie dostarczonych przez Ciebie materiałów lub spięcie 2-3 prostych aplikacji.
                  </p>
                </div>
              </li>

              {/* Średnie procesy */}
              <li className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-900 shrink-0"></div>
                <div>
                  <span className="font-bold text-blue-900 text-[16px]">Rozbudowane automatyzacje (2-4 tygodnie)</span>
                  <p className="text-[14px] text-blue-900/90 mt-1 leading-relaxed">
                    Budowa wieloetapowych scenariuszy (np. obieg dokumentów, skomplikowane ścieżki sprzedażowe). Czas obejmuje dokładne testowanie logiki w środowisku.
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