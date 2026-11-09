'use client';

import React from 'react';
import { useCosmic } from '@/context/CosmicContext';
import { PRICING_TIERS } from '@/data/pricing';

export default function PricingSection() {
  const { openActionModal } = useCosmic();

  return (
    <section
      id="orbits"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="text-center max-w-2xl mx-auto mb-14 scroll-morph">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-1 block mb-3">
          Тарифные планы
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal">
          Выбери свою <span className="italic gradient-headline">орбиту погружения</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 items-stretch">
        {PRICING_TIERS.map((tier, idx) => (
          <div
            key={tier.id}
            className={`mystic-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between scroll-morph ${
              tier.featured ? 'border-2 border-accent relative md:-translate-y-3 shadow-2xl' : ''
            }`}
            style={idx > 0 ? { transitionDelay: `${idx * 100}ms` } : undefined}
          >
            {tier.popularTag && (
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/10 border border-accent text-[10px] font-mono uppercase tracking-wider text-accent-soft">
                {tier.popularTag}
              </div>
            )}
            <div>
              <span
                className={`font-mono text-[10px] uppercase tracking-widest ${
                  tier.featured ? 'text-accent-1' : 'text-slate-400'
                }`}
              >
                {tier.orbitBadge}
              </span>
              <h3 className="font-serif text-3xl text-white mt-1 mb-2">{tier.title}</h3>
              <div className="flex items-baseline gap-2 my-5">
                <span className="font-serif text-4xl sm:text-5xl text-white">{tier.price}</span>
                <span className="text-xs text-slate-400">{tier.period}</span>
              </div>
              <ul
                className={`space-y-3 text-sm ${
                  tier.featured ? 'text-slate-200' : 'text-slate-300'
                } font-light border-t border-white/10 pt-5`}
              >
                {tier.features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2.5">
                    <span className="text-accent-1">✦</span> {feat}
                  </li>
                ))}
              </ul>
            </div>

            {tier.href ? (
              <a
                href={tier.href}
                className="mt-8 w-full py-3.5 rounded-full text-center text-xs font-mono uppercase tracking-widest btn-glass block"
              >
                {tier.ctaText}
              </a>
            ) : (
              <button
                onClick={() => openActionModal(tier.actionPlanTitle)}
                className={`mt-8 w-full ${
                  tier.featured ? 'py-4 btn-cosmic' : 'py-3.5 btn-glass'
                } rounded-full text-center text-xs font-mono uppercase tracking-widest block`}
              >
                {tier.ctaText}
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

