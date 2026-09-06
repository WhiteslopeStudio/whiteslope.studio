'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Mail, MessageSquare, Phone } from 'lucide-react';

const LIMIT_WIADOMOSCI = 1000;

const KLASY_POLA =
  'w-full bg-white border border-zinc-300 rounded-[6px] pl-9 pr-3 py-3 text-[13px] sm:text-[15px] text-zinc-950 placeholder-zinc-500 transition-all duration-200 focus:outline-none focus:border-[#0070ff] focus:ring-1 focus:ring-[#0070ff]/30';

/**
 * Formularz szybkiego kontaktu (bezpłatna wizualizacja strony).
 * Uzywany na podstronie /darmowy-projekt oraz pod Hero na stronach ofertowych.
 */
export default function QuickLeadForm() {
  const [wiadomosc, setWiadomosc] = useState('');
  const [telefon, setTelefon] = useState('');
  const [email, setEmail] = useState('');
  const [zgoda, setZgoda] = useState(false);
  const [firma, setFirma] = useState(''); // honeypot - ukryte pole na boty

  const [blad, setBlad] = useState('');
  const [wysylanie, setWysylanie] = useState(false);
  const [wyslano, setWyslano] = useState(false);

  const wysyla_zgloszenie = async (e: React.FormEvent) => {
    e.preventDefault();
    setBlad('');

    if (!/^[+]?[\d\s\-()]{9,}$/.test(telefon.trim())) {
      setBlad('Podaje się prawidłowy numer telefonu');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setBlad('Podaje się prawidłowy adres email');
      return;
    }
    if (!zgoda) {
      setBlad('Wymagana jest zgoda na przetwarzanie danych');
      return;
    }

    setWysylanie(true);
    try {
      const odpowiedz = await fetch('/api/quick-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefon, email, wiadomosc, zgoda, firma }),
      });

      const dane = await odpowiedz.json().catch(() => ({}));

      if (!odpowiedz.ok || !dane.success) {
        throw new Error(dane.error || 'Nie udało się wysłać zgłoszenia');
      }

      setWyslano(true);
    } catch (wyjatek: unknown) {
      setBlad(wyjatek instanceof Error ? wyjatek.message : 'Nie udało się wysłać zgłoszenia');
    } finally {
      setWysylanie(false);
    }
  };

  if (wyslano) {
    return (
      <div className="w-full max-w-[720px] mx-auto bg-white rounded-[6px] border border-zinc-200 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-5 sm:p-7 text-center">
        <CheckCircle2 className="w-10 h-10 text-[#0070ff] mx-auto mb-3" aria-hidden />
        <p className="text-[22px] font-bold text-zinc-950 mb-2">Zgłoszenie wysłane</p>
        <p className="text-[14px] text-zinc-600 leading-relaxed max-w-[440px] mx-auto">
          Potwierdzenie zostało wysłane na Twój adres email. Odezwiemy się najszybciej, jak to
          możliwe.
        </p>
        <p className="mt-4 text-[12px] text-zinc-600 leading-relaxed max-w-[440px] mx-auto bg-zinc-50 border-l-[3px] border-[#0070ff] rounded-r-[4px] px-4 py-3 text-left">
          Przypominamy: bezpłatnie przygotowujemy poglądowy szablon wyglądu strony, a nie gotową
          stronę internetową. Wykonanie i wdrożenie pełnej strony jest usługą płatną, wycenianą
          indywidualnie.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[720px] mx-auto bg-white rounded-[6px] border border-zinc-200 shadow-[0_20px_60px_rgba(0,0,0,0.35)] p-5 sm:p-7">
      <p className="text-[19px] sm:text-[24px] font-bold text-zinc-950 leading-[1.25] tracking-tight text-center max-w-[460px] mx-auto mb-3 text-balance">
        <MessageSquare className="inline-block align-[-3px] mr-2 w-5 h-5 text-zinc-950" aria-hidden />
        Zostaw kontakt, a skontaktujemy się z Tobą i przygotujemy bezpłatną wizualizację Twojej
        strony
      </p>

      <p className="text-[13px] text-zinc-600 leading-relaxed text-center max-w-[460px] mx-auto mb-5">
        Bezpłatnie przygotowujemy{' '}
        <strong className="font-semibold text-zinc-900">poglądowy szablon wyglądu</strong> strony
        &ndash; grafikę pokazującą, jak strona mogłaby wyglądać. To nie jest gotowa, działająca
        strona internetowa. Wykonanie i wdrożenie pełnej strony jest usługą płatną, wycenianą
        indywidualnie.
      </p>

      {/* Dwie kolumny również na telefonie: wiadomość po lewej, kontakt po prawej */}
      <form onSubmit={wysyla_zgloszenie} className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Etykieta w osobnym wierszu siatki - wyrównuje górne krawędzie obu kolumn */}
        <div className="col-start-1 row-start-1 flex items-center justify-between">
          <label htmlFor="pole-wiadomosc" className="text-[13px] font-semibold text-zinc-950">
            Wiadomość
          </label>
          <span className="text-[11px] text-zinc-500">
            {wiadomosc.length}/{LIMIT_WIADOMOSCI}
          </span>
        </div>

        <div className="col-start-1 row-start-2 flex flex-col">
          <textarea
            id="pole-wiadomosc"
            name="wiadomosc"
            maxLength={LIMIT_WIADOMOSCI}
            value={wiadomosc}
            onChange={(e) => setWiadomosc(e.target.value)}
            placeholder="Wpisz swoją wiadomość (opcjonalnie)"
            className="flex-1 min-h-[132px] w-full bg-white border border-zinc-300 rounded-[6px] px-3 py-3 text-[13px] sm:text-[15px] text-zinc-950 placeholder-zinc-500 resize-none transition-all duration-200 focus:outline-none focus:border-[#0070ff] focus:ring-1 focus:ring-[#0070ff]/30"
          />
        </div>

        <div className="col-start-2 row-start-2 flex flex-col gap-3">
          <div className="relative">
            <label htmlFor="pole-telefon" className="sr-only">
              Telefon
            </label>
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" aria-hidden />
            <input
              id="pole-telefon"
              name="telefon"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="123 123 123"
              className={KLASY_POLA}
            />
          </div>

          <div className="relative">
            <label htmlFor="pole-email" className="sr-only">
              Adres mailowy
            </label>
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" aria-hidden />
            <input
              id="pole-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Adres mailowy"
              className={KLASY_POLA}
            />
          </div>

          <button
            type="submit"
            disabled={wysylanie}
            className="mt-auto w-full px-5 py-3.5 bg-[#0070ff] text-white font-semibold rounded-[6px] inline-flex items-center justify-center gap-2 text-[15px] active:scale-95 transition-transform disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0070ff]/50 focus-visible:ring-offset-2"
          >
            {wysylanie ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Wysyłanie...
              </>
            ) : (
              'Potwierdź'
            )}
          </button>
        </div>

        {/* Honeypot - ukryty przed użytkownikiem, wypełniają go boty */}
        <input
          type="text"
          name="firma"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={firma}
          onChange={(e) => setFirma(e.target.value)}
          className="absolute left-[-9999px] w-px h-px opacity-0"
        />

        <div className="col-span-2 row-start-3">
          <label htmlFor="pole-zgoda" className="flex items-start gap-2.5 cursor-pointer">
            <input
              id="pole-zgoda"
              name="zgoda"
              type="checkbox"
              required
              checked={zgoda}
              onChange={(e) => setZgoda(e.target.checked)}
              className="mt-0.5 w-4 h-4 shrink-0 accent-[#0070ff] rounded-[3px]"
            />
            <span className="text-[12px] text-zinc-600 leading-relaxed">
              Wyrażam zgodę na kontakt telefoniczny i mailowy w sprawie mojego zapytania.
            </span>
          </label>

          <p className="mt-2 text-[11px] text-zinc-500 leading-relaxed">
            Administratorem danych, które tu wpisujesz, jest Whiteslope Studio. Dane przetwarzamy
            wyłącznie po to, żeby odpowiedzieć na Twoje zapytanie i przygotować projekt strony.{' '}
            <Link
              href="/privacy&cookies/privacyPolicy"
              className="text-[#0070ff] underline underline-offset-2"
            >
              Więcej szczegółów
            </Link>
          </p>

          {blad && (
            <p role="alert" className="mt-2 text-red-700 text-[13px]">
              {blad}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
