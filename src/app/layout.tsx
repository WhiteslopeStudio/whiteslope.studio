import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/sections/cookieBanner";
import { jsonLd, siteNavigationJsonLd } from "@/lib/schema";
import Chatbot from "@/components/ui/Chatbot";
import PromoBar from "@/components/sections/PromoBar";
import { SearchEngineProvider } from '@/components/SearchEngineProvider';
import { PromoBanner } from '@/components/layout/ad';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://whiteslope.studio'),
  
  // ← SKUPIONY TITLE (digitalizacja firm regionalnych)
  title: "Strony Internetowe dla Firm Podlaskie | WhiteSlope Studio | Digitalizacja Biznesu",
  
  // ← SKUPIONY DESCRIPTION (digitalizacja firm regionalnych)
  description: "⭐⭐⭐⭐⭐ Tworzymy strony internetowe i upraszczamy codzienne funkcjonowanie firm w Podlaskiem. WhiteSlope Studio - osobiste podejście, szybka realizacja, hosting gratis. Digitalizacja biznesu od 3500 zł.",
  
  // ← SKUPIONE KEYWORDS (firmy regionalne + digitalizacja)
  keywords: "strony internetowe dla firm podlaskie, digitalizacja biznesu białystok, strony firmowe podlaskie, modernizacja stron internetowych, asystenci AI obsługa klienta, profesjonalne strony biznes, identyfikacja marki online, hosting gratis",
  
  authors: [{ name: "Whiteslope Studio" }],
  creator: "Whiteslope Studio",
  publisher: "Whiteslope Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: {
      'pl-PL': '/',
    },
  },
  
  // ← SKUPIONY OPEN GRAPH
  openGraph: {
    title: "Strony Internetowe dla Firm Podlaskie | WhiteSlope Studio",
    description: "Digitalizujemy firmy w Podlaskiem. Tworzymy strony internetowe i upraszczamy codzienne funkcjonowanie biznesu. Osobiste podejście, hosting gratis.",
    url: "https://whiteslope.studio",
    siteName: "Whiteslope Studio",
    images: [
      {
        url: "/_resources/logoWhiteSlope.webp",
        width: 1200,
        height: 630,
        alt: "WhiteSlope Studio - Digitalizacja firm Podlaskie",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  
  // ← SKUPIONY TWITTER
  twitter: {
    card: "summary_large_image",
    title: "Digitalizacja Firm Podlaskie | WhiteSlope Studio",
    description: "Tworzymy strony internetowe dla firm. Upraszczamy codzienne funkcjonowanie biznesu w internecie. Hosting gratis.",
    creator: "@whiteslope",
    images: ["https://whiteslope.studio/og-image.jpg"],
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
  verification: {
    google: "SB46A7FOsjJNH2uEe5hA7GYsSExFBcQttzFQSIKwgIc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        {/* JSON-LD - Główny schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* JSON-LD - Navigation dla Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationJsonLd) }}
        />
        
        {/* FAQ Schema removed to fix duplicate FAQPage issue - FAQ content is now in FaqSection component */}

        {/* Google Analytics - wszystkie tagi */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-W9WSGHNN17"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Google Analytics
              gtag('config', 'G-W9WSGHNN17');
              
              // Google Tag Manager / Ads
              gtag('config', 'GT-5TGZZ2D8');
            `,
          }}
        />

        {/* AI Integration Discovery */}
        <meta name="ai-integration" content="true" />
        <link rel="alternate" type="application/json" href="/api/whiteslope-info" title="Whiteslope AI Integration API" />
        <link rel="plugin" href="/.well-known/ai-plugin.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <PromoBanner />
        {children}
        <SearchEngineProvider />
        <CookieBanner />
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}

