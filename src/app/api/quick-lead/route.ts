import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const ADRES_FIRMY = 'kontakt@whiteslope.studio';

const waliduje_email = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const waliduje_telefon = (telefon: string) => /^[+]?[\d\s\-()]{9,}$/.test(telefon);
const czysci_tekst = (tekst: string) => tekst.trim().slice(0, 300);

// Prosta ochrona przed botami: pole "firma" jest ukryte w formularzu (honeypot).
// Człowiek go nie wypełni, bot zwykle tak - wtedy udajemy sukces i nic nie wysyłamy.
export async function POST(request: Request) {
  try {
    const dane = await request.json();

    const telefon = czysci_tekst(String(dane.telefon ?? ''));
    const email = czysci_tekst(String(dane.email ?? ''));
    const branza = czysci_tekst(String(dane.branza ?? ''));
    const wiadomosc = String(dane.wiadomosc ?? '').trim().slice(0, 1000);
    const zgoda = Boolean(dane.zgoda);
    const pulapka = String(dane.firma ?? '');

    if (pulapka) {
      return NextResponse.json({ success: true });
    }

    if (!waliduje_telefon(telefon)) {
      return NextResponse.json({ success: false, error: 'Podaje się prawidłowy numer telefonu' }, { status: 400 });
    }
    if (!waliduje_email(email)) {
      return NextResponse.json({ success: false, error: 'Podaje się prawidłowy adres email' }, { status: 400 });
    }
    if (!zgoda) {
      return NextResponse.json(
        { success: false, error: 'Wymagana jest zgoda na przetwarzanie danych' },
        { status: 400 },
      );
    }

    if (!resend) {
      console.error('Brak RESEND_API_KEY - nie można wysłać wiadomości.');
      return NextResponse.json(
        { success: false, error: 'Wysyłka jest chwilowo niedostępna. Napisz na kontakt@whiteslope.studio' },
        { status: 503 },
      );
    }

    const dataZgloszenia = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

    // 1. Powiadomienie na skrzynkę firmową
    await resend.emails.send({
      from: `Darmowy projekt WhiteSlope <${ADRES_FIRMY}>`,
      to: [ADRES_FIRMY],
      replyTo: email,
      subject: branza
        ? `Nowe zgłoszenie: bezpłatna wizualizacja strony (${branza})`
        : 'Nowe zgłoszenie: bezpłatna wizualizacja strony',
      html: `
        <h2 style="font-family: Arial, sans-serif;">Nowe zgłoszenie - bezpłatna wizualizacja strony</h2>
        <table style="font-family: Arial, sans-serif; font-size: 15px; border-collapse: collapse;">
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Telefon</strong></td><td style="padding: 6px 0;">${telefon}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Email</strong></td><td style="padding: 6px 0;">${email}</td></tr>
          ${branza ? `<tr><td style="padding: 6px 12px 6px 0;"><strong>Branża</strong></td><td style="padding: 6px 0;">${branza}</td></tr>` : ''}
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Data</strong></td><td style="padding: 6px 0;">${dataZgloszenia}</td></tr>
          <tr><td style="padding: 6px 12px 6px 0;"><strong>Zgoda</strong></td><td style="padding: 6px 0;">udzielona</td></tr>
        </table>
        <p style="font-family: Arial, sans-serif; font-size: 14px; background: #f4f4f5; border-left: 3px solid #0070ff; padding: 12px 14px; margin: 16px 0;">
          <strong>Zakres zgłoszenia:</strong> bezpłatny, poglądowy szablon wyglądu strony (grafika),
          a nie gotowa strona internetowa. Wykonanie i wdrożenie pełnej strony to usługa płatna,
          wyceniana indywidualnie. Klient otrzymał tę samą informację w mailu potwierdzającym.
        </p>
        ${
          wiadomosc
            ? `<p style="font-family: Arial, sans-serif; font-size: 15px;"><strong>Wiadomość:</strong></p>
               <p style="font-family: Arial, sans-serif; font-size: 15px; white-space: pre-wrap;">${wiadomosc}</p>`
            : ''
        }
      `,
    });

    // 2. Potwierdzenie dla klienta
    await resend.emails.send({
      from: `WhiteSlope Studio <${ADRES_FIRMY}>`,
      to: [email],
      subject: 'Potwierdzenie: zgłoszenie na bezpłatną wizualizację strony',
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 15px; color: #18181b; line-height: 1.6;">
          <h2 style="margin-bottom: 8px;">Dziękujemy za zgłoszenie</h2>
          <p>Zgłoszenie zostało przyjęte. Odezwiemy się najszybciej, jak to możliwe.</p>
          <p style="background: #f4f4f5; border-left: 3px solid #0070ff; padding: 12px 14px; margin: 16px 0;">
            <strong>Co dokładnie przygotowujemy bezpłatnie:</strong><br/>
            Poglądowy szablon wyglądu strony, czyli grafikę pokazującą, jak Twoja strona mogłaby
            wyglądać. Nie jest to gotowa, działająca strona internetowa. Wykonanie i wdrożenie
            pełnej strony jest usługą płatną, wycenianą indywidualnie - decyzję podejmujesz dopiero
            po obejrzeniu wizualizacji.
          </p>
          <p style="margin: 20px 0 8px;"><strong>Podsumowanie zgłoszenia:</strong></p>
          <ul style="padding-left: 18px; margin: 0;">
            <li>Telefon: ${telefon}</li>
            <li>Email: ${email}</li>
            ${branza ? `<li>Branża: ${branza}</li>` : ''}
          </ul>
          ${
            wiadomosc
              ? `<p style="margin: 16px 0 4px;"><strong>Twoja wiadomość:</strong></p>
                 <p style="white-space: pre-wrap; margin: 0;">${wiadomosc}</p>`
              : ''
          }
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #e4e4e7;" />
          <p style="color: #52525b; font-size: 14px;">
            Pozdrawiamy,<br/>
            Zespół WhiteSlope Studio<br/>
            kontakt@whiteslope.studio<br/>
            +48 731 721 760 - Mateusz Malewski<br/>
            +48 662 581 368 - Patryk Kulesza
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (blad) {
    console.error('Blad wysylki zgloszenia (quick-lead):', blad);
    return NextResponse.json(
      { success: false, error: 'Nie udało się wysłać zgłoszenia. Spróbuj ponownie.' },
      { status: 500 },
    );
  }
}
