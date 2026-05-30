import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ModalProvider } from '@/components/ui/ModalProvider';
import { AILegalAdvisor } from '@/components/immo/AILegalAdvisor';
import { Header } from '@/components/layout/Header';
import { Metadata } from 'next';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: {
    default: 'Avis Promoteur Maroc | Intelligence Immobilière & Audits Souverains',
    template: '%s | Avis Promoteur Maroc'
  },
  description: 'La première plateforme d\'audit et d\'intelligence immobilière au Maroc. Vérifiez la fiabilité des promoteurs, analysez les prix m² réels et évitez les retards de livraison.',
  keywords: ['immobilier maroc', 'casablanca', 'audit immobilier', 'promoteur maroc', 'achat appartement maroc', 'prix m2 maroc', 'avis promoteur'],
  authors: [{ name: 'Avis Promoteur Maroc Team' }],
  openGraph: {
    title: 'Avis Promoteur Maroc | Intelligence & Audits',
    description: 'Vérifiez vos futurs investissements immobiliers avec la donnée réelle.',
    url: 'https://avispromoteurmaroc.ma',
    siteName: 'Avis Promoteur Maroc',
    locale: 'fr_MA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avis Promoteur Maroc',
    description: 'Intelligence & Audits Immobiliers Souverains.',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-secondary dark:text-white`}>
        <Header />
        <ModalProvider>
          {children}
        </ModalProvider>
        <AILegalAdvisor />
      </body>
    </html>
  );
}
