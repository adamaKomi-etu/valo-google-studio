import { Profile } from '../store';

export function calculateHourlyRate(profile: Profile): number {
  const { salary, salaryType, taxMode, taxRate, hoursPerWeek } = profile;

  let netSalary = salary;
  if (taxMode === 'gross') {
    netSalary = salary * (1 - taxRate / 100);
  }

  if (salaryType === 'hourly') {
    return netSalary;
  }

  // Monthly
  const hoursPerMonth = hoursPerWeek * 4.33;
  return netSalary / hoursPerMonth;
}

export function formatTime(hours: number, hoursPerWeek: number = 35): string {
  if (hours < 1) {
    const minutes = Math.round(hours * 60);
    return `${minutes} min`;
  }

  const hoursPerDay = hoursPerWeek / 5;

  if (hours < hoursPerDay) {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }

  const days = hours / hoursPerDay;
  if (days < 5) {
    return `${days.toFixed(1)} jours`;
  }

  const weeks = days / 5;
  if (weeks < 4) {
    return `${weeks.toFixed(1)} sem`;
  }

  const months = weeks / 4.33;
  return `${months.toFixed(1)} mois`;
}

export function formatCurrency(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}
