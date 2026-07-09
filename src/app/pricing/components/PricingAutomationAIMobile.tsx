'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const AI_SERVICES = [
  {
    id: 1,
    title: 'Pomoc Techniczna 24/7 (AI)',
    price: '1\u00A0000',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
    title: 'Doradca E-commerce (AI)',
    price: '5\u00A0000',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Rezerwacja Spotkań (AI)',
    price: '1\u00A0500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
    price: '5\u00A0000',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
    price: '5\u00A0000',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
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
    price: '5\u00A0000',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="16" y="16" width="6" height="6" rx="1" />
        <rect x="2" y="16" width="6" height="6" rx="1" />
        <rect x="9" y="2" width="6" height="6" rx="1" />
        <path d="M5 16v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
        <path d="M12 8v3" />
      </svg>
    ),
  }
];

export default function PricingAutomationAIMobile() {
  return (
    <section id="category-automatyzacja-&-ai" className="py-12 px-4 bg-white scroll-mt-[100px]">
      <div className="w-full mx-auto">
        
        <h2 className="text-[28px] font-bold mb-6 text-zinc-950 tracking-tight ml-1">
          Automatyzacja & AI - Ceny
        </h2>

        {/* --- OSOBNE KARTY DLA KAŻDEJ USŁUGI (Google Style) --- */}
        <div className="flex flex-col gap-2.5 mb-6">
          {AI_SERVICES.map((service) => (
            <Link 
              key={service.id} 
              href="/pricing/ai-integration"
              className="flex items-center justify-between p-4 bg-zinc-100 rounded-full active:bg-zinc-200 transition-colors"
            >
              
              {/* LEWA: Ikona + Tytuł (zmniejszony odstęp gap-2.5) */}
              <div className="flex items-center gap-2.5 flex-1 pr-2">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-zinc-700 flex items-center justify-center shrink-0">
                  {service.icon}
                </div>
                <h3 className="text-[15px] font-bold text-zinc-900 leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* PRAWA: Cena + Strzałka */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex flex-col items-end justify-center mt-0.5">
                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider leading-none mb-1"></span>
                  <div className="flex items-baseline gap-1">
                    od <span className="text-[16px] font-bold text-zinc-900 leading-none whitespace-nowrap">{service.price}</span>
                    <span className="text-[11px] font-semibold text-zinc-500 leading-none">PLN</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-900 text-bold" />
              </div>

            </Link>
          ))}
        </div>

        {/* --- GŁÓWNY PRZYCISK (Szary, neutralny, bez niebieskiego) --- */}
        <Link
          href="/contact"
          className="w-full h-[52px] flex items-center justify-center rounded-full bg-zinc-200 text-zinc-900 text-[15px] font-bold hover:bg-zinc-300 active:bg-zinc-400 transition-colors mb-12 shadow-[0_8px_12px_rgba(0,0,0,0.05)]"
        >
          Napisz do nas
        </Link>


        {/* ======================================= */}
        {/* SEKCJA: Terminy realizacji (Stonowane kolory) */}
        {/* ======================================= */}
        <div className="bg-purple-100 rounded-[24px] p-5 flex flex-col gap-5 border border-zinc-200">
          
          <div className="flex flex-col gap-2">
            <h3 className="text-[17px] font-bold text-zinc-900 flex items-center gap-2.5 leading-tight">
              <svg className="w-5 h-5 shrink-0 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Czas realizacji
            </h3>
            <p className="text-[13px] text-zinc-600 font-medium leading-relaxed">
              Im dokładniej opiszesz swój proces, tym szybciej przygotujemy wycenę.
            </p>
          </div>

          <hr className="border-zinc-200" />

          <ul className="flex flex-col gap-4">
            <li className="flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                <span className="font-bold text-zinc-900 text-[14px] leading-snug">Chatboty i proste procesy (ok. 7 dni)</span>
              </div>
              <p className="text-[13px] text-zinc-500 leading-relaxed pl-4">
                Szybka konfiguracja na podstawie Twoich materiałów lub proste integracje.
              </p>
            </li>

            <li className="flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                <span className="font-bold text-zinc-900 text-[14px] leading-snug">Rozbudowane automatyzacje (2 - 4 tyg.)</span>
              </div>
              <p className="text-[13px] text-zinc-500 leading-relaxed pl-4">
                Wieloetapowe scenariusze (obieg dokumentów, lejki sprzedażowe) i ich testowanie.
              </p>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
}