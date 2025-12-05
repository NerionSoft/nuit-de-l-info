'use client';

import Link from 'next/link';
import { Github, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#151515] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-[#E95420] to-[#772953] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <span className="font-bold text-xl">
                Ubuntu<span className="text-[#E95420]">Sim</span>
              </span>
            </Link>
            <p className="text-white/60 max-w-sm">
              Un simulateur Ubuntu interactif pour apprendre Linux de manière
              ludique et sans risque. Parfait pour les débutants.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="#apps"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  href="#learn"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Apprendre
                </Link>
              </li>
              <li>
                <a
                  href="https://ubuntu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Ubuntu Official
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Communauté</h4>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            © 2024 UbuntuSim. Fait avec{' '}
            <Heart className="w-4 h-4 inline text-[#E95420]" /> pour la Nuit de
            l&apos;Info.
          </p>
          <p className="text-white/40 text-sm">
            Ubuntu est une marque déposée de Canonical Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
