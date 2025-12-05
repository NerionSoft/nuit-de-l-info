'use client';

import { useState } from 'react';
import {
  Wifi,
  Bluetooth,
  Monitor,
  Volume2,
  Bell,
  Search,
  Lock,
  Users,
  HardDrive,
  Info,
  Palette,
  Keyboard,
  Mouse,
  Printer,
  Share2,
  Accessibility,
  Calendar,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/desktopStore';
import { AccessibilityPanel } from '@/components/AccessibilityPanel';

interface SettingsProps {
  windowId: string;
}

const categories = [
  { icon: Wifi, label: 'Wi-Fi', id: 'wifi' },
  { icon: Bluetooth, label: 'Bluetooth', id: 'bluetooth' },
  { icon: Monitor, label: 'Displays', id: 'displays' },
  { icon: Palette, label: 'Appearance', id: 'appearance' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: Search, label: 'Search', id: 'search' },
  { icon: Volume2, label: 'Sound', id: 'sound' },
  { icon: Lock, label: 'Privacy', id: 'privacy' },
  { icon: Share2, label: 'Sharing', id: 'sharing' },
  { icon: Users, label: 'Users', id: 'users' },
  { icon: Keyboard, label: 'Keyboard', id: 'keyboard' },
  { icon: Mouse, label: 'Mouse & Touchpad', id: 'mouse' },
  { icon: Printer, label: 'Printers', id: 'printers' },
  { icon: HardDrive, label: 'Disks', id: 'disks' },
  { icon: Calendar, label: 'Date & Time', id: 'datetime' },
  { icon: Accessibility, label: 'Accessibility', id: 'accessibility' },
  { icon: Info, label: 'About', id: 'about' },
];

const wallpapers = [
  '/wallpaper.jpg',
  '/wallpaper-1.jpg',
  '/wallpaper-2.jpg',
  '/wallpaper-3.jpg',
];

export function Settings({ windowId }: SettingsProps) {
  const [activeCategory, setActiveCategory] = useState('appearance');
  const { wallpaper, setWallpaper } = useDesktopStore();

  const renderContent = () => {
    switch (activeCategory) {
      case 'appearance':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Appearance</h2>

            <div className="space-y-6">
              {/* Style */}
              <div>
                <h3 className="text-sm font-medium text-white/70 mb-3">Style</h3>
                <div className="flex gap-4">
                  <button className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/10 ring-2 ring-[#3B82F6]">
                    <div className="w-16 h-10 bg-[#0F172A] rounded" />
                    <span className="text-sm">Dark</span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10">
                    <div className="w-16 h-10 bg-gray-100 rounded" />
                    <span className="text-sm">Light</span>
                  </button>
                </div>
              </div>

              {/* Background */}
              <div>
                <h3 className="text-sm font-medium text-white/70 mb-3">
                  Background
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {wallpapers.map((wp, index) => (
                    <button
                      key={index}
                      onClick={() => setWallpaper(wp)}
                      className={`aspect-video rounded-lg overflow-hidden ring-2 transition-all ${
                        wallpaper === wp
                          ? 'ring-[#3B82F6]'
                          : 'ring-transparent hover:ring-white/30'
                      }`}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundColor:
                            index === 0
                              ? '#3B82F6'
                              : index === 1
                              ? '#1E40AF'
                              : index === 2
                              ? '#0F172A'
                              : '#1E3A8A',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Accent Color */}
              <div>
                <h3 className="text-sm font-medium text-white/70 mb-3">
                  Accent Color
                </h3>
                <div className="flex gap-3">
                  {['#3B82F6', '#1E40AF', '#1E3A8A', '#3498db', '#27ae60'].map(
                    (color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full ring-2 ring-offset-2 ring-offset-[#1E1E1E] ring-transparent hover:ring-white/50 transition-all"
                        style={{ backgroundColor: color }}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 'accessibility':
        return <AccessibilityPanel />;

      case 'about':
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">About</h2>

            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold">L</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">LearnLinux Simulator</h3>
                <p className="text-white/60">1.0.0 (Education Edition)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/70">Device Name</span>
                <span>linux-sim</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/70">Memory</span>
                <span>8.0 GB</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/70">Processor</span>
                <span>Virtual x86_64</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/70">Graphics</span>
                <span>WebGL Renderer</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/70">Disk Capacity</span>
                <span>50.0 GB</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/70">OS Type</span>
                <span>64-bit</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/70">GNOME Version</span>
                <span>46</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/70">Windowing System</span>
                <span>Wayland</span>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full flex items-center justify-center text-white/50">
            <p>Settings for {activeCategory} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full flex bg-[#1E1E1E] text-white">
      {/* Sidebar */}
      <div className="w-56 bg-[#252526] border-r border-white/10 p-2 overflow-y-auto">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-left ${
                isActive
                  ? 'bg-[#3B82F6] text-white'
                  : 'hover:bg-white/10 text-white/80'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
