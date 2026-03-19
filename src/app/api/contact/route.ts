import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/components';
import MeetingEmail from '@/emails/meeting-email';
import MeetingConfirmation from '@/emails/meeting-confirmation';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// ==========================================
// 🔒 FUNKCJE WALIDACYJNE SERVER-SIDE
// ==========================================

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Telefon opcjonalny
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{9,}$/;
  return phoneRegex.test(phone);
};

const sanitizeString = (str: string): string => {
  return str.trim().slice(0, 5000); // Limit 5000 znaków
};

const validateMeetingData = (data: any): { valid: boolean; error?: string } => {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Imię i nazwisko jest wymagane (min. 2 znaki)' };
  }
  if (!data.email || !validateEmail(data.email)) {
    return { valid: false, error: 'Nieprawidłowy adres email' };
  }
  if (data.phone && !validatePhone(data.phone)) {
    return { valid: false, error: 'Nieprawidłowy numer telefonu' };
  }
  if (!data.preferredDate) {
    return { valid: false, error: 'Data spotkania jest wymagana' };
  }
  if (!data.preferredTime) {
    return { valid: false, error: 'Godzina spotkania jest wymagana' };
  }
  if (!data.topic || data.topic.trim().length < 10) {
    return { valid: false, error: 'Temat spotkania jest wymagany (min. 10 znaków)' };
  }
  return { valid: true };
};

const validateQuoteData = (data: any): { valid: boolean; error?: string } => {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Imię i nazwisko jest wymagane (min. 2 znaki)' };
  }
  if (!data.email || !validateEmail(data.email)) {
    return { valid: false, error: 'Nieprawidłowy adres email' };
  }
  if (data.phone && !validatePhone(data.phone)) {
    return { valid: false, error: 'Nieprawidłowy numer telefonu' };
  }
  if (!data.service || data.service.trim().length === 0) {
    return { valid: false, error: 'Rodzaj usługi jest wymagany' };
  }
  if (!data.package || data.package.trim().length === 0) {
    return { valid: false, error: 'Pakiet jest wymagany' };
  }
  if (!data.timeline || data.timeline.trim().length === 0) {
    return { valid: false, error: 'Termin realizacji jest wymagany' };
  }
  if (!data.description || data.description.trim().length < 20) {
    return { valid: false, error: 'Opis projektu jest wymagany (min. 20 znaków)' };
  }
  return { valid: true };
};

const validateQuestionData = (data: any): { valid: boolean; error?: string } => {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Imię i nazwisko jest wymagane (min. 2 znaki)' };
  }
  if (!data.email || !validateEmail(data.email)) {
    return { valid: false, error: 'Nieprawidłowy adres email' };
  }
  if (data.phone && !validatePhone(data.phone)) {
    return { valid: false, error: 'Nieprawidłowy numer telefonu' };
  }
  if (!data.subject || data.subject.trim().length < 3) {
    return { valid: false, error: 'Temat pytania jest wymagany (min. 3 znaki)' };
  }
  if (!data.message || data.message.trim().length < 10) {
    return { valid: false, error: 'Treść pytania jest wymagana (min. 10 znaków)' };
  }
  if (!['low', 'medium', 'high'].includes(data.priority)) {
    return { valid: false, error: 'Nieprawidłowy priorytet' };
  }
  return { valid: true };
};

const validateProjectData = (data: any): { valid: boolean; error?: string } => {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: 'Imię i nazwisko jest wymagane (min. 2 znaki)' };
  }
  if (!data.email || !validateEmail(data.email)) {
    return { valid: false, error: 'Nieprawidłowy adres email' };
  }
  if (data.phone && !validatePhone(data.phone)) {
    return { valid: false, error: 'Nieprawidłowy numer telefonu' };
  }
  if (!data.projectType || data.projectType.trim().length === 0) {
    return { valid: false, error: 'Typ projektu jest wymagany' };
  }
  if (!data.budget || data.budget.trim().length === 0) {
    return { valid: false, error: 'Budżet jest wymagany' };
  }
  if (!data.timeline || data.timeline.trim().length === 0) {
    return { valid: false, error: 'Termin realizacji jest wymagany' };
  }
  if (!data.description || data.description.trim().length < 20) {
    return { valid: false, error: 'Opis projektu jest wymagany (min. 20 znaków)' };
  }
  if (!Array.isArray(data.requirements)) {
    return { valid: false, error: 'Wymagania muszą być tablicą' };
  }
  return { valid: true };
};

// ==========================================
// 📧 GŁÓWNA FUNKCJA API
// ==========================================

export async function POST(request: Request) {
  try {
    // Sprawdź czy mamy klucz API
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ Brak RESEND_API_KEY w zmiennych środowiskowych');
      return NextResponse.json(
        { error: 'Błąd konfiguracji serwera' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { formType, formData } = body;
    
    console.log('📝 Otrzymano formularz:', formType, 'od', formData.email);

    // Walidacja typu formularza
    if (!['meeting', 'quote', 'question', 'project'].includes(formType)) {
      return NextResponse.json(
        { error: 'Nieprawidłowy typ formularza' },
        { status: 400 }
      );
    }

    // Walidacja danych według typu formularza
    let validation: { valid: boolean; error?: string };

    switch (formType) {
      case 'meeting':
        validation = validateMeetingData(formData);
        break;
      case 'quote':
        validation = validateQuoteData(formData);
        break;
      case 'question':
        validation = validateQuestionData(formData);
        break;
      case 'project':
        validation = validateProjectData(formData);
        break;
      default:
        return NextResponse.json(
          { error: 'Nieprawidłowy typ formularza' },
          { status: 400 }
        );
    }

    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    // Sanityzacja danych (ochrona przed XSS)
    const sanitizedData = {
      ...formData,
      name: sanitizeString(formData.name),
      email: sanitizeString(formData.email),
      phone: formData.phone ? sanitizeString(formData.phone) : '',
      company: formData.company ? sanitizeString(formData.company) : '',
    };

    let emailContent = '';
    let subject = '';
    let autoReplyContent = '';

    switch (formType) {
      case 'meeting':
        subject = `Nowe zapytanie o spotkanie - ${sanitizedData.name}`;
        
        // Email do admina (z await!)
        emailContent = await render(
            MeetingEmail({
            name: sanitizedData.name,
            email: sanitizedData.email,
            phone: sanitizedData.phone,
            company: sanitizedData.company,
            preferredDate: sanitizedData.preferredDate,
            preferredTime: sanitizedData.preferredTime,
            meetingType: sanitizedData.meetingType,
            topic: sanitizedData.topic,
            })
        );
        
        // Email do użytkownika (z await!)
        autoReplyContent = await render(
            MeetingConfirmation({
            name: sanitizedData.name,
            preferredDate: sanitizedData.preferredDate,
            preferredTime: sanitizedData.preferredTime,
            meetingType: sanitizedData.meetingType,
            })
        );
        break;

      case 'quote':
        subject = `Zapytanie o wycenę - ${sanitizedData.name}`;
        emailContent = `
          <h2>Nowe zapytanie o wycenę</h2>
          <p><strong>Imię i nazwisko:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Telefon:</strong> ${sanitizedData.phone || 'Nie podano'}</p>
          <p><strong>Firma:</strong> ${sanitizedData.company || 'Nie podano'}</p>
          <hr/>
          <h3>Szczegóły projektu:</h3>
          <p><strong>Usługa:</strong> ${sanitizedData.service}</p>
          <p><strong>Pakiet:</strong> ${sanitizedData.package}</p>
          <p><strong>Termin realizacji:</strong> ${sanitizedData.timeline}</p>
          <p><strong>Czy ma stronę:</strong> ${sanitizedData.hasExistingSite ? 'Tak' : 'Nie'}</p>
          ${sanitizedData.currentSiteUrl ? `<p><strong>Obecna strona:</strong> ${sanitizeString(sanitizedData.currentSiteUrl)}</p>` : ''}
          <p><strong>Opis projektu:</strong></p>
          <p>${sanitizeString(sanitizedData.description)}</p>
        `;
        
        autoReplyContent = `
          <h2>Witaj ${sanitizedData.name.split(' ')[0]}! 👋</h2>
          <p>Dziękujemy za zapytanie o wycenę w WhiteSlope.</p>
          <p><strong>Szczegóły Twojego projektu:</strong></p>
          <ul>
            <li>Usługa: ${sanitizedData.service}</li>
            <li>Pakiet: ${sanitizedData.package}</li>
            <li>Termin: ${sanitizedData.timeline}</li>
          </ul>
          <p>Przygotujemy dla Ciebie szczegółową wycenę w ciągu 24-48 godzin.</p>
          <p><strong>Co się stanie dalej?</strong></p>
          <ol>
            <li>Przeanalizujemy Twoje wymagania</li>
            <li>Przygotujemy spersonalizowaną ofertę</li>
            <li>Skontaktujemy się z Tobą z wyceną i harmonogramem</li>
          </ol>
          <hr/>
          <p style="color: #666; font-size: 14px;">
            Pozdrawiamy,<br/>
            Zespół WhiteSlope<br/>
            📧 kontakt@whiteslope.studio<br/>
            📞 +48 731 721 760
          </p>
        `;
        break;

      case "question":
        subject = `Pytanie - ${sanitizeString(sanitizedData.subject)}`;
        const priorityText = sanitizedData.priority === 'high' ? '4 godzin' : 
                           sanitizedData.priority === 'medium' ? '24 godzin' : '48 godzin';
        
        emailContent = `
          <h2>Nowe pytanie</h2>
          <p><strong>Imię i nazwisko:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Telefon:</strong> ${sanitizedData.phone || 'Nie podano'}</p>
          <p><strong>Firma:</strong> ${sanitizedData.company || 'Nie podano'}</p>
          <hr/>
          <h3>Pytanie:</h3>
          <p><strong>Temat:</strong> ${sanitizeString(sanitizedData.subject)}</p>
          <p><strong>Priorytet:</strong> ${sanitizedData.priority === 'high' ? '🔴 Wysoki' : sanitizedData.priority === 'medium' ? '🟡 Średni' : '🟢 Niski'}</p>
          <p><strong>Treść:</strong></p>
          <p>${sanitizeString(sanitizedData.message)}</p>
        `;
        
        autoReplyContent = `
          <h2>Witaj ${sanitizedData.name.split(' ')[0]}! 👋</h2>
          <p>Dziękujemy za Twoje pytanie.</p>
          <p><strong>Otrzymaliśmy:</strong></p>
          <ul>
            <li>Temat: ${sanitizeString(sanitizedData.subject)}</li>
            <li>Priorytet: ${sanitizedData.priority === 'high' ? '🔴 Wysoki' : sanitizedData.priority === 'medium' ? '🟡 Średni' : '🟢 Niski'}</li>
          </ul>
          <p>Odpowiemy na Twoje pytanie w ciągu <strong>${priorityText}</strong>.</p>
          <hr/>
          <p style="color: #666; font-size: 14px;">
            Pozdrawiamy,<br/>
            Zespół WhiteSlope<br/>
            📧 kontakt@whiteslope.studio<br/>
            📞 +48 731 721 760
          </p>
        `;
        break;

      case 'project':
        subject = `Zgłoszenie projektu - ${sanitizedData.name}`;
        emailContent = `
          <h2>Nowe zgłoszenie projektu</h2>
          <p><strong>Imię i nazwisko:</strong> ${sanitizedData.name}</p>
          <p><strong>Email:</strong> ${sanitizedData.email}</p>
          <p><strong>Telefon:</strong> ${sanitizedData.phone || 'Nie podano'}</p>
          <p><strong>Firma:</strong> ${sanitizedData.company || 'Nie podano'}</p>
          <hr/>
          <h3>Szczegóły projektu:</h3>
          <p><strong>Typ projektu:</strong> ${sanitizedData.projectType}</p>
          <p><strong>Budżet:</strong> ${sanitizedData.budget}</p>
          <p><strong>Termin realizacji:</strong> ${sanitizedData.timeline}</p>
          <p><strong>Czy ma stronę:</strong> ${sanitizedData.hasExistingSite ? 'Tak' : 'Nie'}</p>
          ${sanitizedData.currentSiteUrl ? `<p><strong>Obecna strona:</strong> ${sanitizeString(sanitizedData.currentSiteUrl)}</p>` : ''}
          ${sanitizedData.preferredContact ? `<p><strong>Preferowany kontakt:</strong> ${sanitizedData.preferredContact === 'email' ? '📧 Email' : sanitizedData.preferredContact === 'phone' ? '📞 Telefon' : 'Dowolny'}</p>` : ''}
          ${sanitizedData.contactHours ? `<p><strong>Godz. kontaktu:</strong> ${sanitizeString(sanitizedData.contactHours)}</p>` : ''}
          ${sanitizedData.subject ? `<p><strong>Temat (dot.):</strong> ${sanitizeString(sanitizedData.subject)}</p>` : ''}
          
          <h3>Wymagania funkcjonalne (${sanitizedData.requirements.length}):</h3>
          <ul>
            ${sanitizedData.requirements.map((req: string) => `<li>${sanitizeString(req)}</li>`).join('')}
          </ul>
          
          <h3>Opis projektu:</h3>
          <p>${sanitizeString(sanitizedData.description)}</p>
          
          ${sanitizedData.inspirations ? `
            <h3>Inspiracje:</h3>
            <p>${sanitizeString(sanitizedData.inspirations)}</p>
          ` : ''}
        `;
        
        autoReplyContent = `
          <h2>Witaj ${sanitizedData.name.split(' ')[0]}! 👋</h2>
          <p>Dziękujemy za zgłoszenie projektu w WhiteSlope.</p>
          <p><strong>Podsumowanie projektu:</strong></p>
          <ul>
            <li>Typ: ${sanitizedData.projectType}</li>
            <li>Budżet: ${sanitizedData.budget}</li>
            <li>Termin: ${sanitizedData.timeline}</li>
            <li>Wymagania: ${sanitizedData.requirements.length} funkcjonalności</li>
          </ul>
          <p>Przygotujemy dla Ciebie szczegółową propozycję w ciągu 72 godzin.</p>
          <p><strong>Następne kroki:</strong></p>
          <ol>
            <li>Analiza wymagań przez nasz zespół</li>
            <li>Przygotowanie szczegółowej wyceny</li>
            <li>Ustalenie harmonogramu realizacji</li>
            <li>Prezentacja propozycji i odpowiedzi na pytania</li>
          </ol>
          <hr/>
          <p style="color: #666; font-size: 14px;">
            Pozdrawiamy,<br/>
            Zespół WhiteSlope<br/>
            📧 kontakt@whiteslope.studio<br/>
            📞 +48 731 721 760
          </p>
        `;
        break;
    }

    // Sprawdź czy resend jest dostępne
    if (!resend) {
      console.error('❌ Resend nie jest skonfigurowane');
      return NextResponse.json(
        { error: 'Serwis email nie jest dostępny' },
        { status: 500 }
      );
    }

    // Wyślij email do admina
    console.log('📧 Wysyłanie emaila do admina...');
    const adminEmailResult = await resend.emails.send({
      from: 'Formularz WhiteSlope <kontakt@whiteslope.studio>',
      to: ['kontakt@whiteslope.studio'],
      subject: subject,
      html: emailContent,
      replyTo: sanitizedData.email,
    });
    console.log('✅ Email do admina wysłany:', adminEmailResult);

    // Wyślij automatyczną odpowiedź do użytkownika
    console.log('📧 Wysyłanie automatycznej odpowiedzi...');
    const userEmailResult = await resend.emails.send({
      from: 'WhiteSlope <kontakt@whiteslope.studio>',
      to: [sanitizedData.email],
      subject: `Potwierdzenie: ${subject}`,
      html: autoReplyContent,
    });
    console.log('✅ Automatyczna odpowiedź wysłana:', userEmailResult);

    console.log('🎉 Wszystkie emaile wysłane pomyślnie!');
    return NextResponse.json({ 
      success: true, 
      adminEmailId: adminEmailResult.data?.id,
      userEmailId: userEmailResult.data?.id 
    });
  } catch (error) {
    console.error('❌ Błąd wysyłania emaila:', error);
    
    // Sprawdź czy to błąd Resend
    if (error && typeof error === 'object' && 'message' in error) {
      console.error('💬 Szczegóły błędu:', error.message);
    }
    
    return NextResponse.json(
      { 
        error: 'Nie udało się wysłać wiadomości',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}