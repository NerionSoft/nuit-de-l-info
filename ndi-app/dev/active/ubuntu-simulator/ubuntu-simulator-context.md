# Context: Simulateur Ubuntu Desktop

**Last Updated: 2025-12-05**

---

## Project Overview

Création d'une landing page style PostHog + simulateur interactif d'Ubuntu Desktop pour éduquer les jeunes à Linux.

---

## Key Files

### Configuration
| Fichier | Purpose |
|---------|---------|
| `package.json` | Dépendances projet |
| `tailwind.config.ts` | Configuration Tailwind (à créer) |
| `next.config.ts` | Configuration Next.js |
| `tsconfig.json` | Configuration TypeScript |

### Pages principales
| Fichier | Purpose |
|---------|---------|
| `app/page.tsx` | Landing page PostHog style |
| `app/desktop/page.tsx` | Simulateur Ubuntu Desktop |
| `app/layout.tsx` | Layout global |
| `app/globals.css` | Styles globaux + variables CSS |

### Composants critiques
| Fichier | Purpose |
|---------|---------|
| `components/desktop/Window.tsx` | Composant fenêtre draggable |
| `components/desktop/WindowManager.tsx` | Gestion des fenêtres |
| `components/desktop/Desktop.tsx` | Container bureau |
| `components/desktop/Taskbar.tsx` | Barre des tâches |
| `components/apps/Terminal.tsx` | Application terminal |
| `stores/desktopStore.ts` | État global Zustand |

### Logique métier
| Fichier | Purpose |
|---------|---------|
| `lib/fileSystem.ts` | Système fichiers virtuel |
| `lib/terminal.ts` | Parser commandes terminal |
| `hooks/useWindowManager.ts` | Hook gestion fenêtres |

---

## Design Decisions

### 1. Style PostHog
**Decision**: Adopter le style visuel PostHog (sidebar flottante, fond crème, accents orange)
**Rationale**: Design moderne, attractif pour les jeunes, reconnaissable
**Alternatives considérées**: Material Design, Shadcn/ui

### 2. Window Management
**Decision**: Utiliser `react-rnd` pour les fenêtres draggables/resizables
**Rationale**: Bibliothèque mature, bien maintenue, API simple
**Alternatives considérées**: @dnd-kit (plus complexe), CSS transforms custom (plus de travail)

### 3. State Management
**Decision**: Zustand pour l'état global des fenêtres
**Rationale**: Léger, simple, pas de boilerplate, parfait pour ce use case
**Alternatives considérées**: Context API (suffisant mais moins ergonomique), Redux (overkill)

### 4. Système de fichiers
**Decision**: Structure JSON en mémoire simulant un filesystem Linux
**Rationale**: Simple à implémenter, pas besoin de persistance
**Alternatives considérées**: IndexedDB (trop complexe pour le scope)

### 5. Commandes Terminal
**Decision**: Whitelist de commandes supportées avec réponses prédéfinies
**Rationale**: Sécurisé, contrôlable, éducatif
**Alternatives considérées**: Parser bash réel (impossible côté client)

---

## Dependencies

### Runtime Dependencies
```json
{
  "zustand": "^4.x",           // State management
  "lucide-react": "^0.x",      // Icônes
  "framer-motion": "^11.x",    // Animations
  "react-rnd": "^10.x"         // Fenêtres draggables
}
```

### Dev Dependencies (déjà présentes)
- tailwindcss ^4
- typescript ^5
- @types/react ^19

---

## API Contracts

### Window State Interface
```typescript
interface WindowState {
  id: string;
  title: string;
  app: AppType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

type AppType =
  | 'terminal'
  | 'file-manager'
  | 'settings'
  | 'text-editor'
  | 'calculator'
  | 'browser';
```

### Desktop Store Interface
```typescript
interface DesktopStore {
  windows: WindowState[];
  activeWindowId: string | null;
  wallpaper: string;

  // Actions
  openWindow: (app: AppType) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  updateWindowPosition: (id: string, position: Position) => void;
  updateWindowSize: (id: string, size: Size) => void;
  setWallpaper: (url: string) => void;
}
```

### FileSystem Interface
```typescript
interface FileSystemNode {
  name: string;
  type: 'file' | 'directory';
  content?: string;           // Pour les fichiers
  children?: FileSystemNode[]; // Pour les dossiers
  permissions?: string;        // ex: "rwxr-xr-x"
  owner?: string;
}

interface FileSystem {
  root: FileSystemNode;
  currentPath: string;

  // Methods
  cd: (path: string) => boolean;
  ls: (path?: string) => FileSystemNode[];
  cat: (path: string) => string | null;
  pwd: () => string;
  mkdir: (path: string) => boolean;
  touch: (path: string) => boolean;
}
```

### Terminal Command Interface
```typescript
interface TerminalCommand {
  name: string;
  description: string;
  usage: string;
  execute: (args: string[], fs: FileSystem) => string;
}

// Commandes supportées
const SUPPORTED_COMMANDS = [
  'ls', 'cd', 'pwd', 'cat', 'echo', 'clear', 'help',
  'mkdir', 'touch', 'rm', 'whoami', 'date', 'uname',
  'neofetch', 'cowsay', 'sudo'
];
```

---

## Color Palette

```css
/* PostHog inspired */
--color-primary: #F54E00;
--color-primary-hover: #E04500;
--color-background: #EEEFE9;
--color-surface: #FFFFFF;
--color-text: #151515;
--color-text-secondary: #6B6B6B;
--color-border: #D0D1C9;

/* Ubuntu theme */
--color-ubuntu-orange: #E95420;
--color-ubuntu-purple: #772953;
--color-ubuntu-dark: #2C001E;
--color-ubuntu-aubergine: #77216F;
--color-ubuntu-warm-grey: #AEA79F;

/* Terminal */
--color-terminal-bg: #300A24;
--color-terminal-text: #FFFFFF;
--color-terminal-prompt: #8AE234;
```

---

## Component Hierarchy

```
App
├── LandingPage (/)
│   ├── Navbar
│   ├── Sidebar (floating)
│   ├── Hero
│   │   └── DesktopPreview (mini)
│   ├── Features
│   ├── HowItWorks
│   └── Footer
│
└── DesktopPage (/desktop)
    ├── Desktop
    │   ├── Wallpaper
    │   ├── DesktopIcon[] (6+)
    │   └── WindowManager
    │       └── Window[]
    │           ├── Terminal
    │           ├── FileManager
    │           ├── Settings
    │           ├── TextEditor
    │           ├── Calculator
    │           └── Browser
    └── Taskbar
        ├── AppMenu
        ├── OpenApps[]
        └── SystemTray
```

---

## External Resources

### Icons
- **Lucide React**: Icônes générales
- **Ubuntu Yaru**: Référence pour style icônes apps

### Assets à créer/trouver
1. Logo projet (SVG)
2. Wallpaper Ubuntu default
3. Illustration isométrique hero (optionnel)
4. Favicon

### Documentation de référence
- [Next.js App Router](https://nextjs.org/docs/app)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [react-rnd](https://github.com/bokuweb/react-rnd)
- [Framer Motion](https://www.framer.com/motion/)
- [Ubuntu Design](https://design.ubuntu.com/)

---

## Known Constraints

1. **Mobile**: Le simulateur desktop ne sera pas utilisable sur mobile - afficher message
2. **Performance**: Limiter à 5 fenêtres simultanées max
3. **Commandes**: Terminal limité aux commandes whitelistées
4. **Fichiers**: Pas de vraie persistance, reset au refresh
5. **Browser app**: Affichera une page statique, pas un vrai navigateur

---

## Open Questions

1. ~~Quel style de design?~~ → PostHog style confirmé
2. Faut-il un système d'authentification? → Non pour v1
3. Persistance localStorage pour les préférences? → À décider
4. Tutoriel guidé au premier lancement? → Nice to have, pas prioritaire
