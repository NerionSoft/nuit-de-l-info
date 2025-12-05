'use client';

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useTutorialStore } from '@/stores/tutorialStore';
import { useDesktopStore } from '@/stores/desktopStore';
import { ProgressBar } from './ProgressBar';
import { StepCard } from './StepCard';
import { ExplanationPopup } from './ExplanationPopup';
import { TutorialHighlight } from './TutorialHighlight';

export function TutorialOverlay() {
  const { isActive, getCurrentStep, phase } = useTutorialStore();
  const { openWindow, windows } = useDesktopStore();

  const currentStep = getCurrentStep();

  // Auto-open terminal when reaching terminal phase
  useEffect(() => {
    if (!isActive) return;

    // Only auto-open terminal for terminal phase (not for action phases where user must open it)
    if (phase === 'terminal') {
      const terminalWindow = windows.find((w) => w.app === 'terminal' && !w.isMinimized);
      if (!terminalWindow) {
        openWindow('terminal');
      }
    }
  }, [isActive, phase, windows, openWindow]);

  if (!isActive || !currentStep) return null;

  return (
    <>
      {/* Highlight overlay for action steps */}
      <TutorialHighlight />

      {/* Progress bar at top */}
      <ProgressBar />

      {/* Step card (QCM or instruction) */}
      <AnimatePresence mode="wait">
        <StepCard key={`${currentStep.id}-${phase}`} step={currentStep} />
      </AnimatePresence>

      {/* Explanation popup */}
      <ExplanationPopup step={currentStep} />
    </>
  );
}
