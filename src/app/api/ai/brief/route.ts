/**
 * AI Brief Generator endpoint
 * Collects comprehensive project brief from LLM chat and sends structured email.
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
const RATE_LIMIT_MAX = 50;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1h

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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

function sanitize(input: string | undefined, max = 2000): string {
  if (!input) return "";
  return input.toString().trim().slice(0, max);
}

function sanitizeArray(input: any): string[] {
  if (!Array.isArray(input)) return [];
  return input.map(item => sanitize(String(item), 500)).filter(Boolean);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function logAccess(source: "AI" | "Klucz", ip: string, ua: string | null) {
  console.log(`✅ Brief API: ${source} | IP=${ip} | UA=${ua || "unknown"} | ${new Date().toISOString()}`);
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.error("❌ Brak RESEND_API_KEY");
    return NextResponse.json({ message: "Błąd konfiguracji" }, { status: 500, headers: corsHeaders });
  }

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

  // Walidacja wymaganych pól
  const email = sanitize(body.email);
  const name = sanitize(body.name) || "Anonim";
  const companyProfile = sanitize(body.companyProfile, 1000);
  const websiteType = sanitize(body.websiteType);
  const websiteGoals = sanitize(body.websiteGoals, 1000);

  if (!email || !validateEmail(email)) {
    return NextResponse.json({ message: "Nieprawidłowy email" }, { status: 400, headers: corsHeaders });
  }

  if (!companyProfile || !websiteType || !websiteGoals) {
    return NextResponse.json({ 
      message: "Wymagane: companyProfile, websiteType, websiteGoals" 
    }, { status: 400, headers: corsHeaders });
  }

  // Opcjonalne pola
  const phone = sanitize(body.phone);
  const company = sanitize(body.company);
  const functionsList = sanitizeArray(body.functionsList);
  const integrationsList = sanitizeArray(body.integrationsList);
  const homePageSections = sanitizeArray(body.homePageSections);
  const mainMenu = sanitizeArray(body.mainMenu);
  const siteMap = sanitize(body.siteMap, 2000);
  const inspirationLinks = sanitizeArray(body.inspirationLinks);
  const additionalInfo = sanitize(body.additionalInfo, 2000);
  const budget = sanitize(body.budget);
  const timeline = sanitize(body.timeline);
  const channel = sanitize(body.channel) || "chat";

  const resend = new Resend(process.env.RESEND_API_KEY);

  // Email do admina z pełnym briefem
  const subject = `📋 Brief projektowy z AI (${channel}) - ${company || name}`;
  const html = `
    <h1 style="color: #000;">📋 Nowy Brief Projektowy z AI</h1>
    
    <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">👤 Dane kontaktowe</h2>
    <p><strong>Imię i nazwisko:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
    ${company ? `<p><strong>Firma:</strong> ${company}</p>` : ""}
    ${channel ? `<p><strong>Kanał:</strong> ${channel}</p>` : ""}
    
    <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">🏢 Profil firmy</h2>
    <p>${companyProfile.replace(/\n/g, "<br/>")}</p>
    
    <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">🌐 Rodzaj strony</h2>
    <p>${websiteType}</p>
    
    <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">🎯 Cele strony</h2>
    <p>${websiteGoals.replace(/\n/g, "<br/>")}</p>
    
    ${functionsList.length > 0 ? `
      <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">⚙️ Lista funkcji</h2>
      <ul>
        ${functionsList.map(f => `<li>${f}</li>`).join("")}
      </ul>
    ` : ""}
    
    ${integrationsList.length > 0 ? `
      <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">🔗 Lista integracji</h2>
      <ul>
        ${integrationsList.map(i => `<li>${i}</li>`).join("")}
      </ul>
    ` : ""}
    
    ${homePageSections.length > 0 ? `
      <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">🏗️ Konstrukcja strony głównej</h2>
      <ul>
        ${homePageSections.map(s => `<li>${s}</li>`).join("")}
      </ul>
    ` : ""}
    
    ${mainMenu.length > 0 ? `
      <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">📍 Menu główne</h2>
      <ul>
        ${mainMenu.map(m => `<li>${m}</li>`).join("")}
      </ul>
    ` : ""}
    
    ${siteMap ? `
      <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">🗺️ Mapa strony</h2>
      <p>${siteMap.replace(/\n/g, "<br/>")}</p>
    ` : ""}
    
    ${inspirationLinks.length > 0 ? `
      <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">✨ Linki inspiracji</h2>
      <ul>
        ${inspirationLinks.map(link => `<li><a href="${link}" target="_blank">${link}</a></li>`).join("")}
      </ul>
    ` : ""}
    
    ${budget ? `<p><strong>💰 Budżet:</strong> ${budget}</p>` : ""}
    ${timeline ? `<p><strong>⏱️ Termin realizacji:</strong> ${timeline}</p>` : ""}
    
    ${additionalInfo ? `
      <h2 style="color: #333; border-bottom: 2px solid #000; padding-bottom: 8px;">ℹ️ Dodatkowe informacje</h2>
      <p>${additionalInfo.replace(/\n/g, "<br/>")}</p>
    ` : ""}
    
    <hr style="margin: 32px 0; border: 0; border-top: 2px solid #eee;"/>
    <p style="color: #666; font-size: 14px;">
      Ten brief został wygenerowany automatycznie przez AI (${channel})<br/>
      Czas: ${new Date().toLocaleString("pl-PL")}
    </p>
  `;

  try {
    console.log("📧 Wysyłanie briefu z AI...");
    const adminEmailResult = await resend.emails.send({
      from: "WhiteSlope AI Brief <onboarding@resend.dev>",
      to: ["kontakt@whiteslope.studio"],
      subject,
      html,
      replyTo: email
    });

    // Auto-reply dla użytkownika
    const userReplyHtml = `
      <h2>Cześć ${name.split(" ")[0]}! 👋</h2>
      <p>Dziękujemy za wypełnienie briefu projektowego przez chat.</p>
      
      <h3>📋 Otrzymaliśmy Twój brief:</h3>
      <ul>
        <li><strong>Rodzaj strony:</strong> ${websiteType}</li>
        ${company ? `<li><strong>Firma:</strong> ${company}</li>` : ""}
        ${budget ? `<li><strong>Budżet:</strong> ${budget}</li>` : ""}
        ${timeline ? `<li><strong>Termin:</strong> ${timeline}</li>` : ""}
      </ul>
      
      <h3>🚀 Co się stanie dalej?</h3>
      <ol>
        <li>Zespół WhiteSlope przeanalizuje Twój brief (24-48h)</li>
        <li>Przygotujemy szczegółową wycenę i harmonogram</li>
        <li>Skontaktujemy się z Tobą z propozycją</li>
        <li>Omówimy szczegóły i odpowiemy na pytania</li>
      </ol>
      
      <p><strong>Pilne?</strong> Napisz na <a href="mailto:kontakt@whiteslope.studio">kontakt@whiteslope.studio</a> lub zadzwoń: <strong>+48 731 721 760</strong></p>
      
      <hr/>
      <p style="color: #666; font-size: 14px;">
        Pozdrawiamy,<br/>
        Zespół WhiteSlope<br/>
        📧 kontakt@whiteslope.studio<br/>
        📞 +48 731 721 760
      </p>
    `;

    await resend.emails.send({
      from: "WhiteSlope <onboarding@resend.dev>",
      to: [email],
      subject: `Potwierdzenie briefu - WhiteSlope`,
      html: userReplyHtml
    });

    logAccess(hasPartnerKey ? "Klucz" : "AI", clientIp, userAgent);

    return NextResponse.json(
      {
        success: true,
        briefId: adminEmailResult.data?.id,
        message: "Brief zapisany i wysłany do zespołu. Skontaktujemy się w ciągu 24-48h!"
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("❌ Błąd wysyłania briefu:", error);
    return NextResponse.json(
      { message: "Nie udało się przetworzyć briefu" },
      { status: 500, headers: corsHeaders }
    );
  }
}
