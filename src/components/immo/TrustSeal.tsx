'use client';

import React from 'react';
import { ShieldCheck, Award, ExternalLink } from 'lucide-react';

interface TrustSealProps {
  score: number;
  developerName: string;
  verifiedDate: string;
}

export const TrustSeal = ({ score, developerName, verifiedDate }: TrustSealProps) => {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-amber-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
      <div className="relative flex items-center gap-6 bg-white dark:bg-slate-900 px-8 py-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft">
         <div className="p-4 bg-primary/10 rounded-2xl text-primary">
            <ShieldCheck className="w-8 h-8" />
         </div>
         <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest">SÉCURISÉ PAR IMMOTRUST</span>
               <Award className="w-3 h-3 text-amber-500" />
            </div>
            <h4 className="text-lg font-black text-secondary dark:text-white uppercase italic tracking-tight">{developerName}</h4>
            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">VÉRIFIÉ LE {verifiedDate}</p>
         </div>
         <div className="text-right border-l border-slate-50 dark:border-white/5 pl-8">
            <div className="text-3xl font-black italic text-primary leading-none">{score}</div>
            <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">TRUST INDEX</div>
         </div>
         <div className="absolute top-4 right-4 text-slate-200 dark:text-white/10 group-hover:text-primary transition-colors">
            <ExternalLink className="w-4 h-4" />
         </div>
      </div>
    </div>
  );
};
