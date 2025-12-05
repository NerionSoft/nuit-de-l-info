'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#151515] text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/mascotte.png"
              alt="LearnLinux mascotte"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-xl">
              Learn<span className="text-[#3B82F6]">Linux</span>
            </span>
          </Link>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a
              href="https://linux.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              Linux.org
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>
            2025 LearnLinux. Fait pour la Nuit de l&apos;Info.
          </p>
          <p>
            Linux est une marque deposee.
          </p>
        </div>
      </div>
    </footer>
  );
}
