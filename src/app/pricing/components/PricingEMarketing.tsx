'use client';

import React from 'react';
import Link from 'next/link';

// Tablica z usługami Marketing & Wideo
const MARKETING_SERVICES = [
  {
    id: 1,
    title: 'Email Marketing',
    description: 'Projektowanie i wdrożenie podstawowych kampanii oraz automatyzacji. Przygotowanie szablonów newsletterów i konfiguracja narzędzi do wysyłki.',
    price: '800',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Video Marketing',
    description: 'Kompleksowa produkcja materiałów wideo dla firm. Od planowania scenariusza, przez profesjonalne nagrania, aż po zaawansowany montaż i postprodukcję.',
    price: 'indywidualna',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Grafika 2D i 3D',
    description: 'Projektowanie identyfikacji wizualnej, materiałów promocyjnych oraz zaawansowane modelowanie i rendering trójwymiarowych produktów.',
    price: 'indywidualna',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.1 11.1-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4Z" />
        <path d="m12 22 5-5M12 2l-5 5M4.5 16.5l5 5M19.5 7.5l-5-5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Produkcja treści UGC (User Generated Content)',
    description: 'Tworzenie autentycznych materiałów wideo w formatach pionowych (Reels, TikTok, Shorts). Angażujące treści, które budują bezpośrednie zaufanie do marki.',
    price: 'indywidualna',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
        <path d="M10 6h4" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Obróbka i postprodukcja dźwięku',
    description: 'Profesjonalny montaż audio, czyszczenie szumów, wyrównywanie poziomów głośności oraz mastering materiałów dźwiękowych do filmów, podcastów i spotów.',
    price: '200',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  }
];

export function PricingEMarketing() {
  return (
    <section id="category-marketing-&-wideo" className="py-20 px-4 bg-zinc-50/50 scroll-mt-[120px]">
      <div className="container mx-auto max-w-[1200px]">
        
        <h2 className="text-3xl font-bold mb-12 text-center text-zinc-950">
          Cennik - Marketing & Wideo
        </h2>

        <div className="flex flex-col gap-4">
          {MARKETING_SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-white border border-zinc-200 rounded-[32px] hover:shadow-md hover:border-zinc-300 transition-all duration-300 group"
            >
              
              {/* Niewidzialny link na cały wiersz */}
              <Link 
                href="/contact" 
                className="absolute inset-0 z-0 rounded-[32px]" 
                aria-label={`Zapytaj o ${service.title}`}
              />

              {/* LEWA STRONA: Ikonka + Tekst */}
              <div className="relative z-10 flex items-start md:items-center gap-5 w-full md:w-2/3 pointer-events-none">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  {service.icon}
                </div>

                <div className="flex flex-col">
                  <h3 className="text-[20px] font-bold text-zinc-950 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[14px] text-zinc-500 leading-relaxed pr-0 md:pr-6">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* PRAWA STRONA: Cena + CTA */}
              <div className="relative z-10 flex flex-row items-center justify-between w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t border-zinc-100 md:border-none gap-6 shrink-0">
                
                {/* Dynamiczne sterowanie wyświetlaniem ceny */}
                <div className="flex items-start text-zinc-950 pointer-events-none">
                  {service.price === 'indywidualna' ? (
                    <span className="text-[16px] font-bold text-zinc-700 whitespace-nowrap">Wycena indywidualna</span>
                  ) : (
                    <>
                      <span className="text-[13px] font-semibold mt-0 mr-1.5 text-zinc-500">od</span>
                      <span className="text-[28px] font-bold leading-none tracking-tight">{service.price}</span>
                      <span className="text-[13px] text-zinc-400 font-semibold self-end mb-0 ml-1.5">PLN</span>
                    </>
                  )}
                </div>

                {/* Przycisk Sprawdź */}
                <Link
                  href="/pricing/video-marketing"
                  className="relative z-20 px-6 py-2.5 rounded-full bg-blue-500 text-white text-[14px] font-medium hover:bg-blue-600 transition-colors duration-300"
                >
                  Sprawdź
                </Link>

                {/* Przycisk Kontakt */}
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
        {/* SEKCJA: Szczegóły wyceny projektów */}
        {/* ======================================= */}
        <div className="mt-12 bg-[#faf5ff] rounded-[32px] p-8 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start border border-[#f3e8ff] shadow-sm">
          
          {/* Lewa strona - Tytuł */}
          <div className="w-full md:w-1/3 shrink-0">
            <h3 className="text-[22px] font-bold text-purple-950 mb-3 flex items-center gap-3 leading-tight">
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              Jak wyceniamy projekty?
            </h3>
            <p className="text-[14px] text-purple-950/80 font-medium leading-relaxed">
              Materiały wideo i projekty graficzne wymagają indywidualnego podejścia. Zadbaj o szczegóły, aby otrzymać precyzyjną ofertę.
            </p>
          </div>

          {/* Prawa strona - Instrukcja i wskazówki */}
          <div className="w-full md:w-2/3">
            <ul className="flex flex-col gap-6">
              
              <li className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-900 shrink-0"></div>
                <div>
                  <span className="font-bold text-purple-950 text-[16px]">Podaj jak najwięcej szczegółów</span>
                  <p className="text-[14px] text-purple-950/80 mt-1 leading-relaxed">
                    Opisz dokładnie swoje oczekiwania, planowaną długość materiału wideo, liczbę potrzebnych formatów lub format wyjściowy dźwięku. Im więcej wiemy na starcie, tym dokładniejszy harmonogram przygotujemy.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-purple-900 shrink-0"></div>
                <div>
                  <span className="font-bold text-purple-950 text-[16px]">Szybka informacja zwrotna</span>
                  <p className="text-[14px] text-purple-950/80 mt-1 leading-relaxed">
                    Po otrzymaniu zgłoszenia przez formularz lub e-mail, analizujemy przesłane wytyczne i wracamy do Ciebie z gotową wyceną projektu oraz proponowanym terminem realizacji.
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