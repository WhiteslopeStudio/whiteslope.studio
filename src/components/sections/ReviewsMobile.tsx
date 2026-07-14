'use client';

import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const REVIEWS = [
  {
    id: 1,
    name: 'Sławek Wiesławski',
    company: 'Wiesławski Studio',
    title: 'Szybkość działania jest świetna',
    text: 'Pierwsze zapytania od klientów pojawiły się bardzo szybko po starcie strony. Dobry i bezproblemowy kontakt.',
    link: 'https://www.wieslawski.studio',
    avatarUrl: '/_resources/reviews/slawekWieslawski.webp'
  },
  {
    id: 2,
    name: 'Damian Bogdanowicz',
    company: 'Filmy i fotografia',
    title: 'Strona jest świetna!',
    text: 'Zupełnie inna jakość. Strona jest bardzo estetyczna. Jestem pod wrażeniem!',
    link: 'https://damian-bogdanowicz-site.vercel.app/',
    avatarUrl: '/_resources/reviews/damianBogdanowicz.webp'
  },
  {
    id: 3,
    name: 'Easylesson.app',
    company: 'Produkt SaaS',
    title: 'Nasz produkt SaaS działa świetnie!',
    text: 'Stworzyliśmy produkt SaaS dla korepetytorów. Whiteslope wykonało stronę, dashboard i tablicę interaktywną. Wszystko działa świetnie! Na pewno wrócimy.',
    link: 'https://www.easylesson.app',
    avatarUrl: '/_resources/reviews/easylesson.webp'
  },
];

export default function ReviewsMobile() {
  return (
    // Zmniejszony padding z py-14 na py-8 dla zaoszczędzenia miejsca na mobile
    <section className="relative w-full bg-white overflow-hidden py-8">
      
      {/* --- UPROSZCZONE TŁO MOBILE --- */}
      {/* Zamiast 8 pasków, jeden subtelny gradient od góry dla wydajności */}
      <div 
        className="absolute top-0 left-0 right-0 h-[300px] z-0 pointer-events-none opacity-50"
        style={{
          background: 'linear-gradient(to bottom, #c5d6ff 0%, rgba(255,255,255,0) 100%)'
        }}
      />

      {/* --- WŁAŚCIWA ZAWARTOŚĆ --- */}
      <div className="relative z-10 w-full px-6 flex flex-col">
        
        {/* Nagłówek i średnia ocen */}
        <div className="flex flex-col gap-3 mb-8">
          <h2 className="text-[28px] font-[700] text-zinc-950 leading-[1.1] tracking-tight">
            Zobacz, komu ostatnio<br/> poprawiliśmy dzień
          </h2>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-[18px] h-[18px] text-yellow-400 fill-yellow-400" />
            ))}
            <span className="ml-1.5 text-[16px] font-[700] text-zinc-950">
              5.0
            </span>
          </div>
        </div>

        {/* Siatka z opiniami - karty ułożone pionowo, ale mocno skompresowane */}
        <div className="flex flex-col gap-4">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              // Mniejsze paddingi (p-5), mniejszy border-radius (rounded-[20px])
              className="flex flex-col justify-between bg-white border border-zinc-200 rounded-[20px] p-5 shadow-sm"
            >
              <div>
                {/* Awatar i dane - kompaktowe */}
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src={review.avatarUrl}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px] rounded-full object-cover border border-zinc-200"
                  />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-[700] text-zinc-950 leading-tight">
                      {review.name}
                    </span>
                    <span className="text-[12px] font-[500] text-zinc-500 mt-0.5">
                      {review.company}
                    </span>
                  </div>
                </div>

                {/* Gwiazdki mniejsze */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[12px] h-[12px] text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Tekst opinii */}
                <div className="mb-4">
                  <h3 className="text-[18px] font-[700] text-zinc-950 mb-2 leading-[1.2]">
                    "{review.title}"
                  </h3>
                  <p className="text-[14px] font-[500] text-zinc-600 leading-snug">
                    {review.text}
                  </p>
                </div>
              </div>

              {/* Link CTA - zacieśniony margin-top */}
              <div className="mt-auto pt-4 border-t border-zinc-100">
                <Link 
                  href={review.link}
                  className="inline-flex items-center text-[14px] font-[600] text-blue-600 transition-colors group"
                >
                  Zobacz realizację
                  <ArrowRight className="w-[16px] h-[16px] ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}