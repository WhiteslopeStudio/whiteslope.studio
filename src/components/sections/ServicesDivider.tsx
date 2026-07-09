'use client';

import React from 'react';
import Link from 'next/link';

export default function ServicesDivider() {
  return (
    // Bardzo cienka sekcja: tylko py-[32px] (lub mniej, jeśli chcesz ją jeszcze mocniej ścisnąć)
    <section className="w-full bg-white border-b border-zinc-300">
      <div className="w-full max-w-[1780px] mx-auto px-[24px]">
        
        {/* Główny kontener: ostre kąty (rounded-none), biała ramka (border-white) */}
        {/* divide-x rysuje automatycznie pionowe linie między elementami */}
        <div className="w-full flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white rounded-none">
          
          {/* Kwadrat 1 */}
          <Link href="/pricing/website" className="flex-1 py-[12px] px-[16px] flex items-center justify-center group hover:bg-zinc-100 transition-colors duration-300 cursor-pointer">
            <span className="text-black text-[11px] md:text-[14px] font-bold tracking-[0.15em] uppercase group-hover:text-black transition-colors duration-300">
              Web development
            </span>
          </Link>

          {/* Kwadrat 2 */}
          <Link href="/pricing/ai-integration/chatbot" className="flex-1 py-[12px] px-[16px] flex items-center justify-center group hover:bg-zinc-100 transition-colors duration-300 cursor-pointer">
            <span className="text-black text-[11px] md:text-[14px] font-bold tracking-[0.15em] uppercase group-hover:text-black transition-colors duration-300">
              Automatyzacja & wdrażanie AI
            </span>
          </Link>

          {/* Kwadrat 3 */}
          <Link href="/pricing/video-marketing" className="flex-1 py-[12px] px-[16px] flex items-center justify-center group hover:bg-zinc-100 transition-colors duration-300 cursor-pointer">
            <span className="text-black text-[11px] md:text-[14px] font-bold tracking-[0.15em] uppercase group-hover:text-black transition-colors duration-300">
              E-marketing
            </span>
          </Link>

        </div>

      </div>
    </section>
  );
}