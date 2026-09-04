'use client';

import { useState } from 'react';
import { CheckCircle, Mail, Phone, MapPin, Clock } from 'lucide-react';

// ─── POLE FORMULARZA (z widocznym, szarawym tłem i dolną krawędzią) ─────────

// Wspolne klasy pol - spojne zaokraglenie rounded-[6px] i czytelny stan focus
const KLASY_POLA =
  'w-full bg-white border border-zinc-300 rounded-[6px] px-4 py-3.5 text-[15px] text-zinc-950 placeholder-zinc-600 transition-all duration-200 focus:outline-none focus:border-[#0070ff] focus:ring-1 focus:ring-[#0070ff]/30 hover:border-zinc-400';

function EtykietaPola({
  children,
  wymagane,
  htmlFor,
}: {
  children: React.ReactNode;
  wymagane?: boolean;
  htmlFor: string;
}) {
  return (
    <label htmlFor={htmlFor} className="block text-[14px] font-semibold text-zinc-950 mb-2">
      {children}{' '}
      {wymagane && (
        <>
          {/* Gwiazdka jest tylko wizualna - czytniki ekranu dostaja pelne slowo */}
          <span aria-hidden className="text-[#0057cc]">
            *
          </span>
          <span className="sr-only">(pole wymagane)</span>
        </>
      )}
    </label>
  );
}

function PoleTekstowe({ ...wlasciwosci }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...wlasciwosci} className={KLASY_POLA} />;
}

// ─── GŁÓWNY KOMPONENT MOBILE ────────────────────────────────────────────────

export default function BriefSectionMobile() {
  // --- ZACHOWANA CAŁA LOGIKA ---
  const [imieNazwisko, setImieNazwisko] = useState('');
  const [email, setEmail] = useState('');
  const [tytul, setTytul] = useState('');
  const [tresc, setTresc] = useState('');

  const [bledy, setBledy] = useState<Record<string, string>>({});
  const [wysylanie, setWysylanie] = useState(false);
  const [wyslano, setWyslano] = useState(false);

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
    // Zmniejszone paddingi pod mobile
    <section
      id="BriefHomePage"
      className="relative w-full py-14 overflow-hidden px-6"
      // Subtelny, chlodny gradient - ten sam klimat co jasne sekcje wyzej, tylko slabszy
      style={{ background: 'linear-gradient(180deg, #eaeeff 0%, #f7f8ff 45%, #ffffff 100%)' }}
    >
      <div className="w-full mx-auto flex flex-col gap-10">

        {/* ── GÓRA: formularz ─────────────────────────── */}
        <div className="w-full">
          {wyslano ? (
            <div className="w-full text-center py-10 bg-zinc-50 rounded-[20px] border border-zinc-200">
              <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-950 mb-2">Dziękujemy!</h3>
              <p className="text-[15px] text-zinc-500 leading-relaxed px-4">
                Wiadomość została wysłana. Odezwiemy się na podany adres email tak szybko, jak to możliwe.
              </p>
            </div>
          ) : (
            <div className="w-full">
              <div className="mb-8">
                {/* Ten sam styl nagłówka co pozostałe sekcje (klasa .hero-mobile-h1) */}
                <h2 className="hero-mobile-h1 mb-2 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-zinc-950 tracking-tight max-w-[380px] text-balance">
                  Napisz do nas
                </h2>
                <p className="text-[14px] leading-relaxed text-zinc-700 font-semibold max-w-[380px] text-balance">
                  Zostaw wiadomość, a odezwiemy się najszybciej jak to możliwe.
                </p>
              </div>

              <form onSubmit={wysyla_wiadomosc} className="space-y-5">

                <div>
                  <EtykietaPola htmlFor="pole-imie" wymagane>Imię i nazwisko</EtykietaPola>
                  <PoleTekstowe
                    id="pole-imie"
                    name="imieNazwisko"
                    autoComplete="name"
                    required
                    aria-required
                    aria-invalid={Boolean(bledy.imieNazwisko)}
                    aria-describedby={bledy.imieNazwisko ? 'blad-imie' : undefined}
                    value={imieNazwisko}
                    onChange={(e) => setImieNazwisko(e.target.value)}
                    placeholder="Jan Kowalski"
                  />
                  {bledy.imieNazwisko && (
                    <p id="blad-imie" role="alert" className="text-red-700 text-[13px] mt-1.5">
                      {bledy.imieNazwisko}
                    </p>
                  )}
                </div>

                <div>
                  <EtykietaPola htmlFor="pole-email" wymagane>Email</EtykietaPola>
                  <PoleTekstowe
                    id="pole-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-required
                    aria-invalid={Boolean(bledy.email)}
                    aria-describedby={bledy.email ? 'blad-email' : undefined}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jan@example.com"
                  />
                  {bledy.email && (
                    <p id="blad-email" role="alert" className="text-red-700 text-[13px] mt-1.5">
                      {bledy.email}
                    </p>
                  )}
                </div>

                <div>
                  <EtykietaPola htmlFor="pole-tytul" wymagane>Tytuł</EtykietaPola>
                  <PoleTekstowe
                    id="pole-tytul"
                    name="tytul"
                    required
                    aria-required
                    aria-invalid={Boolean(bledy.tytul)}
                    aria-describedby={bledy.tytul ? 'blad-tytul' : undefined}
                    value={tytul}
                    onChange={(e) => setTytul(e.target.value)}
                    placeholder="np. Wycena strony internetowej"
                  />
                  {bledy.tytul && (
                    <p id="blad-tytul" role="alert" className="text-red-700 text-[13px] mt-1.5">
                      {bledy.tytul}
                    </p>
                  )}
                </div>

                <div>
                  <EtykietaPola htmlFor="pole-tresc" wymagane>Treść wiadomości</EtykietaPola>
                  <textarea
                    id="pole-tresc"
                    name="tresc"
                    required
                    aria-required
                    aria-invalid={Boolean(bledy.tresc)}
                    aria-describedby={bledy.tresc ? 'blad-tresc' : undefined}
                    value={tresc}
                    onChange={(e) => setTresc(e.target.value)}
                    onInput={(e) => {
                      const pole = e.currentTarget;
                      pole.style.height = 'auto';
                      pole.style.height = pole.scrollHeight + 'px';
                    }}
                    placeholder="Opisz, w czym możemy Ci pomóc..."
                    className={`${KLASY_POLA} resize-none overflow-hidden`}
                    style={{ minHeight: '8rem' }}
                  />
                  {bledy.tresc && (
                    <p id="blad-tresc" role="alert" className="text-red-700 text-[13px] mt-1.5">
                      {bledy.tresc}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  {/* Ten sam styl i kolor CTA co w kartach usług wyżej (#3561ff, pigułka) */}
                  <button
                    type="submit"
                    disabled={wysylanie}
                    className="px-5 py-2 bg-[#3561ff] text-white font-medium rounded-full inline-flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform whitespace-nowrap disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0070ff]/50 focus-visible:ring-offset-2"
                  >
                    {wysylanie ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Wysyłanie...
                      </>
                    ) : (
                      'Wyślij wiadomość'
                    )}
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>

        {/* ── DÓŁ: jasna karta kontaktowa ──────────────── */}
        {/* Czysta biel + cienka ramka i to samo rounded-[6px] co pola formularza */}
        <div className="w-full bg-white border border-zinc-200 rounded-[6px] p-6">

          <h3 className="text-[16px] font-bold text-zinc-950 tracking-tight mb-5">
            Dane kontaktowe
          </h3>

          <div className="space-y-5">

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 mt-0.5 shrink-0 text-[#0070ff]" strokeWidth={1.75} aria-hidden />
              <div>
                <div className="text-zinc-600 text-[12px] font-semibold uppercase tracking-wide mb-1">Email</div>
                <a
                  href="mailto:kontakt@whiteslope.studio"
                  className="block text-zinc-950 font-medium text-[15px] rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0070ff]/40"
                >
                  kontakt@whiteslope.studio
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 mt-0.5 shrink-0 text-[#0070ff]" strokeWidth={1.75} aria-hidden />
              <div>
                <div className="text-zinc-600 text-[12px] font-semibold uppercase tracking-wide mb-1">Telefon</div>
                <a
                  href="tel:+48662581368"
                  className="block text-zinc-950 font-medium text-[15px] mb-1 rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0070ff]/40"
                >
                  +48 662 581 368
                </a>
                <a
                  href="tel:+48731721760"
                  className="block text-zinc-950 font-medium text-[15px] rounded-[4px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0070ff]/40"
                >
                  +48 731 721 760
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[#0070ff]" strokeWidth={1.75} aria-hidden />
              <div>
                <div className="text-zinc-600 text-[12px] font-semibold uppercase tracking-wide mb-1">Lokalizacja</div>
                <div className="text-zinc-950 font-medium text-[15px]">Białystok, Polska</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-0.5 shrink-0 text-[#0070ff]" strokeWidth={1.75} aria-hidden />
              <div>
                <div className="text-zinc-600 text-[12px] font-semibold uppercase tracking-wide mb-1">Godziny pracy</div>
                <div className="text-zinc-950 font-medium text-[15px]">Pon &ndash; Pt: 9:00 &ndash; 17:00</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}