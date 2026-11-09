'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import MorphVisualizer from '@/components/sections/MorphVisualizer';
import { ECO_STAGES } from '@/data/ecosystem';

function StepCardIcon({ step }: { step: number }) {
  if (step === 0) {
    return (
      <svg className="w-8 h-8 text-accent-1 overflow-visible" viewBox="0 0 40 40" fill="none">
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          className="anim-spin-cw"
        />
        <polygon
          points="20,6 32,27 8,27"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeOpacity="0.6"
          className="anim-spin-ccw"
        />
        <g className="anim-spin-fast">
          <circle cx="20" cy="4" r="2.3" fill="currentColor" />
        </g>
        <circle cx="20" cy="20" r="3.2" fill="currentColor" className="anim-pulse-node" />
      </svg>
    );
  }
  if (step === 1) {
    return (
      <svg className="w-8 h-8 text-accent-1 overflow-visible" viewBox="0 0 40 40" fill="none">
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="1.3"
          className="anim-spin-cw"
        />
        <rect
          x="8"
          y="8"
          width="24"
          height="24"
          transform="rotate(45 20 20)"
          stroke="currentColor"
          strokeWidth="1.3"
          className="anim-spin-ccw"
        />
        <line
          x1="20"
          y1="3"
          x2="20"
          y2="37"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeOpacity="0.5"
          className="anim-dash-flow"
        />
        <line
          x1="3"
          y1="20"
          x2="37"
          y2="20"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeOpacity="0.5"
          className="anim-dash-flow"
        />
        <circle cx="20" cy="20" r="3.5" fill="currentColor" className="anim-pulse-node" />
      </svg>
    );
  }
  if (step === 2) {
    return (
      <svg className="w-8 h-8 text-accent-1 overflow-visible" viewBox="0 0 40 40" fill="none">
        <g className="anim-tarot-left">
          <rect
            x="13"
            y="7"
            width="14"
            height="24"
            rx="2.5"
            fill="#090D1A"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeOpacity="0.65"
          />
        </g>
        <g className="anim-tarot-right">
          <rect
            x="13"
            y="7"
            width="14"
            height="24"
            rx="2.5"
            fill="#090D1A"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeOpacity="0.65"
          />
        </g>
        <rect
          x="13"
          y="6"
          width="14"
          height="25"
          rx="2.5"
          fill="#0E1428"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M20 13 L21.4 17.2 L25.5 18.5 L21.4 19.8 L20 24 L18.6 19.8 L14.5 18.5 L18.6 17.2 Z"
          fill="currentColor"
          className="anim-pulse-node"
        />
      </svg>
    );
  }
  if (step === 3) {
    return (
      <svg className="w-8 h-8 text-accent-1 overflow-visible" viewBox="0 0 40 40" fill="none">
        <g className="anim-spin-cw">
          <ellipse
            cx="16"
            cy="20"
            rx="10"
            ry="6"
            transform="rotate(-25 16 20)"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle cx="25" cy="16" r="2" fill="currentColor" />
        </g>
        <g className="anim-spin-ccw">
          <ellipse
            cx="24"
            cy="20"
            rx="10"
            ry="6"
            transform="rotate(25 24 20)"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <circle cx="15" cy="24" r="2" fill="currentColor" />
        </g>
        <circle cx="20" cy="20" r="2.8" fill="#fff" className="anim-pulse-node" />
      </svg>
    );
  }
  return (
    <svg className="w-8 h-8 text-accent-1 overflow-visible" viewBox="0 0 40 40" fill="none">
      <circle
        cx="20"
        cy="20"
        r="15"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.4"
        className="anim-dash-flow"
      />
      <path
        d="M22 9 A11 11 0 1 0 31 23 A8.5 8.5 0 1 1 22 9 Z"
        fill="currentColor"
        className="anim-pulse-node"
      />
      <g className="anim-spin-cw">
        <circle cx="20" cy="5" r="2" fill="#fff" />
      </g>
    </svg>
  );
}

export default function EcosystemSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progressWidth, setProgressWidth] = useState(20);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const updatePinnedEcosystemOnScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || window.innerWidth < 1024) return;

    const rect = track.getBoundingClientRect();
    const scrollableDistance = rect.height - window.innerHeight;
    if (scrollableDistance <= 0) return;

    const rawProgress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
    setProgressWidth(Math.max(8, Math.round(rawProgress * 100)));

    let targetStep = 0;
    if (rawProgress <= 0.14) {
      targetStep = 0;
    } else if (rawProgress >= 0.86) {
      targetStep = 4;
    } else {
      const normalized = (rawProgress - 0.14) / (0.86 - 0.14);
      targetStep = Math.min(4, Math.floor(normalized * 5));
    }

    setActiveStep(targetStep);
  }, []);

  useEffect(() => {
    updatePinnedEcosystemOnScroll();
    window.addEventListener('scroll', updatePinnedEcosystemOnScroll, { passive: true });
    window.addEventListener('resize', updatePinnedEcosystemOnScroll);
    return () => {
      window.removeEventListener('scroll', updatePinnedEcosystemOnScroll);
      window.removeEventListener('resize', updatePinnedEcosystemOnScroll);
    };
  }, [updatePinnedEcosystemOnScroll]);

  const scrollToEcoStep = (stepIdx: number) => {
    setActiveStep(stepIdx);
    const track = trackRef.current;
    if (!track || window.innerWidth < 1024) return;

    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = track.offsetHeight - window.innerHeight;
    const targetProgress = 0.14 + ((stepIdx + 0.45) / 5) * (0.86 - 0.14);
    const targetScrollY = trackTop + scrollableDistance * targetProgress;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const currentStage = ECO_STAGES[activeStep] || ECO_STAGES[0];

  return (
    <section id="ecosystem" className="relative w-full">
      <div id="features-scroll-track" ref={trackRef} className="relative w-full lg:h-[440vh]">
        <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col justify-center py-16 lg:py-0 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {/* Compact Section Header + Live Scroll Progress Bar */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 lg:mb-8 gap-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-1 block mb-1.5">
                Тайные знания в одном пространстве
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight">
                Пять граней <span className="italic gradient-headline">твоего пути</span>
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2 self-start md:self-auto">
              <span id="scroll-lock-badge" className="font-mono text-[11px] text-accent-soft">
                {`Грань 0${activeStep + 1} из 05`}
              </span>
              <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  id="ecosystem-scroll-bar"
                  className="h-full bg-gradient-to-r from-amber-300 to-sky-400 transition-all duration-150"
                  style={{ width: `${progressWidth}%` }}
                />
              </div>
            </div>
          </div>

          {/* Pinned Split Layout: Left 5 Interactive Animated SVG Cards + Right Morphing Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            {/* Left Column: 5 Concise Feature Cards with Custom Animated SVGs */}
            <div className="lg:col-span-6 space-y-3 sm:space-y-3.5">
              {ECO_STAGES.map((stage) => {
                const isActive = stage.step === activeStep;
                return (
                  <div
                    key={stage.step}
                    data-step={stage.step}
                    onClick={() => scrollToEcoStep(stage.step)}
                    className={`eco-step ${
                      isActive ? 'active-step' : ''
                    } mystic-card rounded-2xl p-4 sm:p-5 cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-accent flex items-center justify-center shrink-0">
                        <StepCardIcon step={stage.step} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-serif text-xl sm:text-2xl text-white leading-none">
                            {stage.cardTitle}
                          </h3>
                          <span className="font-mono text-[10px] uppercase tracking-wider text-accent-1">
                            {stage.cardTag}
                          </span>
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                          {stage.cardDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Stabilized Holographic Morphing Visualizer */}
            <div className="lg:col-span-6">
              <div className="mystic-card rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between min-h-[400px] sm:min-h-[490px] border border-accent">
                {/* Top Morph Header */}
                <div className="w-full flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span
                      id="morph-stage-badge"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-1 block"
                    >
                      {currentStage.badge}
                    </span>
                    <h4
                      id="morph-stage-title"
                      className="font-serif text-xl sm:text-2xl text-white mt-0.5"
                    >
                      {currentStage.title}
                    </h4>
                  </div>
                  <div className="flex gap-1.5">
                    {ECO_STAGES.map((s) => (
                      <button
                        key={s.step}
                        onClick={() => scrollToEcoStep(s.step)}
                        className={
                          s.step === activeStep
                            ? 'w-5 h-2.5 rounded-full bg-white transition-all'
                            : 'w-2.5 h-2.5 rounded-full bg-white/20 transition-all'
                        }
                        id={`dot-${s.step}`}
                        aria-label={`Этап ${s.step + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Central Animated SVG Stage */}
                <div className="relative w-full max-w-[330px] aspect-square my-auto flex items-center justify-center">
                  <MorphVisualizer activeStep={activeStep} />
                </div>

                {/* Bottom Insight Caption */}
                <div
                  id="morph-stage-footer"
                  className="w-full text-center pt-4 border-t border-white/10 text-xs sm:text-sm text-slate-300 font-light"
                >
                  {currentStage.footer}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

