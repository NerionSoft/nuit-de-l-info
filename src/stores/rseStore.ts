import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Métriques RSE (Responsabilité Sociétale des Entreprises)
export interface RSEMetrics {
  // Pilier Environnemental 🌍
  environmental: {
    greenCommandsUsed: number; // Commandes éco-responsables utilisées
    energyEfficiencyScore: number; // Score d'efficacité énergétique (0-100)
    codeOptimizationLevel: number; // Niveau d'optimisation du code (0-100)
    carbonAwareness: number; // Conscience de l'empreinte carbone (0-100)
  };

  // Pilier Social 👥
  social: {
    accessibilityScore: number; // Score d'accessibilité (0-100)
    inclusivityLevel: number; // Niveau d'inclusivité (0-100)
    helpGiven: number; // Nombre d'aides consultées
    adaptiveLearningUsed: boolean; // Utilisation de l'apprentissage adaptatif
    languagePreference: string; // Préférence de langue
  };

  // Pilier Éthique 🔒
  ethical: {
    privacyScore: number; // Score de confidentialité (0-100)
    dataTransparency: number; // Transparence des données (0-100)
    consentGiven: boolean; // Consentement RGPD donné
    dataExportsRequested: number; // Demandes d'export de données
    ethicalCharterAccepted: boolean; // Charte éthique acceptée
  };

  // Badges RSE débloqués
  rseBadges: string[];

  // Niveau RSE global (0-100)
  globalRSEScore: number;
}

interface RSEStore {
  metrics: RSEMetrics;

  // Actions - Pilier Environnemental
  incrementGreenCommands: () => void;
  updateEnergyScore: (score: number) => void;
  updateCodeOptimization: (level: number) => void;
  increaseCarbonAwareness: (points: number) => void;

  // Actions - Pilier Social
  updateAccessibilityScore: (score: number) => void;
  updateInclusivityLevel: (level: number) => void;
  incrementHelpGiven: () => void;
  enableAdaptiveLearning: () => void;
  setLanguagePreference: (lang: string) => void;

  // Actions - Pilier Éthique
  updatePrivacyScore: (score: number) => void;
  updateDataTransparency: (score: number) => void;
  giveConsent: () => void;
  requestDataExport: () => void;
  acceptEthicalCharter: () => void;

  // Actions - Badges
  unlockRSEBadge: (badge: string) => void;
  calculateGlobalScore: () => void;
}

const calculateScore = (metrics: RSEMetrics): number => {
  const envScore = (
    metrics.environmental.energyEfficiencyScore +
    metrics.environmental.codeOptimizationLevel +
    metrics.environmental.carbonAwareness
  ) / 3;

  const socialScore = (
    metrics.social.accessibilityScore +
    metrics.social.inclusivityLevel +
    (metrics.social.adaptiveLearningUsed ? 20 : 0)
  ) / 2.2;

  const ethicalScore = (
    metrics.ethical.privacyScore +
    metrics.ethical.dataTransparency +
    (metrics.ethical.consentGiven ? 30 : 0) +
    (metrics.ethical.ethicalCharterAccepted ? 20 : 0)
  ) / 2.5;

  return Math.round((envScore + socialScore + ethicalScore) / 3);
};

export const useRSEStore = create<RSEStore>()(
  persist(
    (set, get) => ({
      metrics: {
        environmental: {
          greenCommandsUsed: 0,
          energyEfficiencyScore: 50,
          codeOptimizationLevel: 50,
          carbonAwareness: 0,
        },
        social: {
          accessibilityScore: 50,
          inclusivityLevel: 50,
          helpGiven: 0,
          adaptiveLearningUsed: false,
          languagePreference: 'fr',
        },
        ethical: {
          privacyScore: 100, // Par défaut maximal (local-first)
          dataTransparency: 100, // Par défaut maximal (open source)
          consentGiven: false,
          dataExportsRequested: 0,
          ethicalCharterAccepted: false,
        },
        rseBadges: [],
        globalRSEScore: 50,
      },

      // Pilier Environnemental
      incrementGreenCommands: () => {
        set((state) => {
          const newCount = state.metrics.environmental.greenCommandsUsed + 1;
          const newMetrics = {
            ...state.metrics,
            environmental: {
              ...state.metrics.environmental,
              greenCommandsUsed: newCount,
            },
          };

          // Débloquer badge "Éco-codeur" à 10 commandes vertes
          if (newCount === 10 && !state.metrics.rseBadges.includes('eco-coder')) {
            newMetrics.rseBadges = [...state.metrics.rseBadges, 'eco-coder'];
          }

          return { metrics: newMetrics };
        });
        get().calculateGlobalScore();
      },

      updateEnergyScore: (score: number) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            environmental: {
              ...state.metrics.environmental,
              energyEfficiencyScore: Math.min(100, Math.max(0, score)),
            },
          },
        }));
        get().calculateGlobalScore();
      },

      updateCodeOptimization: (level: number) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            environmental: {
              ...state.metrics.environmental,
              codeOptimizationLevel: Math.min(100, Math.max(0, level)),
            },
          },
        }));
        get().calculateGlobalScore();
      },

      increaseCarbonAwareness: (points: number) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            environmental: {
              ...state.metrics.environmental,
              carbonAwareness: Math.min(
                100,
                state.metrics.environmental.carbonAwareness + points
              ),
            },
          },
        }));
        get().calculateGlobalScore();
      },

      // Pilier Social
      updateAccessibilityScore: (score: number) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            social: {
              ...state.metrics.social,
              accessibilityScore: Math.min(100, Math.max(0, score)),
            },
          },
        }));
        get().calculateGlobalScore();
      },

      updateInclusivityLevel: (level: number) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            social: {
              ...state.metrics.social,
              inclusivityLevel: Math.min(100, Math.max(0, level)),
            },
          },
        }));
        get().calculateGlobalScore();
      },

      incrementHelpGiven: () => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            social: {
              ...state.metrics.social,
              helpGiven: state.metrics.social.helpGiven + 1,
            },
          },
        }));
      },

      enableAdaptiveLearning: () => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            social: {
              ...state.metrics.social,
              adaptiveLearningUsed: true,
            },
          },
        }));
        get().calculateGlobalScore();
      },

      setLanguagePreference: (lang: string) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            social: {
              ...state.metrics.social,
              languagePreference: lang,
            },
          },
        }));
      },

      // Pilier Éthique
      updatePrivacyScore: (score: number) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            ethical: {
              ...state.metrics.ethical,
              privacyScore: Math.min(100, Math.max(0, score)),
            },
          },
        }));
        get().calculateGlobalScore();
      },

      updateDataTransparency: (score: number) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            ethical: {
              ...state.metrics.ethical,
              dataTransparency: Math.min(100, Math.max(0, score)),
            },
          },
        }));
        get().calculateGlobalScore();
      },

      giveConsent: () => {
        set((state) => {
          const newMetrics = {
            ...state.metrics,
            ethical: {
              ...state.metrics.ethical,
              consentGiven: true,
            },
          };

          // Débloquer badge "Citoyen numérique"
          if (!state.metrics.rseBadges.includes('digital-citizen')) {
            newMetrics.rseBadges = [...state.metrics.rseBadges, 'digital-citizen'];
          }

          return { metrics: newMetrics };
        });
        get().calculateGlobalScore();
      },

      requestDataExport: () => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            ethical: {
              ...state.metrics.ethical,
              dataExportsRequested: state.metrics.ethical.dataExportsRequested + 1,
            },
          },
        }));
      },

      acceptEthicalCharter: () => {
        set((state) => {
          const newMetrics = {
            ...state.metrics,
            ethical: {
              ...state.metrics.ethical,
              ethicalCharterAccepted: true,
            },
          };

          // Débloquer badge "Éthique engagé"
          if (!state.metrics.rseBadges.includes('ethical-engaged')) {
            newMetrics.rseBadges = [...state.metrics.rseBadges, 'ethical-engaged'];
          }

          return { metrics: newMetrics };
        });
        get().calculateGlobalScore();
      },

      // Badges et Score
      unlockRSEBadge: (badge: string) => {
        set((state) => {
          if (!state.metrics.rseBadges.includes(badge)) {
            return {
              metrics: {
                ...state.metrics,
                rseBadges: [...state.metrics.rseBadges, badge],
              },
            };
          }
          return state;
        });
      },

      calculateGlobalScore: () => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            globalRSEScore: calculateScore(state.metrics),
          },
        }));
      },
    }),
    {
      name: 'rse-storage',
    }
  )
);
