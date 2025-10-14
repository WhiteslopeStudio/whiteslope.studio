'use client';

import Link from 'next/link';

export default function PromoBar() {
  return (
    <div 
      className="w-full py-2 relative overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #2d1b4e 0%, #4a2d6e 50%, #2d1b4e 100%)',
        backgroundSize: '200% 100%',
        animation: 'gradientShift 4s ease infinite',
      }}
    >
      {/* Subtelny shimmer */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />

      {/* Zawartość */}
      <div className="container mx-auto px-4 relative z-10">
        <Link 
          href="/contact"
          className="flex items-center justify-center gap-2 sm:gap-3 text-center group"
        >
          
          {/* Tekst promocyjny - kompaktowy */}
          <span 
            className="text-white font-bold text-xs sm:text-sm tracking-wide"
            style={{ 
              fontFamily: 'inherit',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)'
            }}
          >
            🎉 NOWI KLIENCI -5%
          </span>
          
          {/* Separator - tylko desktop */}
          <span className="hidden sm:inline text-white/40">|</span>
          
          {/* CTA - mały */}
          <span 
            className="text-white/90 font-medium text-xs sm:text-sm group-hover:text-white transition-colors underline underline-offset-2"
            style={{ fontFamily: 'inherit' }}
          >
            Skorzystaj →
          </span>
        </Link>
      </div>

      {/* CSS dla animacji */}
      <style jsx>{`
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}