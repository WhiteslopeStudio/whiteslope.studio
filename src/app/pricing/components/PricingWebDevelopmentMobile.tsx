'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const WEB_DEV_SERVICES = [
  {
    id: 1,
    title: 'Strona internetowa',
    price: '1\u00A0500',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <line x1="3" x2="21" y1="9" y2="9" />
        <line x1="9" x2="9" y1="21" y2="9" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Oprogramowanie (ERP)',
    price: '10\u00A0000',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M8.5 9H6.5v6h2" />
        <path d="M6.5 12h1.5" />
        <path d="M11.5 15v-6h1.5a1.5 1.5 0 0 1 0 3h-1.5" />
        <path d="M12 12l1.5 3" />
        <path d="M15.5 15v-6h1.5a1.5 1.5 0 0 1 0 3h-1.5" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Aplikacja SaaS',
    price: '10\u00A0000',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Poprawki na stronie',
    price: '600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'SEO i optymalizacja',
    price: '600',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M7.5 10h-2a1 1 0 0 0 0 2h2a1 1 0 0 1 0 2h-2" />
        <path d="M12.5 10h-2v4h2" />
        <path d="M10.5 12h1.5" />
        <rect x="15.5" y="10" width="2.5" height="4" rx="1" />
      </svg>
    ),
  }
];

export default function PricingWebDevelopmentMobile() {
  return (
    <section id="category-web-development" className="py-12 px-4 bg-white scroll-mt-[100px]">
      <div className="w-full mx-auto">
        
        <h2 className="text-[28px] font-bold mb-6 text-zinc-950 tracking-tight ml-1">
          Web Development - Ceny
        </h2>

        {/* --- OSOBNE KARTY DLA KAŻDEJ USŁUGI (Google Style) --- */}
        <div className="flex flex-col gap-2.5 mb-6">
          {WEB_DEV_SERVICES.map((service) => (
            <Link 
              key={service.id} 
              href="/pricing/website"
              className="flex items-center justify-between p-4 bg-zinc-100 rounded-full active:bg-zinc-200 transition-colors"
            >
              
              {/* LEWA: Ikona + Tytuł (zmniejszony odstęp gap-2.5 żeby było więcej miejsca na cenę) */}
              <div className="flex items-center gap-2.5 flex-1 pr-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-zinc-700 flex items-center justify-center shrink-0">
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
        <div className="bg-blue-100 rounded-[24px] p-5 flex flex-col gap-5 border border-zinc-200">
          
          <div className="flex flex-col gap-2">
            <h3 className="text-[17px] font-bold text-zinc-900 flex items-center gap-2.5 leading-tight">
              <svg className="w-5 h-5 shrink-0 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Czas realizacji
            </h3>
            <p className="text-[13px] text-zinc-600 font-medium leading-relaxed">
              Szczegółowy opis projektu przyśpiesza wycenę.
            </p>
          </div>

          <hr className="border-zinc-200" />

          <ul className="flex flex-col gap-4">
            <li className="flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                <span className="font-bold text-zinc-900 text-[14px] leading-snug">Proste strony (ok. 7 dni)</span>
              </div>
              <p className="text-[13px] text-zinc-500 leading-relaxed pl-4">
                Projekty typu One-Page (do 5 sekcji).
              </p>
            </li>

            <li className="flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                <span className="font-bold text-zinc-900 text-[14px] leading-snug">Większe strony (2 - 3 tyg.)</span>
              </div>
              <p className="text-[13px] text-zinc-500 leading-relaxed pl-4">
                Zależy od skali i liczby podstron.
              </p>
            </li>

            <li className="flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                <span className="font-bold text-zinc-900 text-[14px] leading-snug">SaaS i systemy (Indywidualnie)</span>
              </div>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
}