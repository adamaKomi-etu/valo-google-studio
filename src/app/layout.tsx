import './globals.css';
import type { Metadata, Viewport } from 'next';
import BottomNav from '../shared/components/BottomNav';

export const metadata: Metadata = {
  title: 'VALO — Convertis tes achats en temps de vie',
  description: "Découvrez le vrai coût de vos achats en temps de travail réel. VALO vous aide à prendre de meilleures décisions financières.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased font-sans flex flex-col min-h-screen h-full">
        <header className="glass border-b border-white/60 sticky top-0 z-40 shadow-sm shadow-slate-100/50">
          <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 gradient-brand rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-xs">V</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                VALO
              </span>
            </a>
            <div className="flex items-center space-x-2">
              <div className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                Beta
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-md w-full mx-auto px-4 pt-4 pb-28">
          {children}
        </main>

        <BottomNav />
      </body>
    </html>
  );
}
