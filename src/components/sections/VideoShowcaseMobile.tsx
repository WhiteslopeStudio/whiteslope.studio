'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Play, X } from 'lucide-react';

type VideoCard = {
  id: string;
  src: string;
  title: string;
  category: string;
};

// Magda: tylko jeden filmik - "wizytówka" (o niej samej), nie UGC produktowe.
// Mati: 3 filmiki motocyklowe z portfolio.
const VIDEOS: VideoCard[] = [
  {
    id: 'magda-wizytowka',
    src: '/_resources/videoMarketing/magda/NEW_Magda_Wideo_wizytowka.mp4',
    title: 'Magda',
    category: 'Wizytówka',
  },
  {
    id: 'jawa-prezentacja',
    src: '/_resources/videoMarketing/mati/PORTFOLIO_Pokazanie_Jawa_350CL.mp4',
    title: 'Mati',
    category: 'Prezentacja motocykla',
  },
  {
    id: 'jawa-skladanie',
    src: '/_resources/videoMarketing/mati/PORTFOLIO_skladanie_jawy8_poprawka.mp4',
    title: 'Mati',
    category: 'Showreel',
  },
  {
    id: 'xzone',
    src: '/_resources/videoMarketing/mati/PORTFOLIO_XzoneRide.mp4',
    title: 'Mati',
    category: 'Showreel',
  },
];

// Pojedyncza karta - odtwarza wideo tylko wtedy, gdy realnie jest widoczna
// (IntersectionObserver), żeby nie odpalać 6 filmów naraz w tle - to samo
// podejście do wydajności co reszta strony (patrz komentarze w page.tsx).
const VideoTile = ({ video }: { video: VideoCard }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    const videoEl = videoRef.current;
    if (!el || !videoEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoEl.play().catch(() => {
            // Autoplay bywa blokowane przez przeglądarkę - nie jest to błąd krytyczny.
          });
        } else {
          videoEl.pause();
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative shrink-0 w-[280px] h-[500px] rounded-lg overflow-hidden bg-zinc-900 snap-center"
      >
        <video
          ref={videoRef}
          src={video.src}
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Przyciemnienie od dołu, żeby tekst/CTA było czytelne na każdym materiale */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-white font-bold text-[15px] leading-tight truncate">{video.title}</p>
            <p className="text-white/70 text-[12px] truncate">{video.category}</p>
          </div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-700 text-white text-[12px] font-medium active:scale-95 transition-transform"
          >
            <Play className="w-3 h-3 fill-white" />
            Obejrzyj
          </button>
        </div>
      </div>

      {/* Modal - wideo na cały ekran, z dźwiękiem */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            aria-label="Zamknij"
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-7 h-7" />
          </button>
          <div
            className="relative w-full max-w-[420px] aspect-[9/16] rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={video.src}
              autoPlay
              loop
              controls
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default function VideoShowcaseMobile() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const firstCard = el.firstElementChild as HTMLElement | null;
      const cardStep = firstCard ? firstCard.offsetWidth + 16 : 296; // 16px = gap-4
      const index = Math.round(el.scrollLeft / cardStep);
      setActive(Math.min(VIDEOS.length - 1, Math.max(0, index)));
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    const card = el?.children[index] as HTMLElement | undefined;
    if (el && card) {
      el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full overflow-hidden py-16 px-6"
      style={{ background: 'linear-gradient(to bottom left, #b8c3ff 0%, #ffffff 100%)' }}
    >
      <h2 className="hero-mobile-h1 mb-2 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-zinc-950 tracking-tight max-w-[380px] text-balance">
        Wideo, które buduje zasięgi i sprzedaje
      </h2>

      <p className="mb-4 text-[14px] leading-relaxed text-zinc-700 font-semibold max-w-[380px] text-balance">
        Realizacje, które robimy dla klientów - UGC, portfolio i content, który zatrzymuje scrolowanie.
      </p>

      {/* CTA - ten sam styl co w kartach "Strony internetowe" i "Automatyzacja" */}
      <div className="flex flex-wrap items-center justify-start gap-3 mb-8">
        <Link
          href="/pricing/video-marketing"
          prefetch={false}
          className="px-5 py-2 bg-[#3561ff] text-white font-medium rounded-full flex items-center justify-center text-sm active:scale-95 whitespace-nowrap"
        >
          Dowiedz się więcej
        </Link>

        <Link
          href="/contact"
          prefetch={false}
          className="px-5 py-2 border border-[#3561ff] text-[#3561ff] font-medium rounded-full flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform whitespace-nowrap"
        >
          Wycena
        </Link>
      </div>

      {/* Karuzela - pasek przewijania ukryty przez arbitralne klasy Tailwind */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {VIDEOS.map((video) => (
          <VideoTile key={video.id} video={video} />
        ))}
      </div>

      {/* Kropki nawigacyjne */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {VIDEOS.map((video, index) => (
          <button
            key={video.id}
            type="button"
            aria-label={`Przejdź do filmu ${index + 1}`}
            onClick={() => scrollToIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === active ? 'w-6 bg-[#3561ff]' : 'w-1.5 bg-zinc-300'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
