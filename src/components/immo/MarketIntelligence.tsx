import React from 'react';
import { TrendingUp, Activity, PieChart, ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/immo';

interface MarketIntelligenceProps {
  project: Project;
}

export const MarketIntelligence = ({ project }: MarketIntelligenceProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 shadow-luxury-soft">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-emerald-500/10 p-2 rounded-xl">
            <TrendingUp className="w-5 h-5 text-emerald-500" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary dark:text-white">Rendement Locatif</span>
        </div>
        <div className="space-y-2 mb-6">
           <div className="text-4xl font-black text-secondary dark:text-white italic">5.8% <span className="text-xs text-slate-400 not-italic uppercase tracking-widest font-bold">Est. Brut</span></div>
           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Zone  forte tension locative (Anfa/CFC)</div>
        </div>
        <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
           <div className="h-full bg-emerald-500" style={{ width: '75%' }} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 shadow-luxury-soft">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-primary/10 p-2 rounded-xl">
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-secondary dark:text-white">Tension March</span>
        </div>
        <div className="space-y-2 mb-6">
           <div className="text-4xl font-black text-secondary dark:text-white italic">9.2/10</div>
           <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Demande supérieure à l'offre de {project.projectType}</div>
        </div>
        <div className="flex gap-1">
           {[1,2,3,4,5,6,7,8,9,10].map(i => (
             <div key={i} className={`flex-1 h-3 rounded-sm ${i <= 9 ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'}`} />
           ))}
        </div>
      </div>

      <div className="bg-secondary text-white rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-white/10 p-2 rounded-xl">
              <PieChart className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Indice de Liquidit</span>
          </div>
          <div className="text-4xl font-black text-white italic mb-4">LEV</div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6 leading-relaxed">
            Revente estime en moins de 3 mois pour cette typologie dans ce quartier.
          </p>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-all">
             Voir l'audit quartier <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        <PieChart className="absolute -bottom-8 -right-8 w-32 h-32 text-white/5" />
      </div>
    </div>
  );
};
