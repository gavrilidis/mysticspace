'use client';

import React from 'react';
import { useCosmic } from '@/context/CosmicContext';

interface MorphVisualizerProps {
  activeStep: number;
}

const NATAL_ANGLES = [20, 75, 135, 195, 250, 315];
const PLANET_SYMBOLS = ['☉', '☽', '♀', '♂', '♃', '♄'];
const MATRIX_NUMS = [5, 19, 8, 11, 15, 7, 21, 10];

export default function MorphVisualizer({ activeStep }: MorphVisualizerProps) {
  const { palette: p } = useCosmic();
  const cx = 200;
  const cy = 200;

  return (
    <svg
      id="morph-visualizer-svg"
      viewBox="0 0 400 400"
      className="w-full h-full overflow-visible transition-all duration-700"
    >
      {activeStep === 0 && (
        <>
          <circle
            cx={cx}
            cy={cy}
            r="172"
            fill="none"
            stroke={p.accent1}
            strokeOpacity="0.4"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            className="anim-spin-ccw"
          />
          <g className="anim-spin-cw">
            <circle
              cx={cx}
              cy={cy}
              r="135"
              fill="none"
              stroke={p.accent2}
              strokeOpacity="0.4"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            {NATAL_ANGLES.map((deg, i) => {
              const r = ((deg - 90) * Math.PI) / 180;
              const x = cx + Math.cos(r) * 135;
              const y = cy + Math.sin(r) * 135;
              const nextR =
                ((NATAL_ANGLES[(i + 2) % NATAL_ANGLES.length] - 90) * Math.PI) / 180;
              const nx = cx + Math.cos(nextR) * 135;
              const ny = cy + Math.sin(nextR) * 135;
              return (
                <g key={deg}>
                  <line
                    x1={x}
                    y1={y}
                    x2={nx}
                    y2={ny}
                    stroke={p.accent1}
                    strokeWidth="1.2"
                    strokeOpacity="0.6"
                    className="anim-dash-flow"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="12"
                    fill={p.bgDeep}
                    stroke={p.accent1}
                    strokeWidth="1.6"
                  />
                  <text
                    x={x}
                    y={y}
                    fill="#fff"
                    fontSize="11"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    {PLANET_SYMBOLS[i]}
                  </text>
                </g>
              );
            })}
          </g>
          <circle
            cx={cx}
            cy={cy}
            r="26"
            fill={p.accent1}
            fillOpacity="0.18"
            stroke={p.accent1}
            strokeWidth="1.4"
            className="anim-pulse-node"
          />
          <text
            x={cx}
            y={cy}
            fill={p.accentSoft}
            fontSize="14"
            fontFamily="JetBrains Mono"
            textAnchor="middle"
            dominantBaseline="central"
          >
            ASC
          </text>
        </>
      )}

      {activeStep === 1 && (
        <>
          <rect
            x="98"
            y="98"
            width="204"
            height="204"
            fill="none"
            stroke={p.accent1}
            strokeWidth="1.4"
            strokeOpacity="0.6"
            className="anim-spin-cw"
          />
          <rect
            x="98"
            y="98"
            width="204"
            height="204"
            transform="rotate(45 200 200)"
            fill="none"
            stroke={p.accent2}
            strokeWidth="1.4"
            strokeOpacity="0.6"
            className="anim-spin-ccw"
          />
          {MATRIX_NUMS.map((num, i) => {
            const a = ((i * 45 - 90) * Math.PI) / 180;
            const x = cx + Math.cos(a) * 145;
            const y = cy + Math.sin(a) * 145;
            return (
              <g key={num}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke={p.accent1}
                  strokeOpacity="0.35"
                  strokeWidth="1.1"
                  className="anim-dash-flow"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="16"
                  fill={p.bgDeep}
                  stroke={p.accent1}
                  strokeWidth="1.6"
                />
                <text
                  x={x}
                  y={y}
                  fill="#fff"
                  fontSize="11"
                  fontFamily="JetBrains Mono"
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {num}
                </text>
              </g>
            );
          })}
          <circle
            cx={cx}
            cy={cy}
            r="28"
            fill={p.bgDeep}
            stroke={p.accentSoft}
            strokeWidth="2"
            className="anim-pulse-node"
          />
          <text
            x={cx}
            y={cy}
            fill={p.accent1}
            fontSize="16"
            fontFamily="JetBrains Mono"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="central"
          >
            IX
          </text>
        </>
      )}

      {activeStep === 2 && (
        <>
          <g className="anim-tarot-left">
            <rect
              x="140"
              y="70"
              width="120"
              height="195"
              rx="12"
              fill={p.bgDeep}
              stroke={p.accent2}
              strokeWidth="1.4"
            />
            <circle
              cx="200"
              cy="165"
              r="26"
              fill="none"
              stroke={p.accent2}
              strokeOpacity="0.4"
              strokeDasharray="3 3"
              className="anim-spin-cw"
            />
          </g>
          <g className="anim-tarot-right">
            <rect
              x="140"
              y="70"
              width="120"
              height="195"
              rx="12"
              fill={p.bgDeep}
              stroke={p.accent2}
              strokeWidth="1.4"
            />
            <circle
              cx="200"
              cy="165"
              r="26"
              fill="none"
              stroke={p.accent2}
              strokeOpacity="0.4"
              strokeDasharray="3 3"
              className="anim-spin-ccw"
            />
          </g>
          <g className="anim-float">
            <rect
              x="135"
              y="55"
              width="130"
              height="210"
              rx="14"
              fill="#0B1020"
              stroke={p.accent1}
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="145"
              r="38"
              fill="none"
              stroke={p.accent1}
              strokeOpacity="0.55"
              strokeDasharray="4 3"
              className="anim-spin-cw"
            />
            <path
              d="M200 118 L206 139 L227 145 L206 151 L200 172 L194 151 L173 145 L194 139 Z"
              fill={p.accentSoft}
              className="anim-pulse-node"
            />
            <text
              x="200"
              y="235"
              fill="#fff"
              fontSize="12"
              fontFamily="Cormorant Garamond"
              letterSpacing="2"
              textAnchor="middle"
            >
              THE STAR • XVII
            </text>
          </g>
        </>
      )}

      {activeStep === 3 && (
        <>
          <g className="anim-spin-cw">
            <circle
              cx="158"
              cy="200"
              r="92"
              fill={p.accent1}
              fillOpacity="0.08"
              stroke={p.accent1}
              strokeWidth="1.5"
              strokeDasharray="8 4"
            />
            <circle cx="158" cy="108" r="7" fill={p.accent1} />
          </g>
          <g className="anim-spin-ccw">
            <circle
              cx="242"
              cy="200"
              r="92"
              fill={p.accent2}
              fillOpacity="0.08"
              stroke={p.accent2}
              strokeWidth="1.5"
              strokeDasharray="8 4"
            />
            <circle cx="242" cy="292" r="7" fill={p.accent2} />
          </g>
          <path
            d="M 200 122 Q 235 200 200 278 Q 165 200 200 122"
            fill={p.accent1}
            fillOpacity="0.22"
            stroke={p.accentSoft}
            strokeWidth="1.4"
            className="anim-pulse-node"
          />
          <circle cx="200" cy="200" r="6" fill="#fff" className="anim-pulse-node" />
        </>
      )}

      {activeStep === 4 && (
        <>
          <circle
            cx="200"
            cy="160"
            r="88"
            fill="none"
            stroke={p.accent1}
            strokeOpacity="0.35"
            strokeWidth="1"
            strokeDasharray="4 6"
            className="anim-spin-cw"
          />
          <circle
            cx="200"
            cy="160"
            r="68"
            fill={p.accent1}
            fillOpacity="0.14"
            stroke={p.accent1}
            strokeWidth="1.5"
          />
          <path
            d="M 200 92 A 68 68 0 0 1 200 228 A 26 68 0 0 0 200 92 Z"
            fill={p.accentSoft}
            className="anim-pulse-node"
          />
          <path
            d="M 40 305 Q 120 245 200 305 T 360 305"
            fill="none"
            stroke={p.accent1}
            strokeWidth="2"
            className="anim-dash-flow"
          />
          <path
            d="M 40 322 Q 120 270 200 322 T 360 322"
            fill="none"
            stroke={p.accent2}
            strokeWidth="1.4"
            strokeOpacity="0.7"
            className="anim-dash-flow"
          />
        </>
      )}
    </svg>
  );
}

