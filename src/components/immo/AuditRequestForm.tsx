'use client';

import React, { useState } from 'react';
import { Send, FileText, MapPin, Building, ShieldCheck, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';

export const AuditRequestForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setDone(true);
    }, 2000);
  };

  if (done) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] p-12 text-center space-y-6">
         <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
            <ShieldCheck className="w-10 h-10 text-white" />
         </div>
         <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Demande Enregistrée</h3>
         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
            Nos auditeurs vont inspecter les 42 points de contrôle. Vous recevrez le rapport sous 48h.
         </p>
         <button onClick={() => setDone(false)} className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline">
            Nouvelle demande
         </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-white/5 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 blur-[50px] rounded-full" />
      
      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
           <div>
              <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] font-sans mb-2 italic">Request Sovereign Audit</h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Déclenchez une expertise technique radicale</p>
           </div>
           <HelpCircle className="w-5 h-5 text-slate-600 cursor-help" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                 <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Nom du Projet</label>
                 <div className="relative">
                    <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <input 
                      required
                      placeholder="Ex: Anfa Sky"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-primary/50 transition-all font-sans"
                    />
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Secteur / Ville</label>
                 <div className="relative">
                    <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                    <input 
                       required
                       placeholder="Ex: Casablanca CFC"
                       className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-primary/50 transition-all font-sans"
                    />
                 </div>
              </div>
           </div>

           <div className="space-y-3">
              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-4 italic">Documents ou Liens (Optionnel)</label>
              <div className="relative">
                 <FileText className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                 <input 
                    placeholder="URL Mubawab ou lien de brochure"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-xs font-bold text-white focus:outline-none focus:border-primary/50 transition-all font-sans"
                 />
              </div>
           </div>

           <button 
             disabled={isSubmitting}
             className={clsx(
               "w-full py-6 flex items-center justify-center gap-3 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all relative overflow-hidden",
               isSubmitting ? "bg-white/10 text-slate-500 cursor-not-allowed" : "bg-primary text-secondary hover:scale-[1.02] active:scale-95 shadow-luxury"
             )}
           >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-slate-600 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                   Lancer l'Audit <Send className="w-4 h-4" />
                </>
              )}
           </button>
        </form>

        <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest text-center italic mt-6">
           Certification ImmoTrust — Indépendance & Rigueur Absolue
        </p>
      </div>
    </div>
  );
};
