'use client';

import React from 'react';
import { useCosmic } from '@/context/CosmicContext';

export default function ActionModal() {
  const { modalPlanTitle, modalSubmitted, closeActionModal, submitActionModal } = useCosmic();

  if (!modalPlanTitle) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitActionModal();
  };

  return (
    <div
      id="action-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
    >
      <div className="mystic-card rounded-3xl max-w-md w-full p-6 sm:p-8 border border-accent relative shadow-2xl">
        <button
          onClick={closeActionModal}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white"
        >
          ✕
        </button>

        {!modalSubmitted ? (
          <div id="modal-form">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-1 block mb-1">
              MYSTIC SPACE • ДОСТУП
            </span>
            <h3 id="modal-plan-title" className="font-serif text-3xl text-white mb-2">
              {modalPlanTitle}
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light mb-6">
              Оставь контакт — мы откроем доступ к твоему персональному пространству и пришлём
              полную расшифровку.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Твоё имя
                </label>
                <input
                  type="text"
                  required
                  placeholder="Александра"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Telegram или Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="@username или email"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-mono uppercase tracking-widest btn-cosmic"
              >
                Подтвердить и войти ✦
              </button>
            </form>
          </div>
        ) : (
          <div id="modal-success" className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-white/10 border border-accent mx-auto flex items-center justify-center text-2xl text-accent-1">
              ✦
            </div>
            <h4 className="font-serif text-3xl text-white">Заявка принята</h4>
            <p className="text-slate-300 text-sm font-light">
              Твой персональный доступ формируется. Мы свяжемся с тобой в ближайшее время.
            </p>
            <button
              onClick={closeActionModal}
              className="px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider btn-glass"
            >
              Вернуться к звёздам
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

