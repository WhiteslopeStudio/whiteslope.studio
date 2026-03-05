'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const LOGOS: { src: string; invert?: boolean }[] = [
  { src: '/_resources/logo-PatrykKulesza.webp' },
  { src: '/_resources/mati_logo.webp.webp', invert: true },
  { src: '/_resources/wieslawski-studio-logo.webp' },
];

const IMAGES = [
  '/_resources/portfolio1.webp',
  '/_resources/portfolio2.webp',
  '/_resources/portfolio3.webp',
  '/_resources/portfolio4.webp',
  '/_resources/portfolio5.webp',
  '/_resources/portfolio6.webp',
  '/_resources/stronyInternetowe/www.wieslawski.studio_.webp',
  '/_resources/stronyInternetowe/korepetycje-eight.vercel.app_.webp',
  '/_resources/stronyInternetowe/www.easylesson.app_.webp',
  '/_resources/stronyInternetowe/www.easylesson.app_ (1).webp',
  '/_resources/stronyInternetowe/www.easylesson.app_ (2).webp',


 
];

const SPEED = 0.25;
const TILE_HEIGHT = 220;

function useTickerScroll(direction: 'left' | 'right') {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const scrollStartLeft = useRef(0);
  const rafRef = useRef<number>(0);
  const accumulator = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // inicjalizuj pozycję dla prawej karuzelki na połowę
    if (direction === 'right') {
      container.scrollLeft = container.scrollWidth / 2;
    }

    const loop = () => {
      if (!isDragging.current && container) {
        accumulator.current += SPEED;
        const pixels = Math.floor(accumulator.current);
        if (pixels >= 1) {
          accumulator.current -= pixels;
          if (direction === 'left') {
            container.scrollLeft += pixels;
            if (container.scrollLeft >= container.scrollWidth / 2) {
              container.scrollLeft -= container.scrollWidth / 2;
            }
          } else {
            container.scrollLeft -= pixels;
            if (container.scrollLeft <= 0) {
              container.scrollLeft += container.scrollWidth / 2;
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [direction]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStartX.current = e.clientX;
    scrollStartLeft.current = containerRef.current?.scrollLeft ?? 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    containerRef.current.scrollLeft = scrollStartLeft.current + (dragStartX.current - e.clientX);
  };

  const stopDrag = () => { isDragging.current = false; };

  return { containerRef, handleMouseDown, handleMouseMove, stopDrag };
}

function Ticker({ direction }: { direction: 'left' | 'right' }) {
  const { containerRef, handleMouseDown, handleMouseMove, stopDrag } = useTickerScroll(direction);

  return (
    <div
      ref={containerRef}
      className="flex gap-4 overflow-x-hidden select-none cursor-grab active:cursor-grabbing"
      style={{ scrollbarWidth: 'none' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      {[...IMAGES, ...IMAGES].map((src, i) => (
        <div
          key={i}
          className="flex-shrink-0 rounded-xl overflow-hidden shadow-[0_4px_18px_rgba(0,0,0,0.10)] pointer-events-none"
          style={{ height: `${TILE_HEIGHT}px`, aspectRatio: '16/9' }}
        >
          <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
        </div>
      ))}
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="relative bg-white border-b border-black/10 py-16 md:py-18 overflow-hidden">
      <div className="container mx-auto px-6 mb-17 flex items-end justify-between flex-wrap gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-zinc-950">
          Transformacja pomysłów w działające strony – nasze realizacje
        </h2>
        <Link href="/projects" className="text-blue-700 hover:text-blue-800 font-medium transition-colors text-sm">
          Zobacz nasze realizacje →
        </Link>
      </div>

      {/* Tickers with fade-out gradients on sides */}
      <div className="relative">
        <div className="flex flex-col gap-4">
          <Ticker direction="left" />
          <Ticker direction="right" />
        </div>
        {/* Left gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-white to-transparent z-10" />
        {/* Right gradient */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-white to-transparent z-10" />
      </div>

      {/* Brand logos */}
      <div className="container mx-auto px-6 mt-16">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-zinc-400 mb-8">
          Marki, z którymi współpracowaliśmy
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {LOGOS.map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt=""
              className="h-8 md:h-10 w-auto object-contain opacity-60 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300"
              style={logo.invert ? { filter: 'invert(1) grayscale(1)' } : undefined}
              draggable={false}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
        <Link
          href="#brief"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-12 px-8 text-sm md:text-base font-semibold text-white relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(25,133,255,0.3)] hover:shadow-[0_8px_30px_rgba(25,133,255,0.45)]"
          style={{ background: '#1985ff' }}
        >
          Brief projektowy
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        <Link
          href="/contact?tab=meeting"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-12 px-8 text-sm md:text-base font-medium text-zinc-900 border border-black/20 bg-transparent hover:bg-black/5 transition-all duration-300 active:scale-95 group"
        >
          Bezpłatna konsultacja
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
