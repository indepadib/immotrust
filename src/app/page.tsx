import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { 
  Shield, ArrowRight, TrendingUp, Search, 
  Building2, UserCheck, Zap, Database, 
  BarChart3, Users 
} from 'lucide-react';
import { MarketPulseChart } from '@/components/immo/MarketPulseChart';
import { FeaturedProjects } from '@/components/immo/FeaturedProjects';

export const metadata: Metadata = {
  title: 'ImmoTrust | L\'Infrastructure de la Vérité Immobilière',
  description: 'Auditez, filtrez et certifiez les programmes immobiliers au Maroc grace à l\'intelligence collective et la data sourcée.',
  keywords: 'immobilier maroc, achat appartement, audit immobilier, promoteurs maroc, immotrust',
};

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

          {/* Sovereign Audit Process */}
          <section className="py-40 border-t border-white/10">
             <div className="text-center space-y-8 mb-24">
                <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-2xl border border-primary/20">
                   <Shield className="w-5 h-5 text-primary" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Le Protocole ImmoTrust</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
                   L'Infrastructure <br /> de la <span className="text-primary not-italic">Vérité</span>.
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] max-w-lg mx-auto leading-relaxed">
                   Découvrez comment nous transformons l'opacité du marché en data points certifiés pour sécuriser chaque dirham investi.
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: '01', title: 'Extraction Matrix', desc: 'Ingestion en temps réel des annonces, permis de construire et titres fonciers.', icon: Database },
                  { step: '02', title: 'Audit Juridique', desc: 'Vérification radicale des garanties de livraison (GFA) et conformité VEF.', icon: Shield },
                  { step: '03', title: 'Deep Scoring', desc: 'Analyse multicritère : Track record promoteur, qualité gros œuvre et SAV.', icon: Zap },
                  { step: '04', title: 'Certification', desc: 'Émission du Sceau ImmoTrust® garantissant la transparence totale.', icon: UserCheck }
                ].map((item, idx) => (
                  <div key={idx} className="group p-10 bg-white/5 rounded-[3rem] border border-white/10 hover:border-primary/50 transition-all hover:bg-white/[0.08] relative overflow-hidden">
                     <div className="relative z-10 space-y-6">
                        <div className="text-4xl font-black text-white/10 group-hover:text-primary/20 transition-colors italic">{item.step}</div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                           <item.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase italic tracking-tight">{item.title}</h3>
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">{item.desc}</p>
                     </div>
                     <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
             </div>
          </section>

          {/* Expert Consensus / Social Proof */}
          <section className="py-32 bg-white rounded-[4rem] text-secondary relative overflow-hidden mb-40">
             <div className="container mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
                <div className="space-y-12">
                   <div className="inline-flex items-center gap-3 bg-secondary/5 px-4 py-2 rounded-2xl">
                      <Users className="w-5 h-5 text-secondary" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Force Communautaire</span>
                   </div>
                   <h2 className="text-5xl md:text-7xl font-black text-secondary uppercase italic tracking-tighter leading-[0.85]">
                      Consensus des <br /> <span className="text-primary not-italic">Experts</span>.
                   </h2>
                   <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] max-w-md leading-relaxed">
                      L'intelligence collective au service de votre patrimoine. Plus de 800 architectes, avocats et investisseurs certifiés collaborent pour auditer chaque projet.
                   </p>
                   <div className="flex items-center gap-12 border-t border-secondary/10 pt-12">
                      <div>
                         <div className="text-4xl font-black italic">8k+</div>
                         <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Avis Certifiés</div>
                      </div>
                      <div>
                         <div className="text-4xl font-black italic">140+</div>
                         <div className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Avocats Partenaires</div>
                      </div>
                   </div>
                </div>
                <div className="relative">
                   <div className="aspect-square bg-slate-100 rounded-full flex items-center justify-center p-12 overflow-hidden shadow-2xl relative">
                      <div className="grid grid-cols-3 gap-4 w-full h-full relative z-10">
                         {[1,2,3,4,5,6,7,8,9].map(i => (
                           <div key={i} className="aspect-square rounded-2xl bg-white shadow-lg border border-slate-200 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all hover:scale-110">
                              <Image src={`https://i.pravatar.cc/150?img=${i+10}`} alt="Expert" width={100} height={100} className="object-cover" />
                           </div>
                         ))}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-20" />
                   </div>
                   <div className="absolute -bottom-10 -right-10 bg-primary p-12 rounded-[3rem] shadow-luxury rotate-12 animate-pulse">
                      <Shield className="w-12 h-12 text-white" />
                   </div>
                </div>
             </div>
          </section>

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
