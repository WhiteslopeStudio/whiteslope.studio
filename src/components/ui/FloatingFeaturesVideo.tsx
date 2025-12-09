'use client';

import { Star } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface FloatingFeaturesVideoProps {
  features: Feature[];
  videoSrc: string;
  videoPoster: string;
}

const FloatingFeaturesVideo = ({ features, videoSrc, videoPoster }: FloatingFeaturesVideoProps) => {
  const positions = [
    { top: '8%', left: '15%' },
    { top: '20%', right: '18%' },
    { bottom: '35%', left: '12%' },
    { top: '45%', right: '15%' },
    { bottom: '18%', left: '16%' },
    { bottom: '10%', right: '20%' },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = e.currentTarget.querySelectorAll('[data-floating-card]');
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cards.forEach((card) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const deltaX = cardCenterX - x;
      const deltaY = cardCenterY - y;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 300;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const moveX = (deltaX / distance) * force * 30;
        const moveY = (deltaY / distance) * force * 30;

        (card as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
      } else {
        (card as HTMLElement).style.transform = 'translate(0, 0)';
      }
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = e.currentTarget.querySelectorAll('[data-floating-card]');
    cards.forEach((card) => {
      (card as HTMLElement).style.transform = 'translate(0, 0)';
    });
  };

  return (
    <>
      {/* Desktop: filmik z gwiazdkami */}
      <div
        className="relative flex justify-center items-center min-h-[600px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Filmik na środku */}
        <video
          src={videoSrc}
          controls
          poster={videoPoster}
          className="rounded-2xl shadow-xl w-full max-w-sm bg-black relative z-10"
          style={{ aspectRatio: '9/16' }}
        />

        {/* Gwiazdki rozrzucone po bokach - większe i nachodzące */}
        {features.map((feature, index) => {
          const position = positions[index % positions.length];

          return (
            <div
              key={index}
              data-floating-card
              className="absolute hidden lg:flex items-start gap-4 bg-black/70 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md hover:bg-black/85 hover:border-white/30 hover:scale-105 shadow-2xl"
              style={{
                ...position,
                transition: 'transform 0.3s ease-out, background-color 0.3s, border-color 0.3s, scale 0.3s',
                zIndex: 20,
              }}
            >
              <div className="w-12 h-12 bg-[#fd9f91]/20 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-[#fd9f91]" />
              </div>
              <div>
                <h3 className="font-medium text-white text-base mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Wersja mobilna - lista pod filmem */}
      <div className="lg:hidden mt-8 space-y-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-white/5 rounded-xl border border-white/10"
          >
            <div className="w-8 h-8 bg-[#fd9f91]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Star className="w-4 h-4 text-[#fd9f91]" />
            </div>
            <div>
              <h3 className="font-medium text-white text-sm mb-1">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingFeaturesVideo;
