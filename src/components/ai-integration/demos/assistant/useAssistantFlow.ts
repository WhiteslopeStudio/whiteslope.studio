import { useState, useRef, useEffect } from 'react';

export type Step = 'init' | 'main_menu' | 'service_category' | 'service_selection' | 'calendar' | 'name' | 'phone' | 'email' | 'custom_msg' | 'summary' | 'want_to_ask' | 'type_question' | 'ask_email' | 'offer_interest' | 'sending' | 'follow_up' | 'done';

export interface Message {
  id: string;
  role: 'bot' | 'user';
  text: string;
  isTypingEffect?: boolean;
  msgType?: 'text' | 'subjects_tutoring' | 'subjects_salon' | 'subjects_makeup' | 'summary'; 
}

const generateId = () => Math.random().toString(36).substring(2, 9) + Date.now().toString(36);

export function useAssistantFlow() {
  const [step, setStep] = useState<Step>('init');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBotThinking, setIsBotThinking] = useState(false);
  
  const [bookingData, setBookingData] = useState({ 
    service: '', subject: '', date: '', time: '', name: '', phone: '', email: '', message: '' 
  });

  const hasInitialized = useRef(false);

  const addBotMessage = (text: string, nextStep: Step, delay = 600, typingEffect = true, msgType: Message['msgType'] = 'text') => {
    setIsBotThinking(true);
    setTimeout(() => {
      setIsBotThinking(false);
      setMessages(prev => [...prev, { id: generateId(), role: 'bot', text, isTypingEffect: typingEffect, msgType }]);
      setStep(nextStep);
    }, delay);
  };

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true;
      addBotMessage("Cześć! Jestem Twoim wirtualnym Asystentem Whiteslope. Pomagam automatyzować biznes, zarządzać kalendarzem i obsługiwać klientów 24/7. Wybierz jeden z tematów poniżej:", 'main_menu', 800);
    }
  }, []);

  const handleAction = (text: string, actionId?: string, extraData?: any) => {
    if (!text.trim()) return;
    
    setMessages(prev => prev.map(m => ({ ...m, isTypingEffect: false })));
    setMessages(prev => [...prev, { id: generateId(), role: 'user', text }]);
    setStep('sending'); 

    if (step === 'main_menu' || step === 'follow_up') {
      if (actionId === 'booking') {
        addBotMessage("Z przyjemnością! Kogo reprezentujemy w tym demo? Wybierz branżę z poniższej listy, a ja dostosuję interfejs:", 'service_category');
      } else if (actionId === 'offer') {
        addBotMessage("Nasza agencja **Whiteslope** to eksperci od najnowszych technologii. \n\nKtóry obszar naszej działalności interesuje Cię najbardziej?", 'offer_interest');
      } else if (actionId === 'faq') {
        addBotMessage("Oto najczęstsze pytania:\n\n**1. Ile kosztuje chatbot?**\nWyceny są indywidualne, zależą od integracji (np. kalendarz, e-mail, CRM).\n**2. Czy wdrożenie jest trudne?**\nAbsolutnie nie! Nasz zespół zajmuje się wszystkim od A do Z.\n\nCzy masz jakieś inne, własne pytanie?", 'want_to_ask');
      } else if (actionId === 'contact') {
        addBotMessage("Skontaktuj się z zespołem Whiteslope:\n📞 **662 581 368**\n✉️ **kontakt@whiteslope.studio**\n\nCzy chciałbyś zostawić nam wiadomość bezpośrednio tutaj?", 'want_to_ask');
      } else {
        addBotMessage("Wybierz opcję z pigułek na dole, abym mógł Ci pomóc!", step);
      }
    } 

    else if (step === 'want_to_ask') {
      if (actionId === 'yes') {
        addBotMessage("Śmiało, opisz swój problem lub wpisz pytanie w polu tekstowym poniżej:", 'type_question');
      } else {
        addBotMessage("W porządku! W czym innym mogę Ci dzisiaj pomóc?", 'follow_up');
      }
    }
    else if (step === 'type_question') {
      addBotMessage("Dziękuję. Na jaki adres e-mail mamy przesłać odpowiedź od naszego zespołu?", 'ask_email');
    }
    else if (step === 'ask_email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        addBotMessage("Ten adres e-mail jest niepoprawny. Sprawdź go i podaj jeszcze raz:", 'ask_email');
        return;
      }
      addBotMessage("Wiadomość została przekazana bezpośrednio do naszego zespołu! Odpowiemy najszybciej jak to możliwe. 🚀\n\nCzy mogę pomóc w czymś jeszcze?", 'follow_up');
    }

    else if (step === 'offer_interest') {
      addBotMessage(`Świetny wybór (${text})! Podaj swój adres e-mail, a prześlemy Ci niezobowiązujące portfolio oraz wycenę z tej kategorii:`, 'ask_email');
    }

    else if (step === 'service_category') {
      if (actionId === 'korepetycje') {
        setBookingData(prev => ({ ...prev, service: 'Korepetycje' }));
        addBotMessage("Doskonale! Zobacz, jakie zajęcia prowadzimy. Wybierz interesujący Cię przedmiot klikając w jeden z poniższych kafelków:", 'service_selection', 600, true, 'subjects_tutoring');
      } else if (actionId === 'salon') {
        setBookingData(prev => ({ ...prev, service: 'Salon Fryzjerski' }));
        addBotMessage("Witaj w wirtualnym salonie! Przygotowaliśmy dla Ciebie wolne fotele. Co wybierasz?", 'service_selection', 600, true, 'subjects_salon');
      } else if (actionId === 'makeup') {
        setBookingData(prev => ({ ...prev, service: 'Makijaż' }));
        addBotMessage("Poczuj się pięknie! Wybierz rodzaj makijażu z naszej oferty poniżej:", 'service_selection', 600, true, 'subjects_makeup');
      } else {
        addBotMessage("Wybierz jedną z przygotowanych branż, aby zobaczyć magię personalizacji:", 'service_category');
      }
    }
    else if (step === 'service_selection') {
      setBookingData(prev => ({ ...prev, subject: text }));
      addBotMessage(`Świetny wybór (**${text}**). Połączyłem się z kalendarzem. Wybierz dogodny dzień i godzinę w poniższym panelu:`, 'calendar');
    }
    else if (step === 'calendar') {
      setBookingData(prev => ({ ...prev, date: extraData.date, time: extraData.time }));
      addBotMessage(`Zablokowałem wstępnie termin: **${extraData.date} o ${extraData.time}**. \nTeraz potrzebuję kilku danych. **Jak się nazywasz?** (Podaj imię i nazwisko)`, 'name');
    }
    else if (step === 'name') {
      if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s]+$/.test(text)) {
        addBotMessage("Użyto cyfr lub znaków specjalnych. Podaj swoje prawdziwe imię i nazwisko (tylko litery):", 'name');
        return;
      }
      setBookingData(prev => ({ ...prev, name: text }));
      addBotMessage(`Miło mi Cię poznać, **${text.split(' ')[0]}**! Podaj teraz swój **numer telefonu** (9 cyfr):`, 'phone');
    }
    else if (step === 'phone') {
      const cleanPhone = text.replace(/\s/g, '');
      if (!/^\d{9}$/.test(cleanPhone)) {
        addBotMessage("To nie wygląda jak poprawny numer. Wpisz 9 cyfr bez spacji:", 'phone');
        return;
      }
      setBookingData(prev => ({ ...prev, phone: cleanPhone }));
      // TUTAJ POPRAWIONY TEKST O EMAILU:
      addBotMessage("Doskonale. Na jaki **adres e-mail** mam wysłać potwierdzenie rezerwacji? *(Zachęcamy do wpisania prawdziwego adresu, aby zobaczyć faktyczną wiadomość w swojej skrzynce)*", 'email');
    }
    else if (step === 'email') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
        addBotMessage("Ten adres e-mail jest niepoprawny. Sprawdź go i podaj jeszcze raz:", 'email');
        return;
      }
      setBookingData(prev => ({ ...prev, email: text }));
      addBotMessage("Prawie gotowe! Czy chciałbyś dodać jakąś **wiadomość dodatkową** do rezerwacji? (Możesz pominąć).", 'custom_msg');
    }
    else if (step === 'custom_msg') {
      setBookingData(prev => ({ ...prev, message: text === 'Pomiń' ? 'Brak' : text }));
      addBotMessage("Oto podsumowanie Twojej rezerwacji. Sprawdź, czy wszystko się zgadza:", 'summary', 600, true, 'summary');
    }
    else if (step === 'summary') {
      if (actionId === 'confirm') {
        setIsBotThinking(true);

        const sendEmail = async () => {
          try {
            const response = await fetch('/api/ai/demo-booking', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(bookingData),
            });

            if (!response.ok) throw new Error('Blad wysylki');

            setIsBotThinking(false);
            setMessages(prev => [...prev, {
              id: generateId(),
              role: 'bot',
              text: `Rezerwacja została pomyślnie potwierdzona! ✅\n\nSzczegóły spotkania wysłałem na Twój adres e-mail (**${bookingData.email}**). Sprawdź swoją skrzynkę!\n\nCzy mogę pomóc Ci w czymś jeszcze?`,
              isTypingEffect: true
            }]);
          } catch (error) {
            setIsBotThinking(false);
            setMessages(prev => [...prev, {
              id: generateId(),
              role: 'bot',
              text: `Ups! Rezerwacja zapisana, ale wystąpił problem z wysyłką e-maila (sprawdź klucze API). \n\nCzy mogę pomóc Ci w czymś jeszcze?`,
              isTypingEffect: true
            }]);
          } finally {
            setBookingData(prev => ({ ...prev, service: '' }));
            setStep('follow_up');
          }
        };

        sendEmail();
      } else {
        setBookingData(prev => ({ ...prev, service: '' }));
        addBotMessage("Anulowałem proces rezerwacji. W czym mogę Ci jeszcze pomóc?", 'follow_up');
      }
    }
  };

  return { step, messages, isBotThinking, bookingData, handleAction };
}