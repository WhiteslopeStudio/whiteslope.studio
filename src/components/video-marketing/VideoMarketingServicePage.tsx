import BreadcrumbDropdown from '@/components/ui/BreadcrumbDropdown';
import HeroSection from './HeroSection';
import HighlightsBar from './HighlightsBar';
import StatementSection from './StatementSection';
import TilesSection from './TilesSection';
import VideoShowcaseSection from './VideoShowcaseSection';
import CollaboratorsSection from './CollaboratorsSection';
// Sekcja Magdy wyłączona na razie - patrz komentarz niżej przy jej użyciu w JSX.
// import CreatorSpotlightSection from './CreatorSpotlightSection';
// import CreatorSpotlightSectionMobile from './CreatorSpotlightSectionMobile';
// import CreatorSpotlightSectionTablet from './CreatorSpotlightSectionTablet';
import MeetTeamSection from './MeetTeamSection';
import VideoBriefSection from './VideoBriefSection';
import FaqSection from './FaqSection';
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
    <div className="min-h-screen bg-black text-white pt-16 relative overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <BreadcrumbDropdown aktualnaEtykieta="Marketing" />

      <HeroSection />
      <HighlightsBar />
      <MeetTeamSection />

      {/* Sekcja Magdy wyłączona na razie (zakomentowana) - ma zostać pokazana Magdzie na osobnym linku
          do podglądu (/pricing/video-marketing-podglad-magda, kopia całej strony z tą sekcją włączoną),
          zanim trafi na żywo. Nie usuwać - tylko odkomentować, kiedy będzie można to opublikować. */}
      {/* <CreatorSpotlightSection />
      <CreatorSpotlightSectionTablet />
      <CreatorSpotlightSectionMobile /> */}

          <CollaboratorsSection />
      <StatementSection />

      {/* Wyłączone na razie - zostaje samo "Wideo, które przyciąga. Kontent, który sprzedaje" */}
      

      
      
      <TilesSection />
      

      {/* <VideoShowcaseSection /> */}

      <VideoBriefSection />

      <FaqSection />
    </div>
  );
}
