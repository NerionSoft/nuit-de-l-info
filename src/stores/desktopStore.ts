import { create } from 'zustand';
import {
  WindowState,
  AppType,
  Position,
  Size,
  DEFAULT_WINDOW_SIZES,
  APP_TITLES,
} from '@/types/desktop';
import { useMetricsStore } from './metricsStore';

interface DesktopStore {
  // State
  windows: WindowState[];
  activeWindowId: string | null;
  wallpaper: string;
  nextZIndex: number;

  // Actions
  openWindow: (app: AppType) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: Position) => void;
  updateWindowSize: (id: string, size: Size) => void;
  setWallpaper: (url: string) => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const getRandomPosition = (appSize?: Size): Position => {
  // Must check if we're in browser
  if (typeof window === 'undefined') {
    return { x: 400, y: 100 };
  }

  const screenWidth = window.innerWidth;
  const windowWidth = appSize?.width || 600;

  // Center the window horizontally
  const centerX = (screenWidth - windowWidth) / 2;

  return {
    x: Math.max(200, centerX) + Math.random() * 100,
    y: 60 + Math.random() * 80,
  };
};

export const useDesktopStore = create<DesktopStore>((set, get) => ({
  windows: [],
  activeWindowId: null,
  wallpaper: '/wallpaper.jpg',
  nextZIndex: 1,

  openWindow: (app: AppType) => {
    const { windows, nextZIndex } = get();

    // Check if app is already open (except for text-editor which can have multiple)
    const existingWindow = windows.find((w) => w.app === app && !w.isMinimized);
    if (existingWindow && app !== 'text-editor') {
      get().focusWindow(existingWindow.id);
      return;
    }

    // If minimized, restore it
    const minimizedWindow = windows.find((w) => w.app === app && w.isMinimized);
    if (minimizedWindow) {
      get().restoreWindow(minimizedWindow.id);
      return;
    }

    // Track app opening (only for new windows)
    useMetricsStore.getState().incrementApps();

    const id = generateId();
    const size = DEFAULT_WINDOW_SIZES[app];
    const newWindow: WindowState = {
      id,
      title: APP_TITLES[app],
      app,
      position: getRandomPosition(size),
      size,
      isMinimized: false,
      isMaximized: false,
      zIndex: nextZIndex,
    };

    set({
      windows: [...windows, newWindow],
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    });
  },

  closeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
      activeWindowId:
        state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  minimizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId:
        state.activeWindowId === id ? null : state.activeWindowId,
    }));
  },

  maximizeWindow: (id: string) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: true } : w
      ),
    }));
  },

  restoreWindow: (id: string) => {
    const { nextZIndex } = get();
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id
          ? { ...w, isMinimized: false, isMaximized: false, zIndex: nextZIndex }
          : w
      ),
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    }));
  },

  focusWindow: (id: string) => {
    const { nextZIndex, windows } = get();
    const window = windows.find((w) => w.id === id);
    if (!window || window.isMinimized) return;

    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: nextZIndex } : w
      ),
      activeWindowId: id,
      nextZIndex: nextZIndex + 1,
    });
  },

  updateWindowPosition: (id: string, position: Position) => {
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  updateWindowSize: (id: string, size: Size) => {
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    }));
  },

  setWallpaper: (url: string) => {
    set({ wallpaper: url });
  },
}));
