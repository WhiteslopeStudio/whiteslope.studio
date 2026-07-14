import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer'; 
import FooterMobile from '@/components/layout/FooterMobile';
import { CookieBanner } from "@/components/sections/cookieBanner";
import { jsonLd, siteNavigationJsonLd } from "@/lib/schema";
import Chatbot from "@/components/ui/Chatbot";
import PromoBar from "@/components/sections/PromoBar";
import { SearchEngineProvider } from '@/components/SearchEngineProvider';
import ScrollToTop from "@/utils/ScrollToTop"; // <-- IMPORT TWOJEGO KOMPONENTU
import FastContact from "@/components/ui/FastContact";
import GtagLoader from "@/components/analytics/GtagLoader";

// Konfiguracja Inter
const inter = Inter({
  subsets: ["latin", "latin-ext"], 
  // DODANA WAGA "200"
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"], 
  variable: "--font-inter", 
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.whiteslope.studio'),
  title: "Strony Internetowe dla Firm | WhiteSlope Studio | Digitalizacja Biznesu",
  description: "⭐⭐⭐⭐⭐ Tworzymy strony internetowe i upraszczamy codzienne funkcjonowanie firm w Podlaskiem. WhiteSlope Studio - osobiste podejście, szybka realizacja, hosting gratis. Digitalizacja biznesu od 3500 zł.",
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

        {/* Google Analytics - ladowanie przeniesione do GtagLoader (dopiero po pierwszej interakcji uzytkownika), patrz body */}

        {/* AI Integration Discovery */}
        <meta name="ai-integration" content="true" />
        <link rel="alternate" type="application/json" href="/api/whiteslope-info" title="Whiteslope AI Integration API" />
        <link rel="plugin" href="/.well-known/ai-plugin.json" />
      </head>
      
      {/* Tutaj aplikujemy zmienną Inter na całe body */}
      <body className={`${inter.variable} antialiased`}>
        <ScrollToTop /> {/* <-- DODANE NA SAMYM GÓRZE BODY */}
        <GtagLoader />
        <Header />
        {children}
        <SearchEngineProvider />
        <CookieBanner />
        <Chatbot />
        <FastContact />
        <Footer />
        <FooterMobile />
      </body>
    </html>
  );
}