'use client';

import Link from 'next/link';
import { ArrowRight, Quote } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Wiesławski Studio',
    image: '/_resources/stronyInternetowe/WieslawskiStudio.webp',
    description: "Strona dla Hertz Studio. Przejrzyste filary usługowe, moduł newslettera oraz dedykowany sklep internetowy do sprzedaży voucherów.",
  },
  {
    title: 'Patryk Kulesza',
    image: '/_resources/stronyInternetowe/PatrykKulesza.webp',
    description: "Zaawansowana platforma edukacyjna z kursami online i silnym naciskiem na lokalne SEO (Zambrow), skutecznie pozyskująca klientów.",
  },
  {
    title: 'EasyLesson.app',
    image: '/_resources/stronyInternetowe/Easylesson.webp',
    description: "Platforma SaaS dla korepetytorów: wbudowany czat głosowy, inteligentna wyszukiwarka wzorów i wsparcie prywatnego nauczyciela przez AI.",
  },
  {
    title: 'Damian Bogdanowicz',
    image: '/_resources/stronyInternetowe/DamianBogdanowicz.webp',
    description: "Wizualny majstersztyk. Płynne, nowoczesne animacje i profesjonalne wideo, nawiązujące jakością do gigantów branży reklamowej.",
  },
];

export default function PortfolioSection() {
  return (
    <section className="bg-white ">
      
      {/* --- NAGŁÓWEK --- */}
      <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-[32px] md:text-[40px] font-bold text-zinc-950 tracking-tighter flex items-center gap-3">
            Case Studies
            
            <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-13 h-13 relative " 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path 
                d="M4 19V5C4 3.89543 4.89543 3 6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19Z" 
                stroke="#2563eb" 
                strokeWidth="2"
                />
                <rect x="8" y="7" width="8" height="2" fill="#2563eb" />
                <rect x="8" y="11" width="8" height="2" fill="#2563eb" />
                <rect x="8" y="15" width="5" height="2" fill="#2563eb" />
            </svg>
            </h2>
          <p className="mt-4 text-[16px] md:text-[18px] text-zinc-600 leading-relaxed">
            Poznaj wybrane realizacje. Od konwertujących wizytówek po zaawansowane aplikacje webowe.
          </p>
        </div>
        
        <Link 
          href="/projects" 
          className="inline-flex items-center justify-center rounded-full bg-zinc-950 text-white hover:bg-zinc-800 px-8 py-4 text-[15px] font-semibold transition-all duration-300 hover:scale-[1.02] group"
        >
          Zobacz wszystkie
          <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* --- SIATKA PROJEKTÓW --- */}
      <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {PROJECTS.map((project, i) => (
            <div key={i} className="group flex flex-col">
              <div className="rounded-[20px] overflow-hidden aspect-[4/3] relative mb-6 bg-zinc-100">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <h3 className="text-[20px] font-bold text-zinc-950 tracking-tight">{project.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>

      
      
    </section>
  );
}