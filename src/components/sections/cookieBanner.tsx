'use client';

import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ⚠️⚠️⚠️ TRYB TESTOWY WŁĄCZONY ⚠️⚠️⚠️
// Banner pokazuje się przy każdym załadowaniu strony
// Wyłącz tryb testowy: odkomentuj linijki w useEffect

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Ustawienia cookies
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    analytics: false,
    functional: false,
  });

  // Sprawdź czy mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sprawdź czy użytkownik już wyraził zgodę
  useEffect(() => {
      const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // 11 sekund na desktop, 3 sekundy na mobile
      const delay = isMobile ? 2000 : 11000;
      setTimeout(() => setIsVisible(true), delay);
    }
  }, [isMobile]);

  // Zapisz zgodę i ZAMKNIJ
  const saveConsent = (preferences: typeof cookiePreferences) => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    
    if (preferences.analytics) {
      console.log('✅ Google Analytics enabled');
    }
    if (preferences.functional) {
      console.log('✅ Functional cookies enabled');
    }
    
    setIsVisible(false);
  };

  // Zaakceptuj wszystkie
  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      functional: true,
    });
  };

  // Zaakceptuj tylko niezbędne
  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      functional: false,
    });
  };

  // Zamknij bez zapisywania
  const closeBanner = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : -50 }}
          transition={{ duration: 0.3 }}
          className={`fixed z-50 ${
            isMobile 
              ? 'bottom-4 left-4 right-4' 
              : 'bottom-6 left-6 w-[380px]'
          }`}
        >
          {/* Biały, czysty box */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-bold text-black">
                  Pliki cookies
                </h3>
              </div>
              <button
                onClick={closeBanner}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-black" />
              </button>
            </div>

            {/* Treść */}
            <div className="px-5 pb-5">
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Używamy cookies do analizy ruchu (Google Analytics) i zapamiętywania preferencji.
              </p>

              {/* Linki */}
              <div className="flex gap-2 text-[11px] mb-4">
                <a 
                  href="/privacy&cookies/privacyPolicy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black underline transition-colors cursor-pointer"
                >
                  Polityka prywatności
                </a>
                <span className="text-gray-300">•</span>
                <a 
                  href="/privacy&cookies/cookiesPolicy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-black underline transition-colors cursor-pointer"
                >
                  Polityka cookies
                </a>
              </div>

              {/* Przyciski */}
              <div className="space-y-2">
                <button
                  onClick={acceptAll}
                  className="w-full px-4 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Akceptuj wszystkie
                </button>
                
                <button
                  onClick={acceptNecessary}
                  className="w-full px-4 py-2 bg-gray-100 text-black text-xs font-medium rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  Tylko niezbędne
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};