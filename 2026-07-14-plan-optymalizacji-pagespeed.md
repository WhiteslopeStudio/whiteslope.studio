# Plan optymalizacji wydajności — whiteslope.studio

**Data:** 14.07.2026
**Źródło audytu:** PageSpeed Insights (Lighthouse), test mobilny, https://whiteslope.studio/
**Wyniki wyjściowe:** Wydajność 55 / Ułatwienia dostępu 88 / Sprawdzone metody 77 / SEO 100 / Przeglądanie agentowe 1/2

Uwaga metodologiczna: raport nie zawiera danych CrUX (pole "Brak danych" u góry) — to wyłącznie test laboratoryjny na symulowanym Moto G Power + throttling do wolnego 4G, czyli najostrzejsze możliwe warunki. Realni użytkownicy na szybszym łączu odczują to łagodniej, ale zdiagnozowane problemy poniżej są potwierdzone bezpośrednio w kodzie, nie tylko w raporcie — są realne.

---

## 1. Diagnoza źródłowa (na podstawie przeglądu kodu, nie tylko raportu)

| # | Problem | Gdzie w kodzie | Powiązane audyty PSI |
|---|---|---|---|
| A | Cała strona główna jest `'use client'` i renderuje pusty `<main>` dopóki JS się nie zamontuje (`if (!isMounted) return <main className="bg-black" />`) | `src/app/page.tsx` | FCP 7,1s, LCP 39,6s, "Zestawienie LCP" |
| B | Folder `public/` waży 269 MB — wideo case-studies po 53-60 MB, zdublowane pliki `.mp4` + `.mov` tych samych materiałów, logo `.webp` 5,4 MB | `public/_resources/`, `public/animationHero/` | Ulepsz dostarczanie obrazów (9620 KiB), Unikaj dużych ładunków (16 666 KiB) |
| C | Hero ma autoplay `<video>` 4,7 MB bez `poster`, bez lazy loadingu, ładowany natychmiast | `src/components/sections/HeroSection.tsx` | LCP, network dependency tree |
| D | 49 miejsc w kodzie używa zwykłego `<img>` zamiast `next/image` (tylko 7 plików korzysta z optymalizacji Next.js) — brak kompresji, brak responsywnych rozmiarów, część bez `width`/`height` | cały `src/` | Ulepsz dostarczanie obrazów, "elementy graficzne bez width/height" |
| E | Wersje desktop i mobile każdej sekcji są importowane statycznie i przełączane w JS po stronie klienta (`isMobile ? <X /> : <XMobile />`) — użytkownik pobiera podwójny kod niezależnie od urządzenia | `src/app/page.tsx` i sekcje | Nieużywany JS (654 KiB), długie zadania w wątku głównym (8) |
| F | Pięć ciężkich bibliotek animacji ładowanych globalnie: framer-motion, gsap, locomotive-scroll, lottie-web, ogl (WebGL) | `package.json`, importy w komponentach | Nieużywany JS/CSS, TBT 190ms |
| G | Brak nagłówków bezpieczeństwa (CSP, HSTS, COOP, X-Frame-Options, Trusted Types) | `next.config.ts`, `middleware.ts` | Sekcja "Zaufanie i bezpieczeństwo" (Sprawdzone metody 77) |
| H | Przyciski bez `aria-label`, niedozwolone atrybuty ARIA, niewystarczający kontrast, `<video>` bez ścieżki napisów | różne komponenty (34 pliki z `aria-`, 227 wystąpień `<button`) | Ułatwienia dostępu 88, Przeglądanie agentowe 1/2 (drzewo dostępności) |
| I | Repozytorium: `.git` waży 341 MB (duże wideo są trackowane), różnice końca linii (CRLF/LF) powodują szum w diffach całych plików | cały projekt | ryzyko operacyjne przy wdrażaniu, nie audyt PSI |

---

## 2. Plan wdrożenia — fazy

Każda faza = osobne, małe commity, z re-testem PageSpeed po zakończeniu fazy przed przejściem dalej. Żadne usuwanie plików bez wcześniejszego pytania o zgodę z uzasadnieniem.

### Faza 0 — przygotowanie bezpiecznego workflow (przed jakąkolwiek zmianą)
- Dodać `.gitattributes` (`* text=auto eol=lf`), żeby diffy przestały pokazywać cały plik jako zmieniony przy każdej edycji.
- Sprawdzić, czy duże pliki wideo są już zacommitowane (**tak, zweryfikowane** — `git ls-files` pokazuje wszystkie `.mp4`/`.mov` jako trackowane, więc są odzyskiwalne z historii nawet po usunięciu).
- Pracować na osobnej gałęzi (`perf/optimization`), commitować małymi krokami per faza.
- Ryzyko: brak.

### Faza 1 — media (największy zysk, najmniejsze ryzyko)
- Przekodować/skompresować wideo do rozsądnego bitrate'u i rozdzielczości (hero: cel <1,5-2 MB zamiast 4,7 MB, bez widocznej utraty jakości przy typowym oglądaniu na telefonie).
- Usunąć zdublowane pliki `.mov` z `/public` (te same materiały co `.mp4`) — **wymaga Twojej zgody per plik**, ale są bezpieczne do usunięcia bo są w historii gita.
- Zmniejszyć logo z 5,4 MB do rzędu 100-200 KB.
- Zamienić wszystkie 49 wystąpień `<img>` na `next/image` — automatyczna kompresja, lazy loading, responsywne rozmiary, uzupełnienie `width`/`height`.
- Dodać `poster` do `<video>` w Hero.
- Adresuje: image delivery (9620 KiB), duże ładunki sieciowe (16 666 KiB), brakujące width/height, częściowo LCP.
- Ryzyko: niskie — mechaniczna zmiana, ale wymaga wizualnej weryfikacji (screenshoty przed/po), żeby jakość wideo/obrazów nie spadła zauważalnie.

### Faza 2 — sposób renderowania strony głównej
- Usunąć blokadę "pusty div dopóki JS się nie zamontuje" — treść ma być widoczna od razu (server-rendered), animacje i interaktywność dochodzą progresywnie.
- Zamienić przełącznik `isMobile` w JS na CSS/Tailwind (`hidden md:block` itp.) albo `next/dynamic` z code-splittingiem, żeby nie wysyłać podwójnego kodu desktop+mobile do każdego użytkownika.
- Adresuje: FCP (7,1s), LCP (39,6s), część nieużywanego JS, prośby o zablokowanie renderowania.
- Ryzyko: **średnie** — to zmiana architektury renderowania (client → częściowo server), wymaga uważnego testowania hydratacji (błędy "HTML didn't match" — kod już ma wokół tego historyczny hack, trzeba go świadomie zastąpić, nie tylko usunąć). Będę robił to przyrostowo sekcja po sekcji, z buildem i wizualnym sprawdzeniem po każdej.

### Faza 3 — dieta JS
- Dynamiczny import (`next/dynamic`) cięższych bibliotek (gsap, locomotive-scroll, lottie, ogl) tam, gdzie nie są potrzebne natychmiast / są poniżej fold.
- Sprawdzić nakładanie się locomotive-scroll z framer-motion/gsap (możliwe, że robią to samo — do potwierdzenia w kodzie przed decyzją o usunięciu jednej z nich).
- Adresuje: nieużywany JS (654 KiB), nieużywany CSS (107 KiB), długie zadania w wątku głównym, wymuszone przeformatowanie.
- Ryzyko: średnie — trzeba sprawdzić czy animacje nadal działają identycznie po leniwym ładowaniu.

### Faza 4 — Best Practices i Accessibility (szybkie, wysoka pewność 90+)
- Nagłówki bezpieczeństwa (CSP, HSTS, COOP, X-Frame-Options) przez `headers()` w `next.config.ts`.
- `aria-label` na przyciskach ikonowych, poprawki kontrastu wg audytu, usunięcie niedozwolonych atrybutów ARIA.
- `<track kind="captions">` lub oznaczenie dekoracyjnego wideo jako `aria-hidden` (wideo w tle nie niesie treści audio/informacyjnej).
- Włączenie source maps produkcyjnych (`productionBrowserSourceMaps: true`) — czysto konfiguracyjne.
- Sprawdzenie źródła 4 ciasteczek stron trzecich (prawdopodobnie Google Analytics/consent) i ewentualne ładowanie po zgodzie z cookie bannera.
- Adresuje: całą sekcję "Zaufanie i bezpieczeństwo", accessibility (buttons, ARIA, kontrast, captions), pośrednio też "Przeglądanie agentowe" (drzewo dostępności).
- Ryzyko: niskie — głównie config i atrybuty, nie zmienia logiki działania strony.

---

## 3. Weryfikacja — czy plan faktycznie rozwiązuje zdiagnozowane problemy

| Audyt PSI | Adresowany w fazie | Pewność |
|---|---|---|
| FCP 7,1s / LCP 39,6s | Faza 2 (usunięcie blank-shell) + Faza 1 (lżejsze media) | Wysoka co do kierunku, **niepewna dokładna liczba** — zależy od tego ile animacji zostanie na starcie |
| TBT 190ms / długie zadania (8) | Faza 2 + 3 (mniej JS blokującego wątek główny) | Wysoka |
| CLS 0 | Już OK, Faza 1 (width/height) to utrzyma | Wysoka |
| Image delivery 9620 KiB | Faza 1 | Wysoka |
| Duże ładunki sieciowe 16 666 KiB | Faza 1 (media to większość tej wagi) | Wysoka |
| Nieużywany JS 654 KiB / CSS 107 KiB | Faza 2 + 3 | Średnia-wysoka |
| Prośby blokujące renderowanie | Faza 2 | Wysoka |
| Cache headers, legacy JS | Faza 4 (config) | Wysoka |
| Accessibility (buttons, ARIA, kontrast, captions) | Faza 4 | Wysoka |
| Best Practices (CSP/HSTS/COOP/XFO, source maps, cookies) | Faza 4 | Wysoka |
| SEO 100 | Bez zmian — już maksimum | — |
| Przeglądanie agentowe 1/2 | Faza 4 (naprawa drzewa dostępności jako efekt uboczny a11y fixes) | Średnia |

**Czego nie mogę zagwarantować:** dokładnego wyniku liczbowego "90+" dla Wydajności na mobile. To strona z ciężkim wideo w tle i animacjami jako częścią identyfikacji marki — po Fazie 1+2 realistycznie spodziewam się skoku z 55 do ok. 75-90, pełne 90+ zależy dodatkowo od tego, ile z warstwy animacyjnej (Faza 3) uda się przenieść na leniwe ładowanie bez utraty efektu wizualnego. Accessibility i Best Practices — tu 90+ jest realistyczne z wysoką pewnością, bo to głównie config i atrybuty, nie architektura.

---

## 4. Otwarte pytania przed startem
1. Czy strona jest hostowana na Vercel? (wpływa na to, czy nagłówki bezpieczeństwa wystarczy dodać w `next.config.ts`, czy też w konfiguracji hostingu).
2. Czy akceptowalna jest widoczna, ale niewielka utrata jakości wideo w zamian za drastyczny spadek wagi plików?
3. Czy istnieją gdzieś oryginalne, nieskompresowane pliki źródłowe wideo (do lepszego re-eksportu), czy pracujemy na tych z `/public`?
4. Czy mogę pracować na osobnej gałęzi gita i commitować małymi krokami, czy wolisz jeden większy commit na koniec do przejrzenia?

---

## 5. Proces bezpieczeństwa przy wdrażaniu
- Osobna gałąź, małe commity per faza — każdy krok cofalny przez git, bo pliki (w tym duże wideo) są już zacommitowane w historii.
- Żadne usuwanie plików bez wcześniejszego pytania z uzasadnieniem i czekania na potwierdzenie.
- Po każdej fazie: build lokalny + ponowny test PageSpeed + wizualne porównanie przed/po (screenshoty), zanim przejdę do kolejnej fazy.
- Zmiany architektoniczne (Faza 2) robione sekcja po sekcji, nie całą stroną naraz.

---

## 6. Status na 14.07.2026 — co zrobione, wyniki po wdrożeniu, co dalej

### 6.1 Zrobione i już na produkcji

**Faza 0 (workflow):** `.gitattributes`, praca na gałęzi `perf/optimization`, merge do `main`, `_originals-backup/` (poza `public/`, w `.vercelignore`) jako siatka bezpieczeństwa na oryginały.

**Faza 1 (media):**
- `public/` spadł z 269 MB do ok. 99 MB (-63%).
- Hero video: 4,9 MB → 1,35 MB, dodany `poster`.
- Wideo case-studies: 46,2 MB → 15,9 MB (-66%), usunięte zduplikowane `.mov`.
- Wideo marketingowe skompresowane (CRF dobrany indywidualnie per plik).
- ~18 obrazów/logo skompresowanych.
- 13 kluczowych plików na stronie głównej przepięte z `<img>` na `next/image`.

**"Quick winy" z rozwiniętego audytu (Faza 4 częściowo):**
- YouTube embed → fasada (miniatura + klik), realny `<iframe>` dopiero na życzenie.
- Google Analytics/GTM → `next/script strategy="lazyOnload"`.
- 3 przyciski dostały `aria-label`, poprawiony niedozwolony atrybut ARIA, 3 dekoracyjne `<video>` dostały `aria-hidden`.

### 6.2 Wyniki po wdrożeniu — to już nie projekcja, to realny audyt

| Kategoria | Bazowo (mobile) | Po Fazie 1 (regres) | **Teraz — mobile** | **Teraz — desktop** |
|---|---|---|---|---|
| Wydajność | 55 | 48 | **73** | **80** |
| Ułatwienia dostępu | 88 | — | **96** | **88** |
| Sprawdzone metody | 77 | — | **100** | **96** |
| SEO | 100 | — | **100** | **100** |
| Przeglądanie agentowe | 1/2 | — | **2/2** | 1/2 |

Konkretnie na mobile: FCP spadł z 7,1s do **1,6s**, LCP z 39,6s do **6,8s**, TBT z okolic 190-400ms do **120ms**, CLS **0**. To jest duży, potwierdzony skok — nie szacunek. Ciekawostka: LCP poprawił się mocno mimo że architektury z Fazy 2 (blank-shell w `page.tsx`) w ogóle nie ruszaliśmy — więc ten problem był mniej krytyczny niż pierwotnie się wydawał na starym, najgorszym-przypadku audycie; realny hamulec siedział głównie w ciężkich mediach i eager-loadowanym JS stron trzecich (YouTube, GTM), a nie w samej architekturze renderowania.

### 6.3 Nowe rzeczy, które wypłynęły z tego audytu (nie były wcześniej widoczne)

| # | Problem | Skala | Gdzie |
|---|---|---|---|
| J | **Błąd sieciowy w konsoli:** `WieslawskiStudioFilm.mp4` → `net::ERR_CONNECTION_FAILED` na desktopie | Realny błąd, obniża Sprawdzone metody i UX | prawdopodobnie plik 39 MB trafia na limit Vercela dla plików statycznych/edge — do zbadania osobno, priorytet wysoki |
| K | Logo i zdjęcia zespołu ładowane w pełnej rozdzielczości mimo małego wyświetlania (np. zdjęcie Mateusza 1230×1238 wyświetlane jako 38×38 — 79,6 KiB zmarnowane na jednym obrazku) | 366-384 KiB do odzyskania | brakujący/zbyt szeroki `sizes` w wielu `next/image` (Header, LogoTicker, AboutUs, footer) |
| L | Google Maps (widget) ładuje ~223 KiB nieużywanego JS | Podobne do problemu z YouTube | prawdopodobnie sekcja kontaktowa — kandydat na tę samą "fasadę" co YouTube |
| M | 3 linki do social mediów (Instagram/Facebook/YouTube w nagłówku) i 1 wyłączony przycisk bez nazwy dostępnej dla czytników ekranu | Accessibility desktop 88, Agent browsing 1/2 na desktopie | `Header.tsx`, nawigacja |
| N | Kontrast nadal niewystarczający: tekst FAQ, linki w stopce, lista miast "Obsługujemy miasta", znak wodny "WHITESLOPE" | Accessibility (oba tryby) | jak w punkcie H pierwotnej diagnozy — czeka na Twoją decyzję projektową |

### 6.4 Zostało

| Faza | Co dokładnie | Priorytet |
|---|---|---|
| Nowe (6.3) | Naprawić błąd ładowania wideo (J), dodać `sizes` do przeciążonych obrazów (K), fasada na Google Maps (L), 4 brakujące etykiety ARIA (M) | **Wysoki — to teraz największe realne dźwignie**, każda pojedyncza jest mała i niskiego ryzyka |
| Faza 4 (reszta) | Kontrast (N) — wymaga Twojej decyzji projektowej, zwłaszcza co do znaku wodnego; nagłówki CSP/HSTS/COOP/XFO; source maps produkcyjne | Średni — na Best Practices/Accessibility to już niewielki % do zgarnięcia (mobile BP już 100, A11y 96) |
| Faza 2/3 (architektura, oryginalnie zaplanowane) | Usunięcie blank-shell, code-splitting ciężkich bibliotek animacji | **Obniżony priorytet** — FCP/LCP już się mocno poprawiły bez tego; warto wrócić do tego dopiero jeśli po punktach z 6.3 wydajność mobile utknie poniżej ~85 |
| Poza zakresem | Pozostałe ~35 plików spoza strony głównej z `<img>`, 6 `<img>` w `FastContact.tsx` | Niski |

### 6.5 Realistyczny cel

Mobile Wydajność 73 → realnie **80-88** po naprawieniu punktów z 6.3 (błąd wideo + rozmiary obrazów + fasada Map to razem dobre kilkaset KiB i mniej długich zadań, bez ruszania architektury). Pełne 90+ na mobile nie jest już nierealne, ale będzie zależało od tego, ile jeszcze da się wyciągnąć z LCP wideo w Hero (audyt sam podpowiada: `fetchpriority="high"` i unikanie leniwego ładowania na elemencie LCP).

Desktop Wydajność 80 → **90+ osiągalne szybko** tymi samymi poprawkami z 6.3, bo tam waga obrazów/JS liczy się proporcjonalnie mocniej niż throttling sieci.

Accessibility: mobile 96 → 100 po 4 etykietach (M) i kontraście (N). Desktop 88 → 96+ tą samą drogą.

Sprawdzone metody: mobile już 100. Desktop 96 → 100 po naprawieniu błędu wideo (J) — to prawdopodobnie jedyna rzecz obniżająca ten wynik.

**Rekomendacja kolejności:** najpierw punkty z 6.3 (małe, szybkie, wysoki zwrot) → nowy audyt → dopiero wtedy decyzja, czy Faza 2/3 (architektura) jest w ogóle jeszcze potrzebna.
