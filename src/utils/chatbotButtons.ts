/**
 * Chatbot Smart Buttons Generator
 * 
 * Single source of truth dla generowania przycisków w chatbocie.
 * Używa scoring system do inteligentnego dobierania najlepszych przycisków
 * na podstawie kontekstu rozmowy.
 * 
 * WAŻNE: Ten plik jest JEDYNYM miejscem gdzie definiujemy logikę przycisków!
 */

export interface ChatButton {
  text: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

/**
 * Generuje inteligentne przyciski bazując na kontekście rozmowy
 * 
 * @param userMessage - Wiadomość użytkownika
 * @param botResponse - Odpowiedź bota
 * @returns Array 0-3 najbardziej relevant przycisków
 */
export function generateSmartButtons(
  userMessage: string, 
  botResponse: string
): ChatButton[] {
  const combined = (userMessage + ' ' + botResponse).toLowerCase();
  const buttons: ChatButton[] = [];
  
  // ==========================================
  // 📊 SCORING SYSTEM
  // Każdy przycisk dostaje punkty za relevance
  // ==========================================
  const buttonScores = new Map<string, number>();
  
  // Pattern matching z wagami
  const patternConfig: Array<{
    buttonId: string;
    patterns: RegExp[];
    baseScore: number;
    boostPatterns?: RegExp[]; // Dodatkowe słowa zwiększające score
  }> = [
    {
      buttonId: 'ai-integration',
      patterns: [
        /\b(ai|chatbot|sztuczn|inteligenc|automatyz|bot)\b/g,
        /\b(taki jak ty|podobny|generow|rozpozna)\b/g
      ],
      baseScore: 10,
      boostPatterns: [/\b(chcę|potrzebuj|zainteresowany)\b/g]
    },
    {
      buttonId: 'website',
      patterns: [
        /\b(stron|website|witryn|landing|page|www)\b/g,
        /\b(nowa strona|strona internetowa)\b/g
      ],
      baseScore: 8,
      boostPatterns: [/\b(potrzebuj|chcę|ile kosztuje)\b/g]
    },
    {
      buttonId: 'ecommerce',
      patterns: [
        /\b(sklep|ecommerce|e-commerce|sprzedaż|produkty|koszyk)\b/g,
        /\b(płatnoś|zamówien|magazyn)\b/g
      ],
      baseScore: 9
    },
    {
      buttonId: 'optimization',
      patterns: [
        /\b(modernizacj|optymalizacj|popraw|ulepszy|migracj)\b/g,
        /\b(wolno|szybk|stara strona|przestarzał)\b/g
      ],
      baseScore: 8,
      boostPatterns: [/\b(problem|nie działa|wolno się ładuje)\b/g]
    },
    {
      buttonId: 'graphics',
      patterns: [
        /\b(grafik|logo|design|projekt|2d|3d)\b/g,
        /\b(wizualizacj|ilustracj|visual|banner)\b/g
      ],
      baseScore: 8
    },
    {
      buttonId: 'email-marketing',
      patterns: [
        /\b(email|newsletter|mailerlite|wysyłk|kampani)\b/g,
        /\b(mail marketing|automatyzacja mail)\b/g
      ],
      baseScore: 8
    },
    {
      buttonId: 'portfolio',
      patterns: [
        /\b(portfolio|projekt|realizacj|przykład|case)\b/g,
        /\b(wiesławsk|patryk|wasze prace|co zrobiliście)\b/g
      ],
      baseScore: 7
    },
    {
      buttonId: 'blog',
      patterns: [
        /\b(blog|artykuł|porad|wpis|tutorial|guide)\b/g,
        /\b(jak|poradnik|dowiedz się więcej)\b/g
      ],
      baseScore: 6
    },
    {
      buttonId: 'pricing',
      patterns: [
        /\b(cen|koszt|ile|prici|budżet|płat)\b/g,
        /\b(tani|drogi|kwota|stawka|opłata)\b/g
      ],
      baseScore: 12, // Wysoki priorytet - klienci często pytają o ceny
      boostPatterns: [/\b(ile kosztuje|jaka cena|cennik)\b/g]
    },
    {
      buttonId: 'contact',
      patterns: [
        /\b(kontakt|spotkanie|rozmow|konsultacj|umówi)\b/g,
        /\b(zadzwon|napisz|email|telefon)\b/g
      ],
      baseScore: 11, // Bardzo wysoki - chcemy konwersji!
      boostPatterns: [/\b(chcę|zainteresowany|umówmy)\b/g]
    }
  ];

  // Oblicz score dla każdego przycisku
  for (const { buttonId, patterns, baseScore, boostPatterns } of patternConfig) {
    let score = 0;
    
    // Policz matche dla głównych patternów
    for (const pattern of patterns) {
      const matches = combined.match(pattern);
      if (matches) {
        score += baseScore * matches.length;
      }
    }
    
    // Boost score jeśli są dodatkowe słowa kluczowe
    if (boostPatterns && score > 0) {
      for (const boostPattern of boostPatterns) {
        const boostMatches = combined.match(boostPattern);
        if (boostMatches) {
          score += 3 * boostMatches.length;
        }
      }
    }
    
    if (score > 0) {
      buttonScores.set(buttonId, score);
    }
  }

  // ==========================================
  // 🎯 BUTTON DEFINITIONS
  // Definicje wszystkich możliwych przycisków
  // ==========================================
  const buttonDefinitions: Record<string, ChatButton> = {
    'ai-integration': {
      text: '🤖 Integracje AI',
      href: '/pricing/ai-integration/chatbot',
      variant: 'primary'
    },
    'website': {
      text: '🌐 Strony internetowe',
      href: '/pricing/website',
      variant: 'secondary'
    },
    'ecommerce': {
      text: '🛒 Sklepy online',
      href: '/pricing/ecommerce',
      variant: 'secondary'
    },
    'optimization': {
      text: '⚡ Modernizacja strony',
      href: '/pricing/optimization',
      variant: 'secondary'
    },
    'graphics': {
      text: '🎨 Grafika & Design',
      href: '/pricing/graphics',
      variant: 'secondary'
    },
    'email-marketing': {
      text: '📧 Email Marketing',
      href: '/pricing/email-marketing',
      variant: 'secondary'
    },
    'portfolio': {
      text: '📂 Nasze projekty',
      href: '/#projects',
      variant: 'outline'
    },
    'blog': {
      text: '📝 Blog i porady',
      href: '/blog',
      variant: 'outline'
    },
    'pricing': {
      text: '💰 Pełny cennik',
      href: '/pricing',
      variant: 'primary'
    },
    'contact': {
      text: '📞 Umów konsultację',
      href: '/contact?tab=meeting',
      variant: 'primary'
    }
  };

  // ==========================================
  // 📈 SORTOWANIE I SELEKCJA
  // Wybierz top 3 przyciski z najwyższym score
  // ==========================================
  const sortedButtons = Array.from(buttonScores.entries())
    .sort((a, b) => b[1] - a[1]) // Sortuj malejąco po score
    .slice(0, 3) // Bierz top 3
    .map(([buttonId]) => buttonDefinitions[buttonId]);

  buttons.push(...sortedButtons);

  // ==========================================
  // 🎁 FALLBACK BUTTONS
  // Jeśli brak matchów, daj uniwersalne przyciski
  // ==========================================
  if (buttons.length === 0) {
    // Zestaw domyślny - najbardziej uniwersalne opcje
    buttons.push(
      {
        text: '💰 Zobacz cennik',
        href: '/pricing',
        variant: 'primary'
      },
      {
        text: '🤖 Integracje AI',
        href: '/pricing/ai-integration/chatbot',
        variant: 'secondary'
      },
      {
        text: '📞 Kontakt',
        href: '/contact?tab=meeting',
        variant: 'outline'
      }
    );
  }
  
  // ==========================================
  // 🎯 SMART ADJUSTMENTS
  // Dostosuj przyciski na podstawie dodatkowych reguł
  // ==========================================
  
  // Jeśli user wyraźnie pyta o chatbota - priorytetuj AI
  if (combined.match(/\b(taki chatbot|chatbot jak ty|podobny bot)\b/)) {
    const aiButton = {
      text: '💬 Chcę taki chatbot!',
      href: '/contact?tab=quote&service=ai-integration',
      variant: 'primary' as const
    };
    
    // Zastąp pierwszy przycisk jeśli nie jest AI
    if (buttons[0] && !buttons[0].href.includes('ai-integration')) {
      buttons[0] = aiButton;
    } else {
      buttons.unshift(aiButton);
    }
  }
  
  // Jeśli user mówi o problemach - dodaj kontakt
  if (combined.match(/\b(problem|nie działa|pomóż|potrzebuj pomocy)\b/)) {
    const hasContact = buttons.some(b => b.href.includes('contact'));
    if (!hasContact && buttons.length < 3) {
      buttons.push({
        text: '📞 Potrzebuję pomocy',
        href: '/contact?tab=meeting',
        variant: 'primary'
      });
    }
  }

  // Zawsze maksymalnie 3 przyciski
  return buttons.slice(0, 3);
}

// ==========================================
// 📊 ANALYTICS & DEBUGGING
// Pomocnicze funkcje do analizy
// ==========================================

/**
 * Debuguje scoring przycisków (użyteczne podczas developmentu)
 */
export function debugButtonScoring(userMessage: string, botResponse: string): void {
  console.log('=== BUTTON SCORING DEBUG ===');
  console.log('User:', userMessage);
  console.log('Bot:', botResponse.substring(0, 100) + '...');
  
  const buttons = generateSmartButtons(userMessage, botResponse);
  console.log('Generated buttons:', buttons.map(b => b.text));
  console.log('============================');
}

/**
 * Zwraca statystyki użycia przycisków (można rozszerzyć o tracking)
 */
export function getButtonStats(): Record<string, number> {
  // TODO: Implementacja tracking'u kliknięć w przyciski
  // Na razie pusty obiekt, ale gotowy do rozbudowy
  return {};
}