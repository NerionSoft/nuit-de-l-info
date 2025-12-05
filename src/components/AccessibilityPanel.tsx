'use client';

import { useAccessibilityStore } from '@/stores/accessibilityStore';
import { useRSEStore } from '@/stores/rseStore';
import {
  Eye,
  Type,
  Glasses,
  Pause,
  Palette,
  Keyboard,
  MessageSquare,
  Focus,
  Globe,
  Sparkles,
  Info,
  Volume2,
  Mic,
  RotateCcw,
} from 'lucide-react';

export function AccessibilityPanel() {
  const {
    settings,
    setFontSize,
    toggleHighContrast,
    toggleDyslexiaFont,
    toggleReducedMotion,
    setColorBlindMode,
    toggleKeyboardNavigation,
    toggleScreenReaderOptimized,
    toggleFocusIndicators,
    setLanguage,
    toggleSimplifiedUI,
    toggleTooltips,
    toggleSoundEffects,
    toggleVoiceFeedback,
    resetToDefaults,
  } = useAccessibilityStore();

  const { updateAccessibilityScore } = useRSEStore();

  // Calculate accessibility score based on enabled features
  const calculateScore = () => {
    let score = 50; // Base score

    if (settings.dyslexiaFont) score += 10;
    if (settings.highContrast) score += 10;
    if (settings.keyboardNavigation) score += 10;
    if (settings.screenReaderOptimized) score += 10;
    if (settings.focusIndicators) score += 5;
    if (settings.tooltipsEnabled) score += 5;

    updateAccessibilityScore(Math.min(100, score));
  };

  // Update score whenever settings change
  const handleToggle = (action: () => void) => {
    action();
    setTimeout(calculateScore, 100);
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2 mb-2">
            <Eye className="w-8 h-8 text-blue-600" />
            Paramètres d&apos;Accessibilité
          </h1>
          <p className="text-slate-600">
            Personnalise ton expérience pour un apprentissage plus confortable et inclusif.
          </p>
        </div>

        {/* Vision Section */}
        <section className="mb-6 bg-white rounded-xl shadow-lg p-6 border-2 border-blue-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-blue-600" />
            Vision
          </h2>

          <div className="space-y-4">
            {/* Font Size */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Type className="w-4 h-4" />
                Taille de police
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['small', 'medium', 'large', 'extra-large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      settings.fontSize === size
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-blue-300'
                    }`}
                  >
                    {size === 'small' && 'Petit'}
                    {size === 'medium' && 'Moyen'}
                    {size === 'large' && 'Grand'}
                    {size === 'extra-large' && 'Très grand'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dyslexia Font */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Glasses className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-slate-800">Police Dyslexie</div>
                  <div className="text-sm text-slate-600">
                    Police OpenDyslexic pour une meilleure lisibilité
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.dyslexiaFont}
                onChange={() => handleToggle(toggleDyslexiaFont)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            {/* High Contrast */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Palette className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-slate-800">Contraste élevé</div>
                  <div className="text-sm text-slate-600">
                    Augmente le contraste pour une meilleure visibilité
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={() => handleToggle(toggleHighContrast)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>

            {/* Color Blind Mode */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Palette className="w-4 h-4" />
                Mode daltonien
              </label>
              <select
                value={settings.colorBlindMode}
                onChange={(e) =>
                  setColorBlindMode(
                    e.target.value as typeof settings.colorBlindMode
                  )
                }
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
              >
                <option value="none">Aucun</option>
                <option value="protanopia">Protanopie (Rouge)</option>
                <option value="deuteranopia">Deutéranopie (Vert)</option>
                <option value="tritanopia">Tritanopie (Bleu)</option>
              </select>
            </div>

            {/* Reduced Motion */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Pause className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="font-medium text-slate-800">Réduire les animations</div>
                  <div className="text-sm text-slate-600">
                    Désactive les animations pour éviter les distractions
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={() => handleToggle(toggleReducedMotion)}
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
            </label>
          </div>
        </section>

        {/* Navigation Section */}
        <section className="mb-6 bg-white rounded-xl shadow-lg p-6 border-2 border-green-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-green-600" />
            Navigation
          </h2>

          <div className="space-y-4">
            {/* Keyboard Navigation */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Keyboard className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-slate-800">Navigation au clavier</div>
                  <div className="text-sm text-slate-600">
                    Active les raccourcis clavier pour la navigation
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.keyboardNavigation}
                onChange={() => handleToggle(toggleKeyboardNavigation)}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
            </label>

            {/* Screen Reader */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-slate-800">Optimisé lecteur d&apos;écran</div>
                  <div className="text-sm text-slate-600">
                    Améliore la compatibilité avec les lecteurs d&apos;écran
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.screenReaderOptimized}
                onChange={() => handleToggle(toggleScreenReaderOptimized)}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
            </label>

            {/* Focus Indicators */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Focus className="w-5 h-5 text-green-600" />
                <div>
                  <div className="font-medium text-slate-800">Indicateurs de focus</div>
                  <div className="text-sm text-slate-600">
                    Affiche clairement l&apos;élément actif
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.focusIndicators}
                onChange={() => handleToggle(toggleFocusIndicators)}
                className="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
            </label>
          </div>
        </section>

        {/* Language & Content */}
        <section className="mb-6 bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            Langue & Contenu
          </h2>

          <div className="space-y-4">
            {/* Language */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                <Globe className="w-4 h-4" />
                Langue de l&apos;interface
              </label>
              <select
                value={settings.language}
                onChange={(e) => setLanguage(e.target.value as typeof settings.language)}
                className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200 transition-all"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            {/* Simplified UI */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-slate-800">Interface simplifiée</div>
                  <div className="text-sm text-slate-600">
                    Réduit les éléments visuels pour se concentrer sur l&apos;essentiel
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.simplifiedUI}
                onChange={() => handleToggle(toggleSimplifiedUI)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            </label>

            {/* Tooltips */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-purple-600" />
                <div>
                  <div className="font-medium text-slate-800">Info-bulles d&apos;aide</div>
                  <div className="text-sm text-slate-600">
                    Affiche des explications au survol
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.tooltipsEnabled}
                onChange={() => handleToggle(toggleTooltips)}
                className="w-5 h-5 text-purple-600 rounded focus:ring-purple-500"
              />
            </label>
          </div>
        </section>

        {/* Audio Section */}
        <section className="mb-6 bg-white rounded-xl shadow-lg p-6 border-2 border-orange-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-orange-600" />
            Audio
          </h2>

          <div className="space-y-4">
            {/* Sound Effects */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-slate-800">Effets sonores</div>
                  <div className="text-sm text-slate-600">
                    Active les sons pour les interactions
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={() => handleToggle(toggleSoundEffects)}
                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
              />
            </label>

            {/* Voice Feedback */}
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <Mic className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="font-medium text-slate-800">Retour vocal</div>
                  <div className="text-sm text-slate-600">
                    Lecture vocale des messages importants
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={settings.voiceFeedback}
                onChange={() => handleToggle(toggleVoiceFeedback)}
                className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
              />
            </label>
          </div>
        </section>

        {/* Reset Button */}
        <div className="flex justify-center">
          <button
            onClick={resetToDefaults}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-lg transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Réinitialiser aux valeurs par défaut
          </button>
        </div>

        {/* Info Message */}
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <p className="text-sm text-blue-800">
            💡 <strong>Le saviez-vous ?</strong> Activer les options d&apos;accessibilité améliore ton
            score RSE dans le pilier Social ! Chaque ajustement compte pour créer une expérience
            plus inclusive.
          </p>
        </div>
      </div>
    </div>
  );
}
