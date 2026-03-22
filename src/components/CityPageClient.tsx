'use client';

import { useEffect, useState } from "react";
import HeroSection from "@/components/sections/HeroSection";
import HeroSectionMobile from "@/components/sections/HeroSectionMobile";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import PortfolioSectionDesktop from "@/components/sections/PortfolioSectionDesktop";
import ServicesShowcase from "@/components/sections/ServicesShowcase";
import WebsitesShowcase from "@/components/sections/WebsitesShowcase";
import AiShowcase from "@/components/sections/AiShowcase";
import VideoShowcase from "@/components/sections/VideoShowcase";
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
      {introCompleted && (
        <>
          {/* 🚀 HERO SECTION */}
          {isMobile ? (
            <HeroSectionMobile cityOverride={cityName} />
          ) : (
            <HeroSection cityOverride={cityName} />
          )}

          {/* 🌐 WEBSITES & SAAS SHOWCASE */}
          <WebsitesShowcase />

          {/* 🛠️ SERVICES SHOWCASE */}
          <ServicesShowcase />

          {/* 🤖 AI INTEGRATION SHOWCASE */}
          <AiShowcase />

          {/* 🎬 VIDEO & MARKETING SHOWCASE */}
          <VideoShowcase />

          {/* 📝 BLOG */}
          <BlogSection />

          {/* ❓ FAQ */}
          <FAQSection />
        </>
      )}
    </main>
  );
}