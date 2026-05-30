import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vérifiez votre promoteur immobilier au Maroc — Avis certifiés | avispromoteur.com',
  description: 'La première plateforme où chaque acheteur vérifie son promoteur avant de signer. Consultez les avis réels, les retards de livraison et la qualité des finitions.',
};

export default function ImmoHomePage() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl mx-auto text-center space-y-12">
        <h1 className="text-5xl md:text-7xl font-black text-secondary uppercase italic tracking-tighter leading-tight font-sora">
          Avant d'acheter,<br/> <span className="text-primary not-italic">vérifiez votre promoteur.</span>
        </h1>
        
        <div className="relative w-full max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            className="w-full pl-16 pr-6 py-6 text-lg rounded-full border-2 border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none bg-white text-secondary placeholder:text-slate-400 font-sans shadow-lg"
            placeholder="Nom du promoteur (ex: Groupe Allali, TGCC...)"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <Link 
              href="/immo/developers"
              className="bg-primary text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              Chercher
            </Link>
          </div>
        </div>

        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-8 font-sans">
          Basé sur des centaines d'avis certifiés d'acheteurs réels au Maroc.
        </p>
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link href="/immo/developers" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
            Classement Promoteurs &rarr;
          </Link>
          <Link href="/immo/guides" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors flex items-center gap-2">
            Guides Acheteur & VEFA &rarr;
          </Link>
        </div>
      </div>
    </main>
  );
}


