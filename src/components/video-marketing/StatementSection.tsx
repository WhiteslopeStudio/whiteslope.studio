'use client';

import Image from 'next/image';
import { colors, fonts, headingStyle } from './theme';

export default function StatementSection() {
  return (
    <section
      className="py-24md:py-32 px-8 md:px-12 lg:px-36 flex flex-col items-center text-center"
      style={{ backgroundColor: colors.white }}
    >
      <Image
        src="/_resources/whiteslope studio literka sygnet2.png"
        alt="WhiteSlope Studio"
        width={72}
        height={72}
        className="mb-10"
        style={{ filter: 'brightness(0) saturate(100%) invert(42%) sepia(93%) saturate(500%) hue-rotate(195deg) brightness(110%)' }}
      />

      <h2
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal max-w-4xl leading-[0.95]"
        style={{ ...headingStyle, color: colors.black }}
      >
        Wideo, które przyciąga.
        Kontent, który sprzedaje.
      </h2>

      <h3
        className="mt-8 mb-50 text-lg md:text-xl lg:text-2xl font-medium max-w-2xl leading-relaxed"
        style={{ fontFamily: fonts.body, color: `${colors.black}b3` }}
      >
        Filmy i tworzenie kontentu to potężne narzędzie do zwiększania ruchu i zaufania Twojej marki.
      </h3>
    </section>
  );
}
