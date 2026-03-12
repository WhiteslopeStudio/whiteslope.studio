import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import HeroSection from './HeroSection';
import HighlightsBar from './HighlightsBar';
import StatementSection from './StatementSection';
import TilesSection from './TilesSection';
import VideoShowcaseSection from './VideoShowcaseSection';
import CollaboratorsSection from './CollaboratorsSection';
import VideoBriefSection from './VideoBriefSection';
import { VIDEO_MARKETING_FAQ } from '@/lib/seo/videoMarketingFaq';

export default function VideoMarketingServicePage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: VIDEO_MARKETING_FAQ.map((item) => ({
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
    name: 'Video Marketing i UGC',
    serviceType: 'Video Marketing',
    provider: {
      '@type': 'Organization',
      name: 'WHITESLOPE',
      url: 'https://www.whiteslope.studio',
    },
    areaServed: 'Poland',
    url: 'https://www.whiteslope.studio/pricing/video-marketing',
    description:
      'Produkcja i optymalizacja tresci video marketing oraz UGC: od strategii i scenariusza po montaz, testy i wsparcie kampanii social media.',
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
        <BreadcrumbNav serviceName="Video Marketing" serviceId="video-marketing" />
      </div>

      <HeroSection />
      <div className="px-8 md:px-12 lg:px-36">
        <HighlightsBar />
      </div>

      <CollaboratorsSection />

      <StatementSection />

      <TilesSection />

      <VideoShowcaseSection />

      <VideoBriefSection />

      <section className="container mx-auto px-6 md:px-10 lg:px-16 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            FAQ: UGC i Video Marketing
          </h2>
          <p className="text-zinc-300 mb-10">
            Odpowiedzi na najczestsze pytania tworcow i firm o agencje UGC, zarobki, cennik, wspolprace i skalowanie contentu.
          </p>

          <div className="space-y-4">
            {VIDEO_MARKETING_FAQ.map((item) => (
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
