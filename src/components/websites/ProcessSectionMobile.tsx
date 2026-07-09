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

function AccordionItemMobile({ title, isOpen, onClick, children }: AccordionItemProps) {
  return (
    <div className="border-b border-black/10">
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between py-5 text-left transition-colors active:text-zinc-600 group"
      >
        <h3 className="text-[18px] font-bold text-zinc-950 pr-4 leading-[1.2]">{title}</h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-zinc-400 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-blue-600' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 pb-5' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-4 text-zinc-600 leading-relaxed text-[15px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessSectionMobile() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative bg-white py-12 px-6 border-t border-zinc-100">
      <div className="w-full mx-auto flex flex-col gap-10">
        
        {/* --- GÓRA: Wstęp i wideo --- */}
        <div className="flex flex-col gap-6">
          <h2 className="text-[28px] font-bold text-zinc-950 tracking-tight leading-[1.1]">
            Materiały potrzebne do współpracy i wskazówki na początek
          </h2>

          <div className="space-y-4 text-[15px] text-zinc-600 leading-relaxed">
            <p>
              Tworzymy <strong>indywidualne projekty stron internetowych</strong> dla firm, które chcą wyglądać profesjonalnie i skutecznie pozyskiwać klientów.
              Każdy projekt zaczynamy od poznania marki, oferty i grupy docelowej — dzięki temu strona jest nie tylko estetyczna, ale też <em>realnie wspiera sprzedaż</em>.
            </p>
            <p>
              Przygotowujemy treści i strukturę strony tak, żeby Twoją firmę było łatwiej znaleźć w Google na zapytania związane z Białymstokiem i okolicą.
            </p>
          </div>

          {/* WIDEO */}
          <div className="mt-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 shadow-sm">
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
        </div>

        {/* --- ŚRODEK: HARMONIJKA (ACCORDION) --- */}
        <div className="border-t border-black/10">
          <AccordionItemMobile
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
              <Link href="/pricing/graphics" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">projektowanie graficzne i identyfikacji wizualnej</Link>{' '}
              oraz{' '}
              <Link href="/pricing/video-marketing" className="font-semibold text-blue-600 hover:text-blue-700 underline underline-offset-4">profesjonalnego video marketingu dla firm</Link>.
            </p>
            <p>
              W praktyce doradzamy, jakie treści przygotować najpierw, co można uprościć i jak poukładać komunikację,
              aby strona była estetyczna, czytelna i gotowa do pozyskiwania zapytań.
            </p>
          </AccordionItemMobile>

          <AccordionItemMobile
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
              szczególnie w lokalnych wynikach wyszukiwania.
            </p>
          </AccordionItemMobile>

          <AccordionItemMobile
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
          </AccordionItemMobile>
          
          <AccordionItemMobile
              title="Jak wygląda proces tworzenia strony krok po kroku?"
              isOpen={openIndex === 3}
              onClick={() => handleToggle(3)}
          >
            <div className="space-y-4 pt-1">
              <p className="leading-relaxed">
                Zależy nam na pełnej przejrzystości, dlatego współpracę podzieliliśmy na sprawdzone etapy:
              </p>
              <ul className="space-y-4 pl-1">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">1.</span>
                  <span>
                    <strong>Kontakt i poznanie potrzeb:</strong> Najlepiej zacząć od wypełnienia <em>briefu</em> lub podesłania wiadomości. Umawiamy się na spotkanie online, aby dokładnie omówić projekt.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">2.</span>
                  <span>
                    <strong>Wycena i start prac:</strong> Dopiero po pełnym zrozumieniu detali przygotowujemy rzetelną wycenę. Po akceptacji zaczynamy tworzyć.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">3.</span>
                  <span>
                    <strong>Transparentna realizacja:</strong> Na bieżąco pokazujemy postępy i w trakcie tworzenia łączymy się na szybkie statusy online.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">4.</span>
                  <span>
                    <strong>Audyt i wdrożenie:</strong> Przed oddaniem projektu, strona przechodzi dokładny audyt techniczny. Oddajemy stronę w ręce użytkowników.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">5.</span>
                  <span>
                    <strong>Dalsze wsparcie (opcja):</strong> W ramach opcji możemy zająć się rozwojem i optymalizacją strony po starcie.
                  </span>
                </li>
              </ul>
            </div>
          </AccordionItemMobile>

          <AccordionItemMobile
              title="Edytor stron czy dedykowany kod – co wybrać?"
              isOpen={openIndex === 4}
              onClick={() => handleToggle(4)}
          >
            <div className="space-y-4 pt-1">
              <p className="leading-relaxed">
                Wybór technologii dopasowujemy do Twoich celów:
              </p>
              <ul className="space-y-4 pl-1">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Kreator stron:</strong> Szybkie i łatwe w samodzielnej edycji. Świetne dla standardowych wizytówek.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Dedykowany kod (Nasza specjalność):</strong> Tworzymy strony od podstaw (React, Next.js). Daje to całkowitą elastyczność i unikalne odczucia z użytkowania.
                  </span>
                </li>
              </ul>
            </div>
          </AccordionItemMobile>

          <AccordionItemMobile
              title="Dedykowane aplikacje biznesowe B2B i platformy SaaS"
              isOpen={openIndex === 5}
              onClick={() => handleToggle(5)}
          >
            <div className="space-y-4 pt-1">
              <ul className="space-y-4 pl-1">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Aplikacje biznesowe (CRM/ERP):</strong> Dedykowane systemy do zarządzania firmą i procesami.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-0.5">•</span>
                  <span>
                    <strong>Platformy SaaS:</strong> Ty dostarczasz pomysł, my przekuwamy go w działający produkt gotowy na rynek.
                  </span>
                </li>
              </ul>
              <p className="leading-relaxed border-t border-zinc-200 pt-4 mt-2">
                Wymagają one <strong>kodu pisanego od podstaw</strong>, co gwarantuje bezpieczeństwo i 100% dopasowanie do logiki biznesu.
              </p>
            </div>
          </AccordionItemMobile>

          <AccordionItemMobile
            title="Ile kosztuje utrzymanie strony internetowej?"
            isOpen={openIndex === 6}
            onClick={() => handleToggle(6)}
          >
            <div className="space-y-4 pt-1">
              <p className="leading-relaxed">
                Główne opłaty eksploatacyjne to domena i hosting.
              </p>
              
              {/* Zabezpieczenie scrollowania tabeli na mobile */}
              <div className="overflow-x-auto my-4 border border-zinc-200 rounded-xl bg-zinc-50">
                <table className="w-full text-left min-w-[400px]">
                  <thead className="bg-zinc-100 border-b border-zinc-200 font-medium text-zinc-950 text-[13px]">
                    <tr>
                      <th className="p-3">Element opłaty</th>
                      <th className="p-3">Dedykowany kod</th>
                      <th className="p-3">Kreatory stron</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 text-[13px]">
                    <tr>
                      <td className="p-3 font-medium text-zinc-950">Hosting</td>
                      <td className="p-3 text-zinc-600">Darmowy lub ~100zł/rok</td>
                      <td className="p-3 text-zinc-600">500 – 1200 zł/rok</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-zinc-950">Domena</td>
                      <td className="p-3 text-zinc-600">~100 – 150 zł/rok</td>
                      <td className="p-3 text-zinc-600">~100 – 150 zł/rok</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="p-3 font-medium text-zinc-950">Szacowany koszt</td>
                      <td className="p-3 font-bold text-blue-600">~150 zł</td>
                      <td className="p-3 font-medium text-zinc-500">~600 – 1350 zł</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-relaxed border-t border-zinc-200 pt-4">
                Wybierając <strong>dedykowany kod</strong>, płacisz zazwyczaj tylko za coroczne przedłużenie domeny. Kreatory stron często drastycznie podnoszą ceny po pierwszym roku.
              </p>
            </div>
          </AccordionItemMobile>
        </div>

        {/* --- DÓŁ: Box z blogiem (CTA) --- */}
        <div className="rounded-[16px] bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-500 p-6 shadow-sm">
          <p className="leading-relaxed text-white text-[15px]">
            Jeśli chcesz samodzielnie pogłębić temat strony, SEO i contentu,{' '}
            <Link href="/blog" className="font-semibold text-white underline underline-offset-4 decoration-white/50 hover:decoration-white transition-colors">
              wpadnij na naszego bloga
            </Link>.
            <span className="opacity-90"> Publikujemy tam praktyczne wskazówki ułatwiające decyzje.</span>
          </p>
        </div>

        

      </div>
    </section>
  );
}