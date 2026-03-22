import Link from 'next/link';
import { Shield, ArrowRight, TrendingUp, Search, Building2, UserCheck, Zap, Database, BarChart3 } from 'lucide-react';
import { MarketPulseChart } from '@/components/immo/MarketPulseChart';
import { FeaturedProjects } from '@/components/immo/FeaturedProjects';

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary dark:bg-slate-950 overflow-hidden relative flex flex-col items-center justify-center font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-32 pb-40 relative z-10 flex flex-col items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 mb-12">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Sovereign Real Estate Audit</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h1 className="text-[10vw] lg:text-[7rem] font-black text-white uppercase italic tracking-tighter leading-[0.85] font-outfit">
                Rigueur<br />
                <span className="text-primary not-italic">Perfection</span>
              </h1>

              <p className="text-xl font-bold text-slate-400 max-w-xl leading-relaxed uppercase tracking-wider italic">
                L'infrastructure de vérité qui audite, filtre et certifie les programmes immobiliers au Maroc.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Link 
                  href="/immo/projects" 
                  className="group flex items-center justify-center gap-4 px-12 py-8 bg-primary hover:bg-white text-secondary hover:text-primary transition-all rounded-[2.5rem] shadow-luxury relative overflow-hidden"
                >
                  <span className="text-sm font-black uppercase tracking-widest relative z-10 italic">Explorer l'Audit</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
                </Link>

                <Link 
                  href="/immo/analytics" 
                  className="group flex items-center justify-center gap-4 px-12 py-8 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all rounded-[2.5rem] border border-white/10"
                >
                  <span className="text-sm font-black uppercase tracking-widest italic">Intelligence Marché</span>
                  <BarChart3 className="w-5 h-5 text-primary" />
                </Link>
              </div>
            </div>

            <div className="relative animate-float pt-10 lg:pt-0">
               <MarketPulseChart />
               {/* Decorative floating elements */}
               <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 blur-3xl rounded-full" />
               <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mt-40 pt-20 border-t border-white/10 mb-40">
            <div className="space-y-6 group">
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Shield className="w-6 h-6 text-primary" />
               </div>
               <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-3">Audit Souverain</div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Vérification radicale des titres fonciers et garanties décennales.</p>
               </div>
            </div>
            <div className="space-y-6 group">
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Database className="w-6 h-6 text-primary" />
               </div>
               <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-3">Data Sourcing</div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Extraction massive et normalisation des opportunités du marché.</p>
               </div>
            </div>
            <div className="space-y-6 group">
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <Zap className="w-6 h-6 text-primary" />
               </div>
               <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-3">Spatial Risk</div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Algorithmes prédictifs sur les délais de livraison et rendements.</p>
               </div>
            </div>
            <div className="space-y-6 group">
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <UserCheck className="w-6 h-6 text-primary" />
               </div>
               <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-3">Avis Audités</div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Seuls les acheteurs certifiés peuvent témoigner de la qualité.</p>
               </div>
            </div>
          </div>

          {/* Featured Projects Section */}
          <FeaturedProjects />
        </div>
      </div>

      {/* Hero Ornament */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 opacity-[0.03] hidden 2xl:block pointer-events-none">
         <div className="text-[40rem] font-black text-white italic tracking-tighter select-none">TRUST</div>
      </div>
    </main>
  );
}
