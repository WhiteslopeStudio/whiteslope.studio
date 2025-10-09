import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationIndicatorProps {
  totalItems: number;
  activeIndex: number;
  isAnimating: boolean;
  animatingDirection: 'left' | 'right' | null;
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  onDotClick: (index: number) => void;
  className?: string;
  dotColor?: 'white' | 'orange';
}

export const PaginationIndicator = ({
  totalItems,
  activeIndex,
  isAnimating,
  animatingDirection,
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
  onDotClick,
  className = "",
  dotColor = 'white'
}: PaginationIndicatorProps) => {
  const activeDotStyles = dotColor === 'orange' 
    ? 'bg-gradient-to-r from-orange-300 to-pink-400'
    : 'bg-white';

  return (
    <div className={`flex justify-center items-center gap-3 mt-8 pb-4 ${className}`}>
      <button
        onClick={onScrollLeft}
        disabled={!canScrollLeft}
        className={`w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 ${
          !canScrollLeft 
            ? 'text-white/30 cursor-not-allowed' 
            : 'text-white/60 hover:text-white cursor-pointer'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 relative overflow-hidden">
        {/* Tło kropek */}
        {Array.from({ length: totalItems }, (_, index) => (
          <button
            key={`dot-${index}`}
            onClick={() => onDotClick(index)}
            className="w-2 h-2 rounded-full bg-white/30 transition-all duration-200 hover:bg-white/50 cursor-pointer"
            aria-label={`Przejdź do slajdu ${index + 1}`}
          />
        ))}
        
        {/* Aktywny wskaźnik */}
        <div
          className={`absolute w-2 h-2 ${activeDotStyles} pointer-events-none transition-all ease-out ${
            isAnimating ? 'duration-150 rounded-lg' : 'duration-200 rounded-full'
          }`}
          style={{
            left: `${16 + (activeIndex * 16)}px`,
            transform: isAnimating
              ? `translateX(${animatingDirection === 'right' ? '4px' : '-4px'}) scaleX(1.6)`
              : 'translateX(0) scaleX(1)',
            transformOrigin: 'center',
          }}
        />
      </div>

      <button
        onClick={onScrollRight}
        disabled={!canScrollRight}
        className={`w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 ${
          !canScrollRight
            ? 'text-white/30 cursor-not-allowed'
            : 'text-white/60 hover:text-white cursor-pointer'
        }`}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};