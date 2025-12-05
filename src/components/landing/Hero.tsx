'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative px-4 overflow-hidden h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-[#EEEFE9]" />

      {/* Subtle gradient orbs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-[#1E40AF]/10 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#151515] leading-tight mb-2">
              Apprends Linux
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3B82F6] leading-tight mb-6">
              en jouant
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-[#6B6B6B] mb-8 max-w-md mx-auto lg:mx-0">
              Une simulation Linux complete dans ton navigateur.
              Pas d&apos;installation, juste de la pratique.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-8">
              <Link
                href="/desktop?tutorial=true"
                className="group w-full sm:w-auto px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#3B82F6]/25 text-center"
              >
                <span className="flex items-center justify-center gap-2">
                  Commencer le tutoriel
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/desktop"
                className="px-4 py-3 text-[#6B6B6B] hover:text-[#3B82F6] font-medium transition-colors"
              >
                Explorer librement
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-[#6B6B6B] justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Gratuit
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Sans installation
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#22C55E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Open source
              </div>
            </div>
          </motion.div>

          {/* Right: Terminal Preview + Mascotte */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Mobile: Mascotte only */}
            <div className="lg:hidden flex justify-center mb-8">
              <Image
                src="/mascotte.png"
                alt="LearnLinux mascotte"
                width={120}
                height={120}
                priority
              />
            </div>

            {/* Desktop: Terminal + Mascotte */}
            <div className="hidden lg:block">
              {/* Mascotte floating */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-8 -right-4 z-10"
              >
                <Image
                  src="/mascotte.png"
                  alt="LearnLinux mascotte"
                  width={80}
                  height={80}
                  priority
                />
              </motion.div>

              <div className="bg-[#0F172A] rounded-xl shadow-2xl overflow-hidden border border-white/10">
                {/* Title Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1E293B] border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                  <div className="w-3 h-3 rounded-full bg-[#22C55E]" />
                  <span className="ml-3 text-white/60 text-sm font-mono">terminal</span>
                </div>

                {/* Terminal Content */}
                <div className="p-5 font-mono text-sm leading-relaxed">
                  <div className="text-[#22C55E]">user@learn-linux:~$</div>
                  <div className="text-white/90 mt-2">
                    <span className="text-[#22C55E]">$</span> whoami
                  </div>
                  <div className="text-white/70 mt-1">student</div>
                  <div className="text-white/90 mt-3">
                    <span className="text-[#22C55E]">$</span> echo &quot;Hello Linux!&quot;
                  </div>
                  <div className="text-white/70 mt-1">Hello Linux!</div>
                  <div className="text-[#22C55E] mt-3 flex items-center">
                    user@learn-linux:~$ <span className="w-2 h-4 bg-white/80 ml-1 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Decorative shadow */}
              <div className="absolute -inset-4 bg-[#3B82F6]/5 rounded-2xl -z-10 blur-xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
