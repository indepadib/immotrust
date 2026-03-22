import React from 'react';
import { notFound } from 'next/navigation';
import { DeveloperService } from '@/lib/immo/DeveloperService';
import { ShieldCheck, Building2, MapPin, Calendar, Star, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { ScoreBadge } from '@/components/immo/ScoreBadge';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
  params: { id: string }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const dev = await DeveloperService.getDeveloperById(params.id);
    if (!dev) return { title: 'Promoteur Introuvable | ImmoTrust' };
    return {
       title: `${dev.name} - Audit & Track Record | ImmoTrust`,
       description: `Découvrez l'analyse détaillée, l'historique de livraison et les avis vérifiés pour le promoteur ${dev.name}.`,
    };
  } catch (err) {
    return { title: 'Promoteur | ImmoTrust' };
  }
}

export default async function DeveloperDetailPage({ params }: Props) {
  let dev = null;
  try {
    dev = await DeveloperService.getDeveloperById(params.id);
  } catch (err) {
    console.error("Error fetching developer", err);
  }

  if (!dev) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-40 relative">
      <div className="container mx-auto px-4 z-10 relative">
         <Link href="/immo/developers" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-12">
            <ChevronLeft className="w-4 h-4" /> Retour à l'Annuaire
         </Link>
         
         {/* Hero Header */}
         <div className="glass-premium p-12 lg:p-16 rounded-[4rem] flex flex-col lg:flex-row gap-12 items-start justify-between shadow-luxury bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/20 dark:border-white/5 mb-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
               <div className="w-32 h-32 lg:w-40 lg:h-40 shrink-0 rounded-[2rem] bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 shadow-inner overflow-hidden">
                  {dev.avatar ? (
                    <img src={dev.avatar} alt={dev.name} className="w-full h-full object-cover" />
                  ) : (
                    <Building2 className="w-16 h-16 text-primary/50" />
                  )}
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-3">
                     <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Audit Souverain Validé</span>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 bg-slate-100 dark:bg-white/5 px-3 py-1.5 rounded-full">{dev.segment}</span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85] drop-shadow-sm">
                     {dev.name}
                  </h1>
                  <p className="text-sm font-bold text-slate-500 italic max-w-xl">
                     Dossier d'audit structuré compilant l'historique complet des livraisons, la data financière et les retours d'acquéreurs vérifiés.
                  </p>
               </div>
            </div>

            <div className="w-full lg:w-auto p-8 rounded-3xl bg-secondary dark:bg-slate-800 text-white min-w-[300px] flex flex-col items-center shadow-2xl relative z-10 shrink-0 border border-white/10">
               <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Indice de Confiance ImmoTrust</div>
               <ScoreBadge score={dev.scores.reputation} size="lg" />
               <div className="w-full border-t border-white/10 mt-8 pt-6 flex justify-between">
                  <div className="text-center">
                     <div className="text-2xl font-black italic">{dev.stats.ratingCount}</div>
                     <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Avis Vérifiés</div>
                  </div>
                  <div className="text-center border-l border-white/10 pl-6">
                     <div className="text-2xl font-black italic">{dev.stats.unitsDelivered.toLocaleString()}</div>
                     <div className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Unités Livrées</div>
                  </div>
               </div>
            </div>
         </div>

         {/* Deep Metrics Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 cursor-default">
            {[
               { icon: Calendar, label: 'Retard Moyen Ponderé', value: `${dev.stats.avgDelayMonths} Mois`, color: 'text-amber-500', detail: 'Critique' },
               { icon: Building2, label: 'Qualité Globale', value: `${dev.scores.quality}/10`, color: 'text-emerald-500', detail: 'Structure & Matériaux' },
               { icon: Star, label: 'Service Après-Vente', value: `${dev.scores.sav}/10`, color: 'text-blue-500', detail: 'Réactivité' },
               { icon: ShieldCheck, label: 'Score Législation', value: '10/10', color: 'text-primary', detail: 'GFA & Transparence' },
            ].map((stat, i) => (
               <div key={i} className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:border-primary/30 hover:shadow-luxury transition-all duration-500 flex flex-col justify-between h-48 group">
                  <div className="flex justify-between items-start">
                     <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                     </div>
                     <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{stat.detail}</span>
                  </div>
                  <div>
                     <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</div>
                     <div className={`text-4xl font-black italic ${stat.color}`}>{stat.value}</div>
                  </div>
               </div>
            ))}
         </div>

         {/* Call to Action Matrix */}
         <div className="p-12 md:p-16 bg-gradient-to-br from-primary via-primary/80 to-secondary rounded-[4rem] text-white flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            
            <div className="relative z-10 space-y-4 max-w-2xl text-center md:text-left">
               <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Vous avez acheté chez ce promoteur ?</h2>
               <p className="text-xs font-bold text-white/80 uppercase tracking-widest leading-relaxed">
                  L'intelligence du collectif forge la transparence du marché. Partagez votre documentation de livraison et votre expérience SAV pour alimenter l'Audit en temps réel.
               </p>
            </div>
            
            <Link href="/immo/submit-review" className="relative z-10 px-10 py-6 bg-white text-secondary rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-xl flex items-center gap-3 shrink-0">
               Certifier une Expérience <ArrowUpRight className="w-5 h-5 text-primary" />
            </Link>
         </div>

      </div>
    </main>
  );
}
