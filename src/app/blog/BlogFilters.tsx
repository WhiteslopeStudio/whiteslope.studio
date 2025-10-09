
// ==========================================
// /blog/BlogFilters.tsx - CSR (nowy plik)
// ==========================================

'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid3X3, List, Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import { BlogPost } from '@/lib/types';
import { useRouter } from 'next/navigation';

// Category colors (duplikat z page.tsx - potrzebne w CSR)
const getCategoryColor = (category: string) => {
  const colors = {
    'SEO': 'bg-green-600',
    'Design': 'bg-purple-600', 
    'Performance': 'bg-blue-600',
    'Bezpieczeństwo': 'bg-red-600',
    'UX/UI': 'bg-pink-600'
  };
  return colors[category as keyof typeof colors] || 'bg-gray-600';
};

// Format date (duplikat z page.tsx - potrzebne w CSR)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

// Grid Card Component (duplikat z page.tsx - potrzebne w CSR)
const BlogCard = ({ post }: { post: BlogPost }) => (
  <div className="bg-gray-900/30 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#DD9C90]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#DD9C90]/10">
    <div className="relative h-48 overflow-hidden">
      <div 
        className="w-full h-full bg-gradient-to-br from-[#DD9C90]/20 to-gray-900 group-hover:scale-105 transition-transform duration-500"
        style={{
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      <div className="absolute top-4 left-4">
        <span className={`${getCategoryColor(post.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(post.date)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{post.readTime}</span>
        </div>
      </div>
      <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#DD9C90] transition-colors duration-300 leading-tight">
        {post.title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-gray-500 text-sm">{post.author}</span>
        </div>
        <div className="flex items-center gap-1 text-[#DD9C90] text-sm font-semibold group-hover:gap-2 transition-all duration-300">
          <span>Czytaj więcej</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
);

// List Item Component (duplikat z page.tsx - potrzebne w CSR)  
const BlogListItem = ({ post }: { post: BlogPost }) => (
  <div className="bg-gray-900/30 rounded-2xl border border-gray-800 hover:border-[#DD9C90]/30 transition-all duration-300 p-6 group">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="relative overflow-hidden rounded-xl w-full md:w-64 h-48 md:h-40 flex-shrink-0">
        <div 
          className="w-full h-full bg-gradient-to-br from-[#DD9C90]/20 to-gray-900 group-hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${post.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`${getCategoryColor(post.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
            {post.category}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
        </div>
        <h3 className="text-white font-bold text-2xl mb-3 group-hover:text-[#DD9C90] transition-colors duration-300 leading-tight">
          {post.title}
        </h3>
        <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        {post.tags && (
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-4 h-4 text-gray-500" />
            <div className="flex gap-2 flex-wrap">
              {post.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center gap-2 text-[#DD9C90] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
          <span>Czytaj pełny artykuł</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
);

interface BlogFiltersProps {
  categories: string[];
}

export const BlogFilters = ({ categories }: BlogFiltersProps) => {
  // State (skopiowane z oryginalnego pliku)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Wszystkie');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();

  // Mount detection
  useEffect(() => {
    setIsClient(true);
    // Hide SSR fallback when JS loads
    const ssrPosts = document.getElementById('ssr-posts');
    if (ssrPosts) {
      ssrPosts.style.display = 'none';
    }
  }, []);

  // Filter posts (skopiowane z oryginalnego pliku)
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'Wszystkie' || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handlePostClick = (post: BlogPost) => {
    router.push(`/blog/${post.slug}`);
  };

  if (!isClient) {
    return null; // Pokaż SSR fallback podczas loadingu
  }

  return (
    <section className="pb-20">
      <div className="container mx-auto px-6">
        {/* Search & Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Szukaj artykułów, tagów..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:border-[#DD9C90] focus:outline-none transition-colors duration-300"
            />
          </div>

          {/* Controls Row */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#DD9C90] text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === 'grid' ? 'bg-[#DD9C90] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors duration-300 ${
                  viewMode === 'list' ? 'bg-[#DD9C90] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-gray-400 text-sm mb-8">
            Znaleziono {filteredPosts.length} {filteredPosts.length === 1 ? 'artykuł' : 'artykułów'}
            {selectedCategory !== 'Wszystkie' && (
              <span> w kategorii <span className="text-[#DD9C90]">{selectedCategory}</span></span>
            )}
          </div>
        </div>

        {/* Blog Posts */}
        <AnimatePresence mode="wait">
          {filteredPosts.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <div className="text-gray-500 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Brak wyników
              </h3>
              <p className="text-gray-400 mb-8">
                Nie znaleziono artykułów pasujących do Twoich kryteriów wyszukiwania.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Wszystkie');
                }}
                className="bg-[#DD9C90] text-black px-6 py-3 rounded-xl font-semibold hover:bg-[#DD9C90]/90 transition-colors duration-300"
              >
                Wyczyść filtry
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}
            >
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => handlePostClick(post)}
                >
                  {viewMode === 'grid' ? (
                    <BlogCard post={post} />
                  ) : (
                    <BlogListItem post={post} />
                  )}
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};