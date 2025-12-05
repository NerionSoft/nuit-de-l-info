'use client';

import { motion } from 'framer-motion';
import {
  Terminal,
  Folder,
  Settings,
  Shield,
  Zap,
  Users,
  BookOpen,
  Code,
  Monitor,
} from 'lucide-react';

const features = [
  {
    icon: Terminal,
    title: 'Terminal Interactif',
    description:
      'Un vrai terminal avec 15+ commandes Linux. Apprends ls, cd, cat, mkdir et bien plus.',
    color: '#E95420',
  },
  {
    icon: Folder,
    title: 'Gestionnaire de Fichiers',
    description:
      "Explore le système de fichiers Linux avec une interface graphique intuitive style GNOME.",
    color: '#772953',
  },
  {
    icon: Settings,
    title: 'Paramètres Système',
    description:
      'Personnalise ton environnement : change le fond d\'écran, explore les options système.',
    color: '#77216F',
  },
  {
    icon: Shield,
    title: '100% Sécurisé',
    description:
      'Tout se passe dans ton navigateur. Aucune installation, aucun risque pour ton ordinateur.',
    color: '#4E9A06',
  },
  {
    icon: Zap,
    title: 'Instantané',
    description:
      "Pas d'installation requise. Lance le simulateur directement depuis ton navigateur web.",
    color: '#F5A623',
  },
  {
    icon: Users,
    title: 'Pour les Débutants',
    description:
      'Conçu pour les jeunes qui découvrent Linux. Interface simple et commandes guidées.',
    color: '#3498DB',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Features() {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-[#E95420]/10 text-[#E95420] rounded-full text-sm font-medium mb-4">
            Fonctionnalités
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#151515] mb-4">
            Tout ce dont tu as besoin pour apprendre Linux
          </h2>
          <p className="text-lg text-[#6B6B6B] max-w-2xl mx-auto">
            Un environnement Linux complet et interactif directement dans ton
            navigateur
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="group p-6 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] hover:border-[#E95420]/30 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-semibold text-[#151515] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#6B6B6B]">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
