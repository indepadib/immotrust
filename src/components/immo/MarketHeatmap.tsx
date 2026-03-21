'use client';

import React from 'react';
import { MapPin, Satellite, Layers, AlertCircle } from 'lucide-react';

export const MarketHeatmap = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
      <div className="relative z-10 flex justify-between items-end mb-12">
         <div>
            <h3 className="text-2xl font-black uppercase italic tracking-tight text-secondary dark:text-white">Risk Heatmap v1.0</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Couche : Risque de Retard par Zone</p>
         </div>
         <div className="flex gap-2">
            <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl hover:text-primary transition-colors"><Satellite className="w-5 h-5" /></button>
            <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl hover:text-primary transition-colors"><Layers className="w-5 h-5" /></button>
         </div>
      </div>

      {/* Simulated Map Background */}
      <div className="aspect-[21/9] bg-slate-100 dark:bg-white/5 rounded-[2rem] relative overflow-hidden flex items-center justify-center border border-slate-200 dark:border-white/10">
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            {/* Grid pattern mock */}
            <div className="grid grid-cols-12 grid-rows-6 w-full h-full border border-slate-300 dark:border-white/10" />
         </div>

         {/* Hot Zones */}
         <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-rose-500/20 blur-3xl animate-pulse" />
         <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-emerald-500/10 blur-3xl" />
         <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-rose-500/15 blur-3xl animate-pulse" />

         {/* Pins */}
         <div className="relative flex flex-col items-center group/pin cursor-pointer translate-y-[-10px]">
            <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-white/10 text-[8px] font-black uppercase mb-1">CFC : 8.4/10</div>
            <MapPin className="w-6 h-6 text-primary fill-primary" />
         </div>

         <div className="absolute top-10 left-20">
            <div className="p-4 bg-secondary dark:bg-slate-900 text-white rounded-2xl border border-white/10 shadow-2xl scale-75">
               <div className="flex items-center gap-2 text-[8px] font-black text-rose-500 border-b border-white/10 pb-2 mb-2">
                  <AlertCircle className="w-3 h-3" /> ALERTE ZONE : BOUSKOURA
               </div>
               <p className="text-[10px] italic font-bold">Saturation des infrastructures.</p>
            </div>
         </div>
      </div>

      <div className="mt-8 flex justify-between items-center">
         <div className="flex gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-full" /> <span className="text-[8px] font-black uppercase text-slate-400">Stable</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full" /> <span className="text-[8px] font-black uppercase text-slate-400">Caution</span></div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" /> <span className="text-[8px] font-black uppercase text-slate-400">Critical Delay Risk</span></div>
         </div>
         <button className="text-[9px] font-black text-primary uppercase tracking-[0.2em] border-b border-primary/30 pb-1">Analyse Temporelle Profonde &rarr;</button>
      </div>
    </div>
  );
};
