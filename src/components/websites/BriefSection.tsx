'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ArrowLeft, CheckCircle, Check, Mail, Phone, MapPin, Clock,
  Calendar, Tag, MessageSquare, FileText, Globe, Boxes, Building2, TrendingUp, Wrench,
} from 'lucide-react';

const QUICK_ACTIONS = [
  { label: 'Umów spotkanie', href: '/contact?tab=meeting', icon: Calendar, desc: 'Bezpłatna konsultacja online' },
  { label: 'Zapytaj o cenę', href: '/contact?tab=quote', icon: Tag, desc: 'Wycena w 72h' },
  { label: 'Zadaj pytanie', href: '/contact?tab=question', icon: MessageSquare, desc: 'Szybka odpowiedź' },
  { label: 'Zgłoś projekt', href: '/contact?tab=project', icon: FileText, desc: 'Opisz swój projekt' },
];

// ─── STAŁE ────────────────────────────────────────────────────────────────────

const PAGE_SIZES = [
  { id: 'landing', label: '1 strona – Landing Page', desc: 'Prosta strona wizytówka lub sprzedażowa' },
  { id: 'business', label: '2–9 stron – Biznes Standard', desc: 'Pełna strona firmowa z podstronami' },
  { id: 'large', label: '10+ stron – Większa strona', desc: 'Portal, sklep lub rozbudowany projekt' },
];

const CMS_OPTIONS = [
  { id: 'static', label: 'Nie potrzebuję – statyczna strona' },
  { id: 'cms', label: 'Potrzebuję – opisz w wiadomości' },
];

const CONTENT_OPTIONS = [
  { id: 'have', label: 'Posiadam content' },
  { id: 'need', label: 'Potrzebuję contentu – copy, photo, rolki' },
];

const HOSTING_OPTIONS = [
  { id: 'standard', label: 'Darmowy lub 40 zł/msc przy większych projektach' },
  { id: 'cms_hosting', label: 'Z CMS – 60 zł/msc' },
];

const BUDGETS = [
  'Do 2 000 zł',
  '2 000–3 500 zł',
  '3 500–5 000 zł',
  '5 000–10 000 zł',
  '10 000–20 000 zł',
  'Powyżej 20 000 zł',
  'Nie jestem pewien – potrzebuję wyceny',
];

// kategorie projektu wybierane kafelkami w kroku 2
const PROJECT_CATEGORIES = [
  { id: 'website', label: 'Strona internetowa', desc: 'Wizytówka, biznesowa lub rozbudowany serwis', icon: Globe },
  { id: 'saas', label: 'Aplikacja SaaS', desc: 'Produkt subskrypcyjny z panelem klienta', icon: Boxes },
  { id: 'system', label: 'Dedykowany system webowy dla firmy', desc: 'Narzędzie szyte na miarę pod procesy firmy', icon: Building2 },
  { id: 'seo', label: 'Pozycjonowanie SEO', desc: 'Widoczność i ruch organiczny w wyszukiwarce', icon: TrendingUp },
  { id: 'fixes', label: 'Poprawki istniejących stron', desc: 'Redesign, poprawki i rozbudowa obecnej strony', icon: Wrench },
];

// metadane kroków formularza, używane przez pasek postępu na górze
// (3 kroki: dane kontaktowe, rodzaj projektu, reszta brief + wiadomość)
const KROKI = [
  { numer: 1, tytul: 'Szybki start' },
  { numer: 2, tytul: 'Rodzaj projektu' },
  { numer: 3, tytul: 'Szczegóły' },
];

// ikonka do kroku 1 (dane kontaktowe)
function IkonaDokumentu({ className = '' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="currentColor" d="M14 14.5h1v-9h-3v1h2zM6.5 17V3h14v14zm-3 3V6.616h1V19h12.385v1z" />
    </svg>
  );
}

function RadioGroup<T extends string>({
  name, options, value, onChange,
}: {
  name: string;
  options: { id: T; label: string; desc?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="space-y-2">
      {options.map(o => (
        <label
          key={o.id}
          className={`flex items-start gap-3 cursor-pointer rounded-[6px] border px-4 py-3 transition-all duration-200 ${
            value === o.id
              ? 'border-blue-500 bg-blue-500/10'
              : 'border-white/10 bg-white/5 hover:border-white/25'
          }`}
        >
          <input type="radio" name={name} className="sr-only" checked={value === o.id} onChange={() => onChange(o.id)} />
          <div className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
            value === o.id ? 'border-blue-400' : 'border-white/30'
          }`}>
            {value === o.id && <div className="w-2 h-2 rounded-full bg-blue-400" />}
          </div>
          <div>
            <span className="text-white text-sm font-medium">{o.label}</span>
            {o.desc && <p className="text-white/45 text-xs mt-0.5">{o.desc}</p>}
          </div>
        </label>
      ))}
    </div>
  );
}

function CheckGroup({
  options, value, onChange,
}: {
  options: string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  // dodaje lub usuwa pojedynczy element z listy zaznaczonych
  const przelacza_element = (item: string) =>
    onChange(value.includes(item) ? value.filter(v => v !== item) : [...value, item]);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(o => {
        const active = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => przelacza_element(o)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border transition-all duration-200 ${
              active
                ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
            }`}
          >
            {active && <span className="mr-1">✓</span>}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-white/80 mb-2">
      {children} {required && <span className="text-red-400">*</span>}
    </label>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full bg-white/5 border border-white/10 rounded-[6px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#0070ff] focus:ring-1 focus:ring-[#0070ff]/30 transition-all"
    />
  );
}

function SelectNative({ value, onChange, children }: {
  value: string; onChange: (v: string) => void; children: React.ReactNode;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full rounded-[6px] px-4 py-3 focus:outline-none focus:border-blue-400 transition-colors appearance-none cursor-pointer border border-white/10"
      style={{ colorScheme: 'dark', background: '#1c1c1e', color: '#ffffff' }}
    >
      {children}
    </select>
  );
}

// pasek postępu na górze karty z formularzem
//
// wyjaśnienie wyrównania linii: kółka i ich podpisy są rysowane w DWÓCH oddzielnych
// rzędach grid o tych samych kolumnach (repeat(N, 1fr)). Dzięki temu kółko i podpis
// zawsze mają ten sam środek w poziomie. Linia łącząca kółka jest osobnym elementem
// z position: absolute, ustawionym dokładnie na wysokości środka kółek (top-4, czyli
// połowa wysokości kółka 32px) i policzona tak, żeby zaczynać się i kończyć w środku
// pierwszego i ostatniego kółka - nie na krawędziach całego paska.
function WskaznikPostepu({
  krokAktualny, najwyzszyOdwiedzonyKrok, onKliknijKrok,
}: {
  krokAktualny: number;
  najwyzszyOdwiedzonyKrok: number;
  onKliknijKrok: (numer: number) => void;
}) {
  const liczbaKrokow = KROKI.length;
  const polowaKolumny = 100 / (2 * liczbaKrokow);
  const szerokoscLinii = 100 - 2 * polowaKolumny;
  const postepProcent = ((Math.min(krokAktualny, liczbaKrokow) - 1) / (liczbaKrokow - 1)) * szerokoscLinii;

  return (
    <div className="mb-8">
      <div className="relative h-8">
        <div
          className="absolute top-4 h-px bg-white/10"
          style={{ left: `${polowaKolumny}%`, width: `${szerokoscLinii}%` }}
        />
        <div
          className="absolute top-4 h-px bg-blue-500 transition-all duration-300"
          style={{ left: `${polowaKolumny}%`, width: `${postepProcent}%` }}
        />
        <div className="relative grid h-8" style={{ gridTemplateColumns: `repeat(${liczbaKrokow}, 1fr)` }}>
          {KROKI.map(krok => {
            const ukonczony = krok.numer < krokAktualny;
            const aktywny = krok.numer === krokAktualny;
            const osiagalny = krok.numer <= najwyzszyOdwiedzonyKrok;
            return (
              <div key={krok.numer} className="flex justify-center">
                <button
                  type="button"
                  onClick={() => onKliknijKrok(krok.numer)}
                  disabled={!osiagalny}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-xs font-semibold transition-colors ${
                    ukonczony
                      ? 'bg-blue-500 border-blue-500 text-white hover:bg-blue-400 cursor-pointer'
                      : aktywny
                        ? 'border-blue-400 text-blue-300 bg-blue-500/10'
                        : osiagalny
                          ? 'border-white/25 text-white/50 hover:border-white/40 cursor-pointer'
                          : 'border-white/15 text-white/30 cursor-not-allowed'
                  }`}
                >
                  {ukonczony ? <Check className="w-4 h-4" /> : krok.numer}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid mt-1.5" style={{ gridTemplateColumns: `repeat(${liczbaKrokow}, 1fr)` }}>
        {KROKI.map(krok => (
          <div
            key={krok.numer}
            className={`text-center text-[11px] font-medium ${
              krok.numer === krokAktualny ? 'text-white' : krok.numer < krokAktualny ? 'text-white/60' : 'text-white/30'
            }`}
          >
            {krok.tytul}
          </div>
        ))}
      </div>

      {krokAktualny === liczbaKrokow && (
        <p className="mt-4 text-center text-xs font-medium text-blue-300">
          To już ostatni krok — sprawdź dane i wyślij brief.
        </p>
      )}
    </div>
  );
}

// ─── GŁÓWNY KOMPONENT ─────────────────────────────────────────────────────────

export default function BriefSection() {
  const [krokAktualny, setKrokAktualny] = useState(1);
  const [najwyzszyOdwiedzonyKrok, setNajwyzszyOdwiedzonyKrok] = useState(1);

  const [projectCategory, setProjectCategory] = useState('');
  const [pageSize, setPageSize] = useState<'landing' | 'business' | 'large'>('business');
  const [cms, setCms] = useState<'static' | 'cms'>('static');
  const [contentOptions, setContentOptions] = useState<string[]>([]);
  const [hosting, setHosting] = useState<'standard' | 'cms_hosting'>('standard');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailPreferred, setEmailPreferred] = useState(false);
  const [phone, setPhone] = useState('');
  const [phonePreferred, setPhonePreferred] = useState(false);
  const [company, setCompany] = useState('');
  const [contactHours, setContactHours] = useState('');
  const [budget, setBudget] = useState(BUDGETS[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [inspirations, setInspirations] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const jestStrona = projectCategory === 'website';

  // sprawdza dane kontaktowe z pierwszego kroku
  const waliduje_krok_pierwszy = () => {
    const e: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) e.name = 'Podaj imię i nazwisko (min. 2 znaki)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Podaj prawidłowy adres email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // sprawdza czy w drugim kroku wybrano rodzaj projektu
  const waliduje_krok_drugi = () => {
    const e: Record<string, string> = {};
    if (!projectCategory) e.category = 'Wybierz rodzaj projektu, żeby przejść dalej';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // sprawdza temat i wiadomość z trzeciego kroku, przed wysyłką
  const waliduje_krok_trzeci = () => {
    const e: Record<string, string> = {};
    if (!subject.trim()) e.subject = 'Podaj temat wiadomości';
    if (!message.trim() || message.trim().length < 20) e.message = 'Opisz projekt (min. 20 znaków)';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // przechodzi do kolejnego kroku formularza, jeśli aktualny krok jest poprawnie wypełniony
  const przechodzi_dalej = () => {
    if (krokAktualny === 1 && !waliduje_krok_pierwszy()) return;
    if (krokAktualny === 2 && !waliduje_krok_drugi()) return;
    const nastepny = Math.min(krokAktualny + 1, KROKI.length);
    setKrokAktualny(nastepny);
    setNajwyzszyOdwiedzonyKrok(n => Math.max(n, nastepny));
  };

  // wraca do poprzedniego kroku formularza
  const cofa_krok = () => {
    setKrokAktualny(k => Math.max(k - 1, 1));
  };

  // przenosi bezpośrednio do wybranego kroku - tylko jeśli był on już wcześniej odwiedzony
  const idzie_do_kroku = (numer: number) => {
    if (numer <= najwyzszyOdwiedzonyKrok) {
      setKrokAktualny(numer);
    }
  };

  // zapisuje wybraną kategorię projektu (bez automatycznego przejścia dalej)
  const wybiera_kategorie = (id: string) => {
    setProjectCategory(id);
    setErrors(e => ({ ...e, category: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waliduje_krok_trzeci()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'project',
          formData: {
            name, email, phone, company,
            projectType: jestStrona
              ? (PAGE_SIZES.find(p => p.id === pageSize)?.label ?? pageSize)
              : (PROJECT_CATEGORIES.find(k => k.id === projectCategory)?.label ?? projectCategory),
            budget,
            timeline: 'Nie określono',
            description: message,
            requirements: [
              `Rodzaj projektu: ${PROJECT_CATEGORIES.find(k => k.id === projectCategory)?.label ?? 'Nie wybrano'}`,
              ...(jestStrona
                ? [
                    `CMS: ${cms === 'cms' ? 'Tak' : 'Nie'}`,
                    `Hosting: ${hosting}`,
                    `Content: ${contentOptions.join(', ') || 'Nie zaznaczono'}`,
                  ]
                : []),
            ],
            inspirations,
            hasExistingSite: false,
            currentSiteUrl: '',
            preferredContact: emailPreferred ? 'email' : phonePreferred ? 'phone' : 'any',
            contactHours,
            subject,
          },
        }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Błąd serwera');
      }
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : '';
      alert(`Wystąpił błąd podczas wysyłania: ${msg}\n\nSpróbuj ponownie lub napisz na kontakt@whiteslope.studio`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="brief" className="relative bg-black overflow-clip py-14 md:py-28">

      <div className="relative z-10 container mx-auto px-6">
        {/* Nagłówek - ta sama rodzina stylu co pozostałe sekcje na mobile */}
        <div className="max-w-2xl mb-8 md:mb-12">
          <h2 className="hero-mobile-h1 text-[clamp(23px,6.1vw,28px)] md:text-[40px] lg:text-5xl leading-[1.25] md:leading-[1.1] text-white tracking-tight">
            Wypełnij brief projektowy{' '}
            <span className="text-[#3561ff]">i otrzymaj ofertę na maila</span>
          </h2>
          <p className="mt-2 md:mt-5 text-[14px] md:text-lg font-semibold md:font-normal text-white/60 leading-relaxed max-w-[380px] md:max-w-none text-balance">
            Skonfiguruj swój projekt i wyślij wiadomość.{' '}
            <span className="text-white">Wycena w ciągu 72 h.</span>
          </p>
        </div>

        {/* ─── Formularz ───────────────────────────────────────────── */}
        {submitted ? (
          <div className="max-w-xl mx-auto text-center py-16">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Dziękujemy!</h3>
            <p className="text-white/60 leading-relaxed">
              Brief projektowy został wysłany. Przygotujemy dla Ciebie wycenę i odezwiemy się w ciągu <strong className="text-white">72 godzin</strong> na podany adres email.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 xl:gap-14">

            {/* ── LEWA KOLUMNA ──────────────────────────────────────── */}
            <div className="space-y-8">

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                <WskaznikPostepu
                  krokAktualny={krokAktualny}
                  najwyzszyOdwiedzonyKrok={najwyzszyOdwiedzonyKrok}
                  onKliknijKrok={idzie_do_kroku}
                />

                {/* key={krokAktualny} wymusza ponowne zamontowanie diva przy zmianie kroku,
                    dzięki czemu animacja wejścia odpala się za każdym razem od nowa */}
                <div key={krokAktualny} className="space-y-6 animate-krok-wejscie">

                  {krokAktualny === 1 && (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <IkonaDokumentu className="w-5 h-5 text-blue-400" />
                        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-400">Dane kontaktowe</p>
                      </div>

                      <div>
                        <FieldLabel required>Imię i nazwisko</FieldLabel>
                        {errors.name && <p className="text-red-400 text-xs mb-1">{errors.name}</p>}
                        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Jan Kowalski" />
                      </div>

                      <div>
                        <FieldLabel required>Email</FieldLabel>
                        {errors.email && <p className="text-red-400 text-xs mb-1">{errors.email}</p>}
                        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="jan@example.com" />
                        <label className="mt-2 flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={emailPreferred} onChange={e => setEmailPreferred(e.target.checked)} className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500" />
                          <span className="text-white/50 text-xs">Preferowany kontakt emailowy</span>
                        </label>
                      </div>

                      <div>
                        <FieldLabel>Telefon <span className="text-white/30 font-normal">(opcjonalny)</span></FieldLabel>
                        <Input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+48 123 456 789" />
                        <label className="mt-2 flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={phonePreferred} onChange={e => setPhonePreferred(e.target.checked)} className="rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500" />
                          <span className="text-white/50 text-xs">Preferowany kontakt telefoniczny</span>
                        </label>
                      </div>

                      <div>
                        <FieldLabel>Firma / Organizacja <span className="text-white/30 font-normal">(opcjonalna)</span></FieldLabel>
                        <Input value={company} onChange={e => setCompany(e.target.value)} placeholder="Nazwa firmy" />
                      </div>

                      <div>
                        <FieldLabel>Godziny kontaktu</FieldLabel>
                        <Input
                          value={contactHours}
                          onChange={e => setContactHours(e.target.value)}
                          placeholder="np. 9:00–17:00 lub 12:00–14:00 i 18:00–20:00"
                        />
                      </div>
                    </>
                  )}

                  {krokAktualny === 2 && (
                    <>
                      <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-400 mb-1">Rodzaj projektu</p>
                      <p className="text-white/45 text-sm mb-4">Wybierz kafelek pasujący do Twojego projektu.</p>

                      {errors.category && <p className="text-red-400 text-xs mb-3">{errors.category}</p>}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {PROJECT_CATEGORIES.map(kategoria => {
                          const Ikona = kategoria.icon;
                          const aktywna = projectCategory === kategoria.id;
                          return (
                            <button
                              key={kategoria.id}
                              type="button"
                              onClick={() => wybiera_kategorie(kategoria.id)}
                              className={`text-left rounded-[6px] border px-4 py-4 transition-all duration-200 ${
                                aktywna
                                  ? 'border-blue-500 bg-blue-500/10'
                                  : 'border-white/10 bg-white/5 hover:border-white/25'
                              }`}
                            >
                              <Ikona className={`w-5 h-5 mb-2 ${aktywna ? 'text-blue-400' : 'text-white/40'}`} />
                              <div className="text-white text-sm font-medium">{kategoria.label}</div>
                              <p className="text-white/45 text-xs mt-1">{kategoria.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}

                  {krokAktualny === 3 && (
                    <>
                      <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-400">Szczegóły projektu</p>

                      <div>
                        <FieldLabel>Preferowany budżet</FieldLabel>
                        <SelectNative value={budget} onChange={setBudget}>
                          <option value="">Wybierz budżet</option>
                          {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                        </SelectNative>
                      </div>

                      {/* poniższe pola dotyczą tylko stron internetowych - dla innych
                          kategorii (SaaS, SEO, system, poprawki) nie mają zastosowania */}
                      {jestStrona && (
                        <>
                          <div>
                            <FieldLabel>Wielkość strony</FieldLabel>
                            <RadioGroup name="pageSize" options={PAGE_SIZES} value={pageSize} onChange={v => setPageSize(v as typeof pageSize)} />
                          </div>

                          <div>
                            <FieldLabel>Blog pod SEO lub funkcjonalności CMS?</FieldLabel>
                            <RadioGroup name="cms" options={CMS_OPTIONS} value={cms} onChange={v => setCms(v as typeof cms)} />
                          </div>

                          <div>
                            <FieldLabel>Produkcja treści – zaznacz co potrzebujesz</FieldLabel>
                            <CheckGroup options={CONTENT_OPTIONS.map(o => o.label)} value={contentOptions} onChange={setContentOptions} />
                          </div>

                          <div>
                            <FieldLabel>Hosting i utrzymanie</FieldLabel>
                            <RadioGroup name="hosting" options={HOSTING_OPTIONS} value={hosting} onChange={v => setHosting(v as typeof hosting)} />
                          </div>
                        </>
                      )}

                      <div className="border-t border-white/10 pt-6">
                        <FieldLabel required>Temat</FieldLabel>
                        {errors.subject && <p className="text-red-400 text-xs mb-1">{errors.subject}</p>}
                        <Input
                          value={subject}
                          onChange={e => setSubject(e.target.value)}
                          placeholder="np. Strona firmowa dla warsztatu samochodowego"
                        />
                      </div>

                      <div>
                        <FieldLabel required>Wiadomość</FieldLabel>
                        {errors.message && <p className="text-red-400 text-xs mb-1">{errors.message}</p>}
                        <textarea
                          value={message}
                          onChange={e => setMessage(e.target.value)}
                          onInput={e => { const t = e.currentTarget; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }}
                          placeholder="Opisz swój projekt, cele, grupę docelową, co chcesz osiągnąć..."
                          className="w-full bg-white/5 border border-white/10 rounded-[6px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#0070ff] focus:ring-1 focus:ring-[#0070ff]/30 transition-all resize-none overflow-hidden"
                          style={{ minHeight: '7.5rem' }}
                        />
                      </div>

                      <div>
                        <FieldLabel>Inspiracje i referencje</FieldLabel>
                        <textarea
                          value={inspirations}
                          onChange={e => setInspirations(e.target.value)}
                          onInput={e => { const t = e.currentTarget; t.style.height = 'auto'; t.style.height = t.scrollHeight + 'px'; }}
                          placeholder="Linki do stron, które Ci się podobają lub które chcesz przypominać..."
                          className="w-full bg-white/5 border border-white/10 rounded-[6px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#0070ff] focus:ring-1 focus:ring-[#0070ff]/30 transition-all resize-none overflow-hidden"
                          style={{ minHeight: '5rem' }}
                        />
                      </div>
                    </>
                  )}

                </div>

                {/* nawigacja między krokami */}
                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-white/10">
                  {krokAktualny > 1 && (
                    <button
                      type="button"
                      onClick={cofa_krok}
                      className="inline-flex items-center gap-2 rounded-full h-11 px-5 text-sm font-semibold text-white/70 border border-white/15 hover:bg-white/5 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" /> Wstecz
                    </button>
                  )}

                  {krokAktualny < KROKI.length && (
                    <button
                      type="button"
                      onClick={przechodzi_dalej}
                      className="ml-auto inline-flex items-center gap-2 rounded-full h-11 px-6 text-sm font-semibold text-white transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(25,133,255,0.3)] hover:shadow-[0_8px_30px_rgba(25,133,255,0.45)]"
                      style={{ background: '#1985ff' }}
                    >
                      Dalej <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  {krokAktualny === KROKI.length && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="ml-auto inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-sm font-semibold text-white transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(25,133,255,0.3)] hover:shadow-[0_8px_30px_rgba(25,133,255,0.45)]"
                      style={{ background: '#1985ff' }}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Wysyłanie...
                        </>
                      ) : (
                        <>
                          Wyślij brief
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>

              </div>
            </div>

            {/* ── PRAWA KOLUMNA – sticky ────────────────────────────── */}
            <aside className="hidden lg:block relative lg:-mr-6 xl:-mr-16 mt-10 lg:mt-0">
              <div className="sticky top-36 space-y-5">

                {/* Szybki kontakt */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-400 mb-3">Szybki kontakt</p>
                  {QUICK_ACTIONS.map(({ label, href, icon: Icon, desc }) => (
                    <Link
                      key={label} href={href}
                      className="flex items-center gap-3 rounded-[6px] border border-white/10 bg-white/5 px-4 py-3 text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all group"
                    >
                      <Icon className="w-4 h-4 shrink-0 text-white/40 group-hover:text-blue-400 transition-colors" />
                      <div>
                        <div className="text-sm font-medium leading-tight">{label}</div>
                        <div className="text-xs text-white/35 group-hover:text-blue-300/60 transition-colors">{desc}</div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>

                {/* Dane kontaktowe */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-400 mb-4">Dane kontaktowe</p>
                  <div className="space-y-3.5 text-sm">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 mt-0.5 text-white/35 shrink-0" />
                      <div>
                        <div className="text-white/40 text-xs mb-0.5">Email</div>
                        <a href="mailto:kontakt@whiteslope.studio" className="text-white hover:text-blue-300 transition-colors font-medium">kontakt@whiteslope.studio</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 mt-0.5 text-white/35 shrink-0" />
                      <div>
                        <div className="text-white/40 text-xs mb-0.5">Telefon</div>
                        <div className="text-white font-medium">+48 662 581 368</div>
                        <div className="text-white font-medium">+48 731 721 760</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-white/35 shrink-0" />
                      <div>
                        <div className="text-white/40 text-xs mb-0.5">Lokalizacja</div>
                        <div className="text-white font-medium">Białystok, Polska</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 mt-0.5 text-white/35 shrink-0" />
                      <div>
                        <div className="text-white/40 text-xs mb-0.5">Godziny pracy</div>
                        <div className="text-white font-medium">Pon – Pt: 9:00 – 17:00</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10">
                    <p className="text-xs text-white/45 mb-3">
                      <span className="font-semibold text-white/70">Pilny projekt?</span>{' '}
                      Zadzwoń bezpośrednio i omówimy szczegóły.
                    </p>
                    <a
                      href="tel:+48662581368"
                      className="w-full inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_20px_rgba(25,133,255,0.45)] active:scale-95 shadow-[0_4px_16px_rgba(25,133,255,0.25)]"
                      style={{ background: '#1985ff' }}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Zadzwoń teraz
                    </a>
                  </div>
                </div>

              </div>
            </aside>

          </form>
        )}
      </div>

      <style>{`
        @keyframes krokWejscie {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-krok-wejscie {
          animation: krokWejscie 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}