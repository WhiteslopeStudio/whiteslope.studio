'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Download, Eye, X, Mail, Phone, MapPin, Clock, Calendar, Tag, MessageSquare, FileText } from 'lucide-react';

const BUDGET_OPTIONS = [
  'do 2 000 zł',
  '2 000 – 5 000 zł',
  '5 000 – 10 000 zł',
  '10 000 – 20 000 zł',
  'powyżej 20 000 zł',
  'do ustalenia',
];

const QUICK_ACTIONS = [
  { label: 'Umów spotkanie', href: '/contact?tab=meeting', icon: Calendar, desc: 'Bezpłatna konsultacja online' },
  { label: 'Zapytaj o cenę', href: '/contact?tab=quote', icon: Tag, desc: 'Wycena w 24h' },
  { label: 'Zadaj pytanie', href: '/contact?tab=question', icon: MessageSquare, desc: 'Szybka odpowiedź' },
  { label: 'Zgłoś projekt', href: '/contact?tab=project', icon: FileText, desc: 'Opisz swój projekt' },
];

// ---- New page replaces the old dark-themed form ----
function BriefPageContent() {
  const searchParams = useSearchParams();
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    preferredContact: 'email' as 'email' | 'phone',
    phone: '',
    company: '',
    contactHoursFrom: '9:00',
    contactHoursTo: '17:00',
    budget: '',
    message: '',
  });

  useEffect(() => {
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    if (name) setForm(f => ({ ...f, name: decodeURIComponent(name) }));
    if (email) setForm(f => ({ ...f, email: decodeURIComponent(email) }));
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'quote', ...form }),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', preferredContact: 'email', phone: '', company: '', contactHoursFrom: '9:00', contactHoursTo: '17:00', budget: '', message: '' });
        setTimeout(() => setSubmitted(false), 8000);
      } else {
        const data = await res.json().catch(() => ({}));
        setFormError(data.error || 'Wystąpił błąd. Spróbuj ponownie.');
      }
    } catch {
      setFormError('Błąd połączenia. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="min-h-screen bg-white">

        {/* Hero banner */}
        <section
          className="relative overflow-hidden py-10 pb-16"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, transparent 10%, black 100%),
              linear-gradient(
                to bottom,
                black 0px, black 10px,
                #3b3b3bff 10px, #3b3b3bff 11px,
                #0b0b0bff 11px, #0b0b0bff calc(100% - 11px),
                #3b3b3bff calc(100% - 11px), #3b3b3bff calc(100% - 10px),
                black calc(100% - 10px), black 100%
              )
            `,
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: 200 }}>
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: 'url(/_resources/brief.webp)', backgroundColor: '#0a0a0a' }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
              <div className="relative flex flex-col justify-center py-12 px-10 md:px-16">
                <h1 className="text-2xl lg:text-3xl font-normal text-white mb-3 leading-tight">
                  Przygotuj się do projektu z nami
                </h1>
                <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl">
                  Pobierz i przeczytaj poradnik projektowy – poznaj cały proces współpracy przed rozpoczęciem.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="/_resources/brief_projektowy - przewodnik dla klienta.html"
                    download
                    className="group px-8 py-3.5 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 flex items-center justify-center gap-2 w-fit"
                  >
                    <Download className="w-4 h-4" />
                    Pobierz przewodnik
                  </a>
                  <button
                    onClick={() => { setShowPreview(true); document.body.style.overflow = 'hidden'; }}
                    className="group px-8 py-3.5 bg-white/5 backdrop-blur-sm text-white font-medium rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2 w-fit cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    Zobacz podgląd
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2-column layout */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 xl:gap-16 items-start">

            {/* LEFT: contact form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-zinc-950 mb-2">
                Wyślij zapytanie
              </h2>
              <p className="text-zinc-500 mb-8 text-sm md:text-base">
                Opowiedz nam o projekcie, a wrócimy z wyceną i planem działania.
              </p>

              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                  ✅ Zapytanie zostało wysłane! Odezwiemy się wkrótce.
                </div>
              )}
              {formError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Imię i nazwisko <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text" name="name" value={form.name} onChange={handleChange} required
                    placeholder="Jan Kowalski"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Email <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="email" name="email" value={form.email} onChange={handleChange} required
                    placeholder="jan@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Preferowany kontakt</label>
                  <div className="flex gap-3">
                    {(['email', 'phone'] as const).map(val => (
                      <button
                        key={val} type="button"
                        onClick={() => setForm(f => ({ ...f, preferredContact: val }))}
                        className={`flex-1 py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
                          form.preferredContact === val
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-black/15 bg-white text-zinc-600 hover:bg-zinc-50'
                        }`}
                      >
                        {val === 'email' ? 'Emailowy' : 'Telefoniczny'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Telefon <span className="text-zinc-400 font-normal">(opcjonalny)</span>
                  </label>
                  <input
                    type="tel" name="phone" value={form.phone} onChange={handleChange}
                    placeholder="+48 123 456 789"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Firma / Organizacja <span className="text-zinc-400 font-normal">(opcjonalna)</span>
                  </label>
                  <input
                    type="text" name="company" value={form.company} onChange={handleChange}
                    placeholder="Nazwa firmy"
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Godziny kontaktu</label>
                  <div className="flex items-center gap-3">
                    <select
                      name="contactHoursFrom"
                      value={form.contactHoursFrom}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-xl border border-black/15 bg-white text-zinc-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all cursor-pointer"
                      style={{ colorScheme: 'light' }}
                    >
                      {['7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00'].map(h => (
                        <option key={h} value={h} style={{ background: '#fff', color: '#18181b' }}>{h}</option>
                      ))}
                    </select>
                    <span className="text-zinc-400 font-medium shrink-0">–</span>
                    <select
                      name="contactHoursTo"
                      value={form.contactHoursTo}
                      onChange={handleChange}
                      className="flex-1 px-4 py-3 rounded-xl border border-black/15 bg-white text-zinc-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all cursor-pointer"
                      style={{ colorScheme: 'light' }}
                    >
                      {['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'].map(h => (
                        <option key={h} value={h} style={{ background: '#fff', color: '#18181b' }}>{h}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Preferowany budżet</label>
                  <select
                    name="budget" value={form.budget} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white text-zinc-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all cursor-pointer"
                    style={{ colorScheme: 'light' }}
                  >
                    <option value="" style={{ background: '#fff', color: '#a1a1aa' }}>Wybierz zakres</option>
                    {BUDGET_OPTIONS.map(opt => (
                      <option key={opt} value={opt} style={{ background: '#fff', color: '#18181b' }}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">
                    Krótki opis projektu <span className="text-zinc-400 font-normal">(opcjonalny)</span>
                  </label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Powiedz nam czego potrzebujesz..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-black/15 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit" disabled={isLoading}
                  className="w-full inline-flex items-center justify-center rounded-full h-13 px-8 text-base font-semibold text-white transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(25,133,255,0.3)] hover:shadow-[0_8px_30px_rgba(25,133,255,0.45)]"
                  style={{ background: '#1985ff' }}
                >
                  {isLoading ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                  {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                </button>
              </form>
            </div>

            {/* RIGHT: sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-5">

                <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5 shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
                  <p className="text-xs uppercase tracking-[0.18em] text-blue-700 font-semibold mb-3">Szybki kontakt</p>
                  <div className="space-y-2">
                    {QUICK_ACTIONS.map(({ label, href, icon: Icon, desc }) => (
                      <Link
                        key={label} href={href}
                        className="flex items-center gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-all group"
                      >
                        <Icon className="w-4 h-4 shrink-0 text-zinc-400 group-hover:text-blue-500 transition-colors" />
                        <div>
                          <div className="text-sm font-medium leading-tight">{label}</div>
                          <div className="text-xs text-zinc-400 group-hover:text-blue-400 transition-colors">{desc}</div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 ml-auto shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5 shadow-[0_10px_26px_rgba(0,0,0,0.06)]">
                  <p className="text-xs uppercase tracking-[0.18em] text-blue-700 font-semibold mb-4">Dane kontaktowe</p>
                  <div className="space-y-3.5 text-sm">
                    <div className="flex items-start gap-3">
                      <Mail className="w-4 h-4 mt-0.5 text-zinc-400 shrink-0" />
                      <div>
                        <div className="text-zinc-500 text-xs mb-0.5">Email</div>
                        <a href="mailto:kontakt@whiteslope.studio" className="text-zinc-900 hover:text-blue-700 transition-colors font-medium">kontakt@whiteslope.studio</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 mt-0.5 text-zinc-400 shrink-0" />
                      <div>
                        <div className="text-zinc-500 text-xs mb-0.5">Telefon</div>
                        <div className="text-zinc-900 font-medium">+48 662 581 368</div>
                        <div className="text-zinc-900 font-medium">+48 731 721 760</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 mt-0.5 text-zinc-400 shrink-0" />
                      <div>
                        <div className="text-zinc-500 text-xs mb-0.5">Lokalizacja</div>
                        <div className="text-zinc-900 font-medium">Białystok, Polska</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 mt-0.5 text-zinc-400 shrink-0" />
                      <div>
                        <div className="text-zinc-500 text-xs mb-0.5">Godziny pracy</div>
                        <div className="text-zinc-900 font-medium">Pon – Pt: 9:00 – 17:00</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 pt-4 border-t border-black/10">
                    <p className="text-xs text-zinc-500 mb-3">
                      <span className="font-semibold text-zinc-700">Pilny projekt?</span>{' '}
                      Zadzwoń bezpośrednio i omówimy szczegóły.
                    </p>
                    <a
                      href="tel:+48662581368"
                      className="w-full inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-semibold text-white transition-all duration-300 hover:shadow-[0_6px_20px_rgba(25,133,255,0.4)] active:scale-95 shadow-[0_4px_16px_rgba(25,133,255,0.25)]"
                      style={{ background: '#1985ff' }}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Zadzwoń teraz
                    </a>
                  </div>
                </div>

              </div>
            </aside>
          </div>

          {/* Mobile: cards below form */}
          <div className="lg:hidden mt-10 space-y-5">
            <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700 font-semibold mb-3">Szybki kontakt</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_ACTIONS.map(({ label, href, icon: Icon }) => (
                  <Link key={label} href={href} className="flex items-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-3 text-zinc-800 hover:border-blue-300 hover:text-blue-700 transition-all text-sm font-medium">
                    <Icon className="w-4 h-4 shrink-0 text-zinc-400" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5">
              <p className="text-xs text-zinc-500 mb-3">
                <span className="font-semibold text-zinc-700">Pilny projekt?</span>{' '}
                Zadzwoń bezpośrednio i omówimy szczegóły.
              </p>
              <a
                href="tel:+48662581368"
                className="w-full inline-flex items-center justify-center rounded-full h-11 px-6 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(25,133,255,0.25)]"
                style={{ background: '#1985ff' }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Zadzwoń teraz
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Preview modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur"
            onClick={() => { setShowPreview(false); document.body.style.overflow = 'auto'; }}
          />
          <div className="relative w-full max-w-5xl h-[90vh] bg-zinc-900 rounded-xl shadow-2xl overflow-hidden border border-white/10">
            <button
              onClick={() => { setShowPreview(false); document.body.style.overflow = 'auto'; }}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <iframe
              src="/_resources/brief_projektowy - przewodnik dla klienta.html"
              className="w-full h-full"
              title="Podgląd brief projektowy"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default function BriefPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><p className="text-zinc-400">Ładowanie...</p></div>}>
      <BriefPageContent />
    </Suspense>
  );
}

