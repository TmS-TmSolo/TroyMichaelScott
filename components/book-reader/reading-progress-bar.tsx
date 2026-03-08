'use client';

import React, { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-gold/50 via-gold to-gold/50"
        style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
      />
    </div>
  );
}
