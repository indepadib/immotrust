import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Building2, ExternalLink, ChevronRight, BarChart3 } from 'lucide-react';
import { Developer } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-10 border border-slate-100 dark:border-white/5 hover:border-primary/30 transition-all duration-700 shadow-luxury-soft hover:shadow-luxury overflow-hidden">
      {/* Dynamic Hover Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full space-y-8">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
           <div className="flex items-center gap-5">
              <div className="w-20 h-20 shrink-0 rounded-[1.5rem] bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover:border-primary/50 group-hover:scale-105 transition-all duration-500 overflow-hidden shadow-inner">
                 {developer.avatar ? (
                   <img src={developer.avatar} alt={developer.name} className="w-full h-full object-cover" />
                 ) : (
                   <Building2 className="w-8 h-8 text-primary/50 group-hover:text-primary transition-colors" />
                 )}
              </div>
              <div className="space-y-3">
                 <h3 className="text-2xl md:text-3xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors duration-300">
                    {developer.name}
                 </h3>
                 <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                       <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                       <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Audit Avis Promoteur</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-full">{developer.segment}</span>
                 </div>
              </div>
           </div>
           <div className="shrink-0 group-hover:-translate-y-1 transition-transform duration-500">
              <ScoreBadge score={developer.scores.reputation} size="md" />
           </div>
        </div>

        {/* Global Track Record */}
        <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-100 dark:border-white/5 relative">
           <div className="absolute inset-y-0 left-1/3 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-white/10 to-transparent" />
           <div className="absolute inset-y-0 left-2/3 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-white/10 to-transparent" />
           
           <div className="space-y-1 text-center group-hover:translate-y-[-2px] transition-transform duration-300 delay-75">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Volume Livré</div>
              <div className="text-xl md:text-2xl font-black text-secondary dark:text-white italic">{developer.stats.unitsDelivered.toLocaleString()} <span className="text-[9px] not-italic text-slate-300 font-bold uppercase tracking-wider">Unités</span></div>
           </div>
           <div className="space-y-1 text-center group-hover:translate-y-[-2px] transition-transform duration-300 delay-100">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Retard Constaté</div>
              <div className="text-xl md:text-2xl font-black italic text-rose-500">{developer.stats.avgDelayMonths} <span className="text-[9px] not-italic font-bold uppercase tracking-wider opacity-60">Mois</span></div>
           </div>
           <div className="space-y-1 text-center group-hover:translate-y-[-2px] transition-transform duration-300 delay-150">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">Avis Clients</div>
              <div className="text-xl md:text-2xl font-black text-emerald-500 italic">{developer.stats.ratingCount}</div>
           </div>
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 grow">
           {[
              { label: 'Qualité Globale', score: developer.scores.quality, color: 'bg-primary' }, 
              { label: 'Respect Engagements', score: developer.scores.sav, color: 'bg-emerald-500' }, 
              { label: 'Fiabilité Finitions', score: developer.scores.quality, color: 'bg-blue-500' }
            ].map((metric) => (
             <div key={metric.label} className="p-5 bg-slate-50 dark:bg-white/5 rounded-[1.5rem] border border-slate-100 dark:border-white/5 space-y-3 group/metric hover:border-slate-200 dark:hover:border-white/20 transition-colors">
                <div className="flex justify-between items-center">
                   <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">{metric.label}</span>
                   <span className="text-[11px] font-black text-secondary dark:text-white italic flex items-center gap-1">
                      {metric.score}<span className="text-[9px] not-italic text-slate-400">/10</span>
                   </span>
                </div>
                <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                   <div 
                      className={`h-full ${metric.color} rounded-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 delay-200`} 
                      style={{ width: `${metric.score * 10}%`, transform: 'scaleX(1)' }} 
                   />
                </div>
             </div>
           ))}
        </div>

        {/* Action Button */}
        <Link href={`/immo/developers/${developer.id}`} className="mt-4 w-full py-6 bg-slate-100 dark:bg-slate-800 text-secondary dark:text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-3 group/btn">
           Ouvrir le Dossier d'Audit <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      {/* Decorative Icon Background */}
      <BarChart3 className="absolute -bottom-16 -right-16 w-64 h-64 text-slate-50 dark:text-white/5 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-1000 pointer-events-none" />
    </div>
  );
};
