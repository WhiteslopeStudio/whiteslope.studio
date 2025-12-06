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

  // Drag states - POPRAWIONE: dodane domyślne wartości
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [dragDistance, setDragDistance] = useState<number>(0);
  
  // Momentum states - POPRAWIONE: dodane domyślne wartości
  const [velocity, setVelocity] = useState<number>(0);
  const [lastX, setLastX] = useState<number>(0);
  const [lastTime, setLastTime] = useState<number>(0);
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

/* Intersection Observer Hook ========================================
 * Hook który sprawdza czy element jest widoczny w viewport
 */

interface IntersectionObserverOptions {
  // Próg widoczności (0.0 - 1.0)
  threshold?: number;
  // Margines wokół viewport (np. '-100px' żeby odpalić wcześniej)
  rootMargin?: string;
  // Czy animacja ma się odpalić tylko raz
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: IntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1, // 10% elementu musi być widoczne
    rootMargin = '0px',
    triggerOnce = true, // Domyślnie odpala się tylko raz
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Jeśli już było widoczne i triggerOnce=true, nie rób nic
    if (triggerOnce && hasBeenVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        if (visible && !hasBeenVisible) {
          setHasBeenVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenVisible]);

  return {
    ref,
    isVisible: triggerOnce ? hasBeenVisible : isVisible,
  };
};

/* Stagger Animation Hook ========================================
 * Hook do animacji wjeżdżania elementów (jak na TikToku)
 * - Wjeżdżanie z dołu (translateY)
 * - Przejście z blur na sharp
 * - Fade in (opacity)
 */

interface StaggerAnimationOptions {
  // Początkowe opóźnienie przed startem animacji (ms)
  initialDelay?: number;
  // Opóźnienie między każdym elementem (ms)
  staggerDelay?: number;
  // Czas trwania pojedynczej animacji (ms)
  duration?: number;
  // Odległość startowa w px (jak daleko z dołu startuje)
  translateY?: number;
  // Siła początkowego blura w px
  blurAmount?: number;
  // Funkcja easingu (CSS cubic-bezier)
  easing?: string;
  // Czy animacja ma startować od razu (true) czy czekać na trigger (false)
  autoStart?: boolean;
}

export const useStaggerAnimation = (
  itemCount: number,
  options: StaggerAnimationOptions = {}
) => {
  const {
    initialDelay = 0,
    staggerDelay = 100,
    duration = 800,
    translateY = 30,
    blurAmount = 10,
    easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
    autoStart = true, // Nowy parametr
  } = options;

  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [isTriggered, setIsTriggered] = useState(autoStart);

  useEffect(() => {
    if (!isTriggered) return;

    // Uruchamiamy animację dla każdego elementu z odpowiednim opóźnieniem
    const timers: NodeJS.Timeout[] = [];

    for (let i = 0; i < itemCount; i++) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => new Set([...prev, i]));
      }, initialDelay + (i * staggerDelay));
      
      timers.push(timer);
    }

    // Cleanup - usuwamy wszystkie timery przy unmount
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [itemCount, initialDelay, staggerDelay, isTriggered]);

  // Funkcja która zwraca style dla konkretnego elementu
  const getItemStyle = (index: number): React.CSSProperties => {
    const isVisible = visibleItems.has(index);
    
    return {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : `translateY(${translateY}px)`,
      filter: isVisible ? 'blur(0px)' : `blur(${blurAmount}px)`,
      transition: `all ${duration}ms ${easing}`,
    };
  };

  return {
    // Style dla konkretnego indeksu
    getItemStyle,
    // Stan widoczności (jeśli potrzebujesz)
    visibleItems,
    // Czy wszystkie elementy są już widoczne
    isComplete: visibleItems.size === itemCount,
    // Funkcja do manualnego triggera
    trigger: () => setIsTriggered(true),
    // Reset animacji
    reset: () => {
      setVisibleItems(new Set());
      setIsTriggered(false);
    },
  };
};

/* Animated Text Hook ========================================
 * Hook do animacji tekstu słowo po słowie
 */

interface AnimatedTextOptions {
  // Początkowe opóźnienie (ms)
  startDelay?: number;
  // Opóźnienie między słowami (ms)
  wordDelay?: number;
  // Opcje animacji (te same co w useStaggerAnimation)
  animationOptions?: Omit<StaggerAnimationOptions, 'initialDelay' | 'staggerDelay'>;
}

export const useAnimatedText = (
  text: string,
  options: AnimatedTextOptions = {}
) => {
  const {
    startDelay = 0,
    wordDelay = 100,
    animationOptions = {}
  } = options;

  const words = text.split(' ');
  const animation = useStaggerAnimation(words.length, {
    initialDelay: startDelay,
    staggerDelay: wordDelay,
    ...animationOptions
  });

  return {
    words,
    ...animation
  };
};

/* Single Element Animation Hook ========================================
 * Hook do animacji pojedynczego elementu (uproszczona wersja)
 */

export const useSingleAnimation = (
  delay: number = 0,
  options: Omit<StaggerAnimationOptions, 'initialDelay' | 'staggerDelay'> = {}
) => {
  const animation = useStaggerAnimation(1, {
    initialDelay: delay,
    staggerDelay: 0,
    ...options
  });

  return {
    style: animation.getItemStyle(0),
    isVisible: animation.visibleItems.has(0),
    trigger: animation.trigger,
    reset: animation.reset,
  };
};

/* Scroll Animation Hook ========================================
 * Kombinacja IntersectionObserver + Stagger Animation
 * Animacja odpala się gdy element wjedzie w viewport
 */

interface ScrollAnimationOptions extends StaggerAnimationOptions {
  // Opcje IntersectionObserver
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (
  itemCount: number,
  options: ScrollAnimationOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    ...animationOptions
  } = options;

  // Obserwuj widoczność
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce,
  });

  // Animacja z autoStart=false
  const animation = useStaggerAnimation(itemCount, {
    ...animationOptions,
    autoStart: false,
  });

  // Trigger animacji gdy element stanie się widoczny
  useEffect(() => {
    if (isVisible) {
      animation.trigger();
    }
  }, [isVisible]);

  return {
    ref,
    ...animation,
  };
};

/* Single Scroll Animation Hook ========================================
 * Pojedynczy element z scroll triggerem
 */

export const useSingleScrollAnimation = (
  delay: number = 0,
  options: Omit<ScrollAnimationOptions, 'initialDelay' | 'staggerDelay'> = {}
) => {
  const animation = useScrollAnimation(1, {
    initialDelay: delay,
    staggerDelay: 0,
    ...options
  });

  return {
    ref: animation.ref,
    style: animation.getItemStyle(0),
    isVisible: animation.visibleItems.has(0),
  };
};