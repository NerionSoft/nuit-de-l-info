'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const steps = [
  {
    step: '1',
    title: 'Clique sur Commencer',
    description: 'Pas besoin de telecharger quoi que ce soit.',
  },
  {
    step: '2',
    title: 'Suis le tutoriel',
    description: 'Apprends les bases avec un guide interactif.',
  },
  {
    step: '3',
    title: 'Pratique librement',
    description: 'Explore et experimente sans limites.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-[#0F172A] text-white">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Pret en 3 etapes
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Commence ton apprentissage Linux en quelques secondes
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-[#3B82F6] via-[#3B82F6] to-[#3B82F6]" />

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative text-center"
              >
                {/* Step number */}
                <div className="relative inline-flex items-center justify-center w-16 h-16 mb-6">
                  <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/desktop?tutorial=true"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0F172A] hover:bg-white/90 rounded-xl font-semibold text-lg transition-colors"
          >
            Commencer le tutoriel
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
