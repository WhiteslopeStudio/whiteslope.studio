'use client';

import { colors, headingStyle } from './theme';

// Sekcja wyglądająca tak samo jak StatementSection (ten sam styl nagłówka, białe tło),
// ale bez paragrafu pod spodem - sam heading. Umieszczona po sekcji Magdy.
export default function MeetTeamSection() {
  return (
    <section
      className="py-10 px-8 md:px-12 lg:px-36 flex flex-col items-center text-center"
      style={{ backgroundColor: colors.black }}
    >
      <h2
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal max-w-4xl leading-[0.95]"
        style={{ ...headingStyle, color: colors.white }}
      >
        Poznajcie naszych sprawdzonych twórców
      </h2>
    </section>
  );
}
