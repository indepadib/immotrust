import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, TrendingUp, Users, Search, Building2 } from 'lucide-react';
import { ScoreBadge } from '@/components/immo/ScoreBadge';
import { MOCK_PROJECTS } from '@/data/immoMock';
import { ProjectCard } from '@/components/immo/ProjectCard';

export default function ImmoHomePage() {
  const featuredProject = MOCK_PROJECTS[0];

  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-20 pb-32">
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-12">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <ShieldCheck className="w-5 h-5 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">L'Infrastructure de Confiance</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
               La Vérité sur <br /> <span className="text-primary not-italic">L'Immobilier</span>.
            </h1>

            <p className="max-w-2xl text-slate-500 font-bold uppercase tracking-[0.2em] text-[11px] leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
               Marre des promesses non tenues ? ImmoTrust audite les promoteurs, vérifie les avis des résidents et score chaque projet selon des données réelles. Investissez enfin avec certitude.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-6 pt-8 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
               <Link href="/immo/projects" className="px-12 py-7 bg-primary text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] shadow-2xl shadow-primary/30 hover:scale-105 transition-all active:scale-95">
                  Explorer les Projets
               </Link>
               <Link href="/immo/submit-review" className="px-12 py-7 bg-white dark:bg-slate-900 text-secondary dark:text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] border border-slate-100 dark:border-white/5 hover:bg-slate-50 transition-all shadow-luxury-soft">
                  Déposer un Avis
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section className="container mx-auto px-4 py-32 bg-white dark:bg-slate-900 rounded-[5rem] border border-slate-100 dark:border-white/5 shadow-luxury">
         <div className="max-w-6xl mx-auto space-y-20">
            <div className="flex flex-col md:flex-row justify-between items-end gap-8">
               <div className="space-y-4">
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em]">Tendance de Confiance</div>
                  <h2 className="text-4xl md:text-6xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none">
                     Le Projet <span className="text-primary not-italic">Star</span>
                  </h2>
               </div>
               <Link href="/immo/projects" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all flex items-center gap-4">
                  Voir tout le référentiel <ArrowRight className="w-5 h-5" />
               </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-white/10 group">
                  <img src={featuredProject.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-10 right-10">
                     <ScoreBadge score={featuredProject.scores.global} size="lg" />
                  </div>
               </div>
               
               <div className="space-y-12">
                  <div className="space-y-6">
                     <h3 className="text-5xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none">{featuredProject.name}</h3>
                     <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                        Un score exceptionnel de {featuredProject.scores.global}/10 basé sur 145 avis vérifiés et un audit juridique complet. Livré à 95%, ce projet redéfinit le standard du CFC.
                     </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-white/5">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <TrendingUp className="w-5 h-5 text-emerald-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Rendement Net</span>
                        </div>
                        <div className="text-3xl font-black text-secondary dark:text-white italic">6.2%</div>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <Building2 className="w-5 h-5 text-primary" />
                           <span className="text-[10px] font-black uppercase tracking-widest">Confiance Noyau</span>
                        </div>
                        <div className="text-3xl font-black text-secondary dark:text-white italic">{featuredProject.dataConfidenceLevel}%</div>
                     </div>
                  </div>

                  <Link href={`/immo/projects/${featuredProject.id}`} className="w-full py-7 bg-secondary text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] text-center block shadow-2xl hover:bg-primary transition-all">
                     Analyser le Projet
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Trust Pillars */}
      <section className="container mx-auto px-4 py-32 grid grid-cols-1 md:grid-cols-3 gap-12">
         {[
           { icon: ShieldCheck, title: 'Vérité Auditée', desc: 'Chaque projet est audité par notre moteur de données (licences, délais, litiges).' },
           { icon: Users, title: 'Preuve par les Pairs', desc: 'Un avis ne compte que sil est accompagné dune preuve de résidence ou dachat vérifiée.' },
           { icon: TrendingUp, title: 'Vision Yield', desc: 'Des simulateurs financiers nourris par les prix réels constatés, pas par les prix de vente.' },
         ].map((p, i) => (
           <div key={i} className="space-y-6 p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-white/5 hover:border-primary/20 transition-all shadow-luxury-soft">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-3xl flex items-center justify-center text-primary">
                 <p.icon className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-secondary dark:text-white uppercase italic tracking-tight">{p.title}</h4>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">{p.desc}</p>
           </div>
         ))}
      </section>
    </main>
  );
}
