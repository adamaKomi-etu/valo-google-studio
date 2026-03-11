'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-50 font-sans flex items-center justify-center min-h-screen">
        <div className="text-center space-y-5 px-4">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-2xl">⚠️</span>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Une erreur est survenue</h2>
            <p className="text-slate-500 text-sm">
              {error.message || 'Quelque chose s\'est mal passé.'}
            </p>
          </div>
          <button
            onClick={() => reset()}
            className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
