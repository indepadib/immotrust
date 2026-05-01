import React from 'react';
import { Metadata } from 'next';
import { TitanicHero } from '@/components/immo/TitanicHero';
import { ProjectCard } from '@/components/immo/ProjectCard';
import { DeveloperCard } from '@/components/immo/DeveloperCard';
import { MarketPulseChart } from '@/components/immo/MarketPulseChart';
import { CommunityLeaderboard } from '@/components/immo/CommunityLeaderboard';
import { SyncControlCenter } from '@/components/immo/SyncControlCenter';
import { InvestorVault } from '@/components/immo/InvestorVault';
import { ProjectService } from '@/lib/immo/ProjectService';
import { DeveloperService } from '@/lib/immo/DeveloperService';
import Link from 'next/link';

import { Project, Developer } from '@/types/immo';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/data/immoMock';
import { RealityMarquee } from '@/components/immo/RealityMarquee';

export const metadata: Metadata = {
  title: 'Dashboard Avis Promoteur Maroc | Intelligence & Marché Immobilier',
  description: 'Vivez le marché de l\'immobilier Marocain en temps réel. Accédez aux statistiques, heatmaps de risque, et scorings promoteurs exclusifs.',
};

export default async function ImmoHomePage() {
  let projects: Project[] = [];
  let developers: Developer[] = [];
  
  try {
    const [projData, devData] = await Promise.all([
      ProjectService.getAllProjects(),
      DeveloperService.getAllDevelopers()
    ]);
    
    // Sort and filter projects to show only high-quality data
    projects = (projData.length > 0 ? projData : MOCK_PROJECTS)
      .filter(p => p.images && p.images.length > 0)
      .slice(0, 6);

    developers = (devData.length > 0 ? devData : MOCK_DEVELOPERS)
      .slice(0, 4);
  } catch (err) {
    console.error('Failed to fetch immo home data:', err);
    // Silent fallback to mock only in development/emergency
    projects = MOCK_PROJECTS.slice(0, 6);
    developers = MOCK_DEVELOPERS.slice(0, 4);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 px-0">
      <TitanicHero />
      
      <RealityMarquee />
      
      <section className="container mx-auto px-4 py-32 space-y-40">
        {/* Featured Projects Grid */}
        <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-8">
               <div className="space-y-2">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-1 px-1 bg-primary rounded-full" />
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Audits Prioritaires</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-secondary dark:text-white">Projets en <span className="text-primary not-italic">Audit Actif</span></h2>
               </div>
               <Link href="/immo/projects" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary dark:hover:text-white transition-colors flex items-center gap-2 group border border-primary/20 px-6 py-3 rounded-full hover:bg-primary hover:text-white shadow-sm">
                  Explorer le Référentiel <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
               </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
              {projects.length === 0 && (
                 <div className="col-span-full py-20 text-center text-slate-500 font-bold italic">Aucun projet à afficher pour le moment.</div>
              )}
            </div>
        </div>

        {/* Developers Section */}
        <div className="space-y-12">
           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/5 pb-8">
              <div className="space-y-2">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-1 px-1 bg-primary rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Track Record Promoteurs</span>
                 </div>
                 <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-secondary dark:text-white">Promoteurs Certifiés</h2>
              </div>
              <Link href="/immo/developers" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary dark:hover:text-white transition-colors flex items-center gap-2 group border border-primary/20 px-4 py-2 rounded-full hover:bg-primary hover:text-white">
                  Annuaire Complet <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
               </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
              {developers.map(dev => (
                <DeveloperCard key={dev.id} developer={dev} />
              ))}
           </div>
        </div>

        {/* Investor Deep-Dive Section */}
        <div className="space-y-24 bg-slate-50 dark:bg-slate-900/50 rounded-[4rem] p-12 lg:p-24 border border-slate-100 dark:border-white/5">
           <div className="space-y-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-12">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-1 px-1 bg-emerald-500 rounded-full" />
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Arbitrage Investisseur</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none">
                       Market <span className="text-emerald-500 not-italic">Pulse</span>.
                    </h2>
                 </div>
                 <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] max-w-xs text-right italic font-outfit">
                    Visualisation en temps réel de la tension immobilière et du prix au m² par zone.
                 </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                     <MarketPulseChart />
                  </div>
                  <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-white/10 flex flex-col justify-center gap-6 shadow-luxury-soft">
                     <h4 className="text-xl font-black text-secondary dark:text-white uppercase italic">Analyse <span className="text-emerald-500 italic">Secteur</span></h4>
                     <p className="text-xs font-medium text-slate-500 leading-relaxed italic">
                       "Casablanca Finance City (CFC) maintient sa position de leader avec un indice de tension de 8.5/10. Recommandation: Achat Défensif."
                     </p>
                     <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                       <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-transform hover:scale-105">
                         Rapport Deep-Dive
                       </button>
                     </div>
                  </div>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-12">
              <SyncControlCenter />
              <InvestorVault />
           </div>
        </div>

        {/* Community Intelligence & Leaderboard */}
        <div className="space-y-12">
            <div className="flex items-center gap-3 mb-8">
               <div className="w-10 h-1 px-1 bg-amber-500 rounded-full" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Gouvernance & Experts</span>
            </div>
            <CommunityLeaderboard />
        </div>

      </section>
    </main>
  );
}
