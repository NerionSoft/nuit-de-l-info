'use client';

import { motion } from 'framer-motion';
import {
  Terminal,
  Folder,
  Settings,
  Globe,
  Trash2,
  FileText,
  Home,
  FileType,
  Table2,
  Presentation,
  Activity,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/desktopStore';
import { useTutorialStore } from '@/stores/tutorialStore';
import type { AppType } from '@/types/desktop';
import type { TargetElement } from '@/types/tutorial';

interface DesktopIconProps {
  label: string;
  icon: string;
  app: AppType;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  terminal: Terminal,
  folder: Folder,
  'folder-home': Home,
  settings: Settings,
  browser: Globe,
  trash: Trash2,
  'text-editor': FileText,
  writer: FileType,
  calc: Table2,
  impress: Presentation,
  'system-monitor': Activity,
};

// Map app types to tutorial target elements
const appToTargetMap: Partial<Record<AppType, TargetElement>> = {
  'terminal': 'desktop-icon-terminal',
  'file-manager': 'desktop-icon-files',
  'settings': 'desktop-icon-settings',
  'trash': 'desktop-icon-trash',
  'browser': 'desktop-icon-browser',
  'writer': 'desktop-icon-writer',
  'calc': 'desktop-icon-calc',
  'impress': 'desktop-icon-impress',
  'system-monitor': 'desktop-icon-system-monitor',
};

export function DesktopIcon({ label, icon, app }: DesktopIconProps) {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const { isActive: isTutorialActive, validateAction, getHighlightTarget } = useTutorialStore();
  const Icon = iconMap[icon] || Folder;

  const handleDoubleClick = () => {
    openWindow(app);

    // If tutorial is active, validate the action
    if (isTutorialActive) {
      const targetElement = appToTargetMap[app];
      if (targetElement) {
        validateAction(targetElement);
      }
    }
  };

  // Check if this icon should be highlighted during tutorial
  const highlightTarget = isTutorialActive ? getHighlightTarget() : null;
  const isHighlighted = highlightTarget === `#desktop-icon-${app}`;

  return (
    <motion.button
      id={`desktop-icon-${app}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={handleDoubleClick}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors w-20 group focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 ${
        isHighlighted ? 'ring-2 ring-[#3B82F6] ring-offset-2 ring-offset-transparent animate-pulse' : ''
      }`}
    >
      <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-lg shadow-lg group-hover:shadow-xl transition-shadow ${
        isHighlighted ? 'shadow-[0_0_20px_rgba(233,84,32,0.5)]' : ''
      }`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <span className="text-white text-xs text-center font-medium drop-shadow-lg leading-tight">
        {label}
      </span>
    </motion.button>
  );
}
