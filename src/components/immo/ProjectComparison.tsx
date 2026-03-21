import React from 'react';
import { MapPin, TrendingUp, Shield, Building2 } from 'lucide-react';
import { Project } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';

interface ProjectComparisonProps {
  projects: Project[];
}

export const ProjectComparison = ({ projects }: ProjectComparisonProps) => {
  return (
    <div className="overflow-x-auto pb-8">
      <div className="min-w-[800px] bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-50 dark:border-white/5">
              <th className="p-8 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-1/4">Critres</th>
              {projects.map(proj => (
                <th key={proj.id} className="p-8 text-center w-1/4">
                  <div className="text-sm font-black text-secondary dark:text-white uppercase italic mb-2">{proj.name}</div>
                  <ScoreBadge score={proj.scores.global} size="sm" />
                </th>
              ))}
              <th className="p-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-300">Slot vide</th>
            </tr>
          </thead>
          <tbody className="text-[10px] font-black uppercase tracking-widest">
            <tr className="border-b border-slate-50 dark:border-white/5">
              <td className="p-8 text-slate-400"><div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> Emplacement</div></td>
              {projects.map(proj => (
                <td key={proj.id} className="p-8 text-center text-secondary dark:text-white">
                  {proj.location?.neighborhood}
                   <div className="text-primary mt-1">{proj.scores.location}/10</div>
                </td>
              ))}
              <td className="p-8 text-center text-slate-100"></td>
            </tr>
            <tr className="border-b border-slate-50 dark:border-white/5">
              <td className="p-8 text-slate-400"><div className="flex items-center gap-3"><TrendingUp className="w-4 h-4" /> Prix m Obs.</div></td>
              {projects.map(proj => (
                <td key={proj.id} className="p-8 text-center font-black text-secondary dark:text-white">
                  {proj.prices.sqmObserved?.toLocaleString()} MAD
                </td>
              ))}
              <td className="p-8 text-center text-slate-100"></td>
            </tr>
            <tr className="border-b border-slate-50 dark:border-white/5">
              <td className="p-8 text-slate-400"><div className="flex items-center gap-3"><Shield className="w-4 h-4" /> Niveau Confiance</div></td>
              {projects.map(proj => (
                <td key={proj.id} className="p-8 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full">
                     {proj.dataConfidenceLevel}%
                  </div>
                </td>
              ))}
              <td className="p-8 text-center text-slate-100"></td>
            </tr>
            <tr>
              <td className="p-8 text-slate-400"><div className="flex items-center gap-3"><Building2 className="w-4 h-4" /> Statut</div></td>
              {projects.map(proj => (
                <td key={proj.id} className="p-8 text-center text-emerald-500 italic">
                  {proj.status.toUpperCase()}
                </td>
              ))}
              <td className="p-8 text-center text-slate-100"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
