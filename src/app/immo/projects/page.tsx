"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, MapPin, Clock, X } from "lucide-react";
import { MOCK_PROJECTS } from "@/data/immoMock";
import { Reveal } from "@/components/ui/Reveal";

const STATUSES = ["Tous", "construction", "delivered"];
const CITIES = ["Toutes", "Casablanca", "Rabat", "Marrakech", "Tanger"];

const STATUS_LABELS: Record<string, string> = {
  construction: "En construction",
  delivered: "Livre",
  planning: "En projet",
  cancelled: "Annule",
};

const SCORE_COLOR = (s: number) =>
  s >= 8 ? "text-emerald-500" : s >= 6.5 ? "text-[#FF4F00]" : "text-red-500";

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Tous");

  const filtered = useMemo(() => {
    return MOCK_PROJECTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase());
      const matchStatus = status === "Tous" || p.status === status;
      return matchSearch && matchStatus;
    });
  }, [search, status]);

  return (
    <main className="min-h-screen bg-[#FDFCF7] pt-32 pb-32">

      {/* Header */}
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px] mb-20">
        <Reveal>
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4F00] mb-6">Base de donnees</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-syne font-black text-[clamp(3rem,8vw,7rem)] text-[#0A0A0A] uppercase leading-[0.88] tracking-tighter mb-8">
            Tous les<br />projets.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[#666] text-lg max-w-xl leading-relaxed">
            {MOCK_PROJECTS.length} residences auditees, avec scores de confiance, avancement travaux et temoignages verifies.
          </p>
        </Reveal>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px] mb-12">
        <Reveal delay={0.3}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
              <input
                type="text"
                placeholder="Rechercher un projet, une ville..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white border border-[#E8E4D9] rounded-2xl font-bold text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:border-[#FF4F00] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-5 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-[#A3A3A3]" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={"px-6 py-5 rounded-2xl border font-bold text-[12px] uppercase tracking-wider transition-all duration-300 " +
                    (status === s ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white text-[#666] border-[#E8E4D9] hover:border-[#0A0A0A]")}
                >
                  {s === "Tous" ? "Tous" : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <Link href={"/immo/projects/" + project.id} className="block group h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="bg-white border border-[#E8E4D9] rounded-[2.5rem] overflow-hidden h-full flex flex-col hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:border-[#FF4F00]/30 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.images[0] || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 to-transparent" />

                    {/* Status badge */}
                    <div className="absolute top-5 left-5">
                      <div className={"flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider " +
                        (project.status === "delivered" ? "bg-emerald-500 text-white" : "bg-[#FF4F00] text-white")}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        {STATUS_LABELS[project.status] || project.status}
                      </div>
                    </div>

                    {/* Score */}
                    <div className="absolute top-5 right-5">
                      <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full">
                        <span className={"font-syne font-black text-sm " + SCORE_COLOR(project.audit.trustScore)}>
                          {project.audit.trustScore}
                        </span>
                        <span className="text-[#A3A3A3] text-xs">/10</span>
                      </div>
                    </div>

                    {/* Name overlay */}
                    <div className="absolute bottom-5 left-5 right-5">
                      <h2 className="font-syne font-bold text-white text-xl uppercase leading-tight">{project.name}</h2>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[#A3A3A3] text-xs font-bold uppercase tracking-wider mb-5">
                      <MapPin className="w-3 h-3" />
                      {project.district}, {project.city}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-[#F5F2EB] rounded-xl p-3 text-center">
                        <div className="font-syne font-black text-lg text-[#0A0A0A]">{project.stats.unitsCount}</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-[#A3A3A3]">Unites</div>
                      </div>
                      <div className="bg-[#F5F2EB] rounded-xl p-3 text-center">
                        <div className="font-syne font-black text-lg text-[#0A0A0A]">{project.stats.soldPercentage}%</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-[#A3A3A3]">Vendus</div>
                      </div>
                      <div className="bg-[#F5F2EB] rounded-xl p-3 text-center">
                        <div className="font-syne font-black text-lg text-[#0A0A0A]">{project.constructionProgress || 0}%</div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-[#A3A3A3]">Avancement</div>
                      </div>
                    </div>

                    {/* Progress bar */}
                    {project.status === "construction" && (
                      <div className="mb-6">
                        <div className="w-full h-1.5 bg-[#E8E4D9] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#FF4F00] rounded-full transition-all duration-1000"
                            style={{ width: (project.constructionProgress || 0) + "%" }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#A3A3A3] text-xs">
                        <Clock className="w-3 h-3" />
                        <span className="font-bold">{project.dates?.deliveryProjected ? new Date(project.dates.deliveryProjected).getFullYear() : "N/A"}</span>
                      </div>
                      <div className="w-9 h-9 rounded-full border border-[#E8E4D9] flex items-center justify-center group-hover:bg-[#FF4F00] group-hover:border-[#FF4F00] transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-[#A3A3A3] group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <Reveal>
            <div className="py-32 text-center bg-white rounded-[2rem] border border-[#E8E4D9]">
              <p className="font-syne font-bold text-xl text-[#A3A3A3] uppercase">Aucun projet trouve</p>
              <button onClick={() => { setSearch(""); setStatus("Tous"); }} className="mt-6 text-sm font-bold text-[#FF4F00] underline underline-offset-4">
                Effacer les filtres
              </button>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}