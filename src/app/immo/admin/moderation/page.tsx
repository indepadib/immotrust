'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, FileText, CheckCircle, XCircle, 
  ExternalLink, Eye, AlertTriangle, User,
  TrendingUp, Award, Calendar
} from 'lucide-react';
import { clsx } from 'clsx';
import { ScoreBadge } from '@/components/immo/ScoreBadge';

interface PendingReview {
  id: string;
  userName: string;
  projectName: string;
  rating: number;
  comment: string;
  proofUrl: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

const MOCK_PENDING: PendingReview[] = [
  {
    id: 'rev-001',
    userName: 'Karim B.',
    projectName: 'Casablanca Finance City - Tour A',
    rating: 8.5,
    comment: 'Finitions impeccables, mais léger retard de 2 mois sur la livraison des parties communes.',
    proofUrl: '/proofs/contrat_001.pdf',
    date: '2026-03-20',
    status: 'pending'
  },
  {
    id: 'rev-002',
    userName: 'Amine R.',
    projectName: 'Anfa Park Résidence',
    rating: 4.2,
    comment: 'Gros problèmes d\'étanchéité constatés dès le premier mois. Le SAV ne répond pas.',
    proofUrl: '/proofs/photo_sav.jpg',
    date: '2026-03-21',
    status: 'pending'
  }
];

export default function ModerationLabPage() {
  const [reviews, setReviews] = useState<PendingReview[]>(MOCK_PENDING);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: action } : r));
  };

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
                <div className="text-3xl font-black italic text-secondary dark:text-white">{reviews.filter(r => r.status === 'pending').length}</div>
             </div>
             <div className="p-6 bg-secondary dark:bg-slate-800 rounded-3xl text-white shadow-xl text-center min-w-[140px]">
                <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Vérifiés</div>
                <div className="text-3xl font-black italic text-primary">1,420</div>
             </div>
          </div>
        </header>

        {/* Review Queue */}
        <div className="grid gap-8">
           {reviews.map((review) => (
             <div key={review.id} className={clsx(
               "bg-white dark:bg-slate-900 rounded-[3rem] p-8 lg:p-12 border transition-all duration-500 relative overflow-hidden",
               review.status === 'pending' ? "border-slate-100 dark:border-white/5 opacity-100" : "border-transparent opacity-50 grayscale scale-95"
             )}>
                {/* Status Overlay */}
                {review.status !== 'pending' && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
                     <div className={clsx(
                       "px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.5em] shadow-2xl",
                       review.status === 'approved' ? "bg-emerald-500 text-white shadow-emerald-500/30" : "bg-rose-500 text-white shadow-rose-500/30"
                     )}>
                        {review.status === 'approved' ? 'Validé & Points Attribués' : 'Rejeté / Preuve Insuffisante'}
                     </div>
                  </div>
                )}

                <div className="flex flex-col lg:flex-row gap-12 relative z-10">
                   {/* Narrative Section */}
                   <div className="flex-1 space-y-8">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center font-black text-primary border border-slate-200 dark:border-white/10">{review.userName[0]}</div>
                            <div>
                               <div className="text-sm font-black text-secondary dark:text-white uppercase italic">{review.userName}</div>
                               <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                  <Calendar className="w-3 h-3" /> Soumis le {review.date}
                               </div>
                            </div>
                         </div>
                         <ScoreBadge score={review.rating} size="sm" />
                      </div>

                      <div className="space-y-4">
                         <div className="text-[10px] font-black uppercase tracking-widest text-primary">Commentaire :</div>
                         <p className="text-lg font-bold text-slate-600 dark:text-slate-300 italic leading-relaxed">
                            "{review.comment}"
                         </p>
                         <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-white/5 w-fit px-4 py-2 rounded-full">
                            <FileText className="w-4 h-4" /> Projet : {review.projectName}
                         </div>
                      </div>
                   </div>

                   {/* Proof Section */}
                   <div className="w-full lg:w-96 space-y-6">
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pièce Jointe / Preuve d'Achat</div>
                      <div className="aspect-video bg-slate-100 dark:bg-slate-800 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/10 flex flex-col items-center justify-center gap-4 group cursor-pointer hover:border-primary/50 transition-colors">
                         < Eye className="w-8 h-8 text-slate-300 group-hover:text-primary transition-colors" />
                         <span className="text-[9px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-secondary dark:group-hover:text-white">Ouvrir le document PDF</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <button 
                           onClick={() => handleAction(review.id, 'rejected')}
                           className="flex items-center justify-center gap-2 py-4 bg-rose-500/10 text-rose-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                         >
                            <XCircle className="w-4 h-4" /> Rejeter
                         </button>
                         <button 
                           onClick={() => handleAction(review.id, 'approved')}
                           className="flex items-center justify-center gap-2 py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-emerald-500/20"
                         >
                            <CheckCircle className="w-4 h-4" /> Approuver
                         </button>
                      </div>
                   </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -bottom-12 -left-12 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                   <ShieldCheck className="w-48 h-48" />
                </div>
             </div>
           ))}
        </div>

      </div>
    </main>
  );
}
