/**
 * 🤖 API ENDPOINT: /api/llm-data
 * 
 * Zwraca pełne dane o WHITESLOPE STUDIO dla Web2Agent i innych LLM-ów
 * Pozwala na dynamiczną zmianę promptów bez redeployu
 * 
 * Использование:
 * GET /api/llm-data - zwraca wszystkie dane
 * GET /api/llm-data?type=prompt - zwraca tylko system prompt
 * GET /api/llm-data?type=services - zwraca tylko usługi
 */

import { NextRequest, NextResponse } from "next/server";
import { 
  AGENCY_INFO,
  SERVICES_FOR_LLMS,
  UNIQUE_SELLING_POINTS,
  PORTFOLIO_FOR_LLMS,
  FAQ_FOR_LLMS,
  generateLLMSystemPrompt,
  getLLMJSONData,
  SEO_KEYWORDS
} from "@/lib/LLMs";

// Cache dla danych LLM
const llmDataCache = {
  data: null as any,
  lastFetch: 0,
  cacheDuration: 60 * 60 * 1000 // 1 godzina
};

// Helper: sprawdzaj cache
const getCachedData = () => {
  const now = Date.now();
  if (llmDataCache.data && (now - llmDataCache.lastFetch) < llmDataCache.cacheDuration) {
    return llmDataCache.data;
  }
  
  const freshData = getLLMJSONData();
  llmDataCache.data = freshData;
  llmDataCache.lastFetch = now;
  
  return freshData;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dataType = searchParams.get("type");
    
    // ==========================================
    // 📋 TYPES: co zwrócić
    // ==========================================
    const responseData = {
      agency: AGENCY_INFO,
      services: SERVICES_FOR_LLMS,
      usp: UNIQUE_SELLING_POINTS,
      portfolio: PORTFOLIO_FOR_LLMS,
      faq: FAQ_FOR_LLMS,
      seoKeywords: SEO_KEYWORDS,
      systemPrompt: generateLLMSystemPrompt(),
      metadata: {
        version: "2.0.0",
        timestamp: new Date().toISOString(),
        language: "pl-PL",
        cacheExpires: new Date(Date.now() + llmDataCache.cacheDuration).toISOString()
      }
    };

    // Zwróć konkretny typ jeśli żądany
    let responseResult: any;
    
    if (dataType === "prompt") {
      responseResult = { systemPrompt: responseData.systemPrompt };
    } else if (dataType === "services") {
      responseResult = { services: responseData.services };
    } else if (dataType === "agency") {
      responseResult = { agency: responseData.agency };
    } else if (dataType === "seo") {
      responseResult = { seoKeywords: responseData.seoKeywords };
    } else {
      responseResult = responseData;
    }

    return NextResponse.json(
      {
        success: true,
        data: responseResult,
        cached: true,
        generatedAt: new Date().toISOString()
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("❌ LLM Data API Error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch LLM data",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request: NextRequest) {
  return NextResponse.json(
    {
      message: "LLM Data API - WHITESLOPE STUDIO",
      methods: ["GET"],
      endpoints: {
        "/api/llm-data": "Zwraca wszystkie dane",
        "/api/llm-data?type=prompt": "System prompt",
        "/api/llm-data?type=services": "Lista usług",
        "/api/llm-data?type=agency": "Info o firmie",
        "/api/llm-data?type=seo": "SEO keywords"
      }
    },
    { status: 200 }
  );
}