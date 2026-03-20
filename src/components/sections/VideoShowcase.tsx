'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, X, Play } from 'lucide-react';

const GOLD = '#f5fd00';

// ─── Typy ─────────────────────────────────────────────────────────────────────
type VideoItem = { type: 'mp4' | 'youtube'; src: string; label: string };

type Seg = { t: string; h?: boolean };
function RichDesc({ parts }: { parts: Seg[] }) {
  return (
    <>
      {parts.map((p, i) =>
        p.h ? <span key={i} style={{ color: GOLD, fontWeight: 600 }}>{p.t}</span>
             : <span key={i}>{p.t}</span>
      )}
    </>
  );
}

// ─── Dane filmów ──────────────────────────────────────────────────────────────
const LARGE_VIDEO: VideoItem = {
  type: 'mp4',
  src: '/_resources/videoMarketing/WieslawskiStudioFilm.mp4',
  label: 'Film dokumentalny',
};

const MEDIUM_VIDEOS: (VideoItem & { rotate: number; translateY: number })[] = [
  { type: 'mp4', src: '/_resources/portfolio7.mp4', label: 'Asystent AI', rotate: -3, translateY: 6 },
  { type: 'mp4', src: '/_resources/videoMarketing/VoucheryNagranie.mp4', label: 'UGC Voucher', rotate: 0, translateY: -6 },
  { type: 'mp4', src: '/_resources/videoMarketing/HertzCompressor.mp4', label: 'Film 3D', rotate: 3, translateY: 6 },
];

const SMALL_VIDEOS: VideoItem[] = [
  { type: 'mp4',     src: '/_resources/portfolio1.mp4',  label: 'Strony WWW' },
  { type: 'youtube', src: 'https://www.youtube.com/embed/nGAbHUE1eyI?autoplay=1&mute=1&controls=0&loop=1&playlist=nGAbHUE1eyI', label: 'Reklama SM' },
  { type: 'mp4',     src: '/_resources/portfolio4.mp4',  label: 'E-mail' },
  { type: 'mp4',     src: '/_resources/portfolio3.mp4',  label: 'Chatbot' },
  { type: 'mp4',     src: '/_resources/portfolio6.mp4',  label: 'Grafika 3D' },
];

const BENEFITS: { label: string; parts: Seg[] }[] = [
  { label: 'Filmy, które sprzedają',   parts: [{ t: 'Produkcja od ' }, { t: 'scenariusza po montaż', h: true }, { t: ' — gotowe na reklamy ' }, { t: 'Meta i TikTok', h: true }, { t: '.' }] },
  { label: 'Autentyczny UGC',          parts: [{ t: 'Treści twórców dopasowanych do Twojej ' }, { t: 'branży', h: true }, { t: ' i ' }, { t: 'grupy docelowej', h: true }, { t: '.' }] },
  { label: 'Strategia contentu',       parts: [{ t: 'Planujemy, tworzymy i ' }, { t: 'optymalizujemy', h: true }, { t: ' cały kanał wideo Twojej marki.' }] },
];

// ─── Modal wideo ──────────────────────────────────────────────────────────────
function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    if (video.type === 'mp4' && videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.play().catch(() => {});
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, video.type]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.82)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer z-10 transition-all hover:scale-110"
        style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
      >
        <X className="w-5 h-5 text-white" />
      </button>

      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative w-[90vw] max-w-5xl rounded-2xl overflow-hidden"
        style={{ aspectRatio: '16/9' }}
        onClick={(e) => e.stopPropagation()}
      >
        {video.type === 'youtube' ? (
          <iframe
            src={video.src.replace('controls=0', 'controls=1').replace('mute=1', 'mute=0')}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            style={{ border: 'none' }}
          />
        ) : (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            controls loop playsInline
            src={video.src}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(to right, transparent, ${GOLD}80, transparent)` }} />
      </motion.div>

      <p className="absolute bottom-7 left-1/2 -translate-x-1/2 text-sm font-medium text-white/40 tracking-wider">
        {video.label}
      </p>
    </motion.div>
  );
}

// ─── Karty wideo ──────────────────────────────────────────────────────────────
function LargeCard({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (ref.current) { ref.current.muted = true; ref.current.play().catch(() => {}); }
  }, []);

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden cursor-pointer group"
      style={{ aspectRatio: '16/9' }}
      onClick={onClick}
    >
      <video ref={ref} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src={LARGE_VIDEO.src} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300"
          style={{ background: 'rgba(245,253,0,0.15)', border: '1.5px solid rgba(245,253,0,0.5)', boxShadow: '0 0 40px rgba(245,253,0,0.3)' }}>
          <Play className="w-7 h-7 ml-0.5" style={{ color: GOLD, fill: GOLD }} />
        </div>
      </div>
      <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase" style={{ background: GOLD, color: '#000' }}>
        {LARGE_VIDEO.label}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(245,253,0,0.5), transparent)` }} />
    </div>
  );
}

function MediumCard({ item, onClick }: { item: typeof MEDIUM_VIDEOS[0]; onClick: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (item.type === 'mp4' && ref.current) { ref.current.muted = true; ref.current.play().catch(() => {}); }
  }, [item.type]);

  return (
    <div
      className="relative rounded-xl overflow-hidden flex-1 cursor-pointer group"
      style={{
        aspectRatio: '4/3',
        background: '#0d0a00',
        border: `1px solid rgba(245,253,0,0.15)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.6)`,
        transform: `rotate(${item.rotate}deg) translateY(${item.translateY}px)`,
        transition: 'transform 0.3s ease',
      }}
      onClick={onClick}
    >
      {item.type === 'youtube' ? (
        <iframe src={item.src} className="absolute inset-0 w-full h-full" allow="autoplay; encrypted-media" style={{ border: 'none', pointerEvents: 'none' }} />
      ) : (
        <video ref={ref} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src={item.src} />
      )}
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{ background: 'rgba(245,253,0,0.15)', border: '1px solid rgba(245,253,0,0.4)' }}>
          <Play className="w-4 h-4 ml-0.5" style={{ color: GOLD, fill: GOLD }} />
        </div>
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <span className="text-white/60 text-[10px] font-bold tracking-wider uppercase bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">{item.label}</span>
      </div>
    </div>
  );
}

function SmallCard({ item, onClick }: { item: VideoItem; onClick: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (item.type === 'mp4' && ref.current) { ref.current.muted = true; ref.current.play().catch(() => {}); }
  }, [item.type]);

  return (
    <div
      className="relative rounded-lg overflow-hidden flex-1 cursor-pointer group"
      style={{ aspectRatio: '9/16', background: '#0d0a00', border: '1px solid rgba(255,255,255,0.07)', boxShadow: '0 4px 16px rgba(0,0,0,0.4)' }}
      onClick={onClick}
    >
      {item.type === 'youtube' ? (
        <iframe src={item.src} className="absolute inset-0 w-full h-full" allow="autoplay; encrypted-media" style={{ border: 'none', pointerEvents: 'none' }} />
      ) : (
        <video ref={ref} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline src={item.src} />
      )}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
        <Play className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ color: GOLD, fill: GOLD }} />
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <span className="text-white/50 text-[9px] font-bold tracking-wider uppercase">{item.label}</span>
      </div>
    </div>
  );
}

// ─── Piramida wideo ───────────────────────────────────────────────────────────
function VideoPyramid({ onVideoClick }: { onVideoClick: (video: VideoItem) => void }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <LargeCard onClick={() => onVideoClick(LARGE_VIDEO)} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="flex gap-3 -mt-2">
        {MEDIUM_VIDEOS.map((v) => <MediumCard key={v.label} item={v} onClick={() => onVideoClick(v)} />)}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="flex gap-2">
        {SMALL_VIDEOS.map((v) => <SmallCard key={v.label} item={v} onClick={() => onVideoClick(v)} />)}
      </motion.div>
    </div>
  );
}

// ─── Główny eksport ───────────────────────────────────────────────────────────
export default function VideoShowcase() {
  const router = useRouter();
  const [modalVideo, setModalVideo] = useState<VideoItem | null>(null);

  const openModal = useCallback((video: VideoItem) => setModalVideo(video), []);
  const closeModal = useCallback(() => setModalVideo(null), []);

  return (
    <>
      <section className="bg-[#030303] relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 20% 50%, rgba(245,253,0,0.06) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 85% 30%, rgba(247,37,133,0.04) 0%, transparent 55%)' }} />

        <div className="max-w-7xl mx-auto px-6 md:px-8 py-24 md:py-32 relative z-10">
          <div className="flex flex-col-reverse md:flex-row gap-16 lg:gap-24 min-h-[600px]">

            <div className="w-full md:w-7/12 flex flex-col justify-between">
              <VideoPyramid onVideoClick={openModal} />
            </div>

            <div className="w-full md:w-5/12 flex flex-col justify-between py-4">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-end text-right"
                >
                  <h2 className="text-4xl lg:text-5xl xl:text-[3.5rem] font-bold text-white leading-[1.15] mb-12 tracking-tight">
                    Video &{' '}
                    <span style={{ color: GOLD, textShadow: `0 0 20px rgba(245,253,0,0.5), 0 0 40px rgba(245,253,0,0.25)` }}>
                      Marketing
                    </span>
                  </h2>

                  <ul className="space-y-7 mb-16 w-full">
                    {BENEFITS.map((b, i) => (
                      <motion.li key={b.label} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="flex flex-row-reverse items-start gap-4">
                        <div className="mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(245,253,0,0.1)', border: '1px solid rgba(245,253,0,0.3)' }}>
                          <Check className="w-3.5 h-3.5" style={{ color: GOLD }} />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-lg">{b.label}</p>
                          <p className="text-gray-400 text-base mt-1.5 leading-relaxed"><RichDesc parts={b.parts} /></p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                    onClick={() => router.push('/pricing/video-marketing')}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 px-10 py-5 rounded-full bg-white hover:bg-gray-100 text-black font-bold text-lg transition-all duration-300 group shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
                  >
                    Zobacz ofertę video
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </motion.button>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalVideo && <VideoModal video={modalVideo} onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}
