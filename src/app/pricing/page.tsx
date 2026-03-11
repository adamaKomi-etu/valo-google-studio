"use client";
import Pricing from '../../features/pricing/components/Pricing';
import { useEffect, useState } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Pricing />;
}
