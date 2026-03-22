'use client';

import React from 'react';
import { ProjectCard } from './ProjectCard';
import { MOCK_PROJECTS } from '@/data/immoMock';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const FeaturedProjects = () => {
  const projects = MOCK_PROJECTS.slice(0, 3);

  if (projects.length === 0) return null;

  return (
    <section className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
             <ShieldCheck className="w-4 h-4 text-primary" />
             <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Audits Prioritaires</span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
            Opportunités <span className="text-primary not-italic">Certifiées</span>
          </h2>
        </div>
        <Link href="/immo/projects" className="group flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
          <span className="text-[10px] font-black uppercase tracking-widest">Voir tout le catalogue</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};
