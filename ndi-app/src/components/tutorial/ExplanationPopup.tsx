'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  BookOpen,
  Terminal,
  Lightbulb,
  ChevronRight,
  Code,
  Sparkles,
} from 'lucide-react';
import { useTutorialStore } from '@/stores/tutorialStore';
import { Mascot } from './Mascot';
import type { TutorialStep } from '@/types/tutorial';

interface ExplanationPopupProps {
  step: TutorialStep;
}

export function ExplanationPopup({ step }: ExplanationPopupProps) {
  const { showExplanation, hideExplanationPopup, nextStep } = useTutorialStore();

  if (!step.explanation) return null;

  const { title, command, description, syntax, examples, tips } = step.explanation;

  const handleContinue = () => {
    hideExplanationPopup();
    nextStep();
  };

  return (
    <AnimatePresence>
      {showExplanation && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-gradient-to-br from-[#2C001E] to-[#3D0D2B] border border-[#E95420]/40 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden"
          >
            {/* Success header avec mascotte */}
            <div className="bg-green-500/20 px-6 py-4 border-b border-green-500/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mascot size="sm" mood="celebrating" />
                  <div>
                    <h3 className="text-green-400 font-bold text-lg">
                      Bravo !
                    </h3>
                    <p className="text-green-300/70 text-sm">
                      Commande exécutée avec succès
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleContinue}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              {/* Title & command */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-[#E95420]" />
                  <h4 className="text-white font-bold text-lg">{title}</h4>
                </div>
                <p className="text-white/70">{description}</p>
              </div>

              {/* Syntax */}
              {syntax && (
                <div className="bg-[#300A24] rounded-lg p-4">
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                    <Code className="w-4 h-4" />
                    <span>Syntaxe</span>
                  </div>
                  <code className="text-[#E95420] font-mono">{syntax}</code>
                </div>
              )}

              {/* Examples */}
              {examples && examples.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
                    <Terminal className="w-4 h-4" />
                    <span>Exemples</span>
                  </div>
                  <div className="bg-[#300A24] rounded-lg p-3 space-y-1">
                    {examples.map((example, i) => (
                      <div key={i} className="font-mono text-sm">
                        <span className="text-green-400">$ </span>
                        <span className="text-white/80">{example}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              {tips && tips.length > 0 && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Astuces</span>
                  </div>
                  <ul className="space-y-1">
                    {tips.map((tip, i) => (
                      <li key={i} className="text-yellow-200/80 text-sm flex items-start gap-2">
                        <span className="text-yellow-400 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-white/5 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#E95420] text-white rounded-lg font-medium hover:bg-[#C7410D] transition-colors"
              >
                Continuer
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
