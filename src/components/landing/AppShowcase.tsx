'use client';

import { motion } from 'framer-motion';

const apps = [
  {
    name: 'Terminal',
    description: 'Execute des commandes Linux',
    preview: (
      <div className="bg-[#0F172A] rounded-lg p-4 font-mono text-xs h-full">
        <div className="text-[#22C55E]">$ ls -la</div>
        <div className="text-white/70 mt-1">drwxr-xr-x Documents</div>
        <div className="text-white/70">drwxr-xr-x Downloads</div>
        <div className="text-[#22C55E] mt-2 flex items-center">
          $ <span className="w-1.5 h-3 bg-white/70 ml-1 animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    name: 'Files',
    description: 'Explore tes fichiers',
    preview: (
      <div className="bg-[#1E1E1E] rounded-lg p-4 h-full">
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none">
                <path d="M3 7c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[10px] text-white/60 mt-1">Documents</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-[#3B82F6]/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#3B82F6]" viewBox="0 0 24 24" fill="none">
                <path d="M3 7c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z" fill="currentColor" />
              </svg>
            </div>
            <span className="text-[10px] text-white/60 mt-1">Downloads</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: 'Text Editor',
    description: 'Edite tes fichiers',
    preview: (
      <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-xs h-full">
        <div className="flex">
          <div className="text-white/30 pr-3 select-none">1</div>
          <div className="text-[#7DD3FC]"># Mon fichier</div>
        </div>
        <div className="flex">
          <div className="text-white/30 pr-3 select-none">2</div>
          <div className="text-white/80">Hello Linux!</div>
        </div>
        <div className="flex">
          <div className="text-white/30 pr-3 select-none">3</div>
          <div className="text-white/40">|</div>
        </div>
      </div>
    ),
  },
];

export function AppShowcase() {
  return (
    <section className="py-24 px-4 bg-[#EEEFE9]">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#151515] mb-4">
            Des applications comme sur un vrai Linux
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto">
            Explore les outils essentiels dans un environnement sur
          </p>
        </motion.div>

        {/* Apps Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] hover:shadow-lg transition-shadow"
            >
              {/* Preview */}
              <div className="p-4 h-32 bg-gradient-to-br from-[#0F172A] to-[#1E3A8A]">
                {app.preview}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-semibold text-[#151515] mb-1">{app.name}</h3>
                <p className="text-sm text-[#6B6B6B]">{app.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
