"use client";

const useStore = () => ({
  isPro: false,
  setPro: (isPro: boolean) => {},
});

export default function Pricing() {
  const { isPro, setPro } = useStore();

  const handleSubscribe = () => {
    // Mock subscription
    setPro(true);
    alert('Félicitations ! Vous êtes maintenant Pro.');
  };

  const handleCancel = () => {
    setPro(false);
    alert('Abonnement annulé.');
  };

  if (isPro) {
    return (
      <div className="space-y-6 pt-4 text-center">
        {/* <Crown size={48} className="mx-auto text-amber-500 mb-4" /> */}
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Vous êtes Pro
        </h1>
        <p className="text-neutral-500">
          Merci de soutenir VALO. Vous avez accès à toutes les fonctionnalités.
        </p>
        <button
          onClick={handleCancel}
          className="text-sm font-medium text-red-600 hover:text-red-700 underline"
        >
          Annuler l'abonnement
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pt-4 pb-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold mb-2">
          {/* <Star size={16} className="fill-indigo-700" /> */}
          <span>VALO Pro</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
          Prenez de meilleures décisions
        </h1>
        <p className="text-neutral-500 text-sm max-w-[280px] mx-auto">
          Débloquez l'historique illimité, le comparateur d'articles et les statistiques mensuelles.
        </p>
      </div>

      <div
        className="bg-neutral-900 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10">
          {/* <Zap size={120} /> */}
        </div>

        <div className="relative z-10 space-y-6">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-bold">2,99€</span>
              <span className="text-neutral-400 font-medium">/mois</span>
            </div>
            <p className="text-neutral-400 text-sm mt-1">
              Annulable à tout moment.
            </p>
          </div>

          <ul className="space-y-4">
            {[
              'Historique de calculs illimité',
              'Comparateur d' + "'" + 'articles (Bientôt)',
              'Export image partageable (Bientôt)',
              'Statistiques mensuelles (Bientôt)',
              'Support prioritaire',
            ].map((feature, i) => (
              <li key={i} className="flex items-start space-x-3">
                {/* <Check size={20} className="text-emerald-400 shrink-0" /> */}
                <span className="text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleSubscribe}
            className="w-full bg-white text-neutral-900 rounded-xl py-4 font-bold text-lg hover:bg-neutral-100 transition-colors shadow-lg shadow-white/10"
          >
            Commencer l'essai gratuit (14j)
          </button>

          <div className="flex items-center justify-center space-x-2 text-xs text-neutral-400">
            {/* <Shield size={14} /> */}
            <span>Paiement sécurisé par Stripe</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs text-neutral-500">
          Ou économisez 30% avec le plan annuel à 24,99€/an.
        </p>
      </div>
    </div>
  );
}
