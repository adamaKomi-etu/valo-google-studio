"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calculator, Clock, User, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { path: '/', label: 'Calculer', Icon: Calculator },
  { path: '/history', label: 'Historique', Icon: Clock },
  { path: '/settings', label: 'Profil', Icon: User },
  { path: '/pricing', label: 'Pro', Icon: Sparkles },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="glass border-t border-white/60 shadow-lg shadow-slate-200/50">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
          {navItems.map(({ path, label, Icon }) => {
            const isActive = pathname === path;
            const isPro = path === '/pricing';
            return (
              <Link
                key={path}
                href={path}
                className={clsx(
                  'relative flex flex-col items-center justify-center flex-1 h-full space-y-1 rounded-xl transition-all duration-200',
                  isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                )}
              >
                {isActive && (
                  <span className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full gradient-brand" />
                )}
                <div className={clsx(
                  'p-1.5 rounded-xl transition-all duration-200',
                  isActive && 'bg-indigo-50',
                  isPro && isActive && 'bg-gradient-to-br from-amber-50 to-orange-50',
                )}>
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    className={clsx(
                      isPro && isActive && 'text-amber-500',
                    )}
                  />
                </div>
                <span className={clsx(
                  'text-[10px] font-semibold leading-none',
                  isPro && isActive && 'text-amber-500',
                )}>
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
