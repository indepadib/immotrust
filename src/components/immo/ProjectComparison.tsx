import React from 'react';
import { MapPin, TrendingUp, Shield, Building2, CheckCircle2 } from 'lucide-react';
import { Project } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';

interface ProjectComparisonProps {
  projects: Project[];
}

export const ProjectComparison = ({ projects }: ProjectComparisonProps) => {
  return (
    <div className="overflow-x-auto pb-12 w-full">
      <div className="min-w-[900px] bg-white/70 dark:bg-slate-900/70 backdrop-blur-3xl rounded-[3rem] border border-white/20 dark:border-white/5 shadow-luxury relative overflow-hidden">
        
        {/* Decorative Gradients */}
        <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

        <table className="w-full border-collapse relative z-10">
          <thead>
            <tr>
              <th className="p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-[20%] border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
                Points de contrôle
              </th>
              {projects.map((proj, idx) => (
                <th key={proj.id} className="p-8 text-center w-[26%] border-b border-slate-100 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md relative group">
                  {idx === 0 && (
                     <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        Favori
                     </div>
                  )}
                  <div className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tighter mb-4 group-hover:text-primary transition-colors">
                     {proj.name}
                  </div>
                  <div className="flex justify-center">
                     <ScoreBadge score={proj.audit.trustScore} size="md" />
                  </div>
                </th>
              ))}
              <th className="p-8 text-center border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50"></th>
            </tr>
          </thead>
          <tbody className="text-xs font-bold">
            <tr className="border-b border-slate-50 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
              <td className="p-8 text-slate-500 uppercase tracking-widest text-[9px]">
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-primary" /> Sectorisation</div>
              </td>
              {projects.map(proj => (
                <td key={proj.id} className="p-8 text-center text-secondary dark:text-white">
                  <div className="font-black uppercase tracking-wider">{proj.district}</div>
                  <div className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">{proj.city}</div>
                </td>
              ))}
              <td className="p-8 transition-colors"></td>
            </tr>
            <tr className="border-b border-slate-50 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
              <td className="p-8 text-slate-500 uppercase tracking-widest text-[9px]">
                <div className="flex items-center gap-3"><TrendingUp className="w-4 h-4 text-primary" /> Prix Marché m²</div>
              </td>
              {projects.map((proj, idx) => (
                <td key={proj.id} className="p-8 text-center">
                  <div className={`text-lg font-black italic ${idx === 0 ? 'text-primary' : 'text-secondary dark:text-white'}`}>
                    {proj.prices.avgSqm?.toLocaleString()} <span className="text-[10px] not-italic text-slate-400">MAD</span>
                  </div>
                </td>
              ))}
              <td className="p-8 transition-colors"></td>
            </tr>
            <tr className="border-b border-slate-50 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
              <td className="p-8 text-slate-500 uppercase tracking-widest text-[9px]">
                <div className="flex items-center gap-3"><Shield className="w-4 h-4 text-primary" /> Data Compliance</div>
              </td>
              {projects.map(proj => (
                <td key={proj.id} className="p-8">
                  <div className="flex justify-center">
                     <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-2xl border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{proj.dataConfidenceLevel || 100}% Fiable</span>
                     </div>
                  </div>
                </td>
              ))}
              <td className="p-8 transition-colors"></td>
            </tr>
            <tr className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
              <td className="p-8 text-slate-500 uppercase tracking-widest text-[9px]">
                <div className="flex items-center gap-3"><Building2 className="w-4 h-4 text-primary" /> Phasage</div>
              </td>
              {projects.map((proj, idx) => (
                <td key={proj.id} className="p-8 text-center">
                  <div className={`inline-flex items-center gap-2 text-[10px] font-black uppercase italic tracking-widest ${proj.status === 'construction' ? 'text-amber-500' : 'text-emerald-500'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${proj.status === 'construction' ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                    {proj.status === 'construction' ? 'En Cours' : 'Livré'}
                  </div>
                </td>
              ))}
              <td className="p-8 transition-colors"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
