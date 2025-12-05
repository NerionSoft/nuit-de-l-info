'use client';

import { useEffect, useRef } from 'react';
import { useMetricsStore } from '@/stores/metricsStore';

export function MetricsTracker() {
  const addTimeSpent = useMetricsStore((state) => state.addTimeSpent);
  const updateDailyActivity = useMetricsStore((state) => state.updateDailyActivity);
  const commandsExecuted = useMetricsStore((state) => state.metrics.commandsExecuted);

  const startTime = useRef(Date.now());
  const lastCommandCount = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Tracker de temps toutes les 10 secondes
    intervalRef.current = setInterval(() => {
      addTimeSpent(10);

      // Mise à jour de l'activité quotidienne toutes les minutes
      const commandsDelta = commandsExecuted - lastCommandCount.current;
      if (commandsDelta > 0) {
        updateDailyActivity(commandsDelta, 10);
        lastCommandCount.current = commandsExecuted;
      }
    }, 10000); // 10 secondes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Sauvegarder le temps final à la fermeture
      const finalTime = Math.floor((Date.now() - startTime.current) / 1000);
      addTimeSpent(finalTime);
    };
  }, [addTimeSpent, updateDailyActivity, commandsExecuted]);

  return null; // Ce composant ne rend rien
}
