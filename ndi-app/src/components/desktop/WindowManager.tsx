'use client';

import { useDesktopStore } from '@/stores/desktopStore';
import { Window } from './Window';
import { Terminal } from '@/components/apps/Terminal';
import { FileManager } from '@/components/apps/FileManager';
import { Settings } from '@/components/apps/Settings';
import { TextEditor } from '@/components/apps/TextEditor';
import { Calculator } from '@/components/apps/Calculator';
import { Browser } from '@/components/apps/Browser';
import { Trash } from '@/components/apps/Trash';
import type { AppType } from '@/types/desktop';

const AppComponents: Record<AppType, React.ComponentType<{ windowId: string }>> = {
  terminal: Terminal,
  'file-manager': FileManager,
  settings: Settings,
  'text-editor': TextEditor,
  calculator: Calculator,
  browser: Browser,
  trash: Trash,
};

export function WindowManager() {
  const windows = useDesktopStore((state) => state.windows);

  return (
    <>
      {windows.map((win) => {
        const AppComponent = AppComponents[win.app];
        return (
          <Window key={win.id} window={win}>
            <AppComponent windowId={win.id} />
          </Window>
        );
      })}
    </>
  );
}
