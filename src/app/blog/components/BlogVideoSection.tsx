'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Youtube, Instagram, Calendar } from 'lucide-react';

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

type InstagramStory = {
  id: string;
  media_type: 'IMAGE' | 'VIDEO';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
};

// Twoje ręcznie dodane filmy
const VIDEOS = [
  {
    id: '1',
    videoId: '_4TJyWuqkUk',
    title: 'Sekrety Stron Biznesowych – Pozyskuj klientów w 2 minuty!',
    description: '🔥 Chcesz, aby Twoja firma wyglądała profesjonalnie w sieci i skutecznie pozyskiwała klientów? W tym wideo eksperci z Whiteslope Studio zdradzają kluczowe sekrety skutecznych stron biznesowych!\n\nW Whiteslope Studio tworzymy indywidualne projekty stron internetowych nastawione na realne wsparcie sprzedaży. Niezależnie od tego, czy potrzebujesz prostej strony wizytówki (Landing Page), czy rozbudowanego portalu biznesowego, dbamy o to, by strona była estetyczna, czytelna i gotowa do pozyskiwania zapytań.\n\nZależy Ci na widoczności lokalnej? Przygotowujemy treści i strukturę strony tak, żeby Twoją firmę było łatwiej znaleźć w Google na zapytania związane z Państwa branżą.\n\nNeed to deep dive into web design and SEO? Odwiedź blog Whiteslope Studio, gdzie publikujemy praktyczne wskazówki pomagające podejmować dobre decyzje projektowe.',
    date: 'Najnowszy film',
    category: 'Web Development',
  }
];

export default function BlogVideoSection() {
  const [media, setMedia] = useState<InstagramMedia[]>([]);
  const [latestStory, setLatestStory] = useState<InstagramStory | null>(null);

  useEffect(() => {
    Promise.all([fetch('/api/instagram'), fetch('/api/instagram/stories')])
      .then(async ([mediaResponse, storiesResponse]) => {
        const [mediaPayload, storiesPayload] = await Promise.all([
          mediaResponse.ok ? mediaResponse.json() : null,
          storiesResponse.ok ? storiesResponse.json() : null,
        ]);

        if (mediaPayload?.success) setMedia(mediaPayload.data.slice(0, 3));
        if (storiesPayload?.success) setLatestStory(storiesPayload.data[0] ?? null);
      })
      .catch(() => undefined);
  }, []);

  return (
    <section id="filmy" className="w-full bg-white py-[64px] md:py-[96px]">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[16px] mb-[32px]">
          <div>
            <div className="flex items-center gap-[10px] mb-[12px]">
              <a
                href={latestStory?.permalink || 'https://www.instagram.com/whiteslopestudio/'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={latestStory ? 'Otwórz najnowszą relację Whiteslope Studio' : 'Otwórz profil Whiteslope Studio na Instagramie'}
                className={`relative block h-[42px] w-[42px] rounded-full p-[2px] ${latestStory ? 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]' : 'bg-zinc-200'}`}
              >
                <span className="block h-full w-full overflow-hidden rounded-full bg-white p-[2px]">
                  {latestStory ? (
                    <img
                      src={latestStory.media_type === 'VIDEO' ? latestStory.thumbnail_url : latestStory.media_url}
                      alt="Najnowsza relacja Whiteslope Studio"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Image
                      src="/_resources/whiteslope%20studio%20literka%20sygnet.png"
                      alt="Whiteslope Studio"
                      width={34}
                      height={34}
                      className="h-full w-full rounded-full object-cover"
                    />
                  )}
                </span>
              </a>
              <span className="text-[14px] font-semibold text-zinc-700">@whiteslopestudio</span>
            </div>
            <h2 className="text-[28px] font-bold text-zinc-950 tracking-tight">Co u nas słychać</h2>
          </div>

          <div className="flex flex-wrap items-center gap-[10px]">
            <a
              href="https://www.youtube.com/@WhiteslopeStudio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] px-[20px] py-[10px] rounded-full bg-black text-white text-[13px] font-semibold hover:bg-zinc-800 transition-all"
            >
              <Youtube className="w-[16px] h-[16px] text-white" />
              Subskrybuj kanał
            </a>
            <a
              href="https://www.instagram.com/whiteslopestudio/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[8px] px-[20px] py-[10px] rounded-full border border-black text-black text-[13px] font-semibold hover:bg-zinc-100 transition-all"
            >
              <Instagram className="w-[16px] h-[16px] text-[#E1306C]" />
              Zaobserwuj nas na IG
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-stretch gap-[12px] md:gap-[20px]">
          {media.map((item) => (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-zinc-100">
                <img
                  src={item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url}
                  alt={item.caption?.slice(0, 120) || 'Najnowszy materiał Whiteslope Studio na Instagramie'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-[10px] top-[10px] inline-flex items-center gap-[5px] rounded-full bg-white/95 px-[8px] py-[5px] text-[10px] font-semibold text-zinc-900 shadow-sm">
                  <Instagram className="h-[12px] w-[12px] text-[#E1306C]" />
                  Instagram
                </span>
                {item.media_type === 'VIDEO' && (
                  <span className="absolute top-[10px] right-[10px] rounded-full bg-black/70 px-[8px] py-[4px] text-[10px] font-semibold text-white">
                    Reel
                  </span>
                )}
              </div>
              <p className="mt-[10px] min-h-[57px] text-[13px] leading-[1.45] text-zinc-600 line-clamp-3">
                {item.caption || 'Najnowszy materiał Whiteslope Studio'}
              </p>
              <div className="flex items-center gap-[5px] mt-[10px] text-[11px] text-zinc-500">
                <Calendar className="w-[12px] h-[12px]" />
                {new Date(item.timestamp).toLocaleDateString('pl-PL')}
              </div>
            </a>
          ))}

          {VIDEOS.map((video) => (
              <div key={video.id} className="group flex h-full min-h-[540px] flex-col sm:col-span-2 lg:col-span-2 lg:min-h-[570px]">

              <div className="w-full aspect-video rounded-[8px] overflow-hidden bg-zinc-900 mb-[16px] shadow-sm shrink-0">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="flex items-center gap-[12px] mb-[12px] text-[12px] font-medium">
                <span className="inline-flex items-center gap-[5px] rounded-full bg-black px-[8px] py-[5px] text-[10px] font-semibold text-white">
                  <Youtube className="h-[12px] w-[12px] text-white" />
                  YouTube
                </span>
                  <span className="text-blue-600 uppercase tracking-wider">
                  {video.category}
                </span>
                <span className="w-[3px] h-[3px] rounded-full bg-zinc-300" />
                <div className="flex items-center gap-[4px] text-zinc-500">
                  <Calendar className="w-[12px] h-[12px]" />
                  <span>{video.date}</span>
                </div>
              </div>

              <h3 className="text-[18px] font-bold text-zinc-950 leading-[1.3] mb-[8px] group-hover:text-blue-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-[14px] text-zinc-600 leading-relaxed line-clamp-3">
                {video.description}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}