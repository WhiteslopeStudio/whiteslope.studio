'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart, MessageCircle, Send } from 'lucide-react';
import { FaPinterestP, FaYoutube } from 'react-icons/fa6';
import { colors, fonts, headingStyle, ctaBaseClass, ctaSecondaryBaseClass, sectionCtas } from './theme';

const SHORTS_FEED = [
    'https://www.youtube.com/embed/nGAbHUE1eyI?autoplay=1&mute=1&controls=0&loop=1&playlist=nGAbHUE1eyI&start=0',
    '/_resources/videoMarketing/VoucheryNagranie.mp4',


];

export default function HeroSection() {
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [heartBursts, setHeartBursts] = useState<
    Array<{ id: number; left: number; size: number; duration: number; delay: number; color: string }>
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % SHORTS_FEED.length);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const handleLikeClick = () => {
    setIsLiked((prev) => {
      const next = !prev;

      if (next) {
        const baseId = Date.now();
        const particles = Array.from({ length: 10 }).map((_, idx) => ({
          id: baseId + idx,
          left: -20 + Math.random() * 140,
          size: 32 + Math.random() * 30,
          duration: 1.6 + Math.random() * 1.1,
          delay: Math.random() * 0.25,
          color: Math.random() > 0.5 ? '#ef4444' : '#f72585',
        }));

        setHeartBursts((prevBursts) => [...prevBursts, ...particles]);

        window.setTimeout(() => {
          setHeartBursts((prevBursts) => prevBursts.filter((p) => !particles.some((np) => np.id === p.id)));
        }, 2600);
      }

      return next;
    });
  };

  return (
    <section 
      className="relative overflow-x-hidden"
      style={{ 
        backgroundColor: colors.sectionBg.hero,
      }}
    >
      <div
        className="absolute inset-y-0 right-0 w-[52%] pointer-events-none hidden lg:block"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0, 0, 0, 0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.16) 1px, transparent 1px)',
          backgroundSize: '198px 198px',
        }}
      />

      {/* DESKTOP LAYOUT - lg and above */}
      <div className="hidden lg:flex h-[88vh] overflow-hidden items-center relative max-w-[1640px] mx-auto px-6 md:px-12">
        {/* Left Content */}
        <div className="w-[55%] px-12 pl-36 z-10">
          <motion.h1
            className="text-6xl xl:text-7xl font-normal mb-6 text-black"
            style={headingStyle}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Video Marketing
            <br />
            i Content UGC
            <br />
            dla lepszej
            <br />
            konwersji
          </motion.h1>

          <motion.h2
            className="font-bold text-xl lg:text-2xl mb-8 text-black/80 max-w-2xl leading-relaxed"
            style={{ fontFamily: fonts.body }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Angażuj lepiej swoich przyszłych klientów. Pokaż się profesjonalnie w sieci z idealnymi materiałami video.
          </motion.h2>

          <div className="flex items-center gap-4">
            <motion.button
              className={ctaBaseClass}
              style={{
                backgroundColor: sectionCtas.hero.primary.bgColor,
                color: sectionCtas.hero.primary.textColor,
                fontFamily: fonts.cta,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ 
                boxShadow: `0 20px 60px rgba(247, 37, 133, 0.6)`,
              }}
              onClick={() => document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {sectionCtas.hero.primary.label}
              <ArrowRight size={20} />
            </motion.button>

            <motion.a
              href={sectionCtas.hero.secondary!.href}
              className={ctaSecondaryBaseClass}
              style={{
                backgroundColor: sectionCtas.hero.secondary!.bgColor,
                color: sectionCtas.hero.secondary!.textColor,
                border: sectionCtas.hero.secondary!.border,
                fontFamily: fonts.cta,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sectionCtas.hero.secondary!.label}
              <ArrowRight size={20} />
            </motion.a>
          </div>
        </div>

        {/* Right Side - Video with phone frame */}
        <motion.div
          className="absolute right-[15%] top-1/2 -translate-y-1/2 w-72 xl:w-[360px]"
          style={{ zIndex: 5 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Floating hearts behind phone */}
          <div className="absolute -inset-16 pointer-events-none z-10 overflow-visible">
            <AnimatePresence>
              {heartBursts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute"
                  style={{ left: `${heart.left}%`, bottom: '-2%' }}
                  initial={{ opacity: 0, y: 0, scale: 0.5 }}
                  animate={{ opacity: [0, 1, 0], y: -280, x: [0, -20, 16], scale: [0.5, 1.1, 0.7] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: heart.duration, delay: heart.delay, ease: 'easeOut' }}
                >
                  <Heart size={heart.size} fill={heart.color} color={heart.color} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Phone frame */}
          <div 
            className="relative z-20 aspect-[9/16] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-2xl bg-black p-3"
            onMouseEnter={() => setIsVideoHovered(true)}
            onMouseLeave={() => setIsVideoHovered(false)}
            style={{
              boxShadow: '0 0 0 8px #1a1a1a, 0 25px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Phone notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-20" />
            
            {/* Video content */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-black isolate">
              <AnimatePresence mode="wait">
                <motion.div
                  key={videoIndex}
                  className="absolute inset-0 overflow-hidden rounded-[2rem]"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  {SHORTS_FEED[videoIndex].endsWith('.mp4') ? (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      muted
                      loop
                      playsInline
                    >
                      <source src={SHORTS_FEED[videoIndex]} type="video/mp4" />
                    </video>
                  ) : (
                    <iframe
                      src={SHORTS_FEED[videoIndex]}
                      className="absolute inset-0 w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      style={{ border: 'none' }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* IG-like overlay UI */}
              <div className="absolute inset-0 pointer-events-none z-20">
                <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4 text-white pointer-events-auto">
                  <div className="flex flex-col items-center gap-1">
                    <button
                      type="button"
                      onClick={handleLikeClick}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Heart
                        size={20}
                        className="drop-shadow"
                        color={isLiked ? '#ef4444' : 'white'}
                        fill={isLiked ? '#ef4444' : 'transparent'}
                      />
                    </button>
                    <span className="text-[10px] font-semibold">12.4k</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <MessageCircle size={20} className="drop-shadow" />
                    <span className="text-[10px] font-semibold">831</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Send size={20} className="drop-shadow" />
                    <span className="text-[10px] font-semibold">Udostępnij</span>
                  </div>
                </div>

                <div className="absolute left-3 right-3 bottom-3">
                  <div className="bg-black/45 backdrop-blur-[2px] rounded-xl px-3 py-2 text-white">
                    <p className="text-[11px] font-semibold">@whiteslope.studio</p>
                    <p className="text-[10px] opacity-90">UGC, który zwiększa konwersję 🚀</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating speech bubble overlay on hover */}
          <motion.div
            className="absolute top-20 -right-60 w-96 p-8 rounded-3xl shadow-2xl pointer-events-none z-40"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ 
              opacity: isVideoHovered ? 1 : 0,
              y: isVideoHovered ? 0 : 20,
              scale: isVideoHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <p 
              className="font-bold text-white text-base md:text-lg leading-relaxed relative z-10"
              style={{ 
                fontFamily: 'var(--font-geist-sans, "Geist", system-ui, sans-serif)',
              }}
            >
              Pozyskuj klientów poprzez autentyczne i naturalnie wyglądające treści, które budują zaufanie i konwertują.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom - Desktop: Social icons + line + buttons */}
        <div className="absolute bottom-10 left-36 right-16 flex items-center justify-between" style={{ zIndex: 10 }}>
          {/* Left side - Social Icons */}
          <motion.div
            className="flex items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.a
              href="#"
              className="text-black hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.087 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76c-.198.51-.333 1.09-.372 1.944C.01 5.556 0 5.83 0 8c0 2.172.01 2.444.048 3.297.039.852.174 1.434.372 1.943.205.527.478.974.923 1.417.444.445.89.719 1.417.923.51.198 1.09.333 1.943.372C5.556 15.99 5.829 16 8 16c2.172 0 2.444-.01 3.297-.048.852-.039 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.333-1.09.372-1.943.038-.853.048-1.125.048-3.297 0-2.171-.01-2.444-.048-3.297-.039-.853-.174-1.434-.372-1.943a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.09-.333-1.943-.372C10.444.01 10.172 0 8 0m0 1.441c2.134 0 2.389.008 3.232.046.78.035 1.204.166 1.485.275.371.144.636.317.914.595.278.278.451.543.595.914.109.281.24.705.275 1.485.038.843.046 1.098.046 3.232s-.008 2.389-.046 3.232c-.035.78-.166 1.204-.275 1.485a2.46 2.46 0 0 1-.595.914 2.46 2.46 0 0 1-.914.595c-.281.109-.705.24-1.485.275-.843.038-1.098.046-3.232.046s-2.389-.008-3.232-.046c-.78-.035-1.204-.166-1.485-.275a2.46 2.46 0 0 1-.914-.595 2.46 2.46 0 0 1-.595-.914c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.098-.046-3.232s.008-2.389.046-3.232c.035-.78.166-1.204.275-1.485.144-.371.317-.636.595-.914.278-.278.543-.451.914-.595.281-.109.705-.24 1.485-.275.843-.038 1.098-.046 3.232-.046" />
                <path d="M8 3.892A4.108 4.108 0 1 0 8 12.108 4.108 4.108 0 0 0 8 3.892m0 6.776a2.668 2.668 0 1 1 0-5.336 2.668 2.668 0 0 1 0 5.336m4.271-6.945a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92" />
              </svg>
            </motion.a>
            <motion.a
              href="#"
              className="text-black hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaYoutube size={30} />
            </motion.a>
            <motion.a
              href="#"
              className="text-black hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M9 0h3.5a5.5 5.5 0 0 0 3.5 3.5V7a9 9 0 0 1-3.5-.7v5.2A4.5 4.5 0 1 1 8 7V10a1.5 1.5 0 1 0 1 1.4z"/>
              </svg>
            </motion.a>
            <motion.a
              href="#"
              className="text-black hover:opacity-60 transition-opacity"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPinterestP size={30} />
            </motion.a>
          </motion.div>

          {/* Center - Animated connecting line with arrow */}
          <motion.div
            className="flex-1 flex items-center mx-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="h-px bg-black flex-1"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.2 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {/* Right side - just arrow end */}
          <div />
        </div>
      </div>

      {/* MOBILE LAYOUT - below lg */}
      <div className="flex lg:hidden flex-col items-center px-8 pt-16 pb-14">
        <motion.h1
          className="text-4xl md:text-5xl font-normal mb-6 text-black text-center"
          style={headingStyle}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Video Marketing
          <br />
          i Content UGC
          <br />
          dla lepszej
          <br />
          konwersji
        </motion.h1>

        <motion.h2
          className="font-bold text-lg md:text-xl mb-8 text-black/80 text-center max-w-2xl leading-relaxed"
          style={{ fontFamily: fonts.body }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Angażuj lepiej swoich przyszłych klientów. Pokaż się profesjonalnie w sieci z idealnymi materiałami video.
        </motion.h2>

        <motion.div
          className="flex flex-col gap-3 w-full mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button
            className={ctaBaseClass}
            style={{
              backgroundColor: sectionCtas.hero.primary.bgColor,
              color: sectionCtas.hero.primary.textColor,
              fontFamily: fonts.cta,
            }}
            whileHover={{ 
              boxShadow: `0 20px 60px rgba(247, 37, 133, 0.6)`,
            }}
            onClick={() => document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {sectionCtas.hero.primary.label}
            <ArrowRight size={20} />
          </motion.button>

          <motion.a
            href={sectionCtas.hero.secondary!.href}
            className={ctaSecondaryBaseClass}
            style={{
              backgroundColor: sectionCtas.hero.secondary!.bgColor,
              color: sectionCtas.hero.secondary!.textColor,
              border: sectionCtas.hero.secondary!.border,
              fontFamily: fonts.cta,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sectionCtas.hero.secondary!.label}
            <ArrowRight size={20} />
          </motion.a>
        </motion.div>

        {/* Mobile - Social Icons */}
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="#"
            className="text-black hover:opacity-60 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.087 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76c-.198.51-.333 1.09-.372 1.944C.01 5.556 0 5.83 0 8c0 2.172.01 2.444.048 3.297.039.852.174 1.434.372 1.943.205.527.478.974.923 1.417.444.445.89.719 1.417.923.51.198 1.09.333 1.943.372C5.556 15.99 5.829 16 8 16c2.172 0 2.444-.01 3.297-.048.852-.039 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.417-.923 3.9 3.9 0 0 0 .923-1.417c.198-.51.333-1.09.372-1.943.038-.853.048-1.125.048-3.297 0-2.171-.01-2.444-.048-3.297-.039-.853-.174-1.434-.372-1.943a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.09-.333-1.943-.372C10.444.01 10.172 0 8 0m0 1.441c2.134 0 2.389.008 3.232.046.78.035 1.204.166 1.485.275.371.144.636.317.914.595.278.278.451.543.595.914.109.281.24.705.275 1.485.038.843.046 1.098.046 3.232s-.008 2.389-.046 3.232c-.035.78-.166 1.204-.275 1.485a2.46 2.46 0 0 1-.595.914 2.46 2.46 0 0 1-.914.595c-.281.109-.705.24-1.485.275-.843.038-1.098.046-3.232.046s-2.389-.008-3.232-.046c-.78-.035-1.204-.166-1.485-.275a2.46 2.46 0 0 1-.914-.595 2.46 2.46 0 0 1-.595-.914c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.098-.046-3.232s.008-2.389.046-3.232c.035-.78.166-1.204.275-1.485.144-.371.317-.636.595-.914.278-.278.543-.451.914-.595.281-.109.705-.24 1.485-.275.843-.038 1.098-.046 3.232-.046" />
              <path d="M8 3.892A4.108 4.108 0 1 0 8 12.108 4.108 4.108 0 0 0 8 3.892m0 6.776a2.668 2.668 0 1 1 0-5.336 2.668 2.668 0 0 1 0 5.336m4.271-6.945a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92" />
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="text-black hover:opacity-60 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaYoutube size={30} />
          </motion.a>
          <motion.a
            href="#"
            className="text-black hover:opacity-60 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M9 0h3.5a5.5 5.5 0 0 0 3.5 3.5V7a9 9 0 0 1-3.5-.7v5.2A4.5 4.5 0 1 1 8 7V10a1.5 1.5 0 1 0 1 1.4z"/>
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="text-black hover:opacity-60 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPinterestP size={30} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
