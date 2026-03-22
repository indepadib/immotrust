import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Calendar, Star, Building2, TrendingUp, Heart } from 'lucide-react';
import { Developer } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="group bg-secondary dark:bg-slate-900 rounded-[3rem] p-10 text-white border border-white/5 hover:border-primary/30 transition-all shadow-luxury relative overflow-hidden">
      <div className="relative z-10 space-y-8">
        <div className="flex items-start justify-between">
           <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-lg flex items-center justify-center border border-white/10 group-hover:border-primary transition-colors">
                 {developer.avatar ? (
                   <img src={developer.avatar} alt={developer.name} className="w-full h-full object-cover rounded-2xl" />
                 ) : (
                   <Building2 className="w-10 h-10 text-primary" />
                 )}
              </div>
              <div className="space-y-2">
                 <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">
                    {developer.name}
                 </h3>
                 <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                       <ShieldCheck className="w-4 h-4 text-primary" />
                       <span className="text-[9px] font-black text-primary uppercase tracking-widest">Certifié ImmoTrust</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{developer.segment}</span>
                 </div>
              </div>
           </div>
           <ScoreBadge score={developer.scores.reputation} size="md" />
        </div>

        <div className="grid grid-cols-3 gap-6 py-8 border-y border-white/5">
           <div className="space-y-1">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Livraisons</div>
              <div className="text-lg font-black italic">{developer.stats.unitsDelivered.toLocaleString()} <span className="text-[10px] not-italic opacity-40">Unités</span></div>
           </div>
           <div className="space-y-1 text-center">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Retard Moyen</div>
              <div className="text-lg font-black italic text-primary">{developer.stats.avgDelayMonths} <span className="text-[10px] not-italic opacity-40">Mois</span></div>
           </div>
           <div className="space-y-1 text-right">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Avis Certifiés</div>
              <div className="text-lg font-black italic">{developer.stats.ratingCount}</div>
           </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
           {[['Qualité', developer.scores.quality], ['SAV', developer.scores.sav], ['Finitions', developer.scores.quality]].map(([label, score]: any) => (
             <div key={label} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                <div className="flex justify-between items-center">
                   <span className="text-[7px] font-black uppercase tracking-widest text-slate-500">{label}</span>
                   <span className="text-[10px] font-black text-primary italic">{score}/10</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-primary" style={{ width: `${score * 10}%` }} />
                </div>
             </div>
           ))}
        </div>

        <Link href={`/immo/developers`} className="w-full py-5 bg-white text-secondary rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all shadow-2xl flex items-center justify-center">
           Consulter le Track Record
        </Link>
      </div>
      
      <Building2 className="absolute -bottom-16 -right-16 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
    </div>
  );
};
