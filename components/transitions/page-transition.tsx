'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';
import { useLiteMode } from '@/hooks/use-reduced-motion';

type TransitionType = 'door' | 'portal' | 'fade' | 'book';

interface TransitionContextType {
  isTransitioning: boolean;
  transitionType: TransitionType;
  navigateWithTransition: (href: string, type?: TransitionType) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  isTransitioning: false,
  transitionType: 'portal',
  navigateWithTransition: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<TransitionType>('portal');
  const [showOverlay, setShowOverlay] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const liteMode = useLiteMode();

  const navigateWithTransition = useCallback((href: string, type: TransitionType = 'portal') => {
    if (liteMode) {
      router.push(href);
      return;
    }

    setTransitionType(type);
    setIsTransitioning(true);
    setShowOverlay(true);

    // Navigate after transition starts
    setTimeout(() => {
      router.push(href);
    }, type === 'door' ? 1200 : 800);
  }, [router, liteMode]);

  // Reset transition when route changes
  useEffect(() => {
    if (isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setShowOverlay(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [pathname, isTransitioning]);

  return (
    <TransitionContext.Provider value={{ isTransitioning, transitionType, navigateWithTransition }}>
      {children}
      
      <AnimatePresence>
        {showOverlay && (
          <>
            {/* Door Transition */}
            {transitionType === 'door' && (
              <motion.div className="fixed inset-0 z-[100] flex overflow-hidden">
                {/* Left Door */}
                <motion.div
                  className="w-1/2 h-full bg-gradient-to-r from-zinc-900 to-zinc-800 relative"
                  initial={{ x: 0 }}
                  animate={{ x: '-100%' }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                  {/* Door detail */}
                  <div className="absolute inset-0 border-r-4 border-gold/30" />
                  <div className="absolute right-8 top-1/2 -translate-y-1/2 w-3 h-16 bg-gold/50 rounded" />
                  {/* Wood grain texture */}
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 50px, rgba(139,90,43,0.1) 50px, rgba(139,90,43,0.1) 51px)`
                  }} />
                </motion.div>
                
                {/* Right Door */}
                <motion.div
                  className="w-1/2 h-full bg-gradient-to-l from-zinc-900 to-zinc-800 relative"
                  initial={{ x: 0 }}
                  animate={{ x: '100%' }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                  <div className="absolute inset-0 border-l-4 border-gold/30" />
                  <div className="absolute left-8 top-1/2 -translate-y-1/2 w-3 h-16 bg-gold/50 rounded" />
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 50px, rgba(139,90,43,0.1) 50px, rgba(139,90,43,0.1) 51px)`
                  }} />
                </motion.div>

                {/* Light from within */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.5] }}
                  transition={{ duration: 1.2 }}
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.3) 0%, transparent 70%)'
                  }}
                />
              </motion.div>
            )}

            {/* Portal/Mind Transition */}
            {transitionType === 'portal' && (
              <motion.div
                className="fixed inset-0 z-[100]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Expanding golden ring */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  initial={{ width: 0, height: 0, opacity: 0 }}
                  animate={{ 
                    width: ['0vw', '300vw'], 
                    height: ['0vh', '300vh'],
                    opacity: [0, 1, 1]
                  }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  style={{
                    background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(0,0,0,0.95) 30%, black 100%)',
                    boxShadow: 'inset 0 0 100px rgba(212,175,55,0.5)',
                  }}
                />
                
                {/* Inner glow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.5, 3], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.2 }}
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.8) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                />
              </motion.div>
            )}

            {/* Book Page Turn */}
            {transitionType === 'book' && (
              <motion.div className="fixed inset-0 z-[100] bg-black">
                <motion.div
                  className="absolute inset-0 bg-library-paper origin-left"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: -180 }}
                  transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
                  style={{
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                  }}
                />
              </motion.div>
            )}

            {/* Simple Fade */}
            {transitionType === 'fade' && (
              <motion.div
                className="fixed inset-0 z-[100] bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
