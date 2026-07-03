'use client';

import React from 'react';
import { Youtube, Calendar } from 'lucide-react';

// Twoje ręcznie dodane filmy
const VIDEOS = [
  {
    id: '1',
    videoId: '_4TJyWuqkUk',
    title: 'Sekrety Stron Biznesowych – Pozyskuj klientów w 2 minuty!',
    description: '🔥 Chcesz, aby Twoja firma wyglądała profesjonalnie w sieci i skutecznie pozyskiwała klientów? W tym wideo eksperci z Whiteslope Studio zdradzają kluczowe sekrety skutecznych stron biznesowych! Tworzymy indywidualne projekty nastawione na realne wsparcie sprzedaży i widoczność lokalną w Google.',
    date: 'Najnowszy wpis wideo',
    category: 'Web Development',
  },
  {
    id: '2',
    videoId: 'nGAbHUE1eyI',
    title: 'Wsparcie po wdrożeniu strony? TAK! ✅',
    description: 'Szkolenie z obsługi strony oraz natychmiastowa pomoc w razie problemów. Whiteslope Studio - strony internetowe dla Twojej firmy 🚀 Zobacz, jak wygląda nasza opieka po starcie projektu.',
    date: 'Shorts',
    category: 'Obsługa Klienta',
  }
];

export default function BlogVideoSection() {
  return (
    // id="filmy" pozwala na poprawne działanie przycisku w sekcji Hero
    <section id="filmy" className="w-full bg-white  border-t border-zinc-100 pt-[80px]">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[16px] mb-[48px]">
          <h2 className="text-[24px] font-bold text-zinc-950 tracking-tight">
            Filmy
          </h2>
          
          <a 
            href="https://www.youtube.com/@WhiteslopeStudio" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-[8px] px-[20px] py-[10px] rounded-full bg-zinc-50 border border-zinc-200 text-zinc-900 text-[13px] font-semibold hover:bg-zinc-100 hover:border-zinc-300 transition-all shadow-sm group"
          >
            <Youtube className="w-[16px] h-[16px] text-[#FF0000] group-hover:scale-110 transition-transform" /> 
            Subskrybuj kanał
          </a>
        </div>

        {/* --- GRID FILMÓW --- */}
        {/* Na desktopie dajemy max 2 kolumny, bo filmy potrzebują więcej przestrzeni niż artykuły */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[48px]">
          {VIDEOS.map((video) => (
            <div key={video.id} className="group flex flex-col">
              
              {/* Odtwarzacz YouTube (Format 16:9, zaokrąglenie 6px) */}
              <div className="w-full aspect-video rounded-[6px] overflow-hidden bg-zinc-900 mb-[16px] shadow-sm">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Metadane (Data i Kategoria) stylizowane jak w blogu */}
              <div className="flex items-center gap-[12px] mb-[12px] text-[12px] font-medium">
                <span className="text-black uppercase tracking-wider">
                  {video.category}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-zinc-300" />
                <div className="flex items-center gap-[4px] text-zinc-500">
                  <Calendar className="w-[12px] h-[12px]" />
                  <span>{video.date}</span>
                </div>
              </div>

              {/* Tytuł i krótki opis */}
              <h3 className="text-[18px] font-bold text-zinc-950 leading-[1.3] mb-[8px] group-hover:text-black transition-colors">
                {video.title}
              </h3>
              <p className="text-[14px] text-zinc-500 leading-relaxed line-clamp-3">
                {video.description}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}