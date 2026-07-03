'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight, Calendar, ChevronDown } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';

const POSTS_PER_PAGE = 8;

export default function BlogPostsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Ref i stany do obsługi karuzeli z tagami
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // 1. Dynamiczne wyciąganie unikalnych tagów ze wszystkich postów
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    BLOG_POSTS.forEach((post) => {
      if (post.tags) {
        post.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, []);

  // 2. Filtrowanie i sortowanie wpisów
  const filteredAndSortedPosts = useMemo(() => {
    // Najpierw filtrujemy
    const filtered = BLOG_POSTS.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesTag = selectedTag ? post.tags?.includes(selectedTag) : true;
      
      return matchesSearch && matchesTag;
    });

    // Potem sortujemy
    return filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
  }, [searchQuery, selectedTag, sortOrder]);

  // 3. Paginacja
  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE) || 1;
  const currentPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  // --- LOGIKA KARUZELI TAGÓW ---
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
  }, [allTags]);

  const scrollTags = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  // --- HANDLERY ---
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as 'newest' | 'oldest');
    setCurrentPage(1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <section id="artykuly" className="w-full bg-white py-[60px] md:py-[100px]">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-[24px] mb-[32px]">
          <h2 className="text-[24px] font-bold text-zinc-950 tracking-tight">
            Blog
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center gap-[16px] w-full md:w-auto">
            {/* Sortowanie */}
            <div className="relative w-full sm:w-[180px]">
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="w-full h-[40px] pl-[16px] pr-[36px] text-[14px] bg-white border border-zinc-200 rounded-[8px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-zinc-600 appearance-none cursor-pointer"
              >
                <option value="newest">Od najnowszych</option>
                <option value="oldest">Od najstarszych</option>
              </select>
              <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-zinc-400 pointer-events-none" />
            </div>

            {/* Wyszukiwarka */}
            <div className="relative w-full sm:w-[320px]">
              <input
                type="text"
                placeholder="Szukaj artykułów..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full h-[40px] pl-[40px] pr-[16px] text-[14px] bg-zinc-50 border border-zinc-200 rounded-[8px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-zinc-900 placeholder:text-zinc-400"
              />
              <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-zinc-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* --- TAGI (Filtrowanie - Pozioma Karuzela) --- */}
        {allTags.length > 0 && (
          <div className="relative flex items-center mb-[48px]">
            
            {/* Strzałka w lewo */}
            {canScrollLeft && (
              <div className="absolute left-0 z-10 bg-gradient-to-r from-white via-white to-transparent pr-[24px] py-[4px]">
                <button
                  onClick={() => scrollTags('left')}
                  className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  <ChevronLeft className="w-[16px] h-[16px]" />
                </button>
              </div>
            )}

            {/* Scrollowalny kontener */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex items-center gap-[12px] overflow-x-auto py-[4px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth w-full"
            >
              <button
                onClick={() => {
                  setSelectedTag(null);
                  setCurrentPage(1);
                }}
                className={`flex-shrink-0 px-[16px] py-[6px] text-[13px] font-medium rounded-full border transition-colors ${
                  selectedTag === null
                    ? 'bg-zinc-950 text-white border-zinc-950'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:text-zinc-900'
                }`}
              >
                Wszystkie
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`flex-shrink-0 px-[16px] py-[6px] text-[13px] font-medium rounded-full border transition-colors ${
                    selectedTag === tag
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:text-zinc-900'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Strzałka w prawo */}
            {canScrollRight && (
              <div className="absolute right-0 z-10 bg-gradient-to-l from-white via-white to-transparent pl-[24px] py-[4px]">
                <button
                  onClick={() => scrollTags('right')}
                  className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white border border-zinc-200 shadow-sm text-zinc-600 hover:text-zinc-950 transition-colors"
                >
                  <ChevronRight className="w-[16px] h-[16px]" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- GRID ARTYKUŁÓW --- */}
        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px] md:gap-[32px]">
            {currentPosts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className="group flex flex-col">
                <div className="w-full aspect-video rounded-[6px] overflow-hidden bg-zinc-100 mb-[16px]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-[12px] mb-[12px] text-[12px] font-medium">
                  <span className="text-blue-600 uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span className="w-[3px] h-[3px] rounded-full bg-zinc-300" />
                  <div className="flex items-center gap-[4px] text-zinc-500">
                    <Calendar className="w-[12px] h-[12px]" />
                    <span>{new Date(post.date).toLocaleDateString('pl-PL')}</span>
                  </div>
                </div>
                <h3 className="text-[18px] font-bold text-zinc-950 leading-[1.3] mb-[8px] group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[14px] text-zinc-500 leading-relaxed line-clamp-2 mb-[16px]">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-[16px] border-t border-zinc-100">
                  <span className="text-[12px] text-zinc-400 font-medium">
                    {post.author}
                  </span>
                  <span className="text-[12px] text-zinc-400 font-medium">
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full py-[60px] text-center">
            <p className="text-[16px] text-zinc-500">Nie znaleziono artykułów spełniających kryteria.</p>
          </div>
        )}

        {/* --- PAGINACJA --- */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-[16px] mt-[64px]">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`w-[40px] h-[40px] flex items-center justify-center rounded-full border transition-colors ${
                currentPage === 1
                  ? 'border-zinc-100 text-zinc-300 cursor-not-allowed'
                  : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
              }`}
            >
              <ChevronLeft className="w-[18px] h-[18px]" />
            </button>
            <span className="text-[14px] font-medium text-zinc-600">
              Strona <span className="text-zinc-950">{currentPage}</span> z {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`w-[40px] h-[40px] flex items-center justify-center rounded-full border transition-colors ${
                currentPage === totalPages
                  ? 'border-zinc-100 text-zinc-300 cursor-not-allowed'
                  : 'border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950'
              }`}
            >
              <ChevronRight className="w-[18px] h-[18px]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}