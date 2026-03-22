'use client';

import React from 'react';
import { Activity, TrendingUp, AlertCircle, Search } from 'lucide-react';

export const RealityMarquee = () => {
  const signals = [
    { label: 'CFC LUXURY', value: '+4.2%', icon: TrendingUp, color: 'text-emerald-500' },
    { label: 'BOUSKOURA GOLF', value: 'AUDIT OK', icon: Activity, color: 'text-primary' },
    { label: 'MARJANE MALL', value: 'SCRAPING...', icon: Search, color: 'text-slate-400' },
    { label: 'DELAYS DETECTED', value: 'ZONE: DARB', icon: AlertCircle, color: 'text-rose-500' },
    { label: 'NEW PROJECT', value: 'PRESTIGIA', icon: Activity, color: 'text-primary' },
    { label: 'YIELD PROJECTION', value: '8.4%', icon: TrendingUp, color: 'text-emerald-500' },
  ];

  return (
    <div className="w-full bg-secondary dark:bg-slate-900 border-y border-white/5 py-4 overflow-hidden relative">
      <div className="flex animate-marquee whitespace-nowrap gap-12">
        {[...signals, ...signals].map((signal, idx) => (
          <div key={idx} className="flex items-center gap-3">
             <signal.icon className={`w-4 h-4 ${signal.color}`} />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                {signal.label} : <span className={signal.color}>{signal.value}</span>
             </span>
             <div className="w-1 h-1 bg-white/10 rounded-full mx-6" />
          </div>
        ))}
      </div>
      
      {/* Gradients to fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-secondary dark:from-slate-900 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-secondary dark:from-slate-900 to-transparent z-10" />
    </div>
  );
};
