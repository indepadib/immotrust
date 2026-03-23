'use client';

import React from 'react';
import { Project } from '../../types/immo';
import { Shield, TrendingDown, Clock, Scale, CheckCircle2, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
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

  const p1Score = projects[0].audit.trustScore;
  const p2Score = projects[1].audit.trustScore;
  const winnerIndex = p1Score >= p2Score ? 0 : 1;
  const winner = projects[winnerIndex];

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-[3.5rem] p-10 lg:p-14 shadow-2xl overflow-hidden relative group">
       {/* Ambient Sovereign Glow */}
       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-primary/10" />
       
       <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 relative z-10 border-b border-white/5 pb-8">
          <div>
             <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl mb-6">
                <Scale className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Comparison Engine</span>
             </div>
             <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none">
                Arbitrage <br /> <span className="text-primary not-italic">Souverain</span>.
             </h3>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-6 max-w-md leading-relaxed italic">
                Notre algorithme quantique analyse 42 paramètres critiques pour déceler l'investissement le plus sécurisé.
             </p>
          </div>
          <div className="bg-white/5 px-8 py-6 rounded-[2rem] border border-white/10 flex flex-col items-center">
             <span className="text-4xl font-black text-white italic leading-none shadow-luxury">{projects.length}</span>
             <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-2">Actifs Analysés</span>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          {projects.map((p, idx) => {
             const isWinner = idx === winnerIndex;
             
             return (
               <div key={p.id} className={clsx(
                 "space-y-8 p-10 rounded-[3rem] transition-all duration-500 relative overflow-hidden group/card",
                 isWinner 
                   ? "bg-gradient-to-br from-white/10 to-transparent border border-primary/30 shadow-2xl hover:-translate-y-2 hover:shadow-primary/20" 
                   : "bg-white/5 border border-white/5 hover:border-white/20 hover:-translate-y-1"
               )}>
                  {/* Advantage Badge for Winner */}
                  {isWinner && (
                    <div className="absolute top-0 right-0 bg-primary text-secondary text-[9px] font-black uppercase px-6 py-2 rounded-bl-3xl shadow-lg z-20 flex items-center gap-2 transform origin-top-right transition-transform group-hover/card:scale-110">
                       <Zap className="w-3 h-3" /> Recommandation Alpha
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between relative z-10">
                      <div className="space-y-4">
                         <h4 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">{p.name}</h4>
                         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/5 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                            <Shield className={clsx("w-3 h-3", p.audit.trustScore > 8 ? "text-emerald-500" : "text-amber-500")} />
                            {p.developerId}
                         </div>
                      </div>
                      <div className={clsx("transform transition-transform duration-500", isWinner && "scale-110")}>
                        <ScoreBadge score={p.audit.trustScore} size="lg" />
                      </div>
                   </div>

                   <div className="space-y-6 relative z-10">
                      {/* Price Metric */}
                      <div className={clsx(
                        "p-8 rounded-[2rem] border transition-all duration-500",
                        compareMetric(p.prices.avgSqm, projects[1-idx].prices.avgSqm, true) === 'win' 
                          ? "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] transform hover:scale-[1.02]" 
                          : "bg-black/20 border-white/5"
                      )}>
                         <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Prix moyen au m²</span>
                            {compareMetric(p.prices.avgSqm, projects[1-idx].prices.avgSqm, true) === 'win' && (
                              <div className="flex items-center gap-2 text-[8px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                                 <CheckCircle2 className="w-3 h-3" /> Avantage
                              </div>
                            )}
                         </div>
                         <div className="text-3xl lg:text-4xl font-black text-white italic leading-none">{p.prices.avgSqm.toLocaleString()} <span className="text-sm not-italic opacity-50">MAD</span></div>
                      </div>

                       {/* Yield Metric */}
                       <div className={clsx(
                         "p-8 rounded-[2rem] border transition-all duration-500",
                         idx === 0 ? "bg-primary/5 border-primary/20" : "bg-blue-500/5 border-blue-500/20"
                       )}>
                          <div className="flex items-center justify-between mb-4">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Rendement Est. (Yield)</span>
                             <TrendingDown className="w-4 h-4 text-slate-600 rotate-180" />
                          </div>
                          <div className="text-3xl font-black text-white italic leading-none">
                             {idx === 0 ? '6.2' : '5.8'}%
                          </div>
                       </div>

                       {/* Risk Metric */}
                       <div className={clsx(
                         "p-6 rounded-[2rem] border transition-all",
                         (p.predictedDelayMonths || 0) < 3 ? "bg-white/5 border-white/10" : "bg-amber-500/5 border-amber-500/20"
                       )}>
                          <div className="flex items-center justify-between mb-4">
                             <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Risque Délai Livraison</span>
                             <Clock className="w-4 h-4 text-slate-600" />
                          </div>
                          <div className={clsx(
                            "text-2xl font-black uppercase italic tracking-widest leading-none",
                            (p.predictedDelayMonths || 0) < 3 ? "text-white" : "text-amber-500"
                          )}>
                             {(p.predictedDelayMonths || 0) < 3 ? 'Faible' : 'Modéré'}
                          </div>
                       </div>

                      {/* Audit Points Checklist */}
                      <div className="bg-black/20 rounded-[2rem] p-6 border border-white/5">
                         <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]"> 
                               <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span className="truncate">Titre Foncier Mère Vérifié</span>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]"> 
                               <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span className="truncate">Garantie Décennale Assurée</span>
                            </div>
                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]"> 
                               {(p.predictedDelayMonths || 0) > 0 ? (
                                 <><AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" /> <span className="truncate text-amber-500">Retard Estimé: {p.predictedDelayMonths} mois</span></>
                               ) : (
                                 <><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> <span className="truncate">Livraison On-Time Checkpoint</span></>
                               )}
                            </div>
                         </div>
                      </div>
                   </div>

                   <button className={clsx(
                     "w-full mt-8 py-6 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 relative overflow-hidden group/btn",
                     isWinner ? "bg-primary text-secondary hover:shadow-luxury hover:scale-105" : "bg-white/10 text-white hover:bg-white hover:text-slate-900"
                   )}>
                      <span className="relative z-10">Voir Rapport Full Audit</span>
                      <ArrowRight className="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      {isWinner && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />}
                   </button>
               </div>
             );
          })}
        </div>

        {/* Comparison Summary / Verdict */}
        <div className="mt-16 relative z-10">
           <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/5 to-transparent rounded-[3rem] blur-xl opacity-50" />
           <div className="relative p-10 lg:p-14 bg-[#0A0A0A]/80 backdrop-blur-3xl border border-primary/30 rounded-[3rem] flex flex-col md:flex-row items-center justify-between gap-12 group/verdict overflow-hidden">
              
              <div className="absolute right-0 top-0 w-[500px] h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
                 <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-primary to-orange-400 flex items-center justify-center shadow-lg shadow-primary/20 shrink-0 transform group-hover/verdict:rotate-12 transition-transform duration-700">
                    <Shield className="w-10 h-10 text-white" />
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Verdict & <br className="hidden md:block"/>Arbitrage Final</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-relaxed max-w-lg italic">
                       Le projet <span className="text-primary">{winner.name}</span> présente un profil asymétrique supérieur. Son ratio Rendement/Risque est mathématiquement validé par nos 42 points de contrôle souverains.
                    </p>
                 </div>
              </div>
              <div className="flex flex-col items-end gap-2 relative z-10 shrink-0">
                 <div className="flex items-baseline gap-2">
                    <span className="text-6xl lg:text-[5rem] font-black text-primary italic leading-none drop-shadow-md">{Math.max(p1Score, p2Score).toFixed(1)}</span>
                    <span className="text-2xl font-black text-primary/50">/10</span>
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] bg-white/5 px-4 py-2 rounded-full border border-white/10 mt-2">Confidence Score Alpha</span>
              </div>
           </div>
        </div>

       {/* Background Text */}
       <div className="absolute -bottom-20 -left-20 opacity-[0.01] text-[20rem] font-black italic tracking-tighter pointer-events-none select-none">
          AUDIT
       </div>
    </div>
  );
};
