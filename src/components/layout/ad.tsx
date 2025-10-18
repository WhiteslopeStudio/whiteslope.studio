'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const PromoBanner = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Ukrywanie bannera TYLKO NA MOBILE
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Tylko na mobile (< 768px)
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false); // scroll w dół - ukryj
        } else {
          setIsVisible(true); // scroll w górę - pokaż
        }
      } else {
        // Desktop - zawsze widoczny
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          onClick={() => router.push('/contact')}
          className="fixed top-[73px] left-0 right-0 z-40 overflow-hidden cursor-pointer group"
        >
          {/* Fioletowy gradient */}
          <div className="relative bg-gradient-to-r from-[#8265db] via-[#8265db] to-[#8265db] ">
            
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
            <div className="relative z-10 container mx-auto px-6 pt-3 pb-2">
              <div className="flex items-center justify-center">
                
                {/* ŚRODEK - cały tekst na środku */}
                <div className="flex items-center justify-center gap-3">
                  <p className="text-white font-semibold text-sm">
                    wpisz kod w wiadomości „WHITEZONE7" – 7% taniej na stronę internetową!
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

              </div>
            </div>

            {/* Dolna linia - subtelna */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};