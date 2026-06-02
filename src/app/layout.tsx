import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Avis Promoteur | L'Audit Immobilier Souverain au Maroc",
  description: "Retards de livraison, qualite de finition, SAV : acces aux donnees reelles avant de signer. Plus de 8 000 avis verifies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.variable + " " + syne.variable + " font-sans antialiased cursor-none"}>
        <CustomCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}