/**
 * AI Calendar Lead endpoint
 * Collects meeting preferences (date/time) from LLM and sends to team.
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
  console.log(`✅ Calendar API: ${source} | IP=${ip} | UA=${ua || "unknown"} | ${new Date().toISOString()}`);
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

  // ✅ PUBLICZNE API - każdy może zaproponować spotkanie (tylko rate limiting)

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
  const phone = sanitize(body.phone);
  const company = sanitize(body.company);
  const preferredDate = sanitize(body.preferredDate);
  const preferredTime = sanitize(body.preferredTime);
  const meetingType = sanitize(body.meetingType) || "online";
  const topic = sanitize(body.topic, 2000);
  const channel = sanitize(body.channel) || "chat";

  if (!email || !validateEmail(email)) {
    return NextResponse.json({ message: "Nieprawidłowy email" }, { status: 400, headers: corsHeaders });
  }

  if (!preferredDate || !preferredTime) {
    return NextResponse.json({ 
      message: "Wymagane: preferredDate i preferredTime" 
    }, { status: 400, headers: corsHeaders });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = `📅 Propozycja spotkania z AI (${channel}) - ${name}`;
  const html = `
    <h2>📅 Nowa propozycja spotkania z AI</h2>
    
    <h3>👤 Dane kontaktowe</h3>
    <p><strong>Imię i nazwisko:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
    ${company ? `<p><strong>Firma:</strong> ${company}</p>` : ""}
    ${channel ? `<p><strong>Kanał:</strong> ${channel}</p>` : ""}
    
    <h3>🕐 Preferowany termin</h3>
    <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 16px 0;">
      <p style="margin: 4px 0;"><strong>📅 Data:</strong> ${preferredDate}</p>
      <p style="margin: 4px 0;"><strong>🕐 Godzina:</strong> ${preferredTime}</p>
      <p style="margin: 4px 0;"><strong>💻 Typ spotkania:</strong> ${meetingType}</p>
    </div>
    
    ${topic ? `
      <h3>📝 Temat spotkania</h3>
      <div style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p>${topic.replace(/\n/g, "<br/>")}</p>
      </div>
    ` : ""}
    
    <hr style="margin: 24px 0; border: 0; border-top: 1px solid #ddd;"/>
    <p style="color: #666; font-size: 14px;">
      <strong>⚡ Akcja wymagana:</strong> Skontaktuj się z klientem telefonicznie lub mailowo jak najszybciej.<br/>
      Czas zgłoszenia: ${new Date().toLocaleString("pl-PL")}
    </p>
  `;

  try {
    console.log("📧 Wysyłanie propozycji spotkania z AI...");
    const adminEmailResult = await resend.emails.send({
      from: "WhiteSlope AI Calendar <kontakt@whiteslope.studio>",
      to: ["kontakt@whiteslope.studio"],
      subject,
      html,
      replyTo: email
    });

    const userReplyHtml = `
      <h2>Cześć ${name.split(" ")[0]}! 👋</h2>
      <p>Dzięki za propozycję spotkania przez chat.</p>
      
      <h3>📅 Otrzymaliśmy Twoją preferencję:</h3>
      <div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 8px; padding: 16px; margin: 16px 0;">
        <p style="margin: 4px 0;"><strong>📅 Data:</strong> ${preferredDate}</p>
        <p style="margin: 4px 0;"><strong>🕐 Godzina:</strong> ${preferredTime}</p>
        <p style="margin: 4px 0;"><strong>💻 Typ:</strong> ${meetingType}</p>
      </div>
      
      <p><strong>Zespół WhiteSlope skontaktuje się z Tobą w ciągu 24 godzin</strong>, aby potwierdzić szczegóły spotkania telefonicznie lub mailowo.</p>
      
      ${topic ? `<p><strong>Temat:</strong> ${topic}</p>` : ""}
      
      <p><strong>Pilne?</strong> Napisz na <a href="mailto:kontakt@whiteslope.studio">kontakt@whiteslope.studio</a> lub zadzwoń: <strong>+48 731 721 760 - Mateusz Malewski<br/ > +48 662 581 368 - Patryk Kulesza  </strong></p>
      
      <hr/>
      <p style="color: #666; font-size: 14px;">
        Pozdrawiamy,<br/>
        Zespół WhiteSlope<br/>
        kontakt@whiteslope.studio<br/>
        +48 731 721 760 - Mateusz Malewski <br/>
        +48 662 581 368 - Patryk Kulesza
      </p>
    `;

    await resend.emails.send({
      from: "WhiteSlope <kontakt@whiteslope.studio>",
      to: [email],
      subject: `Potwierdzenie spotkania - WhiteSlope`,
      html: userReplyHtml
    });

    logAccess(hasPartnerKey ? "Klucz" : "AI", clientIp, userAgent);

    return NextResponse.json(
      {
        success: true,
        meetingId: adminEmailResult.data?.id,
        message: "Propozycja spotkania wysłana. Zespół skontaktuje się w ciągu 24h!"
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("❌ Błąd wysyłania propozycji spotkania:", error);
    return NextResponse.json(
      { message: "Nie udało się przetworzyć propozycji spotkania" },
      { status: 500, headers: corsHeaders }
    );
  }
}
