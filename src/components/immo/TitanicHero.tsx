'use client';

import React, { useState, useEffect } from 'react';
import { ProjectService } from '@/lib/immo/ProjectService';
import Link from 'next/link';
import { Search, ChevronDown, Activity, ShieldCheck, TrendingUp, MapPin, Building2, ArrowRight, Play, Zap, Globe, Lock, CheckCircle, Target, Award } from 'lucide-react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';

export const TitanicHero = () => {
  const router = useRouter();
  const [stats, setStats] = React.useState({ projectCount: 0, cityCount: 0 });
  const [selectedCity, setSelectedCity] = useState('');
  const [isCityOpen, setIsCityOpen] = useState(false);

  const cities = ['Casablanca', 'Zenata', 'Bouskoura', 'Dar Bouazza', 'Rabat'];

  useEffect(() => {
    ProjectService.getGlobalStats().then(setStats);
  }, []);

  const handleLaunch = () => {
    // If no city is selected, we still want to redirect to projects listing
    const targetCity = selectedCity || '';
    router.push(`/immo/projects${targetCity ? `?city=${targetCity}` : ''}`);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 overflow-hidden bg-white dark:bg-[#080808]">
      
      {/* Subtle Aesthetic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
         <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" 
              style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`, backgroundSize: '48px 48px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Minimalist Trust Label */}
        <div className="inline-flex items-center gap-4 px-5 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/10 mb-10 animate-in fade-in slide-in-from-top-4 duration-1000">
           <ShieldCheck className="w-4 h-4 text-primary" />
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {stats.projectCount} Audits Certifiés · {stats.cityCount} Villes
           </span>
        </div>

        {/* Refined Title - Less Aggressive, More Premium */}
        <div className="max-w-5xl mx-auto mb-10">
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-secondary dark:text-white uppercase tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700">
              L'Immobilier <span className="text-primary italic">Audité</span> <br />
              Pour des Choix <span className="underline decoration-primary/30 decoration-8 underline-offset-8">Sereins</span>.
           </h1>
        </div>

        <p className="max-w-2xl mx-auto text-base md:text-lg font-medium text-slate-500 dark:text-slate-400 tracking-tight mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
           Accédez à la donnée réelle du marché immobilier marocain. <br />
           Audits promoteurs, prix vérifiés et analyses de risques.
        </p>

        {/* Clean Search & Discovery Center */}
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in zoom-in duration-1000 delay-300">
           <div className="bg-white dark:bg-slate-900 p-3 rounded-[3rem] shadow-luxury border border-slate-100 dark:border-white/10 flex flex-col md:flex-row gap-3 items-center">
              
              {/* City Selection Dropdown */}
              <div className="flex-1 relative w-full group">
                 <button 
                   onClick={() => setIsCityOpen(!isCityOpen)}
                   className="w-full flex items-center gap-5 px-8 py-6 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-left"
                 >
                    <MapPin className={clsx("w-5 h-5 transition-colors", selectedCity ? "text-primary" : "text-slate-400")} />
                    <div className="flex-1">
                       <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Localisation</div>
                       <div className="text-lg font-black uppercase text-secondary dark:text-white">
                          {selectedCity || "Choisir une ville"}
                       </div>
                    </div>
                    <ChevronDown className={clsx("w-5 h-5 text-slate-400 transition-transform duration-500", isCityOpen && "rotate-180")} />
                 </button>

                 {isCityOpen && (
                   <div className="absolute top-[110%] left-0 right-0 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-luxury z-[100] animate-in fade-in slide-in-from-top-4">
                      <div className="grid grid-cols-1 gap-1">
                         {cities.map(city => (
                           <button 
                             key={city}
                             onClick={() => {
                               setSelectedCity(city);
                               setIsCityOpen(false);
                             }}
                             className="w-full text-left px-8 py-4 rounded-2xl hover:bg-primary/10 text-base font-black uppercase text-secondary dark:text-white transition-all hover:text-primary"
                           >
                             {city}
                           </button>
                         ))}
                      </div>
                   </div>
                 )}
              </div>

              {/* Minimalist Action Button */}
              <button 
                onClick={handleLaunch}
                className="w-full md:w-auto px-12 py-7 bg-secondary dark:bg-white text-white dark:text-secondary rounded-[2.5rem] font-black text-[11px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-3 group"
              >
                 Lancer l'Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
           </div>

           {/* Quick Access Pills */}
           <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              {[
                { label: 'Particulier', icon: Target, href: '/immo/projects?persona=buyer' },
                { label: 'Investisseur', icon: TrendingUp, href: '/immo/projects?persona=investor' },
                { label: 'Analyses Marché', icon: Activity, href: '/immo/compare' }
              ].map((pill, i) => (
                <Link key={i} href={pill.href} className="flex items-center gap-3 px-5 py-3 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/10 hover:border-primary/50 transition-all group">
                   <pill.icon className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
                   <span className="text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest">{pill.label}</span>
                </Link>
              ))}
           </div>
        </div>

        {/* Minimalist Trust Badges */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 hover:opacity-100 transition-opacity duration-1000">
           {[
             { label: "Donnée Vérifiée", icon: CheckCircle },
             { label: "Zéro Partenariat", icon: ShieldCheck },
             { label: "Historique Prom.", icon: Building2 },
             { label: "Scores Terrain", icon: Award }
           ].map((badge, i) => (
             <div key={i} className="flex flex-col items-center gap-3">
                <badge.icon className="w-6 h-6 text-slate-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{badge.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
