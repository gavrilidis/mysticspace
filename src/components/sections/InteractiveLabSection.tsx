import React from 'react';
import LunarWidget from '@/components/widgets/LunarWidget';
import SynastryWidget from '@/components/widgets/SynastryWidget';
import TarotWidget from '@/components/widgets/TarotWidget';

export default function InteractiveLabSection() {
  return (
    <section
      id="interactive-lab"
      className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
    >
      <div className="text-center max-w-2xl mx-auto mb-14 scroll-morph">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-1 block mb-3">
          Попробуй прямо сейчас
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal">
          Прикоснись к <span className="italic gradient-headline">живой системе</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 font-light">
          Нажми на карту Таро, проверь резонанс стихий или покрути фазу Луны — всё работает в
          реальном времени.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
        <TarotWidget />
        <SynastryWidget />
        <LunarWidget />
      </div>
    </section>
  );
}

