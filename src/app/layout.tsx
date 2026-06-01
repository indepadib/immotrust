import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne" });

export const metadata: Metadata = {
  title: "ImmoTrust | La Référence de l'Audit Immobilier",
  description: "Avis vérifiés, audits techniques et analyses juridiques pour investir dans l'immobilier neuf au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.variable + " " + syne.variable + " font-sans antialiased bg-[#FDFCF7] text-[#0A0A0A]"}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}