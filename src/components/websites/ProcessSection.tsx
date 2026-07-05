'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function AccordionItem({ title, isOpen, onClick, children }: AccordionItemProps) {
  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between py-6 text-left transition-colors hover:text-zinc-600 group"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-zinc-950 pr-4">{title}</h3>
        <ChevronDown
          className={`h-6 w-6 shrink-0 text-zinc-400 transition-transform duration-300 group-hover:text-zinc-600 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 text-zinc-900/85 leading-relaxed text-[17px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Domyślnie otwarta pierwsza zakładka

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white">
        <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12 py-16 md:py-20 relative z-20">        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-10 xl:gap-14">
          <div>
            <h2 className="mt-5 text-[28px] font-bold text-zinc-950 tracking-tight font-instrument-serif">
              Materiały potrzebne do współpracy i wskazówki na początek tworzenia strony internetowej
            </h2>

            <p className="mt-6 text-zinc-900/85 leading-relaxed text-lg">
              Tworzymy <strong>indywidualne projekty stron internetowych</strong> dla firm, które chcą wyglądać profesjonalnie i skutecznie pozyskiwać klientów.
              Każdy projekt zaczynamy od poznania marki, oferty i grupy docelowej — dzięki temu strona jest nie tylko estetyczna, ale też <em>realnie wspiera sprzedaż</em>.
            </p>
            <p className="mt-4 text-zinc-900/85 leading-relaxed">
              Przygotowujemy treści i strukturę strony tak, żeby Twoją firmę było łatwiej znaleźć w Google na zapytania związane z Białymstokiem i okolicą.
            </p>

            {/* --- WIDEO TUTAJ --- */}
            <div className="mt-8 rounded-2xl border border-black/10 bg-zinc-200/50 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
              <div className="aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/_4TJyWuqkUk"
                  title="Wskazówki na początek tworzenia strony"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
            {/* ------------------ */}

            {/* --- CZYSTA HARMONIJKA (ACCORDION) --- */}
            <div className="mt-12 border-t border-black/10">
              <AccordionItem
                title="Projektowanie stron internetowych – jakie materiały są potrzebne?"
                isOpen={openIndex === 0}
                onClick={() => handleToggle(0)}
              >
                <p>
                  Aby nowoczesna strona firmowa skutecznie generowała leady, treści muszą być przemyślane i dopasowane do odbiorcy.
                  Kluczowe jest jasne przedstawienie oferty, przewag i efektów, jakie klient otrzyma po współpracy.
                </p>
                <p>
                  Bardzo ważna jest także struktura strony: <strong>Start / O nas / Oferta / Kontakt</strong>.
                  Taki układ ułatwia poruszanie się po stronie i wspiera SEO od pierwszego dnia.
                </p>
                <p>
                  Potrzebne są też materiały wizualne: zdjęcia, grafiki i wideo, które budują wiarygodność marki i zatrzymują uwagę użytkownika.
                  Jeśli ich nie masz, pomagamy je zaplanować i przygotować — zobacz też naszą ofertę{' '}
                  <Link href="/pricing/graphics" className="font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-4">projektowanie graficzne i identyfikacji wizualnej</Link>{' '}
                  oraz{' '}
                  <Link href="/pricing/video-marketing" className="font-semibold text-blue-700 hover:text-blue-800 underline underline-offset-4">profesjonalnego video marketingu dla firm</Link>.
                </p>
                <p>
                  W praktyce doradzamy, jakie treści przygotować najpierw, co można uprościć i jak poukładać komunikację,
                  aby strona była estetyczna, czytelna i gotowa do pozyskiwania zapytań.
                </p>
              </AccordionItem>

              <AccordionItem
                title="Optymalizacja i pozycjonowanie stron SEO"
                isOpen={openIndex === 1}
                onClick={() => handleToggle(1)}
              >
                <p>
                  Zajmujemy się <strong>standardowym pozycjonowaniem strony</strong> i wdrażamy podstawy SEO już na etapie projektu.
                  Dbamy o strukturę nagłówków, logiczne podstrony, szybkość działania oraz treści dopasowane do intencji użytkowników.
                </p>
                <p>
                  Dzięki temu nowa strona nie tylko wygląda nowocześnie, ale również pracuje na widoczność w Google,
                  szczególnie w lokalnych wynikach wyszukiwania dla Białegostoku i okolic.
                </p>
              </AccordionItem>

              <AccordionItem
                title="Kompleksowe tworzenie stron WWW i aplikacji webowych"
                isOpen={openIndex === 2}
                onClick={() => handleToggle(2)}
              >
                <p>
                  Oprócz samego wykonania strony wspieramy Cię kompleksowo na etapie strategii, treści, wdrożenia i rozwoju.
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    <span>Przygotowanie struktury i komunikacji marki na stronie.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    <span>Copywriting SEO: profesjonalne teksty sprzedażowe zoptymalizowane pod wyszukiwarki.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    <span>Produkcja materiałów <strong>photo i video</strong>, które przyciągają uwagę użytkowników.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    <span>UI/UX Design oraz pełna identyfikacja wizualna marki.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    <span>Integracje techniczne, wsparcie wdrożenia, domena i hosting.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-0.5">•</span>
                    <span>Dalsza optymalizacja i rozwój widoczności strony w Google.</span>
                  </li>
                </ul>
               </AccordionItem>
              
                <AccordionItem
                    title="Jak wygląda proces tworzenia strony krok po kroku?"
                    isOpen={openIndex === 3}
                    onClick={() => handleToggle(3)}
                >
                <div className="space-y-4 pt-2">
                    <p className="leading-relaxed">
                    Zależy nam na pełnej przejrzystości i partnerskiej relacji, dlatego współpracę podzieliliśmy na kilka sprawdzonych etapów:
                    </p>
                    <ul className="space-y-4 pl-1">
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">1.</span>
                        <span>
                        <strong>Kontakt i poznanie potrzeb:</strong> Najlepiej zacząć od wypełnienia <em>briefu</em> (znajdziesz go na dole strony) lub podesłania krótkiej wiadomości, co pozwoli nam wstępnie zarysować projekt. Jeśli jesteś zdecydowany, umawiamy się na spotkanie online, aby dokładnie omówić projekt.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">2.</span>
                        <span>
                        <strong>Wycena i start prac:</strong> Dopiero po spotkaniu online i pełnym zrozumieniu detali przygotowujemy rzetelną wycenę. Ofertę i zakres prac wysyłamy na maila. Po ustaleniu szczegółów i akceptacji, zaczynamy tworzyć.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">3.</span>
                        <span>
                        <strong>Transparentna realizacja:</strong> Cenimy świetną komunikację – niczego nie zgadujemy. Jeśli pojawiają się wątpliwości, po prostu pytamy. Na bieżąco pokazujemy postępy, a w trakcie tworzenia zawsze chętnie łączymy się na <em>szybkie spotkania statusowe online</em>.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">4.</span>
                        <span>
                        <strong>Audyt i wdrożenie:</strong> Przed oddaniem projektu, strona przechodzi dokładny audyt techniczny (raport przesyłamy również Tobie). Jeśli wszystko zgadza się z założeniami i otrzymamy Twoją akceptację – <strong>oddajemy stronę w ręce użytkowników i odpalamy ją w sieci</strong>.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">5.</span>
                        <span>
                        <strong>Dalsze wsparcie (opcja):</strong> Po starcie strony nie zostajesz sam. W ramach dodatkowej opłaty możemy zająć się jej <em>rozwojem, optymalizacją oraz bieżącym monitoringiem</em>, abyś miał pewność, że wszystko działa bez zarzutu.
                        </span>
                    </li>
                    </ul>
                </div>
                </AccordionItem>

               <AccordionItem
                    title="Edytor stron czy dedykowany kod – co wybrać?"
                    isOpen={openIndex === 4}
                    onClick={() => handleToggle(4)}
                >
                <div className="space-y-4 pt-2">
                    <p className="leading-relaxed">
                    Wybór technologii zawsze dopasowujemy do Twoich celów biznesowych i skali projektu. W <strong>Whiteslope Studio</strong> pracujemy w dwóch głównych modelach:
                    </p>
                    <ul className="space-y-4 pl-1">
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span>
                        <strong>Kreator stron (Hostinger):</strong> Jeśli potrzebujesz prostej strony internetowej, zależy Ci na czasie i chcesz mieć bardzo łatwy sposób samodzielnej edycji treści w przyszłości – polecamy tę opcję. To świetne rozwiązanie dla standardowych wizytówek.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span>
                        <strong>Dedykowany kod (Nasza specjalność):</strong> Jeśli zależy Ci, aby odczucia z odwiedzenia strony były w 100% unikalne i perfekcyjnie dopasowane do Twojej marki, tworzymy dedykowane strony internetowe od podstaw, wykorzystując nowoczesne technologie (np. React, Next.js, Tailwind CSS).budujemy projekt od zera. Własne rozwiązania to nasza najmocniejsza strona.
                        </span>
                    </li>
                    </ul>
                    <p className="leading-relaxed border-t border-white/10 pt-4 mt-2">
                    Tworzenie strony w oparciu o <strong>dedykowany kod</strong> daje nam całkowitą elastyczność w dodawaniu nowych funkcjonalności i integracji w przyszłości. Tę ścieżkę wybieramy również domyślnie przy projektowaniu <em>zaawansowanych aplikacji webowych</em> oraz rozwiązań <em>SaaS</em>.
                    </p>
                </div>
                </AccordionItem>

               <AccordionItem
                    title="Dedykowane aplikacje biznesowe B2B i platformy SaaS"
                    isOpen={openIndex === 5}
                    onClick={() => handleToggle(5)}
                >
                <div className="space-y-4 pt-2">
                    <p className="leading-relaxed">
                    Zatrzymajmy się na chwilę przy bardziej złożonych projektach. Jeśli standardowa wizytówka to za mało, projektujemy od zera zaawansowane narzędzia, które cyfryzują biznes.
                    </p>
                    <ul className="space-y-4 pl-1">
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span>
                        <strong>Aplikacje biznesowe i panele (CRM/ERP):</strong> Tworzymy dedykowane systemy do zarządzania firmą, obsługi klientów, systemy rezerwacji, platformy e-learningowe i wiele więcej. Pomagamy zaprowadzić cyfrowy porządek w Twoich procesach.
                        </span>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">•</span>
                        <span>
                        <strong>Platformy SaaS (Software as a Service):</strong> Chcesz stworzyć aplikację, która będzie generować zysk z subskrypcji? Ty dostarczasz pomysł i wizję, a my – jako partner technologiczny – przekuwamy to w działający, gotowy na rynek produkt.
                        </span>
                    </li>
                    </ul>
                    <p className="leading-relaxed border-t border-white/10 pt-4 mt-2">
                    Każdy z tych systemów wymaga <strong>kodu pisanego od podstaw</strong> i indywidualnego podejścia. Dzięki temu masz pewność, że aplikacja będzie bezpieczna, bezawaryjna i w 100% dopasowana do unikalnej logiki Twojego biznesu.
                    </p>
                </div>
                </AccordionItem>

               <AccordionItem
  title="Ile kosztuje utrzymanie strony internetowej po jej starcie?"
  isOpen={openIndex === 6}
  onClick={() => handleToggle(6)}
>
  <div className="space-y-4 pt-2">
    <p className="leading-relaxed">
      Stworzenie profesjonalnej strony WWW lub platformy SaaS to inwestycja jednorazowa, jednak jej funkcjonowanie w sieci wiąże się ze <strong>stałymi kosztami eksploatacyjnymi</strong> – podobnie jak w przypadku regularnych przeglądów samochodu. Główne opłaty to zawsze <em>domena</em> (Twój adres www) oraz <em>hosting</em> (miejsce na serwerze). Ich wysokość zależy od wybranej technologii.
    </p>
    
    <div className="overflow-x-auto my-6 border border-black/10 rounded-xl bg-black/[0.02]">
      <table className="w-full text-left">
        <thead className="bg-black/[0.04] border-b border-black/10 font-medium text-black">
          <tr>
            <th className="p-4">Element opłaty</th>
            <th className="p-4">Dedykowany kod (Nasz standard)</th>
            <th className="p-4">Kreatory stron (np. Hostinger)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 divide-black/5">
          <tr>
            <td className="p-4 font-medium text-black">Hosting (Serwer)</td>
            <td className="p-4 text-black/80">Najczęściej darmowy lub ok. 100zł / </td>
            <td className="p-4 text-black/80">Ok. 500 – 1200 zł / rok</td>
          </tr>
          <tr>
            <td className="p-4 font-medium text-black">Domena (Adres)</td>
            <td className="p-4 text-black/80">~100 – 150 zł / rok</td>
            <td className="p-4 text-black/80">~100 – 150 zł / rok</td>
          </tr>
          <tr className="bg-white/[0.03]">
            <td className="p-4 font-medium text-black">Szacowany koszt roczny</td>
            <td className="p-4 font-medium text-blue-500">~150 zł</td>
            <td className="p-4 font-medium text-black/60">~600 – 1350 zł</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p className="leading-relaxed border-t border-black/10 pt-4">
      Wybierając <strong>dedykowany kod</strong>, niwelujemy koszty stałe. Lekki, autorski kod pozwala nam optymalizować środowisko i wykorzystywać darmowe, niezawodne serwery. W efekcie płacisz <em>tylko za coroczne przedłużenie domeny</em>.
    </p>

    <p className="leading-relaxed">
      Z kolei w przypadku kreatorów stron (platformy abonamentowe), musisz liczyć się z tym, że po tanim okresie startowym, ceny odnowień serwerów <strong>szybują w górę</strong>.
    </p>

    <p className="leading-relaxed">
      Dla firm, które chcą w pełni oddelegować kwestie techniczne, oferujemy również <strong>płatne pakiety opieki</strong>. Oferujemy <em>bieżące wsparcie</em>, aby strona zawsze działała stabilnie i bez przerw.
    </p>
  </div>
</AccordionItem>

               
                
            </div>
            {/* ------------------------------------- */}

            <div className="mt-10 rounded-[12px] bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 px-6 py-6 md:px-7 md:py-7 ">
              <p className="leading-relaxed text-white font-medium">
                Jeśli chcesz samodzielnie pogłębić temat strony, SEO i contentu,{' '}
                <Link href="/blog" className="font-semibold text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors">
                  wpadnij na naszego bloga
                </Link>.
                <span className="opacity-90 font-normal"> Publikujemy tam praktyczne wskazówki, które pomagają szybciej podjąć dobre decyzje projektowe.</span>
              </p>
            </div>
          </div>

        <aside className="hidden lg:block relative mt-10 lg:mt-0 h-full">
            <div className="sticky top-36">
              <div className="rounded-2xl border border-black/10 bg-zinc-50 p-5 shadow-[0_10px_26px_rgba(0,0,0,0.08)] backdrop-blur-sm">
                <h4 className="mt-2 text-lg font-semibold text-zinc-950 leading-snug">
                  Przy okazji pomożemy w:
                </h4>
                <div className="mt-4 space-y-2">
                  <Link href="/pricing/ai-integration" className="block rounded-xl bg-zinc-200 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors border border-black/5">
                    Integracjach AI
                  </Link>
                  <Link href="/pricing/graphics" className="block rounded-xl bg-zinc-200 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors border border-black/5">
                    Grafice i identyfikacji
                  </Link>
                  <Link href="/pricing/video-marketing" className="block rounded-xl bg-zinc-200 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors border border-black/5">
                    Video marketingu
                  </Link>
                  <Link href="/pricing/optimization" className="block rounded-xl bg-zinc-200 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors border border-black/5">
                    SEO i optymalizacji
                  </Link>
                  <Link 
                    href="/blog" 
                    className="block rounded-xl bg-zinc-200 px-4 py-2.5 text-zinc-900 hover:border-blue-300 hover:text-blue-700 transition-colors border border-black/5"
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