'use client';

import React, { useState } from 'react';
import { useCosmic } from '@/context/CosmicContext';
import { HERO_ORB_CAPTIONS, ZODIAC_GLYPHS } from '@/data/astrology';
import { COSMIC_TARGETS } from '@/data/palettes';

export default function HeroGyroscope() {
  const { palette, targetIndex, selectCosmicTarget } = useCosmic();
  const [orbMode, setOrbMode] = useState(0);

  const cx = 250;
  const cy = 250;

  const handleCycleMode = () => {
    setOrbMode((prev) => (prev + 1) % HERO_ORB_CAPTIONS.length);
    selectCosmicTarget((targetIndex + 1) % COSMIC_TARGETS.length);
  };

  return (
    <div
      id="hero-orb-wrapper"
      className="relative w-full max-w-[420px] aspect-square flex items-center justify-center select-none cursor-pointer group"
      onClick={handleCycleMode}
    >
      {/* Outer Ambient Aura */}
      <div
        className="absolute inset-6 rounded-full blur-3xl opacity-35 transition-all duration-700 group-hover:opacity-55"
        style={{
          background:
            'radial-gradient(circle, var(--accent-1) 0%, var(--accent-2) 60%, transparent 100%)',
        }}
      />

      {/* Interactive SVG 3D Gyroscope */}
      <svg
        id="hero-gyro-svg"
        viewBox="0 0 500 500"
        className="w-full h-full overflow-visible transition-transform duration-300 ease-out"
      >
        <defs>
          <radialGradient id="orbCoreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={palette.accent1} stopOpacity="0.35" />
            <stop offset="55%" stopColor={palette.accent2} stopOpacity="0.12" />
            <stop offset="100%" stopColor={palette.bgDeep} stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx={cx} cy={cy} r="225" fill="url(#orbCoreGrad)" />
        <circle
          cx={cx}
          cy={cy}
          r="215"
          fill="none"
          stroke={palette.accent1}
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <circle
          cx={cx}
          cy={cy}
          r="170"
          fill="none"
          stroke={palette.accent2}
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeDasharray="4 6"
          className="anim-spin-ccw"
        />

        <g className="anim-spin-cw">
          <ellipse
            cx={cx}
            cy={cy}
            rx="205"
            ry="72"
            transform="rotate(-28 250 250)"
            fill="none"
            stroke={palette.accent1}
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />
          <ellipse
            cx={cx}
            cy={cy}
            rx="205"
            ry="72"
            transform="rotate(42 250 250)"
            fill="none"
            stroke={palette.accent2}
            strokeWidth="1.1"
            strokeOpacity="0.45"
          />
          {ZODIAC_GLYPHS.map((glyph, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            const x = cx + Math.cos(a) * 192;
            const y = cy + Math.sin(a) * 192;
            return (
              <text
                key={glyph}
                x={x}
                y={y}
                fill={palette.accentSoft}
                fontSize="14"
                textAnchor="middle"
                dominantBaseline="central"
                opacity="0.9"
              >
                {glyph}
              </text>
            );
          })}
        </g>

        <g className="anim-spin-ccw">
          {Array.from({ length: 8 }).map((_, i) => {
            const a1 = (i * 45 * Math.PI) / 180;
            const a2 = (((i + 3) * 45) * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={cx + Math.cos(a1) * 115}
                y1={cy + Math.sin(a1) * 115}
                x2={cx + Math.cos(a2) * 115}
                y2={cy + Math.sin(a2) * 115}
                stroke={palette.accent1}
                strokeWidth="0.9"
                strokeOpacity="0.45"
              />
            );
          })}
          <circle
            cx={cx}
            cy={cy}
            r="115"
            fill="none"
            stroke={palette.accentSoft}
            strokeOpacity="0.25"
            strokeWidth="0.9"
          />
        </g>

        <circle
          cx={cx}
          cy={cy}
          r="28"
          fill={palette.bgDeep}
          stroke={palette.accent1}
          strokeWidth="1.6"
        />
        <path
          d="M250 232 L254 246 L268 250 L254 254 L250 268 L246 254 L232 250 L246 246 Z"
          fill={palette.accentSoft}
          className="anim-pulse-node"
        />
      </svg>

      {/* Floating Interactive Badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 mystic-card rounded-full px-4 py-1.5 text-[11px] font-mono text-accent-soft flex items-center gap-2 shadow-lg whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-current text-accent-1 animate-ping" />
        <span id="hero-orb-caption">{HERO_ORB_CAPTIONS[orbMode]}</span>
      </div>
    </div>
  );
}

