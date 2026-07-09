'use client';

import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import HeroSectionMobile from './components/HeroSectionMobile';

import ClientHistoryMobile from './components/ClientHistoryMobile';
import ClientHistory from './components/ClientHistory';

import ChatbotDemoMobile from './components/ChatbotDemoMobile';
import ChatbotDemo from './components/ChatbotDemo';

import ProcessMobile from './components/ProcessMobile';
import Process from './components/Process';

import SafeAiMobile from './components/SafeAiMobile';

import FaqMobile from './components/FaqMobile';

import SeoMobile from './components/SeoMobile';
import SafeAi from './components/SafeAi';
import Faq from './components/Faq';
import Seo from './components/Seo';

export default function ChatbotPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Ustawienie początkowe
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    // Nasłuchiwanie zmian (resize)
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Zapobiega błędom hydracji (HTML didn't match the client)
  if (!isMounted) {
    return <main className="min-h-screen bg-white" />;
  }

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* 🚀 Renderowanie warunkowe na podstawie ekranu */}
      {isMobile ? <HeroSectionMobile /> : <HeroSection />}
      {isMobile ? <ClientHistoryMobile /> : <ClientHistory />}
        {isMobile ? <ChatbotDemoMobile /> : <ChatbotDemo />}
        {isMobile ? <ProcessMobile /> : <Process />}
        {isMobile ? <SafeAiMobile /> : <SafeAi />}
        {isMobile ? <FaqMobile /> : <Faq />}
        {isMobile ? <SeoMobile /> : <Seo />}
    </main>
  );
}