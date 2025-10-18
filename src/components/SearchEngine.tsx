'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles, MessageCircle, Home, FileText, Briefcase, DollarSign, PenTool, Mail, Package, X } from 'lucide-react';
import { searchContent, type SearchableItem } from '@/lib/searchData';
import { useSearchEngine } from '@/utils/hooks/useSearchEngine';
import { MAIN_SERVICES } from '../lib/data';

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

// Kategorie - glass colors
const categoryColors: Record<string, string> = {
  'Strona główna': 'bg-blue-500/20',
  'Podstrony': 'bg-purple-500/20',
  'Usługi': 'bg-red-400/20',
  'Cennik': 'bg-emerald-500/20',
  'Blog': 'bg-orange-400/20',
  'Kontakt': 'bg-teal-500/20'
};

const filterIcons: Record<string, any> = {
  'Strona główna': Home,
  'Podstrony': FileText,
  'Usługi': Package,
  'Cennik': DollarSign,
  'Blog': PenTool,
  'Kontakt': Mail
};

const serviceIcons: Record<string, any> = {
  'website': Home,
  'optimization': FileText,
  'ai-integration': Sparkles,
  'graphics': PenTool,
  'individual': Briefcase,
  'email-marketing': Mail
};

const serviceColors: Record<string, string> = {
  'website': 'from-blue-500/10 to-blue-600/5',
  'optimization': 'from-purple-500/10 to-purple-600/5',
  'ai-integration': 'from-cyan-500/10 to-cyan-600/5',
  'graphics': 'from-orange-500/10 to-orange-600/5',
  'individual': 'from-emerald-500/10 to-emerald-600/5',
  'email-marketing': 'from-pink-500/10 to-pink-600/5'
};

export default function SearchEngine() {
  const { isOpen, close } = useSearchEngine();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const selectedResultRef = useRef<HTMLButtonElement>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const allCategories = ['Strona główna', 'Podstrony', 'Usługi', 'Cennik', 'Blog', 'Kontakt'];

  // Funkcja do otwierania chatbota
  const openChatbot = () => {
    close(); // Zamknij search
    // Symulujemy kliknięcie w kółko chatbota
    const chatButton = document.querySelector('[aria-label="Otwórz AI asystenta WhiteSlope"]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
  };

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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
      setActiveFilters([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedResultRef.current) {
      selectedResultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }, [selectedIndex]);

  const filteredResults = activeFilters.length > 0
    ? results.filter(r => activeFilters.includes(r.category))
    : results;

  useEffect(() => {
    if (!isOpen) return;
    const currentFilteredResults = activeFilters.length > 0
  ? results.filter(r => activeFilters.includes(r.category))
  : results;

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
  }, [isOpen, results, selectedIndex, router, close, activeFilters, filteredResults]);

  const handleResultClick = (href: string) => {
    close();
    router.push(href);
  };

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop blur overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn hover:cursor-pointer"
        onClick={close}
      />

      {/* Search modal - GLASS DESIGN */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-scaleIn pointer-events-none">
        <div 
          className="w-full max-w-3xl pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="rounded-3xl shadow-2xl backdrop-blur-2xl bg-black/60 border border-white/20 overflow-hidden"
          >
            {/* HEADER z ESC button */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 bg-white/5">
              <Search className="w-5 h-5 text-white/60 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Znajdź wszystko na Whiteslope Studio"
                className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-white/40"
              />
              {/* ESC button - klikalny */}
              <button
                onClick={close}
                className="p-2 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all hover:scale-105 active:scale-95 hover:cursor-pointer group"
                aria-label="Zamknij wyszukiwarkę"
              >
                <X className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </button>
            </div>

            {/* RESULTS CONTAINER */}
            <style dangerouslySetInnerHTML={{__html: `
              .search-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .search-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 10px;
              }
              .search-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 10px;
              }
              .search-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.4);
              }
            `}} />
            <div className="h-[400px] overflow-y-auto search-scrollbar">
              {/* EMPTY STATE - Brak query */}
              {results.length === 0 && !query.trim() && (
                <div className="p-6">
                  {/* CHATBOT CARD */}
                  <button
                    onClick={openChatbot}
                    className="w-full rounded-2xl p-5 mb-8 relative overflow-hidden hover:cursor-pointer group transition-all hover:scale-[1.02] backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-xl bg-white/10 border border-white/20"
                        >
                          <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-semibold text-lg mb-0.5">Asystent Whiteslope</p>
                          <p className="text-sm text-white/70">Twój inteligentny asystent gotowy, by zrewolucjonizować Twoje doświadczenie klienta</p>
                        </div>
                      </div>
                      <div className="px-5 py-2.5 backdrop-blur-xl bg-white/20 hover:bg-white/30 text-white rounded-xl transition-all font-medium text-sm border border-white/30 whitespace-nowrap">
                        Otwórz chat
                      </div>
                    </div>
                  </button>

                  {/* SERVICES GRID */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-1">
                        Nasze Usługi
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {MAIN_SERVICES.map((service: MainService, index: number) => {
                          const Icon = serviceIcons[service.id] || Package;
                          const color = serviceColors[service.id] || 'from-white/10 to-white/5';
                          return (
                            <button
                              key={index}
                              onClick={() => handleResultClick(`/pricing/${service.id}`)}
                              className="group relative p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all hover:cursor-pointer text-left"
                            >
                              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${color} opacity-25 group-hover:opacity-50 transition-opacity`} />
                              <div className="relative flex items-center gap-3">
                                <div 
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 backdrop-blur-xl bg-white/10 border border-white/20 group-hover:scale-105 transition-all`}
                                >
                                  <Icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-white font-medium text-sm group-hover:text-white transition-colors">
                                    {service.title}
                                  </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* NO RESULTS */}
              {results.length === 0 && query.trim() && (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Search className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-lg font-medium text-white mb-2">Nie znaleziono wyników dla "{query}"</p>
                  <p className="text-sm text-white/60">Spróbuj innej frazy lub użyj filtrów poniżej</p>
                </div>
              )}

              {/* RESULTS */}
              {filteredResults.length > 0 && (
                <div className="py-2">
                  {allCategories.map(category => {
                    const categoryResults = filteredResults.filter(r => r.category === category);
                    if (categoryResults.length === 0) return null;

                    return (
                      <div key={category} className="mb-6">
                        <div className="px-6 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider">
                          {category}
                        </div>
                        {categoryResults.map((result) => {
                          const globalIndex = filteredResults.indexOf(result);
                          const isSelected = globalIndex === selectedIndex;
                          const Icon = result.icon;
                          const iconBgColor = categoryColors[category] || 'bg-white/10';

                          return (
                            <button
                              key={result.id}
                              ref={isSelected ? selectedResultRef : null}
                              onClick={() => handleResultClick(result.href)}
                              onMouseEnter={() => setSelectedIndex(globalIndex)}
                              className={`w-full flex items-center gap-4 px-6 py-3.5 transition-all hover:cursor-pointer ${
                                isSelected 
                                  ? 'backdrop-blur-xl bg-white/10 border-l-4 border-white/50' 
                                  : 'hover:bg-white/5 border-l-4 border-transparent'
                              }`}
                            >
                              <div className={`w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 transition-all backdrop-blur-xl border border-white/20 ${
                                isSelected ? `${iconBgColor} scale-110` : iconBgColor
                              }`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <div className="text-white font-medium truncate">{result.title}</div>
                                {result.description && (
                                  <div className="text-sm text-white/60 truncate mt-0.5">{result.description}</div>
                                )}
                              </div>
                              <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                                isSelected ? 'text-white translate-x-1' : 'text-white/50'
                              }`} />
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* NO FILTERED RESULTS */}
              {results.length > 0 && filteredResults.length === 0 && (
                <div className="px-6 py-16 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Package className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-lg font-medium text-white mb-2">Brak wyników dla wybranych filtrów</p>
                  <p className="text-sm text-white/60">Zmień aktywne filtry lub wyczyść je wszystkie</p>
                </div>
              )}
            </div>

            {/* FOOTER - keyboard shortcuts */}
            <div className="border-t border-white/10 bg-white/5">
              <div className="px-6 py-3 flex items-center gap-6 text-xs text-white/60">
                <div className="flex items-center gap-2">
                  <kbd className="px-2.5 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg font-mono">↑↓</kbd>
                  <span>Nawigacja</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2.5 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg font-mono">Enter</kbd>
                  <span>Wybierz</span>
                </div>
                <div className="flex items-center gap-2">
                  <kbd className="px-2.5 py-1.5 backdrop-blur-xl bg-white/10 border border-white/20 rounded-lg font-mono">ESC</kbd>
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
      `}</style>
    </>
  );
}