'use client';

import React from 'react';
import { usePageTransition } from './page-transition';

type TransitionType = 'door' | 'portal' | 'fade' | 'book';

interface TransitionLinkProps {
  href: string;
  children: React.ReactNode;
  transition?: TransitionType;
  className?: string;
  onClick?: () => void;
}

export function TransitionLink({ 
  href, 
  children, 
  transition = 'portal',
  className = '',
  onClick,
}: TransitionLinkProps) {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    navigateWithTransition(href, transition);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
