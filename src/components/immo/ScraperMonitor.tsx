'use client';

import React from 'react';
import { Activity, Database, CheckCircle, AlertCircle, RefreshCcw, Search } from 'lucide-react';
import { clsx } from 'clsx';

interface ScraperStatus {
  source: string;
  status: 'active' | 'idle' | 'error';
  lastRun: string;
  itemsScraped: number;
  successRate: number;
}

const MOCK_SCRAPERS: ScraperStatus[] = [
  { source: 'Mubawab', status: 'active', lastRun: '2 min ago', itemsScraped: 1240, successRate: 98.4 },
  { source: 'Sarouty', status: 'idle', lastRun: '15 min ago', itemsScraped: 856, successRate: 99.1 },
  { source: 'Avito', status: 'error', lastRun: '1 hour ago', itemsScraped: 0, successRate: 0 },
];

export const ScraperMonitor = () => {
  return (
    <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden group">
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div>
          <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-2 flex items-center gap-3 italic">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            Live Scraper Intelligence
          </h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider italic">Surveillance des flux de données en temps réel</p>
        </div>
        <div className="bg-primary/20 p-2.5 rounded-2xl">
           <RefreshCcw className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="space-y-6 relative z-10">
        {MOCK_SCRAPERS.map((s, idx) => (
          <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex items-center justify-between gap-6 group/item">
             <div className="flex items-center gap-5">
                <div className={clsx(
                  "p-3 rounded-xl border flex items-center justify-center",
                  s.status === 'active' ? "bg-primary/10 border-primary/20 text-primary" :
                  s.status === 'idle' ? "bg-slate-800 border-white/5 text-slate-400" :
                  "bg-rose-500/10 border-rose-500/20 text-rose-500"
                )}>
                   <Database className="w-5 h-5" />
                </div>
                <div>
                   <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{s.source}</h4>
                   <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em] mt-1 italic">Last sync: {s.lastRun}</p>
                </div>
             </div>

             <div className="flex items-center gap-8">
                <div className="text-right hidden sm:block">
                   <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Normalized</div>
                   <div className="text-xs font-black text-white uppercase">{s.itemsScraped} items</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex items-center gap-4">
                   <div className="text-right">
                      <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Health</div>
                      <div className={clsx(
                        "text-xs font-black italic",
                        s.successRate > 90 ? "text-emerald-500" : "text-rose-500"
                      )}>{s.successRate}%</div>
                   </div>
                   <div className={clsx(
                     "w-2 h-2 rounded-full",
                     s.status === 'active' ? "bg-primary animate-pulse" :
                     s.status === 'idle' ? "bg-slate-600" :
                     "bg-rose-500"
                   )} />
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
         <div className="flex items-center gap-3">
            <Search className="w-4 h-4 text-slate-600" />
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.3em] font-sans">98.2% Total Data Confidence</span>
         </div>
         <button className="text-[8px] font-black text-primary uppercase tracking-widest hover:underline italic">
            Détails des logs
         </button>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
    </div>
  );
};
