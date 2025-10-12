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
  description: String;
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
  title: string;
  subtitle: string;
  price: string;
  picture: string;
  description: string;
  features: ServiceFeature[];
  ctaText: string;
  animationDirection: 'left' | 'right';
  highlighted?: boolean;
}