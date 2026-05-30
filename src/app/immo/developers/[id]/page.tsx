import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_DEVELOPERS } from '@/data/immoMock';
import { ShieldCheck, Building2, MapPin, Calendar, Star, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { ScoreBadge } from '@/components/immo/ScoreBadge';
import Link from 'next/link';
import { Metadata } from 'next';
import { DeveloperService } from '@/lib/immo/DeveloperService';
import { ProjectCard } from '@/components/immo/ProjectCard';
import { Developer } from '@/types/immo'; type Props = { params: { id: string }
}; export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    let dev = await DeveloperService.getDeveloperById(params.id);
    if (!dev) {
      dev = MOCK_DEVELOPERS.find(d => d.id === params.id) || null;
    }
    if (!dev) return { title: 'Promoteur Introuvable | avispromoteur.com' };
    return {
      title: "Avis $({dev.name}) — Note $({dev.scores.reputation})/10 · Livraisons & Retards | avispromoteur.com",
      description: "Découvrez l'analyse détaillée, l'historique de livraison et les avis vérifiés pour le promoteur $({dev.name}).",
    };
  } catch (err) {
    return { title: 'Avis Promoteur | avispromoteur.com' };
  }
}


