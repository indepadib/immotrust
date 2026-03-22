'use client';

import React from 'react';
import { Project } from '../../types/immo';
import { Shield, TrendingDown, Clock, Scale, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { ScoreBadge } from './ScoreBadge';

interface ComparisonEngineProps {
  projects: Project[];
}

export const ComparisonEngine = ({ projects }: ComparisonEngineProps) => {
  if (projects.length < 2) return null;

  const compareMetric = (p1: number, p2: number, invert = false) => {
    if (p1 === p2) return null;
    return (invert ? p1 < p2 : p1 > p2) ? 'win' : 'lose';
  };

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden relative group">
       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
       
       <div className="flex items-center justify-between mb-12 relative z-10">
          <div>
             <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] font-sans mb-2 flex items-center gap-3 italic">
                <Scale className="w-5 h-5 text-primary" />
                Comparison Engine Sovereign
             </h3>
             <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Arbitrage algorithmique entre projets certifiés</p>
          </div>
          <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10">
             <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{projects.length} Projets Actifs</span>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {projects.map((p, idx) => (
             <div key={p.id} className="space-y-8 p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:border-primary/30 transition-all relative overflow-hidden group/card">
                {/* Advantage Badge */}
                <div className="absolute -top-1 -right-1">
                   <div className="bg-primary text-secondary text-[8px] font-black uppercase px-6 py-2 rounded-bl-3xl shadow-lg transform rotate-2">
                      Souveraineté Rank #{idx + 1}
                   </div>
                </div>                 <div className="flex items-start justify-between">
                    <div className="space-y-2">
                       <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{p.name}</h4>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          <Shield className={clsx("w-3 h-3", p.audit.trustScore > 8 ? "text-emerald-500" : "text-amber-500")} />
                          {p.developerId}
                       </div>
                    </div>
                    <ScoreBadge score={p.audit.trustScore} size="lg" />
                 </div>

                 <div className="space-y-6">
                    {/* Metrics */}
                    <div className={clsx(
                      "p-6 rounded-2xl border transition-all",
                      compareMetric(p.prices.avgSqm, projects[1-idx].prices.avgSqm, true) === 'win' 
                        ? "bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                        : "bg-white/5 border-white/10"
                    )}>
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Prix au m²</span>
                          {compareMetric(p.prices.avgSqm, projects[1-idx].prices.avgSqm, true) === 'win' && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                       </div>
                       <div className="text-2xl font-black text-white italic">{p.prices.avgSqm.toLocaleString()} DH</div>
                    </div>

                    <div className={clsx(
                      "p-6 rounded-2xl border transition-all",
                      (p.predictedDelayMonths || 0) < 3 ? "bg-emerald-500/10 border-emerald-500/20" : "bg-amber-500/10 border-amber-500/20"
                    )}>
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Risque Délai</span>
                          <Clock className="w-4 h-4 text-primary" />
                       </div>
                       <div className="text-xl font-black text-white uppercase italic tracking-widest">
                          {(p.predictedDelayMonths || 0) < 3 ? 'Faible' : 'Modéré'}
                       </div>
                    </div>

                    {/* Audit Points */}
                    <div className="space-y-4 pt-4">
                       <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]"> 
                             <CheckCircle2 className="w-4 h-4 text-primary" /> Titre Foncier Vérifié
                          </div>
                          <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]"> 
                             <CheckCircle2 className="w-4 h-4 text-primary" /> Garantie Décennale
                          </div>
                          <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]"> 
                             {(p.predictedDelayMonths || 0) > 0 ? (
                               <><AlertTriangle className="w-4 h-4 text-amber-500" /> Retard Estimé: {p.predictedDelayMonths} mois</>
                             ) : (
                               <><CheckCircle2 className="w-4 h-4 text-primary" /> Livraison On-Time Prévue</>
                             )}
                          </div>
                       </div>
                    </div>
                 </div>

                 <button className="w-full mt-6 py-5 bg-white text-secondary hover:bg-primary hover:text-secondary rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all group-hover:shadow-luxury">
                    Voir Rapport Full Audit <ArrowRight className="inline-block ml-2 w-4 h-4" />
                 </button>
              </div>
           ))}
        </div>

        {/* Comparison Summary */}
        <div className="mt-12 p-8 bg-primary/5 border border-primary/20 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
           <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-[1.5rem] bg-primary flex items-center justify-center shadow-xl">
                 <Shield className="w-8 h-8 text-secondary" />
              </div>
              <div>
                 <h4 className="text-lg font-black text-white uppercase italic tracking-tighter">Arbitrage Recommandé</h4>
                 <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest leading-relaxed max-w-sm mt-1">
                    Le projet <span className="text-primary">{projects[0].audit.trustScore > projects[1].audit.trustScore ? projects[0].name : projects[1].name}</span> présente un meilleur ratio Risque/Conformité sur 42 points d'audit.
                 </p>
              </div>
           </div>
           <div className="flex items-baseline gap-2">
              <span className="text-[3rem] font-black text-primary italic leading-none">94.2</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Confidence Score</span>
           </div>
        </div>

       {/* Background Text */}
       <div className="absolute -bottom-20 -left-20 opacity-[0.02] text-[20rem] font-black italic tracking-tighter pointer-events-none select-none">
          AUDIT
       </div>
    </div>
  );
};
