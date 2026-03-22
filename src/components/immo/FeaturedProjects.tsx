'use client';

import React, { useEffect, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectService } from '@/lib/immo/ProjectService';
import { Project } from '@/types/immo';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export const FeaturedProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await ProjectService.getFeaturedProjects(3);
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch featured projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="aspect-[16/20] bg-white/5 rounded-[2.5rem] animate-pulse" />
        ))}
      </div>
    );
  }

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
