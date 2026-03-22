import React from 'react';
import { Metadata } from 'next';
import { DeveloperService } from '@/lib/immo/DeveloperService';
import { DeveloperCard } from '@/components/immo/DeveloperCard';
import { Search, Filter, ArrowUpRight, ShieldCheck, Building2, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Annuaire des Bâtisseurs | Promoteurs Certifiés ImmoTrust',
  description: 'Analysez l\'historique de livraison, la qualité des finitions et la réputation SAV des plus grands acteurs du marché immobilier marocain.',
};

export default async function DevelopersPage() {
  const developers = await DeveloperService.getAllDevelopers();
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-40 relative overflow-hidden">
      {/* Premium Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
           {/* Header Section */}
           <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
             <div className="space-y-6 lg:w-3/5">
               <div className="inline-flex items-center gap-3 bg-white/50 dark:bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                  <Building2 className="w-5 h-5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary dark:text-white">Annuaire des Bâtisseurs</span>
               </div>
               <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85] drop-shadow-sm">
                  Scoring <br /> <span className="text-primary not-italic">Promoteurs</span>.
               </h1>
               <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm max-w-xl leading-relaxed italic border-l-2 border-primary/30 pl-4">
                  Analysez l'historique de livraison, la qualité des finitions et la réputation SAV des plus grands acteurs du marché marocain.
               </p>
             </div>
             
             <div className="flex flex-col sm:flex-row items-center gap-6 lg:w-2/5">
                <div className="w-full p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-white/5 flex flex-col items-center shadow-luxury hover:-translate-y-2 transition-transform duration-500">
                   <div className="w-12 h-12 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping absolute" />
                      <div className="w-2 h-2 rounded-full bg-rose-500" />
                   </div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Standard Marché<br/>Retard Moyen</div>
                   <div className="text-4xl font-black text-rose-500 italic block">4.2 <span className="text-sm not-italic uppercase text-rose-500/50">Mois</span></div>
                </div>
                <div className="w-full p-8 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] border border-white/20 dark:border-white/5 flex flex-col items-center shadow-luxury hover:-translate-y-2 transition-transform duration-500 delay-100">
                   <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                   </div>
                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Top 10%<br/>Satisfaction</div>
                   <div className="text-4xl font-black text-emerald-500 italic">92<span className="text-2xl">%</span></div>
                </div>
             </div>
           </div>

           {/* Filters */}
           <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl p-4 sm:p-6 rounded-[3rem] sm:rounded-full mb-20 flex flex-col md:flex-row items-center gap-4 sm:gap-6 border border-white/40 dark:border-white/10 shadow-luxury animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
              <div className="w-full md:flex-1 relative">
                 <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                 <input 
                    type="text" 
                    placeholder="RECHERCHER UN PROMOTEUR, UN GROUPE..." 
                    className="w-full pl-20 pr-8 py-6 bg-slate-50 dark:bg-slate-800/50 rounded-full border-none font-bold text-xs uppercase tracking-[0.2em] focus:ring-2 ring-primary/20 text-secondary dark:text-white placeholder:text-slate-400 transition-all"
                 />
              </div>
              
              <div className="flex w-full md:w-auto items-center gap-3 overflow-x-auto pb-4 md:pb-0 px-2 scrollbar-none">
                 {['Taille du Parc', 'Région Active', 'Années d\'XP'].map((filter, idx) => (
                   <div key={filter} title="Bientôt disponible" className={`cursor-not-allowed opacity-50 shrink-0 px-8 py-5 rounded-full border border-slate-200 dark:border-white/10 font-black text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center gap-3 group ${idx === 0 ? 'bg-secondary text-white border-secondary dark:bg-white dark:text-secondary dark:border-white' : 'bg-white dark:bg-transparent text-slate-500 dark:text-slate-300'}`}>
                      {filter} <ChevronRight className={`w-3 h-3 transition-transform duration-300 group-hover:rotate-90 ${idx === 0 ? 'rotate-90' : ''}`} />
                   </div>
                 ))}
              </div>
           </div>

           {/* Grid Section */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
             {developers.map((dev) => (
               <DeveloperCard key={dev.id} developer={dev} />
             ))}

             {/* Verification Banner */}
             <div className="md:col-span-2 mt-12 overflow-hidden group">
                <div className="relative p-12 lg:p-16 bg-gradient-to-br from-primary/10 via-slate-900/5 to-transparent dark:from-primary/20 dark:via-transparent rounded-[4rem] border border-primary/20 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl transition-all duration-700 hover:border-primary/40 hover:shadow-primary/10">
                   <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl -z-10" />
                   
                   <div className="flex flex-col sm:flex-row items-center sm:items-start lg:items-center text-center sm:text-left gap-8 z-10">
                      <div className="w-24 h-24 bg-gradient-to-br from-primary to-orange-400 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/30 shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                         <ShieldCheck className="w-12 h-12 text-white" />
                      </div>
                      <div className="space-y-4">
                         <h3 className="text-3xl lg:text-4xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Le Sceau <span className="text-primary not-italic">ImmoTrust</span></h3>
                         <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] max-w-xl leading-relaxed">
                            Seuls les promoteurs acceptant un audit indépendant exhaustif de leurs livraisons passées (qualité, délais, SAV) reçoivent notre certification souveraine.
                         </p>
                      </div>
                   </div>
                   <Link href="/immo/submit-review" className="w-full lg:w-auto shrink-0 px-12 py-6 bg-secondary dark:bg-white text-white dark:text-secondary rounded-full font-black text-[10px] sm:text-xs uppercase tracking-widest hover:bg-primary dark:hover:bg-primary dark:hover:text-white transition-all shadow-xl hover:shadow-primary/30 flex items-center justify-center gap-4 group/btn">
                      Découvrir la Méthodologie <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                   </Link>
                </div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
