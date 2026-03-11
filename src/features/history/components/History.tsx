"use client";
import { Clock, Trash2, Lock, BarChart2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '../../../shared/store';
import { formatTime, formatCurrency } from '../../../shared/utils';
import { clsx } from 'clsx';

export default function History() {
  const { history, removeCalculation, clearHistory, isPro, profile } = useStore();

  const totalHours = history.reduce((sum, c) => sum + c.resultHours, 0);
  const totalSpent = history.reduce((sum, c) => sum + c.price, 0);
  const atLimit = !isPro && history.length >= 5;

  return (
    <div className="space-y-5 pt-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="bg-indigo-50 p-2 rounded-xl">
            <Clock size={20} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
            Historique
          </h1>
        </div>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors"
          >
            Tout effacer
          </button>
        )}
      </div>

      {/* Stats summary */}
      {history.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
              <BarChart2 size={12} />
              <span>Total dépensé</span>
            </div>
            <div className="text-xl font-black text-slate-900">
              {formatCurrency(totalSpent, profile.currencyCode)}
            </div>
            <div className="text-xs text-slate-400">{history.length} achat{history.length > 1 ? 's' : ''}</div>
          </div>
          <div className="card p-4 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
              <Clock size={12} />
              <span>Temps total</span>
            </div>
            <div className="text-xl font-black text-slate-900">
              {formatTime(totalHours, profile.hoursPerWeek)}
            </div>
            <div className="text-xs text-slate-400">de travail</div>
          </div>
        </div>
      )}

      {/* Pro upsell */}
      {atLimit && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 p-2 rounded-xl shrink-0">
              <Lock className="text-amber-600" size={16} />
            </div>
            <div className="space-y-1 flex-1">
              <p className="text-sm text-amber-900 font-bold">
                Limite atteinte (5/5)
              </p>
              <p className="text-xs text-amber-700 leading-relaxed">
                Passez à VALO Pro pour un historique illimité et des statistiques avancées.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center space-x-1 mt-2 text-xs font-bold text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <span>Découvrir Pro</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {history.length === 0 ? (
        <div className="text-center py-16 card space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto">
            <Clock size={28} className="text-slate-300" />
          </div>
          <div>
            <p className="text-slate-600 font-semibold">Aucun calcul sauvegardé</p>
            <p className="text-sm text-slate-400 mt-1">
              Faites un calcul et sauvegardez-le pour le retrouver ici.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 text-sm font-semibold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl hover:bg-indigo-100 transition-colors"
          >
            <span>Commencer à calculer</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <div className="space-y-2.5">
          {history.map((calc, index) => (
            <div
              key={calc.id}
              className={clsx(
                'card p-4 flex items-center justify-between group',
                'card-hover',
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-slate-900 truncate">{calc.itemName}</h3>
                  <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">
                    {formatCurrency(calc.price, calc.currencyCode)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-indigo-600 font-semibold">
                    <Clock size={13} />
                    <span>{formatTime(calc.resultHours, profile.hoursPerWeek)}</span>
                  </div>
                  <span className="text-slate-300 text-xs">·</span>
                  <span className="text-xs text-slate-400">
                    {formatCurrency(calc.hourlyRateUsed, calc.currencyCode)}/h
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
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
                className="ml-3 text-slate-200 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-50 shrink-0"
                aria-label="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
