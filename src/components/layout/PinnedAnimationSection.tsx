'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Rejestruj plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimationConfig {
  /** Element do animacji (selector lub ref) */
  target: string;
  /** Wartości start animacji */
  from?: gsap.TweenVars;
  /** Wartości end animacji */
  to: gsap.TweenVars;
  /** Scrub - płynność animacji (true lub liczba) */
  scrub?: boolean | number;
}

interface PinnedAnimationSectionProps {
  children: ReactNode;
  /** Minimalna wysokość sekcji (ile scrollowania) */
  minHeight?: string;
  /** Czy przypinać element */
  pin?: boolean;
  /** Start trigger */
  start?: string;
  /** End trigger */
  end?: string;
  /** Debug markers */
  markers?: boolean;
  /** Animacje do zastosowania */
  animations?: AnimationConfig[];
  /** Callback gdy animacja się zaczyna */
  onEnter?: () => void;
  /** Callback gdy animacja się kończy */
  onLeave?: () => void;
  /** ID dla ScrollTrigger (debug) */
  id?: string;
}

export default function PinnedAnimationSection({
  children,
  minHeight = '200vh',
  pin = true,
  start = 'top top',
  end = 'bottom bottom',
  markers = false,
  animations = [],
  onEnter,
  onLeave,
  id,
}: PinnedAnimationSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Timeline dla wszystkich animacji
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pin ? contentRef.current : false,
          start: start,
          end: end,
          scrub: 1,
          markers: markers,
          id: id,
          onEnter: onEnter,
          onLeave: onLeave,
          invalidateOnRefresh: true,
        },
      });

      // Dodaj wszystkie animacje do timeline
      animations.forEach((anim) => {
        const target = anim.target;
        
        if (anim.from) {
          // Jeśli jest "from", użyj fromTo
          tl.fromTo(
            target,
            anim.from,
            {
              ...anim.to,
              ease: 'none',
            },
            0 // Wszystkie animacje zaczynają się równocześnie
          );
        } else {
          // Jeśli tylko "to", użyj to
          tl.to(
            target,
            {
              ...anim.to,
              ease: 'none',
            },
            0
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [pin, start, end, markers, animations, onEnter, onLeave, id]);

  return (
    <div 
      ref={sectionRef} 
      style={{ 
        minHeight: minHeight,
        position: 'relative',
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
export { PinnedAnimationSection as PinnedSection };