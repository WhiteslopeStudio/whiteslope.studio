'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight, User, Mail, Tag, MessageSquare, Phone, MapPin, Clock } from 'lucide-react';

// ─── POLA FORMULARZA ────────────────────────────────────────────────────────

function EtykietaPola({ children, wymagane }: { children: React.ReactNode; wymagane?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-white/80 mb-2">
      {children} {wymagane && <span className="text-red-400">*</span>}
    </label>
  );
}

function PoleTekstowe({ ...wlasciwosci }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...wlasciwosci}
      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition-colors"
    />
  );
}

// ─── GŁÓWNY KOMPONENT ───────────────────────────────────────────────────────

export default function BriefSection() {
  const [imieNazwisko, setImieNazwisko] = useState('');
  const [email, setEmail] = useState('');
  const [tytul, setTytul] = useState('');
  const [tresc, setTresc] = useState('');

  const [bledy, setBledy] = useState<Record<string, string>>({});
  const [wysylanie, setWysylanie] = useState(false);
  const [wyslano, setWyslano] = useState(false);

  // pozycja myszki nad przyciskiem submit, wyrażona w procentach (0-100)
  // - potrzebna do przesuwania środka gradientu radialnego za kursorem
  const [pozycjaMyszy, setPozycjaMyszy] = useState({ x: 50, y: 100 });
  const [czyNajechanoPrzycisk, setCzyNajechanoPrzycisk] = useState(false);

  // przelicza pozycję kursora względem granic przycisku na procenty
  const oblicza_pozycje_myszy = (e: React.MouseEvent<HTMLButtonElement>) => {
    const wymiary = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - wymiary.left) / wymiary.width) * 100;
    const y = ((e.clientY - wymiary.top) / wymiary.height) * 100;
    setPozycjaMyszy({ x, y });
  };

  // sprawdza wszystkie pola formularza przed wysyłką
  const waliduje_formularz = () => {
    const nowe_bledy: Record<string, string> = {};

    if (!imieNazwisko.trim() || imieNazwisko.trim().length < 2) {
      nowe_bledy.imieNazwisko = 'Podaje się imię i nazwisko (min. 2 znaki)';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nowe_bledy.email = 'Podaje się prawidłowy adres email';
    }
    if (!tytul.trim()) {
      nowe_bledy.tytul = 'Podaje się temat wiadomości';
    }
    if (!tresc.trim() || tresc.trim().length < 20) {
      nowe_bledy.tresc = 'Opisuje się wiadomość (min. 20 znaków)';
    }

    setBledy(nowe_bledy);
    return Object.keys(nowe_bledy).length === 0;
  };

  // wysyła dane do istniejącego endpointu /api/contact,
  // zachowując strukturę pól, jakiej oczekuje backend
  const wysyla_wiadomosc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waliduje_formularz()) return;

    setWysylanie(true);
    try {
      const odpowiedz = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'quick',
          formData: {
            name: imieNazwisko,
            email,
            phone: '',
            company: '',
            projectType: '',
            budget: '',
            timeline: 'Nie określono',
            description: tresc,
            requirements: [],
            inspirations: '',
            hasExistingSite: false,
            currentSiteUrl: '',
            preferredContact: 'email',
            contactHours: '',
            subject: tytul,
          },
        }),
      });

      if (!odpowiedz.ok) {
        const dane_bledu = await odpowiedz.json().catch(() => ({}));
        throw new Error(dane_bledu.error || 'Błąd serwera');
      }

      setWyslano(true);
    } catch (blad: unknown) {
      const wiadomosc_bledu = blad instanceof Error ? blad.message : '';
      alert(`Wystąpił błąd podczas wysyłania: ${wiadomosc_bledu}\n\nSpróbuj ponownie lub napisz na kontakt@whiteslope.studio`);
    } finally {
      setWysylanie(false);
    }
  };

  return (
    <section id="BriefHomePage" className="relative w-full bg-black py-[80px] overflow-hidden">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">

        <div className="relative w-full bg-[#0d0d0d] rounded-[32px] overflow-hidden">

          {/* Gradientowe paski w tle, ta sama idea co w sekcji Websites,
              tylko przyciemniona i bardzo subtelna - zastępują starą obwódkę */}
          <div className="absolute inset-0 z-0 flex pointer-events-none">
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, rgba(0,87,255,0.16) 0%, transparent 55%)' }} />
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, rgba(0,87,255,0.11) 0%, transparent 55%)' }} />
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, rgba(0,87,255,0.07) 0%, transparent 55%)' }} />
            <div className="flex-1" style={{ background: 'linear-gradient(to bottom, rgba(0,87,255,0.03) 0%, transparent 55%)' }} />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center">

            {/* ── LEWO: formularz, wyśrodkowany w pionie względem kolumny ── */}
            <div className="flex-1 w-full px-[32px] py-[64px] lg:px-[64px] lg:py-[80px]">

              {wyslano ? (
                <div className="max-w-[560px] mx-auto text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Dziękujemy!</h3>
                  <p className="text-white/60 leading-relaxed">
                    Wiadomość została wysłana. Odezwiemy się na podany adres email tak szybko, jak to możliwe.
                  </p>
                </div>
              ) : (
                <div className="max-w-[560px] mx-auto">
                  <div className="mb-10 text-left">
                    <h2 className="text-[32px] lg:text-[38px] font-bold text-white leading-[1.1] tracking-tight mb-[16px]">
                      Napisz do nas
                    </h2>
                    <p className="text-[16px] text-white/60 leading-relaxed">
                      Zostaw wiadomość, a odezwiemy się najszybciej jak to możliwe.
                    </p>
                  </div>

                  <form onSubmit={wysyla_wiadomosc} className="space-y-5">

                    <div>
                      <EtykietaPola wymagane>
                        <span className="inline-flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" /> Imię i nazwisko
                        </span>
                      </EtykietaPola>
                      {bledy.imieNazwisko && <p className="text-red-400 text-xs mb-1">{bledy.imieNazwisko}</p>}
                      <PoleTekstowe
                        value={imieNazwisko}
                        onChange={(e) => setImieNazwisko(e.target.value)}
                        placeholder="Jan Kowalski"
                      />
                    </div>

                    <div>
                      <EtykietaPola wymagane>
                        <span className="inline-flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" /> Email
                        </span>
                      </EtykietaPola>
                      {bledy.email && <p className="text-red-400 text-xs mb-1">{bledy.email}</p>}
                      <PoleTekstowe
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jan@example.com"
                      />
                    </div>

                    <div>
                      <EtykietaPola wymagane>
                        <span className="inline-flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5" /> Tytuł
                        </span>
                      </EtykietaPola>
                      {bledy.tytul && <p className="text-red-400 text-xs mb-1">{bledy.tytul}</p>}
                      <PoleTekstowe
                        value={tytul}
                        onChange={(e) => setTytul(e.target.value)}
                        placeholder="np. Wycena strony internetowej"
                      />
                    </div>

                    <div>
                      <EtykietaPola wymagane>
                        <span className="inline-flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5" /> Treść wiadomości
                        </span>
                      </EtykietaPola>
                      {bledy.tresc && <p className="text-red-400 text-xs mb-1">{bledy.tresc}</p>}
                      <textarea
                        value={tresc}
                        onChange={(e) => setTresc(e.target.value)}
                        onInput={(e) => {
                          const pole = e.currentTarget;
                          pole.style.height = 'auto';
                          pole.style.height = pole.scrollHeight + 'px';
                        }}
                        placeholder="Opisuje się, w czym można pomóc..."
                        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/10 transition-colors resize-none overflow-hidden"
                        style={{ minHeight: '8rem' }}
                      />
                    </div>

                    {/* Przycisk submit - biała wersja efektu z gradientem podążającym za myszką */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={wysylanie}
                        onMouseMove={oblicza_pozycje_myszy}
                        onMouseEnter={() => setCzyNajechanoPrzycisk(true)}
                        onMouseLeave={() => setCzyNajechanoPrzycisk(false)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full h-12 px-8 text-sm font-semibold text-zinc-900 relative overflow-hidden transition-all duration-300 active:scale-95 group disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]"
                        style={{
                          background: `radial-gradient(circle at ${czyNajechanoPrzycisk ? pozycjaMyszy.x : 50}% ${czyNajechanoPrzycisk ? pozycjaMyszy.y : 100}%, #ffffff, #f2f2f2 40%, #e2e2e2 80%, #cfcfcf)`,
                        }}
                      >
                        {wysylanie ? (
                          <>
                            <div className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            Wyślij wiadomość
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              )}
            </div>

            {/* ── PRAWO: dane kontaktowe, wyśrodkowane w pionie razem z formularzem ── */}
            <div className="w-full lg:w-[380px] flex-shrink-0 px-[32px] pb-[64px] lg:px-[48px] lg:py-[80px] lg:border-l lg:border-white/10">
              <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-400 mb-5">Dane kontaktowe</p>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-white/35 shrink-0" />
                  <div>
                    <div className="text-white/40 text-xs mb-0.5">Email</div>
                    <a href="mailto:kontakt@whiteslope.studio" className="text-white hover:text-blue-300 transition-colors font-medium">
                      kontakt@whiteslope.studio
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-white/35 shrink-0" />
                  <div>
                    <div className="text-white/40 text-xs mb-0.5">Telefon</div>
                    <a href="tel:+48662581368" className="block text-white hover:text-blue-300 transition-colors font-medium">
                      +48 662 581 368
                    </a>
                    <a href="tel:+48731721760" className="block text-white hover:text-blue-300 transition-colors font-medium">
                      +48 731 721 760
                    </a>
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

              <div className="mt-8 pt-6 border-t border-white/10">
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
        </div>
      </div>
    </section>
  );
}