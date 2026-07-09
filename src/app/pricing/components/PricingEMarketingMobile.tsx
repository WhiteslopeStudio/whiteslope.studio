'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const MARKETING_SERVICES = [
  {
    id: 1,
    title: 'Email Marketing',
    price: '800',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Video Marketing',
    price: 'indywidualna',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Grafika 2D i 3D',
    price: 'indywidualna',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.1 11.1-9-9a1 1 0 0 0-1.4 0l-9 9a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.4Z" />
        <path d="m12 22 5-5M12 2l-5 5M4.5 16.5l5 5M19.5 7.5l-5-5" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Produkcja UGC (Shorts)',
    price: 'indywidualna',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
        <path d="M10 6h4" />
      </svg>
    ),
  },
  {
    id: 5,
    title: 'Obróbka dźwięku',
    price: '200',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
  }
];

export default function PricingEMarketingMobile() {
  return (
    <section id="category-marketing-&-wideo" className="py-12 px-4 bg-white scroll-mt-[100px]">
      <div className="w-full mx-auto">
        
        <h2 className="text-[28px] font-bold mb-6 text-zinc-950 tracking-tight ml-1">
          Marketing & Wideo - Ceny
        </h2>

        {/* --- OSOBNE KARTY DLA KAŻDEJ USŁUGI (Google Style) --- */}
        <div className="flex flex-col gap-2.5 mb-6">
          {MARKETING_SERVICES.map((service) => (
            <Link 
              key={service.id} 
              href="/pricing/video-marketing"
              className="flex items-center justify-between p-4 bg-zinc-100 rounded-full active:bg-zinc-200 transition-colors"
            >
              
              {/* LEWA: Ikona + Tytuł */}
              <div className="flex items-center gap-2.5 flex-1 pr-2">
                {/* Zmiana na yellow-100 */}
                <div className="w-10 h-10 rounded-full bg-yellow-100 text-zinc-700 flex items-center justify-center shrink-0">
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
                  
                  {/* Logika dla ceny "indywidualna" vs kwota */}
                  {service.price === 'indywidualna' ? (
                    <span className="text-[14px] font-bold text-zinc-900 leading-none whitespace-nowrap">
                      Indywidualna
                    </span>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      od <span className="text-[16px] font-bold text-zinc-900 leading-none whitespace-nowrap">{service.price}</span>
                      <span className="text-[11px] font-semibold text-zinc-500 leading-none">PLN</span>
                    </div>
                  )}

                </div>
                <ChevronRight className="w-4 h-4 text-zinc-900 text-bold" />
              </div>

            </Link>
          ))}
        </div>

        {/* --- GŁÓWNY PRZYCISK (Szary, neutralny) --- */}
        <Link
          href="/contact"
          className="w-full h-[52px] flex items-center justify-center rounded-full bg-zinc-200 text-zinc-900 text-[15px] font-bold hover:bg-zinc-300 active:bg-zinc-400 transition-colors mb-12 shadow-[0_8px_12px_rgba(0,0,0,0.05)]"
        >
          Napisz do nas
        </Link>


        {/* ======================================= */}
        {/* SEKCJA: Terminy realizacji (Zmieniono na yellow-50) */}
        {/* ======================================= */}
        <div className="bg-yellow-50 rounded-[24px] p-5 flex flex-col gap-5 border border-zinc-200">
          
          <div className="flex flex-col gap-2">
            <h3 className="text-[17px] font-bold text-zinc-900 flex items-center gap-2.5 leading-tight">
              <svg className="w-5 h-5 shrink-0 text-zinc-700" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
              </svg>
              Jak wyceniamy projekty?
            </h3>
            <p className="text-[13px] text-zinc-600 font-medium leading-relaxed">
              Dostarcz jak najwięcej informacji, abyśmy mogli przygotować dokładną wycenę.
            </p>
          </div>

          <hr className="border-zinc-200" />

          <ul className="flex flex-col gap-4">
            <li className="flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                <span className="font-bold text-zinc-900 text-[14px] leading-snug">Szczegóły i formaty</span>
              </div>
              <p className="text-[13px] text-zinc-500 leading-relaxed pl-4">
                Opisz długość wideo, liczbę formatów i dokładne oczekiwania.
              </p>
            </li>

            <li className="flex flex-col gap-1">
              <div className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-800 shrink-0" />
                <span className="font-bold text-zinc-900 text-[14px] leading-snug">Szybka wycena</span>
              </div>
              <p className="text-[13px] text-zinc-500 leading-relaxed pl-4">
                Analizujemy przesłane wytyczne i wracamy z gotową ofertą.
              </p>
            </li>
          </ul>

        </div>

      </div>
    </section>
  );
}