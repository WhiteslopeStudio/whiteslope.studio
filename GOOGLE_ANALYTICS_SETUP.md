# 🚀 Instrukcja: Jak podłączyć Google Analytics do strony

## 📋 **Krok 1: Stwórz konto Google Analytics**

1. Idź na https://analytics.google.com
2. Zaloguj się kontem Google
3. Kliknij "Rozpocznij pomiary"
4. Nazwij konto (np. "WhiteSlope Studio")

## 📋 **Krok 2: Dodaj właściwość**

1. Wybierz "Właściwość internetowa"
2. Nazwa: "whiteslope.studio"
3. URL: https://whiteslope.studio
4. Branża: "Komputery i elektronika"
5. Strefa czasowa: "Warszawa"

## 📋 **Krok 3: Skopiuj Measurement ID**

1. Po utworzeniu zobaczysz **Measurement ID** (format: `G-XXXXXXXXXX`)
2. Skopiuj ten ID

## 📋 **Krok 4: Dodaj ID do projektu**

1. Otwórz plik `.env.local` w katalogu głównym projektu
2. Znajdź linijkę: 
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Zastąp `G-XXXXXXXXXX` swoim prawdziwym Measurement ID
4. Zapisz plik

## 📋 **Krok 5: Zrestartuj serwer**

```bash
npm run dev
```

## ✅ **Sprawdź czy działa**

1. Otwórz stronę w przeglądarce
2. W Google Analytics idź do **Raporty > Czas rzeczywisty**
3. Powinieneś zobaczyć swoją wizytę na żywo

## 🎯 **Dodatkowe eventy do śledzenia**

Kod już zawiera gotowe funkcje do śledzenia:
- Wysłanie formularza kontaktowego
- Kliknięcia w usługi  
- Interakcje z chatbotem
- Wyświetlenia stron cenników
- Wizyty na stronach miast

## 🔥 **Pro Tips**

- **Zamontuj też Google Tag Manager** - łatwiejsze zarządzanie
- **Dodaj cele konwersji** - formularz kontaktowy jako cel
- **Połącz z Google Search Console** - więcej danych SEO
- **Ustaw wiadomości email** - cotygodniowe raporty

## 🎯 **Cele do ustawienia w GA4**

1. **Kontakt** - wysłanie formularza kontaktowego
2. **Brief** - wypełnienie brief projektowego  
3. **Telefon** - kliknięcie w numer telefonu
4. **Email** - kliknięcie w adres email
5. **Pricing** - wyświetlenie strony cennika

**Po 24h będziesz mieć pełne dane o ruchu na stronie!** 📊