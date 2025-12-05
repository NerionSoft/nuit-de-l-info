// Types pour le simulateur Ubuntu Desktop

export type AppType =
  | 'terminal'
  | 'file-manager'
  | 'settings'
  | 'text-editor'
  | 'calculator'
  | 'browser'
  | 'trash'
  | 'writer'
  | 'calc'
  | 'impress';

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowState {
  id: string;
  title: string;
  app: AppType;
  position: Position;
  size: Size;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

export interface DesktopIcon {
  id: string;
  label: string;
  icon: string;
  app: AppType;
  position: Position;
}

// File System Types
export interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: Record<string, FileSystemNode>;
  permissions?: string;
  owner?: string;
  modifiedAt?: Date;
}

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
  prompt?: string;
}

export interface TerminalState {
  lines: TerminalLine[];
  currentPath: string;
  commandHistory: string[];
  historyIndex: number;
}

// App-specific props
export interface AppProps {
  windowId: string;
}

// Default window sizes per app
export const DEFAULT_WINDOW_SIZES: Record<AppType, Size> = {
  terminal: { width: 700, height: 450 },
  'file-manager': { width: 800, height: 500 },
  settings: { width: 750, height: 550 },
  'text-editor': { width: 650, height: 500 },
  calculator: { width: 300, height: 450 },
  browser: { width: 900, height: 600 },
  trash: { width: 600, height: 400 },
  writer: { width: 850, height: 600 },
  calc: { width: 900, height: 550 },
  impress: { width: 950, height: 650 },
};

export const APP_TITLES: Record<AppType, string> = {
  terminal: 'Terminal',
  'file-manager': 'Files',
  settings: 'Settings',
  'text-editor': 'Text Editor',
  calculator: 'Calculator',
  browser: 'Firefox',
  trash: 'Trash',
  writer: 'LibreOffice Writer',
  calc: 'LibreOffice Calc',
  impress: 'LibreOffice Impress',
};
