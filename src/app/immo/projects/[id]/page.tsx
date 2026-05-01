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
  CheckCircle2, AlertCircle, Info, ChevronLeft,
  Activity, TrendingUp, Calendar, Zap
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
      let foundProject = await ProjectService.getProjectById(params.id);
      if (!foundProject) {
        foundProject = MOCK_PROJECTS.find(p => p.id === params.id || p.slug === params.id) || null;
      }

      if (foundProject) {
        setProject(foundProject);
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
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-8">
           <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
           <div className="text-2xl font-black text-white uppercase italic tracking-tighter animate-pulse">Initialisation de l'audit Souverain...</div>
        </div>
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
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Cinematic Hero Gallery */}
      <section className="relative h-[85vh] w-full overflow-hidden">
         <Image 
            src={project.images[currentImageIndex] || 'https://images.unsplash.com/photo-1592595894519-32219e2e5df6?q=80&w=1600'} 
            alt={project.name}
            fill
            className="object-cover animate-slow-zoom"
            priority
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
         
         {/* Navigation Overlay */}
         <div className="absolute top-0 left-0 right-0 p-8 z-20">
            <div className="container mx-auto flex items-center justify-between">
               <Link href="/immo/projects" className="flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-primary hover:border-primary transition-all group">
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Retour au Référentiel
               </Link>
               <div className="flex items-center gap-4">
                  <button className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:text-rose-500 transition-all">
                     <Heart className="w-5 h-5" />
                  </button>
                  <button className="p-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white hover:text-primary transition-all">
                     <Share2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>

         {/* Hero Title Container */}
         <div className="absolute bottom-0 left-0 right-0 p-12 lg:p-24 z-10">
            <div className="container mx-auto">
               <div className="max-w-5xl space-y-8">
                  <div className="flex flex-wrap items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
                     <div className="flex items-center gap-3 bg-primary px-6 py-2 rounded-full shadow-luxury-primary">
                        <ShieldCheck className="w-4 h-4 text-white" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Certifié Souverain</span>
                     </div>
                     <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20">
                        <Star className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">{standingLabels[project.standing || 'moyen']}</span>
                     </div>
                     <div className="flex items-center gap-3 bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-emerald-500/30">
                        <Zap className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Opportunité ROI {(project.audit.trustScore * 0.9).toFixed(1)}/10</span>
                     </div>
                  </div>

                  <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] animate-in fade-in slide-in-from-bottom-12 duration-700">
                     {project.name.split(' ')[0]} <br />
                     <span className="text-primary not-italic text-glow-primary">{project.name.split(' ').slice(1).join(' ')}</span>
                  </h1>

                  <div className="flex flex-wrap items-center gap-12 text-white/70 text-xs font-black uppercase tracking-[0.4em] animate-in fade-in slide-in-from-bottom-16 duration-1000">
                     <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        {project.district}, {project.city}
                     </div>
                     <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-primary" />
                        Statut : <span className="text-white italic">{project.status === 'construction' ? 'En Construction' : 'Livré'}</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        Livraison : <span className="text-white italic">{project.dates.deliveryProjected ? new Date(project.dates.deliveryProjected).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }) : 'N/A'}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Gallery Thumbnails */}
         <div className="absolute right-12 bottom-12 z-20 hidden lg:flex flex-col gap-4 p-4 bg-black/20 backdrop-blur-md rounded-3xl border border-white/10">
            {project.images.slice(0, 4).map((img, idx) => (
               <button 
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={clsx(
                     "relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-500",
                     currentImageIndex === idx ? "border-primary scale-110 shadow-luxury-primary" : "border-transparent opacity-50 hover:opacity-100"
                  )}
               >
                  <Image src={img} alt="thumbnail" fill className="object-cover" />
               </button>
            ))}
         </div>
      </section>

      {/* Main Content Grid */}
      <section className="container mx-auto px-4 -mt-20 relative z-30 pb-40">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-8 space-y-24">
               {/* Advanced Stats Ribbon */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white dark:bg-slate-900 rounded-[3rem] shadow-luxury border border-slate-100 dark:border-white/5">
                  {[
                     { label: 'Prix Moyen', value: `${project.prices.avgSqm.toLocaleString()} MAD/m²`, icon: Calculator, color: 'text-primary' },
                     { label: 'Progression', value: `${project.constructionProgress}%`, icon: Activity, color: 'text-blue-500' },
                     { label: 'Unités', value: project.stats.unitsCount, icon: Building2, color: 'text-emerald-500' },
                     { label: 'Stock Vendu', value: `${project.stats.soldPercentage}%`, icon: TrendingUp, color: 'text-rose-500' }
                  ].map((stat, i) => (
                     <div key={i} className="flex flex-col items-center justify-center p-8 space-y-2 rounded-[2.5rem] hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                        <stat.icon className={clsx("w-6 h-6 mb-2 group-hover:scale-110 transition-transform", stat.color)} />
                        <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        <div className="text-xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">{stat.value}</div>
                     </div>
                  ))}
               </div>

               {/* Tabs Navigation */}
               <div className="flex items-center gap-16 overflow-x-auto pb-4 no-scrollbar">
                  {[
                     { id: 'details', label: 'Dossier Technique', icon: FileText },
                     { id: 'audit', label: 'Rapport Souverain', icon: ShieldCheck },
                     { id: 'reviews', label: 'Intelligence Collective', icon: MessageSquare }
                  ].map(tab => (
                     <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={clsx(
                           "flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] relative py-4 transition-all shrink-0",
                           activeTab === tab.id ? "text-primary scale-110" : "text-slate-400 hover:text-secondary dark:hover:text-white"
                        )}
                     >
                        <tab.icon className={clsx("w-5 h-5", activeTab === tab.id ? "text-primary" : "text-slate-400")} />
                        {tab.label}
                        {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-primary rounded-full shadow-luxury-primary" />}
                     </button>
                  ))}
               </div>

               {/* Dynamic Tab Rendering */}
               <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                  {activeTab === 'details' && (
                     <div className="space-y-24">
                        <section className="space-y-12">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-1.5 bg-primary rounded-full" />
                              <h3 className="text-3xl font-black text-secondary dark:text-white uppercase italic tracking-tighter">Analyse de Marché & Rendement</h3>
                           </div>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <YieldAnalytics project={project} />
                              <div className="space-y-8">
                                 <div className="p-10 bg-secondary dark:bg-slate-900 rounded-[3rem] text-white border border-white/5 shadow-2xl relative overflow-hidden group">
                                    <h4 className="text-xl font-black uppercase italic text-primary mb-6 relative z-10">Potentiel de Plus-Value</h4>
                                    <p className="text-sm text-slate-400 leading-relaxed relative z-10 mb-8 italic">
                                       L'audit projette une valorisation de <span className="text-white font-black">+14.2%</span> post-livraison basée sur l'évolution du quartier {project.district}.
                                    </p>
                                    <TrendingUp className="absolute -bottom-8 -right-8 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
                                 </div>
                                 <MarketTrends 
                                    city={project.city}
                                    district={project.district}
                                    avgPrice={project.prices.avgSqm}
                                    history={[
                                       { month: 'Oct', price: project.prices.avgSqm * 0.90 },
                                       { month: 'Dec', price: project.prices.avgSqm * 0.94 },
                                       { month: 'Fev', price: project.prices.avgSqm * 0.98 },
                                       { month: 'Mar', price: project.prices.avgSqm }
                                    ]}
                                 />
                              </div>
                           </div>
                        </section>
                     </div>
                  )}

                  {activeTab === 'audit' && (
                     <div className="space-y-24">
                        <TrustScoreDetail project={project} />
                        <LegalSafetyChecklist project={project} />
                     </div>
                  )}

                  {activeTab === 'reviews' && (
                     <div className="space-y-12">
                        <div className="p-20 text-center bg-slate-50 dark:bg-white/5 rounded-[4rem] border-2 border-dashed border-slate-200 dark:border-white/10">
                           <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-8" />
                           <h3 className="text-2xl font-black text-secondary dark:text-white uppercase italic mb-4">Soyez le premier à témoigner</h3>
                           <p className="text-slate-500 max-w-md mx-auto text-xs font-bold uppercase tracking-widest leading-loose">
                              Votre expérience est précieuse. Aidez la communauté à auditer {project.name} en partageant votre avis vérifié.
                           </p>
                           <button className="mt-10 btn-premium">Déposer un avis vérifié</button>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Sidebar Sticky Actions */}
            <aside className="lg:col-span-4 space-y-12">
               <div className="sticky top-32 space-y-8">
                  {/* Score Card Premium */}
                  <div className="p-10 bg-white dark:bg-slate-900 rounded-[3.5rem] shadow-luxury border border-slate-100 dark:border-white/5 flex flex-col items-center text-center space-y-8">
                     <ScoreBadge score={project.audit.trustScore} size="lg" label="SCORE GLOBAL" />
                     <div className="space-y-4 w-full">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                           <span className="text-slate-400 italic">Fiabilité Promoteur</span>
                           <span className="text-secondary dark:text-white">{(developer?.scores.reputation || 8) * 10}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-primary" style={{ width: `${(developer?.scores.reputation || 8) * 10}%` }} />
                        </div>
                     </div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                        Cet audit est basé sur 42 points de contrôle souverains incluant le foncier, le financier et l'historique promoteur.
                     </p>
                  </div>

                  {/* Developer Card Minimalist Luxury */}
                  <div className="p-10 bg-secondary dark:bg-slate-900 rounded-[3.5rem] text-white border border-white/5 shadow-2xl relative overflow-hidden group">
                     <div className="relative z-10 space-y-8">
                        <div className="flex items-center gap-6">
                           <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center shrink-0">
                              {developer?.avatar ? <img src={developer.avatar} className="w-full h-full object-cover rounded-2xl" /> : <Building2 className="w-8 h-8 text-primary" />}
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-xl font-black uppercase italic tracking-tighter leading-none">{developer?.name || 'Promoteur Premium'}</h4>
                              <p className="text-[9px] font-bold text-primary uppercase tracking-[0.2em]">{developer?.developerType}</p>
                           </div>
                        </div>
                        <div className="flex justify-between border-y border-white/5 py-6">
                           <div className="text-center">
                              <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Livrés</div>
                              <div className="text-lg font-black italic">{developer?.stats.unitsDelivered.toLocaleString()}</div>
                           </div>
                           <div className="text-center">
                              <div className="text-[8px] font-black text-slate-500 uppercase mb-1">Réputation</div>
                              <div className="text-lg font-black italic text-primary">{developer?.scores.reputation}/10</div>
                           </div>
                        </div>
                        <button className="w-full py-5 bg-white text-secondary rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-xl">
                           Voir le Track Record
                        </button>
                     </div>
                     <ShieldCheck className="absolute -bottom-8 -right-8 w-40 h-40 text-white/5 group-hover:scale-110 transition-transform duration-1000" />
                  </div>

                  {/* CTA Block */}
                  <div className="space-y-4">
                     <button className="w-full p-8 bg-primary text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-luxury-primary hover:scale-[1.02] transition-all flex items-center justify-center gap-4 group">
                        Télécharger l'Audit Complet <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                     </button>
                     <button className="w-full p-8 bg-slate-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-4 group border border-white/5">
                        Simulateur de Crédit <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform text-primary" />
                     </button>
                  </div>
               </div>
            </aside>
         </div>
      </section>
    </main>
  );
}

const FileText = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);
