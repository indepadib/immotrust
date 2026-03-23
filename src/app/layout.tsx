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
    default: 'ImmoTrust Maroc | Intelligence Immobilière & Audits Souverains',
    template: '%s | ImmoTrust Maroc'
  },
  description: 'La première plateforme d\'audit et d\'intelligence immobilière au Maroc. Vérifiez la fiabilité des promoteurs, analysez les prix m² réels et évitez les retards de livraison.',
  keywords: ['immobilier maroc', 'casablanca', 'audit immobilier', 'promoteur maroc', 'achat appartement maroc', 'prix m2 maroc'],
  authors: [{ name: 'ImmoTrust Team' }],
  openGraph: {
    title: 'ImmoTrust Maroc | Intelligence & Audits',
    description: 'Vérifiez vos futurs investissements immobiliers avec la donnée réelle.',
    url: 'https://immotrust.ma',
    siteName: 'ImmoTrust',
    locale: 'fr_MA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ImmoTrust Maroc',
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
