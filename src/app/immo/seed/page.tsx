'use client';

import React, { useState } from 'react';
import { SeedService } from '@/lib/immo/SeedService';
import { Database, Zap, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function SeedPage() {
  const [status, setStatus] = useState<'idle' | 'seeding' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSeed = async () => {
    setStatus('seeding');
    setMessage('Initialisation du Noyau de Données...');
    try {
      await SeedService.seedAll();
      setStatus('success');
      setMessage('Données synchronisées avec succès. Le catalogue est maintenant réel.');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setMessage(`Échec de la synchronisation : ${err.message || 'Erreur inconnue'}`);
    }
  };

  return (
    <main className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[3rem] p-12 shadow-2xl border border-white/5 space-y-8 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
           <Database className="w-10 h-10 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Synchronisation Core</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
            Reliez l'interface aux données réelles de l'infrastructure Audit.
          </p>
        </div>

        <div className="py-6">
          {status === 'idle' && (
            <button 
              onClick={handleSeed}
              className="w-full py-5 bg-primary text-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 shadow-luxury"
            >
               <Zap className="w-4 h-4" /> Lancer la Synchronisation
            </button>
          )}

          {status === 'seeding' && (
            <div className="space-y-4">
               <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
               <p className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] animate-pulse">{message}</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6">
              <div className="flex items-center justify-center gap-2 text-emerald-500">
                 <CheckCircle2 className="w-5 h-5" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Opération Réussie</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500">{message}</p>
              <a href="/" className="block w-full py-5 bg-secondary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all">
                 Retour Accueil
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
