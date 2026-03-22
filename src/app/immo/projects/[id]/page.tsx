'use client';

import React from 'react';
import { MOCK_PROJECTS } from '@/data/immoMock';
import { MarketIntelligence } from '@/components/immo/MarketIntelligence';
import { MarketTrends } from '@/components/immo/MarketTrends';
import { ScoreBadge } from '@/components/immo/ScoreBadge';
import { TrustScoreDetail } from '@/components/immo/TrustScoreDetail';
import { 
  ShieldCheck, MapPin, Building2, 
  ArrowLeft, Share2, Heart, 
  ChevronRight, Download, Calculator
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = MOCK_PROJECTS.find(p => p.id === params.id) || MOCK_PROJECTS[0];
  const developer = project.developerId === 'dev-1' ? { name: 'Al Akaria Dévelopement', color: 'primary' } : { name: 'Prestigia Maroc', color: 'secondary' };

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-20 pb-32">
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/immo/projects" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all">
            <ArrowLeft className="w-4 h-4" /> Retour au Référentiel
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl hover:text-primary transition-all"><Heart className="w-4 h-4" /></button>
            <Link href="/immo/submit-review" className="bg-primary text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20">
               Déposer un avis
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-8">
               <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl w-fit">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Projet Audité & Vérifié</span>
               </div>
               
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div className="space-y-4">
                     <h1 className="text-4xl md:text-7xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none">{project.name}</h1>
                     <div className="flex items-center gap-4 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                        <MapPin className="w-4 h-4 text-primary" />
                        {project.district} • {project.city}
                     </div>
                  </div>
                  <ScoreBadge score={project.audit.trustScore} size="lg" />
               </div>

               <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-2xl">
                  <Image src={project.images[0]} alt={project.name} fill className="object-cover" />
               </div>
            </section>

            <section className="space-y-6">
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Intelligence Marché</div>
               <MarketTrends 
                 city={project.city}
                 district={project.district}
                 avgPrice={project.prices.avgSqm}
                 history={[
                   { month: 'Jan', price: project.prices.avgSqm * 0.92 },
                   { month: 'Fev', price: project.prices.avgSqm * 0.94 },
                   { month: 'Mar', price: project.prices.avgSqm * 0.96 },
                   { month: 'Avr', price: project.prices.avgSqm * 0.98 },
                   { month: 'Mai', price: project.prices.avgSqm }
                 ]}
               />
            </section>

            <section className="pt-12 border-t border-slate-100 dark:border-white/5">
                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 shadow-luxury-soft">
                  <h3 className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tight mb-8">Détails de l'Audit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Score de Confiance</div>
                        <ScoreBadge score={project.audit.trustScore} size="lg" />
                     </div>
                     <div className="space-y-4">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut Juridique</div>
                        <div className="flex items-center gap-2 text-emerald-500 font-black uppercase text-xs italic">
                           <ShieldCheck className="w-5 h-5" /> Certifié Conforme
                        </div>
                     </div>
                  </div>
                </div>
            </section>
          </div>

          <aside className="lg:col-span-1 space-y-8">
             <div className="sticky top-52 space-y-8">
                <div className="bg-secondary dark:bg-slate-900 rounded-[3rem] p-8 text-white border border-white/5 shadow-2xl relative group overflow-hidden">
                   <div className="relative z-10 space-y-6">
                      <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Le Promoteur</div>
                      <div className="flex items-center gap-4">
                         <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10"><Building2 className={`w-8 h-8 text-${developer.color}`} /></div>
                         <h4 className="text-xl font-black uppercase italic tracking-tighter">{developer.name}</h4>
                      </div>
                      <button className="w-full py-4 bg-white text-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Voir l'historique</button>
                   </div>
                   <Building2 className="absolute -bottom-12 -right-12 w-48 h-48 text-white/5" />
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 border border-slate-100 dark:border-white/5 shadow-luxury-soft space-y-6">
                   <h4 className="text-lg font-black text-secondary dark:text-white uppercase italic tracking-tight">Vérifier ce projet</h4>
                   <div className="space-y-3">
                      <Link href="/immo/simulator" className="w-full flex items-center justify-between p-4 bg-primary text-white rounded-2xl group shadow-lg shadow-primary/20">
                         <div className="flex items-center gap-3">
                            <Calculator className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Simulateur</span>
                         </div>
                         <ChevronRight className="w-4 h-4" />
                      </Link>
                      <button className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl group">
                         <div className="flex items-center gap-3">
                            <Download className="w-4 h-4 text-primary" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Rapport Audit PDF</span>
                         </div>
                         <ChevronRight className="w-4 h-4" />
                      </button>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
