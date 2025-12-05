import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserMetrics {
  // Progression de l'apprentissage
  commandsExecuted: number;
  filesCreated: number;
  foldersCreated: number;
  appsOpened: number;
  totalTimeSpent: number; // en secondes
  sessionsCount: number;

  // Métriques écologiques (simulées)
  energySaved: number; // en Wh - comparé à un ordinateur physique
  co2Saved: number; // en grammes de CO2
  waterSaved: number; // en litres (refroidissement serveurs)

  // Badges débloqués
  badges: string[];

  // Historique journalier
  dailyActivity: {
    date: string;
    commands: number;
    timeSpent: number;
  }[];
}

interface MetricsStore {
  metrics: UserMetrics;

  // Actions de tracking
  incrementCommands: () => void;
  incrementFiles: () => void;
  incrementFolders: () => void;
  incrementApps: () => void;
  addTimeSpent: (seconds: number) => void;
  addBadge: (badge: string) => void;
  updateDailyActivity: (commands: number, timeSpent: number) => void;

  // Calculs
  calculateEnergySavings: () => void;
  resetMetrics: () => void;
}

const INITIAL_METRICS: UserMetrics = {
  commandsExecuted: 0,
  filesCreated: 0,
  foldersCreated: 0,
  appsOpened: 0,
  totalTimeSpent: 0,
  sessionsCount: 1,
  energySaved: 0,
  co2Saved: 0,
  waterSaved: 0,
  badges: [],
  dailyActivity: [],
};

export const useMetricsStore = create<MetricsStore>()(
  persist(
    (set, get) => ({
      metrics: INITIAL_METRICS,

      incrementCommands: () => {
        set((state) => {
          const newCommands = state.metrics.commandsExecuted + 1;
          const badges = [...state.metrics.badges];

          // Débloquer des badges
          if (newCommands === 1 && !badges.includes('first-command')) {
            badges.push('first-command');
          }
          if (newCommands === 10 && !badges.includes('terminal-novice')) {
            badges.push('terminal-novice');
          }
          if (newCommands === 50 && !badges.includes('terminal-expert')) {
            badges.push('terminal-expert');
          }

          return {
            metrics: {
              ...state.metrics,
              commandsExecuted: newCommands,
              badges,
            },
          };
        });
        get().calculateEnergySavings();
      },

      incrementFiles: () => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            filesCreated: state.metrics.filesCreated + 1,
          },
        }));
        get().calculateEnergySavings();
      },

      incrementFolders: () => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            foldersCreated: state.metrics.foldersCreated + 1,
          },
        }));
        get().calculateEnergySavings();
      },

      incrementApps: () => {
        set((state) => {
          const newApps = state.metrics.appsOpened + 1;
          const badges = [...state.metrics.badges];

          if (newApps === 1 && !badges.includes('first-app')) {
            badges.push('first-app');
          }
          if (newApps === 5 && !badges.includes('app-explorer')) {
            badges.push('app-explorer');
          }

          return {
            metrics: {
              ...state.metrics,
              appsOpened: newApps,
              badges,
            },
          };
        });
      },

      addTimeSpent: (seconds: number) => {
        set((state) => ({
          metrics: {
            ...state.metrics,
            totalTimeSpent: state.metrics.totalTimeSpent + seconds,
          },
        }));
        get().calculateEnergySavings();
      },

      addBadge: (badge: string) => {
        set((state) => {
          if (!state.metrics.badges.includes(badge)) {
            return {
              metrics: {
                ...state.metrics,
                badges: [...state.metrics.badges, badge],
              },
            };
          }
          return state;
        });
      },

      updateDailyActivity: (commands: number, timeSpent: number) => {
        set((state) => {
          const today = new Date().toISOString().split('T')[0];
          const dailyActivity = [...state.metrics.dailyActivity];
          const todayIndex = dailyActivity.findIndex((d) => d.date === today);

          if (todayIndex >= 0) {
            dailyActivity[todayIndex] = {
              date: today,
              commands: dailyActivity[todayIndex].commands + commands,
              timeSpent: dailyActivity[todayIndex].timeSpent + timeSpent,
            };
          } else {
            dailyActivity.push({ date: today, commands, timeSpent });
          }

          // Garder seulement les 30 derniers jours
          const filtered = dailyActivity.slice(-30);

          return {
            metrics: {
              ...state.metrics,
              dailyActivity: filtered,
            },
          };
        });
      },

      calculateEnergySavings: () => {
        set((state) => {
          const { totalTimeSpent, commandsExecuted } = state.metrics;

          // Calculs simulés basés sur des données réelles
          // Un PC moyen consomme ~65W, un serveur cloud partagé ~5W par utilisateur
          const hoursSpent = totalTimeSpent / 3600;
          const energySaved = hoursSpent * (65 - 5); // 60Wh d'économie par heure

          // 1 kWh = ~475g de CO2 en France (mix électrique)
          const co2Saved = (energySaved / 1000) * 475;

          // Refroidissement serveurs : ~1.5L d'eau par kWh
          const waterSaved = (energySaved / 1000) * 1.5;

          return {
            metrics: {
              ...state.metrics,
              energySaved: Math.round(energySaved * 10) / 10,
              co2Saved: Math.round(co2Saved * 10) / 10,
              waterSaved: Math.round(waterSaved * 100) / 100,
            },
          };
        });
      },

      resetMetrics: () => {
        set({ metrics: INITIAL_METRICS });
      },
    }),
    {
      name: 'learnlinux-metrics',
    }
  )
);
