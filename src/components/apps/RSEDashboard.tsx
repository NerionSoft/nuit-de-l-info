'use client';

import { useRSEStore } from '@/stores/rseStore';
import { motion } from 'framer-motion';
import {
  Leaf,
  Users,
  Shield,
  Award,
  TrendingUp,
  Battery,
  Code,
  Globe,
  Eye,
  Lock,
  FileCheck,
  Heart,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface AppProps {
  windowId: string;
}

export function RSEDashboard({ windowId }: AppProps) {
  const metrics = useRSEStore((state) => state.metrics);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 border-green-300';
    if (score >= 60) return 'bg-yellow-100 border-yellow-300';
    if (score >= 40) return 'bg-orange-100 border-orange-300';
    return 'bg-red-100 border-red-300';
  };

  const rseBadgeDetails: Record<string, { icon: React.ElementType; label: string; description: string }> = {
    'eco-coder': {
      icon: Leaf,
      label: 'Éco-codeur',
      description: '10 commandes vertes utilisées',
    },
    'digital-citizen': {
      icon: Shield,
      label: 'Citoyen numérique',
      description: 'Consentement RGPD donné',
    },
    'ethical-engaged': {
      icon: Heart,
      label: 'Éthique engagé',
      description: 'Charte éthique acceptée',
    },
    'accessibility-champion': {
      icon: Users,
      label: 'Champion accessibilité',
      description: 'Score accessibilité > 80',
    },
    'rse-master': {
      icon: Award,
      label: 'Maître RSE',
      description: 'Score global RSE > 80',
    },
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header avec score global */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              Tableau de Bord RSE
            </h1>
            <p className="text-slate-600 mt-1">
              Responsabilité Sociétale des Entreprises - By Design
            </p>
          </div>
          <div
            className={`flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 ${getScoreBgColor(
              metrics.globalRSEScore
            )}`}
          >
            <span className={`text-4xl font-bold ${getScoreColor(metrics.globalRSEScore)}`}>
              {metrics.globalRSEScore}
            </span>
            <span className="text-xs font-medium text-slate-600">Score RSE</span>
          </div>
        </div>
      </motion.div>

      {/* Les 3 Piliers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Pilier Environnemental */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 border-2 border-green-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Environnemental</h2>
          </div>

          <div className="space-y-4">
            {/* Commandes vertes */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-green-600" />
                <span className="text-sm text-slate-600">Commandes vertes</span>
              </div>
              <span className="font-bold text-green-600">
                {metrics.environmental.greenCommandsUsed}
              </span>
            </div>

            {/* Efficacité énergétique */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-600">Efficacité énergétique</span>
                </div>
                <span className="font-bold text-green-600">
                  {metrics.environmental.energyEfficiencyScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.environmental.energyEfficiencyScore}%` }}
                />
              </div>
            </div>

            {/* Optimisation du code */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-600">Optimisation code</span>
                </div>
                <span className="font-bold text-green-600">
                  {metrics.environmental.codeOptimizationLevel}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.environmental.codeOptimizationLevel}%` }}
                />
              </div>
            </div>

            {/* Conscience carbone */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-slate-600">Conscience carbone</span>
                </div>
                <span className="font-bold text-green-600">
                  {metrics.environmental.carbonAwareness}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.environmental.carbonAwareness}%` }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pilier Social */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Social</h2>
          </div>

          <div className="space-y-4">
            {/* Accessibilité */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-slate-600">Accessibilité</span>
                </div>
                <span className="font-bold text-blue-600">
                  {metrics.social.accessibilityScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.social.accessibilityScore}%` }}
                />
              </div>
            </div>

            {/* Inclusivité */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-slate-600">Inclusivité</span>
                </div>
                <span className="font-bold text-blue-600">
                  {metrics.social.inclusivityLevel}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.social.inclusivityLevel}%` }}
                />
              </div>
            </div>

            {/* Aides consultées */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-slate-600">Aides consultées</span>
              </div>
              <span className="font-bold text-blue-600">{metrics.social.helpGiven}</span>
            </div>

            {/* Apprentissage adaptatif */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-slate-600">Apprentissage adaptatif</span>
              </div>
              <span className={`font-bold ${metrics.social.adaptiveLearningUsed ? 'text-green-600' : 'text-gray-400'}`}>
                {metrics.social.adaptiveLearningUsed ? 'Activé' : 'Désactivé'}
              </span>
            </div>

            {/* Langue */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-slate-600">Langue</span>
              </div>
              <span className="font-bold text-blue-600 uppercase">
                {metrics.social.languagePreference}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Pilier Éthique */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Éthique</h2>
          </div>

          <div className="space-y-4">
            {/* Confidentialité */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-slate-600">Confidentialité</span>
                </div>
                <span className="font-bold text-purple-600">
                  {metrics.ethical.privacyScore}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.ethical.privacyScore}%` }}
                />
              </div>
            </div>

            {/* Transparence */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-slate-600">Transparence</span>
                </div>
                <span className="font-bold text-purple-600">
                  {metrics.ethical.dataTransparency}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.ethical.dataTransparency}%` }}
                />
              </div>
            </div>

            {/* Consentement RGPD */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-slate-600">Consentement RGPD</span>
              </div>
              <span className={`font-bold ${metrics.ethical.consentGiven ? 'text-green-600' : 'text-gray-400'}`}>
                {metrics.ethical.consentGiven ? 'Donné' : 'En attente'}
              </span>
            </div>

            {/* Exports de données */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-slate-600">Exports de données</span>
              </div>
              <span className="font-bold text-purple-600">
                {metrics.ethical.dataExportsRequested}
              </span>
            </div>

            {/* Charte éthique */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-slate-600">Charte éthique</span>
              </div>
              <span className={`font-bold ${metrics.ethical.ethicalCharterAccepted ? 'text-green-600' : 'text-gray-400'}`}>
                {metrics.ethical.ethicalCharterAccepted ? 'Acceptée' : 'Non acceptée'}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Badges RSE */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-600" />
          Badges RSE Débloqués ({metrics.rseBadges.length})
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(rseBadgeDetails).map(([key, badge]) => {
            const isUnlocked = metrics.rseBadges.includes(key);
            const Icon = badge.icon;
            return (
              <div
                key={key}
                className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
                    : 'bg-gray-50 border-gray-200 opacity-50'
                }`}
              >
                <Icon className={`w-8 h-8 mb-2 ${isUnlocked ? 'text-yellow-600' : 'text-gray-400'}`} />
                <span className={`text-xs font-bold text-center ${isUnlocked ? 'text-slate-800' : 'text-gray-400'}`}>
                  {badge.label}
                </span>
                <span className="text-xs text-slate-500 text-center mt-1">
                  {badge.description}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Message de motivation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 text-white"
      >
        <h3 className="text-lg font-bold mb-2">
          {metrics.globalRSEScore >= 80
            ? '🎉 Excellent travail RSE !'
            : metrics.globalRSEScore >= 60
            ? '👍 Bon engagement RSE !'
            : '💪 Continue tes efforts RSE !'}
        </h3>
        <p className="text-white/90 text-sm">
          {metrics.globalRSEScore >= 80
            ? "Tu es un modèle de Responsabilité Sociétale ! Continue d'inspirer les autres."
            : metrics.globalRSEScore >= 60
            ? "Tu es sur la bonne voie. Continue d'améliorer tes pratiques RSE."
            : "Chaque action compte. Explore les fonctionnalités pour améliorer ton score RSE."}
        </p>
      </motion.div>
    </div>
  );
}
