import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/sections/cookieBanner";
import { jsonLd } from "@/lib/schema";
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
  
  // ← POPRAWIONY TITLE (fraza kluczowa na początku)
  title: "Strony Internetowe Białystok od 1500 zł | Whiteslope Studio | Profesjonalne Tworzenie Stron WWW",
  
  // ← POPRAWIONY DESCRIPTION (więcej lokalności + CTA)
  description: "Profesjonalne strony internetowe Białystok od 1500 zł. Whiteslope Studio - zespół programistów z Białegostoku. Realizacja kilka dni. Chatboty AI, SEO, CMS. Darmowa konsultacja!",
  
  // ← POPRAWIONE KEYWORDS (więcej lokalnych fraz)
  keywords: "strony internetowe białystok, tworzenie stron białystok, strony www białystok, agencja webdev białystok, strony internetowe podlaskie, sklepy internetowe białystok, aplikacje webowe białystok, SEO białystok, CMS, Next.js, React",
  
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
  
  // ← POPRAWIONY OPEN GRAPH
  openGraph: {
    title: "Strony Internetowe Białystok Od 1500 zł | Whiteslope Studio",
    description: "Profesjonalne strony WWW Białystok. Zespół programistów z Białegostoku. Realizacja kilka dni. Chatboty AI, SEO, modernizacja. Sprawdź ofertę!",
    url: "https://whiteslope.studio",
    siteName: "Whiteslope Studio",
    images: [
      {
        url: "/_resources/image.jpg",
        width: 1200,
        height: 630,
        alt: "Whiteslope Studio - Strony internetowe Białystok od 1500 zł",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  
  // ← POPRAWIONY TWITTER
  twitter: {
    card: "summary_large_image",
    title: "Strony Internetowe Białystok | Whiteslope Studio",
    description: "Profesjonalne strony WWW od 1500 zł. Lokalni programiści z Białegostoku. Realizacja kilka dni.",
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
        
        {/* FAQ Schema removed to fix duplicate FAQPage issue - FAQ content is now in FaqSection component */}

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

