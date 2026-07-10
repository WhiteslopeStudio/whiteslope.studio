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

interface CityPageClientProps {
  cityName: string;
}

export default function CityPageClient({ cityName }: CityPageClientProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(true); // Animacja wyłączona

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="min-h-screen bg-black">
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