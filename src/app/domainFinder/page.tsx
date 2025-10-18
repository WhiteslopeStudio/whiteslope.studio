'use client';

import { useState } from 'react';

// Typy danych
interface DomainResult {
  domain: string;
  available: boolean;
  price?: string;
}

export default function DomainFinder() {
  // Stan do przechowywania wpisanej nazwy
  const [searchTerm, setSearchTerm] = useState('');
  
  // Stan do przechowywania wyników
  const [results, setResults] = useState<DomainResult[]>([]);
  
  // Stan do pokazania ładowania
  const [loading, setLoading] = useState(false);

  // Lista popularnych rozszerzeń domen - DUŻO WIĘCEJ!
  const popularTLDs = [
    // Podstawowe
    '.com', '.net', '.org', '.co',
    // Polskie
    '.pl', '.com.pl',
    // Tech i IT
    '.io', '.dev', '.app', '.tech', '.ai', '.digital', '.codes',
    // Kreatywne i biznes
    '.studio', '.design', '.agency', '.media', '.online', '.store',
    // Nowe i ciekawe
    '.club', '.pro', '.site', '.website', '.space', '.world', '.gg'
  ];

  // Funkcja do wykrywania czy użytkownik wpisał domenę z końcówką
  const parseDomainInput = (input: string): { name: string; userTLD?: string } => {
    const cleaned = input.toLowerCase().trim();
    
    // Sprawdzamy czy jest kropka
    if (cleaned.includes('.')) {
      const parts = cleaned.split('.');
      // youtube.com -> name: "youtube", userTLD: ".com"
      const name = parts[0];
      const tld = '.' + parts.slice(1).join('.');
      return { name, userTLD: tld };
    }
    
    // Jeśli nie ma kropki, to tylko nazwa
    return { name: cleaned };
  };

  // Funkcja do generowania wariantów domeny
  const generateDomainVariants = (input: string): string[] => {
    const { name, userTLD } = parseDomainInput(input);
    const cleanName = name.replace(/[^a-z0-9-]/g, '');
    const variants: string[] = [];

    // WAŻNE: Jeśli użytkownik wpisał z końcówką, sprawdź ją jako pierwszą!
    if (userTLD) {
      variants.push(`${cleanName}${userTLD}`);
    }

    // Podstawowe warianty z różnymi rozszerzeniami
    popularTLDs.forEach(tld => {
      // Nie dodawaj jeśli już dodaliśmy tę końcówkę
      if (tld !== userTLD) {
        variants.push(`${cleanName}${tld}`);
      }
    });

    // Warianty z dodanymi słowami (tylko dla .com) - MNIEJ, bo mamy limit API
    const prefixes = ['get', 'my'];
    const suffixes = ['app', 'hq'];

    prefixes.forEach(prefix => {
      if (variants.length < 10) { // Limit!
        variants.push(`${prefix}${cleanName}.com`);
      }
    });

    suffixes.forEach(suffix => {
      if (variants.length < 10) { // Limit!
        variants.push(`${cleanName}${suffix}.com`);
      }
    });

    // Zwracamy maksymalnie 10 pierwszych
    return variants.slice(0, 10);
  };

  // Funkcja do sprawdzania dostępności przez nasze API
  const checkDomainsAPI = async (domains: string[]): Promise<DomainResult[]> => {
    try {
      console.log('📤 Wysyłam do API:', domains);
      
      const response = await fetch('/api/check-domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domains }),
      });

      console.log('📥 Status odpowiedzi:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('❌ Błąd API:', errorData);
        throw new Error(errorData.error || 'Błąd API');
      }

      const data = await response.json();
      console.log('✅ Otrzymane wyniki:', data);
      return data.results;
      
    } catch (error) {
      console.error('❌ Błąd podczas sprawdzania domen:', error);
      throw error;
    }
  };

  // Główna funkcja wyszukiwania
  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      alert('Wpisz nazwę domeny!');
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      // Generujemy warianty (funkcja sama wykryje czy jest końcówka)
      const variants = generateDomainVariants(searchTerm);
      
      // Sprawdzamy dostępność przez nasze API (wszystkie naraz!)
      const domainChecks = await checkDomainsAPI(variants);

      // Sortujemy: najpierw dostępne
      const sorted = domainChecks.sort((a: DomainResult, b: DomainResult) => {
        if (a.available && !b.available) return -1;
        if (!a.available && b.available) return 1;
        return 0;
      });

      setResults(sorted);
    } catch (error) {
      console.error('Błąd podczas wyszukiwania:', error);
      alert('Wystąpił błąd podczas wyszukiwania');
    } finally {
      setLoading(false);
    }
  };

  // Obsługa Enter w inpucie
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Nagłówek */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🔍 Wyszukiwarka Domen
          </h1>
          <p className="text-gray-600">
            Znajdź idealną domenę dla swojego projektu
          </p>
        </div>

        {/* Pole wyszukiwania */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="np. mojastrona, youtube.com, sklep.pl..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Szukam...' : 'Szukaj'}
            </button>
          </div>
        </div>

        {/* Wyniki */}
        {results.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Znalezione domeny:
            </h2>
            
            {results.map((result, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow p-4 flex items-center justify-between transition-all hover:shadow-md ${
                  result.available ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {result.available ? '✅' : '❌'}
                  </span>
                  <div>
                    <p className="font-semibold text-lg text-gray-800">
                      {result.domain}
                    </p>
                    <p className={`text-sm ${result.available ? 'text-green-600' : 'text-red-600'}`}>
                      {result.available ? 'Dostępna!' : 'Zajęta'}
                    </p>
                  </div>
                </div>
                
                {result.available && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {result.price}
                    </p>
                    <button className="mt-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm font-semibold">
                      Kup teraz
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Informacja gdy brak wyników */}
        {!loading && results.length === 0 && searchTerm && (
          <div className="bg-white rounded-lg shadow p-8 text-center text-gray-600">
            Wpisz nazwę domeny i kliknij "Szukaj"
          </div>
        )}
      </div>
    </div>
  );
}