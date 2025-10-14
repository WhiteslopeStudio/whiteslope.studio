'use client';

import { useEffect } from 'react';
import { useSearchEngine } from '@/utils/hooks/useSearchEngine';
import SearchEngine from './SearchEngine';

export function SearchEngineProvider() {
  const { toggle } = useSearchEngine();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K lub Cmd+K otwiera wyszukiwarkę
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

  return <SearchEngine />;
}