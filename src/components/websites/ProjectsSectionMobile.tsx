'use client';

import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Wiesławski Studio',
    image: '/_resources/stronyInternetowe/WieslawskiStudio.webp',
    description: (
      <>
        Strona zrealizowana dla założyciela legendarnego, znanego w całej Polsce <strong>Hertz Studio</strong>. Projekt dostarczyliśmy w błyskawicznym tempie. Witryna przejrzyście prezentuje trzy główne filary usługowe i została rozbudowana o <strong>moduł newslettera oraz dedykowany sklep internetowy</strong> do sprzedaży voucherów.
      </>
    ),
  },
  {
    title: 'Patryk Kulesza – Edukacja',
    image: '/_resources/stronyInternetowe/PatrykKulesza.webp',
    description: (
      <>
        <strong>Zaawansowana platforma edukacyjna</strong> z kursami online, pełniąca jednocześnie funkcję wysoce konwertującej strony wizytówkowej. Projekt wyróżnia się zoptymalizowaną strukturą, która precyzyjnie <strong>celuje w lokalne SEO</strong> (obszar Zambrowa), skutecznie i bezobsługowo pozyskując nowych klientów.
      </>
    ),
  },
  {
    title: 'EasyLesson.app (SaaS)',
    image: '/_resources/stronyInternetowe/Easylesson.webp',
    description: (
      <>
        <strong>Pionierska platforma SaaS</strong> przeznaczona do prowadzenia korepetycji w modelu subskrypcyjnym. Oferuje funkcje skrojone idealnie pod edukację online: <strong>wbudowany czat głosowy</strong>, inteligentną wyszukiwarkę wzorów matematycznych oraz <strong>prywatnego nauczyciela wspieranego przez AI</strong>.
      </>
    ),
  },
  {
    title: 'Damian Bogdanowicz',
    image: '/_resources/stronyInternetowe/DamianBogdanowicz.webp',
    description: (
      <>
        Prawdziwy <strong>wizualny majstersztyk</strong>. Płynne, nowoczesne animacje połączone z profesjonalnymi materiałami wideo tworzą unikalne <strong>doświadczenie premium</strong>. Strona jest niezwykle elegancka i przejrzysta. Jakością wykonania nawiązuje do największych gigantów branży reklamowej.
      </>
    ),
  },
];

export default function ProjectsSectionMobile() {
  return (
    // Zmniejszony padding pionowy na potrzeby urządzeń mobilnych
    <section className="relative overflow-hidden bg-white py-14 px-6">
      <div className="w-full mx-auto flex flex-col gap-10">

        {/* --- NAGŁÓWEK --- */}
        <div className="flex flex-col">
          <h2 className="hero-mobile-h1 mb-2 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-zinc-950 tracking-tight max-w-[380px] text-balance">
            Portfolio i case studies
          </h2>
          <p className="text-[14px] leading-relaxed text-zinc-700 font-semibold max-w-[380px] text-balance">
            Wybrane realizacje - od konwertujących wizytówek po aplikacje webowe i panele SaaS.
          </p>
        </div>

        {/* --- LISTA CASE STUDIES (1 Kolumna) --- */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, i) => (
            <div key={i} className="flex flex-col">
              
              {/* Zaokrąglone zdjęcie (aspect-video) */}
              <div className="rounded-2xl overflow-hidden border border-zinc-200/80 aspect-video relative mb-4 bg-zinc-100 shrink-0">
                <img 
                  src={project.image} 
                  alt={`Realizacja: ${project.title}`}
                  className="h-full w-full object-cover" 
                  draggable={false} 
                />
              </div>

              {/* Opis */}
              <div className="flex flex-col">
                <h3 className="text-[17px] font-bold text-zinc-950 tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
                  {project.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* --- CYTAT --- */}
        <div className="border-t border-zinc-200/70 pt-8 flex flex-col items-start">
          <Quote className="w-7 h-7 text-zinc-300 rotate-180 mb-3" />
          <p className="text-[15px] font-medium text-zinc-900 leading-relaxed italic tracking-tight max-w-[380px]">
            &bdquo;Zwykle ciężko mnie zaskoczyć, ale ten projekt robi ogromne wrażenie. Zupełnie inna
            jakość.&rdquo;
          </p>
          <p className="mt-3 text-[11px] text-zinc-500 font-bold tracking-widest uppercase">
            Damian Bogdanowicz
          </p>
        </div>

        {/* CTA - ten sam styl pigułek co na stronie głównej */}
        <div className="flex flex-wrap items-center justify-start gap-3">
          <Link
            href="/projects"
            prefetch={false}
            className="px-5 py-2 bg-[#3561ff] text-white font-medium rounded-full flex items-center justify-center text-sm active:scale-95 whitespace-nowrap"
          >
            Zobacz wszystkie realizacje
          </Link>

          <Link
            href="#brief"
            prefetch={false}
            className="px-5 py-2 border border-[#3561ff] text-[#3561ff] font-medium rounded-full flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform whitespace-nowrap"
          >
            Wyceń projekt
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </section>
  );
}