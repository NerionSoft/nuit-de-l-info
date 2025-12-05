'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#EEEFE9]/95 backdrop-blur-sm border-b border-[#D0D1C9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="font-bold text-xl text-[#151515]">
              Linux<span className="text-[#3B82F6]">Sim</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-[#151515] hover:text-[#3B82F6] transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#apps"
              className="text-[#151515] hover:text-[#3B82F6] transition-colors font-medium"
            >
              Applications
            </Link>
            <Link
              href="#learn"
              className="text-[#151515] hover:text-[#3B82F6] transition-colors font-medium"
            >
              Learn
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/desktop">
              <Button variant="primary">Essayer maintenant</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-black/5"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#D0D1C9]">
            <div className="flex flex-col gap-4">
              <Link
                href="#features"
                className="text-[#151515] hover:text-[#3B82F6] transition-colors font-medium"
              >
                Features
              </Link>
              <Link
                href="#apps"
                className="text-[#151515] hover:text-[#3B82F6] transition-colors font-medium"
              >
                Applications
              </Link>
              <Link
                href="#learn"
                className="text-[#151515] hover:text-[#3B82F6] transition-colors font-medium"
              >
                Learn
              </Link>
              <Link href="/desktop">
                <Button variant="primary" className="w-full">
                  Essayer maintenant
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
