'use client';

import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import { useTutorialStore } from '@/stores/tutorialStore';
import { tutorialSteps } from '@/lib/tutorialSteps';

export function ProgressBar() {
  const { currentStepId, completedSteps, isActive, getProgress } = useTutorialStore();

  if (!isActive) return null;

  const progress = getProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-sm border-b border-[#3B82F6]/30">
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Progress info */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm font-medium">
            Étape {currentStepId} sur {tutorialSteps.length}
          </span>
          <span className="text-[#3B82F6] text-sm font-bold">
            {progress}% complété
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#3B82F6] to-[#FF7043] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Step indicators */}
        <div className="flex justify-between mt-3">
          {tutorialSteps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const isCurrent = step.id === currentStepId;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center"
              >
                <motion.div
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                    transition-colors duration-300
                    ${isCompleted
                      ? 'bg-[#4E9A06] text-white'
                      : isCurrent
                        ? 'bg-[#3B82F6] text-white ring-2 ring-[#3B82F6]/50 ring-offset-2 ring-offset-[#0F172A]'
                        : 'bg-white/20 text-white/50'
                    }
                  `}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isCurrent ? 1.1 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
