'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, ArrowRight, Terminal, Folder, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[#EEEFE9]">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="#D0D1C9"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-[#D0D1C9] mb-6"
            >
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-[#6B6B6B]">
                100% gratuit et open source
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] leading-tight mb-6">
              Apprends Linux de manière{' '}
              <span className="text-[#E95420]">interactive</span>
            </h1>

            <p className="text-lg md:text-xl text-[#6B6B6B] mb-8 max-w-xl mx-auto lg:mx-0">
              Découvre Ubuntu dans ton navigateur. Un simulateur complet pour
              apprendre les commandes Linux, explorer le système de fichiers et
              maîtriser le terminal.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/desktop">
                <Button variant="ubuntu" size="lg" className="w-full sm:w-auto">
                  <Play className="w-5 h-5 mr-2" />
                  Lancer le simulateur
                </Button>
              </Link>
              <Link href="#learn">
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  En savoir plus
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#D0D1C9]">
              <div>
                <div className="text-2xl font-bold text-[#E95420]">15+</div>
                <div className="text-sm text-[#6B6B6B]">Commandes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#E95420]">6+</div>
                <div className="text-sm text-[#6B6B6B]">Applications</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#E95420]">100%</div>
                <div className="text-sm text-[#6B6B6B]">Gratuit</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Desktop Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative"
          >
            {/* Desktop Window Mockup */}
            <div className="relative bg-[#2C001E] rounded-xl shadow-2xl overflow-hidden border border-white/10">
              {/* Title Bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#3C0028]">
                <div className="w-3 h-3 rounded-full bg-[#E95420]" />
                <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
                <div className="w-3 h-3 rounded-full bg-[#7ED321]" />
                <span className="ml-4 text-white/80 text-sm">
                  Ubuntu Simulator
                </span>
              </div>

              {/* Desktop Content */}
              <div
                className="p-6 min-h-[300px] relative"
                style={{
                  background:
                    'linear-gradient(135deg, #E95420 0%, #772953 50%, #2C001E 100%)',
                }}
              >
                {/* Desktop Icons */}
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { icon: Terminal, label: 'Terminal' },
                    { icon: Folder, label: 'Files' },
                    { icon: Settings, label: 'Settings' },
                  ].map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.05 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm"
                    >
                      <item.icon className="w-8 h-8 text-white" />
                      <span className="text-xs text-white/90">{item.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Terminal Window Preview */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-4 right-4 left-4 bg-[#300A24] rounded-lg shadow-xl overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#3C0028]">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E95420]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#7ED321]" />
                    <span className="ml-2 text-white/70 text-xs">Terminal</span>
                  </div>
                  <div className="p-3 font-mono text-xs">
                    <div className="text-green-400">
                      user@ubuntu-simulator:~$
                    </div>
                    <div className="text-white/90 mt-1">
                      <span className="text-green-400">$</span> ls -la
                    </div>
                    <div className="text-white/70 mt-1">
                      drwxr-xr-x Documents
                    </div>
                    <div className="text-white/70">drwxr-xr-x Downloads</div>
                    <div className="text-white/70">drwxr-xr-x Pictures</div>
                    <div className="text-green-400 mt-1 animate-pulse">
                      user@ubuntu-simulator:~$ _
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#E95420]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#772953]/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
