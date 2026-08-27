'use client';

import { useEffect, useState } from 'react';
import { Calendar, ExternalLink, Instagram } from 'lucide-react';

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export default function InstagramFeedSection() {
  const [media, setMedia] = useState<InstagramMedia[]>([]);

  useEffect(() => {
    fetch('/api/instagram')
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => {
        if (payload?.success) setMedia(payload.data);
      })
      .catch(() => undefined);
  }, []);

  if (media.length === 0) return null;

  return (
    <section className="w-full bg-white py-[64px] md:py-[96px]">
      <div className="w-full max-w-[1640px] mx-auto px-[24px]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[16px] mb-[32px]">
          <div>
            <h2 className="text-[24px] font-bold text-zinc-950 tracking-tight">Co u nas słychać</h2>
          </div>
          <a
            href="https://www.instagram.com/whiteslopestudio/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[8px] text-[13px] font-semibold text-zinc-900 hover:text-blue-600 transition-colors"
          >
            <Instagram className="w-[16px] h-[16px]" />
            Zobacz cały profil
            <ExternalLink className="w-[14px] h-[14px]" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[12px] md:gap-[20px]">
          {media.map((item) => (
            <a
              key={item.id}
              href={item.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-zinc-800">
                <img
                  src={item.media_type === 'VIDEO' ? item.thumbnail_url : item.media_url}
                  alt={item.caption?.slice(0, 120) || 'Najnowszy materiał Whiteslope Studio na Instagramie'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.media_type === 'VIDEO' && (
                  <span className="absolute top-[10px] right-[10px] rounded-full bg-black/70 px-[8px] py-[4px] text-[10px] font-semibold text-white">
                    Reel
                  </span>
                )}
              </div>
              <p className="mt-[10px] text-[13px] leading-[1.45] text-zinc-600 line-clamp-3">
                {item.caption || 'Najnowszy materiał Whiteslope Studio'}
              </p>
              <div className="flex items-center gap-[5px] mt-[10px] text-[11px] text-zinc-500">
                <Calendar className="w-[12px] h-[12px]" />
                {new Date(item.timestamp).toLocaleDateString('pl-PL')}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
