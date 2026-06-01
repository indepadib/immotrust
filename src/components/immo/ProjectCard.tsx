import React from 'react';
import Image from 'next/image';
import { MapPin, Building2, ShieldCheck, Star } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <Link href={"/immo/projects/" + project.id} className="absolute inset-0 z-10" />
      
      {/* Cover Image */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image 
          src={project.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'} 
          alt={project.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        
        <div className="absolute top-4 right-4">
           <ScoreBadge score={project.audit.trustScore} size="sm" />
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
           <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/30 text-white">
              <div className="text-[9px] font-bold uppercase tracking-wider mb-0.5 opacity-80">Prix m²</div>
              <div className="text-sm font-black">{project.prices.avgSqm ? project.prices.avgSqm.toLocaleString() + ' MAD' : 'Sur demande'}</div>
           </div>
           <div className="flex items-center gap-1.5 bg-indigo-500 text-white px-3 py-1.5 rounded-lg shadow-lg">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{(project.dataConfidenceLevel || 95)}% Audit</span>
           </div>
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="mb-4">
          <h3 className="text-xl font-black text-secondary tracking-tight group-hover:text-indigo-600 transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500 mt-1">
             <MapPin className="w-3.5 h-3.5" />
             <span className="text-[11px] font-medium">{project.district}, {project.city}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100 mt-auto">
           <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Statut</div>
              <div className="text-xs font-bold text-secondary flex items-center gap-1.5">
                 <div className={"w-2 h-2 rounded-full " + (project.status === 'construction' ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500')} />
                 {project.status === 'construction' ? 'En chantier' : 'Livré'}
              </div>
           </div>
           <div>
              <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Typologie</div>
              <div className="text-xs font-bold text-secondary">{project.projectType || 'Résidentiel'}</div>
           </div>
        </div>
      </div>
    </div>
  );
};