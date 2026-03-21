'use client';

import { ImmoReview } from '@/types/immo';
import { ScoreBadge } from './ScoreBadge';
import { AutoModerator } from '@/lib/immo/AutoModerator';
import { AlertTriangle, Info, Shield, CheckCircle, User, MessageSquare, Eye, XCircle, AlertCircle, FileText } from 'lucide-react';
import React, { useState } from 'react';
import { clsx } from 'clsx';

const MOCK_PENDING_REVIEWS: ImmoReview[] = [
  {
    id: 'rev-101',
    userId: 'user-45',
    targetType: 'project',
    targetId: 'proj-1',
    relationType: 'buyer',
    verificationLevel: 'proof_submitted',
    moderationStatus: 'pending',
    ratings: {
      global: 4,
      finishing: 3,
      delay: 2,
      conformity: 5
    },
    commentRaw: "Retard de 6 mois sur la livraison et finitions trs dcevantes dans les parties communes. Le promoteur ne rpond plus  nos appels.",
    createdAt: '2024-03-20T10:00:00Z',
    proofs: [
      {
        id: 'proof-1',
        reviewId: 'rev-101',
        type: 'Contrat de rservation',
        fileUrl: '/mock/contracts/cfc-res-1.pdf',
        status: 'pending',
        createdAt: '2024-03-20T10:05:00Z'
      }
    ]
  }
];

export const ModerationQueue = () => {
  const [reviews, setReviews] = useState(MOCK_PENDING_REVIEWS);

  const handleAction = (id: string, status: 'published' | 'rejected') => {
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 p-3 rounded-2xl">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-secondary dark:text-white uppercase italic tracking-tight">File de Modration</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{reviews.length} avis en attente de vrification</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-20 text-center border border-dashed border-slate-200 dark:border-white/5">
             <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
             <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Toute la file est traite. <br />La couche de vrit est  jour.</p>
          </div>
        ) : (
          reviews.map(review => (
            <div key={review.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 shadow-luxury-soft">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-400" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-secondary dark:text-white">{review.userId}</div>
                        <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Post le {new Date(review.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <span className={clsx(
                         "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
                         review.relationType === 'buyer' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-amber-500 border-amber-500/20 bg-amber-500/10"
                       )}>
                         {review.relationType}
                       </span>
                       <ScoreBadge score={review.ratings.global} size="sm" />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5 relative">
                     <MessageSquare className="absolute -top-3 -right-3 w-8 h-8 text-primary/10" />
                     <p className="text-sm font-bold text-secondary dark:text-white leading-relaxed italic">
                        "{review.commentRaw}"
                     </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                     {Object.entries(review.ratings).filter(([k]) => k !== 'global').map(([key, val]) => (
                       <div key={key} className="text-center">
                          <div className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{key}</div>
                          <div className="text-xs font-black text-primary italic">{val}/10</div>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="w-full lg:w-80 space-y-4">
                   <div className="p-6 bg-secondary dark:bg-slate-950 rounded-3xl border border-white/5 shadow-2xl">
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white">Preuve Jointe</span>
                      </div>
                      {review.proofs?.map(proof => (
                        <div key={proof.id} className="group relative bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-primary/50 transition-all cursor-pointer">
                           <div className="text-[10px] font-black text-white truncate mb-1">{proof.type}</div>
                           <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">PDF  1.2 MB</div>
                           <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye className="w-4 h-4 text-primary" />
                           </div>
                        </div>
                      ))}
                      <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[8px] font-black uppercase tracking-[0.2em] text-white transition-all">
                         Consulter l'original
                      </button>
                   </div>

                   <div className="flex gap-2">
                      <button 
                        onClick={() => handleAction(review.id, 'rejected')}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-2xl border border-rose-500/20 transition-all active:scale-95"
                      >
                         <XCircle className="w-5 h-5" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Rejeter</span>
                      </button>
                      <button 
                        onClick={() => handleAction(review.id, 'published')}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all active:scale-95"
                      >
                         <CheckCircle className="w-5 h-5" />
                         <span className="text-[10px] font-black uppercase tracking-widest">Publier</span>
                      </button>
                   </div>
                   
                   <div className="flex items-center gap-2 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-amber-500 italic">Attention: Accusation de retard</span>
                   </div>

                   {/* AI FLAGS */}
                   <div className="space-y-2">
                      {AutoModerator.screenReview(review).map((flag, idx) => (
                        <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl border ${flag.severity === 'high' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'}`}>
                           <AlertTriangle className="w-4 h-4 shrink-0" />
                           <div className="flex flex-col">
                              <span className="text-[7px] font-black uppercase tracking-widest">IA FLAG: {flag.type}</span>
                              <span className="text-[8px] font-bold">{flag.message}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
