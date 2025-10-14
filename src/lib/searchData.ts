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

// Funkcja wyszukiwania
export function searchContent(query: string): SearchableItem[] {
  if (!query.trim()) return [];

  const allItems = getAllSearchableContent();
  const lowercaseQuery = query.toLowerCase();

  return allItems.filter(item => {
    // Sprawdź czy query pasuje do tytułu, opisu lub keywordów
    return (
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.keywords.some(keyword => keyword.includes(lowercaseQuery))
    );
  });
}