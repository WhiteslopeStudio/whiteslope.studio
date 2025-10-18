'use client';

import { useState, useLayoutEffect, useEffect } from 'react';
import IntroAnimation from '@/components/layout/IntroAnimation';
import HeroSection from '@/components/sections/HeroSection';
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
import DesktopUslugiSection from '@/components/sections/DesktopUslugiSection';
import PortfolioSectionDesktop from '@/components/sections/PortfolioSectionDesktop';

// 🎯 IMPORT PINNED SECTION (zaawansowany wrapper)
import PinnedAnimationSection from '@/components/layout/PinnedAnimationSection';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  
  const [showIntro, setShowIntro] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);

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

  useEffect(() => {
    if (isMobile) {
      setIntroCompleted(true);
      return;
    }

    const animationData = localStorage.getItem('hero-animation-data');
    
    if (animationData) {
      try {
        const { seen, timestamp } = JSON.parse(animationData);
        const timeoutDuration = 30 * 60 * 1000;
        
        if (Date.now() - timestamp > timeoutDuration) {
          localStorage.removeItem('hero-animation-data');
          setShowIntro(true);
        } else {
          setIntroCompleted(true);
        }
      } catch (error) {
        setShowIntro(true);
      }
    } else {
      setShowIntro(true);
    }
  }, [isMobile]);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroCompleted(true);
    
    localStorage.setItem(
      'hero-animation-data',
      JSON.stringify({
        seen: true,
        timestamp: Date.now(),
      })
    );
  };

  return (
    <main className="min-h-screen bg-black">
      {showIntro && !isMobile && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {introCompleted && (
        <>
          {/* 🚀 HERO SECTION */}
          {isMobile ? <HeroSectionMobile /> : <HeroSection />}

          {/* 🛠️ DESKTOP USŁUGI */}
          {!isMobile && <DesktopUslugiSection />}

          {/* 🎬 PORTFOLIO DESKTOP */}
          {!isMobile && <PortfolioSectionDesktop />}

          {/* 📱 PORTFOLIO MOBILE */}
          {isMobile && <PortfolioSection />}

          

          {/* ⚠️ PROBLEM-ROZWIĄZANIE */}
          <ProblemSolutionSection />

          {/* 💬 TESTIMONIALS */}
          <TestimonialsSection />

          {/* 🔄 PROCESS SECTION */}
          <ProcessSection />

          

          {/* 🎯 EXPERIENCE */}
          <ExperienceSection />

          {/* 💰 PRICING */}
          <PricingSection />

          {/* 📋 BRIEF */}
          {/* <BriefSection /> */}

          {/* 📝 BLOG */}
          <BlogSection />

          {/* ❓ FAQ */}
          <FAQSection />
        </>
      )}
    </main>
  );
}