import React from 'react';
import { ComparisonEngine } from '@/components/immo/ComparisonEngine';
import { ScraperMonitor } from '@/components/immo/ScraperMonitor';
import { AuditRequestForm } from '@/components/immo/AuditRequestForm';
import { ProjectService } from '@/lib/immo/ProjectService';
import { Shield, TrendingUp, BarChart3, Lock } from 'lucide-react';

export default async function AnalyticsPage() {
  // Take two projects for comparison demonstration
  const comparisonProjects = await ProjectService.getFeaturedProjects(2);

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-40 px-4 sm:px-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 border-b border-white/5 pb-12">
           <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/20 rounded-xl">
                 <Lock className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic underline decoration-2">Accès Souverain Certifié</span>
              </div>
              <h1 className="text-[10vw] lg:text-[6rem] font-black text-white italic uppercase tracking-tighter leading-[0.8] font-outfit">
                 Market<br />
                 <span className="text-primary not-italic">Intelligence</span>
              </h1>
           </div>
           
           <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Projects Audited</p>
                 <p className="text-2xl font-black text-white italic">1,402</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Market Vol.</p>
                 <p className="text-2xl font-black text-white italic">3.4B <span className="text-[10px] text-primary">DH</span></p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hidden sm:block">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Trust Index</p>
                 <p className="text-2xl font-black text-emerald-500 italic">96.8%</p>
              </div>
           </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
           {/* Primary Comparison Section */}
           <div className="xl:col-span-2 space-y-12">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <BarChart3 className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Arbitrage Stratégique</h2>
                 </div>
              </div>
              <ComparisonEngine projects={comparisonProjects} />
              
              <div className="pt-12">
                 <AuditRequestForm />
              </div>
           </div>

           {/* Sidebar Monitor Section */}
           <div className="space-y-12">
              <div className="flex items-center gap-4">
                 <TrendingUp className="w-8 h-8 text-primary" />
                 <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Sourcing Monitor</h2>
              </div>
              <ScraperMonitor />

              {/* Security Policy Badge */}
              <div className="p-8 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] space-y-4">
                 <Shield className="w-10 h-10 text-emerald-500" />
                 <h4 className="text-[10px] font-black text-white uppercase tracking-[0.2em] italic underline">Intégrité des Données</h4>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                    Chaque point de donnée est vérifié par nos algorithmes de normalisation avant d'être exposé dans le Comparison Engine.
                 </p>
              </div>
           </div>
        </div>

      </div>
      
      {/* Footer Branding */}
      <div className="mt-40 text-center opacity-10">
         <div className="text-[15rem] font-black italic tracking-tighter text-white select-none">SOVEREIGN</div>
      </div>
    </div>
  );
}
