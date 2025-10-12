export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'WHITESLOPE STUDIO',
  url: 'https://whiteslope.pl',
  description: 'Profesjonalne strony internetowe i aplikacje webowe w Białymstoku',
  provider: {
    '@type': 'Organization',
    name: 'WHITESLOPE STUDIO',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Białystok',
      addressRegion: 'Podlaskie',
      addressCountry: 'PL'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+48-123-456-789',
      contactType: 'customer service',
      email: 'kontakt@whiteslope.studio',
      areaServed: 'PL',
      availableLanguage: ['Polish', 'English']
    }
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'PLN',
    lowPrice: '2000',
    highPrice: '50000',
    offerCount: '3'
  },
  sameAs: [
    'https://facebook.com/whiteslope',
    'https://instagram.com/whiteslope',
    'https://linkedin.com/company/whiteslope'
  ]
};

export const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Blog WHITESLOPE STUDIO',
  url: 'https://whiteslope.pl/blog',
  description: 'Artykuły o web development, designie i technologii',
  publisher: {
    '@type': 'Organization',
    name: 'WHITESLOPE STUDIO',
    logo: {
      '@type': 'ImageObject',
      url: 'https://whiteslope.pl/logo.png'
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
      url: 'https://whiteslope.pl/logo.png'
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://whiteslope.pl/blog/${post.slug}`
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
    name: 'Usługi web development',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Strona wizytówka',
          description: 'Profesjonalna strona internetowa dla małych firm'
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '2000',
          priceCurrency: 'PLN'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Sklep internetowy',
          description: 'Profesjonalny sklep internetowy z systemem zarządzania'
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '5000',
          priceCurrency: 'PLN'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Aplikacja webowa',
          description: 'Zaawansowana aplikacja internetowa'
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          price: '10000',
          priceCurrency: 'PLN'
        }
      }
    ]
  }
};
