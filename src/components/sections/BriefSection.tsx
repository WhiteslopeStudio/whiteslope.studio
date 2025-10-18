'use client'

import { useState } from 'react';
import { X, Download, Eye } from 'lucide-react';

export default function BriefSection() {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setShowPreview(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section 
        className="bg-[#0b0b0bff] relative overflow-hidden py-10 pb-50"
        style={{
        background: `
          radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
          linear-gradient(
            to bottom,
            black 0px,
            black 10px,
            #3b3b3bff 10px,
            #3b3b3bff 11px,
            #0b0b0bff 11px,
            #0b0b0bff calc(100% - 11px),
            #3b3b3bff calc(100% - 11px),
            #3b3b3bff calc(100% - 10px),
            black calc(100% - 10px),
            black 100%
          )
        `
      }} 
      >
        <div className="max-w-6xl mx-auto">
          {/* Bento Grid - responsywny aspect ratio */}
          <div 
            className="relative rounded-2xl overflow-hidden aspect-square sm:aspect-[16/12] md:aspect-[16/8] lg:aspect-[16/4]"
          >

            {/* Tło zdjęcia */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: 'url(/_resources/brief.webp)',
                backgroundColor: '#0a0a0a'
              }}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
            
            {/* Zawartość */}
            <div className="relative h-full flex flex-col items-left justify-center text-left">
              <h2 className="text-2xl lg:text-3xl font-normal text-white mb-3 leading-tight px-16">
                Przygotuj się do projektu z nami{" "}
                <span className="font-bold bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent">
                    
                </span> 
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl px-16">
                Pobierz i przeczytaj poradnik projektowy
              </p>
              
              {/* Przyciski CTA */}
              <div className="flex flex-col sm:flex-row gap-4 px-16">
                <a
                  href="/_resources/brief_projektowy - przewodnik dla klienta.html"
                  download
                  className="group px-8 py-3.5 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Pobierz
                </a>
                <button
                  onClick={handlePreview}
                  className="group px-8 py-3.5 bg-white/5 backdrop-blur-sm text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2 hover:cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  Zobacz podgląd pliku
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal z podglądem */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur backdrop */}
          <div 
            className="absolute inset-0 bg-black/5 backdrop-blur"
            onClick={handleClose}
          />
          
          {/* Kontener z plikiem */}
          <div className="relative w-full max-w-5xl h-[90vh] bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-white/10">
            {/* Przycisk zamknięcia */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* Iframe z plikiem */}
            <iframe
              src="/_resources/brief_projektowy - przewodnik dla klienta.html"
              className="w-full h-full"
              title="Podgląd brief projektowy"
            />
          </div>
        </div>
      )}
    </>
  );
}