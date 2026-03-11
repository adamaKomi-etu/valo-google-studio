"use client";
import { useState, FormEvent } from 'react';
import { User, Save, CheckCircle2, Clock } from 'lucide-react';
import { useStore } from '../../../shared/store';
import { calculateHourlyRate, formatCurrency } from '../../../shared/utils';
import { clsx } from 'clsx';

type SalaryType = 'monthly' | 'hourly';
type TaxMode = 'net' | 'gross';

const CURRENCIES = [
  { code: 'EUR', label: 'Euro', symbol: '€' },
  { code: 'USD', label: 'Dollar US', symbol: '$' },
  { code: 'MAD', label: 'Dirham', symbol: 'DH' },
  { code: 'CAD', label: 'Dollar CA', symbol: 'CA$' },
  { code: 'CHF', label: 'Franc CH', symbol: 'Fr' },
  { code: 'GBP', label: 'Livre', symbol: '£' },
];

function getCurrencySymbol(code: string): string {
  return CURRENCIES.find((c) => c.code === code)?.symbol ?? code;
}

export default function Settings() {
  const { profile, updateProfile } = useStore();
  const [saved, setSaved] = useState(false);

  const hourlyRate = calculateHourlyRate(profile);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-5 pt-2">
      {/* Header */}
      <div className="flex items-center space-x-2.5">
        <div className="bg-indigo-50 p-2 rounded-xl">
          <User size={20} className="text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Mon Profil</h1>
          <p className="text-xs text-slate-400">Configurez votre salaire pour des calculs précis</p>
        </div>
      </div>

      {/* Live preview card */}
      <div className="gradient-dark rounded-2xl p-4 text-white space-y-1 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-indigo-400 blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="text-indigo-300 text-xs font-semibold uppercase tracking-widest flex items-center space-x-1.5">
            <Clock size={11} />
            <span>Votre taux horaire estimé</span>
          </div>
          <div className="text-3xl font-black mt-1">
            {formatCurrency(hourlyRate, profile.currencyCode)}
            <span className="text-lg font-medium text-indigo-300">/h</span>
          </div>
          <p className="text-indigo-200/60 text-xs mt-1">
            Mis à jour en temps réel selon vos préférences
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="card p-5 space-y-5">
        {/* Salary */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Salaire
          </label>
          <div className="relative">
            <input
              type="number"
              value={profile.salary}
              onChange={(e) => updateProfile({ salary: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-4 pr-16 focus:ring-2 focus:ring-indigo-400 transition-all outline-none font-bold text-lg text-slate-900"
              min="0"
              step="50"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold text-sm">
              {getCurrencySymbol(profile.currencyCode)}
            </div>
          </div>
        </div>

        {/* Type + Mode */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Fréquence
            </label>
            <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              {(['monthly', 'hourly'] as SalaryType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateProfile({ salaryType: type })}
                  className={clsx(
                    'flex-1 py-2.5 text-xs font-semibold transition-all',
                    profile.salaryType === type
                      ? 'gradient-brand text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700',
                  )}
                >
                  {type === 'monthly' ? 'Mensuel' : 'Horaire'}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Mode
            </label>
            <div className="flex rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
              {(['net', 'gross'] as TaxMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => updateProfile({ taxMode: mode })}
                  className={clsx(
                    'flex-1 py-2.5 text-xs font-semibold transition-all',
                    profile.taxMode === mode
                      ? 'gradient-brand text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-700',
                  )}
                >
                  {mode === 'net' ? 'Net' : 'Brut'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tax rate */}
        {profile.taxMode === 'gross' && (
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Taux d&apos;imposition
              <span className="ml-1 font-bold text-slate-700">{profile.taxRate}%</span>
            </label>
            <input
              type="range"
              value={profile.taxRate}
              onChange={(e) => updateProfile({ taxRate: parseFloat(e.target.value) })}
              min="0"
              max="60"
              step="1"
              className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0%</span>
              <span>30%</span>
              <span>60%</span>
            </div>
          </div>
        )}

        {/* Hours per week + Currency */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              H / Semaine
            </label>
            <input
              type="number"
              value={profile.hoursPerWeek}
              onChange={(e) => updateProfile({ hoursPerWeek: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold focus:ring-2 focus:ring-indigo-400 outline-none transition-all"
              min="1"
              max="80"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Devise
            </label>
            <select
              value={profile.currencyCode}
              onChange={(e) => updateProfile({ currencyCode: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 text-sm font-semibold focus:ring-2 focus:ring-indigo-400 outline-none transition-all appearance-none"
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          className={clsx(
            'w-full flex items-center justify-center space-x-2 rounded-xl py-3.5 font-bold text-sm transition-all duration-200',
            saved
              ? 'bg-emerald-500 text-white'
              : 'gradient-brand text-white shadow-md shadow-indigo-200 hover:opacity-90 active:scale-95',
          )}
        >
          {saved ? (
            <>
              <CheckCircle2 size={18} />
              <span>Profil enregistré !</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Enregistrer les préférences</span>
            </>
          )}
        </button>
      </form>

      {/* Note */}
      <p className="text-center text-xs text-slate-400 pb-2">
        Vos données sont stockées localement sur votre appareil.
      </p>
    </div>
  );
}
