"use client";

import Link from 'next/link';
import React from 'react';
import { ArrowRight, Check, Mail, Plus } from 'lucide-react';
import { MAIN_SERVICES, FAQ_DATA } from '@/lib/data';
import type { MainService } from '@/lib/types';

export default function CennikPage() {
  return (
    <div 
      className="min-h-screen bg-black text-white overflow-hidden"
      style={{
        fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
      }}
    >
      
      {/* HERO SECTION - Minimalistyczny */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          
          {/* Subtelny badge
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <div className="w-2 h-2 bg-[#fd9f91] rounded-full animate-pulse"></div>
            <span className="text-white/70 text-sm tracking-wider">CENNIK</span>
          </div> */}

          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-thin mb-6 leading-tight"
            style={{ fontFamily: 'inherit' }}
          >
            Cennik
            {' '}
            <span className="font-normal bg-gradient-to-r from-[#fd9f91] to-[#ffc4b8] bg-clip-text text-transparent">
              usług
            </span>
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-white/70 font-light max-w-3xl mx-auto"
            style={{ fontFamily: 'inherit' }}
          >
            Transparentne ceny. Profesjonalna jakość. Bez ukrytych kosztów.
          </p>
        </div>
      </section>

      {/* SEKCJA USŁUG - Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          
          {/* Grid usług */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MAIN_SERVICES.map((service: MainService) => (
              <Link 
                key={service.id} 
                href={`/pricing/${service.id}`}
                className="group block rounded-2xl border border-white/10 bg-[#0C0C0C] p-8 transition-all duration-500 hover:border-white/20 hover:bg-[#141414]"
              >
                
                {/* Header */}
                <div className="mb-6">
                  <h3 
                    className="text-2xl font-normal text-[#ffbfb5] mb-2 group-hover:text-[#fd9f91] transition-colors"
                    style={{ fontFamily: 'inherit' }}
                  >
                    {service.title}
                  </h3>
                  <p 
                    className="text-sm text-white/50 font-light"
                    style={{ fontFamily: 'inherit' }}
                  >
                    {service.subtitle}
                  </p>
                </div>

                {/* Cena */}
                <div className="mb-6">
                  <div 
                    className="text-4xl font-semibold text-white mb-2"
                    style={{ fontFamily: 'inherit' }}
                  >
                    {service.price}
                  </div>
                  <p 
                    className="text-xs text-white/40 font-light"
                    style={{ fontFamily: 'inherit' }}
                  >
                    Indywidualna wycena
                  </p>
                </div>

                {/* Opis */}
                <p 
                  className="text-sm text-white/60 mb-6 leading-relaxed font-light"
                  style={{ fontFamily: 'inherit' }}
                >
                  {service.description}
                </p>

                {/* Features - pierwsze 3 */}
                <div className="space-y-3 mb-8">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-[#fd9f91] flex-shrink-0 mt-0.5" />
                      <span 
                        className="text-xs text-white/70 font-light"
                        style={{ fontFamily: 'inherit' }}
                      >
                        {feature.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span 
                    className="text-sm text-white/50 group-hover:text-white/70 transition-colors"
                    style={{ fontFamily: 'inherit' }}
                  >
                    Zobacz więcej
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#fd9f91] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Card - dodatkowa karta */}
          <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-[#fd9f91]/5 to-transparent p-12 text-center">
            <h3 
              className="text-3xl font-normal text-white mb-4"
              style={{ fontFamily: 'inherit' }}
            >
              Nie wiesz co wybrać?
            </h3>
            <p 
              className="text-lg text-white/60 font-light mb-8 max-w-xl mx-auto"
              style={{ fontFamily: 'inherit' }}
            >
              Umów bezpłatną konsultację i wspólnie dobierzemy idealne rozwiązanie dla Twojego projektu
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#fd9f91] text-black px-8 py-4 rounded-full font-medium hover:bg-[#fc8a7a] transition-all duration-300 hover:scale-105"
              style={{ fontFamily: 'inherit' }}
            >
              <Mail className="w-5 h-5" />
              Skontaktuj się
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
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
              className="inline-flex items-center gap-2 text-[#fd9f91] hover:text-[#fc8a7a] transition-colors font-light"
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
            className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#fd9f91]/10 via-transparent to-transparent p-12 md:p-16 text-center"
          >
            <h2 
              className="text-4xl md:text-6xl font-thin text-white mb-6 leading-tight"
              style={{ fontFamily: 'inherit' }}
            >
              Gotowy żeby
              {' '}
              <span className="font-normal bg-gradient-to-r from-[#fd9f91] to-[#ffc4b8] bg-clip-text text-transparent">
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
                className="inline-flex items-center justify-center gap-2 bg-[#fd9f91] text-black px-10 py-5 rounded-full font-medium hover:bg-[#fc8a7a] transition-all duration-300 hover:scale-105"
                style={{ fontFamily: 'inherit' }}
              >
                <Mail className="w-5 h-5" />
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