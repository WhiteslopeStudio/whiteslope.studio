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
    [...projects.slice(1), ...projects.slice(2), ...projects.slice(1)],
    [...projects.slice(2), ...projects.slice(0), ...projects.slice(2)]

  ];

  return (
    <div className="relative w-full h-[500px] md:h-[750px] overflow-hidden bg-white">
      
      {/* KONTENER IZOMETRYCZNY (2D)
          Usunięto rotateX/Y/Z na rzecz czystego rotate i skew.
          To daje efekt "pochylonej ściany" bez dystorsji 3D.
      */}
      <div 
        className="absolute inset-0 flex flex-col gap-6 md:gap-8"
        style={{
          // 1. translate: pierwsza wartość to oś X (w prawo), druga to oś Y (w górę/dół).
          // Dałem 10% w prawo i -15% w górę (czyli kamera idzie w lewo i w dół). 
          // Możesz płynnie zmieniać te dwie liczby, żeby wykadrować to idealnie!
          transform: "translate(-37%, -4%) rotate(-15deg) skewX(20deg) scale(1)",
          
          // 2. transformOrigin MUSI być poprawne, inaczej kąty obrotu się psują.
          transformOrigin: "center center", 
          
          transformStyle: "flat", 
        }}
      >
        {rows.map((row, rowIndex) => (
          <motion.div
            key={`row-${rowIndex}`}
            
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
                className="relative flex-shrink-0 w-[240px] h-[140px] md:w-[420px] md:h-[240px] rounded-[12px] overflow-hidden border border-white/5 bg-neutral-950 shadow-[20px_20px_50px_rgba(0,0,0,0.1)] group"
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
                <div className="absolute inset-0 rounded-[12px] ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all" />
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* MASKI ZANIKANIA (Vignette) - mocniejsze, aby ukryć krawędzie rzędów */}
      {/* {/* <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white via-white/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white via-white/60 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white via-white/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-white via-white/40 to-transparent z-10 pointer-events-none" />
     */}
      </div> 
  );
};