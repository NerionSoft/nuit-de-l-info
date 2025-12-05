'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Desktop } from '@/components/desktop/Desktop';
import { TutorialOverlay } from '@/components/tutorial';
import { useTutorialStore } from '@/stores/tutorialStore';
import { Monitor } from 'lucide-react';

function DesktopContent() {
  const searchParams = useSearchParams();
  const { startTutorial, isActive: isTutorialActive } = useTutorialStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for tutorial mode from URL
  useEffect(() => {
    const tutorialParam = searchParams.get('tutorial');
    if (tutorialParam === 'true' && !isTutorialActive) {
      // Start tutorial after boot sequence
      const timer = setTimeout(() => {
        startTutorial();
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [searchParams, startTutorial, isTutorialActive]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate boot sequence
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Loading screen (boot sequence)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#2C001E] flex flex-col items-center justify-center">
        <div className="w-24 h-24 mb-8">
          <svg viewBox="0 0 100 100" className="animate-pulse">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E95420" strokeWidth="2" />
            <circle cx="50" cy="50" r="35" fill="none" stroke="#E95420" strokeWidth="2" />
            <circle cx="50" cy="50" r="25" fill="none" stroke="#E95420" strokeWidth="2" />
            <circle cx="50" cy="50" r="10" fill="#E95420" />
          </svg>
        </div>
        <div className="text-white text-xl font-light">Ubuntu Simulator</div>
        <div className="mt-8 flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/30 animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Mobile warning
  if (isMobile) {
    return (
      <div className="min-h-screen bg-[#2C001E] flex flex-col items-center justify-center p-8 text-center">
        <Monitor className="w-16 h-16 text-[#E95420] mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">
          Desktop requis
        </h1>
        <p className="text-white/70 max-w-md mb-8">
          Le simulateur Ubuntu nécessite un écran plus large pour fonctionner correctement.
          Ouvre cette page sur un ordinateur pour profiter de l&apos;expérience complète.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[#E95420] text-white rounded-lg font-medium hover:bg-[#C7410D] transition-colors"
        >
          Retour à l&apos;accueil
        </a>
      </div>
    );
  }

  return (
    <>
      <Desktop />
      <TutorialOverlay />
    </>
  );
}

export default function DesktopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#2C001E] flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    }>
      <DesktopContent />
    </Suspense>
  );
}
