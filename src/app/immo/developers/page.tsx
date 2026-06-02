"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, ShieldCheck, Star, Clock, Building2, SlidersHorizontal, X } from "lucide-react";
import { MOCK_DEVELOPERS } from "@/data/immoMock";
import { Reveal } from "@/components/ui/Reveal";

const SEGMENTS = ["Tous", "Premium", "Standard", "Luxe"];

export default function DevelopersPage() {
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("Tous");

  const filtered = useMemo(() => {
    return MOCK_DEVELOPERS.filter(d => {
      const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
      const matchSeg = segment === "Tous" || d.segment === segment;
      return matchSearch && matchSeg;
    });
  }, [search, segment]);

  return (
    <main className="min-h-screen bg-[#FDFCF7] pt-32 pb-32">

      {/* Page Header */}
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px] mb-20">
        <Reveal>
          <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4F00] mb-6">Classement independant</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-syne font-black text-[clamp(3rem,8vw,7rem)] text-[#0A0A0A] uppercase leading-[0.88] tracking-tighter mb-8">
            Tous les<br />promoteurs.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[#666] text-lg max-w-xl leading-relaxed">
            Notations independantes basees sur des temoignages d'acheteurs verifies par actes de vente. Aucune influence des promoteurs.
          </p>
        </Reveal>
      </div>

      {/* Search + Filters */}
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px] mb-16">
        <Reveal delay={0.3}>
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3A3A3]" />
              <input
                type="text"
                placeholder="Rechercher un promoteur..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-16 pr-6 py-5 bg-white border border-[#E8E4D9] rounded-2xl font-bold text-[#0A0A0A] placeholder-[#A3A3A3] focus:outline-none focus:border-[#FF4F00] transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-5 top-1/2 -translate-y-1/2 text-[#A3A3A3] hover:text-[#0A0A0A]">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {/* Segment filters */}
            <div className="flex items-center gap-3">
              {SEGMENTS.map(s => (
                <button
                  key={s}
                  onClick={() => setSegment(s)}
                  className={"px-6 py-5 rounded-2xl border font-bold text-[12px] uppercase tracking-wider transition-all duration-300 " +
                    (segment === s
                      ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
                      : "bg-white text-[#666] border-[#E8E4D9] hover:border-[#0A0A0A]")}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Ranked List */}
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
        <div className="space-y-4">
          {filtered.map((dev, i) => (
            <Reveal key={dev.id} delay={i * 0.05}>
              <Link href={"/immo/developers/" + dev.id} className="block group">
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-white border border-[#E8E4D9] rounded-[2rem] px-8 py-7 hover:border-[#FF4F00]/40 hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-400"
                >
                  {/* Rank */}
                  <div className="font-syne font-black text-5xl text-[#F0EDE6] w-16 shrink-0 leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-2xl bg-[#F5F2EB] overflow-hidden relative shrink-0 border border-[#E8E4D9]">
                    <Image src={dev.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(dev.name)} alt={dev.name} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-syne font-bold text-xl text-[#0A0A0A] uppercase tracking-tight">{dev.name}</h2>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3A3A3]">{dev.segment}</span>
                      <span className="text-[#E8E4D9]">—</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3A3A3]">{dev.stats.projectsCount} projets</span>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex items-center gap-8 md:gap-12 shrink-0">
                    <div className="text-center">
                      <div className="font-syne font-black text-2xl text-[#FF4F00]">{dev.stats.avgDelayMonths} <span className="text-sm text-[#A3A3A3] font-bold">m</span></div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#A3A3A3] mt-0.5">Retard</div>
                    </div>
                    <div className="text-center">
                      <div className="font-syne font-black text-2xl text-[#0A0A0A]">{dev.scores.quality}<span className="text-sm text-[#A3A3A3]">/10</span></div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#A3A3A3] mt-0.5">Qualite</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-[#FF4F00] fill-[#FF4F00]" />
                        <span className="font-syne font-black text-2xl text-[#0A0A0A]">{dev.scores.reputation}</span>
                      </div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#A3A3A3] mt-0.5">{dev.stats.ratingCount} avis</div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="w-11 h-11 rounded-full border border-[#E8E4D9] flex items-center justify-center shrink-0 group-hover:bg-[#FF4F00] group-hover:border-[#FF4F00] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-[#A3A3A3] group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              </Link>
            </Reveal>
          ))}

          {filtered.length === 0 && (
            <Reveal>
              <div className="py-32 text-center bg-white rounded-[2rem] border border-[#E8E4D9]">
                <Building2 className="w-12 h-12 text-[#E8E4D9] mx-auto mb-4" />
                <p className="font-syne font-bold text-xl text-[#A3A3A3] uppercase">Aucun promoteur trouve</p>
                <button onClick={() => { setSearch(""); setSegment("Tous"); }} className="mt-6 text-sm font-bold text-[#FF4F00] underline underline-offset-4">
                  Effacer les filtres
                </button>
              </div>
            </Reveal>
          )}
        </div>

        {/* Certification Banner */}
        <Reveal delay={0.2}>
          <div className="mt-16 bg-[#0A0A0A] rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-6 h-6 text-[#FF4F00]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#FF4F00]">Audit certifie</span>
              </div>
              <h3 className="font-syne font-black text-3xl md:text-4xl text-white uppercase leading-tight">
                Votre promoteur<br />n'est pas liste ?
              </h3>
            </div>
            <Link
              href="/immo"
              className="shrink-0 flex items-center gap-3 bg-[#FF4F00] text-white font-bold px-8 py-5 rounded-full hover:bg-white hover:text-[#FF4F00] transition-all duration-300 text-sm uppercase tracking-widest group"
            >
              Soumettre un avis
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}