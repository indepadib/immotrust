import React from 'react';
import { MOCK_DEVELOPERS } from '@/data/immoMock';
import { DeveloperCard } from '@/components/immo/DeveloperCard';
import { Search, Filter, ArrowUpRight, ShieldCheck, Building2 } from 'lucide-react';

export default function DevelopersPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4 text-left">
            <div className="inline-flex items-center gap-3 bg-secondary/10 px-4 py-2 rounded-2xl border border-secondary/20">
               <Building2 className="w-5 h-5 text-secondary dark:text-white" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary dark:text-white">Annuaire des Bâtisseurs</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85]">
               Scoring <br /> <span className="text-primary not-italic">Promoteurs</span>.
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] max-w-lg">
               Analysez l'historique de livraison, la qualité des finitions et la réputation SAV des plus grands acteurs du marché marocain.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-white/5 flex flex-col items-center shadow-luxury-soft">
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Moyenne Retard</div>
                <div className="text-2xl font-black text-rose-500 italic">4.2 <span className="text-xs">Mois</span></div>
             </div>
             <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-white/5 flex flex-col items-center shadow-luxury-soft">
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Taux Satisfaction</div>
                <div className="text-2xl font-black text-emerald-500 italic">78%</div>
             </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-premium p-6 rounded-[2.5rem] mb-16 flex flex-wrap items-center gap-6">
           <div className="flex-1 min-w-[300px] relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                 type="text" 
                 placeholder="NOM DU PROMOTEUR, GROUPE, SEGMENT..." 
                 className="w-full pl-16 pr-6 py-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-none font-bold text-[10px] uppercase tracking-widest focus:ring-2 ring-primary/20"
              />
           </div>
           
           <div className="flex items-center gap-4">
              {['Segment', 'Region', 'Anciennet'].map((f) => (
                <button key={f} className="px-6 py-4 rounded-xl border border-slate-200 dark:border-white/10 font-bold text-[9px] uppercase tracking-widest hover:border-primary transition-colors flex items-center gap-2">
                   {f} <ArrowUpRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
           </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {MOCK_DEVELOPERS.map((dev) => (
            <DeveloperCard key={dev.id} developer={dev} />
          ))}

          {/* Verification Banner */}
          <div className="lg:col-span-2 mt-12 p-12 bg-primary/5 rounded-[3rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-white dark:bg-slate-900 rounded-3xl flex items-center justify-center text-primary shadow-xl">
                   <ShieldCheck className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-2xl font-black text-secondary dark:text-white uppercase italic tracking-tight">Le Sceau ImmoTrust</h3>
                   <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest max-w-md">Seuls les promoteurs acceptant un audit indépendant de leurs livraisons passées reçoivent le badge "Vérifié".</p>
                </div>
             </div>
             <button className="px-10 py-5 bg-secondary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all">
                En savoir plus sur l'Audit
             </button>
          </div>
        </div>
      </div>
    </main>
  );
}
