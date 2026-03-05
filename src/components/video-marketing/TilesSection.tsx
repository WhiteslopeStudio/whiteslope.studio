'use client';

import { Check, ArrowRight } from 'lucide-react';
import { colors, fonts, headingStyle, ctaBaseClass } from './theme';

type Tile = {
  label: string;
  heading: string;
  items: string[];
  bg: string;
  textColor: string;
  itemsColor: string;
  checkBg: string;
  checkColor: string;
  ctaBg: string;
  ctaText: string;
};

const tiles: Tile[] = [
  {
    label: 'Na Twoją stronę:',
    heading: 'Film, który mówi więcej niż tysiąc słów.',
    items: [
      'Profesjonalne ujęcia zespołu i miejsca',
      'Historia marki budująca zaufanie',
      'Gotowy materiał na hero section strony',
      'Trwały content, który działa latami',
    ],
    bg: colors.offWhite,
    textColor: colors.black,
    itemsColor: '#111111',
    checkBg: colors.black,
    checkColor: colors.white,
    ctaBg: colors.black,
    ctaText: colors.white,
  },
  {
    label: 'Na social media:',
    heading: 'Rolki, które zatrzymują scrollowanie.',
    items: [
      'Dynamiczny montaż z motion graphics',
      'Format 9:16 pod Reels i TikTok',
      'Napisy, muzyka, efekty w pakiecie',
      'Regularny kalendarz publikacji',
    ],
    bg: colors.black,
    textColor: colors.white,
    itemsColor: colors.offWhite,
    checkBg: colors.white,
    checkColor: colors.black,
    ctaBg: colors.white,
    ctaText: colors.black,
  },
  {
    label: 'Dla konwersji:',
    heading: 'Autentyczny UGC, który sprzedaje.',
    items: [
      'Naturalne recenzje i unboxingi',
      'Twórcy dopasowani do Twojej branży',
      'Gotowe materiały do reklam Meta/TikTok',
      'Wyższy CTR bez sztucznych kreacji',
    ],
    bg: colors.neonPink,
    textColor: colors.white,
    itemsColor: colors.white,
    checkBg: colors.white,
    checkColor: colors.neonPink,
    ctaBg: colors.white,
    ctaText: colors.neonPink,
  },
  {
    label: 'Post-produkcja:',
    heading: 'Montaż, który przykuwa wzrok.',
    items: [
      'Dynamiczne cięcia i przejścia',
      'Motion graphics i napisy',
      'Muzyka i sound design w pakiecie',
      'Format 9:16, 1:1, 16:9 jednocześnie',
    ],
    bg: colors.ultrasonicBlue,
    textColor: colors.white,
    itemsColor: colors.white,
    checkBg: colors.gold,
    checkColor: colors.black,
    ctaBg: colors.gold,
    ctaText: colors.black,
  },
];

export default function TilesSection() {
  return (

    
    <section className="w-full bg-black pt-16 md:pt-20 pb-6 px-4 md:px-6">
        {/* --- Czysty, wyśrodkowany nagłówek --- */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-24">
        <h2 
          className="text-2xl md:text-3xl xl:text-3xl font-normal tracking-tight uppercase"
          style={{ ...headingStyle, color: colors.white }}
        >
          Wybierz <span style={{ color: colors.neonPink }}>typ filmu:</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        {tiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-3xl flex flex-col p-8 md:p-10 min-h-[520px]"
            style={{ backgroundColor: tile.bg }}
          >
            {/* Label */}
            <p
              className="font-bold text-sm font-medium tracking-[0.14em] mb-4"
              style={{ fontFamily: fonts.cta, color: tile.textColor, opacity: 0.9 }}
            >
              {tile.label}
            </p>

            {/* Heading */}
            <h2
              className="text-3xl md:text-4xl xl:text-5xl font-normal leading-[0.95] mb-10"
              style={{ ...headingStyle, color: tile.textColor }}
            >
              {tile.heading}
            </h2>

            {/* Items */}
            <ul className="font-bold flex-1 flex flex-col divide-y" style={{ borderColor: `${tile.textColor}20` }}>
              {tile.items.map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between gap-4 py-3.5"
                >
                  <span
                    className="text-xs uppercase tracking-[0.12em] leading-snug"
                    style={{ fontFamily: fonts.cta, color: tile.itemsColor }}
                  >
                    {item}
                  </span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: tile.checkBg }}
                  >
                    <Check size={13} strokeWidth={3} color={tile.checkColor} />
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="#brief"
              className={`${ctaBaseClass} w-full justify-center mt-8`}
              style={{
                backgroundColor: tile.ctaBg,
                color: tile.ctaText,
                fontFamily: fonts.cta,
                boxShadow: 'none',
              }}
            >
              Zacznij teraz
              <ArrowRight size={18} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
