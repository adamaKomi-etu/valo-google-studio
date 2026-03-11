"use client";
import { formatTime, formatCurrency } from '../../../shared/utils';

const useStore = () => ({
  history: [],
  removeCalculation: (id: string) => {},
  clearHistory: () => {},
  isPro: false,
  profile: {
    salary: 2000,
    salaryType: 'monthly' as 'monthly' | 'hourly',
    taxMode: 'net' as 'net' | 'gross',
    taxRate: 22,
    hoursPerWeek: 35,
    currencyCode: 'EUR',
  },
});
// import { Trash2, History as HistoryIcon, Lock } from 'lucide-react';
// import { motion, AnimatePresence } from 'motion/react';
// import Link from 'next/link';

export default function History() {
  const { history, removeCalculation, clearHistory, isPro, profile } = useStore();

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-neutral-900">
          {/* <HistoryIcon size={28} className="text-indigo-600" /> */}
          <h1 className="text-2xl font-bold tracking-tight">Historique</h1>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs font-medium text-red-600 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-full transition-colors"
          >
            Tout effacer
          </button>
        )}
      </div>

      {!isPro && history.length >= 5 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start space-x-3">
          {/* <Lock className="text-amber-600 shrink-0 mt-0.5" size={18} /> */}
          <div className="space-y-1">
            <p className="text-sm text-amber-900 font-medium">
              Limite de l'historique gratuit atteinte (5/5)
            </p>
            <p className="text-xs text-amber-700">
              Passez à la version Pro pour un historique illimité et plus de fonctionnalités.
            </p>
            <a
              href="/pricing"
              className="inline-block mt-2 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
            >
              Découvrir Pro
            </a>
          </div>
        </div>
      )}

      {history.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-neutral-100 shadow-sm">
          {/* <HistoryIcon size={48} className="mx-auto text-neutral-200 mb-4" /> */}
          <p className="text-neutral-500 font-medium">Aucun calcul sauvegardé</p>
          <p className="text-sm text-neutral-400 mt-1">
            Vos calculs apparaîtront ici.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            {history.map((calc) => (
              <div
                key={calc.id}
                className="bg-white p-4 rounded-xl border border-neutral-100 shadow-sm flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-neutral-900">{calc.itemName}</h3>
                    <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                      {formatCurrency(calc.price, calc.currencyCode)}
                    </span>
                  </div>
                  <div className="text-sm text-indigo-600 font-medium flex items-center space-x-1">
                    <span>{formatTime(calc.resultHours, profile.hoursPerWeek)}</span>
                    <span className="text-neutral-400 text-xs">
                      ({formatCurrency(calc.hourlyRateUsed, calc.currencyCode)}/h)
                    </span>
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    {new Date(calc.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <button
                  onClick={() => removeCalculation(calc.id)}
                  className="text-neutral-300 hover:text-red-500 transition-colors p-2"
                  aria-label="Supprimer"
                >
                  {/* <Trash2 size={18} /> */}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
