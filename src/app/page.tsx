import Link from 'next/link';
import { Shield, ArrowRight, TrendingUp, Search, Building2, UserCheck } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-secondary dark:bg-slate-950 overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-32 pb-40 relative z-10 flex flex-col items-center">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 mb-12 animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Sovereign Real Estate Audit</span>
          </div>

          <h1 className="text-[12vw] md:text-[8rem] font-black text-white uppercase italic tracking-tighter leading-[0.8] mb-12">
            Investir avec <br />
            <span className="text-primary not-italic">Totale Confiance</span>
          </h1>

          <p className="text-xl md:text-2xl font-bold text-slate-400 max-w-2xl mb-16 leading-relaxed italic">
            L'infrastructure de vrit qui audite, filtre et certifie les programmes immobiliers au Maroc pour une transparence radicale.
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <Link 
              href="/immo/projects" 
              className="group flex items-center justify-center gap-4 px-12 py-8 bg-primary hover:bg-white text-secondary hover:text-primary transition-all rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            >
              <span className="text-sm font-black uppercase tracking-widest relative z-10 italic">Explorer l'Analyse Marché</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
            </Link>
            
            <Link 
              href="/immo/developers" 
              className="group flex items-center justify-center gap-4 px-12 py-8 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white transition-all rounded-[2.5rem] border border-white/10"
            >
              <span className="text-sm font-black uppercase tracking-widest italic">Analyse des Promoteurs</span>
              <Building2 className="w-5 h-5 text-primary" />
            </Link>
          </div>

          {/* Feature Grid (Condensed) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-40 pt-20 border-t border-white/10">
            <div className="space-y-4">
               <Shield className="w-10 h-10 text-primary" />
               <div className="text-[10px] font-black text-white uppercase tracking-widest">Audit Souverain</div>
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-loose">Scrutine 42 points de contrle légaux et techniques.</p>
            </div>
            <div className="space-y-4">
               <UserCheck className="w-10 h-10 text-primary" />
               <div className="text-[10px] font-black text-white uppercase tracking-widest">Avis Vérifiés</div>
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-loose">Seuls les acheteurs certifiés peuvent soumettre un avis.</p>
            </div>
            <div className="space-y-4">
               <TrendingUp className="w-10 h-10 text-primary" />
               <div className="text-[10px] font-black text-white uppercase tracking-widest">Spatial Risk</div>
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-loose">Simulation prédictive des rendements et des retards.</p>
            </div>
            <div className="space-y-4">
               <Search className="w-10 h-10 text-primary" />
               <div className="text-[10px] font-black text-white uppercase tracking-widest">Transparence</div>
               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-loose">Accès direct aux prix observés vs prix annoncés.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Ornament */}
      <div className="absolute top-1/2 -right-40 -translate-y-1/2 opacity-20 hidden 2xl:block pointer-events-none">
         <div className="text-[40rem] font-black text-white italic tracking-tighter select-none">TRUST</div>
      </div>
    </main>
  );
}
