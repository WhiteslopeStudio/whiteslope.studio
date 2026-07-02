'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const teamProfiles = [
  {
    name: 'Patryk Kulesza',
    image: '/_resources/patryk.webp',
  },
  {
    name: 'Mateusz Malewski',
    image: '/_resources/mati.webp',
  },
  {
    name: 'Bartłomiej Koźluk',
    image: 'https://static.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry',
  },
  {
    name: 'Daniel Wawrzos',
    image: '/_resources/daniel.webp',
  },
];

export default function WhyUs() {
  return (
    <section className="relative bg-zinc-50 py-12 md:py-20">
      <div className="mx-auto w-full max-w-[1640px] px-6 md:px-12">
        
        {/* --- NAGŁÓWEK SEKCJI --- */}
        <div className="mb-10 text-left">
          <h2 className="text-[28px] font-semibold tracking-tight text-zinc-950">
            Dlaczego my?
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] text-zinc-600 ">
            Jesteśmy małym zgranym zespołem, który tworzy strony internetowe i platformy SaaS dla firm. Nasze produkty są solidne, niezawodne i przystępne cenowo.
          </p>
        </div>

        {/* --- 3 KAFELKI (BENTO GRID - BIAŁE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Kafelek 1: Zespół */}
          <article className="group relative flex overflow-hidden rounded-[20px]  bg-white shadow-sm transition-all hover:shadow-md min-h-[160px]">
            {/* Prawa strona: Avatary i Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-[60%] z-0 flex items-center justify-end pr-5">
              {/* Gradient maskujący lewą krawędź avatarów */}
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
              {/* Siatka 2x2 (Kwadrat) */}
              <div className="grid grid-cols-2 gap-1.5 relative z-0 transition-transform duration-500 group-hover:scale-105">
                {teamProfiles.map((profile, i) => (
                  <img 
                    key={i} 
                    src={profile.image} 
                    alt={profile.name} 
                    /* Zaokrąglone kwadraty zamiast kółek, żeby siatka wyglądała jak jeden spójny blok */
                    className="w-11 h-11 rounded-full border border-black/5 object-cover shadow-sm" 
                  />
                ))}
              </div>
            </div>

            {/* Lewa strona: Tekst */}
            <div className="relative z-20 flex flex-col justify-center p-6 text-left w-[85%]">
              <h3 className="text-[22px] font-semibold text-zinc-950 ">
                1. Bezpośredni kontakt
              </h3>
              <p className="mt-3 text-[15px]  text-zinc-600">
<strong>Bezpośredni kontakt z zespołem technicznym.</strong> Taki model współpracy eliminuje pośredników, przyspiesza wprowadzanie zmian i gwarantuje, że <em>każdy detal techniczny ustalasz od razu z ekspertem</em>.              </p>
            </div>
          </article>

          {/* Kafelek 2: Ceny */}
          <article className="group relative flex overflow-hidden rounded-[20px]  bg-white shadow-sm transition-all hover:shadow-md min-h-[160px]">
            {/* Prawa strona: Wideo i Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-[65%] z-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
              <video 
                autoPlay loop muted playsInline 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src="/_resources/portfolio1.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Lewa strona: Tekst */}
            <div className="relative z-20 flex flex-col justify-center p-6 text-left w-[85%]">
              <h3 className="text-[22px] font-semibold text-zinc-950 ">
                2. Przystępne ceny i wysoka jakość
              </h3>
              <p className="mt-3 text-[15px]  text-zinc-600">
Tworzymy dopracowane strony w <em>przystępnych cenach</em>. Chcemy, aby <strong>polskie firmy mogły szybciej się rozwijać</strong> i od początku wyglądać w sieci w pełni profesjonalnie.           
                </p>
            </div>
          </article>

          {/* Kafelek 3: Technologie (AI) */}
          <article className="group relative flex overflow-hidden rounded-[20px] bg-white shadow-sm transition-all hover:shadow-md min-h-[160px]">
            {/* Prawa strona: Wideo i Gradient */}
            <div className="absolute right-0 top-0 bottom-0 w-[65%] z-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
              <video 
                autoPlay loop muted playsInline 
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src="/_resources/portfolio3.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Lewa strona: Tekst */}
            <div className="relative z-20 flex flex-col justify-center p-6 text-left w-[85%]">
              <h3 className="text-[22px] font-semibold text-zinc-950 ">
                3. Nowoczesne technologie i AI
              </h3>
              <p className="mt-3 text-[15px] text-zinc-600">
                Projektujemy od zera i wzbogacamy strony o <strong>gotowe funkcje AI</strong>. Wdrażamy w Twoim systemie <em>inteligentne chatboty oraz automatyzacje</em>, które usprawnią obsługę klientów.
              </p>
            </div>
          </article>
        </div>

        {/* --- NEWSLETTER BANER (Kompaktowy) --- */}
        <div className="relative overflow-hidden rounded-[24px] bg-white border border-black/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[260px]">
            
            {/* Lewa strona: Tekst i Formularz (Zmniejszone paddingi i marginesy) */}
            <div className="p-6 md:p-8 lg:pl-10 flex flex-col justify-center">
              
              {/* Social Media */}
              <div className="flex items-center gap-3 mb-4">
                <a href="https://www.instagram.com/whiteslopestudio/reels/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#E1306C] transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61583927894860" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#1877F2] transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.youtube.com/@WhiteslopeStudio" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#FF0000] transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>

              <h3 className="text-lg md:text-2xl font-semibold tracking-tight text-zinc-950">
                Newsletter Whiteslope Studio
              </h3>
              <p className="mt-2 text-[14px] text-zinc-600 max-w-[460px] leading-relaxed">
                Zapisz się do naszego newslettera. Otrzymasz od nas praktyczne porady dotyczące tworzenia stron internetowych. Zero spamu.
              </p>
              
              <form className="mt-5 w-full max-w-[480px]">
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <input 
                    type="email" 
                    placeholder="Twój e-mail" 
                    required
                    className="flex-1 rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-[14px] text-zinc-900 outline-none transition-colors focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                  <button 
                    type="submit"
                    className="rounded-full px-6 py-2.5 text-[14px] font-semibold text-white transition-opacity hover:opacity-90 shadow-sm shrink-0"
                    style={{
                      background: `radial-gradient(circle at 50% 100%, #1a75ff, #0057ff 40%, #004ae6 80%, #003bba)`,
                    }}
                  >
                    Zapisz się
                  </button>
                </div>
                
                {/* Zgoda (Checkbox) */}
                <div className="mt-3 flex items-start gap-2.5">
                  <input 
                    type="checkbox" 
                    id="newsletter-consent" 
                    required
                    className="mt-1 shrink-0 rounded border-zinc-300 text-blue-600 focus:ring-blue-600 cursor-pointer"
                  />
                  <label htmlFor="newsletter-consent" className="text-[11px] leading-relaxed text-zinc-500 cursor-pointer">
                    Wyrażam zgodę na przetwarzanie mojego e-maila w celu wysyłki newslettera. Wiem, że mogę wypisać się w każdej chwili. Więcej w <Link href="/polityka-prywatnosci" className="underline hover:text-zinc-800">Polityce Prywatności</Link>.
                  </label>
                </div>
              </form>
            </div>

            {/* Prawa strona: Zdjęcie iPhone'a (50% szerokości kontenera) */}
            <div className="relative hidden lg:block bg-zinc-50 border-l border-black/5 overflow-hidden">
              <img 
                src="/_resources/free-section-iphone.webp"
                alt="Wskazówki webowe na telefonie"
                className="absolute top-5 left-1/2 -translate-x-1/2 w-[60%] object-contain object-bottom"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}