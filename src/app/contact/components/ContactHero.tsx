'use client';

import { useState } from 'react';
import { Clock, Video, ChevronRight } from 'lucide-react';
import BookingModal from './BookingModal';

export default function ContactHero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<'patryk' | 'mateusz' | 'bartek' | null>(null);

  const openModal = (expert: 'patryk' | 'mateusz' | 'bartek') => {
    setSelectedExpert(expert);
    setIsModalOpen(true);
  };

  return (
    <section className="relative w-full flex items-center pt-[120px] pb-[80px] min-h-[800px] overflow-hidden max-w-[1640px] mx-auto">
      
      {/* --- TŁO: Obrazek przesunięty w prawo --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-end opacity-100 pointer-events-none">
        <img 
          src="/_resources/contactPage/HeroBG.webp" 
          alt="Połączenie" 
          className="w-full max-w-[1640px] h-auto object-cover translate-x-[200px]"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 60%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        />
      </div>
      
      {/* --- TŁO: Twoje niebieskie paski --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-80 overflow-hidden">
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 85%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 70%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 55%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 40%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 25%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.6) 0%, transparent 10%)' }} />
      </div>

      {/* --- GŁÓWNA ZAWARTOŚĆ --- */}
      <div className="container mx-auto max-w-[1640px]relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8 mx-10"> 
        {/* Kontener trzymający całość po lewej stronie */}
        <div className="w-full max-w-2xl flex flex-col items-start">
          
          <h1 
            className="mt-20 text-[50px] md:text-[70px] leading-[0.95] text-zinc-950 tracking-tighter weight-extrabold"
           
          >
            Zawsze <br />w kontakcie!
          </h1>
          
          {/* Oczojebny limonkowy badge */}
          <div className="inline-flex items-center whitespace-nowrap bg-[#D4FF00] text-zinc-950 font-bold px-4 py-1.5 rounded-lg -rotate-[3deg] shadow-lg mt-3 mb-12 border border-black/10 origin-left transform-gpu">
            <span>*Ale nie w tym elektrycznym...</span>
            <img 
              src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/1f602.svg" 
              alt="Śmiejąca się buźka" 
              className="w-5 h-5 drop-shadow-sm ml-1.5 shrink-0" 
            />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-6 leading-snug">
            Umów się na 30 minut darmowej konsultacji.<br/>
            Wybierz eksperta:
          </h3>

          {/* LISTA EKSPERTÓW (Cienkie, podłużne buttony) */}
          <div className="flex flex-col gap-4 w-full">
            
            {/* Przycisk 1: Patryk */}
            <button 
              onClick={() => openModal('patryk')}
              className="group w-full max-w-[550px] bg-gradient-to-r from-[#18181b] to-[#27272a] hover:from-[#27272a] hover:to-[#3f3f46] border border-zinc-700 rounded-full p-2 pr-4 flex items-center transition-all duration-300 hover:scale-[1.02] shadow-xl text-left hover:cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-zinc-600 shrink-0">
                <img src="/_resources/team/patryk.webp" alt="Patryk Kulesza" className="w-full h-full object-cover" />
              </div>
              
              {/* Imię i rola */}
              <div className="ml-4 flex-1">
                <h4 className="text-white text-[15px] font-bold leading-tight">Patryk Kulesza</h4>
                <p className="text-zinc-400 text-[13px]">Full-stack Developer</p>
              </div>

              {/* Informacje: 30 min + Meet */}
              <div className="flex flex-col items-end mr-5 shrink-0">
                <span className="text-zinc-300 text-[12px] font-semibold">30 min</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/330px-Google_Meet_icon_%282020%29.svg.png" 
                    alt="Google Meet" 
                    className="w-4 h-4 shrink-0 object-contain" 
                    />
                  <span className="text-zinc-400 text-[12px]">Google Meet</span>
                </div>
              </div>

              {/* Szare kółeczko ze strzałką */}
              <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors shrink-0">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </button>

            {/* Przycisk 2: Mateusz */}
            <button 
              onClick={() => openModal('mateusz')}
              className="group w-full max-w-[550px] bg-gradient-to-r from-[#18181b] to-[#27272a] hover:from-[#27272a] hover:to-[#3f3f46] border border-zinc-700 rounded-full p-2 pr-4 flex items-center transition-all duration-300 hover:scale-[1.02] shadow-xl text-left hover:cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-zinc-600 shrink-0">
                <img src="/_resources/team/mateusz.webp" alt="Mateusz Malewski" className="w-full h-full object-cover" />
              </div>
              
              {/* Imię i rola */}
              <div className="ml-4 flex-1">
                <h4 className="text-white text-[15px] font-bold leading-tight">Mateusz Malewski</h4>
                <p className="text-zinc-400 text-[13px]">Website Designer</p>
              </div>

              {/* Informacje: 30 min + Meet */}
              <div className="flex flex-col items-end mr-5 shrink-0">
                <span className="text-zinc-300 text-[12px] font-semibold">30 min</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/330px-Google_Meet_icon_%282020%29.svg.png" 
                    alt="Google Meet" 
                    className="w-4 h-4 shrink-0 object-contain" 
                    />
                  <span className="text-zinc-400 text-[12px]">Google Meet</span>
                </div>
              </div>

              {/* Szare kółeczko ze strzałką */}
              <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors shrink-0">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </button>


            {/* Przycisk 3: Bartek */}
            <button 
              onClick={() => openModal('bartek')}
              className="group w-full max-w-[550px] bg-gradient-to-r from-[#18181b] to-[#27272a] hover:from-[#27272a] hover:to-[#3f3f46] border border-zinc-700 rounded-full p-2 pr-4 flex items-center transition-all duration-300 hover:scale-[1.02] shadow-xl text-left hover:cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-zinc-600 shrink-0">
                <img src="/_resources/team/bartek.webp" alt="Bartek Koźluk" className="w-full h-full object-cover" />
              </div>
              
              {/* Imię i rola */}
              <div className="ml-4 flex-1">
                <h4 className="text-white text-[15px] font-bold leading-tight">Bartek Koźluk</h4>
                <p className="text-zinc-400 text-[13px]">Lider Techniczny</p>
              </div>

              {/* Informacje: 30 min + Meet */}
              <div className="flex flex-col items-end mr-5 shrink-0">
                <span className="text-zinc-300 text-[12px] font-semibold">30 min</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/330px-Google_Meet_icon_%282020%29.svg.png" 
                    alt="Google Meet" 
                    className="w-4 h-4 shrink-0 object-contain" 
                    />
                  <span className="text-zinc-400 text-[12px]">Google Meet</span>
                </div>
              </div>

              {/* Szare kółeczko ze strzałką */}
              <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center group-hover:bg-blue-500 transition-colors shrink-0">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </button>

          </div> {/* <-- TU zamykamy tylko listę 3 przycisków ekspertów */}

          

        </div> 

        {/* --- SUBTELNY KONTAKT NA DOLE PO PRAWEJ --- */}
        {/* <div className="w-full lg:w-auto flex flex-col gap-2.5 pb-2 text-left lg:text-right pt-8 lg:pt-0 border-t lg:border-t-0 border-zinc-200">
          <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider mb-1">
            Wolisz tradycyjny kontakt?
          </p>
          
          <div className="text-[14px]">
            <a href="tel:+48662581368" className="font-bold text-zinc-800 hover:text-blue-600 transition-colors">+48 662 581 368</a> 
            <span className="text-zinc-800"> — Patryk - Full-stack Developer</span>
          </div>
          
          <div className="text-[14px]">
            <a href="tel:+48731721760" className="font-bold text-zinc-800 hover:text-blue-600 transition-colors">+48 731 721 760</a> 
            <span className="text-zinc-800"> — Mateusz - Website Designer</span>
          </div>
          
          <div className="text-[14px] mt-1">
            <span className="text-zinc-800 mr-1.5">E-mail:</span>
            <a href="mailto:kontakt@whiteslope.studio" className="font-bold text-zinc-800 hover:text-blue-600 transition-colors">kontakt@whiteslope.studio</a>
          </div>
        </div> */}
      </div> {/* <-- TU zamykamy główny container */}

      {/* MODAL */}
      {isModalOpen && (
        <BookingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          expert={selectedExpert} 
        />
      )}
    </section>
  );
}