'use client';

import { motion } from 'framer-motion';
import {
  Terminal,
  Folder,
  Globe,
  Settings,
  FileText,
  Calculator,
} from 'lucide-react';

const apps = [
  {
    icon: Terminal,
    name: 'Terminal',
    description: 'Exécute des commandes Linux',
    preview: (
      <div className="bg-[#300A24] rounded-lg p-3 font-mono text-xs">
        <div className="text-green-400">$ ls Documents/</div>
        <div className="text-white/70">notes.txt  todo.txt</div>
        <div className="text-green-400">$ cat notes.txt</div>
        <div className="text-white/70">Hello Ubuntu!</div>
      </div>
    ),
  },
  {
    icon: Folder,
    name: 'Files',
    description: 'Explore tes fichiers',
    preview: (
      <div className="bg-[#1E1E1E] rounded-lg p-3">
        <div className="flex gap-2">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#E95420] rounded flex items-center justify-center">
              <Folder className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] text-white/70 mt-1">Documents</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-[#E95420] rounded flex items-center justify-center">
              <Folder className="w-4 h-4 text-white" />
            </div>
            <span className="text-[10px] text-white/70 mt-1">Downloads</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: Globe,
    name: 'Firefox',
    description: 'Navigue sur le web',
    preview: (
      <div className="bg-[#2D2D2D] rounded-lg overflow-hidden">
        <div className="bg-[#3D3D3D] px-2 py-1 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#E95420]" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 bg-[#1E1E1E] rounded px-2 py-0.5 text-[10px] text-white/50">
            linux.org
          </div>
        </div>
        <div className="p-2 bg-[#2C001E] text-center text-white/80 text-xs">
          Linux Home
        </div>
      </div>
    ),
  },
  {
    icon: Settings,
    name: 'Settings',
    description: 'Configure ton système',
    preview: (
      <div className="bg-[#1E1E1E] rounded-lg p-2">
        <div className="flex items-center gap-2 text-white/80 text-xs mb-2">
          <Settings className="w-3 h-3" />
          <span>Appearance</span>
        </div>
        <div className="flex gap-1">
          <div className="w-6 h-6 rounded bg-[#2C001E] ring-1 ring-[#E95420]" />
          <div className="w-6 h-6 rounded bg-gray-200" />
        </div>
      </div>
    ),
  },
  {
    icon: FileText,
    name: 'Text Editor',
    description: 'Édite tes fichiers',
    preview: (
      <div className="bg-[#1E1E1E] rounded-lg p-2 font-mono text-[10px]">
        <div className="flex">
          <div className="text-white/30 pr-2">1</div>
          <div className="text-white/80"># Mon fichier</div>
        </div>
        <div className="flex">
          <div className="text-white/30 pr-2">2</div>
          <div className="text-white/80">Hello Linux!</div>
        </div>
      </div>
    ),
  },
  {
    icon: Calculator,
    name: 'Calculator',
    description: 'Fais des calculs',
    preview: (
      <div className="bg-[#1E1E1E] rounded-lg p-2">
        <div className="text-right text-white text-lg mb-1">42</div>
        <div className="grid grid-cols-4 gap-0.5">
          {['7', '8', '9', '÷'].map((btn) => (
            <div
              key={btn}
              className="bg-white/10 rounded text-center text-white/80 text-xs py-1"
            >
              {btn}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function AppShowcase() {
  return (
    <section id="apps" className="py-20 px-4 bg-[#EEEFE9]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#772953]/10 text-[#772953] rounded-full text-sm font-medium mb-4">
            Applications
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#151515] mb-4">
            Des applications comme sur un vrai système Linux
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Explore les applications essentielles de Linux dans un environnement
            sûr
          </p>
        </motion.div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => {
            const Icon = app.icon;
            return (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Preview */}
                <div className="p-4 bg-gradient-to-br from-[#2C001E] to-[#772953]">
                  {app.preview}
                </div>

                {/* Info */}
                <div className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#E95420]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#E95420]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#151515]">{app.name}</h3>
                    <p className="text-sm text-[#6B6B6B]">{app.description}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
