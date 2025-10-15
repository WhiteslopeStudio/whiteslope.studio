'use client';

import { useState, useLayoutEffect, useEffect } from 'react';
import IntroAnimation from '@/components/layout/IntroAnimation';
import HeroSection from '@/components/sections/HeroSection';
import {HeroPortfolioSection} from '@/components/sections/HeroSection'
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

// ✨ NOWY IMPORT - sekcja z usługami tylko dla desktopa
import DesktopUslugiSection from '@/components/sections/DesktopUslugiSection';
import {PortfolioSectionDesktop} from '@/components/sections/PortfolioSectionDesktop';
import PromoBar from '@/components/sections/PromoBar';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  
  // Stan zarządzający animacją intro
  const [showIntro, setShowIntro] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);

  // Sprawdzanie rozmiaru ekranu
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

  // Sprawdzanie czy pokazać intro (tylko na desktop)
  useEffect(() => {
    // Na mobile od razu pomijamy intro
    if (isMobile) {
      setIntroCompleted(true);
      return;
    }

    // Sprawdzamy localStorage czy intro było już pokazane
    const animationData = localStorage.getItem('hero-animation-data');
    
    if (animationData) {
      try {
        const { seen, timestamp } = JSON.parse(animationData);
        const timeoutDuration = 30 * 60 * 1000; // 30 minut
        
        // Jeśli minęło więcej niż 30 minut, pokaż intro ponownie
        if (Date.now() - timestamp > timeoutDuration) {
          localStorage.removeItem('hero-animation-data');
          setShowIntro(true);
        } else {
          // Jeśli nie minęło 30 minut, pomiń intro
          setIntroCompleted(true);
        }
      } catch (error) {
        // Jeśli błąd parsowania, pokaż intro
        setShowIntro(true);
      }
    } else {
      // Jeśli nie ma danych w localStorage, pokaż intro
      setShowIntro(true);
    }
  }, [isMobile]);

  // Callback gdy intro się zakończy
  const handleIntroComplete = () => {
    setShowIntro(false);
    setIntroCompleted(true);
    
    // Zapisz w localStorage że intro zostało pokazane
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
      {/* Animacja intro - pokazuje się tylko na desktop */}
      {showIntro && !isMobile && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* Główna treść strony */}
      {introCompleted && (
        <>

          
          {/* 🚀 HERO SECTION */}
          {isMobile ? <HeroSectionMobile /> : <HeroSection />}
          {/* 🛠️ DESKTOP USŁUGI SECTION - TYLKO NA DESKTOPIE!
          {!isMobile && <DesktopUslugiSection />} */}
          
          {/* 🎨 PORTFOLIO SECTION */}
          {isMobile ? <PortfolioSection /> : null}
          


          {/* ⚠️ PROBLEM-ROZWIĄZANIE */}
          <ProblemSolutionSection />

          

          {/* 🔄 PROCESS SECTION */}
          <ProcessSection />

          {isMobile ?  null : <PortfolioSectionDesktop />}

          

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

          
        </>
      )}
    </main>
  );
}