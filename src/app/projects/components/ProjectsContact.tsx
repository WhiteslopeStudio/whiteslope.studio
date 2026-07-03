'use client';

import { useState } from 'react';
import { CheckCircle, ArrowRight, Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

// ─── POLE FORMULARZA (z widocznym, szarawym tłem i dolną krawędzią) ─────────

function EtykietaPola({ children, wymagane }: { children: React.ReactNode; wymagane?: boolean }) {
  return (
    <label className="block text-[14px] font-semibold text-zinc-950 mb-2 ml-1">
      {children} {wymagane && <span className="text-blue-600">*</span>}
    </label>
  );
}

function PoleTekstowe({ ...wlasciwosci }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...wlasciwosci}
      className="w-full bg-zinc-100 hover:bg-zinc-200/70 border-b-2 border-zinc-300 px-4 py-3.5 text-[15px] text-zinc-950 placeholder-zinc-500 rounded-t-xl focus:outline-none focus:border-blue-600 focus:bg-zinc-100 transition-all duration-300"
    />
  );
}

// ─── GŁÓWNY KOMPONENT ───────────────────────────────────────────────────────

export default function ProjectsContact() {
  const [imieNazwisko, setImieNazwisko] = useState('');
  const [email, setEmail] = useState('');
  const [tytul, setTytul] = useState('');
  const [tresc, setTresc] = useState('');

  const [bledy, setBledy] = useState<Record<string, string>>({});
  const [wysylanie, setWysylanie] = useState(false);
  const [wyslano, setWyslano] = useState(false);

  // Stan do animacji przycisku CTA
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

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
    <section id="BriefHomePage" className="relative w-full bg-white py-[80px] border-t border-zinc-200 overflow-hidden">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">

        {/* Całość zamknięta w jednej czystej karcie z cieniem */}
        <div className="">

          {/* items-start sprawia, że kolumny nie rozciągają się do równej wysokości */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-20 items-start">

            {/* ── LEWO: formularz ─────────────────────────── */}
            <div>
              {wyslano ? (
                <div className="max-w-[480px] text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-950 mb-3">Dziękujemy!</h3>
                  <p className="text-zinc-500 leading-relaxed">
                    Wiadomość została wysłana. Odezwiemy się na podany adres email tak szybko, jak to możliwe.
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  <div className="mb-10">
                    <h2 className="text-[32px] lg:text-[40px] font-bold text-zinc-950 leading-[1.1] tracking-tight mb-[16px]">
                      Napisz do nas
                    </h2>
                    <p className="text-[16px] text-zinc-500 leading-relaxed max-w-[500px]">
                      Zostaw wiadomość, a odezwiemy się najszybciej jak to możliwe.
                    </p>
                  </div>

                  <form onSubmit={wysyla_wiadomosc} className="space-y-6">

                    <div>
                      <EtykietaPola wymagane>Imię i nazwisko</EtykietaPola>
                      <PoleTekstowe
                        value={imieNazwisko}
                        onChange={(e) => setImieNazwisko(e.target.value)}
                        placeholder="Jan Kowalski"
                      />
                      {bledy.imieNazwisko && <p className="text-red-600 text-xs mt-1.5 ml-1">{bledy.imieNazwisko}</p>}
                    </div>

                    <div>
                      <EtykietaPola wymagane>Email</EtykietaPola>
                      <PoleTekstowe
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jan@example.com"
                      />
                      {bledy.email && <p className="text-red-600 text-xs mt-1.5 ml-1">{bledy.email}</p>}
                    </div>

                    <div>
                      <EtykietaPola wymagane>Tytuł</EtykietaPola>
                      <PoleTekstowe
                        value={tytul}
                        onChange={(e) => setTytul(e.target.value)}
                        placeholder="np. Wycena strony internetowej"
                      />
                      {bledy.tytul && <p className="text-red-600 text-xs mt-1.5 ml-1">{bledy.tytul}</p>}
                    </div>

                    <div>
                      <EtykietaPola wymagane>Treść wiadomości</EtykietaPola>
                      <textarea
                        value={tresc}
                        onChange={(e) => setTresc(e.target.value)}
                        onInput={(e) => {
                          const pole = e.currentTarget;
                          pole.style.height = 'auto';
                          pole.style.height = pole.scrollHeight + 'px';
                        }}
                        placeholder="Opisz, w czym możemy Ci pomóc..."
                        className="w-full bg-zinc-100 hover:bg-zinc-200/70 border-b-2 border-zinc-300 px-4 py-4 text-[15px] text-zinc-950 placeholder-zinc-500 rounded-t-xl focus:outline-none focus:border-blue-600 focus:bg-zinc-100 transition-all duration-300 resize-none overflow-hidden"
                        style={{ minHeight: '8rem' }}
                      />
                      {bledy.tresc && <p className="text-red-600 text-xs mt-1.5 ml-1">{bledy.tresc}</p>}
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={wysylanie}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                        className="w-full sm:w-auto inline-flex items-center justify-center rounded-full h-[48px] px-8 text-[15px] font-semibold text-white relative overflow-hidden transition-all duration-300 active:scale-95 disabled:opacity-50 group shadow-[0_4px_20px_rgba(0,87,255,0.25)] hover:shadow-[0_8px_30px_rgba(0,87,255,0.4)]"
                        style={{
                          background: wysylanie ? '#1a75ff' : `radial-gradient(circle at ${isButtonHovered ? mousePosition.x : 50}% ${isButtonHovered ? mousePosition.y : 100}%, #1a75ff, #0057ff 40%, #004ae6 80%, #003bba)`,
                        }}
                      >
                        {wysylanie ? (
                          <>
                            <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Wysyłanie...
                          </>
                        ) : (
                          <>
                            Wyślij wiadomość
                            <Send className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                </div>
              )}
            </div>

            {/* ── PRAWO: jasna karta kontaktowa (wersja premium, minimalistyczna) ── */}
<div className="w-full bg-[#e8f6c3] border border-zinc-200/80 rounded-[24px] p-8 sm:p-10">

  {/* Nagłówek spójny z lewą stroną (zamiast niebieskiego, małego tekstu) */}
  <h3 className="text-[20px] lg:text-[22px] font-bold text-zinc-950 leading-[1.1] tracking-tight mb-8">
    Dane kontaktowe
  </h3>

  <div className="space-y-8">
    
    {/* Email */}
    <div className="flex items-start gap-4 group">
      <div className="mt-1 shrink-0">
        <Mail className="w-5 h-5 text-zinc-900 group-hover:text-zinc-950 transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-black  text-[13px] font-medium mb-1">Email</div>
        <a href="mailto:kontakt@whiteslope.studio" className="block text-zinc-950 hover:opacity-60 transition-opacity font-medium text-[16px]">
          kontakt@whiteslope.studio
        </a>
      </div>
    </div>

    {/* Telefon */}
    <div className="flex items-start gap-4 group">
      <div className="mt-1 shrink-0">
        <Phone className="w-5 h-5 text-zinc-900 group-hover:text-zinc-950 transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-black text-[13px] font-medium mb-1">Telefon</div>
        <a href="tel:+48662581368" className="block text-zinc-950 hover:opacity-60 transition-opacity font-medium text-[16px] mb-1">
          +48 662 581 368
        </a>
        <a href="tel:+48731721760" className="block text-zinc-950 hover:opacity-60 transition-opacity font-medium text-[16px]">
          +48 731 721 760
        </a>
      </div>
    </div>

    {/* Lokalizacja */}
    <div className="flex items-start gap-4 group">
      <div className="mt-1 shrink-0">
        <MapPin className="w-5 h-5 text-zinc-900 group-hover:text-zinc-950 transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-black text-[13px] font-medium mb-1">Lokalizacja</div>
        <div className="text-zinc-950 font-medium text-[16px]">Białystok, Polska</div>
      </div>
    </div>

    {/* Godziny pracy */}
    <div className="flex items-start gap-4 group">
      <div className="mt-1 shrink-0">
        <Clock className="w-5 h-5 text-zinc-900 group-hover:text-zinc-950 transition-colors duration-300" strokeWidth={1.5} />
      </div>
      <div>
        <div className="text-black text-[13px] font-medium mb-1">Godziny pracy</div>
        <div className="text-zinc-950 font-medium text-[16px]">Pon – Pt: 9:00 – 17:00</div>
      </div>
    </div>

  </div>

</div>

          </div>
        </div>
      </div>
    </section>
  );
}