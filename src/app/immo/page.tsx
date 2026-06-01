import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Search, ShieldCheck, Clock, ThumbsUp, ArrowRight } from 'lucide-react';
import { DeveloperCard } from '@/components/immo/DeveloperCard';
import { ProjectCard } from '@/components/immo/ProjectCard';
import { MOCK_DEVELOPERS, MOCK_PROJECTS } from '@/data/immoMock';

export const metadata: Metadata = {
  title: 'Avis Promoteur Maroc | Achetez dans le neuf en toute confiance',
  description: 'Vérifiez la fiabilité des promoteurs immobiliers au Maroc avant de signer. Avis vérifiés, retards de livraison et qualité de construction.',
};

export default function ImmoHomePage() {
  const topDevelopers = MOCK_DEVELOPERS.slice(0, 3);
  const featuredProjects = MOCK_PROJECTS.slice(0, 3);

  return (
    <main className="min-h-screen bg-background">
      {/* Simple Hero Section */}
      <section className="pt-40 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm mb-4">
            <ShieldCheck className="w-5 h-5" />
            <span>La 1ère plateforme d'avis certifiés sur l'immobilier neuf</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-secondary font-sora leading-tight">
            Achetez dans le neuf sans <span className="text-primary">mauvaise surprise</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            Vérifiez la fiabilité des promoteurs immobiliers au Maroc avant de signer. Retards de livraison, qualité de construction, et service après-vente audités par les acheteurs.
          </p>
          
          {/* Main Search Bar */}
          <div className="max-w-2xl mx-auto mt-12 bg-white p-2 rounded-full shadow-luxury-soft flex items-center border border-slate-200 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 transition-all">
            <div className="pl-6 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <input 
              type="text" 
              placeholder="Rechercher un promoteur (ex: CGI, Addoha, TGCC...)" 
              className="flex-1 bg-transparent outline-none px-4 py-4 text-slate-700 font-medium placeholder-slate-400"
            />
            <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors">
              Rechercher
            </button>
          </div>
        </div>
      </section>

      {/* How it works - Simple language */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-black text-secondary text-center mb-16 font-sora">Comment nous vérifions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-background border border-slate-100 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ThumbsUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-secondary">Avis 100% Vérifiés</h3>
              <p className="text-slate-600">Seuls les acheteurs avec contrat ou titre de propriété validé peuvent laisser un avis.</p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-slate-100 text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-secondary">Risque de retard</h3>
              <p className="text-slate-600">Nous calculons le retard moyen de chaque promoteur sur ses anciens projets.</p>
            </div>
            <div className="p-8 rounded-3xl bg-background border border-slate-100 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-secondary">Qualité & Finitions</h3>
              <p className="text-slate-600">Les résidents évaluent la vraie qualité des matériaux après 1 an d'habitation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Developers */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-secondary font-sora">Promoteurs les plus recherchés</h2>
              <p className="text-slate-500 mt-2">Découvrez les notes réelles des promoteurs au Maroc.</p>
            </div>
            <Link href="/immo/developers" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
              Voir tous les promoteurs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topDevelopers.map(dev => (
              <DeveloperCard key={dev.id} developer={dev} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-secondary font-sora">Projets en cours de vérification</h2>
              <p className="text-slate-500 mt-2">Les résidences les plus consultées par les acheteurs.</p>
            </div>
            <Link href="/immo/projects" className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
              Voir tous les projets <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map(proj => (
              <ProjectCard key={proj.id} project={proj} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}