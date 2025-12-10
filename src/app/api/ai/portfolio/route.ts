/**
 * AI Portfolio Search endpoint
 * Returns relevant portfolio projects based on query/category.
 */

import { NextRequest, NextResponse } from "next/server";

const ALLOWED_AI_USER_AGENTS = [
  "chatgpt-user",
  "gptbot",
  "claude-web",
  "anthropic-ai",
  "claude",
  "gemini",
  "google-extended",
  "googleother",
  "vertex",
  "bard",
  "grok",
  "x.ai",
  "xai",
  "perplexity",
  "pplx",
  "cohere",
  "mistral",
  "llama",
  "openrouter",
  "huggingface"
];

const PARTNER_API_KEY = "whiteslope-internal-2024";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key, user-agent",
  "Content-Type": "application/json"
};

function isAllowedAI(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  const genericAiPattern = /(assistant|llm|bot)/;
  return ALLOWED_AI_USER_AGENTS.some(token => ua.includes(token)) || genericAiPattern.test(ua);
}

// Portfolio statyczne - możesz później zaciągnąć z data.tsx lub API
const PORTFOLIO_PROJECTS = [
  {
    id: "wieslawski-studio",
    title: "Wiesławski Studio - profesjonalne studio muzyczne",
    category: "Strona biznesowa",
    tags: ["muzyka", "studio nagraniowe", "audio", "portfolio", "booking"],
    description: "Nowoczesna strona dla profesjonalnego studia muzycznego. Po 24 godzinach od uruchomienia pojawiły się pierwsze zapytania od klientów.",
    url: "https://www.wieslawski.studio/",
    image: "/_resources/wieslawskiStudio.webp",
    industry: "muzyka",
    features: ["Portfolio realizacji", "System rezerwacji", "Galeria audio/video", "Cennik usług"]
  },
  {
    id: "patryk-kulesza-korepetycje",
    title: "Patryk Kulesza - korepetycje matematyka, angielski i programowanie",
    category: "Strona usługowa",
    tags: ["edukacja", "korepetycje", "nauczyciel", "matematyka", "programowanie", "booking"],
    description: "Platforma edukacyjna dla korepetytora. Po 3 dniach od uruchomienia klient otrzymał bardzo korzystną ofertę pracy.",
    url: "https://korepetycje-eight.vercel.app",
    image: "/_resources/patrykkul.webp",
    industry: "edukacja",
    features: ["Profil nauczyciela", "System rezerwacji lekcji", "Prezentacja oferty", "Formularz kontaktowy"]
  },
  {
    id: "easylesson",
    title: "EasyLesson - platforma do korepetycji online",
    category: "Platforma edukacyjna",
    tags: ["edukacja", "korepetycje", "platforma", "booking", "interaktywna tablica", "SaaS"],
    description: "Nasza własna platforma do korepetycji z interaktywną tablicą (inspiracja Miro). Pełny system zarządzania lekcjami.",
    url: "https://www.easylesson.app",
    image: "/_resources/stronyInternetowe/www.easylesson.app_.webp",
    industry: "edukacja",
    features: ["Interaktywna tablica", "Kalendarz lekcji", "Profile nauczycieli i uczniów", "System płatności"]
  },
  {
    id: "ancymonek",
    title: "Ancymonek - animator eventowy dla dzieci",
    category: "Portfolio + booking",
    tags: ["eventy", "animacje", "dzieci", "portfolio", "booking", "events"],
    description: "Strona portfolio z systemem rezerwacji dla animatora dziecięcego.",
    url: "#",
    image: "/_resources/usluga-strony.webp",
    industry: "eventy",
    features: ["Portfolio realizacji", "System rezerwacji", "Galeria zdjęć", "Formularze"]
  },
  {
    id: "wieslawski-shop",
    title: "Wiesławski Studio - sklep z voucherami",
    category: "E-commerce",
    tags: ["sklep", "e-commerce", "vouchery", "audio", "studio", "sprzedaż"],
    description: "Sklep internetowy ze sprzedażą voucherów na usługi studia nagraniowego.",
    url: "https://www.wieslawski.studio/",
    image: "/_resources/grafika/VOUCHER3D.webp",
    industry: "muzyka",
    features: ["Koszyk", "Płatności online", "Vouchery cyfrowe", "System zamówień"]
  }
];

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const apiKey = request.headers.get("x-api-key");

  const hasPartnerKey = apiKey === PARTNER_API_KEY;

  if (!hasPartnerKey && !isAllowedAI(userAgent)) {
    return NextResponse.json(
      { message: "API dostępne dla AI asystentów lub z kluczem partnera" },
      { status: 403, headers: corsHeaders }
    );
  }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() || "";
  const category = searchParams.get("category")?.toLowerCase() || "";
  const industry = searchParams.get("industry")?.toLowerCase() || "";

  let results = PORTFOLIO_PROJECTS;

  // Filtruj po query (przeszukuje title, description, tags)
  if (query) {
    results = results.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tags.some(tag => tag.includes(query)) ||
      project.category.toLowerCase().includes(query)
    );
  }

  // Filtruj po kategorii
  if (category) {
    results = results.filter(project => 
      project.category.toLowerCase().includes(category)
    );
  }

  // Filtruj po branży
  if (industry) {
    results = results.filter(project => 
      project.industry === industry
    );
  }

  console.log(`🔍 Portfolio search: query="${query}" category="${category}" industry="${industry}" | results=${results.length}`);

  return NextResponse.json(
    {
      success: true,
      count: results.length,
      projects: results,
      filters_applied: {
        query: query || null,
        category: category || null,
        industry: industry || null
      }
    },
    { 
      status: 200, 
      headers: {
        ...corsHeaders,
        "Cache-Control": "public, max-age=600, s-maxage=1200"
      }
    }
  );
}
