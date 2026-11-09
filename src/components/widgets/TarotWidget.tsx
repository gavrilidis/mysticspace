'use client';

import React, { useState } from 'react';
import { useCosmic } from '@/context/CosmicContext';
import { TAROT_DECK } from '@/data/tarot';

function TarotArcanaSvg({ index }: { index: number }) {
  const { palette: p } = useCosmic();

  if (index === 0) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke={p.accent1}
          strokeWidth="1"
          strokeDasharray="3 3"
          className="anim-spin-cw"
        />
        <circle
          cx="50"
          cy="50"
          r="28"
          stroke={p.accent2}
          strokeWidth="1"
          strokeOpacity="0.5"
          className="anim-spin-ccw"
        />
        <path
          d="M50 14 L56 42 L84 50 L56 58 L50 86 L44 58 L16 50 L44 42 Z"
          fill={p.accentSoft}
          className="anim-pulse-node"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
        <polygon
          points="50,14 84,74 16,74"
          stroke={p.accent1}
          strokeWidth="1.4"
          className="anim-spin-cw"
        />
        <polygon
          points="50,86 84,26 16,26"
          stroke={p.accent2}
          strokeWidth="1.4"
          className="anim-spin-ccw"
        />
        <path
          d="M32 50 C32 38, 46 38, 50 50 C54 62, 68 62, 68 50 C68 38, 54 38, 50 50 C46 62, 32 62, 32 50 Z"
          stroke="#fff"
          strokeWidth="2"
          className="anim-pulse-node"
        />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
        <g className="anim-spin-cw">
          <circle cx="50" cy="50" r="40" stroke={p.accent1} strokeWidth="1.6" />
          <line x1="50" y1="10" x2="50" y2="90" stroke={p.accent1} strokeWidth="1.2" />
          <line x1="10" y1="50" x2="90" y2="50" stroke={p.accent1} strokeWidth="1.2" />
          <line x1="22" y1="22" x2="78" y2="78" stroke={p.accent2} strokeWidth="1.2" />
          <line x1="78" y1="22" x2="22" y2="78" stroke={p.accent2} strokeWidth="1.2" />
        </g>
        <circle cx="50" cy="50" r="10" fill={p.accentSoft} className="anim-pulse-node" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke={p.accent1}
          strokeWidth="2"
          strokeDasharray="4 5"
          className="anim-spin-cw"
        />
        <circle
          cx="50"
          cy="50"
          r="32"
          stroke={p.accent2}
          strokeWidth="1.4"
          strokeDasharray="6 4"
          className="anim-spin-ccw"
        />
        <circle cx="50" cy="50" r="18" fill={p.accent1} className="anim-pulse-node" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" fill="none">
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke={p.accent2}
        strokeWidth="1.2"
        strokeDasharray="3 4"
        className="anim-spin-ccw"
      />
      <path
        d="M56 20 A30 30 0 1 0 56 80 A22 28 0 1 1 56 20 Z"
        fill={p.accentSoft}
        className="anim-pulse-node"
      />
    </svg>
  );
}

export default function TarotWidget() {
  const [tarotIndex, setTarotIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = TAROT_DECK[tarotIndex] || TAROT_DECK[0];

  const handleFlipCard = () => {
    if (isFlipped) {
      setIsFlipped(false);
      setTimeout(() => {
        setTarotIndex((prev) => (prev + 1) % TAROT_DECK.length);
      }, 280);
    } else {
      setIsFlipped(true);
    }
  };

  const handleDrawNewCard = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(false);
    setTimeout(() => {
      setTarotIndex((prev) => (prev + 1) % TAROT_DECK.length);
      setIsFlipped(true);
    }, 300);
  };

  return (
    <div className="mystic-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between scroll-morph">
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-accent-soft mb-4">
          <span>ИНТЕРАКТИВ 01 // АРКАН ДНЯ</span>
          <button onClick={handleDrawNewCard} className="underline hover:text-white">
            Перетасовать ↻
          </button>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-white mb-2">
          Карта твоего состояния
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm font-light mb-6">
          Сфокусируйся на своём вопросе и нажми на карту, чтобы открыть послание.
        </p>
      </div>

      {/* 3D Flip Tarot Card */}
      <div
        className="tarot-scene w-48 sm:w-52 h-72 sm:h-80 mx-auto my-2 cursor-pointer"
        onClick={handleFlipCard}
      >
        <div id="tarot-card-inner" className={`tarot-card-3d ${isFlipped ? 'is-flipped' : ''}`}>
          {/* Card Back: Full Animated Sacred Geometry SVG */}
          <div className="tarot-face tarot-back rounded-2xl border border-accent bg-gradient-to-b from-[#0E1324] to-[#050710] p-4 flex flex-col items-center justify-between shadow-2xl">
            <div className="w-full flex justify-between text-[10px] font-mono text-accent-1 opacity-80">
              <span>✦</span>
              <span>MYSTIC TAROT</span>
              <span>✦</span>
            </div>
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg
                viewBox="0 0 140 140"
                className="w-full h-full text-accent-1 overflow-visible"
                fill="none"
              >
                <circle
                  cx="70"
                  cy="70"
                  r="62"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                  strokeDasharray="4 4"
                  className="anim-spin-cw"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
                <g className="anim-spin-ccw">
                  <rect
                    x="34"
                    y="34"
                    width="72"
                    height="72"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeOpacity="0.65"
                  />
                  <rect
                    x="34"
                    y="34"
                    width="72"
                    height="72"
                    transform="rotate(45 70 70)"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    strokeOpacity="0.65"
                  />
                </g>
                <g className="anim-spin-cw">
                  <ellipse
                    cx="70"
                    cy="70"
                    rx="56"
                    ry="20"
                    transform="rotate(-30 70 70)"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                  <ellipse
                    cx="70"
                    cy="70"
                    rx="56"
                    ry="20"
                    transform="rotate(30 70 70)"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.5"
                  />
                </g>
                <path
                  d="M70 46 L75 65 L94 70 L75 75 L70 94 L65 75 L46 70 L65 65 Z"
                  fill="currentColor"
                  className="anim-pulse-node"
                />
              </svg>
            </div>
            <div className="text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-soft block">
                Нажми, чтобы открыть
              </span>
            </div>
          </div>

          {/* Card Front: Bespoke Animated SVG Arcana Illustration */}
          <div className="tarot-face tarot-front rounded-2xl border border-accent bg-gradient-to-b from-[#13192E] to-[#060913] p-5 flex flex-col items-center justify-between text-center shadow-2xl">
            <span id="tarot-num" className="font-mono text-xs tracking-widest text-accent-1">
              {currentCard.num}
            </span>
            <div id="tarot-svg-holder" className="w-28 h-28 my-1 flex items-center justify-center">
              <TarotArcanaSvg index={tarotIndex} />
            </div>
            <div>
              <h4 id="tarot-title" className="font-serif text-2xl text-white font-semibold">
                {currentCard.title}
              </h4>
              <p
                id="tarot-meaning"
                className="text-xs text-slate-300 font-light mt-1.5 leading-relaxed"
              >
                {currentCard.meaning}
              </p>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Нажми для новой карты</span>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <span id="tarot-status-hint" className="font-mono text-xs text-accent-1">
          {isFlipped
            ? 'Послание открыто • Нажми для новой карты'
            : 'Нажми на карту для переворота'}
        </span>
      </div>
    </div>
  );
}

