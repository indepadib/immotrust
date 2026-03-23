'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, Award
} from 'lucide-react';
import { ModerationQueue } from '@/components/immo/ModerationQueue';
import { ImmoReview } from '@/types/immo';

const MOCK_REVIEWS: ImmoReview[] = [
  {
    id: 'rev-001',
    userId: 'user-001',
    projectId: 'proj-cas-001',
    ratingOverall: 8.5,
    title: 'Finitions impeccables',
    body: 'Léger retard de 2 mois sur la livraison des parties communes, mais la qualité intérieure est au rendez-vous. Le promoteur a été transparent.',
    reviewStatus: 'pending',
    purchaseVerified: true,
    reviewerType: 'Acheteur Vérifié',
    relationType: 'Acheteur',
    createdAt: '2026-03-20T10:00:00Z'
  },
  {
    id: 'rev-002',
    userId: 'user-002',
    projectId: 'proj-cas-002',
    ratingOverall: 4.2,
    title: 'Problèmes d\'étanchéité',
    body: 'Gros problèmes d\'étanchéité constatés dès le premier mois. Le SAV ne répond pas malgré mes relances. Très déçu par la prestation.',
    reviewStatus: 'pending',
    purchaseVerified: true,
    reviewerType: 'Résident',
    relationType: 'Résident',
    createdAt: '2026-03-21T14:30:00Z'
  }
];

export default function ModerationLabPage() {
  const [reviews] = useState<ImmoReview[]>(MOCK_REVIEWS);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-40">
      <div className="container mx-auto px-4">
        
        {/* Header Unit */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-rose-500/10 px-4 py-2 rounded-2xl w-fit">
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500">Nerve Center : Moderation Lab</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none">
              Expert <span className="text-primary italic">Validation</span>.
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] max-w-xl leading-relaxed">
              Vérifiez l'irréfutabilité des preuves fournies par les contributeurs avant d'injecter la donnée dans le Score Souverain.
            </p>
          </div>
          
          <div className="flex gap-4">
             <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5 shadow-xl text-center min-w-[140px]">
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">En Attente</div>
                <div className="text-3xl font-black italic text-secondary dark:text-white">{reviews.filter(r => r.reviewStatus === 'pending').length}</div>
             </div>
             <div className="p-6 bg-secondary dark:bg-slate-800 rounded-3xl text-white shadow-xl text-center min-w-[140px]">
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Vérifiés</div>
                <div className="text-3xl font-black italic text-primary">1,420</div>
             </div>
          </div>
        </header>

        {/* Review Queue */}
        <ModerationQueue pendingReviews={reviews.filter(r => r.reviewStatus === 'pending')} />

      </div>
    </main>
  );
}
