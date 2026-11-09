'use client';

import React, { useState } from 'react';
import { useCosmic } from '@/context/CosmicContext';
import { computeLunarReading } from '@/lib/destinyCalculator';

export default function LunarWidget() {
  const { palette: p } = useCosmic();
  const [moonSlider, setMoonSlider] = useState(36);

  const { phaseName, illum, text, rx, sweep } = computeLunarReading(moonSlider);

  return (
    <div
      className="mystic-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between scroll-morph"
      style={{ transitionDelay: '200ms' }}
    >
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-accent-soft mb-4">
          <span>ИНТЕРАКТИВ 03 // ЛУННЫЙ ЦИКЛ</span>
          <span id="moon-phase-label" className="text-accent-1">
            {phaseName} • {illum}%
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
          Ритмы и энергия Луны
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm font-light mb-4">
          Двигай ползунок фазы, чтобы узнать, для каких шагов открыто пространство.
        </p>
      </div>

      {/* Dynamic Moon SVG */}
      <div className="relative w-40 h-40 mx-auto my-2 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-30"
          style={{ background: 'var(--accent-1)' }}
        />
        <svg
          id="interactive-moon-svg"
          viewBox="0 0 160 160"
          className="w-full h-full overflow-visible"
        >
          <circle
            cx="80"
            cy="80"
            r="68"
            fill="none"
            stroke={p.accent1}
            strokeWidth="0.9"
            strokeOpacity="0.35"
            strokeDasharray="3 4"
            className="anim-spin-cw"
          />
          <circle
            cx="80"
            cy="80"
            r="56"
            fill="#0B0F1D"
            stroke={p.accent1}
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <path
            d={`M 80 24 A 56 56 0 0 1 80 136 A ${rx} 56 0 0 ${sweep} 80 24 Z`}
            fill={p.accentSoft}
            opacity="0.9"
            className="anim-pulse-node"
          />
          <circle
            cx="80"
            cy="80"
            r="62"
            fill="none"
            stroke={p.accent2}
            strokeOpacity="0.22"
            strokeDasharray="3 5"
            className="anim-spin-ccw"
          />
        </svg>
      </div>

      <div className="space-y-4 pt-2">
        <div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span>Новолуние</span>
            <span>Полнолуние</span>
            <span>Завершение</span>
          </div>
          <input
            type="range"
            id="moon-slider"
            min="1"
            max="99"
            value={moonSlider}
            onChange={(e) => setMoonSlider(Number(e.target.value))}
            className="cosmic-slider"
          />
        </div>

        <div
          id="moon-advice-box"
          className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 font-light leading-relaxed"
        >
          {text}
        </div>
      </div>
    </div>
  );
}

