'use client';

import { useState, useEffect } from 'react';

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
  // ✅ OD RAZU POKAZUJEMY TREŚĆ (bez animacji intro)
  const [introCompleted] = useState(true);

  // ✅ FAZA 2b (14.07.2026): pierwsza wersja (pelny CSS dual-render dla wszystkich
  // 8 sekcji) poprawila LCP (6.5s -> 4.9s) ale pogorszyla FCP (1.1s -> 3.3s) i TBT,
  // bo caly DOM (w tym dwa rownolegle <video> w Hero) podwoil sie i musial sie
  // zhydrowac. Zawezono fix: TYLKO Hero (+ LogoTicker) renderuje sie natychmiast
  // przez CSS - to jedyna rzecz ktora wplywa na LCP/FCP (jest w pierwszym widoku).
  // Reszta sekcji (ponizej fold, nie wplywa na LCP) wraca do starego wzorca:
  // JS-owy przelacznik isMobile + lokalny "mounted" gate, ktory NIE blokuje juz
  // calej strony - tylko to co i tak jest niewidoczne przy pierwszym malowaniu.
  const [belowFoldMounted, setBelowFoldMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setBelowFoldMounted(true);
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-screen bg-black">
      {/* 🚫 ANIMACJA INTRO - WYŁĄCZONA */}

      {/* ✅ TREŚĆ GŁÓWNA */}
      {introCompleted && (
        <>
          {/* 🚀 HERO SECTION - zawsze natychmiast (SSR + CSS), to jedyna sekcja
              ktora wplywa na FCP/LCP bo jest w pierwszym widoku ekranu */}
          <div className="block md:hidden"><HeroSectionMobile /></div>
          <div className="hidden md:block"><HeroSection /></div>

          <LogoTicker />

          {/* Sekcje ponizej fold - nie wplywaja na LCP, moga poczekac na mount */}
          {belowFoldMounted && (
            <>
              {isMobile ? <ReviewsMobile /> : <Reviews />}

              {isMobile ? <ServicesIntroMobile /> : <ServicesIntro />}

              {/* 🌐 WEBSITES & SAAS SHOWCASE */}
              {isMobile ? <WebsitesShowcaseMobile /> : <WebsitesShowcase />}

              {/* 🛠️ SERVICES SHOWCASE */}
              {isMobile ? <ServicesShowcaseMobile /> : <ServicesShowcase />}
              {/* 🎬 VIDEO & MARKETING SHOWCASE */}
              {isMobile ? <VideoShowcaseMobile /> : <VideoShowcase />}

              {isMobile ? <AboutUsSectionMobile /> : <AboutUsSection />}

              {isMobile ? <BriefSectionMobile /> : <BriefSection />}

              {/* ❓ FAQ */}
              {isMobile ? <FAQSectionMobile /> : <FAQSection />}
            </>
          )}

          <TrustOverlay />
        </>
      )}
    </main>
  );
}
