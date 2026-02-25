'use client';

import { useState, useEffect } from 'react';

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}

export function useLiteMode(): boolean {
  const [liteMode, setLiteMode] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Check for low-power mode indicators
    const checkLiteMode = () => {
      // Reduced motion preference
      if (reducedMotion) return true;
      
      // Low device memory (if available)
      if ('deviceMemory' in navigator && (navigator as { deviceMemory?: number }).deviceMemory && (navigator as { deviceMemory?: number }).deviceMemory! < 4) {
        return true;
      }
      
      // Hardware concurrency (CPU cores)
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
        return true;
      }
      
      // Mobile device with small screen
      if (window.innerWidth < 768 && 'ontouchstart' in window) {
        return true;
      }
      
      return false;
    };

    setLiteMode(checkLiteMode());
  }, [reducedMotion]);

  return liteMode;
}
