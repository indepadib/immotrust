'use client';

import React, { useState } from 'react';
import { SyncService } from '@/lib/SyncService';
import { AuditLogger } from '@/lib/AuditLogger';
import { Activity, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

export const SyncControlCenter = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastResult, setLastResult] = useState<any>(null);

  const startSync = async () => {
    setIsSyncing(true);
    try {
      // Mock sync for a specific project
      const result = await SyncService.syncProject('https://www.mubawab.ma/fr/a/7402844/palais-anfa-premium');
      setLastResult(result);
      await AuditLogger.logAction('system-admin', 'MANUAL_SYNC_SUCCESS', { project: result.name });
    } catch (error) {
       console.error(error);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 border border-slate-100 dark:border-white/5 shadow-2xl">
       <div className="flex items-center justify-between mb-8">
          <div>
             <h3 className="text-xl font-black uppercase italic text-secondary dark:text-white">Sync Control Center</h3>
             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Orchestration des flux de données</p>
          </div>
          <button 
            onClick={startSync}
            disabled={isSyncing}
            className={`p-4 rounded-2xl transition-all ${isSyncing ? 'bg-slate-100 animate-spin' : 'bg-primary text-white hover:shadow-luxury-primary'}`}
          >
             <RefreshCw className="w-6 h-6" />
          </button>
       </div>

       {lastResult ? (
         <div className="space-y-4 animate-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
               <CheckCircle className="w-5 h-5 text-emerald-500" />
               <div className="text-[10px] font-black text-emerald-600 uppercase italic">Projet mis à jour : {lastResult.name}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                  <div className="text-[8px] font-bold text-slate-400 uppercase">Nouveau Score</div>
                  <div className="text-xl font-black italic text-primary">{(lastResult.audit?.trustScore || lastResult.scores?.trust)?.toFixed(1)}</div>
               </div>
               <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
                  <div className="text-[8px] font-bold text-slate-400 uppercase">Signal Drifts</div>
                  <div className="text-xl font-black italic text-rose-500">None</div>
               </div>
            </div>
         </div>
       ) : (
         <div className="flex flex-col items-center py-12 text-slate-300 dark:text-white/10">
            <Activity className="w-12 h-12 mb-4 opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-widest">En attente d'activation...</span>
         </div>
       )}
    </div>
  );
};
