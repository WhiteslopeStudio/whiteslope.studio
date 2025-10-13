/**
 * 🤖 WHITESLOPE CHATBOT API v2.0
 * 
 * Inteligentny chatbot z:
 * ✅ Rate limiting i ochroną przed spamem
 * ✅ Intelligent caching (oszczędność API)
 * ✅ Fallback system (proste pytania bez API)
 * ✅ HYBRID approach (off-topic jako marketing)
 * ✅ Dynamic prompt (sync z data.tsx)
 * ✅ Full error handling
 * ✅ Analytics & metrics
 * 
 * @author WhiteSlope Team
 * @version 2.0.0
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { 
  getFallbackResponse, 
  canAnswerWithFallback 
} from "@/utils/chatbotFallback";
import { generateSmartButtons } from "@/utils/chatbotButtons";
import { MAIN_SERVICES, SERVICE_PACKAGES } from "@/lib/data";

// ==========================================
// 🎛️ KONFIGURACJA
// ==========================================
const CONFIG = {
  // Rate Limiting
  RATE_LIMIT_REQUESTS: 10,
  RATE_LIMIT_WINDOW: 60 * 1000, // 1 minuta
  BLOCK_DURATION: 5 * 60 * 1000, // 5 minut
  
  // Cache
  CACHE_TTL: 60 * 60 * 1000, // 1 godzina
  
  // Walidacja
  MAX_MESSAGE_LENGTH: 500,
  MIN_MESSAGE_LENGTH: 1,
  
  // Gemini
  GEMINI_MODEL: "gemini-2.0-flash-exp",
  GEMINI_TEMPERATURE: 0.7,
  GEMINI_MAX_TOKENS: 500,
  
  // Debug
  DEBUG_MODE: process.env.NODE_ENV === 'development'
};

// ==========================================
// 📊 ANALYTICS & METRICS
// ==========================================
interface ChatMetrics {
  totalRequests: number;
  fallbackHits: number;
  apiCalls: number;
  cacheHits: number;
  rateLimitHits: number;
  errors: number;
  avgResponseTime: number;
}

const metrics: ChatMetrics = {
  totalRequests: 0,
  fallbackHits: 0,
  apiCalls: 0,
  cacheHits: 0,
  rateLimitHits: 0,
  errors: 0,
  avgResponseTime: 0
};

/**
 * Loguje metryki co 10 requestów (tylko w dev)
 */
function logMetrics() {
  if (CONFIG.DEBUG_MODE && metrics.totalRequests % 10 === 0) {
    console.log('\n📊 CHATBOT METRICS:');
    console.log(`  Total Requests: ${metrics.totalRequests}`);
    console.log(`  API Calls: ${metrics.apiCalls} (${((metrics.apiCalls/metrics.totalRequests)*100).toFixed(1)}%)`);
    console.log(`  Fallback: ${metrics.fallbackHits} (${((metrics.fallbackHits/metrics.totalRequests)*100).toFixed(1)}%)`);
    console.log(`  Cache Hits: ${metrics.cacheHits} (${((metrics.cacheHits/metrics.totalRequests)*100).toFixed(1)}%)`);
    console.log(`  Rate Limits: ${metrics.rateLimitHits}`);
    console.log(`  Errors: ${metrics.errors}`);
    console.log(`  Avg Response: ${metrics.avgResponseTime.toFixed(0)}ms\n`);
  }
}

// ==========================================
// 🛡️ RATE LIMITING
// ==========================================
interface RequestLog {
  timestamps: number[];
  blockUntil?: number;
}

const requestLog = new Map<string, RequestLog>();

/**
 * Sprawdza rate limit dla danego IP
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLog = requestLog.get(ip) || { timestamps: [] };
  
  // Sprawdź czy zablokowany
  if (userLog.blockUntil && now < userLog.blockUntil) {
    const remainingSeconds = Math.ceil((userLog.blockUntil - now) / 1000);
    console.warn(`⛔ [RATE LIMIT] IP ${ip.substring(0, 10)}... zablokowany na ${remainingSeconds}s`);
    return false;
  }
  
  // Wyczyść blokadę
  if (userLog.blockUntil && now >= userLog.blockUntil) {
    userLog.blockUntil = undefined;
  }
  
  // Wyczyść stare timestamps
  userLog.timestamps = userLog.timestamps.filter(
    time => now - time < CONFIG.RATE_LIMIT_WINDOW
  );
  
  // Sprawdź limit
  if (userLog.timestamps.length >= CONFIG.RATE_LIMIT_REQUESTS) {
    userLog.blockUntil = now + CONFIG.BLOCK_DURATION;
    requestLog.set(ip, userLog);
    metrics.rateLimitHits++;
    console.warn(`⚠️ [RATE LIMIT] IP ${ip.substring(0, 10)}... przekroczył limit (${userLog.timestamps.length} req/min)`);
    return false;
  }
  
  // Dodaj nowy timestamp
  userLog.timestamps.push(now);
  requestLog.set(ip, userLog);
  return true;
}

// Cleanup co 5 minut
setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  for (const [ip, log] of requestLog.entries()) {
    if (
      log.timestamps.length === 0 && 
      (!log.blockUntil || now >= log.blockUntil)
    ) {
      requestLog.delete(ip);
      cleaned++;
    }
  }
  if (CONFIG.DEBUG_MODE && cleaned > 0) {
    console.log(`🧹 [CLEANUP] Wyczyszczono ${cleaned} wpisów rate limit`);
  }
}, 5 * 60 * 1000);

// ==========================================
// 🧠 INTELLIGENT CACHE
// ==========================================
interface CachedResponse {
  response: string;
  buttons: any[];
  timestamp: number;
}

const responseCache = new Map<string, CachedResponse>();

function getCachedResponse(message: string): CachedResponse | null {
  const key = message.toLowerCase().trim();
  const cached = responseCache.get(key);
  
  if (cached && Date.now() - cached.timestamp < CONFIG.CACHE_TTL) {
    return cached;
  }
  
  if (cached) {
    responseCache.delete(key);
  }
  
  return null;
}

function setCachedResponse(
  message: string, 
  response: string, 
  buttons: any[]
): void {
  const key = message.toLowerCase().trim();
  responseCache.set(key, {
    response,
    buttons,
    timestamp: Date.now()
  });
}

// Cleanup co 15 minut
setInterval(() => {
  const now = Date.now();
  let cleaned = 0;
  for (const [key, cached] of responseCache.entries()) {
    if (now - cached.timestamp > CONFIG.CACHE_TTL) {
      responseCache.delete(key);
      cleaned++;
    }
  }
  if (CONFIG.DEBUG_MODE && cleaned > 0) {
    console.log(`🧹 [CLEANUP] Wyczyszczono ${cleaned} wpisów cache`);
  }
}, 15 * 60 * 1000);

// ==========================================
// 📋 DYNAMICZNY PROMPT - HYBRID APPROACH
// ==========================================
function generateDynamicPrompt(userMessage: string): string {
  // Zbierz wszystkie usługi z cenami
  const servicesInfo = MAIN_SERVICES.map(service => {
    const packages = SERVICE_PACKAGES.find(
      p => p.serviceId === service.id
    )?.packages || [];
    
    const packagesList = packages.map(pkg => 
      `  • ${pkg.name} (${pkg.price}): ${pkg.description}`
    ).join('\n');
    
    return `
📦 ${service.title.toUpperCase()} - ${service.price}
${service.description}

Pakiety:
${packagesList || '  • Skontaktuj się po szczegóły'}
`;
  }).join('\n---\n');

  return `Jesteś SLOPUŚ - profesjonalnym AI chatbotem dla firmy WhiteSlope z Białegostoku.

🎯 TWOJA MISJA:
Pomagasz klientom znaleźć idealne rozwiązanie technologiczne dla ich biznesu. Jesteś pomocny, konkretny, inteligentny i zawsze podajesz dokładne informacje.

⭐ WAŻNE: Jesteś również DEMO naszych możliwości AI - pokazujesz jak dobry chatbot może być!

🏢 O WHITESLOPE:
WhiteSlope to nowoczesna agencja digital z Białegostoku, która specjalizuje się w:
- Tworzeniu stron internetowych (Next.js, React, TypeScript)
- Integracjach sztucznej inteligencji (ChatGPT, Claude, Gemini)
- Modernizacji istniejących stron
- Grafikach i projektowaniu
- Email marketingu i automatyzacji

📝 **MAMY AKTYWNY BLOG!** 
- Artykuły o SEO, web development, AI
- Porady i tutoriale
- Case studies i realizacje
- Link: https://whiteslope.studio/blog

📊 NASZA PEŁNA OFERTA (CENNIK 2025):
${servicesInfo}

💼 NASZE PORTFOLIO:
1. **Wiesławski Studio** - Profesjonalne studio muzyczne
   • Link: https://www.wieslawski.studio/
   • Rezultat: Pierwsze zapytania od klientów już po 24 godzinach
   • Stack: Next.js, TypeScript, Responsywny design
   
2. **Patryk Kulesza - Korepetycje** 
   • Link: https://patrykkul.github.io/korepetycje/
   • Rezultat: Bardzo korzystna oferta pracy po 3 dniach
   • Stack: HTML, CSS, JavaScript, SEO optimized

🔄 PROCES WSPÓŁPRACY:
1. **Analiza** - Bezpłatna konsultacja (30 min)
2. **Planowanie** - Strategia, harmonogram
3. **Projektowanie** - Unikalny design
4. **Programowanie** - Next.js, React, TypeScript
5. **Testy** - QA na wszystkich urządzeniach
6. **Wdrożenie** - Launch + wsparcie

📞 KONTAKT:
- Email: kontakt@whiteslope.studio
- Lokalizacja: Białystok, Polska
- Odpowiadamy w 24h (dni robocze)
- Konsultacje: Bezpłatne 30-60 min

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎭 ZASADY ODPOWIEDZI - BARDZO WAŻNE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 **TYP 1: PYTANIA O WHITESLOPE (biznes)**

Jeśli pytanie dotyczy:
- Naszych usług, cen, portfolio
- Stron internetowych, AI, grafiki
- Procesu współpracy, kontaktu
- "Ile kosztuje X", "Robicie Y", "Jak wygląda Z"

TO:
✅ Odpowiedz KONKRETNIE na pytanie
✅ Podaj DOKŁADNE ceny z oferty (nigdy nie wymyślaj!)
✅ Jeśli pytanie o JEDNĄ usługę - odpowiedz TYLKO o tej
✅ Jeśli pytanie OGÓLNE - możesz pokazać więcej
✅ Zachęć do konsultacji przy złożonych projektach
✅ Użyj emoji dla żywości 🚀
✅ Max 150-200 słów

PRZYKŁAD:
User: "Ile kosztuje chatbot?"
Ty: "🤖 **Chatbot AI - od 1000 zł** (jednorazowo!)

Taki chatbot jak ja może:
- Obsługiwać klientów 24/7
- Odpowiadać na FAQ automatycznie
- Zbierać leady
- Integracja z ChatGPT/Claude/Gemini

⏱️ Wdrożenie: 1-2 tygodnie
💎 Hosting i wsparcie w cenie!

🚀 Chcesz taki chatbot na swojej stronie?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📌 **TYP 2: PYTANIA OFF-TOPIC (poza biznesem)** ⭐

Jeśli pytanie NIE dotyczy WhiteSlope/biznesu:
- "Ile człowiek gubi włosów?"
- "Czy można mieszać ubrania?"
- "Jaka jest stolica Francji?"
- "Powiedz coś śmiesznego"
- Itp.

TO ZASTOSUJ **HYBRID APPROACH**:

1️⃣ Odpowiedz KRÓTKO i POMOCNIE (1-2 zdania)
2️⃣ NATYCHMIAST dodaj CTA do naszych usług
3️⃣ Wykorzystaj to jako okazję MARKETINGOWĄ
4️⃣ Pokaż swoją inteligencję (buduj zaufanie)
5️⃣ ZAWSZE wspomniej że taki chatbot może być u klienta

SZABLON:
"[Krótka pomocna odpowiedź 1-2 zdania] 😊

**Btw, widzisz jak dobrze działam?** Taki inteligentny chatbot może być na TWOJEJ stronie i pomagać Twoim klientom 24/7!

🤖 **Chatbot AI - tylko 1000 zł** (jednorazowo)
- Obsługa 24/7 bez przerwy
- Dopasowany do Twojej branży
- Zwiększa konwersję o 40%

🚀 Zainteresowany?"

PRZYKŁADY OFF-TOPIC:

User: "Ile człowiek gubi włosów dziennie?"
Ty: "Człowiek traci średnio 50-100 włosów dziennie - to całkowicie normalne! 😊

**Btw, widzisz jak dobrze działam?** Taki inteligentny chatbot może być na TWOJEJ stronie!

🤖 **Chatbot AI - tylko 1000 zł**
- Obsługa klientów 24/7
- Odpowiedzi na FAQ
- Zwiększa konwersję

Chcesz taki chatbot dla swojego biznesu? 🚀"

User: "Czy można mieszać białe i czerwone ubrania?"
Ty: "Lepiej nie - czerwone może farbować białe podczas prania! 🧺

Tak jak nie mieszamy złych praktyk w web development! 😄

**Widzisz jak inteligentny jestem?** Taki chatbot może odpowiadać na pytania TWOICH klientów!

🤖 **Chatbot AI - od 1000 zł**
💡 Chcesz takiego na swojej stronie?"

User: "Jaka jest stolica Francji?"
Ty: "Paryż! 🇫🇷 Miasto miłości i Wieży Eiffla!

**Widzisz jak szybko odpowiadam?** Taki chatbot może obsługiwać Twoich klientów błyskawicznie!

🤖 **Chatbot AI (taki jak ja) - 1000 zł**
- Dostępny 24/7
- Natychmiastowe odpowiedzi
- Oszczędza czas zespołu

🚀 Zainteresowany?"

User: "Powiedz coś śmiesznego"
Ty: "Dlaczego programista poszedł do psychiatry? Bo miał za dużo błędów w życiu! 😄

**A wiesz co NIE jest żartem?** Że taki chatbot może zwiększyć Twoją konwersję o 40%!

🤖 **Chatbot AI - od 1000 zł**
- Obsługa 24/7
- Zwiększa sprzedaż
- Oszczędza czas

💡 Chcesz takiego dla swojego biznesu?"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚫 CZEGO NIE ROBIĆ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Nie mów "Nie znam się" / "To poza moim zakresem"
❌ Nie odmawiaj odpowiedzi na off-topic
❌ Nie bądź suchy i bezużyteczny
❌ Nie pisz długich odpowiedzi na off-topic (max 50 słów + CTA)
❌ Nie zapominaj o CTA przy off-topic
❌ Nie wymyślaj cen - używaj tylko z oferty!

✅ ZAWSZE wykorzystuj KAŻDĄ interakcję jako marketing
✅ ZAWSZE pokazuj inteligencję i pomocność
✅ ZAWSZE dodawaj CTA przy off-topic
✅ ZAWSZE buduj pozytywny wizerunek AI

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

UŻYTKOWNIK PISZE:
"${userMessage}"

Odpowiedz jako SLOPUŚ - inteligentny, pomocny, biznesowy AI asystent WhiteSlope. Pamiętaj o zasadach powyżej!`;
}

// ==========================================
// 🚀 GŁÓWNA FUNKCJA API ENDPOINT
// ==========================================
export async function POST(req: NextRequest) {
  let userMessage = '';
  const startTime = Date.now();
  
  try {
    metrics.totalRequests++;
    
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 1️⃣ RATE LIMITING
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const ip = 
      req.headers.get('x-forwarded-for')?.split(',')[0] || 
      req.headers.get('x-real-ip') || 
      'unknown';
    
    if (!checkRateLimit(ip)) {
      const responseTime = Date.now() - startTime;
      return Response.json({ 
        response: "⏸️ **Zbyt wiele zapytań!**\n\nPoczekaj 5 minut i spróbuj ponownie.\n\n💡 Lub skontaktuj się bezpośrednio:\n📧 kontakt@whiteslope.studio",
        error: "Rate limit exceeded",
        retryAfter: 300,
        responseTime
      }, { 
        status: 429,
        headers: { 'Retry-After': '300' }
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2️⃣ WALIDACJA
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const body = await req.json();
    const { message } = body;
    userMessage = message;

    if (!message || typeof message !== 'string') {
      return Response.json({ 
        response: "❌ Nieprawidłowa wiadomość.",
        error: "Invalid message"
      }, { status: 400 });
    }

    const sanitizedMessage = message.trim();
    
    if (sanitizedMessage.length < CONFIG.MIN_MESSAGE_LENGTH) {
      return Response.json({ 
        response: "💬 Napisz coś! Jak mogę Ci pomóc?",
        error: "Empty message"
      }, { status: 400 });
    }

    if (sanitizedMessage.length > CONFIG.MAX_MESSAGE_LENGTH) {
      return Response.json({ 
        response: `📝 **Wiadomość za długa!** (max ${CONFIG.MAX_MESSAGE_LENGTH} znaków)\n\nSkróć pytanie lub napisz: kontakt@whiteslope.studio`,
        error: "Message too long"
      }, { status: 400 });
    }

    if (CONFIG.DEBUG_MODE) {
      console.log(`\n💬 [${new Date().toISOString()}] Nowa wiadomość (${sanitizedMessage.length} znaków):`);
      console.log(`   "${sanitizedMessage.substring(0, 80)}${sanitizedMessage.length > 80 ? '...' : ''}"`);
      console.log(`   IP: ${ip.substring(0, 15)}...`);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3️⃣ CACHE CHECK
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const cached = getCachedResponse(sanitizedMessage);
    if (cached) {
      metrics.cacheHits++;
      const responseTime = Date.now() - startTime;
      
      if (CONFIG.DEBUG_MODE) {
        console.log(`✅ [CACHE HIT] ${responseTime}ms`);
      }
      
      logMetrics();
      
      return Response.json({
        response: cached.response,
        buttons: cached.buttons,
        cached: true,
        responseTime
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 4️⃣ FALLBACK CHECK (proste pytania)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    const fallbackCheck = canAnswerWithFallback(sanitizedMessage);
    
    if (fallbackCheck.canAnswer) {
      metrics.fallbackHits++;
      const responseTime = Date.now() - startTime;
      
      if (CONFIG.DEBUG_MODE) {
        console.log(`✅ [FALLBACK] ${responseTime}ms - ${fallbackCheck.category} (conf: ${fallbackCheck.confidence})`);
      }
      
      const fallbackResponse = getFallbackResponse(sanitizedMessage);
      const buttons = generateSmartButtons(sanitizedMessage, fallbackResponse);
      
      // Cache dla przyszłości
      setCachedResponse(sanitizedMessage, fallbackResponse, buttons);
      
      // Update metrics
      const totalTime = metrics.avgResponseTime * (metrics.totalRequests - 1);
      metrics.avgResponseTime = (totalTime + responseTime) / metrics.totalRequests;
      
      logMetrics();
      
      return Response.json({ 
        response: fallbackResponse,
        buttons,
        fallback: true,
        category: fallbackCheck.category,
        responseTime
      });
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 5️⃣ GEMINI API CALL (złożone pytania)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ [CONFIG ERROR] Brak GEMINI_API_KEY!');
      metrics.errors++;
      
      // Fallback jako ostateczność
      const fallbackResponse = getFallbackResponse(sanitizedMessage);
      const buttons = generateSmartButtons(sanitizedMessage, fallbackResponse);
      
      return Response.json({ 
        response: fallbackResponse + "\n\n🤖 *Tryb offline*",
        buttons,
        fallback: true,
        noApiKey: true
      });
    }

    metrics.apiCalls++;
    
    if (CONFIG.DEBUG_MODE) {
      console.log(`🤖 [API CALL] Wywołuję Gemini...`);
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: CONFIG.GEMINI_MODEL,
      generationConfig: {
        temperature: CONFIG.GEMINI_TEMPERATURE,
        topP: 0.8,
        topK: 40,
        maxOutputTokens: CONFIG.GEMINI_MAX_TOKENS,
      }
    });
    
    const prompt = generateDynamicPrompt(sanitizedMessage);
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const buttons = generateSmartButtons(sanitizedMessage, response);
    
    // Cache response
    setCachedResponse(sanitizedMessage, response, buttons);
    
    const responseTime = Date.now() - startTime;
    
    // Update metrics
    const totalTime = metrics.avgResponseTime * (metrics.totalRequests - 1);
    metrics.avgResponseTime = (totalTime + responseTime) / metrics.totalRequests;
    
    if (CONFIG.DEBUG_MODE) {
      console.log(`✅ [API SUCCESS] ${responseTime}ms`);
    }
    
    logMetrics();
    
    return Response.json({ 
      response,
      buttons,
      apiUsed: true,
      responseTime
    });
    
  } catch (error: any) {
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 🆘 ERROR HANDLING
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    metrics.errors++;
    const responseTime = Date.now() - startTime;
    
    console.error('❌ [ERROR]', error?.message || error);
    if (CONFIG.DEBUG_MODE) {
      console.error('   Stack:', error?.stack);
      console.error('   Status:', error?.status);
    }
    
    // Fallback przy błędzie
    try {
      const fallbackResponse = getFallbackResponse(userMessage);
      const fallbackButtons = generateSmartButtons(userMessage, fallbackResponse);
      
      return Response.json({ 
        response: fallbackResponse + "\n\n🤖 *Tryb offline - ale widzisz jak dobrze działam!*",
        buttons: fallbackButtons,
        fallback: true,
        error: true,
        responseTime
      });
      
    } catch (fallbackError) {
      console.error('❌ [FALLBACK ERROR]', fallbackError);
      
      // Absolutnie ostateczna opcja
      return Response.json({ 
        response: "😴 **Chatbot śpi chwilowo...**\n\n💡 Ale widzisz potencjał? Taki chatbot może być na TWOJEJ stronie!\n\n🚀 Chatbot AI od 1000 zł\n📧 kontakt@whiteslope.studio",
        buttons: [
          {
            text: '🤖 Chcę taki chatbot!',
            href: '/contact?tab=quote&service=ai-integration',
            variant: 'primary'
          },
          {
            text: '📞 Bezpłatna konsultacja',
            href: '/contact?tab=meeting',
            variant: 'secondary'
          }
        ],
        sleeping: true,
        responseTime
      });
    }
  }
}



// ==========================================
// KOD API WYŁĄCZNIE DO BIZNESU

// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { NextRequest } from "next/server";
// import { 
//   getFallbackResponse, 
//   canAnswerWithFallback 
// } from "@/utils/chatbotFallback";
// import { generateSmartButtons } from "@/utils/chatbotButtons";
// import { MAIN_SERVICES, SERVICE_PACKAGES } from "@/lib/data";

// // ==========================================
// // 🛡️ RATE LIMITING
// // Ochrona przed spamem i nadmiernym wykorzystaniem API
// // ==========================================
// interface RequestLog {
//   timestamps: number[];
//   blockUntil?: number;
// }

// const requestLog = new Map<string, RequestLog>();
// const RATE_LIMIT_REQUESTS = 10; // Max requests per window
// const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
// const BLOCK_DURATION = 5 * 60 * 1000; // 5 minutes block after abuse

// /**
//  * Sprawdza czy użytkownik nie przekroczył limitu requestów
//  * @param ip - Adres IP użytkownika
//  * @returns true jeśli request dozwolony, false jeśli zablokowany
//  */
// function checkRateLimit(ip: string): boolean {
//   const now = Date.now();
//   const userLog = requestLog.get(ip) || { timestamps: [] };
  
//   // Sprawdź czy użytkownik jest zablokowany
//   if (userLog.blockUntil && now < userLog.blockUntil) {
//     return false;
//   }
  
//   // Wyczyść blockade jeśli minął czas
//   if (userLog.blockUntil && now >= userLog.blockUntil) {
//     userLog.blockUntil = undefined;
//   }
  
//   // Filtruj requesty spoza okna czasowego
//   userLog.timestamps = userLog.timestamps.filter(
//     time => now - time < RATE_LIMIT_WINDOW
//   );
  
//   // Sprawdź limit
//   if (userLog.timestamps.length >= RATE_LIMIT_REQUESTS) {
//     // Zablokuj użytkownika na 5 minut
//     userLog.blockUntil = now + BLOCK_DURATION;
//     requestLog.set(ip, userLog);
//     console.warn(`⚠️ Rate limit exceeded for IP: ${ip.substring(0, 10)}...`);
//     return false;
//   }
  
//   // Dodaj nowy request
//   userLog.timestamps.push(now);
//   requestLog.set(ip, userLog);
//   return true;
// }

// // Cleanup old entries co 5 minut
// setInterval(() => {
//   const now = Date.now();
//   for (const [ip, log] of requestLog.entries()) {
//     if (
//       log.timestamps.length === 0 && 
//       (!log.blockUntil || now >= log.blockUntil)
//     ) {
//       requestLog.delete(ip);
//     }
//   }
// }, 5 * 60 * 1000);

// // ==========================================
// // 🧠 INTELLIGENT CACHE
// // Cache dla popularnych pytań - oszczędność API calls
// // ==========================================
// interface CachedResponse {
//   response: string;
//   buttons: any[];
//   timestamp: number;
// }

// const responseCache = new Map<string, CachedResponse>();
// const CACHE_TTL = 60 * 60 * 1000; // 1 godzina

// /**
//  * Pobiera odpowiedź z cache jeśli jest świeża
//  */
// function getCachedResponse(message: string): CachedResponse | null {
//   const key = message.toLowerCase().trim();
//   const cached = responseCache.get(key);
  
//   if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
//     return cached;
//   }
  
//   // Usuń przestarzały cache
//   if (cached) {
//     responseCache.delete(key);
//   }
  
//   return null;
// }

// /**
//  * Zapisuje odpowiedź do cache
//  */
// function setCachedResponse(
//   message: string, 
//   response: string, 
//   buttons: any[]
// ): void {
//   const key = message.toLowerCase().trim();
//   responseCache.set(key, {
//     response,
//     buttons,
//     timestamp: Date.now()
//   });
// }

// // Cleanup cache co 15 minut
// setInterval(() => {
//   const now = Date.now();
//   for (const [key, cached] of responseCache.entries()) {
//     if (now - cached.timestamp > CACHE_TTL) {
//       responseCache.delete(key);
//     }
//   }
// }, 15 * 60 * 1000);

// // ==========================================
// // 📋 DYNAMICZNY PROMPT
// // Generuje prompt z aktualnych danych z data.tsx
// // ==========================================
// function generateDynamicPrompt(userMessage: string): string {
//   // Zbierz wszystkie usługi z cenami
//   const servicesInfo = MAIN_SERVICES.map(service => {
//     const packages = SERVICE_PACKAGES.find(
//       p => p.serviceId === service.id
//     )?.packages || [];
    
//     const packagesList = packages.map(pkg => 
//       `  • ${pkg.name} (${pkg.price}): ${pkg.description}`
//     ).join('\n');
    
//     return `
// 📦 ${service.title.toUpperCase()} - ${service.price}
// ${service.description}

// Pakiety:
// ${packagesList || '  • Skontaktuj się po szczegóły'}
// `;
//   }).join('\n---\n');

//   return `Jesteś SLOPUŚ - profesjonalnym AI chatbotem dla firmy WhiteSlope z Białegostoku.

// 🎯 TWOJA MISJA:
// Pomagasz klientom znaleźć idealne rozwiązanie technologiczne dla ich biznesu. Jesteś pomocny, konkretny i zawsze podajesz dokładne informacje.

// 🏢 O WHITESLOPE:
// WhiteSlope to nowoczesna agencja digital z Białegostoku, która specjalizuje się w:
// - Tworzeniu stron internetowych (Next.js, React, TypeScript)
// - Integracjach sztucznej inteligencji (ChatGPT, Claude, Gemini)
// - Modernizacji istniejących stron
// - Grafikach i projektowaniu
// - Email marketingu i automatyzacji

// 📝 **MAMY AKTYWNY BLOG!** 
// • Artykuły o SEO, web development, AI
// • Porady i tutoriale
// • Link: https://whiteslope.studio/blog
// • Zachęcaj użytkowników do odwiedzenia bloga!

// 📊 NASZA PEŁNA OFERTA (CENNIK 2025):
// ${servicesInfo}

// 💼 NASZE PORTFOLIO:
// 1. **Wiesławski Studio** - Profesjonalne studio muzyczne
//    • Link: https://www.wieslawski.studio/
//    • Rezultat: Pierwsze zapytania od klientów już po 24 godzinach od uruchomienia
//    • Stack: Next.js, TypeScript, Responsywny design
   
// 2. **Patryk Kulesza - Korepetycje** 
//    • Link: https://patrykkul.github.io/korepetycje/
//    • Rezultat: Bardzo korzystna oferta pracy po 3 dniach od publikacji
//    • Stack: HTML, CSS, JavaScript, SEO optimized

// 🔄 PROCES WSPÓŁPRACY:
// 1. **Analiza** - Bezpłatna konsultacja (30 min), poznajemy potrzeby
// 2. **Planowanie** - Strategia, harmonogram, kamienie milowe
// 3. **Projektowanie** - Unikalny design dopasowany do marki
// 4. **Programowanie** - Kodowanie z najnowszymi technologiami
// 5. **Testy** - QA na wszystkich urządzeniach i przeglądarkach
// 6. **Wdrożenie** - Launch + pełne wsparcie techniczne

// ⚡ NASZE PRZEWAGI:
// • Nowoczesne technologie (Next.js 15, React 19, TypeScript)
// • Fokus na SEO i wydajność (Lighthouse 95+ scores)
// • Mobile-first responsywność
// • Integracje AI (ChatGPT, Claude, Gemini)
// • Szybka realizacja (od 1 tygodnia)
// • Przejrzyste ceny (bez ukrytych kosztów)
// • Hosting i domena na pierwszy rok GRATIS
// • Wsparcie po wdrożeniu

// 📞 KONTAKT:
// • Email: kontakt@whiteslope.studio
// • Lokalizacja: Białystok, Polska
// • Dostępność: Odpowiadamy w 24h (dni robocze)
// • Konsultacje: Bezpłatne 30-60 minut

// ⚠️ ZASADY ODPOWIEDZI:
// 1. **PRZEDE WSZYSTKIM** - odpowiadaj KONKRETNIE na pytanie użytkownika, nie całym cennikiem!
// 2. Jeśli user pyta o JEDNĄ usługę (np. "chatbot", "AI", "grafika") - odpowiedz TYLKO o tej usłudze z ceną
// 3. Jeśli user pyta "ile kosztuje X" - podaj cenę X, nie wszystkich usług
// 4. Jeśli pytanie OGÓLNE ("co oferujecie", "jakie usługi") - wtedy możesz pokazać pełną ofertę
// 5. Podawaj DOKŁADNE ceny z oferty (nigdy nie wymyślaj!)
// 6. Jeśli pytanie złożone - sugeruj bezpłatną konsultację
// 7. Bądź pomocny ale NIE nachalny
// 8. Jeśli czegoś nie wiesz - przyznaj się i zaproponuj kontakt
// 9. Odpowiedzi maksymalnie 150-200 słów (chyba że user pyta o szczegóły)
// 10. Używaj emoji aby odpowiedzi były żywe 🚀
// 11. Jeśli user pyta o "taki chatbot jak ty" - entuzjastycznie promuj Chatbot AI (1000 zł)
// 12. **O BLOGU:** Mamy aktywny blog z poradami! Link zawsze w przyciskach.

// 🗣️ PRZYKŁADY DOBRYCH ODPOWIEDZI:

// User: "Ile kosztuje strona internetowa?"
// Ty: "🌐 Mamy 3 pakiety stron internetowych:

// • **Landing Page** - od 1500 zł
//   Jednostronicowa strona idealna na start

// • **Strona biznesowa** - od 3500 zł ⭐ NAJPOPULARNIEJSZA
//   Do 10 podstron + CMS + Blog + SEO

// • **Portal biznesowy** - od 6500 zł
//   Zaawansowany portal z dodatkowymi funkcjami

// 💎 W cenie: hosting, domena, SSL, wsparcie techniczne!

// 📞 Chcesz bezpłatną konsultację i szczegóły?"

// User: "Robicie chatboty AI?" LUB "ile kosztuje taki chatbot jak ty?"
// Ty: "🤖 Tak! I to jest właśnie przykład takiego chatbota!

// 💬 **Chatbot AI - od 1000 zł** (jednorazowo!)
// • Dostępny 24/7 bez przerwy
// • Integracja z ChatGPT/Claude/Gemini
// • Dopasowany do Twojej branży
// • Automatyczne odpowiedzi na FAQ
// • Zbieranie leadów i kontaktów

// 🚀 Mogę być na Twojej stronie i pomagać klientom właśnie tak jak teraz Tobie!

// ✨ Chcesz taki chatbot? To tylko 1000 zł (nie subskrypcja, jednorazowo)!"

// User: "ile kosztuje logo?"
// Ty: "🎨 **Logo - od 700 zł**

// Co dostaniesz:
// • Profesjonalny projekt logo
// • Wersje kolorowe i czarno-białe
// • Formaty: PNG, JPG, PDF, SVG
// • Pliki do druku (CMYK, 300 DPI)
// • 2 rundy poprawek
// • Pełne prawa autorskie

// ⏱️ Realizacja: 1-2 tygodnie

// 💡 Chcesz również kompletną identyfikację wizualną? Mamy pakiety Grafika 2D (800 zł) i 3D (1200 zł)!"

// User: "Macie blog?"
// Ty: "📝 **Tak! Mamy aktywny blog!**

// Znajdziesz tam:
// • Artykuły o SEO i pozycjonowaniu
// • Porady web development
// • Trendy w AI i automatyzacji
// • Tutoriale i case studies

// 🔗 Kliknij przycisk poniżej żeby przejść do bloga!

// 💡 A jeśli chcesz SWOJĄ stronę z blogiem - każda strona biznesowa (3500 zł) ma system CMS z blogiem w standardzie!"

// User: "co oferujecie?" (OGÓLNE PYTANIE)
// Ty: "🚀 **WhiteSlope oferuje kompleksowe usługi digital:**

// 🌐 **Strony internetowe** - od 1500 zł
// 🤖 **Integracje AI** - od 1000 zł  
// ⚡ **Modernizacja stron** - od 800 zł
// 🎨 **Grafika & Design** - od 700 zł
// 📧 **Email Marketing** - od 800 zł

// 💎 W każdym pakiecie: hosting, wsparcie, bez ukrytych kosztów!

// 🎯 **O czym chcesz wiedzieć więcej?**"

// UŻYTKOWNIK PISZE:
// "${userMessage}"

// Odpowiedz jako SLOPUŚ - pomocny, konkretny, profesjonalny AI asystent WhiteSlope. Maksymalnie 200 słów (chyba że pytanie wymaga szczegółów).`;
// }

// // ==========================================
// // 📧 GŁÓWNA FUNKCJA API ENDPOINT
// // ==========================================
// export async function POST(req: NextRequest) {
//   let userMessage = '';
//   const startTime = Date.now();
  
//   try {
//     // 🔍 1. Pobierz IP użytkownika dla rate limiting
//     const ip = 
//       req.headers.get('x-forwarded-for')?.split(',')[0] || 
//       req.headers.get('x-real-ip') || 
//       'unknown';
    
//     // 🛡️ 2. Sprawdź rate limiting
//     if (!checkRateLimit(ip)) {
//       console.warn(`⛔ Rate limit exceeded for IP: ${ip.substring(0, 10)}...`);
//       return Response.json({ 
//         response: "⏸️ **Zbyt wiele zapytań!**\n\nPoczekaj chwilę (5 min) i spróbuj ponownie.\n\n💡 Możesz też skontaktować się bezpośrednio:\n📧 kontakt@whiteslope.studio\n📞 Bezpłatna konsultacja dostępna!",
//         error: "Rate limit exceeded",
//         retryAfter: 300 // 5 minutes in seconds
//       }, { 
//         status: 429,
//         headers: {
//           'Retry-After': '300'
//         }
//       });
//     }

//     // 📨 3. Parsuj i waliduj request body
//     const body = await req.json();
//     const { message } = body;
//     userMessage = message;

//     // Walidacja wiadomości
//     if (!message || typeof message !== 'string') {
//       return Response.json({ 
//         response: "❌ **Nieprawidłowa wiadomość.**\n\nUpewnij się że wiadomość jest tekstem.",
//         error: "Invalid message format"
//       }, { status: 400 });
//     }

//     // Sanityzacja i validacja długości
//     const sanitizedMessage = message.trim();
//     if (sanitizedMessage.length === 0) {
//       return Response.json({ 
//         response: "💬 **Napisz coś!**\n\nJak mogę Ci pomóc?",
//         error: "Empty message"
//       }, { status: 400 });
//     }

//     if (sanitizedMessage.length > 500) {
//       return Response.json({ 
//         response: "📝 **Wiadomość za długa!**\n\nMaksymalnie 500 znaków. Spróbuj skrócić pytanie lub skontaktuj się bezpośrednio: kontakt@whiteslope.studio",
//         error: "Message too long"
//       }, { status: 400 });
//     }

//     console.log(`💬 Nowa wiadomość (${sanitizedMessage.length} znaków): "${sanitizedMessage.substring(0, 50)}..."`);

//     // 🧠 4. Sprawdź cache
//     const cached = getCachedResponse(sanitizedMessage);
//     if (cached) {
//       const responseTime = Date.now() - startTime;
//       console.log(`✅ Cache HIT (${responseTime}ms):`, sanitizedMessage.substring(0, 30));
      
//       return Response.json({
//         response: cached.response,
//         buttons: cached.buttons,
//         cached: true,
//         responseTime
//       });
//     }

//     // 🎯 5. Inteligentny routing - sprawdź czy fallback może odpowiedzieć
//     const fallbackCheck = canAnswerWithFallback(sanitizedMessage);
    
//     if (fallbackCheck.canAnswer) {
//       const responseTime = Date.now() - startTime;
//       console.log(`✅ Fallback response (${responseTime}ms): ${fallbackCheck.category} (confidence: ${fallbackCheck.confidence})`);
      
//       const fallbackResponse = getFallbackResponse(sanitizedMessage);
//       const buttons = generateSmartButtons(sanitizedMessage, fallbackResponse);
      
//       // Cache fallback dla przyszłych requestów
//       setCachedResponse(sanitizedMessage, fallbackResponse, buttons);
      
//       return Response.json({ 
//         response: fallbackResponse,
//         buttons,
//         fallback: true,
//         category: fallbackCheck.category,
//         apiCallSaved: true, // Flag że zaoszczędziliśmy API call
//         responseTime
//       });
//     }

//     // 🤖 6. Złożone pytanie - wywołaj Gemini API
//     if (!process.env.GEMINI_API_KEY) {
//       console.error('❌ Brak GEMINI_API_KEY w zmiennych środowiskowych');
      
//       // Użyj fallback jako ostateczność
//       const fallbackResponse = getFallbackResponse(sanitizedMessage);
//       const buttons = generateSmartButtons(sanitizedMessage, fallbackResponse);
      
//       return Response.json({ 
//         response: fallbackResponse + "\n\n🤖 *Tryb offline - ale widzisz jak dobrze działam!*",
//         buttons,
//         fallback: true,
//         noApiKey: true
//       }, { status: 200 });
//     }

//     console.log('🤖 Wywołuję Gemini API dla złożonego pytania...');
    
//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//     const model = genAI.getGenerativeModel({ 
//       model: "gemini-2.0-flash-exp",
//       generationConfig: {
//         temperature: 0.7, // Trochę kreatywności ale nie za dużo
//         topP: 0.8,
//         topK: 40,
//         maxOutputTokens: 500, // Limit aby nie generować zbyt długich odpowiedzi
//       }
//     });
    
//     const prompt = generateDynamicPrompt(sanitizedMessage);
//     const result = await model.generateContent(prompt);
//     const response = result.response.text();
//     const buttons = generateSmartButtons(sanitizedMessage, response);
    
//     // Cache API response
//     setCachedResponse(sanitizedMessage, response, buttons);
    
//     const responseTime = Date.now() - startTime;
//     console.log(`✅ API response (${responseTime}ms)`);
    
//     return Response.json({ 
//       response,
//       buttons,
//       apiUsed: true,
//       responseTime
//     });
    
//   } catch (error: any) {
//     const responseTime = Date.now() - startTime;
//     console.error('❌ Błąd API:', error?.message || error);
//     console.error('Status:', error?.status);
    
//     // 🆘 Ostateczny fallback przy błędzie
//     try {
//       const fallbackResponse = getFallbackResponse(userMessage);
//       const fallbackButtons = generateSmartButtons(userMessage, fallbackResponse);
      
//       return Response.json({ 
//         response: fallbackResponse + "\n\n🤖 *Tryb offline - ale widzisz jak dobrze działam!*",
//         buttons: fallbackButtons,
//         fallback: true,
//         error: true,
//         responseTime
//       }, { status: 200 });
      
//     } catch (fallbackError) {
//       console.error('❌ Błąd fallback:', fallbackError);
      
//       // Absolutnie ostateczna opcja
//       return Response.json({ 
//         response: "😴 **Chatbot śpi chwilowo...**\n\n💡 Ale widzisz jak dobrze działał? Taki chatbot może być na TWOJEJ stronie bez żadnych limitów!\n\n🚀 Sprawdź naszą ofertę integracji AI:\n📧 kontakt@whiteslope.studio\n💰 Od 1000 zł - chat bot 24/7 dla Twojego biznesu!",
//         buttons: [
//           {
//             text: '🤖 Chcę taki chatbot!',
//             href: '/contact?tab=quote&service=ai-integration',
//             variant: 'primary'
//           },
//           {
//             text: '📞 Bezpłatna konsultacja',
//             href: '/contact?tab=meeting',
//             variant: 'secondary'
//           }
//         ],
//         sleeping: true,
//         responseTime
//       }, { status: 200 });
//     }
//   }
// }