'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function AutomationShowcaseMobile() {
  return (
    <section id="automation" className="relative w-full overflow-hidden">
      {/* Głęboka czerń - kontrast wobec jasnej sekcji "Strony internetowe" powyżej */}
      <div className="relative w-full flex flex-col items-start text-left px-6 pt-12 bg-black">
        {/* Nagłówek - ta sama rodzina stylu co H1 w Hero (klasa .hero-mobile-h1), kolor biały na czarnym tle */}
        <h2 className="hero-mobile-h1 mb-2 text-[clamp(23px,6.1vw,28px)] leading-[1.25] text-white tracking-tight max-w-[380px] text-balance">
          Automatyzacja procesów i aktywacja AI
        </h2>

        <p className="mb-4 text-[14px] leading-relaxed text-gray-300 font-semibold max-w-[380px] text-balance">
          Budujemy rozwiązania, które łączą kod z inteligencją AI. Eliminują nudę i powtarzalne błędy z Twojej codzienności.
        </p>

        {/* CTA - ten sam kształt/padding/waga co w karcie "Strony internetowe", kolory odwrócone pod czarne tło */}
        <div className="relative z-20 flex flex-wrap items-center justify-start gap-3">
          <Link
            href="/pricing/ai-integration/chatbot"
            prefetch={false}
            className="px-5 py-2 bg-[#3561ff] text-white font-medium rounded-full flex items-center justify-center text-sm active:scale-95 whitespace-nowrap"
          >
            Dowiedz się więcej
          </Link>

          <Link
            href="/contact"
            prefetch={false}
            className="px-5 py-2 border border-[#3561ff] text-[#3561ff] font-medium rounded-full flex items-center justify-center gap-2 text-sm active:scale-95 transition-transform whitespace-nowrap"
          >
            Wycena
          </Link>
        </div>

        {/* Grafika - od razu pod CTA, sekcja kończy się zaraz pod obrazkiem (brak paddingu pod spodem).
             Uwaga: proporcje 4:3 to zgadywanka - nie znam rzeczywistego stosunku szerokości do
             wysokości chatbotPicture.png (dla poprzedniej karty podałeś mi dokładne 16:9, tu nie).
             Jeśli obrazek źle się kadruje, daj znać jaki to stosunek. */}
        {/* pointer-events-none: obrazek jest powiększony (scale-[1.15]) i wychodzi poza
             swój box, przez co nachodził na przyciski CTA powyżej i przechwytywał kliknięcia */}
        <div className="relative z-0 pointer-events-none left-1/2 -translate-x-1/2 w-screen scale-[1.15] aspect-[4/3]">
          <Image
            src="/_resources/Automations/chatbotPicture.png"
            alt="Interaktywne demo chatbota AI"
            fill
            sizes="100vw"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}
