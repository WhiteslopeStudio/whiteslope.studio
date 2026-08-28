export interface ServicePackage {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  timeline: string;
  highlighted?: boolean;
}

export interface ServicePricing {
  serviceId: string;
  packages: ServicePackage[];
}

export interface ProjectExample {
  id: string;
  title: string;
  image: string;
  category: string;
  href?: string;
  description: string;
  rowType?: 'web' | 'marketing';
  video?: string;
  clientName?: string;    
  clientLogo?: string;    
  servicesListed?: string;
  logoUrl?: string; // <-- NOWE POLE NA LOGO ZAMIAST TYTUŁU
  marketingDescription?: string; // <-- NOWE POLE NA DŁUŻSZY OPIS MARKETINGOWY
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  author: string;
  readTime: string;
  tags?: string[];
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface MainService {
  id: string;
  category: "Web Development" | "Automatyzacja & AI" | "Marketing & Wideo";
  title: string;
  subtitle: string;
  price: string;
  picture: string;
  gallery: string[] | null;
  description: string;
  featuresTitle?: string; // NOWE POLE
  features: { title: string; description: string }[];
  ctaText: string;
  animationDirection: "left" | "right";
  highlighted?: boolean;
  badge?: { text: string; color: "blue" | "yellow" };
}