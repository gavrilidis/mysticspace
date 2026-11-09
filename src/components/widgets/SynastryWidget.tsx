'use client';

import React, { useState } from 'react';
import { useCosmic } from '@/context/CosmicContext';
import { ELEMENT_OPTIONS, getSynastryReading } from '@/data/synastry';
import { ElementKey } from '@/types/mystic';

export default function SynastryWidget() {
  const { palette: p } = useCosmic();
  const [elem1, setElem1] = useState<ElementKey>('fire');
  const [elem2, setElem2] = useState<ElementKey>('air');

  const data = getSynastryReading(elem1, elem2);
  const offset = Math.round((100 - data.score) * 1.4);
  const r1x = 122 - offset;
  const r2x = 178 + offset;

  return (
    <div
      className="mystic-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between scroll-morph"
      style={{ transitionDelay: '100ms' }}
    >
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-accent-soft mb-4">
          <span>ИНТЕРАКТИВ 02 // СИНАСТРИЯ</span>
          <span id="syn-percent-badge" className="text-accent-1 font-semibold">
            {data.score}% Резонанс
          </span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
          Притяжение двух орбит
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm font-light mb-4">
          Выбери две стихии и посмотри, как взаимодействуют ваши энергетические поля.
        </p>
      </div>

      {/* Binary Orbits SVG */}
      <div className="relative w-full h-48 flex items-center justify-center my-2">
        <svg
          id="synastry-mini-svg"
          viewBox="0 0 300 180"
          className="w-full h-full overflow-visible"
        >
          <g className="anim-spin-cw">
            <circle
              cx={r1x}
              cy="90"
              r="56"
              fill={p.accent1}
              fillOpacity="0.12"
              stroke={p.accent1}
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />
            <circle cx={r1x} cy="34" r="4.5" fill={p.accent1} />
          </g>
          <g className="anim-spin-ccw">
            <circle
              cx={r2x}
              cy="90"
              r="56"
              fill={p.accent2}
              fillOpacity="0.12"
              stroke={p.accent2}
              strokeWidth="1.6"
              strokeDasharray="6 4"
            />
            <circle cx={r2x} cy="146" r="4.5" fill={p.accent2} />
          </g>
          <line
            x1={r1x}
            y1="90"
            x2={r2x}
            y2="90"
            stroke={p.accentSoft}
            strokeOpacity="0.6"
            strokeDasharray="3 3"
            className="anim-dash-flow"
          />
          <circle
            cx="150"
            cy="90"
            r="18"
            fill={p.bgDeep}
            stroke={p.accent1}
            strokeWidth="1.4"
            className="anim-pulse-node"
          />
          <text
            x="150"
            y="90"
            fill="#fff"
            fontSize="10"
            fontFamily="JetBrains Mono"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {data.score}%
          </text>
        </svg>
      </div>

      {/* Element Selectors & Verdict */}
      <div className="space-y-4 pt-2">
        <div className="grid grid-cols-2 gap-2.5 text-xs">
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Твоя стихия:
            </span>
            <select
              id="syn-elem-1"
              value={elem1}
              onChange={(e) => setElem1(e.target.value as ElementKey)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
            >
              {ELEMENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Партнёр:
            </span>
            <select
              id="syn-elem-2"
              value={elem2}
              onChange={(e) => setElem2(e.target.value as ElementKey)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none"
            >
              {ELEMENT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div
          id="syn-verdict-box"
          className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-slate-200 font-light leading-relaxed"
        >
          {data.text}
        </div>
      </div>
    </div>
  );
}

