// ==========================================
// /blog/page.tsx - SSR 
// ==========================================

// BEZ 'use client' - SSR
import { Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react';
import { blogJsonLd } from '@/lib/schema';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - WHITESLOPE STUDIO | Web Development, Design i SEO',
  description: 'Odkryj najnowsze trendy w web development, designie i technologii. Praktyczne porady, tutoriale i insights od ekspertów WHITESLOPE STUDIO.',
  keywords: 'blog technologiczny, web development, design, SEO, porady, tutoriale, Next.js, React',
  openGraph: {
    title: 'Blog - WHITESLOPE STUDIO',
    description: 'Odkryj najnowsze trendy w web development, designie i technologii',
    url: 'https://whiteslope.pl/blog',
    type: 'website',
    images: [
      {
        url: 'https://whiteslope.pl/blog-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog WHITESLOPE STUDIO',
      },
    ],
  },
  alternates: {
    canonical: '/blog',
  },
};
import { BLOG_POSTS } from '@/lib/data';
import { BlogPost } from '@/lib/types';
import { BlogFilters } from './BlogFilters';

// Category colors (skopiowane z oryginalnego pliku)
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

// Format date (skopiowane z oryginalnego pliku)
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

// Get unique categories (skopiowane z oryginalnego pliku)
const getUniqueCategories = (posts: BlogPost[]) => {
  return Array.from(new Set(posts.map(post => post.category)));
};

// Grid Card Component (skopiowane z oryginalnego pliku)
const BlogCard = ({ post }: { post: BlogPost }) => (
  <div className="bg-gray-900/30 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#DD9C90]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#DD9C90]/10">
    {/* Image */}
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

    {/* Content */}
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

// List Item Component (skopiowane z oryginalnego pliku)
const BlogListItem = ({ post }: { post: BlogPost }) => (
  <div className="bg-gray-900/30 rounded-2xl border border-gray-800 hover:border-[#DD9C90]/30 transition-all duration-300 p-6 group">
    <div className="flex flex-col md:flex-row gap-6">
      {/* Image */}
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

      {/* Content */}
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

        {/* Tags */}
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

export default function BlogPage() {
  // Add JSON-LD Schema
  const jsonLdScript = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
    />
  );
  const categories = ['Wszystkie', ...getUniqueCategories(BLOG_POSTS)];

  return (
    <div className="min-h-screen bg-black mt-20">
      {/* Hero Section - SSR */}
      <section className="pt-32 pb-16 bg-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nasz <span className="text-[#DD9C90]">Blog</span>
            </h1>
            <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
              Odkryj najnowsze trendy w web development, designie i technologii. 
              Praktyczne porady, tutoriale i insights prosto od ekspertów.
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Posts - Progressive Enhancement */}
      <BlogFilters categories={categories} />

      {/* Fallback SSR Posts (widoczne gdy JS wyłączony lub nie załadował się) */}
      <section className="pb-20" id="ssr-posts">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <a href={`/blog/${post.slug}`}>
                  <BlogCard post={post} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}