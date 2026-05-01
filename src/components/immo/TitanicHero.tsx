'use client';

import React, { useState } from 'react';
import { ProjectService } from '@/lib/immo/ProjectService';
import Link from 'next/link';
import { Search, ChevronDown, Activity, ShieldCheck, TrendingUp, MapPin, Building2, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';

export const TitanicHero = () => {
  const router = useRouter();
  const [stats, setStats] = React.useState({ projectCount: 0, cityCount: 0 });
  const [selectedCity, setSelectedCity] = useState('');
  const [isCityOpen, setIsCityOpen] = useState(false);

  const cities = ['Casablanca', 'Zenata', 'Bouskoura', 'Dar Bouazza', 'Rabat'];

  React.useEffect(() => {
    ProjectService.getGlobalStats().then(setStats);
  }, []);

  const handleLaunch = () => {
    if (selectedCity) {
      router.push(`/immo/projects?city=${selectedCity}`);
    } else {
      router.push('/immo/projects');
    }
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden bg-white dark:bg-slate-950">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      {/* Main Hook */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-slate-50 dark:bg-white/5 rounded-full border border-slate-100 dark:border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4">
           <Activity className="w-4 h-4 text-primary animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Live : {stats.projectCount} Projets Audités dans {stats.cityCount} Villes</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.85] mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
           L'Immobilier <br />
           <span className="text-primary translate-x-4 inline-block drop-shadow-xl">Vérifié</span>. <br />
        </h1>

        <p className="max-w-2xl mx-auto text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight italic mb-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
           Trouvez votre futur foyer en toute sérénité. <br />
           L'infrastructure souveraine de confiance immobilière au Maroc.
        </p>

        {/* Discovery Command Center */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-4 rounded-[3.5rem] shadow-2xl border border-slate-100 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center animate-in fade-in zoom-in duration-1000 delay-500">
           
           {/* City Selector */}
           <div className="flex-1 relative w-full">
              <button 
                onClick={() => setIsCityOpen(!isCityOpen)}
                className="w-full flex items-center gap-6 px-8 py-6 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-left group"
              >
                 <MapPin className={clsx("w-6 h-6 transition-colors", selectedCity ? "text-primary" : "text-slate-400")} />
                 <div className="flex-1">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Étape 1 : Ville</div>
                    <div className="text-xl font-black uppercase italic text-secondary dark:text-white">
                       {selectedCity || "Choisir une ville"}
                    </div>
                 </div>
                 <ChevronDown className={clsx("w-5 h-5 text-slate-400 transition-transform", isCityOpen && "rotate-180")} />
              </button>

              {isCityOpen && (
                <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-[2.5rem] shadow-2xl z-50 p-4 overflow-hidden animate-in fade-in slide-in-from-top-4">
                   {cities.map(city => (
                     <button 
                       key={city}
                       onClick={() => {
                         setSelectedCity(city);
                         setIsCityOpen(false);
                       }}
                       className="w-full text-left px-8 py-4 rounded-2xl hover:bg-primary/10 text-lg font-black uppercase italic text-secondary dark:text-white transition-all hover:text-primary"
                     >
                       {city}
                     </button>
                   ))}
                </div>
              )}
           </div>
           
           <div className="hidden md:flex h-12 w-px bg-slate-100 dark:bg-white/10" />

           {/* Project Selection Hint */}
           <div className="flex-1 flex items-center justify-between px-8 text-left group opacity-50">
              <div>
                 <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Étape 2 : Projet</div>
                 <div className="text-xl font-black uppercase italic text-secondary dark:text-white">Exploration...</div>
              </div>
              <Building2 className="w-6 h-6 text-slate-400" />
           </div>

           <button 
             onClick={handleLaunch}
             className="w-full md:w-auto px-12 py-7 bg-primary text-white rounded-[2.5rem] font-black text-[12px] uppercase tracking-widest shadow-luxury-primary hover:scale-105 transition-all flex items-center justify-center gap-3 group"
           >
              Lancer l'Audit <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* Persona Fast-Track */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-top-4 duration-1000 delay-700">
           <Link href="/immo/projects?persona=buyer" className="group flex items-center gap-4 px-6 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform"><ShieldCheck className="w-5 h-5" /></div>
              <div className="text-left">
                 <div className="text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest leading-none mb-1 text-left">Je suis un Particulier</div>
                 <div className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Achat Maison Principale</div>
              </div>
           </Link>
           <Link href="/immo/projects?persona=investor" className="group flex items-center gap-4 px-6 py-4 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl hover:border-primary/50 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform"><TrendingUp className="w-5 h-5" /></div>
              <div className="text-left">
                 <div className="text-[10px] font-black text-secondary dark:text-white uppercase tracking-widest leading-none mb-1">Je suis un Investisseur</div>
                 <div className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">ROI & Rendement Locatif</div>
              </div>
           </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Audit Souverain 42 Points</span>
           </div>
           <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              <span className="text-[10px] font-black uppercase tracking-widest">Promoteurs Certifiés</span>
           </div>
        </div>
      </div>
    </div>
  );
};
