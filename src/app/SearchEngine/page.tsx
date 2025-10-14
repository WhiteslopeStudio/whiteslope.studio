'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Search, Home, FileText, Package, Lightbulb, 
  Mail, Code, Palette, Bot, Sparkles, 
  ArrowRight, X 
} from 'lucide-react';

// TYPY DANYCH
interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category: 'Strona główna' | 'Blog' | 'Usługi' | 'Cennik' | 'Kontakt';
  href: string;
  icon: any;
}

// DANE DO WYSZUKIWANIA (przykładowe - zastąpisz importami)
const SEARCH_DATA = {
  homepage: [
    { label: 'Home', href: '#home', type: 'section' },
    { label: 'Portfolio', href: '#portfolio', type: 'section' },
    { label: 'Możliwości', href: '#experience', type: 'section' },
    { label: 'Opinie', href: '#testimonials', type: 'section' },
    { label: 'Usługi', href: '#services', type: 'section' },
    { label: 'Proces', href: '#process', type: 'section' },
    { label: 'FAQ', href: '#faq', type: 'section' },
  ],
  pages: [
    { label: 'Blog', href: '/blog', type: 'page' },
    { label: 'Cennik', href: '/pricing', type: 'page' },
    { label: 'Kontakt', href: '/contact', type: 'page'},
  ],
  services: [
    { label: 'Strona internetowa', href: '/pricing/website', icon: Code },
    { label: 'Optymalizacja', href: '/pricing/optimization', icon: Sparkles },
    { label: 'Integracja AI', href: '/pricing/ai-integration', icon: Bot },
    { label: 'Grafika', href: '/pricing/graphics', icon: Palette },
    { label: 'Projekt indywidualny', href: '/pricing/individual', icon: Lightbulb },
    { label: 'Email marketing', href: '/pricing/email-marketing', icon: Mail }
  ],
  // Dodaj więcej danych z blog posts itp.
};

export default function SearchEngine({ active }: { active: boolean }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Funkcja wyszukiwania
  const searchContent = (searchQuery: string): SearchResult[] => {
    if (!searchQuery.trim()) return [];

    const lowercaseQuery = searchQuery.toLowerCase();
    const allResults: SearchResult[] = [];

    // Przeszukaj sekcje strony głównej
    SEARCH_DATA.homepage.forEach(item => {
      if (item.label.toLowerCase().includes(lowercaseQuery)) {
        allResults.push({
          id: `home-${item.label}`,
          title: item.label,
          description: `Sekcja na stronie głównej`,
          category: 'Strona główna',
          href: item.href,
          icon: Home
        });
      }
    });

    // Przeszukaj podstrony
    SEARCH_DATA.pages.forEach(item => {
      if (item.label.toLowerCase().includes(lowercaseQuery)) {
        allResults.push({
          id: `page-${item.label}`,
          title: item.label,
          description: `Przejdź do strony ${item.label}`,
          category: item.href.includes('contact') ? 'Kontakt' : 'Strona główna',
          href: item.href,
          icon: FileText
        });
      }
    });

    // Przeszukaj usługi
    SEARCH_DATA.services.forEach(item => {
      if (item.label.toLowerCase().includes(lowercaseQuery)) {
        allResults.push({
          id: `service-${item.label}`,
          title: item.label,
          description: `Zobacz pakiety dla ${item.label}`,
          category: 'Usługi',
          href: item.href,
          icon: item.icon
        });
      }
    });

    return allResults;
  };

  // Update results when query changes
  useEffect(() => {
    const results = searchContent(query);
    setResults(results);
    setSelectedIndex(0);
  }, [query]);

  // Focus input when opened
  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!active) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < results.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        router.push(results[selectedIndex].href);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, results, selectedIndex, router]);

  if (!active) return null;

  return (
    <>
      {/* Overlay - przyciemnienie */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
        onClick={() => {/* Zamknij wyszukiwarkę */}}
      />

      {/* Search Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl px-4">
        <div 
          className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 100%)',
          }}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-700">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Czego szukasz? (np. blog, cennik, AI)"
              className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-gray-500"
            />
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-400 bg-gray-800 rounded">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[500px] overflow-y-auto">
            {results.length === 0 && query.trim() && (
              <div className="px-6 py-8 text-center text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nie znaleziono wyników dla "{query}"</p>
                <p className="text-sm mt-2">Spróbuj innej frazy</p>
              </div>
            )}

            {results.length === 0 && !query.trim() && (
              <div className="px-6 py-8 text-center text-gray-400">
                <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="text-lg font-medium mb-2">Zacznij wpisywać...</p>
                <p className="text-sm">Przeszukujemy całą stronę w czasie rzeczywistym</p>
              </div>
            )}

            {/* Group results by category */}
            {results.length > 0 && (
              <div className="py-2">
                {['Strona główna', 'Blog', 'Usługi', 'Cennik', 'Kontakt'].map(category => {
                  const categoryResults = results.filter(r => r.category === category);
                  if (categoryResults.length === 0) return null;

                  return (
                    <div key={category} className="mb-4">
                      <div className="px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {category}
                      </div>
                      {categoryResults.map((result, index) => {
                        const globalIndex = results.indexOf(result);
                        const isSelected = globalIndex === selectedIndex;
                        const Icon = result.icon;

                        return (
                          <button
                            key={result.id}
                            onClick={() => router.push(result.href)}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`w-full flex items-center gap-4 px-6 py-3 transition-all duration-150 ${
                              isSelected 
                                ? 'bg-blue-600/20 border-l-4 border-blue-500' 
                                : 'hover:bg-gray-800/50'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              isSelected ? 'bg-blue-600' : 'bg-gray-800'
                            }`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1 text-left">
                              <div className="text-white font-medium">{result.title}</div>
                              {result.description && (
                                <div className="text-sm text-gray-400">{result.description}</div>
                              )}
                            </div>
                            <ArrowRight className={`w-5 h-5 transition-all ${
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

          {/* Footer - keyboard shortcuts */}
          <div className="px-6 py-3 border-t border-gray-700 flex items-center gap-4 text-xs text-gray-400">
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
    </>
  );
}