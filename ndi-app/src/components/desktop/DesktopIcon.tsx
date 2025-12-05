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
} from 'lucide-react';
import { useDesktopStore } from '@/stores/desktopStore';
import type { AppType } from '@/types/desktop';

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
};

export function DesktopIcon({ label, icon, app }: DesktopIconProps) {
  const openWindow = useDesktopStore((state) => state.openWindow);
  const Icon = iconMap[icon] || Folder;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onDoubleClick={() => openWindow(app)}
      className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-white/10 transition-colors w-20 group focus:outline-none focus:ring-2 focus:ring-[#E95420]/50"
    >
      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#E95420] to-[#772953] rounded-lg shadow-lg group-hover:shadow-xl transition-shadow">
        <Icon className="w-7 h-7 text-white" />
      </div>
      <span className="text-white text-xs text-center font-medium drop-shadow-lg leading-tight">
        {label}
      </span>
    </motion.button>
  );
}
