import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
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
        <BreadcrumbNav serviceName="Strona internetowa" serviceId="website" />
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
