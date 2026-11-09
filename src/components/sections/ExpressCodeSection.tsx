'use client';

import React, { useState } from 'react';
import { useCosmic } from '@/context/CosmicContext';
import { calculateDestinyReading } from '@/lib/destinyCalculator';

export default function ExpressCodeSection() {
  const { openActionModal, triggerScrollBoost } = useCosmic();
  const [nameInput, setNameInput] = useState('Александра');
  const [dateInput, setDateInput] = useState('1996-08-19');
  const [result, setResult] = useState(() =>
    calculateDestinyReading('Александра', '1996-08-19')
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reading = calculateDestinyReading(nameInput, dateInput);
    setResult(reading);
    triggerScrollBoost(9);
  };

  return (
    <section
      id="express-code"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full"
    >
      <div className="mystic-card rounded-3xl p-6 sm:p-12 border border-accent shadow-2xl scroll-morph">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-1 block mb-2">
            Персональный экспресс-расчёт
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal">
            Узнай свой <span className="italic gradient-headline">космический код</span> за 10
            секунд
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2.5 font-light">
            Введи дату рождения — система мгновенно вычислит твою солнечную частоту, центральный
            Аркан Судьбы и вектор силы.
          </p>
        </div>

        {/* Clean 3-Field Express Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-10">
          <div className="sm:col-span-4">
            <label
              htmlFor="exp-name"
              className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5"
            >
              Твоё имя
            </label>
            <input
              type="text"
              id="exp-name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-300 transition-colors"
              placeholder="Имя"
            />
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="exp-date"
              className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1.5"
            >
              Дата рождения
            </label>
            <input
              type="date"
              id="exp-date"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              required
              className="w-full px-4 py-3.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm font-mono focus:outline-none focus:border-amber-300 transition-colors"
            />
          </div>

          <div className="sm:col-span-4 flex items-end">
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl text-xs font-mono uppercase tracking-widest btn-cosmic h-[50px] flex items-center justify-center gap-2"
            >
              <span>Расшифровать</span>
              <span>✦</span>
            </button>
          </div>
        </form>

        {/* Express Result Display with Animated Archetype SVGs */}
        <div
          id="express-result-card"
          className="rounded-2xl bg-black/45 border border-white/10 p-6 sm:p-8 transition-all duration-500"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Box 1: Solar Frequency */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-accent flex items-center justify-center text-accent-1 shrink-0 relative">
                <svg className="w-10 h-10 overflow-visible" viewBox="0 0 40 40" fill="none">
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="2 3"
                    className="anim-spin-cw"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r="12"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeOpacity="0.5"
                  />
                </svg>
                <span
                  id="exp-sun-glyph"
                  className="absolute inset-0 flex items-center justify-center text-lg text-white"
                >
                  {result.sign.glyph}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Солнечная частота
                </span>
                <span id="exp-sun-title" className="font-serif text-xl text-white font-medium">
                  {result.sign.name}
                </span>
              </div>
            </div>

            {/* Box 2: Central Arcana */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-accent flex items-center justify-center text-accent-1 shrink-0 relative">
                <svg className="w-10 h-10 overflow-visible" viewBox="0 0 40 40" fill="none">
                  <rect
                    x="9"
                    y="9"
                    width="22"
                    height="22"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.65"
                    className="anim-spin-cw"
                  />
                  <rect
                    x="9"
                    y="9"
                    width="22"
                    height="22"
                    transform="rotate(45 20 20)"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeOpacity="0.65"
                    className="anim-spin-ccw"
                  />
                </svg>
                <span
                  id="exp-arcana-num"
                  className="absolute inset-0 flex items-center justify-center font-serif text-base text-white font-semibold"
                >
                  {result.arcanaRoman}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Центральный Аркан
                </span>
                <span id="exp-arcana-title" className="font-serif text-xl text-white font-medium">
                  {result.arcanaInfo.title}
                </span>
              </div>
            </div>

            {/* Box 3: Main Gift */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-accent flex items-center justify-center text-accent-1 shrink-0">
                <svg className="w-8 h-8 overflow-visible" viewBox="0 0 36 36" fill="none">
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="anim-dash-flow"
                  />
                  <path
                    d="M18 6 L20.5 15.5 L30 18 L20.5 20.5 L18 30 L15.5 20.5 L6 18 L15.5 15.5 Z"
                    fill="currentColor"
                    className="anim-pulse-node"
                  />
                </svg>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Главный дар
                </span>
                <span id="exp-gift-title" className="font-serif text-xl text-white font-medium">
                  {result.arcanaInfo.gift}
                </span>
              </div>
            </div>
          </div>

          {/* Personal Summary Paragraph */}
          <p
            id="exp-summary-text"
            className="text-slate-200 text-sm sm:text-base font-light leading-relaxed mb-6"
          >
            <strong className="text-white font-medium">{result.name}</strong>, твоя ведущая
            частота объединяет знак <strong className="text-white">{result.sign.name}</strong> и
            центральный{' '}
            <strong className="text-white">
              {result.arcanaRoman} Аркан ({result.arcanaInfo.title})
            </strong>
            . Твоя главная точка роста — {result.arcanaInfo.gift.toLowerCase()}, доверие к своей
            интуиции и смелая реализация личного масштаба.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
            <span className="text-xs text-slate-400">
              В полной версии: все 12 домов, кармический хвост, деньги и синастрия.
            </span>
            <button
              onClick={() => openActionModal('Полный разбор Натальной карты и Матрицы')}
              className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider btn-cosmic shrink-0"
            >
              Получить полную карту →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

