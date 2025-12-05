import type { TutorialStep } from '@/types/tutorial';

export const tutorialSteps: TutorialStep[] = [
  // ═══════════════════════════════════════════════════════════════
  // PARTIE 1: DÉCOUVERTE DE L'INTERFACE
  // ═══════════════════════════════════════════════════════════════

  // Étape 1: Bienvenue
  {
    id: 1,
    type: 'intro',
    title: 'Bienvenue dans Ubuntu !',
    subtitle: 'Ton aventure Linux commence ici',
    description:
      "Je suis Tux, ta mascotte Linux ! Je vais te guider pas à pas pour découvrir ce système d'exploitation incroyable. Prêt à devenir un pro ?",
    mascotMessage: {
      text: "Salut ! Je suis super content de t'accompagner dans cette aventure ! 🐧",
      mood: 'excited',
    },
    icon: 'terminal',
  },

  // Étape 2: Découverte du bureau
  {
    id: 2,
    type: 'explore',
    title: 'Voici ton bureau Ubuntu',
    subtitle: 'Comme Windows ou Mac, mais en mieux !',
    description:
      "Tu vois ces icônes ? Ce sont des raccourcis vers les applications. Le fond d'écran avec le dégradé orange, c'est la signature d'Ubuntu !",
    mascotMessage: {
      text: "Regarde autour de toi ! Tu vois les icônes sur le bureau ? C'est comme sur ton ordinateur habituel, mais version Linux !",
      mood: 'happy',
    },
    autoAdvance: false,
  },

  // Étape 3: Ouvrir le Terminal (ACTION)
  {
    id: 3,
    type: 'action',
    title: 'Ouvre le Terminal',
    subtitle: 'Double-clique sur l\'icône Terminal',
    description:
      'Le Terminal est LA star de Linux ! C\'est ici que tu vas taper des commandes magiques.',
    mascotMessage: {
      text: "Fais un double-clic sur l'icône 'Terminal' sur le bureau. C'est l'icône noire avec le symbole >_ !",
      mood: 'excited',
    },
    action: {
      type: 'double-click-icon',
      target: 'desktop-icon-terminal',
      description: 'Double-clique sur l\'icône Terminal',
      highlightSelector: '[data-app="terminal"]',
    },
  },

  // Étape 4: Découverte du terminal
  {
    id: 4,
    type: 'explore',
    title: 'Voici le Terminal !',
    subtitle: 'Ton nouveau super-pouvoir',
    description:
      'Cette fenêtre noire, c\'est le Terminal. Tu vois le curseur qui clignote ? C\'est là que tu vas écrire tes commandes.',
    mascotMessage: {
      text: "Woah, tu as ouvert le Terminal ! Tu vois cette ligne verte avec ton nom ? C'est le 'prompt'. Il attend tes ordres !",
      mood: 'celebrating',
    },
    autoAdvance: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // PARTIE 2: COMMANDES DE BASE
  // ═══════════════════════════════════════════════════════════════

  // Étape 5: pwd (QCM + commande)
  {
    id: 5,
    type: 'qcm',
    title: 'Où suis-je ?',
    subtitle: 'Ta première commande Linux',
    description:
      'Avant de naviguer, il faut savoir où on se trouve. C\'est comme regarder le GPS !',
    mascotMessage: {
      text: "Petite question pour toi ! Quelle commande permet de savoir dans quel dossier tu te trouves ?",
      mood: 'thinking',
    },
    qcm: {
      question: 'Quelle commande affiche ton emplacement actuel ?',
      options: [
        { label: 'pwd', isCorrect: true },
        { label: 'ls', isCorrect: false },
        { label: 'cd', isCorrect: false },
        { label: 'where', isCorrect: false },
      ],
      hint: 'PWD = Print Working Directory (Afficher le Dossier de Travail)',
    },
    command: {
      expectedCommand: 'pwd',
      successMessage: 'Tu as trouvé ton chemin !',
      errorMessage: 'Tape "pwd" et appuie sur Entrée',
    },
    explanation: {
      title: 'pwd - Print Working Directory',
      command: 'pwd',
      description:
        'Cette commande affiche le chemin complet du dossier où tu te trouves. Super utile quand tu es perdu !',
      syntax: 'pwd',
      examples: ['/home/user', '/home/user/Documents'],
      tips: [
        '/ = la racine du système (comme C:\\ sur Windows)',
        '~ = ton dossier personnel (raccourci pour /home/user)',
      ],
    },
  },

  // Étape 6: ls
  {
    id: 6,
    type: 'qcm',
    title: 'Regarder autour de soi',
    subtitle: 'Qu\'y a-t-il ici ?',
    description:
      'Maintenant que tu sais où tu es, voyons ce qu\'il y a dans ce dossier !',
    mascotMessage: {
      text: "Super ! Maintenant, comment on fait pour voir ce qu'il y a dans le dossier ? Un peu comme ouvrir un tiroir pour voir ce qu'il contient !",
      mood: 'thinking',
    },
    qcm: {
      question: 'Quelle commande liste les fichiers et dossiers ?',
      options: [
        { label: 'show', isCorrect: false },
        { label: 'ls', isCorrect: true },
        { label: 'list', isCorrect: false },
        { label: 'dir', isCorrect: false },
      ],
      hint: 'LS = LiSt (Lister)',
    },
    command: {
      expectedCommand: 'ls',
      successMessage: 'Tu vois maintenant le contenu du dossier !',
      errorMessage: 'Tape "ls" pour lister les fichiers',
    },
    explanation: {
      title: 'ls - List',
      command: 'ls',
      description: 'Affiche la liste de tout ce qui se trouve dans le dossier actuel.',
      syntax: 'ls [options] [chemin]',
      examples: ['ls', 'ls -la', 'ls Documents/'],
      tips: [
        'ls -l = affiche les détails (taille, date, permissions)',
        'ls -a = affiche les fichiers cachés (commençant par .)',
        'Les dossiers sont souvent en bleu !',
      ],
    },
  },

  // Étape 7: cd (entrer dans Documents)
  {
    id: 7,
    type: 'qcm',
    title: 'Se déplacer',
    subtitle: 'Entrer dans un dossier',
    description:
      'Tu vois le dossier Documents ? Allons voir ce qu\'il contient !',
    mascotMessage: {
      text: "Tu vois 'Documents' dans la liste ? On va entrer dedans ! C'est comme ouvrir un dossier en double-cliquant, mais en version texte !",
      mood: 'excited',
    },
    qcm: {
      question: 'Comment entrer dans le dossier Documents ?',
      options: [
        { label: 'open Documents', isCorrect: false },
        { label: 'goto Documents', isCorrect: false },
        { label: 'cd Documents', isCorrect: true },
        { label: 'enter Documents', isCorrect: false },
      ],
      hint: 'CD = Change Directory (Changer de Dossier)',
    },
    command: {
      expectedCommand: 'cd documents',
      successMessage: 'Tu es dans Documents !',
      errorMessage: 'Tape "cd Documents"',
    },
    explanation: {
      title: 'cd - Change Directory',
      command: 'cd',
      description: 'Permet de te déplacer de dossier en dossier.',
      syntax: 'cd [chemin]',
      examples: ['cd Documents', 'cd /home/user', 'cd ~'],
      tips: [
        'cd seul = retour au dossier personnel',
        'cd ~ = pareil, retour à la maison',
        'Attention aux majuscules ! Documents ≠ documents',
      ],
    },
  },

  // Étape 8: cd .. (remonter)
  {
    id: 8,
    type: 'qcm',
    title: 'Revenir en arrière',
    subtitle: 'Remonter d\'un niveau',
    description: 'Tu es dans Documents. Comment revenir au dossier parent ?',
    mascotMessage: {
      text: "OK, on est dans Documents. Mais comment on remonte ? C'est comme appuyer sur le bouton 'Retour' !",
      mood: 'thinking',
    },
    qcm: {
      question: 'Comment remonter au dossier parent ?',
      options: [
        { label: 'cd back', isCorrect: false },
        { label: 'cd ..', isCorrect: true },
        { label: 'back', isCorrect: false },
        { label: 'cd up', isCorrect: false },
      ],
      hint: '.. = le dossier parent (au-dessus)',
    },
    command: {
      expectedCommand: 'cd ..',
      successMessage: 'Tu es remonté d\'un niveau !',
      errorMessage: 'Tape "cd .."',
    },
    explanation: {
      title: 'cd .. - Remonter',
      command: 'cd ..',
      description: 'Les deux points (..) représentent toujours le dossier parent.',
      syntax: 'cd ..',
      examples: ['cd ..', 'cd ../..', 'cd ../Documents'],
      tips: [
        '.. = dossier parent',
        '. = dossier actuel',
        'cd - = dossier précédent (comme "Retour")',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // PARTIE 3: EXPLORATION DES AUTRES APPS
  // ═══════════════════════════════════════════════════════════════

  // Étape 9: Découvrir le gestionnaire de fichiers
  {
    id: 9,
    type: 'action',
    title: 'Le gestionnaire de fichiers',
    subtitle: 'L\'interface graphique pour les fichiers',
    description:
      'Le Terminal c\'est bien, mais parfois on préfère voir les fichiers visuellement. Ouvre Files !',
    mascotMessage: {
      text: "Le Terminal c'est puissant, mais regarde ! On peut aussi naviguer avec une interface graphique. Double-clique sur 'Files' !",
      mood: 'happy',
    },
    action: {
      type: 'double-click-icon',
      target: 'desktop-icon-files',
      description: 'Double-clique sur l\'icône Files',
      highlightSelector: '[data-app="file-manager"]',
    },
  },

  // Étape 10: Explorer Files
  {
    id: 10,
    type: 'explore',
    title: 'Voici le gestionnaire de fichiers',
    subtitle: 'Nautilus, ton explorateur',
    description:
      'C\'est comme l\'Explorateur Windows ou le Finder Mac ! Tu peux naviguer en cliquant.',
    mascotMessage: {
      text: "Tu vois ? C'est les mêmes dossiers que dans le Terminal ! Documents, Downloads, Pictures... La différence ? Ici tu cliques, là-bas tu tapes !",
      mood: 'celebrating',
    },
    autoAdvance: false,
  },

  // Étape 11: Retour au Terminal - cat
  {
    id: 11,
    type: 'qcm',
    title: 'Lire un fichier',
    subtitle: 'Afficher le contenu',
    description:
      'Retourne dans le Terminal ! Il y a un fichier notes.txt. Comment le lire ?',
    mascotMessage: {
      text: "Retourne dans le Terminal (clique sur sa fenêtre). Il y a un fichier 'notes.txt' - voyons ce qu'il contient !",
      mood: 'thinking',
    },
    qcm: {
      question: 'Comment afficher le contenu de notes.txt ?',
      options: [
        { label: 'read notes.txt', isCorrect: false },
        { label: 'open notes.txt', isCorrect: false },
        { label: 'cat notes.txt', isCorrect: true },
        { label: 'show notes.txt', isCorrect: false },
      ],
      hint: 'CAT comme le chat... qui montre tout !',
    },
    command: {
      expectedCommand: 'cat notes.txt',
      successMessage: 'Tu peux lire le fichier !',
      errorMessage: 'Tape "cat notes.txt"',
    },
    explanation: {
      title: 'cat - Concatenate',
      command: 'cat',
      description: 'Affiche le contenu d\'un fichier directement dans le terminal.',
      syntax: 'cat [fichier]',
      examples: ['cat notes.txt', 'cat /etc/hostname'],
      tips: [
        'cat vient de "concatenate" (concaténer)',
        'Pour les longs fichiers, utilise "less" pour paginer',
        'cat peut afficher plusieurs fichiers à la suite',
      ],
    },
  },

  // Étape 12: Créer un dossier
  {
    id: 12,
    type: 'qcm',
    title: 'Créer un dossier',
    subtitle: 'Ton premier dossier !',
    description: 'Créons un nouveau dossier pour tes projets.',
    mascotMessage: {
      text: "Et si on créait ton propre dossier ? Comme faire 'Nouveau dossier' avec un clic droit, mais en commande !",
      mood: 'excited',
    },
    qcm: {
      question: 'Comment créer un dossier "projets" ?',
      options: [
        { label: 'create projets', isCorrect: false },
        { label: 'mkdir projets', isCorrect: true },
        { label: 'newfolder projets', isCorrect: false },
        { label: 'md projets', isCorrect: false },
      ],
      hint: 'MKDIR = Make Directory (Créer un Dossier)',
    },
    command: {
      expectedCommand: 'mkdir',
      successMessage: 'Dossier créé ! Fais "ls" pour vérifier.',
      errorMessage: 'Tape "mkdir projets"',
    },
    explanation: {
      title: 'mkdir - Make Directory',
      command: 'mkdir',
      description: 'Crée un nouveau dossier.',
      syntax: 'mkdir [nom]',
      examples: ['mkdir projets', 'mkdir -p chemin/vers/dossier'],
      tips: [
        '-p crée tous les dossiers parents si nécessaire',
        'Évite les espaces dans les noms !',
        'Utilise des tirets ou underscores : mon-projet ou mon_projet',
      ],
    },
  },

  // Étape 13: Explorer les Settings
  {
    id: 13,
    type: 'action',
    title: 'Les paramètres système',
    subtitle: 'Personnaliser Ubuntu',
    description: 'Découvrons les paramètres pour personnaliser ton système !',
    mascotMessage: {
      text: "Une dernière chose ! Ouvre les Paramètres (Settings) pour voir comment personnaliser Ubuntu. Double-clique sur l'icône !",
      mood: 'happy',
    },
    action: {
      type: 'double-click-icon',
      target: 'desktop-icon-settings',
      description: 'Double-clique sur Settings',
      highlightSelector: '[data-app="settings"]',
    },
  },

  // Étape 14: Explorer Settings
  {
    id: 14,
    type: 'explore',
    title: 'Les paramètres Ubuntu',
    subtitle: 'Tout se configure ici',
    description:
      'Ici tu peux changer le fond d\'écran, les couleurs, la langue, et plein d\'autres choses !',
    mascotMessage: {
      text: "C'est ici qu'on personnalise tout ! Tu peux changer le fond d'écran, les couleurs... Explore un peu !",
      mood: 'celebrating',
    },
    autoAdvance: false,
  },

  // Étape 15: Commande help
  {
    id: 15,
    type: 'qcm',
    title: 'Obtenir de l\'aide',
    subtitle: 'Ne jamais rester bloqué',
    description: 'Dernière commande essentielle : comment obtenir de l\'aide ?',
    mascotMessage: {
      text: "Retourne dans le Terminal pour la dernière leçon ! Si tu oublies une commande, il y a une solution...",
      mood: 'thinking',
    },
    qcm: {
      question: 'Comment voir la liste des commandes disponibles ?',
      options: [
        { label: '?', isCorrect: false },
        { label: 'help', isCorrect: true },
        { label: 'commands', isCorrect: false },
        { label: 'list', isCorrect: false },
      ],
      hint: 'Le mot anglais pour "aide"',
    },
    command: {
      expectedCommand: 'help',
      successMessage: 'Tu sais maintenant où trouver de l\'aide !',
      errorMessage: 'Tape "help"',
    },
    explanation: {
      title: 'help - Obtenir de l\'aide',
      command: 'help',
      description: 'Affiche la liste des commandes disponibles avec leur description.',
      syntax: 'help | man [cmd] | [cmd] --help',
      examples: ['help', 'man ls', 'ls --help'],
      tips: [
        'man = le manuel complet (touche q pour quitter)',
        '--help = aide rapide pour une commande',
        'Google est aussi ton ami ! 😉',
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // PARTIE 4: DÉCOUVERTE DE LIBREOFFICE (LOGICIEL LIBRE)
  // ═══════════════════════════════════════════════════════════════

  // Étape 16: Introduction LibreOffice
  {
    id: 16,
    type: 'explore',
    title: 'Découvre LibreOffice !',
    subtitle: 'La suite bureautique libre',
    description:
      'LibreOffice est une suite bureautique 100% gratuite et open source. C\'est l\'alternative libre à Microsoft Office !',
    mascotMessage: {
      text: "Tu vois les nouvelles icônes sur le bureau ? Writer, Calc, Impress... C'est LibreOffice ! Une suite bureautique complètement gratuite et libre. Génial, non ? 🐧",
      mood: 'excited',
    },
    autoAdvance: false,
  },

  // Étape 17: Ouvrir Writer
  {
    id: 17,
    type: 'action',
    title: 'Ouvre LibreOffice Writer',
    subtitle: 'Le traitement de texte libre',
    description:
      'Writer est l\'équivalent libre de Microsoft Word. Double-clique sur l\'icône !',
    mascotMessage: {
      text: "Double-clique sur l'icône 'Writer' pour ouvrir le traitement de texte. C'est comme Word, mais en libre et gratuit !",
      mood: 'happy',
    },
    action: {
      type: 'double-click-icon',
      target: 'desktop-icon-writer',
      description: 'Double-clique sur l\'icône Writer',
      highlightSelector: '[data-app="writer"]',
    },
  },

  // Étape 18: Explorer Writer
  {
    id: 18,
    type: 'explore',
    title: 'Bienvenue dans Writer !',
    subtitle: 'Ton traitement de texte libre',
    description:
      'Tu peux créer des documents, les mettre en forme, et les exporter en PDF. Le format natif est .odt (Open Document).',
    mascotMessage: {
      text: "Super ! Tu vois, l'interface ressemble à ce que tu connais. Le format .odt est un standard ouvert : tes documents t'appartiennent vraiment !",
      mood: 'celebrating',
    },
    autoAdvance: false,
  },

  // Étape 19: Lien Terminal <-> GUI
  {
    id: 19,
    type: 'qcm',
    title: 'Terminal + Interface graphique',
    subtitle: 'Le meilleur des deux mondes',
    description:
      'Sous Linux, on peut lancer des applications graphiques depuis le Terminal ! C\'est très pratique.',
    mascotMessage: {
      text: "Retourne dans le Terminal ! Je vais te montrer comment lancer Writer depuis la ligne de commande. C'est la puissance de Linux !",
      mood: 'thinking',
    },
    qcm: {
      question: 'Comment lancer LibreOffice Writer depuis le terminal ?',
      options: [
        { label: 'open writer', isCorrect: false },
        { label: 'libreoffice --writer', isCorrect: true },
        { label: 'start writer', isCorrect: false },
        { label: 'run libreoffice', isCorrect: false },
      ],
      hint: 'libreoffice avec l\'option --writer',
    },
    command: {
      expectedCommand: 'libreoffice',
      successMessage: 'Tu sais maintenant lancer des apps graphiques depuis le terminal !',
      errorMessage: 'Tape "libreoffice --writer"',
    },
    explanation: {
      title: 'Lancer des apps depuis le Terminal',
      command: 'libreoffice --writer',
      description: 'Sous Linux, presque toutes les applications graphiques peuvent être lancées depuis le terminal.',
      syntax: 'libreoffice [--writer|--calc|--impress] [fichier]',
      examples: ['libreoffice --writer', 'libreoffice document.odt', 'libreoffice --calc budget.ods'],
      tips: [
        'Ajoute & à la fin pour garder le terminal libre : libreoffice --writer &',
        'Tu peux ouvrir un fichier directement : libreoffice rapport.odt',
        'Ça marche aussi avec Firefox, Nautilus, etc.',
      ],
    },
  },

  // Étape 20: Philosophie Open Source
  {
    id: 20,
    type: 'explore',
    title: 'La philosophie Open Source',
    subtitle: 'Pourquoi le logiciel libre est important',
    description:
      'LibreOffice est développé par une communauté mondiale. Le code est ouvert, gratuit, et appartient à tous !',
    mascotMessage: {
      text: "Le logiciel libre, c'est : 🆓 Gratuit pour tous, 🔓 Code source ouvert, 🌍 Communauté mondiale, 🔒 Respect de ta vie privée. C'est ça l'esprit Linux !",
      mood: 'celebrating',
    },
    autoAdvance: false,
  },

  // ═══════════════════════════════════════════════════════════════
  // PARTIE 5: FÉLICITATIONS
  // ═══════════════════════════════════════════════════════════════

  // Étape 21: Fin
  {
    id: 21,
    type: 'completion',
    title: 'Félicitations !',
    subtitle: 'Tu es maintenant un Linuxien !',
    description:
      'Tu maîtrises les bases de Linux ET tu connais LibreOffice ! pwd, ls, cd, cat, mkdir, help, libreoffice... Continue à explorer. Le monde du logiciel libre est immense !',
    mascotMessage: {
      text: "BRAVO ! 🎉 Tu as terminé le tutoriel ! Tu connais les commandes de base, l'interface graphique ET LibreOffice. Tu es prêt pour l'aventure Linux !",
      mood: 'celebrating',
    },
    icon: 'trophy',
  },
];

export const getTotalSteps = () => tutorialSteps.length;
export const getStepById = (id: number) => tutorialSteps.find((s) => s.id === id);
