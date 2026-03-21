'use client';

import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, Wallet, Percent, ArrowRight, Info, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';

export const YieldSimulator = () => {
  const [inputs, setInputs] = useState({
    price: 1500000,
    surface: 65,
    rent: 8500,
    charges: 600,
    loanAmount: 1200000,
    loanRate: 4.5,
    loanDuration: 20
  });

  const [results, setResults] = useState({
    grossYield: 0,
    netYield: 0,
    monthlyPayment: 0,
    cashFlow: 0
  });

  useEffect(() => {
    const annualRent = inputs.rent * 12;
    const annualCharges = (inputs.charges + (inputs.price * 0.01)) ; // + 1% tax/insurance
    const gross = (annualRent / inputs.price) * 100;
    const net = ((annualRent - (inputs.charges * 12)) / inputs.price) * 100;
    
    // Monthly payment formula: M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1 ]
    const r = inputs.loanRate / 100 / 12;
    const n = inputs.loanDuration * 12;
    const payment = inputs.loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    
    const cf = inputs.rent - payment - inputs.charges;

    setResults({
      grossYield: gross,
      netYield: net,
      monthlyPayment: payment,
      cashFlow: cf
    });
  }, [inputs]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[3.5rem] p-12 border border-slate-100 dark:border-white/5 shadow-luxury">
        <div className="flex items-center gap-4 mb-12">
           <div className="bg-primary/20 p-4 rounded-2xl">
              <Calculator className="w-8 h-8 text-primary" />
           </div>
           <div>
              <h2 className="text-3xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Simulateur Stratégique</h2>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ajustez vos paramètres pour valider la rentabilité.</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    Prix d'acquisition <span className="text-secondary dark:text-white">{inputs.price.toLocaleString()} MAD</span>
                 </label>
                 <input 
                    type="range" min="500000" max="10000000" step="50000" 
                    value={inputs.price} onChange={(e) => setInputs({...inputs, price: Number(e.target.value)})}
                    className="w-full accent-primary bg-slate-100 dark:bg-slate-800 h-2 rounded-full appearance-none cursor-pointer"
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex justify-between">
                    Loyer Mensuel Estimé <span className="text-primary">{inputs.rent.toLocaleString()} MAD</span>
                 </label>
                 <input 
                    type="range" min="3000" max="50000" step="500" 
                    value={inputs.rent} onChange={(e) => setInputs({...inputs, rent: Number(e.target.value)})}
                    className="w-full accent-primary h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer"
                 />
              </div>
              <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
                 <div className="flex items-center gap-3 text-emerald-500 mb-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Conseil ImmoTrust</span>
                 </div>
                 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
                    Le loyer de {inputs.rent} MAD est cohérent avec la moyenne du quartier (CFC) pour un {inputs.surface}m².
                 </p>
              </div>
           </div>

           <div className="space-y-8 p-8 bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
              <div className="space-y-2">
                 <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prêt Immobilier (Principal)</div>
                 <div className="flex items-center gap-4">
                    <input 
                      type="number" value={inputs.loanAmount} onChange={(e) => setInputs({...inputs, loanAmount: Number(e.target.value)})}
                      className="flex-1 bg-white dark:bg-slate-900 border-none rounded-xl p-4 font-black italic text-secondary dark:text-white"
                    />
                    <div className="text-xs font-black text-slate-400 italic">MAD</div>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Taux (%)</div>
                    <input 
                      type="number" value={inputs.loanRate} step="0.1" onChange={(e) => setInputs({...inputs, loanRate: Number(e.target.value)})}
                      className="w-full bg-white dark:bg-slate-900 border-none rounded-xl p-4 font-black italic text-secondary dark:text-white"
                    />
                 </div>
                 <div className="space-y-2">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Durée (Ans)</div>
                    <input 
                      type="number" value={inputs.loanDuration} onChange={(e) => setInputs({...inputs, loanDuration: Number(e.target.value)})}
                      className="w-full bg-white dark:bg-slate-900 border-none rounded-xl p-4 font-black italic text-secondary dark:text-white"
                    />
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="space-y-6">
         <div className="bg-secondary dark:bg-slate-900 rounded-[3rem] p-10 text-white border border-white/5 shadow-luxury relative overflow-hidden group">
            <div className="relative z-10 space-y-8">
               <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Verdict Rentabilité</span>
               </div>
               
               <div className="space-y-6">
                  <div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rendement Brut</div>
                     <div className="text-5xl font-black italic text-white leading-none group-hover:text-primary transition-colors">{results.grossYield.toFixed(2)}%</div>
                  </div>
                  <div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Rentabilité Nette Est.</div>
                     <div className="text-3xl font-black italic text-emerald-500 leading-none">{results.netYield.toFixed(2)}%</div>
                  </div>
               </div>

               <div className="pt-8 border-t border-white/5">
                  <div className="flex justify-between items-end">
                     <div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Cash-Flow Mensuel</div>
                        <div className={clsx(
                          "text-2xl font-black italic leading-none",
                          results.cashFlow >= 0 ? "text-emerald-500" : "text-rose-500"
                        )}>
                          {Math.round(results.cashFlow).toLocaleString()} MAD
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mensualité</div>
                        <div className="text-xl font-black italic text-white/50">{Math.round(results.monthlyPayment).toLocaleString()} MAD</div>
                     </div>
                  </div>
               </div>
            </div>
            <TrendingUp className="absolute -bottom-12 -right-12 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
         </div>

         <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-white/5 shadow-luxury-soft">
            <div className="flex items-center gap-3 mb-4">
               <Info className="w-5 h-5 text-primary" />
               <span className="text-[10px] font-black uppercase tracking-widest text-secondary dark:text-white">Note de Calcul</span>
            </div>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
               Simulation basée sur un apport de {Math.round(inputs.price - inputs.loanAmount).toLocaleString()} MAD et une taxe de profit immobilier estimée. Document non contractuel.
            </p>
         </div>
      </div>
    </div>
  );
};
