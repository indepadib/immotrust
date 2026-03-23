import React from 'react';
import { ShieldCheck, XCircle, Clock, FileText, Info } from 'lucide-react';
import { Project } from '@/types/immo';

interface LegalSafetyChecklistProps {
  project: Project;
}

export const LegalSafetyChecklist = ({ project }: LegalSafetyChecklistProps) => {
  const docs = [
    { name: 'Titre Foncier Éclaté (TFE)', status: 'verified', desc: 'Le titre individuel est disponible pour ce lot.' },
    { name: 'Permis d\'Habiter (PH)', status: 'pending', desc: 'En cours d\'obtention par le promoteur.' },
    { name: 'Assurance Décennale', status: 'verified', desc: 'Garantie de 10 ans sur la structure activée.' },
    { name: 'Garantie de Livraison (GFA)', status: 'verified', desc: 'Garantie bancaire de fin d\'achèvement confirmée.' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 shadow-luxury-soft">
      <div className="flex items-center justify-between mb-10">
        <div className="space-y-1">
          <h3 className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tight">Checklist de Sécurité Juridique</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vérifié par le Noyau d'Audit ImmoTrust</p>
        </div>
        <div className="p-3 bg-emerald-500/10 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
        </div>
      </div>

      <div className="grid gap-6">
        {docs.map((doc) => (
          <div key={doc.name} className="flex items-start gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-transparent hover:border-slate-100 dark:hover:border-white/10 transition-all group">
            <div className="mt-1">
              {doc.status === 'verified' ? (
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              ) : doc.status === 'pending' ? (
                <Clock className="w-5 h-5 text-amber-500" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-500" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-black text-secondary dark:text-white uppercase tracking-wider">{doc.name}</span>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                  doc.status === 'verified' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {doc.status === 'verified' ? 'Vérifié' : 'En attente'}
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 tracking-tight">{doc.desc}</p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-slate-300 hover:text-primary">
              <Info className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-10 p-6 bg-secondary dark:bg-slate-950 rounded-2xl flex items-center gap-4 border border-white/5">
        <FileText className="w-5 h-5 text-primary" />
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
          Besoin d'un audit physique ? <span className="text-white cursor-pointer hover:text-primary transition-colors">Commander un rapport notarié.</span>
        </p>
      </div>
    </div>
  );
};
