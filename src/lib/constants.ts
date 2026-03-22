
import type { LucideIcon } from 'lucide-react';
import {
  ShoppingBag,
  CalendarDays,
  HeadphonesIcon,
  Database,
  FileText,
  Zap,
  Workflow,
  Rocket,
  Globe,
  Activity,
  LayoutDashboard,
  Smartphone,
  Video,
  Megaphone,
  SearchCheck,
  Volume2,
} from 'lucide-react';

export interface MegaMenuItemDef {
  label: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
}

export interface MegaMenuColumnDef {
  title: string;
  iconHoverClass: string;
  items: MegaMenuItemDef[];
}

export const MEGA_MENU: MegaMenuColumnDef[] = [
  {
    title: 'Dedykowane Systemy',
    iconHoverClass: 'group-hover:text-cyan-400 group-hover:bg-cyan-500/10',
    items: [
      {
        label: 'Aplikacje SaaS MVP',
        href: '/pricing/website',
        desc: 'Twój własny startup od zera',
        icon: Rocket,
        badge: '🔥 NEW',
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      },
      {
        label: 'Poprawki istniejących stron',
        href: '/pricing/website',
        desc: 'Modernizacja i optymalizacja istniejących rozwiązań',
        icon: Activity,
      },
      {
        label: 'Email marketing',
        href: '/pricing/email-marketing',
        desc: 'Skuteczne kampanie emailowe, które sprzedają',
        icon: Database,
      },
      {
        label: 'Strony Internetowe',
        href: '/pricing/website',
        desc: 'Wizytówki i rozbudowane serwisy',
        icon: Globe,
      },
      
      {
        label: 'Dedykowane Systemy Webowe',
        href: '/pricing/website',
        desc: 'Panele B2B, portale i aplikacje wewnętrzne',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'Integracja AI',
    iconHoverClass: 'group-hover:text-blue-400 group-hover:bg-blue-500/10',
    items: [
      {
        label: 'Chatboty E-commerce',
        desc: 'Automatyczny doradca w sklepie',
        href: '/pricing/ai-integration',
        icon: ShoppingBag,
        badge: 'Bestseller',
        badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      },
      {
        label: 'Chatboty Rezerwacje',
        desc: 'Umawianie spotkań w kalendarzu',
        href: '/pricing/ai-integration',
        icon: CalendarDays,
      },
      {
        label: 'Pomoc Techniczna 24/7',
        desc: 'Odpowiedzi na bazie dokumentacji',
        href: '/pricing/ai-integration',
        icon: HeadphonesIcon,
      },
    ],
  },
  {
    title: 'Automatyzacje',
    iconHoverClass: 'group-hover:text-violet-400 group-hover:bg-violet-500/10',
    items: [
      
      {
        label: 'Obieg Dokumentów',
        href: '/pricing/ai-integration',
        desc: 'Make/Zapier i wyciąganie danych',
        icon: FileText,
      },
      {
        label: 'Zarządzanie Leadami',
        href: '/pricing/ai-integration',
        desc: 'Ścieżki sprzedażowe i powiadomienia',
        icon: Zap,
      },
      {
        label: 'Integracje Systemów (API)',
        href: '/pricing/ai-integration',
        desc: 'Łączymy narzędzia, które ze sobą nie gadają',
        icon: Workflow,
      },
    ],
  },
  
  {
    title: 'Marketing & Wideo',
    iconHoverClass: 'group-hover:text-rose-400 group-hover:bg-rose-500/10',
    items: [
      {
        label: 'Pozycjonowanie (SEO)',
        href: '/pricing/optimization',
        desc: 'Organiczny ruch, który zostaje na lata',
        icon: SearchCheck,
      },
      {
        label: 'Twórcy UGC',
        href: '/pricing/video-marketing',
        desc: 'Rolki i TikToki, które sprzedają',
        icon: Smartphone,
        badge: '🔥 Promocja',
        badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      },
      {
        label: 'Video Marketing',
        href: '/pricing/video-marketing',
        desc: 'Reklamy i wideo korporacyjne',
        icon: Video,
      },
      {
        label: 'Kampanie Meta Ads',
        href: '/pricing/video-marketing',
        desc: 'Skalowalne generowanie leadów i sprzedaży',
        icon: Megaphone,
      },
      {
        label: 'Grafika 2D i 3D',
        href: '/pricing/graphics',
        desc: 'Projektowanie i tworzenie grafik',
        icon: LayoutDashboard,
      },
      {
        label: 'Obróbka Dźwięku',
        href: '/pricing/audio-editing',
        desc: 'Montaż i optymalizacja dźwięku',
        icon: Volume2,
      }
      
    ],
  },
];

// Homepage menu - sekcje + podstrony
export const HOMEPAGE_MENU_ITEMS = [
  { label: 'Home', href: '#home', type: 'section' },
  { label: 'Portfolio', href: '#portfolio', type: 'section' },
  { label: 'Możliwości', href: '#experience', type: 'section' },
  { label: 'Opinie', href: '#testimonials', type: 'section' },
  { label: 'Oferta', href: '#services', type: 'section' },
  { label: 'Proces', href: '#process', type: 'section' },
  { label: 'Blog', href: '#blog', type: 'section' },
  { label: 'FAQ', href: '#faq', type: 'section' },
  { label: 'Blog', href: '/blog', type: 'page' },
  { label: 'Cennik', href: '/pricing', type: 'page' },
  { label: 'Kontakt', href: '/contact', type: 'page'},
  { label: 'Wyzwania', href: '#problem-solution', type: 'section' },
  
];

// Menu Oferta - tylko nazwa i link
export const MAIN_SERVICES = [
  { label: 'Strona internetowa', href: '/pricing/website' },
  { label: 'Optymalizacja', href: '/pricing/optimization' },
  { label: 'Integracja AI', href: '/pricing/ai-integration' },
  { label: 'Grafika', href: '/pricing/graphics' },
  { label: 'Projekt indywidualny', href: '/pricing/individual' },
  { label: 'Email marketing', href: '/pricing/email-marketing' },
  { label: 'Video marketing', href: '/pricing/video-marketing' },
  { label: "Obróbka dźwięku", href: "/pricing/audio-editing" }
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
     phone: '+48 662 581 368, +48 731 721 760'
} as const;