'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowRight, Search, Code, Palette, FileText, Smartphone, Video, Music } from 'lucide-react';
import { MAIN_SERVICES } from '@/lib/data';
import type { MainService } from '@/lib/types';

const SERVICE_NUM: Record<string, string> = {
  optimization: '01', 'ai-integration': '02', graphics: '03',
  individual: '04', 'email-marketing': '05', 'video-marketing': '06', 'audio-editing': '07',
};

const ICON_MAP: Record<string, React.ElementType> = {
  optimization: Search, 'ai-integration': Code, graphics: Palette,
  individual: FileText, 'email-marketing': Smartphone, 'video-marketing': Video, 'audio-editing': Music,
};

const PLACEHOLDER_IMG: Record<string, string> = {
  optimization:      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  'ai-integration':  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  graphics:          'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
  individual:        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  'email-marketing': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
  'video-marketing': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
  'audio-editing':   'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
};

function useDragScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const movedPx = useRef(0);

  const onDown = (e: React.MouseEvent) => {
    dragging.current = true; movedPx.current = 0;
    startX.current = e.clientX;
    startScroll.current = containerRef.current?.scrollLeft ?? 0;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };
  const onMove = (e: React.MouseEvent) => {
    if (!dragging.current || !containerRef.current) return;
    e.preventDefault();
    const delta = startX.current - e.clientX;
    movedPx.current = Math.abs(delta);
    containerRef.current.scrollLeft = startScroll.current + delta;
  };
  const onUp = () => {
    dragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };
  const wasDrag = () => movedPx.current > 6;
  return { containerRef, onDown, onMove, onUp, wasDrag };
}

export default function OtherServicesSection() {
  const others = MAIN_SERVICES.filter((s: MainService) => s.id !== 'website');
  const drag = useDragScroll();

  return (
    <section>

      {/* ══════════════════════════════════════════════════
          DESKTOP – techniczne pasy oddzielone separatorami
      ══════════════════════════════════════════════════ */}
      <div className="hidden md:block border-b border-white/10">
        <div className="container mx-auto px-6 pt-16 pb-4">
          <h2 className="text-4xl font-semibold text-white">Pozostałe usługi</h2>
        </div>

        {others.map((service: MainService, idx: number) => {
          const Icon = ICON_MAP[service.id] ?? FileText;
          const num = SERVICE_NUM[service.id] ?? '—';
          const img = PLACEHOLDER_IMG[service.id] ?? 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80';

          return (
            <Link
              key={service.id}
              href={`/pricing/${service.id}`}
              draggable={false}
              className="group block border-t border-white/8 hover:bg-white/[0.025] transition-colors duration-300"
            >
              <div className="container mx-auto px-6 py-10 grid grid-cols-[1fr_320px] xl:grid-cols-[1fr_380px] gap-10 items-center">

                {/* Lewa – treść */}
                <div>
                  {/* Numer + tag */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-[11px] font-mono text-white/25 tracking-widest">{num}</span>
                    <div className="h-px w-5 bg-white/15" />
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/35 uppercase tracking-[0.16em]">
                      <Icon className="w-3 h-3" />
                      {service.subtitle}
                    </div>
                  </div>

                  {/* Tytuł */}
                  <h3 className="text-4xl xl:text-5xl font-bold text-white/80 leading-tight tracking-tight group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Opis + lista */}
                  <div className="mt-6 grid grid-cols-[1fr_1fr] gap-x-8">
                    <p className="text-[14px] leading-relaxed text-white/35">
                      {service.description}
                    </p>
                    <ul className="space-y-1.5">
                      {service.features.slice(0, 5).map((f) => (
                        <li key={f.title} className="text-[12px] text-white/40 flex items-start gap-2">
                          <span className="text-white/20 mt-0.5 shrink-0">›</span>
                          {f.title}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-7 flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/50 group-hover:text-blue-400 transition-colors duration-300">
                      {service.ctaText ?? 'Dowiedz się więcej'}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                    <span className="text-xs text-white/20 font-mono">{service.price}</span>
                  </div>
                </div>

                {/* Prawa – zdjęcie bez zaokrągleń */}
                <div className="overflow-hidden aspect-[16/10]">
                  <img
                    src={img}
                    alt={service.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-[1.03]"
                    draggable={false}
                  />
                </div>
              </div>
            </Link>
          );
        })}

        <div className="border-t border-white/8 py-12 flex justify-center">
          <Link
            href="/pricing"
            className="group flex items-center gap-2 text-xs font-mono text-white/25 hover:text-blue-400 transition-colors tracking-widest uppercase"
          >
            Wszystkie usługi i cennik
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MOBILE – przeciągana karuzelka
      ══════════════════════════════════════════════════ */}
      <div className="md:hidden py-10 border-b border-white/10">
        <div className="px-6 mb-6">
          <h2 className="text-2xl font-semibold text-white">Pozostałe usługi</h2>
        </div>

        <div
          ref={drag.containerRef}
          className="flex gap-3 overflow-x-auto px-6 pb-2 select-none"
          style={{ scrollbarWidth: 'none', cursor: 'grab' }}
          onMouseDown={drag.onDown}
          onMouseMove={drag.onMove}
          onMouseUp={drag.onUp}
          onMouseLeave={drag.onUp}
        >
          {others.map((service: MainService) => {
            const Icon = ICON_MAP[service.id] ?? FileText;
            return (
              <Link
                key={service.id}
                href={`/pricing/${service.id}`}
                draggable={false}
                className="flex-shrink-0 active:scale-95 transition-transform duration-150"
                style={{
                  width: '108px', height: '112px',
                  background: '#18181b',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '14px',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: '8px',
                }}
                onClick={(e) => { if (drag.wasDrag()) e.preventDefault(); }}
              >
                <div style={{
                  width: '36px', height: '36px',
                  background: 'rgba(25,133,255,0.12)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#3f8efc',
                }}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-center leading-tight text-[11px] font-medium text-white/60 px-2">
                  {service.title}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="px-6 mt-5">
          <div className="w-full h-px bg-white/8 mb-3" />
          <div className="flex justify-center">
            <Link
              href="/pricing"
              className="group flex items-center gap-2 text-xs font-mono text-white/25 hover:text-blue-400 transition-colors tracking-widest uppercase"
            >
              Wszystkie usługi
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}

// ── Paleta: 7 odcieni błękitu z #add7f6 → #3b28cc ───────────────
