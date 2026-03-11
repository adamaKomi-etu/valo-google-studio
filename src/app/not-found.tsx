import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-4">
      <div className="w-20 h-20 gradient-brand rounded-3xl flex items-center justify-center shadow-xl shadow-indigo-200 mx-auto">
        <span className="text-white font-black text-4xl">?</span>
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-black text-slate-900 tracking-tight">404</h1>
        <h2 className="text-xl font-bold text-slate-700">Page introuvable</h2>
        <p className="text-slate-400 text-sm max-w-xs">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
      </div>
      <Link
        href="/"
        className="gradient-brand text-white font-bold px-6 py-3 rounded-xl shadow-md shadow-indigo-200 hover:opacity-90 active:scale-95 transition-all text-sm"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
