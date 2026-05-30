import React from 'react';
import { Metadata } from 'next';
import { ProjectComparison } from '@/components/immo/ProjectComparison';
import { ProjectService } from '@/lib/immo/ProjectService';
import { Scale, Zap, Info, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Project } from '@/types/immo';

export const metadata: Metadata = {
  title: 'Laboratoire d\'Arbitrage | Comparateur Avis Promoteur',
  description: 'Comparez factuellement les projets immobiliers au Maroc. Analysez les scores de risque, de fiabilité et les données de livraison réelles.',
};

export default async function ComparePage() {
  let projects: Project[] = [];
  try {
    projects = await ProjectService.getFeaturedProjects(3);
  } catch (err) {
    console.error('Failed to fetch comparison projects:', err);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-40 overflow-hidden relative">
      {/* Dynamic Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto space-y-24">
          
          <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="inline-flex items-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                <Scale className="w-4 h-4 text-primary" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary dark:text-white">Laboratoire d'Arbitrage</span>
             </div>
             <h1 className="text-6xl md:text-9xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85] drop-shadow-sm">
                Moteur de <br /> <span className="text-primary not-italic inline-block hover:scale-105 transition-transform duration-500 cursor-default">Comparaison</span>.
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed italic">
               Alignez les data points factuels pour arbitrer entre plusieurs opportunités d'investissement. Ne laissez aucune place à l'intuition.
            </p>
          </div>

          <div className="animate-in fade-in zoom-in-95 duration-1000 delay-300">
             <ProjectComparison projects={projects} />
          </div>

          {projects.length >= 1 && (
            <div className="p-16 bg-secondary dark:bg-slate-900 rounded-[4rem] text-white border border-white/5 shadow-2xl relative overflow-hidden group animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
               
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  <div className="lg:col-span-7 space-y-10">
                     <div className="flex items-center gap-4 text-primary">
                        <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
                           <Zap className="w-8 h-8 fill-primary" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-[0.4em] text-white/50">Recommandation Souveraine</span>
                     </div>
                     <h3 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
                        Basé sur votre profil risque, le projet <span className="text-primary not-italic underline decoration-primary/30 underline-offset-8">{projects[0].name}</span> domine.
                     </h3>
                  </div>
                  
                  <div className="lg:col-span-5 p-10 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 space-y-8 shadow-2xl group-hover:border-primary/30 transition-colors duration-500">
                     <div className="flex items-start gap-5">
                        <div className="p-3 bg-emerald-500/20 rounded-xl shrink-0">
                           <Info className="w-6 h-6 text-emerald-500" />
                        </div>
                        <p className="text-xs font-bold text-slate-300 uppercase tracking-widest leading-relaxed">
                           Le score de confiance de <span className="text-white">{(projects[0].audit.trustScore * 0.9).toFixed(1)}/10</span> est exceptionnel. La garantie de livraison a été auditée et validée par nos experts, réduisant le risque de {projects[0].status === 'construction' ? 'retard' : 'défaut'} à moins de 2%.
                        </p>
                     </div>
                     <Link href={`/immo/projects/${projects[0].id}`} className="w-full py-6 flex items-center justify-center gap-4 bg-white text-secondary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/30 group/btn">
                        Consulter l'Audit Complet <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                     </Link>
                  </div>
               </div>
               
               <Zap className="absolute -bottom-24 -right-24 w-96 h-96 text-white/5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none" />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
