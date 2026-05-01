'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, LayoutDashboard, User } from 'lucide-react';
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
        ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5 py-4 shadow-luxury-soft" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/immo" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">
            Avis <span className="text-primary not-italic">Promoteur Maroc</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Projets', href: '/immo/projects' },
            { label: 'Promoteurs', href: '/immo/developers' },
            { label: 'Analyse', href: '/immo/compare' },
            { label: 'Simulator', href: '/immo/simulator' },
          ].map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="group relative py-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-secondary dark:hover:text-white transition-colors"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link 
            href="/immo/projects" 
            className="p-3 bg-white/50 dark:bg-white/5 rounded-xl text-slate-500 hover:text-primary hover:bg-white dark:hover:bg-white/10 transition-all border border-transparent hover:border-slate-100 dark:hover:border-white/10"
          >
            <Search className="w-5 h-5" />
          </Link>
          
          <div className="w-px h-6 bg-slate-100 dark:bg-white/10 mx-2" />
          
          <Link href="/immo/dashboard" className="hidden md:flex items-center gap-3 pl-2 group">
             <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-primary transition-all group-hover:border-primary group-hover:shadow-luxury-primary">
                <User className="w-5 h-5" />
             </div>
             <div className="hidden xl:block text-left">
                <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Portfolio Value</div>
                <div className="text-xs font-black text-secondary dark:text-white italic leading-none">2.4M MAD</div>
             </div>
          </Link>
        </div>
      </div>
    </header>
  );
};
