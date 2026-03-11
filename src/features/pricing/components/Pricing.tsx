"use client";
import { Check, Crown, Shield, Sparkles, X } from 'lucide-react';
import { useStore } from '../../../shared/store';
import { clsx } from 'clsx';

const FREE_FEATURES = [
  { text: 'Calcul illimité', included: true },
  { text: 'Historique (5 max)', included: true },
  { text: 'Personnalisation du profil', included: true },
  { text: 'Historique illimité', included: false },
  { text: 'Comparateur d\'articles', included: false },
  { text: 'Export image partageable', included: false },
  { text: 'Statistiques mensuelles', included: false },
];

const PRO_FEATURES = [
  { text: 'Calcul illimité', badge: '' },
  { text: 'Historique illimité', badge: '' },
  { text: 'Personnalisation du profil', badge: '' },
  { text: 'Comparateur d\'articles', badge: 'Bientôt' },
  { text: 'Export image partageable', badge: 'Bientôt' },
  { text: 'Statistiques mensuelles', badge: 'Bientôt' },
  { text: 'Support prioritaire', badge: '' },
];

export default function Pricing() {
  const { isPro, setPro } = useStore();

  const handleSubscribe = () => {
    setPro(true);
  };

  const handleCancel = () => {
    setPro(false);
  };

  if (isPro) {
    return (
      <div className="space-y-6 pt-4 pb-8">
        {/* Pro status card */}
        <div className="gradient-dark rounded-3xl p-6 text-white text-center shadow-xl shadow-indigo-900/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 right-2 w-32 h-32 rounded-full bg-amber-400 blur-3xl" />
            <div className="absolute bottom-0 left-4 w-24 h-24 rounded-full bg-purple-400 blur-2xl" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="w-16 h-16 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto border border-amber-300/30">
              <Crown size={32} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">Vous êtes Pro ✨</h1>
              <p className="text-indigo-200 text-sm mt-1">
                Merci de soutenir VALO. Profitez de toutes les fonctionnalités.
              </p>
            </div>
          </div>
        </div>

        {/* Active features */}
        <div className="card p-5 space-y-3">
          <h2 className="font-bold text-slate-800 text-sm">Fonctionnalités actives</h2>
          <ul className="space-y-2.5">
            {PRO_FEATURES.map((f, i) => (
              <li key={i} className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                    <Check size={11} className="text-emerald-600" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-700">{f.text}</span>
                </div>
                {f.badge && (
                  <span className="text-[10px] font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {f.badge}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={handleCancel}
            className="text-sm text-red-400 hover:text-red-500 underline underline-offset-2 font-medium transition-colors"
          >
            Annuler l&apos;abonnement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4 pb-8">
      {/* Hero */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold">
          <Sparkles size={12} className="fill-amber-500" />
          <span>VALO Pro</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Prenez de meilleures
          <br />
          <span className="text-gradient">décisions financières</span>
        </h1>
        <p className="text-slate-500 text-sm max-w-[280px] mx-auto leading-relaxed">
          Débloquez l&apos;historique illimité, les comparaisons et les statistiques avancées.
        </p>
      </div>

      {/* Pricing comparison */}
      <div className="grid grid-cols-2 gap-3">
        {/* Free column */}
        <div className="card p-4 space-y-4 opacity-75">
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Gratuit</div>
            <div className="text-2xl font-black text-slate-900 mt-1">0€</div>
          </div>
          <ul className="space-y-2">
            {FREE_FEATURES.map((f, i) => (
              <li key={i} className="flex items-start space-x-2">
                <div className={clsx(
                  'w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5',
                  f.included ? 'bg-emerald-100' : 'bg-slate-100',
                )}>
                  {f.included
                    ? <Check size={9} className="text-emerald-600" strokeWidth={3} />
                    : <X size={9} className="text-slate-400" strokeWidth={3} />
                  }
                </div>
                <span className={clsx(
                  'text-xs leading-tight',
                  f.included ? 'text-slate-600' : 'text-slate-400',
                )}>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro column */}
        <div className="gradient-dark rounded-2xl p-4 space-y-4 text-white shadow-lg shadow-indigo-900/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 p-2">
            <Sparkles size={48} />
          </div>
          <div className="relative z-10">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider">Pro</div>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-2xl font-black">2,99€</span>
              <span className="text-indigo-300 text-xs">/mois</span>
            </div>
          </div>
          <ul className="space-y-2 relative z-10">
            {PRO_FEATURES.map((f, i) => (
              <li key={i} className="flex items-start space-x-2">
                <div className="w-4 h-4 bg-amber-400/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={9} className="text-amber-300" strokeWidth={3} />
                </div>
                <span className="text-xs text-indigo-100 leading-tight">{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main CTA */}
      <div className="space-y-3">
        <button
          onClick={handleSubscribe}
          className="w-full gradient-brand text-white rounded-2xl py-4 font-black text-lg hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-indigo-200"
        >
          Essai gratuit 14 jours →
        </button>
        <p className="text-center text-xs text-slate-400">
          Puis 2,99€/mois · Annulable à tout moment
        </p>
      </div>

      {/* Annual deal */}
      <div className="card p-4 flex items-center justify-between">
        <div>
          <div className="text-sm font-bold text-slate-800">Plan annuel</div>
          <div className="text-xs text-slate-500 mt-0.5">Économisez 30%</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-black text-indigo-600">24,99€/an</div>
          <div className="text-[10px] text-slate-400">≈ 2,08€/mois</div>
        </div>
      </div>

      {/* Trust */}
      <div className="flex items-center justify-center space-x-2 text-xs text-slate-400">
        <Shield size={13} />
        <span>Paiement sécurisé · Données locales · Aucun compte requis</span>
      </div>
    </div>
  );
}
