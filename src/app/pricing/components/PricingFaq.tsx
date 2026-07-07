'use client';

import React, { useState } from 'react';

// Tablica z pytaniami i odpowiedziami
const FAQS = [
  {
    question: "Czy podane ceny są kwotami brutto czy netto?",
    answer: "Wszystkie ceny podane w naszym cenniku są kwotami netto. Do każdej usługi należy doliczyć standardowy podatek VAT w wysokości 23%. Na każdą realizację wystawiamy pełną fakturę."
  },
  // {
  //   question: "Jak wygląda proces płatności za stronę internetową?",
  //   answer: "Zazwyczaj rozliczamy się w dwóch wygodnych transzach. Pierwsza (zadatek) opłacana jest przed rozpoczęciem prac projektowych i kodowania, a druga po pełnej akceptacji gotowej strony i wdrożeniu jej na Twój serwer."
  // },
  {
    question: "Czy po stworzeniu strony muszę płacić abonament?",
    answer: "Nie, nie mamy ukrytych kosztów abonamentowych za samo posiadanie strony. Po zakończeniu projektu strona jest w 100% Twoja. Jedyne stałe koszty to opłacenie domeny i hostingu (zazwyczaj raz w roku u zewnętrznego operatora). Oferujemy jednak opcjonalne pakiety opieki technicznej i aktualizacji, jeśli chcesz, byśmy czuwali nad stroną po wdrożeniu."
  },
  {
    question: "Czy pomagacie z tekstami (copywritingiem) na stronę?",
    answer: "Tak, oferujemy kompleksowe wsparcie. Możesz dostarczyć nam własne materiały, ale jeśli ich nie masz, nasi specjaliści przygotują profesjonalne, sprzedażowe i zoptymalizowane pod SEO teksty, które idealnie wpasują się w układ nowej strony."
  },
  {
    question: "Mam bardzo nietypowy projekt. Czy zrobicie go poza cennikiem?",
    answer: "Oczywiście. Cennik zawiera nasze najbardziej standardowe, zoptymalizowane pakiety. Cechuje nas elastyczność – chętnie podejmujemy się budowy niestandardowych aplikacji webowych, systemów SaaS czy skomplikowanych integracji AI. Wyceniamy je zawsze na podstawie bezpłatnej konsultacji i analizy potrzeb."
  }
];

export function PricingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-[1200px]">
        
        {/* ======================================= */}
        {/* GŁÓWNY UKŁAD (Tytuł z lewej, FAQ z prawej) */}
        {/* ======================================= */}
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20 mb-16">
          
          {/* LEWA STRONA - Tytuł */}
          <div className="w-full md:w-1/3 md:sticky md:top-32">
            <h2 className="text-[36px] md:text-[42px] font-bold text-zinc-950 leading-[1.1] tracking-tight">
              Najczęstsze<br/>pytania
            </h2>
          </div>

          {/* PRAWA STRONA - Akordeon */}
          <div className="w-full md:w-2/3 flex flex-col border-t border-zinc-200">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              
              return (
                <div key={index} className="border-b border-zinc-200">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="text-[17px] font-medium text-zinc-950 group-hover:text-blue-600 transition-colors duration-300 pr-8">
                      {faq.question}
                    </span>
                    <span className="shrink-0 text-zinc-400 group-hover:text-blue-600 transition-colors duration-300">
                      {isOpen ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polyline points="18 15 12 9 6 15"></polyline>
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      )}
                    </span>
                  </button>
                  
                  {/* Płynnie rozsuwana odpowiedź (Grid transition) */}
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[15px] text-zinc-600 leading-relaxed pr-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================= */}
        {/* SEKCJA SEO - Mały tekst na dole */}
        {/* ======================================= */}
        <div className="mt-20 pt-8 border-t border-zinc-200">
          <p className="text-[11px] md:text-[12px] text-zinc-500 leading-relaxed text-justify">
            Niniejszy cennik ma charakter wyłącznie informacyjny i nie stanowi oferty handlowej w rozumieniu art. 66 § 1 Kodeksu Cywilnego. Wszystkie podane wyżej kwoty są cenami netto, do których należy doliczyć obowiązujący podatek VAT (23%). Whiteslope Studio to profesjonalna agencja interaktywna z siedzibą w Białymstoku. Naszą specjalizacją jest kompleksowy web development, tworzenie stron internetowych, projektowanie aplikacji webowych (SaaS) oraz wdrażanie zaawansowanych systemów automatyzacji procesów biznesowych i sztucznej inteligencji. Ostateczna wycena tworzenia stron WWW dla klientów z Białegostoku, województwa podlaskiego oraz z całej Polski zależy od precyzyjnej specyfikacji projektu, liczby zakodowanych widoków, wymagań dotyczących optymalizacji oraz zastosowanych integracji API. Strony internetowe Białystok – budujemy szybkie, responsywne i rygorystycznie zoptymalizowane pod kątem wyszukiwarek (SEO) serwisy, które skalują biznes i upraszczają lejki sprzedażowe. Informacje o czasie realizacji są orientacyjne, a precyzyjny harmonogram prac jest zawsze dołączany do indywidualnej oferty przed rozpoczęciem współpracy.
          </p>
        </div>

      </div>
    </section>
  );
}