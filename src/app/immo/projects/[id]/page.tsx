import React from 'react';
import { notFound } from 'next/navigation';
import { ProjectService } from '@/lib/immo/ProjectService';
import { MapPin, ShieldCheck, Clock, Building2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { ScoreBadge } from '@/components/immo/ScoreBadge';

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await ProjectService.getProjectById(params.id);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-[#FAFAFC] pb-32">
      {/* Spectacular Hero Header */}
      <div className="relative w-full h-[70vh] min-h-[600px] overflow-hidden">
         <Image 
           src={project.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80'}
           alt={project.name}
           fill
           className="object-cover scale-105 animate-pulse-slow"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAFC] via-[#FAFAFC]/40 to-transparent" />
         
         <div className="absolute bottom-16 left-0 right-0 px-4">
            <div className="container mx-auto max-w-5xl">
               <div className="glass-panel rounded-[2rem] p-10 backdrop-blur-xl border border-white/40 shadow-2xl animate-float">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                     <div>
                        <div className="flex items-center gap-3 mb-4">
                           <span className="px-3 py-1 bg-indigo-500 text-white rounded-full text-[10px] font-bold uppercase tracking-wider">
                              {project.projectType || 'Résidentiel'}
                           </span>
                           <span className="flex items-center gap-1.5 text-slate-600 font-medium text-sm">
                              <MapPin className="w-4 h-4 text-indigo-500" /> {project.district}, {project.city}
                           </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-secondary tracking-tight">{project.name}</h1>
                        <div className="mt-4 flex items-center gap-4">
                           <div className="flex items-center gap-2">
                              <div className={"w-2.5 h-2.5 rounded-full " + (project.status === 'construction' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500')} />
                              <span className="font-bold text-slate-700">{project.status === 'construction' ? 'En Construction' : 'Livré'}</span>
                           </div>
                        </div>
                     </div>
                     <div className="text-center bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Score Audit</div>
                        <ScoreBadge score={project.audit.trustScore} size="lg" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 mt-8 space-y-12">
         {/* Key Stats */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
               <Building2 className="w-6 h-6 text-indigo-500 mx-auto mb-3" />
               <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Unités</div>
               <div className="text-2xl font-black text-secondary">{project.units}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
               <Clock className="w-6 h-6 text-orange-500 mx-auto mb-3" />
               <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Livraison</div>
               <div className="text-2xl font-black text-secondary">{new Date(project.deliveryDate).getFullYear()}</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
               <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto mb-3" />
               <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Fiabilité Data</div>
               <div className="text-2xl font-black text-secondary">{project.dataConfidenceLevel || 95}%</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
               <CheckCircle2 className="w-6 h-6 text-blue-500 mx-auto mb-3" />
               <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Garantie</div>
               <div className="text-2xl font-black text-secondary">{project.audit.hasGFA ? 'Oui' : 'Non'}</div>
            </div>
         </div>

         {/* Project Progress (Shadcn style progress bars) */}
         <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-black text-secondary mb-8">Avancement des travaux</h3>
            <div className="space-y-8">
               {[
                  { label: 'Gros Œuvre', progress: project.audit.constructionProgress.grosOeuvre, color: 'bg-emerald-500' },
                  { label: 'Finitions', progress: project.audit.constructionProgress.finitions, color: 'bg-indigo-500' },
                  { label: 'VRD (Voirie & Réseaux)', progress: project.audit.constructionProgress.vrd, color: 'bg-orange-500' }
               ].map((item, idx) => (
                  <div key={idx}>
                     <div className="flex justify-between mb-2">
                        <span className="font-bold text-slate-700">{item.label}</span>
                        <span className="font-black text-secondary">{item.progress}%</span>
                     </div>
                     <div className="w-full bg-slate-100 rounded-full h-3">
                        <div className={"h-3 rounded-full " + item.color} style={{ width: item.progress + "%" }}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </main>
  );
}