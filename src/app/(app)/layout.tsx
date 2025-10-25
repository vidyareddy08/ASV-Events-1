
'use client';

import { type ReactNode } from 'react';
import Header from '@/components/Header';

export default function AppLayout({ children }: { children: ReactNode }) {
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow pt-16 animate-in fade-in-25 duration-300">
        {children}
      </main>
    </div>
  );
}
