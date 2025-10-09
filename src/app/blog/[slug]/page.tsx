// BEZ 'use client' - SSR
import { Calendar, User, Clock, ArrowLeft, Tag } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data';
import { articleJsonLd } from '@/lib/schema';
import { BlogPost } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';

// Generowanie metadanych dla artykułu
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artykuł nie został znaleziony - WHITESLOPE STUDIO',
      description: 'Przepraszamy, ale szukany artykuł nie istnieje.',
    };
  }

  const wordCount = (post.content || '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // Średnio 200 słów na minutę

  return {
    title: `${post.title} - Blog WHITESLOPE STUDIO`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    authors: [{ name: post.author }],
    category: post.category,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://whiteslope.pl/blog/${post.slug}`,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    other: {
      'article:published_time': post.date,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags ? post.tags.join(',') : '',
      'reading_time': `${readingTime} min read`,
    },
  };
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Category colors
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

// Format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

// Find post by slug
const getPostBySlug = (slug: string): BlogPost | null => {
  return BLOG_POSTS.find(post => post.slug === slug) || null;
};

// Get related posts (same category, excluding current)
const getRelatedPosts = (currentPost: BlogPost, limit = 3): BlogPost[] => {
  return BLOG_POSTS
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, limit);
};

// Get next and previous posts
const getAdjacentPosts = (currentPost: BlogPost) => {
  const currentIndex = BLOG_POSTS.findIndex(post => post.id === currentPost.id);
  return {
    previousPost: currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null,
    nextPost: currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null
  };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Add JSON-LD Schema
  const jsonLdScript = (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
    />
  );
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const { previousPost, nextPost } = getAdjacentPosts(post);

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="fixed top-20 left-6 z-40">
        <Link
          href="/blog"
          className="flex items-center gap-2 bg-gray-900/80 backdrop-blur-md text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition-all duration-300 border border-gray-700"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Powrót do bloga</span>
        </Link>
      </div>

      {/* Navigation Buttons */}
      <div className="hidden md:block">
        {previousPost && (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-40 bg-gray-900/80 backdrop-blur-md text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 border border-gray-700"
            title={previousPost.title}
          >
            <div className="flex items-center gap-3">
              <ArrowLeft className="w-5 h-5" />
              <span className="max-w-[150px] truncate">
                {previousPost.title}
              </span>
            </div>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-40 bg-gray-900/80 backdrop-blur-md text-white p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 border border-gray-700"
            title={nextPost.title}
          >
            <div className="flex items-center gap-3">
              <span className="max-w-[150px] truncate">
                {nextPost.title}
              </span>
              <ArrowLeft className="w-5 h-5 rotate-180" />
            </div>
          </Link>
        )}
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <div>
            {/* Category & Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className={`${getCategoryColor(post.category)} text-white text-sm font-semibold px-4 py-2 rounded-full`}>
                {post.category}
              </span>
              <div className="flex items-center gap-4 text-gray-400 text-sm">
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
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-base md:text-xl text-gray-400 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags && (
              <div className="flex items-center gap-2 mb-8">
                <Tag className="w-4 h-4 text-gray-500" />
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
            <div 
              className="w-full h-full bg-gradient-to-br from-[#DD9C90]/20 to-gray-900"
              style={{
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-a:text-[#DD9C90] prose-code:text-[#DD9C90] prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-800">
            <ReactMarkdown
              components={{
                h1: ({children}) => <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 mt-8">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl md:text-2xl font-bold text-white mb-3 mt-6">{children}</h3>,
                p: ({children}) => <p className="text-gray-300 leading-relaxed mb-4">{children}</p>,
                ul: ({children}) => <ul className="text-gray-300 mb-4 pl-6">{children}</ul>,
                ol: ({children}) => <ol className="text-gray-300 mb-4 pl-6">{children}</ol>,
                li: ({children}) => <li className="mb-2">{children}</li>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-[#DD9C90] pl-6 my-6 italic text-gray-400">
                    {children}
                  </blockquote>
                ),
                code: ({children}) => (
                  <code className="bg-gray-900 text-[#DD9C90] px-2 py-1 rounded text-sm">
                    {children}
                  </code>
                ),
                pre: ({children}) => (
                  <pre className="bg-gray-900 border border-gray-800 rounded-xl p-6 overflow-x-auto my-6">
                    {children}
                  </pre>
                ),
                table: ({children}) => (
                  <div className="overflow-x-auto my-6">
                    <table className="w-full border border-gray-800 rounded-xl overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                th: ({children}) => (
                  <th className="bg-gray-900 text-white font-semibold p-4 text-left border-b border-gray-800">
                    {children}
                  </th>
                ),
                td: ({children}) => (
                  <td className="text-gray-300 p-4 border-b border-gray-800">
                    {children}
                  </td>
                )
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20">
          <div className="container mx-auto px-6 max-w-6xl">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
                Powiązane artykuły
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="group">
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="bg-gray-900/30 rounded-2xl overflow-hidden border border-gray-800 hover:border-[#DD9C90]/30 transition-all duration-300 hover:-translate-y-2">
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <div 
                            className="w-full h-full bg-gradient-to-br from-[#DD9C90]/20 to-gray-900 group-hover:scale-105 transition-transform duration-500"
                            style={{
                              backgroundImage: `url(${relatedPost.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          />
                          <div className="absolute top-4 left-4">
                            <span className={`${getCategoryColor(relatedPost.category)} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                              {relatedPost.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#DD9C90] transition-colors duration-300 leading-tight line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-gray-500 text-xs">
                            <span>{formatDate(relatedPost.date)}</span>
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}