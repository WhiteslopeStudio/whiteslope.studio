'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check } from 'lucide-react';
import dynamic from 'next/dynamic';

// ─── Helper do wyróżniania słów kluczowych ────────────────────────────────────
type Seg = { t: string; h?: boolean };
function RichDesc({ parts, color }: { parts: Seg[]; color: string }) {
  return (
    <>
      {parts.map((p, i) =>
        p.h ? <span key={i} style={{ color, fontWeight: 600 }}>{p.t}</span>
             : <span key={i}>{p.t}</span>
      )}
    </>
  );
}

const AssistantDemo = dynamic(
  () => import('@/components/ai-integration/demos/assistant/AssistantDemo'),
  { ssr: false }
);

// ─── Tematy dla całej sekcji ──────────────────────────────────────────────────
type ServiceKey = '' | 'Korepetycje' | 'Salon Fryzjerski' | 'Makijaż';

const SECTION_THEMES: Record<ServiceKey, {
  glowBg: string;
  accentColor: string;
  accentShadow: string;
  checkBg: string;
  checkBorder: string;
  checkColor: string;
  demoBorder: string;
  demoGlow: string;
  topLine: string;
}> = {
  '': {
    glowBg: 'radial-gradient(circle at 15% 50%, rgba(37,99,235,0.08) 0%, transparent 70%)',
    accentColor: '#60a5fa',
    accentShadow: '0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.3)',
    checkBg: 'rgba(59,130,246,0.1)',
    checkBorder: 'rgba(59,130,246,0.3)',
    checkColor: '#60a5fa',
    demoBorder: 'rgba(59,130,246,0.2)',
    demoGlow: '0 0 60px rgba(37,99,235,0.1), 0 0 120px rgba(37,99,235,0.05)',
    topLine: 'rgba(59,130,246,0.4)',
  },
  'Korepetycje': {
    glowBg: 'radial-gradient(circle at 15% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)',
    accentColor: '#818cf8',
    accentShadow: '0 0 20px rgba(99,102,241,0.6), 0 0 40px rgba(99,102,241,0.35)',
    checkBg: 'rgba(99,102,241,0.12)',
    checkBorder: 'rgba(99,102,241,0.35)',
    checkColor: '#818cf8',
    demoBorder: 'rgba(99,102,241,0.35)',
    demoGlow: '0 0 60px rgba(99,102,241,0.18), 0 0 120px rgba(99,102,241,0.08)',
    topLine: 'rgba(99,102,241,0.55)',
  },
  'Salon Fryzjerski': {
    glowBg: 'radial-gradient(circle at 15% 50%, rgba(245,158,11,0.1) 0%, transparent 70%)',
    accentColor: '#fbbf24',
    accentShadow: '0 0 20px rgba(245,158,11,0.6), 0 0 40px rgba(245,158,11,0.35)',
    checkBg: 'rgba(245,158,11,0.1)',
    checkBorder: 'rgba(245,158,11,0.35)',
    checkColor: '#fbbf24',
    demoBorder: 'rgba(245,158,11,0.35)',
    demoGlow: '0 0 60px rgba(245,158,11,0.15), 0 0 120px rgba(245,158,11,0.07)',
    topLine: 'rgba(245,158,11,0.55)',
  },
  'Makijaż': {
    glowBg: 'radial-gradient(circle at 15% 50%, rgba(244,63,94,0.09) 0%, transparent 70%)',
    accentColor: '#fb7185',
    accentShadow: '0 0 20px rgba(244,63,94,0.6), 0 0 40px rgba(244,63,94,0.35)',
    checkBg: 'rgba(244,63,94,0.1)',
    checkBorder: 'rgba(244,63,94,0.3)',
    checkColor: '#fb7185',
    demoBorder: 'rgba(244,63,94,0.3)',
    demoGlow: '0 0 60px rgba(244,63,94,0.12), 0 0 120px rgba(244,63,94,0.06)',
    topLine: 'rgba(244,63,94,0.5)',
  },
};

const TRANSITION = 'background 0.9s ease, border-color 0.9s ease, box-shadow 0.9s ease, color 0.9s ease';

const ITEMS: { label: string; parts: Seg[] }[] = [
  {
    label: 'Chatboty konwersacyjne',
    parts: [{ t: 'Odpowiadają automatycznie na powtarzalne pytania klientów ' }, { t: '24/7', h: true }, { t: '.' }],
  },
  {
    label: 'Asystenci głosowi',
    parts: [{ t: 'AI obsługuje rozmowy ' }, { t: 'bez angażowania', h: true }, { t: ' Twojego zespołu.' }],
  },
  {
    label: 'Automatyzacje procesów',
    parts: [{ t: 'Eliminujemy ' }, { t: 'ręczną pracę', h: true }, { t: ' tam, gdzie to możliwe.' }],
  },
];

export default function AiShowcase() {
  const router = useRouter();
  const [activeService, setActiveService] = useState<ServiceKey>('');

  const handleThemeChange = useCallback((service: string) => {
    const key = (service as ServiceKey) in SECTION_THEMES ? (service as ServiceKey) : '';
    setActiveService(key);
  }, []);

  const theme = SECTION_THEMES[activeService];

  return (
    <section
      className="bg-[#030303] relative overflow-hidden border-t border-white/5"
      style={{ transition: TRANSITION }}
    >
      {/* Ambient glow – zmienia się z tematem */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: theme.glowBg, transition: 'background 0.9s ease' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 min-h-[600px]">

          {/* ─── LEWA strona: Tekst (5/12) ─── */}
          <div className="w-full md:w-5/12 flex flex-col justify-between py-4">
            <div className="sticky top-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Nagłówek */}
                <h2 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.15] mb-12 tracking-tight">
                  Sztuczna Inteligencja w Twoim{' '}
                  <span
                    style={{
                      color: theme.accentColor,
                      textShadow: theme.accentShadow,
                      transition: 'color 0.9s ease, text-shadow 0.9s ease',
                    }}
                  >
                    zespole
                  </span>
                </h2>

                {/* Lista z check ikonami */}
                <ul className="space-y-7 mb-16">
                  {ITEMS.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div
                        className="mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: theme.checkBg,
                          border: `1px solid ${theme.checkBorder}`,
                          transition: TRANSITION,
                        }}
                      >
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: theme.checkColor, transition: 'color 0.9s ease' }}
                        />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">{item.label}</p>
                        <p className="text-gray-400 text-base mt-1.5 leading-relaxed">
                          <RichDesc parts={item.parts} color={theme.checkColor} />
                        </p>
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
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-lg transition-all duration-300 group shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
                >
                  Zautomatyzuj swój biznes
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* ─── PRAWA strona: Demo AI (7/12) ─── */}
          <div className="w-full md:w-7/12 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                border: `1px solid ${theme.demoBorder}`,
                boxShadow: theme.demoGlow,
                transition: 'border-color 0.9s ease, box-shadow 0.9s ease',
              }}
            >
              {/* Dekoracyjna linia u góry */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] z-10"
                style={{
                  background: `linear-gradient(to right, transparent, ${theme.topLine}, transparent)`,
                  transition: 'background 0.9s ease',
                }}
              />

              <AssistantDemo onClose={() => {}} onThemeChange={handleThemeChange} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
