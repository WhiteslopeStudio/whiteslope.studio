import { s } from "framer-motion/client";

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'WHITESLOPE STUDIO - Strony Internetowe Białystok',
  alternateName: 'Whiteslope',
  url: 'https://whiteslope.studio',
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
    reviewCount: '3',
    bestRating: '5',
    worstRating: '1'
  },
  
  sameAs: [
    'https://www.facebook.com/profile.php?id=61583927894860&locale=pl_PL',
    'https://www.instagram.com/whiteslopestudio/',
    'https://linkedin.com/company/whiteslope'
  ],
  
  // Navigation dla Google Sitelinks
  mainEntity: {
    '@type': 'WebSite',
    name: 'WhiteSlope Studio',
    url: 'https://whiteslope.studio',
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
      url: 'https://whiteslope.studio/pricing/ai-integration'
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
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '6', 
    bestRating: '5',
    worstRating: '1'
  }
};

// Dodaj na końcu pliku schema.ts

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ile kosztuje strona internetowa w Białymstoku?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Strony internetowe w Białymstoku kosztują od 1500 zł (strona wizytówka z CMS i SEO) do 3500 zł (zaawansowany portal biznesowy). W Whiteslope Studio oferujemy konkurencyjne ceny z przejrzystą wycenią - bez ukrytych kosztów. Dodatkowo każda strona zawiera 3 miesiące wsparcia technicznego.'
      }
    },
    {
      '@type': 'Question',
      name: 'Jak długo trwa wykonanie strony internetowej w Białymstoku?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Realizacja strony internetowej w Białymstoku trwa od kilku dni do paru tygodni przy większych projektach. Whiteslope Studio pracuje sprawnie dzięki bezpośredniej komunikacji z programistami - bez pośredników i zbędnej biurokracji.'
      }
    },
    {
      '@type': 'Question',
      name: 'Czy strony internetowe z Białegostoku są responsywne?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak, wszystkie strony internetowe tworzone przez Whiteslope Studio w Białymstoku są w pełni responsywne - działają płynnie na telefonach, tabletach i komputerach. Testujemy na wielu urządzeniach przed wdrożeniem.'
      }
    },
    {
      '@type': 'Question',
      name: 'Czy strony z Białegostoku mają optymalizację SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Każda strona internetowa z Whiteslope Studio w Białymstoku zawiera optymalizację SEO: meta tagi, sitemap XML, schema.org, optymalizację obrazów i szybkość ładowania. Dzięki temu Twoja strona będzie łatwiej widoczna w Google.'
      }
    },
    {
      '@type': 'Question',
      name: 'Jakie technologie używacie do tworzenia stron w Białymstoku?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Whiteslope Studio w Białymstoku tworzy strony w nowoczesnych technologiach: React, Next.js, TypeScript, Wordpress, Hostinger, Spaceship. Gwarantujemy błyskawiczną szybkość ładowania (Lighthouse Score 90+), bezpieczeństwo i łatwość aktualizacji treści przez panel CMS.'
      }
    },
    {
      '@type': 'Question',
      name: 'Czy mogę sam edytować treści na stronie z Białegostoku?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Strona internetowa od Whiteslope Studio zawiera prosty panel CMS, który jest dodatkowo płatny (Content Management System). Możesz samodzielnie zmieniać teksty, dodawać zdjęcia i aktualizować ofertę - bez znajomości programowania.'
      }
    },
    {
      '@type': 'Question',
      name: 'Czy oferujecie wsparcie po wdrożeniu strony w Białymstoku?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak, szkolimy z obsługi wybranej technologii oraz w razie pytań służymy pomocą techniczną. Oferujemy również płatne pakiety wsparcia i aktualizacji strony po wdrożeniu.'
      }
    }
  ]
};

export const breadcrumbJsonLd = (path: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: path.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `https://whiteslope.studio${item.url}`
  }))
});
