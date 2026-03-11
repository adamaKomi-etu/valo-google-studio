import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SalaryType = 'monthly' | 'hourly';
export type TaxMode = 'net' | 'gross';

export interface Profile {
  salary: number;
  salaryType: SalaryType;
  taxMode: TaxMode;
  taxRate: number;
  hoursPerWeek: number;
  currencyCode: string;
}

export interface Calculation {
  id: string;
  itemName: string;
  price: number;
  currencyCode: string;
  hourlyRateUsed: number;
  resultHours: number;
  createdAt: string;
}

interface AppState {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => void;
  history: Calculation[];
  addCalculation: (calc: Omit<Calculation, 'id' | 'createdAt'>) => void;
  removeCalculation: (id: string) => void;
  clearHistory: () => void;
  isPro: boolean;
  setPro: (isPro: boolean) => void;
}

const defaultProfile: Profile = {
  salary: 2000,
  salaryType: 'monthly',
  taxMode: 'net',
  taxRate: 22,
  hoursPerWeek: 35,
  currencyCode: 'EUR',
};

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      updateProfile: (updates) =>
        set((state) => ({
          profile: { ...state.profile, ...updates },
        })),
      history: [],
      addCalculation: (calc) =>
        set((state) => {
          const newCalc: Calculation = {
            ...calc,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          };
          // Free users can only keep 5 items, Pro unlimited
          const newHistory = [newCalc, ...state.history];
          if (!state.isPro && newHistory.length > 5) {
            newHistory.pop();
          }
          return { history: newHistory };
        }),
      removeCalculation: (id) =>
        set((state) => ({
          history: state.history.filter((c) => c.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
      isPro: false,
      setPro: (isPro) => set({ isPro }),
    }),
    {
      name: 'valo-storage',
    }
  )
);
