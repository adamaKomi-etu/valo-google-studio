"use client";
import { useState, useEffect } from 'react';
import { calculateHourlyRate, formatTime, formatCurrency } from '../../../shared/utils';

const useStore = () => ({
  profile: {
    salary: 2000,
    salaryType: 'monthly' as 'monthly' | 'hourly',
    taxMode: 'net' as 'net' | 'gross',
    taxRate: 22,
    hoursPerWeek: 35,
    currencyCode: 'EUR',
  },
  addCalculation: (calc: any) => {},
});
// import { motion, AnimatePresence } from 'motion/react';
// import { ArrowRight, Save, Clock, Info } from 'lucide-react';

export default function Calculator() {
  const { profile, addCalculation } = useStore();
  const [price, setPrice] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [result, setResult] = useState<{ hours: number; hourlyRate: number; percentage: number } | null>(null);

  useEffect(() => {
    const numPrice = parseFloat(price);
    if (!isNaN(numPrice) && numPrice > 0) {
      const hourlyRate = calculateHourlyRate(profile);
      const monthlyNetSalary = hourlyRate * profile.hoursPerWeek * 4.33;
      const percentage = (numPrice / monthlyNetSalary) * 100;
      setResult({
        hours: numPrice / hourlyRate,
        hourlyRate,
        percentage,
      });
    } else {
      setResult(null);
    }
  }, [price, profile]);

  const handleSave = () => {
    if (result && parseFloat(price) > 0) {
      addCalculation({
        itemName: itemName || 'Achat rapide',
        price: parseFloat(price),
        currencyCode: profile.currencyCode,
        hourlyRateUsed: result.hourlyRate,
        resultHours: result.hours,
      });
      setItemName('');
      setPrice('');
      alert('Calcul sauvegardé !');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 pt-4">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Combien de temps ?
        </h1>
        <p className="text-neutral-500 text-sm">
          Découvrez le coût réel de vos achats en temps de vie.
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-700">
            Prix de l'article ({profile.currencyCode})
          </label>
          <div className="relative">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ex: 120"
              className="w-full text-4xl font-bold bg-neutral-50 border-none rounded-xl py-4 px-4 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-medium">
              {profile.currencyCode}
            </div>
          </div>
        </div>

        <div>
          {result && (
            <div
              className="overflow-hidden"
            >
              <div className="pt-4 border-t border-neutral-100 space-y-4">
                <div className="bg-indigo-50 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-indigo-900 font-bold text-3xl">
                      {formatTime(result.hours, profile.hoursPerWeek)}
                    </div>
                    <div className="text-indigo-700 text-sm font-medium">
                      de travail nécessaire
                    </div>
                  </div>
                  {/* <Clock className="text-indigo-300 w-10 h-10" /> */}
                </div>

                <div className="flex items-center space-x-2 text-xs text-neutral-500 bg-neutral-50 p-3 rounded-lg">
                  {/* <Info size={14} className="shrink-0" /> */}
                  <p>
                    Soit <strong className="text-neutral-700">{result.percentage.toFixed(1)}%</strong> de votre salaire mensuel net estimé.
                  </p>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    placeholder="Nom de l'article (ex: Baskets)"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                  <button
                    onClick={handleSave}
                    className="w-full flex items-center justify-center space-x-2 bg-neutral-900 text-white rounded-lg py-3 font-medium hover:bg-neutral-800 transition-colors"
                  >
                    {/* <Save size={18} /> */}
                    <span>Sauvegarder</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
