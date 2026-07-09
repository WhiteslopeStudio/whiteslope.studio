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
    <section className="relative bg-white border-b border-zinc-100 py-12 overflow-hidden px-6">
      
      <div className="w-full mx-auto flex flex-col gap-10">
        
        {/* --- NAGŁÓWEK I PRZYCISK --- */}
        <div className="flex flex-col gap-5">
          <div>
            {/* Nagłówek H2 dostosowany do mobile (text-[32px]) */}
            <h2 className="text-[32px] font-bold tracking-tight text-zinc-950 leading-[1.1]">
              Portfolio & Case Studies
            </h2>
            <p className="mt-3 text-[15px] text-zinc-600 leading-relaxed">
              Poznaj wybrane realizacje. Od konwertujących wizytówek po zaawansowane aplikacje webowe i panele SaaS.
            </p>
          </div>
          
          
        </div>

        {/* --- LISTA CASE STUDIES (1 Kolumna) --- */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, i) => (
            <div key={i} className="flex flex-col">
              
              {/* Zaokrąglone zdjęcie (aspect-video) */}
              <div className="rounded-[16px] overflow-hidden shadow-sm border border-zinc-200 aspect-video relative mb-4 bg-zinc-100 shrink-0">
                <img 
                  src={project.image} 
                  alt={`Realizacja: ${project.title}`}
                  className="h-full w-full object-cover" 
                  draggable={false} 
                />
              </div>

              {/* Opis */}
              <div className="flex flex-col">
                <h3 className="text-[20px] font-bold text-zinc-950 tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
                  {project.description}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* --- CYTAT --- */}
        <div className="mt-4 border-t border-zinc-100 pt-10 text-center flex flex-col items-center">
          <Quote className="w-8 h-8 text-zinc-200 rotate-180 mb-4" />
          <p className="text-[16px] font-medium text-zinc-900 leading-relaxed italic tracking-tight">
            "Zwykle ciężko mnie zaskoczyć, ale ten projekt robi ogromne wrażenie. Zupełnie inna jakość."
          </p>
          <p className="mt-4 text-[12px] text-zinc-500 font-bold tracking-widest uppercase">
            — Damian Bogdanowicz
          </p>
        </div>

        {/* Przycisk CTA rozciągnięty na pełną szerokość (w-full) */}
          <Link 
            href="/projects" 
            className="w-full inline-flex items-center justify-center rounded-full bg-zinc-950 text-white active:bg-zinc-800 h-[48px] px-6 text-[15px] font-semibold transition-all duration-300 active:scale-95 shadow-sm group"
          >
            Zobacz wszystkie realizacje
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

      </div>

    </section>
  );
}