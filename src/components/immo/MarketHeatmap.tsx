'use client';

import React from 'react';
import { MapPin, Satellite, Layers, AlertCircle, TrendingUp } from 'lucide-react';

export const MarketHeatmap = () => {
  return (
    <div className="bg-white dark:bg-slate-900/80 backdrop-blur-3xl rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden group">
      <div className="relative z-10 flex flex-wrap justify-between items-end mb-8 md:mb-12 gap-6">
         <div>
            <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-secondary dark:text-white">Risk Heatmap v1.0</h3>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Couche : Risque de Retard par Zone</p>
         </div>
         <div className="flex gap-2">
            <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl hover:bg-primary/10 hover:text-primary transition-colors text-slate-500 dark:text-slate-400 group/btn">
               <Satellite className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            </button>
            <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-2xl hover:bg-primary/10 hover:text-primary transition-colors text-slate-500 dark:text-slate-400 group/btn">
               <Layers className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
            </button>
         </div>
      </div>

      {/* Simulated Map Container with Proper Aspect Ratio and Overflow */}
      <div className="w-full aspect-square md:aspect-[21/9] bg-slate-50 dark:bg-[#0a0f1c] rounded-[2.5rem] relative overflow-hidden flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-inner group/map">
         {/* Premium Grid Pattern Background */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 dark:opacity-[0.03] pointer-events-none" />
         
         <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
            {/* Fine tech grid */}
            <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
         </div>

         {/* Hot Zones (Responsive using percentages) */}
         <div className="absolute top-[20%] left-[30%] w-[30%] h-[40%] bg-rose-500/20 blur-[80px] animate-pulse rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
         <div className="absolute top-[40%] left-[50%] w-[40%] h-[50%] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
         <div className="absolute bottom-[20%] right-[20%] w-[25%] h-[35%] bg-rose-500/15 blur-[60px] animate-pulse rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

         {/* Map Interactive Content Container */}
         <div className="relative w-full h-full max-w-5xl md:max-w-none mx-auto p-4 md:p-12">
            
            {/* Interactive Pin 1 */}
            <div className="absolute top-[45%] left-[45%] md:top-[40%] md:left-[55%] flex flex-col items-center group/pin cursor-pointer transform hover:scale-110 transition-transform z-20">
               <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-2xl border border-slate-100 dark:border-white/10 text-[9px] md:text-[10px] font-black uppercase text-secondary dark:text-white mb-2 whitespace-nowrap opacity-90 group-hover/pin:opacity-100 group-hover/pin:-translate-y-1 transition-all">
                  Casablanca Finance City : <span className="text-emerald-500 italic">8.4/10</span>
               </div>
               <div className="relative">
                  <div className="absolute inset-0 bg-primary/30 blur-md rounded-full animate-ping" />
                  <MapPin className="relative w-8 h-8 md:w-10 md:h-10 text-primary drop-shadow-lg" />
               </div>
            </div>

            {/* Alert Widget Float */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20 w-[85%] md:w-auto max-w-sm">
               <div className="p-5 md:p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl text-secondary dark:text-white rounded-[2rem] border border-rose-500/30 shadow-2xl shadow-rose-500/10 hover:shadow-rose-500/20 transition-shadow">
                  <div className="flex items-center gap-3 text-[9px] md:text-[10px] font-black text-rose-500 border-b border-rose-500/20 pb-3 mb-3 uppercase tracking-widest">
                     <AlertCircle className="w-4 h-4 animate-pulse" /> ALERTE ZONE : BOUSKOURA
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="space-y-1">
                        <p className="text-xs md:text-sm italic font-bold leading-snug">Saturation des infrastructures d'accès routières.</p>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Impact sur 14 projets en cours</p>
                     </div>
                     <div className="shrink-0 text-center">
                        <div className="flex items-center text-rose-500"><TrendingUp className="w-3 h-3 mr-1" /> +3</div>
                        <div className="text-[8px] font-black uppercase tracking-wider text-slate-400">Mois (Est.)</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Legend & CTA */}
      <div className="mt-8 md:mt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
         <div className="flex flex-wrap gap-4 md:gap-8 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3"><div className="w-4 h-4 bg-emerald-500 rounded-full shadow-inner" /> <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Stable</span></div>
            <div className="flex items-center gap-3"><div className="w-4 h-4 bg-amber-500 rounded-full shadow-inner" /> <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Tension</span></div>
            <div className="flex items-center gap-3"><div className="w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.5)] animate-pulse" /> <span className="text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">Risque Critique</span></div>
         </div>
         <button className="px-8 py-4 bg-secondary dark:bg-white text-white dark:text-secondary rounded-full text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-colors shadow-lg flex items-center gap-2 group/btn">
            Générer Rapport Spatial <TrendingUp className="w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
         </button>
      </div>
    </div>
  );
};
