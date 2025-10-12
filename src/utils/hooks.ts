'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'framer-motion';
import { generateScrollContainerStyles } from './scrollContainer';

/*
  Mobile detection hook ===================================
*/
export const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

/*
  Advanced in-view hook ====================================
*/
export const useAdvancedInView = (threshold: number = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    amount: threshold,
    once: true 
  });
  return [ref, isInView] as const;
};

/*
  Drag to Scroll with Momentum Hook ========================
*/
export const useDragScroll = <T = any>() => {
  const isMobile = useMobileDetection();

  // Drag states
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  
  // Momentum states
  const [velocity, setVelocity] = useState(0);
  const [lastX, setLastX] = useState(0);
  const [lastTime, setLastTime] = useState(0);
  const momentumAnimationRef = useRef<number | null>(null);
  const lastCallTime = useRef<number>(0);

  // Momentum animation
  const startMomentumAnimation = useCallback((initialVelocity: number) => {
    if (!scrollContainerRef.current || Math.abs(initialVelocity) < 0.1) return;
    
    let currentVelocity = initialVelocity;
    const deceleration = 0.95;
    const minVelocity = 0.1;
    
    const animate = () => {
      if (!scrollContainerRef.current) return;
      
      const currentScrollLeft = scrollContainerRef.current.scrollLeft;
      const newScrollLeft = currentScrollLeft + currentVelocity;
      
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const clampedScrollLeft = Math.max(0, Math.min(maxScroll, newScrollLeft));
      
      scrollContainerRef.current.scrollLeft = clampedScrollLeft;
      currentVelocity *= deceleration;
      
      if (Math.abs(currentVelocity) > minVelocity && 
          clampedScrollLeft > 0 && 
          clampedScrollLeft < maxScroll) {
        momentumAnimationRef.current = requestAnimationFrame(animate);
      } else {
        momentumAnimationRef.current = null;
      }
    };
    
    momentumAnimationRef.current = requestAnimationFrame(animate);
  }, []);

  // Stop momentum animation
  const stopMomentumAnimation = useCallback(() => {
    if (momentumAnimationRef.current) {
      cancelAnimationFrame(momentumAnimationRef.current);
      momentumAnimationRef.current = null;
    }
  }, []);

  // Mouse Event Handlers (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current || isMobile) return;
    
    stopMomentumAnimation();
    
    setIsDragging(true);
    setStartX(e.pageX);
    setStartY(e.pageY);
    setDragDistance(0);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    
    setLastX(e.pageX);
    setLastTime(Date.now());
    setVelocity(0);
  };

  const handleMouseUp = () => {
    if (isDragging) {
      startMomentumAnimation(velocity);
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      startMomentumAnimation(velocity);
    }
    setIsDragging(false);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current || isMobile) return;
    
    const now = Date.now();
    if (now - lastCallTime.current < 16) return;
    lastCallTime.current = now;
    
    e.preventDefault();
    
    const x = e.pageX;
    const y = e.pageY;
    const walk = (x - startX) * 1.5;
    
    // Oblicz dystans przeciągnięcia
    const distance = Math.sqrt(Math.pow(x - startX, 2) + Math.pow(y - startY, 2));
    setDragDistance(distance);
    
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    
    const currentTime = Date.now();
    const currentX = e.pageX;
    
    const timeDiff = currentTime - lastTime;
    const xDiff = currentX - lastX;
    
    if (timeDiff > 0) {
      const newVelocity = (xDiff / timeDiff) * -1.5 * 16;
      setVelocity(newVelocity);
    }
    
    setLastX(currentX);
    setLastTime(currentTime);
  }, [isDragging, startX, startY, scrollLeft, lastTime, lastX, isMobile]);

  // Cleanup
  useEffect(() => {
    return () => stopMomentumAnimation();
  }, [stopMomentumAnimation]);

  // Handler dla kliknięć (sprawdza czy to był drag czy click)
  const handleItemClick = (item: T, callback: (item: T) => void) => {
    // Jeśli dystans przeciągnięcia jest większy niż 5px, to nie wykonuj akcji
    if (dragDistance > 5) {
      return;
    }
    callback(item);
  };

  // Zwracamy wszystko czego potrzebują komponenty
  return {
    scrollContainerRef,
    isDragging,
    isMobile,
    dragDistance,
    // Event handlers
    handleMouseDown: !isMobile ? handleMouseDown : undefined,
    handleMouseUp: !isMobile ? handleMouseUp : undefined,
    handleMouseLeave: !isMobile ? handleMouseLeave : undefined,
    handleMouseMove: !isMobile ? handleMouseMove : undefined,
    // Helper do obsługi kliknięć
    handleItemClick
  };
};

export const useScrollContainerStyles = (
  isMobile: boolean,
) => {;
  useEffect(() => {
    const styleId = `scroll-container-styles`;
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    
    styleElement.textContent = generateScrollContainerStyles(isMobile);
    
    return () => {
      // Cleanup on unmount
      const element = document.getElementById(styleId);
      if (element) {
        element.remove();
      }
    };
  }, [isMobile]);
};

/* Auto Scroll Hook ========================================
*/
export const useAutoScroll = (
  scrollContainerRef: React.RefObject<HTMLDivElement | null>,
  activeIndex: number,
  itemsLength: number,
  interval: number = 5000
) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const autoScrollInterval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const nextIndex = (activeIndex + 1) % itemsLength;
      const targetCard = container.querySelector(`.scroll-item:nth-child(${nextIndex + 1})`) as HTMLElement;
      
      if (targetCard) {
        const containerCenter = container.clientWidth / 2;
        const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
        const scrollLeft = cardCenter - containerCenter;
        
        container.scrollTo({ 
          left: Math.max(0, scrollLeft), 
          behavior: 'smooth' 
        });
      }
    }, interval);

    intervalRef.current = autoScrollInterval;
    return () => clearInterval(autoScrollInterval);
  }, [activeIndex, itemsLength, interval]);
};


/* 
  Pagination Hook ========================================
*/
interface PaginationProps {
  totalItems: number;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onIndexChange?: (index: number) => void;
  autoScroll?: boolean;
  autoScrollInterval?: number;
}

export const usePagination = ({ 
  totalItems, 
  scrollContainerRef, 
  onIndexChange,
  autoScroll = false,
  autoScrollInterval = 5000
}: PaginationProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animatingDirection, setAnimatingDirection] = useState<'left' | 'right' | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const updateActiveIndex = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const cards = container.querySelectorAll('.scroll-item');
    
    let closestIndex = 0;
    let closestDistance = Infinity;
    
    cards.forEach((card, index) => {
      const cardElement = card as HTMLElement;
      const cardCenter = cardElement.offsetLeft + cardElement.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
      onIndexChange?.(closestIndex);
    }
  }, [activeIndex, onIndexChange]);

  const scrollToIndex = useCallback((index: number, isAutoScroll = false) => {
    if (!scrollContainerRef.current || index < 0 || index >= totalItems) return;
    if (index === activeIndex && !isAutoScroll) return;
    if (isAnimating && !isAutoScroll) return;
    
    setIsAnimating(true);
    setAnimatingDirection(index > activeIndex ? 'right' : 'left');
    setActiveIndex(index);
    onIndexChange?.(index);

    const container = scrollContainerRef.current;
    const targetCard = container.querySelector(`.scroll-item:nth-child(${index + 1})`) as HTMLElement;
    
    if (targetCard) {
      const containerCenter = container.clientWidth / 2;
      const cardCenter = targetCard.offsetLeft + targetCard.offsetWidth / 2;
      const scrollLeft = cardCenter - containerCenter;
      
      container.scrollTo({ 
        left: Math.max(0, scrollLeft), 
        behavior: 'smooth' 
      });
    }

    setTimeout(() => {
      setIsAnimating(false);
      setAnimatingDirection(null);
    }, 200);
  }, [activeIndex, isAnimating, totalItems, onIndexChange]);

  useEffect(() => {
    if (!autoScroll || !scrollContainerRef.current || isUserInteracting) return;

    intervalRef.current = window.setInterval(() => {
      const currentIndex = activeIndex;
      const nextIndex = (currentIndex + 1) % totalItems;
      scrollToIndex(nextIndex, true);
    }, autoScrollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoScroll, autoScrollInterval, totalItems, activeIndex, isUserInteracting, scrollToIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
        
    const handleScroll = () => {
      updateActiveIndex();
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [updateActiveIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleUserStart = () => {
      setIsUserInteracting(true);
    };

    const handleUserEnd = () => {
      // Opóźnij restart autoscroll
      setTimeout(() => {
        setIsUserInteracting(false);
      }, 2000); // 2 sekundy po zakończeniu interakcji
    };

    // Nasłuchuj zdarzeń interakcji
    container.addEventListener('mousedown', handleUserStart);
    container.addEventListener('touchstart', handleUserStart);
    container.addEventListener('wheel', handleUserStart);
    
    container.addEventListener('mouseup', handleUserEnd);
    container.addEventListener('touchend', handleUserEnd);
    container.addEventListener('mouseleave', handleUserEnd);

    return () => {
      container.removeEventListener('mousedown', handleUserStart);
      container.removeEventListener('touchstart', handleUserStart);
      container.removeEventListener('wheel', handleUserStart);
      container.removeEventListener('mouseup', handleUserEnd);
      container.removeEventListener('touchend', handleUserEnd);
      container.removeEventListener('mouseleave', handleUserEnd);
    };
  }, []);

  const scrollLeft = useCallback(() => {
    if (activeIndex > 0) {
      setIsUserInteracting(true); // Zatrzymaj autoscroll
      scrollToIndex(activeIndex - 1);
      setTimeout(() => setIsUserInteracting(false), 2000);
    }
  }, [activeIndex, scrollToIndex]);

  const scrollRight = useCallback(() => {
    if (activeIndex < totalItems - 1) {
      setIsUserInteracting(true); // Zatrzymaj autoscroll
      scrollToIndex(activeIndex + 1);
      setTimeout(() => setIsUserInteracting(false), 2000);
    }
  }, [activeIndex, totalItems, scrollToIndex]);

  const handleDotClick = useCallback((index: number) => {
    setIsUserInteracting(true); // Zatrzymaj autoscroll
    scrollToIndex(index);
    setTimeout(() => setIsUserInteracting(false), 2000);
  }, [scrollToIndex]);

  return {
    activeIndex,
    isAnimating,
    animatingDirection,
    updateActiveIndex,
    scrollToIndex,
    scrollLeft,
    scrollRight,
    handleDotClick,
    canScrollLeft: activeIndex > 0,
    canScrollRight: activeIndex < totalItems - 1,
  };
};