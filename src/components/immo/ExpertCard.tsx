'use client';

import React from 'react';
import { UserCheck, Shield, MessageSquare, Calendar, Star } from 'lucide-react';

interface ExpertCardProps {
  expert: {
    name: string;
    specialty: string;
    reviewsCount: number;
    karma: number;
    avatar?: string;
  };
}

export const ExpertCard = ({ expert }: ExpertCardProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-2xl group">
      <div className="flex items-center gap-6 mb-8">
         <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-3xl relative overflow-hidden flex items-center justify-center border border-slate-200 dark:border-white/10">
            <UserCheck className="w-10 h-10 text-primary opacity-20" />
         </div>
         <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
               <h4 className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tight">{expert.name}</h4>
               <Shield className="w-4 h-4 text-primary fill-primary/10" />
            </div>
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">{expert.specialty}</p>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
         <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase mb-1">
               <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> Reputation
            </div>
            <div className="text-lg font-black italic">{expert.karma} <span className="text-[10px] opacity-40">KPS</span></div>
         </div>
         <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <div className="flex items-center gap-1 text-[8px] font-black text-slate-400 uppercase mb-1">
               <MessageSquare className="w-3 h-3 text-primary" /> Audits
            </div>
            <div className="text-lg font-black italic">{expert.reviewsCount}</div>
         </div>
      </div>

      <button className="w-full py-5 bg-secondary text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest shadow-xl group-hover:bg-primary transition-all flex items-center justify-center gap-3">
         <Calendar className="w-4 h-4" /> Réserver Deep-Dive Audit
      </button>
    </div>
  );
};
