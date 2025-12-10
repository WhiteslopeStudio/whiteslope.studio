/**
 * AI Quick Quote endpoint
 * Returns instant preliminary quote based on service type and scope.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

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
const RATE_LIMIT_MAX = 100;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1h

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-api-key, user-agent",
  "Content-Type": "application/json"
};

// Wyceny zgodne z data.tsx
const PRICING_TABLE: Record<string, any> = {
  "landing-page": {
    name: "Landing Page",
    priceRange: "1500-2500 zł",
    avgPrice: 2000,
    timeline: "1-2 tygodnie",
    description: "Prosta, efektywna strona sprzedażowa jednoekranowa"
  },
  "website-business": {
    name: "Strona biznesowa",
    priceRange: "3500-5500 zł",
    avgPrice: 4500,
    timeline: "2-4 tygodnie",
    description: "Wielostronicowa strona firmowa z pełną prezentacją"
  },
  "website-portfolio-music": {
    name: "Portfolio muzyczne / Studio nagraniowe",
    priceRange: "2500-3500 zł",
    avgPrice: 3000,
    timeline: "2-4 tygodnie",
    description: "Portfolio + booking dla studia, firmy nagłośnieniowej"
  },
  "website-education": {
    name: "Platforma edukacyjna / Korepetycje",
    priceRange: "3000-4000 zł",
    avgPrice: 3500,
    timeline: "3-5 tygodni",
    description: "System rezerwacji lekcji, profile nauczycieli"
  },
  "epk-artist": {
    name: "EPK / Strona artysty",
    priceRange: "1500-2500 zł",
    avgPrice: 2000,
    timeline: "1-3 tygodnie",
    description: "One-page dla muzyka, DJ-a, zespołu"
  },
  "ecommerce": {
    name: "Sklep internetowy",
    priceRange: "2500-4000 zł",
    avgPrice: 3200,
    timeline: "3-6 tygodni",
    description: "E-commerce z płatnościami, koszykiem, dostawą"
  },
  "optimization": {
    name: "Audyt + Optymalizacja",
    priceRange: "800-1500 zł",
    avgPrice: 1100,
    timeline: "1-2 tygodnie",
    description: "Poprawa szybkości, SEO, bezpieczeństwa istniejącej strony"
  },
  "migration": {
    name: "Migracja strony",
    priceRange: "2200-3500 zł",
    avgPrice: 2800,
    timeline: "2-3 tygodnie",
    description: "Przeniesienie na nowoczesne technologie"
  },
  "chatbot-ai": {
    name: "Chatbot AI",
    priceRange: "1800-3000 zł",
    avgPrice: 2400,
    timeline: "1-2 tygodnie",
    description: "Inteligentny chatbot 24/7 na stronie"
  },
  "ai-automation": {
    name: "Automatyzacja AI",
    priceRange: "3500-6000 zł",
    avgPrice: 4500,
    timeline: "2-4 tygodnie",
    description: "Zaawansowane rozwiązania AI, OCR, generatory"
  },
  "graphics-logo": {
    name: "Logo + Branding",
    priceRange: "700-1500 zł",
    avgPrice: 1000,
    timeline: "1-2 tygodnie",
    description: "Profesjonalne logo i identyfikacja wizualna"
  },
  "email-marketing": {
    name: "Integracja Email Marketing",
    priceRange: "800-2000 zł",
    avgPrice: 1400,
    timeline: "1-2 tygodnie",
    description: "MailerLite, automatyczne newslettery, kampanie"
  },
  "video-marketing": {
    name: "Video Marketing",
    priceRange: "wycena indywidualna",
    avgPrice: null,
    timeline: "1-4 tygodnie",
    description: "Filmy promocyjne, rolki social media, produkcja wideo"
  },
  "audio-editing": {
    name: "Edytowanie audio",
    priceRange: "100-250 zł za materiał",
    avgPrice: 150,
    timeline: "1-5 dni",
    description: "Profesjonalna obróbka dźwięku, mastering, redukcja szumów"
  }
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

function sanitize(input: string | undefined, max = 500): string {
  if (!input) return "";
  return input.toString().trim().slice(0, max);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");
  const apiKey = request.headers.get("x-api-key");
  const clientIp = getClientIp(request);

  const hasPartnerKey = apiKey === PARTNER_API_KEY;

  if (!hasPartnerKey && !isAllowedAI(userAgent)) {
    return NextResponse.json(
      { message: "API dostępne dla AI asystentów lub z kluczem partnera" },
      { status: 403, headers: corsHeaders }
    );
  }

  if (!hasPartnerKey && clientIp !== "unknown") {
    const ok = checkRateLimit(clientIp);
    if (!ok) {
      return NextResponse.json(
        { message: "Za dużo zapytań, spróbuj później" },
        { status: 429, headers: corsHeaders }
      );
    }
  }

  let body: any;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ message: "Nieprawidłowy JSON" }, { status: 400, headers: corsHeaders });
  }

  const serviceType = sanitize(body.serviceType)?.toLowerCase();
  const scope = sanitize(body.scope, 1000);
  const email = sanitize(body.email);
  const name = sanitize(body.name) || "Anonim";
  const channel = sanitize(body.channel) || "chat";

  if (!serviceType) {
    return NextResponse.json({ 
      message: "Wymagane: serviceType (np. 'landing-page', 'website-business', 'chatbot-ai')" 
    }, { status: 400, headers: corsHeaders });
  }

  // Znajdź wycenę
  const pricing = PRICING_TABLE[serviceType];

  if (!pricing) {
    // Jeśli nie znaleziono dokładnej usługi, spróbuj dopasować fuzzy
    const fuzzyMatch = Object.keys(PRICING_TABLE).find(key => 
      key.includes(serviceType) || serviceType.includes(key.split("-")[0])
    );
    
    if (!fuzzyMatch) {
      return NextResponse.json({
        success: false,
        message: "Nie znaleziono usługi. Dostępne: " + Object.keys(PRICING_TABLE).join(", "),
        availableServices: Object.keys(PRICING_TABLE)
      }, { status: 404, headers: corsHeaders });
    }

    const matchedPricing = PRICING_TABLE[fuzzyMatch];
    
    console.log(`💰 Quote: ${serviceType} (matched: ${fuzzyMatch}) | email=${email || "brak"}`);

    return NextResponse.json({
      success: true,
      service: matchedPricing.name,
      priceRange: matchedPricing.priceRange,
      estimatedPrice: matchedPricing.avgPrice,
      timeline: matchedPricing.timeline,
      description: matchedPricing.description,
      scope: scope || null,
      note: "To wstępna wycena. Dokładna wycena po szczegółach projektu.",
      nextSteps: [
        "Wypełnij brief projektowy dla dokładnej wyceny",
        "Lub skontaktuj się: kontakt@whiteslope.studio / +48 731 721 760"
      ]
    }, { status: 200, headers: corsHeaders });
  }

  // Jeśli podano email, wyślij notyfikację
  if (email && validateEmail(email) && process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      await resend.emails.send({
        from: "WhiteSlope AI Quote <onboarding@resend.dev>",
        to: ["kontakt@whiteslope.studio"],
        subject: `💰 Zapytanie o wycenę z AI (${channel}) - ${pricing.name}`,
        html: `
          <h2>💰 Zapytanie o wycenę z AI</h2>
          <p><strong>Usługa:</strong> ${pricing.name}</p>
          <p><strong>Wstępna wycena:</strong> ${pricing.priceRange}</p>
          <p><strong>Termin:</strong> ${pricing.timeline}</p>
          ${scope ? `<p><strong>Zakres:</strong> ${scope}</p>` : ""}
          <hr/>
          <p><strong>Klient:</strong> ${name} (${email})</p>
          <p><strong>Kanał:</strong> ${channel}</p>
        `,
        replyTo: email
      });
    } catch (error) {
      console.error("⚠️ Nie udało się wysłać notyfikacji o quote:", error);
    }
  }

  console.log(`💰 Quote: ${serviceType} | ${pricing.priceRange} | email=${email || "brak"}`);

  return NextResponse.json({
    success: true,
    service: pricing.name,
    priceRange: pricing.priceRange,
    estimatedPrice: pricing.avgPrice,
    timeline: pricing.timeline,
    description: pricing.description,
    scope: scope || null,
    note: "To wstępna wycena. Dokładna wycena po szczegółach projektu.",
    nextSteps: [
      "Wypełnij brief projektowy dla dokładnej wyceny",
      "Lub skontaktuj się: kontakt@whiteslope.studio / +48 731 721 760"
    ]
  }, { status: 200, headers: corsHeaders });
}
