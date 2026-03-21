import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface MarketTrendData {
  neighborhood: string;
  avgSqmPrice: number;
  evolution: number;
  demand: 'high' | 'medium' | 'low';
}

const MOCK_TRENDS: MarketTrendData[] = [
  { neighborhood: 'CFC', avgSqmPrice: 21500, evolution: +4.2, demand: 'high' },
  { neighborhood: 'Anfa', avgSqmPrice: 28000, evolution: +1.5, demand: 'high' },
  { neighborhood: 'Oasis', avgSqmPrice: 17500, evolution: -0.8, demand: 'medium' },
];

export const MarketTrends = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {MOCK_TRENDS.map((trend) => (
        <div key={trend.neighborhood} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 shadow-luxury-soft group hover:border-primary/20 transition-all">
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-1">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Zone Immobilière</h4>
              <div className="text-xl font-black text-secondary dark:text-white uppercase italic">{trend.neighborhood}</div>
            </div>
            <div className={`p-2 rounded-xl ${trend.evolution >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
               <Activity className="w-5 h-5" />
            </div>
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-end">
                <div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Prix m Moyen</div>
                   <div className="text-2xl font-black text-secondary dark:text-white italic">{trend.avgSqmPrice.toLocaleString()} <span className="text-[10px] not-italic opacity-40">MAD</span></div>
                </div>
                <div className={`flex items-center gap-1 text-[10px] font-black italic ${trend.evolution >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                   {trend.evolution >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                   {Math.abs(trend.evolution)}%
                </div>
             </div>

             <div className="pt-4 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Tension Demande</span>
                <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => (
                     <div key={i} className={`w-3 h-1 rounded-full ${i <= (trend.demand === 'high' ? 5 : 3) ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'}`} />
                   ))}
                </div>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
};
