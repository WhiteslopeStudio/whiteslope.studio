'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import BookingModalMobile from './BookingModalMobile';

export default function ContactHeroMobile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<'patryk' | 'mateusz' | 'bartek' | null>(null);

  const openModal = (expert: 'patryk' | 'mateusz' | 'bartek') => {
    setSelectedExpert(expert);
    setIsModalOpen(true);
  };

  return (
    <section className="relative w-full flex items-center pt-[100px] pb-[60px] min-h-[auto] overflow-hidden">
      
      {/* --- TŁO: Obrazek dla mobile --- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-100 pointer-events-none">
        <img 
          src="/_resources/contactPage/HeroBG.webp" 
          alt="Połączenie" 
          className="w-[150%] max-w-none object-cover origin-center translate-x-[130px] -translate-y-[100px]"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 45%, transparent 100%)'
          }}
        />
      </div>
      
      {/* --- TŁO: Uproszczone niebieskie paski dla mobile --- */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-60 overflow-hidden">
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 100%)' }} />
        <div className="flex-1 border-r border-blue-500/10" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.2) 0%, transparent 70%)' }} />
        <div className="flex-1" style={{ background: 'linear-gradient(to bottom, rgba(59, 144, 255, 0.4) 0%, transparent 30%)' }} />
      </div>

      {/* --- GŁÓWNA ZAWARTOŚĆ --- */}
      <div className="container mx-auto relative z-10 px-4 flex flex-col items-start gap-8"> 
        
        <div className="w-full flex flex-col items-start">
          <h1 className="text-[42px] leading-[1] text-zinc-950 tracking-tighter font-extrabold mt-15">
            Zawsze <br />w kontakcie!
          </h1>
          
          <div className="inline-flex items-center bg-[#D4FF00] text-zinc-950 text-[13px] font-bold px-3 py-1.5 rounded-lg -rotate-[3deg] shadow-lg mt-4 mb-8 border border-black/10 origin-left transform-gpu">
            <span>*Ale nie w tym elektrycznym...</span>
            <img 
              src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/1f602.svg" 
              alt="Śmiejąca się buźka" 
              className="w-4 h-4 ml-1.5 shrink-0" 
            />
          </div>

          <h3 className="text-[20px] font-bold text-zinc-900 mb-6 leading-snug">
            Umów się na 30 minut darmowej konsultacji.<br/>
            Wybierz eksperta:
          </h3>

          {/* LISTA EKSPERTÓW MOBILE */}
          <div className="flex flex-col gap-3 w-full">
            
            {/* Przycisk 1: Patryk */}
            <button 
              onClick={() => openModal('patryk')}
              className="group w-full bg-gradient-to-r from-[#18181b] to-[#27272a] active:scale-[0.98] border border-zinc-700 rounded-full p-2 pr-3 flex items-center transition-transform shadow-lg text-left"
            >
              <div className="w-[46px] h-[46px] rounded-full overflow-hidden border-2 border-zinc-600 shrink-0">
                <img src="/_resources/team/patryk.webp" alt="Patryk Kulesza" className="w-full h-full object-cover" />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="text-white text-[14px] font-bold leading-tight">Patryk Kulesza</h4>
                <p className="text-zinc-400 text-[12px]">Full-stack Dev</p>
              </div>
              <div className="flex flex-col items-end mr-3 shrink-0">
                <span className="text-zinc-300 text-[11px] font-semibold">30 min</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/330px-Google_Meet_icon_%282020%29.svg.png" alt="Google Meet" className="w-3.5 h-3.5 shrink-0 object-contain" />
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-zinc-600 flex items-center justify-center shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            {/* Przycisk 2: Mateusz */}
            <button 
              onClick={() => openModal('mateusz')}
              className="group w-full bg-gradient-to-r from-[#18181b] to-[#27272a] active:scale-[0.98] border border-zinc-700 rounded-full p-2 pr-3 flex items-center transition-transform shadow-lg text-left"
            >
              <div className="w-[46px] h-[46px] rounded-full overflow-hidden border-2 border-zinc-600 shrink-0">
                <img src="/_resources/team/mateusz.webp" alt="Mateusz Malewski" className="w-full h-full object-cover" />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="text-white text-[14px] font-bold leading-tight">Mateusz Malewski</h4>
                <p className="text-zinc-400 text-[12px]">Website Designer</p>
              </div>
              <div className="flex flex-col items-end mr-3 shrink-0">
                <span className="text-zinc-300 text-[11px] font-semibold">30 min</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/330px-Google_Meet_icon_%282020%29.svg.png" alt="Google Meet" className="w-3.5 h-3.5 shrink-0 object-contain" />
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-zinc-600 flex items-center justify-center shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

            {/* Przycisk 3: Bartek */}
            <button 
              onClick={() => openModal('bartek')}
              className="group w-full bg-gradient-to-r from-[#18181b] to-[#27272a] active:scale-[0.98] border border-zinc-700 rounded-full p-2 pr-3 flex items-center transition-transform shadow-lg text-left"
            >
              <div className="w-[46px] h-[46px] rounded-full overflow-hidden border-2 border-zinc-600 shrink-0">
                <img src="/_resources/team/bartek.webp" alt="Bartek Koźluk" className="w-full h-full object-cover" />
              </div>
              <div className="ml-3 flex-1">
                <h4 className="text-white text-[14px] font-bold leading-tight">Bartek Koźluk</h4>
                <p className="text-zinc-400 text-[12px]">Lider Techniczny</p>
              </div>
              <div className="flex flex-col items-end mr-3 shrink-0">
                <span className="text-zinc-300 text-[11px] font-semibold">30 min</span>
                <div className="flex items-center gap-1 mt-0.5">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/330px-Google_Meet_icon_%282020%29.svg.png" alt="Google Meet" className="w-3.5 h-3.5 shrink-0 object-contain" />
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-zinc-600 flex items-center justify-center shrink-0">
                <ChevronRight className="w-3.5 h-3.5 text-white" />
              </div>
            </button>

          </div>
        </div> 
      </div>

      {isModalOpen && (
        <BookingModalMobile 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          expert={selectedExpert} 
        />
      )}
    </section>
  );
}