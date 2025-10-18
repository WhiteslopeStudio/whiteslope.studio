import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/sections/cookieBanner";
import { jsonLd } from "@/lib/schema";
import Chatbot from "@/components/ui/Chatbot";
import PromoBar from "@/components/sections/PromoBar";
import { SearchEngineProvider } from '@/components/SearchEngineProvider'; // ← NOWY IMPORT
import { PromoBanner } from '@/components/layout/ad';  // ← Dodaj

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
  title: "Whiteslope Studio - Profesjonalne strony internetowe Białystok ",
  description: "Tworzymy szybkie, nowoczesne strony internetowe i aplikacje webowe. SEO, CMS, e-commerce. Darmowe konsultacje. Białystok, Podlaskie.",
  keywords: "strony internetowe, aplikacje webowe, SEO, CMS, e-commerce, Białystok, web development, Next.js, React",
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
    title: "Whiteslope Studio - Profesjonalne strony internetowe Białystok",
    description: "Tworzymy szybkie, responsywne strony internetowe i aplikacje webowe",
    url: "https://whiteslope.studio",
    siteName: "Whiteslope Studio",
    images: [
      {
        url: "https://whiteslope.studio/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Whiteslope Studio - Profesjonalne strony internetowe w Białymstoku",
      },
    ],
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whiteslope Studio - Profesjonalne strony internetowe",
    description: "Tworzymy szybkie, responsywne strony internetowe i aplikacje webowe w Białymstoku",
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
    google: "twój-kod-weryfikacyjny-google",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <PromoBanner />
        {children}
        <SearchEngineProvider /> {/* ← ZAMIEŃ SearchEngine na SearchEngineProvider */}
        <CookieBanner />
        <Chatbot />
        <Footer />
      </body>
    </html>
  );
}