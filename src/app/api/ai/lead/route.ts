/**
 * AI Lead endpoint
 * Allows LLM agents (ChatGPT, Gemini, Grok, etc.) to drop a contact email without visiting the site.
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

function sanitize(input: string | undefined, max = 1000): string {
  if (!input) return "";
  return input.toString().trim().slice(0, max);
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function logAccess(source: "AI" | "Klucz", ip: string, ua: string | null) {
  console.log(`✅ Lead API: ${source} | IP=${ip} | UA=${ua || "unknown"} | ${new Date().toISOString()}`);
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

  // ✅ PUBLICZNE API - każdy może wysłać lead (tylko rate limiting)

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

  const email = sanitize(body.email);
  const name = sanitize(body.name) || "Anonim";
  const message = sanitize(body.message, 4000);
  const service = sanitize(body.service);
  const channel = sanitize(body.channel) || "chat";

  if (!email || !validateEmail(email)) {
    return NextResponse.json({ message: "Nieprawidłowy email" }, { status: 400, headers: corsHeaders });
  }

  if (!message && !service) {
    return NextResponse.json({ message: "Wymagane message lub service" }, { status: 400, headers: corsHeaders });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = `AI lead (${channel}) - ${email}`;
  const html = `
    <h2>Nowy lead z AI</h2>
    <p><strong>Imię:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${service ? `<p><strong>Usługa:</strong> ${service}</p>` : ""}
    ${channel ? `<p><strong>Kanał:</strong> ${channel}</p>` : ""}
    ${message ? `<p><strong>Wiadomość:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>` : ""}
  `;

  try {
    console.log("📧 Wysyłanie leadu z AI...");
    const adminEmailResult = await resend.emails.send({
      from: "WhiteSlope AI Lead <onboarding@resend.dev>",
      to: ["kontakt@whiteslope.studio"],
      subject,
      html,
      replyTo: email
    });

    const userReplyHtml = `
      <p>Cześć ${name.split(" ")[0]}!</p>
      <p>Dzięki za zostawienie kontaktu przez chat. Odezwie się do Ciebie zespół WhiteSlope.</p>
      ${service ? `<p>Usługa: ${service}</p>` : ""}
      ${message ? `<p>Twoja wiadomość:<br/>${message.replace(/\n/g, "<br/>")}</p>` : ""}
      <p>Jeśli chcesz przyspieszyć, napisz na kontakt@whiteslope.studio lub zadzwoń: +48 731 721 760</p>
    `;

    await resend.emails.send({
      from: "WhiteSlope <onboarding@resend.dev>",
      to: [email],
      subject: `Potwierdzenie zgłoszenia - WhiteSlope`,
      html: userReplyHtml
    });

    logAccess(hasPartnerKey ? "Klucz" : "AI", clientIp, userAgent);

    return NextResponse.json(
      {
        success: true,
        leadId: adminEmailResult.data?.id,
        message: "Lead zapisany i przesłany do zespołu"
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("❌ Błąd wysyłania leadu:", error);
    return NextResponse.json(
      { message: "Nie udało się przetworzyć leadu" },
      { status: 500, headers: corsHeaders }
    );
  }
}
