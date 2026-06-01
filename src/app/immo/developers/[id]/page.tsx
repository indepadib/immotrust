import React from 'react';
import { notFound } from 'next/navigation';
import { DeveloperService } from '@/lib/immo/DeveloperService';
import { ProjectCard } from '@/components/immo/ProjectCard';
import { ShieldCheck, Building2, Calendar, Star, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default async function DeveloperDetailPage({ params }: { params: { id: string } }) {
  const dev = await DeveloperService.getDeveloperById(params.id);
  const projects = await DeveloperService.getProjectsByDeveloper(params.id);

  if (!dev) notFound();

  return (
    <main className="min-h-screen bg-[#FAFAFC] pb-32">
      {/* Spectacular Hero Header */}
      <div className="relative w-full h-[60vh] min-h-[500px]">
         <Image 
           src="/luxury_architecture.png"
           alt="Cover"
           fill
           className="object-cover"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFC] via-[#FAFAFC]/20 to-transparent" />
         
         <div className="absolute bottom-0 left-0 right-0 px-4 translate-y-1/2">
            <div className="container mx-auto max-w-6xl">
               <div className="glass-panel rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center md:items-end justify-between gap-8 animate-float">
                  <div className="flex items-center gap-6">
                     <div className="w-24 h-24 rounded-[1.5rem] bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-lg shadow-indigo-500/20 shrink-0">
                        <Building2 className="w-12 h-12 text-indigo-500" />
                     </div>
                     <div>
                        <div className="flex items-center gap-3 mb-2">
                           <span className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border border-emerald-200">
                              <ShieldCheck className="w-3 h-3" /> Certifié
                           </span>
                           <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-bold uppercase tracking-wider border border-slate-200">
                              {dev.segment}
                           </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-secondary tracking-tight">{dev.name}</h1>
                     </div>
                  </div>
                  <div className="flex gap-12 text-center">
                     <div>
                        <div className="text-4xl font-black text-indigo-500">{dev.scores.reputation}<span className="text-xl text-indigo-300">/10</span></div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Note Globale</div>
                     </div>
                     <div>
                        <div className="text-4xl font-black text-secondary">{dev.stats.ratingCount}</div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Avis Clients</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 mt-32 space-y-12">
         {/* Deep Metrics Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
               { icon: Calendar, label: 'Retard Moyen', value: dev.stats.avgDelayMonths + ' mois', color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100' },
               { icon: Building2, label: 'Qualité Construction', value: dev.scores.quality + '/10', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' },
               { icon: Star, label: 'SAV & Garantie', value: dev.scores.sav + '/10', color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
            ].map((stat, i) => (
               <div key={i} className={"p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white " + stat.border}>
                  <div className={"w-12 h-12 rounded-2xl flex items-center justify-center mb-6 " + stat.bg}>
                     <stat.icon className={"w-6 h-6 " + stat.color} />
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">{stat.label}</div>
                  <div className={"text-3xl font-black " + stat.color}>{stat.value}</div>
               </div>
            ))}
         </div>

         {/* Projects Section */}
         <div>
            <div className="flex items-end justify-between mb-8">
               <div>
                  <h2 className="text-3xl font-black text-secondary">Projets en cours & livrés</h2>
                  <p className="text-slate-500 mt-2">{projects.length} résidences auditées pour ce promoteur.</p>
               </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {projects.length > 0 ? projects.map(p => (
                  <ProjectCard key={p.id} project={p} />
               )) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-200">
                     <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                     <p className="text-slate-500 font-medium">Aucun projet trouvé pour ce promoteur.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
    </main>
  );
}