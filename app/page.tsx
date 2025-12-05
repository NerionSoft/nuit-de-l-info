import type { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Sidebar } from '@/components/landing/Sidebar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { AppShowcase } from '@/components/landing/AppShowcase';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Learning Linux : Apprends Linux en jouant',
  description:
    'Plateforme interactive pour apprendre Linux avec une simulation complète dans le navigateur.',
  openGraph: {
    title: 'Learning Linux : Apprends Linux en jouant',
    description:
      'Plateforme interactive pour apprendre Linux avec une simulation complète dans le navigateur.',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#EEEFE9]">
      <Navbar />
      <Sidebar />
      <Hero />
      <Features />
      <AppShowcase />
      <HowItWorks />
      <Footer />
    </main>
  );
}
