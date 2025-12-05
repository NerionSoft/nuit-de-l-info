# Context: Simulateur Ubuntu Desktop

**Last Updated: 2025-12-05 - Session 2**

---

## Project Status: PHASE 4 - GAMIFICATION EN COURS 🎮

Le simulateur Ubuntu de base est **fonctionnel** (Phases 1-3 complètes).
Maintenant: implémenter le **système de tutoriel gamifié**.

---

## Ce Qui Existe Déjà (Phases 1-3)

### Structure du Projet
```
ndi-app/
├── app/
│   ├── page.tsx              # Landing page
│   ├── desktop/page.tsx      # Ubuntu Desktop
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── landing/              # Navbar, Hero, Features, etc.
│   ├── desktop/              # Desktop, Window, Taskbar, etc.
│   ├── apps/                 # Terminal, FileManager, Settings, etc.
│   └── ui/
├── stores/
│   └── desktopStore.ts       # Zustand - état des fenêtres
├── lib/
│   ├── fileSystem.ts         # VirtualFileSystem class
│   ├── terminal.ts           # 20+ commandes
│   └── utils.ts
├── types/
│   └── desktop.ts
└── hooks/
```

### Dépendances Installées
- zustand, lucide-react, framer-motion, react-rnd, clsx

### Commandes Terminal Disponibles
```
ls, cd, pwd, cat, echo, mkdir, touch, rm, clear, help,
whoami, date, uname, neofetch, cowsay, history, exit,
man, hostname, id, uptime, df, free, top, ps, which, sudo
```

---

## PHASE 4: GAMIFICATION - Design Complet

### Concept
Un parcours interactif en **11 étapes** pour apprendre Linux:
1. Chaque étape a un **QCM** (sauf intro/fin)
2. L'utilisateur doit **exécuter la commande** dans le terminal
3. Une **popup explicative** apparaît après succès
4. Une **barre de progression** montre l'avancement

### Flow Utilisateur
```
[Landing Page] → [Bouton "Commencer le tutoriel"]
                          ↓
[Desktop + Boot] → [Terminal auto-ouvert]
                          ↓
[Étape 1: Bienvenue] → [Card d'introduction]
                          ↓
[Étape 2: QCM] → "Que fait la commande pwd?"
                  - Affiche le chemin actuel ✓
                  - Liste les fichiers
                  - Crée un dossier
                  - Supprime un fichier
                          ↓
[Succès QCM] → "Maintenant tape 'pwd' dans le terminal"
                          ↓
[Terminal: pwd] → Valide la commande
                          ↓
[Popup Explication] → "pwd = Print Working Directory..."
                      [Bouton Continuer]
                          ↓
[Étape 3: QCM ls] → ... et ainsi de suite
                          ↓
[Étape 11: Félicitations] → Badge + Confetti
```

### Les 11 Étapes Détaillées

| # | Type | Titre | QCM Question | Commande | Explication |
|---|------|-------|--------------|----------|-------------|
| 1 | intro | Bienvenue au Terminal | - | - | Intro Linux/Terminal |
| 2 | qcm+cmd | Où suis-je ? | "Que fait pwd?" | `pwd` | Print Working Directory |
| 3 | qcm+cmd | Lister les fichiers | "Que fait ls?" | `ls` | List directory contents |
| 4 | qcm+cmd | Se déplacer | "Pour aller dans Documents?" | `cd Documents` | Change Directory |
| 5 | qcm+cmd | Remonter | "Pour remonter d'un niveau?" | `cd ..` | Parent directory |
| 6 | qcm+cmd | Lire un fichier | "Pour lire notes.txt?" | `cat notes.txt` | Concatenate/display |
| 7 | qcm+cmd | Créer un dossier | "Pour créer un dossier?" | `mkdir mon_dossier` | Make Directory |
| 8 | qcm+cmd | Créer un fichier | "Pour créer un fichier?" | `touch fichier.txt` | Create empty file |
| 9 | qcm+cmd | Afficher du texte | "Pour afficher 'Bonjour'?" | `echo Bonjour` | Print to stdout |
| 10 | qcm+cmd | Obtenir de l'aide | "Pour voir les commandes?" | `help` | Built-in help |
| 11 | completion | Félicitations ! | - | - | Badge + Next steps |

---

## Architecture à Implémenter

### Nouveaux Fichiers à Créer

```
src/
├── types/
│   └── tutorial.ts           # Types TutorialStep, QCM, etc.
├── stores/
│   └── tutorialStore.ts      # État du tutoriel (Zustand)
├── lib/
│   └── tutorialSteps.ts      # Définition des 11 étapes
├── components/
│   └── tutorial/
│       ├── index.ts
│       ├── ProgressBar.tsx       # Barre en haut
│       ├── StepCard.tsx          # QCM + instructions
│       ├── ExplanationPopup.tsx  # Modal après succès
│       ├── TutorialOverlay.tsx   # Fond sombre + spotlight
│       └── TutorialProvider.tsx  # Context wrapper
```

### Types Clés (tutorial.ts)

```typescript
interface TutorialStep {
  id: number;
  type: 'intro' | 'qcm' | 'terminal' | 'completion';
  title: string;
  description: string;
  qcm?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  expectedCommand?: string | RegExp;
  explanation: {
    title: string;
    content: string;
    tips?: string[];
  };
}

interface TutorialState {
  isActive: boolean;
  currentStepId: number;
  phase: 'qcm' | 'terminal' | 'explanation';
  completedSteps: number[];
  // actions...
}
```

### Store Zustand (tutorialStore.ts)

```typescript
interface TutorialStore {
  // State
  isActive: boolean;
  currentStepId: number;
  phase: 'qcm' | 'terminal' | 'explanation';
  completedSteps: number[];

  // Actions
  startTutorial: () => void;
  answerQcm: (optionIndex: number) => boolean;
  validateCommand: (command: string) => boolean;
  showExplanation: () => void;
  nextStep: () => void;
  reset: () => void;
}
```

---

## Modifications Requises aux Fichiers Existants

### 1. Terminal.tsx
Ajouter:
```typescript
interface TerminalProps {
  // existant...
  onCommandExecuted?: (command: string, output: string) => void;
  highlightPrompt?: boolean;
}
```

### 2. app/desktop/page.tsx
Ajouter:
```typescript
// Détecter ?tutorial=true
const searchParams = useSearchParams();
const isTutorialMode = searchParams.get('tutorial') === 'true';

// Wrapper conditionnel
{isTutorialMode ? (
  <TutorialProvider>
    <Desktop />
  </TutorialProvider>
) : (
  <Desktop />
)}
```

### 3. Landing Page (Hero.tsx ou nouveau bouton)
Ajouter lien vers `/desktop?tutorial=true`

---

## Pour Continuer Cette Session

### Ordre d'Implémentation Recommandé

1. **Créer les types** (`types/tutorial.ts`)
2. **Créer le store** (`stores/tutorialStore.ts`)
3. **Définir les étapes** (`lib/tutorialSteps.ts`)
4. **Créer ProgressBar** (composant simple)
5. **Créer StepCard** (QCM interactif)
6. **Créer ExplanationPopup** (modal)
7. **Modifier Terminal.tsx** (callback)
8. **Créer TutorialProvider** (assembly)
9. **Modifier desktop/page.tsx** (intégration)
10. **Ajouter bouton landing** (lien tutoriel)

### Commandes pour Démarrer

```bash
cd /home/weaver/Documents/work/nuit/nuit-de-l-info/ndi-app
pnpm dev
# Ouvrir http://localhost:3000
```

---

## Notes Importantes

- Le terminal existe déjà et fonctionne
- Le système de fichiers virtuel est complet
- Les fenêtres sont draggables avec react-rnd
- Utiliser Framer Motion pour les animations (déjà installé)
- Le store Zustand existe pour les fenêtres, créer un store SÉPARÉ pour le tutoriel

---

## Résumé Session Actuelle

**Objectif**: Implémenter la gamification complète du tutoriel Linux
**État**: Documentation mise à jour, prêt à coder
**Prochaine action**: Créer `types/tutorial.ts`
