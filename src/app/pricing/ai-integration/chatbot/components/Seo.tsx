'use client';

import React from 'react';

export default function Seo() {
  return (
    <section className="relative w-full bg-white border-t border-zinc-200 pt-16 pb-16 z-20">

        {/* --- TŁO: Delikatne Paski Gradientowe z Brand Booka --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-[0.4]">
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #d9ffc7 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #d9ffc7 0%, transparent 80%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #d9ffc7 0%, transparent 60%)' }} />
        <div className="flex-1 border-r border-[#dfffd0]/50" style={{ background: 'linear-gradient(to bottom, #d9ffc7 0%, transparent 40%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, #d9ffc7 0%, transparent 20%)' }} />
      </div>
      
      {/* --- NIEWIDOCZNY SEO MINI-BLOG (Dopasowany do oferty Whiteslope - Desktop) --- */}
      <div className="w-full max-w-[800px] mx-auto px-5 md:px-[24px] flex flex-col gap-4 text-[12px] text-black leading-relaxed text-justify">
        
        <h2 className="text-[14px] font-[900] text-zinc-800 mb-2 text-left">
          Jak zautomatyzować obsługę klienta 24/7 dzięki Chatbotom AI?
        </h2>
        
        <p>
          Większość firm traci klientów po godzinach pracy, kiedy użytkownik napotyka problem, a obsługa nie jest dostępna. Rozwiązaniem jest chatbot AI na stronę internetową, który działa jak wirtualny koordynator działań online. W Whiteslope Studio wdrażamy pełnoprawnych agentów AI w zaledwie 7 dni roboczych. Dzięki temu klient szybko dowiaduje się o Twojej ofercie, a Ty zyskujesz system do automatycznego generowania leadów i obsługi zapytań.
        </p>

        <h3 className="text-[13px] font-bold text-zinc-700 mt-4 text-left">
          Inteligentny Agent AI, który sam rezerwuje terminy
        </h3>
        
        <p>
          Nowoczesne chatboty to coś więcej niż proste drzewa decyzyjne. Nasze rozwiązania potrafią prowadzić naturalną rozmowę, budując zaufanie odwiedzających. Agent AI potrafi samodzielnie zbadać potrzeby klienta, a następnie zarezerwować termin bezpośrednio w Twoim kalendarzu. Ty otrzymujesz powiadomienie e-mail, a Twój klient natychmiastowe potwierdzenie. 
        </p>
        
        <h3 className="text-[13px] font-bold text-zinc-700 mt-4 text-left">
          Bezpieczeństwo wizerunku marki i ścisłe bariery bota
        </h3>

        <p>
          Wdrożenie sztucznej inteligencji musi być w 100% bezpieczne dla Twojej firmy. Nasz zespół czuwa nad całym procesem, konfigurując ścisłe bariery dla bota. Agent czerpie wiedzę wyłącznie z dostarczonych dokumentów, cenników i materiałów, dzięki czemu nie ma szans, że odpowie coś niezgodnego z prawdą. W przypadku skomplikowanych pytań, rozmowa jest płynnie przekierowywana do żywego pracownika obsługi klienta, wraz z powiadomieniem e-mail.
        </p>

        <h3 className="text-[13px] font-bold text-zinc-700 mt-4 text-left">
          Szybki proces wdrożenia i integracje API
        </h3>

        <p>
          Proces uruchomienia chatbota AI skróciliśmy do minimum. Wystarczy, że pobierzesz i uzupełnisz nasz krótki dokument tekstowy. Na jego podstawie nasz zespół tworzy interaktywne demo chatbota. Po akceptacji uruchamiamy Agenta AI bezpośrednio na Twojej stronie. Tworzymy również zaawansowane systemy, jak zintegrowany korepetytor AI ingerujący w obszar wirtualnej tablicy, co udowadnia, że nasze integracje API i możliwości adaptacji sztucznej inteligencji nie mają granic.
        </p>

      </div>

    </section>
  );
}