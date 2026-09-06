import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCityMetadata, isCityValid, PODLASKIE_CITIES, convertToSlug } from '@/lib/data';
import CityPageClient from '@/components/CityPageClient';

// Static generation dla wszystkich miast
export async function generateStaticParams() {
  return PODLASKIE_CITIES.map((miasto) => ({
    miasto: convertToSlug(miasto), // "Białystok" -> "bialystok", "Bielsk Podlaski" -> "bielsk-podlaski"
  }));
}

// Dynamic metadata dla każdego miasta
export async function generateMetadata({ 
  params 
}: { 
  params: { miasto: string } 
}): Promise<Metadata> {
  const citySlug = params.miasto;
  
  if (!isCityValid(citySlug)) {
    return {
      title: 'Miasto nie znalezione',
    };
  }

  const metadata = getCityMetadata(citySlug);
  
  return {
    metadataBase: new URL('https://www.whiteslope.studio'),
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: `https://whiteslope.studio/${params.miasto}`,
      siteName: "Whiteslope Studio",
      images: [
        {
          url: "/_resources/hero/tlo.jfif",
          width: 1200,
          height: 630,
          alt: `Whiteslope Studio - Strony internetowe ${metadata.cityName} od 1500 zł`,
        },
      ],
      locale: "pl_PL",
      type: "website",
    },
    
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      creator: "@whiteslope",
      images: ["https://www.whiteslope.studio/_resources/hero/tlo.jfif"],
    },
    
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    alternates: {
      canonical: `/${params.miasto}`,
    },
  };
}

export default async function CityPage({ 
  params 
}: { 
  params: { miasto: string } 
}) {
  const citySlug = params.miasto;
  
  if (!isCityValid(citySlug)) {
    notFound();
  }

  const metadata = getCityMetadata(citySlug);

  return <CityPageClient cityName={metadata.cityName} />;
}