import { s } from "framer-motion/client";

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'WHITESLOPE STUDIO - Strony Internetowe Białystok',
  alternateName: 'Whiteslope',
  url: 'https://www.whiteslope.studio',
  logo: 'https://www.whiteslope.studio/_resources/logoWhiteSlope.webp',
  image: 'public/_resources/image.jpg',
  description: 'Strony internetowe Białystok Od 1500 zł. Tworzymy nowoczesne strony WWW, sklepy online, chatboty AI, grafikę, video i modernizację. Realizacja w kilka dni. Zespół z Białegostoku.',
  provider: {
    '@type': 'Organization',
    name: 'WHITESLOPE STUDIO',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ul. Pietkiewicza',
      addressLocality: 'Białystok',
      addressRegion: 'Podlaskie',
      postalCode: '15-689',
      addressCountry: 'PL'
    },
    geo: { // DODAJ GEOLOKALIZACJĘ
        '@type': 'GeoCoordinates',
        latitude: '53.1325',
        longitude: '23.1688'
    },

    telephone: '+48731721760', // PRAWDZIWY NUMER
    email: 'kontakt@whiteslope.studio',
  
    priceRange: 'od 1500 PLN', // PRAWDZIWE CENY


    areaServed: [
    {
      '@type': 'City',
      name: 'Białystok'
    },
    {
      '@type': 'State',
      name: 'Podlaskie'
    }
    ],

    openingHoursSpecification: { // DODAJ GODZINY
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '24:00'
   },

    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+48731721760',
      contactType: 'customer service',
      email: 'kontakt@whiteslope.studio',
      areaServed: 'PL',
      availableLanguage: ['Polish', 'English'],
      contactOption: 'TollFree'
    }
  },
  
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'PLN',
    lowPrice: '1500',
    highPrice: 'do ustalenia',
    offerCount: '3'
  },
  
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '4',
    bestRating: '5',
    worstRating: '1'
  },

  // Pojedyncze opinie - te same treści, które są widoczne w sekcji opinii na stronie
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Dariusz Kuciel' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
      reviewBody:
        'Dobre podejście do klienta. Szybko, sprawnie, elastycznie. Warto sprawdzić. Będę korzystał regularnie z usług.'
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Sławek Wiesławski' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
      reviewBody:
        'Pierwsze zapytania od klientów pojawiły się bardzo szybko po starcie strony. Dobry i bezproblemowy kontakt.'
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Damian Bogdanowicz' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
      reviewBody: 'Zupełnie inna jakość. Strona jest estetyczna. Jestem pod wrażeniem!'
    },
    {
      '@type': 'Review',
      author: { '@type': 'Organization', name: 'Easylesson.app' },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5', worstRating: '1' },
      reviewBody:
        'Naszym celem było stworzenie produktu SaaS dla korepetytorów. Chłopaki z Whiteslope wykonali całą stronę, dashboard i tablicę interaktywną, na której uczniowie mogą rysować i pisać w czasie rzeczywistym. Wszystko działa świetnie! Na pewno będziemy wracać po więcej.'
    }
  ],

  sameAs: [
    'https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL',
    'https://www.instagram.com/whiteslopestudio/',
    'https://linkedin.com/company/whiteslope',
    'https://maps.app.goo.gl/ijbMhGdJGPKJ2xMZA'
  ],
  
  // Navigation dla Google Sitelinks
  mainEntity: {
    '@type': 'WebSite',
    name: 'WhiteSlope Studio',
    url: 'https://www.whiteslope.studio',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://whiteslope.studio/SearchEngine?query={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
};

// Schema dla głównych podstron (Sitelinks)
export const siteNavigationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'WhiteSlope Studio - Główne usługi',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Cennik',
      url: 'https://whiteslope.studio/pricing'
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Portfolio',
      url: 'https://whiteslope.studio/projects'
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Kontakt',
      url: 'https://whiteslope.studio/contact'
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Blog',
      url: 'https://whiteslope.studio/blog'
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Strony Internetowe',
      url: 'https://whiteslope.studio/pricing/website'
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Chatboty AI',
      url: 'https://whiteslope.studio//pricing/ai-integration/chatbot'
    }
  ]
};

export const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog WHITESLOPE STUDIO',
  url: 'https://whiteslope.studio/blog',
  description: 'Artykuły o web development, designie i technologii',
  publisher: {
    '@type': 'Organization',
    name: 'WHITESLOPE STUDIO',
    logo: {
      '@type': 'ImageObject',
      url: 'https://whiteslope.studio/logo.png'
    }
  }
};

export const articleJsonLd = (post: any) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: post.image,
  datePublished: post.date,
  author: {
    '@type': 'Person',
    name: post.author
  },
  publisher: {
    '@type': 'Organization',
    name: 'WHITESLOPE STUDIO',
    logo: {
      '@type': 'ImageObject',
      url: 'https://whiteslope.studio/logo.png'
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://whiteslope.studio/blog/${post.slug}`
  },
  articleBody: post.content
});

export const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Profesjonalne strony internetowe',
  provider: {
    '@type': 'Organization',
    name: 'WHITESLOPE STUDIO'
  },
  areaServed: {
    '@type': 'City',
    name: 'Białystok'
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Strony internetowe Białystok - oferta',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Strona internetowa Białystok',
          description: 'Profesjonalna strona internetowa z responsywnym designem, optymalizacją SEO',
          areaServed: 'Białystok'
        },
        price: '1500',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        url: 'https://whiteslope.studio/#strony'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Modernizacja strony Białystok',
          description: 'Modernizacja istniejącej strony internetowej, poprawa szybkości i SEO',
          areaServed: 'Białystok'
        },
        price: '800',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        url: 'https://whiteslope.studio/#modernizacja'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Chatbot AI Białystok',
          description: 'Integracja chatbota AI dla obsługi klientów 24/7',
          areaServed: 'Białystok'
        },
        price: '1000',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        url: 'https://whiteslope.studio/#ai'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Grafika 2D i 3D Białystok',
          description: 'Profesjonalne projekty graficzne 2D i 3D dla Twojej marki',
          areaServed: 'Białystok'
        },
        price: 'od 500',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        url: 'https://whiteslope.studio/#grafika'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Video marketing Białystok',
          description: 'Profesjonalne usługi video marketingu dla Twojej firmy',
          areaServed: 'Białystok'
        },
        price: 'od 700',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        url: 'https://whiteslope.studio/#video'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Edytowanie Audio Białystok',
          description: 'Profesjonalna obróbka dźwięku do filmów, redukcja szumów, mastering i przygotowanie nagrań.',
          areaServed: 'Białystok'
        },
        price: 'od 100',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        url: 'https://whiteslope.studio/#audio-editing'
      },
    ]
  },
  aggregateRating: {
    // Liczba zgodna z opiniami realnie pokazywanymi na stronie (4 opinie, w tym Google)
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '4',
    bestRating: '5',
    worstRating: '1'
  }
};

export const breadcrumbJsonLd = (path: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: path.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://www.whiteslope.studio${item.url}`
  }))
});
