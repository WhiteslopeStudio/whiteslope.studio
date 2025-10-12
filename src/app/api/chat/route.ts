import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { getFallbackResponse } from "@/utils/chatbotFallback";

// Generate contextual buttons based on message content
function generateApiButtons(userMessage: string, botResponse: string) {
  const message = (userMessage + ' ' + botResponse).toLowerCase();
  const buttons = [];

  if (message.includes('ai') || message.includes('chatbot') || message.includes('sztuczn') || message.includes('inteligenc')) {
    buttons.push({
      text: '🤖 Integracje AI',
      href: '/pricing/ai-integration',
      variant: 'primary'
    });
  }

  if (message.includes('cen') || message.includes('koszt') || message.includes('ile') || message.includes('budżet')) {
    buttons.push({
      text: '💰 Zobacz cennik',
      href: '/pricing',
      variant: 'secondary'
    });
  }

  if (message.includes('stron') || message.includes('website') || message.includes('witryn')) {
    buttons.push({
      text: '🌐 Strony internetowe',
      href: '/pricing/website',
      variant: 'secondary'
    });
  }

  if (message.includes('sklep') || message.includes('ecommerce')) {
    buttons.push({
      text: '🛒 Sklepy online',
      href: '/pricing/ecommerce',
      variant: 'secondary'
    });
  }

  if (message.includes('kontakt') || message.includes('spotkanie') || message.includes('konsultacj')) {
    buttons.push({
      text: '📞 Umów konsultację',
      href: '/contact?tab=meeting',
      variant: 'primary'
    });
  }

  if (buttons.length === 0 || message.includes('taki chatbot')) {
    buttons.push({
      text: '💬 Chcę taki chatbot!',
      href: '/contact?tab=quote&service=ai-integration',
      variant: 'primary'
    });
  }

  return buttons.slice(0, 3);
}

// Sprawdź czy klucz API jest dostępny
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ Brak GEMINI_API_KEY w zmiennych środowiskowych');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  let userMessage = '';
  
  try {
    // Sprawdź czy klucz API jest dostępny
    if (!process.env.GEMINI_API_KEY) {
      console.error('❌ Brak GEMINI_API_KEY w zmiennych środowiskowych');
      return Response.json({ 
        response: "🔧 Chatbot nie jest skonfigurowany. Skontaktuj się z administratorem.",
        error: "Brak konfiguracji API"
      }, { status: 500 });
    }

    const body = await req.json();
    const { message } = body;
    userMessage = message; // Przypisz do zmiennej w scope funkcji

    // Walidacja wiadomości
    if (!message || typeof message !== 'string') {
      return Response.json({ 
        response: "❌ Nieprawidłowa wiadomość.",
        error: "Brak wiadomości"
      }, { status: 400 });
    }
    
    // Użyj najnowszego stabilnego modelu Gemini
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash"  // Najnowszy stabilny model - październik 2025
    });
    
    const prompt = `Jesteś chatbotem AI dla firmy WhiteSlope z Białegostoku, zajmującej się tworzeniem stron internetowych i integracją sztucznej inteligencji. 
    Twoim zadaniem jest pomocna rozmowa z użytkownikiem i profesjonalne przedstawienie naszych usług.
    
    Nasza aktualna oferta (cennik 2025):
    - Strony internetowe: od 2499 zł (responsywne, SEO, szybkie)
    - Sklepy e-commerce: od 4999 zł (płatności, zarządzanie produktami)
    - Integracje AI: od 1999 zł (chatboty, automatyzacja)
    - Aplikacje mobilne: od 7999 zł (iOS, Android, React Native)
    
    Dodatkowe informacje:
    - Bezpłatne konsultacje (30 minut)
    - Wycena projektu w 24h
    - Wsparcie techniczne po wdrożeniu
    - Kontakt: kontakt@whiteslope.studio
    
    Użytkownik pisze: ${message}
    
    Odpowiedz profesjonalnie po polsku, maksymalnie 200 słów. Jeśli użytkownik pyta o ceny - podaj aktualne. Nie wymyślaj numerów telefonu.`;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const buttons = generateApiButtons(userMessage, response);
    
    return Response.json({ 
      response,
      buttons
    });
    
  } catch (error: any) {
    console.error('Błąd API Gemini:', error);
    console.error('Status:', error?.status);
    console.error('Message:', error?.message);
    
    // Używaj fallback response zamiast ogólnego błędu
    console.log('🔄 Przełączam na tryb fallback...');
    
    try {
      const fallbackResponse = getFallbackResponse(userMessage);
      const fallbackButtons = generateApiButtons(userMessage, fallbackResponse);
      
      return Response.json({ 
        response: fallbackResponse + "\n\n🤖 *Tryb offline - ale widzisz jak dobrze działam!*",
        buttons: fallbackButtons,
        fallback: true 
      }, { status: 200 });
      
    } catch (fallbackError) {
      console.error('Błąd fallback:', fallbackError);
      
      // Ostateczna opcja zapasowa
      return Response.json({ 
        response: "😴 Chatbot śpi chwilowo...\n\n💡 Ale widzisz jak dobrze działał? Taki chatbot może być na TWOJEJ stronie bez żadnych limitów!\n\n🚀 Sprawdź naszą ofertę integracji AI - skontaktuj się z nami!",
        sleeping: true 
      }, { status: 200 });
    }
  }
}