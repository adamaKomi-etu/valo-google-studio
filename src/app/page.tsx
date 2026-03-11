"use client";
import Calculator from '../features/calculator/components/Calculator';
import { useEffect, useState } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Calculator />;
}
