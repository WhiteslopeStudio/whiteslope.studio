"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <style jsx global>{`
        @keyframes aurora {
          from {
            background-position: 50% 50%, 50% 50%;
          }
          to {
            background-position: 350% 50%, 350% 50%;
          }
        }
      `}</style>
      <div
        className={cn(
          "relative flex flex-col bg-black transition-bg duration-500", // Czysta czerń jako baza
          className,
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={cn(
              `
              /* Animacja tła */
              after:[animation:aurora_120s_linear_infinite]
              after:content-[""] 
              after:absolute 
              after:inset-0 
              after:[background-image:var(--white-gradient),var(--aurora)] 
              after:[background-size:300%,_200%] 
              after:[background-attachment:fixed] 
              after:mix-blend-difference 
              
              /* Warstwy bazowe */
              absolute -inset-[10px] blur-[10px] will-change-transform
              [background-image:var(--white-gradient),var(--aurora)] 
              [background-size:300%,_200%] 
              [background-position:50%_50%,50%_50%] 
              filter invert dark:invert-0

              /* TWOJE OPACITY = 0.6 */
              opacity-7
              `,

              /* TWOJE KOLORY (SZAROŚCI) */
              "[--blue-300:#555555] [--blue-400:#333333] [--blue-500:#111111] [--indigo-300:#444444] [--violet-200:#222222] [--black:#000] [--white:#909090] [--transparent:transparent]",
              
              /* Gradient Aurora używający Twoich zmiennych */
              "[--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]",
              
              "[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]",
              "[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]",

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
            )}
          ></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10"
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
};