import { Metadata } from 'next';
import ProjectsClient from './ProjectsClient';

export const metadata: Metadata = {
  title: 'Realizacje i Case Studies - WHITESLOPE STUDIO',
  description: 'Zobacz nasze najnowsze wdrożenia z zakresu stron internetowych, aplikacji SaaS, automatyzacji AI oraz e-marketingu. Odkryj, jak pomagamy firmom rosnąć.',
  keywords: 'portfolio, case studies, realizacje, strony internetowe, aplikacje SaaS, wdrożenia AI, automatyzacja, e-marketing, Whiteslope Studio',
  openGraph: {
    title: 'Realizacje i Case Studies - WHITESLOPE STUDIO',
    description: 'Zobacz nasze najnowsze wdrożenia: Strony WWW, Automatyzacje AI i E-marketing.',
    url: 'https://whiteslope.studio/projects',
    type: 'website',
    images: [
      {
        // Plik projects-og-image.jpg nie istnieje w public/ - link leciał bez miniaturki.
        url: 'https://www.whiteslope.studio/_resources/hero/tlo.jfif',
        width: 1200,
        height: 630,
        alt: 'Portfolio WHITESLOPE STUDIO',
      },
    ],
  },
  alternates: {
    canonical: '/projects',
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}