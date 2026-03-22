
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
    title: 'Web Development',
    iconHoverClass: 'group-hover:text-cyan-400 group-hover:bg-cyan-500/10',
    items: [
      {
        label: 'Strony Internetowe',
        href: '/pricing/website',
        desc: 'Wizytówki i rozbudowane serwisy',
        icon: Globe,
        badge: 'Najlepszy wybór',
        badgeColor: 'bg-[#BF2E5B] text-[#FFFFFF] border-red-200',
      },
      {
        label: 'Pozycjonowanie (SEO)',
        href: '/pricing/optimization',
        desc: 'Organiczny ruch, który zostaje na lata',
        icon: SearchCheck,
        badge: 'Ważne',
        badgeColor: 'bg-[#50C223] text-white border-yellow-500/30',
      },
      {
        label: 'Aplikacje SaaS MVP',
        href: '/pricing/website',
        desc: 'Twój własny startup od zera',
        icon: Rocket,
        
        badgeColor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      },
      {
        label: 'Dedykowane Systemy Webowe',
        href: '/pricing/website',
        desc: 'Panele B2B, portale i aplikacje wewnętrzne',
        icon: LayoutDashboard,
      },
      {
        label: 'Poprawki istniejących stron',
        href: '/pricing/website',
        desc: 'Modernizacja i optymalizacja istniejących rozwiązań',
        icon: Activity,
      },
      
    ],
  },
  {
    title: 'Integracja AI',
    iconHoverClass: 'group-hover:text-blue-400 group-hover:bg-blue-500/10',
    items: [
      {
        label: 'Chat Pomoc Techniczna 24/7',
        desc: 'Odpowiedzi na bazie danych o firmie',
        href: '/pricing/ai-integration',
        icon: HeadphonesIcon,
        badge: 'Trend',
        badgeColor: 'bg-[#2350C2] text-white border-blue-200',
      },
      {
        label: 'Chatboty E-commerce',
        desc: 'Automatyczny doradca w sklepie',
        href: '/pricing/ai-integration',
        icon: ShoppingBag,
      },
      {
        label: 'Chatboty Rezerwacje',
        desc: 'Umawianie spotkań w kalendarzu',
        href: '/pricing/ai-integration',
        icon: CalendarDays,
        
        badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
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
        desc: 'n8n i wyciąganie danych',
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
        desc: 'Łączymy narzędzia',
        icon: Workflow,
      },
    ],
  },
  
  {
    title: 'Marketing & Wideo',
    iconHoverClass: 'group-hover:text-rose-400 group-hover:bg-rose-500/10',
    items: [
      {
        label: 'Email marketing',
        href: '/pricing/email-marketing',
        desc: 'Prosty Email marketing',
        icon: Database,
      },
      {
        label: 'Twórcy UGC',
        href: '/pricing/video-marketing',
        desc: 'Rolki i TikToki, opieka nad górą lejka',
        icon: Smartphone,
      },
      {
        label: 'Video Marketing',
        href: '/pricing/video-marketing',
        desc: 'Reklamy i wideo',
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
        desc: 'Obróbka dźwięku do filmów',
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