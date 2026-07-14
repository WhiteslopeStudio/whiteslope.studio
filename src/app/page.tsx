'use client';

import { useState } from 'react';

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

  // ✅ FAZA 2 (14.07.2026): przełącznik desktop/mobile przeniesiony z JS (isMobile
  // ustawiany po zamontowaniu w useEffect, blokujący render pustym <main> do tego
  // czasu) na czyste CSS (Tailwind "hidden md:block" / "block md:hidden"). Obie
  // wersje trafiają do wygenerowanego HTML od razu (SSR) - to przeglądarka przez
  // CSS decyduje którą pokazać, więc treść jest widoczna natychmiast zamiast
  // czekać na hydrację. To był realny hamulec na FCP/LCP na mobile (potwierdzone
  // testem: usunięcie samego wideo z Hero nic nie zmieniło w LCP, bo cała reszta
  // sekcji - w tym karuzela logo i nagłówek - była zamknięta za tą samą blokadą).
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
          {/* 🚀 HERO SECTION */}
          <div className="block md:hidden"><HeroSectionMobile /></div>
          <div className="hidden md:block"><HeroSection /></div>

          {/* 🎬 PORTFOLIO DESKTOP */}
          {/* {!isMobile && <PortfolioSectionDesktop />} */}


          <LogoTicker />
          {/* <ServicesDevider /> */}
          <div className="block md:hidden"><ReviewsMobile /></div>
          <div className="hidden md:block"><Reviews /></div>

          <div className="block md:hidden"><ServicesIntroMobile /></div>
          <div className="hidden md:block"><ServicesIntro /></div>

          {/* 🌐 WEBSITES & SAAS SHOWCASE */}
          <div className="block md:hidden"><WebsitesShowcaseMobile /></div>
          <div className="hidden md:block"><WebsitesShowcase /></div>

          {/* 🛠️ SERVICES SHOWCASE */}
          <div className="block md:hidden"><ServicesShowcaseMobile /></div>
          <div className="hidden md:block"><ServicesShowcase /></div>
          {/* 🤖 AI INTEGRATION SHOWCASE */}
          {/* <AiShowcase /> */}
          {/* 🎬 VIDEO & MARKETING SHOWCASE */}
          <div className="block md:hidden"><VideoShowcaseMobile /></div>
          <div className="hidden md:block"><VideoShowcase /></div>


          {/* <CaseStudies /> */}

          <div className="block md:hidden"><AboutUsSectionMobile /></div>
          <div className="hidden md:block"><AboutUsSection /></div>
          {/* <KnowledgeBaseSection /> */}

          <div className="block md:hidden"><BriefSectionMobile /></div>
          <div className="hidden md:block"><BriefSection /></div>

          {/* ❓ FAQ */}
          <div className="block md:hidden"><FAQSectionMobile /></div>
          <div className="hidden md:block"><FAQSection /></div>


          <TrustOverlay />
        </>
      )}
    </main>
  );
}
