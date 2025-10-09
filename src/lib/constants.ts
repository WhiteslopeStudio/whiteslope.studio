
// Homepage menu - sekcje + podstrony
export const HOMEPAGE_MENU_ITEMS = [
  { label: 'Home', href: '#home', type: 'section' },
  { label: 'Portfolio', href: '#portfolio', type: 'section' },
  { label: 'Możliwości', href: '#experience', type: 'section' },
  { label: 'Opinie', href: '#testimonials', type: 'section' },
  { label: 'Usługi', href: '#services', type: 'section' },
  { label: 'Proces', href: '#process', type: 'section' },
  { label: 'Blog', href: '#blog', type: 'section' },
  { label: 'FAQ', href: '#faq', type: 'section' },
  { label: 'Blog', href: '/blog', type: 'page' },
  { label: 'Cennik', href: '/pricing', type: 'page' },
  { label: 'Kontakt', href: '/contact', type: 'page'},
];

// Menu Oferta - tylko nazwa i link
export const MAIN_SERVICES = [
  { label: 'Strona internetowa', href: '/pricing/website' },
  { label: 'Optymalizacja', href: '/pricing/optimization' },
  { label: 'Integracja AI', href: '/pricing/ai-integration' },
  { label: 'Grafika', href: '/pricing/graphics' },
  { label: 'Projekt indywidualny', href: '/pricing/individual' },
  { label: 'Email marketing', href: '/pricing/email-marketing' }
];

// Subpages menu - tylko podstrony
export const SUBPAGES_MENU_ITEMS = [
  { label: 'Start', href: '/', type: 'page' },
  { label: 'Blog', href: '/blog', type: 'page' },
  { label: 'Cennik', href: '/pricing', type: 'page' },
  { label: 'Kontakt', href: '/contact', type: 'page'},
];

export const APP_CONFIG = {
     name: 'WHITESLOPE STUDIO',
     tagline: 'Wspaniali ludzie dostają wspaniałe strony',
     description: 'Profesjonalne strony internetowe i aplikacje webowe',
     email: 'kontakt@whiteslope.studio',
     phone: '+48 507 311 557, +48 731 721 760'
} as const;