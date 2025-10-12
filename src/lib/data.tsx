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
];

export const FAQ_DATA = [
  {
    id: "1",
    question: "Ile czasu trwa realizacja projektu?",
    answer:
      "Czas realizacji zależy od złożoności projektu. Strona wizytówka to około 2-3 tygodni, strona biznesowa 4-6 tygodni, a e-commerce 6-10 tygodni. Zawsze ustalamy konkretny harmonogram na początku współpracy.",
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
      "W pakietach Business i Premium dostarczamy intuicyjny panel CMS, dzięki któremu możesz łatwo aktualizować treści, zdjęcia i dodawać nowe wpisy na blog bez znajomości programowania.",
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
      "W cenach naszych pakietów hosting i domena na pierwszy rok są już uwzględnione. Po tym okresie koszt to około 200-300 zł rocznie, w zależności od wybranego pakietu hostingowego.",
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
          "Nowoczesny, responsywny design",
          "Sekcje: Hero, O nas, Oferta, Kontakt",
          "Formularz kontaktowy z walidacją",
          "Optymalizacja SEO (meta tagi, struktura)",
          "Hosting i domena na 1 rok",
          "SSL i podstawowe zabezpieczenia",
          "Google Analytics",
        ],
        timeline: "1-2 tygodni",
      },
      {
        id: "website-business",
        name: "Strona biznesowa",
        price: "od 3500 zł",
        description: "Kompleksowa strona firmowa z systemem zarządzania",
        features: [
          "Wszystko z pakietu Landing Page",
          "Do 10 podstron (o firmie, usługi, portfolio, blog)",
          "Panel CMS do zarządzania treścią",
          "Blog z systemem kategorii i tagów",
          "Galeria zdjęć i portfolio",
          "Mapa Google i informacje kontaktowe",
          "Zaawansowane SEO (sitemap, schema.org)",
          "Backup automatyczny",
          "Wsparcie 6 miesięcy",
        ],
        timeline: "3-4 tygodni",
        highlighted: true,
      },
      {
        id: "website-premium",
        name: "Portal biznesowy",
        price: "od 6500 zł",
        description: "Zaawansowany portal z dodatkowymi funkcjami",
        features: [
          "Wszystko z pakietu Biznesowego",
          "Nieograniczona liczba podstron",
          "Zaawansowany CMS z rolami użytkowników",
          "System rezerwacji/zapisów online",
          "Integracja z systemami zewnętrznymi",
          "Wielojęzyczność (2 języki)",
          "Newsletter i automatyzacja email",
          "Zaawansowana analityka",
          "Wsparcie 12 miesięcy",
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
          "Pełny audyt techniczny strony",
          "Analiza wydajności i SEO",
          "Raport z listą problemów",
          "Naprawki krytycznych błędów",
          "Optymalizacja obrazów",
          "Podstawowa poprawa SEO",
          "Test responsywności",
        ],
        timeline: "1 tydzień",
      },
      {
        id: "optimization-full",
        name: "Pełna optymalizacja",
        price: "od 2200 zł",
        description: "Kompleksowa modernizacja istniejącej strony",
        features: [
          "Wszystko z pakietu Audyt",
          "Migracja na nowoczesne technologie",
          "Drastyczna poprawa wydajności (3x szybciej)",
          "Kompletna optymalizacja SEO",
          "Responsywność na wszystkich urządzeniach",
          "Zabezpieczenia i backup",
          "Setup Google Analytics 4",
          "Dokumentacja zmian",
        ],
        timeline: "2-3 tygodni",
        highlighted: true,
      },
      {
        id: "optimization-migration",
        name: "Migracja + Redesign",
        price: "od 4500 zł",
        description: "Kompletna modernizacja z nowym designem",
        features: [
          "Wszystko z pakietu Pełnej optymalizacji",
          "Nowy, nowoczesny design",
          "Migracja treści bez straty SEO",
          "Nowa architektura informacyjna",
          "UX/UI zgodne z najnowszymi trendami",
          "A/B testing nowej wersji",
          "Szkolenie zespołu",
          "Wsparcie 6 miesięcy",
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
        price: "od 1800 zł",
        description: "Inteligentny asystent na Twoją stronę",
        features: [
          "Chatbot AI dostępny 24/7",
          "Integracja z ChatGPT/Claude",
          "Personalizacja dla Twojej branży",
          "Automatyczne odpowiedzi na FAQ",
          "Przekierowanie do formularza kontaktowego",
          "Panel statystyk rozmów",
          "Konfiguracja i szkolenie",
        ],
        timeline: "2-3 tygodni",
      },
      {
        id: "ai-automation",
        name: "Automatyzacja procesów",
        price: "od 3500 zł",
        description: "AI w służbie Twojego biznesu",
        features: [
          "Wszystko z pakietu Chatbot",
          "Automatyzacja obsługi email",
          "AI-powered analiza klientów",
          "Integracja z CRM/systemami",
          "Automatyczne generowanie raportów",
          "Personalizacja treści dla użytkowników",
          "Custom AI dla specyficznych zadań",
          "Szkolenia zespołu",
        ],
        timeline: "4-6 tygodni",
        highlighted: true,
      },
      {
        id: "ai-enterprise",
        name: "Rozwiązania Enterprise",
        price: "od 8000 zł",
        description: "Zaawansowana automatyzacja na miarę korporacji",
        features: [
          "Wszystko z pakietu Automatyzacji",
          "Custom AI models dla Twojej firmy",
          "Integracja z wieloma systemami",
          "Zaawansowana analiza danych",
          "Predykcje i prognozy biznesowe",
          "AI-driven insights i rekomendacje",
          "Dedykowany AI specialist",
          "Wsparcie i rozwój przez 12 miesięcy",
        ],
        timeline: "6-10 tygodni",
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
          "ALBO projekt plakatu A3",
          "ALBO projekt wizytówki dwustronnej",
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
          "Nakładanie tekstur na obiekty 3D",
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
          "Miesięczny budżet na rozwój",
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
    href: "https://patrykkul.github.io/korepetycje/",
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
      "Tworzymy strategię projektu, architekturę informacyjną oraz plan działania. Ustalamy harmonogram i kamienie milowe.",
  },
  {
    id: "3",
    title: "Projektowanie",
    description:
      "Projektujemy unikalny design dopasowany do Twojej marki. Tworzymy wireframes, makiety i system design.",
  },
  {
    id: "4",
    title: "Programowanie",
    description:
      "Kodujemy stronę używając najnowszych technologii: Next.js, React, TypeScript. Dbamy o wydajność i SEO.",
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
    description:
      "Nowoczesne, responsywne strony internetowe zaprojektowane z myślą o Twoich klientach. Od prostych wizytówek po zaawansowane portale biznesowe.",
    features: [
      "Responsywny design",
      "Optymalizacja SEO",
      "System CMS do zarządzania treścią",
      "Certyfikat SSL i bezpieczeństwo",
      "Next.js / WordPress / Buildery",
      "Wsparcie techniczne",
    ],
    ctaText: "Zgłoś projekt",
    animationDirection: "left",
    highlighted: true,
  },
  {
    id: "optimization",
    title: "Modernizacja strony",
    subtitle: "Ulepsz istniejącą stronę",
    price: "od 800 zł",
    picture: "_resources/usluga-modernizacja.webp",
    description:
      "Masz już stronę, ale nie działa jak powinna? Oferujemy kompleksową optymalizację, migrację na nowoczesne technologie oraz poprawę SEO.",
    features: [
      "Migracja Strony",
      "Optymalizacja",
      "Pozycja w Google",
      "Responsywność mobile, tablet, desktop",
      "Bezpieczeństwo i backup",
      "Audyt techniczny i raport",
    ],
    ctaText: "Wybierz pakiet",
    animationDirection: "right",
  },
  {
    id: "ai-integration",
    title: "Integracja AI",
    subtitle: "Automatyzacja, chatboty, generatory...",
    price: "od 1500 zł",
    picture: "_resources/usluga-ai.webp",
    description:
      "Wdrażamy AI do Twojej strony i aplikacji: chatboty 24/7, generatory treści, inteligentne formularze i personalizacja treści. Zwiększ efektywność, sprzedaż i zadowolenie klientów dzięki nowoczesnym rozwiązaniom AI.",
    features: [
      "Integracja AI przez API",
      "Generatory treści, obrazów i wideo",
      "Inteligentne formularze",
      "Personalizacja treści dla użytkowników",
      "Integracja AI z no-code/builder",
      "Chatboty obsługujące klientów 24/7",
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
    description:
      "Potrzebujesz grafik, logo czy kompleksowej identyfikacji wizualnej? Nasz zespół graficzny stworzy materiały, które wyróżnią Twoją markę.",
    features: [
      "Projektowanie logo",
      "Grafiki na social media",
      "Banery reklamowe i materiały promocyjne",
      "Ikony i ilustracje",
      "Wektory w wysokiej rozdzielczości",
      "Grafiki 2D i modele 3D",
    ],
    ctaText: "Zgłoś projekt",
    animationDirection: "right",
  },
  {
    id: "individual",
    title: "Indywidualny Plan",
    subtitle: "Rozwiązanie szyte na miarę",
    price: "od 2000 zł",
    picture: "_resources/usluga-indywidualna.webp",
    description:
      "Żaden z naszych pakietów nie odpowiada Twoim potrzebom? Stwórzmy coś wyjątkowego razem. Indywidualne podejście do każdego projektu.",
    features: [
      "Bezpłatna konsultacja ",
      "Analiza potrzeb biznesowych",
      "Dedykowane rozwiązanie",
      "Elastyczny zakres prac",
      "Indywidualna wycena projektu",
    ],
    ctaText: "Omów swój pomysł",
    animationDirection: "left",
  },
  {
    id: "email-marketing",
    title: "Integracja Email Marketing",
    subtitle: "MailerLite & Automatyzacja",
    price: "od 800 zł",
    picture: "_resources/usluga-integracja-email-marketing.webp",
    description:
      "Profesjonalna integracja z MailerLite, automatyczne newslettery i kampanie email marketingowe dla zwiększenia konwersji.",
    features: [
      "Integracja z MailerLite",
      "Automatyczne newslettery",
      "Segmentacja kontaktów",
      "Kampanie email marketing",
      "Analytics i raporty",
      "Responsywne szablony email",
    ],
    ctaText: "Rozpocznij kampanię",
    animationDirection: "right",
    highlighted: false,
  },
];