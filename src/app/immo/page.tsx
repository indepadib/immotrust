import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShieldCheck, Clock, ThumbsUp, ArrowRight, Play, Star } from 'lucide-react';
import { DeveloperCard } from '@/components/immo/DeveloperCard';
import { MOCK_DEVELOPERS } from '@/data/immoMock';

export const metadata: Metadata = {
  title: 'Avis Promoteur Maroc | Investissez en toute confiance',
  description: 'La première plateforme de certification immobilière au Maroc.',
};

export default function PremiumHomePage() {
  const topDevelopers = MOCK_DEVELOPERS.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FAFAFC] relative overflow-hidden font-sans">
      
      {/* Animated Blobs Background */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-40 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob animation-delay-4000 pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-4 z-10">
        <div className="container mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left relative z-20">
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md text-primary px-4 py-2 rounded-full font-bold text-xs border border-white shadow-sm mx-auto lg:mx-0">
              <Star className="w-4 h-4 text-orange-400 fill-orange-400" />
              <span>Plus de 8,000 avis vérifiés</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-secondary font-sora leading-[1.1] tracking-tight">
              Investissez <br/> dans le neuf avec <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                zéro surprise.
              </span>
            </h1>
            
            <p className="text-lg text-slate-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed">
              La seule plateforme au Maroc qui audite les retards de livraison et la qualité de finition à travers les témoignages certifiés d'acheteurs réels.
            </p>
            
            {/* Search Pill */}
            <div className="max-w-xl mx-auto lg:mx-0 bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white flex items-center focus-within:ring-4 ring-indigo-500/20 transition-all">
              <div className="pl-4 text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input 
                type="text" 
                placeholder="Rechercher CGI, Addoha, TGCC..." 
                className="flex-1 bg-transparent outline-none px-4 py-3 text-slate-700 font-medium placeholder-slate-400 text-sm md:text-base"
              />
              <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary transition-colors text-sm">
                Explorer
              </button>
            </div>
          </div>

          {/* Right Visual Image/Video Area */}
          <div className="flex-1 relative w-full max-w-2xl lg:max-w-none animate-float">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/40">
              <Image 
                src="/hero_bg_premium.png" 
                alt="Luxury Real Estate Background" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/40 to-transparent" />
              
              {/* Floating Glass Widget */}
              <div className="absolute bottom-8 left-8 right-8 glass-panel rounded-2xl p-6 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                       <ShieldCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                       <div className="text-sm font-bold text-secondary">Audit Certifié</div>
                       <div className="text-xs text-slate-500">Dossier juridique validé</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <div className="text-2xl font-black text-secondary">8.4<span className="text-sm text-slate-400 font-medium">/10</span></div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Developers */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-secondary font-sora">Promoteurs à la une</h2>
              <p className="text-slate-500 mt-2">Découvrez les notes réelles des acteurs du marché.</p>
            </div>
            <Link href="/immo/developers" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Voir tout le classement <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDevelopers.map(dev => (
              <DeveloperCard key={dev.id} developer={dev} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}