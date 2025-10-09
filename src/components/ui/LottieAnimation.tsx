'use client';
import { useEffect, useRef } from 'react';

interface LottieAnimationProps {
  animationPath: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({ 
  animationPath, 
  className = '', 
  loop = true, 
  autoplay = true 
}: LottieAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationInstance: any = null;

    const loadLottie = async () => {
      try {
        // Dynamic import for client-side only
        const lottie = (await import('lottie-web')).default;
        
        if (ref.current) {
          // Clear any existing animation
          if (animationInstance) {
            animationInstance.destroy();
          }

          // Load animation data
          const response = await fetch(animationPath);
          const animationData = await response.json();

          animationInstance = lottie.loadAnimation({
            container: ref.current,
            renderer: 'svg',
            loop,
            autoplay,
            animationData,
          });
        }
      } catch (error) {
        console.error('Error loading Lottie animation:', error);
      }
    };

    loadLottie();

    return () => {
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, [animationPath, loop, autoplay]);

  return <div ref={ref} className={className} />;
}