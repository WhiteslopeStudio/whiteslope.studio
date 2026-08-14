'use client';

import { useState, useRef } from 'react';
import { ArrowRight, CheckCircle, Check, Mail, Phone, MapPin, Clock } from 'lucide-react';
import { colors, fonts, headingStyle, ctaBaseClass } from './theme';

const SERVICES = [
  {
    id: 'website-film',
    label: 'Film na stronę',
    description: 'Profesjonalne ujęcia zespołu, miejsca i historii marki. Trwały materiał na hero section.',
    features: ['Ujęcia zespołu i lokalizacji', 'Historia marki', 'Hero section ready', 'Trwały content'],
  },
  {
    id: 'social-media',
    label: 'Rolki i social media',
    description: 'Dynamiczne rolki pod Reels i TikTok. Montaż, napisy, muzyka i motion graphics w pakiecie.',
    features: ['Format 9:16 pod Reels / TikTok', 'Motion graphics i napisy', 'Muzyka i sound design'],
  },
  {
    id: 'ugc',
    label: 'UGC do reklam',
    description: 'Autentyczne recenzje i unboxingi od twórców dopasowanych do Twojej branży. Wyższy CTR.',
    features: ['Twórcy dopasowani do branży', 'Naturalne recenzje / unboxingi', 'Gotowe do reklam Meta / TikTok', 'Wyższy CTR'],
  },
  {
    id: 'postproduction',
    label: 'Montaż i post-prod.',
    description: 'Masz surowy materiał? Oddaj go nam. Dynamiczne cięcia, motion, sound design, każdy format.',
    features: ['Dynamiczne cięcia i przejścia', 'Motion graphics', 'Sound design i muzyka', 'Format 9:16, 1:1, 16:9'],
  },
];

const BUDGETS = [
  'Do 300 zł',
    '300–500 zł',
    '500–1 000 zł',
  '1 000–2 500 zł',
  '2 500–5 000 zł',
  '5 000–10 000 zł',
  'Powyżej 10 000 zł',
  'Nie jestem pewien – potrzebuję wyceny',
];

const TIMELINES = [
  'Jak najszybciej',
  'Do 2 tygodni',
  'Do miesiąca',
  '1–3 miesiące',
  'Elastyczny termin',
];

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-2xl px-5 py-3.5 text-white placeholder-white/50 focus:outline-none transition-colors text-sm"
      style={{
        background: `${colors.white}08`,
        border: `1px solid ${colors.white}12`,
        fontFamily: fonts.body,
      }}
      onFocus={e => (e.currentTarget.style.borderColor = `${colors.white}40`)}
      onBlur={e => (e.currentTarget.style.borderColor = `${colors.white}12`)}
    />
  );
}

function SelectField({ value, onChange, children }: {
  value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded-2xl px-5 py-3.5 focus:outline-none appearance-none cursor-pointer text-sm transition-colors"
      style={{
        background: '#2a2a2a',
        border: `1px solid ${colors.white}20`,
        color: value ? colors.white : `${colors.white}70`,
        fontFamily: fonts.body,
        colorScheme: 'dark',
      }}
    >
      {children}
    </select>
  );
}

export default function VideoBriefSection() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const handleServiceClick = (id: string) => {
    setSelectedService(prev => {
      const next = prev === id ? null : id;
      if (next) setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
      return next;
    });
  };

  const selected = SERVICES.find(s => s.id === selectedService);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) e.name = 'Podaj imię i nazwisko';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Podaj prawidłowy email';
    if (!budget) e.budget = 'Wybierz budżet';
    if (!timeline) e.timeline = 'Wybierz termin';
    if (!message.trim() || message.trim().length < 20) e.message = 'Opisz projekt (min. 20 znaków)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'project',
          formData: {
            name,
            email,
            phone,
            company,
            projectType: selected ? `Video – ${selected.label}` : 'Video Marketing',
            budget,
            timeline,
            description: message,
            requirements: selected ? selected.features : [],
            hasExistingSite: false,
            currentSiteUrl: '',
            preferredContact: 'any',
            contactHours: '',
            subject: selected ? `Brief wideo: ${selected.label}` : 'Brief wideo',
          },
        }),
      });
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Błąd serwera');
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      alert(`Błąd wysyłania: ${msg}\n\nNapisz na kontakt@whiteslope.studio`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="brief" className="w-full py-20 md:py-28 px-4 md:px-6" style={{ backgroundColor: colors.black }}>
        <div className="max-w-xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `${colors.neonPink}20`, border: `1px solid ${colors.neonPink}40` }}
          >
            <CheckCircle size={30} style={{ color: colors.neonPink }} />
          </div>
          <h3 className="text-3xl font-normal mb-3" style={{ ...headingStyle, color: colors.white }}>Dziękujemy!</h3>
          <p style={{ fontFamily: fonts.body, color: `${colors.white}60` }}>
            Odezwiemy się w ciągu <strong style={{ color: colors.white }}>72 godzin</strong>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="brief"
      className="w-full py-20 md:py-28 px-4 md:px-6"
      style={{ backgroundColor: colors.black }}
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

        {/* ── Lewa strona: tylko Kontakt ── */}
        <div className="flex-shrink-0 w-full lg:w-56 lg:pt-2">
          <p
            className="text-xs uppercase tracking-[0.18em] mb-5"
            style={{ fontFamily: fonts.cta, color: `${colors.white}80` }}
          >
            Kontakt
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Mail size={14} className="mt-0.5 flex-shrink-0" style={{ color: `${colors.white}60` }} />
              <a href="mailto:kontakt@whiteslope.studio" style={{ color: `${colors.white}85`, fontFamily: fonts.body }}>
                kontakt@whiteslope.studio
              </a>
            </div>
            <div className="flex items-start gap-3">
              <Phone size={14} className="mt-0.5 flex-shrink-0" style={{ color: `${colors.white}60` }} />
              <div style={{ fontFamily: fonts.body, color: `${colors.white}85` }}>
                <div>+48 662 581 368</div>
                <div>+48 731 721 760</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: `${colors.white}60` }} />
              <span style={{ fontFamily: fonts.body, color: `${colors.white}85` }}>Białystok, Polska</span>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={14} className="mt-0.5 flex-shrink-0" style={{ color: `${colors.white}60` }} />
              <span style={{ fontFamily: fonts.body, color: `${colors.white}85` }}>Pon – Pt: 9:00–17:00</span>
            </div>
          </div>
        </div>

        {/* ── Prawa strona: nagłówek + kafle + formularz ── */}
        <div className="flex-1 w-full min-w-0" ref={formRef}>

          {/* Nagłówek */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[0.95] mb-4"
            style={{ ...headingStyle, color: colors.white }}
          >
            {selected ? (
              <><span style={{ color: colors.gold }}>{selected.label}</span>{' '}— opisz projekt.</>
            ) : (
              <>Napisz, czego potrzebujesz.</>
            )}
          </h2>

          {/* Features wybranej usługi pod headingiem */}
          <div className="mb-8" style={{ minHeight: '1.5rem' }}>
            {selected && (
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {selected.features.map(f => (
                  <li
                    key={f}
                    className="flex items-center gap-1.5 text-xs"
                    style={{ fontFamily: fonts.cta, color: `${colors.white}80` }}
                  >
                    <Check size={9} style={{ color: colors.gold, flexShrink: 0 }} />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 4 kafle w rzędzie */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            {SERVICES.map(s => {
              const isActive = s.id === selectedService;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedService(prev => prev === s.id ? null : s.id)}
                  className="text-left px-5 py-5 rounded-2xl transition-all duration-300 cursor-pointer"
                  style={{
                    backgroundColor: isActive ? colors.gold : `${colors.white}08`,
                    border: `1px solid ${isActive ? colors.gold : `${colors.white}12`}`,
                    boxShadow: isActive ? `0 0 28px ${colors.gold}30` : 'none',
                  }}
                >
                  <div
                    className="w-6 h-1 rounded-full mb-4"
                    style={{ backgroundColor: isActive ? colors.black : `${colors.white}25` }}
                  />
                  <p
                    className="font-normal text-xl leading-tight mb-3"
                    style={{ ...headingStyle, color: isActive ? colors.black : colors.white }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="text-xs leading-snug"
                    style={{ fontFamily: fonts.body, color: isActive ? `${colors.black}90` : `${colors.white}70` }}
                  >
                    {s.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Formularz */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                {errors.name && <p className="text-red-400 text-xs mb-1">{errors.name}</p>}
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Imię i nazwisko *" />
              </div>
              <div>
                {errors.email && <p className="text-red-400 text-xs mb-1">{errors.email}</p>}
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email *" />
              </div>
              <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefon (opcjonalny)" />
              <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Firma (opcjonalna)" />
              <div>
                {errors.budget && <p className="text-red-400 text-xs mb-1">{errors.budget}</p>}
                <SelectField value={budget} onChange={setBudget}>
                  <option value="">Budżet *</option>
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </SelectField>
              </div>
              <div>
                {errors.timeline && <p className="text-red-400 text-xs mb-1">{errors.timeline}</p>}
                <SelectField value={timeline} onChange={setTimeline}>
                  <option value="">Termin realizacji *</option>
                  {TIMELINES.map(t => <option key={t} value={t}>{t}</option>)}
                </SelectField>
              </div>
            </div>

            <div>
              {errors.message && <p className="text-red-400 text-xs mb-1">{errors.message}</p>}
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onInput={e => { const t = e.currentTarget; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }}
                placeholder="Opisz projekt – branża, cel, co chcesz osiągnąć... *"
                className="w-full rounded-2xl px-5 py-3.5 text-white placeholder-white/50 focus:outline-none transition-colors resize-none overflow-hidden text-sm"
                style={{
                  background: `${colors.white}08`,
                  border: `1px solid ${colors.white}12`,
                  fontFamily: fonts.body,
                  minHeight: '7rem',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = `${colors.white}40`)}
                onBlur={e => (e.currentTarget.style.borderColor = `${colors.white}12`)}
              />
            </div>

            <div className="pt-2">
              <div className="hidden md:flex items-center justify-between">
                <p className="text-xs" style={{ fontFamily: fonts.body, color: `${colors.white}60` }}>
                  Wycena w ciągu 72h
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${ctaBaseClass} disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ backgroundColor: colors.neonPink, color: colors.white, fontFamily: fonts.cta }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    <>Wyślij<ArrowRight size={18} /></>
                  )}
                </button>
              </div>

              <div className="md:hidden flex flex-col items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${ctaBaseClass} w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
                  style={{ backgroundColor: colors.neonPink, color: colors.white, fontFamily: fonts.cta }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wysyłanie...
                    </>
                  ) : (
                    <>Wyślij<ArrowRight size={18} /></>
                  )}
                </button>
                <p className="text-xs text-center" style={{ fontFamily: fonts.body, color: `${colors.white}60` }}>
                  Wycena w ciągu 72h
                </p>
              </div>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
