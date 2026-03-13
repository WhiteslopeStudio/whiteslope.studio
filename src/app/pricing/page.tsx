"use client";

import Link from 'next/link';
import React from 'react';
import { ArrowRight, Plus, Search, Code, Palette, FileText, Smartphone, Video, Music } from 'lucide-react';
import { MAIN_SERVICES, FAQ_DATA, SERVICE_PACKAGES } from '@/lib/data';
import type { MainService } from '@/lib/types';
import { useInteractiveButton } from '@/utils/hooks';

const SERVICE_NUM: Record<string, string> = {
  website: '01', optimization: '02', 'ai-integration': '03', graphics: '04',
  individual: '05', 'email-marketing': '06', 'video-marketing': '07', 'audio-editing': '08',
};

const ICON_MAP: Record<string, React.ElementType> = {
  website: FileText, optimization: Search, 'ai-integration': Code, graphics: Palette,
  individual: FileText, 'email-marketing': Smartphone, 'video-marketing': Video, 'audio-editing': Music,
};

export default function CennikPage() {
  const ctaButton = useInteractiveButton();
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)' }}>

      {/* HERO */}
      <section className="pt-40 pb-16 px-6 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-mono tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">Przejrzyste ceny · Bez ukrytych kosztów</div>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6">
            Cennik <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">usług</span>
          </h1>
          <p className="text-lg text-white/70 max-w-4xl">
            Każda usługa dostępna w kilku wariantach — od podstawowego po premium. Kliknij aby zobaczyć pełną specyfikację i zamówić.
          </p>
        </div>
      </section>

      {/* USŁUGI – lista pasowa */}
      <section className="border-b border-white/10">
        {MAIN_SERVICES.map((service: MainService) => {
          const Icon = ICON_MAP[service.id] ?? FileText;
          const num = SERVICE_NUM[service.id] ?? '—';
          const pkgs = SERVICE_PACKAGES.find(s => s.serviceId === service.id)?.packages ?? [];
          const minPrice = pkgs[0]?.price ?? service.price;
          const maxPrice = pkgs[pkgs.length - 1]?.price ?? '';

          return (
            <div key={service.id} className="border-t border-white/8 group">
              <div className="container mx-auto px-6 py-12">

                {/* Górna belka: numer + tytuł + widełki + CTA */}
                <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10 mb-8">

                  {/* Lewa: meta + tytuł */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-[11px] font-mono text-white/45 tracking-widest">{num}</span>
                      <div className="h-px w-5 bg-blue-300/20" />
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-blue-300/70 uppercase tracking-[0.16em]">
                        <Icon className="w-3 h-3" />
                        {service.subtitle}
                      </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white/85 leading-tight tracking-tight mb-3">
                      {service.title}
                    </h2>
                    <p className="text-sm text-white/65 leading-relaxed max-w-xl">
                      {service.description}
                    </p>
                  </div>

                  {/* Prawa: widełki cen + CTA */}
                  <div className="flex-shrink-0 flex flex-col items-start lg:items-end gap-3">
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">{minPrice}</div>
                    </div>
                    <Link
                      href={`/pricing/${service.id}`}
                      className="inline-flex items-center gap-2 bg-blue-500/8 hover:bg-blue-500/15 border border-blue-400/20 hover:border-blue-400/40 text-white text-sm px-5 py-2.5 rounded-full transition-all duration-300"
                    >
                      Szczegóły i wycena
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Pakiety cenowe */}
                {pkgs.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {pkgs.map((pkg, i) => (
                      <Link
                        key={pkg.id}
                        href={`/pricing/${service.id}`}
                        className={`relative rounded-xl px-5 py-4 border transition-all duration-300 hover:scale-[1.01] ${
                          pkg.highlighted
                            ? 'border-blue-400/40 bg-blue-500/5 hover:border-blue-400/70'
                            : 'border-white/8 bg-white/[0.025] hover:border-white/20 hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>
                            <p className="text-xl font-bold text-white leading-tight">{pkg.name}</p>
                            <p className="text-xs text-white/40 mt-0.5">{pkg.timeline}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className={`text-2xl font-bold ${pkg.highlighted ? 'text-blue-300' : 'text-white/80'}`}>{pkg.price}</p>
                          </div>
                        </div>
                        <ul className="space-y-1">
                          {pkg.features.slice(0, 4).map(f => (
                            <li key={f} className="flex items-start gap-2 text-xs text-white/65">
                              <span className="text-blue-300/50 shrink-0 mt-0.5">›</span>
                              {f}
                            </li>
                          ))}
                          {pkg.features.length > 4 && (
                            <li className="text-xs text-white/45 font-mono">+ {pkg.features.length - 4} więcej</li>
                          )}
                        </ul>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Separator + CTA */}
        <div className="border-t border-white/8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6 container mx-auto px-6">
          <div>
            <p className="text-white/80 text-sm font-medium">Nie wiesz co wybrać?</p>
            <p className="text-white/55 text-xs mt-1">Bezpłatna konsultacja — dobierzemy idealne rozwiązanie</p>
          </div>
          <Link
            href="/contact"
            onMouseMove={ctaButton.handleMouseMove}
            onMouseEnter={ctaButton.handleMouseEnter}
            onMouseLeave={ctaButton.handleMouseLeave}
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
            style={{ background: `radial-gradient(circle at ${ctaButton.mousePosition.x}% ${ctaButton.mousePosition.y}%, #248affff, #248affff 30%, #1c86ffff 60%, #1985ff)` }}
          >
            Skontaktuj się
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FAQ SECTION - Minimalistyczne */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
              <span className="text-white/70 text-sm tracking-wider">FAQ</span>
            </div>
            <h2 
              className="text-4xl md:text-6xl font-thin text-white mb-4"
              style={{ fontFamily: 'inherit' }}
            >
              Najczęstsze pytania
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-0">
            {FAQ_DATA.slice(0, 6).map((faq, index) => (
              <details 
                key={faq.id} 
                className="group border-b border-white/10"
              >
                <summary 
                  className="py-6 cursor-pointer flex items-center justify-between text-left hover:text-white/80 transition-colors list-none"
                  style={{ fontFamily: 'inherit' }}
                >
                  <span className="font-normal text-white text-lg pr-4">
                    {faq.question}
                  </span>
                  <Plus 
                    className="w-6 h-6 text-white/50 transform group-open:rotate-45 transition-all duration-300 flex-shrink-0" 
                  />
                </summary>
                <div className="pb-6 overflow-hidden">
                  <p 
                    className="text-white/50 leading-relaxed font-light"
                    style={{ fontFamily: 'inherit' }}
                  >
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* Link do kontaktu */}
          <div className="text-center mt-12 pt-8 border-t border-white/10">
            <p 
              className="text-white/50 mb-4 font-light"
              style={{ fontFamily: 'inherit' }}
            >
              Masz inne pytania?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors font-light"
              style={{ fontFamily: 'inherit' }}
            >
              Napisz do nas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA - Eleganckie */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div 
            className="rounded-3xl border border-blue-400/15 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent p-12 md:p-16 text-center"
          >
            <h2 
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: 'inherit' }}
            >
              Gotowy żeby
              {' '}
              <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
                rozpocząć?
              </span>
            </h2>
            
            <p 
              className="text-xl text-white/60 font-light mb-10 max-w-2xl mx-auto"
              style={{ fontFamily: 'inherit' }}
            >
              Każdy wielki projekt zaczyna się od pierwszej rozmowy. Opowiedz nam o swoich planach.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                onMouseMove={ctaButton.handleMouseMove}
                onMouseEnter={ctaButton.handleMouseEnter}
                onMouseLeave={ctaButton.handleMouseLeave}
                className="inline-flex items-center justify-center gap-2 rounded-full h-12 px-10 text-sm font-semibold text-white transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
                style={{
                  fontFamily: 'inherit',
                  background: `radial-gradient(circle at ${ctaButton.mousePosition.x}% ${ctaButton.mousePosition.y}%, #248affff, #248affff 30%, #1c86ffff 60%, #1985ff)`,
                }}
              >
                Napisz do nas
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-10 py-5 rounded-full font-medium hover:bg-white/5 transition-all duration-300"
                style={{ fontFamily: 'inherit' }}
              >
                Zobacz wszystkie usługi
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}