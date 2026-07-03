'use client';

import { useCallback, useState, useEffect } from 'react';

// 🚫 ANIMACJA INTRO - WYŁĄCZONA (odkomentuj jak chcesz wrócić)
// import IntroAnimation from '@/components/layout/IntroAnimation';

import HeroSection from '@/components/sections/HeroSection';
import LogoTicker from '../components/sections/LogoTicker';
import AboutUsSection from '@/components/sections/AboutUsSection';
import WebsitesShowcase from '@/components/sections/WebsitesShowcase';
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { FAQSection } from '@/components/sections/FaqSection';
import { BlogSection } from '@/components/sections/BlogSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import HeroSectionMobile from '@/components/sections/HeroSectionMobile';
import KnowledgeBaseSection from '@/components/sections/KnowledgeBaseSection';
import ServicesIntro from '@/components/sections/ServicesIntro';
import CaseStudies from '@/components/sections/CaseStudies';
import BriefSection from '@/components/sections/BriefSection';
import ServicesDevider from '@/components/sections/ServicesDivider';


import ServicesShowcase from '@/components/sections/ServicesShowcase';

import AiShowcase from '@/components/sections/AiShowcase';
import VideoShowcase from '@/components/sections/VideoShowcase';
import PortfolioSectionDesktop from '@/components/sections/PortfolioSectionDesktop';

// 🎯 IMPORT PINNED SECTION (zaawansowany wrapper)
import PinnedAnimationSection from '@/components/layout/PinnedAnimationSection';
import TrustOverlay from '@/components/ui/TrustOverlay';
import BriefPage from './brief/page';

export default function HomePage() {
  // Stan sprawdzający, czy komponent jest już zamontowany w przeglądarce (rozwiązuje błąd Hydracji)
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // ✅ OD RAZU POKAZUJEMY TREŚĆ (bez animacji intro)
  const [introCompleted, setIntroCompleted] = useState(true);

  // 🚫 STARA LOGIKA ANIMACJI - ZACHOWANA (jako komentarz wg prośby)
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
  }, []);
  */

  // ✅ POŁĄCZONA LOGIKA MOUNT I RESIZE
  useEffect(() => {
    setIsMounted(true);
    
    // Ustawienie początkowe
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dopóki React nie sprawdzi warunków po stronie klienta, renderujemy pusty kontener
  // Zapobiega to błędowi: "HTML didn't match the client"
  if (!isMounted) {
    return <main className="min-h-screen bg-black" />;
  }

  return (
    <main className="min-h-screen bg-black">
      {/* 🚫 ANIMACJA INTRO - WYŁĄCZONA */}
      {/* {showIntro && !isMobile && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      */}

      {/* ✅ TREŚĆ GŁÓWNA */}
      {introCompleted && (
        <>
          {/* 🚀 HERO SECTION - Teraz bezpiecznie przełącza wersje */}
          {isMobile ? <HeroSectionMobile /> : <HeroSection />}

          {/* 🎬 PORTFOLIO DESKTOP */}
          {/* {!isMobile && <PortfolioSectionDesktop />} */}


          <LogoTicker />
          <ServicesDevider />

          <ServicesIntro />
          {/* 🌐 WEBSITES & SAAS SHOWCASE */}
          <WebsitesShowcase />
          {/* 🛠️ SERVICES SHOWCASE */}
          <ServicesShowcase />
          {/* 🤖 AI INTEGRATION SHOWCASE */}
          {/* <AiShowcase /> */}
          {/* 🎬 VIDEO & MARKETING SHOWCASE */}
          <VideoShowcase />

          {/* <CaseStudies /> */}

          <AboutUsSection />
          <KnowledgeBaseSection />

          <BriefSection />
          

          

          

          

          

          {/* 📱 PORTFOLIO MOBILE */}
          {isMobile && <PortfolioSection />}

          {/* ⚠️ PROBLEM-ROZWIĄZANIE */}
          {/* <ProblemSolutionSection /> */}

          {/* 💬 TESTIMONIALS */}
          {/* <TestimonialsSection /> */}

          {/* 🔄 PROCESS SECTION */}
          {/* <ProcessSection /> */}

          {/* 🎯 EXPERIENCE */}
          {/* <ExperienceSection /> */}

          {/* 💰 PRICING */}
          {/* <PricingSection /> */}

          {/* 📝 BLOG
          <BlogSection /> */}

          {/* ❓ FAQ */}
          <FAQSection />

          <TrustOverlay />
        </>
      )}
    </main>
  );
}