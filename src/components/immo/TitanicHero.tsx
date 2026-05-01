'use client';

import React, { useState, useEffect } from 'react';
import { ProjectService } from '@/lib/immo/ProjectService';
import Link from 'next/link';
import { Search, ChevronDown, Activity, ShieldCheck, TrendingUp, MapPin, Building2, ArrowRight, Play, Zap, Globe, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';

export const TitanicHero = () => {
  const router = useRouter();
  const [stats, setStats] = React.useState({ projectCount: 0, cityCount: 0 });
  const [selectedCity, setSelectedCity] = useState('');
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cities = ['Casablanca', 'Zenata', 'Bouskoura', 'Dar Bouazza', 'Rabat'];

  useEffect(() => {
    setIsVisible(true);
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
    <div className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden bg-white dark:bg-[#050505]">
      
      {/* Dynamic Cinematic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         {/* Deep Gradients */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
         <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[160px] animate-pulse opacity-50" />
         <div className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[200px] opacity-50" />
         
         {/* Animated Grid / Mesh */}
         <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
              style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)`, backgroundSize: '64px 64px' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        
        {/* Upper Badge Ribbon */}
        <div className="inline-flex items-center gap-6 p-2 pr-6 bg-white dark:bg-white/5 backdrop-blur-2xl rounded-full border border-slate-100 dark:border-white/10 mb-12 shadow-2xl animate-in fade-in slide-in-from-top-8 duration-1000">
           <div className="px-5 py-2.5 bg-primary rounded-full shadow-luxury-primary flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">Certifié Souverain</span>
           </div>
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                 {stats.projectCount} Dossiers Live · {stats.cityCount} Zones Audités
              </span>
           </div>
        </div>

        {/* Main Brutalist Typography */}
        <div className="relative mb-16 select-none">
           <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.82] animate-in fade-in slide-in-from-bottom-12 duration-1000">
              L'Immobilier <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary/60 not-italic translate-x-4">
                 Sous Audit.
                 <div className="absolute -bottom-4 left-0 w-full h-2 bg-primary/20 blur-xl rounded-full" />
              </span>
           </h1>
           
           {/* Floating Semantic Elements */}
           <div className="absolute -top-12 -right-12 hidden lg:flex items-center gap-3 px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl animate-float">
              <Zap className="w-5 h-5 text-primary" />
              <div className="text-left">
                 <div className="text-[10px] font-black text-secondary dark:text-white uppercase">Intelligence</div>
                 <div className="text-[8px] font-bold text-slate-400 uppercase">98% Data Precision</div>
              </div>
           </div>
           <div className="absolute top-1/2 -left-20 hidden lg:flex items-center gap-3 px-6 py-4 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 shadow-2xl animate-float" style={{ animationDelay: '2s' }}>
              <Lock className="w-5 h-5 text-emerald-500" />
              <div className="text-left">
                 <div className="text-[10px] font-black text-secondary dark:text-white uppercase">Souveraineté</div>
                 <div className="text-[8px] font-bold text-slate-400 uppercase">Foncier Sécurisé</div>
              </div>
           </div>
        </div>

        <p className="max-w-3xl mx-auto text-lg md:text-xl font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tight italic mb-20 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
           Accédez aux dossiers confidentiels et audités des plus grands projets immobiliers du Maroc. <br />
           <span className="text-secondary dark:text-white not-italic">Zéro compromis. Zéro retard. Zéro incertitude.</span>
        </p>

        {/* Search & Action Center */}
        <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000 delay-500">
           <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl p-6 rounded-[4rem] shadow-luxury border border-slate-100 dark:border-white/10 flex flex-col md:flex-row gap-6 items-center">
              
              {/* City Selection Dropdown */}
              <div className="flex-1 relative w-full group">
                 <button 
                   onClick={() => setIsCityOpen(!isCityOpen)}
                   className="w-full flex items-center gap-6 px-10 py-8 rounded-[3rem] bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-left"
                 >
                    <div className={clsx(
                       "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                       selectedCity ? "bg-primary text-white" : "bg-slate-100 dark:bg-white/5 text-slate-400"
                    )}>
                       <MapPin className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                       <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Zone Géographique</div>
                       <div className="text-2xl font-black uppercase italic text-secondary dark:text-white tracking-tighter">
                          {selectedCity || "Sélectionner..."}
                       </div>
                    </div>
                    <ChevronDown className={clsx("w-6 h-6 text-slate-400 transition-transform duration-500", isCityOpen && "rotate-180")} />
                 </button>

                 {isCityOpen && (
                   <div className="absolute top-[110%] left-0 right-0 p-4 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/10 rounded-[3rem] shadow-luxury z-[100] overflow-hidden animate-in fade-in slide-in-from-top-8">
                      <div className="grid grid-cols-1 gap-2">
                         {cities.map(city => (
                           <button 
                             key={city}
                             onClick={() => {
                               setSelectedCity(city);
                               setIsCityOpen(false);
                             }}
                             className="w-full text-left px-10 py-6 rounded-3xl hover:bg-primary/10 text-xl font-black uppercase italic text-secondary dark:text-white transition-all hover:text-primary group/item"
                           >
                             <div className="flex items-center justify-between">
                                {city}
                                <ArrowRight className="w-5 h-5 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-2 transition-all" />
                             </div>
                           </button>
                         ))}
                      </div>
                   </div>
                 )}
              </div>

              {/* Action Button */}
              <button 
                onClick={handleLaunch}
                className="w-full md:w-auto px-16 py-10 bg-secondary dark:bg-white text-white dark:text-secondary rounded-[3rem] font-black text-[14px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
              >
                 Lancer l'Audit <Play className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" />
              </button>
           </div>

           {/* User Path Options */}
           <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <Link href="/immo/projects?persona=buyer" className="group flex items-center gap-6 py-2 border-b-2 border-transparent hover:border-primary transition-all">
                 <ShieldCheck className="w-6 h-6 text-primary" />
                 <span className="text-[11px] font-black text-secondary dark:text-white uppercase tracking-[0.3em]">Particulier / Résidence</span>
              </Link>
              <div className="hidden md:block w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10" />
              <Link href="/immo/projects?persona=investor" className="group flex items-center gap-6 py-2 border-b-2 border-transparent hover:border-emerald-500 transition-all">
                 <TrendingUp className="w-6 h-6 text-emerald-500" />
                 <span className="text-[11px] font-black text-secondary dark:text-white uppercase tracking-[0.3em]">Investisseur / Yield</span>
              </Link>
              <div className="hidden md:block w-2 h-2 rounded-full bg-slate-200 dark:bg-white/10" />
              <Link href="/immo/compare" className="group flex items-center gap-6 py-2 border-b-2 border-transparent hover:border-primary transition-all">
                 <Globe className="w-6 h-6 text-primary" />
                 <span className="text-[11px] font-black text-secondary dark:text-white uppercase tracking-[0.3em]">Intelligence Marché</span>
              </Link>
           </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-32 pt-16 border-t border-slate-100 dark:border-white/5 flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-1000">
           {[
             { label: "Sovereign Audit Framework", icon: ShieldCheck },
             { label: "Certified Developer Pool", icon: Building2 },
             { label: "Real-time Field Alerts", icon: Activity },
             { label: "Verified Data Points", icon: ShieldCheck }
           ].map((badge, i) => (
             <div key={i} className="flex items-center gap-4">
                <badge.icon className="w-7 h-7" />
                <span className="text-[11px] font-black uppercase tracking-widest">{badge.label}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Decorative Blur Overlays */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none" />
    </div>
  );
};
