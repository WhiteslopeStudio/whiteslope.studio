'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { colors, fonts, headingStyle, ctaBaseClass } from './theme';

type VideoItem = {
  id: string;
  label: string;
  description: string;
  type: 'youtube' | 'mp4';
  src: string;
};

const videos: VideoItem[] = [
  {
    id: 'reklama-social-media',
    label: 'Reklama social media',
    description: 'Profesjonalne nagrania, które zwiększają CTR i konwersję w reklamach.',
    type: 'youtube',
    src: 'https://www.youtube.com/embed/nGAbHUE1eyI?autoplay=1&mute=1&controls=0&loop=1&playlist=nGAbHUE1eyI',
  },
  {
    id: 'reklama-social-media-2',
    label: 'Reklama social media',
    description: 'Profesjonalne nagrania, które zwiększają CTR i konwersję w reklamach.',
    type: 'mp4',
    src: '/_resources/videoMarketing/VoucheryNagranie.mp4',
  },
  {
    id: 'film-firmowy-2',
    label: 'Film dokumentalny',
    description: 'Zaprezentuj historię swojej marki w formie dokumentalnej — buduj zaufanie i zwiększ engagemenet.',
    type: 'mp4',
    src: '/_resources/videoMarketing/WieslawskiStudioFilm.mp4',

  },
  {
    id: 'film-3D',
    label: 'Film 3D',
    description: 'Zachwyć klientów efektownym filmem 3D — idealny do hero section i prezentacji produktów.',
    type: 'mp4',
    src: '/_resources/videoMarketing/HertzCompressor.mp4',

  }
];

export default function VideoShowcaseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const active = videos[activeIndex];
  const next = () => setActiveIndex((i) => (i + 1) % videos.length);

  // When switching to mp4 tab, restart video — force mute via DOM ref (React muted prop unreliable)
  useEffect(() => {
    if (active.type === 'mp4' && videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex, active.type]);

  return (
    <section
      className="w-full py-20 md:py-28 px-4 md:px-6 overflow-x-clip"
      style={{ backgroundColor: colors.black }}
    >
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start w-full">

        {/* ── Left menu / Mobile buttons ── */}
        <div className="flex-shrink-0 w-full lg:w-72 order-2 lg:order-1 flex flex-col gap-2">
          <p
            className="text-xs uppercase tracking-[0.18em] mb-4"
            style={{ fontFamily: fonts.cta, color: `${colors.white}55` }}
          >
            Wybierz rodzaj:
          </p>

          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible -mx-4 px-4 lg:mx-0 lg:px-0">
            {videos.map((v, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="flex-shrink-0 lg:flex-shrink text-left px-5 py-4 rounded-2xl transition-all duration-300 cursor-pointer min-w-max lg:min-w-full"
                  style={{
                    backgroundColor: isActive ? colors.gold : `${colors.white}08`,
                    border: `1px solid ${isActive ? colors.gold : `${colors.white}12`}`,
                  }}
                >
                  <p
                    className="font-normal text-xl leading-tight whitespace-nowrap"
                    style={{
                      ...headingStyle,
                      color: isActive ? colors.black : colors.white,
                    }}
                  >
                    {v.label}
                  </p>
                  {isActive && (
                    <p
                      className="mt-2 text-sm leading-snug hidden lg:block"
                      style={{ fontFamily: fonts.body, color: `${colors.black}bb` }}
                    >
                      {v.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          {/* Next + mobile CTA */}
          <div className="mt-4 flex flex-col items-start gap-3 self-start">
              <button
              type="button"
              onClick={next}
              className="flex items-center gap-2 px-5 py-3 rounded-full cursor-pointer transition-all duration-300 hover:opacity-80"
              style={{
                backgroundColor: `${colors.white}10`,
                border: `1px solid ${colors.white}20`,
                fontFamily: fonts.cta,
                color: colors.white,
                fontSize: '0.75rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              NASTĘPNY
              <ArrowRight size={14} />
            </button>

          </div>
        </div>

        {/* ── Video player ── */}
        <div className="flex-1 w-full order-1 lg:order-2">
          <div
            className="relative w-full overflow-hidden rounded-3xl bg-black"
            style={{ aspectRatio: '16/9' }}
          >
            {active.type === 'youtube' ? (
              <iframe
                key={active.id}
                src={active.src}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ border: 'none' }}
              />
            ) : (
              <video
                key={active.id}
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                onEnded={next}
                onError={(e) => console.error('Video error:', active.id, (e.currentTarget as HTMLVideoElement).error)}
              >
                <source src={active.src} type="video/mp4" />
              </video>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center lg:justify-between mt-6">
            <div className="flex items-center gap-2">
              {videos.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className="cursor-pointer transition-all duration-300 rounded-full"
                  style={{
                    width: i === activeIndex ? '2rem' : '0.5rem',
                    height: '0.5rem',
                    backgroundColor: i === activeIndex ? colors.gold : `${colors.white}30`,
                  }}
                  aria-label={v.label}
                />
              ))}
            </div>
            <div className="hidden lg:block">
              <a
                href="#brief"
                className={ctaBaseClass}
                style={{
                  backgroundColor: colors.neonPink,
                  color: colors.white,
                  fontFamily: fonts.cta,
                }}
              >
                Zamów realizację
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
