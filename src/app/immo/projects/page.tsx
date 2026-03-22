import React from 'react';
import { Metadata } from 'next';
import { ProjectFilters } from '@/components/immo/ProjectFilters';
import { MarketTrends } from '@/components/immo/MarketTrends';
import { ProjectCard } from '@/components/immo/ProjectCard';
import { ProjectService } from '@/lib/immo/ProjectService';
import { Building2, SlidersHorizontal, Filter } from 'lucide-react';
import { Project } from '@/types/immo';

export const metadata: Metadata = {
  title: 'Référentiel des Projets | ImmoTrust Maroc',
  description: 'Explorez tous les programmes immobiliers sous audit. Visualisez les cartes thermiques, les scores de fiabilité et les prix m² réels.',
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await ProjectService.getAllProjects();
  } catch (err) {
    console.error('Failed to fetch projects:', err);
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-40 overflow-hidden relative">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary dark:text-white">Référentiel Marché</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85]">
              Explorer les <br /> <span className="text-primary not-italic">Programmes</span>.
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button disabled title="Bientôt disponible" className="opacity-50 cursor-not-allowed flex items-center gap-3 px-8 py-5 bg-white dark:bg-slate-900 rounded-full border border-slate-100 dark:border-white/5 shadow-luxury-soft transition-all font-black text-[10px] uppercase tracking-widest text-secondary dark:text-white group">
              <Building2 className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" /> Vue Carte
            </button>
            <button disabled title="Bientôt disponible" className="opacity-50 cursor-not-allowed p-5 bg-secondary dark:bg-slate-800 text-white rounded-full transition-all shadow-xl group">
              <SlidersHorizontal className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </div>

        {/* Discovery Section */}
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
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
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 lg:gap-16 pt-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
           {projects.map((project) => (
             <ProjectCard key={project.id} project={project} />
           ))}
           
           {projects.length === 0 && (
             <div className="lg:col-span-2 group border border-dashed border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-[3rem] flex flex-col items-center justify-center p-24 text-center">
               <Filter className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-6" />
               <h3 className="text-2xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Aucun projet trouvé</h3>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-2">Désolé, nous n'avons pas encore d'audits certifiés pour cette recherche.</p>
             </div>
           )}

           <div className="group border border-dashed border-slate-200 dark:border-white/10 rounded-[3rem] flex flex-col items-center justify-center p-16 text-center hover:border-primary/50 transition-colors bg-white/30 dark:bg-transparent backdrop-blur-sm">
             <div className="w-20 h-20 rounded-[1.5rem] bg-white dark:bg-slate-900 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
               <Filter className="w-8 h-8 text-primary/50" />
             </div>
             <h3 className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Prochainement référencé</h3>
             <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2 max-w-xs">Plus de 500 projets en cours de scan par le Noyau ImmoTrust.</p>
           </div>
        </div>
      </div>
    </main>
  );
}
