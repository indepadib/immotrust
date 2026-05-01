'use client';

import React, { useState, useEffect } from 'react';
import { MarketTrends } from '@/components/immo/MarketTrends';
import { ScoreBadge } from '@/components/immo/ScoreBadge';
import { TrustScoreDetail } from '@/components/immo/TrustScoreDetail';
import { ProjectService } from '@/lib/immo/ProjectService';
import { DeveloperService } from '@/lib/immo/DeveloperService';
import { LegalSafetyChecklist } from '@/components/immo/LegalSafetyChecklist';
import { YieldAnalytics } from '@/components/immo/YieldAnalytics';
import { 
  ShieldCheck, MapPin, Building2, 
  ArrowLeft, Share2, Heart, 
  ChevronRight, Download, Calculator, 
  Star, MessageSquare, Image as ImageIcon,
  CheckCircle2, AlertCircle, Info, ChevronLeft
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { clsx } from 'clsx';
import { Project, Developer } from '@/types/immo';
import { MOCK_PROJECTS, MOCK_DEVELOPERS } from '@/data/immoMock';

export default function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'details' | 'audit' | 'reviews'>('details');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // 1. Try to fetch from ProjectService (Supabase)
      let foundProject = await ProjectService.getProjectById(params.id);
      
      // 2. Fallback to Mock if not found in Supabase
      if (!foundProject) {
        foundProject = MOCK_PROJECTS.find(p => p.id === params.id || p.slug === params.id) || null;
      }

      if (foundProject) {
        setProject(foundProject);
        
        // 3. Fetch Developer Info
        let foundDev = await DeveloperService.getDeveloperById(foundProject.developerId);
        if (!foundDev) {
          foundDev = MOCK_DEVELOPERS.find(d => d.id === foundProject?.developerId) || null;
        }
        setDeveloper(foundDev);
      }
      
      setLoading(false);
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 flex items-center justify-center">
        <div className="text-2xl font-black text-slate-300 uppercase italic animate-pulse">Chargement de l'audit...</div>
      </main>
    );
  }

  if (!project) return notFound();

  const standingLabels = {
    'economique': 'Économique',
    'moyen': 'Moyen Standing',
    'haut': 'Haut Standing',
    'luxe': 'Luxe / Exception'
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 pb-32">
      {/* Dynamic Header / Navigation */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/immo/projects" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-all group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour aux Projets
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl hover:text-rose-500 transition-all border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20 group">
              <Heart className="w-4 h-4 group-active:fill-rose-500" />
            </button>
            <Link href="/immo/submit-review" className="bg-primary text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all">
               Déposer un avis
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-12">
            {/* Project Identity & Gallery */}
            <section className="space-y-8">
               <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
                     <ShieldCheck className="w-4 h-4 text-primary" />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Noyau Audit Certifié</span>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/10 dark:bg-white/10 px-4 py-2 rounded-2xl border border-secondary/20 dark:border-white/10">
                     <Star className="w-4 h-4 text-secondary dark:text-white" />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-secondary dark:text-white">
                        {standingLabels[project.standing || 'moyen']}
                     </span>
                  </div>
               </div>
               
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 dark:border-white/5 pb-8">
                  <div className="space-y-4">
                     <h1 className="text-5xl md:text-8xl font-black text-secondary dark:text-white uppercase italic tracking-tighter leading-[0.8] font-outfit">
                        {project.name.split(' ')[0]} <br />
                        <span className="text-primary not-italic">{project.name.split(' ').slice(1).join(' ')}</span>
                     </h1>
                     <div className="flex items-center gap-6 text-slate-400 text-[11px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                           <MapPin className="w-4 h-4 text-primary" />
                           {project.district}, {project.city}
                        </div>
                        <div className="flex items-center gap-2">
                           <Building2 className="w-4 h-4 text-slate-300" />
                           {project.stats.unitsCount} Unités
                        </div>
                     </div>
                  </div>
                  <ScoreBadge score={project.audit.trustScore} size="lg" label="Score Souverain" />
               </div>

               {/* Modern Gallery Component */}
               <div className="relative group">
                  <div className="relative aspect-[21/9] rounded-[4rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-2xl bg-slate-100 dark:bg-slate-900">
                     {project.images.length > 0 ? (
                       <Image 
                         src={project.images[currentImageIndex]} 
                         alt={project.name} 
                         fill 
                         className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                       />
                     ) : (
                       <div className="flex items-center justify-center h-full bg-slate-200 dark:bg-slate-800">
                         <ImageIcon className="w-12 h-12 text-slate-400" />
                       </div>
                     )}
                     
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                     
                     <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                        <div className="flex gap-4">
                           {project.images.map((_, idx) => (
                             <button 
                               key={idx}
                               onClick={() => setCurrentImageIndex(idx)}
                               className={clsx(
                                 "w-12 h-2 rounded-full transition-all",
                                 currentImageIndex === idx ? "bg-primary w-20" : "bg-white/40 hover:bg-white"
                               )}
                             />
                           ))}
                        </div>
                        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-3">
                           <ImageIcon className="w-4 h-4" /> Voir les {project.images.length} Photos
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-12 border-b border-slate-100 dark:border-white/5 pb-4">
               {[
                 { id: 'details', label: 'Détails du Projet' },
                 { id: 'audit', label: 'Rapport d\'Audit' },
                 { id: 'reviews', label: 'Avis & Témoignages' }
               ].map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id as any)}
                   className={clsx(
                     "text-[11px] font-black uppercase tracking-[0.2em] relative py-2 transition-colors",
                     activeTab === tab.id ? "text-primary" : "text-slate-400 hover:text-secondary dark:hover:text-white"
                   )}
                 >
                   {tab.label}
                   {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
                 </button>
               ))}
            </div>

            {/* Tab Contents */}
            <div className="space-y-16 animate-in fade-in duration-700">
               {activeTab === 'details' && (
                 <>
                   <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-10 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-luxury-soft space-y-6">
                         <h3 className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tight">Identité Technique</h3>
                         <div className="grid grid-cols-2 gap-8">
                            <div>
                               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Livraison Est.</div>
                               <div className="text-lg font-black text-secondary dark:text-white uppercase italic">{project.dates.deliveryProjected ? new Date(project.dates.deliveryProjected).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'N/A'}</div>
                            </div>
                            <div>
                               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Progression</div>
                               <div className="text-lg font-black text-primary uppercase italic">{project.constructionProgress}%</div>
                            </div>
                            <div>
                               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Type</div>
                               <div className="text-lg font-black text-secondary dark:text-white uppercase italic">{project.projectType}</div>
                            </div>
                            <div>
                               <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Ventes Actuelles</div>
                               <div className="text-lg font-black text-emerald-500 uppercase italic">{project.stats.soldPercentage}% Sold Out</div>
                            </div>
                         </div>
                      </div>
                      
                      <div className="p-10 bg-secondary dark:bg-slate-900 rounded-[3rem] border border-white/5 shadow-luxury-soft space-y-6 text-white relative overflow-hidden">
                         <div className="relative z-10 space-y-6">
                            <h3 className="text-xl font-black uppercase italic tracking-tight text-primary">Arbitrage Prix</h3>
                            <div className="space-y-4">
                               <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prix Moyen m²</span>
                                  <span className="text-2xl font-black italic">{project.prices.avgSqm.toLocaleString()} MAD</span>
                               </div>
                               <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-primary w-2/3" />
                               </div>
                               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">
                                  Données auditées pour le quartier {project.district}.
                               </p>
                            </div>
                         </div>
                         <Calculator className="absolute -bottom-8 -right-8 w-32 h-32 text-white/5" />
                      </div>
                   </section>

                   <MarketTrends 
                     city={project.city}
                     district={project.district}
                     avgPrice={project.prices.avgSqm}
                     history={[
                       { month: 'Jan', price: project.prices.avgSqm * 0.92 },
                       { month: 'Fev', price: project.prices.avgSqm * 0.94 },
                       { month: 'Mar', price: project.prices.avgSqm * 0.96 },
                       { month: 'Avr', price: project.prices.avgSqm * 0.98 },
                       { month: 'Mai', price: project.prices.avgSqm }
                     ]}
                   />
                   
                   <YieldAnalytics project={project} />
                 </>
               )}

               {activeTab === 'audit' && (
                 <div className="space-y-12">
                   <TrustScoreDetail project={project} />
                   <LegalSafetyChecklist project={project} />
                 </div>
               )}

               {activeTab === 'reviews' && (
                 <div className="space-y-12">
                   {/* Review Stats Header */}
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex flex-col items-center justify-center space-y-2">
                         <div className="text-5xl font-black text-secondary dark:text-white italic">4.8<span className="text-xs opacity-50 not-italic">/5</span></div>
                         <div className="flex gap-1 text-primary">
                            {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary" />)}
                         </div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-2">Avis Vérifiés</div>
                      </div>
                      
                      <div className="md:col-span-2 p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 space-y-6">
                         <h4 className="text-[11px] font-black text-secondary dark:text-white uppercase tracking-widest">Piliers de Satisfaction</h4>
                         <div className="grid grid-cols-2 gap-8">
                            {[
                               { label: 'Qualité Finition', score: 92 },
                               { label: 'Respect Délais', score: 85 },
                               { label: 'Service Après-Vente', score: 78 },
                               { label: 'Conformité Plans', score: 95 }
                            ].map(pillar => (
                               <div key={pillar.label} className="space-y-2">
                                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest">
                                     <span className="text-slate-500">{pillar.label}</span>
                                     <span className="text-secondary dark:text-white">{pillar.score}%</span>
                                  </div>
                                  <div className="h-1 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                                     <div className="h-full bg-emerald-500" style={{ width: `${pillar.score}%` }} />
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Categorized Reviews Placeholder */}
                   <div className="space-y-8">
                      <div className="flex items-center justify-between">
                         <h3 className="text-2xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Derniers Témoignages</h3>
                      </div>
                      <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[3rem]">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aucun avis détaillé pour le moment. Soyez le premier à auditer ce projet !</p>
                      </div>
                   </div>
                 </div>
               )}
            </div>
          </div>

          <aside className="lg:col-span-1 space-y-8">
             <div className="sticky top-40 space-y-8">
                {/* Developer Profile Sticky Card */}
                <div className="bg-secondary dark:bg-slate-900 rounded-[3.5rem] p-10 text-white border border-white/5 shadow-2xl relative group overflow-hidden">
                   <div className="relative z-10 space-y-8">
                      <div className="flex items-center justify-between">
                         <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Le Promoteur</div>
                         <div className="px-3 py-1 bg-white/10 rounded-full text-[8px] font-black uppercase tracking-widest">Reputation {developer?.scores.reputation || '8.0'}/10</div>
                      </div>
                      <div className="flex items-center gap-5">
                         {developer?.avatar ? (
                           <div className="relative w-20 h-20 rounded-[2rem] overflow-hidden border border-white/10">
                              <Image src={developer.avatar} alt={developer.name} fill className="object-cover" />
                           </div>
                         ) : (
                           <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700">
                              <Building2 className="w-10 h-10 text-primary" />
                           </div>
                         )}
                         <div className="space-y-1">
                            <h4 className="text-2xl font-black uppercase italic tracking-tighter leading-none">{developer?.name || 'Inconnu'}</h4>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{developer?.developerType || 'Promotion Immobilière'}</p>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Livrés</div>
                            <div className="text-lg font-black italic">{developer?.stats.unitsDelivered.toLocaleString() || '0'} <span className="text-[8px] not-italic opacity-50">Unités</span></div>
                         </div>
                         <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                            <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Delai Moyen</div>
                            <div className="text-lg font-black italic">+{developer?.stats.avgDelayMonths || '0'} <span className="text-[8px] not-italic opacity-50">Mois</span></div>
                         </div>
                      </div>
                      <button className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white hover:text-secondary transition-all shadow-xl shadow-primary/10">
                         Audit Promoteur Complet
                      </button>
                   </div>
                   <Building2 className="absolute -bottom-12 -right-12 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
                </div>

                {/* Verification Actions */}
                <div className="bg-white dark:bg-slate-900 rounded-[3.5rem] p-10 border border-slate-100 dark:border-white/5 shadow-luxury-soft space-y-8">
                   <h4 className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tight">Vérifier ce projet</h4>
                   <div className="space-y-4">
                      <Link href="/immo/simulator" className="w-full flex items-center justify-between p-6 bg-primary text-white rounded-3xl group shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
                         <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/20 rounded-lg"><Calculator className="w-4 h-4" /></div>
                            <span className="text-[11px] font-black uppercase tracking-widest">Calculateur ROI</span>
                         </div>
                         <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <button className="w-full flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl group hover:border-emerald-500/50 border border-transparent transition-all">
                         <div className="flex items-center gap-4">
                            <div className="p-2 bg-emerald-500/10 rounded-lg"><Download className="w-4 h-4 text-emerald-500" /></div>
                            <span className="text-[11px] font-black uppercase tracking-widest">Rapport Audit PDF</span>
                         </div>
                         <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </button>
                   </div>
                   
                   <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-[2rem] border border-slate-100 dark:border-white/10 space-y-4">
                      <div className="flex items-center gap-3">
                         <AlertCircle className="w-4 h-4 text-amber-500" />
                         <span className="text-[9px] font-black uppercase tracking-widest text-secondary dark:text-white">Avertissement Audit</span>
                      </div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                         Données rafraîchies il y a peu. La tension sur ce projet est {project.stats.soldPercentage > 80 ? 'CRITIQUE' : 'ÉLEVÉE'}.
                      </p>
                   </div>
                </div>
             </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
