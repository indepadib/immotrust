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
    projectId: 'proj-1',
    ratingOverall: 4,
    ratingDelivery: 2,
    ratingQuality: 3,
    ratingAftersales: 4,
    ratingValueForMoney: 5,
    title: "Retard et Finitions",
    body: "Retard de 6 mois sur la livraison et finitions trs dcevantes dans les parties communes. Le promoteur ne rpond plus  nos appels.",
    reviewStatus: 'pending',
    purchaseVerified: true,
    reviewerType: 'buyer',
    createdAt: '2024-03-20T10:00:00Z',
  }
];

export const ModerationQueue = () => {
  const [reviews, setReviews] = useState(MOCK_PENDING_REVIEWS);

  const handleAction = (id: string, _status: 'published' | 'rejected') => {
    setReviews((prev: ImmoReview[]) => prev.filter(r => r.id !== id));
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
                         review.reviewerType === 'buyer' ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/10" : "text-amber-500 border-amber-500/20 bg-amber-500/10"
                       )}>
                         {review.reviewerType}
                       </span>
                       <ScoreBadge score={review.ratingOverall} size="sm" />
                    </div>
                  </div>

                  <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5 relative">
                     <MessageSquare className="absolute -top-3 -right-3 w-8 h-8 text-primary/10" />
                     <p className="text-sm font-bold text-secondary dark:text-white leading-relaxed italic">
                        "{review.body}"
                     </p>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                     {[
                       { k: 'Livraison', v: review.ratingDelivery },
                       { k: 'Qualit', v: review.ratingQuality },
                       { k: 'SAV', v: review.ratingAftersales },
                       { k: 'Prix/Value', v: review.ratingValueForMoney },
                     ].map((item) => (
                       <div key={item.k} className="text-center">
                          <div className="text-[7px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{item.k}</div>
                          <div className="text-xs font-black text-primary italic">{item.v}/5</div>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="w-full lg:w-80 space-y-4">
                    <div className="p-6 bg-secondary dark:bg-slate-950 rounded-3xl border border-white/5 shadow-2xl flex flex-col items-center justify-center text-center">
                       <Shield className="w-12 h-12 text-primary mb-4" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white">Vrification Stricte Requise</span>
                       <p className="text-[8px] font-bold text-slate-400 mt-2">Ce projet n'a pas encore de preuves numriques qualifies dans cette version.</p>
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
                       {AutoModerator.screenReview(review).map((flag: any, idx: number) => (
                         <div key={idx} className={clsx(
                           "flex items-start gap-3 p-3 rounded-xl border",
                           flag.severity === 'high' ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                         )}>
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
