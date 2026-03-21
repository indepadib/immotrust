'use client';

import React from 'react';
import { User, ShieldCheck, Award, MessageSquare, History, Heart, Settings, ArrowRight } from 'lucide-react';
import { ExpertProfile } from '@/types/user';

const MOCK_PROFILE: ExpertProfile = {
  id: 'exp-1',
  name: 'Karim Benchekroun',
  email: 'karim@immotrust.ma',
  role: 'expert',
  karma: 1240,
  badge: 'Auditeur Senior',
  specialty: ['Vente sur Plan (VEFA)', 'CFC Cluster', 'Droit Foncier'],
  reviewsCount: 42,
  trustScoreContribution: +15.5,
  avatar: 'KB'
};

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Sidebar Info */}
          <aside className="space-y-8">
            <div className="bg-secondary dark:bg-slate-900 rounded-[3rem] p-10 text-white border border-white/5 shadow-2xl relative overflow-hidden group">
               <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 rounded-3xl bg-primary/20 flex items-center justify-center text-primary font-black text-3xl border-2 border-white/10 group-hover:scale-110 transition-transform">
                     {MOCK_PROFILE.avatar}
                  </div>
                  <div className="space-y-2">
                     <h2 className="text-2xl font-black uppercase italic tracking-tighter">{MOCK_PROFILE.name}</h2>
                     <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span className="text-[8px] font-black uppercase tracking-widest text-primary">{MOCK_PROFILE.badge}</span>
                     </div>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-4 pt-10 border-t border-white/5">
                     <div className="text-center">
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Karma</div>
                        <div className="text-xl font-black italic">{MOCK_PROFILE.karma}</div>
                     </div>
                     <div className="text-center">
                        <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Impact</div>
                        <div className="text-xl font-black italic text-primary">+{MOCK_PROFILE.trustScoreContribution}%</div>
                     </div>
                  </div>
                  <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center gap-3 transition-all text-[9px] font-black uppercase tracking-widest">
                     <Settings className="w-4 h-4" /> Paramètres
                  </button>
               </div>
               <Award className="absolute -bottom-12 -right-12 w-48 h-48 text-white/5" />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 shadow-luxury-soft space-y-6">
               <h4 className="text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest italic border-b border-slate-50 dark:border-white/5 pb-4">Spécialités Auditées</h4>
               <div className="flex flex-wrap gap-2">
                  {MOCK_PROFILE.specialty.map(s => (
                    <span key={s} className="px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-full text-[8px] font-bold text-slate-500 uppercase tracking-widest">{s}</span>
                  ))}
               </div>
            </div>
          </aside>

          {/* Main Dashboard */}
          <div className="lg:col-span-2 space-y-12">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
                   <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary"><MessageSquare className="w-8 h-8" /></div>
                   <div>
                      <div className="text-3xl font-black text-secondary dark:text-white italic">{MOCK_PROFILE.reviewsCount}</div>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Avis Déposés</div>
                   </div>
                </div>
                <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft flex items-center gap-6 group hover:translate-y-[-4px] transition-all">
                   <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Heart className="w-8 h-8" /></div>
                   <div>
                      <div className="text-3xl font-black text-secondary dark:text-white italic">24</div>
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Recommandations</div>
                   </div>
                </div>
             </div>

             <section className="space-y-8">
                <div className="flex items-center justify-between">
                   <h3 className="text-2xl font-black text-secondary dark:text-white uppercase italic tracking-tight">Activité Récente</h3>
                   <button className="text-[9px] font-black uppercase tracking-widest text-primary flex items-center gap-2">Voir tout <ArrowRight className="w-3 h-3" /></button>
                </div>
                
                <div className="space-y-4">
                   {[1, 2, 3].map(i => (
                     <div key={i} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 shadow-luxury-soft flex items-center justify-between group cursor-pointer hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-6">
                           <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center"><History className="w-6 h-6 text-slate-400" /></div>
                           <div>
                              <div className="text-[10px] font-black text-secondary dark:text-white uppercase italic">Avis sur CFC Luxury Living</div>
                              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Validé par le Noyau • Il y a 2 jours</div>
                           </div>
                        </div>
                        <div className="text-lg font-black text-primary italic">+25 Karma</div>
                     </div>
                   ))}
                </div>
             </section>
          </div>
        </div>
      </div>
    </main>
  );
}
