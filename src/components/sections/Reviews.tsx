'use client';

import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    title: 'Nasz produkt SaaS dla korepetytorów działa świetnie!',
    text: 'Naszym celem było stworzenie produktu SaaS dla korepetytorów. Chłopaki z Whiteslope wykonali całą stronę, dashboard i tablice interaktywną na której uczniowie mogą rysować i pisać w czasie rzeczywistym. Wszystko działa świetnie! Na pewno będziemy wracać po więcej.',
    link: 'https://www.easylesson.app',
    avatarUrl: '/_resources/reviews/easylesson.webp'
  },
];

export default function ReviewsSection() {
  return (
    <section className="relative w-full bg-white overflow-hidden pt-[30px]">
      
      {/* --- TŁO: 8 nieregularnych pasów na całej szerokości 1640px --- */}
      <div className="absolute top-0 bottom-0 left-0 right-0 z-0 w-full max-w-[1640px] mx-auto flex pointer-events-none">
        
        {/* Właściwy kontener z pasami (zmniejszone opacity na 40% dla elegancji) */}
        <div className="w-full flex opacity-60">
          
          {/* Pas 1: Bazowy jasny niebieski */}
          <div 
            className="flex-1" 
            style={{ 
              background: `
                linear-gradient(to right, #ffffff 0%, transparent 100%), 
                linear-gradient(to bottom, #c5d6ff 0%, #ffffff 80%)
              ` 
            }} 
          />
          
          {/* Pas 2 */}
          <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #c8dbff 0%, #ffffff 40%)' }} />
          
          {/* Pas 3 */}
          <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #cce0ff 0%, #ffffff 75%)' }} />
          
          {/* Pas 4 */}
          <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #cce6fa 0%, #ffffff 45%)' }} />
          
          {/* Pas 5: Subtelne przejście w stronę cyjanu/chłodnej mięty */}
          <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #ceebf5 0%, #ffffff 95%)' }} />
          
          {/* Pas 6 */}
          <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #d0eff0 0%, #ffffff 60%)' }} />
          
          {/* Pas 7 */}
          <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #d0f2eb 0%, #ffffff 35%)' }} />
          
          {/* Pas 8: Delikatna, chłodna mięta (koniec przejścia) */}
          <div 
            className="flex-1" 
            style={{ 
              background: `
                linear-gradient(to left, #ffffff 0%, transparent 100%), 
                linear-gradient(to bottom, #d0f4e6 0%, #ffffff 80%)
              ` 
            }} 
          />
          
        </div>
      </div>

      {/* --- WŁAŚCIWA ZAWARTOŚĆ --- */}
      <div className="relative z-10 w-full max-w-[1640px] mx-auto px-6 md:px-12 py-10 md:py-14">
        
        {/* Nagłówek i średnia ocen */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 ">
          <div className="flex flex-col gap-3">
            <h2 className="text-[32px] md:text-[40px] font-[700] text-[#141414] leading-[1.1] tracking-tight">
              Zobacz, komu ostatnio<br/> poprawiliśmy dzień
            </h2>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-[20px] h-[20px] text-yellow-400 fill-yellow-400" />
              ))}
              <span className="ml-2 text-[18px] font-[700] text-[#141414]">
                5.0
              </span>
            </div>
          </div>
        </div>

        {/* Siatka z opiniami */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review) => (
            <div 
              key={review.id}
              className="flex flex-col justify-between bg-white/80 border border-[#E5E7EB] hover:border-[#D1D5DB] transition-all duration-300 rounded-[16px] p-6 md:p-8 backdrop-blur-md shadow-sm"
            >
              <div>
                {/* Awatar i dane */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.avatarUrl}
                    alt={review.name}
                    className="w-[48px] h-[48px] rounded-full object-cover border border-[#D1D5DB]"
                  />
                  <div className="flex flex-col">
                    <span className="text-[16px] font-[700] text-[#141414] leading-tight">
                      {review.name}
                    </span>
                    <span className="text-[13px] font-[500] text-[#6B7280] mt-0.5">
                      {review.company}
                    </span>
                  </div>
                </div>

                {/* 5 gwiazdek nad tytułem */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-[14px] h-[14px] text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="text-[20px] md:text-[22px] font-[700] text-[#141414] mb-3 leading-[1.25]">
                    "{review.title}"
                  </h3>
                  <p className="text-[15px] font-[500] text-[#4B5563] leading-relaxed">
                    {review.text}
                  </p>
                </div>
              </div>

              <div className="mt-auto pt-5 border-t border-[#E5E7EB]">
                <Link 
                  href={review.link}
                  className="inline-flex items-center text-[14px] font-[600] text-[#0057ff] hover:text-[#004ae6] transition-colors group"
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