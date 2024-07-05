'use client';

import ThemeToggle from '@/components/ThemeToggle';

export default function Navbar() {
  return (
    <header className="header p-4 flex justify-between items-center">
      <h1 className="text-3xl">Crypto Exchange</h1>
      <ThemeToggle />
    </header>
  );
}
