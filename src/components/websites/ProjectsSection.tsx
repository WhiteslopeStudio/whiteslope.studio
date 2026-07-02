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

export default function PortfolioSection() {
  return (
    <section className="relative bg-white border-b border-black/10 py-12 md:py-16 overflow-hidden">
      
      {/* --- NAGŁÓWEK I PRZYCISK (Dopasowana szerokość max-w-[1640px]) --- */}
      <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div>
          <h2 className="text-[28px] font-semibold tracking-tight text-zinc-950">
            Portfolio & Case Studies
          </h2>
          <p className="mt-2 text-[15px] md:text-[16px] text-zinc-600 max-w-xl leading-relaxed">
            Poznaj wybrane realizacje. Od konwertujących wizytówek po zaawansowane aplikacje webowe i panele SaaS.
          </p>
        </div>
        
        {/* Czarny przycisk CTA */}
        <Link 
          href="/projects" 
          className="inline-flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-7 py-3 text-[14px] md:text-[15px] font-medium transition-colors duration-300 group shadow-sm shrink-0"
        >
          Zobacz wszystkie
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* --- SIATKA CASE STUDIES (Dopasowana szerokość max-w-[1640px]) --- */}
      <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PROJECTS.map((project, i) => (
            <div key={i} className="group flex flex-col">
              
              {/* Zdjęcie z małym zaokrągleniem i szerokim ratio (aspect-video) */}
              <div className="rounded-[14px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-black/5 aspect-video relative mb-5 bg-zinc-100 shrink-0">
                <img 
                  src={project.image} 
                  alt={`Realizacja: ${project.title}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  draggable={false} 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Opis z większymi czcionkami i pogrubieniami */}
              <div className="px-1 flex-1">
                <h3 className="text-[18px] md:text-[20px] font-semibold text-zinc-950 tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-[14px] md:text-[15px] leading-relaxed text-zinc-600">
                  {project.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- CYTAT DAMIANA (Dopasowana szerokość) --- */}
      <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12 mt-12 relative">
        <div className="w-full max-w-[700px] mx-auto text-center pointer-events-none select-none border-t border-black/5 pt-10">
          <Quote className="w-8 h-8 mx-auto text-zinc-200 rotate-180 mb-4" />
          <p className="text-[16px] md:text-[18px] font-medium text-zinc-900 leading-relaxed max-w-2xl mx-auto italic tracking-tight">
            "Zwykle ciężko mnie zaskoczyć, ale ten projekt robi ogromne wrażenie. Zupełnie inna jakość."
          </p>
          <p className="mt-3 text-[12px] md:text-[13px] text-zinc-500 font-bold tracking-widest uppercase">
            — Damian Bogdanowicz
          </p>
        </div>
      </div>

    </section>
  );
}