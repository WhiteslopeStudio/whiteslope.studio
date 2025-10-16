'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles, MessageCircle, Home, FileText, Briefcase, DollarSign, PenTool, Mail, Package } from 'lucide-react';
import { searchContent, type SearchableItem } from '@/lib/searchData';
import { useSearchEngine } from '@/utils/hooks/useSearchEngine';
import { MAIN_SERVICES } from '../lib/data'; // Corrected import path

// Define interface for MainService based on data.tsx
interface MainService {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  picture: string;
  description: string;
  features: { title: string; description: string }[];
  ctaText: string;
  animationDirection: string;
  highlighted?: boolean;
}

// ===== STONOWANE KOLORY DLA KATEGORII =====
const categoryColors: Record<string, string> = {
  'Strona główna': 'bg-blue-500/80',
  'Podstrony': 'bg-purple-500/80',
  'Usługi': 'bg-red-400/80',
  'Cennik': 'bg-emerald-500/80',
  'Blog': 'bg-orange-400/80',
  'Kontakt': 'bg-teal-500/80'
};

// ===== IKONY DLA KATEGORII FILTRÓW =====
const filterIcons: Record<string, any> = {
  'Strona główna': Home,
  'Podstrony': FileText,
  'Usługi': Package,
  'Cennik': DollarSign,
  'Blog': PenTool,
  'Kontakt': Mail
};

// ===== MAPOWANIE USŁUG NA IKONY I KOLORY =====
const serviceIcons: Record<string, any> = {
  'website': Home,
  'optimization': FileText,
  'ai-integration': Sparkles,
  'graphics': PenTool,
  'individual': Briefcase,
  'email-marketing': Mail
};

const serviceColors: Record<string, string> = {
  'website': 'from-blue-500/[0.03] to-blue-600/[0.02]',
  'optimization': 'from-purple-500/[0.03] to-purple-600/[0.02]',
  'ai-integration': 'from-cyan-500/[0.03] to-cyan-600/[0.02]',
  'graphics': 'from-orange-500/[0.03] to-orange-600/[0.02]',
  'individual': 'from-emerald-500/[0.03] to-emerald-600/[0.02]',
  'email-marketing': 'from-pink-500/[0.03] to-pink-600/[0.02]'
};

export default function SearchEngine() {
  const { isOpen, close } = useSearchEngine();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const selectedResultRef = useRef<HTMLButtonElement>(null);
  
  // Stan filtrów
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const allCategories = ['Strona główna', 'Podstrony', 'Usługi', 'Cennik', 'Blog', 'Kontakt'];

  // Wyszukiwanie
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(0);
      return;
    }

    const searchResults = searchContent(query);
    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  // Focus na input
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setActiveFilters([]);
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    if (selectedResultRef.current) {
      selectedResultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [selectedIndex]);

  // Nawigacja klawiaturą
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        return;
      }

      if (e.key === 'Enter' && filteredResults[selectedIndex]) {
        e.preventDefault();
        const href = filteredResults[selectedIndex].href;
        close();
        router.push(href);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router, close, activeFilters]);

  // Kliknięcie w wynik
  const handleResultClick = (href: string) => {
    close();
    router.push(href);
  };

  // Toggle filtra
  const toggleFilter = (category: string) => {
    setActiveFilters(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setSelectedIndex(0);
  };

  // Filtrowanie wyników
  const filteredResults = activeFilters.length > 0
    ? results.filter(r => activeFilters.includes(r.category))
    : results;

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur z-50 animate-fadeIn"
        onClick={close}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-scaleIn pointer-events-none">
        <div 
          className="w-full max-w-3xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="rounded-3xl shadow-2xl border border-white/10 overflow-hidden backdrop-blur-xl"
            style={{
              background: 'linear-gradient(135deg, #1f1f1f 0%, #121212 100%)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
            }}
          >
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
              <Search className="w-5 h-5 text-neutral-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Znajdź wszystko na Whiteslope Studio"
                className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-neutral-500"
              />
              <kbd className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold text-neutral-400 bg-white/10 rounded-lg border border-white/10">
                ESC
              </kbd>
            </div>

            <div className="h-[400px] overflow-y-auto custom-scrollbar">
              {results.length === 0 && !query.trim() && (
                <div className="p-6">
                  <div 
                    className="rounded-2xl p-5 mb-8 relative overflow-hidden cursor-pointer group transition-all hover:scale-[1.02]"
                    style={{
                      background: 'linear-gradient(135deg, #2A4858 0%, #1E293B 50%, #374151 100%)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)'
                          }}
                        >
                          <Sparkles className="w-6 h-6 text-blue-300" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg mb-0.5">Asystent Whiteslope </p>
                          <p className="text-sm text-neutral-300">Twój inteligentny asystent gotowy, by zrewolucjonizować Twoje doświadczenie klienta</p>
                        </div>
                      </div>
                      <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all font-medium text-sm backdrop-blur-sm border border-white/20 whitespace-nowrap hover:cursor-pointer">
                        Otwórz chat
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 px-1">
                        Nasze Usługi
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {MAIN_SERVICES.map((service: MainService, index: number) => {
                        const Icon = serviceIcons[service.id] || Package;
                        const color = serviceColors[service.id] || 'from-neutral-500/[0.03] to-neutral-600/[0.02]';
                        return (
                          <button
                            key={index}
                            onClick={() => handleResultClick(`/pricing/${service.id}`)} // Changed from /uslugi/ to /pricing/
                            className="group relative p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all cursor-pointer bg-white/5 hover:bg-white/10 text-left"
                          >
                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                            <div className="relative flex items-center gap-3">
                              <div 
                                className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br ${color} group-hover:scale-105 transition-all`}
                                style={{
                                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset'
                                }}
                              >
                                <Icon className="w-5 h-5 text-white/90" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-white font-medium text-sm group-hover:text-white transition-colors">
                                  {service.title}
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                          </button>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {results.length === 0 && query.trim() && (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Search className="w-8 h-8 text-neutral-500" />
                  </div>
                  <p className="text-lg font-medium text-white mb-2">Nie znaleziono wyników dla "{query}"</p>
                  <p className="text-sm text-neutral-400">Spróbuj innej frazy lub użyj filtrów poniżej</p>
                </div>
              )}

              {filteredResults.length > 0 && (
                <div className="py-2">
                  {allCategories.map(category => {
                    const categoryResults = filteredResults.filter(r => r.category === category);
                    if (categoryResults.length === 0) return null;

                    return (
                      <div key={category} className="mb-6">
                        <div className="px-6 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                          {category}
                        </div>
                        {categoryResults.map((result) => {
                          const globalIndex = filteredResults.indexOf(result);
                          const isSelected = globalIndex === selectedIndex;
                          const Icon = result.icon;
                          const iconBgColor = categoryColors[category] || 'bg-neutral-600/80';

                          return (
                            <button
                              key={result.id}
                              ref={isSelected ? selectedResultRef : null}
                              onClick={() => handleResultClick(result.href)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-full flex items-center gap-4 px-6 py-3.5 transition-all cursor-pointer ${
                                isSelected 
                                  ? 'bg-white/10 border-l-4 border-blue-500' 
                                  : 'hover:bg-white/5 border-l-4 border-transparent'
                              }`}
                            >
                              <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                                isSelected ? `${iconBgColor} scale-110` : iconBgColor
                              }`}
                              style={{
                                boxShadow: isSelected 
                                  ? '0 4px 12px rgba(59, 130, 246, 0.3)' 
                                  : '0 2px 8px rgba(0, 0, 0, 0.2)'
                              }}
                              >
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <div className="text-white font-medium truncate">{result.title}</div>
                                {result.description && (
                                  <div className="text-sm text-neutral-400 truncate mt-0.5">{result.description}</div>
                                )}
                              </div>
                              <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                                isSelected ? 'text-blue-400 translate-x-1' : 'text-neutral-600'
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}

              {results.length > 0 && filteredResults.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
                    <Package className="w-8 h-8 text-neutral-500" />
                  </div>
                  <p className="text-lg font-medium text-white mb-2">Brak wyników dla wybranych filtrów</p>
                  <p className="text-sm text-neutral-400">Zmień aktywne filtry lub wyczyść je wszystkie</p>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-gradient-to-r from-white/5 to-transparent">
              <div className="px-6 py-3 flex items-center gap-6 text-xs text-neutral-400 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <kbd className="px-2.5 py-1.5 bg-white/10 rounded-md border border-white/10 font-mono">↑↓</kbd>
                  <span>Nawigacja</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2.5 py-1.5 bg-white/10 rounded-md border border-white/10 font-mono">Enter</kbd>
                  <span>Wybierz</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2.5 py-1.5 bg-white/10 rounded-md border border-white/10 font-mono">ESC</kbd>
                  <span>Zamknij</span>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
} 