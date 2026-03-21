'use client';

import React from 'react';
import { Search, ChevronDown, Activity, ShieldCheck, TrendingUp } from 'lucide-react';
import { clsx } from 'clsx';

export const TitanicHero = () => {
  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden bg-white dark:bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      {/* Main Hook */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4">
           <Activity className="w-4 h-4 text-primary animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live : 142 Projets Audités au Maroc</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85] mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
           The Era of <br />
           <span className="text-primary translate-x-4 inline-block drop-shadow-xl">Verified</span> <br />
           Fortune.
        </h1>

        <p className="max-w-2xl mx-auto text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight italic mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
           Ne pariez plus sur votre avenir. Étudiez les preuves. <br />
           L'infrastructure souveraine de confiance immobilière.
        </p>

        {/* Search Command Center */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-4 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center animate-in fade-in zoom-in duration-1000 delay-500">
           <div className="flex-1 flex items-center gap-6 pl-8">
              <Search className="w-6 h-6 text-slate-400" />
              <input 
                type="text" 
                placeholder="Quel quartier, quel promoteur ?" 
                className="w-full bg-transparent border-none outline-none font-black text-xl uppercase italic text-secondary dark:text-white placeholder:text-slate-300"
              />
           </div>
           
           <div className="hidden md:flex h-12 w-px bg-slate-100 dark:bg-white/10" />

           <div className="flex-1 flex items-center justify-between px-8 text-left group cursor-pointer">
              <div>
                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Type d'Actif</div>
                 <div className="text-lg font-black uppercase italic text-secondary dark:text-white">Apartment Premium</div>
              </div>
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors" />
           </div>

           <button className="w-full md:w-auto px-12 py-6 bg-primary text-white rounded-[2.5rem] font-black text-[12px] uppercase tracking-widest shadow-luxury-primary hover:scale-105 transition-all">
              Lancer l'Audit &rarr;
           </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Anti-Fraud Engine 2.0</span>
           </div>
           <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Real-time Yield Analysis</span>
           </div>
        </div>
      </div>
    </div>
  );
};
