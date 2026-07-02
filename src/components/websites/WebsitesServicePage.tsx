import Link from 'next/link';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import OfferTickerSection from './OfferTickerSection';
import ProcessSection from './ProcessSection';

import ProjectsSection from './ProjectsSection';
import OtherServicesSection from './OtherServicesSection';
import BriefSection from './BriefSection';
import BentoGrid from './BentoGrid';
import { WEBSITE_BIALYSTOK_FAQ } from '@/lib/seo/websiteBialystokFaq';
import { ChevronDown, ChevronRight } from 'lucide-react';
import TrustOverlay from '../ui/TrustOverlay';
import WhyUs from './WhyUs';

export default function WebsitesServicePage() {
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

  const SERVICES_MENU = [
    { name: 'Strony internetowe', href: '/pricing/strony-internetowe' },
    { name: 'Integracje AI', href: '/pricing/ai-integration' },
    { name: 'Automatyzacje procesów', href: '/pricing/ai-integration' },
    { name: 'Marketing', href: '/pricing/video-marketing' },

  ];

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

  return (
    <div className="min-h-screen bg-black text-white pt-16 relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* --- MINIMALIST BREADCRUMB --- */}
      {/* --- MINIMALIST BREADCRUMB Z DROPDOWNEM --- */}
      <div className="absolute top-24 left-0 w-full z-[20]">
        <div className="w-full max-w-[1640px] mx-auto px-6 md:px-12 flex justify-start">
          
          {/* DODANO: Ciemne tło, zaokrąglone rogi i usunięto uppercase/tracking */}
          <div className="flex items-center gap-2 px-4 py-1.5 bg-[#050505]  rounded-lg text-[13px] md:text-sm font-medium text-white/90">
            
            <Link 
              href="/" 
              className="text-white/80 hover:text-white/90 transition-colors duration-300 cursor-pointer"
            >
              Whiteslope
            </Link>
            
            {/* ZMIENIONO: Ikonka strzałki zamiast ukośnika */}
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            
            {/* Kontener Dropdownu */}
            <div className="relative group">
              {/* Aktywny element - Trigger */}
              <div className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors duration-300 cursor-default py-1">
                Strony internetowe
                <ChevronDown className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Rozwijane Menu */}
              {/* mt-2 robi mały odstęp między głównym paskiem a rozwijaną listą */}
              <div className="absolute top-full left-0 mt-2 w-max min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-[#050505] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[70]">
                <ul className="flex flex-col py-1.5">
                  {SERVICES_MENU.map((service) => (
                    <li key={service.name}>
                      <Link 
                        href={service.href} 
                        className="block px-5 py-2.5 text-[13px] text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
          
        </div>
      </div>

      <HeroSection />
      <BentoGrid />
      {/* <OfferTickerSection /> */}
      <ProcessSection />
      <WhyUs />
      <ProjectsSection />
      {/* <AboutSection /> */}
      <BriefSection />
      {/* <OtherServicesSection /> */}
      <TrustOverlay />


      {/* FAQ SECTION */}
      <section className="container mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="max-w-[1640px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-white">
            FAQ: Tworzenie stron internetowych
          </h2>
          <p className="text-zinc-400 mb-10 font-light">
            Poznaj odpowiedzi na najczęstsze pytania dotyczące wyceny, czasu realizacji oraz naszego procesu projektowego.
          </p>

          <div className="space-y-4">
            {WEBSITE_BIALYSTOK_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 open:bg-white/[0.04] transition-all duration-300"
              >
                <summary className="cursor-pointer list-none pr-6 text-base md:text-lg font-medium text-white marker:content-none flex justify-between items-center">
                  {item.question}
                  <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300">▼</span>
                </summary>
                <p className="mt-4 text-white leading-relaxed font-light border-t border-white/5 pt-4">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}