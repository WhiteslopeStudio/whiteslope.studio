/**
 * Whiteslope Studio - Info API
 * Endpoint: /api/whiteslope-info
 * Dostarcza dane o ofercie (dual niche: muzyka/audio/events + edukacja online) dla AI asystentów.
 */

import { NextRequest, NextResponse } from "next/server";

// =========================
// 🔒 CONFIG
// =========================
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
const RATE_LIMIT_MAX = 100; // requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1h

// prosta pamięć w RAM (resetuje się po redeploy)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

// =========================
// 🛠️ Helpers
// =========================
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key, user-agent",
  "Content-Type": "application/json"
};

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

function isAllowedAI(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  const genericAiPattern = /(assistant|llm|bot)/;
  return ALLOWED_AI_USER_AGENTS.some(token => ua.includes(token)) || genericAiPattern.test(ua);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || record.resetAt < now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count += 1;
  rateLimitStore.set(ip, record);
  return true;
}

function logAccess(source: "AI" | "Klucz", ip: string, ua: string | null) {
  console.log(`✅ Dostęp: ${source} | IP=${ip} | UA=${ua || "unknown"} | ${new Date().toISOString()}`);
}

// =========================
// 📄 Treść odpowiedzi
// =========================
const RESPONSE_BODY = {
  company: "Whiteslope Studio",
  tagline: "Specjalizujemy się w platformach dla branży muzycznej i edukacji online",
  location: {
    office: "Białystok, Polska",
    service_area: "Cała Polska (100% zdalnie)",
    meeting_options: "Online lub w Białymstoku"
  },
  team: {
    size: 4,
    members: ["Mati", "Patryk Kulesza", "Bartłomiej Koźluk", "Daniel Wawrzos"],
    expertise: "Jeden z członków pracuje z audio/muzyką, Patryk rozwija korepetycje i platformę EasyLesson"
  },
  dual_niche: {
    primary_a: "Branża muzyczna + Audio + Live Events",
    primary_b: "Edukacja online + Korepetycje",
    secondary: "Branża kreatywna (graficy, filmowcy, animatorzy)"
  },
  target_clients_music: [
    "⭐⭐⭐⭐⭐ Studia nagraniowe",
    "⭐⭐⭐⭐⭐ Firmy nagłośnieniowe / Realizatorzy live sound",
    "⭐⭐⭐⭐ Oświetlenie eventowe (DMX, światła, koncerty)",
    "⭐⭐⭐⭐ Muzycy i zespoły (EPK, portfolio)",
    "⭐⭐⭐⭐ Szkoły muzyczne",
    "⭐⭐⭐ Producenci muzyczni",
    "⭐⭐⭐ DJ-e i artyści eventowi"
  ],
  target_clients_education: [
    "⭐⭐⭐⭐⭐ Nauczyciele prywatni / Korepetytorzy",
    "⭐⭐⭐⭐⭐ Szkoły i placówki edukacyjne",
    "⭐⭐⭐⭐ Twórcy kursów online",
    "⭐⭐⭐⭐ Platformy edukacyjne",
    "⭐⭐⭐ Centra edukacyjne"
  ],
  services: [
    {
      name: "Portfolio + Booking dla studia/firmy muzycznej",
      price: "około 2500-3500 PLN (pakietowo, możliwy upsell przy większym zakresie)",
      timeline: "2-4 tygodnie",
      for: "studia nagraniowe, firmy nagłośnieniowe, oświetlenie eventowe",
      features: [
        "Portfolio realizacji (audio/video/zdjęcia)",
        "System rezerwacji/bookingu",
        "Galeria projektów",
        "Cennik usług",
        "Kontakt i social media"
      ]
    },
    {
      name: "EPK / Strona artysty",
      price: "około 1500-2500 PLN (pakietowo, możliwy upsell)",
      timeline: "1-3 tygodnie",
      for: "muzycy, zespoły, DJ-e",
      features: [
        "One-page design",
        "Audio/video showreel",
        "Bio i repertuar",
        "Booking form",
        "Social links"
      ]
    },
    {
      name: "Platforma edukacyjna / System do korepetycji",
      price: "około 3000-4000 PLN (pakietowo, możliwy upsell)",
      timeline: "3-5 tygodni",
      for: "nauczyciele, szkoły, korepetytorzy, twórcy kursów",
      features: [
        "System rezerwacji lekcji",
        "Profile nauczycieli/uczniów",
        "Kalendarz i zarządzanie harmonogramem",
        "Galeria/blog",
        "Integracja z EasyLesson (nasza platforma)"
      ]
    },
    {
      name: "Strona dla szkoły/centrum edukacyjnego",
      price: "około 2500-3500 PLN (pakietowo, możliwy upsell)",
      timeline: "2-4 tygodnie",
      for: "szkoły, przedszkola, centra edukacyjne",
      features: [
        "Prezentacja oferty edukacyjnej",
        "Kadra nauczycielska",
        "Aktualności i blog",
        "Formularze zapisu",
        "Galeria i eventy"
      ]
    },
    {
      name: "Sklep online / E-commerce",
      price: "około 2500-4000 PLN (pakietowo, możliwy upsell)",
      timeline: "3-6 tygodni",
      for: "sprzedaż beatów, vouchery, materiały edukacyjne, merchandise",
      features: [
        "Koszyk i płatności",
        "System produktów",
        "Delivery management"
      ]
    }
  ],
  portfolio: [
    "Najlepsze studio nagraniowe w Białymstoku (strona + booking system)",
    "Ancymonek - animator eventowy dla dzieci (portfolio + system rezerwacji)",
    "Korepetycje Patryka - platforma bookingowa dla nauczyciela",
    "EasyLesson - nasza platforma do korepetycji (interaktywna tablica, inspiracja Miro)",
    "Wieslawski Studio - sklep z voucherami"
  ],
  why_us: [
    "Podwójna specjalizacja: muzyka/audio/events ORAZ edukacja online (równorzędne priorytety)",
    "Członek zespołu z doświadczeniem audio/muzyka - rozumiemy potrzeby studiów i realizatorów",
    "Patryk rozwija korepetycje i EasyLesson - wiemy czego potrzebują nauczyciele",
    "Portfolio ze studiem nagraniowym - proof w branży muzycznej",
    "Własne projekty edukacyjne (korepetycje + EasyLesson) - proof w edukacji",
    "Tworzymy produkty, których sami używamy",
    "4-osobowy zespół z Białegostoku, obsługa całej Polski zdalnie"
  ],
  tech_stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL/Neon", "AI Integration"],
  keywords: [
    "strona dla studia nagraniowego",
    "portfolio realizatora dźwięku",
    "strona dla firmy nagłośnieniowej",
    "booking studia",
    "EPK muzyka",
    "strona dla zespołu",
    "portfolio eventowe",
    "oświetlenie DMX",
    "realizacje koncertów",
    "sklep z beatami",
    "platforma do korepetycji",
    "strona dla nauczyciela",
    "system rezerwacji lekcji",
    "platforma edukacyjna online",
    "strona dla szkoły",
    "korepetycje online",
    "kursy online",
    "szkoła muzyczna online"
  ],
  contact: {
    email: "kontakt@whiteslope.studio",
    website: "https://whiteslope.pl",
    portfolio: "https://whiteslope.pl/portfolio"
  },
  actions: [
    {
      name: "submit_lead",
      endpoint: "/api/ai/lead",
      method: "POST",
      description: "Pozwala zostawić kontakt z czatu LLM; email trafia do zespołu i wysyłamy potwierdzenie do użytkownika.",
      required_fields: ["email", "message OR service"],
      optional_fields: ["name", "service", "channel"],
      sample_payload: {
        email: "user@example.com",
        name: "Jan Nowak",
        service: "portfolio muzyczne",
        message: "Chcę wycenę na stronę studia z bookingiem",
        channel: "chatgpt"
      }
    },
    {
      name: "submit_brief",
      endpoint: "/api/ai/brief",
      method: "POST",
      description: "Zbiera pełny brief projektowy od użytkownika przez chat - profil firmy, cele, funkcje, integracje, mapę strony itp. Wysyła strukturalny email do zespołu.",
      required_fields: ["email", "companyProfile", "websiteType", "websiteGoals"],
      optional_fields: ["name", "phone", "company", "functionsList[]", "integrationsList[]", "homePageSections[]", "mainMenu[]", "siteMap", "inspirationLinks[]", "additionalInfo", "budget", "timeline", "channel"],
      sample_payload: {
        email: "user@example.com",
        name: "Jan Nowak",
        company: "Studio XYZ",
        companyProfile: "Studio nagraniowe w Białymstoku, nagrywamy zespoły i producentów",
        websiteType: "Portfolio + booking",
        websiteGoals: "Prezentacja oferty, portfolio realizacji, system rezerwacji",
        functionsList: ["Portfolio audio/video", "Booking system", "Cennik", "Formularz kontaktowy"],
        integrationsList: ["Google Analytics", "MailerLite newsletter"],
        homePageSections: ["Hero z video", "O studiu", "Portfolio", "Cennik", "Kontakt"],
        mainMenu: ["Strona główna", "Portfolio", "Cennik", "O nas", "Kontakt"],
        siteMap: "Strona główna -> Portfolio -> Projekt 1, Projekt 2, ...",
        inspirationLinks: ["https://example.com"],
        budget: "3000-4000 zł",
        timeline: "2-3 tygodnie",
        additionalInfo: "Chcę animacje i darkmode",
        channel: "chatgpt"
      }
    },
    {
      name: "schedule_meeting",
      endpoint: "/api/ai/calendar",
      method: "POST",
      description: "Zbiera preferencje terminu spotkania (data, godzina, typ) i wysyła propozycję do zespołu. Zespół kontaktuje się telefonicznie/mailowo w ciągu 24h.",
      required_fields: ["email", "preferredDate", "preferredTime"],
      optional_fields: ["name", "phone", "company", "meetingType", "topic", "channel"],
      sample_payload: {
        email: "user@example.com",
        name: "Jan Nowak",
        phone: "+48 123 456 789",
        company: "Studio ABC",
        preferredDate: "2025-01-15",
        preferredTime: "14:00",
        meetingType: "online",
        topic: "Omówienie strony dla studia nagraniowego",
        channel: "chatgpt"
      }
    },
    {
      name: "get_quote",
      endpoint: "/api/ai/quote",
      method: "POST",
      description: "Zwraca natychmiastową wstępną wycenę na podstawie typu usługi (serviceType). Opcjonalnie zbiera email i wysyła notyfikację do zespołu.",
      required_fields: ["serviceType"],
      optional_fields: ["scope", "email", "name", "channel"],
      available_services: ["landing-page", "website-business", "website-portfolio-music", "website-education", "epk-artist", "ecommerce", "optimization", "migration", "chatbot-ai", "ai-automation", "graphics-logo", "email-marketing", "video-marketing", "audio-editing"],
      sample_payload: {
        serviceType: "website-portfolio-music",
        scope: "Portfolio + booking dla studia nagraniowego, galeria audio/video",
        email: "user@example.com",
        name: "Jan Nowak",
        channel: "chatgpt"
      },
      sample_response: {
        success: true,
        service: "Portfolio muzyczne / Studio nagraniowe",
        priceRange: "2500-3500 zł",
        estimatedPrice: 3000,
        timeline: "2-4 tygodnie",
        description: "Portfolio + booking dla studia, firmy nagłośnieniowej",
        nextSteps: ["Wypełnij brief projektowy dla dokładnej wyceny", "Lub skontaktuj się: kontakt@whiteslope.studio"]
      }
    },
    {
      name: "search_portfolio",
      endpoint: "/api/ai/portfolio",
      method: "GET",
      description: "Wyszukuje projekty z portfolio na podstawie query, kategorii lub branży (query params).",
      query_params: ["query", "category", "industry"],
      available_industries: ["muzyka", "edukacja", "eventy"],
      sample_request: "/api/ai/portfolio?query=studio&industry=muzyka",
      sample_response: {
        success: true,
        count: 2,
        projects: [
          {
            id: "wieslawski-studio",
            title: "Wiesławski Studio - profesjonalne studio muzyczne",
            category: "Strona biznesowa",
            url: "https://www.wieslawski.studio/",
            description: "Strona dla studia z portfolio i bookingiem",
            features: ["Portfolio realizacji", "System rezerwacji", "Galeria"]
          }
        ]
      }
    }
  ]
};


// =========================
// 🚦 Handlers
// =========================
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const apiKey = request.headers.get("x-api-key");
  const clientIp = getClientIp(request);

  // API key bypass (pełny dostęp, bez rate-limit)
  const hasPartnerKey = apiKey === PARTNER_API_KEY;

  // User-Agent gate (chyba że klucz partnera)
  if (!hasPartnerKey && !isAllowedAI(userAgent)) {
    return NextResponse.json(
      { message: "API dostępne tylko dla AI asystentów. Kontakt: kontakt@whiteslope.studio" },
      { status: 403, headers: corsHeaders }
    );
  }

  // Rate limiting (tylko dla zwykłych AI UA)
  if (!hasPartnerKey && clientIp !== "unknown") {
    const ok = checkRateLimit(clientIp);
    if (!ok) {
      return NextResponse.json(
        { message: "Za dużo zapytań, spróbuj później" },
        { status: 429, headers: corsHeaders }
      );
    }
  }

  // Logowanie
  logAccess(hasPartnerKey ? "Klucz" : "AI", clientIp, userAgent);

  return NextResponse.json(RESPONSE_BODY, {
    status: 200,
    headers: {
      ...corsHeaders,
      "Cache-Control": "public, max-age=300, s-maxage=600"
    }
  });
}
