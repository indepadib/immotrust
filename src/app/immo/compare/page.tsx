import React from 'react';
import { ProjectComparison } from '@/components/immo/ProjectComparison';
import { MOCK_PROJECTS } from '@/data/immoMock';
import { Scale, Zap, Info } from 'lucide-react';

export default function ComparePage() {
  // Mock select 3 projects for comparison
  const selectedProjects = [MOCK_PROJECTS[0], MOCK_PROJECTS[0], MOCK_PROJECTS[0]];

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="text-center space-y-6">
             <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
                <Scale className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Analyse Comparée</span>
             </div>
             <h1 className="text-5xl md:text-8xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85]">
                Moteur de <br /> <span className="text-primary not-italic">Comparaison</span>.
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] max-w-lg mx-auto">
               Alignez les data points factuels pour arbitrer entre plusieurs opportunités d'investissement.
            </p>
          </div>

          <ProjectComparison projects={selectedProjects} />

          <div className="p-12 bg-secondary dark:bg-slate-900 rounded-[4rem] text-white border border-white/5 shadow-2xl relative overflow-hidden group">
             <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                   <div className="flex items-center gap-4 text-primary">
                      <Zap className="w-8 h-8 fill-primary" />
                      <span className="text-xs font-black uppercase tracking-[0.3em]">Recommandation IA</span>
                   </div>
                   <h3 className="text-4xl font-black uppercase italic tracking-tighter leading-none">
                      Basé sur votre profil, le projet <span className="text-primary not-italic">CFC Luxury</span> présente le meilleur ratio risque/rendement.
                   </h3>
                </div>
                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 space-y-6">
                   <div className="flex items-start gap-4">
                      <Info className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                         Le score de confiance de 9.5 est exceptionnel pour une phase de gros œuvre. La garantie de livraison (GFA) a été auditée et validée par nos experts.
                      </p>
                   </div>
                   <button className="w-full py-5 bg-white text-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                      Télécharger le Rapport Comparatif
                   </button>
                </div>
             </div>
             <Zap className="absolute -bottom-16 -right-16 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </main>
  );
}
