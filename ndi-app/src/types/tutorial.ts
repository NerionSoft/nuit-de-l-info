// Types pour le système de tutoriel gamifié

export type TutorialStepType =
  | 'intro'
  | 'action'
  | 'qcm'
  | 'terminal'
  | 'explore'
  | 'completion';

export type TutorialPhase =
  | 'intro'
  | 'action'
  | 'qcm'
  | 'terminal'
  | 'explanation'
  | 'completed';

export type ActionType =
  | 'double-click-icon'
  | 'click-taskbar'
  | 'close-window'
  | 'open-app'
  | 'click-button'
  | 'wait';

export type TargetElement =
  | 'desktop-icon-terminal'
  | 'desktop-icon-files'
  | 'desktop-icon-settings'
  | 'desktop-icon-trash'
  | 'desktop-icon-browser'
  | 'desktop-icon-writer'
  | 'desktop-icon-calc'
  | 'desktop-icon-impress'
  | 'taskbar-activities'
  | 'window-close'
  | 'window-terminal'
  | 'window-files'
  | 'window-settings'
  | 'window-writer';

export interface QCMOption {
  label: string;
  isCorrect: boolean;
}

export interface QCMData {
  question: string;
  options: QCMOption[];
  hint?: string;
}

export interface ActionData {
  type: ActionType;
  target?: TargetElement;
  description: string;
  highlightSelector?: string;
}

export interface CommandValidation {
  expectedCommand: string | RegExp;
  successMessage: string;
  errorMessage: string;
}

export interface Explanation {
  title: string;
  command?: string;
  description: string;
  syntax?: string;
  examples?: string[];
  tips?: string[];
}

export interface MascotMessage {
  text: string;
  mood: 'neutral' | 'happy' | 'thinking' | 'celebrating' | 'excited';
}

export interface TutorialStep {
  id: number;
  type: TutorialStepType;
  title: string;
  subtitle?: string;
  description: string;
  mascotMessage?: MascotMessage;
  action?: ActionData;
  qcm?: QCMData;
  command?: CommandValidation;
  explanation?: Explanation;
  icon?: string;
  autoAdvance?: boolean;
}

export interface TutorialProgress {
  currentStepId: number;
  phase: TutorialPhase;
  completedSteps: number[];
  qcmAnswered: boolean;
  commandExecuted: boolean;
  startedAt?: Date;
  completedAt?: Date;
}

export interface TutorialState extends TutorialProgress {
  isActive: boolean;
  showExplanation: boolean;
  wrongAnswerCount: number;
  totalSteps: number;
}
