"use client";
import Settings from '../../features/settings/components/Settings';
import { useEffect, useState } from 'react';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <Settings />;
}
