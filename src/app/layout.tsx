import './globals.css';
// import BottomNav from '../shared/components/BottomNav';
// import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VALO',
  description: 'Convertis le prix d\'un achat en temps de travail réel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-neutral-50 text-neutral-900 antialiased font-sans flex flex-col min-h-screen">
        <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
          <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-bold text-xl tracking-tight text-neutral-900">
              VALO
            </a>
            <div className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full">
              Beta
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-md w-full mx-auto p-4 pb-24">
          {children}
        </main>
      </body>
    </html>
  );
}
