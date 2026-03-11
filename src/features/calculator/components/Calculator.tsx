"use client";
import { useState, useEffect, useCallback } from 'react';
import { Clock, Save, Info, TrendingUp, Coffee, Zap, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../../shared/store';
import { calculateHourlyRate, formatTime, formatCurrency } from '../../../shared/utils';
import { clsx } from 'clsx';

type SpendingLevel = 'low' | 'moderate' | 'high' | 'very-high';

function getSpendingLevel(percentage: number): SpendingLevel {
  if (percentage <= 2) return 'low';
  if (percentage <= 10) return 'moderate';
  if (percentage <= 25) return 'high';
  return 'very-high';
}

const SPENDING_CONFIG: Record<SpendingLevel, {
  label: string;
  color: string;
  barColor: string;
  bg: string;
  emoji: string;
}> = {
  low: {
    label: 'Achat raisonnable',
    color: 'text-emerald-700',
    barColor: 'bg-emerald-400',
    bg: 'bg-emerald-50',
    emoji: '✅',
  },
  moderate: {
    label: 'Achat modéré',
    color: 'text-amber-700',
    barColor: 'bg-amber-400',
    bg: 'bg-amber-50',
    emoji: '🤔',
  },
  high: {
    label: 'Achat significatif',
    color: 'text-orange-700',
    barColor: 'bg-orange-400',
    bg: 'bg-orange-50',
    emoji: '⚠️',
  },
  'very-high': {
    label: 'Achat majeur',
    color: 'text-red-700',
    barColor: 'bg-red-400',
    bg: 'bg-red-50',
    emoji: '🚨',
  },
};

function getCoffeeEquivalent(hours: number): string {
  const coffeeMinutes = 15;
  const coffees = Math.round((hours * 60) / coffeeMinutes);
  if (coffees <= 1) return '';
  if (coffees < 10) return `≈ ${coffees} pauses café`;
  const lunches = Math.round(hours / 0.75);
  if (lunches < 10) return `≈ ${lunches} pauses déjeuner`;
  return '';
}

function TimeBreakdown({ hours, hoursPerWeek }: { hours: number; hoursPerWeek: number }) {
  const minutes = Math.round(hours * 60);
  const hoursPerDay = hoursPerWeek / 5;
  const days = hours / hoursPerDay;
  const weeks = days / 5;

  const breakdowns = [
    { label: 'Minutes', value: minutes, show: minutes < 60 },
    { label: 'Heures', value: parseFloat(hours.toFixed(1)), show: hours >= 1 && hours < hoursPerDay * 2 },
    { label: 'Jours', value: parseFloat(days.toFixed(1)), show: days >= 1 && days < 10 },
    { label: 'Semaines', value: parseFloat(weeks.toFixed(1)), show: weeks >= 1 && weeks < 8 },
  ].filter((b) => b.show).slice(0, 2);

  if (breakdowns.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-2">
      {breakdowns.map((b) => (
        <div key={b.label} className="bg-slate-50 rounded-xl p-3 text-center">
          <div className="text-xl font-bold text-slate-800">{b.value}</div>
          <div className="text-xs text-slate-500 font-medium mt-0.5">{b.label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Calculator() {
  const { profile, addCalculation, isPro, history } = useStore();
  const [price, setPrice] = useState('');
  const [itemName, setItemName] = useState('');
  const [saved, setSaved] = useState(false);
  const [result, setResult] = useState<{
    hours: number;
    hourlyRate: number;
    percentage: number;
    level: SpendingLevel;
    coffee: string;
  } | null>(null);

  useEffect(() => {
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice) && numPrice > 0) {
      const hourlyRate = calculateHourlyRate(profile);
      const hoursPerMonth = profile.hoursPerWeek * 4.33;
      const monthlyNetSalary = hourlyRate * hoursPerMonth;
      const hours = numPrice / hourlyRate;
      const percentage = (numPrice / monthlyNetSalary) * 100;
      const level = getSpendingLevel(percentage);
      setResult({ hours, hourlyRate, percentage, level, coffee: getCoffeeEquivalent(hours) });
    } else {
      setResult(null);
    }
  }, [price, profile]);

  const handleSave = useCallback(() => {
    if (!result || parseFloat(price) <= 0) return;
    const canSave = isPro || history.length < 5;
    if (!canSave) return;
    addCalculation({
      itemName: itemName.trim() || 'Achat rapide',
      price: parseFloat(price),
      currencyCode: profile.currencyCode,
      hourlyRateUsed: result.hourlyRate,
      resultHours: result.hours,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setItemName('');
      setPrice('');
    }, 1500);
  }, [result, price, itemName, profile, addCalculation, isPro, history.length]);

  const config = result ? SPENDING_CONFIG[result.level] : null;
  const canSave = isPro || history.length < 5;

  return (
    <div className="space-y-5">
      {/* Hero section */}
      <div className="text-center space-y-1.5 pt-2">
        <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-500 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full mb-1">
          <Zap size={11} className="fill-indigo-500" />
          <span>Calculateur temps de vie</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Combien de temps{' '}
          <span className="text-gradient">ça vaut ?</span>
        </h1>
        <p className="text-slate-500 text-sm">
          Découvrez le vrai coût de vos achats.
        </p>
      </div>

      {/* Input card */}
      <div className="card p-5 space-y-4">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Prix de l&apos;article
          </label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="w-full text-5xl font-black bg-transparent border-none py-2 pr-16 focus:ring-0 outline-none text-slate-900 placeholder-slate-200 tracking-tight"
              autoFocus
              min="0"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <span className="text-lg font-bold text-slate-300">
                {profile.currencyCode}
              </span>
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-indigo-200 via-indigo-400 to-transparent rounded-full" />
        </div>

        {/* Hourly rate info */}
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <Info size={12} className="shrink-0" />
          <span>
            Taux horaire : <strong className="text-slate-600">
              {formatCurrency(calculateHourlyRate(profile), profile.currencyCode)}/h
            </strong>
            {' '}·{' '}
            <a href="/settings" className="text-indigo-400 hover:text-indigo-600 underline underline-offset-2">
              Modifier
            </a>
          </span>
        </div>
      </div>

      {/* Result card */}
      {result && config && (
        <div className="space-y-3">
          {/* Main result */}
          <div className="gradient-dark rounded-2xl p-5 text-white shadow-lg shadow-indigo-900/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 right-2 w-32 h-32 rounded-full bg-indigo-400 blur-3xl" />
              <div className="absolute bottom-0 left-4 w-24 h-24 rounded-full bg-purple-400 blur-2xl" />
            </div>
            <div className="relative z-10 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-indigo-200 text-xs font-semibold uppercase tracking-widest mb-1">
                    Temps de travail
                  </div>
                  <div className="text-4xl font-black tracking-tight leading-none">
                    {formatTime(result.hours, profile.hoursPerWeek)}
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-2.5 backdrop-blur-sm">
                  <Clock size={22} className="text-indigo-300" />
                </div>
              </div>
              {result.coffee && (
                <div className="flex items-center space-x-2 text-indigo-200/80 text-xs font-medium">
                  <Coffee size={12} />
                  <span>{result.coffee}</span>
                </div>
              )}
            </div>
          </div>

          {/* Spending level */}
          <div className={clsx('rounded-2xl p-4 space-y-3', config.bg)}>
            <div className="flex items-center justify-between">
              <div className={clsx('flex items-center space-x-2 font-semibold text-sm', config.color)}>
                <span>{config.emoji}</span>
                <span>{config.label}</span>
              </div>
              <span className={clsx('text-sm font-bold', config.color)}>
                {result.percentage.toFixed(1)}% du salaire
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-2 bg-white/60 rounded-full overflow-hidden">
              <div
                className={clsx('h-full rounded-full transition-all duration-700', config.barColor)}
                style={{ width: `${Math.min(result.percentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Time breakdown */}
          <TimeBreakdown hours={result.hours} hoursPerWeek={profile.hoursPerWeek} />

          {/* Trend comparison */}
          {history.length > 0 && (
            <div className="card p-3 flex items-center space-x-3">
              <div className="bg-indigo-50 p-2 rounded-lg">
                <TrendingUp size={16} className="text-indigo-500" />
              </div>
              <div className="text-xs text-slate-500 flex-1">
                <span className="font-semibold text-slate-700">
                  {history.length} achat{history.length > 1 ? 's' : ''} sauvegardé{history.length > 1 ? 's' : ''}
                </span>
                {' '}dans votre historique.
              </div>
            </div>
          )}

          {/* Save section */}
          <div className="space-y-2.5">
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Nom de l'article (ex: Baskets Nike)"
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-400 outline-none transition-all placeholder-slate-300"
              maxLength={60}
            />
            <button
              onClick={handleSave}
              disabled={!canSave || saved}
              className={clsx(
                'w-full flex items-center justify-center space-x-2 rounded-xl py-3.5 font-bold text-sm transition-all duration-200',
                saved
                  ? 'bg-emerald-500 text-white'
                  : canSave
                  ? 'gradient-brand text-white shadow-md shadow-indigo-200 hover:opacity-90 active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed',
              )}
            >
              {saved ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Sauvegardé !</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>
                    {canSave
                      ? 'Sauvegarder dans l\'historique'
                      : 'Limite gratuite atteinte (5/5)'}
                  </span>
                </>
              )}
            </button>
            {!canSave && (
              <p className="text-center text-xs text-amber-600">
                <a href="/pricing" className="underline font-semibold">Passer à Pro</a> pour un historique illimité.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Empty state hint */}
      {!result && (
        <div className="text-center py-10 space-y-3">
          <div className="w-16 h-16 gradient-brand rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
            <Clock size={28} className="text-white" />
          </div>
          <p className="text-slate-400 text-sm">
            Entrez un prix pour voir combien de temps il vaut.
          </p>
        </div>
      )}
    </div>
  );
}
