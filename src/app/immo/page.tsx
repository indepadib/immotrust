import React from 'react';
import { TitanicHero } from '@/components/immo/TitanicHero';
import { ProjectCard } from '@/components/immo/ProjectCard';
import { DeveloperCard } from '@/components/immo/DeveloperCard';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/data/immoMock';
import { MarketHeatmap } from '@/components/immo/MarketHeatmap';
import { SyncControlCenter } from '@/components/immo/SyncControlCenter';
import { InvestorVault } from '@/components/immo/InvestorVault';

export default function ImmoHomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <TitanicHero />
      
      <section className="container mx-auto px-4 py-32 space-y-32">
        {/* Market Pulse Heatmap */}
        <div>
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-1 px-1 bg-primary rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Market Spatio-Temporal Pulse</span>
           </div>
           <MarketHeatmap />
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {MOCK_PROJECTS.slice(0, 3).map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Institutional & Sync Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           <SyncControlCenter />
           <InvestorVault />
        </div>

        {/* Developers Section */}
        <div className="space-y-12">
           <h2 className="text-4xl font-black uppercase italic tracking-tighter text-secondary dark:text-white">Promoteurs Certifiés</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {MOCK_DEVELOPERS.map(dev => (
                <DeveloperCard key={dev.id} developer={dev} />
              ))}
           </div>
        </div>
      </section>
    </main>
  );
}
