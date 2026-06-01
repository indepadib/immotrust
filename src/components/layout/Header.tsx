import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4">
      <div className="absolute inset-0 bg-[#FDFCF7]/80 backdrop-blur-xl border-b border-black/5" />

      {/* Logo */}
      <Link href="/immo" className="relative flex items-center gap-2 group">
        <div className="w-8 h-8 rounded-lg bg-[#0A0A0A] flex items-center justify-center group-hover:bg-[#FF4F00] transition-colors duration-300">
          <ShieldCheck className="w-4 h-4 text-white" />
        </div>
        <span className="font-syne font-bold text-[15px] text-[#0A0A0A] uppercase tracking-widest">
          Avis Promoteur
        </span>
      </Link>

      {/* Nav */}
      <nav className="relative hidden md:flex items-center gap-8">
        {[
          { label: "Promoteurs", href: "/immo/developers" },
          { label: "Projets", href: "/immo/projects" },
          { label: "Comment ca marche", href: "#how" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-[13px] font-bold text-[#666666] uppercase tracking-widest hover:text-[#0A0A0A] transition-colors duration-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <Link
        href="/immo/developers"
        className="relative flex items-center gap-2 bg-[#0A0A0A] text-white text-[12px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-[#FF4F00] transition-colors duration-300 group"
      >
        Consulter
        <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </header>
  );
};