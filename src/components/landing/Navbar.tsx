'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EEEFE9]/95 backdrop-blur-sm border-b border-[#D0D1C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/mascotte.png"
              alt="LearnLinux mascotte"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-bold text-xl text-[#151515]">
              Learn<span className="text-[#3B82F6]">Linux</span>
            </span>
          </Link>

          {/* CTA */}
          <Link
            href="/desktop?tutorial=true"
            className="px-5 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg font-medium transition-colors"
          >
            Commencer
          </Link>
        </div>
      </div>
    </nav>
  );
}
