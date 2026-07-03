'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Youtube } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';

const YOUTUBE_VIDEOS = [
  {
    id: '1',
    title: 'Sekrety Stron Biznesowych – Pozyskuj klientów w 2 minuty!',
    desc: 'Chcesz, aby Twoja firma wyglądała profesjonalnie w sieci i skutecznie pozyskiwała klientów? W tym wideo eksperci z Whiteslope Studio zdradzają kluczowe sekrety.',
    videoId: '_4TJyWuqkUk',
  },
  {
    id: '2',
    title: 'Wsparcie po wdrożeniu strony? TAK! ✅',
    desc: 'Szkolenie z obsługi strony i pomoc w razie problemów. Whiteslope Studio - strony internetowe dla Twojej firmy 🚀',
    videoId: 'nGAbHUE1eyI',
  },
];

export default function KnowledgeBaseSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Odwracamy kolejność – pokazujemy wpisy od tych z najwyższym ID (najnowszych)
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => Number(b.id) - Number(a.id));

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    // Główna sekcja z szarym tłem. 'relative' trzyma pasy w ryzach.
    <section className="relative w-full bg-zinc-50 overflow-hidden px-4 md:px-8">
      
      {/* --- TŁO: 8 pasów (limonkowo-żółtych) POZA białym divem --- */}
      {/* max-w-[1640px] sprawia, że pasy są tej samej szerokości co biały div */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-[350px] w-full max-w-[1640px] mx-auto flex pointer-events-none opacity-60">
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #bcff9b7e 0%, #fafafa 60%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #c5ff9b8b 0%, #fafafa 90%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #c5ff9b84 0%, #fafafa 25%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #d9ff9b90 0%, #fafafa 50%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #daff9b87 0%, #fafafa 85%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #f7ff9b8b 0%, #fafafa 35%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #ffff9b72 0%, #fafafa 70%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to top, #fff89b69 0%, #fafafa 95%)' }} />
      </div>

      {/* --- GŁÓWNA BIAŁA KARTA --- */}
      {/* KLUCZ: 'relative z-10' sprawia, że biała karta jest ZAWSZE nad gradientami */}
<div className="relative z-10 border-t border-b border-zinc-200 w-full max-w-[1640px] mx-auto bg-transparent p-[32px] md:p-[48px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">        {/* --- TOP: NAGŁÓWEK BLOGA I NAWIGACJA --- */}
        <div className="flex items-center justify-between mb-[40px]">
          <h2 className="text-[28px] font-bold text-zinc-950 leading-[1.05] tracking-tight">
            Blog
          </h2>
          
          <div className="flex items-center gap-[24px]">
            <div className="flex items-center gap-[12px]">
              <button 
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`w-[40px] h-[40px] rounded-full border flex items-center justify-center transition-all ${
                  canScrollLeft 
                    ? 'border-zinc-300 text-zinc-900 hover:bg-zinc-50' 
                    : 'border-zinc-100 text-zinc-300 cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="w-[18px] h-[18px]" />
              </button>
              <button 
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`w-[40px] h-[40px] rounded-full border flex items-center justify-center transition-all ${
                  canScrollRight 
                    ? 'border-zinc-300 text-zinc-900 hover:bg-zinc-50' 
                    : 'border-zinc-100 text-zinc-300 cursor-not-allowed'
                }`}
              >
                <ArrowRight className="w-[18px] h-[18px]" />
              </button>
            </div>

            <a href="/blog" className="hidden sm:inline-flex items-center text-[15px] font-semibold text-zinc-900 hover:text-blue-600 transition-colors group">
              Pokaż wszystkie <ArrowRight className="w-[18px] h-[18px] ml-[8px] transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* --- KARUZELA BLOGÓW --- */}
        <div 
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-[24px] overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-[20px]"
        >
          {sortedPosts.map((post) => (
            <div 
              key={post.id} 
              className="min-w-[320px] lg:min-w-[calc(25%-18px)] flex flex-col group snap-start cursor-pointer"
            >
              <div className="w-full aspect-[4/3] rounded-[16px] overflow-hidden bg-zinc-100 mb-[20px]">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-[12px] mb-[12px]">
                <span className="text-[13px] font-bold text-blue-600 uppercase tracking-wider">{post.category}</span>
                <span className="w-[4px] h-[4px] rounded-full bg-zinc-300" />
                <span className="text-[13px] text-zinc-500">{post.date}</span>
              </div>
              <h3 className="text-[18px] font-semibold text-zinc-950 leading-[1.4] group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
            </div>
          ))}
        </div>

        {/* --- SEKCJA WIDEO --- */}
        <div className="mt-[40px] pt-[40px] border-t border-zinc-200/80">
          <div className="flex items-center justify-between mb-[32px]">
            <h2 className="text-[28px] font-bold text-zinc-950 tracking-tight">
              Filmy
            </h2>
            
            <a 
              href="https://www.youtube.com/@WhiteslopeStudio" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-[8px] px-[20px] py-[10px] rounded-full bg-[#FF0000] text-white text-[14px] font-semibold hover:bg-red-700 transition-colors shadow-md"
            >
              <Youtube className="w-[18px] h-[18px]" /> Subskrybuj kanał
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
            {YOUTUBE_VIDEOS.map((video) => (
              <div key={video.id} className="flex flex-col">
                <div className="w-full aspect-video rounded-[16px] overflow-hidden bg-zinc-900 mb-[16px] shadow-sm">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <h4 className="text-[16px] font-bold text-zinc-950 leading-[1.3] mb-[8px]">
                  {video.title}
                </h4>
                <p className="text-[14px] text-zinc-600 leading-relaxed line-clamp-3">
                  {video.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}