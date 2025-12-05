import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TutorialState, TutorialPhase, TargetElement } from '@/types/tutorial';
import { tutorialSteps } from '@/lib/tutorialSteps';

interface TutorialStore extends TutorialState {
  // Actions
  startTutorial: () => void;
  stopTutorial: () => void;
  resetTutorial: () => void;

  // QCM
  answerQcm: (optionIndex: number) => boolean;
  incrementWrongAnswer: () => void;

  // Terminal
  validateCommand: (command: string) => boolean;

  // Action steps (click, double-click, etc.)
  validateAction: (target: TargetElement) => boolean;

  // Navigation
  setPhase: (phase: TutorialPhase) => void;
  showExplanationPopup: () => void;
  hideExplanationPopup: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (stepId: number) => void;

  // Helpers
  getCurrentStep: () => typeof tutorialSteps[0] | undefined;
  getProgress: () => number;
  isStepCompleted: (stepId: number) => boolean;
  getHighlightTarget: () => string | null;
}

const initialState: TutorialState = {
  isActive: false,
  currentStepId: 1,
  phase: 'intro',
  completedSteps: [],
  qcmAnswered: false,
  commandExecuted: false,
  showExplanation: false,
  wrongAnswerCount: 0,
  totalSteps: tutorialSteps.length,
};

export const useTutorialStore = create<TutorialStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      startTutorial: () => {
        set({
          isActive: true,
          currentStepId: 1,
          phase: 'intro',
          completedSteps: [],
          qcmAnswered: false,
          commandExecuted: false,
          showExplanation: false,
          wrongAnswerCount: 0,
          startedAt: new Date(),
        });
      },

      stopTutorial: () => {
        set({ isActive: false });
      },

      resetTutorial: () => {
        set({ ...initialState });
      },

      answerQcm: (optionIndex: number) => {
        const step = get().getCurrentStep();
        if (!step?.qcm) return false;

        const isCorrect = step.qcm.options[optionIndex]?.isCorrect ?? false;

        if (isCorrect) {
          set({
            qcmAnswered: true,
            phase: 'terminal',
          });
        } else {
          get().incrementWrongAnswer();
        }

        return isCorrect;
      },

      incrementWrongAnswer: () => {
        set((state) => ({
          wrongAnswerCount: state.wrongAnswerCount + 1,
        }));
      },

      validateCommand: (command: string) => {
        const step = get().getCurrentStep();
        if (!step?.command) return false;

        const { expectedCommand } = step.command;
        const normalizedCommand = command.trim().toLowerCase();

        let isValid = false;
        if (expectedCommand instanceof RegExp) {
          isValid = expectedCommand.test(normalizedCommand);
        } else {
          // Allow flexible matching - command should contain the expected command
          isValid = normalizedCommand === expectedCommand.toLowerCase() ||
                    normalizedCommand.startsWith(expectedCommand.toLowerCase());
        }

        if (isValid) {
          set({
            commandExecuted: true,
            showExplanation: true,
            phase: 'explanation',
          });
        }

        return isValid;
      },

      validateAction: (target: TargetElement) => {
        const step = get().getCurrentStep();
        if (!step?.action) return false;

        const isValid = step.action.target === target;

        if (isValid) {
          // Move to next step automatically after action
          setTimeout(() => {
            get().nextStep();
          }, 500);
        }

        return isValid;
      },

      setPhase: (phase: TutorialPhase) => {
        set({ phase });
      },

      showExplanationPopup: () => {
        set({ showExplanation: true });
      },

      hideExplanationPopup: () => {
        set({ showExplanation: false });
      },

      nextStep: () => {
        const { currentStepId, completedSteps, totalSteps } = get();

        // Mark current step as completed
        const newCompletedSteps = completedSteps.includes(currentStepId)
          ? completedSteps
          : [...completedSteps, currentStepId];

        const nextStepId = currentStepId + 1;

        if (nextStepId > totalSteps) {
          // Tutorial completed
          set({
            completedSteps: newCompletedSteps,
            phase: 'completed',
            completedAt: new Date(),
          });
          return;
        }

        const nextStep = tutorialSteps.find((s) => s.id === nextStepId);

        // Determine initial phase based on step type
        let initialPhase: TutorialPhase = 'intro';
        if (nextStep?.type === 'qcm') {
          initialPhase = 'qcm';
        } else if (nextStep?.type === 'action') {
          initialPhase = 'action';
        } else if (nextStep?.type === 'explore') {
          initialPhase = 'intro'; // explore uses intro phase for display
        } else if (nextStep?.type === 'completion') {
          initialPhase = 'completed';
        }

        set({
          currentStepId: nextStepId,
          phase: initialPhase,
          completedSteps: newCompletedSteps,
          qcmAnswered: false,
          commandExecuted: false,
          showExplanation: false,
          wrongAnswerCount: 0,
        });
      },

      previousStep: () => {
        const { currentStepId } = get();
        if (currentStepId <= 1) return;

        const prevStepId = currentStepId - 1;
        const prevStep = tutorialSteps.find((s) => s.id === prevStepId);

        let initialPhase: TutorialPhase = 'intro';
        if (prevStep?.type === 'qcm') {
          initialPhase = 'qcm';
        }

        set({
          currentStepId: prevStepId,
          phase: initialPhase,
          qcmAnswered: false,
          commandExecuted: false,
          showExplanation: false,
        });
      },

      goToStep: (stepId: number) => {
        const step = tutorialSteps.find((s) => s.id === stepId);
        if (!step) return;

        let initialPhase: TutorialPhase = 'intro';
        if (step.type === 'qcm') {
          initialPhase = 'qcm';
        } else if (step.type === 'completion') {
          initialPhase = 'completed';
        }

        set({
          currentStepId: stepId,
          phase: initialPhase,
          qcmAnswered: false,
          commandExecuted: false,
          showExplanation: false,
        });
      },

      getCurrentStep: () => {
        const { currentStepId } = get();
        return tutorialSteps.find((s) => s.id === currentStepId);
      },

      getProgress: () => {
        const { completedSteps, totalSteps } = get();
        return Math.round((completedSteps.length / totalSteps) * 100);
      },

      isStepCompleted: (stepId: number) => {
        return get().completedSteps.includes(stepId);
      },

      getHighlightTarget: () => {
        const step = get().getCurrentStep();
        if (step?.action?.highlightSelector) {
          return step.action.highlightSelector;
        }
        return null;
      },
    }),
    {
      name: 'linux-tutorial-progress',
      partialize: (state) => ({
        completedSteps: state.completedSteps,
        currentStepId: state.currentStepId,
      }),
    }
  )
);
