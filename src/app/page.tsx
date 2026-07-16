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
import LazyMount from '@/components/ui/LazyMount';

import ServicesIntroMobile from '@/components/sections/ServiceIntroMobile';

export default function HomePage() {
  // ✅ OD RAZU POKAZUJEMY TREŚĆ (bez animacji intro)
  const [introCompleted] = useState(true);

  // ✅ FAZA 2b (14.07.2026): pierwsza wersja (pelny CSS dual-render dla wszystkich
  // 8 sekcji) poprawila LCP (6.5s -> 4.9s) ale pogorszyla FCP (1.1s -> 3.3s) i TBT,
  // bo caly DOM (w tym dwa rownolegle <video> w Hero) podwoil sie i musial sie
  // zhydrowac. Zawezono fix: TYLKO Hero (+ LogoTicker) renderuje sie natychmiast
  // przez CSS - to jedyna rzecz ktora wplywa na LCP/FCP (jest w pierwszym widoku).
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

          {/* ✅ FAZA 3 (16.07.2026): sekcje ponizej fold nie wplywaja na LCP, ale
              montowanie ich WSZYSTKICH naraz zaraz po hydracji odpalalo caly ich
              JS (gsap/locomotive-scroll/framer-motion w kazdej sekcji) jedna salwa
              - realny trace Performance pokazal 4,6s scriptingu blokujacego watek
              glowny. Kazda sekcja montuje sie teraz osobno przez LazyMount
              (IntersectionObserver, rootMargin 800px) dopiero gdy realnie zbliza
              sie do widoku - rozklada koszt JS w czasie zamiast odpalac go naraz. */}
          {belowFoldMounted && (
            <>
              <LazyMount>{isMobile ? <ReviewsMobile /> : <Reviews />}</LazyMount>

              <LazyMount>{isMobile ? <ServicesIntroMobile /> : <ServicesIntro />}</LazyMount>

              {/* 🌐 WEBSITES & SAAS SHOWCASE */}
              <LazyMount>{isMobile ? <WebsitesShowcaseMobile /> : <WebsitesShowcase />}</LazyMount>

              {/* 🛠️ SERVICES SHOWCASE */}
              <LazyMount>{isMobile ? <ServicesShowcaseMobile /> : <ServicesShowcase />}</LazyMount>
              {/* 🎬 VIDEO & MARKETING SHOWCASE */}
              <LazyMount>{isMobile ? <VideoShowcaseMobile /> : <VideoShowcase />}</LazyMount>

              <LazyMount>{isMobile ? <AboutUsSectionMobile /> : <AboutUsSection />}</LazyMount>

              <LazyMount>{isMobile ? <BriefSectionMobile /> : <BriefSection />}</LazyMount>

              {/* ❓ FAQ */}
              <LazyMount>{isMobile ? <FAQSectionMobile /> : <FAQSection />}</LazyMount>
            </>
          )}

          <TrustOverlay />
        </>
      )}
    </main>
  );
}
