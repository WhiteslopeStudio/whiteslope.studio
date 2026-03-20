'use client';

import { useCallback } from 'react'

import { useState, useLayoutEffect, useEffect } from 'react';

// 🚫 ANIMACJA INTRO - WYŁĄCZONA (odkomentuj jak chcesz wrócić)
// import IntroAnimation from '@/components/layout/IntroAnimation';

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

import ServicesShowcase from '@/components/sections/ServicesShowcase';
import WebsitesShowcase from '@/components/sections/WebsitesShowcase';
import AiShowcase from '@/components/sections/AiShowcase';
import VideoShowcase from '@/components/sections/VideoShowcase';
import PortfolioSectionDesktop from '@/components/sections/PortfolioSectionDesktop';

// 🎯 IMPORT PINNED SECTION (zaawansowany wrapper)
import PinnedAnimationSection from '@/components/layout/PinnedAnimationSection';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  
  // ✅ OD RAZU POKAZUJEMY TREŚĆ (bez animacji intro)
  const [introCompleted, setIntroCompleted] = useState(true);

  // 🚫 STARA LOGIKA ANIMACJI - WYŁĄCZONA
  // Odkomentuj poniższy kod jak chcesz przywrócić animację intro
  /*
  const [showIntro, setShowIntro] = useState(false);
  
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

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
    setIntroCompleted(true);
    localStorage.setItem(
      'hero-animation-data',
      JSON.stringify({
        seen: true,
        timestamp: Date.now(),
      })
    );

  */

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
      {/* 🚫 ANIMACJA INTRO - WYŁĄCZONA */}
      {/* Odkomentuj poniższy blok jak chcesz przywrócić animację */}
      {/*
      {showIntro && !isMobile && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      */}

      {/* ✅ ZAWSZE POKAZUJEMY TREŚĆ (introCompleted jest zawsze true) */}
      {introCompleted && (
        <>
          {/* 🚀 HERO SECTION */}
          {isMobile ? <HeroSectionMobile /> : <HeroSection />}

          {/* 🎬 PORTFOLIO DESKTOP
          {!isMobile && <PortfolioSectionDesktop />} */}

          {/* 🛠️ SERVICES SHOWCASE */}
          {<ServicesShowcase />}

          {/* 🌐 WEBSITES & SAAS SHOWCASE */}
          <WebsitesShowcase />

          {/* 🤖 AI INTEGRATION SHOWCASE */}
          <AiShowcase />

          {/* 🎬 VIDEO & MARKETING SHOWCASE */}
          <VideoShowcase />

          {/* 📱 PORTFOLIO MOBILE */}
          {isMobile && <PortfolioSection />}

          {/* ⚠️ PROBLEM-ROZWIĄZANIE */}
          <ProblemSolutionSection />

          {/* 💬 TESTIMONIALS */}
          <TestimonialsSection />

          {/* 🔄 PROCESS SECTION */}
          <ProcessSection />

          {/* 🎯 EXPERIENCE */}
          {/* <ExperienceSection /> */}

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