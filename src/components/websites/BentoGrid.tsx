import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type BentoCardProps = {
  title: string;
  description: string;
  href: string;
  image: string;
  className: string;
  ctaLabel?: string;
};

function BentoCard({
  title,
  description,
  href,
  image,
  className,
  ctaLabel = 'Sprawdź',
}: BentoCardProps) {
  return (
    <Link
      href={href}
      className={`group relative flex overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-sm transition-all hover:shadow-md min-h-[200px] ${className}`}
    >
      {/* Prawa strona: Zdjęcie i maskujący gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-[60%] md:w-[55%] z-0 overflow-hidden">
        {/* Gradient płynnie przechodzący z białego do przezroczystego */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        
        {/* Zdjęcie w tle, które delikatnie rośnie na hover */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>

      {/* Lewa strona: Tekst i CTA */}
      <div className="relative z-20 flex flex-col justify-center p-6 md:p-8 text-left w-[90%] md:w-[75%] h-full">
        <h3 className="text-xl md:text-[22px] font-semibold tracking-tight text-zinc-950">
          {title}
        </h3>
        
        <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-zinc-600 line-clamp-3">
          {description}
        </p>

        {/* Subtelne CTA - odsunięte od tekstu za pomocą margin-top */}
        <div className="mt-5  flex items-center  text-[14px] font-medium text-zinc-500 transition-colors group-hover:text-black">
          {ctaLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function BentoGrid() {
  return (
    <section className="relative bg-zinc-50 py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12">
        
        <div className="text-left">
          <h2 className="text-[28px] font-semibold tracking-tight text-zinc-950">
            Rozwiązania, które wdrażamy
          </h2>
        </div>
        <div className="mb-10 text-left">
          <p className="mt-2 text-[15px] md:text-[16px] text-zinc-600 tracking-tight">
            Kompleksowe projektowanie od początku do końca projektu webowego 
          </p>
        </div>

        {/* SIATKA BENTO */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:auto-rows-[240px]">
          <BentoCard
            title="Strony internetowe"
            description="Nowoczesne strony firmowe i sprzedażowe z naciskiem na konwersję, szybkość oraz mocne pierwsze wrażenie."
            href="/pricing/website"
            image="/_resources/stronyInternetowe/WieslawskiStudio.webp"
            className="md:col-span-6"
            ctaLabel="Sprawdź"
          />

          <BentoCard
            title="Aplikacje SaaS"
            description="Wysoki potencjał dla produktów, paneli i systemów, które pokazują zaawansowane możliwości zespołu."
            href="/pricing/ai-integration"
            image="/_resources/stronyInternetowe/Easylesson.webp"
            className="md:col-span-6"
            ctaLabel="Sprawdź"
          />

          <BentoCard
            title="Pozycjonowanie (SEO)"
            description="Techniczne SEO, struktura treści i optymalizacja pod lepszą widoczność w Google."
            href="/pricing/optimization"
            image="/_resources/seo-2025.webp"
            className="md:col-span-4"
            ctaLabel="Sprawdź"
          />

          <BentoCard
            title="Dedykowane systemy webowe"
            description="Automatyzacje, panele administracyjne i rozwiązania szyte pod procesy Twojej firmy."
            href="/pricing/ai-integration"
            image="/_resources/Automations/Automation8nWorkflow.webp"
            className="md:col-span-4"
            ctaLabel="Sprawdź"
          />

          <BentoCard
            title="Poprawki istniejących stron"
            description="Audyty, przyspieszanie i ratowanie projektów, które wymagają uporządkowania lub odświeżenia."
            href="/pricing/website"
            image="/_resources/page-speed.webp"
            className="md:col-span-4"
            ctaLabel="Sprawdź"
          />
        </div>
        
      </div>
    </section>
  );
}