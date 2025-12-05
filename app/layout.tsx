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
  title: {
    default: 'Learning Linux : Apprends Linux en jouant',
    template: '%s | Learning Linux',
  },
  description:
    'Plateforme interactive pour apprendre Linux avec une simulation complète dans le navigateur.',
  keywords: ['Linux', 'Simulateur', 'Terminal', 'Apprentissage', 'Éducation', 'Commandes Linux'],
  authors: [{ name: "Nuit de l'Info" }],
  openGraph: {
    title: 'Learning Linux : Apprends Linux en jouant',
    description:
      'Plateforme interactive pour apprendre Linux avec une simulation complète dans le navigateur.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Learning Linux : Apprends Linux en jouant',
    description:
      'Plateforme interactive pour apprendre Linux avec une simulation complète dans le navigateur.',
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
