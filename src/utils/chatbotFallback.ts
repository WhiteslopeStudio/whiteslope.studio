/**
 * ⭐ IDEALNY Chatbot Fallback System v2.0
 * 
 * Naprawione problemy:
 * ✅ Kontekstowa analiza (rozróżnia "ile kosztuje" vs "ile włosów")
 * ✅ Normalizacja polskich znaków (ą→a, ę→e, etc.)
 * ✅ Pojedynczy system kategoryzacji (koniec duplikacji)
 * ✅ Hierarchia priorytetów kategorii
 * ✅ Detekcja pytań off-topic
 * ✅ Synonиmy i warianty słów
 * ✅ Centralna konfiguracja cen (DRY)
 * ✅ Lepsze regex bez \b dla polskich znaków
 * ✅ Debug info dla troubleshooting
 */

// ==========================================
// 📋 KONFIGURACJA - Single Source of Truth
// ==========================================

const PRICING_CONFIG = {
  website: {
    landing: 1500,
    business: 3500,
    portal: 6500
  },
  ai: {
    chatbot: 1000,
    contentGen: 2000,
    automation: 1500
  },
  optimization: {
    audit: 800,
    full: 2200,
    migration: 4500
  },
  graphics: {
    logo: 700,
    graphics2d: 800,
    graphics3d: 1200
  },
  emailMarketing: {
    setup: 800
  }
};

const COMPANY_INFO = {
  email: 'kontakt@whiteslope.studio',
  location: 'Białystok, Polska',
  name: 'WhiteSlope'
};

// ==========================================
// 🔧 UTILITY FUNCTIONS
// ==========================================

/**
 * Normalizuje tekst: lowercase + usuwa polskie znaki + trim
 */
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/ą/g, 'a')
    .replace(/ć/g, 'c')
    .replace(/ę/g, 'e')
    .replace(/ł/g, 'l')
    .replace(/ń/g, 'n')
    .replace(/ó/g, 'o')
    .replace(/ś/g, 's')
    .replace(/ź/g, 'z')
    .replace(/ż/g, 'z');
}

/**
 * Sprawdza czy tekst zawiera któreś z keywords (z normalizacją)
 */
function containsAny(text: string, keywords: string[]): boolean {
  const normalized = normalizeText(text);
  return keywords.some(kw => normalized.includes(normalizeText(kw)));
}

/**
 * Sprawdza czy tekst zawiera negację przed keywords
 */
function hasNegation(text: string, keyword: string): boolean {
  const normalized = normalizeText(text);
  const negations = ['nie', 'bez', 'brak', 'no ', "don't", 'not'];
  const kwIndex = normalized.indexOf(normalizeText(keyword));
  
  if (kwIndex === -1) return false;
  
  // Sprawdź 30 znaków przed keyword
  const before = normalized.substring(Math.max(0, kwIndex - 30), kwIndex);
  return negations.some(neg => before.includes(neg));
}

/**
 * ✅ NOWA: Sprawdza czy wiadomość ma kontekst biznesowy WhiteSlope
 */
function hasBusinessContext(message: string): boolean {
  const businessKeywords = [
    // Nazwa firmy
    'whiteslope', 'white slope', 'slopus',
    
    // Usługi core
    'stron', 'website', 'witryn', 'site', 'www', 'web',
    'sklep', 'ecommerce', 'e-commerce', 'shop', 'store', 'sprzedaz',
    'chatbot', 'bot', 'ai', 'sztuczn', 'inteligenc', 'automatyz',
    'grafik', 'logo', 'design', 'projekt', 'branding', 'visual',
    'modernizacj', 'optymalizacj', 'migracj', 'redesign',
    'email', 'newsletter', 'mailerlite', 'kampani',
    
    // Działania biznesowe
    'usług', 'uslug', 'offer', 'service', 'pakiet', 'package',
    'cen', 'koszt', 'prici', 'wycen', 'budzet', 'plat',
    'portfolio', 'realizacj', 'projekt', 'case',
    'konsultacj', 'spotkanie', 'umow', 'meet', 'rozmow',
    'wspolprac', 'cooperat', 'work together',
    
    // Tech terms
    'seo', 'google', 'pozycj', 'ranking', 'search',
    'responsyw', 'mobile', 'szybk', 'wolno', 'speed', 'performance',
    'hosting', 'domen', 'server', 'ssl', 'https',
    'cms', 'wordpress', 'next', 'react'
  ];
  
  return containsAny(message, businessKeywords);
}

// ==========================================
// 🎯 CATEGORY DEFINITIONS
// ==========================================

interface CategoryMatcher {
  id: string;
  priority: number; // 1 = highest, 10 = lowest
  keywords: string[];
  requireBusinessContext?: boolean;
  confidence: number;
  minMatchCount?: number; // Minimum keyword matches needed
}

/**
 * ✅ IDEALNY: Jedna lista kategorii z priorytetami
 * Sortowana według priority (najwyższy priorytet first)
 */
const CATEGORY_MATCHERS: CategoryMatcher[] = [
  // ============================================
  // PRIORITY 1: Bardzo proste interakcje
  // ============================================
  {
    id: 'greetings',
    priority: 1,
    keywords: [
      'czesc', 'cześć', 'hej', 'hey', 'witaj', 'witam', 'hello', 'hi',
      'dzien dobry', 'dobry wieczor', 'siema', 'yo', 'elo', 'siemanko'
    ],
    confidence: 1.0
  },
  {
    id: 'thanks',
    priority: 1,
    keywords: [
      'dziekuj', 'dzięki', 'thanks', 'thank you', 'thx', 'dzieki',
      'super', 'swietnie', 'fajnie', 'ok', 'okej', 'okay', 'git'
    ],
    confidence: 1.0
  },
  {
    id: 'goodbye',
    priority: 1,
    keywords: [
      'pa', 'papa', 'pa pa', 'do widzenia', 'nara', 'bye', 'goodbye',
      'na razie', 'ciao', 'do zobaczenia'
    ],
    confidence: 1.0
  },
  
  // ============================================
  // PRIORITY 2: Konkretne pytania biznesowe
  // ============================================
  {
    id: 'pricing',
    priority: 2,
    keywords: [
      // ✅ NAPRAWIONE: "ile" TYLKO z kontekstem biznesowym
      'cen', 'ceny', 'cena', 'cennik',
      'koszt', 'koszty', 'kosztuje',
      'ile kosztuje', 'ile wynosi', 'ile placę', 'ile zaplacę',
      'prici', 'price', 'pricing',
      'budzet', 'budget',
      'plat', 'payment', 'zaplacic',
      'kwota', 'tani', 'tanie', 'drogi', 'drogie',
      'oplat', 'raty', 'rate'
    ],
    requireBusinessContext: true, // ✅ KLUCZOWE!
    confidence: 0.9
  },
  {
    id: 'ai_chat',
    priority: 2,
    keywords: [
      'chatbot', 'chat bot', 'bot',
      'ai', 'sztuczn', 'inteligenc', 'artificial intelligence',
      'automatyz', 'automation', 'automat',
      'taki jak ty', 'taki chatbot', 'podobn', 'jak slopus'
    ],
    confidence: 0.85
  },
  {
    id: 'contact',
    priority: 2,
    keywords: [
      'kontakt', 'contact',
      'spotkanie', 'meeting', 'meet',
      'rozmow', 'call', 'talk',
      'telefon', 'phone', 'tel',
      'mail', 'email', 'e-mail', 'adres email',
      'lokalizacj', 'location', 'gdzie jestescie',
      'umow', 'appointment', 'schedule'
    ],
    confidence: 0.9
  },
  
  // ============================================
  // PRIORITY 3: Kategorie usług
  // ============================================
  {
    id: 'services',
    priority: 3,
    keywords: [
      'usług', 'uslug', 'usluga', 'uslugi',
      'offer', 'service', 'services',
      'co robi', 'co oferuj', 'co mozecie', 'what do you do',
      'specjalizuj', 'specialize',
      'zakres', 'scope', 'czym się zajmuj'
    ],
    confidence: 0.85
  },
  {
    id: 'graphics',
    priority: 3,
    keywords: [
      'grafik', 'graphic', 'design',
      'logo', 'logotyp', 'brand',
      '2d', '3d', 'dwuwymiar', 'trojwymiar',
      'ilustracj', 'illustration',
      'projekt graficzny', 'visual', 'wizualiz',
      'mockup', 'render'
    ],
    confidence: 0.8
  },
  {
    id: 'optimization',
    priority: 3,
    keywords: [
      'modernizacj', 'modernization',
      'optymalizacj', 'optimization', 'optimize',
      'migracj', 'migration', 'migrate',
      'popraw', 'improve', 'ulepszy', 'upgrade',
      'wolno', 'slow', 'szybk', 'fast', 'speed',
      'stara strona', 'old site', 'przestarzal',
      'redesign', 'przeprojekt', 'odnow'
    ],
    confidence: 0.8
  },
  {
    id: 'emailMarketing',
    priority: 3,
    keywords: [
      'email marketing', 'mail marketing',
      'newsletter', 'mailing',
      'mailerlite', 'mailer lite',
      'wysylk', 'campaign', 'kampani',
      'automatyzacj mail', 'email automation'
    ],
    confidence: 0.8
  },
  
  // ============================================
  // PRIORITY 4: Info pages
  // ============================================
  {
    id: 'portfolio',
    priority: 4,
    keywords: [
      'portfolio', 'realizacj', 'projekt',
      'przyklad', 'example', 'case', 'case study',
      'wieslawsk', 'patryk', 'kulesza',
      'wasze prace', 'wasze stron', 'co zrobiliscie',
      'pokaz', 'show me', 'macie jakies',
      'reference', 'referencj'
    ],
    confidence: 0.85
  },
  {
    id: 'blog',
    priority: 4,
    keywords: [
      'blog', 'artykul', 'article',
      'porad', 'guide', 'tutorial',
      'wpis', 'post', 'publikacj',
      'macie blog', 'jest blog', 'prowadzicie blog',
      'czytac', 'read'
    ],
    confidence: 0.9
  },
  {
    id: 'process',
    priority: 4,
    keywords: [
      'proces', 'process',
      'jak pracuj', 'how do you work',
      'wspolprac', 'cooperation', 'collaborate',
      'etapy', 'stages', 'krok', 'steps',
      'jak wyglada', 'how does it look',
      'procedura', 'procedure', 'metodyka', 'methodology'
    ],
    confidence: 0.85
  },
  
  // ============================================
  // PRIORITY 10: Default/General
  // ============================================
  {
    id: 'general',
    priority: 10,
    keywords: [], // Matches anything
    confidence: 0.5
  }
];

// ==========================================
// 🎯 MAIN CATEGORIZATION FUNCTION
// ==========================================

export interface FallbackCheck {
  canAnswer: boolean;
  category?: string;
  confidence: number;
  reason?: string;
  debug?: any;
}

export function canAnswerWithFallback(message: string): FallbackCheck {
  const msg = normalizeText(message);
  const wordCount = msg.split(/\s+/).length;
  const hasBizContext = hasBusinessContext(message);
  
  // Debug info
  const debug = {
    wordCount,
    hasBizContext,
    normalized: msg.substring(0, 50) + '...'
  };
  
  // ============================================
  // 1️⃣ BARDZO KRÓTKIE POWITANIA/POŻEGNANIA
  // Zawsze fallback, nawet bez kontekstu
  // ============================================
  if (wordCount <= 3) {
    for (const matcher of CATEGORY_MATCHERS) {
      if (['greetings', 'thanks', 'goodbye'].includes(matcher.id)) {
        if (containsAny(message, matcher.keywords)) {
          return {
            canAnswer: true,
            category: matcher.id,
            confidence: matcher.confidence,
            reason: 'simple_interaction',
            debug
          };
        }
      }
    }
  }
  
  // ============================================
  // 2️⃣ PYTANIA BIZNESOWE
  // Sprawdź wszystkie kategorie wg priorytetu
  // ============================================
  let bestMatch = {
    category: '',
    confidence: 0,
    matchCount: 0,
    priority: 999
  };
  
  for (const matcher of CATEGORY_MATCHERS) {
    // Skip greeting/thanks/goodbye (już sprawdzone)
    if (['greetings', 'thanks', 'goodbye', 'general'].includes(matcher.id)) {
      continue;
    }
    
    // Jeśli kategoria wymaga kontekstu biznesowego
    if (matcher.requireBusinessContext && !hasBizContext) {
      continue; // ✅ KLUCZOWE: Skip pricing bez kontekstu!
    }
    
    // Count keyword matches
    const matchCount = matcher.keywords.filter(kw => 
      msg.includes(normalizeText(kw)) && !hasNegation(message, kw)
    ).length;
    
    if (matchCount > 0) {
      // Check minimum match count
      const minMatch = matcher.minMatchCount || 1;
      if (matchCount < minMatch) continue;
      
      // Oblicz adjusted confidence
      const adjustedConfidence = Math.min(
        matcher.confidence + (matchCount - 1) * 0.05,
        0.95
      );
      
      // Update best match (priorytet > confidence > matchCount)
      const isBetter = 
        matcher.priority < bestMatch.priority ||
        (matcher.priority === bestMatch.priority && adjustedConfidence > bestMatch.confidence) ||
        (matcher.priority === bestMatch.priority && adjustedConfidence === bestMatch.confidence && matchCount > bestMatch.matchCount);
      
      if (isBetter) {
        bestMatch = {
          category: matcher.id,
          confidence: adjustedConfidence,
          matchCount,
          priority: matcher.priority
        };
      }
    }
  }
  
  // ============================================
  // 3️⃣ DECYZJA: CZY FALLBACK MOŻE ODPOWIEDZIEĆ?
  // ============================================
  
  // Mamy bardzo dobry match i pytanie jest proste
  if (bestMatch.confidence >= 0.85 && wordCount <= 10) {
    return {
      canAnswer: true,
      category: bestMatch.category,
      confidence: bestMatch.confidence,
      reason: 'high_confidence_simple_question',
      debug: { ...debug, matchCount: bestMatch.matchCount }
    };
  }
  
  // Dobry match i pytanie średnio długie
  if (bestMatch.confidence >= 0.9 && wordCount <= 15) {
    return {
      canAnswer: true,
      category: bestMatch.category,
      confidence: bestMatch.confidence * 0.95,
      reason: 'very_high_confidence_medium_question',
      debug: { ...debug, matchCount: bestMatch.matchCount }
    };
  }
  
  // Match średni ale pytanie bardzo krótkie
  if (bestMatch.confidence >= 0.75 && wordCount <= 5) {
    return {
      canAnswer: true,
      category: bestMatch.category,
      confidence: bestMatch.confidence * 0.9,
      reason: 'medium_match_very_short',
      debug: { ...debug, matchCount: bestMatch.matchCount }
    };
  }
  
  // ============================================
  // 4️⃣ WSZYSTKO INNE → UŻYJ API
  // ============================================
  
  // ✅ Off-topic, złożone, lub niepewne → API
  // Gemini lepiej poradzi sobie z:
  // - Grzecznym odmówieniem na pytania off-topic
  // - Złożonymi pytaniami biznesowymi
  // - Edge cases
  
  return {
    canAnswer: false,
    confidence: 0.0,
    reason: hasBizContext 
      ? 'complex_business_question_use_api' 
      : 'off_topic_let_gemini_handle',
    debug
  };
}

// ==========================================
// 💬 FALLBACK RESPONSES
// ==========================================

export const fallbackResponses = {
  greetings: [
    `👋 **Cześć! Miło Cię poznać!**\n\n💡 Jestem SLOPUŚ - AI chatbot ${COMPANY_INFO.name}!\n\n🚀 Pomagam klientom znaleźć idealne rozwiązania technologiczne. Zapytaj mnie o:\n• Strony internetowe\n• Integracje AI (takie jak ja!)\n• Grafiki i design\n• Modernizację stron\n\n💬 **Jak mogę Ci pomóc?**`,
    
    `🎉 **Witaj w ${COMPANY_INFO.name}!**\n\n✨ Jestem Twoim AI przewodnikiem po naszej ofercie!\n\n🏢 **Specjalizujemy się w:**\n• Nowoczesnych stronach internetowych (Next.js, React)\n• Chatbotach AI - takich jak ja! 🤖\n• SEO i optymalizacji wydajności\n• Email marketingu i automatyzacji\n\n📞 **Co Cię interesuje?**`,
    
    `👨‍💻 **Hej! Jestem SLOPUŚ!**\n\n🌟 Pokazuję czym zajmuje się ${COMPANY_INFO.name} i pomagam znaleźć rozwiązanie dla Twojego biznesu.\n\n🎯 **Możesz mnie zapytać o:**\n✅ Cennik i pakiety\n✅ Nasze projekty\n✅ Proces współpracy\n✅ Konkretne usługi\n\n💡 **Śmiało pytaj - jestem tu dla Ciebie!**`
  ],
  
  thanks: [
    "😊 **Cieszę się, że mogłem pomóc!**\n\n💡 Jeśli masz więcej pytań, śmiało pisz!\n\n📞 Możesz też umówić **bezpłatną konsultację** (30-60 min) gdzie omówimy Twój projekt szczegółowo.\n\n✨ **Jestem tu dla Ciebie!**",
    
    `🎉 **Nie ma za co! To moja praca!**\n\n🤖 Jestem dostępny **24/7** i zawsze chętny do pomocy.\n\n💼 Jeśli zdecydujesz się na projekt z ${COMPANY_INFO.name} - taki chatbot jak ja może być również na **Twojej stronie**!\n\n💬 **Potrzebujesz czegoś jeszcze?**`,
    
    "🙌 **Miło mi było pomóc!**\n\n✨ Pamiętaj:\n• Bezpłatne konsultacje zawsze dostępne\n• Wycena projektu w 24h\n• Żadnych ukrytych kosztów\n\n🚀 **Gotowy na rozmowę o projekcie?**"
  ],
  
  goodbye: [
    `👋 **Do zobaczenia!**\n\n💡 Pamiętaj - jestem tu dla Ciebie gdy będziesz gotowy na rozmowę o projekcie.\n\n📧 ${COMPANY_INFO.email}\n📞 Bezpłatna konsultacja: 30-60 min\n\n🚀 **${COMPANY_INFO.name} - Twój partner w cyfrowej transformacji!**`,
    
    `😊 **Miło było rozmawiać!**\n\n✨ Gdy będziesz gotowy:\n📞 Umów konsultację na stronie\n📧 Napisz: ${COMPANY_INFO.email}\n💬 Wróć do mnie z pytaniami\n\n🎯 **Do usłyszenia!**`,
    
    `🎊 **Pa pa!**\n\n💡 **Pro tip:** Możesz wrócić tutaj kiedy chcesz - jestem dostępny 24/7!\n\n🤖 Taki chatbot może być też na **Twojej stronie**. Od ${PRICING_CONFIG.ai.chatbot} zł!\n\n✨ **Do zobaczenia!**`
  ],

  services: [
    `🚀 **Świetne pytanie! Oto nasza pełna oferta:**\n\n🌐 **Strony internetowe:** od ${PRICING_CONFIG.website.landing} zł\n• Landing pages, strony biznesowe, portale\n\n🤖 **Integracje AI:** od ${PRICING_CONFIG.ai.chatbot} zł\n• Chatboty (jak ja!), automatyzacja, AI tools\n\n⚡ **Modernizacja:** od ${PRICING_CONFIG.optimization.audit} zł\n• Optymalizacja, migracja, redesign\n\n🎨 **Grafika:** od ${PRICING_CONFIG.graphics.logo} zł\n• Logo, grafiki 2D/3D, branding\n\n📧 **Email Marketing:** od ${PRICING_CONFIG.emailMarketing.setup} zł\n• MailerLite, automatyzacja, kampanie\n\n💰 **Co Cię najbardziej interesuje?**`,
    
    `🎯 **${COMPANY_INFO.name} oferuje kompleksowe usługi digital:**\n\n✨ **Web Development:**\n• Next.js, React, TypeScript\n• Responsywne i szybkie\n• SEO-friendly od podstaw\n\n🧠 **Sztuczna Inteligencja:**\n• Chatboty conversational\n• Automatyzacja procesów\n• Generowanie treści AI\n\n🎨 **Design & Grafika:**\n• Projektowanie logo i branding\n• Grafiki 2D i wizualizacje 3D\n• Materiały marketingowe\n\n📋 **Sprawdź szczegóły i ceny!**`,
    
    `✨ **${COMPANY_INFO.name} - Twój partner w cyfrowej transformacji!**\n\n🏆 **Nasze specjalizacje:**\n\n1️⃣ **Strony WWW** - nowoczesne, szybkie, SEO\n2️⃣ **AI & Automatyzacja** - chatboty, integracje\n3️⃣ **Modernizacja** - odśwież starą stronę\n4️⃣ **Grafika** - logo, mockupy, visual identity\n5️⃣ **Email Marketing** - kampanie i automatyzacja\n\n🤝 **Bezpłatna konsultacja 30-60 min!**\n\n💡 O co chcesz zapytać szczegółowo?`
  ],
  
  pricing: [
    `💰 **Cennik ${COMPANY_INFO.name} 2025:**\n\n🌱 **STRONY INTERNETOWE:**\n• Landing Page: od **${PRICING_CONFIG.website.landing} zł**\n• Strona biznesowa: od **${PRICING_CONFIG.website.business} zł** ⭐\n• Portal biznesowy: od **${PRICING_CONFIG.website.portal} zł**\n\n⚡ **MODERNIZACJA:**\n• Audyt + Quick Fixes: od **${PRICING_CONFIG.optimization.audit} zł**\n• Pełna optymalizacja: od **${PRICING_CONFIG.optimization.full} zł**\n• Migracja + Redesign: od **${PRICING_CONFIG.optimization.migration} zł**\n\n🤖 **AI & AUTOMATYZACJA:**\n• Chatbot AI: od **${PRICING_CONFIG.ai.chatbot} zł**\n• Generowanie treści AI: od **${PRICING_CONFIG.ai.contentGen} zł**\n• Automatyzacja procesów: od **${PRICING_CONFIG.ai.automation} zł**\n\n🎨 **GRAFIKA:**\n• Logo: od **${PRICING_CONFIG.graphics.logo} zł**\n• Grafika 2D: od **${PRICING_CONFIG.graphics.graphics2d} zł**\n• Grafika 3D: od **${PRICING_CONFIG.graphics.graphics3d} zł**\n\n📧 **Email Marketing:** od **${PRICING_CONFIG.emailMarketing.setup} zł**\n\n✅ W cenach: hosting, domena (1 rok), SSL, wsparcie!\n\n📞 **Bezpłatna konsultacja - umówimy się?**`,
    
    `📊 **Nasze pakiety i ceny:**\n\n💎 **NAJPOPULARNIEJSZE:**\n\n🥇 **Strona biznesowa - ${PRICING_CONFIG.website.business} zł**\n• Do 10 podstron + CMS + Blog\n• SEO, responsywność, wsparcie 6 mies.\n\n🥈 **Chatbot AI - ${PRICING_CONFIG.ai.chatbot} zł**\n• Taki jak ja! 24/7 obsługa klientów\n• Integracja ChatGPT/Claude/Gemini\n\n🥉 **Modernizacja - ${PRICING_CONFIG.optimization.full} zł**\n• 3x szybsza strona\n• Nowoczesne technologie\n• Poprawa SEO\n\n🎨 **Grafika & Logo - ${PRICING_CONFIG.graphics.logo} zł**\n• Profesjonalne logo\n• Wersje do druku i web\n\n📧 **MailerLite Setup - ${PRICING_CONFIG.emailMarketing.setup} zł**\n• Automatyczne newslettery\n• Kampanie email marketing\n\n💡 **Wszystkie ceny bez VAT. Płatność po etapach!**\n\n🎯 **O czym chcesz wiedzieć więcej?**`,
    
    `🏷️ **Przejrzyste ceny ${COMPANY_INFO.name}:**\n\n✨ **Strony WWW:**\nOd ${PRICING_CONFIG.website.landing} zł (landing) do ${PRICING_CONFIG.website.portal} zł (portal)\n\n🤖 **Integracje AI:**\nOd ${PRICING_CONFIG.ai.chatbot} zł (chatbot) do ${PRICING_CONFIG.ai.contentGen} zł (generowanie treści)\n\n⚡ **Modernizacja:**\nOd ${PRICING_CONFIG.optimization.audit} zł (audyt) do ${PRICING_CONFIG.optimization.migration} zł (pełna migracja)\n\n🎨 **Grafika:**\nOd ${PRICING_CONFIG.graphics.logo} zł (logo) do ${PRICING_CONFIG.graphics.graphics3d} zł (3D)\n\n📧 **Email Marketing:**\nOd ${PRICING_CONFIG.emailMarketing.setup} zł (setup + integracja)\n\n🎁 **W KAŻDYM PAKIECIE:**\n✅ Hosting i domena na pierwszy rok\n✅ Certyfikat SSL\n✅ Wsparcie techniczne\n✅ Bez ukrytych kosztów\n✅ Płatność po etapach\n\n📞 **Chcesz szczegółową wycenę dla Twojego projektu?**`
  ],
  
  ai_chat: [
    `🤖 **Widzę, że interesuje Cię AI - świetny wybór!**\n\n✨ **Chatbot jak ja może:**\n• Obsłużyć klientów **24/7** bez przerwy\n• Odpowiadać na FAQ natychmiastowo\n• Zbierać leady i kontakty\n• Umówić konsultacje i spotkania\n• Przekierować do właściwych działów\n\n🎯 **Efekt dla Twojego biznesu:**\n📈 +40% więcej konwersji\n💰 -60% czasu obsługi\n😊 Zadowoleni klienci (dostępność non-stop)\n\n💰 **Koszt:** tylko **${PRICING_CONFIG.ai.chatbot} zł** (jednorazowo, nie subskrypcja!)\n⏱️ **Wdrożenie:** 1-2 tygodnie\n\n🚀 **Chcesz taki chatbot na swojej stronie?**`,
    
    `🧠 **AI to przyszłość obsługi klienta!**\n\n💬 **Taki chatbot jak ja to:**\n\n✅ **24/7 Dostępność**\n• Pracuję bez przerwy, weekendów, świąt\n• Klienci dostają odpowiedzi natychmiast\n\n✅ **Inteligencja**\n• ChatGPT, Claude lub Gemini pod spodem\n• Rozumiem kontekst i naturalne pytania\n• Dopasowuję się do Twojej branży\n\n✅ **Integracje**\n• Formularze kontaktowe\n• CRM (HubSpot, Salesforce)\n• Email marketing\n• Google Analytics\n\n💰 **Tylko ${PRICING_CONFIG.ai.chatbot} zł** - jednorazowa płatność!\n⏱️ **Wdrożenie:** 1-2 tygodnie\n\n🤝 **Umówimy prezentację?**`,
    
    `💡 **Integracja AI dla Twojej firmy:**\n\n🤖 **Chatbot AI - ${PRICING_CONFIG.ai.chatbot} zł**\n• Taki jak ja, dostępny 24/7\n• Personalizowany dla Twojej branży\n• Obsługa w języku polskim\n• Natychmiastowa instalacja\n\n🎯 **Inne usługi AI:**\n\n🖼️ **Generowanie grafik AI** - ${PRICING_CONFIG.ai.contentGen} zł\n• Obrazy z tekstu (Stable Diffusion)\n• Edycja i optymalizacja\n\n📄 **Automatyzacja dokumentów** - ${PRICING_CONFIG.ai.automation} zł\n• OCR i ekstrakcja danych\n• Automatyczne przetwarzanie PDF\n• Oszczędność dziesiątek godzin!\n\n🚀 **Chcesz chatbota? To tylko ${PRICING_CONFIG.ai.chatbot} zł!**`
  ],
  
  contact: [
    `📞 **Skontaktuj się z nami!**\n\n📧 **Email:** ${COMPANY_INFO.email}\n🌍 **Lokalizacja:** ${COMPANY_INFO.location}\n\n⏰ **Odpowiadamy:**\n• Email: w ciągu 24 godzin (dni robocze)\n• Formularze: tego samego dnia\n\n🎯 **Bezpłatna konsultacja:**\n✅ 30-60 minut rozmowy\n✅ Analiza Twoich potrzeb\n✅ Wstępna wycena\n✅ Bez zobowiązań!\n\n👆 **Użyj formularza kontaktowego na stronie!**\n\n💡 **Lub kliknij przycisk poniżej:**`,
    
    `🤝 **Porozmawiajmy o Twoim projekcie!**\n\n✨ **Bezpłatna konsultacja obejmuje:**\n\n1️⃣ **Analiza potrzeb** (15 min)\n• Twoje cele biznesowe\n• Grupa docelowa\n• Obecne rozwiązania\n\n2️⃣ **Propozycja rozwiązania** (20 min)\n• Nasze rekomendacje\n• Stack technologiczny\n• Harmonogram\n\n3️⃣ **Wycena i Q&A** (15 min)\n• Szczegółowa wycena\n• Odpowiedzi na pytania\n• Następne kroki\n\n📧 **${COMPANY_INFO.email}**\n📅 **Wybierz termin na stronie**\n\n🎁 **Bonus:** Darmowy audit obecnej strony!`,
    
    `🚀 **Rozpocznijmy współpracę!**\n\n📋 **3 sposoby kontaktu:**\n\n1️⃣ **Formularz online** ⚡ (najszybszy)\n• Wypełnij na stronie\n• Odpowiemy tego samego dnia\n\n2️⃣ **Email bezpośredni** 📧\n• ${COMPANY_INFO.email}\n• Odpowiedź w 24h\n\n3️⃣ **Umów konsultację** 📞\n• Bezpłatne 30-60 min\n• Online lub ${COMPANY_INFO.location}\n\n✨ **Po kontakcie:**\n📊 Dostaniesz szczegółową wycenę w 24-48h\n📅 Ustalimy harmonogram projektu\n🤝 Zaczniemy współpracę!\n\n💡 **Kliknij przycisk kontaktu poniżej!**`
  ],
  
  graphics: [
    `🎨 **Nasze usługi graficzne:**\n\n💎 **Logo & Branding** - od ${PRICING_CONFIG.graphics.logo} zł\n• Profesjonalne logo od podstaw\n• Wersje kolorowe i mono\n• Pliki źródłowe (SVG, PNG, PDF)\n• 2 rundy poprawek\n\n📐 **Grafika 2D** - od ${PRICING_CONFIG.graphics.graphics2d} zł\n• Ulotki, plakaty, wizytówki\n• Grafiki social media\n• Banery reklamowe\n• Materiały drukowane\n\n🎭 **Grafika 3D** - od ${PRICING_CONFIG.graphics.graphics3d} zł\n• Mockupy produktów\n• Wizualizacje 3D\n• Rendering wysokiej jakości\n• Prezentacje produktów\n\n✨ **W każdym pakiecie:**\n✅ Pliki do druku (CMYK, 300 DPI)\n✅ Pliki do web (RGB, optimized)\n✅ Pełne prawa autorskie\n✅ Dokumentacja techniczna\n\n🎨 **Chcesz odświeżyć wizerunek marki?**`,
    
    `🖌️ **Projektowanie graficzne ${COMPANY_INFO.name}:**\n\n🎯 **Co tworzymy:**\n\n🏷️ **Identyfikacja wizualna:**\n• Logo i logotypy\n• Brand guidelines\n• Color palette i typografia\n\n📱 **Social Media:**\n• Posty i stories (Instagram, Facebook)\n• Okładki i banery\n• Szablony branded content\n\n🎨 **Marketing:**\n• Ulotki i broszury\n• Plakaty reklamowe\n• Rollup i standy\n\n💼 **Korporacyjne:**\n• Wizytówki i papier firmowy\n• Prezentacje PowerPoint\n• Materiały konferencyjne\n\n💰 **Ceny:** od ${PRICING_CONFIG.graphics.logo} zł\n⏱️ **Realizacja:** 1-3 tygodni\n\n📞 **Umówimy briefing?**`,
    
    `✨ **Grafika i design na najwyższym poziomie!**\n\n🎨 **Nasze portfolio:**\n• Wiesławski Studio - kompletna identyfikacja\n• Patryk Kulesza - grafiki edukacyjne\n• Dziesiątki logo i brandingów\n\n💡 **Proces pracy:**\n\n1️⃣ **Brief** (bezpłatny)\n• Poznajemy Twoją markę\n• Analizujemy konkurencję\n• Ustalamy kierunek\n\n2️⃣ **Koncepcje** (3-5 propozycji)\n• Różne style i podejścia\n• Mockupy i wizualizacje\n\n3️⃣ **Poprawki** (2 rundy)\n• Dopracowanie szczegółów\n• Finalizacja\n\n4️⃣ **Delivery**\n• Wszystkie formaty\n• Pliki źródłowe\n• Dokumentacja\n\n💰 **Od ${PRICING_CONFIG.graphics.logo} zł** (logo) do **${PRICING_CONFIG.graphics.graphics3d} zł** (3D)\n\n🚀 **Rozpocznijmy projekt!**`
  ],
  
  optimization: [
    `⚡ **Modernizacja strony internetowej:**\n\n🔧 **Audyt + Quick Fixes** - od ${PRICING_CONFIG.optimization.audit} zł\n• Pełny audyt techniczny\n• Diagnoza problemów\n• Naprawki krytycznych błędów\n• Raport szczegółowy\n⏱️ Realizacja: 1 tydzień\n\n🚀 **Pełna optymalizacja** - od ${PRICING_CONFIG.optimization.full} zł ⭐\n• Migracja na nowoczesne technologie\n• **3x szybsza strona** (gwarantowane!)\n• Kompletna optymalizacja SEO\n• Responsywność mobile/tablet/desktop\n• Zabezpieczenia i backup\n⏱️ Realizacja: 2-3 tygodnie\n\n💎 **Migracja + Redesign** - od ${PRICING_CONFIG.optimization.migration} zł\n• Nowy, nowoczesny design\n• Migracja treści bez utraty SEO\n• Nowa architektura informacyjna\n• UX/UI najnowsze trendy\n• Wsparcie 6 miesięcy\n⏱️ Realizacja: 4-5 tygodni\n\n📊 **Chcesz bezpłatny audyt swojej strony?**`,
    
    `🔥 **Twoja strona jest wolna? Przestarzała?**\n\n💡 **Pomożemy!**\n\n⚡ **Problemy które rozwiązujemy:**\n❌ Strona ładuje się 5+ sekund\n❌ Źle wygląda na mobile\n❌ Niska pozycja w Google\n❌ Przestarzały design\n❌ Brak zabezpieczeń (SSL)\n❌ Problemy z hostingiem\n\n✅ **Po naszej modernizacji:**\n🚀 Strona ładuje się <2 sekundy\n📱 Idealnie działa na wszystkich urządzeniach\n📈 Lepsza pozycja w Google (SEO)\n✨ Nowoczesny, profesjonalny wygląd\n🔒 Pełne zabezpieczenia\n☁️ Stabilny, szybki hosting\n\n💰 **Już od ${PRICING_CONFIG.optimization.audit} zł!**\n\n📞 **Darmowy audyt - sprawdzimy co można poprawić!**`,
    
    `🎯 **Modernizacja = Więcej klientów!**\n\n📊 **Statystyki mówią:**\n• 53% użytkowników opuszcza stronę ładującą się >3s\n• 60% ruchu to urządzenia mobilne\n• Wolna strona = stracone pieniądze\n\n⚡ **Nasza modernizacja:**\n\n🏆 **Wydajność:**\n• Lighthouse score 95+\n• Google PageSpeed: zielone wartości\n• Core Web Vitals: passed\n\n📱 **Responsywność:**\n• Mobile-first approach\n• Testujemy na 20+ urządzeniach\n• Touch-friendly interface\n\n🔍 **SEO:**\n• Optymalizacja meta tagów\n• Structured data (schema.org)\n• Sitemap i robots.txt\n• Analityka (GA4)\n\n💰 **Pakiety:** ${PRICING_CONFIG.optimization.audit} - ${PRICING_CONFIG.optimization.migration} zł\n📈 **ROI:** Średnio +40% więcej konwersji!\n\n🚀 **Gotowy na upgrade?**`
  ],
  
  emailMarketing: [
    `📧 **Email Marketing z MailerLite:**\n\n📬 **Setup i Integracja** - od ${PRICING_CONFIG.emailMarketing.setup} zł\n\n✨ **Co dostaniesz:**\n• Integracja z MailerLite\n• Setup formularzy zapisu\n• Automatyczne newslettery\n• Segmentacja kontaktów\n• Responsywne szablony email\n• Kampanie welcome series\n\n📊 **Analytics w pakiecie:**\n• Tracking otwarć i kliknięć\n• Raporty konwersji\n• A/B testing\n• Heat mapy\n\n🎯 **Korzyści dla biznesu:**\n📈 +30% więcej konwersji\n💰 ROI: 42:1 (średnio w branży)\n😊 Lepsze relacje z klientami\n🤖 Automatyzacja oszczędza czas\n\n💌 **Gotowy zwiększyć sprzedaż?**`,
    
    `💌 **Automatyzacja Email Marketingu:**\n\n🎯 **Co możemy zautomatyzować:**\n\n1️⃣ **Welcome Series**\n• Email powitalny natychmiast\n• Seria 3-5 emaili wprowadzających\n• Budowanie relacji od pierwszego dnia\n\n2️⃣ **Abandoned Cart**\n• Przypomnienie o koszyku (1h, 24h, 3dni)\n• Personalizowane oferty\n• Odzyskaj 15-20% porzuconych koszyków!\n\n3️⃣ **Re-engagement**\n• Reaktywacja nieaktywnych subskrybentów\n• Specjalne oferty powrotne\n\n4️⃣ **Post-Purchase**\n• Podziękowanie za zakup\n• Prośba o review\n• Cross-sell i up-sell\n\n💰 **Koszt:** od ${PRICING_CONFIG.emailMarketing.setup} zł (setup) + MailerLite ~50 zł/mies.\n⏱️ **Wdrożenie:** 1-2 tygodni\n\n📈 **ROI:** 4200% średnio w email marketingu!\n\n🚀 **Rozpocznijmy kampanię!**`,
    
    `📬 **Newsletter i kampanie email:**\n\n✨ **Dlaczego email marketing?**\n\n💰 **Najlepszy ROI w digital marketing:**\n• $42 zwrotu na każdego $1 wydanego\n• 4x skuteczniejszy niż social media\n• Bezpośredni kontakt z klientem\n\n🎯 **Nasze usługi:**\n\n📧 **MailerLite Setup** - ${PRICING_CONFIG.emailMarketing.setup} zł\n• Integracja z Twoją stroną\n• Formularze i pop-upy\n• Template design\n• Automatyzacje basic\n\n📈 **Kampanie Advanced** - 1500 zł\n• Zaawansowane automatyzacje\n• Segmentacja dynamiczna\n• A/B testing kampanii\n• Integracja z CRM\n\n📊 **Zarządzanie miesięczne** - od 500 zł/mies.\n• Projektowanie newsletterów\n• Copywriting\n• Wysyłki i monitoring\n• Raporty i optymalizacja\n\n💡 **Chcesz zobaczyć przykładową kampanię?**`
  ],
  
  blog: [
    "📝 **Tak! Mamy aktywny blog z wartościowymi treściami!**\n\n✨ **Na blogu znajdziesz:**\n• Artykuły o SEO i pozycjonowaniu\n• Poradniki web development\n• Trendy w AI i automatyzacji\n• Case studies i realizacje\n• Tutoriale krok po kroku\n\n🎯 **Najnowsze artykuły:**\n• \"SEO w 2025 - Co musisz wiedzieć\"\n• \"Responsywny design - Dlaczego mobile first\"\n• \"Szybkość ładowania - Jak poprawić o 300%\"\n\n🔗 **Kliknij przycisk poniżej** żeby przejść do bloga!\n\n💡 **Chcesz SWOJĄ stronę z blogiem?** Każda strona biznesowa (3500 zł) ma CMS z blogiem w standardzie!",
    
    `📚 **${COMPANY_INFO.name} Blog - wiedza o web development i AI!**\n\n🔥 **Popularne tematy:**\n\n🔍 **SEO & Marketing:**\n• Jak wypozycjonować stronę w Google\n• Meta tagi i structured data\n• Content marketing strategies\n\n💻 **Web Development:**\n• Next.js best practices\n• Performance optimization\n• Responsive design tips\n\n🤖 **AI & Automatyzacja:**\n• Implementacja chatbotów\n• AI w biznesie\n• Automatyzacja procesów\n\n📖 **Odwiedź blog** - kliknij przycisk poniżej!\n\n✨ Potrzebujesz strony z profesjonalnym blogiem? Od ${PRICING_CONFIG.website.business} zł!`,
    
    `🎓 **Blog ${COMPANY_INFO.name} = praktyczna wiedza!**\n\n💡 **Dlaczego warto śledzić nasz blog:**\n\n1️⃣ **Aktualne trendy**\n• Nowości w web dev\n• Zmiany w algorytmach Google\n• Nowe technologie AI\n\n2️⃣ **Praktyczne porady**\n• Step-by-step tutoriale\n• Code snippets\n• Real-world examples\n\n3️⃣ **Case Studies**\n• Nasze realizacje\n• Rezultaty projektów\n• Lessons learned\n\n🚀 **Kliknij przycisk** żeby przejść do bloga!\n\n📞 Lub umów konsultację - opowiemy więcej!`
  ],
  
  portfolio: [
    "📂 **Nasze realizacje:**\n\n🎵 **Wiesławski Studio** (2024)\n• Strona dla profesjonalnego studia muzycznego\n• **Rezultat:** Pierwsze zapytania po 24h!\n• Link: wieslawski.studio\n• Stack: Next.js, TypeScript, SEO\n\n📚 **Patryk Kulesza - Korepetycje** (2024)\n• Platforma edukacyjna online\n• **Rezultat:** Oferta pracy po 3 dniach!\n• Stack: React, responsywny design\n\n🤖 **Ten chatbot!**\n• Proof-of-concept integracji AI\n• Działa 24/7, odpowiada na pytania\n• Stack: Next.js + Gemini AI\n\n💼 **I wiele innych...**\n• E-commerce dla lokalnego biznesu\n• Portale korporacyjne\n• Landing pages z konwersją 8%+\n\n📊 **Średnie rezultaty klientów:**\n• +40% więcej zapytań\n• +25% konwersji\n• Lighthouse 95+ scores\n\n🚀 **Chcesz być następny?**",
    
    `🏆 **Case Studies ${COMPANY_INFO.name}:**\n\n📈 **Projekt 1: Studio Muzyczne**\n• **Challenge:** Brak obecności online\n• **Solution:** Nowoczesna strona + SEO\n• **Results:** \n  - Pierwsze leady w 24h\n  - 200+ wizyt/tydzień\n  - Top 3 w Google dla \"studio Białystok\"\n\n📚 **Projekt 2: Korepetycje Online**\n• **Challenge:** Konkurencja z OLX\n• **Solution:** Profesjonalna strona\n• **Results:**\n  - Oferta pracy po 3 dniach\n  - Wzrost wiarygodności\n  - 15+ nowych uczniów/miesiąc\n\n🤖 **Projekt 3: AI Chatbot Demo**\n• **Challenge:** Pokazać możliwości AI\n• **Solution:** Ten chatbot!\n• **Results:**\n  - 24/7 obsługa bez kosztów\n  - Engagement 65%\n  - Lead generation 24/7\n\n💡 **Twój projekt może być następny!**\n\n📞 **Bezpłatna konsultacja - opowiemy więcej!**`,
    
    "✨ **Poznaj nasze projekty:**\n\n🎯 **Dlaczego warto zobaczyć portfolio?**\n\n1️⃣ **Zobacz jakość wykonania**\n• Design i UX\n• Wydajność i szybkość\n• Responsywność\n\n2️⃣ **Zainspiruj się**\n• Różne branże\n• Różne style\n• Różne budżety\n\n3️⃣ **Sprawdź rezultaty**\n• Realne case studies\n• Wymierne efekty\n• Opinie klientów\n\n🌐 **Odwiedź nasze projekty:**\n\n🎵 **Wiesławski Studio**\nwieslawski.studio\n→ Elegancki design + szybkość\n\n📚 **Patryk Kulesza**\npatrykkul.github.io/korepetycje\n→ Prostota + skuteczność\n\n🤖 **Ten chatbot**\n→ Proof AI integracji\n\n📊 **Więcej na stronie głównej!**\n\n💬 **Masz pytania o konkretny projekt?**"
  ],
  
  process: [
    `🔄 **Jak wygląda współpraca z ${COMPANY_INFO.name}:**\n\n1️⃣ **Analiza** (bezpłatna, 1-3 dni)\n• Poznajemy Twoje potrzeby\n• Analizujemy konkurencję\n• Definiujemy cele\n\n2️⃣ **Planowanie** (3-5 dni)\n• Strategia projektu\n• Harmonogram i kamienie milowe\n• Wycena szczegółowa\n\n3️⃣ **Projektowanie** (1-2 tyg.)\n• Wireframes i mockupy\n• Design dopasowany do marki\n• Feedback i iteracje\n\n4️⃣ **Programowanie** (2-4 tyg.)\n• Kodowanie z Next.js/React\n• Integracje (CMS, AI, płatności)\n• Optymalizacja SEO\n\n5️⃣ **Testy** (3-5 dni)\n• QA na wszystkich urządzeniach\n• Testy wydajności\n• Poprawki\n\n6️⃣ **Wdrożenie** (1-2 dni)\n• Launch na produkcji\n• Setup analytics\n• Szkolenia\n\n7️⃣ **Wsparcie** (ciągłe)\n• Pomoc techniczna\n• Aktualizacje\n• Konsultacje\n\n📞 **Proste, przejrzyste, profesjonalne!**`,
    
    `⚡ **Sprawny proces = sukces projektu!**\n\n🎯 **Nasza metodyka:**\n\n📋 **Agile/Scrum approach:**\n• Sprint co 2 tygodnie\n• Regularne checkpointy\n• Feedback loops\n• Elastyczność w zmianach\n\n💬 **Komunikacja:**\n• Dedykowany project manager\n• Cotygodniowe update calls\n• Slack/Email na bieżąco\n• Pełna transparentność\n\n📊 **Narzędzia:**\n• Figma - design i prototypy\n• GitHub - code i wersjonowanie\n• Notion - dokumentacja\n• Google Meet - spotkania\n\n⏱️ **Typowe timeline:**\n• Landing page: 1-2 tyg.\n• Strona biznesowa: 3-4 tyg.\n• E-commerce: 6-8 tyg.\n• Custom projekt: ustalamy indywidualnie\n\n✅ **Po projekcie:**\n• 30 dni gwarancji\n• Bezpłatne wsparcie (okres umowny)\n• Możliwość maintenance package\n\n🤝 **Zaufało nam 50+ klientów!**`,
    
    `🚀 **Od pomysłu do live'a - krok po kroku:**\n\n💡 **Faza 1: DISCOVERY (tydzień 1)**\n• Bezpłatna konsultacja 30-60 min\n• Brief projektu\n• Research konkurencji\n• Wycena i timeline\n• Podpisanie umowy\n\n🎨 **Faza 2: DESIGN (tydzień 2-3)**\n• Wireframes struktury\n• Moodboard i style guide\n• High-fidelity mockupy\n• Prototyp interaktywny\n• Akceptacja designu\n\n💻 **Faza 3: DEVELOPMENT (tydzień 4-6)**\n• Setup środowiska (Git, hosting)\n• Kodowanie frontendu\n• Backend i integracje\n• CMS i panel admin\n• Code review\n\n🧪 **Faza 4: QA & TESTING (tydzień 7)**\n• Testy funkcjonalne\n• Cross-browser testing\n• Mobile testing\n• Performance audit\n• Security check\n\n🎉 **Faza 5: LAUNCH (tydzień 8)**\n• Deploy na produkcję\n• DNS i domena\n• Analytics setup\n• Szkolenie zespołu\n• Monitoring 24/7\n\n📈 **Faza 6: GROW (ciągłe)**\n• Wsparcie techniczne\n• Optymalizacje\n• Nowe features\n• Scaling\n\n💼 **Profesjonalnie od A do Z!**`
  ],
  
  // ✅ NOWA KATEGORIA: OFF-TOPIC
  off_topic: [
    `🤔 **Hmm, to pytanie wykracza poza moją specjalizację!**\n\n💼 Jestem AI chatbotem ${COMPANY_INFO.name} - specjalizuję się w:\n• Stronach internetowych\n• Integracjach AI\n• Automatyzacji biznesu\n• Grafice i designie\n\n💡 **Jeśli masz pytania o nasze usługi, chętnie pomogę!**\n\n📞 A takie ogólne pytania możesz zadać np. ChatGPT! 😉`,
    
    `😅 **To ciekawe pytanie, ale nie jestem od tego!**\n\n🎯 Jestem stworzony żeby pomagać w kwestiach:\n• Technologii web\n• Stron internetowych\n• Rozwiązań AI dla biznesu\n\n🤖 **Natomiast taki chatbot jak ja możesz mieć na swojej stronie** - również ze specjalistyczną wiedzą!\n\n💬 **Zainteresowany?**`,
    
    `🧠 **Jestem AI, ale skupiam się na biznesie!**\n\n✨ Mogę Ci opowiedzieć o:\n• Tworzeniu nowoczesnych stron\n• Chatbotach AI dla firm\n• Automatyzacji procesów\n\n🎁 **Ale widzisz jak dobrze działam?** Taki chatbot może być na TWOJEJ stronie!\n\n📞 **Porozmawiajmy o Twoim projekcie!**`
  ],
  
  general: [
    `🤔 **Ciekawe pytanie!**\n\n💡 Jestem AI asystentem ${COMPANY_INFO.name} - pomagam w sprawach:\n• 🌐 Stron internetowych\n• 🤖 Technologii AI\n• 🎨 Grafiki i designu\n• ⚡ Modernizacji i optymalizacji\n\n🌟 **Mogę Ci opowiedzieć o:**\n✅ Naszych usługach i cenach\n✅ Procesie współpracy\n✅ Konkretnych rozwiązaniach dla Twojego biznesu\n✅ Naszych projektach i portfolio\n\n❓ **Co Cię najbardziej interesuje?**\n\n💬 Możesz też zapytać konkretnie np.:\n• \"Ile kosztuje strona internetowa?\"\n• \"Robicie chatboty AI?\"\n• \"Jak wygląda współpraca?\"`,
    
    `👨‍💻 **Jestem tu żeby pomóc!**\n\n🎯 **Specjalizuję się w informacjach o:**\n\n1️⃣ **Usługach ${COMPANY_INFO.name}**\n• Strony WWW, AI, grafika, modernizacja\n\n2️⃣ **Cenach i pakietach**\n• Przejrzyste, konkurencyjne, bez ukrytych kosztów\n\n3️⃣ **Procesie realizacji**\n• Od pomysłu do wdrożenia\n\n4️⃣ **Technologiach**\n• Next.js, React, TypeScript, AI\n\n5️⃣ **Doradztwie technicznym**\n• Najlepsze rozwiązanie dla Twojego biznesu\n\n🚀 **Możesz zapytać mnie o:**\n💰 Wycenę\n📊 Portfolio\n⏱️ Timeline\n🤝 Współpracę\n🔧 Technologie\n\n💬 **O co chcesz zapytać?**`,
    
    `✨ **Hej! Widzę że masz pytanie!**\n\n🤖 **Jestem SLOPUŚ** - AI chatbot ${COMPANY_INFO.name} i mogę pomóc w:\n\n📋 **Ogólnych informacjach:**\n• Kim jesteśmy\n• Co robimy\n• Dlaczego warto z nami pracować\n\n💰 **Cenach i pakietach:**\n• Strony: od ${PRICING_CONFIG.website.landing} zł\n• AI: od ${PRICING_CONFIG.ai.chatbot} zł\n• Grafika: od ${PRICING_CONFIG.graphics.logo} zł\n• Modernizacja: od ${PRICING_CONFIG.optimization.audit} zł\n\n🎯 **Doradztwu:**\n• Jakie rozwiązanie dla Twojego biznesu\n• Jaki stack technologiczny\n• Ile potrwa projekt\n\n📞 **Kontakcie:**\n• Jak umówić konsultację\n• Gdzie nas znaleźć\n• Jak wygląda pierwszy krok\n\n💡 **Pro tip:** Im bardziej konkretne pytanie, tym lepsza odpowiedź!\n\n❓ **Czym mogę Ci pomóc?**`
  ]
};

/**
 * Pobiera odpowiedź fallback dla danej kategorii
 * Zwraca losową odpowiedź z kategorii dla większej naturalności
 */
export function getFallbackResponse(message: string): string {
  // Najpierw sprawdź czy możemy użyć fallback
  const check = canAnswerWithFallback(message);
  
  // Jeśli nie możemy - zwróć general (nie powinno się zdarzyć)
  if (!check.canAnswer || !check.category) {
    return fallbackResponses.general[0];
  }
  
  const category = check.category as keyof typeof fallbackResponses;
  const responses = fallbackResponses[category];
  
  if (!responses || responses.length === 0) {
    return fallbackResponses.general[0];
  }
  
  // Wybierz losową odpowiedź z kategorii
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

/**
 * @deprecated Use canAnswerWithFallback instead
 * Kept for backward compatibility
 */
export function getResponseCategory(message: string): string {
  const check = canAnswerWithFallback(message);
  return check.category || 'general';
}