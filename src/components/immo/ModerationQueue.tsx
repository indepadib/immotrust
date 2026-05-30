import React from 'react';
import { Shield, CheckCircle2, XCircle, Eye, FileText, User, Award } from 'lucide-react';
import { ImmoReview } from '@/types/immo';
import { FraudDetector } from '@/lib/immo/FraudDetector';

interface ModerationQueueProps {
  pendingReviews: ImmoReview[];
}

export const ModerationQueue = ({ pendingReviews }: ModerationQueueProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Laboratoire de Modération</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Établissez la vérité souveraine • Karma Expert +50</p>
        </div>
        <div className="flex items-center gap-4 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
           <Award className="w-5 h-5 text-primary" />
           <span className="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Accès Expert Alpha</span>
        </div>
      </div>

      <div className="grid gap-6">
        {pendingReviews.map((review) => {
          const fraudAnalysis = FraudDetector.analyzeReview(review);
          
          return (
            <div key={review.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft overflow-hidden group">
              <div className="p-8 lg:p-10 flex flex-col lg:flex-row gap-10">
                
                {/* Evidence Panel */}
                <div className="w-full lg:w-72 shrink-0">
                  <div className="aspect-[3/4] rounded-3xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 relative overflow-hidden flex flex-col items-center justify-center group-hover:border-primary/30 transition-all">
                    <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                      <Shield className="w-12 h-12 text-white/50 mb-4" />
                      <p className="text-[10px] font-black text-white uppercase tracking-widest leading-relaxed">Preuve de Réservation<br /><span className="text-primary italic">Floutage Actif</span></p>
                      <button className="mt-8 px-6 py-3 bg-white text-secondary rounded-xl font-black text-[9px] uppercase tracking-widest hover:scale-105 transition-all">
                         Inspecter (HD)
                      </button>
                    </div>
                    <FileText className="w-20 h-20 text-slate-200 opacity-20" />
                  </div>
                </div>

                {/* Review Panel */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center"><User className="w-5 h-5 text-slate-400" /></div>
                        <div>
                           <div className="text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest">Contributeur Tier-3</div>
                           <div className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">KARMA: 420 • {review.reviewerType}</div>
                        </div>
                     </div>
                     <div className="flex items-center gap-4">
                        {fraudAnalysis.isSuspicious && (
                          <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full text-[8px] font-black text-rose-500 uppercase tracking-widest animate-pulse">
                             Risque Fraude: {fraudAnalysis.score}%
                          </div>
                        )}
                        <div className="text-xl font-black text-primary italic">{review.ratingOverall}/10</div>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-lg font-black text-secondary dark:text-white uppercase italic tracking-tight italic">"{review.title || 'Expérience de livraison'}"</h3>
                     <p className="text-sm font-medium text-slate-500 leading-relaxed italic max-w-2xl">{review.body}</p>
                     
                     {fraudAnalysis.isSuspicious && (
                       <p className="text-[9px] font-bold text-rose-400 uppercase tracking-widest bg-rose-50 dark:bg-rose-950/20 px-4 py-2 rounded-xl w-fit border border-rose-500/10">
                          ⚠️ {fraudAnalysis.reason}
                       </p>
                     )}
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                     <div className="px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Relation: {review.relationType || 'Acheteur'}
                     </div>
                     <div className="px-4 py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-[9px] font-black text-emerald-500 uppercase tracking-widest">
                        Preuve Fournie
                     </div>
                  </div>
                </div>

                {/* Action Sidebar */}
                <div className="w-full lg:w-48 flex flex-col gap-3 justify-center lg:border-l lg:border-slate-100 lg:dark:border-white/5 lg:pl-10">
                   <button className="w-full py-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Valider
                   </button>
                   <button className="w-full py-4 bg-rose-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-rose-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2">
                      <XCircle className="w-4 h-4" /> Rejeter
                   </button>
                   <button className="w-full py-4 bg-slate-100 dark:bg-white/5 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:text-primary transition-all flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" /> Dispute
                   </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
