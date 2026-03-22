'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  accentColor?: string;
}

export const VideoPlayer = ({
  src,
  poster,
  className = "",
  accentColor = "#ffffff"
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isWaiting, setIsWaiting] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [actionIcon, setActionIcon] = useState<'play' | 'pause' | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
      videoRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    setIsControlsVisible(true);

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    inactivityTimerRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);

  const handleProgress = () => {
    if (videoRef.current && videoRef.current.buffered.length > 0) {
      const bufferedEnd = videoRef.current.buffered.end(videoRef.current.buffered.length - 1);
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setBuffered((bufferedEnd / duration) * 100);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      const currentProgress = duration > 0 ? (currentTime / duration) * 100 : 0;
      setProgress(currentProgress);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setActionIcon('pause');
      } else {
        videoRef.current.play();
        setActionIcon('play');
      }
      setIsPlaying(!isPlaying);
      setTimeout(() => setActionIcon(null), 500);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = Number(e.target.value);
    if (videoRef.current && !isNaN(val)) {
      const seekTime = (val / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(val);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = Number(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
    if (val === 0) setIsMuted(true);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMuted) setVolume(0.5);
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const hideCursorOnFullscreen = isFullscreen && !isControlsVisible;

  return (
    <div
      ref={containerRef}
      className={`relative group overflow-hidden rounded-2xl border border-white/10 bg-[#050505] ${className}`}
      style={{ cursor: hideCursorOnFullscreen ? 'none' : 'pointer' }}
      onMouseMove={resetInactivityTimer}
      onMouseLeave={() => {
        if (!isFullscreen) {
          setIsControlsVisible(false);
          if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
          }
        }
      }}
      onClick={() => togglePlay()}
    >
      {/* LOADER */}
      <AnimatePresence>
        {isWaiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <div className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ANIMACJA IKONY NA ŚRODKU */}
      <AnimatePresence>
        {actionIcon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-full border border-white/20">
              {actionIcon === 'play'
                ? <Play size={40} fill="white" className="text-white ml-1" />
                : <Pause size={40} fill="white" className="text-white" />
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WIDEO */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        onProgress={handleProgress}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={() => setIsWaiting(true)}
        onCanPlay={() => setIsWaiting(false)}
        onPlaying={() => setIsWaiting(false)}
        className="w-full h-full object-cover"
      />

      {/* OVERLAY KONTROLEK */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent transition-opacity duration-500 ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-6 space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* PASEK POSTEPU */}
          <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-white/20 transition-all duration-300"
              style={{ width: `${buffered || 0}%` }}
            />
            <div
              className="absolute h-full z-10"
              style={{ width: `${progress || 0}%`, backgroundColor: accentColor }}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={progress || 0}
              onChange={handleSeek}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
            />
          </div>

          {/* DOLNY PASEK KONTROLEK */}
          <div className="flex items-center justify-between">

            {/* LEWA STRONA: play + dzwiek */}
            <div className="flex items-center gap-4">
              <button onClick={(e) => togglePlay(e)} className="text-white cursor-pointer">
                {isPlaying
                  ? <Pause size={20} fill="white" />
                  : <Play size={20} fill="white" />
                }
              </button>

              <button onClick={toggleMute} className="text-white cursor-pointer">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 accent-white cursor-pointer"
              />
            </div>

            {/* PRAWA STRONA: logo + fullscreen */}
            <div className="flex items-center gap-4">
              <img
                src="/_resources/logoWhiteSlope.webp"
                alt="Logo"
                className="h-4 w-auto opacity-80"
              />
              <button onClick={toggleFullscreen} className="text-white cursor-pointer">
                <Maximize size={20} />
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.1] pointer-events-none" />
    </div>
  );
};