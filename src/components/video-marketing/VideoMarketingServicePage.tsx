import Link from 'next/link';
import HeroSection from './HeroSection';
import HighlightsBar from './HighlightsBar';
import StatementSection from './StatementSection';
import TilesSection from './TilesSection';
import VideoShowcaseSection from './VideoShowcaseSection';
import CollaboratorsSection from './CollaboratorsSection';
import VideoBriefSection from './VideoBriefSection';

export default function VideoMarketingServicePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto px-6 pt-8">
        <Link href="/pricing" className="text-white/70 hover:text-white transition-colors text-sm">
          ← Wróć do cennika
        </Link>
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
    </div>
  );
}
