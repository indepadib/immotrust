import React from 'react';
import { UserCheck, Award, MessageSquare, ShieldCheck, Heart, Crown, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

export interface Expert {
  id: number | string;
  name: string;
  score: number;
  reviews: number;
  badge: string;
  avatar: string;
}

interface CommunityLeaderboardProps {
  experts?: Expert[];
}

const DEFAULT_EXPERTS: Expert[] = [
  { id: 1, name: 'Karim B.', score: 980, reviews: 45, badge: 'Auditeur Senior', avatar: 'KB' },
  { id: 2, name: 'Sarah L.', score: 850, reviews: 32, badge: 'Investisseur Expert', avatar: 'SL' },
  { id: 3, name: 'Omar T.', score: 720, reviews: 28, badge: 'Contributeur Vérifié', avatar: 'OT' },
];

export const CommunityLeaderboard = ({ experts = DEFAULT_EXPERTS }: CommunityLeaderboardProps) => {
  return (
    <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-[3.5rem] p-10 lg:p-14 border border-white/40 dark:border-white/10 shadow-luxury overflow-hidden relative group">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none transition-opacity duration-1000 opacity-50 group-hover:opacity-100" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-amber-500/20 to-transparent px-5 py-2.5 rounded-full border border-amber-500/30 shadow-inner overflow-hidden relative">
            <div className="absolute inset-0 bg-white/20 dark:bg-transparent backdrop-blur-sm -z-10" />
            <Crown className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary dark:text-white">Excellence Communautaire</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none drop-shadow-sm">
            Les Garants de <br /> <span className="text-secondary dark:text-white not-italic">La Vérité</span>.
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-sm">
            Notre algorithme de confiance s'appuie sur la validation par les pairs. Découvrez les experts les plus influents.
          </p>
        </div>
        
        <button className="flex items-center gap-3 px-8 py-5 rounded-full bg-secondary dark:bg-white text-white dark:text-secondary font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shrink-0 group/btn">
           Devenir Auditeur <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid gap-6 relative z-10">
        {experts.map((expert, i) => (
          <div key={expert.id} className={clsx(
            "group/card relative flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 p-6 lg:p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden cursor-pointer",
            i === 0 
              ? "bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1" 
              : "bg-slate-50/50 dark:bg-white/5 border-slate-100 dark:border-white/10 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
          )}>
             {/* Glow overlay for Top 1 */}
             {i === 0 && <div className="absolute inset-0 bg-gradient-to-r from-amber-200/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />}
             
             {/* Rank Number */}
             <div className={clsx(
                "hidden sm:flex text-6xl font-black italic select-none transition-colors duration-500",
                i === 0 ? "text-amber-500/20 group-hover/card:text-amber-500/40" : "text-slate-200 dark:text-white/5 group-hover/card:text-primary/20"
             )}>
                #{i+1}
             </div>

             <div className="flex items-center gap-6 flex-1 relative z-10">
                <div className={clsx(
                   "w-20 h-20 rounded-[1.5rem] flex items-center justify-center font-black text-2xl border-4 shadow-xl shrink-0 transition-transform duration-500 group-hover/card:scale-110",
                   i === 0 ? "bg-amber-500 text-white border-white dark:border-slate-800 shadow-amber-500/40" : "bg-primary/10 text-primary border-white dark:border-slate-800 shadow-primary/20"
                )}>
                   {expert.avatar}
                </div>
                
                <div className="space-y-4">
                   <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-xl md:text-2xl font-black text-secondary dark:text-white uppercase italic leading-none">{expert.name}</h4>
                      <div className={clsx(
                         "px-4 py-1.5 rounded-full border text-[8px] font-black uppercase tracking-widest flex items-center gap-2",
                         i === 0 ? "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400" : "bg-white dark:bg-slate-800 border-slate-100 dark:border-white/10 text-slate-500"
                      )}>
                         {i === 0 ? <Crown className="w-3 h-3" /> : <ShieldCheck className="w-3 h-3 text-primary" />}
                         {expert.badge}
                      </div>
                   </div>
                   
                   <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                         <MessageSquare className="w-4 h-4 text-slate-400" /> 
                         <span className="text-secondary dark:text-white">{expert.reviews}</span> Avis Certifiés
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-white/10 hidden sm:block" />
                      <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                         <Heart className={clsx("w-4 h-4", i === 0 ? "text-rose-500 animate-pulse" : "text-rose-500")} /> 
                         <span className={clsx("italic", i === 0 ? "text-amber-600 dark:text-amber-400" : "text-secondary dark:text-white")}>{expert.score}</span> Karma Points
                      </div>
                   </div>
                </div>
             </div>
             
             {/* Action Icon on Hover */}
             <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover/card:opacity-100 transform translate-x-4 group-hover/card:translate-x-0 transition-all duration-300 hidden md:block">
                <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-white/10 flex items-center justify-center">
                   <ArrowRight className="w-5 h-5 text-primary" />
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
