import { BlogPost, MainService, ProcessStep, ProjectExample, ServicePackage } from "../lib/types";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "SEO w 2025 - Co musisz wiedzieć o pozycjonowaniu stron",
    excerpt:
      "Poznaj najważniejsze trendy i techniki SEO, które pomogą Twojej stronie znaleźć się w TOP 10 wyników Google.",
    content: `
# SEO w 2025 - Co musisz wiedzieć o pozycjonowaniu stron

Rok 2025 przyniósł znaczące zmiany w algorytmach wyszukiwarek. Google coraz bardziej stawia na jakość treści i doświadczenia użytkownika.

## Kluczowe trendy SEO w 2025

### 1. AI-Generated Content Detection
Google znacznie poprawił wykrywanie treści generowanej przez AI. Kluczowe jest:
- **Autentyczność**: Dodawaj osobiste doświadczenia i ekspertyzy
- **Weryfikacja faktów**: Sprawdzaj wszystkie dane przed publikacją
- **Unikalna perspektywa**: Przedstawiaj własny punkt widzenia

### 2. Core Web Vitals 2.0
Nowe metryki wydajności:
- **Interaction to Next Paint (INP)** zastąpił FID
- **Time to First Byte (TTFB)** zyskał na znaczeniu
- **Cumulative Layout Shift (CLS)** ma zaostrzone limity

### 3. Voice Search Optimization
Coraz więcej wyszukiwań odbywa się głosowo:
- Optymalizuj pod długie frazy (long-tail keywords)
- Używaj naturalnego języka w treściach
- Strukturyzuj dane z schema.org

## Praktyczne wskazówki

### Technical SEO
\`\`\`html
<!-- Optymalne meta tagi -->
<title>SEO 2025: Kompletny przewodnik pozycjonowania | WHITESLOPE</title>
<meta name="description" content="Poznaj najnowsze techniki SEO na 2025. Praktyczne wskazówki, case studies i narzędzia dla lepszej widoczności w Google.">
\`\`\`

### Content Strategy
1. **E-E-A-T** (Experience, Expertise, Authoritativeness, Trustworthiness)
   - Pokazuj swoje doświadczenie w temacie
   - Buduj autorytet przez konsekwentne publikowanie
   - Dodawaj referencje i źródła

2. **User Intent Matching**
   - Analizuj SERP dla swoich keywords
   - Dopasowuj format treści do intencji użytkownika
   - Używaj struktury pytanie-odpowiedź

### Local SEO
- Optymalizuj Google My Business
- Zbieraj autentyczne recenzje
- Buduj lokalne linki

## Narzędzia na 2025

| Narzędzie | Zastosowanie | Cena |
|-----------|--------------|------|
| Google Search Console | Monitoring wydajności | Free |
| Ahrefs | Analiza konkurencji | $99/miesiąc |
| Screaming Frog | Audyt techniczny | Free/£149/rok |
| PageSpeed Insights | Optymalizacja szybkości | Free |

## Podsumowanie

SEO w 2025 to przede wszystkim **jakość nad ilością**. Zamiast produkować setki słabych artykułów, skup się na tworzeniu wartościowych, eksperckich treści, które rzeczywiście pomagają użytkownikom.

Pamiętaj: Google nagradza strony, które zapewniają najlepsze doświadczenia użytkowników.
    `,
    date: "2024-12-15",
    category: "SEO",
    image: "/_resources/seo-2025.webp",
    slug: "seo-2025-pozycjonowanie-stron",
    author: "Zespół WHITESLOPE",
    readTime: "8 min",
    tags: ["SEO", "Google", "Pozycjonowanie"],
  },
  {
    id: "2",
    title: "Responsywny design - Dlaczego Twoja strona musi działać na mobile",
    excerpt:
      "Ponad 60% ruchu internetowego pochodzi z urządzeń mobilnych. Dowiedz się jak stworzyć stronę, która działa idealnie na każdym ekranie.",
    content: `
# Responsywny design - Dlaczego Twoja strona musi działać na mobile

W 2025 roku responsywność to nie opcja, to konieczność. Oto dlaczego i jak to zrobić dobrze.

## Statystyki mobilne

**60%** ruchu internetowego to urządzenia mobilne
**53%** użytkowników opuszcza stronę ładującą się dłużej niż 3 sekundy
**61%** użytkowników nie wróci na stronę z problemami mobilnymi

## Mobile-First Approach

### Breakpointy w 2025
\`\`\`css
/* Mobile first */
.container { width: 100%; }

/* Tablet */
@media (min-width: 768px) {
  .container { width: 750px; }
}

/* Desktop */
@media (min-width: 1024px) {
  .container { width: 1200px; }
}
\`\`\`

### Touch-Friendly Design
- Minimum 44px dla elementów klikalnych
- Odpowiednie odstępy między przyciskami
- Unikaj hover effects na mobile

## Najczęstsze błędy

1. **Małe przyciski** - trudne do kliknięcia palcem
2. **Niewłaściwy viewport** - strona nie skaluje się
3. **Wolne ładowanie** - zbyt duże obrazy
4. **Nieczytelny tekst** - za mały font
5. **Problemy z formularzami** - źle działające inputy

## Testowanie responsywności

### Narzędzia
- Chrome DevTools
- BrowserStack
- Responsively App
- Real device testing

### Checklist testowania
- [ ] Nawigacja działa na wszystkich rozdzielczościach
- [ ] Obrazy skalują się poprawnie
- [ ] Formularz jest łatwy do wypełnienia
- [ ] CTA buttons są łatwo dostępne
- [ ] Szybkość ładowania <3 sekundy

## Progressive Enhancement

Zacznij od podstawowej funkcjonalności na mobile, potem dodawaj features dla większych ekranów.

Responsywny design to inwestycja w przyszłość Twojej strony i zadowolenie użytkowników.
    `,
    date: "2024-12-10",
    category: "Design",
    image: "/_resources/responsive-design.webp",
    slug: "responsywny-design-mobile-first",
    author: "Zespół WHITESLOPE",
    readTime: "6 min",
    tags: ["Responsive", "Mobile", "UX"],
  },
  {
    id: "3",
    title: "Szybkość ładowania strony - Jak poprawić wydajność o 300%",
    excerpt:
      "Użytkownicy opuszczają strony, które ładują się dłużej niż 3 sekundy. Zobacz jak drastycznie poprawić wydajność swojej witryny.",
    date: "2024-12-05",
    category: "Performance",
    image: "/_resources/page-speed.webp",
    slug: "szybkosc-ladowania-strony-wydajnosc",
    author: "Zespół WHITESLOPE",
    readTime: "10 min",
    tags: ["Performance", "Optymalizacja", "Core Web Vitals"],
  },
  {
    id: "4",
    title: "Bezpieczeństwo stron internetowych - SSL, HTTPS i nie tylko",
    excerpt:
      "Cyberbezpieczeństwo to nie opcja, to konieczność. Poznaj najważniejsze zabezpieczenia dla Twojej strony internetowej.",
    date: "2024-11-28",
    category: "Bezpieczeństwo",
    image: "/_resources/security.webp",
    slug: "bezpieczenstwo-stron-internetowych-ssl",
    author: "Zespół WHITESLOPE",
    readTime: "7 min",
    tags: ["Security", "SSL", "HTTPS"],
  },
  {
    id: "5",
    title: "Trendy web design 2025 - Co będzie modne w tym roku",
    excerpt:
      "Minimalizm, dark mode, czy może śmiałe kolory? Odkryj najgorętsze trendy w projektowaniu stron na 2025 rok.",
    date: "2024-11-20",
    category: "Design",
    image: "/blog/web-trends-2025.webp",
    slug: "trendy-web-design-2025",
    author: "Zespół WHITESLOPE",
    readTime: "9 min",
    tags: ["Design", "Trendy", "2025"],
  },
  {
    id: "6",
    title:
      "UX/UI Best Practices - Jak projektować strony przyjazne użytkownikom",
    excerpt:
      "Dobry design to nie tylko ładny wygląd. To przede wszystkim intuicyjna nawigacja i pozytywne doświadczenia użytkownika.",
    date: "2024-11-15",
    category: "UX/UI",
    image: "/blog/ux-ui-practices.webp",
    slug: "ux-ui-best-practices-projektowanie",
    author: "Zespół WHITESLOPE",
    readTime: "12 min",
    tags: ["UX", "UI", "Usability"],
  },
  {
      "id": "7",
      "title": "Ile kosztuje strona internetowa w 2025 roku?",
      "excerpt": "Dowiedz się, ile kosztuje stworzenie strony w zależności od jej typu i jakie czynniki wpływają na cenę.",
      "content": "# Ile kosztuje strona internetowa w 2025 roku?\n\nKoszt strony zależy od jej złożoności. Oto szczegóły naszych pakietów.\n\n## Pakiety WHITESLOPE\n\n### 1. Landing Page (od 1500 zł)\n- **Czas realizacji**: 1-2 tygodnie\n- **Funkcje**: Responsywny design, formularz kontaktowy, SEO, hosting i domena na rok\n\n### 2. Strona Biznesowa (od 3500 zł)\n- **Czas realizacji**: 3-4 tygodnie\n- **Funkcje**: Do 10 podstron, CMS, blog, galeria, zaawansowane SEO, 6 miesięcy wsparcia\n\n### 3. Portal Biznesowy (od 6500 zł)\n- **Czas realizacji**: 4-6 tygodni\n- **Funkcje**: Nieograniczone podstrony, zaawansowany CMS, rezerwacje online, wielojęzyczność\n\n## Czynniki wpływające na cenę\n\n- **Złożoność designu**\n- **Integracje zewnętrzne** (np. CRM, e-commerce)\n- **Dodatkowe funkcje** (np. AI, newsletter)\n\n## Przykład projektu\n\nWiesławski Studio – strona biznesowa za 3500 zł przyniosła zapytania w 24h po uruchomieniu.\n\nSkontaktuj się na bezpłatną konsultację, by omówić Twój projekt!",
      "date": "2024-11-10",
      "category": "Web Development",
      "image": "/_resources/website-cost.webp",
      "slug": "koszt-strony-internetowej-2025",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Web Development", "Cennik", "Strony"]
    },
    {
      "id": "8",
      "title": "Jak stworzyć landing page, który konwertuje?",
      "excerpt": "Landing page to klucz do pozyskiwania klientów. Poznaj najlepsze praktyki tworzenia skutecznych stron docelowych.",
      "content": "# Jak stworzyć landing page, który konwertuje?\n\nLanding page to jednostronicowa witryna nastawiona na konwersję.\n\n## Kluczowe elementy\n\n1. **Hero Section** - Jasne CTA i chwytliwy nagłówek\n2. **Social Proof** - Opinie, case studies, statystyki\n3. **Formularz** - Prosty, z walidacją\n\n## Przykład kodu\n\n```html\n<section class=\"hero\">\n  <h1>Zacznij już dziś!</h1>\n  <button class=\"cta\">Zamów teraz</button>\n</section>\n```\n\n## Pakiet WHITESLOPE\n\n- **Landing Page**: od 1500 zł\n- **Czas realizacji**: 1-2 tygodnie\n- **Funkcje**: Responsywny design, SEO, formularz, Google Analytics\n\n## Testy A/B\n\nTestuj różne nagłówki, kolory przycisków i układy.\n\nSkuteczny landing page to połączenie designu, treści i strategii.",
      "date": "2024-11-05",
      "category": "Web Development",
      "image": "/_resources/landing-page.webp",
      "slug": "landing-page-konwersja",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["Landing Page", "Konwersja", "Design"]
    },
    {
      "id": "9",
      "title": "Dlaczego warto mieć blog na stronie firmowej?",
      "excerpt": "Blog to potężne narzędzie SEO i budowania marki. Dowiedz się, jak wykorzystać blog w biznesie.",
      "content": "# Dlaczego warto mieć blog na stronie firmowej?\n\nBlog to więcej niż tylko artykuły – to sposób na przyciągnięcie klientów.\n\n## Korzyści bloga\n\n1. **SEO**: Regularne treści zwiększają widoczność w Google\n2. **Ekspertyza**: Pokazujesz wiedzę w swojej branży\n3. **Engagement**: Budujesz relacje z czytelnikami\n\n## Jak zacząć?\n\n- **Tematyka**: Pisz o problemach Twojej grupy docelowej\n- **Regularność**: Publikuj co tydzień lub co dwa tygodnie\n- **Promocja**: Dziel się w social media i newsletterze\n\n## WHITESLOPE Pakiet\n\n- **Strona Biznesowa**: od 3500 zł\n- **Blog**: System kategorii, tagów i CMS\n- **Czas realizacji**: 3-4 tygodnie\n\nPrzykład: Strona Patryka Kuleszy z blogiem zwiększyła jego widoczność i przyniosła oferty pracy.",
      "date": "2024-11-01",
      "category": "Content Marketing",
      "image": "/_resources/blogging.webp",
      "slug": "blog-firmowy-seo",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Blog", "SEO", "Content"]
    },
    {
      "id": "10",
      "title": "Jak zoptymalizować stronę pod kątem SEO?",
      "excerpt": "SEO to klucz do sukcesu w Google. Poznaj techniki optymalizacji strony od podstaw.",
      "content": "# Jak zoptymalizować stronę pod kątem SEO?\n\nSEO to proces zwiększania widoczności strony w wyszukiwarkach.\n\n## Techniczne SEO\n\n- **Meta tagi**:\n```html\n<meta name=\"description\" content=\"Twoja treść\">\n<meta name=\"keywords\" content=\"słowa kluczowe\">\n```\n- **Sitemap.xml**: Dla lepszego indeksowania\n- **Robots.txt**: Kontrola crawlowania\n\n## On-page SEO\n\n- **Nagłówki H1-H6**: Struktura treści\n- **Alt teksty**: Opisy obrazów\n- **Linki wewnętrzne**: Budują architekturę\n\n## Off-page SEO\n\n- Budowanie linków zewnętrznych\n- Recenzje i wzmianki\n\n## WHITESLOPE Usługi\n\n- **Audyt SEO**: od 800 zł, 1 tydzień\n- **Pełna optymalizacja**: od 2200 zł, 2-3 tygodnie\n\nSEO to inwestycja w długoterminowy sukces Twojej strony.",
      "date": "2024-10-28",
      "category": "SEO",
      "image": "/_resources/seo-optimization.webp",
      "slug": "optymalizacja-seo-strony",
      "author": "Zespół WHITESLOPE",
      "readTime": "7 min",
      "tags": ["SEO", "Optymalizacja", "Google"]
    },
    {
      "id": "11",
      "title": "Chatboty AI - Jak zwiększyć obsługę klienta 24/7?",
      "excerpt": "Chatboty AI to przyszłość obsługi klienta. Dowiedz się, jak wdrożyć je na swojej stronie.",
      "content": "# Chatboty AI - Jak zwiększyć obsługę klienta 24/7?\n\nChatboty AI odpowiadają na pytania klientów o każdej porze.\n\n## Korzyści\n\n- **Dostępność 24/7**: Obsługa non-stop\n- **Automatyzacja FAQ**: Szybkie odpowiedzi na typowe pytania\n- **Personalizacja**: Dopasowanie do Twojej branży\n\n## Jak działają?\n\n- Integracja z ChatGPT/Claude/Gemini\n- Uczenie na podstawie Twoich danych\n- Przekierowania do formularzy/sprzedaży\n\n## WHITESLOPE Pakiet\n\n- **Chatbot AI**: od 1000 zł\n- **Czas realizacji**: 1-2 tygodnie\n- **Funkcje**: Personalizacja, automatyczne odpowiedzi, integracja\n\nPrzykład: Chatbot dla sklepu e-commerce zwiększył konwersję o 15%.",
      "date": "2024-10-25",
      "category": "AI",
      "image": "/_resources/chatbot-ai.webp",
      "slug": "chatboty-ai-obsluga-klienta",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["AI", "Chatbot", "Obsługa Klienta"]
    },
    {
      "id": "12",
      "title": "Integracja newslettera - Jak zwiększyć sprzedaż dzięki email marketingowi?",
      "excerpt": "Email marketing to potężne narzędzie sprzedaży. Poznaj, jak zintegrować newsletter na stronie.",
      "content": "# Integracja newslettera - Jak zwiększyć sprzedaż dzięki email marketingowi?\n\nNewslettery to skuteczny sposób na budowanie relacji z klientami.\n\n## Dlaczego warto?\n\n- **Wysoka konwersja**: Emaile mają ROI 42:1\n- **Lojalność**: Regularny kontakt z subskrybentami\n- **Automatyzacja**: Oszczędność czasu\n\n## Kluczowe elementy\n\n- **Formularz zapisu**: Responsywny, zgodny z RODO\n- **Segmentacja**: Dzielenie odbiorców na grupy\n- **Automatyzacja**: Seria powitalnych emaili\n\n## WHITESLOPE Pakiety\n\n- **Newsletter Starter**: od 900 zł, 1 tydzień\n- **Newsletter Pro**: od 2000 zł, 2-3 tygodnie\n- **Full Automation**: od 4000 zł, 3-4 tygodnie\n\nZintegruj newsletter i zwiększ sprzedaż dzięki MailerLite!",
      "date": "2024-10-20",
      "category": "Email Marketing",
      "image": "/_resources/newsletter-integration.webp",
      "slug": "integracja-newsletter-email-marketing",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["Email Marketing", "Newsletter", "MailerLite"]
    },
    {
      "id": "13",
      "title": "Jak zaprojektować logo, które zapada w pamięć?",
      "excerpt": "Logo to wizytówka Twojej marki. Dowiedz się, jak stworzyć logo, które wyróżni Cię na rynku.",
      "content": "# Jak zaprojektować logo, które zapada w pamięć?\n\nLogo to kluczowy element identyfikacji wizualnej.\n\n## Zasady projektowania\n\n1. **Prostota**: Minimalistyczne logo jest łatwe do zapamiętania\n2. **Skalowalność**: Wygląda dobrze w każdym rozmiarze\n3. **Uniwersalność**: Działa w kolorze i mono\n\n## Proces tworzenia\n\n- **Research**: Analiza branży i konkurencji\n- **Szkice**: Wstępne koncepcje\n- **Digitalizacja**: Praca w Adobe Illustrator\n- **Testy**: Sprawdzanie na różnych nośnikach\n\n## WHITESLOPE Pakiet\n\n- **Logo**: od 700 zł\n- **Czas realizacji**: 1-2 tygodnie\n- **Funkcje**: PNG, JPG, PDF, SVG, 2 rundy poprawek\n\nStwórz logo, które buduje rozpoznawalność marki!",
      "date": "2024-10-15",
      "category": "Grafika",
      "image": "/_resources/logo-design.webp",
      "slug": "projektowanie-logo-marka",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Logo", "Grafika", "Branding"]
    },
    {
      "id": "14",
      "title": "Automatyzacja procesów z AI - Jak oszczędzić czas?",
      "excerpt": "AI może zrewolucjonizować Twój biznes. Poznaj, jak automatyzacja oszczędza czas i zwiększa efektywność.",
      "content": "# Automatyzacja procesów z AI - Jak oszczędzić czas?\n\nAI automatyzuje powtarzalne zadania, oszczędzając dziesiątki godzin miesięcznie.\n\n## Zastosowania AI\n\n- **Przetwarzanie dokumentów**: Ekstrakcja danych z PDF/skanów\n- **Kategoryzacja**: Inteligentne tagowanie treści\n- **Raporty**: Automatyczne generowanie statystyk\n\n## Technologie\n\n- OCR dla rozpoznawania tekstu\n- Modele Hugging Face dla analizy\n- Integracja z Azure/AWS/Colab\n\n## WHITESLOPE Pakiet\n\n- **AI Automatyzacja**: od 1500 zł\n- **Czas realizacji**: 2-3 tygodnie\n- **Funkcje**: Przetwarzanie danych, integracja z DB, raporty\n\nPrzykład: Automatyzacja faktur dla firmy oszczędziła 20h pracy miesięcznie.",
      "date": "2024-10-10",
      "category": "AI",
      "image": "/_resources/ai-automation.webp",
      "slug": "automatyzacja-procesow-ai",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["AI", "Automatyzacja", "Efektywność"]
    },
    {
      "id": "15",
      "title": "Jak przeprowadzić audyt strony internetowej?",
      "excerpt": "Audyt strony to pierwszy krok do poprawy wydajności i SEO. Dowiedz się, jak go przeprowadzić.",
      "content": "# Jak przeprowadzić audyt strony internetowej?\n\nAudyt strony pozwala znaleźć i naprawić problemy.\n\n## Co obejmuje audyt?\n\n1. **Techniczne SEO**: Meta tagi, sitemap, robots.txt\n2. **Wydajność**: Szybkość ładowania, Core Web Vitals\n3. **Responsywność**: Testy na urządzeniach\n\n## Proces\n\n- **Narzędzia**: Screaming Frog, Lighthouse, GTmetrix\n- **Raport**: Lista błędów i sugestii\n- **Naprawki**: Optymalizacja obrazów, kodu\n\n## WHITESLOPE Pakiet\n\n- **Audyt + Quick Fixes**: od 800 zł\n- **Czas realizacji**: 1 tydzień\n- **Funkcje**: Pełny audyt, raport, podstawowe poprawki\n\nRegularny audyt zapewnia, że Twoja strona jest zawsze w top formie.",
      "date": "2024-10-05",
      "category": "SEO",
      "image": "/_resources/site-audit.webp",
      "slug": "audyt-strony-internetowej",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["SEO", "Audyt", "Optymalizacja"]
    },
    {
      "id": "16",
      "title": "Dlaczego warto wybrać Next.js do tworzenia stron?",
      "excerpt": "Next.js to przyszłość web developmentu. Dowiedz się, dlaczego warto go używać.",
      "content": "# Dlaczego warto wybrać Next.js do tworzenia stron?\n\nNext.js to framework React do szybkich i zoptymalizowanych stron.\n\n## Zalety Next.js\n\n- **SSR i SSG**: Lepsze SEO i szybkość\n- **API Routes**: Wbudowane backendowe funkcjonalności\n- **TypeScript**: Bezpieczeństwo kodu\n\n## Przykład kodu\n\n```jsx\n// pages/index.js\nexport default function Home() {\n  return <h1>Witaj w Next.js!</h1>;\n}\n```\n\n## WHITESLOPE Usługi\n\n- Używamy Next.js w pakietach biznesowych i premium\n- **Czas realizacji**: 3-6 tygodni\n- **Korzyści**: Szybkość, SEO, skalowalność\n\nNext.js to idealny wybór dla nowoczesnych stron.",
      "date": "2024-10-01",
      "category": "Web Development",
      "image": "/_resources/nextjs.webp",
      "slug": "nextjs-tworzenie-stron",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["Next.js", "React", "Web Development"]
    },
    {
      "id": "17",
      "title": "Jak stworzyć identyfikację wizualną dla marki?",
      "excerpt": "Identyfikacja wizualna buduje rozpoznawalność. Poznaj kroki do stworzenia spójnej marki.",
      "content": "# Jak stworzyć identyfikację wizualną dla marki?\n\nSpójna identyfikacja wizualna to klucz do sukcesu marki.\n\n## Elementy identyfikacji\n\n1. **Logo**: Proste, uniwersalne\n2. **Kolory**: Paleta zgodna z marką\n3. **Typografia**: Czytelne fonty\n\n## Proces\n\n- **Analiza**: Zrozumienie wartości marki\n- **Moodboard**: Inspiracje wizualne\n- **Projektowanie**: Logo, banery, materiały\n\n## WHITESLOPE Pakiet\n\n- **Logo + Branding**: od 700 zł\n- **Czas realizacji**: 1-2 tygodnie\n- **Funkcje**: Logo, grafiki 2D, materiały promocyjne\n\nStwórz markę, która przyciąga uwagę klientów!",
      "date": "2024-09-28",
      "category": "Grafika",
      "image": "/_resources/branding.webp",
      "slug": "identyfikacja-wizualna-marka",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Branding", "Logo", "Grafika"]
    },
    {
      "id": "18",
      "title": "Jak zwiększyć konwersję dzięki email marketingowi?",
      "excerpt": "Email marketing to jeden z najskuteczniejszych kanałów sprzedaży. Poznaj najlepsze strategie.",
      "content": "# Jak zwiększyć konwersję dzięki email marketingowi?\n\nEmail marketing generuje wysoki ROI dzięki personalizacji.\n\n## Strategie\n\n1. **Segmentacja**: Dziel subskrybentów na grupy\n2. **Automatyzacja**: Serie powitalne, lejki sprzedażowe\n3. **A/B Testing**: Testuj różne warianty emaili\n\n## Przykłady\n\n- **Powitalny email**: Zniżka na pierwsze zakupy\n- **Reaktywacja**: Oferta dla nieaktywnych użytkowników\n\n## WHITESLOPE Pakiety\n\n- **Newsletter Pro**: od 2000 zł, 2-3 tygodnie\n- **Full Automation**: od 4000 zł, 3-4 tygodnie\n- **Funkcje**: Segmentacja, szablony, analityka\n\nZacznij kampanię, która zwiększy Twoją sprzedaż!",
      "date": "2024-09-25",
      "category": "Email Marketing",
      "image": "/_resources/email-marketing.webp",
      "slug": "email-marketing-konwersja",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["Email Marketing", "Konwersja", "Automatyzacja"]
    },
    {
      "id": "19",
      "title": "Jak przeprowadzić migrację strony bez straty SEO?",
      "excerpt": "Migracja strony może być ryzykowna. Dowiedz się, jak zrobić to bezpiecznie.",
      "content": "# Jak przeprowadzić migrację strony bez straty SEO?\n\nMigracja strony wymaga precyzji, by nie stracić pozycji w Google.\n\n## Kroki migracji\n\n1. **Audyt SEO**: Sprawdzenie obecnych pozycji\n2. **Mapowanie URL**: Zachowanie starych adresów\n3. **Redirects 301**: Przekierowania dla zmienionych stron\n\n## Narzędzia\n\n- Screaming Frog do audytu\n- Google Search Console do monitorowania\n\n## WHITESLOPE Pakiet\n\n- **Migracja + Redesign**: od 4500 zł\n- **Czas realizacji**: 4-5 tygodni\n- **Funkcje**: Nowy design, SEO, testy A/B, wsparcie\n\nMigracja z WHITESLOPE gwarantuje zachowanie pozycji w Google.",
      "date": "2024-09-20",
      "category": "SEO",
      "image": "/_resources/site-migration.webp",
      "slug": "migracja-strony-seo",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["SEO", "Migracja", "Web Development"]
    },
    {
      "id": "20",
      "title": "Grafika 3D - Jak wykorzystać wizualizacje w biznesie?",
      "excerpt": "Wizualizacje 3D przyciągają uwagę. Dowiedz się, jak je wykorzystać w marketingu.",
      "content": "# Grafika 3D - Jak wykorzystać wizualizacje w biznesie?\n\nGrafika 3D to potężne narzędzie promocyjne.\n\n## Zastosowania\n\n- **Mockupy produktów**: Opakowania, vouchery\n- **Social Media**: Wyróżniające się posty\n- **Prezentacje**: Realistyczne wizualizacje\n\n## Proces tworzenia\n\n- Modelowanie w Blender\n- Nakładanie tekstur\n- Renderowanie w wysokiej jakości\n\n## WHITESLOPE Pakiet\n\n- **Grafika 3D**: od 1200 zł\n- **Czas realizacji**: 2-3 tygodnie\n- **Funkcje**: Wizualizacje, rendery HQ, 2 rundy poprawek\n\n3D to sposób na nowoczesną prezentację produktów.",
      "date": "2024-09-15",
      "category": "Grafika",
      "image": "/_resources/3d-graphics.webp",
      "slug": "grafika-3d-wizualizacje",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Grafika 3D", "Wizualizacje", "Marketing"]
    },
    {
      "id": "21",
      "title": "Jak wybrać odpowiedni pakiet strony internetowej?",
      "excerpt": "Nie wiesz, który pakiet wybrać? Porównaj opcje i znajdź idealne rozwiązanie dla swojego biznesu.",
      "content": "# Jak wybrać odpowiedni pakiet strony internetowej?\n\nWybór pakietu zależy od potrzeb Twojego biznesu.\n\n## Porównanie pakietów\n\n| Pakiet | Cena | Czas | Funkcje |\n|--------|------|------|---------|\n| Landing Page | od 1500 zł | 1-2 tygodnie | Responsywny design, SEO, formularz |\n| Strona Biznesowa | od 3500 zł | 3-4 tygodnie | CMS, blog, galeria, wsparcie 6 miesięcy |\n| Portal Biznesowy | od 6500 zł | 4-6 tygodnie | Nieograniczone podstrony, rezerwacje, wielojęzyczność |\n\n## Dla kogo?\n\n- **Landing Page**: Startupy, kampanie reklamowe\n- **Biznesowa**: Małe i średnie firmy\n- **Premium**: Duże przedsiębiorstwa\n\n## Bezpłatna konsultacja\n\nSkontaktuj się, by omówić potrzeby i otrzymać wycenę!",
      "date": "2024-09-10",
      "category": "Web Development",
      "image": "/_resources/website-packages.webp",
      "slug": "wybor-pakietu-strony",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Web Development", "Cennik", "Strony"]
    },
    {
      "id": "22",
      "title": "Dlaczego warto inwestować w profesjonalne logo?",
      "excerpt": "Profesjonalne logo buduje zaufanie i rozpoznawalność. Dowiedz się, dlaczego warto w nie zainwestować.",
      "content": "# Dlaczego warto inwestować w profesjonalne logo?\n\nLogo to pierwszy kontakt klienta z Twoją marką.\n\n## Korzyści\n\n- **Rozpoznawalność**: Wyróżnia Cię na rynku\n- **Zaufanie**: Profesjonalny design buduje wiarygodność\n- **Uniwersalność**: Działa w druku i online\n\n## Proces projektowania\n\n- Analiza konkurencji\n- Projekt w wektorach (SVG)\n- Testy na różnych nośnikach\n\n## WHITESLOPE Pakiet\n\n- **Logo**: od 700 zł\n- **Czas realizacji**: 1-2 tygodnie\n- **Funkcje**: Formaty PNG, SVG, 2 rundy poprawek\n\nInwestycja w logo to inwestycja w markę na lata.",
      "date": "2024-09-05",
      "category": "Grafika",
      "image": "/_resources/professional-logo.webp",
      "slug": "profesjonalne-logo-marka",
      "author": "Zespół WHITESLOPE",
      "readTime": "4 min",
      "tags": ["Logo", "Branding", "Design"]
    },
    {
      "id": "23",
      "title": "Jak zintegrować AI z istniejącą stroną?",
      "excerpt": "Integracja AI może zrewolucjonizować Twoją stronę. Poznaj możliwości i proces wdrożenia.",
      "content": "# Jak zintegrować AI z istniejącą stroną?\n\nAI to sposób na zwiększenie funkcjonalności strony.\n\n## Możliwości AI\n\n- **Chatboty**: Obsługa klienta 24/7\n- **Analiza danych**: Personalizacja treści\n- **Automatyzacja**: Przetwarzanie dokumentów\n\n## Proces integracji\n\n- Analiza potrzeb biznesowych\n- Wybór modeli AI (ChatGPT, Claude)\n- Wdrożenie z API\n\n## WHITESLOPE Pakiet\n\n- **Chatbot AI**: od 1000 zł, 1-2 tygodnie\n- **AI Automatyzacja**: od 1500 zł, 2-3 tygodnie\n\nAI to przyszłość, która zaczyna się już dziś.",
      "date": "2024-09-01",
      "category": "AI",
      "image": "/_resources/ai-integration.webp",
      "slug": "integracja-ai-strona",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["AI", "Integracja", "Web Development"]
    },
    {
      "id": "24",
      "title": "Jak stworzyć skuteczny formularz kontaktowy?",
      "excerpt": "Formularz kontaktowy to klucz do pozyskiwania leadów. Dowiedz się, jak zaprojektować skuteczny formularz.",
      "content": "# Jak stworzyć skuteczny formularz kontaktowy?\n\nFormularz kontaktowy to brama do Twoich klientów.\n\n## Najlepsze praktyki\n\n- **Prostota**: Minimum pól\n- **Walidacja**: Informacje o błędach\n- **Responsywność**: Działa na mobile\n\n## Przykład kodu\n\n```html\n<form>\n  <input type=\"text\" name=\"name\" required placeholder=\"Imię\">\n  <input type=\"email\" name=\"email\" required placeholder=\"Email\">\n  <button type=\"submit\">Wyślij</button>\n</form>\n```\n\n## WHITESLOPE Pakiet\n\n- **Landing Page**: od 1500 zł, zawiera formularz\n- **Czas realizacji**: 1-2 tygodnie\n\nSkuteczny formularz zwiększa liczbę zapytań o 30%.",
      "date": "2024-08-28",
      "category": "Web Development",
      "image": "/_resources/contact-form.webp",
      "slug": "formularz-kontaktowy-konwersja",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Formularz", "Konwersja", "UX"]
    },
    {
      "id": "25",
      "title": "Czym jest CMS i dlaczego go potrzebujesz?",
      "excerpt": "CMS pozwala łatwo zarządzać treścią. Dowiedz się, dlaczego jest niezbędny dla Twojej strony.",
      "content": "# Czym jest CMS i dlaczego go potrzebujesz?\n\nCMS (Content Management System) to narzędzie do edycji treści bez kodowania.\n\n## Korzyści CMS\n\n- **Łatwość obsługi**: Intuicyjny panel\n- **Aktualizacje**: Dodawaj treści w czasie rzeczywistym\n- **Skalowalność**: Od bloga po e-commerce\n\n## Popularne CMS\n\n- WordPress\n- Strapi\n- WHITESLOPE Custom CMS\n\n## WHITESLOPE Pakiet\n\n- **Strona Biznesowa**: od 3500 zł, zawiera CMS\n- **Czas realizacji**: 3-4 tygodnie\n\nCMS to wolność w zarządzaniu Twoją stroną.",
      "date": "2024-08-25",
      "category": "Web Development",
      "image": "/_resources/cms.webp",
      "slug": "cms-zarzadzanie-trescia",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["CMS", "Web Development", "Treści"]
    },
    {
      "id": "26",
      "title": "Jak zwiększyć widoczność lokalnego biznesu online?",
      "excerpt": "Lokalne SEO to klucz do przyciągnięcia klientów z okolicy. Poznaj skuteczne strategie.",
      "content": "# Jak zwiększyć widoczność lokalnego biznesu online?\n\nLokalne SEO pomaga dotrzeć do klientów w Twojej okolicy.\n\n## Strategie\n\n- **Google My Business**: Uzupełnij profil\n- **Lokalne słowa kluczowe**: np. „fryzjer Warszawa”\n- **Recenzje**: Zachęcaj klientów do opinii\n\n## Narzędzia\n\n- Google My Business\n- Moz Local\n- BrightLocal\n\n## WHITESLOPE Usługi\n\n- **Audyt SEO**: od 800 zł\n- **Pełna optymalizacja**: od 2200 zł\n\nLokalne SEO to sposób na dominację w Twojej okolicy.",
      "date": "2024-08-20",
      "category": "SEO",
      "image": "/_resources/local-seo.webp",
      "slug": "lokalne-seo-biznes",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["Lokalne SEO", "Google My Business", "Marketing"]
    },
    {
      "id": "27",
      "title": "Jak stworzyć strategię content marketingu?",
      "excerpt": "Content marketing buduje relacje z klientami. Poznaj kroki do skutecznej strategii.",
      "content": "# Jak stworzyć strategię content marketingu?\n\nContent marketing to sztuka dostarczania wartościowych treści.\n\n## Kroki\n\n1. **Określ cele**: Świadomość marki, leady, sprzedaż\n2. **Poznaj odbiorców**: Twórz buyer personas\n3. **Planuj treści**: Blog, social media, newsletter\n\n## Przykłady\n\n- Artykuły edukacyjne\n- Case studies (np. Wiesławski Studio)\n- Posty w social media\n\n## WHITESLOPE Usługi\n\n- **Blog w pakiecie biznesowym**: od 3500 zł\n- **Newsletter Pro**: od 2000 zł\n\nContent marketing to inwestycja w długoterminowy sukces.",
      "date": "2024-08-15",
      "category": "Content Marketing",
      "image": "/_resources/content-marketing.webp",
      "slug": "strategia-content-marketing",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["Content Marketing", "Blog", "Strategia"]
    },
    {
      "id": "28",
      "title": "Dlaczego warto modernizować starą stronę?",
      "excerpt": "Stara strona może odstraszać klientów. Dowiedz się, dlaczego warto ją zmodernizować.",
      "content": "# Dlaczego warto modernizować starą stronę?\n\nNowoczesna strona to lepsze UX i wyższe pozycje w Google.\n\n## Powody modernizacji\n\n- **Szybkość**: Stare strony ładują się wolno\n- **Responsywność**: Brak wsparcia dla mobile\n- **Bezpieczeństwo**: Brak SSL i aktualizacji\n\n## WHITESLOPE Pakiet\n\n- **Pełna optymalizacja**: od 2200 zł, 2-3 tygodnie\n- **Migracja + Redesign**: od 4500 zł, 4-5 tygodni\n- **Funkcje**: Nowy design, SEO, responsywność\n\nModernizacja to sposób na odświeżenie wizerunku firmy.",
      "date": "2024-08-10",
      "category": "Web Development",
      "image": "/_resources/site-modernization.webp",
      "slug": "modernizacja-starej-strony",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Modernizacja", "SEO", "Web Development"]
    },
    {
      "id": "29",
      "title": "Jak wykorzystać grafiki 2D w marketingu?",
      "excerpt": "Grafiki 2D to skuteczny sposób na promocję. Dowiedz się, jak je wykorzystać.",
      "content": "# Jak wykorzystać grafiki 2D w marketingu?\n\nGrafiki 2D to ulotki, plakaty i wizytówki, które przyciągają uwagę.\n\n## Zastosowania\n\n- **Ulotki A5**: Idealne na eventy\n- **Plakaty A3**: Promocja lokalna\n- **Wizytówki**: Profesjonalny wizerunek\n\n## Proces\n\n- Projekt w Adobe Illustrator\n- Przygotowanie do druku (CMYK)\n- 2 rundy poprawek\n\n## WHITESLOPE Pakiet\n\n- **Grafika 2D**: od 800 zł\n- **Czas realizacji**: 1-2 tygodnie\n\nGrafiki 2D to sposób na wyróżnienie się w tłumie.",
      "date": "2024-08-05",
      "category": "Grafika",
      "image": "/_resources/2d-graphics.webp",
      "slug": "grafiki-2d-marketing",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Grafika 2D", "Marketing", "Design"]
    },
    {
      "id": "30",
      "title": "Jak wdrożyć system rezerwacji online?",
      "excerpt": "System rezerwacji zwiększa wygodę klientów. Dowiedz się, jak go wdrożyć.",
      "content": "# Jak wdrożyć system rezerwacji online?\n\nSystem rezerwacji to must-have dla usługowych biznesów.\n\n## Korzyści\n\n- **Wygoda**: Klienci rezerwują 24/7\n- **Automatyzacja**: Mniej pracy manualnej\n- **Integracje**: Płatności online, kalendarz\n\n## Proces wdrożenia\n\n- Analiza potrzeb\n- Integracja z CMS lub API\n- Testy na urządzeniach\n\n## WHITESLOPE Pakiet\n\n- **Portal Biznesowy**: od 6500 zł\n- **Czas realizacji**: 4-6 tygodni\n- **Funkcje**: Rezerwacje, CMS, wielojęzyczność\n\nZacznij oferować rezerwacje online już dziś!",
      "date": "2024-08-01",
      "category": "Web Development",
      "image": "/_resources/booking-system.webp",
      "slug": "system-rezerwacji-online",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Rezerwacje", "Web Development", "Automatyzacja"]
    },
    {
      "id": "31",
      "title": "Jak generować treści z AI?",
      "excerpt": "AI może tworzyć obrazy, wideo i teksty. Dowiedz się, jak wykorzystać generowanie treści.",
      "content": "# Jak generować treści z AI?\n\nAI to potężne narzędzie do tworzenia treści marketingowych.\n\n## Możliwości\n\n- **Obrazy**: Generowanie grafik z tekstu\n- **Wideo**: Tworzenie klipów promocyjnych\n- **Teksty**: Artykuły, posty, opisy\n\n## Technologie\n\n- Hugging Face dla modeli open-source\n- Integracja z chmurą (Azure/AWS)\n\n## WHITESLOPE Pakiet\n\n- **AI Generowanie Treści**: od 2000 zł\n- **Czas realizacji**: 2-3 tygodnie\n- **Funkcje**: Obrazy, wideo, analiza tekstu\n\nAI to sposób na szybkie i efektowne treści.",
      "date": "2024-07-28",
      "category": "AI",
      "image": "/_resources/ai-content.webp",
      "slug": "generowanie-tresci-ai",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["AI", "Treści", "Marketing"]
    },
    {
      "id": "32",
      "title": "Jak zwiększyć bezpieczeństwo strony WordPress?",
      "excerpt": "WordPress to popularny CMS, ale wymaga zabezpieczeń. Poznaj najlepsze praktyki.",
      "content": "# Jak zwiększyć bezpieczeństwo strony WordPress?\n\nWordPress jest celem ataków, ale można go zabezpieczyć.\n\n## Praktyki\n\n- **Aktualizacje**: Regularne update’y CMS i wtyczek\n- **Silne hasła**: Unikaj „admin123”\n- **Wtyczki bezpieczeństwa**: Wordfence, iThemes Security\n\n## Przykład\n\n```php\n// .htaccess dla ochrony\n<Files wp-config.php>\n    order allow,deny\n    deny from all\n</Files>\n```\n\n## WHITESLOPE Usługi\n\n- **Pełna optymalizacja**: od 2200 zł\n- **Funkcje**: SSL, backupy, zabezpieczenia\n\nZabezpiecz swoją stronę WordPress już dziś!",
      "date": "2024-07-25",
      "category": "Bezpieczeństwo",
      "image": "/_resources/wordpress-security.webp",
      "slug": "bezpieczenstwo-wordpress",
      "author": "Zespół WHITESLOPE",
      "readTime": "6 min",
      "tags": ["WordPress", "Bezpieczeństwo", "CMS"]
    },
    {
      "id": "33",
      "title": "Jak stworzyć strategię social media dla strony?",
      "excerpt": "Social media to klucz do promocji strony. Dowiedz się, jak stworzyć strategię.",
      "content": "# Jak stworzyć strategię social media dla strony?\n\nSocial media to sposób na zwiększenie ruchu na stronie.\n\n## Kroki\n\n1. **Określ cele**: Świadomość, sprzedaż, engagement\n2. **Wybierz platformy**: Instagram, LinkedIn, Facebook\n3. **Plan treści**: Posty, stories, kampanie\n\n## Grafiki\n\n- **WHITESLOPE Pakiet**: Grafika 2D od 800 zł\n- **Funkcje**: Posty, banery, stories\n\n## Wskazówki\n\n- Publikuj regularnie\n- Odpowiadaj na komentarze\n- Używaj hashtagów\n\nZintegruj social media z Twoją stroną dla lepszych wyników.",
      "date": "2024-07-20",
      "category": "Social Media",
      "image": "/_resources/social-media.webp",
      "slug": "strategia-social-media",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Social Media", "Marketing", "Promocja"]
    },
    {
      "id": "34",
      "title": "Jak zoptymalizować obrazy na stronie?",
      "excerpt": "Zoptymalizowane obrazy przyspieszają stronę. Poznaj najlepsze techniki kompresji.",
      "content": "# Jak zoptymalizować obrazy na stronie?\n\nObrazy to często główny powód wolnego ładowania strony.\n\n## Techniki\n\n- **Format WebP**: Mniejsza waga, lepsza jakość\n- **Kompresja**: Narzędzia jak TinyPNG\n- **Lazy Loading**: Ładowanie obrazów na żądanie\n\n## Przykład\n\n```html\n<img src=\"image.webp\" loading=\"lazy\" alt=\"Opis obrazu\">\n```\n\n## WHITESLOPE Usługi\n\n- **Audyt + Quick Fixes**: od 800 zł\n- **Pełna optymalizacja**: od 2200 zł\n\nZoptymalizowane obrazy to szybsza strona i lepsze SEO.",
      "date": "2024-07-15",
      "category": "Performance",
      "image": "/_resources/image-optimization.webp",
      "slug": "optymalizacja-obrazow-strona",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Optymalizacja", "Obrazy", "Performance"]
    },
    {
      "id": "35",
      "title": "Jak wybrać domenę i hosting dla strony?",
      "excerpt": "Dobra domena i hosting to podstawa strony. Dowiedz się, jak wybrać najlepsze opcje.",
      "content": "# Jak wybrać domenę i hosting dla strony?\n\nDomena i hosting wpływają na sukces Twojej strony.\n\n## Wybór domeny\n\n- **Krótka i chwytliwa**: np. whiteslope.studio\n- **Słowa kluczowe**: Włącz nazwę branży\n- **Rozszerzenie**: .studio, .pl, .com\n\n## Wybór hostingu\n\n- **Szybkość**: SSD i CDN\n- **Bezpieczeństwo**: SSL, backupy\n- **Wsparcie**: 24/7\n\n## WHITESLOPE Pakiety\n\n- **Hosting i domena**: W cenie każdego pakietu na 1 rok\n- **Koszt po roku**: 200-300 zł rocznie\n\nWybierz hosting i domenę z WHITESLOPE dla niezawodności.",
      "date": "2024-07-10",
      "category": "Web Development",
      "image": "/_resources/domain-hosting.webp",
      "slug": "domena-hosting-strona",
      "author": "Zespół WHITESLOPE",
      "readTime": "5 min",
      "tags": ["Domena", "Hosting", "Web Development"]
    }

];

export const FAQ_DATA = [
  {
    id: "1",
    question: "Ile czasu trwa realizacja projektu?",
    answer:
      "Czas realizacji zależy od złożoności projektu. Prosty landing page może być gotowy w 1-2 tygodnie, podczas gdy bardziej rozbudowana strona biznesowa lub portal może zająć od 4 do 6 tygodni.",
  },
  {
    id: "2",
    question: "Czy strona będzie responsywna?",
    answer:
      "Tak! Wszystkie nasze strony są w pełni responsywne i idealnie wyglądają na komputerach, tabletach i smartfonach. Testujemy je na różnych urządzeniach i rozdzielczościach.",
  },
  {
    id: "3",
    question: "Czy mogę samodzielnie edytować treści?",
    answer:
      "Oczywiście! W pakietach biznesowych i premium oferujemy system zarządzania treścią (CMS), który pozwala na łatwą edycję tekstów, obrazów i innych elementów strony bez konieczności posiadania wiedzy technicznej.",
  },
  {
    id: "4",
    question: "Czy zapewniacie wsparcie po uruchomieniu?",
    answer:
      "Oczywiście! Po uruchomieniu strony zapewniamy bezpłatne wsparcie techniczne, pomoc w obsłudze oraz aktualizacje bezpieczeństwa. Oferujemy także pakiety rozszerzonego wsparcia.",
  },
  {
    id: "5",
    question: "Ile kosztuje hosting i domena?",
    answer:
      "W większości przypadków koszt domeny i hostingu to około 200–300 zł rocznie. Jeśli strona jest napisana w kodzie (bez systemu WordPress), to tak naprawdę jedynym stałym kosztem jest sama domena. Pomożemy wybrać odpowiedni pakiet, założyć konto i dopilnujemy, żeby wszystko działało sprawnie. W razie potrzeby doradzimy też, gdyby strona wymagała dodatkowych opcji — wszystko zawsze ustalamy z wyprzedzeniem, żeby było jasno i bez niespodzianek.",
  },
  {
    id: "6",
    question: "Czy strona będzie zoptymalizowana pod SEO?",
    answer:
      "Tak! Wszystkie nasze strony są budowane z myślą o SEO. Używamy najnowszych technologii, dbamy o szybkość ładowania, optymalizujemy meta tagi i strukturę danych dla lepszej widoczności w Google.",
  },
];

// ==========================================
// 📦 NOWA STRUKTURA CENNIKOWA OPARTA NA MAIN_SERVICES
// ==========================================



// Pakiety cenowe dla każdej usługi
export const SERVICE_PACKAGES = [
  {
    serviceId: "website",
    packages: [
      {
        id: "website-basic",
        name: "Landing Page",
        price: "od 1500 zł",
        description: "Profesjonalna jednostronicowa strona idealna na start",
        features: [
          "1 strona (landing page)",
          "Projekt i wygląd dopasowany do Twojej marki",
          "Podstawowe funkcje (formularz kontaktowy, newsletter, cookies)",
          "Optymalizacja szybkości ładowania",
          "Podstawowe SEO",
          "Działa na telefonie, tablecie i komputerze",
          "Podpięcie narzędzi analitycznych (np. Google Analytics)",
          "Wsparcie po wdrożeniu: 1 miesiąc",
        ],
        timeline: "1-2 tygodni",
      },
      {
        id: "website-business",
        name: "Strona firmowa",
        price: "od 3000 zł",
        description: "Kompleksowa strona firmowa z systemem zarządzania",
        features: [
          "2-10 podstron",
          "Projekt i wygląd dopasowany do Twojej marki",
          "Podstawowe funkcje (formularz kontaktowy, newsletter, cookies)",
          "Optymalizacja szybkości ładowania",
          "Podstawowe SEO",
          "Działa na telefonie, tablecie i komputerze",
          "Podpięcie narzędzi analitycznych (np. Google Analytics)",
          "CMS do zarządzania treściami bloga i aktualności",
          "Wsparcie po wdrożeniu: 2 miesiące",
          
        ],
        timeline: "3-4 tygodni",
        highlighted: true,
      },
      {
        id: "website-premium",
        name: "Portal biznesowy - aplikacja webowa",
        price: "od 6000 zł",
        description: "Zaawansowany portal z dodatkowymi funkcjami",
        features: [
          "10+ podstron",
          "Projekt i wygląd dopasowany do Twojej marki",
          "Podstawowe funkcje (formularz kontaktowy, newsletter, cookies)",
          "Optymalizacja szybkości ładowania",
          "Rozszerzone SEO",
          "Działa na telefonie, tablecie i komputerze",
          "Podpięcie narzędzi analitycznych (np. Google Analytics)",
          "CMS do zarządzania treściami bloga i aktualności",
          "Integracje z zewnętrznymi usługami, w tym połączenia z API",
          "Wsparcie po wdrożeniu: 3 miesiące",
        ],
        timeline: "4-6 tygodni",
      },
    ],
  },
  {
    serviceId: "optimization",
    packages: [
      {
        id: "optimization-audit",
        name: "Audyt + Quick Fixes",
        price: "od 800 zł",
        description: "Diagnoza problemów i natychmiastowe poprawki",
        features: [
          "Analiza wydajności i SEO",
          "Naprawki krytycznych błędów",
          "Optymalizacja obrazów",
          "Podstawowa poprawa SEO",
          "Responsywność na wszystkich urządzeniach",
        ],
        timeline: "1 tydzień",
      },
      {
        id: "optimization-full",
        name: "Pełna optymalizacja",
        price: "od 2200 zł",
        description: "Kompleksowa modernizacja istniejącej strony",
        features: [
          "Analiza wydajności i SEO",
          "Naprawki krytycznych błędów",
          "Optymalizacja obrazów",
          
          "Responsywność na wszystkich urządzeniach",
          "Migracja na nowoczesne technologie",
          "Kompletna optymalizacja SEO",
          "Setup Google Analytics",
          "Dokumentacja zmian",
        ],
        timeline: "2-3 tygodni",
        highlighted: true,
      },
      {
        id: "optimization-migration",
        name: "Pełna optymalizacja + Redesign",
        price: "od 4500 zł",
        description: "Kompletna modernizacja z nowym designem",
        features: [
          "Analiza wydajności i SEO",
          "Naprawki krytycznych błędów",
          "Optymalizacja obrazów",
          
          "Responsywność na wszystkich urządzeniach",
          "Migracja na nowoczesne technologie",
          "Kompletna optymalizacja SEO",
          "Setup Google Analytics",
          "Dokumentacja zmian",

          "Nowy, nowoczesny design",
          "UX/UI zgodne z najnowszymi trendami",
        ],
        timeline: "4-5 tygodni",
      },
    ],
  },
  {
    serviceId: "ai-integration",
    packages: [
      {
        id: "ai-chatbot",
        name: "Chatbot AI",
        price: "od 1000 zł",
        description: "Inteligentny asystent na Twoją stronę",
        features: [
          "Chatbot AI dostępny 24/7",
          "Integracja z ChatGPT/Claude/Gemini",
          "Personalizacja dla Twojej branży",
          "Automatyczne odpowiedzi na FAQ",
          "Przekierowania do formularzy i sprzedaży",
          "Konfiguracja i szkolenie",
        ],
        timeline: "1-2 tygodni",
      },
      {
        id: "ai-content-generation",
        name: "Ai Generowanie Treści",
        price: "od 2000 zł",
        description: "Kompleksowe rozwiązania AI dopasowane do Twoich potrzeb",
        features: [
          "Generowanie obrazów na podstawie opisu",
          "Tworzenie krótkich materiałów wideo z tekstu i grafik",
          "Generowanie treści marketingowych (posty, opisy, nagłówki)",
          "Przerabianie jednej treści na wiele formatów (np. blog -> social media)",
          "Podstawowa analiza i poprawa tekstu (styl, skracanie, porządkowanie)",
        ],
        timeline: "2-3 tygodni",
      },
      {
        id: "ai-automation",
        name: "AI Automatyzacja Procesów",
        price: "od 1500 zł",
        description: "Zautomatyzuj powtarzalne zadania i zaoszczędź czas",
        features: [
          "Automatyczne przepływy danych między narzędziami (np. formularz -> CRM -> e-mail)",
          
          "Automatyczne wystawianie i wysyłka dokumentów po zdarzeniu",
          
          "Automatyczne zadania cykliczne i raporty tygodniowe/miesięczne",
          "Integracje API i wdrożenia w n8n pod procesy biznesowe",
        ],
        timeline: "2-3 tygodni",
      },
    ],
  },
  {
    serviceId: "graphics",
    packages: [
      {
        id: "graphics-logo",
        name: "Logo",
        price: "od 700 zł",
        description: "Proste, czytelne logo dla Twojej marki",
        features: [
          "Projekt prostego logo",
          "Logo w formatach: PNG, JPG, PDF, SVG",
          "Wersje kolorowe i czarno-białe",
          "Pliki przygotowane do druku (CMYK, 300 DPI)",
          "2 rundy poprawek",
        ],
        timeline: "1-2 tygodni",
      },
      {
        id: "graphics-2d",
        name: "Grafika 2D",
        price: "od 800 zł",
        description: "Materiały drukowane - ulotki, plakaty, wizytówki",
        features: [
          "Projekt ulotki A5 (jedno- lub dwustronnej)",
          "lub projekt plakatu A3/A2",
          "lub projekt wizytówki dwustronnej",
          "Materiały gotowe do druku",
          "Układy graficzne i kompozycje",
          "2 rundy poprawek",
        ],
        timeline: "1-2 tygodni",
        highlighted: true,
      },
      {
        id: "graphics-3d",
        name: "Grafika 3D",
        price: "od 1200 zł",
        description: "Mockupy produktów i wizualizacje 3D",
        features: [
          "wizualizacje 3D (opakowania, vouchery, wizytówki)",
         
          "Renderowanie w wysokiej jakości",
          "Pliki gotowe do prezentacji i social media",
          "2 rundy poprawek",
        ],
        timeline: "2-3 tygodni",
      },
    ],
  },
  {
    serviceId: "individual",
    packages: [
      {
        id: "individual-consultation",
        name: "Konsultacja + Wycena",
        price: "Bezpłatna",
        description: "Rozpocznijmy od rozmowy o Twoich potrzebach",
        features: [
          "Darmowa 60-minutowa konsultacja",
          "Analiza wymagań biznesowych",
          "Omówienie możliwych rozwiązań",
          "Szczegółowa wycena projektu",
          "Plan realizacji i harmonogram",
          "Rekomendacje technologiczne",
          "Bez zobowiązań",
        ],
        timeline: "1 spotkanie",
      },
      {
        id: "individual-custom",
        name: "Projekt na zamówienie",
        price: "wg wyceny",
        description: "Realizacja dedykowanego rozwiązania",
        features: [
          "Wszystko z pakietu Konsultacji",
          "Dedykowany project manager",
          "Agile metodyka realizacji",
          "Regularne checkpointy i feedback",
          "Dokumentacja techniczna",
          "Testy i quality assurance",
          "Wdrożenie i szkolenia",
          "Rozszerzone wsparcie",
        ],
        timeline: "według zakresu",
        highlighted: true,
      },
      {
        id: "individual-partnership",
        name: "Długoterminowa współpraca",
        price: "od 3000 zł/mc",
        description: "Stały partner technologiczny dla Twojego biznesu",
        features: [
          "Wszystko z Projektu na zamówienie",
          
          "Priorytetowe wsparcie 24/7",
          "Regularne audyty i optymalizacje",
          "Dostęp do pełnego zespołu",
          "Strategiczne planowanie IT",
          "Rozliczenia miesięczne",
          "Możliwość anulowania (30 dni)",
        ],
        timeline: "długoterminowo",
      },
    ],
  },
  {
    serviceId: "email-marketing",
    packages: [
      {
        id: "email-basic",
        name: "Newsletter Starter",
        price: "od 800 zł",
        description: "Podstawowa integracja newsletter na stronie",
        features: [
          "Formularz zapisu. Popup lub inline",
          "Integracja z MailerLite",
          "Email powitalny. Automatyzacja",
          "Zgodność z RODO",
          "Setup konta",
        ],
        timeline: "1 tydzień",
      },
      {
        id: "email-advanced",
        name: "Newsletter Pro",
        price: "od 1500 zł",
        description: "Rozszerzona automatyzacja newslettera",
        features: [
          "Formularz zapisu. Popup lub inline",
          "Integracja z MailerLite",
          "Email powitalny. Automatyzacja",
          "Zgodność z RODO",
          "Setup konta",
          "2 formularze zapisu (popup + inline)",
          "Seria powitalnych emaili (3 wiadomości). Automatyzacja",
          
        ],
        timeline: "1-2 tygodni",
        highlighted: true,
      },
      {
        id: "email-automation",
        name: "Full Automation",
        price: "od 2000 zł",
        description: "Kompletna automatyzacja email marketingu",
        features: [

          "Formularz zapisu. Popup lub inline",
          "Integracja z MailerLite",
          "Email powitalny. Automatyzacja",
          "Zgodność z RODO",
          "Setup konta",
          "2 formularze zapisu (popup + inline)",
          "Seria powitalnych emaili (3 wiadomości). Automatyzacja",
          "Szablony Emaili przygotowane pod Ciebie",
          
        ],
        timeline: "2-3 tygodni",
      },
    ],
  },
  {
    serviceId: "video-marketing",
    packages: [
      {
        id: "video-basic",
        name: "Social Media Pack",
        price: "wycena indywidualna",
        description: "Rolki social media i content UGC do 60 sekund - dynamiczne materiały pod Instagram, TikTok i YouTube Shorts",
        features: [
          "3-5 rolek social media (każda do 60 sekund)",
          "Możliwość nagrań UGC (naturalny format pod social media)",
          "Nagrania sprzętem dopasowanym do formatu: iPhone / Lumix S5 II / opcjonalnie kamera kinowa przy większej produkcji",
          "Montaż dynamiczny z dopracowanym udźwiękowieniem filmu, które trzyma zainteresowanie",
          "Napisy i animacje graficzne",
          "Optymalizacja pod każdą platformę + bezpieczne kadrowanie (safe zones)",
        ],
        timeline: "1-2 tygodnie",
      },
      {
        id: "video-advanced",
        name: "Business Promo",
        price: "wycena indywidualna",
        description: "Film o firmie (ok. 2 min) na stronę, YouTube i social media - materiał, który buduje zaufanie i pokazuje Twoją markę",
        features: [
          "Film promocyjny o firmie: około 120 sekund",
          "Scenariusz + koncepcja kreatywna",
          "Liczba lokalizacji dopasowana do scenariusza i celu filmu",
          "Wywiad z właścicielem / zespołem",
          "Napisy i animacje graficzne",
          "Nagrania sprzętem dopasowanym do formatu: iPhone / Lumix S5 II / opcjonalnie kamera kinowa przy większej produkcji",
          "Dopracowane udźwiękowienie filmu, które trzyma zainteresowanie",
          "Optymalizacja pod publikację na stronie, YouTube i social media + safe zones",
        ],
        timeline: "2-3 tygodnie",
        highlighted: true,
      },
      {
        id: "video-premium",
        name: "Full Video Campaign",
        price: "wycena indywidualna",
        description: "Pakiet reklamowy produktu: od koncepcji po gotowe materiały sprzedażowe do kampanii online",
        features: [
          "Film reklamowy produktu (hero ad) pod kampanie sprzedażowe",
          "Seria rolek na Instagram wspierających reklamę produktu",
          "Scenariusz reklamowy + storyboard pod konwersję",
          "Ujęcia produktowe i lifestyle dopasowane do grupy docelowej",
          "Nagrania sprzętem dopasowanym do formatu: iPhone / Lumix S5 II / opcjonalnie kamera kinowa przy większej produkcji",
          "Napisy i animacje graficzne pod kreacje reklamowe",
          "Dopracowane udźwiękowienie filmu, które trzyma zainteresowanie",
          "Optymalizacja pod platformy reklamowe i social media + safe zones",
        ],
        timeline: "3-4 tygodnie",
      },
    ],
  },
  {
  "serviceId": "audio-editing",
  "packages": [
    {
      "id": "short-clean",
      "name": "Obróbka audio do shortów (do 60 sekund)",
      "price": "od 100 zł",
      "description": "Profesjonalne oczyszczanie i poprawa dźwięku do krótkich form wideo: TikTok, Reels, Shorts.",
      "features": [
        "Redukcja szumów i pogłosu",
        "Wyrównanie głośności, mocniejsze brzmienie głosu",
        "Usuwanie kliknięć, trzasków i oddechów",
        "Podkreślenie kluczowych słów, aby głos „wchodził” prosto w ucho",
        "Eksport gotowy do publikacji"
      ],
      "timeline": "1–3 dni"
    },
    {
      "id": "ad-clean",
      "name": "Obróbka audio do reklam i dłuższych materiałów",
      "price": "od 250 zł",
      "description": "Poprawa jakości dźwięku w materiałach reklamowych, prezentacjach, materiałach YouTube i filmach sprzedażowych.",
      "features": [
        "Dokładne oczyszczanie nagrania",
        "Wyostrzenie i uwydatnienie głosu",
        "Wyrównanie dynamiki — brak cichych i zbyt głośnych fragmentów",
        "Płynny, profesjonalny odsłuch bez rozpraszających artefaktów",
        "Plik przygotowany pod platformę (YT, FB Ads, TikTok Ads itd.)"
      ],
      "timeline": "2–5 dni"
    },
    {
      "id": "ai-voice",
      "name": "Automatyczny lektor AI + pełna obróbka",
      "price": "od 150 zł",
      "description": "Wygenerowany lektor AI w wybranym stylu i języku, od razu poprawiony i przygotowany do reklamy lub shorta.",
      "features": [
        "Wybór głosu (męski / żeński / dynamiczny / spokojny)",
        "Dopasowanie tempa i intonacji do materiału",
        "Pełna obróbka — czysto, głośno i wyraźnie",
        "Możliwość kilku wariantów do wyboru",
        "Gotowy plik do natychmiastowego użycia"
      ],
      "timeline": "1–2 dni"
    }
  ]
},
];

// Funkcje pomocnicze
export const getServicePackages = (serviceId: string): ServicePackage[] => {
  const serviceData = SERVICE_PACKAGES.find((s) => s.serviceId === serviceId);
  return serviceData?.packages || [];
};

export const getAllPackages = (): ServicePackage[] => {
  return SERVICE_PACKAGES.flatMap((service) => service.packages);
};

// Lista usług dla formularza kontaktowego
export const CONTACT_SERVICES = [
  "Landing Page (od 1500 zł)",
  "Strona biznesowa (od 3500 zł)",
  "Portal biznesowy (od 6500 zł)",
  "Audyt + Optymalizacja (od 800 zł)",
  "Migracja strony (od 2200 zł)",
  "Chatbot AI (od 1800 zł)",
  "Automatyzacja AI (od 3500 zł)",
  "Logo + Branding (od 700 zł)",
  "Marketing Pack (od 2500 zł)",
  "Konsultacja (Bezpłatna)",
  "Inne",
];

export const PROJECT_EXAMPLES: ProjectExample[] = [
  {
    id: "1",
    title: "Wiesławski Studio - profesjonalne studio muzyczne",
    image: "/_resources/wieslawskiStudio.webp",
    category: "Strona biznesowa",
    href: "https://www.wieslawski.studio/",
    description: "Nowoczesna strona dla profesjonalnego studia muzycznego. Już po 24 godzinach od uruchomienia pojawiły się pierwsze zapytania od klientów. Strona wyróżnia się eleganckim designem, szybkim ładowaniem i intuicyjną nawigacją, która skutecznie przekonuje odwiedzających do kontaktu.",
  },
  {
    id: "2",
    title: "Patryk Kulesza - korepetycje matematyka, angielski i programowanie",
    image: "/_resources/patrykkul.webp",
    category: "Strona usługowa",
    href: "https://korepetycje-eight.vercel.app",
    description: "Platforma edukacyjna dla korepetytora matematyki, angielskiego i programowania. Po zaledwie 3 dniach od uruchomienia klient otrzymał bardzo korzystną ofertę pracy. Strona zwiększyła widoczność online i profesjonalny wizerunek, przekładając się na realne możliwości zawodowe.",
  },

];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "1",
    title: "Analiza",
    description:
      "Poznajemy Twoje potrzeby biznesowe, cele oraz grupę docelową. Analizujemy konkurencję i definiujemy wymagania funkcjonalne.",
  },
  {
    id: "2",
    title: "Planowanie i cel",
    description:
      "Tworzymy strategię projektu, architekturę informacyjną oraz plan działania.",
  },
  {
    id: "3",
    title: "Projektowanie",
    description:
      "Projektujemy unikalny design dopasowany do Twojej marki. Tworzymy makiety i prototypy.",
  },
  {
    id: "4",
    title: "Tworzymy stronę",
    description:
      "Kodujemy bądź tworzymy stronę używając najnowszych technologii: Next.js, React, TypeScript, Wordpress. Dbamy o wydajność i SEO.",
  },
  {
    id: "5",
    title: "Testy i akceptacja",
    description:
      "Testujemy wszystkie funkcjonalności na różnych urządzeniach. Sprawdzamy wydajność, bezpieczeństwo i zgodność z najlepszymi praktykami.",
  },
  {
    id: "6",
    title: "Wdrożenie i wsparcie",
    description:
      "Uruchamiamy stronę na produkcyjnym serwerze. Zapewniamy pełne wsparcie techniczne, szkolenia i dokumentację.",
  },
];

export const MAIN_SERVICES: MainService[] = [
  {
    id: "website",
    title: "Strona internetowa",
    subtitle: "Profesjonalna prezencja online",
    price: "od 1500 zł",
    picture: "_resources/usluga-strony.webp",
    gallery: ["/_resources/stronyInternetowe/www.wieslawski.studio_.webp", "/_resources/stronyInternetowe/korepetycje-eight.vercel.app_.webp", "/_resources/stronyInternetowe/www.easylesson.app_.webp", "/_resources/stronyInternetowe/www.easylesson.app_ (1).webp", "/_resources/stronyInternetowe/www.easylesson.app_ (2).webp"],
    description:
      "Nowoczesne, responsywne strony internetowe zaprojektowane z myślą o Twoich klientach. Od prostych wizytówek po zaawansowane portale biznesowe.",
    features: [
      {
        title: "Responsywny design",
        description: "Twoja strona będzie doskonale wyglądać na każdym urządzeniu - od smartfonów po duże monitory."
      },
      {
        title: "Optymalizacja SEO",
        description: "Zadbamy o wysokie pozycje w Google dzięki nowoczesnym technikom pozycjonowania."
      },

      {
        title: "Certyfikat SSL i bezpieczeństwo",
        description: "Bezpieczeństwo danych Twoich klientów i wyższe pozycje w wynikach wyszukiwania."
      },
      {
        title: "Next.js / WordPress / Buildery",
        description: "Używamy najnowszych technologii zapewniających szybkość i stabilność."
      },
      {
        title: "Wsparcie techniczne",
        description: "Pełne wsparcie po uruchomieniu strony, pomoc i regularne aktualizacje."
      },
    ],
    ctaText: "Wybierz pakiet",
    animationDirection: "left",
    highlighted: true,
  },
  {
    id: "optimization",
    title: "Modernizacja strony",
    subtitle: "Ulepsz istniejącą stronę",
    price: "od 800 zł",
    picture: "_resources/usluga-modernizacja.webp",
    gallery: ["/_resources/optymalizacja/cyberfolks.pl_audyt-strony_.webp", "/_resources/stronyInternetowe/www.wieslawski.studio_.webp", "/_resources/stronyInternetowe/korepetycje-eight.vercel.app_.webp", "/_resources/stronyInternetowe/www.easylesson.app_.webp"],
    description:
      "Masz już stronę, ale nie działa jak powinna? Oferujemy kompleksową optymalizację, migrację na nowoczesne technologie oraz poprawę SEO.",
    features: [
      {
        title: "Migracja Strony",
        description: "Bezpieczne przeniesienie na nowoczesne technologie bez utraty pozycji SEO i danych."
      },
      {
        title: "Optymalizacja",
        description: "Drastyczna poprawa szybkości ładowania - nawet 3x szybciej niż przed modernizacją."
      },
      {
        title: "Pozycja w Google",
        description: "Kompleksowa optymalizacja SEO dla lepszej widoczności w wynikach wyszukiwania."
      },
      {
        title: "Responsywność mobile, tablet, desktop",
        description: "Twoja strona będzie idealnie działać na wszystkich urządzeniach i rozdzielczościach."
      },
      {
        title: "Audyt techniczny i raport",
        description: "Szczegółowa analiza problemów i raport z wykonanych usprawnień."
      },
    ],
    ctaText: "Wybierz pakiet",
    animationDirection: "right",
  },
  {
    id: "ai-integration",
    title: "Integracja AI",
    subtitle: "Chatboty, automatyzacja procesów i generatory treści",
    price: "od 1000 zł",
    picture: "_resources/usluga-ai.webp",
    gallery: ["/_resources/integracjaAI/ai1.webp",
       "/_resources/integracjaAI/ai2.webp"],
    description:
      "Wdrażamy rozwiązania AI dopasowane do Twoich potrzeb. Zaoszczędź czas, zwiększ efektywność i zadowolenie klientów dzięki inteligentnym narzędziom AI.",
    features: [
      {
        title: "Chatboty AI dla obsługi klienta",
        description: "Inteligentne chatboty obsługujące klientów przez całą dobę w Twoim stylu komunikacji."
      },
     
      {
        title: "Generowanie obrazów i wideo z tekstu",
        description: "Tworzenie unikalnych grafik i materiałów wideo na podstawie opisów tekstowych."
      },
      
      {
        title: "Inteligentne przetwarzanie i analiza tekstu",
        description: "Automatyczna analiza treści, tłumaczenia, streszczenia i kategoryzacja tekstów."
      },
      {
        title: "Pełna integracja z Twoją stroną/aplikacją",
        description: "Wdrożenie AI w istniejącą infrastrukturę bez zakłócania działania."
      },
    ],
    ctaText: "Wdróż AI w swojej firmie",
    animationDirection: "left",
  },
  {
    id: "graphics",
    title: "Grafika",
    subtitle: "Profesjonalna identyfikacja wizualna",
    price: "od 700 zł",
    picture: "_resources/usluga-grafika.webp",
    gallery: ["/_resources/grafika/wieslawski studio logo biale.webp",
      "/_resources/grafika/tunelock logo 2.webp",
      "/_resources/grafika/tok italia logo 5.webp",
      "/_resources/grafika/mati records logo2.webp",
      "/_resources/grafika/VOUCHER3D.webp",
      "/_resources/grafika/make drums come true reklama4.webp",
       "/_resources/grafika/make drums come true reklama6.webp",
        "/_resources/grafika/make drums come true reklama5.webp"],
    description:
      "Potrzebujesz grafik, logo czy kompleksowej identyfikacji wizualnej? Nasz zespół graficzny stworzy materiały, które wyróżnią Twoją markę.",
    features: [
      {
        title: "Projektowanie logo",
        description: "Unikalne logo odzwierciedlające charakter Twojej marki z pełnymi prawami autorskimi."
      },
      {
        title: "Grafiki na social media",
        description: "Spójne materiały wizualne dla wszystkich platform społecznościowych w różnych formatach."
      },
      {
        title: "Banery reklamowe i materiały promocyjne",
        description: "Efektowne banery do kampanii reklamowych i materiały promocyjne zwiększające konwersję."
      },
      {
        title: "Ikony i ilustracje",
        description: "Niestandardowe ikony i ilustracje doskonale dopasowane do stylu Twojej marki."
      },
     
      {
        title: "Grafiki 2D i modele 3D",
        description: "Zaawansowane grafiki płaskie i trójwymiarowe modele dla nowoczesnej prezentacji."
      },
    ],
    ctaText: "Wybierz pakiet",
    animationDirection: "right",
  },
  {
    id: "individual",
    title: "Indywidualny Plan",
    subtitle: "Konsultacja, projekt i długofalowa współpraca",
    price: "Bezpłatna konsultacja / wg wyceny",
    picture: "_resources/usluga-indywidualna.webp",
        gallery: ["/_resources/stronyInternetowe/www.wieslawski.studio_.webp", "/_resources/stronyInternetowe/korepetycje-eight.vercel.app_.webp", "/_resources/stronyInternetowe/www.easylesson.app_.webp", "/_resources/stronyInternetowe/www.easylesson.app_ (1).webp", "/_resources/stronyInternetowe/www.easylesson.app_ (2).webp"],

    description:
      "Zaczynamy od bezpłatnej konsultacji i szczegółowej wyceny, a następnie realizujemy dedykowane rozwiązanie dopasowane do Twojego biznesu.",
    features: [
      {
        title: "Darmowa konsultacja",
        description: "Rozmowa o celach, wymaganiach i możliwych kierunkach realizacji bez zobowiązań."
      },
      {
        title: "Szczegółowa wycena",
        description: "Otrzymujesz jasny plan prac, rekomendacje technologiczne i zakres dopasowany do budżetu."
      },
      {
        title: "Współpraca długoterminowa",
        description: "Możliwość stałej opieki technologicznej, regularnych optymalizacji i wsparcia priorytetowego."
      },
    ],
    ctaText: "Umów konsultację",
    animationDirection: "left",
  },
  {
    id: "email-marketing",
    title: "Integracja Email Marketing",
    subtitle: "MailerLite & Automatyzacja",
    price: "od 800 zł",
    picture: "_resources/usluga-integracja-email-marketing.webp",
    gallery: ["/_resources/emailMarketing/emailMarketing1.webp", "/_resources/emailMarketing/emailMarketing2.webp", "/_resources/emailMarketing/emailMarketing3.webp"],
    description:
      "Profesjonalna integracja z MailerLite, automatyczne newslettery i kampanie email marketingowe dla zwiększenia konwersji.",
    features: [
      {
        title: "Integracja z MailerLite",
        description: "Pełna integracja z profesjonalną platformą email marketingu z automatyzacjami."
      },
      {
        title: "Automatyczne newslettery",
        description: "Automatyczne wysyłanie newsletterów zgodnie z harmonogramem bez Twojej interwencji."
      },
      {
        title: "Segmentacja kontaktów",
        description: "Inteligentne dzielenie kontaktów na grupy dla lepszego targetowania wiadomości."
      },

      {
        title: "Responsywne szablony email",
        description: "Piękne szablony e-maili idealnie wyświetlające się na wszystkich urządzeniach."
      },
    ],
    ctaText: "Rozpocznij kampanię",
    animationDirection: "right",
    highlighted: false,
  },
  {
  id: "video-marketing",
  title: "Video Marketing",
  subtitle: "Profesjonalne filmy promocyjne",
  price: "wycena indywidualna",
  picture: "_resources/usluga-video-marketing.webp",
  gallery: null,
  description:
    "Tworzymy rolki social media, filmy promocyjne — od koncepcji po gotowe materiały do publikacji.",
  features: [
    {
      title: "Rolki social media i UGC",
      description: "Tworzymy krótkie formy (Reels, TikTok, Shorts) oraz naturalny content UGC dopasowany do platformy."
    },
    {
      title: "Filmy firmowe i reklamowe",
      description: "Realizujemy materiały promocyjne (także około 120 sekund), które budują zaufanie i wspierają sprzedaż."
    },
    {
      title: "Scenariusz i koncepcja kreatywna",
      description: "Przygotowujemy koncepcję, storyboard i układ ujęć dopasowany do celu filmu oraz grupy docelowej."
    },
    {
      title: "Nagrania dopasowanym sprzętem",
      description: "Nagrania realizujemy iPhone / Lumix S5 II / opcjonalnie kamerą kinową przy większej produkcji."
    },
    {
      title: "Montaż i udźwiękowienie",
      description: "Dynamiczny montaż z dopracowanym audio, napisami i animacjami graficznymi pod publikację."
    },
    {
      title: "Optymalizacja pod platformy",
      description: "Dostosowujemy formaty pod stronę, YouTube i social media, z bezpiecznym kadrowaniem (safe zones)."
    },
  ],
  ctaText: "Umów nagranie",
  animationDirection: "left",
  highlighted: true,
  },
  {    
    id: "audio-editing",
    title: "Obróbka Audio",
    subtitle: "Profesjonalna obróbka dźwięku",
    price: "od 100 zł",
    picture: "_resources/usluga-audio-editing.webp",
    gallery: null,
    description:
      "Oferujemy obróbkę audio do shortów, reklam i dłuższych materiałów z pełnym przygotowaniem plików do publikacji.",
    features: [
      {
        title: "Obróbka audio do shortów",
        description: "Profesjonalne czyszczenie i poprawa dźwięku w formatach do 60 sekund (Reels, TikTok, Shorts)."
      },
      {
        title: "Obróbka do reklam i dłuższych materiałów",
        description: "Wyrównanie dynamiki, poprawa czytelności głosu i przygotowanie pod YouTube oraz kampanie reklamowe."
      },
      {
        title: "Lektor AI + pełna obróbka",
        description: "Generowanie głosu AI z dopasowaniem stylu, intonacji i finalnym masteringiem materiału."
      },
      {
        title: "Redukcja szumów i artefaktów",
        description: "Usuwanie pogłosu, kliknięć, trzasków i innych zakłóceń z nagrania."
      },
      {
        title: "Wyrównanie głośności i barwy",
        description: "Spójny poziom głośności i lepsza prezencja głosu na różnych urządzeniach."
      },
      {
        title: "Eksport pod platformy",
        description: "Finalne pliki przygotowane pod publikację na YouTube, social media i platformy reklamowe."
      },
    ],
    ctaText: "Zamów edycję",
    animationDirection: "right",
    highlighted: false,
  },
  
];

// =========================
// 🌍 MIASTA PODLASKIE - Lokalne SEO
// =========================

// Funkcja konwersji polskich znaków na ASCII dla URL
export const convertToSlug = (text: string): string => {
  const polishToAscii: { [key: string]: string } = {
    'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
    'Ą': 'a', 'Ć': 'c', 'Ę': 'e', 'Ł': 'l', 'Ń': 'n', 'Ó': 'o', 'Ś': 's', 'Ź': 'z', 'Ż': 'z'
  };

  return text
    .replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (match) => polishToAscii[match] || match)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
};

export const PODLASKIE_CITIES = [
  "Białystok",
  "Suwałki", 
  "Łomża",
  "Augustów",
  "Bielsk Podlaski",
  "Grajewo",
  "Zambrów",
  "Hajnówka", 
  "Sokółka",
  "Łapy",
  "Siemiatycze",
  "Wasilków",
  "Kolno",
  "Mońki",
  "Wysokie Mazowieckie",
  "Czarna Białostocka",
  "Choroszcz",
  "Ciechanowiec",
  "Supraśl",
  "Zabłudów",
  "Tykocin",
  "Drohiczyn"
];

// Helper function to get city metadata
export const getCityMetadata = (citySlug: string): {
  title: string;
  description: string;
  h1: string;
  keywords: string;
  cityName: string;
} => {
  // Znajdź miasto na podstawie slug'a
  const miasto = PODLASKIE_CITIES.find(city => 
    convertToSlug(city) === citySlug.toLowerCase()
  );
  
  if (!miasto) {
    // Fallback dla Białystoka jeśli miasto nie zostało znalezione
    return getCityMetadata('bialystok');
  }

  const baseTitle = "Strony internetowe";
  const basePriceInfo = "od 1500 zł";
  const rating = "⭐⭐⭐⭐⭐";
  const reviewsCount = "2 opinie";
  
  return {
    title: `${baseTitle} ${miasto} ${basePriceInfo} | Whiteslope Studio | Profesjonalne Tworzenie Stron WWW`,
    description: `${rating} Profesjonalne strony internetowe ${miasto} ${basePriceInfo}. Whiteslope Studio - zespół programistów obsługujący ${miasto}. Realizacja kilka dni. Chatboty AI, SEO. ${reviewsCount}. Darmowa konsultacja!`,
    h1: `Strony internetowe ${miasto} ${basePriceInfo}`,
    keywords: `strony internetowe ${miasto.toLowerCase()}, tworzenie stron ${miasto.toLowerCase()}, strony www ${miasto.toLowerCase()}, agencja webdev ${miasto.toLowerCase()}, sklepy internetowe ${miasto.toLowerCase()}, aplikacje webowe ${miasto.toLowerCase()}, SEO ${miasto.toLowerCase()}`,
    cityName: miasto
  };
};

// Check if city exists
export const isCityValid = (citySlug: string): boolean => {
  return PODLASKIE_CITIES.some(city => 
    convertToSlug(city) === citySlug.toLowerCase()
  );
};