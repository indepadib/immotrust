import React from 'react';
import { CommunityLeaderboard } from '@/components/immo/CommunityLeaderboard';
import { Award, Users, ShieldCheck, Heart, ShieldAlert } from 'lucide-react';

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Philosphy Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
           <div className="space-y-8">
              <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
                 <Users className="w-5 h-5 text-primary" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Intelligence Collective</span>
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85]">
                Le Savoir est <br /> <span className="text-primary not-italic">Partagé</span>.
              </h1>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest max-w-lg leading-relaxed">
                Le marché immobilier marocain souffre d'asymétrie d'information. Avis Promoteur Maroc redonne le pouvoir aux acheteurs grâce à une validation stricte par les pairs.
              </p>
           </div>
           
           <div className="relative">
              <div className="aspect-[4/5] bg-secondary dark:bg-slate-900 rounded-[4rem] p-12 text-white border border-white/5 shadow-luxury relative overflow-hidden group">
                 <div className="relative z-10 space-y-12">
                    <ShieldCheck className="w-16 h-16 text-primary" />
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">
                       Devenez un Expert <br /> de Confiance.
                    </h3>
                    <ul className="space-y-6">
                       {[
                         'Accès aux rapports confidentiels',
                         'Multiplicateur de voix (x2)',
                         'Badge Expert vérifié sur profil',
                        'Invitations aux pré-lancements'
                       ].map(t => (
                         <li key={t} className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                            {t}
                         </li>
                       ))}
                    </ul>
                    <button className="w-full py-6 bg-primary text-white rounded-3xl font-black uppercase text-xs tracking-[0.4em] shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                       Postuler au Grade Expert
                    </button>
                 </div>
                 <Users className="absolute -bottom-24 -right-24 w-64 h-64 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
              </div>
           </div>
        </div>

        {/* Leaderboard Section */}
        <div className="max-w-4xl mx-auto">
           <CommunityLeaderboard />
        </div>
      </div>
    </main>
  );
}
