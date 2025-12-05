import { Navbar } from '@/components/landing/Navbar';
import { Sidebar } from '@/components/landing/Sidebar';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { AppShowcase } from '@/components/landing/AppShowcase';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Footer } from '@/components/landing/Footer';

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
