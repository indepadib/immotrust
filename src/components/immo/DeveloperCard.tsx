import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Developer } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';

interface DeveloperCardProps {
  developer: Developer;
}

export const DeveloperCard = ({ developer }: DeveloperCardProps) => {
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="group relative bg-white rounded-[2rem] p-8 border-2 border-slate-100 hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col h-full">
      {/* 1 & 2: Nom + Logo + Note globale */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-slate-100 text-secondary font-sora font-black flex items-center justify-center text-xl tracking-tighter">
            {getInitials(developer.name)}
          </div>
          <div>
            <h3 className="text-xl font-black font-sora text-secondary leading-tight">{developer.name}</h3>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{developer.segment}</span>
          </div>
        </div>
        <ScoreBadge score={developer.scores.reputation} size="md" />
      </div>

      {/* 3: Sous-scores */}
      <div className="space-y-4 mb-8">
        {[
          { label: 'Finitions', score: developer.scores.quality },
          { label: 'Délais', score: developer.scores.delays || 5 },
          { label: 'SAV', score: developer.scores.sav }
        ].map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
              <span>{metric.label}</span>
              <span>{metric.score}/10</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className={h-full rounded-full transition-all duration-1000 }
                style={{ width: ${(metric.score / 10) * 100}% }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 4 & 5: Nombre d'avis & Retard moyen */}
      <div className="grid grid-cols-2 gap-4 mb-8 py-4 border-y border-slate-100 mt-auto">
        <div className="text-center">
          <div className="text-2xl font-black font-sora text-secondary">{developer.stats.ratingCount}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avis vérifiés</div>
        </div>
        <div className="text-center border-l border-slate-100">
          <div className="text-2xl font-black font-sora text-rose-600">{developer.stats.avgDelayMonths}</div>
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Mois de retard</div>
        </div>
      </div>

      {/* 6: CTA */}
      <Link 
        href={/immo/developers/} 
        className="w-full py-4 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
      >
        Voir le dossier complet <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
