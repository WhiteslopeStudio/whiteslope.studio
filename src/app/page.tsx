'use client';

import { useCallback, useState, useEffect } from 'react';

// 🚫 ANIMACJA INTRO - WYŁĄCZONA (odkomentuj jak chcesz wrócić)
// import IntroAnimation from '@/components/layout/IntroAnimation';

import HeroSection from '@/components/sections/HeroSection';
import LogoTicker from '../components/sections/LogoTicker';

import AboutUsSection from '@/components/sections/AboutUsSection';
import AboutUsSectionMobile from '@/components/sections/AboutUsMobile';

import WebsitesShowcase from '@/components/sections/WebsitesShowcase';
import WebsitesShowcaseMobile from '@/components/sections/WebsitesShowcaseMobile';

import { PortfolioSection } from '@/components/sections/PortfolioSection';

import { FAQSection } from '@/components/sections/FaqSection';
import { FAQSectionMobile } from '@/components/sections/FaqSectionMobile';

import HeroSectionMobile from '@/components/sections/HeroSectionMobile';

import ServicesIntro from '@/components/sections/ServicesIntro';

import BriefSection from '@/components/sections/BriefSection';
import BriefSectionMobile from '@/components/sections/BriefSectionMobile';

import Reviews from '@/components/sections/Reviews';
import ReviewsMobile from '@/components/sections/ReviewsMobile';



import ServicesShowcase from '@/components/sections/ServicesShowcase';
import ServicesShowcaseMobile from '@/components/sections/ServicesShowcaseMobile';


import VideoShowcase from '@/components/sections/VideoShowcase';
import VideoShowcaseMobile from '@/components/sections/VideoShowcaseMobile';


// 🎯 IMPORT PINNED SECTION (zaawansowany wrapper)

import TrustOverlay from '@/components/ui/TrustOverlay';

import ServicesIntroMobile from '@/components/sections/ServiceIntroMobile';

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
          {/* <ServicesDevider /> */}
          {isMobile ? <ReviewsMobile /> : <Reviews />}
          
          {isMobile ? <ServicesIntroMobile /> : <ServicesIntro />}
          
          {/* 🌐 WEBSITES & SAAS SHOWCASE */}
          {isMobile ? <WebsitesShowcaseMobile /> : <WebsitesShowcase />}

          {/* 🛠️ SERVICES SHOWCASE */}
          {isMobile ? <ServicesShowcaseMobile /> : <ServicesShowcase />}
          {/* 🤖 AI INTEGRATION SHOWCASE */}
          {/* <AiShowcase /> */}
          {/* 🎬 VIDEO & MARKETING SHOWCASE */}
          {isMobile ? <VideoShowcaseMobile /> : <VideoShowcase />}
         

          {/* <CaseStudies /> */}

          {isMobile ? <AboutUsSectionMobile /> : <AboutUsSection />}
          {/* <KnowledgeBaseSection /> */}

          {isMobile ? <BriefSectionMobile /> : <BriefSection />}
          
          {/* ❓ FAQ */}
          {isMobile ? <FAQSectionMobile /> : <FAQSection />}
          

          <TrustOverlay />
        </>
      )}
    </main>
  );
}