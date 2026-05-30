'use client';

import React from 'react';
import { Check, X, Scale, Maximize2, TrendingUp, Info } from 'lucide-react';
import { Unit } from '@/types/immo';

interface UnitComparisonProps {
  units: Unit[];
}

export const UnitComparison = ({ units }: UnitComparisonProps) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-white/5 shadow-2xl overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="pb-10 pt-4 px-6 border-b border-slate-50 dark:border-white/5">
               <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Scale className="w-4 h-4" /> Comparaison Unitaire
               </div>
            </th>
            {units.map(unit => (
              <th key={unit.id} className="pb-10 pt-4 px-6 border-b border-slate-50 dark:border-white/5">
                 <div className="text-xl font-black text-secondary dark:text-white uppercase italic">Unité {unit.id}</div>
                 <div className="text-[9px] font-bold text-primary uppercase tracking-widest">{unit.type} • Étage {unit.floor}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[
            { label: 'Surface Totale', key: 'surface', suffix: ' m²' },
            { label: 'Orientation', key: 'orientation' },
            { label: 'Prix d\'Affichage', key: 'price', format: (v: number) => v.toLocaleString() + ' DH' },
            { label: 'Rendement Estimé', key: 'yield', format: (v: number) => v + '%' },
          ].map((row, idx) => (
            <tr key={row.label} className={idx % 2 === 0 ? 'bg-slate-50/50 dark:bg-white/5' : ''}>
               <td className="py-6 px-6 text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest">{row.label}</td>
               {units.map(unit => (
                 <td key={unit.id} className="py-6 px-6 text-sm font-bold text-slate-600 dark:text-slate-300 italic">
                    {row.format ? row.format((unit as any)[row.key]) : (unit as any)[row.key] + (row.suffix || '')}
                 </td>
               ))}
            </tr>
          ))}
          <tr>
             <td className="py-10 px-6 border-t border-slate-50 dark:border-white/5">
                <div className="flex flex-col gap-1">
                   <span className="text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest italic">Analyse Noyau</span>
                   <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">IA RECOMENDATION</span>
                </div>
             </td>
             {units.map(unit => (
               <td key={unit.id} className="py-10 px-6 border-t border-slate-50 dark:border-white/5">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${unit.yield >= 7 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                     {unit.yield >= 7 ? 'Actif Prioritaire' : 'Prudence Marché'}
                     <TrendingUp className="w-4 h-4" />
                  </div>
               </td>
             ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
