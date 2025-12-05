'use client';

import { useMetricsStore } from '@/stores/metricsStore';
import type { AppProps } from '@/types/desktop';
import {
  Trophy,
  Leaf,
  Droplet,
  Zap,
  TrendingUp,
  Award,
  Terminal,
  FolderPlus,
  FileText,
  AppWindow,
  Clock,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export function Dashboard({ windowId }: AppProps) {
  const metrics = useMetricsStore((state) => state.metrics);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Chargement...</div>
      </div>
    );
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}min`;
    return `${minutes}min`;
  };

  const badges = [
    { id: 'first-command', name: 'Première commande', icon: '🎯', unlocked: metrics.badges.includes('first-command') },
    { id: 'terminal-novice', name: 'Novice Terminal', icon: '⭐', unlocked: metrics.badges.includes('terminal-novice') },
    { id: 'terminal-expert', name: 'Expert Terminal', icon: '🏆', unlocked: metrics.badges.includes('terminal-expert') },
    { id: 'first-app', name: 'Première app', icon: '🚀', unlocked: metrics.badges.includes('first-app') },
    { id: 'app-explorer', name: 'Explorateur', icon: '🔍', unlocked: metrics.badges.includes('app-explorer') },
    { id: 'eco-warrior', name: 'Éco-guerrier', icon: '🌱', unlocked: metrics.energySaved > 50 },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold mb-2">Tableau de Bord Écologique</h1>
        <p className="text-white/90 text-sm">
          LearnLinux - Apprendre tout en préservant la planète 🌍
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats d'apprentissage */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Progression d'apprentissage
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard
              icon={<Terminal className="w-5 h-5" />}
              label="Commandes"
              value={metrics.commandsExecuted}
              color="blue"
            />
            <StatCard
              icon={<FileText className="w-5 h-5" />}
              label="Fichiers créés"
              value={metrics.filesCreated}
              color="purple"
            />
            <StatCard
              icon={<FolderPlus className="w-5 h-5" />}
              label="Dossiers créés"
              value={metrics.foldersCreated}
              color="indigo"
            />
            <StatCard
              icon={<AppWindow className="w-5 h-5" />}
              label="Apps ouvertes"
              value={metrics.appsOpened}
              color="cyan"
            />
          </div>
          <div className="mt-4">
            <StatCard
              icon={<Clock className="w-5 h-5" />}
              label="Temps d'apprentissage"
              value={formatTime(metrics.totalTimeSpent)}
              color="green"
              fullWidth
            />
          </div>
        </section>

        {/* Impact écologique */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-green-600" />
            Impact Écologique
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
            <p className="text-sm text-gray-600 mb-4">
              En utilisant LearnLinux au lieu d'un ordinateur physique, vous contribuez à réduire l'empreinte écologique du numérique :
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <EcoCard
                icon={<Zap className="w-6 h-6" />}
                label="Énergie économisée"
                value={`${metrics.energySaved} Wh`}
                description="Équivalent à charger un smartphone"
                color="yellow"
              />
              <EcoCard
                icon={<Leaf className="w-6 h-6" />}
                label="CO₂ évité"
                value={`${metrics.co2Saved} g`}
                description="Équivalent à planter un arbre"
                color="green"
              />
              <EcoCard
                icon={<Droplet className="w-6 h-6" />}
                label="Eau préservée"
                value={`${metrics.waterSaved} L`}
                description="Pour le refroidissement serveurs"
                color="blue"
              />
            </div>
          </div>
        </section>

        {/* Badges */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            Badges & Récompenses
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`relative p-3 rounded-lg border-2 text-center transition-all ${
                  badge.unlocked
                    ? 'bg-white border-yellow-400 shadow-lg'
                    : 'bg-gray-100 border-gray-300 opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{badge.icon}</div>
                <div className="text-xs font-medium text-gray-700">{badge.name}</div>
                {badge.unlocked && (
                  <div className="absolute -top-2 -right-2">
                    <Award className="w-5 h-5 text-yellow-500 fill-yellow-200" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Activité récente */}
        {metrics.dailyActivity.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4">Activité récente (7 derniers jours)</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="space-y-2">
                {metrics.dailyActivity.slice(-7).reverse().map((day, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                  >
                    <span className="text-sm text-gray-600">
                      {new Date(day.date).toLocaleDateString('fr-FR', {
                        weekday: 'short',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </span>
                    <div className="flex gap-4 text-sm">
                      <span className="text-blue-600 font-medium">
                        {day.commands} commandes
                      </span>
                      <span className="text-green-600 font-medium">
                        {formatTime(day.timeSpent)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Message de motivation */}
        <section>
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Continue comme ça ! 🎉</h3>
            <p className="text-white/90 text-sm">
              Chaque minute passée sur LearnLinux est une minute de moins de consommation énergétique.
              Ensemble, apprenons tout en protégeant notre planète !
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  fullWidth?: boolean;
}

function StatCard({ icon, label, value, color, fullWidth }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
    cyan: 'bg-cyan-500',
    green: 'bg-green-500',
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${fullWidth ? 'col-span-full' : ''}`}
      style={{ borderColor: `var(--${color}-500)` }}
    >
      <div className="flex items-center gap-3">
        <div className={`${colorClasses[color as keyof typeof colorClasses]} text-white p-2 rounded-lg`}>
          {icon}
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  );
}

interface EcoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  color: string;
}

function EcoCard({ icon, label, value, description, color }: EcoCardProps) {
  const colorClasses = {
    yellow: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    green: 'bg-green-50 border-green-200 text-green-700',
    blue: 'bg-blue-50 border-blue-200 text-blue-700',
  };

  return (
    <div className={`rounded-lg border-2 p-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-semibold text-sm">{label}</span>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-xs opacity-75">{description}</div>
    </div>
  );
}
