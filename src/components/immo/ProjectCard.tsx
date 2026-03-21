import React from 'react';
import Image from 'next/image';
import { MapPin, Building2, TrendingUp, ShieldCheck, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 hover:border-primary/20 transition-all hover:shadow-luxury cursor-pointer shadow-luxury-soft">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image 
          src={project.images[0]} 
          alt={project.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-6 right-6">
           <ScoreBadge score={project.scores.global} size="sm" />
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
           <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 whitespace-nowrap">Investissement</div>
              <div className="text-xs font-black text-secondary dark:text-white italic">{project.scores.investment}/10</div>
           </div>
           <div className="bg-primary px-4 py-2 rounded-xl shadow-xl">
              <div className="text-[8px] font-black text-white/60 uppercase tracking-widest mb-0.5">Prix m Obs.</div>
              <div className="text-xs font-black text-white italic">{project.prices.sqmObserved?.toLocaleString()} MAD</div>
           </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-slate-400">
               <MapPin className="w-3 h-3 text-primary" />
               <span className="text-[9px] font-bold uppercase tracking-widest">{project.location.neighborhood}, {project.location.city}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
             <ShieldCheck className="w-3 h-3 text-emerald-500" />
             <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{project.dataConfidenceLevel}% Confiance</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-white/5">
           <div className="space-y-1">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Statut Projet</div>
              <div className="text-[10px] font-black text-secondary dark:text-white uppercase italic flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                 {project.status === 'construction' ? 'En Construction' : project.status}
              </div>
           </div>
           <div className="space-y-1">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Typologie</div>
              <div className="text-[10px] font-black text-secondary dark:text-white uppercase italic">{project.typeAsset} Premium</div>
           </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
             </div>
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
               {project.developerId}
             </span>
          </div>
          <Link href={`/immo/projects/${project.id}`} className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group/link">
            Voir Analyse <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
