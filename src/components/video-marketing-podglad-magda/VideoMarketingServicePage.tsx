import BreadcrumbDropdown from '@/components/ui/BreadcrumbDropdown';
import HeroSection from './HeroSection';
import HighlightsBar from './HighlightsBar';
import StatementSection from './StatementSection';
import TilesSection from './TilesSection';
import VideoShowcaseSection from './VideoShowcaseSection';
import CollaboratorsSection from './CollaboratorsSection';
import CreatorSpotlightSection from './CreatorSpotlightSection';
import CreatorSpotlightSectionMobile from './CreatorSpotlightSectionMobile'; // Wersja mobilna - bez pinowania scrolla
import CreatorSpotlightSectionTablet from './CreatorSpotlightSectionTablet'; // Wersja 1024-1549px - tekst góra, 3 filmiki dół
import MeetTeamSection from './MeetTeamSection';
import VideoBriefSection from './VideoBriefSection';
import FaqSection from './FaqSection';
import { VIDEO_MARKETING_FAQ } from '@/lib/seo/videoMarketingFaq';

// UWAGA: to jest kopia video-marketing "do podglądu" - żywa strona (/pricing/video-marketing) ma na razie
// zakomentowaną sekcję Magdy, a tutaj (/pricing/video-marketing-podglad-magda) zostaje w całości, żeby
// można ją było pokazać Magdzie przed właściwym commitem/publikacją.
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

      {/* Wszystkie 3 wersje zawsze zamontowane - widoczność steruje CSS (min-[Npx]:flex / hidden w środku
          każdej z nich), a nie warunkowe mount/unmount w Reakcie. Desktop ma GSAP ScrollTrigger z pin:true,
          który fizycznie przenosi węzeł w DOM (pin-spacer) - warunkowe odmontowanie po flipie stanu
          powodowało "Failed to execute 'removeChild'", bo React gubił się, gdzie faktycznie jest ten węzeł.
          Zakresy: <1024px mobile, 1024-1549px tablet, >=1550px pełny desktop z pinowanym scrollem. */}
      <CreatorSpotlightSection />
      <CreatorSpotlightSectionTablet />
      <CreatorSpotlightSectionMobile />

      <StatementSection />

      {/* Wyłączone na razie - zostaje samo "Wideo, które przyciąga. Kontent, który sprzedaje" */}
      {/* <CollaboratorsSection /> */}

      <TilesSection />

      {/* <VideoShowcaseSection /> */}

      <VideoBriefSection />

      <FaqSection />
    </div>
  );
}
