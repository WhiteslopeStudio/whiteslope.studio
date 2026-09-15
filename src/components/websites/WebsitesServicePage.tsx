'use client';

import { useState, useEffect } from 'react';

import HeroSection from './HeroSection';
import HeroSectionMobile from './HeroSectionMobile'; // Dodany import wersji mobilnej

import AboutSection from './AboutSection';
import OfferTickerSection from './OfferTickerSection';
import ProcessSection from './ProcessSection';
import ProcessSectionMobile from './ProcessSectionMobile'; // Dodany import wersji mobilnej

import ProjectsSection from './ProjectsSection';
import ProjectsSectionMobile from './ProjectsSectionMobile';

import OtherServicesSection from './OtherServicesSection';
import BriefSection from './BriefSection';

import BentoGrid from './BentoGrid';
import BentoGridMobile from './BentoGridMobile'; // Dodany import wersji mobilnej

import { WEBSITE_BIALYSTOK_FAQ } from '@/lib/seo/websiteBialystokFaq';
import { Plus } from 'lucide-react';
import TrustOverlay from '../ui/TrustOverlay';
import QuickLeadForm from '../ui/QuickLeadForm';
import ServiceSubHeader from './ServiceSubHeader';
import WhyUs from './WhyUs';

export default function WebsitesServicePage() {
  // --- ZARZĄDZANIE WERSJĄ MOBILE ---
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Ustawienie początkowe
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: WEBSITE_BIALYSTOK_FAQ.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Tworzenie stron internetowych Bialystok',
    serviceType: 'Web Design i Web Development',
    provider: {
      '@type': 'Organization',
      name: 'WHITESLOPE',
      url: 'https://www.whiteslope.studio',
    },
    areaServed: 'Bialystok',
    url: 'https://www.whiteslope.studio/pricing/website',
    description:
      'Projektowanie i tworzenie responsywnych stron internetowych z naciskiem na SEO lokalne, wydajnosc i konwersje.',
  };

  // Ochrona przed błędem hydratacji Next.js
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* Pasek produktowy - pojawia się po przewinięciu Hero, wtedy główny header
          i topbar chowają się, żeby na ekranie była tylko jedna belka. */}
      <ServiceSubHeader
        tytul="Strony internetowe"
        cena="już od 1500 zł"
        ctaLabel="Bezpłatna wycena"
        ctaHref="#brief"
        prog={700}
      />

      {/* --- WARUNKOWE RENDEROWANIE HERO --- */}
      {isMobile ? <HeroSectionMobile /> : <HeroSection />}

      {/* Formularz szybkiego kontaktu od razu pod Hero - ten sam, co na /darmowy-projekt */}
      {isMobile && (
        <div className="w-full bg-black px-4 py-10">
          <QuickLeadForm />
        </div>
      )}

      {isMobile ? <BentoGridMobile /> : <BentoGrid />}            
     
      {/* <OfferTickerSection /> */}
      {isMobile ? <ProcessSectionMobile /> : <ProcessSection />}
      <WhyUs />

      {isMobile ? <ProjectsSectionMobile /> : <ProjectsSection />}
      
      {/* <AboutSection /> */}
      <BriefSection />
      {/* <OtherServicesSection /> */}
      <TrustOverlay />

      {/* FAQ SECTION (Dark Mode Premium) */}
      <section className="relative w-full bg-black py-14 md:py-24">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start">
            
            {/* Lewa kolumna: Tytuł (przyklejona do góry przy scrollowaniu) */}
            <div className="lg:sticky lg:top-32">
              <h2 className="hero-mobile-h1 text-[clamp(23px,6.1vw,28px)] md:text-[40px] leading-[1.25] md:leading-[1.1] text-white tracking-tight mb-2 md:mb-4 max-w-[380px] md:max-w-none text-balance">
                FAQ: tworzenie stron internetowych
              </h2>
              <p className="text-[14px] md:text-[16px] font-semibold md:font-normal text-white/60 leading-relaxed max-w-[380px] md:max-w-[400px] text-balance">
                Odpowiedzi na najczęstsze pytania o wycenę, czas realizacji i nasz proces projektowy.
              </p>
            </div>

            {/* Prawa kolumna: Pytania (Akordeon Native) */}
            <div className="flex flex-col">
              {WEBSITE_BIALYSTOK_FAQ.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-white/10 last:border-b-0"
                >
                  <summary className="flex w-full cursor-pointer list-none items-center justify-between py-5 text-left transition-colors md:py-8 [&::-webkit-details-marker]:hidden">
                    <h3 className="faq-question pr-6 text-[15px] md:text-[19px] text-white leading-[1.35] transition-colors group-hover:text-[#3561ff]">
                      {item.question}
                    </h3>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 transition-colors">
                      {/* Ikona Plus obraca się przy otwarciu o 45 stopni */}
                      <Plus
                        className="h-4 w-4 text-white/40 transition-transform duration-500 group-open:rotate-45 group-open:text-[#3561ff]"
                        strokeWidth={2.5}
                      />
                    </div>
                  </summary>

                  {/* Wnętrze odpowiedzi */}
                  <div className="pb-6 pr-4 md:pr-12 animate-in fade-in duration-500">
                    <p className="text-[14px] md:text-[16px] leading-relaxed text-white/60">
                      {item.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}