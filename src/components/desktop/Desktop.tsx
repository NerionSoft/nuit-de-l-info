'use client';

// Desktop component without wallpaper store dependency for now
import { DesktopIcon } from './DesktopIcon';
import { WindowManager } from './WindowManager';
import { Taskbar } from './Taskbar';
import type { AppType } from '@/types/desktop';

interface DesktopIconData {
  id: string;
  label: string;
  icon: string;
  app: AppType;
}

// Colonne gauche - Apps système
const leftColumnIcons: DesktopIconData[] = [
  { id: '1', label: 'Home', icon: 'folder-home', app: 'file-manager' },
  { id: '2', label: 'Trash', icon: 'trash', app: 'trash' },
  { id: '3', label: 'Terminal', icon: 'terminal', app: 'terminal' },
  { id: '4', label: 'Files', icon: 'folder', app: 'file-manager' },
  { id: '5', label: 'Firefox', icon: 'browser', app: 'browser' },
  { id: '6', label: 'Settings', icon: 'settings', app: 'settings' },
];

// Colonne droite - LibreOffice + Outils
const rightColumnIcons: DesktopIconData[] = [
  { id: '7', label: 'Writer', icon: 'writer', app: 'writer' },
  { id: '8', label: 'Calc', icon: 'calc', app: 'calc' },
  { id: '9', label: 'Impress', icon: 'impress', app: 'impress' },
  { id: '10', label: 'Monitor', icon: 'system-monitor', app: 'system-monitor' },
];

export function Desktop() {
  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 30%, #0F172A 70%, #1E3A8A 100%)',
      }}
    >
      {/* Overlay gradient for better icon visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      {/* Desktop Icons - Colonne gauche */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-2 z-10">
        {leftColumnIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            app={icon.app}
          />
        ))}
      </div>

      {/* Desktop Icons - Colonne droite (LibreOffice + Outils) */}
      <div className="absolute top-4 left-24 grid grid-cols-1 gap-2 z-10">
        {rightColumnIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            label={icon.label}
            icon={icon.icon}
            app={icon.app}
          />
        ))}
      </div>

      {/* Windows Container */}
      <div className="absolute inset-0 bottom-12 overflow-hidden">
        <WindowManager />
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
