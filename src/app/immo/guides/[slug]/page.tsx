import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, BookOpen, ShieldCheck } from 'lucide-react';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const titles: Record<string, string> = {
    'comment-verifier-promoteur-maroc': 'Comment vérifier un promoteur immobilier au Maroc | Guide 2025',
    'droits-retard-livraison-vefa-maroc': 'Vos droits en cas de retard de livraison (Loi 66.12 VEFA) | Maroc',
  };
  return {
    title: titles[params.slug] || 'Guide Immobilier | avispromoteur.com',
    description: 'Guide expert pour sécuriser votre achat immobilier au Maroc. Évitez les arnaques et les retards de livraison.',
  };
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const isRetard = params.slug === 'droits-retard-livraison-vefa-maroc';
  
  const title = isRetard 
    ? 'Vos droits en cas de retard de livraison (Loi 66.12)' 
    : 'Comment vérifier un promoteur immobilier au Maroc avant de signer';
    
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link href="/immo/guides" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors mb-12">
          <ChevronLeft className="w-4 h-4" /> Retour aux guides
        </Link>
        
        <header className="mb-16">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20 w-fit mb-6">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-black text-primary uppercase tracking-widest">Guide Expert SEO</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-secondary font-sora leading-tight mb-6">
            {title}
          </h1>
          <div className="flex items-center gap-4 text-sm font-bold text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-8">
            <span>Par L'Équipe Avis Promoteur</span>
            <span>•</span>
            <span>Lecture : 5 min</span>
          </div>
        </header>

        <div className="prose prose-lg prose-slate prose-headings:font-sora prose-headings:font-black prose-headings:text-secondary max-w-none text-slate-600">
          {isRetard ? (
            <>
              <p className="lead text-xl italic font-medium text-slate-500 mb-8">
                Au Maroc, le retard de livraison est la hantise numéro un des acquéreurs en VEFA (Vente en l'État Futur d'Achèvement). Mais la Loi 66.12 vous protège. Voici vos droits concrets.
              </p>
              <h2>1. Que dit la loi 66.12 sur les retards ?</h2>
              <p>La législation marocaine encadre strictement la VEFA. En cas de non-respect du délai stipulé dans le contrat de réservation ou le contrat préliminaire, le promoteur est passible de pénalités. Généralement, la loi accorde au promoteur un délai de grâce de 30 jours, avec obligation d'informer l'acquéreur.</p>
              <h2>2. Comment réclamer vos indemnités ?</h2>
              <p>Si le délai de grâce est dépassé, l'indemnité légale correspond à 1% de la somme payée par mois de retard, plafonnée à 10% du prix total de vente. Vous devez mettre le promoteur en demeure via un avocat ou un huissier de justice.</p>
              <div className="bg-[#16A34A]/10 border-l-4 border-[#16A34A] p-6 my-8 rounded-r-2xl">
                <h4 className="flex items-center gap-2 text-[#16A34A] font-black uppercase text-sm mb-2"><ShieldCheck className="w-5 h-5"/> Le conseil avispromoteur</h4>
                <p className="text-emerald-800 text-sm m-0">Ne vous contentez pas de promesses verbales. Vérifiez toujours la moyenne des retards d'un promoteur sur notre plateforme avant de signer.</p>
              </div>
            </>
          ) : (
            <>
              <p className="lead text-xl italic font-medium text-slate-500 mb-8">
                L'achat d'un bien immobilier est souvent l'investissement d'une vie. Avant de remettre votre acompte, suivez cette méthodologie pour évaluer la fiabilité de votre promoteur au Maroc.
              </p>
              <h2>1. Vérifiez l'historique de livraison</h2>
              <p>Un promoteur qui a déjà livré 5 projets avec succès est statistiquement plus sûr. Regardez non seulement s'il a livré, mais surtout avec <strong>quel retard</strong>. Sur avispromoteur.com, nous affichons le retard moyen constaté pour chaque acteur du marché.</p>
              <h2>2. Exigez la GFA (Garantie Financière d'Achèvement)</h2>
              <p>Depuis la loi 66.12, le promoteur a l'obligation de fournir une caution bancaire d'achèvement des travaux ou de remboursement. Si le promoteur refuse de la fournir ou trouve des excuses, fuyez.</p>
              <h2>3. Inspectez la qualité du SAV</h2>
              <p>Que se passe-t-il après la remise des clés ? Les fissures, les fuites, les finitions bâclées. Lisez les avis certifiés pour savoir si le promoteur corrige rapidement ces défauts ou s'il disparaît.</p>
            </>
          )}
        </div>
        
        <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
          <h3 className="text-2xl font-black font-sora text-secondary mb-4">Prêt à investir en toute sécurité ?</h3>
          <p className="text-slate-500 mb-8">Consultez notre base de données de promoteurs audités par la communauté.</p>
          <Link href="/immo/developers" className="inline-block bg-primary text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors">
            Voir le classement des promoteurs
          </Link>
        </div>
      </article>
    </main>
  );
}
