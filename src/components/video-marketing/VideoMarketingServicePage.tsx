import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
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
    </div>
  );
}
