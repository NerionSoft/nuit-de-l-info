'use client';

import { motion } from 'framer-motion';
import {
  FileText,
  PlayCircle,
  MessageCircle,
  Map,
  Users,
  BookOpen,
  Briefcase,
  HelpCircle,
} from 'lucide-react';

const sidebarItems = [
  { icon: FileText, label: 'docs.md', href: '#learn' },
  { icon: PlayCircle, label: 'demo.mov', href: '/desktop' },
  { icon: MessageCircle, label: 'chat', href: '#' },
  { icon: Map, label: 'roadmap', href: '#' },
  { icon: Users, label: 'community', href: '#' },
  { icon: BookOpen, label: 'tutorials', href: '#learn' },
  { icon: Briefcase, label: 'use cases', href: '#features' },
  { icon: HelpCircle, label: 'support', href: '#' },
];

export function Sidebar() {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2"
    >
      {sidebarItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.a
            key={item.label}
            href={item.href}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="group flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white rounded-lg shadow-md border border-[#D0D1C9] flex items-center justify-center group-hover:border-[#E95420] group-hover:shadow-lg transition-all">
              <Icon className="w-5 h-5 text-[#6B6B6B] group-hover:text-[#E95420] transition-colors" />
            </div>
            <span className="text-sm font-medium text-[#6B6B6B] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </motion.a>
        );
      })}
    </motion.div>
  );
}
