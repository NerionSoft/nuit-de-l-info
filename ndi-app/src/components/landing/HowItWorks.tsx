'use client';

import { motion } from 'framer-motion';
import { MousePointer, Terminal, Sparkles } from 'lucide-react';

const steps = [
  {
    icon: MousePointer,
    step: '01',
    title: 'Clique sur "Lancer"',
    description:
      'Pas besoin de télécharger ou d\'installer quoi que ce soit. Un simple clic suffit.',
  },
  {
    icon: Terminal,
    step: '02',
    title: 'Explore Ubuntu',
    description:
      'Ouvre le terminal, navigue dans les fichiers, lance des applications comme sur un vrai Linux.',
  },
  {
    icon: Sparkles,
    step: '03',
    title: 'Apprends en pratiquant',
    description:
      'Tape des commandes, crée des fichiers, personnalise ton environnement. Tout est permis !',
  },
];

export function HowItWorks() {
  return (
    <section id="learn" className="py-20 px-4 bg-[#2C001E] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-white/10 text-white/90 rounded-full text-sm font-medium mb-4">
            Comment ça marche
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Commence en 3 étapes simples
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Aucune connaissance technique requise. Commence ton voyage Linux
            maintenant.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-16 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#E95420] via-[#772953] to-[#77216F]" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E95420] to-[#772953] rounded-full opacity-20" />
                  <div className="relative w-24 h-24 bg-gradient-to-br from-[#E95420] to-[#772953] rounded-full flex items-center justify-center">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-[#2C001E] rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="/desktop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E95420] hover:bg-[#C7410D] rounded-lg font-semibold text-lg transition-colors"
          >
            <Terminal className="w-5 h-5" />
            Commencer maintenant
          </a>
        </motion.div>
      </div>
    </section>
  );
}
