import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ModalProvider } from '@/components/ui/ModalProvider';
import { AILegalAdvisor } from '@/components/immo/AILegalAdvisor';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-secondary dark:text-white`}>
        <ModalProvider>
          {children}
        </ModalProvider>
        <AILegalAdvisor />
      </body>
    </html>
  );
}
