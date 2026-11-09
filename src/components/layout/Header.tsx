'use client';

import React, { useState } from 'react';

export default function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNav = () => setMobileNavOpen((prev) => !prev);
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#030408]/65 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Brand Identity with Multi-Ring Animated SVG Astrolabe */}
        <a href="#" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center relative bg-black/50 group-hover:scale-105 transition-transform">
            <svg className="w-7 h-7 text-accent-1 overflow-visible" viewBox="0 0 36 36" fill="none">
              <circle
                cx="18"
                cy="18"
                r="14"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.45"
                strokeDasharray="3 3"
                className="anim-spin-cw"
              />
              <g className="anim-spin-ccw">
                <ellipse
                  cx="18"
                  cy="18"
                  rx="13"
                  ry="5.5"
                  transform="rotate(-30 18 18)"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <circle cx="30" cy="14" r="1.6" fill="currentColor" />
              </g>
              <g className="anim-spin-cw">
                <ellipse
                  cx="18"
                  cy="18"
                  rx="13"
                  ry="5.5"
                  transform="rotate(40 18 18)"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeOpacity="0.65"
                />
              </g>
              <path
                d="M18 12 L19.4 16.6 L24 18 L19.4 19.4 L18 24 L16.6 19.4 L12 18 L16.6 16.6 Z"
                fill="currentColor"
                className="anim-pulse-node"
              />
            </svg>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl tracking-[0.16em] text-white font-semibold block leading-none">
              MYSTIC SPACE
            </span>
            <span className="font-mono text-[9px] tracking-[0.2em] text-accent-1 uppercase block mt-1">
              Мистический мир Мариам
            </span>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden xl:flex items-center gap-7 text-xs font-medium tracking-wider uppercase text-slate-300">
          <a href="#ecosystem" className="hover:text-white transition-colors">
            Тайные грани
          </a>
          <a href="#interactive-lab" className="hover:text-white transition-colors">
            Оракул
          </a>
          <a href="#express-code" className="hover:text-white transition-colors">
            Твой Код
          </a>
          <a href="#orbits" className="hover:text-white transition-colors">
            Доступ
          </a>
        </nav>

        {/* Right CTA & Mobile Menu Button */}
        <div className="flex items-center gap-2.5">
          <a
            href="#express-code"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase btn-cosmic"
          >
            <span>Рассчитать карту</span>
            <span>→</span>
          </a>

          <button
            onClick={toggleMobileNav}
            className="xl:hidden p-2.5 rounded-full border border-white/15 text-slate-200 hover:border-white/40 focus:outline-none"
            aria-label="Меню"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 7h16M4 12h16M4 17h11"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileNavOpen && (
        <div
          id="mobile-nav"
          className="xl:hidden border-t border-white/10 bg-[#04060C]/95 backdrop-blur-2xl px-4 py-5 space-y-5"
        >
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-slate-200">
            <a
              href="#ecosystem"
              onClick={closeMobileNav}
              className="py-2 border-b border-white/5 hover:text-accent-1"
            >
              ✦ Пять граней познания
            </a>
            <a
              href="#interactive-lab"
              onClick={closeMobileNav}
              className="py-2 border-b border-white/5 hover:text-accent-1"
            >
              ✦ Карта дня и Синастрия
            </a>
            <a
              href="#express-code"
              onClick={closeMobileNav}
              className="py-2 border-b border-white/5 hover:text-accent-1"
            >
              ✦ Расчёт кода судьбы
            </a>
            <a
              href="#orbits"
              onClick={closeMobileNav}
              className="py-2 hover:text-accent-1"
            >
              ✦ Уровни доступа
            </a>
          </nav>

          <a
            href="#express-code"
            onClick={closeMobileNav}
            className="w-full py-3 rounded-full text-center block text-xs font-mono uppercase tracking-widest btn-cosmic"
          >
            Узнать свой код судьбы
          </a>
        </div>
      )}
    </header>
  );
}

