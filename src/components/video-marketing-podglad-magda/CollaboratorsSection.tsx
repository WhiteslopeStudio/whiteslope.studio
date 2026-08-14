'use client';

import { useState } from 'react';
import { colors, fonts } from './theme';

const collaborators = [
  {
    id: 'damian',
    name: 'Damian',
    image: '/_resources/videoMarketing/Damian.webp',
    initial: 'D',
    link: 'https://www.instagram.com/damian_bogdanowicz/',
  },
  {
    id: 'mateusz',
    name: 'Mateusz',
    image: '/_resources/videoMarketing/Mati.webp',
    initial: null,
    link: 'https://www.instagram.com/mateusz.malewski.10/',
  },

  {
    id: 'magda',
    name: 'Magda',
    image: '/_resources/videoMarketing/magda/MAGDA_PERSON.webp',
    initial: 'M',
    link: 'https://www.instagram.com/magdajzkv/',
  },
];

export default function CollaboratorsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const darkText = '#1A1A1A';
  const grayText = '#666666';
  const lightBorder = '#E5E5E5';

  return (
    <section
      className="relative pt-14 md:pt-20 pb-20 md:pb-28 overflow-hidden"
      style={{ backgroundColor: colors.white }}
    >
      <div className="px-4 md:px-8 lg:px-16 max-w-3xl mx-auto relative z-10 flex flex-col items-center text-center">

        {/* Logo + label */}
        <div className="mb-8 flex items-center gap-3">
          <img
            src="/_resources/videoMarketing/whiteslopeStudioLogoNiebieski_dzialFilmowy_czarne.png"
            alt="WhiteSlope Studio"
            className="h-12 md:h-15 w-auto object-contain"
          />

        </div>

        {/* Opis */}
        <p
          className="text-sm md:text-base leading-relaxed max-w-lg mb-10"
          style={{ fontFamily: fonts.body, color: grayText }}
        >
          <span
            className="text-xl md:text-base font-semibold"
            style={{ color: darkText, fontFamily: fonts.heading }}
          >
            Nasz Dział VIDEO {"- "}
          </span>
          Kręcimy, montujemy i tworzymy content UGC. Poznaj ekipę, z którą to robimy
        </p>

        {/* Avatary jako linki */}
        <div
          className="flex justify-center items-center gap-4 md:gap-6"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {collaborators.map((person, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <a
                key={person.id}
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHoveredIndex(index)}
                className="rounded-full overflow-hidden border-2 transition-all duration-300 cursor-pointer block"
                style={{
                  width: '80px',
                  height: '80px',
                  borderColor: isHovered ? colors.neonPink : lightBorder,
                  transform: `scale(${isHovered ? 1.15 : 1})`,
                  boxShadow: isHovered
                    ? `0 12px 24px ${colors.neonPink}33`
                    : '0 4px 12px rgba(0,0,0,0.08)',
                }}
              >
                {person.image ? (
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-xl font-bold select-none"
                    style={{
                      backgroundColor: isHovered ? `${colors.neonPink}10` : '#F9F9F9',
                      color: isHovered ? colors.neonPink : darkText,
                      fontFamily: fonts.body,
                      transition: 'all 0.3s',
                    }}
                  >
                    {person.initial}
                  </div>
                )}
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}
