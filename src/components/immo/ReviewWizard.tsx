'use client';

'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Check, ArrowRight, ArrowLeft, FileText } from 'lucide-react';
import { clsx } from 'clsx';

const STEPS = [
  'Qualification',
  'Relation',
  'Notation',
  'Détails',
  'Preuves'
];

export const ReviewWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    role: '',
    relation: '',
    ratings: {
      finishing: 0,
      delay: 0,
      sav: 0,
      conformity: 0
    },
    comment: '',
    proof: null as File | null
  });

  const next = () => setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  const back = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-[3rem] p-12 border border-slate-100 dark:border-white/5 shadow-luxury">
      {/* Progress Stepper */}
      <div className="flex justify-between mb-16 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -translate-y-1/2 -z-10" />
        {STEPS.map((step, idx) => (
          <div key={step} className="flex flex-col items-center gap-3">
            <div className={clsx(
              "w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all border-4",
              idx <= currentStep ? "bg-primary text-white border-primary/20" : "bg-white dark:bg-slate-900 text-slate-300 border-slate-100 dark:border-white/5"
            )}>
              {idx < currentStep ? <Check className="w-5 h-5" /> : idx + 1}
            </div>
            <span className={clsx(
              "text-[8px] font-black uppercase tracking-widest",
              idx <= currentStep ? "text-primary" : "text-slate-400"
            )}>{step}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 0 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div className="text-center">
              <h2 className="text-3xl font-black text-secondary dark:text-white uppercase italic tracking-tighter mb-2">Qui êtes-vous ?</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nous devons qualifier votre profil pour pondérer votre avis.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Acheteur', 'Résident', 'Investisseur', 'Locataire', 'Prospect'].map(role => (
                <button 
                  key={role}
                  onClick={() => setFormData({...formData, role})}
                  className={clsx(
                    "p-8 rounded-3xl border-2 transition-all text-left group",
                    formData.role === role ? "border-primary bg-primary/5" : "border-slate-50 dark:border-white/5 hover:border-primary/30"
                  )}
                >
                  <div className="text-sm font-black text-secondary dark:text-white uppercase italic mb-1">{role}</div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Lien direct avec le projet</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
            <div className="text-center">
               <h2 className="text-3xl font-black text-secondary dark:text-white uppercase italic tracking-tighter mb-2">Preuve de lien</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quel document possédez-vous pour justifier cet avis ?</p>
            </div>
            <div className="space-y-4">
               {['Contrat de réservation', 'Titre de propriété', 'Facture de syndic', 'Appel de fonds'].map(type => (
                 <button 
                   key={type}
                   onClick={() => setFormData({...formData, relation: type})}
                   className={clsx(
                     "w-full p-6 rounded-2xl border-2 flex items-center justify-between group",
                     formData.relation === type ? "border-primary bg-primary/5" : "border-slate-50 dark:border-white/5"
                   )}
                 >
                   <div className="flex items-center gap-4">
                     <FileText className="w-5 h-5 text-primary" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-secondary dark:text-white">{type}</span>
                   </div>
                   <div className="w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:border-primary">
                      {formData.relation === type && <div className="w-3 h-3 bg-primary rounded-full" />}
                   </div>
                 </button>
               ))}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
            <div className="text-center">
               <h2 className="text-3xl font-black text-secondary dark:text-white uppercase italic tracking-tighter mb-2">Notation détaillée</h2>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Évaluez précisément les dimensions du projet.</p>
            </div>
            <div className="grid gap-8">
              {Object.keys(formData.ratings).map((key) => (
                <div key={key} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{key === 'finishing' ? 'Qualité des finitions' : key === 'delay' ? 'Respect des délais' : key === 'sav' ? 'Service Après Vente' : 'Conformité au plan'}</span>
                    <span className="text-lg font-black text-primary italic">{(formData.ratings as any)[key]}/10</span>
                  </div>
                  <div className="flex gap-2">
                    {[1,2,3,4,5,6,7,8,9,10].map(star => (
                      <button 
                        key={star}
                        onClick={() => {
                           const newRatings = {...formData.ratings, [key]: star};
                           setFormData({...formData, ratings: newRatings});
                        }}
                        className={clsx(
                          "flex-1 h-3 rounded-full transition-all",
                          star <= (formData.ratings as any)[key] ? "bg-primary" : "bg-slate-100 dark:bg-slate-800"
                        )}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-16 pt-8 border-t border-slate-100 dark:border-white/5 flex justify-between">
        <button 
          onClick={back}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-secondary disabled:opacity-0 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Précédent
        </button>
        <button 
          onClick={next}
          className="flex items-center gap-3 px-10 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-amber-600 transition-all active:scale-95"
        >
          {currentStep === STEPS.length - 1 ? 'Soumettre' : 'Continuer'} <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
