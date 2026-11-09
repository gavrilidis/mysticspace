'use client';

import { useEffect } from 'react';
import { useCosmic } from '@/context/CosmicContext';

export function useScrollMorph() {
  const { flightRef } = useCosmic();

  useEffect(() => {
    const morphObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.22, rootMargin: '0px 0px -12% 0px' }
    );

    const elements = document.querySelectorAll('.scroll-morph');
    elements.forEach((el) => morphObserver.observe(el));

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = Math.abs(currentY - lastScrollY);
      lastScrollY = currentY;
      flightRef.current.scrollBoost = Math.min(
        10,
        flightRef.current.scrollBoost + delta * 0.04
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      flightRef.current.targetSteerX = nx;
      flightRef.current.targetSteerY = ny;

      const gyro = document.getElementById('hero-gyro-svg');
      if (gyro) {
        gyro.style.transform = `perspective(900px) rotateY(${nx * 14}deg) rotateX(${-ny * 14}deg)`;
      }

      document.querySelectorAll<HTMLElement>('.mystic-card').forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (e.clientY >= rect.top - 100 && e.clientY <= rect.bottom + 100) {
          card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const nx = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        flightRef.current.targetSteerX = nx;
        flightRef.current.targetSteerY = ny;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      morphObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [flightRef]);
}

