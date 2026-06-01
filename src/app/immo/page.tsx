"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { ArrowUpRight, ShieldCheck, BarChart3, Clock, Users, Star, CheckCircle, ChevronRight, Zap, FileSearch, MessageSquare, ArrowRight } from "lucide-react";
import { MOCK_DEVELOPERS } from "@/data/immoMock";

// ------- Animated Counter -------
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString("fr")}{suffix}</span>;
}

// ------- Testimonials data -------
const TESTIMONIALS = [
  { name: "Karim B.", city: "Casablanca", text: "J'ai evite un promoteur avec 14 mois de retard grace aux avis verifies. Cette plateforme m'a sauve des annees d'angoisse.", rating: 5 },
  { name: "Sarah M.", city: "Rabat", text: "Qualite de finition notee 4/10 par les acheteurs precedents. J'ai negocie 15% de remise avant signature. Incroyable.", rating: 5 },
  { name: "Youssef A.", city: "Tanger", text: "Enfin de la transparence dans l'immobilier marocain. Je recommande a tous mes amis qui cherchent dans le neuf.", rating: 5 },
  { name: "Nadia K.", city: "Marrakech", text: "Le score d'audit m'a confirme mon pressentiment. Le promoteur avait deja 3 projets en litige. Merci!", rating: 5 },
  { name: "Omar R.", city: "Agadir", text: "Interface claire, donnees pertinentes, acheteurs verifies. C'est ce qui manquait au marche marocain.", rating: 5 },
  { name: "Fatima Z.", city: "Fes", text: "Grace au simulateur de rendement, j'ai compris que mon projet etait surcote de 20%. Essentiel avant tout achat.", rating: 5 },
  { name: "Hamid D.", city: "Kenitra", text: "Excellent service. J'ai compare 5 promoteurs en 10 minutes. Donnees fiables et analyses tres detaillees.", rating: 5 },
  { name: "Leila S.", city: "Oujda", text: "La carte interactive des retards de livraison est geniale. On voit en un coup d'oeil les zones a risque.", rating: 5 },
];

// ------- HOW IT WORKS steps -------
const STEPS = [
  { icon: FileSearch, num: "01", title: "Recherchez un promoteur", desc: "Entrez le nom d'un promoteur ou d'un projet. Notre base couvre 340+ residences au Maroc." },
  { icon: BarChart3, num: "02", title: "Consultez l'audit complet", desc: "Score de confiance, retards historiques, qualite de finition, avis d'acheteurs verifies par actes." },
  { icon: MessageSquare, num: "03", title: "Prenez votre decision", desc: "Comparez les promoteurs, simulez votre rendement et investissez en pleine connaissance de cause." },
];

// ------- FEATURES bento grid -------
const FEATURES = [
  { title: "8 400+", sub: "Avis verifies", icon: Users, size: "tall", accent: "bg-[#FF4F00]" },
  { title: "Score de confiance", sub: "Algorithmique et independant", icon: ShieldCheck, size: "normal", accent: "bg-[#0A0A0A]" },
  { title: "Retards historiques", sub: "Par promoteur et par projet", icon: Clock, size: "normal", accent: "bg-[#0A0A0A]" },
  { title: "340+", sub: "Projets audites", icon: BarChart3, size: "wide", accent: "bg-[#FF4F00]" },
];

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const topDevs = MOCK_DEVELOPERS.slice(0, 3);
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="grain-overlay bg-[#FDFCF7] text-[#0A0A0A] overflow-x-hidden">

      {/* ═══════════════════════════════════
           HERO — Full-screen parallax
      ═══════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-16 overflow-hidden">

        {/* Parallax background image */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <Image
            src="/hero-morocco.png"
            alt="Architecture de luxe au Maroc"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
        </motion.div>

        {/* Hero Content */}
        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-6 md:px-10 max-w-[1400px]">

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="flex items-center gap-2 glass-dark text-white text-[11px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#FF4F00] animate-pulse" />
              La reference de l'audit immobilier
            </div>
          </motion.div>

          {/* Giant headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-syne font-black text-white text-[clamp(3rem,10vw,9rem)] leading-[0.88] tracking-tighter uppercase"
            >
              L'audit<br />qui vous<br />protege.
            </motion.h1>
          </div>

          {/* Subtitle + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          >
            <p className="text-white/70 text-lg md:text-xl font-medium max-w-lg leading-relaxed">
              Retards reels, qualite de finition, SAV : acces aux donnees acheteurs avant de signer.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/immo/developers"
                className="group flex items-center gap-3 bg-[#FF4F00] text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-[#0A0A0A] transition-all duration-500 text-sm uppercase tracking-widest animate-glow"
              >
                Auditer un promoteur
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <button className="text-white/60 text-sm font-bold uppercase tracking-widest hover:text-white transition-colors">
                Voir comment ca marche
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════
           STATS TICKER BAR
      ═══════════════════════════════════ */}
      <section className="bg-[#0A0A0A] py-6 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-0">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-16 px-16">
              <span className="text-white/30 font-syne text-sm uppercase tracking-[0.2em]">8 400 avis verifies</span>
              <span className="text-[#FF4F00]">✦</span>
              <span className="text-white/30 font-syne text-sm uppercase tracking-[0.2em]">340 projets audites</span>
              <span className="text-[#FF4F00]">✦</span>
              <span className="text-white/30 font-syne text-sm uppercase tracking-[0.2em]">100% independant</span>
              <span className="text-[#FF4F00]">✦</span>
              <span className="text-white/30 font-syne text-sm uppercase tracking-[0.2em]">Actes d'achat verifies</span>
              <span className="text-[#FF4F00]">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
           STATS SECTION
      ═══════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: 8400, suffix: "+", label: "Avis verifies", note: "par actes d'achat" },
              { value: 340, suffix: "+", label: "Projets audites", note: "dans 15 villes" },
              { value: 98, suffix: "%", label: "Fiabilite", note: "score algorithmique" },
              { value: 72, suffix: "h", label: "Delai d'audit", note: "apres soumission" },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-[#E8E4D9] rounded-[2rem] p-8 hover:border-[#FF4F00]/40 hover:shadow-[0_20px_40px_rgba(255,79,0,0.06)] transition-all duration-500 group"
              >
                <div className="font-syne font-black text-[clamp(2.5rem,5vw,4rem)] text-[#0A0A0A] leading-none group-hover:text-gradient-orange transition-all duration-300">
                  <Counter target={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 font-bold text-[#0A0A0A] text-base">{s.label}</div>
                <div className="text-[#A3A3A3] text-xs mt-1 uppercase tracking-wider">{s.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           AUDIT PROCESS IMAGE SECTION
      ═══════════════════════════════════ */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-[3rem] overflow-hidden aspect-[16/7] w-full"
          >
            <Image src="/audit-process.png" alt="Processus d'audit" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center px-12 md:px-20">
              <div className="max-w-xl text-white">
                <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#FF4F00] mb-4">Methode exclusive</div>
                <h2 className="font-syne font-black text-4xl md:text-6xl leading-tight uppercase mb-6">
                  Chaque avis<br />est un acte.
                </h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  Nous ne publions que des temoignages d'acheteurs ayant fourni leur compromis de vente ou leur acte authentique. Zero faux avis. Zero anonymat suspect.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           HOW IT WORKS
      ═══════════════════════════════════ */}
      <section id="how" className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-start gap-8 mb-20"
          >
            <h2 className="font-syne font-black text-[clamp(2.5rem,6vw,5rem)] text-[#0A0A0A] leading-none uppercase max-w-xl">
              Comment ca marche ?
            </h2>
            <p className="text-[#666] text-lg max-w-sm leading-relaxed md:pt-4">
              Trois etapes pour investir dans l'immobilier avec un niveau d'information jamais vu au Maroc.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-white border border-[#E8E4D9] rounded-[2.5rem] p-10 hover:border-[#FF4F00]/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.06)] transition-all duration-700 hover:-translate-y-2"
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#FDFCF7] border border-[#E8E4D9] flex items-center justify-center group-hover:bg-[#FF4F00] group-hover:border-[#FF4F00] transition-all duration-500">
                    <step.icon className="w-6 h-6 text-[#A3A3A3] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <span className="font-syne font-black text-7xl text-[#F0EDE6] leading-none select-none">{step.num}</span>
                </div>
                <h3 className="font-syne font-bold text-2xl text-[#0A0A0A] mb-4 uppercase">{step.title}</h3>
                <p className="text-[#666] leading-relaxed">{step.desc}</p>
                <div className="mt-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#A3A3A3] group-hover:text-[#FF4F00] transition-colors">
                  En savoir plus <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           TESTIMONIALS MARQUEE
      ═══════════════════════════════════ */}
      <section className="py-24 overflow-hidden bg-[#F5F2EB]">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px] mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne font-black text-[clamp(2rem,5vw,4.5rem)] text-[#0A0A0A] uppercase"
          >
            Ils ont investi<br />en connaissance de cause.
          </motion.h2>
        </div>

        {/* First row - left to right */}
        <div className="flex gap-5 mb-5 w-max animate-marquee">
          {doubled.slice(0, 10).map((t, i) => (
            <div key={i} className="w-[360px] shrink-0 bg-white rounded-[2rem] p-8 border border-[#E8E4D9]">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#FF4F00] fill-[#FF4F00]" />
                ))}
              </div>
              <p className="text-[#444] text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white text-[11px] font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0A0A0A]">{t.name}</div>
                  <div className="text-xs text-[#A3A3A3]">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second row - right to left */}
        <div className="flex gap-5 w-max animate-marquee-reverse">
          {doubled.slice(4, 14).map((t, i) => (
            <div key={i} className="w-[360px] shrink-0 bg-white rounded-[2rem] p-8 border border-[#E8E4D9]">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#FF4F00] fill-[#FF4F00]" />
                ))}
              </div>
              <p className="text-[#444] text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FF4F00] flex items-center justify-center text-white text-[11px] font-bold">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-sm text-[#0A0A0A]">{t.name}</div>
                  <div className="text-xs text-[#A3A3A3]">{t.city}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
           TOP PROMOTEURS
      ═══════════════════════════════════ */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16"
          >
            <h2 className="font-syne font-black text-[clamp(2.5rem,5vw,4.5rem)] text-[#0A0A0A] uppercase leading-none">
              Promoteurs<br />a la une
            </h2>
            <Link
              href="/immo/developers"
              className="group flex items-center gap-3 border-2 border-[#0A0A0A] text-[#0A0A0A] text-[11px] font-bold uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
            >
              Classement complet <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {topDevs.map((dev, i) => (
              <motion.div
                key={dev.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={"/immo/developers/" + dev.id} className="block group">
                  <div className="bg-white border border-[#E8E4D9] rounded-[2.5rem] p-8 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-[#F5F2EB] border border-[#E8E4D9] flex items-center justify-center font-syne font-black text-xl text-[#0A0A0A]">
                          {dev.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-syne font-bold text-base text-[#0A0A0A] uppercase tracking-tight leading-tight">{dev.name}</h3>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A3A3A3]">{dev.segment}</span>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-full border border-[#E8E4D9] flex items-center justify-center group-hover:bg-[#FF4F00] group-hover:border-[#FF4F00] transition-all duration-300">
                        <ArrowUpRight className="w-4 h-4 text-[#A3A3A3] group-hover:text-white transition-colors" />
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      <div className="bg-[#F5F2EB] rounded-2xl p-5">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#A3A3A3] mb-2">Retard moyen</div>
                        <div className="font-syne font-black text-3xl text-[#FF4F00]">
                          {dev.stats.avgDelayMonths}
                          <span className="text-sm font-bold text-[#A3A3A3] ml-1">mois</span>
                        </div>
                      </div>
                      <div className="bg-[#F5F2EB] rounded-2xl p-5">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#A3A3A3] mb-2">Qualite bati</div>
                        <div className="font-syne font-black text-3xl text-[#0A0A0A]">
                          {dev.scores.quality}
                          <span className="text-sm font-bold text-[#A3A3A3]">/10</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-6 border-t border-[#E8E4D9]">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#FF4F00] fill-[#FF4F00]" />
                        <span className="font-bold text-sm">{dev.scores.reputation}</span>
                        <span className="text-xs text-[#A3A3A3]">({dev.stats.ratingCount} avis)</span>
                      </div>
                      <span className="text-xs font-bold text-[#A3A3A3] uppercase tracking-wider">{dev.stats.projectsCount} projets</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           FEATURES BENTO GRID
      ═══════════════════════════════════ */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-syne font-black text-[clamp(2.5rem,6vw,5rem)] text-white uppercase mb-16 max-w-2xl leading-none"
          >
            Pourquoi nous faire confiance ?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: ShieldCheck,
                title: "Independance totale",
                desc: "Nous ne percevons aucune commission des promoteurs. Notre seul revenu est l'abonnement des utilisateurs.",
                big: false,
              },
              {
                icon: FileSearch,
                title: "Actes verifies",
                desc: "Chaque avis est accompagne d'une piece justificative (compromis, acte de vente). Pas de faux temoignages.",
                big: true,
              },
              {
                icon: BarChart3,
                title: "Algorithme proprietaire",
                desc: "Notre score de confiance est calcule sur 14 criteres independants. Ni manipulable, ni achetable.",
                big: false,
              },
              {
                icon: Zap,
                title: "Donnees en temps reel",
                desc: "Les informations de chantier sont mises a jour toutes les 48h par nos verificateurs terrain.",
                big: false,
              },
              {
                icon: CheckCircle,
                title: "100% marocain",
                desc: "Construit a Casablanca, pour le marche marocain, par des experts du secteur immobilier local.",
                big: false,
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className={"group border border-white/10 rounded-[2rem] p-10 hover:border-[#FF4F00]/50 hover:bg-white/5 transition-all duration-500" + (f.big ? " md:col-span-1 md:row-span-2" : "")}
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-[#FF4F00] group-hover:border-[#FF4F00] transition-all duration-500">
                  <f.icon className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-syne font-bold text-white text-xl uppercase mb-4">{f.title}</h3>
                <p className="text-white/50 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           FINAL CTA
      ═══════════════════════════════════ */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#FF4F00] rounded-[3rem] px-12 md:px-20 py-20 md:py-28 overflow-hidden"
          >
            {/* Background texture */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }} />

            <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
              <div>
                <p className="text-white/70 text-sm font-bold uppercase tracking-[0.25em] mb-6">Pret a investir sereinement ?</p>
                <h2 className="font-syne font-black text-[clamp(3rem,7vw,6rem)] text-white uppercase leading-none">
                  Votre audit<br />en 60 secondes.
                </h2>
              </div>
              <div className="flex flex-col gap-4 shrink-0">
                <Link
                  href="/immo/developers"
                  className="group flex items-center gap-3 bg-white text-[#FF4F00] font-bold px-8 py-5 rounded-full hover:bg-[#0A0A0A] hover:text-white transition-all duration-500 text-sm uppercase tracking-widest"
                >
                  Rechercher un promoteur
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
           FOOTER
      ═══════════════════════════════════ */}
      <footer className="border-t border-[#E8E4D9] py-10">
        <div className="container mx-auto px-6 md:px-10 max-w-[1400px] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-syne font-black text-sm text-[#0A0A0A] uppercase tracking-widest">Avis Promoteur</span>
          <p className="text-xs text-[#A3A3A3]">Donnees independantes. Temoignages certifies. &copy; 2024</p>
          <div className="flex gap-6">
            {["Promoteurs", "Projets", "Contact"].map((l) => (
              <Link key={l} href="#" className="text-xs font-bold uppercase tracking-widest text-[#A3A3A3] hover:text-[#FF4F00] transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}