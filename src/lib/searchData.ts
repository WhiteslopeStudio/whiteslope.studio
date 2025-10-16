import { HOMEPAGE_MENU_ITEMS, MAIN_SERVICES } from './constants';
import { BLOG_POSTS, SERVICE_PACKAGES, MAIN_SERVICES as SERVICES_DATA } from './data';
import {
  Home, FileText, Package, DollarSign, Mail,
  Code, Palette, Bot, Sparkles, Lightbulb
} from 'lucide-react';

// Mapowanie ikon dla kategorii
export const CATEGORY_ICONS: Record<string, any> = {
  'Strona główna': Home,
  'Podstrony': FileText,
  'Usługi': Package,
  'Cennik': DollarSign,
  'Blog': FileText,
  'Kontakt': Mail,
};

// Mapowanie ikon dla usług
export const SERVICE_ICONS: Record<string, any> = {
  'website': Code,
  'optimization': Sparkles,
  'ai-integration': Bot,
  'graphics': Palette,
  'individual': Lightbulb,
  'email-marketing': Mail,
};

export interface SearchableItem {
  id: string;
  title: string;
  description: string;
  category: 'Strona główna' | 'Podstrony' | 'Usługi' | 'Cennik' | 'Blog' | 'Kontakt';
  href: string;
  keywords: string[];
  icon: any;
}

// Funkcja główna - zwraca wszystkie przeszukiwalne elementy
export function getAllSearchableContent(): SearchableItem[] {
  const results: SearchableItem[] = [];

  // 1. SEKCJE STRONY GŁÓWNEJ
  HOMEPAGE_MENU_ITEMS
    .filter(item => item.type === 'section')
    .forEach(item => {
      results.push({
        id: `section-${item.label}`,
        title: item.label,
        description: `Sekcja na stronie głównej`,
        category: 'Strona główna',
        href: item.href,
        keywords: [item.label.toLowerCase()],
        icon: Home,
      });
    });

  // 2. PODSTRONY
  HOMEPAGE_MENU_ITEMS
    .filter(item => item.type === 'page')
    .forEach(item => {
      results.push({
        id: `page-${item.label}`,
        title: item.label,
        description: `Przejdź do strony ${item.label}`,
        category: item.href.includes('contact') ? 'Kontakt' : 'Podstrony',
        href: item.href,
        keywords: [item.label.toLowerCase()],
        icon: item.href.includes('contact') ? Mail : FileText,
      });
    });

  // 3. USŁUGI GŁÓWNE
  SERVICES_DATA.forEach(service => {
    const serviceIcon = SERVICE_ICONS[service.id] || Package;
    
    results.push({
      id: `service-${service.id}`,
      title: service.title,
      description: service.subtitle,
      category: 'Usługi',
      href: `/pricing/${service.id}`,
      keywords: [
        service.title.toLowerCase(),
        service.subtitle.toLowerCase(),
        service.description.toLowerCase(),
        ...service.features.map(f => f.title.toLowerCase())
      ],
      icon: serviceIcon,
    });
  });

  // 4. PAKIETY CENOWE
  SERVICE_PACKAGES.forEach(servicePkg => {
    servicePkg.packages.forEach(pkg => {
      const serviceIcon = SERVICE_ICONS[servicePkg.serviceId] || DollarSign;
      
      results.push({
        id: `package-${pkg.id}`,
        title: pkg.name,
        description: `${pkg.price} - ${pkg.description}`,
        category: 'Cennik',
        href: `/pricing/${servicePkg.serviceId}#${pkg.id}`,
        keywords: [
          pkg.name.toLowerCase(),
          pkg.description.toLowerCase(),
          pkg.price.toLowerCase(),
          ...pkg.features.map(f => f.toLowerCase())
        ],
        icon: serviceIcon,
      });
    });
  });

  // 5. POSTY BLOGOWE
  BLOG_POSTS.forEach(post => {
    results.push({
      id: `blog-${post.id}`,
      title: post.title,
      description: post.excerpt,
      category: 'Blog',
      href: `/blog/${post.slug}`,
      keywords: [
        post.title.toLowerCase(),
        post.excerpt.toLowerCase(),
        post.category.toLowerCase(),
        post.author.toLowerCase(),
        ...(post.tags || []).map(t => t.toLowerCase())
      ],
      icon: FileText,
    });
  });

  return results;
}

// Funkcja wyszukiwania - GOOGLE-LIKE
export function searchContent(query: string): SearchableItem[] {
  if (!query.trim()) return [];

  const allItems = getAllSearchableContent();
  const searchTerms = query.toLowerCase()
    .split(/\s+/)
    .filter(term => term.length > 0)
    .map(term => term.replace(/[^\w\sąęćżźńłóś]/gi, '')); // Usuń znaki specjalne

  // Jeśli zapytanie jest bardzo krótkie, szukaj dokładnych dopasowań
  if (query.length <= 3) {
    return allItems.filter(item => {
      const exactMatch = item.title.toLowerCase().includes(query.toLowerCase()) ||
                        item.description.toLowerCase().includes(query.toLowerCase());
      return exactMatch;
    }).slice(0, 8); // Limit wyników dla krótkich zapytań
  }

  const scoredItems = allItems.map(item => {
    let score = 0;
    const itemTitle = item.title.toLowerCase();
    const itemDesc = item.description.toLowerCase();
    const itemKeywords = item.keywords.join(' ').toLowerCase();
    const itemCategory = item.category.toLowerCase();

    // 1. DOKŁADNE DOPASOWANIE FRAZY (najwyższy priorytet)
    const exactPhrase = query.toLowerCase();
    if (itemTitle.includes(exactPhrase)) score += 20;
    if (itemDesc.includes(exactPhrase)) score += 15;
    if (itemKeywords.includes(exactPhrase)) score += 10;

    // 2. DOPASOWANIE WSZYSTKICH SŁÓW (wysoki priorytet)
    const hasAllTerms = searchTerms.every(term => 
      itemTitle.includes(term) || itemDesc.includes(term) || itemKeywords.includes(term)
    );
    
    if (hasAllTerms) {
      score += 15;
      
      // Bonus za kolejność słów
      const titleInOrder = itemTitle.includes(searchTerms.join(' '));
      if (titleInOrder) score += 10;
    }

    // 3. PUNKTACJA PER SŁOWO (średni priorytet)
    searchTerms.forEach(term => {
      // Tytuł - najważniejsze
      if (itemTitle.includes(term)) {
        score += 8;
        // Bonus za dopasowanie na początku tytułu
        if (itemTitle.startsWith(term)) score += 4;
      }
      
      // Opis
      if (itemDesc.includes(term)) score += 4;
      
      // Słowa kluczowe
      if (itemKeywords.includes(term)) score += 3;
      
      // Kategoria
      if (itemCategory.includes(term)) score += 2;
    });

    // 4. SPECJALNE PRZYPADKI
    // Bonus za krótkie, precyzyjne tytuły
    if (itemTitle.split(' ').length <= 4) score += 2;
    
    // Bonus za popularne strony (możesz dodać licznik kliknięć później)
    if (item.href === '/') score += 3; // Strona główna
    if (item.href.includes('/pricing/')) score += 2; // Cennik

    // 5. KARY ZA SŁABE DOPASOWANIA
    // Kara jeśli brakuje któregokolwiek słowa (tylko gdy wiele słów)
    if (searchTerms.length > 1) {
      const missingTerms = searchTerms.filter(term => 
        !itemTitle.includes(term) && !itemDesc.includes(term) && !itemKeywords.includes(term)
      ).length;
      score -= missingTerms * 5;
    }

    return { item, score };
  });

  // Filtruj i sortuj
  const filtered = scoredItems
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);

  // Dla długich zapytań zwróć mniej wyników, dla krótkich więcej
  const maxResults = query.length > 10 ? 15 : 25;
  return filtered.slice(0, maxResults);
}

// ALTERNATYWNIE - UPROSZCZONA WERSJA GOOGLE-LIKE
export function searchContentSimple(query: string): SearchableItem[] {
  if (!query.trim()) return [];

  const allItems = getAllSearchableContent();
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 0);

  const scoredItems = allItems.map(item => {
    let score = 0;
    const searchText = `${item.title} ${item.description} ${item.keywords.join(' ')}`.toLowerCase();

    // 1. Dokładna fraza = bardzo wysoki wynik
    if (searchText.includes(query.toLowerCase())) {
      score += 100;
    }

    // 2. Wszystkie słowa = wysoki wynik
    const hasAllTerms = searchTerms.every(term => searchText.includes(term));
    if (hasAllTerms) {
      score += 50;
      
      // Bonus za kolejność
      if (item.title.toLowerCase().includes(searchTerms.join(' '))) {
        score += 30;
      }
    }

    // 3. Punktacja per słowo
    searchTerms.forEach(term => {
      if (item.title.toLowerCase().includes(term)) score += 10;
      if (item.description.toLowerCase().includes(term)) score += 5;
      if (item.keywords.some(keyword => keyword.includes(term))) score += 3;
    });

    return { item, score };
  });

  return scoredItems
    .filter(({ score }) => score >= 5) // Minimalny próg
    .sort((a, b) => b.score - a.score)
    .slice(0, 20) // Maksymalnie 20 wyników
    .map(({ item }) => item);
}
