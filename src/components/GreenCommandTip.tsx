'use client';

import { motion } from 'framer-motion';
import { Leaf, Zap, TrendingUp } from 'lucide-react';
import type { GreenCommandSuggestion } from '@/utils/greenCommands';

interface GreenCommandTipProps {
  suggestion: GreenCommandSuggestion;
  onDismiss?: () => void;
}

export function GreenCommandTip({ suggestion, onDismiss }: GreenCommandTipProps) {
  const categoryIcons = {
    performance: Zap,
    efficiency: Leaf,
    optimization: TrendingUp,
  };

  const categoryColors = {
    performance: 'from-yellow-500 to-orange-500',
    efficiency: 'from-green-500 to-emerald-500',
    optimization: 'from-blue-500 to-cyan-500',
  };

  const Icon = categoryIcons[suggestion.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="mb-2 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[suggestion.category]}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-bold text-green-800">💡 Suggestion éco-responsable</span>
            <span className="text-xs px-2 py-0.5 bg-green-200 text-green-800 rounded-full font-semibold">
              -{suggestion.energySaved}% énergie
            </span>
          </div>

          <p className="text-sm text-slate-700 mb-2">{suggestion.reason}</p>

          <div className="flex items-center gap-2">
            <code className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded border border-red-200 line-through">
              {suggestion.original}
            </code>
            <span className="text-slate-400">→</span>
            <code className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded border border-green-300 font-bold">
              {suggestion.green}
            </code>
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Fermer"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
}
