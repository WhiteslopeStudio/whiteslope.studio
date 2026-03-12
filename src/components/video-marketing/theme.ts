/**
 * VIDEO MARKETING — Design System
 * Jeden plik z tokenami dla wszystkich sekcji tej podstrony.
 * Każda sekcja importuje to co potrzebuje i używa gotowych presetów.
 */

// ─── KOLORY ──────────────────────────────────────────────────────────────────

export const colors = {
  // brand
  ultrasonicBlue: '#560BAD',
  indigoBloom:    '#7209B7',
  neonPink:       '#F72585',
  gold:           '#f5fd00',

  // neutrals
  black:          '#000000',
  white:          '#ffffff',
  offWhite:       '#f0f0f0',

  // tła sekcji — każda sekcja ma swój bg
  sectionBg: {
    hero:        '#f5fd00',   // gold — jasna, żywa
    ugc:         '#0d0d0d',   // prawie czarny
    process:     '#560BAD',   // ultrasonicBlue
    portfolio:   '#000000',   // czarny
    pricing:     '#7209B7',   // indigoBloom
    cta:         '#F72585',   // neonPink — mocne zamknięcie
  },
} as const;

// ─── CZCIONKI ────────────────────────────────────────────────────────────────

export const fonts = {
  /** Nagłówki H1 — charakterna, kondensowana */
  heading: '"Incised901", "Barlow Condensed", serif',

  /** Podtytuły, body copy */
  body: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',

  /** Przyciski CTA, etykiety, tagi */
  cta: '"DM Mono", "Fira Code", "IBM Plex Mono", monospace',
} as const;

// ─── STYLE H1 ────────────────────────────────────────────────────────────────

/** Gotowe wartości CSS do spreadu w style={{ }} na każdym <h1> */
export const headingStyle: React.CSSProperties = {
  fontFamily:    fonts.heading,
  letterSpacing: '-0.015em',
  lineHeight:    0.9,
};

// ─── PRESET CTA ──────────────────────────────────────────────────────────────

/**
 * Definicja CTA dla każdej sekcji.
 * primary  — główny przycisk (pełne tło)
 * secondary — opcjonalny drugi przycisk (outline / ghost)
 */
export type CtaVariant = {
  label:    string;
  href?:    string;
  bgColor:  string;
  textColor: string;
  border?:  string;
};

export const sectionCtas: Record<string, { primary: CtaVariant; secondary?: CtaVariant }> = {
  hero: {
    primary: {
      label:     'Rozpocznij Projekt',
      href:      '#brief',
      bgColor:   colors.neonPink,
      textColor: colors.white,
    },
    secondary: {
      label:     'Aplikuj jako Twórca UGC',
      href:      '/contact?tab=question',
      bgColor:   colors.black,
      textColor: colors.white,
      border:    `2px solid ${colors.black}`,
    },
  },

  ugc: {
    primary: {
      label:     'Zobacz przykłady UGC',
      href:      '#portfolio',
      bgColor:   colors.gold,
      textColor: colors.black,
    },
  },

  process: {
    primary: {
      label:     'Jak to działa?',
      href:      '#process',
      bgColor:   colors.white,
      textColor: colors.ultrasonicBlue,
    },
  },

  portfolio: {
    primary: {
      label:     'Zobacz więcej realizacji',
      href:      '/projects',
      bgColor:   colors.neonPink,
      textColor: colors.white,
    },
  },

  pricing: {
    primary: {
      label:     'Wybierz pakiet',
      href:      '#brief',
      bgColor:   colors.gold,
      textColor: colors.black,
    },
    secondary: {
      label:     'Bezpłatna konsultacja',
      href:      '/contact?tab=meeting',
      bgColor:   'transparent',
      textColor: colors.white,
      border:    `2px solid ${colors.white}`,
    },
  },

  cta: {
    primary: {
      label:     'Zacznijmy współpracę',
      href:      '#brief',
      bgColor:   colors.black,
      textColor: colors.white,
    },
    secondary: {
      label:     'Napisz do nas',
      href:      '/contact',
      bgColor:   'transparent',
      textColor: colors.black,
      border:    `2px solid ${colors.black}`,
    },
  },
};

// ─── KLASY CTA (Tailwind) ─────────────────────────────────────────────────────

/**
 * Bazowe klasy Tailwind wspólne dla każdego przycisku CTA na tej podstronie.
 * Używaj razem z inline style dla bgColor / textColor.
 */
export const ctaBaseClass =
  'inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base uppercase tracking-[0.08em] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl whitespace-nowrap select-none';

export const ctaSecondaryBaseClass =
  'inline-flex items-center gap-3 px-7 py-4 rounded-full font-medium text-base cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap select-none';
