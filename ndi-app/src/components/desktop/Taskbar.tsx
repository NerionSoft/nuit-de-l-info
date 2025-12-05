'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Grid3X3,
  Terminal,
  Folder,
  Settings,
  Globe,
  FileText,
  Wifi,
  Volume2,
  Battery,
  FileType,
  Table2,
  Presentation,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/desktopStore';
import type { AppType } from '@/types/desktop';

const appIcons: Record<AppType, React.ComponentType<{ className?: string }>> = {
  terminal: Terminal,
  'file-manager': Folder,
  settings: Settings,
  browser: Globe,
  'text-editor': FileText,
  calculator: Grid3X3,
  trash: Folder,
  writer: FileType,
  calc: Table2,
  impress: Presentation,
};

export function Taskbar() {
  const { windows, openWindow, focusWindow, restoreWindow } = useDesktopStore();
  const [time, setTime] = useState<string>('');
  const [showAppMenu, setShowAppMenu] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAppClick = (winId: string, isMinimized: boolean) => {
    if (isMinimized) {
      restoreWindow(winId);
    } else {
      focusWindow(winId);
    }
  };

  const apps: { app: AppType; label: string }[] = [
    { app: 'file-manager', label: 'Files' },
    { app: 'terminal', label: 'Terminal' },
    { app: 'browser', label: 'Firefox' },
    { app: 'text-editor', label: 'Text Editor' },
    { app: 'settings', label: 'Settings' },
    { app: 'calculator', label: 'Calculator' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#2C001E]/95 backdrop-blur-sm border-t border-white/10 flex items-center justify-between px-2 z-50">
      {/* Activities Button */}
      <button
        onClick={() => setShowAppMenu(!showAppMenu)}
        className="h-9 px-4 rounded-md hover:bg-white/10 text-white font-medium transition-colors flex items-center gap-2"
      >
        <Grid3X3 className="w-5 h-5" />
        <span className="text-sm">Activities</span>
      </button>

      {/* App Menu Popup */}
      {showAppMenu && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-14 left-2 bg-[#2C001E] rounded-lg shadow-2xl border border-white/10 p-4 grid grid-cols-3 gap-3"
        >
          {apps.map(({ app, label }) => {
            const Icon = appIcons[app];
            return (
              <button
                key={app}
                onClick={() => {
                  openWindow(app);
                  setShowAppMenu(false);
                }}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#E95420] to-[#772953] rounded-lg">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-xs">{label}</span>
              </button>
            );
          })}
        </motion.div>
      )}

      {/* Open Windows */}
      <div className="flex-1 flex items-center justify-center gap-1 px-4">
        {windows.map((win) => {
          const Icon = appIcons[win.app];
          return (
            <motion.button
              key={win.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAppClick(win.id, win.isMinimized)}
              className={`h-9 px-3 rounded-md flex items-center gap-2 transition-colors ${
                win.isMinimized
                  ? 'bg-white/5 hover:bg-white/10'
                  : 'bg-white/20 hover:bg-white/25'
              }`}
            >
              <Icon className="w-4 h-4 text-white" />
              <span className="text-white text-sm max-w-24 truncate">
                {win.title}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-3 px-3">
        <Wifi className="w-4 h-4 text-white/80" />
        <Volume2 className="w-4 h-4 text-white/80" />
        <Battery className="w-4 h-4 text-white/80" />
        <span className="text-white text-sm font-medium">{time}</span>
      </div>
    </div>
  );
}
