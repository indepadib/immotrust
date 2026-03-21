import React from 'react';
import { Header } from '@/components/layout/Header';

export default function ImmoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Header />
      {children}
    </div>
  );
}
