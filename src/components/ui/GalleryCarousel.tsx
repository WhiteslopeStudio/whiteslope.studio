'use client';

import { useMemo, useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

interface GalleryCarouselProps {
  images: string[] | null | undefined;
  title: string;
}

const GalleryCarousel = ({ images, title }: GalleryCarouselProps) => {
  if (!images || images.length === 0) {
    return null;
  }
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const uniqueImages = useMemo(() => {
    const seen = new Set<string>();
    return images.filter((src) => {
      if (seen.has(src)) return false;
      seen.add(src);
      return true;
    });
  }, [images]);

  const scrollByCards = (direction: -1 | 1) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector('[data-card]') as HTMLElement | null;
    const cardWidth = card?.offsetWidth ?? 360;
    const gap = 16;
    container.scrollBy({ left: direction * (cardWidth + gap), behavior: 'smooth' });
  };

  const goToNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % uniqueImages.length);
  };

  const goToPrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + uniqueImages.length) % uniqueImages.length);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevImage();
      if (e.key === 'ArrowRight') goToNextImage();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className="text-lg text-gray-400">Przykładowe realizacje</div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Poprzednie zdjęcie"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            className="w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            aria-label="Następne zdjęcie"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 pb-2"
      >
        {uniqueImages.map((src, index) => (
          <div
            key={`${src}-${index}`}
            data-card
            className="relative w-[22rem] h-56 md:w-[24rem] md:h-64 xl:w-[26rem] xl:h-72 flex-shrink-0 snap-start overflow-hidden rounded-xl cursor-pointer"
            onClick={() => setLightboxIndex(index)}
          >
            <Image
              src={src}
              alt={`${title} realizacja ${index + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 24rem, (min-width: 768px) 22rem, 80vw"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="text-right mt-3">
        <a
          href="/projects"
          className="text-sm underline underline-offset-4 text-gray-300 hover:text-white transition-colors"
        >
          Zobacz nasze realizacje -&gt;
        </a>
      </div>

      {mounted && lightboxIndex !== null && createPortal(
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
          style={{ zIndex: 99999 }}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            style={{ zIndex: 100000 }}
            className="fixed top-6 right-6 w-16 h-16 rounded-full bg-white/90 hover:bg-white border-2 border-white flex items-center justify-center transition-all cursor-pointer shadow-2xl"
            aria-label="Zamknij podgląd"
          >
            <X className="w-8 h-8 text-gray-900 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevImage();
            }}
            style={{ zIndex: 100000 }}
            className="fixed left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/30 hover:bg-white/50 border-2 border-white flex items-center justify-center transition-all cursor-pointer shadow-xl"
            aria-label="Poprzednie zdjęcie"
          >
            <ArrowLeft className="w-8 h-8 text-white stroke-[3]" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToNextImage();
            }}
            style={{ zIndex: 100000 }}
            className="fixed right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/30 hover:bg-white/50 border-2 border-white flex items-center justify-center transition-all cursor-pointer shadow-xl"
            aria-label="Następne zdjęcie"
          >
            <ArrowRight className="w-8 h-8 text-white stroke-[3]" />
          </button>

          <div 
            className="relative w-full h-full max-w-7xl max-h-screen flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[90vh] aspect-video">
              <Image
                src={uniqueImages[lightboxIndex]}
                alt={`${title} powiększone zdjęcie ${lightboxIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>

          <div 
            style={{ zIndex: 100000 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            {lightboxIndex + 1} / {uniqueImages.length}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default GalleryCarousel;
