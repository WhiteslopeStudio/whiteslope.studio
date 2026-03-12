"use client";

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const teamProfiles = [
  {
    name: 'Patryk Kulesza',
    link: 'https://www.linkedin.com/in/patryk-kulesza-788397354/',
    image: '/_resources/patryk.webp',
    description: 'Full Stack Developer z zamiłowaniem do rozwiązań AI. Ma głowę do wszystkiego i świetnie łączy technologię z podejściem produktowym.',
  },
  {
    name: 'Mateusz Malewski',
    link: 'https://www.linkedin.com/in/mateusz-malewski-b0834927b/',
    image: '/_resources/mati.webp',
    description: 'Frontend, kontakt z klientem oraz obszar kreatywny: grafika i video. Łączy komunikację z realizacją i dba o końcowy efekt wizualny.',
  },
  {
    name: 'Bartłomiej Koźluk',
    link: 'https://www.linkedin.com/in/bart%C5%82omiej-ko%C5%BAluk-5a5391266/',
    image: 'https://static.licdn.com/sc/h/244xhbkr7g40x6bsu4gi6q4ry',
    description: 'Dba o jakość i standardy kodu. Pilnuje czytelnej architektury, spójności rozwiązań i profesjonalnego porządku w projekcie.',
  },
  {
    name: 'Daniel Wawrzos',
    link: 'https://www.linkedin.com/in/daniel-wawrzos-34b973338/',
    image: '/_resources/daniel.webp',
    description: 'Web Developer wspierający zespół technicznie i organizacyjnie. Pomaga domykać zadania oraz dba o płynny przebieg pracy nad projektem.',
  },
];

export default function AboutSection() {
  const [activeProfile, setActiveProfile] = useState(teamProfiles[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const edgePaddingPercent = 16;
  const activeProfileIndex = teamProfiles.findIndex((profile) => profile.name === activeProfile.name);

  const goToNextProfile = () => {
    const nextIndex = (activeProfileIndex + 1) % teamProfiles.length;
    setActiveProfile(teamProfiles[nextIndex]);
    setHoveredIndex(nextIndex);
  };

  return (
    <section className="relative py-16 md:py-24 border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-screen min-w-screen h-[88%]">
          <svg className="w-full h-full" viewBox="0 0 1920 640" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <path d="M34 -16 C12 96, 58 198, 30 318 C6 434, 62 540, 26 668" stroke="rgba(148,163,184,0.09)" strokeWidth="0.95" />
            <path d="M96 -18 C120 88, 70 206, 104 320 C130 426, 78 548, 112 666" stroke="rgba(148,163,184,0.07)" strokeWidth="0.82" />
            <path d="M162 -14 C136 104, 196 208, 154 336 C126 446, 184 548, 152 670" stroke="rgba(148,163,184,0.1)" strokeWidth="0.92" />
            <path d="M224 -20 C248 92, 198 214, 232 330 C260 440, 206 546, 236 674" stroke="rgba(148,163,184,0.08)" strokeWidth="0.84" />
            <path d="M286 -12 C260 98, 320 212, 278 332 C248 446, 304 552, 276 672" stroke="rgba(148,163,184,0.09)" strokeWidth="0.9" />
            <path d="M352 -18 C378 90, 328 202, 364 324 C392 434, 338 548, 370 666" stroke="rgba(148,163,184,0.07)" strokeWidth="0.8" />
            <path d="M418 -16 C390 106, 452 220, 406 342 C376 456, 438 560, 404 678" stroke="rgba(148,163,184,0.11)" strokeWidth="0.96" />
            <path d="M484 -20 C510 88, 458 206, 498 322 C530 430, 472 548, 504 668" stroke="rgba(148,163,184,0.08)" strokeWidth="0.82" />
            <path d="M548 -10 C522 102, 582 216, 540 338 C510 450, 570 558, 538 676" stroke="rgba(148,163,184,0.09)" strokeWidth="0.9" />
            <path d="M612 -18 C636 92, 586 210, 620 328 C648 438, 594 550, 626 670" stroke="rgba(148,163,184,0.07)" strokeWidth="0.8" />
            <path d="M678 -12 C650 104, 712 222, 666 344 C636 458, 698 562, 666 680" stroke="rgba(148,163,184,0.1)" strokeWidth="0.94" />
            <path d="M744 -16 C770 90, 718 204, 758 326 C790 432, 732 546, 762 666" stroke="rgba(148,163,184,0.08)" strokeWidth="0.84" />
            <path d="M812 -20 C784 108, 848 226, 800 350 C768 464, 834 564, 802 682" stroke="rgba(148,163,184,0.1)" strokeWidth="0.92" />
            <path d="M878 -14 C902 92, 852 208, 888 326 C916 436, 862 548, 892 670" stroke="rgba(148,163,184,0.07)" strokeWidth="0.8" />
            <path d="M946 -18 C920 104, 980 220, 936 342 C906 454, 966 560, 934 678" stroke="rgba(148,163,184,0.09)" strokeWidth="0.88" />
            <path d="M1012 -12 C1038 90, 986 202, 1024 320 C1054 430, 996 544, 1028 664" stroke="rgba(148,163,184,0.08)" strokeWidth="0.82" />
            <path d="M1078 -16 C1050 108, 1112 226, 1066 350 C1034 462, 1098 566, 1068 684" stroke="rgba(148,163,184,0.1)" strokeWidth="0.94" />
            <path d="M1146 -20 C1170 94, 1118 214, 1156 334 C1188 442, 1130 552, 1160 674" stroke="rgba(148,163,184,0.07)" strokeWidth="0.8" />
            <path d="M1212 -14 C1186 102, 1248 220, 1202 344 C1170 456, 1234 562, 1200 680" stroke="rgba(148,163,184,0.09)" strokeWidth="0.9" />
            <path d="M1278 -18 C1302 88, 1248 206, 1290 324 C1322 434, 1262 548, 1294 668" stroke="rgba(148,163,184,0.08)" strokeWidth="0.82" />
            <path d="M1344 -12 C1318 108, 1380 228, 1334 352 C1304 464, 1368 566, 1336 684" stroke="rgba(148,163,184,0.1)" strokeWidth="0.96" />
            <path d="M1412 -16 C1438 92, 1386 210, 1424 330 C1454 438, 1398 550, 1430 670" stroke="rgba(148,163,184,0.07)" strokeWidth="0.8" />
            <path d="M1478 -20 C1450 104, 1512 222, 1468 346 C1438 458, 1502 564, 1468 682" stroke="rgba(148,163,184,0.09)" strokeWidth="0.9" />
            <path d="M1544 -14 C1568 90, 1516 204, 1554 322 C1584 432, 1528 546, 1560 666" stroke="rgba(148,163,184,0.08)" strokeWidth="0.82" />
            <path d="M1612 -18 C1586 110, 1648 228, 1600 352 C1568 466, 1634 566, 1602 686" stroke="rgba(148,163,184,0.1)" strokeWidth="0.94" />
            <path d="M1678 -12 C1702 92, 1652 212, 1690 332 C1720 440, 1664 550, 1692 672" stroke="rgba(148,163,184,0.07)" strokeWidth="0.8" />
            <path d="M1744 -16 C1716 106, 1778 224, 1734 348 C1702 460, 1766 564, 1734 684" stroke="rgba(148,163,184,0.09)" strokeWidth="0.9" />
            <path d="M1812 -20 C1836 88, 1784 202, 1822 318 C1852 428, 1796 544, 1826 664" stroke="rgba(148,163,184,0.08)" strokeWidth="0.82" />
            <path d="M1878 -14 C1850 108, 1912 226, 1868 350 C1838 464, 1900 566, 1868 686" stroke="rgba(148,163,184,0.1)" strokeWidth="0.95" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
      <div className="mb-10 md:mb-14 flex items-center justify-center lg:justify-start gap-3 md:gap-4">
        <img
          src="/_resources/logoWhiteSlope.webp"
          alt="Whiteslope Studio"
          className="h-7 md:h-11 w-auto object-contain"
        />
        <span className="text-white/45 text-lg md:text-2xl">—</span>
        <h2 className="text-lg md:text-4xl font-semibold text-white">O nas</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.25fr] gap-14 items-start">
        <div>
          <div className="mt-2">
            <div className="w-full max-w-[560px] mx-auto lg:mx-0">
              <div className="relative h-[158px] sm:h-[192px] md:h-[210px] w-full" onMouseLeave={() => setHoveredIndex(null)}>
                {teamProfiles.map((profile, index) => {
                  const baseLeftPercent =
                    edgePaddingPercent +
                    (index / (teamProfiles.length - 1)) * (100 - edgePaddingPercent * 2);
                  let shiftX = 0;

                  if (hoveredIndex !== null && index !== hoveredIndex) {
                    const direction = index < hoveredIndex ? -1 : 1;
                    shiftX = direction * (24 + Math.abs(index - hoveredIndex) * 10);
                  }

                  const isActive = hoveredIndex === index;

                  return (
                    <a
                      key={profile.name}
                      href={profile.link}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                        setActiveProfile(profile);
                      }}
                      className={`absolute top-1/2 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                        isActive
                          ? 'w-[92px] h-[92px] sm:w-[156px] sm:h-[156px] border-blue-300 shadow-[0_10px_34px_rgba(59,130,246,0.3)]'
                          : 'w-[80px] h-[80px] sm:w-[142px] sm:h-[142px] border-white/25 shadow-[0_10px_30px_rgba(0,0,0,0.45)]'
                      }`}
                      style={{
                        left: `${baseLeftPercent}%`,
                        transform: `translate(calc(-50% + ${shiftX}px), -50%)`,
                        zIndex: index === 0 ? 50 : 30 - index,
                      }}
                    >
                      <img
                        src={profile.image}
                        alt={profile.name}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 min-h-[126px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProfile.name}
                    initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -8, filter: 'blur(8px)' }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <p className="text-white font-semibold text-base">{activeProfile.name}</p>
                    <p className="mt-2 text-white/70 text-sm leading-relaxed">{activeProfile.description}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <a
                        href={activeProfile.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-200 text-sm underline underline-offset-4 hover:text-white transition-colors"
                      >
                        Zobacz profil LinkedIn
                      </a>

                      <button
                        type="button"
                        onClick={goToNextProfile}
                        className="text-white/80 text-sm underline underline-offset-4 hover:text-white transition-colors cursor-pointer"
                      >
                        Następny profil →
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="relative mt-6 max-w-3xl">
              <div className="absolute -bottom-24 left-[-26rem] w-[93rem] h-[36rem] rounded-full bg-blue-500/10 blur-[140px] pointer-events-none" />
              <div className="absolute -bottom-18 left-[-10rem] w-[48rem] h-[10rem] rounded-full bg-blue-200/12 blur-[96px] pointer-events-none" />
              <p className="relative z-10 text-white text-2xl md:text-3xl font-semibold leading-snug">
                Whiteslope Studio to 4-osobowy zespół studentów informatyki. Tworzymy nowoczesne projekty webowe w uczciwej&nbsp;cenie.
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 text-white/72 text-sm md:text-base leading-relaxed">
            <div className="space-y-6">
              <p>
                Zaczęliśmy od jednego, prostego przekonania: małe firmy i młodzi przedsiębiorcy zasługują na taką samą jakość stron, jak duże marki.
              </p>
              <p>
                Dla nas technologia nie jest celem samym w sobie. Ma pomagać ludziom działać szybciej, skuteczniej i spokojniej.
              </p>
              <p>
                Każdy projekt traktujemy jak wspólną drogę – od&nbsp;pomysłu, przez realizację, aż po wsparcie po wdrożeniu.
              </p>
            </div>

            <div className="space-y-6">
              <p>
                Powstaliśmy, bo widzieliśmy ten sam problem: wysokie ceny, długie terminy i kontakt przez pośredników zamiast bezpośrednio z twórcami.
              </p>
              <p>
                U nas rozmawiasz z zespołem technicznym. Jasno ustalamy zakres, terminy i budżet – bez&nbsp;ukrytych kosztów i bez zbędnej komplikacji.
              </p>
              <p>
                Chcemy budować rozwiązania, które realnie pomagają firmom rosnąć i wyglądać profesjonalnie w sieci od pierwszego dnia.
              </p>
            </div>
          </div>

          <div className="relative mt-10 max-w-[560px] text-left lg:text-right lg:ml-auto">
            <div className="absolute -bottom-20 right-[-18rem] w-[46rem] h-[19rem] rounded-full bg-blue-500/10 blur-[132px] pointer-events-none" />
            <div className="absolute -bottom-18 right-[-8rem] w-[26rem] h-[9rem] rounded-full bg-violet-200/12 blur-[88px] pointer-events-none" />
            <p className="relative z-10 text-white/88 text-lg md:text-2xl font-medium leading-relaxed">
              To nasze firmowe powołanie: łączyć jakość, szybkość&nbsp;i&nbsp;uczciwe&nbsp;zasady&nbsp;współpracy.
              <Link href="#kontakt-brief" className="underline underline-offset-4 ml-2 text-blue-300 hover:text-blue-400 transition-colors">
                <br/>Rozpocznij współpracę
              </Link>
            </p>
          </div>
        </div>
      </div>

      </div>
    </section>
  );
}
