import React from 'react';
import { notFound } from 'next/navigation';
import { ProjectService } from '@/lib/immo/ProjectService';
import { MapPin, ShieldCheck, Clock, Building2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { ScoreBadge } from '@/components/immo/ScoreBadge';
import { Reveal } from '@/components/ui/Reveal';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await ProjectService.getProjectById(params.id);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#FAFAFC] pb-32">
      {/* Spectacular Hero Header */}
      <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
         <Reveal direction="down">
             <div className="absolute inset-0 h-[70vh] min-h-[600px]">
                 <Image 
                   src={project.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80'}
                   alt={project.name}
                   fill
                   className="object-cover scale-105 animate-pulse-slow"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFC] via-[#FAFAFC]/40 to-transparent" />
             </div>
         </Reveal>
         
         <div className="absolute bottom-16 left-0 right-0 px-4">
            <div className="container mx-auto max-w-5xl">
               <Reveal delay={0.3} direction="up">
                   <div className="glass-panel rounded-[2rem] p-10 backdrop-blur-xl border border-white/40 shadow-2xl hover:shadow-[0_30px_60px_rgb(0,0,0,0.15)] transition-all duration-700">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                         <div>
                            <div className="flex items-center gap-3 mb-4">
                               <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                                  {project.projectType || 'Résidentiel'}
                               </span>
                               <span className="flex items-center gap-1.5 text-slate-800 font-bold text-sm bg-white/60 px-3 py-1 rounded-full backdrop-blur-md">
                                  <MapPin className="w-4 h-4 text-indigo-500" /> {project.district}, {project.city}
                               </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tight drop-shadow-sm">{project.name}</h1>
                            <div className="mt-4 flex items-center gap-4">
                               <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl backdrop-blur-md border border-white">
                                  <div className={"w-2.5 h-2.5 rounded-full " + (project.status === 'construction' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500')} />
                                  <span className="font-bold text-slate-700">{project.status === 'construction' ? 'En Construction' : 'Livré'}</span>
                               </div>
                            </div>
                         </div>
                         <div className="text-center bg-white p-6 rounded-3xl shadow-xl border border-slate-100 hover:scale-105 transition-transform duration-500">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Score Audit</div>
                            <ScoreBadge score={project.audit.trustScore} size="lg" />
                         </div>
                      </div>
                   </div>
               </Reveal>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 mt-8 space-y-12">
         {/* Key Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
               { icon: Building2, label: 'Unités', value: project.units, color: 'text-indigo-500' },
               { icon: Clock, label: 'Livraison', value: new Date(project.deliveryDate).getFullYear(), color: 'text-orange-500' },
               { icon: ShieldCheck, label: 'Fiabilité Data', value: (project.dataConfidenceLevel || 95) + '%', color: 'text-emerald-500' },
               { icon: CheckCircle2, label: 'Garantie', value: project.audit.hasGFA ? 'Oui' : 'Non', color: 'text-blue-500' }
            ].map((stat, i) => (
               <Reveal key={i} delay={0.4 + (i * 0.1)}>
                   <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group">
                      <stat.icon className={"w-8 h-8 mx-auto mb-4 transition-transform group-hover:scale-110 " + stat.color} />
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className="text-3xl font-black text-secondary">{stat.value}</div>
                   </div>
               </Reveal>
            ))}
         </div>

         {/* Project Progress (Shadcn style progress bars) */}
         <Reveal delay={0.6}>
             <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-slate-200 shadow-xl hover:shadow-2xl transition-shadow duration-500">
                <h3 className="text-2xl font-black text-secondary mb-10">Avancement des travaux</h3>
                <div className="space-y-10">
                   {[
                      { label: 'Gros Œuvre', progress: project.audit.constructionProgress.grosOeuvre, color: 'bg-emerald-500' },
                      { label: 'Finitions', progress: project.audit.constructionProgress.finitions, color: 'bg-indigo-500' },
                      { label: 'VRD (Voirie & Réseaux)', progress: project.audit.constructionProgress.vrd, color: 'bg-orange-500' }
                   ].map((item, idx) => (
                      <div key={idx} className="group/progress">
                         <div className="flex justify-between mb-3">
                            <span className="font-bold text-slate-700 tracking-wide">{item.label}</span>
                            <span className="font-black text-secondary text-xl">{item.progress}%</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden p-0.5">
                            <div className={"h-full rounded-full transition-all duration-1000 ease-out " + item.color} style={{ width: item.progress + "%" }} />
                         </div>
                      </div>
                   ))}
                </div>
             </div>
         </Reveal>
      </div>
    </main>
  );
}