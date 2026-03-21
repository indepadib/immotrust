'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Search, Users, Calculator, LayoutDashboard, Building2, Bell } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-100 dark:border-white/5 py-6">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/immo" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-all">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <span className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Immo<span className="text-primary not-italic">Trust</span></span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {[
            { label: 'Projets', href: '/immo/projects' },
            { label: 'Promoteurs', href: '/immo/developers' },
            { label: 'Communauté', href: '/immo/community' },
            { label: 'Simulateur', href: '/immo/simulator' },
          ].map((link) => (
            <Link 
              key={link.label} 
              href={link.href}
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-500 hover:text-primary transition-all">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/immo/admin/moderation" className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl text-slate-500 hover:text-primary transition-all">
             <LayoutDashboard className="w-5 h-5" />
          </Link>
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-100 dark:border-white/10">
             <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-xs">AM</div>
          </div>
        </div>
      </div>
    </header>
  );
};
