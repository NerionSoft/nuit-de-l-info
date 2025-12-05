'use client';

import { motion } from 'framer-motion';

const features = [
  {
    title: 'Terminal interactif',
    description: 'Apprends les commandes essentielles : ls, cd, cat, mkdir et bien plus.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <rect x="2" y="4" width="28" height="24" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M8 12l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 20h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Gestionnaire de fichiers',
    description: 'Explore le système avec une interface graphique intuitive.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M4 8c0-1.1.9-2 2-2h6l2 3h12c1.1 0 2 .9 2 2v13c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V8z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Sans installation',
    description: 'Tout se passe dans ton navigateur. Aucun risque pour ton ordinateur.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" />
        <path d="M16 10v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Pour les debutants',
    description: 'Interface simple et tutoriel guide pour apprendre pas a pas.',
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
        <path d="M16 4l12 6v12l-12 6-12-6V10l12-6z" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16v10M4 10l12 6 12-6" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#151515] mb-4">
            Tout pour apprendre Linux
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-xl mx-auto">
            Un environnement complet et securise pour decouvrir Linux
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-5 p-6 rounded-2xl bg-[#FAFAFA] border border-[#E5E5E5] hover:border-[#3B82F6]/30 transition-colors"
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-[#3B82F6]/10 text-[#3B82F6] flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#151515] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
