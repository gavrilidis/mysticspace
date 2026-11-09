'use client';

import { useEffect } from 'react';
import { useCosmic } from '@/context/CosmicContext';

export default function AnimatedFavicon() {
  const { palette } = useCosmic();

  useEffect(() => {
    const size = 64;
    const cx = size / 2;
    const cy = size / 2;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    let angle = 0;

    const drawFrame = () => {
      angle += 0.08;
      ctx.clearRect(0, 0, size, size);

      // Deep space circular emblem background
      ctx.fillStyle = palette.bgDeep;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      // Outer golden border ring
      ctx.strokeStyle = palette.accent1;
      ctx.globalAlpha = 0.55;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, 29, 0, Math.PI * 2);
      ctx.stroke();

      // Rotating dashed astrolabe ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 0.6);
      ctx.strokeStyle = palette.accent1;
      ctx.globalAlpha = 0.45;
      ctx.lineWidth = 1.4;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, 23, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Counter-rotating ellipse 1 + orbiting satellite
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-angle);
      ctx.strokeStyle = palette.accent1;
      ctx.globalAlpha = 0.9;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 22, 9, -Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      const satX = Math.cos(-Math.PI / 6) * 22;
      const satY = Math.sin(-Math.PI / 6) * 22;
      ctx.fillStyle = palette.accentSoft;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(satX, satY, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Clockwise rotating ellipse 2
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 0.85);
      ctx.strokeStyle = palette.accent2;
      ctx.globalAlpha = 0.78;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.ellipse(0, 0, 22, 9, Math.PI / 4.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Pulsing 4-point mystic star at center
      const pulse = 0.9 + 0.18 * Math.sin(angle * 2);
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(pulse, pulse);
      ctx.fillStyle = palette.accentSoft;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(2.8, -2.8);
      ctx.lineTo(12, 0);
      ctx.lineTo(2.8, 2.8);
      ctx.lineTo(0, 12);
      ctx.lineTo(-2.8, 2.8);
      ctx.lineTo(-12, 0);
      ctx.lineTo(-2.8, -2.8);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      if (link) {
        link.type = 'image/png';
        link.href = canvas.toDataURL('image/png');
      }
    };

    drawFrame();
    const timer = window.setInterval(drawFrame, 120);

    return () => {
      window.clearInterval(timer);
    };
  }, [palette]);

  return null;
}

