import {HeroSection} from '@/components/sections//HeroSection';
import {TestimonialsSection} from '@/components/sections//TestimonialsSection';
import {ProcessSection} from '@/components/sections//ProcessSection';
import {PortfolioSection} from '@/components/sections//PortfolioSection';
import {PricingSection} from '@/components/sections//PricingSection';
import {FAQSection} from '@/components/sections//FaqSection';
import {BlogSection} from '@/components/sections//BlogSection';
import ExperienceSection from '@/components/sections/ExperienceSection';

// ==========================================
// 🏠 MAIN PAGE COMPONENT
// ==========================================
export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* 🚀 (ale dojebana rakieta) HERO SECTION */}
      <HeroSection />

      

      {/* 🎨 PORTFOLIO SECTION - "CO MY ZROBILI" */}
      <PortfolioSection />
      
      

      

      <ExperienceSection />

      {/* 💬 TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 💰 PRICING SECTION - "NASZE USŁUGI" */}
      <PricingSection />

      {/* 🔄 PROCESS SECTION - "JAK PODCHODZIMY DO PROJEKTU" */}
      <ProcessSection />
      
    
      

      

      

      {/* 📝 BLOG SECTION */}
      <BlogSection />

      {/* ❓ FAQ SECTION */}
      <FAQSection />
    </main>
  );
}