'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import { useDesktopStore } from '@/stores/desktopStore';
import { cn } from '@/lib/utils';
import type { WindowState } from '@/types/desktop';

interface WindowProps {
  window: WindowState;
  children: ReactNode;
}

export function Window({ window: win, children }: WindowProps) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    activeWindowId,
  } = useDesktopStore();

  const rndRef = useRef<Rnd>(null);
  const isActive = activeWindowId === win.id;

  // Handle maximize/restore
  useEffect(() => {
    if (rndRef.current) {
      if (win.isMaximized) {
        rndRef.current.updatePosition({ x: 0, y: 0 });
        rndRef.current.updateSize({
          width: globalThis.innerWidth,
          height: globalThis.innerHeight - 48, // Taskbar height
        });
      } else {
        rndRef.current.updatePosition(win.position);
        rndRef.current.updateSize(win.size);
      }
    }
  }, [win.isMaximized, win.position, win.size]);

  if (win.isMinimized) return null;

  return (
    <AnimatePresence>
      <Rnd
        ref={rndRef}
        default={{
          x: win.position.x,
          y: win.position.y,
          width: win.size.width,
          height: win.size.height,
        }}
        minWidth={300}
        minHeight={200}
        bounds="parent"
        dragHandleClassName="window-drag-handle"
        style={{ zIndex: win.zIndex }}
        disableDragging={win.isMaximized}
        enableResizing={!win.isMaximized}
        onDragStop={(_, d) => {
          updateWindowPosition(win.id, { x: d.x, y: d.y });
        }}
        onResizeStop={(_, __, ref, ___, position) => {
          updateWindowSize(win.id, {
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
          updateWindowPosition(win.id, position);
        }}
        onMouseDown={() => focusWindow(win.id)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className={cn(
            'flex flex-col h-full bg-[#2C001E] rounded-lg overflow-hidden shadow-2xl',
            isActive ? 'ring-2 ring-[#E95420]/50' : 'ring-1 ring-white/10'
          )}
        >
          {/* Title Bar */}
          <div
            className={cn(
              'window-drag-handle flex items-center justify-between h-10 px-3 select-none cursor-default',
              isActive ? 'bg-[#3C0028]' : 'bg-[#2C001E]'
            )}
          >
            {/* Window Controls (Left side - Ubuntu style) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => closeWindow(win.id)}
                className="group w-3.5 h-3.5 rounded-full bg-[#E95420] hover:bg-[#FF6B35] flex items-center justify-center transition-colors"
              >
                <X className="w-2.5 h-2.5 text-white opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() => minimizeWindow(win.id)}
                className="group w-3.5 h-3.5 rounded-full bg-[#F5A623] hover:bg-[#FFB84D] flex items-center justify-center transition-colors"
              >
                <Minus className="w-2.5 h-2.5 text-white opacity-0 group-hover:opacity-100" />
              </button>
              <button
                onClick={() =>
                  win.isMaximized ? restoreWindow(win.id) : maximizeWindow(win.id)
                }
                className="group w-3.5 h-3.5 rounded-full bg-[#7ED321] hover:bg-[#9AE63D] flex items-center justify-center transition-colors"
              >
                {win.isMaximized ? (
                  <Maximize2 className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                ) : (
                  <Square className="w-2 h-2 text-white opacity-0 group-hover:opacity-100" />
                )}
              </button>
            </div>

            {/* Title */}
            <span className="text-white/90 text-sm font-medium">{win.title}</span>

            {/* Spacer for symmetry */}
            <div className="w-16" />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden bg-[#300A24]">{children}</div>
        </motion.div>
      </Rnd>
    </AnimatePresence>
  );
}
