import {HeroSection} from '@/components/sections/HeroSection';
import {ProblemSolutionSection} from '@/components/sections/ProblemSolutionSection'; // ← DODAJ TO
import {TestimonialsSection} from '@/components/sections/TestimonialsSection';
import {ProcessSection} from '@/components/sections/ProcessSection';
import {PortfolioSection} from '@/components/sections/PortfolioSection';
import {PricingSection} from '@/components/sections/PricingSection';
import {FAQSection} from '@/components/sections/FaqSection';
import {BlogSection} from '@/components/sections/BlogSection';
import ExperienceSection from '@/components/sections/ExperienceSection';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* 🚀 HERO SECTION */}
      <HeroSection />
      {/* 🎨 PORTFOLIO SECTION */}
      <PortfolioSection />

      {/* ⚠️ PROBLEM-ROZWIĄZANIE - NOWA SEKCJA! */}
      <ProblemSolutionSection /> {/* ← DODAJ TO TUTAJ, ZARAZ PO HERO */}

      {/* 💬 TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* 🔄 PROCESS SECTION */}
      <ProcessSection />

      <ExperienceSection />

      

      

      
      
      

      

      {/* 💰 PRICING SECTION */}
      <PricingSection />

      

      {/* 📝 BLOG SECTION */}
      <BlogSection />

      {/* ❓ FAQ SECTION */}
      <FAQSection />
    </main>
  );
}