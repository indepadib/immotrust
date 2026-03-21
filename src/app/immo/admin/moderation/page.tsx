import React from 'react';
import { ModerationQueue } from '@/components/immo/ModerationQueue';
import { Shield, Clock, CheckCircle, XCircle, LayoutDashboard, Settings, LogOut } from 'lucide-react';

export default function AdminModerationPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-secondary dark:bg-slate-900 border-r border-white/5 p-8 flex flex-col justify-between hidden lg:flex">
        <div className="space-y-12">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg">
                <Shield className="w-6 h-6" />
             </div>
             <span className="text-sm font-black text-white uppercase italic tracking-tighter">ImmoTrust Admin</span>
          </div>

          <nav className="space-y-2">
             {[
               { icon: LayoutDashboard, label: 'Tableau de bord', active: false },
               { icon: Clock, label: 'Modération', active: true },
               { icon: CheckCircle, label: 'Vérifiés', active: false },
               { icon: XCircle, label: 'Rejetés', active: false },
               { icon: Settings, label: 'Paramètres', active: false },
             ].map((item) => (
               <button key={item.label} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${item.active ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-slate-400 hover:bg-white/5'}`}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
               </button>
             ))}
          </nav>
        </div>

        <button className="flex items-center gap-4 px-6 py-4 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">
           <LogOut className="w-4 h-4" />
           Déconnexion
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8 lg:p-16">
        <div className="max-w-6xl mx-auto space-y-12">
           <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="space-y-2">
                 <h1 className="text-4xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Noyau de Modération</h1>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gérez la couche de vérité et les preuves soumises par la communauté.</p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="px-6 py-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-white/5 shadow-luxury-soft">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mr-3">Session Admin :</span>
                    <span className="text-[10px] font-black text-secondary dark:text-white uppercase italic">EL MODAFAR A.</span>
                 </div>
              </div>
           </header>

           <ModerationQueue />
        </div>
      </div>
    </main>
  );
}
