'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Users,
  LayoutDashboard,
  Brain,
  MessageSquare,
  TrendingUp,
  CalendarCheck,
} from 'lucide-react';

// ─── Typy danych ──────────────────────────────────────────────────────────────
type Segment = { t: string; h?: boolean };

type ShowcaseArea = {
  id: number;
  icon: LucideIcon;
  title: string;
  details: Segment[];
};

// ─── Renderowanie podświetleń (Highlight) ──────────────────────────────────────
function RichText({ segments }: { segments: Segment[] }) {
  return (
    <>
      {segments.map((s, i) =>
        s.h ? (
          <span key={i} className="text-purple-300 font-medium tracking-wide drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">
            {s.t}
          </span>
        ) : (
          <span key={i} className="opacity-95">{s.t}</span>
        )
      )}
    </>
  );
}

// ─── Baza Danych ──────────────────────────────────────────────────────────────
const SHOWCASE_AREAS: ShowcaseArea[] = [
  {
    id: 1,
    icon: Users,
    title: 'Automatyzacja w rekrutacji i HR',
    details: [
      { t: 'Automatyzujemy powtarzalne etapy rekrutacji: ' },
      { t: 'filtrowanie CV', h: true },
      { t: ', wysyłkę maili do kandydatów, ' },
      { t: 'onboarding dokumentów', h: true },
      { t: ' i powiadomienia managerów. Twój dział HR skupia się na ludziach, ' },
      { t: 'nie na klikaniu', h: true },
      { t: '.' },
    ],
  },
  {
    id: 2,
    icon: LayoutDashboard,
    title: 'Automatyzacja w dashboardach i danych',
    details: [
      { t: 'Łączymy rozproszone dane w jeden ' },
      { t: 'inteligentny dashboard', h: true },
      { t: '. Koniec z ręcznym przepisywaniem z excela. Twoje wyniki odświeżają się ' },
      { t: 'na żywo', h: true },
      { t: ', dając Ci pełną kontrolę nad biznesem.' },
    ],
  },
  {
    id: 3,
    icon: Brain,
    title: 'Automatyzacja i AI',
    details: [
      { t: 'Integrujemy ' },
      { t: 'sztuczną inteligencję', h: true },
      { t: ' tam, gdzie standardowe reguły nie wystarczają. AI podejmuje złożone decyzje, kategoryzuje maile i działa jak ' },
      { t: 'Twój najlepszy analityk', h: true },
      { t: '.' },
    ],
  },
  {
    id: 4,
    icon: MessageSquare,
    title: 'Automatyzacja w obsłudze klienta',
    details: [
      { t: 'Inteligentne boty przejmują ' },
      { t: '80% powtarzalnych pytań', h: true },
      { t: '. Twój zespół wkracza do akcji tylko wtedy, gdy sprawa ' },
      { t: 'wymaga empatii', h: true },
      { t: ' i ludzkiego podejścia.' },
    ],
  },
  {
    id: 5,
    icon: TrendingUp,
    title: 'Automatyzacja w sprzedaży i marketingu',
    details: [
      { t: 'Błyskawicznie chwytamy leady z każdego źródła. System sam wysyła ' },
      { t: 'spersonalizowane oferty', h: true },
      { t: ' i przypomnienia. Sprzedaż toczy się ' },
      { t: 'automatycznie 24/7', h: true },
      { t: '.' },
    ],
  },
  {
    id: 6,
    icon: CalendarCheck,
    title: 'Automatyczna rezerwacja wizyt',
    details: [
      { t: 'Klienci rezerwują terminy online, a system sam dba o ' },
      { t: 'potwierdzenia SMS', h: true },
      { t: ' i zaliczki. Idealne dla lekarzy, salonów i korepetytorów. ' },
      { t: 'Zero pustych przebiegów', h: true },
      { t: '.' },
    ],
  },
];

type Seg = { t: string; h?: boolean };
function RichDesc({ parts }: { parts: Seg[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.h ? <span key={i} className="text-violet-300 font-semibold">{p.t}</span>
             : <span key={i}>{p.t}</span>
      )}
    </>
  );
}

const BENEFITS: { label: string; parts: Seg[] }[] = [
  {
    label: 'Więcej czasu',
    parts: [{ t: 'Automatyzujemy ' }, { t: 'nudne i powtarzalne', h: true }, { t: ' zadania.' }],
  },
  {
    label: 'Mniej błędów',
    parts: [{ t: 'Systemy ' }, { t: 'nie mylą się', h: true }, { t: ' przy przepisywaniu danych.' }],
  },
  {
    label: 'Szybszy rozwój',
    parts: [{ t: 'Skupiasz się na ' }, { t: 'biznesie', h: true }, { t: ', a nie na papierkowej robocie.' }],
  },
];

// ─── Style Premium - Laser Glow ──────────────────────────────────────────────
const LASER_SPINE_GLOW = { 
  boxShadow: '0 0 6px #fff, 0 0 12px #fff, 0 0 25px #8b5cf6, 0 0 40px #8b5cf6, 0 0 55px #a78bfa, 0 0 70px #a78bfa',
  transition: 'box-shadow 0.4s ease-in-out'
};

const ACTIVE_LASER_GLOW = {
  boxShadow: '0 0 8px #fff, 0 0 16px #fff, 0 0 30px #a78bfa, 0 0 45px #8b5cf6, 0 0 60px #7c3aed, 0 0 80px #7c3aed',
};

// ─── Konfiguracja Układu (Math) ───────────────────────────────────────────────
const TILE_HEIGHT = 80;
const TILE_GAP = 16;
const OVERLAY_HEIGHT = 5 * TILE_HEIGHT + 4 * TILE_GAP; 

// ─── Główny Komponent Prawej Strony ───────────────────────────────────────────
function InteractiveShowcase() {
  const router = useRouter();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [items, setItems] = useState<ShowcaseArea[]>([...SHOWCASE_AREAS]);
  const [isAnimating, setIsAnimating] = useState(false);

  // SEKWENCYJNY PRZELOT W GÓRĘ
  const handleToggle = async (id: number) => {
    if (isAnimating) return; 

    if (activeId === id) {
      // ─── ZAMYKANIE: Płynne znikanie overleya, potem zjazd kafelków ───
      setIsAnimating(true);
      setActiveId(null); 

      setTimeout(() => {
        setItems([...SHOWCASE_AREAS]); 
        setTimeout(() => setIsAnimating(false), 600);
      }, 300);

    } else {
      // ─── OTWIERANIE: Kliknięty kafelek leci do góry razem ze swoją kropką! ───
      setIsAnimating(true);
      setActiveId(null); 

      const currentIndex = items.findIndex(item => item.id === id);
      if (currentIndex === -1) { setIsAnimating(false); return; }

      if (currentIndex === 0) {
        setActiveId(id);
        setIsAnimating(false);
        return;
      }

      const stepDelay = 120; 

      for (let i = currentIndex; i > 0; i--) {
        await new Promise(resolve => setTimeout(resolve, stepDelay));
        
        setItems(prev => {
          const newItems = [...prev];
          [newItems[i], newItems[i - 1]] = [newItems[i - 1], newItems[i]];
          return newItems;
        });
      }

      await new Promise(resolve => setTimeout(resolve, stepDelay)); 
      setActiveId(id);
      setIsAnimating(false);
    }
  };

  return (
    <div className="relative w-full flex min-h-[600px]">
      
      {/* STATYCZNY TOR LASERA (Sama pionowa linia, po której jeżdżą kropki) */}
      <div 
        className="absolute left-[31px] top-[40px] bottom-[40px] w-[2px] rounded-full bg-violet-100 z-0"
        style={LASER_SPINE_GLOW}
      >
        <div className="absolute inset-0 bg-violet-400 animate-pulse opacity-60 rounded-full" />
      </div>

      {/* JEDNA KOLUMNA - Kafelki mają teraz wbudowane kropki */}
      {/* pl-[64px] robi miejsce na szerokość lasera z lewej strony kafelka */}
      <div className="flex-1 flex flex-col relative z-10 pl-[64px]" style={{ gap: `${TILE_GAP}px` }}>
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <motion.div
              layout 
              layoutId={`tile-${item.id}`} 
              key={item.id}
              transition={{ type: "spring", mass: 1.1, damping: 20, stiffness: 120, layout: { duration: 0.6 } }}
              className={`w-full relative ${isActive ? 'z-50' : 'z-1'}`}
              style={{ height: `${TILE_HEIGHT}px` }}
            >
              
              {/* KROPKA I ŁĄCZNIK (przypięte do kafelka, przemieszczają się z nim!) */}
              <div className="absolute -left-[64px] w-[64px] h-full flex items-center justify-center">
                
                {/* Kropka */}
                <motion.div
                  className={`w-[16px] h-[16px] rounded-full flex items-center justify-center relative z-20 transition-all duration-300 ${
                    isActive ? 'bg-white' : 'bg-violet-100'
                  }`}
                  style={isActive ? ACTIVE_LASER_GLOW : LASER_SPINE_GLOW}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-violet-600' : 'bg-violet-400'}`} />
                </motion.div>

                {/* Poziomy laser holujący (pojawia się od razu po kliknięciu) */}
                <div className="absolute left-[32px] right-0 h-px flex items-center z-10">
                  <div className="absolute inset-0 bg-white/5" />
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white"
                        style={{ originX: 0, ...ACTIVE_LASER_GLOW }}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1, transition: { duration: 0.3 } }}
                        exit={{ scaleX: 0, transition: { duration: 0.2 } }}
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Karta Kafelka */}
              <div
                onClick={() => handleToggle(item.id)}
                className={`h-full w-full relative cursor-pointer rounded-2xl border transition-all duration-500 overflow-hidden ${
                  isActive
                    ? 'bg-violet-950/20 border-violet-500/50 shadow-[0_8px_40px_rgba(109,40,217,0.25)]'
                    : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04] hover:border-white/20 backdrop-blur-md'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-led-bar"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-white"
                    style={{ boxShadow: '0 0 15px #fff, 0 0 30px #a78bfa' }} 
                  />
                )}

                <div className="flex items-center gap-4 px-6 h-full">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
                    isActive ? 'bg-violet-500/25 text-white' : 'bg-white/5 text-gray-400'
                  }`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  
                  <span className={`font-medium text-[15px] sm:text-base flex-1 transition-colors duration-500 line-clamp-2 ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}>
                    {item.title}
                  </span>

                  <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-violet-300' : 'text-gray-600'}`} />
                  </motion.div>
                </div>
              </div>

              {/* OVERLAY (Zasłona z tekstem) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                    animate={{ 
                      opacity: 1, y: 0, filter: 'blur(0px)',
                      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } 
                    }}
                    exit={{ 
                      opacity: 0, y: -20, filter: 'blur(10px)',
                      transition: { duration: 0.25, ease: "easeIn" } 
                    }}
                    className="absolute z-50 rounded-2xl border border-white/10 bg-[#050505]/65 backdrop-blur-[20px] shadow-2xl overflow-hidden flex flex-col justify-between p-8 md:p-10 group"
                    style={{
                      top: `calc(100% + ${TILE_GAP}px)`, 
                      height: `${OVERLAY_HEIGHT}px`, 
                      left: '-64px', // Przykrywa kropki pod spodem
                      right: '0px'
                    }}
                  >
                    <div className="absolute top-10 -right-20 w-80 h-80 bg-violet-600/15 rounded-full blur-[100px] pointer-events-none" />
                    
                    <motion.p 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
                      exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                      className="text-xl md:text-2xl leading-[1.8] text-gray-200 font-extralight z-10 relative mt-4"
                    >
                      <RichText segments={item.details} />
                    </motion.p>

                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.4, duration: 0.5 } }}
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                      whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(139,92,246,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.stopPropagation();
                        router.push('/contact');
                      }}
                      className="mb-4 flex items-center gap-3 px-10 py-4 rounded-xl bg-violet-600 border border-violet-500/50 text-white font-semibold transition-all shadow-[0_0_20px_rgba(139,92,246,0.2)] group z-10 relative w-fit"
                    >
                      Dowiedz się więcej i wyceń
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Główny Eksport ────────────────────────────────────────────────────────────
export default function ServicesShowcase() {
  const router = useRouter();
  
  return (
    <section id="services" className="bg-[#030303] relative overflow-hidden border-t border-white/5">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 15% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 min-h-[600px]">

          {/* ─── LEWA STRONA (Czysty, wyrównany do lewej układ) ─────────── */}
          <div className="w-full md:w-5/12 flex flex-col justify-between py-4">
            
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.15] mb-12 tracking-tight">
                  Twój biznes może zacząć działać{' '}
                  <span className="text-violet-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    automatycznie
                  </span>
                </h2>

                <ul className="space-y-7 mb-16">
                  {BENEFITS.map((b, i) => (
                    <motion.li 
                      key={b.label} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-1 w-6 h-6 rounded-full bg-violet-500/10 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 text-violet-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">{b.label}</p>
                        <p className="text-gray-400 text-base mt-1.5 leading-relaxed"><RichDesc parts={b.parts} /></p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                onClick={() => router.push('/contact')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-lg transition-all duration-300 group shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
              >
                Umów bezpłatną konsultację
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </motion.button>
            </div>
          </div>

          <div className="w-full md:w-7/12 relative">
            <InteractiveShowcase />
          </div>
          
        </div>
      </div>
    </section>
  );
}