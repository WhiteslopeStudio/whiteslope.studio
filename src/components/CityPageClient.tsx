'use client';

import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import HeroSectionMobile from "@/components/sections/HeroSectionMobile";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import PortfolioSectionDesktop from "@/components/sections/PortfolioSectionDesktop";
import DesktopUslugiSection from "@/components/sections/DesktopUslugiSection";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import { PricingSection } from "@/components/sections/PricingSection";
import BriefSection from "@/components/sections/BriefSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { FAQSection } from "@/components/sections/FaqSection";

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
      {/* ✅ ZAWSZE POKAZUJEMY TREŚĆ (introCompleted jest zawsze true) */}
      {introCompleted && (
        <>
          {/* 🚀 HERO SECTION */}
          {isMobile ? (
            <HeroSectionMobile cityOverride={cityName} />
          ) : (
            <HeroSection cityOverride={cityName} />
          )}

          {/* 🎬 PORTFOLIO DESKTOP */}
          {!isMobile && <PortfolioSectionDesktop />}

          {/* 🛠️ DESKTOP USŁUGI */}
          {!isMobile && <DesktopUslugiSection />}

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