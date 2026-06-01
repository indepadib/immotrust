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
    <div className="group relative bg-white rounded-[2rem] p-8 border border-slate-100 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden flex flex-col">
      <div className="relative z-10 flex flex-col h-full space-y-8">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4">
           <div className="flex items-center gap-4">
              <div className="w-16 h-16 shrink-0 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 text-primary">
                 <Building2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-secondary uppercase tracking-tight group-hover:text-primary transition-colors">
                    {developer.name}
                 </h3>
                 <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">{developer.segment}</span>
                 </div>
              </div>
           </div>
           <div className="shrink-0 group-hover:scale-105 transition-transform">
              <ScoreBadge score={developer.scores.reputation} size="md" />
           </div>
        </div>

        {/* Global Track Record */}
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-slate-100">
           <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Livraisons</div>
              <div className="text-xl font-black text-secondary">{developer.stats.unitsDelivered.toLocaleString()}</div>
           </div>
           <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Retard Moyen</div>
              <div className="text-xl font-black text-orange-600">{developer.stats.avgDelayMonths} mois</div>
           </div>
           <div className="text-center">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Avis Clients</div>
              <div className="text-xl font-black text-emerald-600">{developer.stats.ratingCount}</div>
           </div>
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 grow">
           {[
              { label: 'QualitÃ©', score: developer.scores.quality, color: 'bg-emerald-500' }, 
              { label: 'DÃ©lais', score: developer.scores.delays, color: 'bg-blue-500' }, 
              { label: 'SAV', score: developer.scores.sav, color: 'bg-orange-500' }
            ].map((metric) => (
             <div key={metric.label} className="p-4 bg-slate-50 rounded-2xl space-y-2">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{metric.label}</span>
                   <span className="text-[12px] font-black text-secondary">
                      {metric.score}<span className="text-[10px] text-slate-400">/10</span>
                   </span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                   <div 
                      className={h-full  + metric.color +  rounded-full} 
                      style={{ width: metric.score * 10 + "%" }} 
                   />
                </div>
             </div>
           ))}
        </div>

        {/* Action Button */}
        <Link href={"/immo/developers/" + developer.id} className="mt-4 w-full py-4 bg-slate-50 text-secondary rounded-xl font-bold text-sm text-center hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2 group/btn">
           Voir tous les avis <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};