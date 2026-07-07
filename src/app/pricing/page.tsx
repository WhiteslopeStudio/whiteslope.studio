import React from 'react';
import { PricingHero } from '@/app/pricing/components/PricingHero';
import { MostPopularServices } from "@/app/pricing/components/MostPopularServices";
import { PricingWebDevelopment } from '@/app/pricing/components/PricingWebDevelopment';
import { PricingAutomationAI } from '@/app/pricing/components/PricingAutomationAI';
import {PricingEMarketing} from '@/app/pricing/components/PricingEMarketing';
import PricingContact from '@/app/pricing/components/PricingContact';
import { PricingTable } from '@/app/pricing/components/PricingTable';
import { PricingFaq } from '@/app/pricing/components/PricingFaq';
import { PricingCta } from '@/app/pricing/components/PricingCta';

export default function CennikPage() {
  return (
    // Zmiana na jasny motyw zgodnie z Twoim stylem
    <div className="min-h-screen bg-white text-zinc-950" style={{ fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)' }}>
      <PricingHero />
      <MostPopularServices />
      <PricingWebDevelopment />
      <PricingAutomationAI />
      <PricingEMarketing />

      <PricingContact />

      <PricingFaq />
      

      {/* <PricingTable />
      
      <PricingCta /> */}
    </div>
  );
}