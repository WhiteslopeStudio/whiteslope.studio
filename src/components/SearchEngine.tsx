'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { searchContent, type SearchableItem } from '@/lib/searchData';
import { useSearchEngine } from '@/utils/hooks/useSearchEngine';

export default function SearchEngine() {
  const { isOpen, close } = useSearchEngine();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Wyszukiwanie - uruchamia się po każdej zmianie query
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

  // Focus na input gdy otwiera się wyszukiwarka
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Nawigacja klawiaturą
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC - zamyka wyszukiwarkę
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }

      // Strzałka w dół
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        return;
      }

      // Strzałka w górę
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        return;
      }

      // Enter - przechodzi do wybranego wyniku
      if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        const href = results[selectedIndex].href;
        close();
        router.push(href);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, router, close]);

  // Funkcja obsługująca kliknięcie w wynik
  const handleResultClick = (href: string) => {
    close();
    router.push(href);
  };

  // Jeśli zamknięte, nie renderuj nic
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - przyciemnienie tła */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
        onClick={close}
      />

      {/* Modal wyszukiwarki */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4 animate-scaleIn">
        <div 
          className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Input wyszukiwania */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Czego szukasz? (np. blog, cennik, AI, landing page...)"
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-gray-500"
            />
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-800 rounded">
              ESC
            </kbd>
          </div>

          {/* Wyniki wyszukiwania */}
          <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
            {/* Stan pusty - brak query */}
            {results.length === 0 && !query.trim() && (
              <div className="px-6 py-12 text-center text-gray-400">
                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium mb-2">Zacznij wpisywać...</p>
                <p className="text-sm">Przeszukujemy całą stronę w czasie rzeczywistym</p>
              </div>
            )}

            {/* Stan pusty - brak wyników */}
            {results.length === 0 && query.trim() && (
              <div className="px-6 py-12 text-center text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium mb-2">Nie znaleziono wyników dla "{query}"</p>
                <p className="text-sm mt-2">Spróbuj innej frazy</p>
              </div>
            )}

            {/* Lista wyników - pogrupowana po kategoriach */}
            {results.length > 0 && (
              <div className="py-2">
                {['Strona główna', 'Podstrony', 'Usługi', 'Cennik', 'Blog', 'Kontakt'].map(category => {
                  const categoryResults = results.filter(r => r.category === category);
                  if (categoryResults.length === 0) return null;

                  return (
                    <div key={category} className="mb-4">
                      {/* Nagłówek kategorii */}
                      <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {category}
                      </div>
                      
                      {/* Wyniki w tej kategorii */}
                      {categoryResults.map((result) => {
                        const globalIndex = results.indexOf(result);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = result.icon;

                        return (
                          <button
                            key={result.id}
                            onClick={() => handleResultClick(result.href)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-4 px-6 py-3 transition-all duration-150 ${
                              isSelected 
                                ? 'bg-blue-600/20 border-l-4 border-blue-500' 
                                : 'hover:bg-gray-800/50 border-l-4 border-transparent'
                            }`}
                          >
                            {/* Ikonka */}
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                              isSelected ? 'bg-blue-600' : 'bg-gray-800'
                            }`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            
                            {/* Treść */}
                            <div className="flex-1 text-left min-w-0">
                              <div className="text-white font-medium truncate">{result.title}</div>
                              {result.description && (
                                <div className="text-sm text-gray-400 truncate">{result.description}</div>
                              )}
                            </div>
                            
                            {/* Strzałka */}
                            <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-all ${
                              isSelected ? 'text-blue-400 translate-x-1' : 'text-gray-600'
                            }`} />
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer - skróty klawiszowe */}
          <div className="px-6 py-3 border-t border-gray-700 flex items-center gap-4 text-xs text-gray-400 flex-wrap">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-800 rounded">↑↓</kbd>
              <span>Nawigacja</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-800 rounded">Enter</kbd>
              <span>Wybierz</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-800 rounded">ESC</kbd>
              <span>Zamknij</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1a1a2e;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #718096;
        }
      `}</style>
    </>
  );
}