'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Play, Globe, LayoutDashboard, ShoppingCart, AppWindow, Check } from 'lucide-react';

// ─── Helper do wyróżniania słów kluczowych ────────────────────────────────────
const CYAN = '#22d3ee';
type Seg = { t: string; h?: boolean };
function RichDesc({ parts }: { parts: Seg[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.h ? <span key={i} style={{ color: CYAN, fontWeight: 600 }}>{p.t}</span>
             : <span key={i}>{p.t}</span>
      )}
    </>
  );
}

const SERVICE_TILES = [
  {
    id: 'websites',
    icon: Globe,
    label: 'Strony Internetowe',
    desc: 'Profesjonalne strony firmowe',
  },
  {
    id: 'saas',
    icon: LayoutDashboard,
    label: 'Systemy SaaS',
    desc: 'Zaawansowane platformy webowe',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    label: 'Sklepy e-Commerce',
    desc: 'Sklepy online z wysoką konwersją',
  },
  {
    id: 'webapps',
    icon: AppWindow,
    label: 'Aplikacje Webowe',
    desc: 'Dedykowane rozwiązania webowe',
  },
];

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  websites: Globe,
  saas: LayoutDashboard,
  ecommerce: ShoppingCart,
  webapps: AppWindow,
};

const BENEFITS: { label: string; parts: Seg[] }[] = [
  {
    label: 'Szybkość wdrożenia',
    parts: [{ t: 'Strona gotowa w ' }, { t: '2 tygodnie', h: true }, { t: ', nie 3 miesiące.' }],
  },
  {
    label: 'Konwersja przede wszystkim',
    parts: [{ t: 'Projekty oparte na ' }, { t: 'psychologii i danych', h: true }, { t: ', nie estetyce.' }],
  },
  {
    label: 'Skalowalność',
    parts: [{ t: 'Systemy SaaS ' }, { t: 'rosną razem', h: true }, { t: ' z Twoim biznesem.' }],
  },
];

function VideoPlayer({ activeId }: { activeId: string }) {
  const Icon = ICON_MAP[activeId] ?? Globe;

  return (
    <motion.div
      key={activeId}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ aspectRatio: '16/9' }}
    >
      {/* Tło glass – cyan */}
      <div className="absolute inset-0 bg-[#030303]/80 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-cyan-950/20" />

      {/* Ozdobny grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Cyan glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-72 h-72 rounded-full"
          style={{ background: 'rgba(6,182,212,0.12)', filter: 'blur(80px)' }}
        />
      </div>

      {/* Przycisk Play */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
        <motion.div
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          className="w-20 h-20 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center cursor-pointer transition-shadow"
          style={{ boxShadow: '0 0 40px rgba(6,182,212,0.25)' }}
        >
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </motion.div>

        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
          <Icon className="w-4 h-4 text-cyan-400" />
          <span className="text-white/60 text-sm font-medium">
            {SERVICE_TILES.find((t) => t.id === activeId)?.label ?? ''}
          </span>
        </div>
      </div>

      {/* Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        <span className="text-[11px] font-bold text-white/60 tracking-widest uppercase">Preview</span>
      </div>
    </motion.div>
  );
}

function ServiceTiles({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-4">
      {SERVICE_TILES.map((tile) => {
        const isActive = tile.id === activeId;
        const Icon = tile.icon;
        return (
          <motion.button
            key={tile.id}
            onClick={() => onSelect(tile.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-300 backdrop-blur-md cursor-pointer overflow-hidden ${
              isActive
                ? 'border-cyan-500/60 bg-cyan-950/20'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
            }`}
            style={isActive ? { boxShadow: '0 0 20px rgba(6,182,212,0.15)' } : {}}
          >
            {isActive && (
              <motion.div
                layoutId="tile-glow"
                className="absolute inset-0 rounded-xl"
                style={{ background: 'rgba(6,182,212,0.08)' }}
              />
            )}
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                isActive ? 'text-cyan-300' : 'bg-white/5 text-gray-500'
              }`}
              style={isActive ? { background: 'rgba(6,182,212,0.18)' } : {}}
            >
              <Icon className="w-4 h-4" />
            </div>
            <div className="relative z-10 min-w-0">
              <p
                className={`font-semibold text-sm leading-tight transition-colors duration-300 ${
                  isActive ? 'text-white' : 'text-gray-300'
                }`}
              >
                {tile.label}
              </p>
              <p className="text-gray-500 text-xs mt-0.5 leading-snug">{tile.desc}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export default function WebsitesShowcase() {
  const router = useRouter();
  const [activeId, setActiveId] = useState('websites');

  return (
    <section className="bg-[#030303] relative overflow-hidden border-t border-white/5">
      {/* Ambient cyan glow po prawej */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 85% 50%, rgba(6,182,212,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32 relative z-10">
        <div className="flex flex-col-reverse md:flex-row gap-16 lg:gap-24 min-h-[600px]">

          {/* ─── LEWA strona: Media (7/12) ─── */}
          <div className="w-full md:w-7/12 flex flex-col">
            <VideoPlayer activeId={activeId} />
            <ServiceTiles activeId={activeId} onSelect={setActiveId} />
          </div>

          {/* ─── PRAWA strona: Tekst (5/12) – wyrównany do PRAWEJ ─── */}
          <div className="w-full md:w-5/12 flex flex-col justify-between py-4">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-end text-right"
              >
                {/* Nagłówek */}
                <h2 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.15] mb-12 tracking-tight">
                  Nowoczesne{' '}
                  <span style={{ color: CYAN, textShadow: '0 0 20px rgba(6,182,212,0.5), 0 0 40px rgba(6,182,212,0.3)' }}>
                    strony
                  </span>
                  {' '}i potężne systemy{' '}
                  <span style={{ color: CYAN, textShadow: '0 0 20px rgba(6,182,212,0.5), 0 0 40px rgba(6,182,212,0.3)' }}>
                    SaaS
                  </span>
                </h2>

                {/* Benefity */}
                <ul className="space-y-7 mb-16 w-full">
                  {BENEFITS.map((b, i) => (
                    <motion.li
                      key={b.label}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex flex-row-reverse items-start gap-4"
                    >
                      <div className="mt-1 w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(6,182,212,0.1)', borderColor: 'rgba(6,182,212,0.3)' }}>
                        <Check className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">{b.label}</p>
                        <p className="text-gray-400 text-base mt-1.5 leading-relaxed"><RichDesc parts={b.parts} /></p>
                      </div>
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  onClick={() => router.push('/contact')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-lg transition-all duration-300 group shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
                >
                  Porozmawiajmy o projekcie
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
