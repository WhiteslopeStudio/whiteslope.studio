'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Bot, Zap, Globe, Plus, Trash2,
  Check,
} from 'lucide-react';
import {
  useInteractiveButton,
  useApprovalCarousel,
} from '../../utils/hooks';
import { FAQ_DATA } from '../../lib/data';
import AboutSection from '../websites/AboutSection';
import OfferTickerSection from '../websites/OfferTickerSection';

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface FaqItem { id: string; question: string; answer: string; }
interface ActionBtn { id: string; trigger: string; label: string; url: string; }

interface BotConfig {
  botName: string;
  businessName: string;
  city: string;
  waitTime: string;
  maxMessages: string;
  websiteUrl: string;
  niche: string;
  mainServices: string;
  usp: string;
  promotions: string;
  faqs: FaqItem[];
  knowledgeText: string;
  personality: string;
  intent: string;
  additionalInfo: string;
  actions: ActionBtn[];
  humanHandoverEmail: string;
  humanHandoverPhone: string;
}

interface ChatMessage { role: 'user' | 'bot'; text: string; }

const DEFAULT: BotConfig = {
  botName: '', businessName: '', city: '',
  waitTime: '2', maxMessages: '10',
  websiteUrl: '', niche: '', mainServices: '', usp: '', promotions: '',
  faqs: [], knowledgeText: '',
  personality: '', intent: '', additionalInfo: '',
  actions: [], humanHandoverEmail: '', humanHandoverPhone: '',
};

// ─── LOCAL RESPONSE ENGINE ─────────────────────────────────────────────────────

function botReply(msg: string, cfg: BotConfig): string {
  const m = msg.toLowerCase();
  for (const faq of cfg.faqs) {
    if (faq.question && m.includes(faq.question.toLowerCase().slice(0, 20))) return faq.answer;
  }
  for (const act of cfg.actions) {
    if (act.trigger && m.includes(act.trigger.toLowerCase())) {
      return `Chętnie pomogę! Kliknij przycisk poniżej → [${act.label}]`;
    }
  }
  if (m.match(/cen|koszt|ile/)) {
    return cfg.promotions
      ? `Aktualnie: ${cfg.promotions}. Skontaktuj się po szczegółową wycenę!`
      : 'Chętnie przygotujemy indywidualną wycenę. Jak mogę pomóc?';
  }
  if (m.match(/kontakt|telefon|zadzwoń|mail/)) {
    return cfg.humanHandoverPhone
      ? `Możesz skontaktować się pod numerem ${cfg.humanHandoverPhone}${cfg.humanHandoverEmail ? ` lub ${cfg.humanHandoverEmail}` : ''}.`
      : 'Połączę Cię z naszym konsultantem. Chwilę poczekaj.';
  }
  if (m.match(/usług|ofert|co robisz/)) {
    return cfg.mainServices
      ? `Oferujemy: ${cfg.mainServices}.${cfg.usp ? ` Wyróżnia nas: ${cfg.usp}.` : ''} Mogę pomóc w wyborze?`
      : `Witaj w ${cfg.businessName || 'naszej firmie'}! Chętnie opowiem o ofercie.`;
  }
  if (m.match(/cześć|hej|dzień dobry|witaj|siema/)) {
    return `Dzień dobry! Jestem ${cfg.botName || 'Asystent'}, wirtualny asystent ${cfg.businessName ? `firmy ${cfg.businessName}` : 'Twojej firmy'}. W czym mogę Ci pomóc?`;
  }
  return `Rozumiem. ${cfg.businessName ? `Jako ${cfg.businessName}` : ''} – chętnie pomogę. Możesz mi powiedzieć więcej?`;
}

// ─── HERO ANIMATED BLOCK ──────────────────────────────────────────────────────

function AnimatedBlock({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
}

// ─── FORM HELPERS ─────────────────────────────────────────────────────────────

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-white/80 mb-2">
      {children} {required && <span className="text-red-400">*</span>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = 'text', className = '' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string; className?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={`w-full border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/5 text-white placeholder-white/30 ${className}`}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white/5 text-white placeholder-white/30"
    />
  );
}

function SectionCard({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{num}</div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

const EDGE_PADDING = 'clamp(28px, 7vw, 150px)';

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function AIChatbotServicePage() {
  // ── Configurator state ─────────────────────────────────────────────────────
  const [cfg, setCfg] = useState<BotConfig>(DEFAULT);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'bot', text: 'Dzień dobry! Jestem Twoim asystentem AI. W czym mogę Ci pomóc?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [scrapingUrl, setScrapingUrl] = useState(false);
  const [generatingKB, setGeneratingKB] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const kbFileRef = useRef<HTMLInputElement>(null);
  const ctaBtn = useInteractiveButton();

  // ── Hero state ─────────────────────────────────────────────────────────────
  const mainButton = useInteractiveButton();

  const heroHighlights = [
    { id: '01', text: 'Dostępny 24/7 bez przerwy' },
    { id: '02', text: 'Odpowiada w mniej niż 2 sekundy' },
    { id: '03', text: 'Wdrożenie 1–2 tygodnie' },
    { id: '04', text: 'Cena od 1000 zł jednorazowo' },
  ];
  const activeMobileProofIndex = useApprovalCarousel(heroHighlights.length, 3000);

  // ── FAQ state ──────────────────────────────────────────────────────────────
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const set = (field: keyof BotConfig, val: any) => setCfg(p => ({ ...p, [field]: val }));

  useEffect(() => {
    if (cfg.botName || cfg.businessName) {
      setMessages([{
        role: 'bot',
        text: `Dzień dobry! Jestem ${cfg.botName || 'Asystent'}, wirtualny asystent ${cfg.businessName ? `firmy ${cfg.businessName}` : 'Twojej firmy'}. W czym mogę Ci dzisiaj pomóc?`,
      }]);
    }
  }, [cfg.botName, cfg.businessName]);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const txt = chatInput.trim();
    setChatInput('');
    setMessages(p => [...p, { role: 'user', text: txt }]);
    setTimeout(() => {
      setMessages(p => [...p, { role: 'bot', text: botReply(txt, cfg) }]);
    }, Math.max(600, parseInt(cfg.waitTime) * 400));
  };

  const addFaq = () => set('faqs', [...cfg.faqs, { id: Date.now().toString(), question: '', answer: '' }]);
  const updateFaq = (id: string, field: 'question' | 'answer', val: string) =>
    set('faqs', cfg.faqs.map(f => f.id === id ? { ...f, [field]: val } : f));
  const removeFaq = (id: string) => set('faqs', cfg.faqs.filter(f => f.id !== id));

  const addAction = () => set('actions', [...cfg.actions, { id: Date.now().toString(), trigger: '', label: '', url: '' }]);
  const updateAction = (id: string, field: keyof ActionBtn, val: string) =>
    set('actions', cfg.actions.map(a => a.id === id ? { ...a, [field]: val } : a));
  const removeAction = (id: string) => set('actions', cfg.actions.filter(a => a.id !== id));

  const handleKBFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const text = ev.target?.result as string;
      set('knowledgeText', cfg.knowledgeText + `\n\n[Import z: ${f.name}]\n${text.slice(0, 8000)}`);
    };
    reader.readAsText(f);
  };

  const scrapeUrl = async () => {
    if (!cfg.websiteUrl) return;
    setScrapingUrl(true);
    await new Promise(r => setTimeout(r, 2000));
    set('knowledgeText', cfg.knowledgeText + `\n\n[Pobrano dane ze: ${cfg.websiteUrl}]\nTreść strony zostanie przetworzona przez nasz zespół podczas wdrożenia.`);
    setScrapingUrl(false);
  };

  const generateKB = async () => {
    if (!cfg.niche) return;
    setGeneratingKB(true);
    await new Promise(r => setTimeout(r, 2200));
    set('knowledgeText', cfg.knowledgeText + `\n\n[Baza wiedzy: ${cfg.niche}]\nZostanie wygenerowana przez nasz zespół — terminologia branżowa, FAQ, procedury, cennik i protokoły awaryjne dostosowane do niszy "${cfg.niche}".`);
    setGeneratingKB(false);
  };

  const downloadConfig = () => {
    const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-${cfg.businessName || 'config'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: `Konfiguracja chatbota dla: ${cfg.businessName || '—'}\n\n${contactMessage}\n\n--- KONFIGURACJA ---\n${JSON.stringify(cfg, null, 2)}`,
          formType: 'project',
          projectType: `Chatbot AI – ${cfg.businessName || 'nowa firma'}`,
          budget: 'od 1000 zł',
          timeline: '1–2 tygodnie',
          description: contactMessage || 'Konfiguracja chatbota z kreatora',
          requirements: [
            cfg.niche && `Branża: ${cfg.niche}`,
            cfg.mainServices && `Usługi: ${cfg.mainServices}`,
            cfg.personality && `Osobowość: ${cfg.personality}`,
          ].filter(Boolean),
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white text-black">

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO — adapted from websites/HeroSection
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="relative h-[60svh] md:h-[90svh] md:min-h-[760px] overflow-hidden border-b border-white/10">

        {/* Background image — drop /_resources/ai-chatbot-hero.webp to activate */}
        <div
          className="absolute inset-0 hidden md:block bg-center bg-cover"
          style={{ backgroundImage: 'url(/_resources/ai-chatbot-hero.webp)', filter: 'brightness(0.62) saturate(0.88)' }}
        />
        {/* Fallback / mobile gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#05091a] via-[#071030] to-[#06183d]" />

        {/* Vignette overlays (desktop) */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.76) 30%, rgba(0,0,0,0.44) 48%, rgba(0,0,0,0.14) 66%, rgba(0,0,0,0.02) 84%)' }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.24) 55%, rgba(0,0,0,0.9) 100%)' }}
        />

        {/* Glow blobs */}
        <div className="absolute top-[16%] left-[24%] -translate-x-1/2 w-[62rem] h-[34rem] rounded-full bg-blue-500/9 blur-[175px] pointer-events-none hidden md:block" />
        <div className="absolute top-[31%] right-[-8%] w-[30rem] h-[30rem] rounded-full bg-blue-400/10 blur-[170px] pointer-events-none hidden md:block" />

        {/* Content */}
        <div
          className="relative z-10 h-full flex flex-col justify-center"
          style={{ paddingLeft: EDGE_PADDING, paddingRight: EDGE_PADDING }}
        >
          <div className="relative max-w-[1120px] text-center md:text-left mx-auto md:mx-0 -mt-3 md:-mt-40">
            <div className="relative">

              <AnimatedBlock delay={0}>
                <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-black/35 backdrop-blur-sm text-[10px] md:text-sm font-medium text-gray-100/70 tracking-[0.18em] md:tracking-[0.22em]">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  CHATBOT AI · INTEGRACJA AI
                </p>
              </AnimatedBlock>

              <AnimatedBlock delay={120}>
                <h1 className="mt-5 md:mt-6 text-3xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                  <span className="md:hidden">
                    <span className="text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 via-gray-100 to-white">
                      Chatbot AI stworzony<br />
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                      pod Twoją firmę
                    </span>
                  </span>
                  <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-tr from-gray-300 via-gray-100 to-white">
                    Chatbot&nbsp;AI&nbsp;stworzony
                  </span>
                  <br className="hidden md:block" />
                  <span className="hidden md:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">
                    pod Twoją firmę
                  </span>
                </h1>
              </AnimatedBlock>

              <AnimatedBlock delay={240}>
                <h2 className="mt-4 md:mt-5 text-base md:text-2xl text-blue-50/70 font-medium max-w-xl md:max-w-2xl mx-auto md:mx-0">
                  <span className="md:hidden">
                    Odpowiada 24/7, zna Twoją ofertę i obsługuje<br />klientów bez Twojej ingerencji.
                  </span>
                  <span className="hidden md:inline">
                    Odpowiada 24/7, zna Twoją ofertę i obsługuje klientów bez Twojej ingerencji.
                  </span>
                </h2>
              </AnimatedBlock>

              <AnimatedBlock delay={520}>
                <div className="mt-7 md:mt-8 flex flex-col md:flex-row gap-3 md:gap-4 justify-center md:justify-start items-stretch sm:items-center md:items-start">
                  <a
                    href="#kreator"
                    onMouseMove={mainButton.handleMouseMove}
                    onMouseEnter={mainButton.handleMouseEnter}
                    onMouseLeave={mainButton.handleMouseLeave}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-12 px-8 text-sm md:text-base font-semibold text-white relative overflow-hidden transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]"
                    style={{ background: `radial-gradient(circle at ${mainButton.mousePosition.x}% ${mainButton.mousePosition.y}%, #248affff, #248affff 30%, #1c86ffff 60%, #1985ff)` }}
                  >
                    Skonfiguruj chatbota
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <Link
                    href="/contact?tab=meeting"
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-12 px-8 text-sm md:text-base font-medium text-white border border-white/55 bg-transparent hover:bg-white/10 transition-all duration-300 active:scale-95 group shadow-[0_4px_20px_rgba(255,255,255,0.08)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.16)]"
                  >
                    Bezpłatna konsultacja
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </AnimatedBlock>

              {/* Mobile rotating highlight */}
              <AnimatedBlock delay={620}>
                <div className="md:hidden mt-4 flex items-center justify-center relative h-10 max-w-xl mx-auto">
                  {heroHighlights.map((item, index) => {
                    const isActive = activeMobileProofIndex === index;
                    const isPrevious = index === (activeMobileProofIndex - 1 + heroHighlights.length) % heroHighlights.length;
                    return (
                      <div
                        key={`mobile-${item.id}`}
                        className={`flex items-center gap-2 absolute transition-all duration-500 ease-in-out ${
                          isActive ? 'opacity-100 translate-x-0' : isPrevious ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                        }`}
                      >
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2 text-white" strokeWidth={4} />
                        </div>
                        <span className="text-xs font-medium text-gray-300">{item.text}</span>
                      </div>
                    );
                  })}
                </div>
              </AnimatedBlock>

            </div>
          </div>
        </div>

        {/* Bottom highlights grid (desktop) */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 hidden md:block"
          style={{ paddingLeft: EDGE_PADDING, paddingRight: EDGE_PADDING }}
        >
          <div className="relative mt-6 border-t border-white/10 py-4">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40rem] h-[10rem] rounded-full bg-blue-500/14 blur-[130px] pointer-events-none" />
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
              {heroHighlights.map((item) => (
                <div key={item.id} className="min-h-[56px]">
                  <p className="text-sm font-semibold tracking-[0.18em]">
                    <span className="text-blue-300">#</span>
                    <span className="text-white">{item.id}</span>
                  </p>
                  <p className="mt-2 text-sm md:text-base text-white/90 leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ABOUT US — 100% copy from websites/AboutSection
      ═══════════════════════════════════════════════════════════════════════ */}
      <div className="bg-black">
        <AboutSection />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          OFFER TICKER — exact copy from OfferTickerSection
      ═══════════════════════════════════════════════════════════════════════ */}
      <OfferTickerSection />

      {/* ═══════════════════════════════════════════════════════════════════════
          SEO SECTION — about the chatbot AI service
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-blue-600 mb-6">
                <span className="w-5 h-px bg-blue-600" />
                Czym jest chatbot AI?
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-black leading-[1.1] mb-6">
                Wirtualny asystent,
                <br />
                <span className="text-blue-600">który nigdy nie śpi</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Chatbot AI to inteligentny program, który rozmawia z Twoimi klientami w czasie rzeczywistym — odpowiada na pytania, zbiera leady, umawia spotkania i przekazuje klientów do konsultanta wtedy, gdy naprawdę tego potrzebują.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                W przeciwieństwie do gotowych rozwiązań, nasz chatbot jest trenowany na wiedzy Twojej firmy: ofercie, cenniku, FAQ i procesach. Dzięki temu odpowiada tak, jakby znał Twój biznes od podszewki — bo go zna.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Generowanie leadów', 'Obsługa klienta 24/7', 'Integracja z CRM', 'Własna wiedza firmy'].map(tag => (
                  <span key={tag} className="px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '24/7', label: 'Dostępność', desc: 'Chatbot nie bierze urlopów i nie choruje.' },
                { val: '< 2 s', label: 'Czas odpowiedzi', desc: 'Każdy klient dostaje odpowiedź natychmiast.' },
                { val: '−70%', label: 'Mniej zapytań', desc: 'Mniej powtarzalnych pytań do Ciebie.' },
                { val: '× 3', label: 'Więcej leadów', desc: 'Zbiera dane kontaktowe automatycznie.' },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.val}</div>
                  <div className="text-sm font-semibold text-black mb-2">{stat.label}</div>
                  <div className="text-sm text-gray-500 leading-snug">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONFIGURATOR — dark bg with AboutSection visual style
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="kreator" className="relative py-16 md:py-24 border-b border-white/10 overflow-hidden bg-black">

        {/* Decorative SVG lines matching AboutSection */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-screen min-w-screen h-[88%]">
            <svg className="w-full h-full" viewBox="0 0 1920 640" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path d="M34 -16 C12 96, 58 198, 30 318 C6 434, 62 540, 26 668" stroke="rgba(148,163,184,0.09)" strokeWidth="0.95" />
              <path d="M162 -14 C136 104, 196 208, 154 336 C126 446, 184 548, 152 670" stroke="rgba(148,163,184,0.1)" strokeWidth="0.92" />
              <path d="M286 -12 C260 98, 320 212, 278 332 C248 446, 304 552, 276 672" stroke="rgba(148,163,184,0.09)" strokeWidth="0.9" />
              <path d="M484 -20 C510 88, 458 206, 498 322 C530 430, 472 548, 504 668" stroke="rgba(148,163,184,0.08)" strokeWidth="0.82" />
              <path d="M678 -12 C650 104, 712 222, 666 344 C636 458, 698 562, 666 680" stroke="rgba(148,163,184,0.1)" strokeWidth="0.94" />
              <path d="M878 -14 C902 92, 852 208, 888 326 C916 436, 862 548, 892 670" stroke="rgba(148,163,184,0.07)" strokeWidth="0.8" />
              <path d="M1078 -16 C1050 108, 1112 226, 1066 350 C1034 462, 1098 566, 1068 684" stroke="rgba(148,163,184,0.1)" strokeWidth="0.94" />
              <path d="M1278 -18 C1302 88, 1248 206, 1290 324 C1322 434, 1262 548, 1294 668" stroke="rgba(148,163,184,0.08)" strokeWidth="0.82" />
              <path d="M1478 -20 C1450 104, 1512 222, 1468 346 C1438 458, 1502 564, 1468 682" stroke="rgba(148,163,184,0.09)" strokeWidth="0.9" />
              <path d="M1878 -14 C1850 108, 1912 226, 1868 350 C1838 464, 1900 566, 1868 686" stroke="rgba(148,163,184,0.1)" strokeWidth="0.95" />
            </svg>
          </div>
        </div>

        {/* Glow blobs */}
        <div className="absolute -bottom-24 left-[-26rem] w-[93rem] h-[36rem] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 right-[-8rem] w-[40rem] h-[26rem] rounded-full bg-blue-400/8 blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">

          {/* Section heading — same style as AboutSection */}
          <div className="mb-10 md:mb-14">
            <div className="flex items-center gap-4 mb-3">
              <img src="/_resources/logoWhiteSlope.webp" alt="Whiteslope Studio" className="h-9 md:h-11 w-auto object-contain" />
              <span className="text-white/45 text-xl md:text-2xl">—</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-white">Kreator chatbota</h2>
            </div>
            <p className="text-white/60 max-w-2xl text-base leading-relaxed mt-4">
              Skonfiguruj parametry bota, przetestuj go na żywo po prawej stronie i prześlij nam gotową konfigurację do wdrożenia.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start">

            {/* ── LEFT: scrolling form ────────────────────────────────────── */}
            <div className="space-y-8">

              {/* ─ 1. Bot Details ─ */}
              <SectionCard num="1" title="Szczegóły bota">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <Label required>Nazwa bota</Label>
                    <Input value={cfg.botName} onChange={v => set('botName', v)} placeholder="np. Ania, Max, Pomocnik" />
                    <p className="text-xs text-white/30 mt-1">Widoczna dla użytkowników w oknie czatu</p>
                  </div>
                  <div>
                    <Label required>Nazwa firmy</Label>
                    <Input value={cfg.businessName} onChange={v => set('businessName', v)} placeholder="np. Jan Kowalski Hydraulika" />
                  </div>
                  <div>
                    <Label>Miasto / Region</Label>
                    <Input value={cfg.city} onChange={v => set('city', v)} placeholder="np. Warszawa, Podlaskie" />
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <h4 className="text-base font-semibold text-white/80 mb-5 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    Tryb autopilota
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label>Czas oczekiwania przed odpowiedzią (s)</Label>
                      <Input type="number" value={cfg.waitTime} onChange={v => set('waitTime', v)} placeholder="2" />
                    </div>
                    <div>
                      <Label>Maks. wiadomości w konwersacji</Label>
                      <Input type="number" value={cfg.maxMessages} onChange={v => set('maxMessages', v)} placeholder="10" />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* ─ 2. Bot Training ─ */}
              <SectionCard num="2" title="Trening bota">

                {/* URL scraper */}
                <div className="mb-6">
                  <Label>
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-blue-400 inline" />
                      Adres strony internetowej (pobierz dane automatycznie)
                    </span>
                  </Label>
                  <div className="flex gap-3">
                    <input
                      type="url"
                      value={cfg.websiteUrl}
                      onChange={e => set('websiteUrl', e.target.value)}
                      placeholder="https://twojastrona.pl"
                      className="flex-1 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white placeholder-white/30"
                    />
                    <button
                      onClick={scrapeUrl}
                      disabled={!cfg.websiteUrl || scrapingUrl}
                      className="px-5 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-40 whitespace-nowrap cursor-pointer"
                    >
                      {scrapingUrl ? 'Pobieranie…' : 'Pobierz dane'}
                    </button>
                  </div>
                </div>

                {/* Niche */}
                <div className="mb-6">
                  <Label required>Branża / Nisza</Label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={cfg.niche}
                      onChange={e => set('niche', e.target.value)}
                      placeholder="np. hydraulika, kosmetologia, kancelaria prawna"
                      className="flex-1 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/5 text-white placeholder-white/30"
                    />
                    <button
                      onClick={generateKB}
                      disabled={!cfg.niche || generatingKB}
                      className="px-5 py-3 border border-white/15 text-white/80 text-sm font-medium rounded-xl hover:bg-white/10 transition-colors disabled:opacity-40 whitespace-nowrap cursor-pointer"
                    >
                      {generatingKB ? 'Generuję…' : '+ Baza wiedzy'}
                    </button>
                  </div>
                  <p className="text-xs text-white/30 mt-1">Generuje automatyczną bazę wiedzy branżowej</p>
                </div>

                {/* Services & USP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label required>Główne usługi / produkty</Label>
                    <Textarea
                      value={cfg.mainServices}
                      onChange={v => set('mainServices', v)}
                      placeholder="np. Wymiana instalacji hydraulicznej, pogotowie wodne, montaż armatury"
                    />
                  </div>
                  <div>
                    <Label>Unikalne wyróżniki (USP)</Label>
                    <Textarea value={cfg.usp} onChange={v => set('usp', v)} placeholder="np. 15 lat doświadczenia, certyfikowani specjaliści, gwarancja 5 lat" />
                  </div>
                </div>

                <div className="mb-6">
                  <Label>Promocje i aktualne oferty</Label>
                  <Input value={cfg.promotions} onChange={v => set('promotions', v)} placeholder="np. Bezpłatna wycena na miejscu, 10% rabat do końca miesiąca" />
                </div>

                {/* FAQ entries */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Pytania i odpowiedzi (FAQ bota)</Label>
                    <button
                      onClick={addFaq}
                      className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Dodaj pytanie
                    </button>
                  </div>
                  {cfg.faqs.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 p-6 text-center">
                      <p className="text-white/30 text-sm">Brak pytań FAQ. Kliknij „Dodaj pytanie" żeby zacząć.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cfg.faqs.map(faq => (
                        <div key={faq.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="flex justify-end mb-2">
                            <button onClick={() => removeFaq(faq.id)} className="text-white/30 hover:text-red-400 transition-colors cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <Input value={faq.question} onChange={v => updateFaq(faq.id, 'question', v)} placeholder="Pytanie: np. Ile trwa realizacja zlecenia?" />
                          <div className="mt-2">
                            <Textarea value={faq.answer} onChange={v => updateFaq(faq.id, 'answer', v)} placeholder="Odpowiedź bota…" rows={2} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Knowledge text */}
                <div className="mb-4">
                  <Label>Baza wiedzy (tekst)</Label>
                  <Textarea value={cfg.knowledgeText} onChange={v => set('knowledgeText', v)} placeholder="Wklej tutaj szczegółowe opisy usług, procedury, cenniki, instrukcje…" rows={6} />
                  <p className="text-xs text-white/30 mt-1">Może być uzupełniana automatycznie przez scraper URL lub generator branżowy.</p>
                </div>

                {/* File import */}
                <div>
                  <Label>Import pliku (TXT/MD)</Label>
                  <button
                    onClick={() => kbFileRef.current?.click()}
                    className="flex items-center gap-2 px-5 py-3 border border-white/15 text-white/70 text-sm rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Wybierz plik do importu
                  </button>
                  <input ref={kbFileRef} type="file" accept=".txt,.md" onChange={handleKBFile} className="hidden" />
                </div>
              </SectionCard>

              {/* ─ 3. Bot Goals ─ */}
              <SectionCard num="3" title="Cel i osobowość bota">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label required>Osobowość bota</Label>
                    <Input value={cfg.personality} onChange={v => set('personality', v)} placeholder="np. profesjonalny, przyjazny, konkretny" />
                  </div>
                  <div>
                    <Label required>Główny cel bota</Label>
                    <Input value={cfg.intent} onChange={v => set('intent', v)} placeholder="np. generowanie leadów, obsługa klienta, rezerwacje" />
                  </div>
                </div>

                <div className="mb-6">
                  <Label>Dodatkowe wskazówki dla bota</Label>
                  <Textarea
                    value={cfg.additionalInfo}
                    onChange={v => set('additionalInfo', v)}
                    placeholder="np. Bot nie może podawać cen bez konsultacji, zawsze zapisuj dane klienta, nie komentuj konkurencji…"
                    rows={4}
                  />
                </div>

                {/* Actions / triggers */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Label>Akcje i przyciski bota</Label>
                    <button
                      onClick={addAction}
                      className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Dodaj akcję
                    </button>
                  </div>
                  {cfg.actions.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-white/10 p-5 text-center">
                      <p className="text-white/30 text-sm">Brak akcji. Akcje to przyciski lub przekierowania wywoływane słowem kluczowym.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cfg.actions.map(action => (
                        <div key={action.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                          <div className="flex justify-end mb-2">
                            <button onClick={() => removeAction(action.id)} className="text-white/30 hover:text-red-400 transition-colors cursor-pointer">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <Input value={action.trigger} onChange={v => updateAction(action.id, 'trigger', v)} placeholder="Słowo kluczowe (np. cena)" />
                            <Input value={action.label} onChange={v => updateAction(action.id, 'label', v)} placeholder="Etykieta przycisku" />
                            <Input value={action.url} onChange={v => updateAction(action.id, 'url', v)} placeholder="URL docelowy" type="url" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Human handover */}
                <div className="pt-6 border-t border-white/10">
                  <h4 className="text-base font-semibold text-white/80 mb-5 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-400" />
                    Handoff do człowieka
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label>Telefon do konsultanta</Label>
                      <Input type="tel" value={cfg.humanHandoverPhone} onChange={v => set('humanHandoverPhone', v)} placeholder="+48 000 000 000" />
                    </div>
                    <div>
                      <Label>E-mail do konsultanta</Label>
                      <Input type="email" value={cfg.humanHandoverEmail} onChange={v => set('humanHandoverEmail', v)} placeholder="kontakt@firma.pl" />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* ─ Submit ─ */}
              {submitted ? (
                <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-5">
                    <Check className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Konfiguracja wysłana!</h3>
                  <p className="text-white/60">Odezwiemy się w ciągu 24 godzin.</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">✓</div>
                    <h3 className="text-2xl font-bold text-white">Prześlij konfigurację</h3>
                  </div>

                  <button
                    onClick={downloadConfig}
                    className="flex items-center gap-2 px-5 py-3 border border-white/15 text-white/70 text-sm rounded-xl hover:bg-white/10 transition-colors mb-8 cursor-pointer"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    Pobierz JSON konfiguracji
                  </button>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <Label required>Twoje imię</Label>
                        <Input value={contactName} onChange={setContactName} placeholder="Jan Kowalski" />
                      </div>
                      <div>
                        <Label required>E-mail kontaktowy</Label>
                        <Input type="email" value={contactEmail} onChange={setContactEmail} placeholder="jan@firma.pl" />
                      </div>
                    </div>
                    <div>
                      <Label>Dodatkowe informacje</Label>
                      <Textarea value={contactMessage} onChange={setContactMessage} placeholder="Coś ważnego, czego nie zdążyłeś uwzględnić w konfiguratorze?" rows={4} />
                    </div>
                    <button
                      type="submit"
                      disabled={!contactName || !contactEmail || submitLoading}
                      onMouseMove={ctaBtn.handleMouseMove}
                      onMouseEnter={ctaBtn.handleMouseEnter}
                      onMouseLeave={ctaBtn.handleMouseLeave}
                      className="w-full h-14 rounded-full text-white font-bold text-base disabled:opacity-40 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                      style={{ background: `radial-gradient(circle at ${ctaBtn.mousePosition.x}% ${ctaBtn.mousePosition.y}%, #248affff, #248affff 30%, #1c86ffff 60%, #1985ff)` }}
                    >
                      {submitLoading ? 'Wysyłam…' : 'Wyślij konfigurację → Wdrożenie'}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* ── RIGHT: sticky live chat preview ────────────────────────── */}
            <div className="lg:sticky lg:top-28">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                {/* Chat header */}
                <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{cfg.botName || 'Twój Bot'}</p>
                    <p className="text-xs text-white/40">{cfg.businessName || 'Podgląd na żywo'}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-white/40">Online</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="h-72 overflow-y-auto px-4 py-4 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}>
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white/10 text-white/85 rounded-bl-sm'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Input */}
                <div className="px-4 py-3 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendChat()}
                    placeholder="Napisz wiadomość…"
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={sendChat}
                    disabled={!chatInput.trim()}
                    className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    Wyślij
                  </button>
                </div>
              </div>

              {/* Config progress */}
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm font-semibold text-white/70 mb-4">Gotowość konfiguracji</p>
                <div className="space-y-2.5">
                  {[
                    { label: 'Nazwa bota', done: !!cfg.botName },
                    { label: 'Nazwa firmy', done: !!cfg.businessName },
                    { label: 'Branża / Nisza', done: !!cfg.niche },
                    { label: 'Osobowość', done: !!cfg.personality },
                    { label: 'Cel bota', done: !!cfg.intent },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-blue-600' : 'bg-white/10'}`}>
                        {item.done && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                      </div>
                      <span className={`text-sm ${item.done ? 'text-white/80' : 'text-white/35'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FAQ SECTION
      ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-14">
            <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-blue-600 mb-4">
              <span className="w-5 h-px bg-blue-600" />
              FAQ
              <span className="w-5 h-px bg-blue-600" />
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black">Często zadawane pytania</h2>
          </div>

          <div className="space-y-3">
            {FAQ_DATA.map((item: { id: string; question: string; answer: string }) => (
              <div key={item.id} className="rounded-2xl border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left bg-white hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <span className="text-base font-semibold text-black pr-6">{item.question}</span>
                  <span className={`text-blue-600 text-xl font-light flex-shrink-0 transition-transform duration-300 ${openFaq === item.id ? 'rotate-45' : ''}`}>+</span>
                </button>
                <AnimatePresence>
                  {openFaq === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-6 pt-1 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
