'use client';

import { useState, useLayoutEffect, useEffect, } from 'react';

import  HeroSection from '@/components/sections/HeroSection';
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FAQSection } from '@/components/sections/FaqSection';
import { BlogSection } from '@/components/sections/BlogSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import HeroSectionMobile from '@/components/sections/HeroSectionMobile';
import BriefSection from '@/components/sections/BriefSection';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {/* 🚀 HERO SECTION - natychmiastowe przełączanie */}
      {isMobile ? <HeroSectionMobile /> : <HeroSection />}
      {/* 🎨 PORTFOLIO SECTION */}

      {isMobile ? <PortfolioSection /> : null}
      

      {/* ⚠️ PROBLEM-ROZWIĄZANIE - NOWA SEKCJA! */}
      <ProblemSolutionSection />

      {/* 🔄 PROCESS SECTION */}
      <ProcessSection />

      {/* 💬 TESTIMONIALS SECTION */}
      <TestimonialsSection />

      

      

      <ExperienceSection />

      

      

      

      

      

      

      {/* 💰 PRICING SECTION */}
      <PricingSection />

      <BriefSection />

      {/* 📝 BLOG SECTION */}
      <BlogSection />

      {/* ❓ FAQ SECTION */}
      <FAQSection />
    </main>
  );
}