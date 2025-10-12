import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { getFallbackResponse } from "@/utils/chatbotFallback";

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
    
    const prompt = `Jesteś chatbotem AI dla firmy WhiteSlope zajmującej się tworzeniem stron internetowych i integracją sztucznej inteligencji. 
    Twoim zadaniem jest pomocna rozmowa z użytkownikiem i subtelne zachęcanie do skorzystania z naszych usług.
    
    Nasza oferta obejmuje:
    - Tworzenie nowoczesnych stron internetowych i sklepów online
    - Integrację chatbotów AI na stronach internetowych
    - Automatyzację procesów biznesowych za pomocą AI
    - Konsultacje i wdrożenia rozwiązań AI
    - Optymalizację SEO i wydajności stron
    
    Użytkownik pisze: ${message}
    
    Odpowiedz pomocnie po polsku, maksymalnie 200 słów. Jeśli kontekst pasuje, wspomnij o naszych usługach.`;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    return Response.json({ response });
    
  } catch (error: any) {
    console.error('Błąd API Gemini:', error);
    console.error('Status:', error?.status);
    console.error('Message:', error?.message);
    
    // Używaj fallback response zamiast ogólnego błędu
    console.log('🔄 Przełączam na tryb fallback...');
    
    try {
      const fallbackResponse = getFallbackResponse(userMessage);
      
      return Response.json({ 
        response: fallbackResponse + "\n\n🤖 *Tryb offline - ale widzisz jak dobrze działam!*",
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