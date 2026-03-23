'use client';

import React, { useState } from 'react';
import { SeedService } from '@/lib/immo/SeedService';
import { Database, Zap, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function SeedPage() {
  const [status, setStatus] = useState<'idle' | 'seeding' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [steps, setSteps] = useState([
    { id: 'devs', label: 'Hydratation Promoteurs', status: 'idle' },
    { id: 'projs', label: 'Indexation Projets Audités', status: 'idle' },
    { id: 'market', label: 'Analyse Pulsar Marché', status: 'idle' },
    { id: 'experts', label: 'Gouvernance & Karma Experts', status: 'idle' }
  ]);

  const handleSeed = async () => {
    setStatus('seeding');
    
    const updateStep = (id: string, s: 'loading' | 'done') => {
      setSteps(prev => prev.map(step => step.id === id ? { ...step, status: s } : step));
    };

    try {
      updateStep('devs', 'loading');
      await new Promise(r => setTimeout(r, 800)); // Sim for UI
      updateStep('devs', 'done');
      
      updateStep('projs', 'loading');
      await new Promise(r => setTimeout(r, 800));
      updateStep('projs', 'done');
      
      updateStep('market', 'loading');
      await new Promise(r => setTimeout(r, 800));
      updateStep('market', 'done');
      
      updateStep('experts', 'loading');
      await SeedService.seedAll();
      updateStep('experts', 'done');

      setStatus('success');
      setMessage('Données synchronisées. L\'écosystème ImmoTrust est prêt.');
    } catch (err: any) {
      setStatus('error');
      setMessage(`Échec : ${err.message}`);
    }
  };

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(6,182,212,0.1),transparent)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />

      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 shadow-luxury border border-white/5 relative z-10 space-y-10 group">
        <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 group-hover:scale-110 transition-transform duration-700 shadow-xl shadow-primary/5">
           <Database className="w-12 h-12 text-primary" />
        </div>
        
        <div className="space-y-4 text-center">
          <h1 className="text-3xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-none">Initialization <span className="text-primary not-italic">Sovereign</span></h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] leading-relaxed">
             Propulsez la base de données vers l'excellence.
          </p>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5 pt-10">
           {steps.map(step => (
             <div key={step.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{step.label}</span>
                {step.status === 'idle' && <Database className="w-4 h-4 text-slate-200" />}
                {step.status === 'loading' && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
                {step.status === 'done' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
             </div>
           ))}
        </div>

        <div className="pt-6">
          {status === 'idle' && (
            <button 
              onClick={handleSeed}
              className="w-full py-6 bg-primary text-secondary rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-luxury active:scale-95"
            >
               <Zap className="w-4 h-4 inline mr-2" /> Initialiser l'Écosystème
            </button>
          )}

          {status === 'success' && (
            <div className="space-y-6 text-center">
              <a href="/immo" className="block w-full py-6 bg-secondary dark:bg-white text-white dark:text-secondary rounded-[2rem] font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all">
                 Entrer dans le Dashboard
              </a>
            </div>
          )}

          {status === 'error' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-rose-500">
                 <AlertCircle className="w-5 h-5" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Erreur Critique</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500">{message}</p>
              <button 
                onClick={() => setStatus('idle')}
                className="w-full py-5 bg-slate-100 dark:bg-white/5 text-secondary dark:text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all"
              >
                 Réessayer
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
