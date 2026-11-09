'use client';

import React from 'react';
import { useCosmic } from '@/context/CosmicContext';
import { COSMIC_TARGETS, MYSTIC_REALM_NAMES, PALETTE_OPTIONS } from '@/data/palettes';

export default function FlightControllerHud() {
  const {
    paletteKey,
    setCosmicPalette,
    sliderSpeed,
    setSliderSpeed,
    galaxyDist,
    setGalaxyDist,
    userOffsetX,
    setUserOffsetX,
    userOffsetY,
    setUserOffsetY,
    lockOrbit,
    toggleOrbitLock,
    targetIndex,
    selectCosmicTarget,
    pureSpace,
    togglePureSpace,
  } = useCosmic();

  const realmName = MYSTIC_REALM_NAMES[targetIndex] || 'ГЛУБОКИЙ КОСМОС';
  const hudFlightStateText =
    sliderSpeed === 0
      ? `ТИШИНА ВСЕЛЕННОЙ • ${realmName}`
      : `ДЫХАНИЕ ВСЕЛЕННОЙ • ${realmName}`;

  const speedLabel =
    sliderSpeed === 0
      ? 'Пауза'
      : sliderSpeed < 1.5
        ? 'Плавно'
        : sliderSpeed < 3.2
          ? 'Поток'
          : 'Вихрь';

  return (
    <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:bottom-5 sm:right-5 z-50 pointer-events-auto max-w-md sm:w-[390px] ml-auto">
      <div className="mystic-card rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-accent backdrop-blur-2xl space-y-2.5">
        {/* Top Row: Mystical Flight Controls */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-current text-accent-1 animate-ping shrink-0" />
            <span
              id="hud-flight-state"
              className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-accent-soft truncate"
            >
              {hudFlightStateText}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={toggleOrbitLock}
              id="orbit-lock-btn"
              className={
                lockOrbit
                  ? 'px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/15 bg-white/10 text-accent-1 hover:bg-white/20 transition-all'
                  : 'px-2 py-0.5 rounded-md text-[10px] font-mono border border-white/10 bg-transparent text-slate-400 hover:text-white transition-all'
              }
              title="Плавное кружение в пространстве"
            >
              {lockOrbit ? '⟳ Кружение' : '⟳ Свободно'}
            </button>
            <button
              onClick={togglePureSpace}
              id="pure-space-btn"
              className="px-2.5 py-0.5 rounded-md text-[10px] font-mono border border-accent bg-white/5 text-white hover:bg-white/15 transition-all flex items-center gap-1"
            >
              <span>✦</span>
              <span id="pure-space-label">{pureSpace ? 'Вернуть меню' : 'Чистое небо'}</span>
            </button>
          </div>
        </div>

        {/* Flight Speed Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 w-14 shrink-0">
            Скорость:
          </span>
          <input
            type="range"
            id="flight-speed-slider"
            min="0"
            max="5"
            step="0.05"
            value={sliderSpeed}
            onChange={(e) => setSliderSpeed( parseFloat(e.target.value) )}
            className="cosmic-slider flex-1"
            aria-label="Регулятор скорости движения в космосе"
          />
          <span
            id="hud-speed-readout"
            className="font-mono text-[11px] text-accent-1 font-medium w-12 text-right shrink-0"
          >
            {speedLabel}
          </span>
        </div>

        {/* Distance / Zoom Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 w-14 shrink-0">
            Дистанция:
          </span>
          <input
            type="range"
            id="galaxy-zoom-slider"
            min="320"
            max="1600"
            step="10"
            value={galaxyDist}
            onChange={(e) => setGalaxyDist(parseFloat(e.target.value))}
            className="cosmic-slider flex-1"
            aria-label="Ползунок отдаления и приближения галактики"
          />
          <span
            id="hud-zoom-readout"
            className="font-mono text-[11px] text-accent-1 font-medium w-12 text-right shrink-0"
          >
            {Math.round(galaxyDist)} пк
          </span>
        </div>

        {/* X-Axis Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 w-14 shrink-0">
            X (Ось):
          </span>
          <input
            type="range"
            id="galaxy-x-slider"
            min="-500"
            max="500"
            step="5"
            value={userOffsetX}
            onChange={(e) => setUserOffsetX(parseFloat(e.target.value))}
            className="cosmic-slider flex-1"
            aria-label="Ползунок смещения галактики влево и вправо"
          />
          <span
            id="hud-x-readout"
            className="font-mono text-[11px] text-accent-1 font-medium w-12 text-right shrink-0"
          >
            {userOffsetX > 0 ? `+${userOffsetX}` : userOffsetX} пк
          </span>
        </div>

        {/* Y-Axis Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 w-14 shrink-0">
            Y (Ось):
          </span>
          <input
            type="range"
            id="galaxy-y-slider"
            min="-350"
            max="350"
            step="5"
            value={userOffsetY}
            onChange={(e) => setUserOffsetY(parseFloat(e.target.value))}
            className="cosmic-slider flex-1"
            aria-label="Ползунок смещения галактики вверх и вниз"
          />
          <span
            id="hud-y-readout"
            className="font-mono text-[11px] text-accent-1 font-medium w-12 text-right shrink-0"
          >
            {userOffsetY > 0 ? `+${userOffsetY}` : userOffsetY} пк
          </span>
        </div>

        {/* Live Palette Switcher */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
            Цветовая атмосфера:
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {PALETTE_OPTIONS.map((opt) => {
              const isSelected = paletteKey === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setCosmicPalette(opt.key)}
                  id={`pal-${opt.key}`}
                  className={
                    isSelected
                      ? 'py-1 px-1 rounded-lg text-[10px] font-mono flex items-center justify-center gap-1 transition-all bg-white/15 text-white border border-white/25'
                      : 'py-1 px-1 rounded-lg text-[10px] font-mono flex items-center justify-center gap-1 transition-all text-slate-400 hover:text-white border border-transparent'
                  }
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: opt.dotColor }}
                  />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: Mystical Realm Selector Pills */}
        <div className="grid grid-cols-4 gap-1.5 pt-1.5 border-t border-white/10">
          {COSMIC_TARGETS.map((target, idx) => {
            const isSelected = targetIndex === idx;
            return (
              <button
                key={target.id}
                onClick={() => selectCosmicTarget(idx)}
                id={`target-pill-${idx}`}
                className={
                  isSelected
                    ? 'px-1.5 py-1 rounded-lg text-[10px] font-mono truncate transition-all bg-white/15 text-white border border-white/25'
                    : 'px-1.5 py-1 rounded-lg text-[10px] font-mono truncate transition-all text-slate-400 hover:text-white border border-transparent'
                }
              >
                {target.shortLabel}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

