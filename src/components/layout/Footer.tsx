import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#020307]/85 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center text-accent-1 text-sm">
            ✦
          </div>
          <span className="font-serif text-xl tracking-[0.18em] text-white">MYSTIC SPACE</span>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400">
          <a href="#ecosystem" className="hover:text-white transition-colors">
            Экосистема
          </a>
          <a href="#interactive-lab" className="hover:text-white transition-colors">
            Таро и Синастрия
          </a>
          <a href="#express-code" className="hover:text-white transition-colors">
            Расчёт кода
          </a>
          <a href="#orbits" className="hover:text-white transition-colors">
            Тарифы
          </a>
        </div>

        <p className="text-xs text-slate-500 font-mono">
          © 2026 MYSTIC SPACE. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

