'use client';

import React from 'react';
import { LibraryBackground } from './library-background';
import { DustMotes } from './dust-motes';
import { ReadingDesk } from './reading-desk';

interface LibrarySceneProps {
  children: React.ReactNode;
  quiet?: boolean;
}

export function LibraryScene({ children, quiet = false }: LibrarySceneProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background layers */}
      <LibraryBackground />

      {/* Floating dust particles — suppressed in reading mode */}
      {!quiet && <DustMotes />}

      {/* Content container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-32 px-4 pb-24">
        <ReadingDesk>
          {children}
        </ReadingDesk>
      </div>
    </div>
  );
}
