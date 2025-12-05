'use client';

import { useEffect, useRef } from 'react';
import { useMetricsStore } from '@/stores/metricsStore';

export function MetricsTracker() {
  const addTimeSpent = useMetricsStore((state) => state.addTimeSpent);
  const updateDailyActivity = useMetricsStore((state) => state.updateDailyActivity);
  const commandsExecuted = useMetricsStore((state) => state.metrics.commandsExecuted);

  const startTime = useRef(Date.now());
  const lastSaveTime = useRef(Date.now());
  const lastCommandCount = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    // Reset le temps de départ
    startTime.current = Date.now();
    lastSaveTime.current = Date.now();
    lastCommandCount.current = commandsExecuted;

    // Tracker de temps toutes les secondes (plus précis)
    intervalRef.current = setInterval(() => {
      const now = Date.now();
      const elapsedSeconds = Math.floor((now - lastSaveTime.current) / 1000);

      if (elapsedSeconds > 0) {
        addTimeSpent(elapsedSeconds);
        lastSaveTime.current = now;

        // Mise à jour de l'activité quotidienne
        const commandsDelta = commandsExecuted - lastCommandCount.current;
        if (commandsDelta > 0 || elapsedSeconds >= 60) {
          updateDailyActivity(commandsDelta, elapsedSeconds);
          lastCommandCount.current = commandsExecuted;
        }
      }
    }, 1000); // Toutes les secondes

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Sauvegarder le temps restant à la fermeture
      const now = Date.now();
      const finalSeconds = Math.floor((now - lastSaveTime.current) / 1000);
      if (finalSeconds > 0) {
        addTimeSpent(finalSeconds);
        const commandsDelta = commandsExecuted - lastCommandCount.current;
        updateDailyActivity(commandsDelta, finalSeconds);
      }
    };
  }, []); // Seulement au mount/unmount

  return null; // Ce composant ne rend rien
}
