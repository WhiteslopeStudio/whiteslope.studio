import Link from 'next/link';

export default function ProcessSection() {
  return (
    <section className="relative bg-white border-b border-black/10">
      <div className="container mx-auto px-6 py-16 md:py-20 relative z-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 xl:gap-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-zinc-800 uppercase shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-sm">
              Materiały startowe
            </div>

            <h2 className="mt-5 text-3xl md:text-4xl font-semibold text-zinc-950 tracking-tight">
              Materiały potrzebne do współpracy i wskazówki na początek tworzenia strony internetowej
            </h2>

            <p className="mt-6 text-zinc-900/85 leading-relaxed text-lg">
              Tworzymy <strong>indywidualne projekty stron internetowych</strong> dla firm, które chcą wyglądać profesjonalnie i skutecznie pozyskiwać klientów.
              Każdy projekt zaczynamy od poznania marki, oferty i grupy docelowej — dzięki temu strona jest nie tylko estetyczna, ale też <em>realnie wspiera sprzedaż</em>.
            </p>
            <p className="mt-4 text-zinc-900/85 leading-relaxed">
              Przygotowujemy treści i strukturę strony tak, żeby Twoją firmę było łatwiej znaleźć w Google
              na zapytania związane z Białymstokiem i okolicą.
            </p>

            <div className="mt-10 space-y-5">
              <details open className="group rounded-2xl border border-black/10 bg-zinc-50 p-6 md:p-8 shadow-[0_10px_26px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <summary className="list-none cursor-pointer">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-700">Pytanie 01</p>
                    <span className="text-zinc-600 text-sm group-open:hidden">Rozwiń</span>
                    <span className="text-zinc-600 text-sm hidden group-open:inline">Zwiń</span>
                  </div>
                  {/* <div className="mt-4 rounded-xl border border-black/10 bg-zinc-200/70 p-2 shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                    <iframe
                      className="w-full h-[320px] md:h-[380px] rounded-lg"
                      src="https://www.youtube-nocookie.com/embed/nGAbHUE1eyI"
                      title="FAQ video 1"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div> */}
                  <h3 className="mt-3 text-2xl font-semibold text-zinc-950">Jakie treści są potrzebne, aby stworzyć stronę www?</h3>
                </summary>
                <div className="mt-4">
                  <p className="text-zinc-900/85 leading-relaxed">
                    Aby strona internetowa była skuteczna, treści muszą być przemyślane i dopasowane do odbiorcy.
                    Kluczowe jest jasne przedstawienie oferty, przewag i efektów, jakie klient otrzyma po współpracy.
                  </p>
                  <p className="mt-3 text-zinc-900/85 leading-relaxed">
                    Bardzo ważna jest także struktura strony: <strong>Start / O nas / Oferta / Kontakt</strong>.
                    Taki układ ułatwia poruszanie się po stronie i wspiera SEO od pierwszego dnia.
                  </p>
                  <p className="mt-3 text-zinc-900/85 leading-relaxed">
                    Potrzebne są też materiały wizualne: zdjęcia, grafiki i wideo, które budują wiarygodność marki i zatrzymują uwagę użytkownika.
                    Jeśli ich nie masz, pomagamy je zaplanować i przygotować — zobacz też naszą ofertę
                    {' '}
                    <Link href="/pricing/graphics" className="font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-4">grafiki</Link>
                    {' '}
                    oraz
                    {' '}
                    <Link href="/contact?tab=quote&service=video" className="font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-4">video marketingu</Link>.
                  </p>
                  <p className="mt-3 text-zinc-900/85 leading-relaxed">
                    W praktyce doradzamy, jakie treści przygotować najpierw, co można uprościć i jak poukładać komunikację,
                    aby strona była estetyczna, czytelna i gotowa do pozyskiwania zapytań.
                  </p>
                </div>
              </details>

              <details className="group rounded-2xl border border-black/10 bg-zinc-50 p-6 md:p-8 shadow-[0_10px_26px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <summary className="list-none cursor-pointer">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-700">Pytanie 02</p>
                    <span className="text-zinc-600 text-sm group-open:hidden">Rozwiń</span>
                    <span className="text-zinc-600 text-sm hidden group-open:inline">Zwiń</span>
                  </div>
                  {/* <div className="mt-4 rounded-xl border border-black/10 bg-zinc-200/70 p-2 shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                    <iframe
                      className="w-full h-[320px] md:h-[380px] rounded-lg"
                      src="https://www.youtube-nocookie.com/embed/nGAbHUE1eyI"
                      title="FAQ video 2"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div> */}
                  <h3 className="mt-3 text-2xl font-semibold text-zinc-950">Co z pozycjonowaniem nowej strony internetowej?</h3>
                </summary>
                <div className="mt-4">
                  <p className="text-zinc-900/85 leading-relaxed">
                    Zajmujemy się <strong>standardowym pozycjonowaniem strony</strong> i wdrażamy podstawy SEO już na etapie projektu.
                    Dbamy o strukturę nagłówków, logiczne podstrony, szybkość działania oraz treści dopasowane do intencji użytkowników.
                  </p>
                  <p className="mt-3 text-zinc-900/85 leading-relaxed">
                    Dzięki temu nowa strona nie tylko wygląda nowocześnie, ale również pracuje na widoczność w Google,
                    szczególnie w lokalnych wynikach wyszukiwania dla Białegostoku i okolic.
                  </p>
                </div>
              </details>

              <details className="group rounded-2xl border border-black/10 bg-zinc-50 p-6 md:p-8 shadow-[0_10px_26px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <summary className="list-none cursor-pointer">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-[0.18em] font-semibold text-blue-700">Pytanie 03</p>
                    <span className="text-zinc-600 text-sm group-open:hidden">Rozwiń</span>
                    <span className="text-zinc-600 text-sm hidden group-open:inline">Zwiń</span>
                  </div>
                  {/* <div className="mt-4 rounded-xl border border-black/10 bg-zinc-200/70 p-2 shadow-[0_6px_18px_rgba(0,0,0,0.08)]">
                    <iframe
                      className="w-full h-[320px] md:h-[380px] rounded-lg"
                      src="https://www.youtube-nocookie.com/embed/nGAbHUE1eyI"
                      title="FAQ video 3"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div> */}
                  <h3 className="mt-3 text-2xl font-semibold text-zinc-950">W czym możemy pomóc przy budowaniu strony?</h3>
                </summary>
                <div className="mt-4">
                  <p className="text-zinc-900/85 leading-relaxed">
                    Oprócz samego wykonania strony wspieramy Cię kompleksowo na etapie strategii, treści, wdrożenia i rozwoju.
                  </p>
                  <div className="mt-4 space-y-2 text-zinc-900/85 leading-relaxed">
                    <p><span className="font-semibold text-blue-700">*</span> Przygotowanie struktury i komunikacji marki na stronie.</p>
                    <p><span className="font-semibold text-blue-700">*</span> Tworzenie contentu: teksty sprzedażowe i SEO.</p>
                    <p><span className="font-semibold text-blue-700">*</span> Produkcja materiałów <strong>photo i video</strong>, które przyciągają uwagę użytkowników.</p>
                    <p><span className="font-semibold text-blue-700">*</span> Grafika i identyfikacja wizualna dopasowana do marki.</p>
                    <p><span className="font-semibold text-blue-700">*</span> Integracje techniczne, wsparcie wdrożenia, domena i hosting.</p>
                    <p><span className="font-semibold text-blue-700">*</span> Dalsza optymalizacja i rozwój widoczności strony w Google.</p>
                  </div>
                </div>
              </details>
            </div>

            <div className="mt-10 rounded-2xl border border-black/10 bg-zinc-50 p-6 md:p-7 shadow-[0_10px_26px_rgba(0,0,0,0.08)] backdrop-blur-sm">
              <p className="text-zinc-900/90 leading-relaxed">
                Jeśli chcesz samodzielnie pogłębić temat strony, SEO i contentu,
                {' '}
                <Link href="/blog" className="font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-4">wpadnij na naszego bloga</Link>.
                Publikujemy tam praktyczne wskazówki, które pomagają szybciej podjąć dobre decyzje projektowe.
              </p>
            </div>
          </div>

          <aside className="hidden lg:block relative lg:-mr-6 xl:-mr-16 mt-10 lg:mt-0">
            <div className="sticky top-36">
              <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5 shadow-[0_10px_26px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-700 font-semibold">Sprawdź też</p>
                <h4 className="mt-2 text-lg font-semibold text-zinc-950 leading-snug">
                  Przy okazji pomożemy w:
                </h4>
                <div className="mt-4 space-y-2">
                  <Link href="/pricing/ai-integration" className="block rounded-xl border border-black/10 bg-zinc-100 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors">
                    Integracjach AI
                  </Link>
                  <Link href="/pricing/graphics" className="block rounded-xl border border-black/10 bg-zinc-100 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors">
                    Grafice i identyfikacji
                  </Link>
                  <Link href="/contact?tab=quote&service=video" className="block rounded-xl border border-black/10 bg-zinc-100 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors">
                    Video marketingu
                  </Link>
                  <Link href="/pricing/optimization" className="block rounded-xl border border-black/10 bg-zinc-100 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors">
                    SEO i optymalizacji
                  </Link>
                  <Link 
                    href="/blog" 
                    className="block rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-zinc-500 hover:border-zinc-400 hover:text-zinc-800 transition-colors text-sm md:text-base"
                  >
                    Zobacz nasze wskazówki na blogu
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
