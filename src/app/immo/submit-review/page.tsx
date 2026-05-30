import React from 'react';
import { ReviewWizard } from '@/components/immo/ReviewWizard';
import { ShieldCheck, Info, MessageSquare } from 'lucide-react';

export default function SubmitReviewPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
               <MessageSquare className="w-5 h-5 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Contribution Vérifiée</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85]">
               Déposez votre <br /> <span className="text-primary not-italic">Vérité</span>.
            </h1>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] max-w-lg mx-auto">
               Votre expérience aide des milliers d'autres investisseurs à éviter les pièges et à choisir le bon partenaire.
            </p>
          </div>

          {/* Information Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                   <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                   <h4 className="text-sm font-black text-secondary dark:text-white uppercase italic">Anonymat Garanti</h4>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Nous ne partageons jamais vos documents personnels avec les promoteurs. Seul votre avis est publié.</p>
                </div>
             </div>
             <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                   <Info className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                   <h4 className="text-sm font-black text-secondary dark:text-white uppercase italic">Niveau de Preuve</h4>
                   <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Les avis accompagnés d'une preuve vérifiée (contrat, facture) pèsent 2x plus dans le score du projet.</p>
                </div>
             </div>
          </div>

          {/* Wizard */}
          <ReviewWizard />
        </div>
      </div>
    </main>
  );
}
