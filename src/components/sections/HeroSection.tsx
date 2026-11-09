import React from 'react';
import HeroGyroscope from '@/components/sections/HeroGyroscope';

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] flex items-center pt-10 pb-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* Left Column: High-Converting Mystical Copy */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center lg:text-left scroll-morph is-visible">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-accent bg-white/[0.04] backdrop-blur-md">
            <svg className="w-4 h-4 text-accent-1 shrink-0" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="2 3"
                className="anim-spin-cw"
              />
              <path
                d="M12 6 L13.5 10.5 L18 12 L13.5 13.5 L12 18 L10.5 13.5 L6 12 L10.5 10.5 Z"
                fill="currentColor"
                className="anim-pulse-node"
              />
            </svg>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent-soft">
              Эксклюзивное пространство Мариам • Таро • Медитации • Судьба
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.1rem] leading-[1.03] tracking-tight font-medium">
            Добро пожаловать <br />
            <span className="italic gradient-headline font-normal">в мир мистики.</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
            Здесь соединяются астрологическая интуиция, древние Арканы и глубокий духовный
            анализ. Прикоснись к тайнам своего пути, которые обычно остаются невидимыми глазу.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#express-code"
              className="px-8 py-4 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest btn-cosmic flex items-center justify-center gap-3"
            >
              <span>✦ Рассчитать карту судьбы</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
            <a
              href="#ecosystem"
              className="px-7 py-4 rounded-full text-xs sm:text-sm font-medium uppercase tracking-widest btn-glass flex items-center justify-center gap-2.5"
            >
              <span>✦ Тайные грани</span>
            </a>
          </div>

          {/* Highlights */}
          <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-1" viewBox="0 0 20 20" fill="none">
                <circle
                  cx="10"
                  cy="10"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  className="anim-dash-flow"
                />
                <circle cx="10" cy="10" r="2.2" fill="currentColor" className="anim-pulse-node" />
              </svg>
              <span>
                <strong className="text-white font-medium">Точный расчёт</strong> • Натальная карта
                и Матрица Судьбы
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent-1" viewBox="0 0 20 20" fill="none">
                <rect
                  x="4"
                  y="4"
                  width="12"
                  height="12"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  className="anim-spin-cw"
                />
                <rect
                  x="4"
                  y="4"
                  width="12"
                  height="12"
                  transform="rotate(45 10 10)"
                  stroke="currentColor"
                  strokeWidth="1.1"
                  className="anim-spin-ccw"
                />
              </svg>
              <span>
                <strong className="text-white font-medium">Тайные знания</strong> • Таро, синастрия
                и лунные ритмы
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D Celestial Wheel of Secrets */}
        <div className="lg:col-span-5 flex items-center justify-center scroll-morph is-visible">
          <HeroGyroscope />
        </div>
      </div>
    </section>
  );
}

