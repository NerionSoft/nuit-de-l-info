'use client';

import { useState } from 'react';
import { useRSEStore } from '@/stores/rseStore';
import { useMetricsStore } from '@/stores/metricsStore';
import { useAccessibilityStore } from '@/stores/accessibilityStore';
import {
  Shield,
  Eye,
  Lock,
  Download,
  Trash2,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Info,
  Database,
  Server,
  Globe,
  User,
} from 'lucide-react';

interface AppProps {
  windowId: string;
}

export function PrivacyCenter({ windowId }: AppProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'data' | 'consent' | 'charter'>('overview');
  const rseMetrics = useRSEStore((state) => state.metrics);
  const { giveConsent, requestDataExport, acceptEthicalCharter } = useRSEStore();
  const metrics = useMetricsStore((state) => state.metrics);
  const accessibilitySettings = useAccessibilityStore((state) => state.settings);

  const [showDataExport, setShowDataExport] = useState(false);

  const handleConsent = () => {
    giveConsent();
  };

  const handleDataExport = () => {
    requestDataExport();
    setShowDataExport(true);

    // Simulate data export
    const data = {
      user: {
        createdAt: new Date().toISOString(),
        language: accessibilitySettings.language,
      },
      metrics: {
        learning: {
          commandsExecuted: metrics.commandsExecuted,
          filesCreated: metrics.filesCreated,
          foldersCreated: metrics.foldersCreated,
          appsOpened: metrics.appsOpened,
          totalTimeSpent: metrics.totalTimeSpent,
        },
        ecological: {
          energySaved: metrics.energySaved,
          co2Saved: metrics.co2Saved,
          waterSaved: metrics.waterSaved,
        },
        badges: metrics.badges,
      },
      rse: {
        environmental: rseMetrics.environmental,
        social: rseMetrics.social,
        ethical: rseMetrics.ethical,
        rseBadges: rseMetrics.rseBadges,
        globalRSEScore: rseMetrics.globalRSEScore,
      },
      accessibility: accessibilitySettings,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `learnlinux-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setTimeout(() => setShowDataExport(false), 3000);
  };

  const handleAcceptCharter = () => {
    acceptEthicalCharter();
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <Shield className="w-12 h-12" />
          <div>
            <h2 className="text-2xl font-bold">Centre de Confidentialité</h2>
            <p className="text-white/90">
              Tu contrôles tes données personnelles
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold">{rseMetrics.ethical.privacyScore}%</div>
            <div className="text-sm text-white/80">Score Confidentialité</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold">{rseMetrics.ethical.dataTransparency}%</div>
            <div className="text-sm text-white/80">Transparence</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-4">
            <div className="text-3xl font-bold">
              {rseMetrics.ethical.consentGiven ? 'Oui' : 'Non'}
            </div>
            <div className="text-sm text-white/80">Consentement RGPD</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Database className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-bold text-slate-800">Stockage Local</h3>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            100% de tes données sont stockées localement sur ton navigateur.
            Aucune donnée n&apos;est envoyée à des serveurs externes.
          </p>
          <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Sécurisé et privé
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-slate-800">Transparence Totale</h3>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            Code open source disponible sur GitHub. Tu peux vérifier
            exactement ce que nous faisons avec tes données.
          </p>
          <div className="flex items-center gap-2 text-blue-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Code ouvert et vérifiable
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-slate-800">Chiffrement</h3>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            Connexion HTTPS sécurisée. Les données dans le localStorage
            sont protégées par le navigateur.
          </p>
          <div className="flex items-center gap-2 text-purple-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Chiffré en transit
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Globe className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-bold text-slate-800">Conformité RGPD</h3>
          </div>
          <p className="text-sm text-slate-600 mb-3">
            Respect total du règlement général sur la protection des données.
            Droit d&apos;accès, de rectification et de suppression.
          </p>
          <div className="flex items-center gap-2 text-orange-600 text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Conforme RGPD
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataManagement = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Database className="w-6 h-6 text-blue-600" />
          Gestion de tes Données
        </h2>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium mb-1">
                  Quelles données collectons-nous ?
                </p>
                <ul className="text-sm text-blue-700 space-y-1 ml-4 list-disc">
                  <li>Métriques d&apos;apprentissage (commandes, fichiers, temps)</li>
                  <li>Métriques écologiques (calculs locaux)</li>
                  <li>Paramètres d&apos;accessibilité (préférences)</li>
                  <li>Badges et progression</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm text-green-800 font-medium mb-1">
                  Comment utilisons-nous ces données ?
                </p>
                <ul className="text-sm text-green-700 space-y-1 ml-4 list-disc">
                  <li>Afficher ta progression dans le Dashboard</li>
                  <li>Calculer ton impact écologique</li>
                  <li>Personnaliser ton expérience d&apos;apprentissage</li>
                  <li>Aucun partage avec des tiers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDataExport}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              Exporter mes données (JSON)
            </button>

            <button
              onClick={() => {
                if (confirm('Es-tu sûr de vouloir supprimer toutes tes données ? Cette action est irréversible.')) {
                  localStorage.clear();
                  window.location.reload();
                }
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
              Supprimer toutes mes données
            </button>
          </div>

          {showDataExport && (
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800 font-medium">
                Tes données ont été exportées avec succès !
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Détails de stockage</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-700">Métriques d&apos;apprentissage</span>
            <span className="text-sm font-medium text-blue-600">localStorage</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-700">Métriques RSE</span>
            <span className="text-sm font-medium text-blue-600">localStorage</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-700">Paramètres d&apos;accessibilité</span>
            <span className="text-sm font-medium text-blue-600">localStorage</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="text-sm text-slate-700">Système de fichiers virtuel</span>
            <span className="text-sm font-medium text-blue-600">Mémoire (volatile)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConsent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <FileCheck className="w-6 h-6 text-purple-600" />
          Gestion du Consentement RGPD
        </h2>

        <div className="mb-6">
          <div
            className={`p-6 rounded-lg border-2 ${
              rseMetrics.ethical.consentGiven
                ? 'bg-green-50 border-green-300'
                : 'bg-orange-50 border-orange-300'
            }`}
          >
            <div className="flex items-start gap-4">
              {rseMetrics.ethical.consentGiven ? (
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
              ) : (
                <AlertCircle className="w-6 h-6 text-orange-600 mt-1" />
              )}
              <div>
                <h3 className="font-bold text-lg mb-2">
                  {rseMetrics.ethical.consentGiven
                    ? 'Consentement donné ✓'
                    : 'Consentement en attente'}
                </h3>
                <p className="text-sm text-slate-700 mb-4">
                  {rseMetrics.ethical.consentGiven
                    ? "Tu as accepté la collecte et le traitement de tes données d'apprentissage. Tu peux révoquer ce consentement à tout moment."
                    : "En donnant ton consentement, tu acceptes que nous collections tes métriques d'apprentissage pour améliorer ton expérience."}
                </p>

                {!rseMetrics.ethical.consentGiven && (
                  <button
                    onClick={handleConsent}
                    className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-colors"
                  >
                    Donner mon consentement RGPD
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-slate-800">Tes droits RGPD</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">Droit d&apos;accès</h4>
              <p className="text-sm text-slate-600">
                Tu peux accéder à toutes tes données personnelles à tout moment.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">Droit de rectification</h4>
              <p className="text-sm text-slate-600">
                Tu peux modifier ou corriger tes données si nécessaire.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">Droit à l&apos;effacement</h4>
              <p className="text-sm text-slate-600">
                Tu peux supprimer toutes tes données à tout moment.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-800 mb-2">Droit à la portabilité</h4>
              <p className="text-sm text-slate-600">
                Tu peux exporter tes données dans un format standard (JSON).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCharter = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Shield className="w-6 h-6 text-blue-600" />
          Charte Éthique LearnLinux
        </h2>

        <div className="prose prose-slate max-w-none">
          <h3 className="text-lg font-bold mt-6">1. Engagement pour la Vie Privée</h3>
          <p className="text-sm text-slate-700">
            Nous nous engageons à protéger ta vie privée. Toutes les données sont stockées
            localement sur ton navigateur. Nous ne collectons, ne vendons, ni ne partageons
            aucune donnée personnelle avec des tiers.
          </p>

          <h3 className="text-lg font-bold mt-6">2. Transparence et Open Source</h3>
          <p className="text-sm text-slate-700">
            LearnLinux est un projet open source. Le code source est disponible publiquement
            et peut être audité par quiconque. Nous croyons en la transparence totale.
          </p>

          <h3 className="text-lg font-bold mt-6">3. Accessibilité Universelle</h3>
          <p className="text-sm text-slate-700">
            Nous nous engageons à rendre l&apos;apprentissage de Linux accessible à tous,
            indépendamment des capacités physiques, cognitives ou linguistiques.
          </p>

          <h3 className="text-lg font-bold mt-6">4. Responsabilité Environnementale</h3>
          <p className="text-sm text-slate-700">
            Nous minimisons notre impact environnemental en optimisant les performances,
            en réduisant la consommation d&apos;énergie et en sensibilisant aux pratiques
            de programmation éco-responsables.
          </p>

          <h3 className="text-lg font-bold mt-6">5. Éducation Équitable</h3>
          <p className="text-sm text-slate-700">
            L&apos;accès à l&apos;éducation est un droit fondamental. LearnLinux restera toujours
            gratuit et accessible à tous, sans discrimination.
          </p>

          <h3 className="text-lg font-bold mt-6">6. Innovation Responsable</h3>
          <p className="text-sm text-slate-700">
            Nous développons avec éthique, en considérant l&apos;impact social et environnemental
            de chaque fonctionnalité.
          </p>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200">
          <div className="flex items-start gap-4">
            <User className="w-6 h-6 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 mb-2">
                {rseMetrics.ethical.ethicalCharterAccepted
                  ? 'Tu as accepté la charte éthique ✓'
                  : 'Accepter la charte éthique'}
              </h3>
              <p className="text-sm text-slate-700 mb-4">
                {rseMetrics.ethical.ethicalCharterAccepted
                  ? 'Merci de ton engagement pour un numérique éthique et responsable.'
                  : "En acceptant cette charte, tu t'engages à utiliser LearnLinux de manière éthique et responsable."}
              </p>

              {!rseMetrics.ethical.ethicalCharterAccepted && (
                <button
                  onClick={handleAcceptCharter}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors"
                >
                  Accepter la charte éthique
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-6 pt-4">
        <div className="flex gap-2">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: Shield },
            { id: 'data', label: 'Mes Données', icon: Database },
            { id: 'consent', label: 'Consentement', icon: FileCheck },
            { id: 'charter', label: 'Charte Éthique', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 font-medium'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'data' && renderDataManagement()}
          {activeTab === 'consent' && renderConsent()}
          {activeTab === 'charter' && renderCharter()}
        </div>
      </div>
    </div>
  );
}
