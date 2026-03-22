'use client';

import React, { useEffect, useState } from 'react';
import { TitanicHero } from '@/components/immo/TitanicHero';
import { ProjectCard } from '@/components/immo/ProjectCard';
import { DeveloperCard } from '@/components/immo/DeveloperCard';
import { MarketHeatmap } from '@/components/immo/MarketHeatmap';
import { SyncControlCenter } from '@/components/immo/SyncControlCenter';
import { InvestorVault } from '@/components/immo/InvestorVault';
import { ProjectService } from '@/lib/immo/ProjectService';
import { DeveloperService } from '@/lib/immo/DeveloperService';
import { Project, Developer } from '@/types/immo';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { RealityMarquee } from '@/components/immo/RealityMarquee';

export default function ImmoHomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projData, devData] = await Promise.all([
          ProjectService.getFeaturedProjects(3),
          DeveloperService.getAllDevelopers()
        ]);
        setProjects(projData);
        setDevelopers(devData.slice(0, 2)); // Use only top 2 developers for home
      } catch (err) {
        console.error('Failed to fetch immo home data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accès au Noyau ImmoTrust...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <TitanicHero />
      
      <RealityMarquee />
      
      <section className="container mx-auto px-4 py-32 space-y-40">
        {/* Market Pulse Heatmap */}
        <div className="space-y-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-white/5 pb-12">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-1 px-1 bg-primary rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Intelligence Territoriale</span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none">
                    Market <span className="text-primary not-italic">Pulse</span>.
                 </h2>
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] max-w-xs text-right italic font-outfit">
                 Visualisation en temps réel de la tension immobilière et du risque de retard par zone.
              </p>
           </div>
           <MarketHeatmap />
        </div>

        {/* Featured Projects Grid */}
        <div className="space-y-12">
            <div className="flex items-center justify-between">
               <h2 className="text-4xl font-black uppercase italic tracking-tighter text-secondary dark:text-white">Projets Sous Audit</h2>
               <Link href="/immo/projects" className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary dark:hover:text-white transition-colors border-b border-primary/30 pb-1">Voir tout le Référentiel &rarr;</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
        </div>

        {/* Institutional & Sync Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <SyncControlCenter />
           <InvestorVault />
        </div>

        {/* Developers Section */}
        <div className="space-y-12">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-1 px-1 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Track Record Promoteurs</span>
           </div>
           <h2 className="text-4xl font-black uppercase italic tracking-tighter text-secondary dark:text-white">Promoteurs Certifiés</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {developers.map(dev => (
                <DeveloperCard key={dev.id} developer={dev} />
              ))}
           </div>
        </div>
      </section>
    </main>
  );
}
