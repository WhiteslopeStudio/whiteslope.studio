import Link from 'next/link';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import OfferTickerSection from './OfferTickerSection';
import ProcessSection from './ProcessSection';
import ProjectsSection from './ProjectsSection';
import OtherServicesSection from './OtherServicesSection';
import BriefSection from './BriefSection';

export default function WebsitesServicePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="container mx-auto px-6 pt-8">
        <Link href="/pricing" className="text-white/70 hover:text-white transition-colors text-sm">
          ← Wróć do cennika
        </Link>
      </div>

      <HeroSection />
      <AboutSection />
      <OfferTickerSection />
      <ProcessSection />
      <ProjectsSection />
      <BriefSection />
      <OtherServicesSection />
      
    </div>
  );
}
