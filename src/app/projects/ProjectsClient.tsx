'use client';

import { useState, useEffect } from 'react';
import ProjectsHero from './components/ProjectsHero';
import ProjectsHeroMobile from './components/ProjectsHeroMobile';
import ProjectRow from './components/ProjectRow';
import ProjectsContact from './components/ProjectsContact';
import TrustOverlay from '@/components/ui/TrustOverlay';
import { PROJECT_EXAMPLES } from '@/lib/data';

export default function ProjectsClient() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pb-[80px]">
      
      {/* HERO SECTION */}
      {isMobile ? <ProjectsHeroMobile activeProject={PROJECT_EXAMPLES[0]} /> : <ProjectsHero activeProject={PROJECT_EXAMPLES[0]} />}
      
      {/* NETFLIX ROWS */}
      <div className="flex flex-col gap-[60px] md:gap-[100px] mt-[40px] md:mt-[80px]">
        <ProjectRow 
          title="Web Development" 
          subtitle="Od konwertujących wizytówek po zaawansowane aplikacje."
          category="web" 
        />
        <ProjectRow 
          title="Automatyzacje & AI" 
          subtitle="Inteligentne systemy, które oszczędzają czas i pieniądze."
          category="ai" 
        />
        <ProjectRow 
          title="E-Marketing" 
          subtitle="Zwiększona widoczność i mierzalne wyniki sprzedażowe."
          category="marketing" 
        />
      </div>

      <ProjectsContact/>
      <TrustOverlay />

    </div>
  );
}