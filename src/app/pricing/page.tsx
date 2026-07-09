'use client';

import React, { useState, useEffect } from 'react';
import { PricingHero } from '@/app/pricing/components/PricingHero';
import PricingHeroMobile from '@/app/pricing/components/PricingHeroMobile';

import { MostPopularServices } from "@/app/pricing/components/MostPopularServices";
import MostPopularServicesMobile from "@/app/pricing/components/MostPopularServicesMobile";

import { PricingWebDevelopment } from '@/app/pricing/components/PricingWebDevelopment';
import PricingWebDevelopmentMobile from '@/app/pricing/components/PricingWebDevelopmentMobile';

import { PricingAutomationAI } from '@/app/pricing/components/PricingAutomationAI';
import PricingAutomationAIMobile from '@/app/pricing/components/PricingAutomationAIMobile';

import { PricingEMarketing } from '@/app/pricing/components/PricingEMarketing';
import PricingEMarketingMobile from '@/app/pricing/components/PricingEMarketingMobile';

import PricingContact from '@/app/pricing/components/PricingContact';
import { PricingFaq } from '@/app/pricing/components/PricingFaq';
import TrustOverlay from '@/components/ui/TrustOverlay';

export default function CennikPage() {
  // --- OBSŁUGA WERSJI MOBILE ---
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // lg breakpoint
    checkMobile(); // Sprawdź przy pierwszym ładowaniu
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Unikamy błędu hydratacji wyświetlając cokolwiek dopiero po zamontowaniu w przeglądarce
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-white text-zinc-950" style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)' }}>
      
      {/* Warunkowe renderowanie Hero */}
      {isMobile ? <PricingHeroMobile /> : <PricingHero />}
      
      {isMobile ? <MostPopularServicesMobile /> : <MostPopularServices />}

      {isMobile ? <PricingWebDevelopmentMobile /> : <PricingWebDevelopment />}

      {isMobile ? <PricingAutomationAIMobile /> : <PricingAutomationAI />}


      {isMobile ? <PricingEMarketingMobile /> : <PricingEMarketing />}

      <PricingContact />

      <PricingFaq />

      <TrustOverlay />

    </div>
  );
}