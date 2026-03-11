"use client";
// import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import { Calculator, History, Settings, CreditCard } from 'lucide-react';
import { clsx } from 'clsx';

export default function BottomNav() {
  const pathname = usePathname();
  const navItems = [
    { path: '/', label: 'Calculer' },
    { path: '/history', label: 'Historique' },
    { path: '/settings', label: 'Profil' },
    { path: '/pricing', label: 'Pro' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 pb-4 pt-2 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          // const Icon = item.icon;
          return (
            <a
              key={item.path}
              href={item.path}
              className={clsx(
                'flex flex-col items-center justify-center w-full h-full space-y-1',
                isActive ? 'text-indigo-600' : 'text-neutral-500 hover:text-neutral-900'
              )}
            >
              {/* <Icon size={20} strokeWidth={isActive ? 2.5 : 2} /> */}
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
