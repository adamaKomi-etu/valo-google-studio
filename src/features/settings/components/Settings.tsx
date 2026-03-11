"use client";
import { FormEvent } from 'react';

type SalaryType = 'monthly' | 'hourly';
type TaxMode = 'net' | 'gross';
const useStore = () => ({
  profile: {
    salary: 2000,
    salaryType: 'monthly' as SalaryType,
    taxMode: 'net' as TaxMode,
    taxRate: 22,
    hoursPerWeek: 35,
    currencyCode: 'EUR',
  },
  updateProfile: (profile: any) => {},
});

export default function Settings() {
  const { profile, updateProfile } = useStore();

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    alert('Profil sauvegardé !');
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center space-x-3 text-neutral-900">
        {/* <User size={28} className="text-indigo-600" /> */}
        <h1 className="text-2xl font-bold tracking-tight">Mon Profil</h1>
      </div>

      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-neutral-700">
              Salaire
            </label>
            <div className="relative">
              <input
                type="number"
                value={profile.salary}
                onChange={(e) => updateProfile({ salary: parseFloat(e.target.value) || 0 })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none font-medium"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">
                {profile.currencyCode}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Type
              </label>
              <select
                value={profile.salaryType}
                onChange={(e) => updateProfile({ salaryType: e.target.value as SalaryType })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="monthly">Mensuel</option>
                <option value="hourly">Horaire</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Mode
              </label>
              <select
                value={profile.taxMode}
                onChange={(e) => updateProfile({ taxMode: e.target.value as TaxMode })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="net">Net</option>
                <option value="gross">Brut</option>
              </select>
            </div>
          </div>

          {profile.taxMode === 'gross' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-700">
                Taux d'imposition (%)
              </label>
              <input
                type="number"
                value={profile.taxRate}
                onChange={(e) => updateProfile({ taxRate: parseFloat(e.target.value) || 0 })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Heures / Semaine
              </label>
              <input
                type="number"
                value={profile.hoursPerWeek}
                onChange={(e) => updateProfile({ hoursPerWeek: parseFloat(e.target.value) || 0 })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Devise
              </label>
              <select
                value={profile.currencyCode}
                onChange={(e) => updateProfile({ currencyCode: e.target.value })}
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="MAD">MAD (DH)</option>
                <option value="CAD">CAD ($)</option>
                <option value="CHF">CHF (Fr)</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center space-x-2 bg-neutral-900 text-white rounded-xl py-3 font-medium hover:bg-neutral-800 transition-colors"
        >
          {/* <Save size={18} /> */}
          <span>Enregistrer les préférences</span>
        </button>
      </form>
    </div>
  );
}
