import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Developer } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';
import { MapPin, Building2, ChevronRight, Star } from 'lucide-react';

export const DeveloperCard = ({ developer }: { developer: Developer }) => {
  return (
    <Link href={/immo/developers/ + developer.id} className="block group">
      <div className="bg-white rounded-[2rem] p-6 border border-[#E8E4D9] hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] transition-all duration-500 relative overflow-hidden h-full flex flex-col group-hover:-translate-y-2">
        
        {/* Top Header */}
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 rounded-[1.25rem] bg-[#FDFCF7] border border-[#E8E4D9] overflow-hidden relative shadow-inner">
               <Image 
                 src={developer.avatar || https://ui-avatars.com/api/?name= + encodeURIComponent(developer.name)} 
                 alt={developer.name} 
                 fill 
                 className="object-cover"
               />
             </div>
             <div>
                <h3 className="font-syne font-bold text-xl text-[#0A0A0A] uppercase tracking-tight">{developer.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                   <span className="px-2.5 py-1 bg-[#F3F1EA] text-[#666666] rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {developer.segment || 'Standard'}
                   </span>
                </div>
             </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center -mr-2 -mt-2 opacity-0 group-hover:opacity-100 group-hover:mr-0 group-hover:mt-0 transition-all duration-300">
             <ChevronRight className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Main Stats (Bento style) */}
        <div className="grid grid-cols-2 gap-2 mb-6 flex-1 relative z-10">
           <div className="bg-[#FDFCF7] rounded-2xl p-4 border border-[#E8E4D9]/50">
              <div className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest mb-1">Retard Moyen</div>
              <div className="text-2xl font-black font-syne text-[#FF4F00]">{developer.stats.avgDelayMonths} <span className="text-sm font-bold text-[#A3A3A3]">mois</span></div>
           </div>
           <div className="bg-[#FDFCF7] rounded-2xl p-4 border border-[#E8E4D9]/50">
              <div className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-widest mb-1">Qualité Bâti</div>
              <div className="text-2xl font-black font-syne text-[#0A0A0A]">{developer.scores.quality}<span className="text-sm text-[#A3A3A3]">/10</span></div>
           </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E8E4D9] relative z-10">
           <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#FF4F00] fill-[#FF4F00]" />
              <span className="text-sm font-bold text-[#0A0A0A]">{developer.scores.reputation}</span>
              <span className="text-xs text-[#A3A3A3]">({developer.stats.ratingCount} avis)</span>
           </div>
           <div className="text-xs font-bold text-[#666666]">
              {developer.stats.projectsCount} Projets
           </div>
        </div>
        
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#FDFCF7]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </Link>
  );
};