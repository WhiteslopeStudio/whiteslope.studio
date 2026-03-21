'use client';

import React from 'react';
import { ArrowRight } from '@phosphor-icons/react';

const BLUE = '#0088ff';
const GRAY_BORDER = '#262626';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function PrimaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <a
      href={href}
      className={`
        relative h-14 px-8 
        inline-flex items-center justify-center gap-3
        bg-[#0088ff] text-white 
        font-bold uppercase tracking-[0.1em] text-sm
        transition-none border border-[#0088ff]
        hover:bg-white hover:text-black hover:border-white
        active:scale-[0.98]
        w-full md:w-auto min-w-[200px]
        ${className}
      `}
      style={{
        fontFamily: 'var(--font-unbounded), sans-serif',
      }}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowRight size={18} weight="bold" />
      </span>
    </a>
  );
}

export function SecondaryButton({ href, children, className = "" }: ButtonProps) {
  return (
    <a
      href={href}
      className={`
        relative h-14 px-8 
        inline-flex items-center justify-center gap-3
        bg-transparent text-[#a1a1a1]
        border border-[#262626]
        font-bold uppercase tracking-[0.1em] text-sm
        transition-none
        hover:bg-white hover:text-black hover:border-white
        active:scale-[0.98]
        w-full md:w-auto min-w-[200px]
        ${className}
      `}
      style={{
        fontFamily: 'var(--font-unbounded), sans-serif',
      }}
    >
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowRight size={18} weight="bold" />
      </span>
    </a>
  );
}