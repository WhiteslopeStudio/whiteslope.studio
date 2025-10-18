// app/api/check-domain/route.ts

import { NextResponse } from 'next/server';

// TWÓJ KLUCZ API - w prawdziwej aplikacji daj to do .env!
const RAPIDAPI_KEY = '3924013251msh6f15eeb94f08d02p1ab11ajsna06554297083';
const RAPIDAPI_HOST = 'domain-checker7.p.rapidapi.com';

// Funkcja do sprawdzania pojedynczej domeny przez RapidAPI
async function checkDomainRapidAPI(domain: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/check?domain=${domain}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': RAPIDAPI_KEY,
          'X-RapidAPI-Host': RAPIDAPI_HOST
        }
      }
    );

    if (!response.ok) {
      console.error(`❌ Błąd API dla ${domain}:`, response.status);
      return true; // W razie błędu zwracamy jako dostępną
    }

    const data = await response.json();
    
    // WAŻNE: Wypisujemy CAŁĄ odpowiedź żeby zobaczyć strukturę!
    console.log(`📊 PEŁNA ODPOWIEDŹ API dla ${domain}:`, JSON.stringify(data, null, 2));
    
    // Różne API mogą zwracać różne struktury - sprawdzamy wszystkie możliwości:
    
    // Opcja 1: pole "available"
    if (data.available !== undefined) {
      console.log(`  → używam pola "available": ${data.available}`);
      return data.available;
    }
    
    // Opcja 2: pole "isAvailable"
    if (data.isAvailable !== undefined) {
      console.log(`  → używam pola "isAvailable": ${data.isAvailable}`);
      return data.isAvailable;
    }
    
    // Opcja 3: pole "status"
    if (data.status) {
      console.log(`  → używam pola "status": ${data.status}`);
      if (data.status === 'available' || data.status === 'free') {
        return true;
      }
      if (data.status === 'taken' || data.status === 'registered' || data.status === 'unavailable') {
        return false;
      }
    }
    
    // Opcja 4: pole "registered"
    if (data.registered !== undefined) {
      console.log(`  → używam pola "registered": ${data.registered}`);
      return !data.registered; // Jeśli zarejestrowana = NIE dostępna
    }
    
    // Opcja 5: zagnieżdżone w "domain"
    if (data.domain && data.domain.available !== undefined) {
      console.log(`  → używam pola "domain.available": ${data.domain.available}`);
      return data.domain.available;
    }
    
    console.warn(`⚠️ Nieznana struktura odpowiedzi dla ${domain}`);
    return true; // Jeśli nie ma jednoznacznej odpowiedzi
    
  } catch (error) {
    console.error(`❌ Błąd sprawdzania ${domain}:`, error);
    return true;
  }
}

// Funkcja generująca ceny
function generatePrice(domain: string): string {
  const tld = domain.substring(domain.lastIndexOf('.'));
  
  const prices: Record<string, number> = {
    '.com': 45,
    '.net': 50,
    '.org': 50,
    '.pl': 35,
    '.com.pl': 40,
    '.io': 150,
    '.dev': 60,
    '.app': 70,
    '.tech': 80,
    '.ai': 200,
    '.studio': 90,
    '.design': 100,
    '.co': 120,
    '.digital': 85,
    '.codes': 55,
    '.agency': 95,
    '.media': 110,
    '.online': 40,
    '.store': 65,
    '.club': 45,
    '.pro': 75,
    '.site': 35,
    '.website': 30,
    '.space': 40,
    '.world': 90,
    '.gg': 120
  };
  
  const basePrice = prices[tld] || 60;
  const variation = Math.floor(Math.random() * 20) - 10;
  
  return `${basePrice + variation} zł/rok`;
}

// POST endpoint - sprawdzanie domen
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('📦 Otrzymano request:', body);
    
    if (!body.domains || !Array.isArray(body.domains)) {
      return NextResponse.json(
        { error: 'Wymagana jest tablica domen w polu "domains"' },
        { status: 400 }
      );
    }
    
    const domains = body.domains;
    
    if (domains.length === 0) {
      return NextResponse.json(
        { error: 'Tablica domen jest pusta' },
        { status: 400 }
      );
    }
    
    // Limit - 10 domen na raz żeby nie przekroczyć limitu API
    if (domains.length > 10) {
      return NextResponse.json(
        { error: 'Maksymalnie 10 domen na raz (limit API)' },
        { status: 400 }
      );
    }
    
    console.log(`🔍 Sprawdzam ${domains.length} domen przez RapidAPI...`);
    
    // Sprawdzamy domeny JEDNA PO DRUGIEJ żeby nie przekroczyć rate limit
    const results = [];
    
    for (const domain of domains) {
      try {
        console.log(`  Sprawdzam: ${domain}`);
        const available = await checkDomainRapidAPI(domain);
        const price = available ? generatePrice(domain) : undefined;
        
        console.log(`  ${available ? '✅' : '❌'} ${domain}`);
        
        results.push({
          domain,
          available,
          price
        });
        
        // Małe opóźnienie między requestami (500ms)
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`Błąd dla ${domain}:`, error);
        results.push({
          domain,
          available: true,
          price: generatePrice(domain)
        });
      }
    }
    
    console.log('✅ Zwracam wyniki:', results.length);
    
    return NextResponse.json({ results });
    
  } catch (error) {
    console.error('❌ Błąd API:', error);
    return NextResponse.json(
      { error: 'Błąd podczas przetwarzania requestu', details: String(error) },
      { status: 500 }
    );
  }
}

// GET endpoint - do testowania
export async function GET() {
  return NextResponse.json({
    status: 'OK',
    message: 'API sprawdzania domen działa! (RapidAPI)',
    provider: 'Domain Checker (RapidAPI)',
    usage: 'Wyślij POST z JSON: { "domains": ["example.com"] }',
    limit: 'Maksymalnie 10 domen na raz',
    note: 'Darmowy plan: 500 requests/miesiąc'
  });
}