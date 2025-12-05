'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Trophy,
  ChevronRight,
  X,
  CheckCircle2,
  XCircle,
  Lightbulb,
  MousePointer2,
  Eye,
} from 'lucide-react';
import { useTutorialStore } from '@/stores/tutorialStore';
import { Mascot } from './Mascot';
import type { TutorialStep, MascotMessage } from '@/types/tutorial';

interface StepCardProps {
  step: TutorialStep;
}

// Helper to get mascot mood
const getMascotMood = (message?: MascotMessage) => {
  return message?.mood || 'neutral';
};

export function StepCard({ step }: StepCardProps) {
  const {
    phase,
    qcmAnswered,
    answerQcm,
    nextStep,
    wrongAnswerCount,
    stopTutorial,
    currentStepId,
  } = useTutorialStore();

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleOptionClick = (index: number) => {
    if (qcmAnswered) return;

    setSelectedOption(index);
    const correct = answerQcm(index);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (!correct) {
      if (wrongAnswerCount >= 1) {
        setShowHint(true);
      }
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
      }, 1500);
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // INTRO STEP
  // ═══════════════════════════════════════════════════════════════
  if (step.type === 'intro') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <div className="bg-[#2C001E] border border-[#E95420]/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative">
          <button
            onClick={stopTutorial}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mb-4"
            >
              <Mascot size="lg" mood={getMascotMood(step.mascotMessage)} />
            </motion.div>

            {step.mascotMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 relative"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white/10" />
                <p className="text-white/90 text-sm italic">"{step.mascotMessage.text}"</p>
              </motion.div>
            )}

            <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
            {step.subtitle && (
              <p className="text-[#E95420] font-medium mb-4">{step.subtitle}</p>
            )}
            <p className="text-white/70 mb-8">{step.description}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-3 bg-[#E95420] text-white rounded-lg font-medium hover:bg-[#C7410D] transition-colors"
            >
              C'est parti !
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // EXPLORE STEP (découverte sans action requise)
  // ═══════════════════════════════════════════════════════════════
  if (step.type === 'explore') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed right-4 bottom-20 z-40 w-[420px]"
      >
        <div className="bg-[#2C001E]/95 backdrop-blur-sm border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-blue-500/20 px-4 py-3 border-b border-blue-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mascot size="sm" mood={getMascotMood(step.mascotMessage)} />
                <div>
                  <span className="text-blue-400 font-medium block">{step.title}</span>
                  <span className="text-white/50 text-xs">Étape {step.id}</span>
                </div>
              </div>
              <button
                onClick={stopTutorial}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {step.mascotMessage && (
              <div className="bg-blue-500/10 rounded-lg p-3 mb-4 border-l-4 border-blue-500">
                <p className="text-blue-200 text-sm italic">"{step.mascotMessage.text}"</p>
              </div>
            )}

            {step.subtitle && (
              <p className="text-white/60 text-sm mb-4">{step.subtitle}</p>
            )}

            <p className="text-white/80 mb-4">{step.description}</p>

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-white/50 text-sm">Prends le temps d'explorer !</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep}
              className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium hover:bg-blue-500/30 transition-colors border border-blue-500/30"
            >
              J'ai compris, on continue !
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // ACTION STEP (double-click, click, etc.)
  // ═══════════════════════════════════════════════════════════════
  if (step.type === 'action' && phase === 'action') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed right-4 bottom-20 z-40 w-[420px]"
      >
        <div className="bg-[#2C001E]/95 backdrop-blur-sm border border-[#E95420]/30 rounded-xl shadow-2xl overflow-hidden">
          {/* Header avec mascotte excitée */}
          <div className="bg-[#E95420]/20 px-4 py-3 border-b border-[#E95420]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mascot size="sm" mood={getMascotMood(step.mascotMessage)} />
                <div>
                  <span className="text-[#E95420] font-medium block">{step.title}</span>
                  <span className="text-white/50 text-xs">Étape {step.id}</span>
                </div>
              </div>
              <button
                onClick={stopTutorial}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Message de la mascotte */}
            {step.mascotMessage && (
              <div className="bg-[#E95420]/10 rounded-lg p-3 mb-4 border-l-4 border-[#E95420]">
                <p className="text-orange-200 text-sm italic">"{step.mascotMessage.text}"</p>
              </div>
            )}

            {step.subtitle && (
              <p className="text-white/60 text-sm mb-2">{step.subtitle}</p>
            )}

            <p className="text-white/80 mb-4">{step.description}</p>

            {/* Instruction visuelle */}
            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-[#E95420]/20 rounded-lg p-4 border-2 border-dashed border-[#E95420]/50"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <MousePointer2 className="w-6 h-6 text-[#E95420]" />
                </motion.div>
                <span className="text-white font-medium">
                  {step.action?.description}
                </span>
              </div>
            </motion.div>

            <p className="text-white/40 text-xs mt-4 text-center">
              L'étape avancera automatiquement quand tu auras fait l'action
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // QCM STEP
  // ═══════════════════════════════════════════════════════════════
  if (step.type === 'qcm' && phase === 'qcm') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed right-4 bottom-20 z-40 w-[420px]"
      >
        <div className="bg-[#2C001E]/95 backdrop-blur-sm border border-[#E95420]/30 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#E95420]/20 px-4 py-3 border-b border-[#E95420]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mascot size="sm" mood={getMascotMood(step.mascotMessage)} />
                <div>
                  <span className="text-white font-medium block">{step.title}</span>
                  <span className="text-white/50 text-xs">Étape {step.id}</span>
                </div>
              </div>
              <button
                onClick={stopTutorial}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            {/* Message mascotte */}
            {step.mascotMessage && (
              <div className="bg-[#E95420]/10 rounded-lg p-3 mb-4 border-l-4 border-[#E95420]">
                <p className="text-orange-200 text-sm italic">"{step.mascotMessage.text}"</p>
              </div>
            )}

            {/* Question */}
            <div className="bg-white/5 rounded-lg p-3 mb-4">
              <p className="text-white font-medium">{step.qcm?.question}</p>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {step.qcm?.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const showCorrectFeedback = showFeedback && isSelected && isCorrect;
                const showWrongFeedback = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={index}
                    whileHover={{ scale: qcmAnswered ? 1 : 1.02 }}
                    whileTap={{ scale: qcmAnswered ? 1 : 0.98 }}
                    onClick={() => handleOptionClick(index)}
                    disabled={qcmAnswered}
                    className={`
                      w-full p-3 rounded-lg text-left font-mono text-sm transition-all duration-200
                      ${showCorrectFeedback
                        ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                        : showWrongFeedback
                          ? 'bg-red-500/20 border-2 border-red-500 text-red-400'
                          : isSelected
                            ? 'bg-[#E95420]/30 border-2 border-[#E95420] text-white'
                            : 'bg-white/5 border-2 border-transparent text-white/80 hover:bg-white/10 hover:border-white/20'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option.label}</span>
                      {showCorrectFeedback && <CheckCircle2 className="ml-auto w-5 h-5 text-green-400" />}
                      {showWrongFeedback && <XCircle className="ml-auto w-5 h-5 text-red-400" />}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Hint */}
            <AnimatePresence>
              {showHint && step.qcm?.hint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5" />
                    <p className="text-yellow-200 text-sm">{step.qcm.hint}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // TERMINAL INSTRUCTION (après QCM réussi)
  // ═══════════════════════════════════════════════════════════════
  if (phase === 'terminal') {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed right-4 bottom-20 z-40 w-[420px]"
      >
        <div className="bg-[#2C001E]/95 backdrop-blur-sm border border-green-500/30 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-green-500/20 px-4 py-3 border-b border-green-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mascot size="sm" mood="happy" />
                <div>
                  <span className="text-green-400 font-medium block">Bonne réponse !</span>
                  <span className="text-white/50 text-xs">À toi de jouer</span>
                </div>
              </div>
              <button
                onClick={stopTutorial}
                className="text-white/50 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="bg-green-500/10 rounded-lg p-3 mb-4 border-l-4 border-green-500">
              <p className="text-green-200 text-sm italic">
                "Excellent ! Maintenant, tape cette commande dans le terminal !"
              </p>
            </div>

            {/* Commande */}
            <div className="bg-[#300A24] rounded-lg p-4 font-mono relative">
              <div className="absolute -top-2 left-4 bg-[#300A24] px-2 text-xs text-white/50">
                Commande
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <span className="text-green-400">$</span>
                <span className="text-[#E95420] font-bold text-lg">
                  {step.command?.expectedCommand.toString().replace(/\\/g, '')}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-white/50 text-sm">
              <Terminal className="w-4 h-4" />
              <p>Tape la commande et appuie sur Entrée</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // COMPLETION STEP
  // ═══════════════════════════════════════════════════════════════
  if (step.type === 'completion') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      >
        <div className="bg-gradient-to-br from-[#2C001E] to-[#4A0D37] border border-[#E95420]/30 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
          {/* Sparkles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                initial={{ x: Math.random() * 400, y: Math.random() * 400, opacity: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="mb-4 relative"
            >
              <Mascot size="lg" mood="celebrating" />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-2 -right-2"
              >
                <Trophy className="w-10 h-10 text-yellow-400" />
              </motion.div>
            </motion.div>

            {step.mascotMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-yellow-400/20 backdrop-blur-sm rounded-xl p-4 mb-4 relative border border-yellow-400/30"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-yellow-400/20" />
                <p className="text-yellow-200 text-sm italic">"{step.mascotMessage.text}"</p>
              </motion.div>
            )}

            <h2 className="text-3xl font-bold text-white mb-2">{step.title}</h2>
            {step.subtitle && (
              <p className="text-[#E95420] font-medium mb-4 text-lg">{step.subtitle}</p>
            )}
            <p className="text-white/70 mb-8">{step.description}</p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopTutorial}
              className="px-6 py-3 bg-[#E95420] text-white rounded-lg font-medium hover:bg-[#C7410D] transition-colors"
            >
              Continuer à explorer !
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
