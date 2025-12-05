'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Home,
  Shield,
  Star,
  Search,
  Menu,
} from 'lucide-react';

interface BrowserProps {
  windowId: string;
}

const bookmarks = [
  { title: 'Linux', url: 'https://linux.org' },
  { title: 'Linux', url: 'https://linux.org' },
  { title: 'GitHub', url: 'https://github.com' },
];

export function Browser({ windowId }: BrowserProps) {
  const [url, setUrl] = useState('https://linux.org');
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigate = (newUrl: string) => {
    setUrl(newUrl);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="h-full flex flex-col bg-[#1E1E1E] text-white">
      {/* Browser Toolbar */}
      <div className="bg-[#2D2D2D] border-b border-white/10">
        {/* Tab Bar */}
        <div className="h-9 flex items-center px-2 gap-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1E1E1E] rounded-t-lg">
            <div className="w-4 h-4 rounded-full bg-[#3B82F6]" />
            <span className="text-sm max-w-32 truncate">Linux</span>
            <button className="ml-2 hover:bg-white/20 rounded p-0.5">×</button>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="h-10 flex items-center px-2 gap-2">
          <button className="p-1.5 rounded hover:bg-white/10">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10">
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleNavigate(url)}
            className="p-1.5 rounded hover:bg-white/10"
          >
            <RotateCcw
              className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
            />
          </button>
          <button
            onClick={() => handleNavigate('https://linux.org')}
            className="p-1.5 rounded hover:bg-white/10"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* URL Bar */}
          <div className="flex-1 flex items-center gap-2 bg-[#1E1E1E] rounded-full px-3 py-1.5">
            <Shield className="w-4 h-4 text-green-500" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNavigate(url)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
            <button className="p-1 hover:bg-white/10 rounded">
              <Star className="w-4 h-4" />
            </button>
          </div>

          <button className="p-1.5 rounded hover:bg-white/10">
            <Menu className="w-4 h-4" />
          </button>
        </div>

        {/* Bookmarks Bar */}
        <div className="h-8 flex items-center px-2 gap-2 border-t border-white/5">
          {bookmarks.map((bookmark) => (
            <button
              key={bookmark.url}
              onClick={() => handleNavigate(bookmark.url)}
              className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 text-xs"
            >
              <div className="w-4 h-4 rounded bg-[#3B82F6] flex items-center justify-center text-[10px]">
                {bookmark.title[0]}
              </div>
              <span>{bookmark.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Browser Content (Simulated) */}
      <div className="flex-1 bg-[#FAFAFA] overflow-auto">
        {/* Simulated Linux Page */}
        <div className="bg-[#0F172A] text-white">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto px-8 py-16 text-center">
            <h1 className="text-5xl font-bold mb-4">Linux</h1>
            <p className="text-xl text-white/80 mb-8">
              The leading operating system for PCs, IoT devices, servers and the
              cloud
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-[#3B82F6] rounded-md font-medium hover:bg-[#2563EB] transition-colors">
                Download Linux
              </button>
              <button className="px-6 py-3 bg-white/10 rounded-md font-medium hover:bg-white/20 transition-colors">
                Get started
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Why Linux?
          </h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#3B82F6] rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure</h3>
              <p className="text-gray-600 text-sm">
                Built-in security features protect your data
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1E40AF] rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Open Source</h3>
              <p className="text-gray-600 text-sm">
                Free to use, share, and improve
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1E3A8A] rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Powerful</h3>
              <p className="text-gray-600 text-sm">
                Perfect for development and daily use
              </p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="bg-yellow-50 border-t border-yellow-200 px-8 py-4 text-center">
          <p className="text-yellow-800 text-sm">
            🎮 This is a simulated browser for the Linux Simulator demo
          </p>
        </div>
      </div>
    </div>
  );
}
