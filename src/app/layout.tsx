import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/sections/cookieBanner";
import { jsonLd, siteNavigationJsonLd } from "@/lib/schema";
import Chatbot from "@/components/ui/Chatbot";
import PromoBar from "@/components/sections/PromoBar";
import { SearchEngineProvider } from '@/components/SearchEngineProvider';
// Zmień ten import:

// Na ten (dodając Unbounded):
import { Gothic_A1, Geist } from "next/font/google";

const gothicA1 = Geist({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-geist",
});

// Konfiguracja Geist (zastępuje Unbounded)
const geistSans = Geist({
  subsets: ["latin"],
  weight: ["700"], // Tylko najgrubsza waga
  variable: "--font-geist", // Ta zmienna zastąpi --font-unbounded
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.whiteslope.studio'),
  
  // ← SKUPIONY TITLE (digitalizacja firm regionalnych)
  title: "Strony Internetowe dla Firm | WhiteSlope Studio | Digitalizacja Biznesu",
  
  // ← SKUPIONY DESCRIPTION (digitalizacja firm regionalnych)
  description: "⭐⭐⭐⭐⭐ Tworzymy strony internetowe i upraszczamy codzienne funkcjonowanie firm w Podlaskiem. WhiteSlope Studio - osobiste podejście, szybka realizacja, hosting gratis. Digitalizacja biznesu od 3500 zł.",
  
  // ← SKUPIONE KEYWORDS (firmy regionalne + digitalizacja)
  keywords: "strony internetowe dla firm, digitalizacja biznesu białystok, strony firmowe podlaskie, modernizacja stron internetowych, asystenci AI obsługa klienta, profesjonalne strony biznes, identyfikacja marki online, hosting gratis",
  
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
    title: "Strony Internetowe dla Firm | WhiteSlope Studio",
    description: "Digitalizujemy firmy w Podlaskiem. Tworzymy strony internetowe i upraszczamy codzienne funkcjonowanie biznesu. Osobiste podejście, hosting gratis.",
    url: "https://www.whiteslope.studio",
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
    images: ["https://www.whiteslope.studio/og-image.jpg"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
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
        <body  className={`${gothicA1.variable} ${geistSans.variable} antialiased`}>          <Header />
        
        {children}
        <SearchEngineProvider />
        <CookieBanner />
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}

