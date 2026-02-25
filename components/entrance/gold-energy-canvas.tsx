'use client';

import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
  drift: number;
}

interface GoldEnergyCanvasProps {
  isActive: boolean;
  intensity?: number;
  className?: string;
}

export function GoldEnergyCanvas({ 
  isActive, 
  intensity = 1,
  className = '' 
}: GoldEnergyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  const createParticle = useCallback((centerX: number, centerY: number, spread: number): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * spread;
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance * 0.3,
      vx: (Math.random() - 0.5) * 1.5,
      vy: -(0.5 + Math.random() * 1.5),
      life: 1,
      maxLife: 40 + Math.random() * 80,
      size: 1 + Math.random() * 4,
      hue: 38 + Math.random() * 12,
      drift: (Math.random() - 0.5) * 0.05,
    };
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear with fade
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Add new particles along the seam
    if (isActive) {
      const particlesToAdd = Math.floor(2 + intensity * 3);
      for (let i = 0; i < particlesToAdd; i++) {
        const seamX = centerX + (Math.random() - 0.5) * canvas.width * 0.7;
        particlesRef.current.push(createParticle(seamX, centerY, 8));
      }
    }

    // Update and draw particles
    particlesRef.current = particlesRef.current.filter((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vx += p.drift;
      p.vy -= 0.015; // Upward acceleration
      p.life -= 1 / p.maxLife;

      if (p.life <= 0) return false;

      const alpha = p.life * 0.9;
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      gradient.addColorStop(0, `hsla(${p.hue}, 75%, 55%, ${alpha})`);
      gradient.addColorStop(0.4, `hsla(${p.hue}, 65%, 45%, ${alpha * 0.6})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 55%, 35%, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fill();

      return true;
    });

    // Draw the glowing seam line
    if (isActive && intensity > 0) {
      const seamWidth = canvas.width * 0.8;
      const seamStartX = (canvas.width - seamWidth) / 2;
      
      // Outer glow
      ctx.shadowColor = '#D4AF37';
      ctx.shadowBlur = 25 * intensity;
      
      const seamGradient = ctx.createLinearGradient(seamStartX, centerY, seamStartX + seamWidth, centerY);
      seamGradient.addColorStop(0, 'rgba(212, 175, 55, 0)');
      seamGradient.addColorStop(0.2, `rgba(212, 175, 55, ${0.4 * intensity})`);
      seamGradient.addColorStop(0.5, `rgba(212, 175, 55, ${0.7 * intensity})`);
      seamGradient.addColorStop(0.8, `rgba(212, 175, 55, ${0.4 * intensity})`);
      seamGradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

      ctx.strokeStyle = seamGradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(seamStartX, centerY);
      ctx.lineTo(seamStartX + seamWidth, centerY);
      ctx.stroke();
      ctx.shadowBlur = 0;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isActive, intensity, createParticle]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
