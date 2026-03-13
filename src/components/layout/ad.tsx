'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PromoBanner = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Ukrywanie bannera na WSZYSTKICH urządzeniach
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 40) {
        setIsVisible(true);
      } else if (scrollDelta > 4) {
        setIsVisible(false); // scroll w dół - ukryj
      } else if (scrollDelta < -4) {
        setIsVisible(true); // scroll w górę - pokaż
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -200 }}
      transition={{ duration: 0.35, ease: [0.4, 0.0, 0.2, 1] }}
      onClick={() => router.push('/contact')}
      className="fixed top-[70px] sm:top-[80px] left-0 right-0 z-[40] overflow-hidden cursor-pointer group"
    >
          {/* Fioletowy gradient */}
          <div className="relative bg-gradient-to-r from-[#1985ff] to-[#1985ff]">
            
            {/* ANIMACJA ROZJAŚNIENIA */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 2
              }}
            />

            {/* ZAWARTOŚĆ */}
            <div className="relative z-10 container mx-auto px-6 pt-3 pb-3 flex items-center justify-center">
              <div className="flex items-center justify-center">
                
                {/* MOBILE - kompaktowy tekst */}
                {isMobile ? (
                  <p className="text-white font-medium text-xs whitespace-nowrap">
Darmowe video na start dla firm z okolic Białegostoku!                  </p>
                ) : (
                  /* DESKTOP - pełny tekst */
                  <div className="flex items-center justify-center gap-3">
                    <p className="text-white font-semibold text-sm">
                      Jeśli jesteś z okolic Białegostoku, otrzymujesz <text className="font-bold">DARMOWY</text> kontent video na stronę na start!
                    </p>
                    
                    {/* Separator */}
                    <div className="w-px h-4 bg-white/20" />
                    
                    {/* Call to action z hover */}
                    <div className="flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-300">
                      <span className="text-white font-normal text-sm">
                        Napisz do nas
                      </span>
                      <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Dolna linia - subtelna */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>
  );
};