'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type BentoCardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
  ctaLabel?: string;
};

function BentoCardMobile({
  title,
  description,
  href,
  image,
  ctaLabel = 'Sprawdź',
}: BentoCardProps) {
  return (
    <Link
      href={href || '#'}
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-zinc-200 bg-white shadow-sm transition-all active:scale-[0.98]"
    >
      {/* TŁO/OBRAZEK (Dół karty) */}
      <div className="absolute bottom-0 left-0 right-0 h-[160px] z-0 overflow-hidden">
        {/* Gradient maskujący górę obrazka, żeby płynnie łączył się z białym tłem karty */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent z-10" />
        
        {/* Zdjęcie w tle */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      {/* TREŚĆ (Góra karty) */}
      {/* pb-[140px] robi bezpieczne miejsce na dole na widoczny obrazek */}
      <div className="relative z-20 flex flex-col justify-start p-6 pb-[140px]">
        <h3 className="text-[20px] font-bold tracking-tight text-zinc-950 mb-2">
          {title}
        </h3>
        
        <p className="text-[14px] leading-relaxed text-zinc-600 line-clamp-3">
          {description}
        </p>

        {/* CTA */}
        <div className="mt-4 flex items-center text-[14px] font-semibold text-blue-600">
          {ctaLabel}
          <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function BentoGridMobile() {
  return (
    // Mniejsze paddingi sekcji (py-12 zamiast py-20)
    <section className="relative bg-zinc-50 py-12 px-6 border-t border-zinc-100">
      <div className="mx-auto w-full">
        
        <div className="text-left mb-8 flex flex-col gap-2">
          {/* Mniejszy nagłówek H2 dostosowany do mobile */}
          <h2 className="text-[28px] font-bold tracking-tight text-zinc-950 leading-[1.1]">
            Rozwiązania, które wdrażamy
          </h2>
          <p className="text-[15px] text-zinc-600 leading-relaxed">
            Kompleksowe projektowanie od początku do końca projektu webowego 
          </p>
        </div>

        {/* SIATKA BENTO MOBILE (Wszystko w jednej kolumnie) */}
        <div className="flex flex-col gap-4">
          <BentoCardMobile
            title="Strony internetowe"
            description="Nowoczesne strony firmowe i sprzedażowe z naciskiem na konwersję, szybkość oraz mocne pierwsze wrażenie."
            href=""
            image="/_resources/stronyInternetowe/WieslawskiStudio.webp"
            ctaLabel="Sprawdź"
          />

          <BentoCardMobile
            title="Aplikacje SaaS"
            description="Wysoki potencjał dla produktów, paneli i systemów, które pokazują zaawansowane możliwości zespołu."
            href=""
            image="/_resources/stronyInternetowe/Easylesson.webp"
            ctaLabel="Sprawdź"
          />

          <BentoCardMobile
            title="Pozycjonowanie (SEO)"
            description="Techniczne SEO, struktura treści i optymalizacja pod lepszą widoczność w Google."
            href=""
            image="/_resources/seo-2025.webp"
            ctaLabel="Sprawdź"
          />

          <BentoCardMobile
            title="Dedykowane systemy webowe"
            description="Automatyzacje, panele administracyjne i rozwiązania szyte pod procesy Twojej firmy."
            href=""
            image="/_resources/Automations/Automation8nWorkflow.webp"
            ctaLabel="Sprawdź"
          />

          <BentoCardMobile
            title="Poprawki istniejących stron"
            description="Audyty, przyspieszanie i ratowanie projektów, które wymagają uporządkowania lub odświeżenia."
            href=""
            image="/_resources/page-speed.webp"
            ctaLabel="Sprawdź"
          />
        </div>
        
      </div>
    </section>
  );
}