'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, ArrowRight, ArrowUpRight, BarChart3, Users, Star } from 'lucide-react';
import { DeveloperCard } from '@/components/immo/DeveloperCard';
import { MOCK_DEVELOPERS } from '@/data/immoMock';
import { Reveal } from '@/components/ui/Reveal';

export default function PremiumHomePage() {
  const topDevelopers = MOCK_DEVELOPERS.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#FDFCF7] relative overflow-hidden font-sans text-[#0A0A0A]">
      
      {/* Hero Section - True Dribbble Aesthetic (Airy, Asymmetrical, Massive Typography) */}
      <section className="relative pt-32 pb-20 px-4 md:px-8 xl:px-0">
        <div className="container mx-auto max-w-[1400px]">
          
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
             
             {/* Left Text Content */}
             <div className="lg:col-span-7 space-y-10 relative z-20">
               <Reveal direction="down">
                  <div className="inline-flex items-center gap-2 bg-[#F3F1EA] text-[#0A0A0A] px-4 py-2 rounded-full font-bold text-xs border border-[#E8E4D9]">
                    <span className="w-2 h-2 rounded-full bg-[#FF4F00] animate-pulse" />
                    Nouvelle norme de l'immobilier neuf
                  </div>
               </Reveal>
               
               <Reveal delay={0.2}>
                  <h1 className="text-6xl sm:text-7xl lg:text-[100px] font-black text-[#0A0A0A] font-syne leading-[0.9] tracking-tighter uppercase">
                    Invest with <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A0A0A] to-[#666666]">zero surprise.</span>
                  </h1>
               </Reveal>
               
               <Reveal delay={0.4}>
                  <p className="text-lg md:text-xl text-[#666666] font-medium max-w-xl leading-relaxed">
                    La plateforme exclusive d'audit souverain. Retards, finitions, SAV : accédez aux données réelles avant de signer.
                  </p>
               </Reveal>
               
               <Reveal delay={0.6}>
                  <div className="max-w-xl bg-white p-2 rounded-[2rem] shadow-[0_20px_40px_rgb(0,0,0,0.04)] border border-[#E8E4D9] flex items-center hover:shadow-[0_30px_60px_rgb(0,0,0,0.08)] transition-shadow duration-500">
                    <div className="pl-6 text-[#A3A3A3]">
                      <Search className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Promoteur, Projet, Quartier..." 
                      className="flex-1 bg-transparent outline-none px-4 py-4 text-[#0A0A0A] font-bold placeholder-[#A3A3A3] text-sm md:text-base"
                    />
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-[#0A0A0A] text-white px-8 py-4 rounded-3xl font-bold hover:bg-[#FF4F00] transition-colors duration-500 text-sm flex items-center gap-2 group"
                    >
                      Auditer <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                  </div>
               </Reveal>
               
               {/* Quick Stats Micro-UI */}
               <Reveal delay={0.8}>
                  <div className="flex gap-12 pt-8 border-t border-[#E8E4D9]/50">
                     <div>
                        <div className="text-3xl font-black font-syne text-[#0A0A0A]">8.4k</div>
                        <div className="text-xs font-bold text-[#A3A3A3] uppercase tracking-widest mt-1">Avis Vérifiés</div>
                     </div>
                     <div>
                        <div className="text-3xl font-black font-syne text-[#0A0A0A]">340+</div>
                        <div className="text-xs font-bold text-[#A3A3A3] uppercase tracking-widest mt-1">Projets Audités</div>
                     </div>
                  </div>
               </Reveal>
             </div>

             {/* Right Visual Area (Asymmetrical Image + Micro-UI) */}
             <div className="lg:col-span-5 relative w-full h-[600px] lg:h-[800px]">
                <Reveal direction="left" delay={0.4}>
                   <div className="absolute top-10 right-0 w-[90%] h-[90%] rounded-[3rem] overflow-hidden shadow-2xl">
                     <Image 
                       src="/luxury_architecture.png" 
                       alt="Luxury Architecture" 
                       fill
                       className="object-cover"
                     />
                   </div>
                </Reveal>
                
                {/* Floating Micro-UI 1: Profile Stack */}
                <Reveal direction="up" delay={0.8}>
                   <motion.div 
                      whileHover={{ y: -5 }}
                      className="absolute top-32 -left-12 bg-white/80 backdrop-blur-xl p-4 rounded-3xl shadow-xl border border-white/50 flex items-center gap-4"
                   >
                      <div className="flex -space-x-4">
                         {[1,2,3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden relative">
                               <Image src={https://i.pravatar.cc/100?img= + (i+10)} alt="User" fill />
                            </div>
                         ))}
                      </div>
                      <div>
                         <div className="text-xs font-black text-[#0A0A0A]">Acheteurs certifiés</div>
                         <div className="flex items-center gap-1 text-[#FF4F00]">
                            <Star className="w-3 h-3 fill-[#FF4F00]" />
                            <Star className="w-3 h-3 fill-[#FF4F00]" />
                            <Star className="w-3 h-3 fill-[#FF4F00]" />
                            <Star className="w-3 h-3 fill-[#FF4F00]" />
                            <Star className="w-3 h-3 fill-[#FF4F00]" />
                         </div>
                      </div>
                   </motion.div>
                </Reveal>

                {/* Floating Micro-UI 2: Performance Chart */}
                <Reveal direction="up" delay={1}>
                   <motion.div 
                      whileHover={{ y: -5 }}
                      className="absolute bottom-32 -right-8 bg-[#0A0A0A]/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/10 text-white w-48"
                   >
                      <div className="flex items-center gap-2 mb-3">
                         <div className="w-8 h-8 rounded-xl bg-[#FF4F00]/20 flex items-center justify-center">
                            <BarChart3 className="w-4 h-4 text-[#FF4F00]" />
                         </div>
                         <div className="text-xs font-bold uppercase tracking-wider text-[#A3A3A3]">Data Score</div>
                      </div>
                      <div className="text-3xl font-black font-syne mb-1">98%</div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-[#FF4F00] w-[98%]" />
                      </div>
                   </motion.div>
                </Reveal>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 relative z-10 bg-white border-t border-[#E8E4D9]/50 rounded-[4rem] -mt-10 shadow-[0_-20px_40px_rgb(0,0,0,0.02)]">
        <div className="container mx-auto px-4 max-w-7xl">
          <Reveal>
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
               <div className="max-w-2xl">
                 <h2 className="text-5xl font-black text-[#0A0A0A] font-syne tracking-tight mb-4 uppercase">
                    Promoteurs à la une
                 </h2>
                 <p className="text-[#666666] text-lg">
                    La vérité sur les délais et la qualité, soutenue par des centaines d'actes d'achat vérifiés.
                 </p>
               </div>
               <Link href="/immo/developers" className="group flex items-center gap-3 bg-[#F3F1EA] px-6 py-3 rounded-2xl font-bold text-[#0A0A0A] hover:bg-[#FF4F00] hover:text-white transition-colors duration-500">
                 Classement complet <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
             </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topDevelopers.map((dev, idx) => (
              <Reveal key={dev.id} delay={idx * 0.15}>
                 <DeveloperCard developer={dev} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}