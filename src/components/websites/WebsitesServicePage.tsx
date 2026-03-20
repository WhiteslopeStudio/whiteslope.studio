import Link from 'next/link';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import OfferTickerSection from './OfferTickerSection';
import ProcessSection from './ProcessSection';
import ProjectsSection from './ProjectsSection';
import OtherServicesSection from './OtherServicesSection';
import BriefSection from './BriefSection';
import { WEBSITE_BIALYSTOK_FAQ } from '@/lib/seo/websiteBialystokFaq';

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
    <div className="min-h-screen bg-black text-white pt-16 relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* --- MINIMALIST BREADCRUMB --- */}
      <div className="absolute top-32 left-0 w-full z-[40] pointer-events-none">
        <div className="w-full px-6 md:px-12">
          <div className="flex items-center gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-extralight">
            <Link 
              href="/pricing" 
              className="pointer-events-auto text-gray-500 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              Cennik
            </Link>
            <span className="text-gray-800 select-none">/</span>
            <span className="text-gray-300 select-none">
              Strony internetowe
            </span>
          </div>
        </div>
      </div>

      <HeroSection />
      <AboutSection />
      <OfferTickerSection />
      <ProcessSection />
      <ProjectsSection />
      <BriefSection />
      <OtherServicesSection />

      {/* FAQ SECTION */}
      <section className="container mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-white">
            FAQ: Strony Internetowe Białystok
          </h2>
          <p className="text-zinc-400 mb-10 font-light">
            Odpowiedzi na najczęstsze pytania: ranking agencji, opinie, cennik, porównanie ofert i wybór wykonawcy strony www.
          </p>

          <div className="space-y-4">
            {WEBSITE_BIALYSTOK_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 open:bg-white/[0.04] transition-all duration-300"
              >
                <summary className="cursor-pointer list-none pr-6 text-base md:text-lg font-medium text-white marker:content-none flex justify-between items-center">
                  {item.question}
                  <span className="text-zinc-500 group-open:rotate-180 transition-transform duration-300">↓</span>
                </summary>
                <p className="mt-4 text-zinc-400 leading-relaxed font-light border-t border-white/5 pt-4">
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