'use client';

import { useState, useEffect } from 'react';
import ContactHero from './ContactHero';
import ContactHeroMobile from './ContactHeroMobile';

export default function ResponsiveContactHero() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    // Sprawdzamy, czy ekran jest węższy niż punkt przerwania lg (1024px)
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    
    // Inicjalne sprawdzenie
    checkMobile();
    
    // Nasłuchiwanie zmiany rozmiaru okna
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Dopóki nie wiemy, jaki jest ekran (SSR/Hydration), nie renderujemy komponentów, 
  // aby uniknąć błędu "hydration mismatch".
  if (isMobile === null) return null; 

  return isMobile ? <ContactHeroMobile /> : <ContactHero />;
}