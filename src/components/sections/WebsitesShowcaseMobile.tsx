'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from "lucide-react";

const SERVICES = [
  { id: 'web', title: 'Strony internetowe' },
  { id: 'seo', title: 'Pozycjonowanie (SEO)' },
  { id: 'saas', title: 'Aplikacje SaaS' },
  { id: 'systems', title: 'Dedykowane Systemy Webowe' },
  { id: 'fixes', title: 'Poprawki istniejących stron' }
];

export default function WebsitesShowcaseMobile() {
  return (
    <section id="websites" className="relative w-full bg-white py-8 px-6 overflow-hidden">
      <div className="w-full mx-auto">
        
        {/* Zmieniony układ na standardowy flex-col bez wymuszonych minimalnych wysokości na rzecz naturalnego układania się elementów */}
        <div className="relative group w-full bg-zinc-50 rounded-[28px] border border-zinc-200 overflow-hidden flex flex-col shadow-sm">
          
          <Link href="/pricing/website" className="absolute inset-0 z-30 rounded-[28px]" aria-label="Wyceń projekt" />

          {/* --- TŁO KARTY --- */}
          {/* Subtelny gradient pokrywający głównie górną część (za zdjęciem) */}
          <div className="absolute top-0 left-0 right-0 h-[300px] z-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, #b8c3ff 0%, #f4f4f5 100%)' }} />
          <div className="absolute top-[-5%] right-[-10%] w-[80%] h-[200px] rounded-full bg-blue-500/15 blur-[60px] pointer-events-none z-0" />
          
          {/* --- LOGO --- */}
          {/* Zostaje w prawym górnym rogu, nad zdjęciem */}
          <img 
            src="/_resources/logos/whiteslopeStudioLogoNiebieski_dzialWEBDEV_czarny.webp"
            className="absolute top-5 right-5 h-[20px] object-contain z-20 pointer-events-none"
            alt="Whiteslope Studio Web Development"
          />

          {/* --- GÓRA: ZDJĘCIE --- */}
          {/* Osobny kontener na zdjęcie, wyrównany do dołu tego kontenera */}
          <div className="relative w-full h-[240px] pt-12 px-4 flex items-end justify-center z-10 pointer-events-none">
            <img 
              src="/_resources/stronyInternetowe/ShowWebsites.webp"
              alt="Przykłady stron internetowych Whiteslope"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_12px_24px_rgba(0,87,255,0.08)]"
            />
          </div>

          {/* --- DÓŁ: TREŚĆ --- */}
          {/* Standardowy padding, usunięty olbrzymi padding-bottom */}
          <div className="w-full flex flex-col items-start text-left p-6 z-20 relative pointer-events-none bg-zinc-50">
            
            {/* Zmniejszony nagłówek zgodnie z prośbą - idealny balans na mobile */}
            <h2 className="text-[28px] font-bold text-zinc-950 leading-[1.1] tracking-tight mb-3">
              1. Strony internetowe,<br />systemy B2B i SaaS
            </h2>

            <p className="text-[15px] text-zinc-600 leading-relaxed font-normal mb-6">
              Tworzymy dedykowane rozwiązania cyfrowe, które skalują biznes. Zobacz, w czym specjalizuje się nasz zespół inżynieryjny:
            </p>

            <ul className="flex flex-col gap-3 mb-8 w-full">
              {SERVICES.map((service) => (
                <li key={service.id} className="flex items-center gap-3">
                  <div className="w-[22px] h-[22px] rounded-full bg-blue-500 border border-blue-100 flex items-center justify-center flex-shrink-0 text-blue-100 shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[15px] font-semibold text-zinc-900 tracking-tight">
                    {service.title}
                  </span>
                </li>
              ))}
            </ul>

            <div className="group relative inline-flex overflow-hidden rounded-full p-[3px] w-full pointer-events-auto transition-transform active:scale-95">
              <style>{`
                @keyframes rotateBlue {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                
                .border-spinner-blue {
                  position: absolute;
                  width: 300%;
                  height: 300%;
                  top: -100%;
                  left: -100%;
                  background: conic-gradient(from 0deg, rgba(0, 34, 255, 0) 30%, #0022ff 100%);
                  transform-origin: center;
                }

                .group:hover .border-spinner-blue {
                  animation: rotateBlue 1.2s linear infinite;
                }
              `}</style>

              <span className="absolute border-spinner-blue opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <Link
                href="/website"
                className="relative z-10 inline-flex h-[48px] w-full items-center justify-center rounded-full bg-black px-6 text-[15px] font-semibold text-white"
              >
                Zobacz więcej
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            
          </div>

        </div>

      </div>
    </section>
  );
}