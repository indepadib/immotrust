import React from 'react';
import { UserCheck, Award, MessageSquare, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

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
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-white/5 shadow-luxury">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 bg-amber-500/10 px-4 py-2 rounded-2xl">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-500">Excellence Communautaire</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none">
            Les Garants de <br /> <span className="text-primary not-italic">La Vérité</span>
          </h2>
        </div>
      </div>

      <div className="grid gap-6">
        {experts.map((expert, i) => (
          <div key={expert.id} className="group relative flex items-center gap-8 p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-transparent hover:border-primary/20 transition-all overflow-hidden">
             <div className="text-4xl font-black text-slate-200 dark:text-white/5 italic select-none">#{i+1}</div>
             <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-black text-xl border-2 border-white dark:border-slate-800 shadow-lg">{expert.avatar}</div>
             <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                   <h4 className="text-lg font-black text-secondary dark:text-white uppercase italic leading-none">{expert.name}</h4>
                   <div className="px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-white/10 text-[8px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3 text-primary" />
                      {expert.badge}
                   </div>
                </div>
                <div className="flex items-center gap-6">
                   <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <MessageSquare className="w-3 h-3" /> {expert.reviews} Avis Certifiés
                   </div>
                   <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      <Heart className="w-3 h-3 text-rose-500" /> {expert.score} Karma
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
