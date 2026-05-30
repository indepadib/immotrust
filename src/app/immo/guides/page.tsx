import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guides Acheteurs Immobilier | avispromoteur.com',
  description: 'Guides experts pour sécuriser votre achat immobilier au Maroc. VEFA, retards de livraison, frais de notaire.',
};

export default function GuidesIndex() {
  const guides = [
    {
      title: "Comment vérifier un promoteur immobilier au Maroc",
      slug: "comment-verifier-promoteur-maroc",
      desc: "La checklist ultime avant de signer votre réservation."
    },
    {
      title: "Vos droits en cas de retard de livraison (Loi 66.12)",
      slug: "droits-retard-livraison-vefa-maroc",
      desc: "Que faire si votre promoteur ne vous livre pas à temps ? Les pénalités expliquées."
    }
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-16 text-center">
          <h1 className="text-5xl font-black text-secondary font-sora mb-6">
            Guides <span className="text-primary">Acheteurs</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
            Maîtrisez les règles du jeu immobilier au Maroc.
          </p>
        </header>

        <div className="grid gap-6">
          {guides.map((g) => (
            <Link key={g.slug} href={"/immo/guides/" + g.slug} className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-primary/50 transition-all flex items-center justify-between">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-sora text-secondary mb-2 group-hover:text-primary transition-colors">{g.title}</h3>
                  <p className="text-slate-500 font-medium">{g.desc}</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-primary group-hover:translate-x-2 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}