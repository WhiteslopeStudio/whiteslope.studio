import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import Link from 'next/link';

// Category color mapping
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

// Format date to Polish format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

export const BlogSection = () => {
  // Show only first 3 blog posts (newest)
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="blog" className="py-20 bg-black"
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
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-semibold text-white mb-4 tracking-tight">
            Najnowsze wpisy z bloga
          </h2>
          <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto">
            Poznaj najnowsze trendy, tips & tricks ze świata web developmentu i designu
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {featuredPosts.map((post) => (
            <article key={post.id} className="group">
              <Link href={`/blog/${post.slug}`}>
                <div className="bg-gray-900/30 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#DD9C90]/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#DD9C90]/10">
                  {/* Blog Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="w-full h-full bg-gradient-to-br from-[#DD9C90]/20 to-gray-900 group-hover:scale-105 transition-transform duration-500"
                      style={{
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`${getCategoryColor(post.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    {/* Meta Information */}
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

                    {/* Title */}
                    <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#DD9C90] transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Author & Read More */}
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
              </Link>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          

          <Link 
            href="/blog"
            className='inline-flex items-center gap-2'
          >
            <button className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-full bg-[#fd9f91] text-black font-medium text-base transition-all duration-150 hover:bg-[#fc8a7a] hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#fd9f91]/30">
                <span className="select-none">Przejdź do wszystkich wpisów</span>
                <ArrowRight className="w-4 h-4 transition-all duration-150 group-hover:translate-x-1" />
              </button>
          </Link>
        </div>
      </div>
    </section>
  );
};