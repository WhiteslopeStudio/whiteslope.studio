# Zasady wydajności — whiteslope.studio

**Cel tego dokumentu:** whiteslope.studio przeszło pełną optymalizację PageSpeed Insights (14.07.2026) — z Wydajności 55/mobile i 80/desktop do **90/mobile i 97/desktop**, przy Accessibility 96, Best Practices 100, SEO 100 na obu trybach. Ten dokument to zbiór konkretnych zasad, żeby kolejne zmiany na stronie (przez zespół albo przez AI) nie cofnęły tego wyniku. Każda zasada niżej wynika z realnego problemu znalezionego w audycie PSI, nie z teorii.

**Wynik bazowy (14.07.2026), do porównywania przyszłych zmian:**

| Kategoria | Mobile | Desktop |
|---|---|---|
| Wydajność | 90 | 97 |
| Ułatwienia dostępu | 96 | 96 |
| Sprawdzone metody | 100 | 100 |
| SEO | 100 | 100 |
| Przeglądanie agentowe | 2/2 | 2/2 |

Jeśli po jakiejś zmianie na stronie Wydajność na mobile spadnie wyraźnie poniżej 85 — coś w niej łamie jedną z zasad poniżej.

---

## 1. Obrazy — zawsze `next/image`, nigdy `<img>`

- Każdy nowy obraz na stronie: komponent `Image` z `next/image`, nie surowy `<img>`.
- **Zawsze ustawiaj `sizes` dopasowane do realnego wyświetlanego rozmiaru**, nie do rozmiaru pliku źródłowego. To jest najczęstszy błąd, jaki znaleźliśmy: logo 916×215px wyświetlane jako 40px wysokości pobierało się w pełnej rozdzielczości, bo `next/image` bez `sizes` zakłada, że obraz zajmie całą szerokość viewportu.
  - Dla obrazów ze stałym `width`/`height`: `sizes` w px, np. `sizes="180px"` dla logo wyświetlanego jako ~170px.
  - Dla obrazów z `fill`: `sizes` obowiązkowe, najlepiej z media query, np. `sizes="(max-width: 1024px) 95vw, 65vw"`.
- Nie wgrywaj źródłowych plików większych niż potrzeba. Jeśli avatar wyświetla się jako 40×40px, źródłowy plik 1230×1238px to czysty odpad (mieliśmy dokładnie taki przypadek — 81,5 KB zeszło do 4 KB po zmniejszeniu do 200×200).
- Kompresując obraz: zawsze zrób kopię oryginału do `_originals-backup/` (ten folder jest w `.vercelignore`, nie trafia na produkcję) zanim nadpiszesz plik w `public/`.

## 2. Wideo — nigdy `autoPlay` bez rozwagi

- Wideo w pierwszym widoku ekranu (Hero): `autoPlay muted loop playsInline` jest OK, ale **musi mieć**: `poster` (statyczny obrazek na czas ładowania), `preload="auto"`, `fetchPriority="high"`. Bez `poster` przeglądarka nie ma czego pokazać jako LCP i będzie czekać na realne dane wideo.
- Wideo poniżej pierwszego ekranu (np. w sekcji dalej na stronie): **nigdy** samo `autoPlay` bez warunku. Ładuj `src` dopiero gdy sekcja zbliża się do widoku, przez `IntersectionObserver` — wzorzec gotowy w `VideoShowcase.tsx`. Bez tego wideo pobiera się natychmiast razem z resztą strony, niezależnie od tego czy użytkownik w ogóle tam doscrolluje.
- Dekoracyjne wideo bez treści audio (czyli 99% przypadków na tej stronie): `aria-hidden="true"`.
- Kompresja wideo (ffmpeg, CRF): **zawsze porównaj rozmiar pliku przed i po**. Dla prawdziwych nagrań (nie screen-recordingów) bardzo niskie CRF (14) może dać WIĘKSZY plik niż oryginał — dobieraj CRF indywidualnie, nie jedną wartość dla wszystkiego.

## 3. Skrypty i osadzenia stron trzecich — zawsze na żądanie, nigdy eager

To był jeden z największych pojedynczych zysków w tej optymalizacji (usunięcie ~980ms blokującego CPU i ~1MB JS z YouTube+GTM+Maps).

- **Analytics/GTM/piksele reklamowe:** nie ładuj ich przy starcie strony, nawet przez `next/script strategy="lazyOnload"` (to i tak odracza tylko pobranie, nie wykonanie). Ładuj dopiero po pierwszej interakcji użytkownika (scroll/mysz/dotyk/klawiatura) z fallbackiem czasowym dla pasywnych czytelników — gotowy wzorzec w `src/components/analytics/GtagLoader.tsx`.
- **Osadzenia (YouTube, Google Maps, dowolny iframe strony trzeciej):** zawsze fasada — statyczna miniatura/placeholder + przycisk, realny `<iframe>` wgrywa się dopiero po kliknięciu. Gotowe wzorce: YouTube w `AboutUsSection.tsx`/`AboutUsMobile.tsx`, Google Maps w `Footer.tsx`/`FooterMobile.tsx`. Nawet `loading="lazy"` na iframe nie wystarczy — Google Maps JS SDK i tak ładował się z tym atrybutem.
- Jeśli dodajesz nową integrację stron trzecich (czat, widget, pixel) — domyślnie zakładaj że wymaga tego samego traktowania, dopóki nie udowodnisz że jest lekka.

## 4. Architektura desktop/mobile — CSS w pierwszym widoku, JS może poczekać reszta

To była najbardziej ryzykowna i najbardziej pouczająca zmiana w całej optymalizacji, więc uważnie:

- **Nigdy nie blokuj całej strony pustym renderem do czasu zamontowania JS** (`if (!isMounted) return <main />`). To zabija FCP i LCP całkowicie — strona dosłownie nic nie maluje dopóki JS się nie wykona, a pod throttlingiem CPU na słabszych telefonach to może być kilka sekund.
- Dla sekcji **w pierwszym widoku ekranu** (Hero i to co jest widoczne bez scrollowania): przełącznik desktop/mobile ma być **czysto CSS-owy**, nie JS-owy:
  ```tsx
  <div className="block md:hidden"><SectionMobile /></div>
  <div className="hidden md:block"><Section /></div>
  ```
  Obie wersje trafiają do HTML od razu (SSR), CSS decyduje którą pokazać. Zero JS potrzebne do pierwszego malowania. Ten wzorzec już od dawna działa w `Footer.tsx`/`FooterMobile.tsx` — sprawdzony.
- **Uwaga na pułapkę:** nie stosuj tego wzorca hurtowo do CAŁEJ strony. Zrobiliśmy to raz dla wszystkich 8 sekcji i wynik się POGORSZYŁ (LCP owszem spadło, ale FCP i TBT wzrosły, bo cały DOM się podwoił i musiał zhydrować naraz — łącznie z dwoma równoległymi `<video autoPlay>` w Hero desktop+mobile jednocześnie). Sekcje **poniżej pierwszego ekranu** nie wpływają na FCP/LCP, więc mogą bezpiecznie zostać przy starym wzorcu JS-owym (`isMobile ? <X/> : <XMobile/>`), pod warunkiem że lokalna blokada montowania dla nich **nie blokuje** reszty strony — patrz `src/app/page.tsx` jako wzorzec.
- Zasada praktyczna: **CSS dual-render tylko dla tego, co użytkownik widzi bez scrollowania. JS-switch wszędzie indziej.**

## 5. Dostępność (Accessibility)

- Każdy przycisk/link zawierający tylko ikonę (bez widocznego tekstu) musi mieć `aria-label` opisujący jego działanie po polsku, np. `aria-label="Zamknij menu"`.
- Element z `aria-label`, który nie jest naturalnie "etykietowalny" (np. `<div>` udający wskaźnik ocen/gwiazdek) potrzebuje też odpowiedniej roli, np. `role="img"` — inaczej Lighthouse/axe-core zgłasza to jako "niedozwolony atrybut ARIA".
- Kontrast tekstu: domyślne jasne odcienie Tailwind (`zinc-400`/`zinc-500`, `gray-500`) na jasnych tłach (`bg-white`, `bg-zinc-100`) często NIE przechodzą progu AA (4,5:1) dla drobnego tekstu. Używaj `zinc-600`/`gray-700` jako bezpiecznego minimum dla tekstu pomocniczego na jasnym tle; na ciemnym tle (`bg-[#050505]`) używaj `zinc-400` zamiast `zinc-500`.
- Dekoracyjne obrazy/wideo bez informacyjnej treści: `aria-hidden="true"`.

## 6. JavaScript

- `package.json` ma ustawiony `browserslist` celujący w nowoczesne przeglądarki (Chrome/Edge 91+, Firefox 90+, Safari 15.4+). Nie usuwaj tego — bez niego Next.js dokłada polyfille (`Array.prototype.flat`, `Object.hasOwn` itd.), których praktycznie nikt już nie potrzebuje.
- Ciężkie biblioteki animacji (gsap, locomotive-scroll, lottie, ogl) — **jeśli dodajesz nowe użycie, rozważ `next/dynamic`** zamiast statycznego importu, szczególnie jeśli animacja nie jest potrzebna od razu przy starcie strony. To pozostaje jedyny większy nierozwiązany temat z tej optymalizacji (~54 KiB nieużywanego JS konsekwentnie w każdym audycie) — nie krytyczne przy obecnym wyniku 90/97, ale warto pamiętać przy nowym kodzie.

## 7. Proces przy każdej większej zmianie

1. **Testuj oba tryby, zawsze.** Desktop i mobile w PSI potrafią reagować przeciwnie na tę samą zmianę (widzieliśmy to wprost przy Fazie 2 — ten sam commit poprawił jedną metrykę i pogorszył inną). Nie ufaj jednemu audytowi.
2. **Patrz na cały rozkład metryk (FCP/LCP/TBT/CLS/SI), nie tylko na wynik końcowy.** Wynik końcowy to średnia ważona — łatwo przeoczyć że coś się pogorszyło, jeśli coś innego akurat to zamaskowało.
3. Przy kompresji mediów: **zawsze zachowuj oryginał** w `_originals-backup/` przed nadpisaniem.
4. Przy zmianach w `src/app/page.tsx` lub architekturze renderowania: buduj lokalnie (`npm run build`, nie tylko `dev`) i sprawdzaj konsolę przeglądarki pod kątem błędów hydracji przed pushem.
5. Commituj małymi, opisowymi krokami — każda zmiana z tej optymalizacji miała swój commit z uzasadnieniem, co ułatwia cofnięcie pojedynczej rzeczy, jeśli coś okaże się problemem.

---

## Otwarte tematy (świadomie nieruszone, niski priorytet przy obecnym wyniku)

- **Kontrast znaku wodnego "WHITESLOPE"** w stopce (`text-white/2`/`/5`) — świadomie bardzo blady jako element designu, trzyma Accessibility na 96 zamiast 100. Decyzja projektowa, nie techniczna.
- **Nagłówki bezpieczeństwa** (CSP, HSTS, COOP, X-Frame-Options, Trusted Types) — nie wpływają na wynik PSI (Best Practices już 100/100 bez nich), ale to realna luka bezpieczeństwa, wartościowa do zrobienia niezależnie od wyniku audytu.
- **Source maps produkcyjne** (`productionBrowserSourceMaps: true`) — czysto ułatwienie debugowania, zero wpływu na wynik.
- **Code-splitting bibliotek animacji** (punkt 6 wyżej) — ~54 KiB nieużywanego JS, nie krytyczne przy obecnym wyniku.
