'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface Project {
  image: string;
}

export const ThreeDProjectWall = ({ projects }: { projects: Project[] }) => {
  if (!projects || projects.length === 0) return null;

  const rows = [
    [...projects, ...projects, ...projects],
    [...projects, ...projects, ...projects].reverse(),
    [...projects.slice(1), ...projects, ...projects, ...projects.slice(0, 1)],
    [...projects, ...projects, ...projects],
    [...projects, ...projects, ...projects].reverse(),
    [...projects.slice(1), ...projects, ...projects, ...projects.slice(0, 1)],
  ];

  return (
    <div className="relative w-full h-[500px] md:h-[750px] overflow-hidden bg-black">
      
      {/* KONTENER IZOMETRYCZNY (2D)
          Usunięto rotateX/Y/Z na rzecz czystego rotate i skew.
          To daje efekt "pochylonej ściany" bez dystorsji 3D.
      */}
      <div 
        className="absolute inset-0 flex flex-col gap-6 md:gap-8"
        style={{
          // rotate(-15deg) - przechyla całość
          // skewX(20deg) - nadaje efekt izometrii (ściana "ucieka" w bok)
          transform: "rotate(-15deg) skewX(20deg) scale(1)",
          transformOrigin: "center center",
          // Wymuszamy płaski styl renderowania (brak 3D)
          transformStyle: "flat", 
        }}
      >
        {rows.map((row, rowIndex) => (
          <motion.div
            key={`row-${rowIndex}`}
            animate={{ 
              x: rowIndex % 2 === 0 ? ["0%", "-33.33%"] : ["-33.33%", "0%"] 
            }}
            transition={{
              duration: 35 + rowIndex * 10,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex gap-6 md:gap-8"
          >
            {row.map((proj, idx) => (
              <div
                key={`${rowIndex}-${idx}`}
                className="relative flex-shrink-0 w-[240px] h-[140px] md:w-[420px] md:h-[240px] rounded-2xl overflow-hidden border border-white/5 bg-neutral-950 shadow-[20px_20px_50px_rgba(0,0,0,0.5)] group"
              >
                <Image
                  src={proj.image}
                  alt="Whiteslope Showcase"
                  fill
                  sizes="(max-width: 768px) 240px, 420px"
                  className="object-cover opacity-100 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
                
                {/* Overlay przy hoverze */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Glass highlight na krawędzi */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* MASKI ZANIKANIA (Vignette) - mocniejsze, aby ukryć krawędzie rzędów */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black via-black/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-black/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-black via-black/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />
    </div>
  );
};