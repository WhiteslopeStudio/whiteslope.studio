import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
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
    <div className="min-h-screen bg-black text-white pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="container mx-auto px-6 pt-8">
        <BreadcrumbNav serviceName="Strona internetowa" serviceId="website" />
      </div>

      <HeroSection />
      <AboutSection />
      <OfferTickerSection />
      <ProcessSection />
      <ProjectsSection />
      <BriefSection />
      <OtherServicesSection />

      <section className="container mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            FAQ: Strony Internetowe Białystok
          </h2>
          <p className="text-zinc-300 mb-10">
            Odpowiedzi na najczęstsze pytania: ranking agencji, opinie, cennik, porównanie ofert i wybór wykonawcy strony www.
          </p>

          <div className="space-y-4">
            {WEBSITE_BIALYSTOK_FAQ.map((item) => (
              <details
                key={item.question}
                className="group rounded-xl border border-white/15 bg-white/[0.03] p-5 open:bg-white/[0.05] transition-colors"
              >
                <summary className="cursor-pointer list-none pr-6 text-base md:text-lg font-medium text-white marker:content-none">
                  {item.question}
                </summary>
                <p className="mt-3 text-zinc-300 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      
    </div>
  );
}
