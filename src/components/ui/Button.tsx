'use client';

import { ArrowRight } from 'lucide-react';
import { useInteractiveButton } from '@/utils/hooks';

export function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const button = useInteractiveButton();

  return (
    <a
      href={href}
      onMouseMove={button.handleMouseMove}
      onMouseEnter={(e) => {
        button.handleMouseEnter();
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.03)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(255,255,255,0.03)';
      }}
      onMouseLeave={(e) => {
        button.handleMouseLeave();
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(255,255,255,0.08)';
      }}
      className="h-12 rounded-full relative overflow-hidden active:scale-95 group inline-flex"
      style={{
        background: `radial-gradient(circle at ${button.mousePosition.x}% ${button.mousePosition.y}%, #1069ee, #1069ee)`,
        boxShadow: '0 4px 20px rgba(255,255,255,0.08)',
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease',
      }}
    >
      <span
        className="relative z-10 text-white h-full w-full flex items-center justify-center gap-2 px-8 whitespace-nowrap"
        style={{ fontFamily: '"Gothic A1", sans-serif', fontWeight: 700 }}
      >
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  const button = useInteractiveButton();

  return (
    <a
      href={href}
      onMouseMove={button.handleMouseMove}
      onMouseEnter={(e) => {
        button.handleMouseEnter();
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px) scale(1.03)';
      }}
      onMouseLeave={(e) => {
        button.handleMouseLeave();
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
      }}
      className="h-12 rounded-full relative overflow-hidden active:scale-95 group border border-white/15 inline-flex"
      style={{
        background: `radial-gradient(circle at ${button.mousePosition.x}% ${button.mousePosition.y}%, rgba(120,120,120,0.25), rgba(80,80,80,0.15))`,
        transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <span
        className="relative z-10 text-white/70 h-full w-full flex items-center justify-center gap-2 px-8 whitespace-nowrap"
        style={{ fontFamily: '"Gothic A1", sans-serif', fontWeight: 700 }}
      >
        {children}
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </a>
  );
}