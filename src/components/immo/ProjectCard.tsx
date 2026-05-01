'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MapPin, Building2, ShieldCheck, ArrowUpRight, Scale, FileText, Star } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';
import { clsx } from 'clsx';
import { AuditReportGenerator } from '@/lib/immo/AuditReportGenerator';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isComparing, setIsComparing] = useState(false);

  const handleDownloadAudit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const report = AuditReportGenerator.generateReport(project);
    AuditReportGenerator.downloadReport(report);
  };

  const standingLabels = {
    'economique': 'Eco',
    'moyen': 'Moyen',
    'haut': 'Haut Standing',
    'luxe': 'Luxe'
  };

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden border border-slate-100 dark:border-white/5 hover:border-primary/40 transition-all duration-500 hover:shadow-luxury cursor-pointer shadow-luxury-soft relative">
      <Link href={`/immo/projects/${project.id}`} className="absolute inset-0 z-10" />
      
      {/* Quick Compare Action */}
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsComparing(!isComparing);
        }}
        className={clsx(
          "absolute top-6 left-6 z-20 p-3 rounded-xl border transition-all duration-300 backdrop-blur-md",
          isComparing 
            ? "bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/40" 
            : "bg-white/50 dark:bg-slate-900/50 border-white/20 text-slate-400 opacity-0 group-hover:opacity-100"
        )}
      >
        <Scale className="w-4 h-4" />
      </button>

      <div className="relative aspect-[16/10] overflow-hidden">
        <Image 
          src={project.images[0] || 'https://images.unsplash.com/photo-1592595894519-32219e2e5df6?q=80&w=1000&auto=format&fit=crop'} 
          alt={project.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-6 right-6">
           <ScoreBadge score={project.audit.trustScore} size="sm" />
        </div>
        
        {/* Standing Badge overlay */}
        <div className="absolute top-6 right-24 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 flex items-center gap-2">
           <Star className="w-3 h-3 text-primary fill-primary" />
           <span className="text-[8px] font-black uppercase tracking-widest text-secondary dark:text-white">
              {standingLabels[project.standing || 'moyen']}
           </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
           <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5 whitespace-nowrap">Potentiel ROI</div>
              <div className="text-xs font-black text-secondary dark:text-white italic">{(project.audit.trustScore * 0.9).toFixed(1)}/10</div>
           </div>
           <div className="bg-primary px-4 py-2 rounded-xl shadow-xl group-hover:bg-secondary transition-colors duration-500">
              <div className="text-[8px] font-black text-white/60 uppercase tracking-widest mb-0.5">Prix m²</div>
              <div className="text-xs font-black text-white italic">{project.prices.avgSqm.toLocaleString()} MAD</div>
           </div>
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none group-hover:text-primary transition-all duration-300">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-slate-400">
               <MapPin className="w-3 h-3 text-primary" />
               <span className="text-[9px] font-bold uppercase tracking-widest">{project.district}, {project.city}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
             <ShieldCheck className="w-3 h-3 text-emerald-500" />
             <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">{(project.dataConfidenceLevel || 100)}% Confiance</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-white/5">
           <div className="space-y-1">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Statut Projet</div>
              <div className="text-[10px] font-black text-secondary dark:text-white uppercase italic flex items-center gap-2">
                 <div className={clsx(
                   "w-1.5 h-1.5 rounded-full bg-primary",
                   project.status === 'construction' && "animate-pulse"
                 )} />
                 {project.status === 'construction' ? 'En Construction' : project.status}
              </div>
           </div>
           <div className="space-y-1">
              <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Typologie</div>
              <div className="text-[10px] font-black text-secondary dark:text-white uppercase italic">{project.projectType}</div>
           </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Building2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-primary" />
             </div>
             <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest truncate max-w-[100px]">
               {project.developerId}
             </span>
          </div>
          <div className="flex items-center gap-3 relative z-20">
            <button 
              onClick={handleDownloadAudit}
              className="group/audit flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-emerald-500/10 hover:border-emerald-500/30 hover:text-emerald-500 transition-all shadow-sm"
              title="Télécharger l'Audit Souverain"
            >
               Audit <FileText className="w-3.5 h-3.5" />
            </button>
            <div className="text-[9px] font-black text-primary uppercase tracking-widest flex items-center gap-2 group/link hover:text-secondary dark:hover:text-white transition-colors">
              Analyse <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
