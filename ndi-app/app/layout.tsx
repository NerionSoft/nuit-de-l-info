import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Learnlinux - Simulateur Ubuntu Interactif',
  description:
    'Apprends Linux de manière interactive avec notre simulateur Ubuntu. Terminal, gestionnaire de fichiers, et plus encore - directement dans ton navigateur.',
  keywords: ['Ubuntu', 'Linux', 'Simulateur', 'Terminal', 'Apprentissage', 'Éducation'],
  authors: [{ name: 'Nuit de l\'Info' }],
  openGraph: {
    title: 'Learnlinux - Simulateur Ubuntu Interactif',
    description: 'Apprends Linux de manière interactive avec notre simulateur Ubuntu.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
