'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, MessageSquarePlus } from 'lucide-react';
import { clsx } from 'clsx';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={clsx(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-6",
      isScrolled 
        ? "bg-white/90 backdrop-blur-2xl border-b border-slate-100 py-4 shadow-luxury-soft" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/immo" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xl font-black text-secondary uppercase italic tracking-tighter">
            Avis <span className="text-primary not-italic">Promoteur Maroc</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Promoteurs', href: '/immo/developers' },
            { label: 'Projets', href: '/immo/projects' },
            { label: 'Guides', href: '/immo/guides' },
            { label: 'Simulateur', href: '/immo/simulator' },
          ].map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="group relative py-2 text-[12px] font-bold uppercase tracking-wider text-slate-600 hover:text-primary transition-colors"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/immo/submit-review" className="flex items-center gap-2 btn-premium">
             <MessageSquarePlus className="w-4 h-4" />
             <span>Laisser un avis</span>
          </Link>
        </div>
      </div>
    </header>
  );
};