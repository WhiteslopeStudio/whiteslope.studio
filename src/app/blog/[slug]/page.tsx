// BEZ 'use client' - SSR
import { Calendar, User, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import OtherServicesSection from '@/components/websites/OtherServicesSection';
import { BLOG_POSTS } from '@/lib/data';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/schema';
import { BlogPost } from '@/lib/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Metadata } from 'next';

// ==========================================
// METADATA
// ==========================================
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
  const readingTime = Math.ceil(wordCount / 200);

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
      url: `https://whiteslope.studio/blog/${post.slug}`,
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
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ==========================================
// HELPERS
// ==========================================
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  });
};

const getPostBySlug = (slug: string): BlogPost | null => {
  return BLOG_POSTS.find(post => post.slug === slug) || null;
};

const getRelatedPosts = (currentPost: BlogPost, limit = 3): BlogPost[] => {
  return BLOG_POSTS
    .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
    .slice(0, limit);
};

const getAdjacentPosts = (currentPost: BlogPost) => {
  const currentIndex = BLOG_POSTS.findIndex(post => post.id === currentPost.id);
  return {
    previousPost: currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null,
    nextPost: currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null
  };
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbPath = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${slug}` }
  ];

  const relatedPosts = getRelatedPosts(post);
  const { previousPost, nextPost } = getAdjacentPosts(post);

  return (
    // Zmienione na jasny motyw z odpowiednim odstępem od headera
    <div className="min-h-screen bg-zinc-50 pt-[120px] pb-[80px]">
      
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbPath)) }} />

      {/* Górna nawigacja (Powrót) */}
      <div className="w-full max-w-[1200px] mx-auto px-[24px] mb-[40px]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-[8px] text-[14px] font-medium text-zinc-500 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="w-[16px] h-[16px] group-hover:-translate-x-1 transition-transform" />
          Powrót do aktualności
        </Link>
      </div>

      {/* ==================== ARTYKUŁ (Węższa kolumna dla czytelności) ==================== */}
      <article className="w-full max-w-[1200px] mx-auto px-[24px]">
        
        {/* HEADER ARTYKUŁU */}
        <header className="mb-[40px]">
          {/* Kategoria i meta */}
          <div className="flex flex-wrap items-center gap-[12px] md:gap-[24px] mb-[20px] text-[13px] font-medium">
            <span className="text-blue-600 uppercase tracking-wider">
              {post.category}
            </span>
            <span className="hidden md:block w-[4px] h-[4px] rounded-full bg-zinc-300" />
            <div className="flex flex-wrap items-center gap-[16px] text-zinc-500">
              <div className="flex items-center gap-[6px]">
                <Calendar className="w-[14px] h-[14px]" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <Clock className="w-[14px] h-[14px]" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <User className="w-[14px] h-[14px]" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>

          {/* Tytuł i krótki opis (Zmniejszone nagłówki) */}
          <h1 className="text-[32px] md:text-[44px] font-bold text-zinc-950 tracking-tight leading-[1.15] mb-[24px]">
            {post.title}
          </h1>
          <p className="text-[16px] md:text-[18px] text-zinc-500 leading-relaxed">
            {post.excerpt}
          </p>
        </header>

        {/* HERO IMAGE */}
        <div className="w-full aspect-video rounded-[16px] overflow-hidden bg-zinc-200 mb-[48px] shadow-sm">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT (Markdown) - Dostosowany do jasnego motywu */}
        <div className="prose prose-zinc max-w-none 
          prose-headings:text-zinc-950 prose-headings:font-bold prose-headings:tracking-tight
          prose-p:text-zinc-600 prose-p:leading-[1.8]
          prose-strong:text-zinc-900 
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-li:text-zinc-600
        ">
          <ReactMarkdown
            components={{
              h1: ({children}) => <h1 className="text-[28px] md:text-[32px] mb-[24px] mt-[48px]">{children}</h1>,
              h2: ({children}) => <h2 className="text-[22px] md:text-[26px] mb-[20px] mt-[40px]">{children}</h2>,
              h3: ({children}) => <h3 className="text-[18px] md:text-[20px] mb-[16px] mt-[32px]">{children}</h3>,
              p: ({children}) => <p className="mb-[24px] text-[16px] md:text-[17px]">{children}</p>,
              ul: ({children}) => <ul className="mb-[24px] pl-[24px] list-disc marker:text-zinc-400">{children}</ul>,
              ol: ({children}) => <ol className="mb-[24px] pl-[24px] list-decimal marker:text-zinc-400">{children}</ol>,
              li: ({children}) => <li className="mb-[8px] pl-[8px] text-[16px] md:text-[17px]">{children}</li>,
              blockquote: ({children}) => (
                <blockquote className="border-l-[4px] border-blue-600 bg-blue-50/50 pl-[24px] py-[16px] pr-[16px] my-[32px] rounded-r-[8px] italic text-zinc-700 text-[18px]">
                  {children}
                </blockquote>
              ),
              code: ({children}) => (
                <code className="bg-zinc-100 text-pink-600 px-[6px] py-[2px] rounded-[4px] text-[14px] font-mono">
                  {children}
                </code>
              ),
              pre: ({children}) => (
                <pre className="bg-zinc-950 text-zinc-100 rounded-[12px] p-[24px] overflow-x-auto my-[32px] shadow-lg text-[14px] font-mono leading-[1.6]">
                  {children}
                </pre>
              ),
              table: ({children}) => (
                <div className="overflow-x-auto my-[32px] rounded-[8px] border border-zinc-200">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    {children}
                  </table>
                </div>
              ),
              th: ({children}) => (
                <th className="bg-zinc-50 text-zinc-950 font-semibold p-[16px] border-b border-zinc-200 text-[14px]">
                  {children}
                </th>
              ),
              td: ({children}) => (
                <td className="text-zinc-600 p-[16px] border-b border-zinc-100 text-[15px]">
                  {children}
                </td>
              )
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* TAGI NA DOLE ARTYKUŁU */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-[8px] mt-[48px] pt-[32px] border-t border-zinc-200">
            <Tag className="w-[16px] h-[16px] text-zinc-400 mr-[8px]" />
            {post.tags.map(tag => (
              <span key={tag} className="text-[12px] font-medium bg-zinc-100 text-zinc-600 px-[12px] py-[6px] rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* NAWIGACJA: POPRZEDNI / NASTĘPNY Wpisy */}
        {(previousPost || nextPost) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] mt-[48px]">
            {previousPost ? (
              <Link href={`/blog/${previousPost.slug}`} className="flex flex-col p-[24px] rounded-[16px] border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all group">
                <span className="flex items-center gap-[8px] text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-[8px]">
                  <ArrowLeft className="w-[14px] h-[14px] group-hover:-translate-x-1 transition-transform" /> Poprzedni
                </span>
                <span className="text-[15px] font-bold text-zinc-950 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {previousPost.title}
                </span>
              </Link>
            ) : <div />}
            
            {nextPost ? (
              <Link href={`/blog/${nextPost.slug}`} className="flex flex-col p-[24px] rounded-[16px] border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-sm transition-all text-right group items-end">
                <span className="flex items-center gap-[8px] text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-[8px]">
                  Następny <ArrowRight className="w-[14px] h-[14px] group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[15px] font-bold text-zinc-950 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {nextPost.title}
                </span>
              </Link>
            ) : <div />}
          </div>
        )}

      </article>

      {/* ==================== POWIĄZANE ARTYKUŁY ==================== */}
      {relatedPosts.length > 0 && (
        <section className="w-full max-w-[1200px] mx-auto px-[24px] mt-[80px] md:mt-[120px]">
          <div className="pt-[60px] border-t border-zinc-200">
            <h2 className="text-[24px] font-bold text-zinc-950 mb-[32px]">
              Może Cię również zainteresować
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px] md:gap-[32px]">
              {relatedPosts.map((relatedPost) => (
                <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.id} className="group flex flex-col">
                  
                  {/* Styl obrazka spójny z BlogPostsSection */}
                  <div className="w-full aspect-video rounded-[6px] overflow-hidden bg-zinc-100 mb-[16px]">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="flex items-center gap-[12px] mb-[12px] text-[12px] font-medium">
                    <span className="text-blue-600 uppercase tracking-wider">
                      {relatedPost.category}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-zinc-300" />
                    <div className="flex items-center gap-[4px] text-zinc-500">
                      <Calendar className="w-[12px] h-[12px]" />
                      <span>{formatDate(relatedPost.date)}</span>
                    </div>
                  </div>

                  <h3 className="text-[18px] font-bold text-zinc-950 leading-[1.3] mb-[8px] group-hover:text-blue-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-[14px] text-zinc-500 leading-relaxed line-clamp-2 mb-[16px]">
                    {relatedPost.excerpt}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-[16px] border-t border-zinc-100">
                    <span className="text-[12px] text-zinc-400 font-medium">
                      {relatedPost.author}
                    </span>
                    <span className="text-[12px] text-zinc-400 font-medium">
                      {relatedPost.readTime}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== DODATKOWE SEKCJE ==================== */}
      {/* <div className="mt-[80px]">
        <OtherServicesSection />
      </div> */}

    </div>
  );
}