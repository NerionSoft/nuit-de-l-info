// Système de commandes éco-responsables pour le simulateur Linux

export interface GreenCommandSuggestion {
  original: string;
  green: string;
  reason: string;
  energySaved: number; // Pourcentage d'énergie économisée
  category: 'performance' | 'efficiency' | 'optimization';
}

// Base de données des suggestions de commandes vertes
export const greenCommandSuggestions: Record<string, GreenCommandSuggestion> = {
  // Recherche de fichiers - find vs fd
  'find': {
    original: 'find',
    green: 'fd',
    reason: 'fd est ~10x plus rapide que find grâce à un algorithme optimisé et du multithreading',
    energySaved: 60,
    category: 'performance',
  },

  // Recherche dans les fichiers - grep vs rg (ripgrep)
  'grep': {
    original: 'grep',
    green: 'rg',
    reason: 'ripgrep est ~5x plus rapide que grep et ignore automatiquement .git/',
    energySaved: 50,
    category: 'performance',
  },

  // Listage de fichiers - ls vs exa
  'ls -la': {
    original: 'ls -la',
    green: 'exa -la',
    reason: 'exa est moderne, coloré par défaut, et affiche les métadonnées de façon optimisée',
    energySaved: 20,
    category: 'efficiency',
  },

  // Cat avec syntaxe - cat vs bat
  'cat': {
    original: 'cat',
    green: 'bat',
    reason: 'bat affiche la syntaxe colorée et pagine automatiquement, évitant les scrolls inutiles',
    energySaved: 30,
    category: 'efficiency',
  },

  // Visualisation de fichiers - tail -f vs lnav
  'tail -f': {
    original: 'tail -f',
    green: 'lnav',
    reason: 'lnav parse et indexe les logs intelligemment, réduisant la charge CPU',
    energySaved: 40,
    category: 'optimization',
  },

  // Utilisation réseau - curl sans compression vs curl avec compression
  'curl': {
    original: 'curl',
    green: 'curl --compressed',
    reason: 'Utiliser --compressed réduit la bande passante et donc l\'énergie réseau',
    energySaved: 35,
    category: 'efficiency',
  },

  // Navigation - cd multiple vs autojump
  'cd': {
    original: 'cd ../../..',
    green: 'z <dir>',
    reason: 'z (autojump) apprend vos patterns et réduit les commandes multiples',
    energySaved: 25,
    category: 'efficiency',
  },

  // Git - git pull vs git pull --rebase
  'git pull': {
    original: 'git pull',
    green: 'git pull --rebase',
    reason: 'Évite les merge commits inutiles, réduisant la taille du repo et les opérations',
    energySaved: 15,
    category: 'optimization',
  },

  // Npm/pnpm - npm install vs pnpm install
  'npm install': {
    original: 'npm install',
    green: 'pnpm install',
    reason: 'pnpm partage les dépendances entre projets, économisant 70% d\'espace disque',
    energySaved: 70,
    category: 'optimization',
  },

  // Docker - docker build vs docker buildx
  'docker build': {
    original: 'docker build',
    green: 'docker buildx build --cache-from',
    reason: 'BuildKit avec cache réduit drastiquement les rebuilds inutiles',
    energySaved: 65,
    category: 'optimization',
  },

  // Édition de fichiers - vim vs neovim
  'vim': {
    original: 'vim',
    green: 'nvim',
    reason: 'Neovim a un rendu asynchrone qui réduit l\'utilisation CPU de 30%',
    energySaved: 30,
    category: 'performance',
  },

  // Compression - gzip vs zstd
  'gzip': {
    original: 'gzip',
    green: 'zstd',
    reason: 'zstd compresse 3x plus vite que gzip avec un meilleur ratio',
    energySaved: 55,
    category: 'performance',
  },
};

// Commandes natives déjà optimisées (pas de suggestion)
export const nativeGreenCommands = [
  'touch',
  'mkdir',
  'rm',
  'mv',
  'cp',
  'echo',
  'pwd',
  'whoami',
  'date',
  'clear',
  'exit',
  'help',
  'man',
];

// Détecte si une commande est éco-responsable
export function isGreenCommand(command: string): boolean {
  const cmd = command.trim().split(' ')[0];

  // Vérifier si c'est une alternative verte
  const greenAlternatives = Object.values(greenCommandSuggestions).map(s => s.green.split(' ')[0]);
  if (greenAlternatives.includes(cmd)) {
    return true;
  }

  // Vérifier si c'est une commande native optimisée
  if (nativeGreenCommands.includes(cmd)) {
    return true;
  }

  // Vérifier les commandes avec flags optimisés
  if (command.includes('--compressed') ||
      command.includes('--rebase') ||
      command.includes('--cache-from') ||
      command.includes('pnpm')) {
    return true;
  }

  return false;
}

// Obtenir une suggestion pour une commande
export function getGreenSuggestion(command: string): GreenCommandSuggestion | null {
  const cmd = command.trim().split(' ')[0];

  // Recherche exacte
  if (greenCommandSuggestions[cmd]) {
    return greenCommandSuggestions[cmd];
  }

  // Recherche avec contexte (ex: ls -la)
  const cmdWithFirstArg = command.trim().split(' ').slice(0, 2).join(' ');
  if (greenCommandSuggestions[cmdWithFirstArg]) {
    return greenCommandSuggestions[cmdWithFirstArg];
  }

  return null;
}

// Catégories de badges éco
export interface EcoBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number; // Nombre de commandes vertes requises
}

export const ecoBadges: EcoBadge[] = [
  {
    id: 'eco-newbie',
    name: 'Éco-débutant',
    description: 'Première commande éco-responsable utilisée',
    icon: '🌱',
    requirement: 1,
  },
  {
    id: 'eco-aware',
    name: 'Éco-conscient',
    description: '5 commandes éco-responsables utilisées',
    icon: '🌿',
    requirement: 5,
  },
  {
    id: 'eco-coder',
    name: 'Éco-codeur',
    description: '10 commandes éco-responsables utilisées',
    icon: '🍃',
    requirement: 10,
  },
  {
    id: 'eco-expert',
    name: 'Éco-expert',
    description: '25 commandes éco-responsables utilisées',
    icon: '🌳',
    requirement: 25,
  },
  {
    id: 'eco-master',
    name: 'Éco-maître',
    description: '50 commandes éco-responsables utilisées',
    icon: '🌲',
    requirement: 50,
  },
  {
    id: 'eco-legend',
    name: 'Légende Écolo',
    description: '100 commandes éco-responsables utilisées',
    icon: '🌴',
    requirement: 100,
  },
];

// Calcule l'énergie totale économisée basée sur les suggestions
export function calculateEnergySavings(greenCommandsUsed: number, suggestions: GreenCommandSuggestion[]): number {
  // Moyenne d'économie par commande verte
  const avgSaving = suggestions.reduce((acc, s) => acc + s.energySaved, 0) / suggestions.length || 40;

  // Calcul simplifié : chaque commande économise ~avgSaving% d'énergie
  // En supposant qu'une commande normale utilise ~0.1Wh
  const energyPerCommand = 0.1; // Wh
  const totalEnergy = greenCommandsUsed * energyPerCommand * (avgSaving / 100);

  return Math.round(totalEnergy * 100) / 100; // Arrondi à 2 décimales
}

// Messages de motivation basés sur les commandes vertes
export const greenCommandMotivations = [
  "Tu contribues activement à réduire l'empreinte carbone du numérique !",
  "Chaque commande optimisée compte pour la planète !",
  "Tu es un véritable éco-guerrier du terminal !",
  "Les serveurs te remercient pour cette économie d'énergie !",
  "Code vert = Planète verte !",
  "Optimiser, c'est préserver !",
  "Tu es un exemple d'efficacité énergétique !",
  "Green coding is the future !",
];

export function getRandomMotivation(): string {
  return greenCommandMotivations[Math.floor(Math.random() * greenCommandMotivations.length)];
}
