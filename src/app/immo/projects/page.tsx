'use client';

import React, { useEffect, useState } from 'react';
import { ProjectFilters } from '@/components/immo/ProjectFilters';
import { MarketTrends } from '@/components/immo/MarketTrends';
import { ProjectCard } from '@/components/immo/ProjectCard';
import { ProjectService } from '@/lib/immo/ProjectService';
import { Project } from '@/types/immo';
import { Building2, SlidersHorizontal, Filter, Search, Map as MapIcon, ArrowUpRight, Loader2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await ProjectService.getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Référentiel Marché</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85]">
              Explorer les <br /> <span className="text-primary not-italic">Programmes</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-3 px-8 py-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft hover:shadow-primary/20 transition-all font-black text-[10px] uppercase tracking-widest">
              <Building2 className="w-4 h-4 text-primary" /> Vue Carte
            </button>
            <button className="p-5 bg-secondary text-white rounded-[2rem] hover:bg-primary transition-all shadow-xl">
              <SlidersHorizontal className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Discovery Section */}
        <MarketTrends 
          city="Casablanca"
          district="Bouskoura"
          avgPrice={14500}
          history={[
            { month: 'Jan', price: 13800 },
            { month: 'Fev', price: 14000 },
            { month: 'Mar', price: 14200 },
            { month: 'Avr', price: 14350 },
            { month: 'Mai', price: 14500 }
          ]}
        />
        <ProjectFilters />

        {/* Grid Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 animate-pulse">
             <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
             <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Accès au Noyau de Données...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-16">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {projects.length === 0 && (
              <div className="lg:col-span-2 group border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-20 text-center">
                <Filter className="w-8 h-8 text-slate-200 mb-4" />
                <h3 className="text-xl font-black text-slate-300 uppercase italic">Aucun projet trouvé</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Désolé, nous n'avons pas encore d'audits certifiés pour cette recherche.</p>
              </div>
            )}

            <div className="group border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-20 text-center hover:border-primary/50 transition-colors">
              <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center mb-6">
                <Filter className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-black text-slate-300 uppercase italic">Prochainement référencé</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Plus de 500 projets en cours de scan par le Noyau.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
