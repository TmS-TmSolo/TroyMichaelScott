'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { useLiteMode } from '@/lib/use-reduced-motion';

interface ThoughtParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  text?: string;
}

const THOUGHT_WORDS = [
  'consciousness', 'awareness', 'being', 'thought', 'mind',
  'reality', 'truth', 'wonder', 'existence', 'perception',
  'experience', 'mystery', 'knowing', 'feeling', 'seeing',
];

export function ThoughtParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<ThoughtParticle[]>([]);
  const animationRef = useRef<number>(0);
  const liteMode = useLiteMode();

  const createParticle = useCallback((canvas: HTMLCanvasElement): ThoughtParticle => {
    const hasText = Math.random() < 0.15; // 15% chance to be a thought word
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(0.2 + Math.random() * 0.5),
      size: hasText ? 12 : 2 + Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.3,
      life: 1,
      maxLife: 300 + Math.random() * 400,
      text: hasText ? THOUGHT_WORDS[Math.floor(Math.random() * THOUGHT_WORDS.length)] : undefined,
    };
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxParticles = liteMode ? 15 : 40;

    // Add new particles
    if (particlesRef.current.length < maxParticles && Math.random() < 0.1) {
      particlesRef.current.push(createParticle(canvas));
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx += (Math.random() - 0.5) * 0.02; // Gentle drift
      p.life -= 1 / p.maxLife;

      if (p.life <= 0 || p.y < -50) return false;

      const alpha = p.opacity * p.life;

      if (p.text) {
        // Draw thought word
        ctx.font = `${p.size}px "EB Garamond", serif`;
        ctx.fillStyle = `rgba(212, 175, 55, ${alpha * 0.5})`;
        ctx.fillText(p.text, p.x, p.y);
      } else {
        // Draw smoke particle
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
        gradient.addColorStop(0, `rgba(212, 175, 55, ${alpha * 0.4})`);
        gradient.addColorStop(0.5, `rgba(180, 150, 60, ${alpha * 0.2})`);
        gradient.addColorStop(1, 'rgba(180, 150, 60, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      return true;
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [createParticle, liteMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  if (liteMode) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
