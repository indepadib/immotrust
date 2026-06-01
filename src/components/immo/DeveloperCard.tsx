import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Building2, ChevronRight, BarChart3, Star } from 'lucide-react';
import { Developer } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  return (
    <div className="group relative glass-panel rounded-[2rem] overflow-hidden flex flex-col hover:-translate-y-2 transition-all duration-500">
      
      {/* Premium Cover Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src="/luxury_architecture.png" 
          alt="Luxury Cover" 
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
             <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
             <span className="text-[10px] font-bold text-white uppercase tracking-wider">Certifié</span>
          </div>
        </div>
        
        <div className="absolute -bottom-6 right-6 z-20 group-hover:scale-110 transition-transform duration-500">
           <ScoreBadge score={developer.scores.reputation} size="md" />
        </div>
      </div>

      <div className="relative z-10 p-8 pt-6 flex flex-col h-full bg-white/40">
        {/* Header Section */}
        <div className="flex items-end justify-between gap-4 mb-6">
           <div className="space-y-1">
              <h3 className="text-2xl font-black text-secondary uppercase tracking-tight group-hover:text-primary transition-colors">
                 {developer.name}
              </h3>
              <div className="flex items-center gap-2 text-slate-500">
                 <span className="text-[11px] font-bold uppercase tracking-wider">{developer.segment}</span>
                 <span>•</span>
                 <span className="flex items-center gap-1 text-[11px] font-bold"><Star className="w-3 h-3 text-orange-400 fill-orange-400" /> {developer.stats.ratingCount} avis</span>
              </div>
           </div>
        </div>

        {/* Global Track Record */}
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-slate-200/50">
           <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Livraisons</div>
              <div className="text-2xl font-black text-secondary">{developer.stats.unitsDelivered.toLocaleString()}</div>
           </div>
           <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Retard Moyen</div>
              <div className="text-2xl font-black text-orange-500">{developer.stats.avgDelayMonths} <span className="text-sm font-medium text-slate-400">mois</span></div>
           </div>
        </div>

        {/* Detailed Scores */}
        <div className="grid grid-cols-1 gap-3 py-6 grow">
           {[
              { label: 'Qualité', score: developer.scores.quality, color: 'bg-gradient-to-r from-emerald-400 to-emerald-500' }, 
              { label: 'Délais', score: developer.scores.delays, color: 'bg-gradient-to-r from-indigo-400 to-indigo-500' }, 
              { label: 'SAV', score: developer.scores.sav, color: 'bg-gradient-to-r from-orange-400 to-orange-500' }
            ].map((metric) => (
             <div key={metric.label} className="space-y-1.5">
                <div className="flex justify-between items-center">
                   <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{metric.label}</span>
                   <span className="text-[11px] font-black text-secondary">
                      {metric.score}<span className="text-[10px] text-slate-400 font-medium">/10</span>
                   </span>
                </div>
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                   <div 
                      className={"h-full rounded-full " + metric.color} 
                      style={{ width: metric.score * 10 + "%" }} 
                   />
                </div>
             </div>
           ))}
        </div>

        {/* Action Button */}
        <Link href={"/immo/developers/" + developer.id} className="mt-2 w-full py-4 bg-white border border-slate-200 text-secondary rounded-xl font-bold text-sm text-center hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-sm hover:shadow-lg">
           Dossier complet <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};