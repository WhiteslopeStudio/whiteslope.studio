import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Upewnij się, że masz klucz RESEND_API_KEY w swoim pliku .env / .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { service, subject, date, time, name, phone, email, message } = data;

    // ─── POTĘŻNY SZABLON E-MAILA (DARK MODE HTML) ───
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 40px 20px; background-color: #03050a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #ffffff;">
        
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0a0f1c; border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 20px rgba(37,99,235,0.2);">
          
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 2px; color: #ffffff; text-transform: uppercase;">
                WHITESLOPE <span style="color: #3b82f6;">AI</span>
              </h1>
              <p style="margin: 10px 0 0 0; color: #9ca3af; font-size: 14px; letter-spacing: 1px; text-transform: uppercase;">Wirtualny Asystent Demo</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 22px;">Cześć, ${name.split(' ')[0]}! 👋</h2>
              <p style="margin: 0 0 30px 0; color: #d1d5db; font-size: 16px; line-height: 1.6;">
                To jest automatyczna wiadomość wygenerowana przez <strong>Chatbota Whiteslope</strong>. Twoja testowa rezerwacja przebiegła pomyślnie. Poniżej znajdują się zebrane dane:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 16px; padding: 20px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Usługa / Przedmiot</span><br>
                    <strong style="color: #ffffff; font-size: 16px;">${subject} (${service})</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Zarezerwowany Termin</span><br>
                    <strong style="color: #60a5fa; font-size: 18px;">${date}, godz. ${time}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05);">
                    <span style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Dane Kontaktowe</span><br>
                    <strong style="color: #ffffff; font-size: 16px;">${phone} | ${email}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;">
                    <span style="color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Wiadomość Dodatkowa</span><br>
                    <strong style="color: #e5e7eb; font-size: 15px; font-style: italic;">"${message}"</strong>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0 0; color: #9ca3af; font-size: 15px; line-height: 1.6; text-align: center;">
                Chcesz wdrożyć podobne rozwiązanie w swoim biznesie i zautomatyzować umawianie klientów na 100%?<br><br>
                <a href="https://whiteslope.studio" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 30px; font-weight: bold; font-size: 16px;">Sprawdź naszą ofertę</a>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 20px 40px; background-color: rgba(255,255,255,0.02); text-align: center; border-top: 1px solid rgba(255,255,255,0.05);">
              <p style="margin: 0; color: #6b7280; font-size: 12px;">
                &copy; ${new Date().getFullYear()} Whiteslope Studio. Wszelkie prawa zastrzeżone.
              </p>
            </td>
          </tr>

        </table>
      </body>
      </html>
    `;

    const { data: resendData, error } = await resend.emails.send({
      from: 'WhiteSlope AI <kontakt@whiteslope.studio>',
      to: email, // E-mail podany przez klienta w czacie!
      subject: `🗓️ Potwierdzenie rezerwacji: ${date} o ${time} | Whiteslope AI`,
      html: htmlTemplate,
    });

    if (error) {
      console.error('Błąd Resend:', error);
      return NextResponse.json({ error: 'Nie udało się wysłać e-maila.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, resendData }, { status: 200 });
  } catch (error) {
    console.error('Błąd serwera:', error);
    return NextResponse.json({ error: 'Wystąpił błąd serwera.' }, { status: 500 });
  }
}
