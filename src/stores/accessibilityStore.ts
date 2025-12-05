import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AccessibilitySettings {
  // Vision
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  highContrast: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';

  // Navigation
  keyboardNavigation: boolean;
  screenReaderOptimized: boolean;
  focusIndicators: boolean;

  // Language & Content
  language: 'fr' | 'en' | 'es' | 'de';
  simplifiedUI: boolean;
  tooltipsEnabled: boolean;

  // Audio
  soundEffects: boolean;
  voiceFeedback: boolean;
}

interface AccessibilityStore {
  settings: AccessibilitySettings;

  // Vision Actions
  setFontSize: (size: AccessibilitySettings['fontSize']) => void;
  toggleHighContrast: () => void;
  toggleDyslexiaFont: () => void;
  toggleReducedMotion: () => void;
  setColorBlindMode: (mode: AccessibilitySettings['colorBlindMode']) => void;

  // Navigation Actions
  toggleKeyboardNavigation: () => void;
  toggleScreenReaderOptimized: () => void;
  toggleFocusIndicators: () => void;

  // Language & Content Actions
  setLanguage: (lang: AccessibilitySettings['language']) => void;
  toggleSimplifiedUI: () => void;
  toggleTooltips: () => void;

  // Audio Actions
  toggleSoundEffects: () => void;
  toggleVoiceFeedback: () => void;

  // Reset to defaults
  resetToDefaults: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'medium',
  highContrast: false,
  dyslexiaFont: false,
  reducedMotion: false,
  colorBlindMode: 'none',
  keyboardNavigation: true,
  screenReaderOptimized: false,
  focusIndicators: true,
  language: 'fr',
  simplifiedUI: false,
  tooltipsEnabled: true,
  soundEffects: false,
  voiceFeedback: false,
};

export const useAccessibilityStore = create<AccessibilityStore>()(
  persist(
    (set, get) => ({
      settings: defaultSettings,

      // Vision Actions
      setFontSize: (size) => {
        set((state) => ({
          settings: { ...state.settings, fontSize: size },
        }));
      },

      toggleHighContrast: () => {
        set((state) => ({
          settings: { ...state.settings, highContrast: !state.settings.highContrast },
        }));
      },

      toggleDyslexiaFont: () => {
        set((state) => ({
          settings: { ...state.settings, dyslexiaFont: !state.settings.dyslexiaFont },
        }));
      },

      toggleReducedMotion: () => {
        set((state) => ({
          settings: { ...state.settings, reducedMotion: !state.settings.reducedMotion },
        }));
      },

      setColorBlindMode: (mode) => {
        set((state) => ({
          settings: { ...state.settings, colorBlindMode: mode },
        }));
      },

      // Navigation Actions
      toggleKeyboardNavigation: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            keyboardNavigation: !state.settings.keyboardNavigation,
          },
        }));
      },

      toggleScreenReaderOptimized: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            screenReaderOptimized: !state.settings.screenReaderOptimized,
          },
        }));
      },

      toggleFocusIndicators: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            focusIndicators: !state.settings.focusIndicators,
          },
        }));
      },

      // Language & Content Actions
      setLanguage: (lang) => {
        set((state) => ({
          settings: { ...state.settings, language: lang },
        }));
        // Also update RSE store language
        const { useRSEStore } = require('./rseStore');
        useRSEStore.getState().setLanguagePreference(lang);
      },

      toggleSimplifiedUI: () => {
        set((state) => ({
          settings: { ...state.settings, simplifiedUI: !state.settings.simplifiedUI },
        }));
      },

      toggleTooltips: () => {
        set((state) => ({
          settings: { ...state.settings, tooltipsEnabled: !state.settings.tooltipsEnabled },
        }));
      },

      // Audio Actions
      toggleSoundEffects: () => {
        set((state) => ({
          settings: { ...state.settings, soundEffects: !state.settings.soundEffects },
        }));
      },

      toggleVoiceFeedback: () => {
        set((state) => ({
          settings: { ...state.settings, voiceFeedback: !state.settings.voiceFeedback },
        }));
      },

      // Reset
      resetToDefaults: () => {
        set({ settings: defaultSettings });
      },
    }),
    {
      name: 'accessibility-storage',
    }
  )
);

// Helper function to get font size class
export function getFontSizeClass(fontSize: AccessibilitySettings['fontSize']): string {
  const sizeMap = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
    'extra-large': 'text-xl',
  };
  return sizeMap[fontSize];
}

// Helper function to get dyslexia font class
export function getDyslexiaFontClass(enabled: boolean): string {
  return enabled ? 'font-opendyslexic' : '';
}

// Color blind filter functions
export function getColorBlindFilter(
  mode: AccessibilitySettings['colorBlindMode']
): string | null {
  const filters = {
    none: null,
    protanopia: 'url(#protanopia-filter)', // Red-blind
    deuteranopia: 'url(#deuteranopia-filter)', // Green-blind
    tritanopia: 'url(#tritanopia-filter)', // Blue-blind
  };
  return filters[mode];
}
