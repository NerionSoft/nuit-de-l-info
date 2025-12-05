'use client';

import { useState } from 'react';
import {
  Folder,
  File,
  Home,
  Download,
  Image,
  Music,
  Video,
  FileText,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Grid,
  List,
} from 'lucide-react';
import { VirtualFileSystem } from '@/lib/fileSystem';

interface FileManagerProps {
  windowId: string;
}

const fsInstances = new Map<string, VirtualFileSystem>();

function getFileSystem(windowId: string): VirtualFileSystem {
  if (!fsInstances.has(windowId)) {
    fsInstances.set(windowId, new VirtualFileSystem());
  }
  return fsInstances.get(windowId)!;
}

const sidebarItems = [
  { icon: Home, label: 'Home', path: '/home/user' },
  { icon: FileText, label: 'Documents', path: '/home/user/Documents' },
  { icon: Download, label: 'Downloads', path: '/home/user/Downloads' },
  { icon: Image, label: 'Pictures', path: '/home/user/Pictures' },
  { icon: Music, label: 'Music', path: '/home/user/Music' },
  { icon: Video, label: 'Videos', path: '/home/user/Videos' },
];

export function FileManager({ windowId }: FileManagerProps) {
  const fs = getFileSystem(windowId);
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [history, setHistory] = useState<string[]>(['/home/user']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateTo = (path: string) => {
    const result = fs.cd(path);
    if (result.success) {
      const newPath = fs.getCurrentPath();
      setCurrentPath(newPath);

      // Update history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newPath);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const path = history[newIndex];
      fs.cd(path);
      setCurrentPath(path);
      setHistoryIndex(newIndex);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const path = history[newIndex];
      fs.cd(path);
      setCurrentPath(path);
      setHistoryIndex(newIndex);
    }
  };

  const refresh = () => {
    fs.cd(currentPath);
    setCurrentPath(fs.getCurrentPath());
  };

  const items = fs.listDirectory(currentPath);

  // Sort: directories first, then files
  const sortedItems = items.sort((a, b) => {
    if (a.type === 'directory' && b.type !== 'directory') return -1;
    if (a.type !== 'directory' && b.type === 'directory') return 1;
    return a.name.localeCompare(b.name);
  });

  const pathParts = currentPath.split('/').filter(Boolean);

  return (
    <div className="h-full flex bg-[#1E1E1E] text-white">
      {/* Sidebar */}
      <div className="w-48 bg-[#252526] border-r border-white/10 p-2 flex flex-col gap-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-left ${
                isActive
                  ? 'bg-[#3B82F6] text-white'
                  : 'hover:bg-white/10 text-white/80'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-12 bg-[#2D2D2D] border-b border-white/10 flex items-center px-3 gap-2">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex === history.length - 1}
            className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={refresh}
            className="p-1.5 rounded hover:bg-white/10"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Breadcrumb */}
          <div className="flex-1 flex items-center gap-1 px-3 py-1 bg-[#1E1E1E] rounded-md mx-2 overflow-x-auto">
            <button
              onClick={() => navigateTo('/')}
              className="hover:text-[#3B82F6] transition-colors"
            >
              /
            </button>
            {pathParts.map((part, index) => (
              <div key={index} className="flex items-center gap-1">
                <ChevronRight className="w-3 h-3 text-white/50" />
                <button
                  onClick={() =>
                    navigateTo('/' + pathParts.slice(0, index + 1).join('/'))
                  }
                  className="hover:text-[#3B82F6] transition-colors text-sm"
                >
                  {part}
                </button>
              </div>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-[#1E1E1E] rounded-md p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${
                viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${
                viewMode === 'list' ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Files Grid/List */}
        <div className="flex-1 p-4 overflow-auto">
          {sortedItems.length === 0 ? (
            <div className="h-full flex items-center justify-center text-white/50">
              <p>Folder is empty</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-4">
              {sortedItems.map((item) => (
                <button
                  key={item.name}
                  onDoubleClick={() => {
                    if (item.type === 'directory') {
                      navigateTo(currentPath + '/' + item.name);
                    }
                  }}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {item.type === 'directory' ? (
                    <Folder className="w-12 h-12 text-[#3B82F6]" />
                  ) : (
                    <File className="w-12 h-12 text-white/60" />
                  )}
                  <span className="text-sm text-center truncate w-full">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {sortedItems.map((item) => (
                <button
                  key={item.name}
                  onDoubleClick={() => {
                    if (item.type === 'directory') {
                      navigateTo(currentPath + '/' + item.name);
                    }
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {item.type === 'directory' ? (
                    <Folder className="w-5 h-5 text-[#3B82F6]" />
                  ) : (
                    <File className="w-5 h-5 text-white/60" />
                  )}
                  <span className="text-sm">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="h-8 bg-[#2D2D2D] border-t border-white/10 flex items-center px-3 text-xs text-white/60">
          {sortedItems.length} items
        </div>
      </div>
    </div>
  );
}
